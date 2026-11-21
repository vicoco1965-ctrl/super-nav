// Stores mapped with the site's mapping tool, and simple usage counters per store.
// Kept in one Durable Object with SQLite storage (free plan, nothing to set up).
//   GET  /api/stores               public list [{slug, title}]
//   GET  /api/stores/:slug         the stored spec JSON, or 404
//   PUT  /api/stores/:slug         save a spec (Authorization: Bearer ADMIN_TOKEN)
//   GET  /api/stores/:slug/stats   usage counters (admin)
//   POST /api/hit                  {slug, ev: open|start|finish|share} -> 204
import { DurableObject } from "cloudflare:workers";

export const SLUG_RE = /^[a-z0-9-]{1,48}$/;
const EVENTS = ["open", "start", "finish", "share"];
const MAX_SPEC = 64 * 1024;

export function storeTitle(spec, slug) {
  const t = [spec.chain, spec.branch].map(x => (typeof x === "string" ? x.trim() : "")).filter(Boolean).join(" ");
  return (t || (typeof spec.title === "string" && spec.title.trim()) || slug).slice(0, 120);
}

export class StoreDB extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;
    this.sql.exec(`CREATE TABLE IF NOT EXISTS stores (slug TEXT PRIMARY KEY, title TEXT NOT NULL, spec TEXT NOT NULL, updated INTEGER NOT NULL)`);
    this.sql.exec(`CREATE TABLE IF NOT EXISTS hits (slug TEXT NOT NULL, day TEXT NOT NULL, ev TEXT NOT NULL, n INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (slug, day, ev))`);
  }
  list() { return this.sql.exec(`SELECT slug, title FROM stores ORDER BY title`).toArray(); }
  get(slug) { const r = this.sql.exec(`SELECT spec FROM stores WHERE slug = ?`, slug).toArray(); return r.length ? r[0].spec : null; }
  put(slug, title, spec) {
    this.sql.exec(`INSERT INTO stores (slug, title, spec, updated) VALUES (?, ?, ?, ?) ON CONFLICT(slug) DO UPDATE SET title = excluded.title, spec = excluded.spec, updated = excluded.updated`, slug, title, spec, Date.now());
  }
  hit(slug, ev, day) {
    if (!this.sql.exec(`SELECT 1 FROM stores WHERE slug = ?`, slug).toArray().length) return false;
    this.sql.exec(`INSERT INTO hits (slug, day, ev, n) VALUES (?, ?, ?, 1) ON CONFLICT(slug, day, ev) DO UPDATE SET n = n + 1`, slug, day, ev);
    return true;
  }
  stats(slug, since7) {
    const rows = this.sql.exec(`SELECT day, ev, n FROM hits WHERE slug = ? ORDER BY day DESC`, slug).toArray();
    const zero = () => ({ open: 0, start: 0, finish: 0, share: 0 });
    const total = zero(), last7 = zero(), byDay = new Map();
    for (const { day, ev, n } of rows) {
      total[ev] += n;
      if (day >= since7) last7[ev] += n;
      if (!byDay.has(day)) byDay.set(day, { day, ...zero() });
      byDay.get(day)[ev] += n;
    }
    return { total, last7, days: [...byDay.values()].slice(0, 90) };
  }
}

const json = (data, status = 200) => Response.json(data, { status, headers: { "cache-control": "no-store" } });
const day = (d = new Date()) => d.toISOString().slice(0, 10);

function isAdmin(request, env) {
  const m = (request.headers.get("authorization") || "").match(/^Bearer\s+(.+)$/i);
  if (!env.ADMIN_TOKEN || !m) return false;
  const a = m[1].trim(), b = env.ADMIN_TOKEN;
  if (a.length !== b.length) return false;
  let diff = 0; for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// returns a Response for store paths, or null when the path isn't one of them
export async function handleStores(request, env, url, { limited, sameSite }) {
  const p = url.pathname;
  if (p !== "/api/hit" && !p.startsWith("/api/stores")) return null;
  if (!env.STORES) return json({ error: "not configured" }, 503);
  const db = env.STORES.get(env.STORES.idFromName("all"));
  const m = p.match(/^\/api\/stores(?:\/([^/]+))?(\/stats)?\/?$/);

  if (p === "/api/hit") {
    if (request.method !== "POST") return json({ error: "not found" }, 404);
    if (!sameSite(request, url)) return new Response(null, { status: 204 });
    if (limited("hit:" + (request.headers.get("cf-connecting-ip") || "unknown"))) return new Response(null, { status: 204 });
    let b; try { b = await request.json(); } catch { return new Response(null, { status: 204 }); }
    if (b && SLUG_RE.test(b.slug || "") && EVENTS.includes(b.ev)) await db.hit(b.slug, b.ev, day());
    return new Response(null, { status: 204 });
  }
  if (!m) return json({ error: "not found" }, 404);
  const slug = m[1] && decodeURIComponent(m[1]);
  if (slug && !SLUG_RE.test(slug)) return json({ error: "bad slug" }, 400);

  if (!slug) return request.method === "GET" ? json(await db.list()) : json({ error: "not found" }, 404);
  if (m[2]) {
    if (request.method !== "GET") return json({ error: "not found" }, 404);
    if (!isAdmin(request, env)) return json({ error: "unauthorized" }, 401);
    return json(await db.stats(slug, day(new Date(Date.now() - 6 * 864e5))));
  }
  if (request.method === "GET") {
    const spec = await db.get(slug);
    return spec ? new Response(spec, { headers: { "content-type": "application/json", "cache-control": "no-store" } }) : json({ error: "not found" }, 404);
  }
  if (request.method === "PUT") {
    if (!isAdmin(request, env)) return json({ error: "unauthorized" }, 401);
    const raw = await request.text();
    if (raw.length > MAX_SPEC) return json({ error: "too large" }, 413);
    let spec; try { spec = JSON.parse(raw); } catch { return json({ error: "bad json" }, 400); }
    if (!spec || typeof spec !== "object" || Array.isArray(spec)) return json({ error: "bad spec" }, 400);
    spec.slug = slug;
    const body = JSON.stringify(spec);
    if (body.length > MAX_SPEC) return json({ error: "too large" }, 413);
    await db.put(slug, storeTitle(spec, slug), body);
    return json({ ok: true, slug, title: storeTitle(spec, slug) });
  }
  return json({ error: "not found" }, 404);
}
