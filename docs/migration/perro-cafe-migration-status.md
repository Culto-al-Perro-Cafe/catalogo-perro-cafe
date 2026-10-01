# perro.cafe — migration status

Re-check of [`https://www.perro.cafe/sitemap.xml`](https://www.perro.cafe/sitemap.xml) on 2026-09-27
against the new site ([catalogo.perro.cafe](https://catalogo.perro.cafe), v0.14.0).
Baseline inventory: [`perro-cafe-sitemap-report.md`](perro-cafe-sitemap-report.md) (2026-09-26).

## Summary

The Shopify sitemap is unchanged: still the same **40 URLs**. Nothing was added or removed since the
first crawl. Only the 9 product URLs have a new `lastmod` (all 2026-09-27 21:34, a bulk Shopify
update, not new content).

| Status | Paths | Detail |
|---|---|---|
| Migrated | 19 | Home, 5 blog indexes and 13 articles, all on the same URLs (200) |
| Redirected | 13 | Permanent redirect (308) to the replacement page, in `config/redirects.ts` |
| Pending — needs new content | 4 | No equivalent page on the new site yet |
| Pending — needs a decision | 2 | Keep, rewrite or drop |
| Drop | 2 | Let them 404/410 |

**Redirects:** the 13 paths with a replacement page redirect permanently (308) via
`config/redirects.ts` (added 2026-09-28). The remaining 8 paths still return 404 on the new site.
That's harmless while perro.cafe still serves Shopify, but they need an answer before `www.perro.cafe`
points to this app.

The migrated pages also fix earlier findings: the home page has an `<h1>`, and all 5 blog indexes now
have meta descriptions.

## Migrated (19)

| Path | New site |
|---|---|
| `/` | Home (B2B catalog) |
| `/blogs/{ayuda,negocio,noticias,recetas,tostadores}` | Blog indexes, same URLs |
| 13 × `/blogs/<blog>/<slug>` | Articles, same URLs (Markdown in `content/blogs/`) |

## Redirected (13)

| Old path | Redirect to | Why |
|---|---|---|
| `/products/caja-catadora-del-perro` | `/kit` | The sample kit now has its own landing page |
| `/products/caja-de-muestras-de-cafe-empieza-aqui` | `/kit` | Duplicate of the one above (same kit) |
| `/products/cafe-tostado-veracruz-honey-natural` | `/menudeo` | Retail now sells through Mercado Libre from /menudeo |
| `/products/cafe-tostado-veracruz` | `/menudeo` | Same |
| `/products/cafe-tostado-chiapas-americana` | `/menudeo` | Same |
| `/products/cafe-tostado-veracruz-san-felipe-tradicional` | `/menudeo` | Same ("Tostado Intenso") |
| `/collections/nuestro-cafe` | `/menudeo` | Retail listing of those 4 coffees |
| `/products/proveedor-de-cafe-para-restaurantes` | `/lineas/restaurante` | B2B landing built as a product |
| `/products/cafe-para-oficinas` | `/lineas/oficina` | Same |
| `/pages/sobre-nosotros` | `/nosotros` | New "Sobre nosotros" page from the Claude Design project (added 2026-09-28) |
| `/pages/metodos-de-pago` | `/metodos-de-pago` | Recreated in the new style, same content (added 2026-10-01) |
| `/pages/mayoreo` | `/` | Wholesale page; the B2B catalog replaces it |
| `/pages/contact` | `/ventas` | Contact form; B2B sales form covers it (see decision 3 if retail contact is still needed) |

The retail products could instead redirect to their own Mercado Libre listings. A 301 to /menudeo
keeps the traffic (and the SEO value) on our domain.

## Pending — needs new content (4)

| Old path | Proposal |
|---|---|
| `/pages/nuestros-clientes` | New clients / social proof page (or a section on the home page + 301). |
| `/pages/cafe-tostado-hermosillo` | Merge with the next row into one local-SEO page (e.g. `/hermosillo`), 301 both. |
| `/products/cafe-en-grano-tostado-fresco-en-hermosillo` | Same topic as above. |
| `/pages/cafe-tostado-veracruz` | Origin page. Write a Veracruz origin page, or 301 to `/menudeo`. |

Until those pages exist, a temporary 301 keeps the traffic: the Hermosillo pair to
`/blogs/tostadores/la-guia-de-cafe-de-especialidad-en-hermosillo-sonora`, the others to `/`.

## Pending — needs a decision (2)

1. **`/pages/frecuentes`**: the loyalty program. Is it still active? If yes, it needs a page; if not, 301 to `/menudeo`.
2. **`/agents.md`**: Shopify's instructions for AI shopping agents. Without Shopify checkout it doesn't
   apply; let it 404 (or write a short one pointing agents to /menudeo and /ventas).

## Drop (2)

| Path | Why |
|---|---|
| `/pages/elements-test` | Theme test page (lorem ipsum) |
| `/pages/feedback-degustacion` | Survey thank-you page |

## Next steps

1. ~~Add the redirects~~ Done: `config/redirects.ts`, served by `next.config.ts`.
2. Decide on the 3 open items and the 5 content pages.
3. Before switching `www.perro.cafe` to this app: re-crawl the Shopify sitemap, confirm every path
   returns 200 or 301 on the new site, and submit the new sitemap in Search Console.
