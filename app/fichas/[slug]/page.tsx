import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { beans, fichaConfig as cfg, getBean, hasFicha } from "@/config/beans";
import { analyticsEvents } from "@/config/analytics";
import { utmConfig } from "@/config/utm";
import { trackAttrs } from "@/lib/analytics";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { withUtm } from "@/lib/utm";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import styles from "./page.module.css";

/** Only beans with a data sheet (config/beans.ts) have a ficha page; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return beans.filter(hasFicha).map((bean) => ({ slug: bean.slug }));
}

export async function generateMetadata({ params }: PageProps<"/fichas/[slug]">): Promise<Metadata> {
  const bean = getBean((await params).slug);
  if (!hasFicha(bean)) return {};
  const facts = bean.specs.map((s) => `${s.label}: ${s.value}`).join(". ");
  return pageMetadata({
    title: `${bean.name} · ${cfg.label}`,
    description: [bean.notes, facts].filter(Boolean).join(". ").slice(0, 300),
    path: routes.ficha(bean.slug),
    image: bean.image,
  });
}

/** Ficha técnica (design: Catálogo B2B → Ficha). Data: config/beans.ts */
export default async function FichaPage({ params }: PageProps<"/fichas/[slug]">) {
  const bean = getBean((await params).slug);
  if (!hasFicha(bean)) notFound();

  const buy = bean.mercadoLibre
    ? [
        { label: cfg.buy1kgLabel, url: bean.mercadoLibre.kg1, size: "1kg" },
        { label: cfg.buy250gLabel, url: bean.mercadoLibre.g250, size: "250g" },
      ]
    : [];

  return (
    <div className={styles.page}>
      <div className={styles.bar}>
        <BackButton label={cfg.backLabel} fallbackHref={routes.menudeo} />
        <span className={styles.crumb}>{cfg.label}</span>
      </div>

      <div className={styles.grid}>
        <div className={styles.photo}>
          <Image src={bean.image.src} alt={bean.image.alt} fill priority sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
        <article className={styles.sheet}>
          <div className={styles.head}>
            <h1 className={styles.title}>{bean.name}</h1>
            {bean.notes && <p className={styles.notes}>{bean.notes}</p>}
          </div>
          <dl className={styles.specs}>
            {bean.specs.map((spec) => (
              <div key={spec.label} className={styles.spec}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </article>
      </div>

      <section aria-labelledby="ficha-buy" className={styles.buy}>
        <h2 id="ficha-buy" className={styles.buyTitle}>
          {cfg.buyTitle}
        </h2>
        <div className={styles.buyActions}>
          <Button
            href={routes.sales}
            variant="roast"
            size="xl"
            iconAfter="arrow_forward"
            {...trackAttrs(analyticsEvents.ctaClick, { cta: "ficha_quote", bean: bean.slug })}
          >
            {cfg.quoteLabel}
          </Button>
          {buy.map((option) => (
            <a
              key={option.size}
              href={withUtm(option.url, { campaign: utmConfig.campaigns.menudeo, content: `ficha-${bean.slug}-${option.size}` })}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${bean.name}, ${option.label} — ${cfg.buyLabelSuffix}`}
              className="cp-btn"
              data-variant="secondary"
              data-size="xl"
              {...trackAttrs(analyticsEvents.mercadoLibreClick, { product: bean.slug, placement: `ficha_${option.size}` })}
            >
              <span className="cp-btn__label">{option.label}</span>
              <Icon name="arrow_forward" size={24} />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
