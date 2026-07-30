# Stage 8 · Figma 写入计划

日期：2026-07-27（2026-07-30 按用户示例修订）

## 目标检查

- 目标类型：Figma Design，不使用 FigJam。
- 现有目标：`调研展示｜毕设开题调研版`。
- File key：`Z2EUnLTzPsmhGmJMgpNZDw`。
- 写入策略：保留全部现有页面与 Frame，在现有页面
  `00-Cover-Visual-Guide` 的最右侧追加一张真锅大度完整网页长框。
- 账户能力：Starter 计划，当前返回 `View` seat；创建或写入可能受 Figma
  席位限制。若接口拒绝写入，应保留本地原型并准确记录限制，不反复创建文件。
- 来源：已通过 Stage 7 QA 的 `06_prototype`。
- 内容边界：21 件代表作品、21 张研究图片、34 条来源；不是作品全集或
  catalogue raisonné。

## 代码与设计系统发现

- 页面结构：Header、Hero、Archive Boundary、Stats、Signal Loop、Field Notes
  Chapter、Works Index、Timeline、Sources、Footer、Work Detail。
- 交互组件：语言切换、主次按钮、信号步骤、搜索框、5 类筛选、视图切换、
  重置按钮、作品卡、来源链接、详情关闭。
- 字体来源：
  - Sans：Inter / Helvetica Neue / PingFang SC / Noto Sans CJK SC
  - Serif：Songti SC / Noto Serif CJK SC / Georgia
  - Mono：SFMono-Regular / Roboto Mono / IBM Plex Mono
- 图像：页面包含 21 张本地作品图片。用户明确要求采用与金允哲、Raven Kwok
  示例相同的整页网页捕获方式；最终交付必须是 HTML 转换所得的可编辑图层，
  不能退化为单张位图截图。
- Code Connect：代码库中没有匹配本项目组件的 `*.figma.*` 文件。
- 既有页面：metadata 已读取 `00-Cover-Visual-Guide`，其中包含
  `00 Cover Visual Guide`、`Full Archive Prototype - editable capture`
  以及金允哲、Raven Kwok 等其他艺术家研究内容；这些内容均不修改。
- 既有设计系统：Plugin API 与库查询受当前权限限制，暂时无法完成变量、样式
  和组件的程序化清点。

## 拟写入页面与 Frame

### 现有页面 `00-Cover-Visual-Guide`

- 新增一张顶层长框：
  `Daito Manabe / 真锅大度 — Full Archive Prototype - editable capture`
- 视口宽度：`1440px`；高度使用网页完整自然高度。
- 位置：现有最右侧顶层 Frame 右边，保留至少 `160px` 间距。
- 内容语言：默认中文界面，同时保留页面中的英文标题、作品原名、技术词汇、
  来源和图片信用。
- 内容范围：Header、Hero、统计边界、信号闭环、场域札记、21 件作品索引、
  年表、来源和 Footer。
- 结构要求：文字、图片、容器和网页分区保持可编辑；不得覆盖
  `00 Cover Visual Guide`、金允哲长页或 Raven Kwok 长页。

### 已取消的默认方案

原计划中的 Foundations、Desktop、Mobile、Work Detail 和临时 Capture
五页拆分方案，已被用户于 2026-07-30 给出的整页示例替代。除非用户再次明确
要求，不创建这些额外页面。

## 写入与验证顺序

1. 获得目标文件编辑权限并重新执行最小只读 Plugin API 检查。
2. 启动已验证的本地原型，固定 `1440px` 桌面视口和中文默认状态。
3. 使用官方网页捕获将完整长页转换为可编辑 Figma 图层。
4. 将捕获长框命名为
   `Daito Manabe / 真锅大度 — Full Archive Prototype - editable capture`，
   放在现有内容最右侧。
5. 检查字体替换、中文换行、21 张图片、卡片比例、长页连续性、Footer 和
   是否存在裁切或重叠。
6. 记录 file key、页面名、Frame 名和节点 ID。

## 当前检查点

目标与写入范围已确认，但外部写入尚未发生。2026-07-30 再次检查时，连接账户
仍为 Starter / `View` seat；metadata 可读取，但最小 Plugin API 与官方网页
捕获初始化均返回 `INVALID_ARGUMENT`。下一步需要为当前连接账户开放该文件
的编辑权限，或提供另一个可编辑的 Figma Design 文件。
