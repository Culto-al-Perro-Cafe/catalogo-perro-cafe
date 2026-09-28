import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogSection, getBlog } from "@/config/blogs";
import { formatDate, getAllArticles, getArticle, getRelatedArticles } from "@/lib/blog";
import { publicImageSize } from "@/lib/markdown";
import { routes } from "@/lib/routes";
import { absoluteUrl, articleJsonLd, pageMetadata } from "@/lib/seo";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { ShareBar } from "@/components/blog/ShareBar";
import { utmConfig } from "@/config/utm";
import { tagOwnUrl } from "@/lib/utm";
import { JsonLd } from "@/components/site/JsonLd";
import { Button } from "@/components/ui/Button";
import styles from "./page.module.css";

/** Only articles in content/blogs exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ blog: a.blog, slug: a.slug }));
}

async function load(params: PageProps<"/blogs/[blog]/[slug]">["params"]) {
  const { blog: blogSlug, slug } = await params;
  const blog = getBlog(blogSlug);
  const article = getArticle(blogSlug, slug);
  return blog && article ? { blog, article } : undefined;
}

export async function generateMetadata({ params }: PageProps<"/blogs/[blog]/[slug]">): Promise<Metadata> {
  const found = await load(params);
  if (!found) return {};
  const { article } = found;
  return pageMetadata({
    title: article.seoTitle ?? article.title,
    description: article.description,
    path: routes.article(article.blog, article.slug),
    image: article.image,
    article: { publishedTime: article.date, modifiedTime: article.updated, author: article.author },
  });
}

/** The article URL tagged per share network (config/utm.ts). */
function shareUrls(url: string, slug: string) {
  const tag = (network: keyof typeof utmConfig.share) =>
    tagOwnUrl(url, { ...utmConfig.share[network], campaign: utmConfig.campaigns.blogShare, content: slug });
  return { facebook: tag("facebook"), x: tag("x"), email: tag("email") };
}

/** Blog post (design: Catálogo B2B → Blog → post). */
export default async function ArticlePage({ params }: PageProps<"/blogs/[blog]/[slug]">) {
  const found = await load(params);
  if (!found) notFound();
  const { blog, article } = found;
  const cover = article.image && publicImageSize(article.image.src);
  const articleUrl = absoluteUrl(routes.article(article.blog, article.slug));

  return (
    <div className={styles.page}>
      <JsonLd data={articleJsonLd(article, blog)} />

      <div className={styles.bar}>
        <Button href={routes.blogs} variant="secondary" icon="arrow_back">
          {blogSection.backLabel}
        </Button>
        <nav aria-label="Ruta de navegación" className={styles.crumb}>
          <Link href={routes.blogs}>{blogSection.name}</Link> / <Link href={routes.blog(blog.slug)}>{blog.title}</Link>
        </nav>
      </div>

      <article className={styles.article}>
        <header className={styles.header}>
          <Link href={routes.blog(blog.slug)} className={styles.category}>
            {blog.title}
          </Link>
          <h1 className={styles.title}>{article.title}</h1>
          {/* Date + reading time on the left, share actions right-aligned on the same row. */}
          <div className={styles.metaRow}>
            <span className={styles.meta}>
              <time dateTime={article.date}>{formatDate(article.date)}</time> · {article.minutes} {blogSection.readingTime}
            </span>
            <ShareBar url={articleUrl} title={article.title} tagged={shareUrls(articleUrl, article.slug)} />
          </div>
        </header>

        {article.image && cover && (
          <figure className={styles.cover}>
            <div className={styles.coverFrame}>
              <Image
                src={article.image.src}
                alt={article.image.alt}
                fill
                sizes="(max-width: 820px) 100vw, 760px"
                priority
              />
            </div>
            {article.image.caption && <figcaption className={styles.caption}>{article.image.caption}</figcaption>}
          </figure>
        )}

        <ArticleBody article={article} />

        <RelatedArticles articles={getRelatedArticles(article)} />
      </article>
    </div>
  );
}
