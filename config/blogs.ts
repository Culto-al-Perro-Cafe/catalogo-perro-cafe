/**
 * Blogs (article categories). URLs mirror the original Shopify store:
 * /blogs/<slug> and /blogs/<slug>/<article>. Articles live in content/blogs/<slug>/*.md.
 */

export type BlogConfig = {
  slug: string;
  title: string;
  description: string;
};

/** Order = order of the category tabs. */
export const blogs: BlogConfig[] = [
  {
    slug: "negocio",
    title: "Negocio",
    description:
      "Cómo abrir y operar una cafetería en México: costos, trámites, equipo y rentabilidad.",
  },
  {
    slug: "ayuda",
    title: "Ayuda",
    description:
      "Guías prácticas para comprar café para tu negocio: consumo, proveedores, mayoreo y facturación.",
  },
  {
    slug: "tostadores",
    title: "Tostadores",
    description:
      "Historias del tueste, orígenes y fincas mexicanas, y el café de especialidad en Hermosillo.",
  },
  {
    slug: "recetas",
    title: "Recetas",
    description: "Recetas y métodos para preparar café de especialidad mexicano en casa o en tu barra.",
  },
  {
    slug: "noticias",
    title: "Noticias",
    description: "Lo que pasa en el mundo del café: precios del café verde, mercado y temporada.",
  },
];

export const blogSection = {
  /** Label used in breadcrumbs, structured data and the /blogs page. */
  name: "Blog",
  title: "Blog",
  description:
    "Ideas para servir buen café en tu negocio, recetas de barra y noticias desde el tostador.",
  allLabel: "Todas",
  categoriesLabel: "Categorías",
  backLabel: "Regresar",
  readingTime: "min de lectura",
  relatedTitle: "Sigue leyendo",
  footnotesLabel: "Referencias",
  product: { eyebrow: "Producto recomendado", button: "Ver línea" },
  /** Article shown large at the top of /blogs ("<blog>/<slug>"); it's left out of the grid below. */
  featured: "ayuda/por-que-el-cafe-no-paga-iva",
  featuredBadge: "Destacado",
  share: {
    label: "Compartir",
    facebook: "Compartir en Facebook",
    x: "Compartir en X",
    email: "Compartir por correo",
    copy: "Copiar enlace",
    copied: "Enlace copiado",
  },
};

export function getBlog(slug: string): BlogConfig | undefined {
  return blogs.find((b) => b.slug === slug);
}
