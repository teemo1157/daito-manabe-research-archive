import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const archivePath = path.join(projectRoot, "public/data/archive.json");
const archive = JSON.parse(await readFile(archivePath, "utf8"));

const internalPaths = [
  ...new Set(
    archive.artworks
      .map((work) => work.image?.path)
      .filter(Boolean),
  ),
];

const internal = await Promise.all(
  internalPaths.map(async (url) => {
    const filePath = path.join(projectRoot, "public", url.replace(/^\//, ""));
    try {
      await access(filePath);
      return { url, status: "ok" };
    } catch {
      return { url, status: "missing" };
    }
  }),
);

const externalUrls = [
  ...new Set(
    archive.artworks.flatMap((work) => [
      work.official_url,
      ...work.sources.map((source) => source.url),
    ]),
  ),
].filter(Boolean);

async function checkExternal(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; ResearchArchiveLinkCheck/1.0)",
        range: "bytes=0-1023",
      },
    });
    await response.body?.cancel();

    const reachable =
      (response.status >= 200 && response.status < 400) ||
      [401, 403, 429].includes(response.status);
    return {
      url,
      final_url: response.url,
      http_status: response.status,
      status: reachable ? "ok" : "failed",
      note: [401, 403, 429].includes(response.status)
        ? "reachable but access-restricted"
        : undefined,
    };
  } catch (error) {
    return {
      url,
      status: "failed",
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    clearTimeout(timeout);
  }
}

const external = [];
const queue = [...externalUrls];
const workers = Array.from({ length: Math.min(6, queue.length) }, async () => {
  while (queue.length) {
    const url = queue.shift();
    if (url) external.push(await checkExternal(url));
  }
});
await Promise.all(workers);
external.sort((a, b) => a.url.localeCompare(b.url));

const summary = {
  checked_at: new Date().toISOString(),
  internal_total: internal.length,
  internal_failed: internal.filter((item) => item.status === "missing").length,
  external_total: external.length,
  external_failed: external.filter((item) => item.status === "failed").length,
  external_restricted: external.filter(
    (item) => item.note === "reachable but access-restricted",
  ).length,
};

const report = { summary, internal, external };
await mkdir(path.join(projectRoot, "qa"), { recursive: true });
await writeFile(
  path.join(projectRoot, "qa/link-check.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);

console.log(JSON.stringify(summary, null, 2));
if (summary.internal_failed || summary.external_failed) process.exitCode = 1;
