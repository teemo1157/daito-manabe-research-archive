import { mkdir, readFile, copyFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(scriptDir, "..");
const researchRoot = path.resolve(siteRoot, "..");

function parseJsonl(value) {
  return value
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

const [project, artworksRaw, imagesRaw, sourcesRaw] = await Promise.all([
  readFile(path.join(researchRoot, "project.json"), "utf8").then(JSON.parse),
  readFile(path.join(researchRoot, "data/artworks.jsonl"), "utf8").then(parseJsonl),
  readFile(path.join(researchRoot, "data/images.jsonl"), "utf8").then(parseJsonl),
  readFile(path.join(researchRoot, "data/sources.jsonl"), "utf8").then(parseJsonl),
]);

const imageByWork = new Map(imagesRaw.map((image) => [image.work_id, image]));
const sourceById = new Map(sourcesRaw.map((source) => [source.id, source]));
const publicWorks = path.join(siteRoot, "public", "works");
await mkdir(publicWorks, { recursive: true });

const artworks = [];

for (const work of artworksRaw) {
  const image = imageByWork.get(work.id);
  let publicImage = null;

  if (image?.derivative_path && image.archive_status === "downloaded") {
    const extension = path.extname(image.derivative_path) || ".webp";
    const outputDir = path.join(publicWorks, work.id);
    const outputFile = path.join(outputDir, `primary${extension}`);
    await mkdir(outputDir, { recursive: true });
    await copyFile(path.join(researchRoot, image.derivative_path), outputFile);
    publicImage = {
      path: `/works/${work.id}/primary${extension}`,
      width: image.width,
      height: image.height,
      kind: image.kind,
      credit: image.credit,
      rights_status: image.rights_status,
      source_page_url: image.source_page_url,
    };
  }

  const sources = work.source_ids
    .map((id) => sourceById.get(id))
    .filter(Boolean)
    .map((source) => ({
      id: source.id,
      title: source.title,
      url: source.url,
      source_type: source.source_type,
      authority: source.authority,
      accessed_at: source.accessed_at,
    }));

  artworks.push({
    id: work.id,
    title_original: work.title_original,
    title_translation: work.title_translation,
    dates: work.dates,
    record_type: work.record_type,
    medium: work.medium,
    materials_technology: work.materials_technology,
    dimensions: work.dimensions,
    venues: work.venues,
    description: work.description,
    mechanism: work.mechanism,
    themes: work.themes,
    official_url: work.official_url,
    completeness: work.completeness,
    review_status: work.review_status,
    sources,
    image: publicImage,
  });
}

artworks.sort((a, b) => {
  const yearDifference = Number(b.dates.work_year) - Number(a.dates.work_year);
  return yearDifference || a.title_original.localeCompare(b.title_original);
});

const archive = {
  schema_version: 1,
  generated_at: new Date().toISOString(),
  artist: project.artist,
  research_boundary: project.research_boundary,
  counts: {
    artworks: artworks.length,
    images: artworks.filter((work) => work.image).length,
    sources: sourcesRaw.length,
  },
  artworks,
};

const publicData = path.join(siteRoot, "public", "data");
await mkdir(publicData, { recursive: true });
await writeFile(
  path.join(publicData, "archive.json"),
  `${JSON.stringify(archive, null, 2)}\n`,
  "utf8",
);

console.log(
  JSON.stringify(
    {
      ok: true,
      output: "public/data/archive.json",
      artworks: archive.counts.artworks,
      images: archive.counts.images,
      sources: archive.counts.sources,
    },
    null,
    2,
  ),
);
