/**
 * Kit de muestras landing (/kit): one box with a sample of each bean, sold on Mercado Libre.
 * Edit copy, photos and the listing link here — /kit reads everything from this file.
 */
import { menudeoConfig } from "./menudeo";

type Photo = { src: string; alt: string };

export const kitConfig = {
  seoTitle: "Kit de muestras · Prueba nuestros 4 granos",
  seoDescription:
    "El kit de muestras trae nuestros cuatro granos en una sola caja, para que los pruebes en tu negocio o en tu casa. Envío gratis a todo México.",

  /** Mercado Libre listing — shared with the Menudeo "¿No te decides?" block. */
  url: menudeoConfig.sampleKit.url,
  buyLabel: "Comprar ahora",
  /** Screen-reader suffix for the external buy links. */
  linkLabelSuffix: "comprar el kit en Mercado Libre (abre en una pestaña nueva)",

  hero: {
    eyebrow: "Kit de muestras · 4 granos",
    title: "Prueba antes",
    titleAccent: "de elegir",
    body: "El kit de muestras trae nuestros granos en una sola caja, para que los pruebes en tu negocio o en tu casa.",
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
    body: "Cuatro granos tostados en Hermosillo, cada uno con su carácter.",
    /** Each name renders on two lines: [line 1, line 2]. `ficha`: bean slug in config/beans.ts
     *  for the "Ver ficha" button (hidden while that bean has no data sheet). */
    beans: [
      { num: "01", name: ["Lavado", "Chiapas"], ficha: "lavado-chiapas", note: "Limpio y brillante, con acidez amable.", image: "/products/espresso.jpg" },
      { num: "02", name: ["Lavado", "Veracruz"], ficha: "lavado-veracruz", note: "Balanceado y suave, para todos los días.", image: "/products/restaurante.jpg" },
      { num: "03", name: ["Natural Honey", "Veracruz"], ficha: "natural-honey-veracruz", note: "Dulce y con cuerpo sedoso.", image: "/products/oficina.jpg" },
      { num: "04", name: ["Tueste", "Intenso"], ficha: "tueste-intenso", note: "Oscuro, fuerte y con carácter.", image: "/products/tueste-intenso.jpg" },
    ],
  },

  steps: {
    title: "Cómo funciona",
    image: { src: "/images/kit/detalle-1.jpg", alt: "Bolsa del kit junto a la caja con la cinta «Llegó el café»" } as Photo,
    items: [
      "Pide tu kit en Mercado Libre.",
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
