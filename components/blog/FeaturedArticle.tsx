import { blogSection, getBlog } from "@/config/blogs";
import { formatDate, type ArticleMeta } from "@/lib/blog";
import { routes } from "@/lib/routes";
import { BentoTile, TileMedia } from "@/components/ui/BentoTile";
import styles from "./FeaturedArticle.module.css";

/** Large card for `blogSection.featured`, shown at the top of /blogs. */
export function FeaturedArticle({ article }: { article: ArticleMeta }) {
  return (
    <BentoTile href={routes.article(article.blog, article.slug)} className={styles.card}>
      <div className={styles.media}>
        <TileMedia image={article.image} placeholder="Foto" sizes="(max-width: 820px) 100vw, 60vw" priority />
      </div>
      <div className={styles.body}>
        <span className={styles.eyebrow}>
          <span className={styles.badge}>{blogSection.featuredBadge}</span>
          <span className={styles.category}>{getBlog(article.blog)?.title}</span>
        </span>
        <h2 className={styles.title}>{article.title}</h2>
        <p className={styles.excerpt}>{article.description}</p>
        <span className={styles.meta}>
          <time dateTime={article.date}>{formatDate(article.date)}</time> · {article.minutes} {blogSection.readingTime}
        </span>
      </div>
    </BentoTile>
  );
}
