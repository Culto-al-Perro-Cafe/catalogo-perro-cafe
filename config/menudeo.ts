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
  /**
   * Tile background behind the photo. Photos are shown whole (never cropped), so the
   * tile fills the leftover space; match the photo's backdrop (left → right) to hide it.
   */
  backdrop?: string;
};

export const menudeoConfig = {
  title: "Compra por Bolsa",
  subtitle: "Café tostado con envío gratis a todo México.",
  seoTitle: "Compra por Bolsa · Presentaciones de 250gr y 1Kg. Contamos con Kit de muestras.",
  seoDescription:
    "Compra nuestro café tostado en bolsa para tu casa directo en Mercado Libre: Natural Honey, Espresso, Restaurante, Oficina, Tueste Intenso y Descafeinado.",

  /** `id` of the product shown large (2×2) at the start of the grid. */
  featured: "honey",
  featuredBadge: "Destacado",
  buyLabel: "Comprar Ahora ↗",
  itemBuyLabel: "Comprar ↗",
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
    title: "¿Compras para tu negocio?",
    body: "Mayoreo desde 5 kg con envío a todo México.",
    label: "Ver opciones",
  },
};

export const retailProducts: RetailProduct[] = [
  {
    id: "honey",
    name: "Natural Honey",
    short: "Dulce, frutal y con cuerpo sedoso. Nuestro favorito para métodos de filtrado en casa.",
    url: "https://www.mercadolibre.com.mx/up/MLMU4615173825",
    image: { src: "/images/menudeo/bolsa-1.jpg", alt: "Bolsa de Natural Honey, café tostado Culto al Perro Café" },
    backdrop: "linear-gradient(90deg, #feddb2, #fec696)",
  },
  {
    id: "espresso",
    name: "Café para Espresso",
    short: "Consistencia lote tras lote, para tu máquina en casa.",
    url: "https://www.mercadolibre.com.mx/up/MLMU5270060645",
    image: { src: "/images/menudeo/bolsa-2.jpg", alt: "Bolsa de Café para Espresso, café tostado Culto al Perro Café" },
    backdrop: "linear-gradient(90deg, #fedfb6, #fabc8d)",
  },
  {
    id: "restaurante",
    name: "Línea Restaurante",
    short: "Balanceado y sin amargor. Le gusta a todos.",
    url: MERCADO_LIBRE_STORE, // TODO: link to this product's Mercado Libre listing
    image: { src: "/images/menudeo/bolsa-3.jpg", alt: "Bolsa de Línea Restaurante, café tostado Culto al Perro Café" },
    backdrop: "linear-gradient(90deg, #a0daf8, #59b9ed)",
  },
  {
    id: "oficina",
    name: "Línea Oficina",
    short: "Rendidor y rico, para cafetera de goteo.",
    url: MERCADO_LIBRE_STORE, // TODO: link to this product's Mercado Libre listing
    image: { src: "/images/menudeo/bolsa-4.jpg", alt: "Bolsa de Línea Oficina, café tostado Culto al Perro Café" },
    backdrop: "linear-gradient(90deg, #fee1b9, #fcc197)",
  },
  {
    id: "intenso",
    name: "Tueste Intenso",
    short: "Fuerte y con carácter.",
    url: "https://www.mercadolibre.com.mx/up/MLMU3908637861",
    image: { src: "/images/menudeo/bolsa-5.jpg", alt: "Bolsa de Tueste Intenso, café tostado Culto al Perro Café" },
    backdrop: "linear-gradient(90deg, #fed3a6, #fed3a6)",
  },
  {
    id: "descafeinado",
    name: "Descafeinado",
    short: "Todo el sabor, sin cafeína. Para la taza de la noche.",
    url: "https://www.mercadolibre.com.mx/up/MLMU4615380893",
    image: { src: "/images/menudeo/bolsa-1.jpg", alt: "Bolsa de Descafeinado, café tostado Culto al Perro Café" },
    backdrop: "linear-gradient(90deg, #feddb2, #fec696)",
  },
];
