"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState } from "react";
import type {
  ArchiveData,
  ArtworkRecord,
  Filters,
  Language,
  ViewMode,
} from "./types";

const initialFilters: Filters = {
  time: "all",
  medium: "all",
  mechanism: "all",
  input: "all",
  version: "all",
};

const copy = {
  zh: {
    archive: "研究档案",
    method: "方法",
    works: "作品",
    timeline: "年表",
    sources: "来源",
    kicker: "公开来源研究档案 · 2004—2025",
    titleLine1: "从身体反馈",
    titleLine2: "到生命—机器社会",
    introduction:
      "真锅大度并不把技术隐藏在完成的图像背后。他把测量、映射、延迟和失误暴露出来，让作品成为一段持续发生的关系。",
    boundary: "档案边界",
    explore: "浏览 21 件作品",
    read: "阅读研究方法",
    selectedWorks: "代表作品",
    verifiedSources: "来源记录",
    archivedImages: "研究图片",
    signalTitle: "每件作品都从一个信号开始。",
    signalIntro:
      "声音进入皮肤，动作进入摄像机，语言进入模型，节拍进入神经组织。选择节点，查看真锅大度如何把系统过程变成作品。",
    chapterLabel: "第一章 · 2004—2011",
    chapterTitle: "身体是接口",
    chapterEnglish: "BODY AS INTERFACE",
    chapterLead:
      "最早的作品并不追求更逼真的图像，而是让人注意到身体本来就拥有多个不同步的通道：耳朵、皮肤、肌肉、视觉与动作。",
    chapterBody:
      "这些通道被拆开、测量，再重新接线。技术不是身体的外部增强；它让原本不可见的反馈、控制和失控变得可以被感知。",
    quote: "边界不是一条线，而是翻译发生的地方。",
    evidence: "研究证据",
    relation: "实体关系",
    relationValue:
      "Artist → Work → Collaborator → Institution → Exhibition → Source",
    archiveTitle: "作品索引",
    archiveSubtitle:
      "搜索、筛选并切换图像墙或研究列表。原始标题、技术专有名词、来源与图片信用始终保留。",
    search: "搜索作品、技术、媒介或主题",
    results: "项结果",
    grid: "图像墙",
    list: "研究列表",
    reset: "重置",
    noResults: "没有符合当前条件的作品。",
    open: "打开作品详情",
    details: "作品详情",
    close: "关闭",
    description: "研究摘要",
    mechanism: "机制",
    materials: "技术与材料",
    venues: "展览与场地",
    provenance: "来源与图片信用",
    related: "相关作品",
    official: "艺术家页面",
    source: "来源",
    rights: "权利状态",
    review: "研究翻译待复核",
    language: "语言",
    timeFilter: "时间",
    mediumFilter: "媒介",
    mechanismFilter: "机制",
    inputFilter: "输入",
    versionFilter: "版本",
    all: "全部",
    early: "2004—2011",
    middle: "2012—2018",
    recent: "2019—2025",
    installation: "装置",
    performance: "表演",
    research: "研究系统",
    movingImage: "影像 / 网络",
    tracking: "追踪",
    mapping: "映射",
    generation: "生成",
    stimulation: "刺激 / 反馈",
    body: "身体",
    sound: "声音",
    image: "图像",
    data: "数据",
    biology: "生命",
    single: "单一版本",
    multi: "多版本 / 重建",
    timelineTitle: "作品年表",
    timelineSubtitle:
      "从触觉与身体接口，到机器视觉、生成系统和生物计算。",
    sourceTitle: "来源、信用与版权",
    sourceBody:
      "本档案以艺术家官网和机构来源为边界。图片仅用于本地研究预览，公开再利用权利仍需逐项核验。",
    accessed: "访问日期",
    notCatalogue: "研究样本，不是作品全集或 catalogue raisonné。",
    chineseSummary: "中文研究摘要",
  },
  en: {
    archive: "Research archive",
    method: "Method",
    works: "Works",
    timeline: "Timeline",
    sources: "Sources",
    kicker: "Public-source research archive · 2004—2025",
    titleLine1: "From Body Feedback",
    titleLine2: "to Life–Machine Societies",
    introduction:
      "Daito Manabe does not hide technology behind a finished image. Measurement, mapping, latency, and error remain visible, turning the work into a relationship unfolding in real time.",
    boundary: "Archive boundary",
    explore: "Explore 21 works",
    read: "Read the method",
    selectedWorks: "Selected works",
    verifiedSources: "Source records",
    archivedImages: "Research images",
    signalTitle: "Every work begins with a signal.",
    signalIntro:
      "Sound enters skin, movement enters a camera, language enters a model, and rhythm enters neural tissue. Select a node to follow the system.",
    chapterLabel: "Chapter 01 · 2004—2011",
    chapterTitle: "Body as Interface",
    chapterEnglish: "身体是接口",
    chapterLead:
      "The early works do not pursue a more realistic image. They draw attention to the body’s asynchronous channels: hearing, touch, muscle activity, vision, and movement.",
    chapterBody:
      "These channels are separated, measured, and rewired. Technology is not an external enhancement; it makes feedback, control, and loss of control perceptible.",
    quote: "A boundary is not a line. It is where translation happens.",
    evidence: "Research evidence",
    relation: "Entity relationships",
    relationValue:
      "Artist → Work → Collaborator → Institution → Exhibition → Source",
    archiveTitle: "Works index",
    archiveSubtitle:
      "Search, filter, and switch between an image wall and research list. Original titles, proper nouns, sources, and image credits remain visible.",
    search: "Search works, technology, medium, or theme",
    results: "results",
    grid: "Image wall",
    list: "Research list",
    reset: "Reset",
    noResults: "No works match the current filters.",
    open: "Open work details",
    details: "Work details",
    close: "Close",
    description: "Research summary",
    mechanism: "Mechanism",
    materials: "Technology and materials",
    venues: "Venues",
    provenance: "Sources and image credit",
    related: "Related works",
    official: "Artist page",
    source: "Source",
    rights: "Rights",
    review: "Research translation needs review",
    language: "Language",
    timeFilter: "Time",
    mediumFilter: "Medium",
    mechanismFilter: "Mechanism",
    inputFilter: "Input",
    versionFilter: "Version",
    all: "All",
    early: "2004—2011",
    middle: "2012—2018",
    recent: "2019—2025",
    installation: "Installation",
    performance: "Performance",
    research: "Research system",
    movingImage: "Moving image / web",
    tracking: "Tracking",
    mapping: "Mapping",
    generation: "Generation",
    stimulation: "Stimulation / feedback",
    body: "Body",
    sound: "Sound",
    image: "Image",
    data: "Data",
    biology: "Biology",
    single: "Single version",
    multi: "Multiple versions",
    timelineTitle: "Chronology",
    timelineSubtitle:
      "From haptic and bodily interfaces to machine vision, generative systems, and biological computing.",
    sourceTitle: "Sources, credits, and rights",
    sourceBody:
      "The archive is bounded by artist and institutional sources. Images are used for local research preview; public reuse rights require individual review.",
    accessed: "Accessed",
    notCatalogue:
      "A research sample, not a complete catalogue or catalogue raisonné.",
    chineseSummary: "Chinese research summary",
  },
} as const;

const signals = [
  {
    id: "sense",
    zh: "感知",
    en: "Sense",
    detailZh: "耳朵、皮肤、摄像机、电极与传感器接收现场信号。",
    detailEn: "Ears, skin, cameras, electrodes, and sensors receive a live signal.",
  },
  {
    id: "measure",
    zh: "测量",
    en: "Measure",
    detailZh: "动作、频谱、肌电、图像或神经活动被转成可计算的数据。",
    detailEn:
      "Movement, spectra, muscle activity, images, or neural activity become computable data.",
  },
  {
    id: "model",
    zh: "建模",
    en: "Model",
    detailZh: "算法、规则或生成模型决定信号之间如何对应。",
    detailEn:
      "Algorithms, rules, or generative models define how signals correspond.",
  },
  {
    id: "act",
    zh: "执行",
    en: "Act",
    detailZh: "光、声音、图像、肌肉、机器人或空间装置作出响应。",
    detailEn:
      "Light, sound, images, muscles, robots, or spatial systems respond.",
  },
  {
    id: "feedback",
    zh: "反馈",
    en: "Feedback",
    detailZh: "观众与材料改变系统的下一个状态，关系继续循环。",
    detailEn:
      "Audience and material responses alter the next state of the system.",
  },
] as const;

function normalizedText(work: ArtworkRecord) {
  return [
    work.title_original,
    work.title_translation.value,
    work.record_type,
    ...work.medium,
    ...work.materials_technology,
    ...work.themes,
    work.description,
    work.mechanism,
  ]
    .join(" ")
    .toLowerCase();
}

function inTimeRange(work: ArtworkRecord, value: string) {
  const year = Number(work.dates.work_year);
  if (value === "early") return year <= 2011;
  if (value === "middle") return year >= 2012 && year <= 2018;
  if (value === "recent") return year >= 2019;
  return true;
}

function matchesMedium(text: string, value: string) {
  if (value === "installation") return text.includes("installation");
  if (value === "performance")
    return text.includes("performance") || text.includes("dance");
  if (value === "research")
    return (
      text.includes("research") ||
      text.includes("system") ||
      text.includes("exhibition")
    );
  if (value === "moving-image")
    return (
      text.includes("video") ||
      text.includes("web") ||
      text.includes("music video") ||
      text.includes("stream")
    );
  return true;
}

function matchesMechanism(text: string, value: string) {
  if (value === "tracking")
    return (
      text.includes("tracking") ||
      text.includes("capture") ||
      text.includes("detection") ||
      text.includes("computer vision")
    );
  if (value === "mapping")
    return (
      text.includes("mapping") ||
      text.includes("映射") ||
      text.includes("visualization")
    );
  if (value === "generation")
    return (
      text.includes("generative") ||
      text.includes("diffusion") ||
      text.includes("gpt") ||
      text.includes("gan") ||
      text.includes("生成")
    );
  if (value === "stimulation")
    return (
      text.includes("stimulation") ||
      text.includes("feedback") ||
      text.includes("haptic") ||
      text.includes("刺激")
    );
  return true;
}

function matchesInput(text: string, value: string) {
  if (value === "body")
    return (
      text.includes("body") ||
      text.includes("facial") ||
      text.includes("motion") ||
      text.includes("身体")
    );
  if (value === "sound")
    return (
      text.includes("sound") ||
      text.includes("audio") ||
      text.includes("music") ||
      text.includes("声音")
    );
  if (value === "image")
    return (
      text.includes("image") ||
      text.includes("camera") ||
      text.includes("vision") ||
      text.includes("图像")
    );
  if (value === "data")
    return (
      text.includes("data") ||
      text.includes("dataset") ||
      text.includes("数据")
    );
  if (value === "biology")
    return (
      text.includes("organoid") ||
      text.includes("neural") ||
      text.includes("biological") ||
      text.includes("生命")
    );
  return true;
}

function matchesVersion(work: ArtworkRecord, value: string) {
  if (value === "multi") return Boolean(work.dates.version_year);
  if (value === "single") return !work.dates.version_year;
  return true;
}

function relatedWorks(work: ArtworkRecord, all: ArtworkRecord[]) {
  const themes = new Set(work.themes);
  return all
    .filter((candidate) => candidate.id !== work.id)
    .map((candidate) => ({
      work: candidate,
      score: candidate.themes.filter((theme) => themes.has(theme)).length,
    }))
    .filter((candidate) => candidate.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        Number(b.work.dates.work_year) - Number(a.work.dates.work_year),
    )
    .slice(0, 3)
    .map((candidate) => candidate.work);
}

function WorkCard({
  work,
  lang,
  view,
  onOpen,
}: {
  work: ArtworkRecord;
  lang: Language;
  view: ViewMode;
  onOpen: (work: ArtworkRecord) => void;
}) {
  const t = copy[lang];
  const imageRatio = work.image
    ? `${work.image.width} / ${work.image.height}`
    : "16 / 9";

  return (
    <article className={`work-card work-card--${view}`}>
      <button
        type="button"
        className="work-card__button"
        onClick={() => onOpen(work)}
        aria-label={`${t.open}: ${work.title_original}`}
      >
        <span className="work-card__media" style={{ aspectRatio: imageRatio }}>
          {work.image ? (
            <img
              src={work.image.path}
              alt={`${work.title_original} · ${work.image.kind}`}
              loading="lazy"
            />
          ) : (
            <span className="work-card__missing">IMAGE UNAVAILABLE</span>
          )}
          <span className="work-card__year">{work.dates.work_year}</span>
        </span>
        <span className="work-card__content">
          <span className="work-card__meta">
            {work.record_type} · {work.medium.slice(0, 2).join(" / ")}
          </span>
          <strong>{work.title_original}</strong>
          <span className="work-card__translation">
            {work.title_translation.value}
          </span>
          {view === "list" ? (
            <span className="work-card__summary" lang="zh-CN">
              {work.description}
            </span>
          ) : null}
          <span className="work-card__technology">
            {work.materials_technology.slice(0, 3).join(" · ")}
          </span>
          <span className="work-card__credit">
            {work.image?.credit ?? "Credit unavailable"} ·{" "}
            {t.rights}: {work.image?.rights_status ?? "needs_review"}
          </span>
        </span>
      </button>
    </article>
  );
}

export function ArchiveApp({ data }: { data: ArchiveData }) {
  const [lang, setLang] = useState<Language>("zh");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [view, setView] = useState<ViewMode>("grid");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeSignal, setActiveSignal] = useState("sense");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const t = copy[lang];

  useEffect(() => {
    const stored = window.localStorage.getItem("daito-archive-language");
    if (stored !== "zh" && stored !== "en") return;
    const frame = window.requestAnimationFrame(() => setLang(stored));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!activeId) return;
    closeButtonRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeId]);

  const switchLanguage = (next: Language) => {
    setLang(next);
    window.localStorage.setItem("daito-archive-language", next);
  };

  const filteredWorks = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return data.artworks.filter((work) => {
      const text = normalizedText(work);
      return (
        (!needle || text.includes(needle)) &&
        inTimeRange(work, filters.time) &&
        matchesMedium(text, filters.medium) &&
        matchesMechanism(text, filters.mechanism) &&
        matchesInput(text, filters.input) &&
        matchesVersion(work, filters.version)
      );
    });
  }, [data.artworks, query, filters]);

  const activeWork =
    data.artworks.find((work) => work.id === activeId) ?? null;
  const currentSignal =
    signals.find((signal) => signal.id === activeSignal) ?? signals[0];
  const featuredWork =
    data.artworks.find((work) => work.id.includes("brain-processing-unit")) ??
    data.artworks[0];
  const earlyWork =
    data.artworks.find((work) =>
      work.id.includes("electric-stimulus-to-face"),
    ) ?? data.artworks[data.artworks.length - 1];

  const updateFilter = (name: keyof Filters, value: string) => {
    setFilters((current) => ({ ...current, [name]: value }));
  };

  const filterGroups = [
    {
      name: "time" as const,
      label: t.timeFilter,
      options: [
        ["all", t.all],
        ["early", t.early],
        ["middle", t.middle],
        ["recent", t.recent],
      ],
    },
    {
      name: "medium" as const,
      label: t.mediumFilter,
      options: [
        ["all", t.all],
        ["installation", t.installation],
        ["performance", t.performance],
        ["research", t.research],
        ["moving-image", t.movingImage],
      ],
    },
    {
      name: "mechanism" as const,
      label: t.mechanismFilter,
      options: [
        ["all", t.all],
        ["tracking", t.tracking],
        ["mapping", t.mapping],
        ["generation", t.generation],
        ["stimulation", t.stimulation],
      ],
    },
    {
      name: "input" as const,
      label: t.inputFilter,
      options: [
        ["all", t.all],
        ["body", t.body],
        ["sound", t.sound],
        ["image", t.image],
        ["data", t.data],
        ["biology", t.biology],
      ],
    },
    {
      name: "version" as const,
      label: t.versionFilter,
      options: [
        ["all", t.all],
        ["single", t.single],
        ["multi", t.multi],
      ],
    },
  ];

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label={t.archive}>
          <span>DM</span>
          <small>R / 04—25</small>
        </a>
        <nav aria-label={t.archive}>
          <a href="#method">{t.method}</a>
          <a href="#works">{t.works}</a>
          <a href="#timeline">{t.timeline}</a>
          <a href="#sources">{t.sources}</a>
        </nav>
        <div className="language-switch" aria-label={t.language}>
          <button
            type="button"
            className={lang === "zh" ? "is-active" : ""}
            onClick={() => switchLanguage("zh")}
            aria-pressed={lang === "zh"}
          >
            中
          </button>
          <button
            type="button"
            className={lang === "en" ? "is-active" : ""}
            onClick={() => switchLanguage("en")}
            aria-pressed={lang === "en"}
          >
            EN
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">{t.kicker}</p>
            <h1>
              {t.titleLine1}
              <span>{t.titleLine2}</span>
            </h1>
            <p className="hero__intro">{t.introduction}</p>
            <div className="hero__actions">
              <a className="button button--signal" href="#works">
                {t.explore}
              </a>
              <a className="button" href="#method">
                {t.read}
              </a>
            </div>
          </div>
          <figure className="hero__visual">
            {featuredWork.image ? (
              <img
                src={featuredWork.image.path}
                alt={`${featuredWork.title_original} · ${featuredWork.image.kind}`}
              />
            ) : null}
            <figcaption>
              <strong>{featuredWork.title_original}</strong>
              <span>{featuredWork.dates.work_year}</span>
              <small>{featuredWork.image?.credit}</small>
            </figcaption>
          </figure>
          <aside className="hero__boundary">
            <p className="eyebrow">{t.boundary}</p>
            <p>{data.research_boundary.statement}</p>
            <small>
              {t.accessed}: {data.research_boundary.accessed_at} ·{" "}
              {t.notCatalogue}
            </small>
          </aside>
        </div>
        <div className="stats">
          <div>
            <b>{data.counts.artworks}</b>
            <span>{t.selectedWorks}</span>
          </div>
          <div>
            <b>{data.counts.sources}</b>
            <span>{t.verifiedSources}</span>
          </div>
          <div>
            <b>{data.counts.images}</b>
            <span>{t.archivedImages}</span>
          </div>
          <div>
            <b>2004—2025</b>
            <span>{t.timeline}</span>
          </div>
        </div>
      </section>

      <section className="signal-section" id="method">
        <div className="section-heading section-heading--dark">
          <p className="eyebrow">SYSTEM ATLAS / 方法图谱</p>
          <h2>{t.signalTitle}</h2>
          <p>{t.signalIntro}</p>
        </div>
        <div className="signal-loop" aria-label={t.signalTitle}>
          {signals.map((signal, index) => (
            <button
              type="button"
              key={signal.id}
              className={signal.id === activeSignal ? "is-active" : ""}
              onClick={() => setActiveSignal(signal.id)}
              aria-pressed={signal.id === activeSignal}
            >
              <small>0{index + 1}</small>
              <b>{lang === "zh" ? signal.zh : signal.en}</b>
              <span>{lang === "zh" ? signal.en : signal.zh}</span>
            </button>
          ))}
        </div>
        <div className="signal-detail" role="status" aria-live="polite">
          <span>{currentSignal.id.toUpperCase()}</span>
          <p>
            {lang === "zh" ? currentSignal.detailZh : currentSignal.detailEn}
          </p>
        </div>
      </section>

      <section className="chapter">
        <aside className="chapter__nav">
          <p className="eyebrow">CONTENTS / 目录</p>
          <ol>
            <li>00 · The Loop / 闭环</li>
            <li className="is-active">01 · Body as Interface / 身体是接口</li>
            <li>02 · Body as Network / 身体成为网络</li>
            <li>03 · How Machines See / 机器如何看</li>
            <li>04 · Life & Emergence / 生命与涌现</li>
            <li>05 · System Atlas / 方法图谱</li>
          </ol>
        </aside>
        <article className="chapter__article">
          <p className="eyebrow">{t.chapterLabel}</p>
          <h2>{t.chapterTitle}</h2>
          <p className="chapter__translation">{t.chapterEnglish}</p>
          <p className="chapter__lead">{t.chapterLead}</p>
          <p className="chapter__body">{t.chapterBody}</p>
          <blockquote>{t.quote}</blockquote>
          <article className="case-study">
            <header>
              <span>{earlyWork.dates.work_year}</span>
              <strong>{earlyWork.title_original}</strong>
              <small>{earlyWork.record_type}</small>
            </header>
            {earlyWork.image ? (
              <img
                src={earlyWork.image.path}
                alt={`${earlyWork.title_original} · ${earlyWork.image.kind}`}
              />
            ) : null}
            <div className="case-study__body">
              <div>
                <b>{t.mechanism}</b>
                <p lang="zh-CN">{earlyWork.mechanism}</p>
              </div>
              <div>
                <b>{t.materials}</b>
                <p>{earlyWork.materials_technology.join(" · ")}</p>
              </div>
            </div>
            <footer>
              {earlyWork.image?.credit} · {t.rights}:{" "}
              {earlyWork.image?.rights_status}
            </footer>
          </article>
        </article>
        <aside className="chapter__evidence">
          <section>
            <p className="eyebrow">{t.evidence}</p>
            <b>{data.counts.sources} / SOURCE RECORDS</b>
            <p>
              {data.research_boundary.primary_domains.join(" · ")}
            </p>
          </section>
          <section>
            <p className="eyebrow">{t.relation}</p>
            <p>{t.relationValue}</p>
          </section>
          <section>
            <p className="eyebrow">TRANSLATION STATUS</p>
            <p>{t.review}</p>
          </section>
        </aside>
      </section>

      <section className="archive-section" id="works">
        <div className="section-heading section-heading--dark archive-heading">
          <div>
            <p className="eyebrow">COLLECTION INDEX / 作品索引</p>
            <h2>{t.archiveTitle}</h2>
          </div>
          <p>{t.archiveSubtitle}</p>
        </div>

        <div className="archive-toolbar">
          <label className="search-field">
            <span className="sr-only">{t.search}</span>
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.search}
            />
          </label>
          <div className="view-switch" aria-label={t.works}>
            <button
              type="button"
              className={view === "grid" ? "is-active" : ""}
              aria-pressed={view === "grid"}
              onClick={() => setView("grid")}
            >
              {t.grid}
            </button>
            <button
              type="button"
              className={view === "list" ? "is-active" : ""}
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
            >
              {t.list}
            </button>
          </div>
        </div>

        <div className="filters">
          {filterGroups.map((group) => (
            <label key={group.name}>
              <span>{group.label}</span>
              <select
                value={filters[group.name]}
                onChange={(event) =>
                  updateFilter(group.name, event.target.value)
                }
              >
                {group.options.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          ))}
          <button
            type="button"
            className="filter-reset"
            onClick={() => {
              setFilters(initialFilters);
              setQuery("");
            }}
          >
            {t.reset}
          </button>
        </div>

        <div className="archive-status" aria-live="polite">
          <span>
            {filteredWorks.length} {t.results}
          </span>
          <span>
            {view === "grid" ? t.grid : t.list} ·{" "}
            {lang === "zh" ? "中文优先" : "English interface"}
          </span>
        </div>

        {filteredWorks.length ? (
          <div className={`works works--${view}`}>
            {filteredWorks.map((work) => (
              <WorkCard
                key={work.id}
                work={work}
                lang={lang}
                view={view}
                onOpen={(selected) => setActiveId(selected.id)}
              />
            ))}
          </div>
        ) : (
          <p className="empty-state">{t.noResults}</p>
        )}
      </section>

      <section className="timeline-section" id="timeline">
        <div className="section-heading">
          <p className="eyebrow">CHRONOLOGY / 作品年表</p>
          <h2>{t.timelineTitle}</h2>
          <p>{t.timelineSubtitle}</p>
        </div>
        <div className="timeline-track">
          {[...data.artworks]
            .sort(
              (a, b) =>
                Number(a.dates.work_year) - Number(b.dates.work_year),
            )
            .map((work) => (
              <button
                type="button"
                key={work.id}
                onClick={() => setActiveId(work.id)}
                aria-label={`${t.open}: ${work.title_original}`}
              >
                <b>{work.dates.work_year}</b>
                <span>{work.title_original}</span>
                <small>{work.medium[0]}</small>
              </button>
            ))}
        </div>
      </section>

      <section className="sources-section" id="sources">
        <div className="section-heading">
          <p className="eyebrow">PROVENANCE / 来源</p>
          <h2>{t.sourceTitle}</h2>
          <p>{t.sourceBody}</p>
        </div>
        <div className="source-grid">
          {data.research_boundary.primary_domains.map((domain, index) => (
            <div key={domain}>
              <span>0{index + 1}</span>
              <b>{domain}</b>
              <small>
                {index === 0
                  ? "Artist official / 艺术家官方"
                  : "Institutional verification / 机构核验"}
              </small>
            </div>
          ))}
        </div>
        <footer className="site-footer">
          <p>
            真锅大度 / Daito Manabe · Public-source research archive ·{" "}
            {data.research_boundary.accessed_at}
          </p>
          <p>{t.notCatalogue}</p>
        </footer>
      </section>

      {activeWork ? (
        <div className="detail-layer">
          <button
            type="button"
            className="detail-backdrop"
            onClick={() => setActiveId(null)}
            aria-label={t.close}
          />
          <aside
            className="detail-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-title"
          >
            <header className="detail-panel__header">
              <p className="eyebrow">{t.details}</p>
              <div className="detail-panel__actions">
                <div className="language-switch" aria-label={t.language}>
                  <button
                    type="button"
                    className={lang === "zh" ? "is-active" : ""}
                    onClick={() => switchLanguage("zh")}
                    aria-pressed={lang === "zh"}
                  >
                    中
                  </button>
                  <button
                    type="button"
                    className={lang === "en" ? "is-active" : ""}
                    onClick={() => switchLanguage("en")}
                    aria-pressed={lang === "en"}
                  >
                    EN
                  </button>
                </div>
                <button
                  type="button"
                  ref={closeButtonRef}
                  onClick={() => setActiveId(null)}
                >
                  {t.close} ×
                </button>
              </div>
            </header>
            {activeWork.image ? (
              <figure className="detail-panel__image">
                <img
                  src={activeWork.image.path}
                  alt={`${activeWork.title_original} · ${activeWork.image.kind}`}
                />
                <figcaption>
                  {activeWork.image.credit} · {t.rights}:{" "}
                  {activeWork.image.rights_status}
                </figcaption>
              </figure>
            ) : null}
            <div className="detail-panel__body">
              <p className="eyebrow">
                {activeWork.dates.work_year} · {activeWork.record_type}
              </p>
              <h2 id="detail-title">{activeWork.title_original}</h2>
              <p className="detail-panel__translation">
                {activeWork.title_translation.value}
              </p>
              <section>
                <h3>{t.description}</h3>
                <p lang="zh-CN">{activeWork.description}</p>
                {lang === "en" ? (
                  <small className="translation-note">
                    {t.chineseSummary} · {t.review}
                  </small>
                ) : null}
              </section>
              <section>
                <h3>{t.mechanism}</h3>
                <p lang="zh-CN">{activeWork.mechanism}</p>
              </section>
              <section>
                <h3>{t.materials}</h3>
                <div className="detail-tags">
                  {activeWork.materials_technology.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </section>
              {activeWork.venues.length ? (
                <section>
                  <h3>{t.venues}</h3>
                  <ul>
                    {activeWork.venues.map((venue) => (
                      <li key={venue}>{venue}</li>
                    ))}
                  </ul>
                </section>
              ) : null}
              <section>
                <h3>{t.provenance}</h3>
                <a
                  href={activeWork.official_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.official} ↗
                </a>
                {activeWork.sources.map((source) => (
                  <a
                    key={source.id}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.source}: {source.title} ↗
                  </a>
                ))}
              </section>
              <section>
                <h3>{t.related}</h3>
                <div className="related-list">
                  {relatedWorks(activeWork, data.artworks).map((work) => (
                    <button
                      type="button"
                      key={work.id}
                      onClick={() => setActiveId(work.id)}
                    >
                      <span>{work.dates.work_year}</span>
                      <b>{work.title_original}</b>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </aside>
        </div>
      ) : null}
    </main>
  );
}
