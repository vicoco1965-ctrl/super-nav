// Abuse guards shared by the /api endpoints
const PER_MINUTE = 30;
const hits = new Map(); // key -> [timestamps], per Worker instance (best effort)

export function limited(ip, now = Date.now()) {
  const list = (hits.get(ip) || []).filter(t => now - t < 60_000);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) for (const [k, v] of hits) if (now - v[v.length - 1] > 60_000) hits.delete(k);
  return list.length > PER_MINUTE;
}

// only pages served from this same address may call the paid endpoints
export function sameSite(request, url) {
  const origin = request.headers.get("origin");
  if (origin) return origin === url.origin;
  return request.headers.get("sec-fetch-site") === "same-origin";
}
