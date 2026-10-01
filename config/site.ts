/**
 * Site-wide content and SEO settings.
 * Edit copy here — pages and components read from this file.
 */

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const siteConfig = {
  url: siteUrl,
  name: "Culto al Perro Café",
  shortName: "Culto al Perro Café",
  locale: "es_MX",
  lang: "es-MX",
  themeColor: "#222222",

  seo: {
    /** Default <title>; child pages render as "<page> | <shortName>". */
    title: "Café tostado para negocios",
    description:
      "Proveemos café tostado para cafeterías, restaurantes, oficinas y hoteles. Envíos a todo México, en grano o molido, con facturación. Mayoreo desde 5 kg.",
    keywords: [
      "café tostado mayoreo",
      "proveedor de café para negocios",
      "café para cafeterías",
      "café para restaurantes",
      "café para oficina",
      "café de especialidad México",
      "café en grano mayoreo",
      "tostador de café Hermosillo",
    ],
  },

  business: {
    city: "Hermosillo",
    region: "Sonora",
    country: "MX",
    areaServed: "México",
    slogan: "Proveedores de café perrón",
  },

  logo: {
    src: "/brand/logo-header.svg",
    alt: "Culto al Perro Café",
    // Intrinsic size from the SVG viewBox (1152.451 × 154.772).
    width: 1152,
    height: 155,
  },

  ticker: [
    "Café tostado",
    "Envíos a todo México",
    "Grano Entero",
    "Molido sin costo",
    "Facturación",
    "Ventas al mayoreo"
  ],

  home: {
    title: "Proveemos café tostado",
    titleHighlight: "para tu negocio",
    /** Sentences render on one line on desktop and one per line on mobile. */
    subtitle: ["Enviamos a todo México", "Mayoreo desde 5Kg"],
    linesHeading: "Nuestras líneas",
    cardCta: "Ver →",
    cta: {
      title: "¿No sabes cuál elegir para tu equipo?",
      button: "Platica con ventas",
    },
  },

  line: {
    breadcrumbRoot: "Nuestras líneas",
    backLabel: "Todas las líneas",
    quoteButton: "Cotizar pedido",
    /** Heading of the origins/data-sheet section, shown when a line has variants. */
    variantsTitle: "Granos disponibles",
  },

  sales: {
    navLabel: "Platica con ventas",
    title: "Platica con",
    titleHighlight: "ventas",
    subtitle: "Solicita una cotización. Te la enviamos por correo.",
    /** Second paragraph: Whatsapp alternative to the form. */
    whatsapp: { label: "O envíanos un Whatsapp", url: "https://wa.me/5216627308219" },
    seoTitle: "Platica con ventas · Cotiza café para tu negocio",
    seoDescription:
      "Cuéntanos de tu negocio y te recomendamos la línea de café ideal. Cotiza café tostado de mayoreo con envío a todo México.",
  },

  footer: {
    madeIn: "Hecho en México",
    /** Small print after the footer: what we measure and how. */
    privacyNotice:
      "Usamos cookies para medir visitas de forma anónima para mejorar este sitio. Al navegar aceptas su uso.",
    wordmark: "Culto al Perro Café",
    /** `lines` is filled from config/lines.ts; other columns list explicit links. */
    columns: [
      { title: "Líneas", links: "lines" },
      {
        title: "Sitio",
        links: [
          { label: "Platica con ventas", href: "/ventas" },
          { label: "Menudeo", href: "/menudeo" },
          { label: "Blog", href: "/blogs" },
          { label: "Nosotros", href: "/nosotros" },
        ],
      },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
