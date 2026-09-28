import { productLines } from "@/config/lines";
import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";
import { catalogJsonLd } from "@/lib/seo";
import { LineCard } from "@/components/catalog/LineCard";
import { JsonLd } from "@/components/site/JsonLd";
import { BentoTile } from "@/components/ui/BentoTile";
import { Button } from "@/components/ui/Button";
import { PointingHand } from "@/components/ui/PointingHand";
import styles from "./page.module.css";

export default function CatalogPage() {
  const { home } = siteConfig;
  return (
    <>
      <JsonLd data={catalogJsonLd()} />

      <section className={styles.hero}>
        <h1 className={`t-display-sm ${styles.heroTitle}`}>
          {home.title} <span className="t-accent">{home.titleHighlight}</span>
        </h1>
        <p className={`t-body-lg ${styles.heroSub}`}>
          {home.subtitle.map((sentence, i) => (
            <span key={sentence} className={styles.sentence}>
              {sentence}
              <span className={styles.period}>.</span>
              {i < home.subtitle.length - 1 && " "}
            </span>
          ))}
        </p>
      </section>

      <section id="lineas" aria-labelledby="lineas-title" className={styles.lines}>
        <h2 id="lineas-title" className="sr-only">
          {home.linesHeading}
        </h2>
        <ul className={styles.grid}>
          {productLines.map((line, i) => (
            <li key={line.slug}>
              <LineCard line={line} priority={i < 4} />
            </li>
          ))}
        </ul>
      </section>

      <section id="ventas" className={styles.cta}>
        <BentoTile tone="orange" shadow="offset" className={styles.ctaTile}>
          <h2 className={`t-display-sm ${styles.ctaTitle}`}>{home.cta.title}</h2>
          <div className={styles.ctaAction}>
            <PointingHand className={styles.ctaHand} />
            <Button href={routes.sales} variant="primary" size="xl" iconAfter="arrow_forward">
              {home.cta.button}
            </Button>
          </div>
        </BentoTile>
      </section>
    </>
  );
}
