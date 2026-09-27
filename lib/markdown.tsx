import fs from "node:fs";
import path from "node:path";
import type { Root as HastRoot } from "hast";
import { toJsxRuntime, type Components } from "hast-util-to-jsx-runtime";
import { imageSize } from "image-size";
import type { Paragraph, PhrasingContent, Root } from "mdast";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit, SKIP } from "unist-util-visit";
import { blogSection } from "@/config/blogs";
import { ctas, leadForms } from "@/config/ctas";
import { getProductLine } from "@/config/lines";

/**
 * Markdown → React (server-rendered, no client JS except embedded forms).
 * Supports GFM (tables, footnotes), `## Heading {#id}` anchors and these embeds:
 *   ::cta{id="…" label="…"}   :::cta{href="…" label="…"} … :::
 *   ::lead-form{id="…"}       :::details[Summary] … :::
 *   ::producto{id="<line slug>"}   → "Producto recomendado" card for a catalog line
 */

type Directive = {
  type: "containerDirective" | "leafDirective" | "textDirective";
  name: string;
  attributes?: Record<string, string | null | undefined> | null;
  children: (PhrasingContent | Paragraph)[];
  data?: { hName?: string; hProperties?: Record<string, unknown> };
};

function remarkEmbeds() {
  return (tree: Root, file: { path?: string }) => {
    const where = file.path ? ` (${file.path})` : "";

    visit(tree, (node, index, parent) => {
      const d = node as unknown as Directive;
      if (!["containerDirective", "leafDirective", "textDirective"].includes(d.type)) return;
      const attrs = d.attributes ?? {};

      // `:word` inside prose is not meant as a directive — put the text back.
      if (d.type === "textDirective") {
        const text = (d.children as PhrasingContent[])
          .map((c) => ("value" in c ? c.value : ""))
          .join("");
        parent!.children.splice(index!, 1, { type: "text", value: `:${d.name}${text ? `[${text}]` : ""}` } as PhrasingContent);
        return [SKIP, index!];
      }

      if (d.name === "cta") {
        if (attrs.id && !(attrs.id in ctas)) throw new Error(`Unknown CTA id "${attrs.id}"${where}. Add it to config/ctas.ts.`);
        if (!attrs.id && !attrs.href) throw new Error(`CTA needs an id or an href${where}.`);
        d.data = { hName: "cta-embed", hProperties: { cta: attrs.id, label: attrs.label, href: attrs.href } };
        return;
      }
      if (d.name === "lead-form") {
        if (!attrs.id || !(attrs.id in leadForms)) throw new Error(`Unknown lead form "${attrs.id}"${where}. Add it to config/ctas.ts.`);
        d.data = { hName: "lead-form-embed", hProperties: { form: attrs.id } };
        return;
      }
      if (d.name === "producto") {
        if (!attrs.id || !getProductLine(attrs.id))
          throw new Error(`Unknown product line "${attrs.id}"${where}. Use a slug from config/lines.ts.`);
        d.data = { hName: "product-embed", hProperties: { line: attrs.id } };
        return;
      }
      if (d.name === "details" && d.type === "containerDirective") {
        d.data = { hName: "details" };
        const label = d.children[0] as Paragraph & { data?: { directiveLabel?: boolean; hName?: string } };
        if (label?.data?.directiveLabel) label.data.hName = "summary";
        return;
      }
      throw new Error(`Unknown embed "${d.name}"${where}.`);
    });

    // `## Title {#anchor}` → <h2 id="anchor">Title</h2>
    visit(tree, "heading", (h) => {
      const last = h.children[h.children.length - 1];
      if (last?.type !== "text") return;
      const m = last.value.match(/\s*\{#([\w-]+)\}\s*$/);
      if (!m) return;
      last.value = last.value.slice(0, m.index);
      h.data = { ...h.data, hProperties: { ...(h.data?.hProperties ?? {}), id: m[1] } };
    });

    // A paragraph holding only an image becomes a block figure — lift it out of the <p>
    // and mark it, so inline images (inside text) never render a <figure> within a <p>.
    visit(tree, "paragraph", (p, index, parent) => {
      const only = p.children.length === 1 ? p.children[0] : undefined;
      if (only?.type === "image" && parent) {
        only.data = { ...only.data, hProperties: { ...(only.data?.hProperties ?? {}), dataBlock: "" } };
        parent.children.splice(index!, 1, only as never);
        return [SKIP, index!];
      }
    });
  };
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkDirective)
  .use(remarkEmbeds)
  .use(remarkRehype, {
    footnoteLabel: blogSection.footnotesLabel,
    footnoteLabelProperties: { className: ["sr-only"] },
    footnoteBackLabel: "Volver al texto",
  });

export function renderMarkdown(markdown: string, components: Partial<Components>, filePath?: string) {
  const mdast = processor.parse({ value: markdown, path: filePath });
  const hast = processor.runSync(mdast, { value: markdown, path: filePath }) as HastRoot;
  return toJsxRuntime(hast, { Fragment, jsx, jsxs, components: components as Components });
}

/** Width/height of an image in /public, for next/image. */
export function publicImageSize(src: string): { width: number; height: number } | undefined {
  if (!src.startsWith("/")) return undefined;
  try {
    const { width, height } = imageSize(fs.readFileSync(path.join(process.cwd(), "public", src)));
    return width && height ? { width, height } : undefined;
  } catch {
    return undefined;
  }
}
