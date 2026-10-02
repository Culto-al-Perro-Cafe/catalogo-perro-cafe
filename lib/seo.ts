import type { Metadata } from "next";
import { blogSection, type BlogConfig } from "@/config/blogs";
import { productLines, type ProductLine } from "@/config/lines";
import type { Article } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";

/** Keep complete words when a description exceeds the supplied character budget. */
export function metaDescription(text: string, maxLength = 160): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  const words = normalized.split(" ");
  let result = "";
  for (const word of words) {
    const next = result ? `${result} ${word}` : word;
    if (next.length > maxLength - 1) break;
    result = next;
  }
  // An unusually long first word is safer intact than misleadingly cut in half.
  return result ? `${result}…` : words[0];
}

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
  article,
}: {
  title: string;
  description: string;
  path: string;
  image?: { src: string; alt: string };
  /** Blog posts: Open Graph "article" with dates and author. */
  article?: { publishedTime: string; modifiedTime?: string; author: string };
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.shortName}`;
  const shared = {
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    url: path,
    title: fullTitle,
    description,
    ...(image && { images: [{ url: image.src, alt: image.alt }] }),
  };
  return {
    title,
    description,
    alternates: { canonical: path },
    ...(article && { authors: [{ name: article.author }] }),
    openGraph: article
      ? {
          ...shared,
          type: "article",
          publishedTime: article.publishedTime,
          modifiedTime: article.modifiedTime,
          authors: [article.author],
        }
      : { ...shared, type: "website" },
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

function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function blogIndexJsonLd(articles: Article[]) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: `${blogSection.title} · ${siteConfig.shortName}`,
      description: blogSection.description,
      url: absoluteUrl(routes.blogs),
      inLanguage: siteConfig.lang,
      publisher: { "@id": organizationId },
      blogPost: articles.map((a) => ({
        "@type": "BlogPosting",
        headline: a.title,
        url: absoluteUrl(routes.article(a.blog, a.slug)),
        datePublished: a.date,
      })),
    },
    breadcrumbJsonLd([
      { name: siteConfig.shortName, path: routes.home },
      { name: blogSection.name, path: routes.blogs },
    ]),
  ];
}

export function blogJsonLd(blog: BlogConfig, articles: Article[]) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: `${blog.title} · ${blogSection.name} ${siteConfig.shortName}`,
      description: blog.description,
      url: absoluteUrl(routes.blog(blog.slug)),
      inLanguage: siteConfig.lang,
      publisher: { "@id": organizationId },
      blogPost: articles.map((a) => ({
        "@type": "BlogPosting",
        headline: a.title,
        url: absoluteUrl(routes.article(a.blog, a.slug)),
        datePublished: a.date,
      })),
    },
    breadcrumbJsonLd([
      { name: siteConfig.shortName, path: routes.home },
      { name: blogSection.name, path: routes.blogs },
      { name: blog.title, path: routes.blog(blog.slug) },
    ]),
  ];
}

export function articleJsonLd(article: Article, blog: BlogConfig) {
  const url = absoluteUrl(routes.article(article.blog, article.slug));
  return [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.description,
      url,
      mainEntityOfPage: url,
      datePublished: article.date,
      dateModified: article.updated ?? article.date,
      inLanguage: siteConfig.lang,
      author: { "@type": "Person", name: article.author },
      publisher: { "@id": organizationId },
      ...(article.image && { image: absoluteUrl(article.image.src) }),
    },
    breadcrumbJsonLd([
      { name: siteConfig.shortName, path: routes.home },
      { name: blogSection.name, path: routes.blogs },
      { name: blog.title, path: routes.blog(blog.slug) },
      { name: article.title, path: routes.article(article.blog, article.slug) },
    ]),
  ];
}
