import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { leadForms, type CtaId, type LeadFormId } from "@/config/ctas";
import type { Article } from "@/lib/blog";
import { publicImageSize, renderMarkdown } from "@/lib/markdown";
import { ArticleCta } from "./ArticleCta";
import { ProductCard } from "./ProductCard";
import { LeadForm } from "./LeadForm";
import styles from "./ArticleBody.module.css";

function ArticleLink({ href = "", children, ...rest }: ComponentProps<"a">) {
  if (href.startsWith("/")) return <Link href={href}>{children}</Link>;
  if (href.startsWith("#")) return <a href={href} {...rest}>{children}</a>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

function ArticleImage({ src, alt = "", title, ...rest }: ComponentProps<"img"> & { "data-block"?: string }) {
  if (typeof src !== "string") return null;
  const size = publicImageSize(src);
  const img = size ? (
    <Image src={src} alt={alt} width={size.width} height={size.height} sizes="(max-width: 820px) 100vw, 760px" />
  ) : (
    // External image without known dimensions.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading="lazy" />
  );
  // Standalone images get a real <figure>; inline ones must stay valid inside a <p>.
  if (rest["data-block"] === undefined) {
    return (
      <span className={styles.figure}>
        {img}
        {title && <span className={styles.caption}>{title}</span>}
      </span>
    );
  }
  return (
    <figure className={styles.figure}>
      {img}
      {title && <figcaption className={styles.caption}>{title}</figcaption>}
    </figure>
  );
}

export function ArticleBody({ article }: { article: Article }) {
  const content = renderMarkdown(
    article.body,
    {
      a: ArticleLink,
      img: ArticleImage,
      table: (props: ComponentProps<"table">) => (
        <div className={styles.tableWrap}>
          <table {...props} />
        </div>
      ),
      // Embeds (see lib/markdown.tsx and config/ctas.ts)
      "cta-embed": ({ cta, label, href, children }: { cta?: CtaId; label?: string; href?: string; children?: ReactNode }) => (
        <ArticleCta id={cta} label={label} href={href}>
          {children}
        </ArticleCta>
      ),
      "product-embed": ({ line }: { line: string }) => <ProductCard id={line} />,
      "lead-form-embed": ({ form }: { form: LeadFormId }) => {
        // Only display copy goes to the client; the webhook stays on the server.
        const cfg = leadForms[form];
        const copy = {
          title: cfg.title,
          body: cfg.body,
          stageLabel: cfg.stageLabel,
          stageOptions: cfg.stageOptions,
          submitLabel: cfg.submitLabel,
          pendingLabel: cfg.pendingLabel,
          trustCopy: cfg.trustCopy,
          success: cfg.success,
          error: cfg.error,
        };
        return <LeadForm id={form} copy={copy} />;
      },
    },
    `content/blogs/${article.blog}/${article.slug}.md`,
  );
  return <div className={styles.prose}>{content}</div>;
}
