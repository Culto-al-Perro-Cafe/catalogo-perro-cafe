/**
 * Permanent redirects from the old Shopify site (www.perro.cafe) to their replacements here.
 * Source: docs/migration/perro-cafe-migration-status.md. next.config.ts serves them as 308s.
 */
export const legacyRedirects: { source: string; destination: string }[] = [
  // Sample kit (two duplicate Shopify products) → kit landing.
  { source: "/products/caja-catadora-del-perro", destination: "/kit" },
  { source: "/products/caja-de-muestras-de-cafe-empieza-aqui", destination: "/kit" },

  // Retail coffees and their collection → Menudeo (sold on Mercado Libre).
  { source: "/products/cafe-tostado-veracruz-honey-natural", destination: "/menudeo" },
  { source: "/products/cafe-tostado-veracruz", destination: "/menudeo" },
  { source: "/products/cafe-tostado-chiapas-americana", destination: "/menudeo" },
  { source: "/products/cafe-tostado-veracruz-san-felipe-tradicional", destination: "/menudeo" },
  { source: "/collections/nuestro-cafe", destination: "/menudeo" },

  // B2B landings built as products → catalog lines.
  { source: "/products/proveedor-de-cafe-para-restaurantes", destination: "/lineas/restaurante" },
  { source: "/products/cafe-para-oficinas", destination: "/lineas/oficina" },

  // About page.
  { source: "/pages/sobre-nosotros", destination: "/nosotros" },

  // Payment methods page.
  { source: "/pages/metodos-de-pago", destination: "/metodos-de-pago" },

  // Wholesale and contact pages → B2B catalog and sales form.
  { source: "/pages/mayoreo", destination: "/" },
  { source: "/pages/contact", destination: "/ventas" },

  // Mistyped link in circulation.
  { source: "/lineas/espress", destination: "/lineas/espresso" },
];
