import { ArrowDownToLine, Code2 } from "lucide-react";

const downloadUrl = "https://github.com/we-used-to-be/Guanmo-open/releases/latest";
const githubUrl = "https://github.com/we-used-to-be/Guanmo-open";

export function Footer() {
  return (
    <footer className="site-footer" id="download">
      <div className="footer-cta">
        <p className="eyebrow">READY TO READ</p>
        <h2>开始你的 Markdown 阅读之旅</h2>
        <p>简单、专注、可扩展。让阅读回归内容本身。</p>
        <div className="hero-actions">
          <a className="button button--solid" href={downloadUrl} target="_blank" rel="noreferrer">
            <ArrowDownToLine size={16} strokeWidth={1.8} />
            下载 Windows 版
          </a>
          <a className="button button--quiet" href={githubUrl} target="_blank" rel="noreferrer">
            <Code2 size={16} strokeWidth={1.8} />
            在 GitHub 查看源码
          </a>
        </div>
      </div>
      <div className="footer-meta">
        <span>观墨 Guanmo · Open Source</span>
        <span>MIT License · GitHub</span>
      </div>
    </footer>
  );
}
