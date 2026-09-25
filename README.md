# Catálogo B2B — El Culto al Perro Café

Wholesale coffee catalog built with Next.js 16 (App Router), implemented from the
Claude Design project **Catálogo B2B** and its "Public Bento" design system.

```bash
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL and SALES_WEBHOOK_URL
npm install
npm run dev
```

## Routes

| Route             | What                                                    |
| ----------------- | ------------------------------------------------------- |
| `/`               | Catalog: hero, product line cards, sales CTA            |
| `/lineas/[slug]`  | Product line detail (statically generated per line)     |
| `/ventas`         | Quote form (`?linea=<slug>` preselects a line)          |

## Editing content

All copy and data live in `config/` — no component changes needed:

- `config/site.ts` — site name, SEO defaults, ticker, hero, CTA, footer, sales page copy.
- `config/lines.ts` — product lines. Adding an entry creates its card, detail page,
  sitemap entry, footer link, JSON-LD and form option. Set `image` to replace the
  hatched placeholder with a photo from `/public`.
- `config/sales-form.ts` — form labels, options and validation messages.

## Sales leads

`app/ventas/actions.ts` validates the submission on the server and POSTs it as JSON
to `SALES_WEBHOOK_URL`. In development the lead is logged instead; in production a
missing webhook shows an error so leads are never silently dropped.

The receiving end is the n8n workflow in `n8n/ventas-leads.workflow.json`
(import it in n8n → *Workflows → Import from file*, then activate it):

```
Webhook (POST) → Normalizar lead → Responder OK
```

Production URL: `https://n8n.pozole.dev/webhook/0da30cf0-a0a5-483b-990c-7903e8ef89af`.
The URL is only called from the server, never exposed to the browser. Leads appear
under the workflow's *Executions*; add nodes after "Normalizar lead" to notify sales.

## SEO

Metadata API with canonical URLs, generated Open Graph images per page,
JSON-LD (Organization, WebSite, ItemList, Product, BreadcrumbList), `sitemap.xml`,
`robots.txt`, web manifest and icons. Fonts are self-hosted via `next/font`, and icons are
inline SVG, so the site loads no third-party requests.

## Styling

- `app/styles/tokens.css` — design tokens (brand colors and fonts are also Tailwind theme values).
- `app/styles/ds.css` — design-system classes (`cp-btn`, `cp-tile`, `cp-field`, `t-display-*`…)
  in the `ds` cascade layer; per-component CSS Modules override them.
