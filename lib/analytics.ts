import posthog from "posthog-js";
import type { AnalyticsEvent } from "@/config/analytics";

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Capture a custom event from client code. Never pass personal data (names, emails, phones). */
export function track(event: AnalyticsEvent, props?: Props) {
  try {
    posthog.capture(event, props);
  } catch {
    // Analytics must never break the page.
  }
}

/**
 * Fire a GA4 event via gtag.js. Safe when gtag isn't loaded (dev, ad blockers, before the
 * script runs): no-ops instead of throwing. With multiple gtag('config', …) lines, the event
 * is delivered to every configured property.
 */
export function gtagEvent(name: string, params?: Props) {
  try {
    if (typeof window === "undefined") return;
    const gtag = window.gtag;
    if (typeof gtag !== "function") return;
    const cleaned: Record<string, string | number | boolean> = {};
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) cleaned[key] = value;
      }
    }
    gtag("event", name, cleaned);
  } catch {
    // Analytics must never break the page.
  }
}

/**
 * Data attributes that make a link/button report `event` when clicked — usable from
 * server components. The click listener in instrumentation-client.ts reads them:
 *   <a {...trackAttrs("cta_click", { cta: "home_ventas" })}>
 * becomes data-ph-event="cta_click" data-ph-cta="home_ventas".
 */
export function trackAttrs(event: AnalyticsEvent, props: Props = {}): Record<string, string> {
  const attrs: Record<string, string> = { "data-ph-event": event };
  for (const [key, value] of Object.entries(props)) {
    if (value !== undefined) attrs[`data-ph-${key.replace(/_/g, "-")}`] = String(value);
  }
  return attrs;
}

/** Hostname helpers for outbound GA4 click events (WhatsApp / marketplaces). */
export function marketplaceFromUrl(url: URL): "mercadolibre" | "amazon" | null {
  const host = url.hostname.replace(/^www\./, "").toLowerCase();
  if (
    host === "mercadolibre.perro.cafe" ||
    host.includes("mercadolibre.") ||
    host.endsWith("mercadolibre.com") ||
    host.endsWith("mercadolibre.com.mx") ||
    host === "mercadolibre.com" ||
    host === "mercadolibre.com.mx"
  ) {
    return "mercadolibre";
  }
  if (host === "amazon.perro.cafe" || host.includes("amazon.")) {
    return "amazon";
  }
  return null;
}

export function isWhatsAppUrl(url: URL): boolean {
  const host = url.hostname.replace(/^www\./, "").toLowerCase();
  return host === "wa.me" || host === "api.whatsapp.com" || host.endsWith("whatsapp.com");
}
