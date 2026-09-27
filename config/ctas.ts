/**
 * Calls to action that articles can embed. Ported from the Shopify theme's
 * `window.CTA_REGISTRY`: define a CTA once here, reference it from Markdown.
 *
 *   ::cta{id="cotizar"}                              → preset as-is
 *   ::cta{id="cotizar" label="Cotiza aquí"}          → preset, overriding the button label
 *   :::cta{href="/ventas" label="Solicitar cotización"}
 *   ### Custom title
 *   Custom body in **Markdown**.
 *   :::                                              → one-off CTA written inline
 *
 *   ::lead-form{id="kit-cafeteria-2026"}             → lead-capture form (see leadForms)
 */

export type CtaConfig = {
  title: string;
  body?: string;
  label: string;
  href: string;
  image?: { src: string; alt: string };
};

export const ctas = {
  cotizar: {
    title: "¿Necesitas café para tu negocio?",
    body: "Te recomendamos la línea ideal y te cotizamos tu consumo mensual. Envíos a todo México.",
    label: "Solicitar cotización",
    href: "/ventas",
  },
  "sampler-202603": {
    title: "La Caja Catadora del Perro es todo lo que nuestro chef trae",
    label: "Ver qué trae",
    href: "https://www.perro.cafe/products/caja-catadora-del-perro?utm_source=blog&utm_medium=cta&utm_campaign=sampler_202603",
    image: {
      src: "/images/cta/caja-catadora-del-perro.png",
      alt: "La Caja Catadora del Perro es todo lo que nuestro chef trae",
    },
  },
} satisfies Record<string, CtaConfig>;

export type CtaId = keyof typeof ctas;

export type LeadFormConfig = {
  /** Where submissions are POSTed (server-side) as JSON. */
  webhookUrl: string;
  /** Sent with every submission so the backend can tell forms apart. */
  source: string;
  leadMagnet: string;
  title: string;
  body: string;
  stageLabel: string;
  stageOptions: string[];
  submitLabel: string;
  pendingLabel: string;
  trustCopy: string;
  success: string;
  error: string;
};

export const leadForms = {
  "kit-cafeteria-2026": {
    webhookUrl: "https://backend.otfusion.org/webhook/cpc/kit-cafeteria-2026",
    source: "blogpost_abrir_cafeteria_mexico_2026",
    leadMagnet: "kit_gratuito_abrir_cafeteria_mexico_2026",
    title: "Obtén el Kit Gratuito para Abrir una Cafetería en México (2026)",
    body: "Recibe una guía práctica para ordenar tus primeros pasos, revisar costos y preparar mejor tus decisiones antes de invertir.",
    stageLabel: "¿Cuándo planeas abrir?",
    stageOptions: [
      "Solo investigando",
      "En los próximos 6 meses",
      "En los próximos 3 meses",
      "Ya estoy por abrir",
    ],
    submitLabel: "Enviar kit gratuito",
    pendingLabel: "Enviando…",
    trustCopy: "Te enviaremos el kit por correo. Sin spam.",
    success: "Listo. Te enviaremos el kit gratuito a tu correo.",
    error: "Estamos teniendo problemas técnicos. Intenta de nuevo más tarde.",
  },
} satisfies Record<string, LeadFormConfig>;

export type LeadFormId = keyof typeof leadForms;
