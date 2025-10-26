self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
const CACHE = "omni-shell-v2";
const SHELL = ["/","/planner","/habits","/study","/scripts","/resume","/manifest.webmanifest"];
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c)=>c.addAll(SHELL)));
});
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith("/api/")) return;
  event.respondWith(
    caches.match(event.request).then((hit) =>
      hit || fetch(event.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c)=>c.put(event.request, copy));
        return res;
      }).catch(()=> caches.match("/"))
    )
  );
});
