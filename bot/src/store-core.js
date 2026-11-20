// GENERATED from site/index.html by bot/scripts/extract-store.mjs. Do not edit by hand.
const SPINE = 135, RIGHT = 288, CONNECT = 458, BACK = 48, LEFT = 56;
const AY = i => 180 + (14 - i) * 20;              // row center of aisle i (1 = nearest the produce)
const SECTIONS = [
  {id:"produce", name:"פירות וירקות", short:"פירות וירקות", where:"מחלקת הפירות והירקות, ישר אחרי מבואת המבצעים", num:"🍅", order:1,
   rect:[230,482,115,108], stop:[RIGHT,540],
   kw:["עגבני","מלפפון","תפוח","בננ","בצל","שום","תפוחי אדמה","תפו\"א","גזר","לימון","פירות","ירקות","אבוקדו","פלפל","גמב","תפוז","ענבים","אבטיח","מלון","כרוב","קישוא","חציל","פטריות","תות","אגס","קלמנטינ","בטטה","פלפל חריף","צנון","סלק","קולרבי","דלעת","אפרסק","שזיף","מנגו","קיווי"]},
  {id:"greens", name:"מקרר עלים ירוקים", short:"עלים", where:"מקרר העלים הגדול, בקיר שממולך ובצד ימין", num:"🌿", order:2,
   rect:[230,446,115,26], stop:[RIGHT,470],
   kw:["כוסברה","פטרוזיליה","שמיר","נענע","חסה","בזיליקום","עלים","בצל ירוק","תרד","רוקט","עירית","סלרי","מנגולד"]},
  {id:"home", est:true, name:"כלי בית", short:"כלי בית ?", where:"מחלקת כלי הבית (מיקום משוער)", num:"🍳", order:4,
   rect:[70,478,145,70], stop:[SPINE,512],
   kw:["סיר","מחבת","כלי בית","סכו\"ם","סכום","קומקום","קרש חיתוך","סכין","מגבת","קופסאות אחסון","כוס זכוכית"]},
  {id:"nuts", name:"פיצוחים", short:"פיצוחים", where:"מחלקת הפיצוחים, בצד ימין", num:"🥜", order:3,
   rect:[300,128,45,30], stop:[RIGHT,143],
   kw:["פיצוחים","גרעינים","בוטנים","שקדים","אגוז","קשיו","פיסטוק","פקאן","פירות יבשים","צימוקים","תמרים","מיקס"]},
  {id:"dairy", name:"חלב, גבינות, ביצים וסלטים", short:"מקררי חלב", where:"מקררי החלב, צמודים לקיר מימינך ומולך", num:"🥛", order:4,
   rect:[222,14,123,24], side:[321,38,24,84], stop:[310,BACK],
   kw:["חלב","גבינ","קוטג","יוגורט","שמנת","חמאה","ביצ","לבנה","מעדן","מילקי","דני","בולגרית","צפתית","משקה סויה","סלט","חומוס","טחינה","מטבוחה","חציל במיונז","כרוב סלט","פודינג"]},
  {id:"ddeli", name:"מעדנייה חלבית", short:"מעדנייה חלבית", where:"המעדנייה החלבית, ממול מקררי החלב", num:"🧀", order:5,
   rect:[222,58,90,20], stop:[255,BACK],
   kw:["גבינה פרוסה","גבינה צהובה במשקל","גבינות במשקל","מעדנייה חלבית","גבינת עיזים","פטה","רוקפור","בריה","קממבר"]},
  {id:"bakery", name:"מאפייה", short:"מאפייה", where:"המאפייה, מימינך אחרי מחלקת החלב", num:"🥖", order:6,
   rect:[130,14,86,24], stop:[172,BACK],
   kw:["לחם","חלה","חלות","פית","לחמני","באגט","קרואסון","מאפה","רוגלך","בורקס טרי","עוגת שמרים"]},
  {id:"meat", name:"מעדניית בשר, עוף ודגים", short:"בשר ודגים", where:"מעדניית הבשר, העופות והדגים, מימינך", num:"🥩", order:7,
   rect:[15,14,110,24], stop:[62,BACK],
   kw:["עוף","בשר","טחון","שניצל","דג","סלמון","חזה","כרעיים","כנפיים","פרגית","המבורגר","קבב","נקניק","אמנון","סטייק","הודו","פסטרמה","סלמי","לברק","דניס"]},
  {id:"frozen", name:"קפואים", short:"קפואים", where:"המקררים הנמוכים של הקפואים, ממול מעדניית הבשר", num:"❄", order:8,
   rect:[68,58,60,8], rect2:[68,72,60,8], stop:[105,BACK],
   kw:["גלידה","קפוא","קפואה","קפואים","פיצה","בצק עלים","בורקס","ארטיק","קרטיב","מלאווח","ג'חנון","ירקות קפואים","בשר קפוא","דגים קפואים","שניצל קפוא"]},
  {id:"drinks", name:"שתייה", short:"שתייה", where:"מחלקת השתייה, לאורך כל הקיר השמאלי של החנות", num:"🥤", order:31,
   rect:[14,96,30,420], stop:[LEFT,300],
   kw:["מים","קולה","קוקה","מיץ","סודה","ספרייט","פאנטה","תפוזינה","פטל","משקה","שתייה","שתיה","נביעות","מי עדן","ספרינג","פריגת","פיוז טי","אייס טי","משקה אנרגיה","רד בול","סיידר"]},
  {id:"a1", aisle:1, name:"מעבר 1: דגני בוקר, בריאות, בייגלה וקרקרים", short:"דגני בוקר וקרקרים", num:"1", order:11,
   kw:["קורנפלקס","דגני","גרנולה","בייגלה","קרקר","פריכיות","שיבולת","קוואקר","בריאות","טבעוני","ללא גלוטן","מוזלי","חטיף אנרגיה"]},
  {id:"a2", aisle:2, name:"מעבר 2: עוגות ועוגיות", short:"עוגות ועוגיות", num:"2", order:12,
   kw:["עוגה","עוגת","עוגות","עוגיות","עוגייה","ביסקוויט","פתי בר","מיני עוגה"]},
  {id:"a3", aisle:3, name:"מעבר 3: חלבה, ופלים, ממרחים, שוקולד וממתקים", short:"ממרחים ושוקולד", num:"3", order:13,
   kw:["חלבה","ופל","ממרח","שוקולד","ממתק","סוכריות","סוכרייה","נוטלה","ריבה","דבש","מסטיק","קינדר"]},
  {id:"a4", aisle:4, name:"מעבר 4: פופקורן וחטיפים", short:"חטיפים", num:"4", order:14,
   kw:["במבה","ביסלי","צ'יפס","ציפס","פופקורן","חטיף","פרינגלס","דוריטוס","תפוצ'יפס","פיצוחים","גרעינים","בוטנים"]},
  {id:"a5", aisle:5, name:"מעבר 5: אורז, קטניות, מלח, קמח, סוכר ואפייה", short:"אורז, קמח ואפייה", num:"5", order:15,
   kw:["אורז","עדשים","שעועית","קטניות","חומוס יבש","גריסים","מלח","סודה לשתייה","קמח","סוכר","אבקת אפייה","שמרים","וניל","קוקוס","אבקת סוכר","פודינג"]},
  {id:"a6", aisle:6, name:"מעבר 6: שימורים", short:"שימורים", num:"6", order:16,
   kw:["טונה","תירס","רסק","זית","חמוצים","מלפפון חמוץ","שימור","אפונה בשימור","פטריות בשימור","פירות בסירופ","סרדינים","חומוס בשימור"]},
  {id:"a7", aisle:7, est:true, name:"מעבר 7 (השלט לא נקרא בתמונות)", short:"? לא ידוע", num:"7", order:17, kw:[]},
  {id:"a8", aisle:8, name:"מעבר 8: מרקים, שקדי מרק, מנה חמה ונודלס", short:"מרקים ונודלס", num:"8", order:18,
   kw:["מרק","שקדי מרק","מנה חמה","נודלס","אבקת מרק","אטריות","קרוטונים"]},
  {id:"a9", aisle:9, name:"מעבר 9: משחות שיניים והיגיינה", short:"שיניים והיגיינה", num:"9", order:19,
   kw:["משחת שיניים","מברשת שיניים","חוט דנטלי","מי פה","היגיינה","תחבושות","טמפונים","צמר גפן","מקלוני אוזניים","סכיני גילוח","סכין גילוח","פדים"]},
  {id:"a10", aisle:10, name:"מעבר 10: רחצה, טיפוח, גילוח, צבעי שיער ותינוקות", short:"רחצה וטיפוח", num:"10", order:20,
   kw:["סבון","שמפו","מרכך שיער","ג'ל רחצה","תחליב רחצה","דאודורנט","קרם","קצף גילוח","צבע שיער","חיתולים","מגבונים","מוצץ","בקבוק לתינוק","תינוק","משחת החתלה"]},
  {id:"a11", aisle:11, name:"מעבר 11: כביסה וניקוי", short:"כביסה", num:"11", order:21,
   kw:["כביסה","מרכך כביסה","אבקת כביסה","ג'ל כביסה","אקונומיקה","נוזל רצפות","רצפות","נוזל כלים","טבליות למדיח","מדיח","מסיר שומנים","חומרי ניקוי","ניקוי"]},
  {id:"a12", aisle:12, name:"מעבר 12: אביזרי ניקוי ושקיות", short:"אביזרי ניקוי", num:"12", order:22,
   kw:["ספוג","סקוטש","מטאטא","סמרטוט","מגב","שקיות","שקיות זבל","שקית","כפפות","מטלית","יעה"]},
  {id:"a13", aisle:13, name:"מעבר 13: חד פעמי", short:"חד פעמי", num:"13", order:23,
   kw:["חד פעמי","צלחות","כוסות","מפיות","נייר כסף","ניילון נצמד","נייר אפייה","תבניות","קשים","מזלגות","כפות","נייר טואלט","מגבות נייר","טישו"]},
  {id:"a14", aisle:14, name:"מעבר 14: יין ואלכוהול", short:"יין ואלכוהול", num:"14", order:24,
   kw:["יין","וודקה","ויסקי","ערק","אלכוהול","ליקר","ג'ין","רום","שמפניה","מיץ ענבים"]},
  {id:"beer", name:"בירות", short:"בירות", where:"מדפי הבירות, מיד אחרי מעבר 14", num:"🍺", order:25,
   row:[70,153,145,16], stop:[SPINE,161],
   kw:["בירה","בירות","קורונה","גולדסטאר","היינקן","מאלט"]},
];
for (const s of SECTIONS) {
  if (s.aisle) { s.stop = [SPINE, AY(s.aisle)]; s.where = s.name.replace(":", ","); }
}

const BYID = Object.fromEntries(SECTIONS.map(s => [s.id, s]));
const ENTRANCE = [RIGHT, 690], CHECKOUT = [LEFT, 600];
const BACK_ORDER = 9; // sections with order <= this (after produce) are in the back area

// ---------- Matching ----------
const clean = t => t.replace(/[֑-ׇ]/g, "").replace(/["'״׳]/g, m => m === "'" || m === "׳" ? "'" : '"').replace(/\s+/g, " ").trim();
function matchSection(item) {
  const t = clean(item);
  let best = null, bestLen = 0;
  for (const s of SECTIONS) for (const k of s.kw) {
    if (t.includes(k) && k.length > bestLen) { best = s.id; bestLen = k.length; }
  }
  return best;
}

// corridors the customer walks: right walkway, main walkway, back corridor, connector between them
const CORR = [[[RIGHT, BACK], [RIGHT, 700]], [[SPINE, BACK], [SPINE, 640]], [[LEFT, BACK], [LEFT, 640]], [[LEFT, BACK], [330, BACK]], [[SPINE, CONNECT], [RIGHT, CONNECT]], [[LEFT, 640], [SPINE, 640]],
  // every aisle row (and the beer row) is open end to end, so the route can cut across between the walls
  [[LEFT, 161], [RIGHT, 161]], ...Array.from({ length: 14 }, (_, k) => [[LEFT, AY(k + 1)], [RIGHT, AY(k + 1)]])];
function proj(p) {
  let best = null;
  for (const [a, b] of CORR) {
    const q = a[0] === b[0] ? [a[0], Math.min(Math.max(p[1], a[1]), b[1])] : [Math.min(Math.max(p[0], a[0]), b[0]), a[1]];
    const d = Math.abs(q[0] - p[0]) + Math.abs(q[1] - p[1]);
    if (!best || d < best.d) best = { q, d };
  }
  return best.q;
}
function leg(a, b) {
  const pa = proj(a), pb = proj(b);
  const key = p => p[0] + "," + p[1];
  const nodes = new Map();
  const add = p => nodes.set(key(p), p);
  [pa, pb].forEach(add);
  for (let i = 0; i < CORR.length; i++) { add(CORR[i][0]); add(CORR[i][1]);
    for (let j = i + 1; j < CORR.length; j++) { const [a1, b1] = CORR[i], [a2, b2] = CORR[j];
      const v = a1[0] === b1[0] ? [a1, b1, a2, b2] : [a2, b2, a1, b1];
      const [va, vb, ha, hb] = v; if (va[0] !== vb[0] || ha[1] !== hb[1]) continue;
      const x = va[0], y = ha[1];
      if (x >= ha[0] && x <= hb[0] && y >= va[1] && y <= vb[1]) add([x, y]); } }
  const on = (p, [a, b]) => a[0] === b[0] ? p[0] === a[0] && p[1] >= a[1] && p[1] <= b[1] : p[1] === a[1] && p[0] >= a[0] && p[0] <= b[0];
  const adj = new Map([...nodes.keys()].map(k => [k, []]));
  for (const c of CORR) {
    const list = [...nodes.values()].filter(p => on(p, c)).sort((p, q) => (p[0] - q[0]) || (p[1] - q[1]));
    for (let i = 0; i < list.length - 1; i++) { const d = Math.abs(list[i][0] - list[i + 1][0]) + Math.abs(list[i][1] - list[i + 1][1]);
      adj.get(key(list[i])).push([key(list[i + 1]), d]); adj.get(key(list[i + 1])).push([key(list[i]), d]); }
  }
  const dist = new Map([[key(pa), 0]]), prev = new Map(), done = new Set();
  while (true) {
    let u = null; for (const [k, d] of dist) if (!done.has(k) && (u === null || d < dist.get(u))) u = k;
    if (u === null || u === key(pb)) break; done.add(u);
    for (const [v, w] of adj.get(u)) { const nd = dist.get(u) + w; if (!dist.has(v) || nd < dist.get(v)) { dist.set(v, nd); prev.set(v, u); } }
  }
  const path = []; let k = key(pb); while (k) { path.unshift(nodes.get(k)); k = prev.get(k); }
  return [a, ...path, b];
}

// true when a known product word itself starts the token (so a leading ו/ה is part of the word)
const startsKw = tok => SECTIONS.some(sec => sec.kw.some(k => tok.startsWith(k)));
// Split a list into items. Separators (new line, comma) split first; a run of words with no
// separators is cut into products using the store's word list, keeping multi-word products
// ("שמן זית", "נייר טואלט") and descriptors ("חלב 3%", "2 קילו עגבניות", "גבינה צהובה") together.
const PHRASES = new Set(["שמן זית","שמן קנולה","שמן חמניות","נייר טואלט","נייר סופג","מגבות נייר","נוזל כלים","סבון כלים","סבון ידיים","אבקת כביסה","ג'ל כביסה","מרכך כביסה","משחת שיניים","מברשת שיניים","מי פה","שקיות זבל","שקיות אוכל","נייר כסף","נייר אפייה","ניילון נצמד","גבינה צהובה","גבינה לבנה","גבינה בולגרית","גבינת שמנת","שמנת מתוקה","שמנת חמוצה","שמנת לבישול","חזה עוף","כרעי עוף","בשר טחון","פלפל שחור","פלפל חריף","פלפל אדום","תפוחי אדמה","בצל ירוק","בצל סגול","מלפפון חמוץ","מלפפונים חמוצים","רסק עגבניות","רוטב עגבניות","עגבניות שרי","נס קפה","קפה טורקי","קפה שחור","דגני בוקר","חטיף אנרגיה","קוקה קולה","מים מינרליים","מי סודה","מיץ תפוזים","מיץ ענבים","לחם מלא","לחם לבן","לחם אחיד","פיצה קפואה","ירקות קפואים","בצק עלים","שקדי מרק","מנה חמה","אבקת מרק","קמח תופח","אבקת אפייה","סוכר חום","אבקת סוכר","שוקולד מריר","שוקולד חלב","ממרח שוקולד","חמאת בוטנים","דבש תמרים","תפוח עץ","תפוחי עץ","אגוזי מלך","פירות יבשים","סכיני גילוח","צבע שיער","מרכך שיער","ג'ל רחצה","צמר גפן","חד פעמי","צלחות חד פעמיות","כוסות חד פעמיות","סכום חד פעמי","מיץ לימון","רוטב סויה","חומץ בן יין","קרם לחות","שעועית ירוקה","חומוס מוכן","סלט חצילים"]);
for (const s of SECTIONS) for (const k of s.kw) if (k.includes(" ")) PHRASES.add(k);
const MODS = new Set(["קפוא","קפואה","קפואים","קפואות","מלא","מלאה","מלאים","דל","דלת","דלה","שומן","לבן","אדום","אדומה","ירוק","ירוקה","צהוב","צהובה","גדול","גדולה","גדולים","קטן","קטנה","קטנים","טרי","טרייה","טריים","פרוס","פרוסה","מגורר","מגוררת","טחון","טחונה","אורגני","אורגנית","דיאט","זירו","לייט","קל","מתוק","מתוקה","חריף","חריפה","מעושן","ביתי","ביתית","שקוף","שקופה","גבוה","גבוהה","ענק","מיני","פרימיום"]);
const UNITS = new Set(["קילו","ק\"ג","קג","גרם","גר","ליטר","ליטרים","יחידות","יחידה","חבילות","חבילה","בקבוקים","בקבוק","שקית","שקיות","מגש","מגשים","זוג","תריסר","קרטון","קופסה","קופסאות","פחית","פחיות","שישייה","מארז"]);
const NUMW = new Set(["אחד","אחת","שתיים","שניים","שני","שתי","שלוש","שלושה","ארבע","ארבעה","חמש","חמישה","שש","שישה","עשר","חצי"]);
const isQty = w => /^\d+([.,]\d+)?%?$/.test(w) || UNITS.has(w) || NUMW.has(w);
function segment(chunk) {
  const words = chunk.replace(/[^א-ת0-9%"'.\s\-]/g, " ").split(/\s+/).filter(Boolean);
  const out = []; let prefix = [], last = null;
  for (let i = 0; i < words.length; i++) {
    let w = words[i];
    if (isQty(w) && !/%$/.test(w)) { prefix.push(w); continue; }
    if (/%$/.test(w) || MODS.has(w)) { if (last) { last.push(w); continue; } }
    if ((w === "ללא" || w === "בלי") && last && i + 1 < words.length) { last.push(w, words[++i]); continue; }
    // "ולחם" -> "לחם" as a new item, but keep products that start with ו ("ופלים")
    if (w.length > 2 && w[0] === "ו" && !startsKw(w) && (matchSection(w.slice(1)) || PHRASES.has(w.slice(1)))) w = w.slice(1);
    // longest known multi-word product starting here (up to 3 words)
    let took = 1;
    for (let n = Math.min(3, words.length - i); n >= 2; n--) {
      const ph = [w].concat(words.slice(i + 1, i + n)).join(" ");
      if (PHRASES.has(ph)) { took = n; break; }
    }
    const item = prefix.concat([w], words.slice(i + 1, i + took));
    i += took - 1; prefix = [];
    out.push(item); last = item;
  }
  if (prefix.length && last) last.push(...prefix);
  return out.map(a => a.join(" "));
}
function splitList(text) {
  const chunks = text.split(/[\n,،;•·]+/).map(x => x.replace(/^[\s\-–*.)]+|^\d+[.)]\s*/g, "").trim()).filter(x => x.length > 1);
  const out = [];
  for (const c of chunks) out.push(...segment(c));
  return out.filter(x => x.length > 1).slice(0, 60);
}

const HEB_NUM = { "אחד": 1, "אחת": 1, "שתיים": 2, "שניים": 2, "שתים": 2, "שלוש": 3, "שלושה": 3, "ארבע": 4, "ארבעה": 4, "חמש": 5, "חמישה": 5, "שש": 6, "שישה": 6, "שבע": 7, "שבעה": 7, "שמונה": 8, "תשע": 9, "תשעה": 9, "עשר": 10, "עשרה": 10, "אחת עשרה": 11, "אחד עשר": 11, "שתים עשרה": 12, "שנים עשר": 12, "שתיים עשרה": 12, "שלוש עשרה": 13, "שלושה עשר": 13, "ארבע עשרה": 14, "ארבעה עשר": 14 };
function whereFromWords(w) {
  w = w.replace(/[?.!]/g, "").trim();
  const m = w.match(/^מעבר\s*(.+)$/);
  if (m) { const v = m[1].trim(); const n = /^\d+$/.test(v) ? Number(v) : HEB_NUM[v]; return n >= 1 && n <= 14 ? BYID["a" + n] : null; }
  const id = matchSection(w); return id ? BYID[id] : null;
}

export { SPINE, RIGHT, CONNECT, BACK, LEFT, SECTIONS, BYID, ENTRANCE, CHECKOUT, BACK_ORDER, clean, matchSection, leg, startsKw, PHRASES, segment, splitList, HEB_NUM, whereFromWords };
