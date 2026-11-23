import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildCore, buildDistances } from "../scripts/extract-store.mjs";
import { handle, navLink, unknownNames } from "../src/bot.js";
import { parseCommand, textToItems } from "../src/route.js";

const O = "https://bot.example";
const run = (msgs, start) => { let st = start || null, now = 1e12, out = []; for (const [t, src] of msgs) { const r = handle(st, t, { now: now += 1000, origin: O, source: src || "text" }); st = r.state; out = r.replies; } return { st, out }; };

test("store-core.js matches site/index.html (run npm run sync-store)", () => {
  const html = readFileSync(new URL("../../site/index.html", import.meta.url), "utf8");
  assert.equal(readFileSync(new URL("../src/store-core.js", import.meta.url), "utf8"), buildCore(html));
});

test("distances.js matches the map (run npm run sync-store)", async () => {
  const want = await buildDistances(new URL("../src/store-core.js", import.meta.url).href);
  assert.equal(readFileSync(new URL("../src/distances.js", import.meta.url), "utf8"), want);
});

test("run-on Hebrew list with no separators", () => {
  const names = textToItems("חלב לחם שמן זית נייר טואלט 2 קילו עגבניות ובמבה").map(i => i.name);
  assert.deepEqual(names, ["חלב", "לחם", "שמן זית", "נייר טואלט", "2 קילו עגבניות", "במבה"]);
});

test("filler words are dropped", () => {
  const names = textToItems("אני צריך חלב וגם לחם בבקשה").map(i => i.name);
  assert.deepEqual(names, ["חלב", "לחם"]);
});

test("commands", () => {
  assert.equal(parseCommand("היי").type, "help");
  assert.equal(parseCommand("אני במעבר 8").section.id, "a8");
  assert.equal(parseCommand("אני במעבר שמונה").section.id, "a8");
  assert.equal(parseCommand("אני ליד החלב").section.id, "dairy");
  assert.equal(parseCommand("8").section.id, "a8");
  assert.equal(parseCommand("איפה הטחינה?").type, "ask");
  assert.equal(parseCommand("איפה הטחינה?").phrase, "טחינה");
  assert.equal(parseCommand("אני צריך חלב").type, "ask"); // not "I'm at the dairy"
  assert.equal(parseCommand("הבא").type, "next");
  assert.equal(parseCommand("רשימה חדשה").type, "reset");
});

test("list -> route text + navigation button with the list in the link", () => {
  const { st, out } = run([["חלב, לחם, במבה, שמפו"]]);
  assert.equal(st.stops.length, 4);
  assert.match(out[0].text, /המסלול שלך/);
  assert.equal(out[1].type, "cta");
  const l = decodeURIComponent(new URL(out[1].url).hash.slice(3));
  assert.ok(l.includes("חלב~dairy") && l.includes("במבה~a4"));
});

test("'I'm in aisle 8' re-plans from there; 'next' walks the stops; done at the end", () => {
  let { st, out } = run([["חלב, לחם, במבה, שמפו, טונה"], ["אני במעבר 8"]]);
  assert.equal(st.here, "a8");
  assert.match(out[0].text, /חישבתי את המסלול מחדש/);
  for (let i = 0; i < 5; i++) ({ st, out } = run([["הבא"]], st));
  assert.match(out[0].text, /סיימת את כל הרשימה/);
});

test("'where is' answers and adds to the list as the next stop", () => {
  let { st } = run([["חלב, במבה"], ["הבא"]]);
  const r = handle(st, "איפה הטונה?", { now: 1e12 + 9000, origin: O });
  assert.match(r.replies[0].text, /טונה: מעבר 6/);
  assert.equal(r.state.stops[r.state.cur].id, "a6");
});

test("a new list after 6 hours replaces the old one; within the trip it adds", () => {
  let { st } = run([["חלב"]]);
  let r = handle(st, "במבה", { now: 1e12 + 5000, origin: O });
  assert.equal(r.state.stops.length, 2);
  r = handle(st, "במבה", { now: 1e12 + 7 * 3600e3, origin: O });
  assert.equal(r.state.stops.length, 1);
});

test("AI hints place unknown products", () => {
  assert.deepEqual(unknownNames("חלב, מטריה", "text"), ["מטריה"]);
  const r = handle(null, "חלב, מטריה", { now: 1e12, origin: O, hints: { "מטריה": "home" } });
  assert.ok(r.state.stops.some(s => s.id === "home" && s.items.includes("מטריה")));
});

test("photo text is always a list", () => {
  const r = handle(null, "רשימה\nחלב\nלחם", { now: 1e12, origin: O, source: "photo" });
  assert.equal(r.state.stops.length, 2);
});

test("aisle number before a list is used as the starting point", () => {
  const { st, out } = run([["אני במעבר 3"], ["קורנפלקס, יין, עגבניות"]]);
  assert.equal(st.here, "a3");
  assert.match(out[0].text, /המסלול מכאן/);
  assert.match(navLink(O, st), /&at=a3$/);
});

test("AI answers in different shapes are parsed", async () => {
  const { parseItems } = await import("../src/ai-parse.js");
  assert.deepEqual(parseItems({ response: 'Sure! ```json\n{"items":[{"name":"חלב","section":"dairy"},{"name":"קפה","section":"bogus"}]}\n```' }),
    [{ name: "חלב", section: "dairy" }, { name: "קפה", section: null }]);
  assert.deepEqual(parseItems({ response: { items: [{ name: "לחם", section: "bakery" }] } }), [{ name: "לחם", section: "bakery" }]);
  assert.deepEqual(parseItems({ choices: [{ message: { content: '{"items":[]}' } }] }), []);
  assert.deepEqual(parseItems({ response: "no json here" }), []);
});

test("paid endpoints only answer the site itself", async () => {
  const { sameSite } = await import("../src/guard.js");
  const url = new URL("https://super-nav.x.workers.dev/api/claude");
  const req = h => ({ headers: new Headers(h) });
  assert.equal(sameSite(req({ origin: "https://super-nav.x.workers.dev" }), url), true);
  assert.equal(sameSite(req({ origin: "https://evil.example" }), url), false);
  assert.equal(sameSite(req({ "sec-fetch-site": "same-origin" }), url), true);
  assert.equal(sameSite(req({}), url), false);
});
