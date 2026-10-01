import { siteConfig } from "@/config/site";
import { analyticsEvents } from "@/config/analytics";
import { trackAttrs } from "@/lib/analytics";
import { routes } from "@/lib/routes";
import { BentoTile } from "@/components/ui/BentoTile";
import { Button } from "@/components/ui/Button";
import { PointingHand } from "@/components/ui/PointingHand";
import styles from "./SalesBlock.module.css";

/**
 * The home page "#ventas" block: orange tile with the headline and a pointing hand at
 * "Platica con ventas". Copy: siteConfig.home.cta. `href` can preselect a line (routes.quote).
 */
export function SalesBlock({ href = routes.sales, cta }: { href?: string; /** Analytics id. */ cta: string }) {
  const { title, button } = siteConfig.home.cta;
  return (
    <BentoTile tone="orange" shadow="offset" className={styles.tile}>
      <h2 className={`t-display-sm ${styles.title}`}>{title}</h2>
      <div className={styles.action}>
        <PointingHand className={styles.hand} />
        <Button
          href={href}
          variant="primary"
          size="xl"
          iconAfter="arrow_forward"
          {...trackAttrs(analyticsEvents.ctaClick, { cta })}
        >
          {button}
        </Button>
      </div>
    </BentoTile>
  );
}
