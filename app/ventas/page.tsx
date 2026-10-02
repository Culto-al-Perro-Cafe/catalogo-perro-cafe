import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { SalesForm, SalesFormFromParams } from "@/components/sales/SalesForm";
import { BackBar } from "@/components/site/BackBar";
import { SalesBlock } from "@/components/site/SalesBlock";
import styles from "./page.module.css";

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
        </div>
        {/* The page stays static; ?linea= is read on the client. */}
        <Suspense fallback={<SalesForm />}>
          <SalesFormFromParams />
        </Suspense>
      </div>

      <SalesBlock
        href={sales.whatsapp.url}
        external
        title={sales.whatsapp.title}
        body={sales.whatsapp.body}
        label={sales.whatsapp.label}
        background={sales.whatsapp.background}
        cta="ventas_whatsapp"
      />
    </div>
  );
}
