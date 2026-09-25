"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";
import { Button } from "@/components/ui/Button";
import styles from "./SalesCta.module.css";

/** No point linking to the sales page from the sales page. */
function useIsSalesPage() {
  return usePathname().startsWith(routes.sales);
}

/** Header CTA — tablet and desktop only. */
export function HeaderSalesCta() {
  if (useIsSalesPage()) return null;
  return (
    <nav aria-label="Principal" className={styles.header}>
      <Button href={routes.sales} variant="roast">
        {siteConfig.sales.navLabel}
      </Button>
    </nav>
  );
}

/** Bottom-pinned CTA bar — mobile only. The spacer keeps the footer from being covered. */
export function MobileSalesBar() {
  if (useIsSalesPage()) return null;
  return (
    <>
      <div className={styles.spacer} aria-hidden="true" />
      <div className={styles.bar}>
        <Button href={routes.sales} variant="roast" size="lg" iconAfter="arrow_forward" fullWidth>
          {siteConfig.sales.navLabel}
        </Button>
      </div>
    </>
  );
}
