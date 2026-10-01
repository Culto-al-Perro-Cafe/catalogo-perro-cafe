import { menudeoConfig as cfg } from "@/config/menudeo";
import { fichaConfig, getBean, hasFicha, type Bean } from "@/config/beans";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { withUtm } from "@/lib/utm";
import { utmConfig } from "@/config/utm";
import Image from "next/image";
import { BentoTile, TileMedia } from "@/components/ui/BentoTile";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PointingHand } from "@/components/ui/PointingHand";
import styles from "./page.module.css";
import { trackAttrs } from "@/lib/analytics";
import { analyticsEvents } from "@/config/analytics";

export const metadata = pageMetadata({ title: cfg.seoTitle, description: cfg.seoDescription, path: routes.menudeo });

/** The card's two actions: buy the 1 kg bag on Mercado Libre, and its ficha técnica (when there is one). */
function ProductActions({ bean, placement }: { bean: Bean; placement: "featured" | "grid" }) {
  if (!bean.mercadoLibre && !hasFicha(bean)) return null;
  return (
    <div className={styles.actions}>
      {bean.mercadoLibre && (
        <a
          href={withUtm(bean.mercadoLibre.kg1, { campaign: utmConfig.campaigns.menudeo, content: bean.slug })}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${bean.name}, 1 kg — ${cfg.linkLabelSuffix}`}
          {...trackAttrs(analyticsEvents.mercadoLibreClick, { product: bean.slug, placement })}
          className="cp-btn"
          data-variant="roast"
          data-size={placement === "featured" ? "xl" : "md"}
        >
          <span className="cp-btn__label">{cfg.buyLabel}</span>
          <Icon name="arrow_outward" size={placement === "featured" ? 24 : 16} />
        </a>
      )}
      {hasFicha(bean) && (
        <Button
          href={routes.ficha(bean.slug)}
          variant="secondary"
          size={placement === "featured" ? "lg" : "md"}
          {...trackAttrs(analyticsEvents.ctaClick, { cta: "menudeo_ficha", bean: bean.slug })}
        >
          {fichaConfig.linkLabel}
        </Button>
      )}
    </div>
  );
}

/** Menudeo (design: Catálogo B2B → Menudeo). Data: config/menudeo.ts */
export default function MenudeoPage() {
  const products = cfg.products.map(getBean).filter((bean): bean is Bean => Boolean(bean));
  const featured = products.find((p) => p.slug === cfg.featured) ?? products[0];
  const rest = products.filter((p) => p !== featured);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{cfg.title}</h1>
        <p className={styles.subtitle}>{cfg.subtitle}</p>
      </header>

      <div className={styles.grid}>
        <article className={`cp-tile ${styles.featured}`} data-tone="ivory">
          <div className={styles.media} style={{ background: featured.retail.backdrop }}>
            <TileMedia
              image={featured.retail.image}
              placeholder={`${cfg.photoPlaceholder} — ${featured.name}`}
              sizes="(max-width: 1100px) 100vw, 40vw"
              priority
            />
            <span className={styles.badge}>{cfg.featuredBadge}</span>
          </div>
          <div className={styles.featuredBody}>
            <div className={styles.featuredText}>
              <h2 className={styles.featuredName}>{featured.name}</h2>
              <p className={styles.featuredShort}>{featured.retail.short}</p>
            </div>
            <ProductActions bean={featured} placement="featured" />
          </div>
        </article>

        {rest.map((bean) => (
          <article key={bean.slug} className={`cp-tile ${styles.item}`} data-tone="ivory">
            <div className={styles.media} style={{ background: bean.retail.backdrop }}>
              <TileMedia
                image={bean.retail.image}
                placeholder={cfg.photoPlaceholder}
                sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 20vw"
              />
            </div>
            <div className={styles.itemBody}>
              <h3 className={styles.itemName}>{bean.name}</h3>
              {bean.retail.label && <p className={styles.itemLabel}>{bean.retail.label}</p>}
              <ProductActions bean={bean} placement="grid" />
            </div>
          </article>
        ))}

        <div className={styles.business}>
          <h3 className={styles.businessTitle}>{cfg.businessCta.title}</h3>
          <p className={styles.businessBody}>{cfg.businessCta.body}</p>
          <div>
            <Button
              href={routes.home}
              variant="primary"
              iconAfter="arrow_forward"
              {...trackAttrs(analyticsEvents.ctaClick, { cta: "menudeo_mayoreo" })}
            >
              {cfg.businessCta.label}
            </Button>
          </div>
        </div>
      </div>

      {/* Sample kit — same treatment as the home page "#ventas" block. */}
      <section id="kit-de-muestras" aria-labelledby="kit-title" className={styles.kit}>
        <BentoTile
          tone="orange"
          shadow="offset"
          className={styles.kitTile}
          style={{ background: cfg.sampleKit.background }}
        >
          <div className={styles.kitPhoto}>
            <Image src={cfg.sampleKit.image.src} alt={cfg.sampleKit.image.alt} fill sizes="(max-width: 639px) 100vw, 220px" />
          </div>
          <div className={styles.kitText}>
            <h2 id="kit-title" className={`t-display-sm ${styles.kitTitle}`}>
              {cfg.sampleKit.title}
            </h2>
            <p className={styles.kitBody}>{cfg.sampleKit.body}</p>
          </div>
          <div className={styles.kitAction}>
            <PointingHand className={styles.kitHand} />
            <a
              href={withUtm(cfg.sampleKit.url, { campaign: utmConfig.campaigns.menudeo, content: "kit-de-muestras" })}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${cfg.sampleKit.title} — ${cfg.linkLabelSuffix}`}
              {...trackAttrs(analyticsEvents.mercadoLibreClick, { product: "kit-de-muestras", placement: "kit" })}
              className="cp-btn"
              data-variant="primary"
              data-size="xl"
            >
              <span className="cp-btn__label">{cfg.sampleKit.label}</span>
            </a>
          </div>
        </BentoTile>
      </section>
    </div>
  );
}
