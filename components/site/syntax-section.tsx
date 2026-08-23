"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Reveal } from "./reveal";

const syntaxItems = [["#", "标题"], [">", "引用"], ["`code`", "代码"], ["∑", "公式"], ["⌁", "图表"]];

export function SyntaxSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.75], ["0%", "100%"]);

  return (
    <section className="story-section syntax-section" ref={sectionRef}>
      <div className="section-index">05</div>
      <div className="section-grid section-grid--syntax">
        <Reveal className="section-intro">
          <p className="section-kicker">语法 / NATIVE</p>
          <h2>语法，<br />是结构的美学</h2>
          <p>代码、公式、图表，各自归位。Markdown 的原生能力也可以很从容。</p>
        </Reveal>

        <div className="syntax-stage" aria-label="Markdown 原生能力动效示意">
          <div className="syntax-items">
            {syntaxItems.map(([mark, label], index) => (
              <Reveal key={label} delay={index * 0.06}>
                <span className="syntax-item-mark">{mark}</span>
                <span className="syntax-item-label">{label}</span>
              </Reveal>
            ))}
          </div>
          <div className="syntax-rail" aria-hidden="true">
            <motion.div className="syntax-rail-fill" style={{ width: reduced ? "100%" : lineWidth }} />
            <motion.span className="syntax-cursor" style={{ left: reduced ? "100%" : lineWidth }} />
          </div>
          <p className="syntax-caption">目录导航 · 搜索 · 快捷键 · 自定义主题</p>
        </div>
      </div>
    </section>
  );
}
