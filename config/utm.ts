/**
 * UTM parameters added to every external link the site renders (see lib/utm.ts).
 * Links that already carry utm_* params keep their own values.
 */
export const utmConfig = {
  /** Who is sending the visitor: this site. */
  source: "catalogo.perro.cafe",
  medium: "referral",

  /** utm_campaign per area of the site. */
  campaigns: {
    menudeo: "menudeo",
    kit: "kit",
    blog: "blog",
    blogShare: "blog_share",
  },

  /**
   * Hosts that never get UTMs: messaging deep links (extra params can break the
   * prefilled message) and short links that don't forward query strings.
   */
  skipHosts: ["wa.me", "api.whatsapp.com", "forms.gle"],

  /** How the article URL is tagged when shared from the share bar. */
  share: {
    facebook: { source: "facebook", medium: "social" },
    x: { source: "x", medium: "social" },
    email: { source: "email", medium: "email" },
  },
} as const;
