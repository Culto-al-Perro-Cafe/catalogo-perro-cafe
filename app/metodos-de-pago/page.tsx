import Image from "next/image";
import { paymentsConfig as cfg } from "@/config/payments";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { BackBar } from "@/components/site/BackBar";
import { BentoTile } from "@/components/ui/BentoTile";
import { CopyButton } from "@/components/ui/CopyButton";
import styles from "./page.module.css";
import { trackAttrs } from "@/lib/analytics";
import { analyticsEvents } from "@/config/analytics";

export const metadata = pageMetadata({
  title: cfg.seoTitle,
  description: cfg.seoDescription,
  path: routes.payments,
});

/** Métodos de pago (migrated from the Shopify store). Data: config/payments.ts */
export default function PaymentsPage() {
  const clabe = cfg.spei.rows.find((row) => row.label === "CLABE")?.value;
  return (
    <div className={styles.page}>
      <BackBar />

      <header className={styles.header}>
        <h1 className={`t-display-md ${styles.title}`}>
          {cfg.title} <span className="t-accent">{cfg.titleAccent}</span>
        </h1>
        <p className={`t-body-lg ${styles.intro}`}>{cfg.intro}</p>
        <p className={`t-body-lg ${styles.intro}`}>
          {cfg.proof.text}{" "}
          <a
            href={cfg.proof.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsapp}
            {...trackAttrs(analyticsEvents.ctaClick, { cta: "pagos_whatsapp" })}
          >
            {cfg.proof.linkLabel}
          </a>
          .
        </p>
      </header>

      <div className={styles.grid}>
        <BentoTile tone="ivory" className={styles.tile}>
          <h2 className={styles.tileTitle}>{cfg.spei.title}</h2>
          <dl className={styles.rows}>
            {cfg.spei.rows.map((row) => (
              <div key={row.label} className={styles.row}>
                <dt>{row.label}</dt>
                <dd className={row.label === "CLABE" ? styles.clabe : undefined}>{row.value}</dd>
              </div>
            ))}
          </dl>
          {clabe && (
            <div className={styles.actions}>
              <CopyButton value={clabe} label={cfg.spei.copyLabel} copiedLabel={cfg.spei.copiedLabel} />
            </div>
          )}
        </BentoTile>

        <BentoTile tone="ivory" className={styles.tile}>
          <h2 className={styles.tileTitle}>{cfg.codi.title}</h2>
          <ol className={styles.steps}>
            {cfg.codi.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <div className={styles.qr}>
            <Image src={cfg.codi.image.src} alt={cfg.codi.image.alt} width={359} height={358} />
          </div>
        </BentoTile>
      </div>
    </div>
  );
}
