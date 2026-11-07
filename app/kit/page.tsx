import Image from "next/image";
import { kitConfig as cfg } from "@/config/kit";
import { fichaConfig, getBean, hasFicha } from "@/config/beans";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { withUtm } from "@/lib/utm";
import { utmConfig } from "@/config/utm";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MarketplaceLogo } from "@/components/ui/MarketplaceLogo";
import { marketplaces, type MarketplaceId } from "@/config/marketplaces";
import styles from "./page.module.css";
import { trackAttrs } from "@/lib/analytics";
import { analyticsEvents } from "@/config/analytics";

export const metadata = pageMetadata({
  title: cfg.seoTitle,
  description: cfg.seoDescription,
  path: routes.kit,
  image: cfg.hero.image,
});

/** "Comprar ahora": scrolls down to the "Dónde comprar" section. */
function BuyLink({ variant, placement }: { variant: "roast" | "primary"; placement: "hero" | "closing" }) {
  return (
    <a
      href={`#${cfg.where.id}`}
      {...trackAttrs(analyticsEvents.ctaClick, { cta: `kit_${placement}` })}
      className="cp-btn"
      data-variant={variant}
      data-size="xl"
    >
      <span className="cp-btn__label">{cfg.buyLabel}</span>
      <Icon name="arrow_downward" size={24} />
    </a>
  );
}

/** Marketplaces that sell the kit, in config/marketplaces.ts order. */
const shops = marketplaces.flatMap((market) => {
  const url = (cfg.shop as Partial<Record<MarketplaceId, string>>)[market.id];
  return url ? [{ ...market, url }] : [];
});

/** Kit de muestras landing (design: Kit.dc.html). Data: config/kit.ts */
export default function KitPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="kit-hero-title">
        <Image
          src={cfg.hero.image.src}
          alt={cfg.hero.image.alt}
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroCard}>
          <h1 id="kit-hero-title" className={styles.heroTitle}>
            {cfg.hero.title} <span className={styles.accent}>{cfg.hero.titleAccent}</span>
          </h1>
          <span className={styles.eyebrow}>{cfg.hero.eyebrow}</span>
          <p className={styles.heroBody}>{cfg.hero.body}</p>
          <div className={styles.heroActions}>
            <BuyLink variant="roast" placement="hero" />
            <span className={styles.shipping}>{cfg.hero.shipping}</span>
          </div>
        </div>
      </section>

      <section className={styles.statement}>
        <p className={styles.statementText}>
          {cfg.statement.text} <span className={styles.accent}>{cfg.statement.accent}</span>
        </p>
      </section>

      <section className={styles.uses}>
        {cfg.uses.map((use) => (
          <div key={use.title} className={styles.use} style={{ background: use.background }}>
            <div className={styles.useMedia}>
              <Image src={use.image.src} alt={use.image.alt} fill sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
            <div className={styles.useBody}>
              <h2 className={styles.useTitle}>{use.title}</h2>
              <p className={styles.text}>{use.body}</p>
            </div>
          </div>
        ))}
      </section>

      <section className={styles.contents} aria-labelledby="kit-contents-title">
        <div className={styles.contentsHeader}>
          <h2 id="kit-contents-title" className={styles.sectionTitle}>
            {cfg.contents.title}
          </h2>
          <p className={styles.contentsBody}>{cfg.contents.body}</p>
        </div>
        <div className={styles.beans}>
          {cfg.contents.beans.map((bean) => (
            <div key={bean.num} className={styles.bean}>
              <Image
                src={bean.image}
                alt={`Grano tostado — ${bean.name.join(" ")}`}
                fill
                sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, 25vw"
              />
              <span className={styles.beanNum}>{bean.num}</span>
              <div className={styles.beanCard}>
                <h3 className={styles.beanName}>
                  {bean.name[0]}
                  <br />
                  {bean.name[1]}
                </h3>
                <p className={styles.beanNote}>{bean.note}</p>
                {hasFicha(getBean(bean.ficha)) && (
                  <div className={styles.beanAction}>
                    <Button
                      href={routes.ficha(bean.ficha)}
                      variant="secondary"
                      iconAfter="arrow_forward"
                      {...trackAttrs(analyticsEvents.ctaClick, { cta: "kit_ficha", bean: bean.ficha })}
                    >
                      {fichaConfig.linkLabel}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.split}>
        <div className={styles.stepsMedia}>
          <Image src={cfg.steps.image.src} alt={cfg.steps.image.alt} fill sizes="(max-width: 800px) 100vw, 50vw" />
        </div>
        <div className={styles.steps}>
          <h2 className={styles.useTitle}>{cfg.steps.title}</h2>
          <ol className={styles.stepList}>
            {cfg.steps.items.map((step, i) => (
              <li key={step} className={styles.step}>
                <span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.stepText}>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${styles.split} ${styles.closing}`}>
        <div className={styles.closingBody}>
          <h2 className={styles.closingTitle}>{cfg.closing.title}</h2>
          <p className={styles.closingText}>{cfg.closing.body}</p>
          <div>
            <BuyLink variant="primary" placement="closing" />
          </div>
        </div>
        <div className={styles.closingMedia}>
          <Image src={cfg.closing.image.src} alt={cfg.closing.image.alt} fill sizes="(max-width: 800px) 100vw, 50vw" />
        </div>
      </section>

      <section id={cfg.where.id} className={styles.where} aria-labelledby="kit-where-title">
        <div className={styles.contentsHeader}>
          <h2 id="kit-where-title" className={styles.sectionTitle}>
            {cfg.where.title}
          </h2>
          <p className={styles.contentsBody}>{cfg.where.body}</p>
        </div>
        <div className={styles.whereActions}>
          {shops.map((market) => (
            <a
              key={market.id}
              href={withUtm(market.url, { campaign: utmConfig.campaigns.kit, content: market.id })}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${cfg.where.buyPrefix} ${market.name} ${cfg.where.linkLabelSuffix}`}
              {...(market.id === "mercadoLibre"
                ? trackAttrs(analyticsEvents.mercadoLibreClick, { product: "kit-de-muestras", placement: "kit_where" })
                : trackAttrs(analyticsEvents.marketplaceClick, {
                    marketplace: market.id,
                    product: "kit-de-muestras",
                    placement: "kit_where",
                  }))}
              className={`cp-btn ${styles.whereButton}`}
              data-variant="secondary"
              data-size="xl"
            >
              <MarketplaceLogo id={market.id} variant="solid" background="var(--color-paper-ivory)" />
              <span className="cp-btn__label">
                {cfg.where.buyPrefix} {market.name}
                {cfg.where.freeShipping.includes(market.id) && (
                  <sup className={styles.dagger} aria-hidden="true">
                    †
                  </sup>
                )}
              </span>
              <Icon name="arrow_outward" size={24} />
            </a>
          ))}
        </div>
        <p className={styles.footnote}>{cfg.where.footnote}</p>
      </section>
    </div>
  );
}
