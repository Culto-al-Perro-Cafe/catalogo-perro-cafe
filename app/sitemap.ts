import type { MetadataRoute } from "next";
import { blogs } from "@/config/blogs";
import { beans, hasFicha } from "@/config/beans";
import { productLines } from "@/config/lines";
import { getAllArticles } from "@/lib/blog";
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
    { url: absoluteUrl(routes.menudeo), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl(routes.kit), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl(routes.about), changeFrequency: "yearly", priority: 0.5 },
    ...beans.filter(hasFicha).map((bean) => ({
      url: absoluteUrl(routes.ficha(bean.slug)),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: absoluteUrl(routes.blogs), changeFrequency: "weekly", priority: 0.6 },
    ...blogs.map((blog) => ({
      url: absoluteUrl(routes.blog(blog.slug)),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...getAllArticles().map((a) => ({
      url: absoluteUrl(routes.article(a.blog, a.slug)),
      lastModified: a.updated ?? a.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
