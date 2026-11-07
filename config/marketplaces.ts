/**
 * Marketplaces where our bags and the kit are sold, in display order.
 * Links live with each product (config/beans.ts, config/kit.ts); a product only shows the marketplaces it has links for.
 */
export const marketplaces = [
  { id: "mercadoLibre", name: "Mercado Libre" },
  { id: "amazon", name: "Amazon" },
  { id: "tiktok", name: "TikTok Shop" },
] as const;

export type MarketplaceId = (typeof marketplaces)[number]["id"];
