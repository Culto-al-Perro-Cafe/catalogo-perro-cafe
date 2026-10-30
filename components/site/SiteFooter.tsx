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

const socialLinks = [
  { name: "Instagram", url: siteConfig.social.instagram },
  { name: "TikTok", url: siteConfig.social.tiktok },
  { name: "Facebook", url: siteConfig.social.facebook },
  { name: "X", url: siteConfig.social.x },
  { name: "LinkedIn", url: siteConfig.social.linkedin },
  { name: "Mercado Libre", url: siteConfig.social.mercadoLibre },
  { name: "Amazon", url: siteConfig.social.amazon },
];

export function SiteFooter() {
  const { footer, business } = siteConfig;
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
          <nav aria-label={footer.socialTitle} className={styles.column}>
            <span className={styles.columnTitle}>{footer.socialTitle}</span>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className={styles.wordmarkBox} aria-hidden="true">
        <FitText className={styles.wordmark}>{footer.wordmark}</FitText>
      </div>
      <div className={styles.bottom}>
        <div className={styles.address}>
          <span className={styles.addressTitle}>{footer.addressTitle}</span>
          <span>{business.address.street}</span>
          <span>
            {business.address.locality}, {business.address.region} {business.address.postalCode}
          </span>
          <span>{footer.hours}</span>
          <a href={`tel:${business.phone}`} className={styles.phoneLink}>
            {business.phone}
          </a>
        </div>
        <span>{footer.madeIn}</span>
      </div>
      <p className={styles.privacy}>{footer.privacyNotice}</p>
    </footer>
  );
}
