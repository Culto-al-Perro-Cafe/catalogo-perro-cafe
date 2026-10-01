/**
 * "Métodos de pago" page (/metodos-de-pago), migrated from the Shopify store page.
 * Edit the account details and copy here — the page reads everything from this file.
 */
import { siteConfig } from "./site";

export const paymentsConfig = {
  seoTitle: "Métodos de pago",
  seoDescription:
    "Paga tu pedido de Culto al Perro Café por transferencia bancaria (SPEI) o con Cobro Digital (CoDi).",

  title: "Métodos de",
  titleAccent: "pago",
  intro: "Contamos con los siguientes métodos de pago para tu comodidad.",
  /** Whatsapp invitation under the intro (same number as /ventas). */
  proof: {
    text: "¿Ya pagaste? Envíanos tu comprobante por",
    linkLabel: "Whatsapp",
    url: siteConfig.sales.whatsapp.url,
  },

  spei: {
    title: "Transferencia bancaria",
    rows: [
      { label: "Titular", value: "José Miguel Salcido Aguilar" },
      { label: "Banco", value: "Inbursa" },
      { label: "CLABE", value: "036760500645411415" },
    ],
    /** Button that copies the CLABE. */
    copyLabel: "Copiar CLABE",
    copiedLabel: "CLABE copiada",
  },

  codi: {
    title: "CODI",
    /** Brief how-to, shown above the QR code. */
    steps: [
      "Abre la app de tu banco y entra a la opción CoDi.",
      "Escanea este código QR.",
      "Escribe el monto de tu pedido y confirma el pago.",
    ],
    image: { src: "/images/pagos/codi-qr.png", alt: "Código QR para transferencias usando CoDi" },
  },
} as const;
