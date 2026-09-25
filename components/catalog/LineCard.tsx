import type { ProductLine } from "@/config/lines";
import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";
import { BentoTile, TileMedia } from "@/components/ui/BentoTile";
import styles from "./LineCard.module.css";

export function LineCard({
  line,
  priority,
}: {
  line: ProductLine;
  priority?: boolean;
}) {
  return (
    <BentoTile href={routes.line(line.slug)} className={styles.card}>
      <div className={styles.media}>
        <TileMedia
          image={line.image}
          placeholder="Foto"
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
          priority={priority}
        />
      </div>
      <div className={styles.body}>
        <h3 className={`t-display-sm ${styles.title}`}>
          {line.titlePre}
          <br />
          {line.titleMain}
        </h3>
        <p className={`t-body ${styles.summary}`}>{line.summary}</p>
        <span className={styles.more}>{siteConfig.home.cardCta}</span>
      </div>
    </BentoTile>
  );
}
