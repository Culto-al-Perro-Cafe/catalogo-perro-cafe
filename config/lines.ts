/**
 * Coffee product lines shown in the catalog.
 * Add, remove or reorder entries here — the grid, detail pages,
 * sitemap, footer links and the sales form options all update automatically.
 */

export type ProductLine = {
  /** URL slug: /lineas/<slug> */
  slug: string;
  /** Full name, used in titles, breadcrumbs, forms and structured data. */
  name: string;
  /** Title split in two lines for the display headline ("Café para" / "Espresso"). */
  titlePre: string;
  titleMain: string;
  /** One-liner for catalog cards. */
  summary: string;
  /** Long description on the detail page. */
  description: string;
  highlights: string[];
  /** Meta description override; falls back to `summary` + `description`. */
  seoDescription?: string;
  /** Product photo in /public. Leave undefined to show the hatched placeholder. */
  image?: { src: string; alt: string };
  /** Coffees offered in this line ("Granos disponibles"), by slug from config/beans.ts. */
  variants?: string[];
};

export const productLines: ProductLine[] = [
  {
    slug: "espresso",
    image: { src: "/products/espresso.jpg", alt: "Granos de café tostado para espresso, tueste medio claro" },
    name: "Café para Espresso",
    titlePre: "Café para",
    titleMain: "Espresso",
    summary: "Consistencia lote tras lote. Para máquina y métodos de filtrado.",
    description:
      "Diseñado para barras que exigen perfección y constancia. Te garantizamos el mismo perfil de sabor lote tras lote, para que tus baristas no tengan que estar recalibrando moliendas todo el tiempo. Rinde excelente en máquina de espresso y métodos de filtrado manuales.",
    highlights: [
      "Perfil estable todo el año.",
      "Ideal para cafeterías de especialidad.",
      "Tueste medio a 215° con curva.",
    ],
    // Data sheets live in config/beans.ts.
    variants: ["lavado-veracruz", "lavado-chiapas", "natural-honey-veracruz"],
    seoDescription:
      "Café para espresso de mayoreo con perfil estable lote tras lote. Ideal para cafeterías de especialidad, máquina de espresso y métodos de filtrado. Envíos a todo México.",
  },
  {
    slug: "restaurante",
    image: { src: "/products/restaurante.jpg", alt: "Granos de café tostado de la Línea Restaurante, tueste medio" },
    name: "Línea Restaurante",
    titlePre: "Línea",
    titleMain: "Restaurante",
    summary: "La mejor taza en cada mesa, sin batallar. Cero amargor.",
    description:
      "Sirve una taza de buen café antes de cada comida, dales una excelente primera impresión. Logramos un perfil balanceado y constante que le gusta a todos, eliminando por completo ese sabor \"amargo\" o quemado del café comercial de baja calidad. Tus clientes lo van a notar.",
    highlights: [
      "Sabor amigable para todos los paladares.",
      "En grano o molido, ya listo para trabajar.",
      "Tostado antes de enviarse, para que tengas café fresco.",
    ],
    seoDescription:
      "Café para restaurantes: perfil balanceado, sin amargor y fácil de preparar para tu personal. Café tostado de mayoreo con envíos a todo México.",
  },
  {
    slug: "oficina",
    image: { src: "/products/oficina.jpg", alt: "Granos de café tostado de la Línea Oficina, tueste medio" },
    name: "Línea Oficina",
    titlePre: "Línea",
    titleMain: "Oficina",
    summary: "Gran sabor a bajo costo. Ideal para cafeteras de goteo.",
    description:
      "El café de oficina no tiene que ser malo. Esta es nuestra opción de mejor costo-beneficio, pensada específicamente para las clásicas cafeteras de casa u oficina. Buen rendimiento, buen sabor y a un precio que cuida el presupuesto de tu empresa.",
    highlights: [
      "Grano de bajo costo.",
      "Para percoladoras y cafeteras de filtro.",
      "Molido, ya listo para trabajar.",
      "Tostado antes de enviarse, para que tengas café fresco.",
    ],
    seoDescription:
      "Café para oficina con el mejor costo-beneficio. Ideal para cafeteras de goteo y percoladoras. Café tostado de mayoreo con facturación y envíos a todo México.",
  },
  {
    slug: "tueste-intenso",
    image: { src: "/products/tueste-intenso.jpg", alt: "Granos de café de tueste oscuro de la Línea Tueste Intenso" },
    name: "Línea Tueste Intenso",
    titlePre: "Línea",
    titleMain: "Tueste Intenso",
    summary: "Fuerte y con carácter. Perfecto para barras de cortesía.",
    description:
      "Para los que buscan ese sabor a café fuerte y tradicional. Desarrollamos este tueste pensando en negocios que ofrecen servicio de café en cortesía (como hoteles, agencias o salas de espera) y necesitan una bebida con mucha presencia y carácter.",
    highlights: [
      "Tueste oscuro, cuerpo pesado.",
      "Rinde perfecto para estaciones de cortesía.",
      "Molido, ya listo para trabajar.",
      "Tostado antes de enviarse, para que tengas café fresco.",
    ],
    seoDescription:
      "Café de tueste oscuro y cuerpo pesado para hoteles, agencias y salas de espera. Café tostado de mayoreo con envíos a todo México.",
  },
];

export function getProductLine(slug: string): ProductLine | undefined {
  return productLines.find((line) => line.slug === slug);
}
