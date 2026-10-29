import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/** Legal pages (/privacidad, /terminos): Markdown in content/legal/<slug>.md. */
export type LegalSlug = "privacidad" | "terminos";

export type LegalPage = {
  /** h1, with `titleAccent` shown in orange after it. */
  title: string;
  titleAccent: string;
  seoTitle: string;
  description: string;
  /** "2026-10-29" */
  updated: string;
  intro: string;
  body: string;
};

const FIELDS = ["title", "titleAccent", "seoTitle", "description", "updated", "intro"] as const;

export function getLegalPage(slug: LegalSlug): LegalPage {
  const file = path.join(process.cwd(), "content", "legal", `${slug}.md`);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  for (const field of FIELDS) {
    if (!data[field]) throw new Error(`content/legal/${slug}.md: missing "${field}" in frontmatter`);
  }
  return { ...(data as Omit<LegalPage, "body">), updated: String(data.updated), body: content };
}

const longDate = new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** "2026-10-29" → "29 de octubre de 2026" */
export function formatLongDate(date: string): string {
  return longDate.format(new Date(`${date}T12:00:00Z`));
}
