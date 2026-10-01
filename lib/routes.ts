export const routes = {
  home: "/",
  sales: "/ventas",
  menudeo: "/menudeo",
  kit: "/kit",
  about: "/nosotros",
  payments: "/metodos-de-pago",
  /** Ficha técnica of a coffee (config/beans.ts). */
  ficha: (slug: string) => `/fichas/${slug}`,
  line: (slug: string) => `/lineas/${slug}`,
  /** Sales form with a product line preselected. */
  quote: (slug: string) => `/ventas?linea=${encodeURIComponent(slug)}`,
  blogs: "/blogs",
  blog: (blog: string) => `/blogs/${blog}`,
  article: (blog: string, slug: string) => `/blogs/${blog}/${slug}`,
  /** Sales page after a successful submission — shows the thank-you panel. */
  salesSent: "/ventas?enviado=1",
} as const;
