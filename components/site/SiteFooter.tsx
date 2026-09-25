import Link from "next/link";
import { productLines } from "@/config/lines";
import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";
import { BrandMark } from "./BrandMark";
import { FitText } from "./FitText";
import styles from "./SiteFooter.module.css";

function resolveLinks(links: (typeof siteConfig.footer.columns)[number]["links"]) {
  if (links === "lines") {
    return productLines.map((line) => ({
      label: line.name,
      href: routes.line(line.slug),
    }));
  }
  return links;
}

export function SiteFooter() {
  const { footer } = siteConfig;
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.mark}>
          <BrandMark width={48} label={siteConfig.shortName} />
        </div>
        <div className={styles.columns}>
          {footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title} className={styles.column}>
              <span className={styles.columnTitle}>{column.title}</span>
              {resolveLinks(column.links).map((link) => (
                <Link key={link.label} href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
      </div>
      <div className={styles.wordmarkBox} aria-hidden="true">
        <FitText className={styles.wordmark}>{footer.wordmark}</FitText>
      </div>
      <div className={styles.bottom}>
        <span>{footer.madeIn}</span>
      </div>
    </footer>
  );
}
