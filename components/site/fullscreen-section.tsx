import { Reveal } from "./reveal";

export function FullscreenSection() {
  return (
    <section className="story-section fullscreen-section" aria-labelledby="fullscreen-title">
      <div className="section-index">02</div>
      <div className="fullscreen-layout">
        <Reveal className="section-intro">
          <p className="section-kicker">全屏 / FOCUS</p>
          <h2 id="fullscreen-title">把干扰留在<br />视线之外</h2>
          <p>按 F11 或点击全屏按钮，隐藏标题栏与侧边栏，让 Markdown 内容占据整块屏幕。鼠标移至屏幕顶部，可唤起隐藏式控制条，快速切换视图或文件。</p>
        </Reveal>

        <Reveal className="fullscreen-stage" delay={0.1}>
          <div className="fullscreen-stage-meta">
            <span><i className="fullscreen-status-dot" />FOCUS MODE</span>
            <span>F11 / ON</span>
          </div>
          <div className="fullscreen-visual" aria-label="全屏阅读抽象示意">
            <div className="fullscreen-visual-frame" aria-hidden="true">
              <div className="fullscreen-visual-bar">
                <span className="fullscreen-control" />
                <span className="fullscreen-control fullscreen-control--active" />
                <span className="fullscreen-keycap">F11</span>
              </div>
              <div className="fullscreen-visual-content">
                <span className="fullscreen-content-line fullscreen-content-line--title" />
                <span className="fullscreen-content-line" />
                <span className="fullscreen-content-line fullscreen-content-line--short" />
              </div>
              <span className="fullscreen-visual-label">CONTENT FIRST</span>
            </div>
          </div>
          <div className="fullscreen-stage-note">
            <span>hidden top bar · hover to reveal</span>
            <span>fullscreen reading</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
