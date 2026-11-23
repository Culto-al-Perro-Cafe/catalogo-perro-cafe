/**
 * Analytics: PostHog (product analytics) and Google Analytics (gtag.js). The PostHog token
 * and GA measurement IDs are public by design (they ship in the browser bundle), so they
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
  /**
   * Google Analytics 4 (gtag.js). Both properties share one tag so custom events reach both:
   * current property first, then the legacy property for history comparisons.
   */
  googleTag: {
    ids: ["G-HQJYYRWX7G", "G-N1YFWYPKSF"] as const,
  },
} as const;

/** Custom events. Page views and session recordings are captured automatically. */
export const analyticsEvents = {
  quoteSubmitted: "quote_submitted",
  mercadoLibreClick: "mercado_libre_click",
  /** Amazon and TikTok Shop buttons (Mercado Libre keeps its own event). */
  marketplaceClick: "marketplace_click",
  ctaClick: "cta_click",
  leadFormSubmitted: "lead_form_submitted",
  articleShared: "article_shared",
} as const;

/** GA4 event names (gtag). Kept separate from PostHog names where the taxonomies differ. */
export const gtagEvents = {
  generateLead: "generate_lead",
  whatsappClick: "whatsapp_click",
  marketplaceClick: "marketplace_click",
} as const;

export type AnalyticsEvent = (typeof analyticsEvents)[keyof typeof analyticsEvents];
