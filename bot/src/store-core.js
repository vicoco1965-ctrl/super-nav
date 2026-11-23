// GENERATED from site/index.html by bot/scripts/extract-store.mjs. Do not edit by hand.
const SPINE = 135, RIGHT = 288, CONNECT = 458, BACK = 48, LEFT = 56;
const AY = i => 180 + (14 - i) * 20;              // row center of aisle i (1 = nearest the produce)
let SECTIONS = [
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
  {id:"fish", name:"דגים", short:"דגים", where:"דלפק הדגים, בפינה השמאלית של הקיר האחורי", num:"🐟", order:7,
   rect:[15,14,34,24], stop:[32,BACK],
   kw:["דג","דגים","סלמון","אמנון","לברק","דניס","בורי","מושט","פילה","טונה טרייה"]},
  {id:"ffish", name:"מקרר דגים קפואים", short:"דגים קפואים", where:"מקרר הדגים הקפואים, ממול דלפק הדגים הטריים", num:"🧊", order:7,
   rect:[15,58,40,10], stop:[32,BACK],
   kw:["דגים קפואים","דג קפוא","פילה קפוא","שרימפס","קלמרי","פירות ים","פילה אמנון קפוא","סלמון קפוא","מוסר ים קפוא"]},
  {id:"meat", name:"קצביית בשר", short:"קצביית בשר", where:"קצביית הבשר, בקיר האחורי", num:"🥩", order:7,
   rect:[52,14,36,24], stop:[70,BACK],
   kw:["בשר","טחון","בשר טחון","סטייק","אנטריקוט","צלעות","כבד","קבב","המבורגר","אסאדו","שריר","כתף"]},
  {id:"chicken", name:"קצביית עוף", short:"קצביית עוף", where:"קצביית העוף, בקיר האחורי ליד המאפייה", num:"🍗", order:7,
   rect:[91,14,34,24], stop:[108,BACK],
   kw:["עוף","חזה","חזה עוף","כרעיים","כרעי עוף","כנפיים","פרגית","שניצל","הודו","שוקיים","עוף שלם"]},
  {id:"frozen", name:"קפואים, בצקים ומקררי נקניק ובשר", short:"קפואים ובצקים", where:"גוש המקררים במרכז האזור האחורי, ממול הקצביות: קפואים, בצקים, נקניקים ובשר ארוז", num:"❄", order:8,
   rect:[68,58,60,8], rect2:[68,72,60,8], stop:[105,BACK],
   kw:["גלידה","קפוא","קפואה","קפואים","פיצה","בצק עלים","בורקס","ארטיק","קרטיב","מלאווח","ג'חנון","ירקות קפואים","בשר קפוא","שניצל קפוא","בצק","בצקים","בצק פילו","נקניק","נקניקיות","פסטרמה","סלמי","הודו פרוס","בשר ארוז"]},
  {id:"drinks", name:"שתייה", short:"שתייה", where:"מחלקת השתייה, לאורך כל הקיר השמאלי של החנות", num:"🥤", order:31,
   rect:[14,96,30,420], stop:[LEFT,300],
   kw:["מים","קולה","קוקה","מיץ","סודה","ספרייט","פאנטה","תפוזינה","פטל","משקה","שתייה","שתיה","נביעות","מי עדן","ספרינג","פריגת","פיוז טי","אייס טי","משקה אנרגיה","רד בול","סיידר"]},
  {id:"a1", aisle:1, name:"מעבר 1: דגני בוקר, בייגלה וקרקרים", short:"דגני בוקר וקרקרים", num:"1", order:11, sides:"משמאל דגני בוקר, מימין בייגלה וקרקרים", 
   kw:["קורנפלקס","דגני","דגני בוקר","גרנולה","שיבולת","קוואקר","מוזלי","בייגלה","קרקר","פריכיות","בריאות","ללא גלוטן"]},
  {id:"a2", aisle:2, name:"מעבר 2: עוגות ועוגיות, תה וקפה", short:"עוגיות, תה וקפה", num:"2", order:12, sides:"משמאל עוגות ועוגיות, מימין תה וקפה", 
   kw:["עוגה","עוגת","עוגות","עוגיות","עוגייה","ביסקוויט","פתי בר","קפה","נס קפה","קפה טורקי","קפה שחור","קפסולות","תה","תיון","חליטה","קקאו","שוקו"]},
  {id:"a3", aisle:3, name:"מעבר 3: חלבה, ופלים וממרחים, שוקולד וממתקים", short:"ממרחים ושוקולד", num:"3", order:13, sides:"משמאל חלבה, ופלים וממרחים, מימין שוקולד וממתקים", 
   kw:["חלבה","ופל","ממרח","ממרח שוקולד","נוטלה","ריבה","דבש","חמאת בוטנים","שוקולד","ממתק","סוכריות","סוכרייה","מסטיק","קינדר"]},
  {id:"a4", aisle:4, name:"מעבר 4: פופקורן וחטיפים, חטיפים", short:"חטיפים", num:"4", order:14, sides:"משמאל פופקורן וחטיפים, מימין חטיפים", 
   kw:["במבה","ביסלי","צ'יפס","ציפס","פופקורן","חטיף","פרינגלס","דוריטוס","תפוצ'יפס"]},
  {id:"a5", aisle:5, name:"מעבר 5: אורז וקטניות, קמח, סוכר ואפייה", short:"אורז, קמח ואפייה", num:"5", order:15, sides:"משמאל אורז וקטניות, מימין קמח, סוכר ואפייה", 
   kw:["אורז","עדשים","שעועית","קטניות","חומוס יבש","גריסים","בורגול","קינואה","רוטב סויה","מלח","קמח","קמח תופח","סוכר","סוכר חום","אבקת סוכר","אבקת אפייה","סודה לשתייה","שמרים","וניל","קוקוס"]},
  {id:"a6", aisle:6, name:"מעבר 6: שימורים", short:"שימורים", num:"6", order:16, 
   kw:["טונה","תירס","רסק","רסק עגבניות","רוטב עגבניות","זית","חמוצים","מלפפון חמוץ","שימור","אפונה בשימור","פטריות בשימור","פירות בסירופ","סרדינים","חומוס בשימור"]},
  {id:"a7", aisle:7, name:"מעבר 7: שמן וחומץ, פתיתים, פסטות ופירורי לחם", short:"שמן, פסטה ופתיתים", num:"7", order:17, sides:"משמאל שמן וחומץ, מימין פתיתים, פסטות ופירורי לחם", 
   kw:["שמן","שמן זית","שמן קנולה","שמן חמניות","שמן תירס","חומץ","חומץ בן יין","חומץ בלסמי","פתיתים","פסטה","ספגטי","מקרוני","פנה","פוזילי","לזניה","פירורי לחם","פרורי לחם","קוסקוס"]},
  {id:"a8", aisle:8, name:"מעבר 8: מזון ואביזרי תינוקות, מרקים ושקדי מרק", short:"תינוקות ומרקים", num:"8", order:18, sides:"משמאל מזון ואביזרי תינוקות, מימין מרקים ושקדי מרק", 
   kw:["מטרנה","סימילאק","דייסה","מחית","בקבוק לתינוק","מוצץ","חיתולים","טיטולים","מגבונים","תינוק","מרק","שקדי מרק","אבקת מרק","מנה חמה","נודלס","אטריות","קרוטונים"]},
  {id:"a9", aisle:9, name:"מעבר 9: טיפוח, היגיינה ומשחות שיניים", short:"טיפוח והיגיינה", num:"9", order:19,
   kw:["קרם","קרם לחות","קרם ידיים","תחליב גוף","משחת שיניים","מברשת שיניים","חוט דנטלי","מי פה","היגיינה","תחבושות","טמפונים","צמר גפן","מקלוני אוזניים"]},
  {id:"a10", aisle:10, name:"מעבר 10: טיפוח שיער, רחצה וגילוח לגבר", short:"שיער ורחצה", num:"10", order:20, sides:"משמאל טיפוח שיער, מימין רחצה וגילוח לגבר", 
   kw:["שמפו","מרכך שיער","צבע שיער","ג'ל לשיער","ספריי לשיער","סבון","סבון ידיים","ג'ל רחצה","תחליב רחצה","דאודורנט","קצף גילוח","סכיני גילוח","סכין גילוח","אפטרשייב"]},
  {id:"a11", aisle:11, name:"מעבר 11: כביסה, מרכך כביסה ואבקות כביסה", short:"כביסה", num:"11", order:21, sides:"משמאל כביסה, מימין מרכך כביסה ואבקות כביסה", 
   kw:["כביסה","ג'ל כביסה","מרכך כביסה","אבקת כביסה","מסיר כתמים","אקונומיקה","נוזל רצפות","רצפות","נוזל כלים","סבון כלים","טבליות למדיח","מדיח","מסיר שומנים","חומרי ניקוי"]},
  {id:"a12", aisle:12, name:"מעבר 12: אביזרי ניקיון, ניקוי ומטהרי אוויר", short:"אביזרי ניקיון", num:"12", order:22, sides:"משמאל אביזרי ניקיון, מימין ניקוי ומטהרי אוויר", 
   kw:["ספוג","סקוטש","מטאטא","סמרטוט","מגב","כפפות","מטלית","יעה","שקיות","שקיות זבל","מטהר אוויר","ספריי לחדר","ריחנית"]},
  {id:"a13", aisle:13, name:"מעבר 13: חד פעמי, מזון לבעלי חיים", short:"חד פעמי וחיות", num:"13", order:23, sides:"משמאל חד פעמי, מימין מזון לבעלי חיים", 
   kw:["חד פעמי","צלחות","כוסות","מפיות","נייר כסף","ניילון נצמד","נייר אפייה","תבניות","קשים","מזלגות","כפות","אוכל לחתול","אוכל לכלב","חול לחתול","חטיף לכלב","בעלי חיים"]},
  {id:"a14", aisle:14, name:"מעבר 14: יין ואלכוהול, נייר טואלט", short:"יין ונייר", num:"14", order:24, sides:"משמאל יין ואלכוהול, מימין נייר טואלט", 
   kw:["יין","וודקה","ויסקי","ערק","אלכוהול","ליקר","ג'ין","רום","שמפניה","מיץ ענבים","נייר טואלט","מגבות נייר","נייר סופג","טישו","ממחטות"]},
  {id:"beer", name:"בירות", short:"בירות", where:"מדפי הבירות, מיד אחרי מעבר 14", num:"🍺", order:25,
   row:[70,153,145,16], stop:[SPINE,161],
   kw:["בירה","בירות","קורונה","גולדסטאר","היינקן","מאלט"]},
];
for (const s of SECTIONS) {
  if (s.aisle) { s.stop = [SPINE, AY(s.aisle)]; s.where = s.name.replace(":", ",") + (s.sides ? ". " + s.sides : ""); }
}

let BYID = Object.fromEntries(SECTIONS.map(s => [s.id, s]));
let ENTRANCE = [RIGHT, 690], CHECKOUT = [RIGHT, 626];
const BACK_ORDER = 9; // sections with order <= this (after produce) are in the back area
// ---------- Stores: the built-in Yochananof map, or a store generated from a mapping (walls + aisles) ----------
let STORE = { title: "יוחננוף באר שבע", generated: false, slug: "", W: 360, H: 660 };
const YOCHANANOF = { SECTIONS, CORR: null, ENTRANCE, CHECKOUT };
// departments Victor can pick while mapping; keywords come from the built-in map where it has them
const kwOf = id => (BYID[id] && BYID[id].kw) || [];
const CATALOG = [
  { c: "produce", name: "פירות וירקות", emoji: "🍅", kind: "produce", kw: kwOf("produce") },
  { c: "greens", name: "עלים ירוקים", emoji: "🌿", kind: "fridge", kw: kwOf("greens") },
  { c: "dairy", name: "מקררי חלב", emoji: "🥛", kind: "fridge", kw: kwOf("dairy") },
  { c: "ddeli", name: "מעדנייה חלבית", emoji: "🧀", kind: "counter", kw: kwOf("ddeli") },
  { c: "bakery", name: "מאפייה", emoji: "🥖", kind: "shelf", kw: kwOf("bakery") },
  { c: "meat", name: "בשר ועוף", emoji: "🥩", kind: "counter", kw: kwOf("meat").concat(kwOf("chicken")) },
  { c: "fish", name: "דגים", emoji: "🐟", kind: "counter", kw: ["דג", "דגים", "סלמון", "אמנון", "לברק", "דניס", "פילה", "טונה טרייה", "בורי", "מושט"] },
  { c: "deli", name: "מעדנייה (נקניקים וסלטים)", emoji: "🥓", kind: "counter", kw: ["נקניק", "פסטרמה", "סלמי", "הודו פרוס", "סלטים במשקל", "מעדנייה"] },
  { c: "frozen", name: "קפואים", emoji: "❄️", kind: "chest", kw: kwOf("frozen") },
  { c: "drinks", name: "שתייה", emoji: "🥤", kind: "shelf", kw: kwOf("drinks") },
  { c: "beer", name: "בירות", emoji: "🍺", kind: "shelf", kw: kwOf("beer") },
  { c: "wine", name: "יין ואלכוהול", emoji: "🍷", kind: "shelf", kw: ["יין", "וודקה", "ערק", "וויסקי", "ויסקי", "אלכוהול", "ליקר", "שמפניה"] },
  { c: "nuts", name: "פיצוחים", emoji: "🥜", kind: "shelf", kw: kwOf("nuts") },
  { c: "eggs", name: "ביצים", emoji: "🥚", kind: "shelf", kw: ["ביצ"] },
  { c: "cleaning", name: "ניקיון", emoji: "🧽", kind: "shelf", kw: ["אקונומיקה", "סבון כלים", "נוזל כלים", "אבקת כביסה", "מרכך", "ניקוי", "ספוג", "שקיות זבל", "נייר טואלט", "נייר סופג", "מטליות", "כביסה"] },
  { c: "baby", name: "תינוקות", emoji: "👶", kind: "shelf", kw: ["חיתול", "טיטול", "מטרנה", "סימילאק", "מגבונים", "תינוק"] },
  { c: "pharm", name: "פארם וטיפוח", emoji: "🧴", kind: "shelf", kw: ["שמפו", "מרכך שיער", "סבון", "דאודורנט", "משחת שיניים", "מברשת שיניים", "קרם", "גילוח", "תחבושות"] },
  { c: "home", name: "כלי בית", emoji: "🍳", kind: "shelf", kw: kwOf("home") },
  { c: "organic", name: "טבע ובריאות", emoji: "🌱", kind: "shelf", kw: ["אורגני", "ללא גלוטן", "טבעוני", "בריאות", "קינואה", "צ'יה", "סילאן"] },
  { c: "spices", name: "תבלינים", emoji: "🌶️", kind: "shelf", kw: ["תבלין", "פפריקה", "כמון", "כורכום", "פלפל שחור", "אורגנו", "קינמון"] },
  { c: "pets", name: "חיות מחמד", emoji: "🐾", kind: "shelf", kw: ["אוכל לחתול", "אוכל לכלב", "חול לחתול", "חטיף לכלב", "חיות"] },
];
const CAT_BY = Object.fromEntries(CATALOG.map(x => [x.c, x]));
// words written on aisle signs -> product keywords (from the built-in aisles, plus the catalog)
function aisleKeywords(text) {
  const words = clean(text).split(/[,،;/]|\s+ו(?=[א-ת])|\s+/).map(w => w.trim()).filter(w => w.length > 1);
  const kw = new Set(words);
  for (const s of YOCHANANOF.SECTIONS) if (s.aisle || s.id === "beer") {
    if (words.some(w => s.name.includes(w) || s.kw.some(k => k.includes(w) || w.includes(k)))) s.kw.forEach(k => kw.add(k));
  }
  for (const c of CATALOG) if (words.some(w => c.name.includes(w) || c.kw.some(k => k.startsWith(w) || w.startsWith(k)))) c.kw.forEach(k => kw.add(k));
  return [...kw];
}
const WALL_WORD = { right: "לאורך הקיר הימני", back: "בקיר האחורי", left: "לאורך הקיר השמאלי", front: "באזור הכניסה" };
// spec -> sections, walkways, entrance and checkouts
function generateStore(spec) {
  const N = Math.max(1, Math.min(30, Number(spec.aisles) || 0));
  let pitch = 24; if (150 + N * pitch < 360) pitch = Math.min(44, (360 - 150) / N);
  const AX0 = 82, AX1 = AX0 + N * pitch, LW = 62, RW = AX1 + 20, W = RW + 50;
  const BW = 58, AZ0 = 78, AZ1 = 378, FW = 396, H = 500;
  const entR = spec.entrance !== "left", coL = (spec.checkouts || (entR ? "left" : "right")) === "left";
  const sections = [];
  let order = 1;
  const wallItems = w => (spec.walls && spec.walls[w] || []).filter(x => x && (x.c || x.name));
  const mk = (x, wall, rect, stop) => {
    const cat = x.c && CAT_BY[x.c];
    const name = (x.name || (cat && cat.name) || "מחלקה").slice(0, 40);
    const extra = x.name && cat ? [x.name] : x.name ? aisleKeywords(x.name) : [];
    return { id: "w" + sections.length, wall, name, short: name.length > 16 ? name.slice(0, 15) + "…" : name, where: `${cat ? cat.name : name}, ${WALL_WORD[wall]}`,
      num: x.emoji || (cat && cat.emoji) || "🛒", kind: (cat && cat.kind) || "shelf", cat: x.c || "", rect, stop, order: order++, kw: [...new Set([...(cat ? cat.kw : []), ...extra, name])] };
  };
  // entrance-side wall from the front to the back, the back wall, then the other wall from the back to the front
  const sideWall = (w, front2back) => {
    const list = wallItems(w), n = list.length; if (!n) return;
    const z0 = 40, z1 = AZ1 + 4, seg = (z1 - z0) / n, x = w === "right" ? RW + 18 : 14;
    list.forEach((it, k) => { const idx = front2back ? k : n - 1 - k; const zb = z1 - (idx + 1) * seg;
      sections.push(mk(it, w, [x, zb + 1, 30, seg - 2], [w === "right" ? RW : LW, zb + seg / 2])); });
  };
  const backWall = () => {
    const list = wallItems("back"), n = list.length; if (!n) return;
    const x0 = 14, x1 = W - 14, seg = (x1 - x0) / n;
    list.forEach((it, k) => { const idx = entR ? k : k; const xr = x1 - idx * seg;   // listed from right to left
      sections.push(mk(it, "back", [xr - seg + 1, 14, seg - 2, 26], [Math.min(Math.max(xr - seg / 2, LW), RW), BW])); });
  };
  const aisleSecs = [];
  const xi = i => { const k = (spec.aisle1 === "far") === entR ? i : N + 1 - i; return AX0 + (k - 0.5) * pitch; };   // aisle 1 next to the entrance side unless "far"
  for (let i = 1; i <= N; i++) {
    const a = (spec.aisleCats && spec.aisleCats[i]) || {}, r = (a.right || "").trim(), l = (a.left || "").trim();
    const cats = [r, l].filter(Boolean).join(", ") || "לא סומן";
    const x = xi(i);
    aisleSecs.push({ id: "a" + i, aisle: i, name: `מעבר ${i}: ${cats}`, short: cats.length > 18 ? cats.slice(0, 17) + "…" : cats, num: String(i),
      where: `מעבר ${i}` + (r || l ? ` (${[r && "מימין: " + r, l && "משמאל: " + l].filter(Boolean).join("; ")})` : ""),
      col: [x - pitch / 2 + 3, AZ0, pitch - 6, AZ1 - AZ0], stop: [x, (AZ0 + AZ1) / 2], kind: "aisle", order: 0, sides: { right: r, left: l },
      kw: r || l ? aisleKeywords(r + ", " + l) : [] });
  }
  if (entR) { sideWall("right", true); backWall(); } else { sideWall("left", true); backWall(); }
  // aisles in walking order, snaking from the entrance side
  [...aisleSecs].sort((a, b) => entR ? b.stop[0] - a.stop[0] : a.stop[0] - b.stop[0]).forEach(s => { s.order = order++; sections.push(s); });
  if (entR) sideWall("left", false); else sideWall("right", false);
  { // front area, listed from right to left, between the checkouts and the entrance
    const list = wallItems("front"), n = list.length;
    if (n) { const fx0 = coL ? W * 0.42 : 70, fx1 = coL ? RW - 14 : W * 0.58, seg = (fx1 - fx0) / n;
      list.forEach((it, k) => { const xr = fx1 - k * seg; sections.push(mk(it, "front", [xr - seg + 1, FW + 16, seg - 2, 24], [xr - seg / 2, FW])); }); }
  }
  const corr = [[[LW, BW], [LW, H - 8]], [[RW, BW], [RW, H - 8]], [[LW, BW], [RW, BW]], [[LW, FW], [RW, FW]]];
  for (const s of aisleSecs) corr.push([[s.stop[0], BW], [s.stop[0], FW]]);
  const entrance = [entR ? RW : LW, H - 8], checkout = [coL ? LW : RW, FW + 50];
  const coRect = coL ? [14, FW + 18, W * 0.34, 64] : [W - 14 - W * 0.34, FW + 18, W * 0.34, 64];
  return { sections, corr, entrance, checkout, W, H, pitch, N, AZ0, AZ1, BW, FW, LW, RW, coRect, entR, coL };
}
const TRANS = { "א": "a", "ב": "b", "ג": "g", "ד": "d", "ה": "h", "ו": "v", "ז": "z", "ח": "h", "ט": "t", "י": "y", "כ": "k", "ך": "k", "ל": "l", "מ": "m", "ם": "m", "נ": "n", "ן": "n", "ס": "s", "ע": "a", "פ": "p", "ף": "f", "צ": "tz", "ץ": "tz", "ק": "k", "ר": "r", "ש": "sh", "ת": "t" };
const KNOWN_SLUG = { "רמי לוי": "rami-levy", "שופרסל": "shufersal", "יוחננוף": "yochananof", "ויקטורי": "victory", "אושר עד": "osher-ad", "יינות ביתן": "yenot-bitan", "מגה": "mega", "טיב טעם": "tiv-taam", "חצי חינם": "hatzi-hinam", "קרפור": "carrefour", "באר שבע": "beer-sheva", "דיל": "deal", "אקספרס": "express", "סופר": "super", "מרכז": "merkaz", "קניון": "kanyon" };
const slugify = t => Object.entries(KNOWN_SLUG).reduce((x, [h, l]) => x.split(h).join(" " + l + " "), clean(t)).split("").map(ch => TRANS[ch] || (/[a-z0-9]/i.test(ch) ? ch.toLowerCase() : /\s|-/.test(ch) ? "-" : "")).join("").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "store";
const storeTitle = spec => [spec.chain, spec.branch].filter(Boolean).join(" ") + (spec.city ? ", " + spec.city : "");
function applyStore(spec) {
  const g = generateStore(spec);
  SECTIONS = g.sections; BYID = Object.fromEntries(SECTIONS.map(s => [s.id, s]));
  CORR = g.corr; ENTRANCE = g.entrance; CHECKOUT = g.checkout;
  STORE = { title: storeTitle(spec) || "סניף", generated: true, slug: spec.slug || "", W: g.W, H: g.H, g, spec };
  FULL = [0, 0, g.W, g.H + 30];
  for (const s of SECTIONS) for (const k of s.kw) if (k.includes(" ")) PHRASES.add(k);
  $("storeName").textContent = STORE.title;
  $("map").setAttribute("viewBox", FULL.join(" ")); viewNow = FULL.slice();
  $("map").setAttribute("aria-label", "מפת " + STORE.title + " עם המסלול");
  rebuildPicker(); reset3d();
  items = items.map(it => ({ name: it.name, section: matchSection(it.name) }));
  renderItems(); buildRoute();
}
function reset3d() {
  if (!view3d) return;
  try { cancelAnimationFrame(view3d.raf); view3d.renderer.dispose(); view3d.renderer.domElement.remove(); } catch (e) {}
  view3d = null;
}
// share links carry the whole mapping when there is no server: #store=<compressed JSON>
const b64u = { enc: bytes => btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""),
  dec: s => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), c => c.charCodeAt(0)) };
async function packSpec(spec) {
  const raw = new TextEncoder().encode(JSON.stringify(spec));
  try { const cs = new Blob([raw]).stream().pipeThrough(new CompressionStream("deflate-raw")); return "z" + b64u.enc(new Uint8Array(await new Response(cs).arrayBuffer())); }
  catch (e) { return "j" + b64u.enc(raw); }
}
async function unpackSpec(s) {
  const bytes = b64u.dec(s.slice(1));
  if (s[0] === "z") { const ds = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw")); return JSON.parse(await new Response(ds).text()); }
  return JSON.parse(new TextDecoder().decode(bytes));
}
// usage counter (only on the site, when the server keeps counts)
function hit(ev) {
  if (!STORE.slug || window.claude) return;
  try { fetch("api/hit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug: STORE.slug, ev }), keepalive: true }).catch(() => {}); } catch (e) {}
}
// which store to open: /s/<slug>, ?s=<slug>, or a link that carries the mapping (#store=...)
async function loadStoreFromUrl() {
  const h = new URLSearchParams(location.hash.slice(1)), q = new URLSearchParams(location.search);
  const m = location.pathname.match(/\/s\/([a-z0-9-]+)\/?$/i);
  const slug = (m && m[1]) || q.get("s");
  try {
    if (h.get("store")) { const spec = await unpackSpec(h.get("store")); applyStore(spec); return true; }
    if (slug && !window.claude) {
      const r = await fetch(new URL("api/stores/" + encodeURIComponent(slug), siteBase()), { cache: "no-store" });
      if (!r.ok) throw new Error("not found");
      const spec = await r.json(); spec.slug = spec.slug || slug; applyStore(spec); hit("open"); return true;
    }
  } catch (e) { status("לא הצלחתי לטעון את מפת הסניף מהקישור. מוצגת המפה לדוגמה.", true); }
  return false;
}
// the site's root, also when the page was opened as /s/<slug>
const siteBase = () => location.origin + location.pathname.replace(/\/s\/[^/]*\/?$/, "/").replace(/[^/]*$/, "");

// ---------- Generated stores: directions from the walk itself, and the flat map ----------
function genericTurn(i) {
  const s = stops[i].section;
  if (here && i === cur && here.id === s.id) return "אתה כבר כאן";
  const from = here && i === cur ? here.stop : i === 0 ? ENTRANCE : stops[i - 1].section.stop;
  const p = leg(from, s.stop).filter((q, k, a) => !k || q[0] !== a[k - 1][0] || q[1] !== a[k - 1][1]);
  const dirs = [];
  for (let k = 1; k < p.length; k++) { const dx = Math.sign(p[k][0] - p[k - 1][0]), dy = Math.sign(p[k][1] - p[k - 1][1]); if (dx || dy) { const last = dirs[dirs.length - 1]; if (!last || last[0] !== dx || last[1] !== dy) dirs.push([dx, dy]); } }
  const turns = [];
  for (let k = 1; k < dirs.length; k++) { const c = dirs[k - 1][0] * dirs[k][1] - dirs[k - 1][1] * dirs[k][0]; if (c) turns.push(c > 0 ? "ימינה" : "שמאלה"); }
  const lead = i === 0 ? "מהכניסה, " : "";
  if (s.end) return lead + (turns.length ? `פנה ${turns[0]} והמשך לקופות` : "המשך ישר לקופות");
  if (!turns.length) return lead + "המשך ישר";
  const t = turns.length === 1 ? `פנה ${turns[0]}` : turns[0] === turns[1] ? `פנה ${turns[0]} ושוב ${turns[1]}` : `פנה ${turns[0]} ואז ${turns[1]}`;
  return lead + t + (s.aisle ? ` למעבר ${s.aisle}` : "");
}
function drawGeneric(m, curId) {
  const g = STORE.g, W = g.W, H = g.H;
  m.appendChild(el("rect", { x: 10, y: 10, width: W - 20, height: H - 10, class: "wall", rx: 4 }));
  // aisle shelves and numbers
  for (let k = 0; k <= g.N; k++) { const x = 82 + k * g.pitch; m.appendChild(el("rect", { x: x - 3, y: g.AZ0, width: 6, height: g.AZ1 - g.AZ0, class: "shelf" })); }
  for (const s of SECTIONS) {
    if (s.aisle) {
      const on = s.id === curId, [x, y, w, h] = s.col;
      if (on) m.appendChild(el("rect", { x, y, width: w, height: h, rx: 3, class: "zone on" }));
      m.appendChild(el("circle", { cx: s.stop[0], cy: g.FW - 8, r: 8, class: "zone" + (on ? " on" : "") }));
      m.appendChild(el("text", { x: s.stop[0], y: g.FW - 8, "text-anchor": "middle", "dominant-baseline": "central", class: "lbl" }, String(s.aisle)));
      if (g.pitch >= 20) m.appendChild(el("text", { x: s.stop[0], y: (g.AZ0 + g.AZ1) / 2, "text-anchor": "middle", "dominant-baseline": "central", class: "aisletxt", transform: `rotate(90 ${s.stop[0]} ${(g.AZ0 + g.AZ1) / 2})` }, s.short));
      continue;
    }
    const [x, y, w, h] = s.rect;
    m.appendChild(el("rect", { x, y, width: w, height: h, rx: 4, class: "zone" + (s.id === curId ? " on" : "") }));
    const vertical = h > w * 1.5;
    m.appendChild(el("text", { x: x + w / 2, y: y + h / 2, "text-anchor": "middle", "dominant-baseline": "central", class: "lbl", transform: vertical ? `rotate(90 ${x + w / 2} ${y + h / 2})` : "" }, s.num + " " + s.short));
  }
  const [cx, cy, cw, ch] = g.coRect;
  m.appendChild(el("rect", { x: cx, y: cy, width: cw, height: ch, rx: 4, class: "zone" + (curId === "checkout" ? " on" : "") }));
  m.appendChild(el("text", { x: cx + cw / 2, y: cy + ch / 2, "text-anchor": "middle", "dominant-baseline": "central", class: "lbl" }, "🛒 קופות"));
  m.appendChild(el("text", { x: ENTRANCE[0], y: H + 18, "text-anchor": "middle", class: "lbl" }, "▲ כניסה"));
}


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
let CORR = [[[RIGHT, BACK], [RIGHT, 700]], [[SPINE, BACK], [SPINE, 640]], [[LEFT, BACK], [LEFT, 640]], [[LEFT, BACK], [330, BACK]], [[SPINE, CONNECT], [RIGHT, CONNECT]], [[LEFT, 640], [SPINE, 640]],
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
const maxAisle = () => Math.max(0, ...SECTIONS.filter(s => s.aisle).map(s => s.aisle));
function whereFromWords(w) {
  w = w.replace(/[?.!]/g, "").trim();
  const m = w.match(/^מעבר\s*(.+)$/);
  if (m) { const v = m[1].trim(); const n = /^\d+$/.test(v) ? Number(v) : HEB_NUM[v]; return n >= 1 && n <= maxAisle() ? BYID["a" + n] : null; }
  const id = matchSection(w); return id ? BYID[id] : null;
}

export { SPINE, RIGHT, CONNECT, BACK, LEFT, SECTIONS, BYID, ENTRANCE, CHECKOUT, BACK_ORDER, clean, matchSection, leg, startsKw, PHRASES, segment, splitList, HEB_NUM, whereFromWords };
