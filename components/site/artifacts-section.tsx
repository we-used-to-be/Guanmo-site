import { Reveal } from "./reveal";

export function ArtifactsSection() {
  return (
    <section className="story-section artifacts-section" aria-labelledby="artifacts-title">
      <div className="section-index">04</div>
      <div className="section-grid section-grid--artifacts">
        <Reveal className="section-intro">
          <p className="section-kicker">批注 / KEEP</p>
          <h2 id="artifacts-title">读过的，<br />留下来</h2>
          <p>在预览中选中一句话，留下高亮或写下批注。自己的标记与保存的 AI 成果一起进入阅读成果中心，方便日后重读。</p>
        </Reveal>

        <Reveal className="artifacts-stage" delay={0.1}>
          <div className="artifacts-essay">
            <p className="artifacts-essay-label">一段值得留下的文字</p>
            <blockquote>
              阅读的意义，不只在于读完，<mark>也在于把触动自己的地方留给下一次相遇。</mark>
            </blockquote>
            <p className="artifacts-margin-note"><span>我的批注</span>这里值得再想一想。</p>
          </div>
          <div className="artifacts-index">
            <span>高亮 · 批注 · AI 成果</span>
            <p>在「最近」或「按文档」中查找、筛选，再回到原文。</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
