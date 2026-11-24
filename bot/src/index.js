// WhatsApp bot for in-store navigation (Cloudflare Worker).
//   GET  /webhook  Meta's webhook check
//   POST /webhook  incoming WhatsApp messages
//   everything else is the navigation site (site/ folder, served as static files)
import { DurableObject } from "cloudflare:workers";
import { Buffer } from "node:buffer";
import { handle, unknownNames, emptyState } from "./bot.js";
import { sectionList, parseItems } from "./ai-parse.js";
import { handleApi } from "./api.js";
import { sharedFixes, BUILTIN_SLUG } from "./stores.js";
import { setSharedFixes } from "./store-core.js";

const GRAPH = env => `${env.GRAPH_BASE || "https://graph.facebook.com"}/${env.GRAPH_VERSION || "v23.0"}`;
const AI_PER_DAY = 40; // photo / voice / AI lookups per customer per day, protects the free AI quota

export default {
  async fetch(request, env, ctx) {
    let url = new URL(request.url);
    // store pages: /s/<slug> is the site's index.html; the page's relative paths (vendor/, handoff.js,
    // api/...) then resolve under /s/, so serve those from the root
    const sm = url.pathname.match(/^\/s\/(.*)$/);
    if (sm) {
      if (/^[a-z0-9-]+\/?$/i.test(sm[1])) return env.ASSETS.fetch(new Request(new URL("/", url), request));
      url = new URL("/" + sm[1] + url.search, url);
      request = new Request(url, request);
    }
    if (url.pathname === "/webhook" && request.method === "GET") {
      const ok = url.searchParams.get("hub.mode") === "subscribe" && url.searchParams.get("hub.verify_token") === (env.VERIFY_TOKEN || "super-nav");
      return ok ? new Response(url.searchParams.get("hub.challenge") || "") : new Response("forbidden", { status: 403 });
    }
    if (url.pathname === "/webhook" && request.method === "POST") {
      const raw = await request.text();
      if (env.APP_SECRET && !(await validSignature(raw, request.headers.get("x-hub-signature-256"), env.APP_SECRET))) {
        return new Response("bad signature", { status: 401 });
      }
      let body; try { body = JSON.parse(raw); } catch { return new Response("bad json", { status: 400 }); }
      for (const entry of body.entry || []) for (const change of entry.changes || []) {
        const v = change.value || {};
        const phoneId = v.metadata && v.metadata.phone_number_id;
        for (const msg of v.messages || []) {
          const stub = env.CUSTOMERS.get(env.CUSTOMERS.idFromName(msg.from));
          ctx.waitUntil(stub.onMessage(msg, phoneId, url.origin).catch(e => console.log("handle failed", e && e.stack || e)));
        }
      }
      return new Response("ok"); // answer Meta right away; the reply is sent in the background
    }
    if (url.pathname.startsWith("/api/")) return handleApi(request, env, url);
    if (url.pathname === "/health") return Response.json({ ok: true, token: !!env.WHATSAPP_TOKEN, secret: !!env.APP_SECRET, ai: !!env.AI });
    return env.ASSETS.fetch(request);
  },
};

// One object per customer phone number: keeps their list and handles their messages one at a time.
export { StoreDB } from "./stores.js";

export class Customer extends DurableObject {
  async onMessage(msg, phoneId, origin) {
    const store = this.ctx.storage;
    // Meta can deliver the same message twice
    const seen = (await store.get("seen")) || [];
    if (seen.includes(msg.id)) return;
    await store.put("seen", seen.concat(msg.id).slice(-30));

    const wa = new WhatsApp(this.env, phoneId, msg.from);
    wa.typing(msg.id);
    try {
      const { text, source, hints, error } = await this.readMessage(msg, wa);
      if (error) { await wa.text(error); return; }
      const now = Date.now();
      const state = (await store.get("state")) || emptyState();
      // product places other shoppers corrected on the site (the bot knows only the built-in store)
      try { setSharedFixes(await sharedFixes(this.env, BUILTIN_SLUG)); } catch (e) { console.log("fixes", e && e.message); }
      const extra = await this.aiPlace(unknownNames(text, source).filter(n => !(n in hints)));
      const out = handle(state, text, { now, origin, source, hints: { ...hints, ...extra } });
      await store.put("state", out.state);
      for (const r of out.replies) await (r.type === "cta" ? wa.cta(r.body, r.label, r.url) : wa.text(r.text));
    } catch (e) {
      console.log("error", e && e.stack || e);
      await wa.text("אופס, משהו השתבש אצלי 🙈 נסה לשלוח שוב בעוד רגע.").catch(() => {});
    }
  }

  // -> {text, source, hints} for any message type
  async readMessage(msg, wa) {
    if (msg.type === "text") return { text: msg.text.body || "", source: "text", hints: {} };
    if (msg.type === "interactive") {
      const r = msg.interactive.button_reply || msg.interactive.list_reply || {};
      return { text: r.title || r.id || "", source: "text", hints: {} };
    }
    if (msg.type === "button") return { text: msg.button.text || "", source: "text", hints: {} };
    if (msg.type === "image" || (msg.type === "document" && /^image\//.test(msg.document.mime_type || ""))) {
      const media = msg.image || msg.document;
      if (!(await this.spendAi())) return { error: "הגעת למגבלת התמונות להיום 🙏 אפשר לכתוב את הרשימה בהודעה." };
      const bytes = await wa.download(media.id);
      const items = await readListPhoto(this.env, bytes, media.mime_type || "image/jpeg");
      const caption = (media.caption || "").trim();
      const hints = {};
      for (const it of items) if (it.section) hints[it.name] = it.section;
      const lines = items.map(i => i.name);
      if (caption && caption.split(/\s+/).length > 1) lines.push(caption);
      if (!lines.length) return { error: "לא הצלחתי לקרוא פריטים בתמונה. נסה לצלם שוב קרוב ובאור טוב, או כתוב את הרשימה." };
      return { text: lines.join("\n"), source: "photo", hints };
    }
    if (msg.type === "audio") {
      if (!(await this.spendAi())) return { error: "הגעת למגבלת ההודעות הקוליות להיום 🙏 אפשר לכתוב בהודעה." };
      const bytes = await wa.download(msg.audio.id);
      const text = await transcribe(this.env, bytes);
      if (!text) return { error: "לא הצלחתי להבין את ההודעה הקולית. נסה שוב, או כתוב לי 🙂" };
      return { text, source: "voice", hints: {} };
    }
    if (msg.type === "location") return { error: "תודה! בתוך הסופר אין GPS מדויק, אז כתוב לי ליד איזה מעבר אתה, למשל \"אני במעבר 8\"." };
    return { error: "אני מבין טקסט, תמונה של רשימה והודעה קולית 🙂" };
  }

  async spendAi() {
    const day = new Date().toISOString().slice(0, 10);
    const q = (await this.ctx.storage.get("ai")) || { day, n: 0 };
    if (q.day !== day) { q.day = day; q.n = 0; }
    if (q.n >= AI_PER_DAY) return false;
    q.n++; await this.ctx.storage.put("ai", q);
    return true;
  }

  // ask the AI which section each unknown product belongs to (only names our word list doesn't know)
  async aiPlace(names) {
    if (!names.length || !this.env.AI || !(await this.spendAi())) return {};
    try {
      const prompt = `Supermarket in Israel. For each Hebrew product name, pick the store section id where it is sold, or null if none fits.\nSections:\n${sectionList()}\nProducts:\n${names.map(n => "- " + n).join("\n")}\nAnswer with JSON only: {"items":[{"name":"<as given>","section":"<id or null>"}]}`;
      const out = await this.env.AI.run(this.env.TEXT_MODEL || "@cf/google/gemma-3-12b-it", { messages: [{ role: "user", content: prompt }], max_tokens: 400 });
      const hints = {};
      for (const it of parseItems(out)) if (it.section && names.includes(it.name)) hints[it.name] = it.section;
      return hints;
    } catch (e) { console.log("aiPlace", e && e.message); return {}; }
  }
}

async function readListPhoto(env, bytes, mime) {
  const prompt = `The image is a photo of a handwritten or printed Hebrew shopping list.\nRead every item on it, top to bottom. For each item give its name in Hebrew as written (keep quantities like "2 קילו", fix obvious spelling only) and the best store section id from this list:\n${sectionList()}\nUse null if no section fits. Ignore things that are not products (dates, titles, prices).\nAnswer with JSON only: {"items":[{"name":"...","section":"id or null"}]}`;
  const dataUrl = `data:${mime};base64,${toBase64(bytes)}`;
  const models = [env.VISION_MODEL || "@cf/google/gemma-3-12b-it", "@cf/meta/llama-4-scout-17b-16e-instruct"];
  for (const model of [...new Set(models)]) {
    try {
      const out = await env.AI.run(model, {
        messages: [{ role: "user", content: [{ type: "text", text: prompt }, { type: "image_url", image_url: { url: dataUrl } }] }],
        max_tokens: 800,
      });
      const items = parseItems(out).filter(i => /[א-ת]{2}/.test(i.name));
      if (items.length) return items;
    } catch (e) { console.log("vision", model, e && e.message); }
  }
  return [];
}

async function transcribe(env, bytes) {
  const out = await env.AI.run(env.SPEECH_MODEL || "@cf/openai/whisper-large-v3-turbo", { audio: toBase64(bytes), language: "he", task: "transcribe" });
  return ((out && out.text) || "").trim();
}

const toBase64 = bytes => Buffer.from(bytes).toString("base64");

async function validSignature(raw, header, secret) {
  if (!header || !header.startsWith("sha256=")) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(raw)));
  const hex = [...sig].map(b => b.toString(16).padStart(2, "0")).join("");
  const got = header.slice(7);
  if (got.length !== hex.length) return false;
  let diff = 0; for (let i = 0; i < hex.length; i++) diff |= hex.charCodeAt(i) ^ got.charCodeAt(i);
  return diff === 0;
}

class WhatsApp {
  constructor(env, phoneId, to) { this.env = env; this.phoneId = phoneId; this.to = to; }
  async send(payload) {
    const res = await fetch(`${GRAPH(this.env)}/${this.phoneId}/messages`, {
      method: "POST",
      headers: { authorization: `Bearer ${this.env.WHATSAPP_TOKEN}`, "content-type": "application/json" },
      body: JSON.stringify({ messaging_product: "whatsapp", ...payload }),
    });
    if (!res.ok) console.log("send failed", res.status, await res.text());
    return res.ok;
  }
  text(body) { return this.send({ to: this.to, type: "text", text: { body: body.slice(0, 4000), preview_url: false } }); }
  async cta(body, label, url) {
    const ok = await this.send({ to: this.to, type: "interactive", interactive: { type: "cta_url", body: { text: body.slice(0, 1000) }, action: { name: "cta_url", parameters: { display_text: label.slice(0, 20), url } } } });
    if (!ok) await this.text(`${body}\n${url}`); // plain link if the button can't be sent
  }
  // blue ticks + "typing..." while we work (best effort)
  typing(messageId) {
    return this.send({ status: "read", message_id: messageId, typing_indicator: { type: "text" } }).catch(() => {});
  }
  async download(mediaId) {
    const auth = { authorization: `Bearer ${this.env.WHATSAPP_TOKEN}` };
    const meta = await (await fetch(`${GRAPH(this.env)}/${mediaId}`, { headers: auth })).json();
    if (!meta.url) throw new Error("no media url");
    const res = await fetch(meta.url, { headers: auth });
    if (!res.ok) throw new Error("media download " + res.status);
    return await res.arrayBuffer();
  }
}
