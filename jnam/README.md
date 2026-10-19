# POKEZZLEE — 静态站复刻

参考 `pokedorango.com` 的结构与视觉语言重建的纯静态站点，无构建步骤、无第三方依赖，双击 `index.html` 即可打开。

## 目录

```
10-19web/
├─ index.html          首页（hero 轮播 + 4 个剧集分区 + 下载横幅 + 页脚）
├─ app/
│  └─ index.html       App 页（手机组图 + 下载面板）
├─ styles.css          全站样式（含响应式）
├─ site.js             轮播 + CTA 统一出口 k2()
└─ assets/
   ├─ icons/pokezzlee-app-icon.png
   ├─ images/app-phones.webp    App 页手机组图
   └─ posters/                  50 张剧集封面（webp，600×780）
```

## 行动号召（CTA）

全站所有 CTA 按钮都带 `data-k2="<来源>"`，点击后统一进入 `site.js` 里的 `k2()`，由它跳转到 `qq.com`：

```js
var K2_URL = "https://qq.com/";

window.k2 = function k2(source) { ... window.location.href = K2_URL; };
```

- 改落地页只需改 `K2_URL` 一处，全站 CTA 同步生效。
- 跳转前会派发 `k2:go` 事件（`detail = { source, url }`），需要埋点或按来源分流时监听这个事件即可，不必改各个按钮。
- 当前 CTA 来源标记：`header`（顶栏）、`strip`（页尾下载横幅）、`mobile-bar`（移动端底栏）、`panel`（App 页下载面板）。新增按钮时加 `data-k2="xxx"` 就自动纳入。

## 已实现

- **无限循环轮播**：首尾克隆实现双向无缝滑动，自动播放、前后箭头、圆点、`1 / 5` 计数、暂停键、键盘左右方向键、触摸滑动；`prefers-reduced-motion` 下自动停播。
- **响应式**：1600+ / 1100 / 760 / 480 / 350 五档断点。≤760px 顶栏变两行、隐藏头部 CTA、出现底部固定 CTA 条；≤480px 海报网格 3 列、星级卡 1 列。
- **单语言**：全站只有英文，`<html lang="en">`，无语言切换器、无 RTL 分支。
- **可访问性**：跳转链接、`aria-roledescription` 轮播语义、非活动幻灯片 `inert`、焦点可见样式、`sr-only` 标题。

## 说明

- **图片素材直接取自 `pokedorango.com` 线上资源**（50 张封面 + App 图标 + 手机组图），路径与文件命名已本地化到 `assets/`，页面不再依赖外链。
- 这些图片的著作权归原站及其剧集版权方所有。本地复刻仅作预览/开发用途，**对外上线前请自行取得授权或替换为自有素材**，否则有侵权与 DMCA 下架风险。
- 剧名、集数、标签、分区结构与参考站一致；简介为本项目重写的版本。
