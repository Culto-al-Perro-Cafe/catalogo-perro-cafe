import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductLine, productLines } from "@/config/lines";
import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";
import { pageMetadata, productLineJsonLd } from "@/lib/seo";
import { BackBar } from "@/components/site/BackBar";
import { JsonLd } from "@/components/site/JsonLd";
import { BentoTile, TileMedia } from "@/components/ui/BentoTile";
import { Button } from "@/components/ui/Button";
import styles from "./page.module.css";
import { trackAttrs } from "@/lib/analytics";
import { analyticsEvents } from "@/config/analytics";

/** Only the slugs in config/lines.ts exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return productLines.map((line) => ({ slug: line.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/lineas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const line = getProductLine(slug);
  if (!line) return {};

  return pageMetadata({
    title: line.name,
    description: line.seoDescription ?? `${line.summary} ${line.description}`,
    path: routes.line(line.slug),
    image: line.image,
  });
}

export default async function LinePage({ params }: PageProps<"/lineas/[slug]">) {
  const { slug } = await params;
  const line = getProductLine(slug);
  if (!line) notFound();

  return (
    <article className={styles.page}>
      <JsonLd data={productLineJsonLd(line)} />

      <BackBar
        breadcrumb={
          <>
            {siteConfig.line.breadcrumbRoot} / <span aria-current="page">{line.name}</span>
          </>
        }
      />

      <div className={styles.grid}>
        <BentoTile tone="sand" className={styles.photo}>
          <TileMedia
            image={line.image}
            placeholder={`Foto del producto — ${line.name}`}
            sizes="(max-width: 1080px) 100vw, 50vw"
            priority
          />
        </BentoTile>

        <BentoTile tone="ivory" className={styles.info}>
          <h1 className={`t-display-md ${styles.title}`}>
            {line.titlePre}
            <br />
            {line.titleMain}
          </h1>
          <p className={`t-body ${styles.description}`}>{line.description}</p>
          <ul className={styles.highlights}>
            {line.highlights.map((item) => (
              <li key={item}>
                <span className={styles.bullet} aria-hidden="true" />
                <span className={styles.highlightText}>{item}</span>
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <Button
              href={routes.quote(line.slug)}
              variant="roast"
              size="xl"
              iconAfter="arrow_forward"
              {...trackAttrs(analyticsEvents.ctaClick, { cta: "line_quote", line: line.slug })}
            >
              {siteConfig.line.quoteButton}
            </Button>
          </div>
        </BentoTile>
      </div>
    </article>
  );
}
