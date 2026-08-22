"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Reveal } from "./reveal";

export function ReadingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const lineWidth = useTransform(scrollYProgress, [0.08, 0.8], ["8%", "100%"]);
  const dotLeft = useTransform(scrollYProgress, [0.08, 0.8], ["8%", "100%"]);

  return (
    <section className="story-section reading-section" id="features" ref={sectionRef}>
      <div className="section-index">01</div>
      <div className="section-grid">
        <Reveal className="section-intro">
          <p className="section-kicker">阅读 / FOCUS</p>
          <h2>阅读，<br />从一条线开始</h2>
          <p>横向展开，专注当下。让目录、长文档和阅读位置都保持清晰。</p>
        </Reveal>

        <div className="reading-stage" aria-label="阅读进度动效示意">
          <Reveal delay={0.1}>
            <div className="reading-stage-heading">
              <span className="syntax-mark">#</span>
              <span>把注意力留给内容</span>
            </div>
            <div className="reading-stage-copy">
              <span>真正的生产力，</span>
              <span className="reading-highlight">来自对注意力的分配。</span>
            </div>
          </Reveal>
          <div className="progress-rail" aria-hidden="true">
            <motion.div className="progress-rail-fill" style={{ width: lineWidth }} />
            <motion.span className="progress-dot" style={{ left: reduced ? "100%" : dotLeft }} />
          </div>
          <div className="reading-outline" aria-hidden="true">
            <span># 章节标题</span>
            <span>## 小节标题</span>
            <span>### 更小的标题</span>
          </div>
        </div>
      </div>
    </section>
  );
}
