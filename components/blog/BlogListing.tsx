import { blogSection, blogs } from "@/config/blogs";
import type { ArticleMeta } from "@/lib/blog";
import { routes } from "@/lib/routes";
import Link from "next/link";
import { ArticleGrid } from "./ArticleGrid";
import { FeaturedArticle } from "./FeaturedArticle";
import styles from "./BlogListing.module.css";

/**
 * /blogs and /blogs/<categoría> (design: Catálogo B2B → Blog). The category tabs are
 * links so every category keeps its own indexable URL; `active` highlights one.
 */
export function BlogListing({
  title,
  description,
  articles,
  active,
  featured,
}: {
  title: string;
  description: string;
  articles: ArticleMeta[];
  /** Shown large above the grid; pass `articles` without it so it isn't listed twice. */
  featured?: ArticleMeta;
  /** Blog slug of the current category; undefined = "Todas". */
  active?: string;
}) {
  const tabs = [
    { key: undefined, label: blogSection.allLabel, href: routes.blogs },
    ...blogs.map((b) => ({ key: b.slug, label: b.title, href: routes.blog(b.slug) })),
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </header>

      <nav aria-label={blogSection.categoriesLabel} className={styles.tabs}>
        {tabs.map((t) => {
          const current = t.key === active;
          return (
            // Design-system button styles on a plain link, so aria-current reaches the DOM.
            <Link
              key={t.label}
              href={t.href}
              className="cp-btn"
              data-variant={current ? "roast" : "secondary"}
              data-size="md"
              aria-current={current ? "page" : undefined}
            >
              <span className="cp-btn__label">{t.label}</span>
            </Link>
          );
        })}
      </nav>

      {featured && <FeaturedArticle article={featured} />}

      <ArticleGrid articles={articles} />
    </div>
  );
}
