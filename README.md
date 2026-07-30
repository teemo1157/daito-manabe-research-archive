# 真锅大度 / Daito Manabe 研究档案

这是一个可追溯、可续作的双语研究档案。当前收录截至 **2026-07-27** 可公开核验的 21 个代表项目、34 条来源与 21 张研究用图像，不宣称为作品全集或 catalogue raisonné。

## 开源与第三方材料

网站源代码与本项目原创文档采用 [MIT License](./LICENSE)。作品图像、摄影、
商标、引用材料与来源页面不属于 MIT 授权范围；具体边界见
[NOTICE.md](./NOTICE.md) 与 [图像使用与版权说明](./02_images/README.md)。

## 快速入口

- [公开研究网站](https://daito-manabe-research.vercel.app)
- [GitHub 公开仓库](https://github.com/teemo1157/daito-manabe-research-archive)
- [艺术家案例研究](./00_artist/真锅大度_Daito_Manabe_案例研究.md)
- [内容结构与叙事脚本](./01_works/真锅大度_内容结构与叙事脚本.md)
- [图像使用与版权说明](./02_images/README.md)
- [按年份作品表（自动生成）](./generated/works-by-year.md)
- [作品总表 TSV（自动生成）](./generated/works.tsv)
- [来源总表 TSV（自动生成）](./generated/sources.tsv)
- [图像总表 TSV（自动生成）](./generated/images.tsv)
- [缺失数据与版权待办（自动生成）](./generated/missing-data.md)
- [前端数据包（自动生成）](./generated/frontend.json)

## 当前覆盖

- 21 条代表作品或长期项目记录
- 34 条带访问日期的来源记录
- 21 张研究用图像与 21 张独立网页衍生副本
- 24 个艺术家官网页面快照
- 8 个机构网页快照与 2 份机构 PDF 快照

`data/` 是事实数据的唯一来源；`generated/` 可从规范数据重新生成。中文标题均为研究译名，正式使用前需复核。

## 研究边界

访问时，真锅大度官网 Archive Index 标示 355 条记录、60 条 Featured、跨度 2004–2025。本档案按方法转折点选取 21 个项目，重点覆盖：

- 触觉、听觉、肌电与身体反馈；
- 动捕、体育追踪、无人机与网络化表演；
- 脑解码、机器视觉与生成模型；
- 实时扩散、空间生成声音、脑类器官与另类智能。

商业项目、讲座、DJ 演出、全部巡展版本与官网 2026 年实验性项目未全部纳入。

## 目录

```text
00_artist/           案例研究
01_works/            内容结构与叙事脚本
02_images/           原图与网页衍生副本
03_sources/          带日期的公开页面快照
data/                规范 JSONL 数据
generated/           自动生成的表格、时间表与报告
```

## 继续工作

数据变更后运行：

```bash
node ../../artist-research-publish-skill/skills/artist-research-publish/scripts/validate-project.mjs \
  --project "/Users/temoo1157/Documents/毕业设计/前期收集/04_真锅大度_Daito_Manabe"

node ../../artist-research-publish-skill/skills/artist-research-publish/scripts/build-outputs.mjs \
  --project "/Users/temoo1157/Documents/毕业设计/前期收集/04_真锅大度_Daito_Manabe"
```
