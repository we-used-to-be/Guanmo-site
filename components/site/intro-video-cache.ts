const cacheName = "guanmo-intro-video";
const maxAge = 30 * 24 * 60 * 60 * 1000;

// 完整响应转为 Blob 播放，避免 video 的 Range 请求绕过持久缓存。
export async function getCachedIntroVideo(url: string): Promise<Blob | null> {
  try {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(url);
    const age = Date.now() - Number(cached?.headers.get("x-guanmo-cached-at"));
    if (cached && age >= 0 && age < maxAge) return await cached.blob();

    const response = await fetch(url);
    if (response.status !== 200) return null;
    const blob = await response.blob();
    try {
      await cache.put(url, new Response(blob, {
        headers: {
          "content-type": "video/mp4",
          "x-guanmo-cached-at": String(Date.now()),
        },
      }));
      // 只清理本站这个视频的旧版本，不触及其他缓存。
      for (const key of await cache.keys()) {
        if (key.url !== new URL(url, window.location.href).href) await cache.delete(key);
      }
    } catch {
      // 空间不足或缓存不可写时，本次下载仍能直接播放。
    }
    return blob;
  } catch {
    // 禁用存储、不支持 Cache API 或下载失败时保留原生 video 路径。
    return null;
  }
}
