/**
 * Kit de muestras landing (/kit): one box with a sample of each bean, sold on Mercado Libre, Amazon and TikTok Shop.
 * Edit copy, photos and the listing links here — /kit reads everything from this file.
 */
import type { MarketplaceId } from "./marketplaces";

type Photo = { src: string; alt: string };

export const kitConfig = {
  seoTitle: "Kit para probar café de especialidad · Prueba nuestros 4 granos",
  seoDescription:
    "El kit para probar café de especialidad trae nuestros cuatro granos para espresso en una caja, para que los pruebes en tu negocio o en tu casa. Envío gratis a todo México.",

  /** Kit listing per marketplace (config/marketplaces.ts). Leave one out when the kit isn't sold there. */
  shop: {
    mercadoLibre:
      "https://www.mercadolibre.com.mx/kit-degustacion-cafe-de-especialidad-4x250g-culto-al-perro/p/MLM2124745184?pdp_filters=item_id:MLM6348601530",
    amazon: "https://www.amazon.com.mx/dp/B0HPDWJKG6",
    tiktok:
      "https://www.tiktok.com/view/product/1738217808713648055?encode_params=MIIBrAQMWNjQhp5kTfWTR9NpBIIBiFouV7cimaDl_SrHYPECyHuJomUmVvEIiMROBEdNv1iOMIAzVcS9s_x4Pw2btGt4QDWO973qYH9MKZjMx8pmSsIHWC7a79aVFLaqX5IdkpASED836wIr5yniv2QJpr__Z6QsQBD87lWUIE-GYBdNHNvDSfzGRHwZdhsF3e7JqmF10DiCV5Au2Te_j4P7fGat23mNY3WshK-blNYqeIz3EPNb8Lusa4d_zzU9sM1n6E184mW3T-AzFatfjDY8muJ_6d5Umh-z10J5opFj2mfp2qkzs7BVwM00RcS6-SqOxAnz_gCPbgAEHmpWUPwr-2NYsbs0sEAdXao0xNuI_ShIsNk4WVu4UDbu9zm1aaMRHaxrej_VsGRLX5RIrEUjyIhFs1T_UE8fX62i3QRsrhu8mnILilkwUC0yRhTzXAmFyz0fAaFaM3uNl1UcNxOtVXL__YZSGeNePUHkpEUR0QyXgAsQUSpTyxHRbC2_Jny-Ox-6OcUw1nvyFq7am2ZeFsS10tRAGHySkPPgBBBNfb8i4oIRsF1iq46NE9Y-&force_h5=1&source=seller_center",
  } satisfies Partial<Record<MarketplaceId, string>>,

  /** "Comprar ahora" (hero and closing) scrolls down to the "Dónde comprar" section. */
  buyLabel: "Comprar ahora",

  /** Last section: one button per marketplace, "Comprar en <marketplace>". */
  where: {
    id: "donde-comprar",
    title: "Dónde comprar",
    body: "Elige tu tienda favorita.",
    /** Marketplaces marked with † (free shipping); the footnote below the buttons explains it. */
    freeShipping: ["mercadoLibre", "amazon"] as MarketplaceId[],
    footnote: "† Envío gratis a todo México.",
    buyPrefix: "Comprar en",
    /** Screen-reader suffix for the external buttons. */
    linkLabelSuffix: "(abre en una pestaña nueva)",
  },

  hero: {
    eyebrow: "Prueba 4 granos. Compara. Descubre.",
    title: "Prueba antes",
    titleAccent: "de elegir",
    body: "Nuestros granos para espresso en una caja, para que los pruebes en tu negocio o en tu casa.",
    shipping: "Envío gratis a todo México",
    image: { src: "/images/kit/cenital-2.jpg", alt: "Kit de muestras abierto con cuatro bolsas de café" } as Photo,
  },

  statement: { text: "Cuatro granos distintos.", accent: "para que no te cuenten." },

  uses: [
    {
      title: "Para tu negocio",
      background: "var(--color-the-orange)",
      image: { src: "/images/kit/detalle-3.jpg", alt: "Bolsas del kit dentro de la caja" },
      body: "Cata con tu equipo antes de tu primer pedido. Prepáralos en tu barra, compara y elige el grano que va con tu menú y tus clientes.",
    },
    {
      title: "Para tu casa",
      background: "#2da598",
      image: { src: "/images/kit/lateral.jpg", alt: "Caja del kit cerrada" },
      body: "Descubre tu favorito sin comprar cuatro bolsas grandes. También es un buen regalo para quien le gusta el café.",
    },
  ] satisfies { title: string; background: string; image: Photo; body: string }[],

  contents: {
    title: "Lo que viene en la caja",
    body: "Cuatro granos distintos. Tueste medio. Bolsas de 250g",
    /** Each name renders on two lines: [line 1, line 2]. `ficha`: bean slug in config/beans.ts
     *  for the "Ver ficha" button (hidden while that bean has no data sheet). */
    beans: [
      { num: "01", name: ["Lavado", "Veracruz"], ficha: "lavado-veracruz", note: "Balanceado y suave, para todos los días.", image: "/products/restaurante.jpg" },
      { num: "02", name: ["Lavado", "Chiapas"], ficha: "lavado-chiapas", note: "Limpio y brillante, con acidez amable.", image: "/products/espresso.jpg" },
      { num: "03", name: ["Natural Honey", "Veracruz"], ficha: "natural-honey-veracruz", note: "Dulce y con cuerpo sedoso.", image: "/products/oficina.jpg" },
      { num: "04", name: ["Ambar Bourbon", "Puebla"], ficha: "ambar-bourbon-puebla", note: "Frutal, con acidez málica y cuerpo alto.", image: "/products/ambar-bourbon-puebla.jpg" },
    ],
  },

  steps: {
    title: "Cómo funciona",
    image: { src: "/images/kit/detalle-1.jpg", alt: "Bolsa del kit junto a la caja con la cinta «Llegó el café»" } as Photo,
    items: [
      "Pide tu caja desde Mercado Libre, Amazon México o TikTok Shops.",
      "Prueba los cuatro granos en casa o en tu barra.",
      "Quédate con tu favorito: en bolsa para casa o en mayoreo para tu negocio.",
    ],
  },

  closing: {
    title: "Llegó el café",
    body: "A tu barra, a tu oficina o a tu cocina. Pide tu kit y encuentra tu grano.",
    image: { src: "/images/kit/caja-blanco.jpg", alt: "Caja del kit de muestras cerrada" } as Photo,
  },
} as const;
