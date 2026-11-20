// Opens the site with a list sent from the WhatsApp bot:  /#l=<name~section|name~section...>&at=<section id>
// Loaded after the main script, so it can use its functions (setItems, relocate, BYID...).
(function () {
  const h = new URLSearchParams(location.hash.slice(1));
  const raw = h.get("l");
  if (!raw) return;
  const names = [], secs = [];
  for (const p of raw.split("|").slice(0, 60)) {
    const [name, sec] = p.split("~");
    if (name && name.trim()) { names.push(name.trim().slice(0, 40)); secs.push(sec && BYID[sec] ? sec : null); }
  }
  if (!names.length) return;
  isExample = false;
  setItems(names, secs);
  status(`הרשימה שלך מהוואטסאפ נטענה (${names.length} פריטים). לחץ "התחל ניווט" כשאתה בכניסה לסופר.`);
  const at = BYID[h.get("at")];
  if (at) { here = null; relocate(at); $("whereStatus").textContent = "אתה ב" + at.where + ". המסלול חושב מכאן."; }
})();
