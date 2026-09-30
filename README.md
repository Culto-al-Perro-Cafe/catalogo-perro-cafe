# Catálogo B2B — Culto al Perro Café

Wholesale coffee catalog built with Next.js 16 (App Router), implemented from the
Claude Design project **Catálogo B2B** and its "Public Bento" design system.

```bash
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL and SALES_WEBHOOK_URL
pnpm install
pnpm dev
```

## Routes

| Route             | What                                                    |
| ----------------- | ------------------------------------------------------- |
| `/`               | Catalog: hero, product line cards, sales CTA            |
| `/lineas/[slug]`  | Product line detail (statically generated per line)     |
| `/ventas`         | Quote form (`?linea=<slug>` preselects a line)          |
| `/blogs`          | All articles, newest first (linked from the footer)     |
| `/blogs/[blog]`   | Blog index (5 blogs)                                    |
| `/blogs/[blog]/[slug]` | Article from `content/blogs` (see below)           |

## Editing content

All copy and data live in `config/` — no component changes needed:

- `config/site.ts` — site name, SEO defaults, ticker, hero, CTA, footer, sales page copy.
- `config/lines.ts` — product lines. Adding an entry creates its card, detail page,
  sitemap entry, footer link, JSON-LD and form option. Set `image` to replace the
  hatched placeholder with a photo from `/public`.
- `config/sales-form.ts` — form labels, options and validation messages.

## Blog articles

Articles are Markdown files — no database. URLs match the original Shopify store:

```
content/blogs/<blog>/<slug>.md   →   /blogs/<blog>/<slug>
public/images/blog/<slug>/…      →   article images
```

Blogs (`ayuda`, `negocio`, `tostadores`, `recetas`, `noticias`) are declared in `config/blogs.ts`.
Each file starts with frontmatter:

```yaml
---
title: Cómo elegir un proveedor de café para tu negocio
seoTitle: Optional <title> when it should differ from the title
description: Meta description (≈150 characters)
date: '2026-05-25'
updated: '2026-05-25'        # optional
author: José Salcido
image:                        # optional cover (also the share image)
  src: /images/blog/<slug>/cover.png
  alt: Describe the image
  caption: Optional caption under the cover
legacyUrl: https://www.perro.cafe/blogs/ayuda/…   # optional
related: [ayuda/otro-articulo, negocio/otro-mas]  # optional "Sigue leyendo" (default: newest in the same blog)
---
```

The body is GitHub-flavored Markdown (tables, footnotes `[^1]`), plus:

| Syntax | Renders |
|---|---|
| `## Heading {#anchor}` | Heading with a fixed anchor (`#anchor` links keep working) |
| `![Alt](/images/…  "Caption")` | Image; on its own line it becomes a figure with caption |
| `::cta{id="cotizar"}` | CTA preset from `config/ctas.ts` |
| `::cta{id="cotizar" label="Cotiza aquí"}` | Preset with a different button label (or `href`) |
| `:::cta{href="/ventas" label="…"}` … `:::` | One-off CTA; the Markdown inside is its title/body |
| `::producto{id="restaurante"}` | "Producto recomendado" card for a catalog line (`config/lines.ts`) |
| `::lead-form{id="kit-cafeteria-2026"}` | Lead-capture form (webhook + copy in `config/ctas.ts`) |
| `:::details[Question]` … `:::` | Collapsible block (FAQs, tips) |

Text CTAs render as the orange box, CTAs with an image as the ivory card. Reading time
("N min de lectura") is computed automatically. Unknown embeds, CTA/line ids or `related` entries fail the build, so typos can't ship. Add a CTA once in `config/ctas.ts`
and reuse it from any article.

## Sales leads

`app/ventas/actions.ts` validates the submission on the server and POSTs it as JSON
to `SALES_WEBHOOK_URL`. In development the lead is logged instead; in production a
missing webhook shows an error so leads are never silently dropped.

The receiving end is the n8n workflow "Leads de Ventas (Catálogo B2B)" on n8n.pozole.dev
(managed in n8n, not in this repo):

```
Webhook (POST) → Normalizar lead → Guardar lead → Responder OK
                                                   ├→ email alert to new_lead_notification_targets
                                                   └→ RoastOS quote (order in "pricing") → PDF emailed to the lead
```

Production URL: `https://n8n.pozole.dev/webhook/0da30cf0-a0a5-483b-990c-7903e8ef89af`.
The URL is only called from the server, never exposed to the browser. Each lead is
stored as a row in the n8n Data Table `leads_catalogo_b2b` (id `87vVIvYjmKb4rvRQ`); if
storing fails the webhook errors and the form shows an error instead of "Recibido".

## SEO

Metadata API with canonical URLs, generated Open Graph images per page,
JSON-LD (Organization, WebSite, ItemList, Product, BreadcrumbList), `sitemap.xml`,
`robots.txt`, web manifest and icons. Fonts are self-hosted via `next/font`, and icons are
inline SVG, so the site loads no third-party requests.

## Styling

- `app/styles/tokens.css` — design tokens (brand colors and fonts are also Tailwind theme values).
- `app/styles/ds.css` — design-system classes (`cp-btn`, `cp-tile`, `cp-field`, `t-display-*`…)
  in the `ds` cascade layer; per-component CSS Modules override them.
