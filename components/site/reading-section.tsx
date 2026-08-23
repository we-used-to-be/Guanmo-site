"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Reveal } from "./reveal";

export function ReadingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const viewportTop = useTransform(scrollYProgress, [0.08, 0.8], ["8%", "62%"]);

  return (
    <section className="story-section reading-section" id="features" ref={sectionRef}>
      <div className="section-index">01</div>
      <div className="section-grid">
        <Reveal className="section-intro">
          <p className="section-kicker">阅读 / FOCUS</p>
          <h2>长文档，<br />也能读得轻松</h2>
          <p>全文先建立预览模型，只挂载视区附近的内容。首屏 DOM 不随文档长度线性增长，滚动时局部块按需更新。</p>
        </Reveal>

        <div className="reading-stage reading-stage--virtual" aria-label="虚拟化预览局部渲染示意">
          <Reveal delay={0.1}>
            <div className="virtual-stage-meta">
              <span><i className="virtual-status-dot" />MarkdownPreviewModel</span>
              <span>全文结构 / blocks</span>
            </div>
            <div className="virtual-stage">
              <div className="virtual-model-column" aria-hidden="true">
                <span className="virtual-model-label">FULL DOCUMENT</span>
                {Array.from({ length: 12 }, (_, index) => (
                  <span className="virtual-model-line" key={index} style={{ width: `${54 + ((index * 17) % 39)}%` }} />
                ))}
              </div>
              <motion.div className="virtual-viewport" style={{ top: reduced ? "62%" : viewportTop }}>
                <span className="virtual-viewport-label">VISIBLE RANGE</span>
                <span className="virtual-visible-block virtual-visible-block--heading" />
                <span className="virtual-visible-block" />
                <span className="virtual-visible-block virtual-visible-block--short" />
              </motion.div>
              <div className="virtual-side-note">
                <span className="virtual-side-rule" />
                <span>只渲染可视区<br />附近的块</span>
              </div>
            </div>
            <div className="virtual-stage-readout">
              <span>model → viewport → local render</span>
              <span>overscan: nearby blocks</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
