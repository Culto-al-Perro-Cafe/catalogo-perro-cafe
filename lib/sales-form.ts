import {
  OTHER_BUSINESS_TYPE,
  RECOMMEND_OPTION,
  salesFormConfig,
} from "@/config/sales-form";

export type SalesLead = {
  nombre: string;
  email: string;
  whatsapp: string;
  cp: string;
  consumo: string;
  linea: string;
  tipo: string;
  tipoOtro: string;
};

export type SalesLeadErrors = Partial<Record<keyof SalesLead, string>>;

export const emptySalesLead: SalesLead = {
  nombre: "",
  email: "",
  whatsapp: "",
  cp: "",
  consumo: "",
  linea: RECOMMEND_OPTION,
  tipo: "",
  tipoOtro: "",
};

/** Shared by the client form and the server action. */
export function validateSalesLead(lead: SalesLead): SalesLeadErrors {
  const msg = salesFormConfig.errors;
  const errors: SalesLeadErrors = {};

  if (!lead.nombre.trim()) errors.nombre = msg.nombre;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email.trim()))
    errors.email = msg.email;
  if (lead.whatsapp.replace(/\D/g, "").length < 10)
    errors.whatsapp = msg.whatsapp;
  if (!/^\d{5}$/.test(lead.cp)) errors.cp = msg.cp;
  if (!(salesFormConfig.consumoOptions as readonly string[]).includes(lead.consumo))
    errors.consumo = msg.consumo;
  if (!(salesFormConfig.businessTypes as readonly string[]).includes(lead.tipo))
    errors.tipo = msg.tipo;
  if (lead.tipo === OTHER_BUSINESS_TYPE && !lead.tipoOtro.trim())
    errors.tipoOtro = msg.tipoOtro;

  return errors;
}
