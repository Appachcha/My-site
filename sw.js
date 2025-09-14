self.addEventListener("install", e=>{
  e.waitUntil(caches.open("shoe-cache").then(c=>{
    return c.addAll(["./admin.html","./catalog.html","./db.js"]);
  }));
});
self.addEventListener("fetch", e=>{
  e.respondWith(caches.match(e.request).then(resp=>resp||fetch(e.request)));
});