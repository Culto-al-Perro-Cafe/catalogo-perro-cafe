import type { ReactNode } from "react";
import { ctas, type CtaConfig, type CtaId } from "@/config/ctas";
import { TileMedia } from "@/components/ui/BentoTile";
import { Button } from "@/components/ui/Button";
import styles from "./EmbedCard.module.css";

/**
 * CTA embedded in an article: a preset from config/ctas.ts (`id`), optionally with a
 * different button `label`/`href`, or a one-off CTA whose title/body come from `children`.
 * Text CTAs render as the orange lead box; CTAs with an image as the ivory card.
 */
export function ArticleCta({
  id,
  label,
  href,
  children,
}: {
  id?: CtaId;
  label?: string;
  href?: string;
  children?: ReactNode;
}) {
  const preset: Partial<CtaConfig> = id ? ctas[id] : {};
  const target = href ?? preset.href ?? "/ventas";
  const hasCustomBody = Boolean(children && (!Array.isArray(children) || children.length > 0));

  const text = hasCustomBody ? (
    <div className={styles.custom}>{children}</div>
  ) : (
    <>
      {preset.title && <p className={styles.heading}>{preset.title}</p>}
      {preset.body && <p className={styles.text}>{preset.body}</p>}
    </>
  );

  if (preset.image) {
    return (
      <aside className={styles.card}>
        <div className={styles.media}>
          <TileMedia image={preset.image} placeholder="Foto" sizes="(max-width: 519px) 100vw, 260px" />
        </div>
        <div className={styles.content}>
          {text}
          <div className={styles.action}>
            <Button href={target} variant="roast" size="lg" iconAfter="arrow_forward">
              {label ?? preset.label ?? "Ver más"}
            </Button>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={styles.lead}>
      {text}
      <div className={styles.action}>
        <Button href={target} variant="primary" size="lg" iconAfter="arrow_forward">
          {label ?? preset.label ?? "Platica con ventas"}
        </Button>
      </div>
    </aside>
  );
}
