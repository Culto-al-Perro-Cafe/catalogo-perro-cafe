"use server";

import { leadForms, type LeadFormId } from "@/config/ctas";

export type LeadInput = {
  name: string;
  email: string;
  city: string;
  opening_stage: string;
  /** Honeypot — real people leave it empty. */
  company: string;
};

export async function submitLead(id: LeadFormId, input: LeadInput, pageUrl: string): Promise<{ ok: boolean }> {
  const cfg = leadForms[id];
  if (!cfg) return { ok: false };

  // Bots fill the hidden field: pretend it worked, send nothing.
  if (String(input?.company ?? "").trim()) return { ok: true };

  const clean = (v: unknown) => String(v ?? "").trim().slice(0, 200);
  const lead = {
    name: clean(input?.name),
    email: clean(input?.email),
    city: clean(input?.city),
    opening_stage: clean(input?.opening_stage),
  };
  if (
    !lead.name ||
    !lead.city ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) ||
    !(cfg.stageOptions as readonly string[]).includes(lead.opening_stage)
  ) {
    return { ok: false };
  }

  // Same payload as the original Shopify form.
  try {
    const res = await fetch(cfg.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: cfg.source,
        lead_magnet: cfg.leadMagnet,
        ...lead,
        page_url: clean(pageUrl),
        submitted_at: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return { ok: true };
  } catch (error) {
    console.error(`[lead-form:${id}] delivery failed`, error);
    return { ok: false };
  }
}
