import type { Metadata, Viewport } from "next";
import { Josefin_Sans, Rokkitt } from "next/font/google";
import { siteConfig } from "@/config/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { GoogleTag } from "@/components/site/GoogleTag";
import { JsonLd } from "@/components/site/JsonLd";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobileSalesBar } from "@/components/site/SalesCta";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Ticker } from "@/components/site/Ticker";
import "./globals.css";

const rokkitt = Rokkitt({
  variable: "--font-rokkitt",
  subsets: ["latin"],
  display: "swap",
});

const josefin = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.seo.title} | ${siteConfig.shortName}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={siteConfig.lang} className={`${rokkitt.variable} ${josefin.variable}`}>
      <body>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Ticker items={siteConfig.ticker} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <MobileSalesBar />
        <GoogleTag />
      </body>
    </html>
  );
}
