/**
 * Analytics: PostHog (product analytics) and Google Analytics (gtag.js). The PostHog token
 * and GA measurement ID are public by design (they ship in the browser bundle), so they
 * live here rather than in env vars.
 */
export const analyticsConfig = {
  posthog: {
    token: "phc_1QoX6RrPKPDFrQ1yD9dO5JjHhUgqq8EvVieSGbwHvWE",
    /** Same-origin path proxied to PostHog (next.config.ts rewrites) so ad blockers don't drop events. */
    apiHost: "/ingest",
    /** PostHog US cloud (the project lives in the US region). */
    upstream: "https://us.i.posthog.com",
    upstreamAssets: "https://us-assets.i.posthog.com",
    uiHost: "https://us.posthog.com",
  },
  /** Google Analytics 4 (gtag.js). The measurement ID is public by design. */
  googleTag: {
    id: "G-HQJYYRWX7G",
  },
} as const;

/** Custom events. Page views and session recordings are captured automatically. */
export const analyticsEvents = {
  quoteSubmitted: "quote_submitted",
  mercadoLibreClick: "mercado_libre_click",
  ctaClick: "cta_click",
  leadFormSubmitted: "lead_form_submitted",
  articleShared: "article_shared",
} as const;

export type AnalyticsEvent = (typeof analyticsEvents)[keyof typeof analyticsEvents];
