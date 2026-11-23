/* 2026-11-22 ウミナゾを「アプリとして インストール」できるように する ための 小さな 見はり番（サービスワーカー）。
   ページを ひらく ときは いつも あたらしい ものを とりに いき（ネット優先）、つながらない ときだけ さいごに ひらいた ものを 出す。
   ほかの 通信には 手を ださない。 */
const CACHE = "umi-page-v1";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || r.mode !== "navigate" || new URL(r.url).origin !== location.origin) return;
  e.respondWith(fetch(r).then(res => { const c = res.clone(); caches.open(CACHE).then(k => k.put(r, c)).catch(() => {}); return res; })
    .catch(() => caches.match(r).then(m => m || caches.match("./"))));
});
