import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const archive = JSON.parse(
  await readFile(new URL("../public/data/archive.json", import.meta.url), "utf8"),
);

test("generated archive preserves canonical counts and stable IDs", () => {
  assert.equal(archive.schema_version, 1);
  assert.equal(archive.counts.artworks, 21);
  assert.equal(archive.counts.images, 21);
  assert.equal(archive.counts.sources, 34);
  assert.equal(archive.artworks.length, 21);
  assert.equal(new Set(archive.artworks.map((work) => work.id)).size, 21);
});

test("every work exposes research, provenance, and review fields", () => {
  for (const work of archive.artworks) {
    assert.ok(work.id.startsWith("daito-manabe--"));
    assert.ok(work.title_original);
    assert.ok(work.dates.work_year);
    assert.ok(Array.isArray(work.medium) && work.medium.length > 0);
    assert.ok(
      Array.isArray(work.materials_technology) &&
        work.materials_technology.length > 0,
    );
    assert.ok(work.description);
    assert.ok(work.mechanism);
    assert.ok(work.official_url.startsWith("https://"));
    assert.ok(Array.isArray(work.sources) && work.sources.length > 0);
    assert.ok(work.review_status);
    assert.ok(work.completeness);
  }
});

test("every primary image and external source resolves to a valid target", async () => {
  for (const work of archive.artworks) {
    assert.ok(work.image, `${work.id} is missing its primary image record`);
    await access(new URL(`../public${work.image.path}`, import.meta.url));
    assert.ok(work.image.credit);
    assert.equal(work.image.rights_status, "needs_review");
    assert.doesNotThrow(() => new URL(work.official_url));
    for (const source of work.sources) {
      assert.doesNotThrow(() => new URL(source.url));
    }
  }
});
