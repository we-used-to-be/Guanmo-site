"use client";

import { motion } from "motion/react";
import { FolderOpen, GitBranch, Lightbulb, Network } from "lucide-react";
import { Reveal } from "./reveal";

const localItems = [
  { label: "本地文件", detail: "快速打开并阅读本地 Markdown", icon: FolderOpen },
  { label: "工作区", detail: "按项目管理你的阅读与创作", icon: GitBranch },
  { label: "知识库", detail: "检索与你当前内容相关的资料", icon: Network },
  { label: "Ollama", detail: "本地模型也可以成为你的助手", icon: Lightbulb },
];

export function LocalSection() {
  return (
    <section className="story-section local-section">
      <div className="section-index">03</div>
      <div className="section-grid section-grid--local">
        <Reveal className="section-intro">
          <p className="section-kicker">本地 / OPEN</p>
          <h2>你的内容，<br />由你选择</h2>
          <p>文件在本地，工作区由你组织。AI 接口也交给你选择和配置。</p>
        </Reveal>

        <div className="local-path" aria-label="本地与自由能力">
          <div className="local-path-heading">
            <span className="path-dot" />
            <span>C:\Users\You\Documents\Guanmo</span>
          </div>
          <motion.ol initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
            {localItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.li key={item.label} variants={{ hidden: { opacity: 0, x: -14 }, visible: { opacity: 1, x: 0 } }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                  <Icon size={16} strokeWidth={1.6} />
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.detail}</small>
                  </span>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
