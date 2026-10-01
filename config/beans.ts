/**
 * Our coffees ("granos"): data sheets, photos and Mercado Libre listings in one place.
 * Read by /fichas/<slug> (ficha técnica), /menudeo (retail cards), the "Granos disponibles"
 * cards on a catalog line (config/lines.ts) and the bean cards on /kit (config/kit.ts).
 */

type Photo = { src: string; alt: string };

/**
 * Data sheet fields, in display order, with the one label each is shown with.
 * Every bean uses these keys, so all fichas read the same way.
 */
export const SPEC_LABELS = {
  origen: "Origen",
  proceso: "Proceso",
  altitud: "Altitud",
  variedades: "Variedad",
  finca: "Finca",
} as const;

export type SpecKey = keyof typeof SPEC_LABELS;

export type Bean = {
  /** URL slug: /fichas/<slug> */
  slug: string;
  name: string;
  /** Tasting notes, shown as a paragraph under the name. Leave empty to hide. */
  notes: string;
  /**
   * Data sheet, by field (labels and order: SPEC_LABELS). Leave a field out when it's unknown;
   * leave it empty while there's no sheet: the ficha page isn't published and "Ver ficha" is hidden.
   */
  specs: Partial<Record<SpecKey, string>>;
  /** Roasted-bean photo for the ficha page. */
  image: Photo;
  /** Mercado Libre listings per bag size. Leave a size out when it isn't sold: its button is hidden. */
  mercadoLibre?: { kg1?: string; g250?: string };
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
    specs: {
      origen: "Huatusco, Veracruz",
      proceso: "Lavado",
      altitud: "1,100 msnm",
      variedades: "Sarchimor / Colombia",
      finca: "Finca Corahe",
    },
    image: { src: "/products/espresso.jpg", alt: "Grano tostado — Lavado Veracruz" },
    mercadoLibre: {
      kg1: "https://www.mercadolibre.com.mx/cafe-de-especialidad-en-grano-1-kg-veracruz-culto-al-perro/p/MLM2118759400?pdp_filters=item_id:MLM6290203632",
      g250: "https://www.mercadolibre.com.mx/up/MLMU5364935764",
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
    specs: {
      origen: "Mapastepec, Chiapas",
      proceso: "Lavado",
      altitud: "1,650 msnm",
      variedades: "Typica / Bourbon / Caturra",
      finca: "Tierra Sagrada",
    },
    image: { src: "/products/espresso.jpg", alt: "Grano tostado — Lavado Chiapas" },
    mercadoLibre: {
      kg1: "https://www.mercadolibre.com.mx/cafe-de-especialidad-en-grano-1-kg-chiapas-culto-al-perro/p/MLM2118759400?pdp_filters=item_id:MLM2880691733",
      g250: "https://www.mercadolibre.com.mx/up/MLMU3908638597",
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
    specs: {
      origen: "Huatusco, Veracruz",
      proceso: "Natural con fermentación anaeróbica de 120 hrs",
      altitud: "1,000 a 1,400 msnm",
      variedades: "Marsellesa",
      finca: "Finca Corahe",
    },
    image: { src: "/products/espresso.jpg", alt: "Grano tostado — Natural Honey Veracruz" },
    mercadoLibre: {
      kg1: "https://www.mercadolibre.com.mx/up/MLMU4615173825",
      g250: "https://www.mercadolibre.com.mx/up/MLMU4615235017",
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
    specs: {}, // TODO: technical sheet
    image: { src: "/products/tueste-intenso.jpg", alt: "Grano tostado — Tueste Intenso" },
    mercadoLibre: {
      kg1: "https://www.mercadolibre.com.mx/up/MLMU3908637861",
      // No 250 g bag.
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
    specs: {}, // TODO: technical sheet
    image: { src: "/products/restaurante.jpg", alt: "Grano tostado — Descafeinado" },
    mercadoLibre: {
      kg1: "https://www.mercadolibre.com.mx/up/MLMU4615380893",
      g250: "https://www.mercadolibre.com.mx/up/MLMU4642385558",
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
    specs: {}, // TODO: technical sheet
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

/** The bean's data sheet as rows, in SPEC_LABELS order (unknown fields left out). */
export function specRows(bean: Bean): { key: SpecKey; label: string; value: string }[] {
  return (Object.keys(SPEC_LABELS) as SpecKey[])
    .filter((key) => bean.specs[key])
    .map((key) => ({ key, label: SPEC_LABELS[key], value: bean.specs[key]! }));
}

/** A bean has a ficha técnica page once its data sheet has rows. */
export function hasFicha(bean: Bean | undefined): bean is Bean {
  return Boolean(bean && specRows(bean).length > 0);
}

/** Copy for the ficha técnica pages. */
export const fichaConfig = {
  label: "Ficha técnica",
  backLabel: "Regresar",
  buyTitle: "Opciones de compra:",
  quoteLabel: "Cotizar al mayoreo",
  buy1kgLabel: "Bolsa 1 kg",
  buy250gLabel: "Bolsa 250 gr",
  /** Screen-reader suffix for the Mercado Libre buttons. */
  buyLabelSuffix: "comprar en Mercado Libre (abre en una pestaña nueva)",
  /** Button to the ficha page: short on menudeo/kit cards, long on line cards. */
  linkLabel: "Ver ficha",
  linkLabelLong: "Ver ficha técnica",
};
