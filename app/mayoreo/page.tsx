import Link from "next/link";
import { analyticsEvents } from "@/config/analytics";
import { getBean, hasFicha } from "@/config/beans";
import { mayoreoConfig as cfg } from "@/config/mayoreo";
import { trackAttrs } from "@/lib/analytics";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { BackBar } from "@/components/site/BackBar";
import { BentoTile } from "@/components/ui/BentoTile";
import { Button } from "@/components/ui/Button";
import styles from "./page.module.css";

/** Unlisted page: shared by link, so search engines are asked not to index it. */
export const metadata = {
  ...pageMetadata({ title: cfg.seoTitle, description: cfg.seoDescription, path: routes.wholesale }),
  robots: { index: false, follow: false },
};

const money = (amount: number) => `$${amount.toLocaleString("es-MX")}`;

/** Wholesale price list (design: Mayoreo.dc.html). Data: config/mayoreo.ts */
export default function WholesalePage() {
  const lastTier = cfg.tiers.length - 1;
  return (
    <div className={styles.page}>
      <BackBar />

      <header className={styles.header}>
        <h1 className={`t-display-md ${styles.title}`}>
          {cfg.title} <span className="t-accent">{cfg.titleAccent}</span>
        </h1>
        <p className={`t-body-lg ${styles.intro}`}>{cfg.intro}</p>
      </header>

      {cfg.groups.map((group) => (
        <section key={group.title} className={styles.sheet}>
          <h2 className={styles.sheetTitle}>{group.title}</h2>
          <div className={styles.rows}>
            <div className={`t-label ${styles.head}`} aria-hidden="true">
              <span />
              {cfg.tiers.map((tier) => (
                <span key={tier.label} className={styles.headTier}>
                  {tier.label}
                </span>
              ))}
            </div>
            {group.items.map((item) => (
              <div key={item.name} className={styles.row}>
                <div className={styles.name}>
                  {item.ficha && hasFicha(getBean(item.ficha)) ? (
                    <Link
                      href={routes.ficha(item.ficha)}
                      className={`${styles.nameText} ${styles.nameLink}`}
                      {...trackAttrs(analyticsEvents.ctaClick, { cta: "mayoreo_ficha", bean: item.ficha })}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <span className={styles.nameText}>{item.name}</span>
                  )}
                  <span className={styles.note}>{item.note}</span>
                </div>
                {cfg.tiers.map((tier, i) => (
                  <div key={tier.label} className={styles.tier}>
                    <span className={`t-label ${styles.tierLabel}`}>{tier.short}</span>
                    <span className={i === lastTier ? `${styles.price} ${styles.best}` : styles.price}>
                      <span className={styles.srOnly}>{tier.label}: </span>
                      {money(item.base - tier.off)}
                      <span className={styles.perKg}> {cfg.perKg}</span>
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      ))}

      <p className={styles.footnote}>
        {cfg.footnote.before}{" "}
        <Link href={routes.article(cfg.footnote.article.blog, cfg.footnote.article.slug)}>{cfg.footnote.link}</Link>
        {cfg.footnote.after}
      </p>

      <BentoTile tone="orange" shadow="offset" className={styles.cta}>
        <h2 className={`t-display-sm ${styles.ctaTitle}`}>{cfg.cta.title}</h2>
        <div className={styles.ctaAction}>
          <Button
            href={routes.sales}
            variant="primary"
            size="xl"
            iconAfter="arrow_forward"
            {...trackAttrs(analyticsEvents.ctaClick, { cta: "mayoreo_quote" })}
          >
            {cfg.cta.label}
          </Button>
        </div>
      </BentoTile>
    </div>
  );
}
