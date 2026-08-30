# Guanmo site

观墨（Guanmo）开源 Markdown 阅读应用的独立官网。页面采用暖白纸张感、衬线大标题和滚动叙事：首屏展示一张真实软件截图，其余能力用轻量动效表达。

## 本地运行

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

## 检查

```bash
npm run lint
npx tsc --noEmit
npm run build
```

`npm run build` 会生成可部署到静态托管的 `out/` 目录。GitHub Pages 使用项目站点路径构建时，设置 `NEXT_PUBLIC_BASE_PATH=/Guanmo-site`；仓库内的 Actions 工作流已配置好该变量与 Pages artifact 部署。

首次启用时，请在 GitHub 仓库的 Settings → Pages → Build and deployment 中将 Source 设为 GitHub Actions。推送 `master` 后，工作流会自动发布到 `https://we-used-to-be.github.io/Guanmo-site/`。

设计锁定与视觉验收记录见 [`DESIGN.md`](./DESIGN.md) 和 [`design-qa.md`](./design-qa.md)。

官网 CTA 指向 Guanmo 主项目的 [GitHub](https://github.com/we-used-to-be/Guanmo-open) 与 [Windows Releases](https://github.com/we-used-to-be/Guanmo-open/releases/latest)。
