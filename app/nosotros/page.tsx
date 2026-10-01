import Image from "next/image";
import { aboutConfig as cfg } from "@/config/about";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { Ticker } from "@/components/site/Ticker";
import { BeanIcon } from "@/components/ui/BeanIcon";
import styles from "./page.module.css";
import { trackAttrs } from "@/lib/analytics";
import { analyticsEvents } from "@/config/analytics";

export const metadata = pageMetadata({
  title: cfg.seoTitle,
  description: cfg.seoDescription,
  path: routes.about,
  image: cfg.hero.image,
});

type Action = { label: string; href: string };

/** Button row: the first action is the main one (with arrow), the rest secondary. */
function Actions({
  actions,
  primary,
  size,
  placement,
}: {
  actions: readonly Action[];
  primary: "roast" | "primary";
  size: "lg" | "xl";
  placement: string;
}) {
  return (
    <div className={styles.actions}>
      {actions.map((action, i) => (
        <Button
          key={action.href}
          href={action.href}
          variant={i === 0 ? primary : "secondary"}
          size={size}
          iconAfter={i === 0 ? "arrow_forward" : undefined}
          {...trackAttrs(analyticsEvents.ctaClick, { cta: `about_${placement}`, href: action.href })}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}

/** Sobre nosotros (design: Catálogo B2B → Sobre nosotros). Data: config/about.ts */
export default function AboutPage() {
  const { hero, quote, checklist, closing } = cfg;

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={`${styles.panel} ${styles.heroPanel}`}>
          <span className={styles.eyebrow}>{hero.eyebrow}</span>
          <h1 id="about-title" className={styles.heroTitle}>
            {hero.title} <span className={styles.accent}>{hero.titleAccent}</span>
          </h1>
          <p className={styles.heroBody}>{hero.body}</p>
          <Actions actions={hero.actions} primary="roast" size="lg" placement="hero" />
        </div>
        <div className={styles.photo}>
          <Image src={hero.image.src} alt={hero.image.alt} fill priority sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
      </section>

      <Ticker items={cfg.ticker} variant="band" />

      {cfg.blocks.map((block, i) => {
        if (block.type === "quote") {
          return (
            <blockquote key={i} className={styles.quote}>
              <p>
                {quote.text} <span className={styles.quoteAccent}>{quote.accent}</span>
              </p>
            </blockquote>
          );
        }

        if (block.type === "checklist") {
          return (
            <section key={i} className={styles.split}>
              <div className={styles.outlinePanel}>
                <span className={`${styles.eyebrow} ${styles.onInk}`}>{checklist.eyebrow}</span>
                <h2 className={styles.title}>{checklist.title}</h2>
                <p className={styles.text}>{checklist.body}</p>
              </div>
              <div className={`${styles.panel} ${styles.checkPanel}`}>
                <ul className={styles.checklist}>
                  {checklist.items.map((item) => (
                    <li key={item}>
                      <BeanIcon />
                      <span className={styles.checkText}>{item}</span>
                    </li>
                  ))}
                </ul>
                <Actions actions={[checklist.action]} primary="roast" size="lg" placement="checklist" />
              </div>
            </section>
          );
        }

        return (
          <section key={i} className={styles.split} data-flip={block.flip ? "" : undefined}>
            <div className={styles.panel}>
              <span className={styles.eyebrow}>{block.eyebrow}</span>
              <h2 className={styles.title}>{block.title}</h2>
              {block.body.map((paragraph) => (
                <p key={paragraph} className={styles.text}>
                  {paragraph}
                </p>
              ))}
            </div>
            <figure className={styles.photo}>
              <Image src={block.image.src} alt={block.image.alt} fill sizes="(max-width: 900px) 100vw, 50vw" />
            </figure>
          </section>
        );
      })}

      <section className={styles.closing} aria-labelledby="about-closing">
        <div className={styles.closingText}>
          <h2 id="about-closing" className={styles.closingTitle}>
            {closing.title}
          </h2>
          <p className={styles.text}>{closing.body}</p>
        </div>
        <Actions actions={closing.actions} primary="primary" size="xl" placement="closing" />
      </section>
    </div>
  );
}
