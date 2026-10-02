/**
 * Copy and options for the "Platica con ventas" quote form.
 */

import { getProductLine, productLines } from "@/config/lines";
import { getBean } from "@/config/beans";

export const RECOMMEND_OPTION = "Recomiéndenme algo";
export const OTHER_BUSINESS_TYPE = "Otro";

export const salesFormConfig = {
  fields: {
    nombre: { label: "Nombre completo", placeholder: "Ej. María López García" },
    email: { label: "Email", placeholder: "tu@negocio.com" },
    whatsapp: { label: "Número de Whatsapp", placeholder: "+52 662 123 4567" },
    cp: { label: "Código postal", placeholder: "83000" },
    consumo: {
      label: "¿Cuál es el consumo estimado de café en tu negocio al mes?",
    },
    linea: { label: "Línea de interés" },
    tipo: {
      label: "¿Qué tipo de establecimiento representas?",
      placeholder: "Selecciona una opción",
    },
    tipoOtro: {
      label: "Cuéntanos qué tipo de establecimiento",
      placeholder: "Ej. hotel, panadería, food truck",
    },
  },

  consumoOptions: ["5-10 kg", "11-15 kg", "16 kg o más"],

  /**
   * Specific coffees for "Línea de interés", by `?linea=<slug>` → bean (config/beans.ts).
   * Hidden from the dropdown unless the URL asks for one; the lead is sent with the bean's name.
   */
  beanOptions: [{ slug: "natural-honey", bean: "natural-honey-veracruz" }],

  businessTypes: [
    "Restaurante",
    "Barra de café (Cafetería)",
    "Oficina o similar",
    "Distribuidor",
    "Catering",
    OTHER_BUSINESS_TYPE,
  ],

  errors: {
    nombre: "Escribe tu nombre completo.",
    email: "Escribe un email válido.",
    whatsapp: "Escribe un número de 10 dígitos.",
    cp: "Escribe un código postal de 5 dígitos.",
    consumo: "Selecciona tu consumo estimado.",
    tipo: "Selecciona tu tipo de establecimiento.",
    tipoOtro: "Describe tu tipo de establecimiento.",
    server: "No pudimos enviar tu solicitud. Intenta de nuevo en un momento.",
  },

  submit: { label: "Solicita cotización", pending: "Enviando…" },

  success: {
    title: "Recibido",
    body: "Tendrás una cotización en tu correo en breve. Si tienes dudas, puedes responder al mismo correo.",
    back: "Regresa al catálogo",
  },
} as const;

/** A `?linea=` bean option (salesFormConfig.beanOptions) as the dropdown/lead value. */
export function getBeanOption(slug: string): { slug: string; name: string } | undefined {
  const option = salesFormConfig.beanOptions.find((o) => o.slug === slug);
  const bean = option && getBean(option.bean);
  return bean && { slug: option.slug, name: bean.name };
}

/** Bean options' names: always valid "linea" values for the server. */
export const beanOptionNames = salesFormConfig.beanOptions.map((o) => getBean(o.bean)?.name).filter(Boolean) as string[];

/** Only catalogued line/bean pairs become quote values; arbitrary URL text is ignored. */
export function getQuoteSelection(lineSlug: string | null, beanSlug: string | null) {
  const line = lineSlug ? getProductLine(lineSlug) : undefined;
  const bean = beanSlug && line?.variants?.includes(beanSlug) ? getBean(beanSlug) : undefined;
  if (line && bean) return { name: `${line.name} · ${bean.name}`, extra: true };
  if (line) return { name: line.name, extra: false };
  const legacyBean = lineSlug ? getBeanOption(lineSlug) : undefined;
  return legacyBean ? { name: legacyBean.name, extra: true } : undefined;
}

export const quotePairNames = productLines.flatMap((line) =>
  (line.variants ?? []).flatMap((slug) => {
    const selection = getQuoteSelection(line.slug, slug);
    return selection?.extra ? [selection.name] : [];
  }),
);
