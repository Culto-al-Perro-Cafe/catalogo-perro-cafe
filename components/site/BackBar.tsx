import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";
import { Button } from "@/components/ui/Button";
import styles from "./BackBar.module.css";

/** "← Todas las líneas" bar at the top of inner pages, with an optional breadcrumb. */
export function BackBar({
  breadcrumb,
  backHref = routes.home,
  backLabel = siteConfig.line.backLabel,
}: {
  breadcrumb?: ReactNode;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <div className={styles.bar}>
      <Button href={backHref} variant="secondary" icon="arrow_back">
        {backLabel}
      </Button>
      {breadcrumb && (
        <nav aria-label="Ruta de navegación" className={`t-label ${styles.crumb}`}>
          {breadcrumb}
        </nav>
      )}
    </div>
  );
}
