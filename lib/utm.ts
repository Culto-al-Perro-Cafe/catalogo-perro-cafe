import { siteConfig } from "@/config/site";
import { utmConfig } from "@/config/utm";

type Utm = { source?: string; medium?: string; campaign: string; content?: string };

const ownHost = new URL(siteConfig.url).host;

/**
 * Adds UTM params to an external http(s) link. Leaves alone: on-site links, mailto/tel,
 * anchors, hosts in `utmConfig.skipHosts`, and links that already have any utm_* param.
 */
export function withUtm(href: string, { source = utmConfig.source, medium = utmConfig.medium, campaign, content }: Utm): string {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return href; // relative, anchor or malformed
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return href;
  if (url.host === ownHost) return href;
  if (utmConfig.skipHosts.some((h) => url.host === h || url.host.endsWith(`.${h}`))) return href;
  if ([...url.searchParams.keys()].some((k) => k.startsWith("utm_"))) return href;
  return tag(url, { source, medium, campaign, content });
}

/** Tags one of our own URLs (e.g. an article being shared) — no host checks. */
export function tagOwnUrl(href: string, utm: Required<Pick<Utm, "source" | "medium" | "campaign">> & Pick<Utm, "content">): string {
  return tag(new URL(href), utm);
}

function tag(url: URL, { source, medium, campaign, content }: Utm): string {
  url.searchParams.set("utm_source", source!);
  url.searchParams.set("utm_medium", medium!);
  url.searchParams.set("utm_campaign", campaign);
  if (content) url.searchParams.set("utm_content", content);
  return url.toString();
}
