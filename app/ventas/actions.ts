"use server";

import { productLines } from "@/config/lines";
import { RECOMMEND_OPTION, beanOptionNames, quotePairNames, salesFormConfig } from "@/config/sales-form";
import {
  emptySalesLead,
  validateSalesLead,
  type SalesLead,
  type SalesLeadErrors,
} from "@/lib/sales-form";

export type SubmitSalesLeadResult =
  | { ok: true }
  | { ok: false; errors: SalesLeadErrors; formError?: string };

export async function submitSalesLead(input: SalesLead): Promise<SubmitSalesLeadResult> {
  // Never trust the client payload: keep known keys, coerce to trimmed strings.
  const lead = Object.fromEntries(
    Object.keys(emptySalesLead).map((key) => [
      key,
      String(input?.[key as keyof SalesLead] ?? "").trim().slice(0, 200),
    ]),
  ) as SalesLead;

  const validLines = [RECOMMEND_OPTION, ...productLines.map((l) => l.name), ...beanOptionNames, ...quotePairNames];
  if (!validLines.includes(lead.linea)) lead.linea = RECOMMEND_OPTION;

  const errors = validateSalesLead(lead);
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  // Delivery: POST to a webhook (Zapier, Make, n8n, CRM, Slack…) when configured.
  const webhook = process.env.SALES_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV === "production") {
      // Don't show "Gracias" for a lead nobody will receive.
      console.error("[ventas] SALES_WEBHOOK_URL is not set; lead was not delivered.");
      return { ok: false, errors: {}, formError: salesFormConfig.errors.server };
    }
    console.info("[ventas] (dev) SALES_WEBHOOK_URL not set. Lead:", lead);
    return { ok: true };
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, submittedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return { ok: true };
  } catch (error) {
    console.error("[ventas] Failed to deliver lead", error);
    return { ok: false, errors: {}, formError: salesFormConfig.errors.server };
  }
}
