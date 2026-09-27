# perro.cafe — sitemap inventory

First step of the content migration: every URL listed in
[`https://www.perro.cafe/sitemap.xml`](https://www.perro.cafe/sitemap.xml), crawled on 2026-09-26.
Per-URL data (titles, meta descriptions, word counts, prices, proposed action) is in
[`perro-cafe-sitemap-inventory.csv`](perro-cafe-sitemap-inventory.csv).

## Summary

The site is a **Shopify** store. Its sitemap index links 5 child sitemaps with **40 URLs**, all returning **200**:

| Sitemap | URLs | Contents |
|---|---|---|
| `sitemap_products_1.xml` | 10 | Home page (Shopify lists it here) + 9 products |
| `sitemap_pages_1.xml` | 10 | Static pages |
| `sitemap_collections_1.xml` | 1 | `nuestro-cafe` (4 specialty coffees) |
| `sitemap_blogs_1.xml` | 18 | 5 blog indexes + 13 articles |
| `sitemap_agentic_discovery.xml` | 1 | `agents.md` (Shopify's AI-agent instructions) |

**Proposed actions:** Migrate 27 · Merge 4 · Redirect 3 · Review 4 · Drop 2 (details below and in the CSV).
Nothing is marked `noindex` and every canonical points to itself.

## Findings worth fixing during the migration

1. **B2B pages built as products.** `/products/proveedor-de-cafe-para-restaurantes` and
   `/products/cafe-para-oficinas` are SEO landing pages with a single $400 variant. They overlap the
   catalog lines `/lineas/restaurante` and `/lineas/oficina`, and `/pages/mayoreo` overlaps the whole
   B2B catalog → **301 redirects** to the catalog.
2. **Duplicate product.** `caja-catadora-del-perro` and `caja-de-muestras-de-cafe-empieza-aqui` share the
   same description, price ($600) and 5 images → keep one, 301 the other.
3. **Same topic, competing pages.** Hermosillo: `/pages/cafe-tostado-hermosillo` vs
   `/products/cafe-en-grano-tostado-fresco-en-hermosillo`. Veracruz: `/pages/cafe-tostado-veracruz` vs the
   Veracruz products. Each pair targets the same searches; merge each into one page.
4. **Pages that shouldn't be indexed.** `/pages/elements-test` (theme test, lorem ipsum) and
   `/pages/feedback-degustacion` (survey thank-you page).
5. **Titles.** Shopify appends " – Culto Perro Café" to every title, so 7 pages show the brand twice
   (e.g. "…| Culto al Perro Café – Culto Perro Café"), and 21 of 40 titles exceed ~60 characters.
   The brand is also spelled two ways: "Culto al Perro Café" and "Culto Perro Café".
6. **Missing basics.** The home page has no `<h1>`; the 5 blog index pages have no meta description.
   3 of the 4 specialty products (the Veracruz ones) share one generic meta description.
7. **Sensitive content.** `/pages/metodos-de-pago` publishes bank-transfer details (account holder and
   CLABE). Decide whether that stays public on the new site.
8. **Retail checkout.** 7 products and the collection are retail (250 g–1 kg, $220–$600 MXN). The new
   site has no cart, and its footer already links "Menudeo" to Mercado Libre — the migration needs a
   decision on where retail purchases happen before these pages move.

## Inventory

### Home and agent file
| URL | Title | Action | Notes |
|---|---|---|---|
| [`/agents.md`](https://www.perro.cafe/agents.md) | agents.md | Review | Shopify-generated instructions for AI shopping agents; only relevant if the new site keeps online checkout. |
| [`/`](https://www.perro.cafe/) | Proveedor de café para restaurantes en México \| Culto al Perro Café | Migrate | Home. Title targets "proveedor de café para restaurantes" but has no <h1>. |

### Products (9)
| URL | Title | Variants | Price MXN | Action | Notes |
|---|---|---|---|---|---|
| [`/products/cafe-tostado-veracruz-honey-natural`](https://www.perro.cafe/products/cafe-tostado-veracruz-honey-natural) | Café Tostado: Especialidad Veracruz (Natural Honey) | 4 | 350–485 | Migrate | Retail product (4 variants). Needs a decision on where retail checkout lives. |
| [`/products/cafe-tostado-veracruz`](https://www.perro.cafe/products/cafe-tostado-veracruz) | Café Tostado: Especialidad Veracruz (Lavado) | 6 | 220–440 | Migrate | Retail product (6 variants). Overlaps /pages/cafe-tostado-veracruz. |
| [`/products/cafe-tostado-chiapas-americana`](https://www.perro.cafe/products/cafe-tostado-chiapas-americana) | Café Tostado: Especialidad Chiapas (Lavado) | 6 | 220–440 | Migrate | Retail product (6 variants). |
| [`/products/cafe-tostado-veracruz-san-felipe-tradicional`](https://www.perro.cafe/products/cafe-tostado-veracruz-san-felipe-tradicional) | Café Tostado: Tostado Intenso Veracruz (Lavado) | 6 | 220–440 | Migrate | Retail product (6 variants). |
| [`/products/cafe-en-grano-tostado-fresco-en-hermosillo`](https://www.perro.cafe/products/cafe-en-grano-tostado-fresco-en-hermosillo) | Café de Especialidad en Hermosillo \| Culto al Perro Café | 1 | 400 | Review | SEO landing built as a product (single $400 variant). Same topic as /pages/cafe-tostado-hermosillo. |
| [`/products/proveedor-de-cafe-para-restaurantes`](https://www.perro.cafe/products/proveedor-de-cafe-para-restaurantes) | Proveedor de Café para Restaurantes en México \| Culto al Perro Café | 1 | 400 | Redirect | B2B landing built as a product; maps to catalog line /lineas/restaurante. |
| [`/products/cafe-para-oficinas`](https://www.perro.cafe/products/cafe-para-oficinas) | Proveedor de Café para Oficinas en México \| Culto al Perro Café | 1 | 400 | Redirect | B2B landing built as a product; maps to catalog line /lineas/oficina. |
| [`/products/caja-catadora-del-perro`](https://www.perro.cafe/products/caja-catadora-del-perro) | La Caja Catadora del Perro | 1 | 600 | Merge | Duplicate of caja-de-muestras (same description, price $600 and 5 images). Keep one. |
| [`/products/caja-de-muestras-de-cafe-empieza-aqui`](https://www.perro.cafe/products/caja-de-muestras-de-cafe-empieza-aqui) | Caja de Muestras de Café – Empieza Aquí | 1 | 600 | Merge | Duplicate of caja-catadora-del-perro. Keep one, 301 the other. |

### Pages (10)
| URL | Last modified | Title | Action | Notes |
|---|---|---|---|---|
| [`/pages/contact`](https://www.perro.cafe/pages/contact) | 2025-09-09 | Contáctanos | Migrate | WhatsApp/email contact. Could point to /ventas for B2B. |
| [`/pages/frecuentes`](https://www.perro.cafe/pages/frecuentes) | 2025-09-09 | Programa de Clientes Frecuentes - Culto al Perro Café | Review | Loyalty program page. Confirm the program is still active. |
| [`/pages/elements-test`](https://www.perro.cafe/pages/elements-test) | 2024-03-01 | Elements Test | Drop | Theme test page with lorem ipsum, publicly indexed. |
| [`/pages/metodos-de-pago`](https://www.perro.cafe/pages/metodos-de-pago) | 2026-02-09 | Métodos de Pago | Review | Publishes bank-transfer details. Decide whether they should stay public. |
| [`/pages/cafe-tostado-veracruz`](https://www.perro.cafe/pages/cafe-tostado-veracruz) | 2025-09-09 | Café Tostado Origen Veracruz | Merge | Origin page overlapping the Veracruz products. |
| [`/pages/feedback-degustacion`](https://www.perro.cafe/pages/feedback-degustacion) | 2025-09-09 | Gracias por tu participación | Drop | Post-survey thank-you page; should not be indexed. |
| [`/pages/mayoreo`](https://www.perro.cafe/pages/mayoreo) | 2025-12-21 | Café Tostado al Mayoreo | Redirect | Wholesale quote page; superseded by the B2B catalog (catalogo.perro.cafe / /ventas). |
| [`/pages/nuestros-clientes`](https://www.perro.cafe/pages/nuestros-clientes) | 2025-09-09 | Nuestros clientes | Migrate | Social proof for B2B. |
| [`/pages/cafe-tostado-hermosillo`](https://www.perro.cafe/pages/cafe-tostado-hermosillo) | 2026-02-25 | Cafe Tostado en Hermosillo | Merge | Local SEO page; same intent as /products/cafe-en-grano-tostado-fresco-en-hermosillo. |
| [`/pages/sobre-nosotros`](https://www.perro.cafe/pages/sobre-nosotros) | 2026-05-14 | Sobre Culto al Perro Café \| Café mexicano tostado sin pretensión | Migrate | About page; already linked from the catalog footer. |

### Collection (1)
| URL | Title | Action | Notes |
|---|---|---|---|
| [`/collections/nuestro-cafe`](https://www.perro.cafe/collections/nuestro-cafe) | Nuestro Café | Migrate | Lists: veracruz, veracruz-honey-natural, chiapas-americana, veracruz-san-felipe-tradicional |

### Blog indexes (5)
| URL | Last modified | Action | Notes |
|---|---|---|---|
| [`/blogs/noticias`](https://www.perro.cafe/blogs/noticias) | 2026-05-29 | Migrate | Blog index; has no meta description. |
| [`/blogs/tostadores`](https://www.perro.cafe/blogs/tostadores) | 2025-07-23 | Migrate | Blog index; has no meta description. |
| [`/blogs/ayuda`](https://www.perro.cafe/blogs/ayuda) | 2026-05-29 | Migrate | Blog index; has no meta description. |
| [`/blogs/recetas`](https://www.perro.cafe/blogs/recetas) | 2026-05-10 | Migrate | Blog index; has no meta description. |
| [`/blogs/negocio`](https://www.perro.cafe/blogs/negocio) | 2026-05-29 | Migrate | Blog index; has no meta description. |

### Articles (13)
| URL | Published/updated | Title | Words ≈ |
|---|---|---|---|
| [`/blogs/tostadores/el-viaje-de-tostar-cafe`](https://www.perro.cafe/blogs/tostadores/el-viaje-de-tostar-cafe) | 2024-10-28 | El viaje de tostar café | 677 |
| [`/blogs/tostadores/chiapas-bayunka-2024`](https://www.perro.cafe/blogs/tostadores/chiapas-bayunka-2024) | 2024-11-10 | Chiapas Bayunka - Finca Nuevo México 2024 | 469 |
| [`/blogs/noticias/por-que-fluctua-tanto-el-precio-del-cafe-verde`](https://www.perro.cafe/blogs/noticias/por-que-fluctua-tanto-el-precio-del-cafe-verde) | 2024-12-03 | ¿Por qué fluctúa tanto el precio del café verde? | 449 |
| [`/blogs/tostadores/la-guia-de-cafe-de-especialidad-en-hermosillo-sonora`](https://www.perro.cafe/blogs/tostadores/la-guia-de-cafe-de-especialidad-en-hermosillo-sonora) | 2025-05-16 | La Guia de Café de Especialidad en Hermosillo, Sonora | 1409 |
| [`/blogs/tostadores/cafe-extranjero-en-una-barra-mexicana-pues-depende`](https://www.perro.cafe/blogs/tostadores/cafe-extranjero-en-una-barra-mexicana-pues-depende) | 2025-07-23 | ¿Café extranjero en una barra mexicana? Pues… depende. | 496 |
| [`/blogs/ayuda/por-que-el-cafe-no-paga-iva`](https://www.perro.cafe/blogs/ayuda/por-que-el-cafe-no-paga-iva) | 2026-05-10 | ¿Por qué el café no paga IVA en México? | 301 |
| [`/blogs/recetas/como-hacer-cold-brew-cafe-mexicano`](https://www.perro.cafe/blogs/recetas/como-hacer-cold-brew-cafe-mexicano) | 2026-05-10 | Cómo hacer Cold Brew con café de especialidad mexicano | 523 |
| [`/blogs/ayuda/donde-comprar-cafe-tostado-al-mayoreo-en-mexico`](https://www.perro.cafe/blogs/ayuda/donde-comprar-cafe-tostado-al-mayoreo-en-mexico) | 2026-05-14 | ¿Dónde comprar café tostado al mayoreo en México? | 517 |
| [`/blogs/ayuda/como-elegir-un-proveedor-de-cafe-para-tu-negocio`](https://www.perro.cafe/blogs/ayuda/como-elegir-un-proveedor-de-cafe-para-tu-negocio) | 2026-05-25 | Cómo elegir un proveedor de café para tu negocio | 634 |
| [`/blogs/ayuda/cuanto-cafe-consume-un-restaurante-al-mes-guia-2026`](https://www.perro.cafe/blogs/ayuda/cuanto-cafe-consume-un-restaurante-al-mes-guia-2026) | 2026-05-29 | ¿Cuánto café consume un restaurante al mes? Guía 2026 | 654 |
| [`/blogs/ayuda/que-cafe-comprar-para-una-cafeteria-nueva-guia-2026`](https://www.perro.cafe/blogs/ayuda/que-cafe-comprar-para-una-cafeteria-nueva-guia-2026) | 2026-05-29 | Qué café comprar para una cafetería nueva: guía 2026 | 816 |
| [`/blogs/negocio/como-abrir-una-cafeteria-en-mexico-en-2026-guia-completa-para-emprendedores`](https://www.perro.cafe/blogs/negocio/como-abrir-una-cafeteria-en-mexico-en-2026-guia-completa-para-emprendedores) | 2026-05-29 | Cómo abrir una cafetería en México en 2026: guía completa para emprendedores | 1514 |
| [`/blogs/negocio/cuanto-cuesta-abrir-una-cafeteria-en-mexico-en-2026`](https://www.perro.cafe/blogs/negocio/cuanto-cuesta-abrir-una-cafeteria-en-mexico-en-2026) | 2026-05-29 | ¿Cuánto cuesta abrir una cafetería en México en 2026? | 694 |

All 13 articles: **Migrate, keeping their URLs** (or 301 each to its new URL) to keep search traffic.
The `ayuda` and `negocio` articles target B2B buyers and should link to the catalog and `/ventas`.

## Next steps

1. Decide where retail sales live (Shopify checkout, Mercado Libre, or a new cart). That decides whether
   products and the collection move or redirect out.
2. Confirm the Review items (`agents.md`, loyalty program, payment-methods page, Hermosillo landing).
3. Agree on the URL structure for the new site and build the 301 map from the CSV's `proposed_action`.
4. Export full content (body HTML, images, alt text) for the Migrate/Merge rows — this report inventories
   URLs and metadata only, not full page bodies.

## Method

- Parsed the sitemap index and all 5 child sitemaps; fetched each URL once with a plain HTTP client.
- Metadata comes from each page's HTML (`<title>`, meta description, `<h1>`, canonical, robots). Word counts
  are approximate (text inside `<main>`).
- Product variants, prices and images come from Shopify's public `/products/<handle>.json`.
- Only URLs in the sitemap are covered. Shopify also serves pages that sitemaps omit (e.g. `/policies/*`,
  `/search`, `/cart`); check those separately if they matter.
