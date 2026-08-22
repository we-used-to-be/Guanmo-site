"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "./reveal";

const faqs = [
  { question: "观墨和 Typora / VS Code 有什么区别？", answer: "观墨更专注于 Markdown 的阅读与理解：它保留编辑能力，同时提供全屏阅读、预览内编辑、选区提问、知识库和阅读成果整理。" },
  { question: "观墨免费吗？", answer: "观墨是 MIT 许可证下的开源项目。Windows 安装包可以从 GitHub Releases 获取。" },
  { question: "支持本地 AI 模型吗？", answer: "支持。观墨支持 OpenAI 兼容接口，也可以配置 Ollama 等本地模型服务。" },
  { question: "我的文档会上传到观墨服务器吗？", answer: "观墨开发者不运营接收用户文档、知识库或聊天内容的服务器。使用远程 AI、Embedding 或联网搜索时，请求所需内容会发送给你选择的服务商；Markdown 本地阅读与编辑不依赖这些服务。" },
  { question: "支持哪些平台？", answer: "当前提供 Windows 预编译版本；网页版可体验基础 Markdown 阅读与编辑。macOS 暂无预编译版本。" },
];

export function FaqSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="story-section faq-section" id="faq">
      <div className="section-index">05</div>
      <div className="faq-layout">
        <Reveal className="section-intro">
          <p className="section-kicker">常见问题 / FAQ</p>
          <h2>常见问题</h2>
          <p>把真正影响选择的几个问题，留在这里。</p>
        </Reveal>

        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = active === index;
            return (
              <div className={`faq-item ${isOpen ? "faq-item--open" : ""}`} key={faq.question}>
                <button type="button" className="faq-trigger" aria-expanded={isOpen} onClick={() => setActive(isOpen ? null : index)}>
                  <span>{faq.question}</span>
                  <ChevronDown size={17} strokeWidth={1.6} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div className="faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                      <p>{faq.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
