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
  /** Origins offered in this line, each with a data sheet ("Granos disponibles" on the detail page). */
  variants?: LineVariant[];
};

export type LineVariant = {
  name: string;
  /** Tasting notes and body/acidity, one line. Leave empty to hide. */
  notes: string;
  /** Data sheet rows, in display order. */
  specs: { label: string; value: string }[];
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
    ],
    variants: [
      {
        // Source: Finca Corahe technical sheet "FICHA TECNICA EUROPEA".
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
      },
      {
        // Source: list provided by the team (no technical sheet yet).
        name: "Lavado Chiapas",
        notes: "Avellana, chocolate amargo, acidez tipo cereza.",
        specs: [
          { label: "Finca", value: "Cooperativa de Productores Tierra Sagrada" },
          { label: "Origen", value: "Mapastepec, Chiapas" },
          { label: "Altura", value: "1,650 msnm" },
          { label: "Tipo de grano", value: "Typica, Bourbon y Caturra" },
        ],
      },
      {
        // Source: Finca Corahe technical sheet "FICHA TECNICA Natural honey 2026".
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
      },
    ],
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
      "Sirve una taza excelente al final de cada comida, sin batallar. Logramos un perfil balanceado y constante que le gusta a todos, eliminando por completo ese sabor «amargo» o quemado del café comercial de baja calidad. Tus clientes lo van a notar.",
    highlights: [
      "Sabor amigable para todos los paladares.",
      "Fácil de preparar para tu personal de piso.",
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
    ],
    seoDescription:
      "Café de tueste oscuro y cuerpo pesado para hoteles, agencias y salas de espera. Café tostado de mayoreo con envíos a todo México.",
  },
];

export function getProductLine(slug: string): ProductLine | undefined {
  return productLines.find((line) => line.slug === slug);
}
