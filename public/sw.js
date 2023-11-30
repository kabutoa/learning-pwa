const CACHE_NAME = "cache_v1";
const URLS = [
  "/",
  "/index.css",
  "/manifest.json",
  "/images/search.png",
  "/images/icons/book-32.png",
  "/images/icons/book-72.png",
  "/images/icons/book-128.png",
  "/images/icons/book-144.png",
  "/images/icons/book-192.png",
  "/images/icons/book-512.png",
  "/lib/vue.js",
  "/lib/axios.js",
  "/api/articles",
];
// 缓存优先
const cacheFirst = async (req) => {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(req);
  if (cached) {
    return cached;
  }
  const fresh = await fetch(req);
  return fresh;
};
// 网络优先
const networkFirst = async (req) => {
  const cache = await caches.open(CACHE_NAME);
  try {
    const fresh = await fetch(req);
    cache.put(req, fresh.clone());
    return fresh;
  } catch {
    const cached = await cache.match(req);
    return cached;
  }
};

// 缓存
self.addEventListener("install", async (event) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(URLS);
  await self.skipWaiting();
});

self.addEventListener("activate", async () => {
  const keys = await caches.keys();
  keys.forEach((key) => {
    if (key !== CACHE_NAME) {
      caches.delete(key);
    }
  });
  await self.clients.claim();
});

self.addEventListener("fetch", async (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (url.origin !== self.origin) {
    return;
  }
  if (req.url.includes("/api")) {
    e.respondWith(networkFirst(req));
  } else {
    e.respondWith(cacheFirst(req));
  }
});
