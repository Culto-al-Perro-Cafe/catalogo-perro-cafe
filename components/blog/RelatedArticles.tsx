import { blogSection, getBlog } from "@/config/blogs";
import type { ArticleMeta } from "@/lib/blog";
import { routes } from "@/lib/routes";
import { BentoTile } from "@/components/ui/BentoTile";
import styles from "./RelatedArticles.module.css";

/** "Sigue leyendo" block at the end of a post (see getRelatedArticles). */
export function RelatedArticles({ articles }: { articles: ArticleMeta[] }) {
  if (!articles.length) return null;
  return (
    <aside aria-labelledby="sigue-leyendo" className={styles.related}>
      <h2 id="sigue-leyendo" className={styles.heading}>
        {blogSection.relatedTitle}
      </h2>
      <div className={styles.grid}>
        {articles.map((a) => (
          <BentoTile key={`${a.blog}/${a.slug}`} href={routes.article(a.blog, a.slug)} className={styles.tile}>
            <span className={styles.category}>{getBlog(a.blog)?.title}</span>
            <p className={styles.title}>{a.title}</p>
            <span className={styles.meta}>
              {a.minutes} {blogSection.readingTime} →
            </span>
          </BentoTile>
        ))}
      </div>
    </aside>
  );
}
