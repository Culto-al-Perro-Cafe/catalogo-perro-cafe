/**
 * Menudeo (retail) page: our bagged coffee, sold on Mercado Libre.
 * Page copy lives here; the products (names, photos, Mercado Libre links, data sheets)
 * come from config/beans.ts, in the order listed in `products`.
 */

export const menudeoConfig = {
  title: "Compra por Bolsa",
  subtitle: "Café tostado con envío gratis a todo México.",
  seoTitle: "Compra por Bolsa · Presentaciones de 250gr y 1Kg. Contamos con Kit de muestras.",
  seoDescription:
    "Compra nuestro café tostado en bolsa para tu casa directo en Mercado Libre: Natural Honey Veracruz, Lavado Veracruz, Lavado Chiapas, Tueste Intenso, Descafeinado y Geisha/Marsellesa.",

  /** Bean slugs sold here, in order (config/beans.ts). */
  products: ["natural-honey-veracruz", "lavado-veracruz", "lavado-chiapas", "tueste-intenso", "descafeinado", "ambar-bourbon-puebla"],
  /** Slug of the product shown large (2×2) at the start of the grid. */
  featured: "natural-honey-veracruz",
  featuredBadge: "Destacado",
  /** Main button: the 1 kg bag on Mercado Libre. */
  buyLabel: "Comprar",
  /** Screen-reader label for each product link: "<name> — comprar en Mercado Libre". */
  linkLabelSuffix: "comprar en Mercado Libre",
  photoPlaceholder: "Foto bolsa",

  /** Section after the grid offering the sample kit (styled like the home "#ventas" block). */
  sampleKit: {
    title: "¿No te decides?",
    body: "Prueba el Kit de Degustación: una muestra de cada grano para encontrar tu favorito.",
    label: "Comprar Ahora ↗",
    url: "https://www.mercadolibre.com.mx/up/MLMU3920166824",
    /** Section background (overrides the default orange tile). */
    background: "#2da598",
    image: {
      src: "/images/menudeo/kit-de-muestras.jpg",
      alt: "Kit de Muestras: caja con bolsas de café tostado Culto al Perro Café",
    },
  },

  /** Closing tile that sends businesses to the B2B catalog. */
  businessCta: {
    title: "¿Buscas para tu negocio?",
    body: "Mayoreo desde 5 kg con envío a todo México.",
    /** The whole tile links to the B2B catalog; this label reads like the home cards' "Ver →". */
    label: "Ver opciones →",
  },
};
