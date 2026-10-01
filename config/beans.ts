/**
 * Our coffees ("granos"): data sheets, photos and Mercado Libre listings in one place.
 * Read by /fichas/<slug> (ficha técnica), /menudeo (retail cards), the "Granos disponibles"
 * cards on a catalog line (config/lines.ts) and the bean cards on /kit (config/kit.ts).
 */

/** Our Mercado Libre store. Used until a product has its own listing URL. */
export const MERCADO_LIBRE_STORE = "https://mercadolibre.perro.cafe";

type Photo = { src: string; alt: string };

export type Bean = {
  /** URL slug: /fichas/<slug> */
  slug: string;
  name: string;
  /** Tasting notes, shown as a paragraph under the name. Leave empty to hide. */
  notes: string;
  /**
   * Data sheet rows, in display order. Leave empty while there's no sheet: the ficha
   * page isn't published and "Ver ficha" buttons are hidden.
   */
  specs: { label: string; value: string }[];
  /** Roasted-bean photo for the ficha page. */
  image: Photo;
  /** Mercado Libre listings per bag size. Leave undefined while it isn't on sale: no buy buttons. */
  mercadoLibre?: { kg1: string; g250: string };
  /** Retail card on /menudeo. */
  retail: {
    /** One line under the name. */
    short: string;
    /** Bag photo, shown whole (never cropped). */
    image: Photo;
    /** Tile background behind the bag photo; match the photo's backdrop (left → right). */
    backdrop: string;
    /** Optional text label under the name, e.g. a launch date. */
    label?: string;
  };
};

export const beans: Bean[] = [
  {
    // Source: Finca Corahe technical sheet "FICHA TECNICA EUROPEA".
    slug: "lavado-veracruz",
    name: "Lavado Veracruz",
    notes: "Caramelo, piloncillo, miel, acidez cítrica, balanceado, cuerpo sedoso",
    specs: [
      { label: "Nombre de la finca", value: "Finca Corahe" },
      { label: "Zona", value: "Huatusco" },
      { label: "Estado", value: "Veracruz" },
      { label: "Altitud", value: "1,100 msnm" },
      { label: "Variedades de café", value: "Sarchimor / Colombia" },
      { label: "Proceso", value: "Lavado" },
    ],
    image: { src: "/products/restaurante.jpg", alt: "Grano tostado — Lavado Veracruz" },
    mercadoLibre: {
      kg1: "https://www.mercadolibre.com.mx/up/MLMU5270060645",
      g250: MERCADO_LIBRE_STORE, // TODO: 250 g listing
    },
    retail: {
      short: "Caramelo, piloncillo y miel. Balanceado y de cuerpo sedoso.",
      image: { src: "/images/menudeo/bolsa-2.jpg", alt: "Bolsa de Lavado Veracruz, café tostado Culto al Perro Café" },
      backdrop: "linear-gradient(90deg, #fedfb6, #fabc8d)",
    },
  },
  {
    // Source: list provided by the team (no technical sheet yet).
    slug: "lavado-chiapas",
    name: "Lavado Chiapas",
    notes: "Avellana, chocolate amargo, acidez tipo cereza.",
    specs: [
      { label: "Finca", value: "Cooperativa de Productores Tierra Sagrada" },
      { label: "Origen", value: "Mapastepec, Chiapas" },
      { label: "Altura", value: "1,650 msnm" },
      { label: "Tipo de grano", value: "Typica, Bourbon y Caturra" },
    ],
    image: { src: "/products/espresso.jpg", alt: "Grano tostado — Lavado Chiapas" },
    mercadoLibre: {
      kg1: MERCADO_LIBRE_STORE, // TODO: 1 kg listing
      g250: MERCADO_LIBRE_STORE, // TODO: 250 g listing
    },
    retail: {
      short: "Avellana y chocolate amargo, con acidez tipo cereza.",
      image: { src: "/images/menudeo/bolsa-3.jpg", alt: "Bolsa de Lavado Chiapas, café tostado Culto al Perro Café" },
      backdrop: "linear-gradient(90deg, #a0daf8, #59b9ed)",
    },
  },
  {
    // Source: Finca Corahe technical sheet "FICHA TECNICA Natural honey 2026".
    slug: "natural-honey-veracruz",
    name: "Natural Honey Veracruz",
    notes: "Cítricos, frambuesa, frutos rojos, azúcar mascabado",
    specs: [
      { label: "Nombre de la finca", value: "Finca Corahe" },
      { label: "Zona", value: "Huatusco" },
      { label: "Estado", value: "Veracruz" },
      { label: "Altitud", value: "1,000 a 1,400 msnm" },
      { label: "Variedades de café", value: "Marsellesa" },
      { label: "Proceso", value: "Natural con fermentación anaeróbica de 120 hrs" },
    ],
    image: { src: "/products/oficina.jpg", alt: "Grano tostado — Natural Honey Veracruz" },
    mercadoLibre: {
      kg1: "https://www.mercadolibre.com.mx/up/MLMU4615173825",
      g250: MERCADO_LIBRE_STORE, // TODO: 250 g listing
    },
    retail: {
      short: "Dulce, frutal y con cuerpo sedoso. Nuestro favorito para métodos de filtrado en casa.",
      image: { src: "/images/menudeo/bolsa-1.jpg", alt: "Bolsa de Natural Honey Veracruz, café tostado Culto al Perro Café" },
      backdrop: "linear-gradient(90deg, #feddb2, #fec696)",
    },
  },
  {
    slug: "tueste-intenso",
    name: "Tueste Intenso",
    notes: "",
    specs: [], // TODO: technical sheet
    image: { src: "/products/tueste-intenso.jpg", alt: "Grano tostado — Tueste Intenso" },
    mercadoLibre: {
      kg1: "https://www.mercadolibre.com.mx/up/MLMU3908637861",
      g250: MERCADO_LIBRE_STORE, // TODO: 250 g listing
    },
    retail: {
      short: "Fuerte y con carácter.",
      image: { src: "/images/menudeo/bolsa-5.jpg", alt: "Bolsa de Tueste Intenso, café tostado Culto al Perro Café" },
      backdrop: "linear-gradient(90deg, #fed3a6, #fed3a6)",
    },
  },
  {
    slug: "descafeinado",
    name: "Descafeinado",
    notes: "",
    specs: [], // TODO: technical sheet
    image: { src: "/products/restaurante.jpg", alt: "Grano tostado — Descafeinado" },
    mercadoLibre: {
      kg1: "https://www.mercadolibre.com.mx/up/MLMU4615380893",
      g250: MERCADO_LIBRE_STORE, // TODO: 250 g listing
    },
    retail: {
      short: "Todo el sabor, sin cafeína. Para la taza de la noche.",
      image: { src: "/images/menudeo/bolsa-1.jpg", alt: "Bolsa de Descafeinado, café tostado Culto al Perro Café" },
      backdrop: "linear-gradient(90deg, #feddb2, #fec696)",
    },
  },
  {
    slug: "geisha-marsellesa",
    name: "Geisha/Marsellesa",
    notes: "",
    specs: [], // TODO: technical sheet
    image: { src: "/products/espresso.jpg", alt: "Grano tostado — Geisha/Marsellesa" },
    // TODO: Mercado Libre listings (no buy buttons until they exist).
    retail: {
      short: "",
      image: { src: "/images/menudeo/bolsa-3.jpg", alt: "Bolsa de Geisha/Marsellesa, café tostado Culto al Perro Café" },
      backdrop: "linear-gradient(90deg, #a0daf8, #59b9ed)",
      label: "Lanzamiento: Oct 26",
    },
  },
];

export function getBean(slug: string): Bean | undefined {
  return beans.find((b) => b.slug === slug);
}

/** A bean has a ficha técnica page once its data sheet has rows. */
export function hasFicha(bean: Bean | undefined): bean is Bean {
  return Boolean(bean && bean.specs.length > 0);
}

/** Copy for the ficha técnica pages. */
export const fichaConfig = {
  label: "Ficha técnica",
  backLabel: "Regresar",
  buyTitle: "Opciones de compra:",
  quoteLabel: "Cotizar al mayoreo",
  buy1kgLabel: "Bolsa 1 kg",
  buy250gLabel: "Bolsa 250 g",
  /** Screen-reader suffix for the Mercado Libre buttons. */
  buyLabelSuffix: "comprar en Mercado Libre (abre en una pestaña nueva)",
  /** Button to the ficha page: short on menudeo/kit cards, long on line cards. */
  linkLabel: "Ver ficha",
  linkLabelLong: "Ver ficha técnica",
};
