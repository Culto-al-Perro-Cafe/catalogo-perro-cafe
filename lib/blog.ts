import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { blogs } from "@/config/blogs";

/** Articles are Markdown files: content/blogs/<blog>/<slug>.md */
const CONTENT_DIR = path.join(process.cwd(), "content", "blogs");

export type ArticleMeta = {
  blog: string;
  slug: string;
  title: string;
  /** <title> override when it should differ from the on-page title. */
  seoTitle?: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  image?: { src: string; alt: string; caption?: string };
  /** Original Shopify URL, kept for reference and redirects. */
  legacyUrl?: string;
  /** "Sigue leyendo" override: ["<blog>/<slug>", …]. Defaults to the newest in the same blog. */
  related?: string[];
  /** Estimated reading time in minutes. */
  minutes: number;
};

export type Article = ArticleMeta & { body: string };

/** ~200 words per minute, counting prose only (no Markdown syntax or embeds). */
function readingMinutes(markdown: string): number {
  const text = markdown
    .replace(/^:{2,3}.*$/gm, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\]\([^)]*\)/g, " ")
    .replace(/\{#[\w-]+\}/g, " ");
  const words = text.match(/[\p{L}\p{N}]+/gu)?.length ?? 0;
  return Math.max(1, Math.round(words / 200));
}

function asDate(value: unknown, field: string, file: string): string {
  const s = value instanceof Date ? value.toISOString().slice(0, 10) : String(value ?? "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) throw new Error(`${file}: "${field}" must be YYYY-MM-DD`);
  return s;
}

function read(blog: string, file: string): Article {
  const full = path.join(CONTENT_DIR, blog, file);
  const { data, content } = matter(fs.readFileSync(full, "utf8"));
  const rel = path.relative(process.cwd(), full);
  for (const field of ["title", "description", "author"]) {
    if (!data[field]) throw new Error(`${rel}: missing "${field}" in frontmatter`);
  }
  return {
    blog,
    slug: file.replace(/\.md$/, ""),
    title: data.title,
    seoTitle: data.seoTitle,
    description: data.description,
    date: asDate(data.date, "date", rel),
    updated: data.updated ? asDate(data.updated, "updated", rel) : undefined,
    author: data.author,
    image: data.image,
    legacyUrl: data.legacyUrl,
    related: Array.isArray(data.related) ? data.related.map(String) : undefined,
    minutes: readingMinutes(content),
    body: content,
  };
}

let cache: Article[] | undefined;

/** All articles, newest first. */
export function getAllArticles(): Article[] {
  // Cache in production builds only, so edited Markdown shows up right away in dev.
  if (cache && process.env.NODE_ENV === "production") return cache;
  const known = new Set(blogs.map((b) => b.slug));
  cache = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .flatMap((d) => {
      if (!known.has(d.name)) throw new Error(`content/blogs/${d.name}: not declared in config/blogs.ts`);
      return fs
        .readdirSync(path.join(CONTENT_DIR, d.name))
        .filter((f) => f.endsWith(".md"))
        .map((f) => read(d.name, f));
    })
    .sort((a, b) => b.date.localeCompare(a.date));
  for (const a of cache) {
    for (const ref of a.related ?? []) {
      if (!cache.some((b) => `${b.blog}/${b.slug}` === ref))
        throw new Error(`content/blogs/${a.blog}/${a.slug}.md: related "${ref}" not found (use "<blog>/<slug>")`);
    }
  }
  return cache;
}

export function getBlogArticles(blog: string): Article[] {
  return getAllArticles().filter((a) => a.blog === blog);
}

export function getArticle(blog: string, slug: string): Article | undefined {
  return getAllArticles().find((a) => a.blog === blog && a.slug === slug);
}

/** The article configured as `blogSection.featured`; fails the build if it doesn't exist. */
export function getFeaturedArticle(ref: string): Article {
  const found = getAllArticles().find((a) => `${a.blog}/${a.slug}` === ref);
  if (!found) throw new Error(`config/blogs.ts: featured "${ref}" not found (use "<blog>/<slug>")`);
  return found;
}

/** "Sigue leyendo": frontmatter `related`, else newest from the same blog, topped up from others. */
export function getRelatedArticles(article: Article, count = 2): Article[] {
  const all = getAllArticles();
  const key = (a: ArticleMeta) => `${a.blog}/${a.slug}`;
  if (article.related?.length) {
    return article.related.map((ref) => all.find((a) => key(a) === ref)!).slice(0, count);
  }
  const others = all.filter((a) => key(a) !== key(article));
  const same = others.filter((a) => a.blog === article.blog);
  return [...same, ...others.filter((a) => a.blog !== article.blog)].slice(0, count);
}

const dateFormat = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-05-29" → "29 may 2026" */
export function formatDate(date: string): string {
  return dateFormat.format(new Date(`${date}T12:00:00Z`));
}
