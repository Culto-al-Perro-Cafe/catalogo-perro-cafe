import type { MetadataRoute } from "next";
import { productLines } from "@/config/lines";
import { routes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl(routes.home), changeFrequency: "monthly", priority: 1 },
    ...productLines.map((line) => ({
      url: absoluteUrl(routes.line(line.slug)),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: absoluteUrl(routes.sales), changeFrequency: "yearly", priority: 0.6 },
  ];
}
