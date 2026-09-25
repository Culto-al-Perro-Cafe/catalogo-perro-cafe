import type { Metadata } from "next";
import { productLines, type ProductLine } from "@/config/lines";
import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

/**
 * Full metadata for an inner page. Nested `openGraph`/`twitter` objects replace
 * (not merge with) the layout's, so every page must repeat the shared fields.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: { src: string; alt: string };
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.shortName}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: path,
      title: fullTitle,
      description,
      ...(image && { images: [{ url: image.src, alt: image.alt }] }),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

const organizationId = absoluteUrl("/#organization");

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: absoluteUrl(),
    logo: absoluteUrl("/icon.svg"),
    slogan: siteConfig.business.slogan,
    description: siteConfig.seo.description,
    areaServed: { "@type": "Country", name: siteConfig.business.areaServed },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.business.city,
      addressRegion: siteConfig.business.region,
      addressCountry: siteConfig.business.country,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl(),
    inLanguage: siteConfig.lang,
    publisher: { "@id": organizationId },
  };
}

export function catalogJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: siteConfig.home.linesHeading,
    itemListElement: productLines.map((line, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: line.name,
      url: absoluteUrl(routes.line(line.slug)),
    })),
  };
}

export function productLineJsonLd(line: ProductLine) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: line.name,
      description: line.description,
      category: "Café tostado",
      url: absoluteUrl(routes.line(line.slug)),
      image: line.image
        ? absoluteUrl(line.image.src)
        : absoluteUrl(`${routes.line(line.slug)}/opengraph-image`),
      brand: { "@type": "Brand", name: siteConfig.shortName },
      manufacturer: { "@id": organizationId },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: siteConfig.line.breadcrumbRoot,
          item: absoluteUrl(routes.home),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: line.name,
          item: absoluteUrl(routes.line(line.slug)),
        },
      ],
    },
  ];
}
