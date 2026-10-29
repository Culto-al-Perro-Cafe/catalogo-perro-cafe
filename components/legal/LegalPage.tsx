import Link from "next/link";
import type { ComponentProps } from "react";
import { formatLongDate, type LegalPage as LegalPageData } from "@/lib/legal";
import { renderMarkdown } from "@/lib/markdown";
import { BackBar } from "@/components/site/BackBar";
import styles from "./LegalPage.module.css";

function LegalLink({ href = "", children, ...rest }: ComponentProps<"a">) {
  if (href.startsWith("/")) return <Link href={href}>{children}</Link>;
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

/** Aviso de privacidad / Términos y condiciones (design: Privacidad.dc.html, Terminos.dc.html). */
export function LegalPage({ page }: { page: LegalPageData }) {
  return (
    <div className={styles.page}>
      <BackBar backLabel="Regresar" />
      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            {page.title} <span className="t-accent">{page.titleAccent}</span>
          </h1>
          <span className={styles.meta}>Última actualización: {formatLongDate(page.updated)}</span>
        </header>
        <div className={styles.prose}>
          <p className={styles.intro}>{page.intro}</p>
          {renderMarkdown(page.body, { a: LegalLink })}
        </div>
      </article>
    </div>
  );
}
