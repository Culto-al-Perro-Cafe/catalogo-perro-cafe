import { getProductLine } from "@/config/lines";
import { siteConfig } from "@/config/site";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = `Línea de café — ${siteConfig.shortName}`;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const line = getProductLine(slug);
  return renderOgImage({
    eyebrow: line?.summary ?? siteConfig.home.linesHeading,
    title: line?.titlePre ?? siteConfig.home.linesHeading,
    highlight: line?.titleMain,
  });
}
