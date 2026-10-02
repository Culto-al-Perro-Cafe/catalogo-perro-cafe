import type { CSSProperties } from "react";
import { siteConfig } from "@/config/site";
import { analyticsEvents } from "@/config/analytics";
import { trackAttrs } from "@/lib/analytics";
import { routes } from "@/lib/routes";
import { BentoTile } from "@/components/ui/BentoTile";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PointingHand } from "@/components/ui/PointingHand";
import styles from "./SalesBlock.module.css";

/**
 * The home page "#ventas" block: orange tile with the headline and a pointing hand at the button.
 * Defaults to "Platica con ventas" (siteConfig.home.cta); pass title/body/label/href to reuse the
 * layout for another CTA (e.g. Whatsapp on /ventas). `external` opens the link in a new tab.
 */
export function SalesBlock({
  href = routes.sales,
  cta,
  title = siteConfig.home.cta.title,
  body,
  label = siteConfig.home.cta.button,
  external = false,
  background,
}: {
  href?: string;
  /** Analytics id. */
  cta: string;
  title?: string;
  body?: string;
  label?: string;
  external?: boolean;
  /** Tile background, overriding the orange. */
  background?: CSSProperties["background"];
}) {
  const tracking = trackAttrs(analyticsEvents.ctaClick, { cta });
  return (
    <BentoTile tone="orange" shadow="offset" className={styles.tile} style={background ? { background } : undefined}>
      <div className={styles.text}>
        <h2 className={`t-display-sm ${styles.title}`}>{title}</h2>
        {body && <p className={styles.body}>{body}</p>}
      </div>
      <div className={styles.action}>
        <PointingHand className={styles.hand} />
        {external ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="cp-btn"
            data-variant="primary"
            data-size="xl"
            {...tracking}
          >
            <span className="cp-btn__label">{label}</span>
            <Icon name="arrow_outward" size={24} />
          </a>
        ) : (
          <Button href={href} variant="primary" size="xl" iconAfter="arrow_forward" {...tracking}>
            {label}
          </Button>
        )}
      </div>
    </BentoTile>
  );
}
