# 图像使用与版权说明

本目录保存从艺术家或机构公开页面取得的研究用图像。

## 结构

- `originals/`：从公开来源下载的文件。部分艺术家官网只公开 WebP 显示版本，因此这里的 “original” 指本次研究实际取得的最高公开文件，而不保证是摄影原始母版。
- `derivatives/`：供研究文档和后续网页原型引用的独立副本。当前来源文件本身已是网页优化版本，因此未再次有损压缩。
- `../data/images.jsonl`：每张图的来源页面、媒体直链、尺寸、字节数、SHA-256、信用与版权状态。
- `../generated/image-audit.json`：文件存在性、哈希与重复检查结果。

## 使用边界

所有 21 张图的 `rights_status` 均为 `needs_review`。这意味着：

- 可以用于本地研究、内部对照与未公开原型；
- 不等于已获得公开网站、论文出版、社交媒体或商业展示的再使用权；
- 公布前应逐图确认艺术家、摄影师、委托方、唱片公司、表演者与场馆所持权利；
- 不移除水印、不裁去署名、不暗示研究者拥有图像版权；
- 无法取得授权时，应改用来源链接、嵌入式官方媒体或经许可的缩略图。

## 已明确的摄影或信用

- `Light Field Theater`：Photo © Hanayuki Higashi
- `border 2021`：Photo: Hiroko Hirota
- `TOKYO 2020-2021`：Photo: Muryo Homma (Rhizomatiks)
- `Continuum Resonance`：Photo: Muryo Homma (Rhizomatiks)
- `Phase Forms`：Photo: Sónar / Leafhopper, Juan Sabatino, Nerea Coll
- `morphecore / morphechore`：Daito Manabe + Shingo Oono + MIKIKO

其余信用和具体摄影者请以 `data/images.jsonl` 与原始来源页为准。
