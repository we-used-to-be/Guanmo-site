"use client";

import Image from "next/image";
import { ArrowDownToLine, Code2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const downloadUrl = "https://github.com/we-used-to-be/Guanmo-open/releases/latest";
const githubUrl = "https://github.com/we-used-to-be/Guanmo-open";
const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <motion.p className="eyebrow" initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.5 }}>
          Guanmo / OPEN SOURCE
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: reduced ? 0 : 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>
          阅读 Markdown，<br />本该如此轻松
        </motion.h1>
        <motion.p className="hero-lede" initial={{ opacity: 0, y: reduced ? 0 : 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.6, delay: 0.16 }}>
          观墨是一款面向阅读体验的开源 Markdown 桌面应用，<br className="desktop-only" />
          让文档更易阅读、更易理解，也更易继续创作。
        </motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.5, delay: 0.25 }}>
          <a className="button button--solid" href={downloadUrl} target="_blank" rel="noreferrer">
            <ArrowDownToLine size={16} strokeWidth={1.8} />
            下载 Windows 版
          </a>
          <a className="button button--quiet" href={githubUrl} target="_blank" rel="noreferrer">
            <Code2 size={16} strokeWidth={1.8} />
            在 GitHub 查看
          </a>
        </motion.div>
      </div>

      <motion.div className="hero-screenshot-wrap" initial={{ opacity: 0, y: reduced ? 0 : 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
        <Image
          className="hero-screenshot"
          src={`${assetBasePath}/assets/guanmo-main-warm.png`}
          alt="观墨暖色主题主界面，展示 Markdown 阅读与 AI 助手"
          width={2878}
          height={1697}
          sizes="(max-width: 720px) calc(100vw - 32px), 1120px"
        />
      </motion.div>

      <p className="hero-note">Windows 预编译版本 · 长文档虚拟化预览 · F11 全屏阅读 · AI 即选即问</p>
    </section>
  );
}
