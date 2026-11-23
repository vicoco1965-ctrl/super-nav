// Route building and Hebrew directions for the bot. Same ordering rules as the site.
import { DIST } from "./distances.js";
import { SECTIONS, BYID, ENTRANCE, CHECKOUT, BACK_ORDER, clean, matchSection, leg, startsKw, splitList, whereFromWords } from "./store-core.js";

export const END = { id: "checkout", where: "הקופות בקיר השמאלי, ממול המעברים ומיד אחרי השתייה: קודם קופות השירות העצמי ואחריהן הקופאיות", stop: CHECKOUT, num: "✓" };

// walking distance between two map points, memoized (the free plan has a tight CPU budget)
const distMemo = new Map();
export function walk(a, b) {
  const k = a.join(",") + "|" + b.join(",");
  let d = DIST[k] ?? distMemo.get(k);
  if (d === undefined) {
    const p = leg(a, b); d = 0;
    for (let i = 1; i < p.length; i++) d += Math.abs(p[i][0] - p[i - 1][0]) + Math.abs(p[i][1] - p[i - 1][1]);
    distMemo.set(k, d);
  }
  return d;
}

// items: [{name, section}] -> stops: [{id, items[]}] in walking order (checkout not included)
export function buildStops(items) {
  const groups = {};
  for (const it of items) if (it.section && BYID[it.section]) (groups[it.section] ||= []).push(it.name);
  const backUsed = Object.keys(groups).some(id => BYID[id].order > 2 && BYID[id].order <= BACK_ORDER);
  const rank = sec => sec.aisle ? (backUsed ? 10 + (15 - sec.aisle) : 10 + sec.aisle) : sec.id === "home" ? (backUsed ? 30 : 2.5) : sec.id === "beer" ? (backUsed ? 9 : 25) : sec.order;
  const sorted = Object.keys(groups).map(id => ({ id, items: groups[id] })).sort((a, b) => rank(BYID[a.id]) - rank(BYID[b.id]));
  return orderStops(ENTRANCE, sorted, false);
}

// Order stops for the shortest walk from `start` to the checkouts: nearest-next, then 2-opt to undo detours.
// Same as orderStops() in the site. lockFirst keeps stop 0 in place.
export function orderStops(start, list, lockFirst) {
  const rest = list.slice(), ordered = [];
  let pos = start;
  if (lockFirst && rest.length) { ordered.push(rest.shift()); pos = BYID[ordered[0].id].stop; }
  while (rest.length) {
    let bi = 0, bd = Infinity;
    rest.forEach((s, i) => { const d = walk(pos, BYID[s.id].stop); if (d < bd) { bd = d; bi = i; } });
    pos = BYID[rest[bi].id].stop; ordered.push(rest.splice(bi, 1)[0]);
  }
  const cost = seq => { let d = 0, p = start; for (const x of seq) { d += walk(p, BYID[x.id].stop); p = BYID[x.id].stop; } return d + walk(p, CHECKOUT); };
  let best = ordered, bestCost = cost(best);
  const lock = lockFirst ? 1 : 0;
  for (let improved = true, rounds = 0; improved && rounds < 50; rounds++) {
    improved = false;
    for (let i = lock; i < best.length - 1; i++) for (let j = i + 1; j < best.length; j++) {
      const cand = best.slice(0, i).concat(best.slice(i, j + 1).reverse(), best.slice(j + 1));
      const c = cost(cand);
      if (c < bestCost - 0.5) { best = cand; bestCost = c; improved = true; }
    }
  }
  return best;
}

// Re-order the remaining stops from where the customer stands: their own section first.
export function reorderFrom(here, rest) {
  rest = rest.slice();
  const mine = rest.findIndex(s => s.id === here.id);
  if (mine >= 0) rest.unshift(rest.splice(mine, 1)[0]);
  return orderStops(here.stop, rest, mine >= 0);
}

// direction to reach section s, coming from section prev (null = the entrance), here = known position.
// Same as genericTurn()/turnText() in the site: read the turns off the walking path.
const fromPoint = (prev, here) => (here ? here.stop : prev ? prev.stop : ENTRANCE);
export function turnText(s, prev, here) {
  if (here && here.id === s.id) return "אתה כבר כאן";
  const p = leg(fromPoint(prev, here), s.stop).filter((q, k, a) => !k || q[0] !== a[k - 1][0] || q[1] !== a[k - 1][1]);
  const dirs = [];
  for (let k = 1; k < p.length; k++) { const dx = Math.sign(p[k][0] - p[k - 1][0]), dy = Math.sign(p[k][1] - p[k - 1][1]); if (dx || dy) { const last = dirs[dirs.length - 1]; if (!last || last[0] !== dx || last[1] !== dy) dirs.push([dx, dy]); } }
  const turns = [];
  for (let k = 1; k < dirs.length; k++) { const c = dirs[k - 1][0] * dirs[k][1] - dirs[k - 1][1] * dirs[k][0]; if (c) turns.push(c > 0 ? "ימינה" : "שמאלה"); }
  const lead = !prev && !here ? "מהכניסה, " : "";
  if (s.id === "checkout") return lead + (turns.length ? `פנה ${turns[0]} והמשך לקופות בקיר השמאלי` : "המשך ישר לקופות בקיר השמאלי");
  if (!turns.length) return lead + "המשך ישר" + (s.aisle ? ` במעבר האמצעי עד מעבר ${s.aisle}` : "");
  const t = turns.length === 1 ? `פנה ${turns[0]}` : turns[0] === turns[1] ? `פנה ${turns[0]} ושוב ${turns[1]}` : `פנה ${turns[0]} ואז ${turns[1]}`;
  return lead + t + (s.aisle ? ` במעבר האמצעי עד מעבר ${s.aisle}` : "");
}

// true when the walk reaches this aisle heading toward the entrance, so left and right swap (walkingOut() in the site)
export function walkingOut(s, prev, here) {
  if (!s.aisle) return false;
  const p = leg(fromPoint(prev, here), s.stop);
  for (let k = p.length - 1; k > 0; k--) { const dy = p[k][1] - p[k - 1][1]; if (Math.abs(dy) > 0.5 && Math.abs(p[k][0] - p[k - 1][0]) < 0.5) return dy > 0; }
  return false;
}

// ---------- Understanding messages ----------
const FILLER = ["אני צריך", "אני צריכה", "אני רוצה", "צריך", "צריכה", "בבקשה", "תודה", "תביא לי", "תקני", "תקנה", "לקנות", "קניות", "רשימה", "רשימת קניות", "הרשימה שלי"];
// Free text -> [{name, section}]
export function textToItems(text) {
  let t = " " + clean(text).replace(/[?!؟]/g, " ").replace(/:/g, ",") + " ";
  for (const w of FILLER) t = t.split(" " + w + " ").join(" , ");
  const names = splitList(t.replace(/\s+וגם\s+|\s+גם\s+/g, ","));
  return names.filter(n => n.length > 1).map(n => ({ name: n.slice(0, 40), section: matchSection(n) }));
}

// strip a leading ה ("הטחינה" -> "טחינה") unless the product itself starts with ה
export function productPhrase(p) {
  p = clean(p).replace(/[?؟!.]/g, "").trim();
  if (p.length > 3 && p[0] === "ה" && !startsKw(p) && matchSection(p.slice(1))) p = p.slice(1);
  return p;
}

const AT_RE = /^(?:אני|אנחנו)\s+(?:כבר\s+)?(?:נמצא\s+|נמצאת\s+|נמצאים\s+|עומד\s+|עומדת\s+)?(?:ב|ליד\s+|על\s+יד\s+|אצל\s+)(?:ה)?(מעבר\s*(.+)|.+)$/;
const ASK_RE = /^(?:איפה|איפוא|איפה יש|איפה נמצא(?:ת|ים|ות)?|איפה אפשר למצוא|איפה מוצאים|יש לכם|אני מחפש|אני מחפשת|מחפש|מחפשת|אני צריך|אני צריכה|אני רוצה|תוסיף|תוסיפי|הוסף|הוסיפי|תמצא לי|חפש)\s+(.+)$/;

// Classify one message. Returns {type, ...}
export function parseCommand(text) {
  const t = clean(text).replace(/[.!]+$/, "").trim();
  if (!t) return { type: "empty" };
  if (/^(היי|הי|שלום|הלו|בוקר טוב|ערב טוב|עזרה|help|start|התחל|מה אתה יודע|איך זה עובד)(?:\s|$|[?!,])/i.test(t) && t.split(" ").length <= 4) return { type: "help" };
  if (/^(רשימה חדשה|מחק|מחקי|נקה|התחל מחדש|איפוס|אפס)/.test(t)) return { type: "reset" };
  if (/^(הבא|הלאה|קדימה|לקחתי|יש|סיימתי פה|סיימתי כאן|✓|👍)$/.test(t)) return { type: "next" };
  if (/^(הקודם|אחורה)$/.test(t)) return { type: "prev" };
  if (/^(מסלול|המסלול|תראה מסלול|שלח מסלול|מה הרשימה|הרשימה|רשימה|איפה אני|מה עכשיו)$/.test(t)) return { type: "route" };
  if (/^(סיימתי|גמרתי|סיום|סיימנו)$/.test(t)) return { type: "done" };
  if (/^(קישור|לינק|מפה|ניווט|התחל ניווט)$/.test(t)) return { type: "link" };
  const n = t.match(/^(\d{1,2})$/);
  if (n && +n[1] >= 1 && +n[1] <= 14) return { type: "at", section: BYID["a" + +n[1]] };
  const at = t.match(AT_RE);
  if (at) { const sec = whereFromWords(at[1]) || whereFromWords(productPhrase(at[1])); if (sec) return { type: "at", section: sec }; }
  const m = t.match(/^מעבר\s*(.+)$/);
  if (m) { const sec = whereFromWords(t); if (sec) return { type: "at", section: sec }; }
  const ask = t.match(ASK_RE);
  if (ask) return { type: "ask", phrase: productPhrase(ask[1].replace(/^(את|ה)\s+/, "")) };
  const items = textToItems(t);
  if (!items.length) return { type: "unknown" };
  return { type: "items", items };
}

export const sectionOf = id => (id === "checkout" ? END : BYID[id]);
export { SECTIONS, BYID, matchSection, clean };
