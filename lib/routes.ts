export const routes = {
  home: "/",
  sales: "/ventas",
  line: (slug: string) => `/lineas/${slug}`,
  /** Sales form with a product line preselected. */
  quote: (slug: string) => `/ventas?linea=${encodeURIComponent(slug)}`,
  /** Sales page after a successful submission — shows the thank-you panel. */
  salesSent: "/ventas?enviado=1",
} as const;
