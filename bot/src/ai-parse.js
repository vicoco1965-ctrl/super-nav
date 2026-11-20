// Helpers for the AI answers (kept apart from index.js so they can be tested in Node)
import { SECTIONS } from "./route.js";

export const sectionList = () => SECTIONS.filter(s => s.kw.length).map(s => `${s.id} = ${s.name}`).join("\n");
const IDS = new Set(SECTIONS.map(s => s.id));

// Workers AI answers come back in a few shapes; pull {items:[...]} out of any of them
export function parseItems(out) {
  let r = out && (out.response ?? out.result?.response ?? out.choices?.[0]?.message?.content ?? out);
  if (typeof r === "string") {
    const m = r.match(/\{[\s\S]*\}/);
    if (!m) return [];
    try { r = JSON.parse(m[0]); } catch { return []; }
  }
  const arr = r && Array.isArray(r.items) ? r.items : [];
  return arr.filter(x => x && typeof x.name === "string" && x.name.trim())
    .map(x => ({ name: x.name.trim().slice(0, 40), section: IDS.has(x.section) ? x.section : null }));
}
