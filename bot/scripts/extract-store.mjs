// Copies the store map and the list parser out of site/index.html into bot/src/store-core.js,
// so the bot and the site always use the same aisles, keywords and list splitting.
// Run: node bot/scripts/extract-store.mjs   (the test fails if the file is out of date)
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export function buildCore(html) {
  const cut = (from, to) => {
    const a = html.indexOf(from), b = html.indexOf(to, a + 1);
    if (a < 0 || b < 0) throw new Error(`marker not found: ${a < 0 ? from : to}`);
    return html.slice(a, b).trimEnd();
  };
  const parts = [
    cut("const SPINE", "// ---------- State"),
    cut("// corridors the customer walks", "const pts ="),
    cut("// true when a known product word", "// Speech -> list"),
    cut("const HEB_NUM", "(function buildPicker"),
  ];
  return `// GENERATED from site/index.html by bot/scripts/extract-store.mjs. Do not edit by hand.\n` +
    parts.join("\n\n") +
    `\n\nexport { SPINE, RIGHT, CONNECT, BACK, LEFT, SECTIONS, BYID, ENTRANCE, CHECKOUT, BACK_ORDER, clean, matchSection, leg, startsKw, PHRASES, segment, splitList, HEB_NUM, whereFromWords };\n`;
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const out = buildCore(readFileSync(join(root, "site", "index.html"), "utf8"));
  writeFileSync(join(root, "bot", "src", "store-core.js"), out);
  console.log("wrote bot/src/store-core.js");
}
