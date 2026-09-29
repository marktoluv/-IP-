# EIRA / 亦岚 · 数字人 IP 作品集

这是一个用于学习真实前端开发流程的数字人品牌展示项目。访客可以了解亦岚的身份与故事、浏览艺术影像和商业概念作品、查看创作能力，并进入联系页面。页面提供中文和英文，适配桌面与手机。

> **作品说明：** 网站中的商业案例是虚构的概念企划，用于展示可能的合作方向，不代表真实品牌委托或已完成的商业合作。

## 快速开始

先准备 Node.js 和 pnpm，在项目根目录运行：

```bash
pnpm install
pnpm dev
```

终端会显示本地地址，通常是 `http://localhost:5173/`。在浏览器打开该地址即可查看网站。停止开发服务器时，在终端按 `Ctrl+C`。

检查交互测试和生产构建：

```bash
npm test
pnpm build
pnpm preview
```

`npm test` 会检查语言切换、作品筛选、页面导航和演示表单；修改 JavaScript 文件后也必须运行它。`pnpm build` 会先检查 TypeScript，再将可部署文件写入 `dist/`；`pnpm preview` 用本地服务器预览这份构建结果。预览地址以终端显示的为准。

## 项目结构

```text
src/
  main.tsx                 React 入口，安装路由并渲染网站
  App.tsx                  页面结构、路由、语言状态与主要区块
  index.css                全局视觉样式、响应式规则与焦点样式
  content/site.ts          中英文文案及作品数据
  components/
    SiteHeader.tsx         桌面与手机导航、语言切换
    WorkGallery.tsx        分类作品墙和作品详情
    ContactPage.tsx        本地验证的演示联系表单
    HeroScene.tsx          首屏的轻量 Three.js 3D 元素
  App.test.tsx             主要访客路径的自动化测试
public/media/              网站图片与已完成的 WebM、MP4 短片
scripts/generate-motion.mjs 可选：重新生成双格式短片的脚本
docs/asset-prompts.md      素材创作说明
vite.config.ts             Vite 与 Tailwind 配置
vitest.config.ts           测试环境配置
```

## 技术如何分工

| 技术 | 在本项目中的作用 |
| --- | --- |
| React + TypeScript | 组合页面与组件，并检查数据类型 |
| Vite | 启动开发服务器、热更新及构建生产文件 |
| Tailwind CSS + `src/index.css` | 布局、颜色、排版和响应式样式 |
| Three.js | 在支持 WebGL 的桌面设备上绘制首屏 3D 装饰；不可用时保留完整肖像首屏 |
| React Router | 在首页 `/` 与联系页 `/contact` 之间导航 |
| Vitest + Testing Library | 从访客操作角度验证关键交互 |

## 修改内容与作品

大部分文字位于 `src/content/site.ts` 的 `copy.zh` 和 `copy.en`。修改一个栏目时，记得同步检查两种语言。Hero 图片路径和替代文字也在这里；页面上固定显示的“EIRA / 亦岚”标识则在 `src/App.tsx` 与 `src/components/SiteHeader.tsx`。

作品列表是同一文件中的 `works` 数组。每件作品需要唯一的 `id`、分类 `art` / `motion` / `concept`、图片路径，以及中英文标题、类型和简介。把新图片或视频放入 `public/media/`，再用 `/media/文件名` 引用；动态作品可以另外填写 `video` 路径。新增概念作品时，请继续明确标注其虚构性质。

`public/media/eira-motion.webm`（VP9）和 `public/media/eira-motion.mp4`（H.264）是同一段 8 秒无声影像的两种浏览器播放格式。网站运行与测试不需要重新生成它们。如果要运行可选的 `node scripts/generate-motion.mjs`，需自行提供 FFmpeg：把 `ffmpeg` 加入系统 `PATH`，或设置环境变量 `FFMPEG_PATH` 指向可执行文件。脚本会根据现有图片覆盖生成这两个文件；FFmpeg 只用于生成素材，不会进入网站的运行依赖。

联系页目前是**演示表单**：它只在浏览器本地检查必填项和邮箱格式，成功后显示提示，不会发送或保存填写的信息。若将来用于真实询盘，需要另行接入后端服务并补充隐私说明。

## 可以继续做什么

- 接入真实的合作询盘服务，并提供提交状态和隐私说明。
- 用内容管理系统维护作品，减少直接修改代码的次数。
- 为短片增加多码率版本、海报图和 CDN 分发。
- 增加作品详情页、品牌合作资料包和更完善的多语言 SEO。
