import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";
import { HeaderSalesCta } from "./SalesCta";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const { logo } = siteConfig;
  return (
    <header className={styles.header}>
      <Link
        href={routes.home}
        className={styles.home}
        aria-label={`${siteConfig.name} — inicio`}
      >
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          priority
          className={styles.logo}
        />
      </Link>
      <HeaderSalesCta />
    </header>
  );
}
