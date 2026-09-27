import { blogSection, getBlog } from "@/config/blogs";
import { formatDate, type ArticleMeta } from "@/lib/blog";
import { routes } from "@/lib/routes";
import { BentoTile, TileMedia } from "@/components/ui/BentoTile";
import styles from "./ArticleGrid.module.css";

/** Blog card grid (design: Catálogo B2B → Blog). */
export function ArticleGrid({ articles }: { articles: ArticleMeta[] }) {
  return (
    <ul className={styles.grid}>
      {articles.map((a, i) => {
        const blog = getBlog(a.blog);
        return (
          <li key={`${a.blog}/${a.slug}`}>
            <BentoTile href={routes.article(a.blog, a.slug)} className={styles.card}>
              <div className={styles.media}>
                <TileMedia
                  image={a.image}
                  placeholder="Foto"
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  priority={i < 3}
                />
              </div>
              <div className={styles.body}>
                {blog && <span className={styles.category}>{blog.title}</span>}
                <h2 className={styles.title}>{a.title}</h2>
                <p className={styles.excerpt}>{a.description}</p>
                <span className={styles.meta}>
                  <time dateTime={a.date}>{formatDate(a.date)}</time> · {a.minutes} {blogSection.readingTime}
                </span>
              </div>
            </BentoTile>
          </li>
        );
      })}
    </ul>
  );
}
