// Optional helpers the navigation site calls on its own address. The site works without them.
//   GET  /api/health  -> {assist, stt, stores}: what is set up
//   /api/stores..., /api/hit: store maps and usage counters (stores.js)
//   POST /api/stt     raw audio (webm/mp4, a few seconds) -> {text}   (OpenAI speech-to-text, Hebrew)
//   POST /api/claude  {system, messages} -> {text}                    (Claude, for the voice conversation)
// The keys are Worker secrets only: ANTHROPIC_API_KEY, OPENAI_API_KEY.
import Anthropic from "@anthropic-ai/sdk";
import { handleStores } from "./stores.js";
import { limited, sameSite } from "./guard.js";

const MAX_AUDIO = 2 * 1024 * 1024;
const MAX_TOKENS = 1024; // room for brief thinking plus a short JSON answer; the client's value is ignored

const json = (data, status = 200) => Response.json(data, { status, headers: { "cache-control": "no-store" } });

export async function handleApi(request, env, url) {
  const path = url.pathname;
  if (path === "/api/health" && request.method === "GET") {
    return json({ assist: !!env.ANTHROPIC_API_KEY, stt: !!env.OPENAI_API_KEY, stores: !!env.STORES });
  }
  const st = await handleStores(request, env, url, { limited, sameSite });
  if (st) return st;
  if (request.method !== "POST" || (path !== "/api/stt" && path !== "/api/claude")) return json({ error: "not found" }, 404);
  if (!sameSite(request, url)) return json({ error: "forbidden" }, 403);
  if (limited(request.headers.get("cf-connecting-ip") || "unknown")) return json({ error: "too many requests" }, 429);
  try {
    return path === "/api/stt" ? await stt(request, env) : await claude(request, env);
  } catch (e) {
    console.log("api error", path, e && (e.status || ""), e && e.message);
    return json({ error: "failed" }, 502);
  }
}

async function stt(request, env) {
  if (!env.OPENAI_API_KEY) return json({ error: "not configured" }, 503);
  const len = Number(request.headers.get("content-length") || 0);
  if (len > MAX_AUDIO) return json({ error: "audio too long" }, 413);
  const audio = await request.arrayBuffer();
  if (!audio.byteLength || audio.byteLength > MAX_AUDIO) return json({ error: "bad audio" }, 400);
  const type = (request.headers.get("content-type") || "audio/webm").split(";")[0];
  const ext = type.includes("mp4") || type.includes("m4a") ? "mp4" : type.includes("ogg") ? "ogg" : type.includes("wav") ? "wav" : "webm";
  for (const model of [env.STT_MODEL || "gpt-4o-transcribe", "whisper-1"]) {
    const form = new FormData();
    form.append("file", new Blob([audio], { type }), `speech.${ext}`);
    form.append("model", model);
    form.append("language", "he");
    form.append("response_format", "json");
    const res = await fetch(`${env.OPENAI_BASE || "https://api.openai.com"}/v1/audio/transcriptions`, {
      method: "POST", headers: { authorization: `Bearer ${env.OPENAI_API_KEY}` }, body: form,
    });
    if (res.ok) { const j = await res.json(); return json({ text: (j.text || "").trim() }); }
    console.log("stt", model, res.status, (await res.text()).slice(0, 200));
    if (res.status === 401 || res.status === 429) break; // a fallback model won't help
  }
  return json({ error: "transcription failed" }, 502);
}

async function claude(request, env) {
  if (!env.ANTHROPIC_API_KEY) return json({ error: "not configured" }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ error: "bad json" }, 400); }
  const system = typeof body.system === "string" ? body.system.slice(0, 8000) : undefined;
  const messages = (Array.isArray(body.messages) ? body.messages : [])
    .filter(m => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-12).map(m => ({ role: m.role, content: m.content.slice(0, 4000) }));
  if (!messages.length || messages[0].role !== "user") return json({ error: "bad messages" }, 400);

  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, maxRetries: 1, timeout: 20_000 });
  const response = await client.beta.messages.create({
    model: env.CLAUDE_MODEL || "claude-opus-5-5",
    max_tokens: MAX_TOKENS,
    output_config: { effort: "low" }, // short spoken answers: keep thinking light so the reply comes fast
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    ...(system ? { system } : {}),
    messages,
  });
  if (response.stop_reason === "refusal") return json({ text: "" });
  const block = response.content.find(b => b.type === "text");
  return json({ text: block ? block.text : "" });
}
