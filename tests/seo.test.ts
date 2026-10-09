import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";
import sitemap from "../app/sitemap";
import robots from "../app/robots";
import { organizationJsonLd, websiteJsonLd, productLineJsonLd, metaDescription } from "../lib/seo";
import { productLines } from "../config/lines";
import nextConfig from "../next.config";
import { legacyRedirects } from "../config/redirects";

const canonical = "https://www.perro.cafe";
function configuredUrl(value?: string) {
  const env = { ...process.env };
  delete env.NEXT_PUBLIC_SITE_URL;
  if (value !== undefined) env.NEXT_PUBLIC_SITE_URL = value;
  return execFileSync(process.execPath, ["--import", "tsx", "-e", "console.log(require('./config/site.ts').siteConfig.url)"], { env, encoding: "utf8" }).trim();
}

test("canonical default survives absent/blank build args and explicit overrides still work", () => {
  for (const value of [undefined, "", "  "]) assert.equal(configuredUrl(value), canonical);
  assert.equal(configuredUrl("https://preview.example/"), "https://preview.example");
  for (const file of ["Dockerfile", ".env.example", ".github/workflows/deploy.yml"]) {
    const source = readFileSync(file, "utf8");
    assert.ok(source.includes(canonical), file);
    assert.ok(!source.includes("https://catalogo.perro.cafe"), file);
  }
});

test("sitemap, robots and structured data use the canonical HTTPS host", () => {
  assert.ok(sitemap().length > 20);
  for (const entry of sitemap()) assert.equal(new URL(entry.url).origin, canonical);
  assert.equal(robots().sitemap, `${canonical}/sitemap.xml`);
  assert.equal(organizationJsonLd().url, `${canonical}/`);
  assert.equal(websiteJsonLd().url, `${canonical}/`);
  for (const line of productLines) assert.ok(JSON.stringify(productLineJsonLd(line)).includes(`${canonical}/lineas/${line.slug}`));
});

test("descriptions end on whole words and normalize whitespace", () => {
  assert.equal(metaDescription("  Café   de México  "), "Café de México");
  assert.equal(metaDescription("Café mexicano tostado fresco", 19), "Café mexicano…");
  assert.equal(metaDescription("Café mexicano", 13), "Café mexicano");
  assert.equal(metaDescription("extraordinario", 5), "extraordinario");
  assert.equal(metaDescription(""), "");
});

test("all thirteen legacy redirects stay permanent without a catch-all", async () => {
  const redirects = await nextConfig.redirects!();
  assert.equal(legacyRedirects.length, 13);
  assert.deepEqual(redirects, legacyRedirects.map((r) => ({ ...r, permanent: true })));
  assert.ok(redirects.every((r) => !r.source.includes(":")));
});

test("audited editorial links use current destinations without claiming the old lot is on sale", () => {
  const files = ["tostadores/la-guia-de-cafe-de-especialidad-en-hermosillo-sonora", "recetas/como-hacer-cold-brew-cafe-mexicano", "tostadores/chiapas-bayunka-2024"];
  for (const file of files) {
    const content = readFileSync(`content/blogs/${file}.md`, "utf8");
    assert.ok(content.includes("](/menudeo)"));
    assert.doesNotMatch(content, /https:\/\/(?:www|tienda)\.perro\.cafe\/(?:menu|tienda|products\/cafe-tostado-chiapas-nuevo-mexico-bayunka)/);
  }
  assert.match(readFileSync(`content/blogs/${files[2]}.md`, "utf8"), /lote Bayunka de 2024/);
});
