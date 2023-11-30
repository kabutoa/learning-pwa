const CACHE_NAME = "cache_v1";
const URLS = [
  "/", // => 指向index.html
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
  // 查询缓存
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
    // 必须创建副本
    cache.put(req, fresh.clone());
    return fresh;
  } catch {
    const cached = await cache.match(req);
    return cached;
  }
};

// 添加缓存
self.addEventListener("install", async (event) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(URLS);
  // 触发activate事件
  await self.skipWaiting();
});
// 删除旧缓存
self.addEventListener("activate", async () => {
  const keys = await caches.keys();
  await Promise.all(
    keys.map((key) => {
      if (key !== CACHE_NAME) {
        // 返回 promise
        return caches.delete(key);
      }
    })
  );
  // 使service worker立即生效
  await self.clients.claim();
});
// 处理缓存
self.addEventListener("fetch", async (e) => {
  const req = e.request;
  const url = new URL(req.url);
  // 只缓存同源资源
  if (url.origin !== self.origin) {
    return;
  }
  // 接口资源走网络优先
  if (req.url.includes("/api")) {
    // 结果返回给浏览器
    e.respondWith(networkFirst(req));
  } else {
    e.respondWith(cacheFirst(req));
  }
});
