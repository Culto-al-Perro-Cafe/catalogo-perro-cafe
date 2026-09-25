export const routes = {
  home: "/",
  sales: "/ventas",
  line: (slug: string) => `/lineas/${slug}`,
  /** Sales form with a product line preselected. */
  quote: (slug: string) => `/ventas?linea=${encodeURIComponent(slug)}`,
} as const;
