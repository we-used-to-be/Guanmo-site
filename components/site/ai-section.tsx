"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "./reveal";

export function AiSection() {
  const reduced = useReducedMotion();

  return (
    <section className="story-section ai-section">
      <div className="section-index">02</div>
      <div className="section-grid section-grid--ai">
        <Reveal className="section-intro">
          <p className="section-kicker">选中 / ASK</p>
          <h2>选中即洞察</h2>
          <p>选中文本，马上提问。AI 只在你需要它时出现，帮你把上下文接起来。</p>
        </Reveal>

        <div className="selection-stage">
          <Reveal delay={0.08}>
            <p className="selection-copy">
              在知识的海洋里，我们常常需要一座灯塔。选中文本后，
              <motion.span className="selection-highlight" initial={{ backgroundSize: "0% 100%" }} whileInView={{ backgroundSize: "100% 100%" }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: reduced ? 0 : 1, delay: 0.25, ease: "easeOut" }}>
                灵感与理解就即点亮，问题有了方向，阅读不再孤单。
              </motion.span>
            </p>
            <div className="margin-note">
              <span className="margin-note-line" />
              <span>选中文本，<br />马上提问</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
