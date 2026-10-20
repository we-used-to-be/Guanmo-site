# Guanmo site

观墨（Guanmo）开源 Markdown 阅读应用的独立官网。页面采用暖白纸张感、衬线大标题和滚动叙事：首屏展示产品视频开场，其余能力用轻量动效表达。

## 首屏宣传视频

- `public/assets/guanmo-intro.mp4`：从 `guanmo-native-v7.mp4` 裁取前 3 秒，1080p / 30fps / H.264，无音轨，已做 faststart 优化。进入可视区域后播放一次，结束停留末帧；离开视口或切换标签页暂停。
- `public/assets/guanmo-intro-poster.jpg`：开场末帧封面。减少动态效果、自动播放失败时展示静态封面。
- 完整版 B 站视频为 `BV1BRJd6rEqR`，集中配置在 `components/site/promo-video-config.ts`；`startSeconds: 3` 表示从 3 秒处起播。清空 BV 号可隐藏「继续观看」。
- 点击「继续观看」才创建 B 站 iframe，此前不请求 B 站资源；完整版不进入网站仓库。桌面 Edge 已验证点击前无 B 站请求，点击后从约 3 秒处静音起播。外嵌画质由 B 站控制，手机端播放尚待实测。

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

导航栏 Star 数在 Actions 构建时使用内置 `GITHUB_TOKEN` 获取，通过 `NEXT_PUBLIC_GITHUB_STARS` 写入静态页面；浏览器不请求 GitHub API，也不接收 Token。本地未设置该变量时显示普通 GitHub 链接。获取失败或数据无效时，本次部署停止，线上版本不变。

同一工作流还会在北京时间每周一、四 09:37 自动刷新 Star 数并重新部署，无需产生数据提交。定时任务仅运行于默认分支，GitHub 可能延迟执行；公开仓库连续 60 天无活动时，定时工作流会被自动停用，需要在 Actions 中重新启用。

设计锁定与视觉验收记录见 [`DESIGN.md`](./DESIGN.md) 和 [`design-qa.md`](./design-qa.md)。

官网 CTA 指向 Guanmo 主项目的 [GitHub](https://github.com/we-used-to-be/Guanmo-open) 与 [Windows Releases](https://github.com/we-used-to-be/Guanmo-open/releases/latest)。
