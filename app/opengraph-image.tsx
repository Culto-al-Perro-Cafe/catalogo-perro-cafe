import { siteConfig } from "@/config/site";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = `${siteConfig.home.title} ${siteConfig.home.titleHighlight} — ${siteConfig.shortName}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: siteConfig.home.subtitle.map((s) => `${s}.`).join(" "),
    title: siteConfig.home.title,
    highlight: siteConfig.home.titleHighlight,
  });
}
