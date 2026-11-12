/**
 * Wholesale price list (/mayoreo), shared by link with leads. The page is unlisted: it isn't in the footer or the
 * sitemap, and search engines are asked not to index it.
 *
 * `base` is the price per kg (MXN) charged from 5 kg; the other tiers take a fixed amount off per kg. It is the
 * RoastOS price, except for the two blends: theirs is set so that 15 kg costs $380/kg (base 395).
 * Prices are fixed here: update `base` when a price changes in RoastOS.
 */
export const mayoreoConfig = {
  seoTitle: "Precios de mayoreo",
  seoDescription: "Precios por kilo de café tostado al mayoreo, desde 5 kg, con descuento por volumen.",

  title: "Precios de",
  titleAccent: "mayoreo",
  intro: "Precio por kilo de café tostado, en grano o molido. Entre más kilos pides, menos pagas por kilo.",

  perKg: "/kg",
  /** Volume tiers: `off` is the discount per kg (MXN) on the base price. */
  tiers: [
    { label: "Desde 5 kg", short: "5 kg", off: 0 },
    { label: "Desde 10 kg", short: "10 kg", off: 10 },
    { label: "Desde 15 kg", short: "15 kg", off: 15 },
  ],

  /** `ficha`: bean slug in config/beans.ts; the name links to its ficha técnica (leave out when there is none). */
  groups: [
    {
      title: "Granos de especialidad",
      items: [
        { name: "Lavado Veracruz", note: "Caramelo, piloncillo y miel. Balanceado y de cuerpo sedoso.", base: 420, ficha: "lavado-veracruz" },
        { name: "Lavado Chiapas", note: "Avellana, chocolate amargo, acidez tipo cereza.", base: 420, ficha: "lavado-chiapas" },
        { name: "Natural Honey Veracruz", note: "Cítricos, frambuesa, frutos rojos, azúcar mascabado.", base: 520, ficha: "natural-honey-veracruz" },
        { name: "Ambar Bourbon Puebla", note: "Frutal con acidez málica y cuerpo alto con textura sedosa.", base: 500, ficha: "ambar-bourbon-puebla" },
        { name: "Descafeinado", note: "Todo el sabor, sin cafeína.", base: 440, ficha: "descafeinado" },
      ],
    },
    {
      title: "Mezclas y tueste intenso",
      items: [
        { name: "Mezcla Restaurante", note: "Mezcla de la casa. Cero amargor.", base: 395 },
        { name: "Mezcla Restaurante Intenso", note: "Mezcla de la casa. Carácter fuerte.", base: 395 },
        { name: "Tueste Intenso", note: "Nuestro tueste más fuerte. Café con sabor intenso a bajo coste, para oficinas y cortesías.", base: 400, ficha: "tueste-intenso" },
      ],
    },
  ] as { title: string; items: { name: string; note: string; base: number; ficha?: string }[] }[],

  /** Footnote: text, then the linked words (blog article on IVA), then the rest. */
  footnote: {
    before: "Precios en pesos mexicanos (MXN) por kilo. El café tostado",
    link: "no causa IVA",
    article: { blog: "ayuda", slug: "por-que-el-cafe-no-paga-iva" },
    after: ". Pedido mínimo: 5 kg.",
  },

  cta: { title: "¿Listo para tu pedido?", label: "Cotizar pedido" },
};
