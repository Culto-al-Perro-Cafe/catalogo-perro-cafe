/**
 * Menudeo (retail) page: our bagged coffee, sold on Mercado Libre.
 * Edit products, links and copy here — /menudeo reads everything from this file.
 */

/** Our Mercado Libre store. Used until each product has its own listing URL. */
export const MERCADO_LIBRE_STORE = "https://mercadolibre.perro.cafe";

export type RetailProduct = {
  id: string;
  name: string;
  short: string;
  /** This product's own Mercado Libre listing. */
  url: string;
  /** Bag photo in /public. Leave undefined to show the "Foto bolsa" placeholder. */
  image?: { src: string; alt: string };
};

export const menudeoConfig = {
  title: "Menudeo",
  subtitle: "Café tostado, fresco. Envío gratis a todo México.",
  seoTitle: "Menudeo · Café en bolsa en Mercado Libre",
  seoDescription:
    "Compra nuestro café tostado en bolsa para tu casa directo en Mercado Libre: Natural Honey, Espresso, Restaurante, Oficina, Tueste Intenso y Descafeinado.",

  /** `id` of the product shown large (2×2) at the start of the grid. */
  featured: "honey",
  featuredBadge: "Destacado",
  buyLabel: "Comprar Ahora ↗",
  itemBuyLabel: "Ver ↗",
  /** Screen-reader label for each product link: "<name> — comprar en Mercado Libre". */
  linkLabelSuffix: "comprar en Mercado Libre",
  photoPlaceholder: "Foto bolsa",

  /** Section after the grid offering the sample kit (styled like the home "#ventas" block). */
  sampleKit: {
    title: "Kit de Muestras",
    body: "¿No te decides? Pruébalos todos: una muestra de cada café para encontrar tu favorito.",
    label: "Comprar Ahora ↗",
    url: MERCADO_LIBRE_STORE, // TODO: link to the kit's Mercado Libre listing
    image: {
      src: "/images/cta/caja-catadora-del-perro.png",
      alt: "Kit de Muestras: una bolsa de cada café de Culto al Perro Café",
    },
  },

  /** Closing tile that sends businesses to the B2B catalog. */
  businessCta: {
    title: "¿Compras para tu negocio?",
    body: "Mayoreo desde 5 kg con envío a todo México.",
    label: "Ver mayoreo",
  },
};

export const retailProducts: RetailProduct[] = [
  {
    id: "honey",
    name: "Natural Honey",
    short: "Proceso honey: dulce, frutal y con cuerpo sedoso. Nuestro favorito para métodos de filtrado en casa.",
    url: MERCADO_LIBRE_STORE, // TODO: link to this product's Mercado Libre listing
  },
  {
    id: "espresso",
    name: "Café para Espresso",
    short: "Consistencia lote tras lote, para tu máquina en casa.",
    url: MERCADO_LIBRE_STORE, // TODO: link to this product's Mercado Libre listing
  },
  {
    id: "restaurante",
    name: "Línea Restaurante",
    short: "Balanceado y sin amargor. Le gusta a todos.",
    url: MERCADO_LIBRE_STORE, // TODO: link to this product's Mercado Libre listing
  },
  {
    id: "oficina",
    name: "Línea Oficina",
    short: "Rendidor y rico, para cafetera de goteo.",
    url: MERCADO_LIBRE_STORE, // TODO: link to this product's Mercado Libre listing
  },
  {
    id: "intenso",
    name: "Línea Tueste Intenso",
    short: "Fuerte y con carácter.",
    url: MERCADO_LIBRE_STORE, // TODO: link to this product's Mercado Libre listing
  },
  {
    id: "descafeinado",
    name: "Descafeinado",
    short: "Todo el sabor, sin cafeína. Para la taza de la noche.",
    url: MERCADO_LIBRE_STORE, // TODO: link to this product's Mercado Libre listing
  },
];
