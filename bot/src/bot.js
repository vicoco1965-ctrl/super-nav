// The conversation: state + one customer message -> new state + replies. No network here, so it is easy to test.
import { sidedList, sideOf, aisleWhere } from "./store-core.js";
import { BYID, END, buildStops, reorderFrom, turnText, walkingOut, parseCommand, textToItems, sectionOf, matchSection } from "./route.js";

export const STORE_NAME = "יוחננוף באר שבע";
export const LIST_TTL_MS = 6 * 60 * 60 * 1000; // a list older than this counts as finished

export const emptyState = () => ({ items: [], stops: [], cur: 0, here: null, skipped: [], updated: 0 });
const active = (st, now) => st && st.stops.length && now - st.updated < LIST_TTL_MS;

const label = sec => (sec.aisle ? `מעבר ${sec.aisle}` : `${sec.num} ${sec.name}`);
const tx = text => ({ type: "text", text });

export function navLink(origin, st) {
  const rest = st.stops.slice(st.cur);
  const parts = [];
  for (const s of rest) for (const n of s.items) parts.push(n.replace(/[|~]/g, " ") + "~" + s.id);
  let h = "l=" + encodeURIComponent(parts.join("|"));
  if (st.here) h += "&at=" + st.here;
  return origin.replace(/\/$/, "") + "/#" + h;
}
const cta = (origin, st, body) => ({ type: "cta", body, label: "🧭 התחל ניווט", url: navLink(origin, st) });

export function routeText(st) {
  const rest = st.stops.slice(st.cur);
  const lines = [st.here ? `🛒 המסלול מכאן (${rest.length} תחנות):` : `🛒 המסלול שלך ב${STORE_NAME} (${rest.length} תחנות):`];
  rest.forEach((s, i) => lines.push(`${i + 1}. ${label(BYID[s.id])}: ${sidedList(BYID[s.id], s.items)}`));
  lines.push("✓ ואז לקופות");
  return lines.join("\n");
}

// "turn left to the main walkway and on to aisle 8 (soups)" / "you are already here"
function directions(sec, prev, here) {
  const turn = turnText(sec, prev, here);
  if (here && here.id === sec.id) return "אתה כבר כאן.";
  if (sec.aisle && turn.includes(`מעבר ${sec.aisle}`)) {
    const w = aisleWhere(sec, walkingOut(sec, prev, here));
    return w.startsWith("מעבר") ? `${turn}. ${w.replace(/^מעבר \d+, /, "")}.` : `${turn} (${sec.short}).`;
  }
  return `${turn}, אל ${sec.where}.`;
}

function stopMessage(st) {
  const total = st.stops.length;
  if (st.cur >= total) {
    const prev = total ? BYID[st.stops[total - 1].id] : null;
    return `🎉 סיימת את כל הרשימה! ${turnText(END, prev, null)}: קודם קופות השירות העצמי ואחריהן הקופאיות.`;
  }
  const s = st.stops[st.cur], sec = BYID[s.id];
  const here = st.here ? BYID[st.here] : null;
  const prev = st.cur ? BYID[st.stops[st.cur - 1].id] : null;
  const head = sec.aisle ? `מעבר ${sec.aisle}` : `${sec.num} ${sec.short}`;
  const flip = walkingOut(sec, here ? null : prev, here);
  return `${head}\n${directions(sec, here ? null : prev, here)}\nקח: ${sidedList(sec, s.items, flip)}\n\nכתוב "הבא" כשסיימת כאן.`;
}

export const HELP = `שלום! 👋 אני עוזר הקניות של ${STORE_NAME}.

שלח לי את רשימת הקניות ואחזיר לך מסלול מסודר מעבר אחרי מעבר:
📷 תמונה של הרשימה
✍️ רשימה כתובה (אפשר גם בלי פסיקים)
🎤 הודעה קולית

בזמן הקנייה אפשר לכתוב:
• "איפה הטחינה?"
• "אני במעבר 8" (ואחשב את המסלול מחדש מכאן)
• "הבא" אחרי כל תחנה
• "רשימה חדשה" כדי להתחיל מחדש`;

// Turn the items into a fresh route (or add to the active one) and describe it
function addItems(st, items, now, origin) {
  const known = items.filter(i => i.section && BYID[i.section]);
  const unknown = items.filter(i => !i.section || !BYID[i.section]);
  const isNew = !active(st, now);
  if (isNew) { const h = st.here && now - (st.hereAt || 0) < 3600e3 ? st.here : null; st = emptyState(); st.here = h; }
  if (!known.length) {
    return { state: st, replies: [tx(`לא הצלחתי לשייך למחלקה: ${unknown.map(u => u.name).join(", ")}.\nנסה לכתוב במילים אחרות, או שלח "עזרה".`)] };
  }
  st.items = st.items.concat(known);
  const done = st.stops.slice(0, st.cur);
  const restItems = st.stops.slice(st.cur).flatMap(s => s.items.map(name => ({ name, section: s.id }))).concat(known);
  let rest = buildStops(restItems);
  if (st.here) rest = reorderFrom(BYID[st.here], rest);
  st.stops = done.concat(rest);
  st.updated = now;
  const replies = [];
  if (isNew) replies.push(tx(routeText(st) + (unknown.length ? `\n\n❓ לא מצאתי מחלקה ל: ${unknown.map(u => u.name).join(", ")}` : "")));
  else replies.push(tx(`✅ הוספתי: ${known.map(k => `${k.name} (${label(BYID[k.section])})`).join(", ")}` + (unknown.length ? `\n❓ לא מצאתי מחלקה ל: ${unknown.map(u => u.name).join(", ")}` : "") + "\n\n" + routeText(st)));
  replies.push(cta(origin, st, isNew
    ? "כשתגיע לסופר, לחץ על הכפתור לניווט עם מפה והכוונה קולית. או כתוב לי כאן \"אני במעבר 8\" ו\"הבא\" בכל תחנה."
    : "הקישור המעודכן לניווט:"));
  return { state: st, replies };
}

export const parseMessage = (text, source) => (source === "photo" ? { type: "items", items: textToItems(text) } : parseCommand(text));
// product names in this message that need the AI to place them
export function unknownNames(text, source) {
  const cmd = parseMessage(text, source);
  const list = cmd.items || (cmd.type === "ask" ? textToItems(cmd.phrase) : []);
  return list.filter(i => !i.section).map(i => i.name);
}

// Main entry. text = the message text (already transcribed / read from a photo). source: "text" | "photo" | "voice"
// hints: {productName: sectionId} from the AI, for products the word list doesn't know
export function handle(prev, text, { now = Date.now(), origin, source = "text", hints = {} } = {}) {
  let st = prev && prev.stops ? JSON.parse(JSON.stringify(prev)) : emptyState();
  const isActive = active(st, now);
  // a photo of a list is always a list (a short caption like "רשימה" is just a label)
  const cmd = parseMessage(text, source);
  const hint = list => list.map(i => (i.section ? i : { ...i, section: BYID[hints[i.name]] ? hints[i.name] : null }));
  if (cmd.items) cmd.items = hint(cmd.items);

  switch (cmd.type) {
    case "help": case "empty":
      return { state: st, replies: [tx(HELP)] };
    case "reset":
      return { state: emptyState(), replies: [tx("🗑️ מחקתי את הרשימה. שלח רשימה חדשה (תמונה, טקסט או הודעה קולית).")] };
    case "done":
      return { state: emptyState(), replies: [tx(`תודה שקנית ב${STORE_NAME}! 🛒 בפעם הבאה פשוט שלח לי רשימה.`)] };
    case "items":
      if (!cmd.items.length) return { state: st, replies: [tx(source === "photo" ? "לא הצלחתי לקרוא פריטים בתמונה. נסה לצלם שוב קרוב ובאור טוב, או כתוב את הרשימה." : HELP)] };
      // one known product while shopping = a question like "טחינה?"
      if (isActive && cmd.items.length === 1 && source === "text" && /\?$/.test(text.trim())) return ask(st, cmd.items, now, origin);
      return addItems(st, cmd.items, now, origin);
    case "ask": {
      const items = hint(textToItems(cmd.phrase));
      if (!items.length) return { state: st, replies: [tx(`לא הבנתי מה לחפש. נסה למשל "איפה הטחינה?"`)] };
      return ask(st, items, now, origin);
    }
  }
  if (!isActive) {
    if (cmd.type === "at") {
      st = emptyState(); st.here = cmd.section.id; st.hereAt = now;
      return { state: st, replies: [tx(`📍 אתה ב${cmd.section.where}.\nעדיין אין לי את הרשימה שלך. שלח אותה (תמונה, טקסט או הודעה קולית) ואבנה מסלול מכאן.`)] };
    }
    return { state: st, replies: [tx(HELP)] };
  }
  st.updated = now;
  switch (cmd.type) {
    case "next":
      if (st.cur < st.stops.length) st.cur++;
      st.here = null;
      return { state: st, replies: [tx(stopMessage(st))] };
    case "prev":
      if (st.cur > 0) st.cur--;
      st.here = null;
      return { state: st, replies: [tx(stopMessage(st))] };
    case "route":
      return { state: st, replies: [tx(routeText(st)), cta(origin, st, "הקישור לניווט:")] };
    case "link":
      return { state: st, replies: [cta(origin, st, "הקישור לניווט עם מפה והכוונה קולית:")] };
    case "at": {
      const sec = cmd.section;
      st.here = sec.id;
      const done = st.stops.slice(0, st.cur);
      const rest = reorderFrom(sec, st.stops.slice(st.cur));
      st.stops = done.concat(rest);
      const first = rest[0];
      const intro = first && first.id === sec.id ? `📍 אתה ב${sec.where}. מעולה, זו תחנה מהרשימה.` : `📍 אתה ב${sec.where}. חישבתי את המסלול מחדש מכאן.`;
      if (!rest.length) return { state: st, replies: [tx(intro + "\n" + stopMessage(st))] };
      const body = intro + "\n\n" + stopMessage(st) + (rest.length > 1 ? "\n\nאחר כך: " + rest.slice(1).map(s => BYID[s.id].short).join(" ← ") : "");
      return { state: st, replies: [tx(body)] };
    }
  }
  return { state: st, replies: [tx(`לא הבנתי 🙂 אפשר לכתוב "הבא", "אני במעבר 8", "איפה הטחינה?" או לשלוח רשימה חדשה.`)] };
}

// "איפה X?" answers, and while shopping also adds X to the list
function ask(st, items, now, origin) {
  const lines = [];
  const known = [];
  for (const it of items) {
    const sec = it.section && BYID[it.section];
    if (!sec) { lines.push(`❓ לא מצאתי איפה נמצא ${it.name}. אפשר לשאול עובד, או לנסות מילה אחרת.`); continue; }
    const side = sec.aisle && sec.kwL ? sideOf(sec, it.name) : "";
    lines.push(sec.aisle ? `📍 ${it.name}: מעבר ${sec.aisle}${side === "L" ? ", בצד שמאל" : side === "R" ? ", בצד ימין" : ""}.` : `📍 ${it.name}: ${sec.where}.`);
    known.push(it);
  }
  if (!known.length || !active(st, now)) return { state: st, replies: [tx(lines.join("\n"))] };
  // add to the list as the next stop
  st.updated = now;
  for (const it of known) {
    const idx = st.stops.findIndex((s, i) => i >= st.cur && s.id === it.section);
    let stop;
    if (idx >= 0) { stop = st.stops.splice(idx, 1)[0]; if (!stop.items.includes(it.name)) stop.items.push(it.name); }
    else stop = { id: it.section, items: [it.name] };
    st.stops.splice(st.cur, 0, stop);
    st.items.push(it);
  }
  const here = st.here ? BYID[st.here] : null;
  const prev = st.cur ? BYID[st.stops[st.cur - 1].id] : null;
  const sec = BYID[st.stops[st.cur].id];
  lines.push(`הוספתי לרשימה, זו התחנה הבאה שלך. ${directions(sec, here ? null : prev, here)}`);
  return { state: st, replies: [tx(lines.join("\n"))] };
}

export { matchSection, sectionOf };
