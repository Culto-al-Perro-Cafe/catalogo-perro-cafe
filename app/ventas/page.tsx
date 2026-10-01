import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { SalesForm, SalesFormFromParams } from "@/components/sales/SalesForm";
import { BackBar } from "@/components/site/BackBar";
import styles from "./page.module.css";
import { trackAttrs } from "@/lib/analytics";
import { analyticsEvents } from "@/config/analytics";

export const metadata = pageMetadata({
  title: siteConfig.sales.seoTitle,
  description: siteConfig.sales.seoDescription,
  path: routes.sales,
});

export default function SalesPage() {
  const { sales } = siteConfig;
  return (
    <div id="contacto" className={styles.page}>
      <BackBar />
      <div className={styles.grid}>
        <div className={styles.intro}>
          <h1 className={`t-display-md ${styles.title}`}>
            {sales.title} <span className="t-accent">{sales.titleHighlight}</span>
          </h1>
          <p className={`t-body-lg ${styles.subtitle}`}>{sales.subtitle}</p>
          <p className={`t-body-lg ${styles.subtitle}`}>
            <a
              href={sales.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsapp}
              {...trackAttrs(analyticsEvents.ctaClick, { cta: "ventas_whatsapp" })}
            >
              {sales.whatsapp.label}
            </a>
          </p>
        </div>
        {/* The page stays static; ?linea= is read on the client. */}
        <Suspense fallback={<SalesForm />}>
          <SalesFormFromParams />
        </Suspense>
      </div>
    </div>
  );
}
