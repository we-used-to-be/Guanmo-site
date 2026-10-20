"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { promoVideo } from "./promo-video-config";

const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const motionQuery = "(prefers-reduced-motion: reduce)";
const subscribeMotion = (notify: () => void) => {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};
const getReducedMotion = () => window.matchMedia(motionQuery).matches;
const getServerReducedMotion = () => true;

export function PromoVideo() {
  // 服务端与首次 hydration 都先显示封面，避免媒体偏好造成元素不匹配。
  const reduced = useSyncExternalStore(subscribeMotion, getReducedMotion, getServerReducedMotion);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opened, setOpened] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const hasVideo = /^BV[0-9A-Za-z]{10}$/.test(promoVideo.bvid);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced !== false || opened || unavailable) return;

    let visible = false;
    let disposed = false;
    const updatePlayback = () => {
      if (!visible || document.hidden) {
        video.pause();
        return;
      }
      if (video.ended) return;
      if (!video.getAttribute("src")) {
        video.src = `${assetBasePath}/assets/guanmo-intro.mp4`;
      }
      void video.play().catch(() => {
        // 离开视口导致的中断不应被视为自动播放失败。
        if (!disposed && visible && !document.hidden) setUnavailable(true);
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      updatePlayback();
    }, { threshold: 0.25 });
    observer.observe(video);
    document.addEventListener("visibilitychange", updatePlayback);
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      video.pause();
    };
  }, [reduced, opened, unavailable]);

  const playerParams = new URLSearchParams({
    bvid: promoVideo.bvid,
    t: String(promoVideo.startSeconds),
    autoplay: "1",
    muted: "1",
    danmaku: "0",
  });

  return (
    <div className="promo-video">
      {opened && hasVideo ? (
        <iframe
          src={`https://player.bilibili.com/player.html?${playerParams}`}
          title="观墨产品演示完整版"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          {unavailable || reduced ? (
            <Image
              src={`${assetBasePath}/assets/guanmo-intro-poster.jpg`}
              alt="观墨产品演示：轻量、高效、AI 加持"
              width={1920}
              height={1080}
              sizes="(max-width: 720px) calc(100vw - 42px), 1100px"
            />
          ) : <video
            ref={videoRef}
            poster={`${assetBasePath}/assets/guanmo-intro-poster.jpg`}
            width={1920}
            height={1080}
            muted
            playsInline
            preload="none"
            aria-label="观墨产品演示开场：轻量、高效、AI 加持"
            onError={() => setUnavailable(true)}
          >
            观墨：让 Markdown 阅读更轻松、更高效。
          </video>}
          {hasVideo && (
            <button className="promo-video-play" type="button" onClick={() => setOpened(true)}>
              <Play size={16} aria-hidden="true" />
              继续观看
            </button>
          )}
        </>
      )}
    </div>
  );
}
