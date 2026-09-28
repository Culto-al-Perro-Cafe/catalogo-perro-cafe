import { blogSection } from "@/config/blogs";
import { getProductLine } from "@/config/lines";
import { routes } from "@/lib/routes";
import { TileMedia } from "@/components/ui/BentoTile";
import { Button } from "@/components/ui/Button";
import styles from "./EmbedCard.module.css";
import { trackAttrs } from "@/lib/analytics";
import { analyticsEvents } from "@/config/analytics";

/** `::producto{id="…"}` — recommends a catalog line inside an article. */
export function ProductCard({ id }: { id: string }) {
  const line = getProductLine(id);
  if (!line) return null;
  return (
    <aside aria-label={blogSection.product.eyebrow} className={styles.card}>
      <div className={styles.media}>
        <TileMedia image={line.image} placeholder="Foto" sizes="(max-width: 639px) 100vw, 260px" />
      </div>
      <div className={styles.content}>
        <span className={styles.eyebrow}>{blogSection.product.eyebrow}</span>
        <p className={styles.heading}>{line.name}</p>
        <p className={styles.text}>{line.summary}</p>
        <div className={styles.action}>
          <Button
            href={routes.line(line.slug)}
            variant="roast"
            size="lg"
            iconAfter="arrow_forward"
            {...trackAttrs(analyticsEvents.ctaClick, { cta: "article_product", line: line.slug })}
          >
            {blogSection.product.button}
          </Button>
        </div>
      </div>
    </aside>
  );
}
