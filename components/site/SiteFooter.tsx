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

const socialIcons = [
  {
    name: "Instagram",
    url: siteConfig.social.instagram,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    url: siteConfig.social.tiktok,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: siteConfig.social.facebook,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 011-1h3v-4h-3a5 5 0 00-5 5v2.01h-2l-.396 3.98h2.396v8.01z" />
      </svg>
    ),
  },
  {
    name: "X",
    url: siteConfig.social.x,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: siteConfig.social.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.94 5a2 2 0 11-4-.002 2 2 0 014 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
      </svg>
    ),
  },
];

export function SiteFooter() {
  const { footer, business } = siteConfig;
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.mark}>
          <BrandMark width={48} label={siteConfig.shortName} />
        </div>
        <div className={styles.content}>
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
            <div className={styles.column}>
              <span className={styles.columnTitle}>{footer.addressTitle}</span>
              <span className={styles.contactText}>
                {business.address.street}
                <br />
                {business.address.locality}, {business.address.region} {business.address.postalCode}
              </span>
              <span className={styles.contactText}>{footer.hours}</span>
              <a href={`tel:${business.phone}`} className={styles.contactText}>
                {business.phone}
              </a>
            </div>
          </div>
          <div className={styles.socialBar}>
            <div className={styles.socialSection}>
              <span className={styles.columnTitle}>{footer.socialTitle}</span>
              <div className={styles.socialIcons}>
                {socialIcons.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialIcon}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
                <a
                  href={siteConfig.social.mercadoLibre}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLabel}
                  aria-label="Mercado Libre"
                >
                  Mercado Libre
                </a>
                <a
                  href={siteConfig.social.amazon}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLabel}
                  aria-label="Amazon"
                >
                  Amazon
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.wordmarkBox} aria-hidden="true">
        <FitText className={styles.wordmark}>{footer.wordmark}</FitText>
      </div>
      <div className={styles.bottom}>
        <span>{footer.madeIn}</span>
      </div>
      <p className={styles.privacy}>{footer.privacyNotice}</p>
    </footer>
  );
}
