# Stage 7 · Prototype QA Report

检查日期：2026-07-27（Asia/Shanghai）

## 结论

本地响应式原型通过 Stage 7 检查。数据同步、静态构建、自动化测试、桌面与移动端
关键交互、图像加载、站内锚点和 34 条外部来源链接均未发现阻断问题。

## 数据与构建

- `npm run sync:data`：21 件作品、21 张主图、34 条来源。
- `npm run lint`：通过，0 error。
- `npm test`：通过，5/5 tests。
- `vinext build`：通过。
- 生成数据：`public/data/archive.json`。

## 浏览器检查

目标：本地开发服务器，桌面 1440 × 1000、移动端 390 × 844。

- 页面标题、首屏、章节结构和 21 件作品索引正常渲染。
- 关键词 `organoid` 返回 1 条结果。
- 图像墙 / 研究列表切换正常。
- 作品详情可打开和关闭；`Escape` 可关闭详情。
- 详情内中英切换会保留搜索词、当前视图和当前作品。
- 语言偏好在重新载入后恢复。
- 时间筛选 `2019—2025` 与搜索组合正常。
- 桌面和移动端文档宽度等于视口宽度，无页面横向溢出。
- 移动筛选区为独立横向滚动容器；详情面板宽度为 390px。
- 实际渲染的 23 个 `<img>`（含章节重复图）全部加载，无破图。
- 浏览器控制台：0 warning，0 error。

## 可访问性基础检查

- 所有按钮和链接均有可访问名称。
- 所有图片均有 `alt`。
- 搜索框与 5 个筛选控件均有标签。
- 详情使用 `role="dialog"`、`aria-modal="true"` 与标题关联。
- 键盘焦点样式和 `prefers-reduced-motion` 规则存在。

## 链接检查

- 站内锚点：7 条，缺失目标 0。
- 本地图片路径：21 条，失败 0。
- 外部研究来源：34 条，失败 0，受限响应 0。
- 详细结果：`qa/link-check.json`。

## 视觉证据

- `qa/screenshots/desktop-home.png`
- `qa/screenshots/mobile-home.png`
- `qa/screenshots/mobile-detail.png`

## 本阶段边界

本报告覆盖本地原型与 QA。Figma 写入、线上部署及部署后同源验证未执行；
这些动作属于后续阶段，需要单独授权。
