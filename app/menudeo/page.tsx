import { menudeoConfig as cfg, retailProducts, type RetailProduct } from "@/config/menudeo";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { withUtm } from "@/lib/utm";
import { utmConfig } from "@/config/utm";
import Image from "next/image";
import { BentoTile, TileMedia } from "@/components/ui/BentoTile";
import { Button } from "@/components/ui/Button";
import { PointingHand } from "@/components/ui/PointingHand";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: cfg.seoTitle,
  description: cfg.seoDescription,
  path: routes.menudeo,
});

/** External link to the product's Mercado Libre listing (new tab). */
function ProductLink({
  product,
  className,
  children,
}: {
  product: RetailProduct;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={withUtm(product.url, { campaign: utmConfig.campaigns.menudeo, content: product.id })}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${product.name} — ${cfg.linkLabelSuffix}`}
      className={`cp-tile ${className}`}
      data-tone="ivory"
    >
      {children}
    </a>
  );
}

/** Menudeo (design: Catálogo B2B → Menudeo). Data: config/menudeo.ts */
export default function MenudeoPage() {
  const featured = retailProducts.find((p) => p.id === cfg.featured) ?? retailProducts[0];
  const rest = retailProducts.filter((p) => p !== featured);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{cfg.title}</h1>
        <p className={styles.subtitle}>{cfg.subtitle}</p>
      </header>

      <div className={styles.grid}>
        <ProductLink product={featured} className={styles.featured}>
          <div className={styles.media} style={{ background: featured.backdrop }}>
            <TileMedia
              image={featured.image}
              placeholder={`${cfg.photoPlaceholder} — ${featured.name}`}
              sizes="(max-width: 1100px) 100vw, 40vw"
              priority
            />
            <span className={styles.badge}>{cfg.featuredBadge}</span>
          </div>
          <div className={styles.featuredBody}>
            <div className={styles.featuredText}>
              <h2 className={styles.featuredName}>{featured.name}</h2>
              <p className={styles.featuredShort}>{featured.short}</p>
            </div>
            <span className={styles.buy}>{cfg.buyLabel}</span>
          </div>
        </ProductLink>

        {rest.map((product) => (
          <ProductLink key={product.id} product={product} className={styles.item}>
            <div className={styles.media} style={{ background: product.backdrop }}>
              <TileMedia
                image={product.image}
                placeholder={cfg.photoPlaceholder}
                sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 20vw"
              />
            </div>
            <div className={styles.itemBody}>
              <h3 className={styles.itemName}>{product.name}</h3>
              <span className={styles.itemBuy}>{cfg.itemBuyLabel}</span>
            </div>
          </ProductLink>
        ))}

        <div className={styles.business}>
          <h3 className={styles.businessTitle}>{cfg.businessCta.title}</h3>
          <p className={styles.businessBody}>{cfg.businessCta.body}</p>
          <div>
            <Button href={routes.home} variant="primary" iconAfter="arrow_forward">
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
