import type { ReactNode } from "react";
import { ctas, type CtaConfig, type CtaId } from "@/config/ctas";
import { utmConfig } from "@/config/utm";
import { withUtm } from "@/lib/utm";
import { TileMedia } from "@/components/ui/BentoTile";
import { Button } from "@/components/ui/Button";
import styles from "./EmbedCard.module.css";
import { trackAttrs } from "@/lib/analytics";
import { analyticsEvents } from "@/config/analytics";

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
  utmContent,
}: {
  id?: CtaId;
  label?: string;
  href?: string;
  children?: ReactNode;
  /** Article slug, used as utm_content when the CTA points off-site. */
  utmContent?: string;
}) {
  const preset: Partial<CtaConfig> = id ? ctas[id] : {};
  const target = withUtm(href ?? preset.href ?? "/ventas", {
    campaign: utmConfig.campaigns.blog,
    content: utmContent,
  });
  const tracking = trackAttrs(analyticsEvents.ctaClick, { cta: "article_cta", cta_id: id ?? "custom", article: utmContent });
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
            <Button href={target} variant="roast" size="lg" iconAfter="arrow_forward" {...tracking}>
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
        <Button href={target} variant="primary" size="lg" iconAfter="arrow_forward" {...tracking}>
          {label ?? preset.label ?? "Platica con ventas"}
        </Button>
      </div>
    </aside>
  );
}
