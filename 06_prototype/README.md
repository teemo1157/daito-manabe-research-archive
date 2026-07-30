# 真锅大度研究档案

本目录是真锅大度公开来源研究的本地响应式原型，覆盖 2004—2025 年的
21 件代表作品、21 张研究图片与 34 条来源记录。它是研究样本，不是作品全集或
catalogue raisonné。

## 本地运行

需要 Node.js `>=22.13.0`。

```bash
npm ci
npm run dev
```

默认数据来自上一级研究目录的 `project.json`、`data/artworks.jsonl`、
`data/images.jsonl` 与 `data/sources.jsonl`。每次启动和构建前，
`npm run sync:data` 会重新生成 `public/data/archive.json` 并同步作品图片。

## 质量检查

```bash
npm run lint
npm test
npm run check:links
```

浏览器测试记录、链接检查结果和桌面/移动截图见 [`qa/`](./qa/)。

## 功能范围

- 中英双语界面及语言偏好保存
- 关键词搜索与时间、媒介、机制、输入、版本筛选
- 图像墙和研究列表视图
- 作品详情、来源链接、图片信用与权利状态
- 桌面及 390px 移动端响应式布局

网站源代码与原创项目文档采用 MIT License。第三方作品图像与摄影不属于
MIT 授权范围；其署名、来源和权利状态见上一级目录的 `NOTICE.md` 与
`data/images.jsonl`。
