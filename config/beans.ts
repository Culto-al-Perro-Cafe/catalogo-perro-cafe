/**
 * Our coffees ("granos"): data sheets, photos and Mercado Libre listings in one place.
 * Read by /fichas/<slug> (ficha técnica), /menudeo (retail cards), the "Granos disponibles"
 * cards on a catalog line (config/lines.ts) and the bean cards on /kit (config/kit.ts).
 */

type Photo = { src: string; alt: string };

/** One listing per bag size. */
type BagLinks = { kg1?: string; g250?: string };

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
  sca: "Puntaje SCA",
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
  /**
   * Listings per marketplace (config/marketplaces.ts) and bag size. Leave a size or a whole marketplace out when it
   * isn't sold there: its button is hidden. Mercado Libre 1 kg is also the "Comprar" button on /menudeo.
   */
  mercadoLibre?: BagLinks;
  amazon?: BagLinks;
  tiktok?: BagLinks;
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
      finca: "Corahe",
    },
    image: { src: "/products/espresso.jpg", alt: "Grano tostado — Lavado Veracruz" },
    mercadoLibre: {
      kg1: "https://www.mercadolibre.com.mx/cafe-de-especialidad-en-grano-1-kg-veracruz-culto-al-perro/p/MLM2118759400?pdp_filters=item_id:MLM6290203632",
      g250: "https://www.mercadolibre.com.mx/up/MLMU5364935764",
    },
    amazon: { kg1: "https://www.amazon.com.mx/dp/B0HPDZFKP3" },
    tiktok: {
      kg1: "https://www.tiktok.com/view/product/1738217762884323255?encode_params=MIIBrAQMslWr5h4X8yZx2zHYBIIBiLWWvKUY_MJM-B6f9GTRKjkm162VrHToyOWoJx4qhki0mUO5NruKD0GlhteOQmEouYne18fMeV9OinkPbJT91Dudz3iPjuwzR3HdU0rNObnLaksfmHcy0Y_eOvABPkgGaZip8zxUYwbYwFZCNHAG76dYrOuCzXpcHVj13zdbTASUNwdrZ7Zx_yvsoxZkku7Z-v1hG98cokGX_eYeGHieKopD_i8lKl92WIDiT8_ghXXX_jS-dKweC3pE3AkqTvfMXMaANUaGvW7bG-fe09WpMvNdpd_pa4hIqJ02lmWNNWaq1EM0j65Sg0EvEDcNzwIhhYHfjlTTRPQVAcTm5NHMCluJxo7MqcXfGorR7fwRskaSXvCcAbKBc4Xzu1fKyGoaxusaJ4bl4aHUviE_DIlZef_l-oXPjOZQWLaowIDvANzRlJnNm6zrGLYmabh9fUwWpwDfR2Yt-qpeCvreP5foUMbQnsoa6g17THyZDngXmCo-lnJyGSciPmBoeQa7339AKWueAjPLs9rpBBA1e_glYCGvHupvyFLHQqjG&force_h5=1&source=seller_center",
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
    amazon: { kg1: "https://www.amazon.com.mx/dp/B0H9TM6XQG" },
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
      finca: "Corahe",
      sca: "84.5",
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
    // Source: Team
    slug: "ambar-bourbon-puebla",
    name: "Ambar Bourbon Puebla",
    notes: "Uva roja, carambola, manzana, nips de cacao, frambuesa, vainilla con acidez málica y cuerpo alto con textura sedosa.",
    specs: {
      origen: "Zapotitlán de Méndez, Puebla",
      proceso: "Natural con reposo extendido",
      altitud: "1,300 msnm",
      variedades: "Bourbon rojo",
      finca: "Cagstin",
      sca: "86.25",
    },
    image: { src: "/products/ambar-bourbon-puebla.jpg", alt: "Grano tostado — Ambar Bourbon Puebla" },
    mercadoLibre: {
      kg1: "https://www.mercadolibre.com.mx/up/MLMU5338937823?pdp_filters=item_id:MLM3582971095",
      g250: "https://www.mercadolibre.com.mx/up/MLMU5338877107?pdp_filters=item_id:MLM6330683162",
    },
    tiktok: {
      kg1: "https://www.tiktok.com/view/product/1738217845559822263?encode_params=MIIBrAQMv3aitYjyc50RCsEABIIBiA9CaB1hUWkskLbNSJ2KGCFAcNP9aLhrCgtyENSd1MrnPBfITS3lCa6LAE3Ib0QgYjU0LfNrU6_-Q6LBIrKOeg54mOOhw9FNtCgLgb-wLx6Xkn3N7gEUtWyCPUeJXTJp8-BqH8wQ_7u7qf6Yqf2VcvqgkG6ezajnYx0rB8syZw3xmt59yX_GRc0KC50EuvsYgiTBc89exeqQLH6zHP6F6tD4GoiQ2yYPar2fZ6RQ6EXwex6k-ktpELaKLE-0cmSrbseUZk4_zMfCBNHbaLPrSb0OaOvHAtwLh7Bk2fcyWa5Y4vzOd5ZtG69LZvnVU905vjEJgvOevchM9tW8rZBfnpa84922Yvo8sPeVh_5txGTtGw3ROKMA5DfSxClCc50mi3PQHLb8cAeZQf8Xyv_1n3LhSwjUfXqKa6g18xT4869JmzbHoM2_uJyUIsGuHPJiixITalpEgUW3U8oCHEdoyaEbJuV1Tp_gTXOKgH7egQvlAb_AqM9Z6TaCiinZaXga3fBDZEUaVxFpBBDtsG3_0egubLWHGhuo1v9M&force_h5=1&source=seller_center",
    },
    retail: {
      short: "Frutal con acidez málica y cuerpo alto con textura sedosa.",
      image: { src: "/images/menudeo/bolsa-1.jpg", alt: "Bolsa de Ambar Bourbon Puebla, café tostado Culto al Perro Café" },
      backdrop: "linear-gradient(90deg, #feddb2, #fec696)",
    },
  },
  {
    // Source: Cafetalera San Felipe, "Café Verde Robusta Natural" product page.
    slug: "tueste-intenso",
    name: "Tueste Intenso",
    notes: "Notas amaderadas, dulces y afrutadas, cuerpo intenso y regusto amargo",
    specs: {
      origen: "Córdoba, Atoyac y Amatlán, Veracruz",
      proceso: "Natural",
      altitud: "800 a 900 msnm",
      variedades: "Canephora robusta",
    },
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
    // Source: Cafetalera San Felipe, "Café Verde Arábica Decaf MWP Natural" product page.
    slug: "descafeinado",
    name: "Descafeinado",
    notes:
      "Cítricas, cáscara de naranja, chocolate, dulzura a caramelo, acidez cítrica sutil, cuerpo medio, retrogusto cítrico",
    specs: {
      origen: "Chocamán, Veracruz",
      proceso: "Natural, descafeinado Mountain Water Process (MWP)",
      altitud: "1,350 msnm",
      variedades: "Arábica / Catimor",
      finca: "Neria",
    },
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
  /** Screen-reader suffix for the marketplace buttons: "<bean>, <size> — comprar en <marketplace> (…)". */
  buyLabelSuffix: "(abre en una pestaña nueva)",
  /** Button to the ficha page: short on menudeo/kit cards, long on line cards. */
  linkLabel: "Ver ficha",
  linkLabelLong: "Ver ficha técnica",
};
