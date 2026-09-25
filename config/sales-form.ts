/**
 * Copy and options for the "Platica con ventas" quote form.
 */

export const RECOMMEND_OPTION = "Recomiéndenme algo";
export const OTHER_BUSINESS_TYPE = "Otro";

export const salesFormConfig = {
  fields: {
    nombre: { label: "Nombre completo", placeholder: "Ej. María López García" },
    email: { label: "Email", placeholder: "tu@negocio.com" },
    whatsapp: { label: "Número de WhatsApp", placeholder: "+52 662 123 4567" },
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

  consumoOptions: ["5-10 kg", "11-15 kg", "Más de 15 kg"],

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
    /** `{email}` is replaced at runtime. */
    body: "Te mandamos una cotización a {email}.",
    back: "Regresa al catálogo",
  },
} as const;
