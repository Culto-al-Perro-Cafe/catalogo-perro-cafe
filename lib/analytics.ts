import posthog from "posthog-js";
import type { AnalyticsEvent } from "@/config/analytics";

type Props = Record<string, string | number | boolean | undefined>;

/** Capture a custom event from client code. Never pass personal data (names, emails, phones). */
export function track(event: AnalyticsEvent, props?: Props) {
  try {
    posthog.capture(event, props);
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
