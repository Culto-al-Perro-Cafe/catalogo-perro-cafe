"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition, type FormEvent } from "react";
import { submitSalesLead } from "@/app/ventas/actions";
import { getProductLine, productLines } from "@/config/lines";
import {
  OTHER_BUSINESS_TYPE,
  RECOMMEND_OPTION,
  salesFormConfig as cfg,
} from "@/config/sales-form";
import { routes } from "@/lib/routes";
import {
  emptySalesLead,
  validateSalesLead,
  type SalesLead,
  type SalesLeadErrors,
} from "@/lib/sales-form";
import { Button } from "@/components/ui/Button";
import { SegmentedChoice, SelectField, TextField } from "@/components/ui/fields";
import styles from "./SalesForm.module.css";
import { track } from "@/lib/analytics";
import { analyticsEvents } from "@/config/analytics";

const lineOptions = [RECOMMEND_OPTION, ...productLines.map((l) => l.name)];
const businessOptions = [
  { value: "", label: cfg.fields.tipo.placeholder },
  ...cfg.businessTypes.map((t) => ({ value: t, label: t })),
];
const SENT_PARAM = "enviado";

const FIELD_ORDER: (keyof SalesLead)[] = [
  "nombre",
  "email",
  "whatsapp",
  "cp",
  "consumo",
  "tipo",
  "tipoOtro",
];

/**
 * Shows the thank-you panel on `?enviado`, otherwise the form (with `?linea=<slug>`
 * preselecting the product line). Wrap in <Suspense>.
 */
export function SalesFormFromParams() {
  const params = useSearchParams();
  if (params.has(SENT_PARAM)) return <SalesSuccess />;
  const slug = params.get("linea");
  const line = slug ? getProductLine(slug) : undefined;
  return <SalesForm key={line?.slug} initialLine={line?.name} />;
}

/** Deliberately shows no submitted data (it would end up in the URL or screenshots). */
export function SalesSuccess() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <div ref={ref} tabIndex={-1} className={styles.panel} role="status">
      <h2 className={`t-display-sm ${styles.successTitle}`}>{cfg.success.title}</h2>
      <p className="t-body">{cfg.success.body}</p>
      <div className={styles.successActions}>
        <Button href={routes.home} variant="secondary" size="lg" icon="arrow_back">
          {cfg.success.back}
        </Button>
      </div>
    </div>
  );
}

export function SalesForm({ initialLine }: { initialLine?: string }) {
  const [form, setForm] = useState<SalesLead>({
    ...emptySalesLead,
    linea: initialLine ?? RECOMMEND_OPTION,
  });
  const [errors, setErrors] = useState<SalesLeadErrors>({});
  const [formError, setFormError] = useState<string>();
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const set = (key: keyof SalesLead, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const showErrors = (next: SalesLeadErrors) => {
    setErrors(next);
    const first = FIELD_ORDER.find((k) => next[k]);
    if (!first) return;
    const target =
      first === "consumo"
        ? formRef.current?.querySelector<HTMLElement>('[role="radio"]')
        : formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
    target?.focus();
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(undefined);
    const clientErrors = validateSalesLead(form);
    if (Object.keys(clientErrors).length > 0) return showErrors(clientErrors);

    startTransition(async () => {
      const result = await submitSalesLead(form);
      if (result.ok) {
        // No personal data: only what the lead is interested in.
        track(analyticsEvents.quoteSubmitted, { linea: form.linea, tipo: form.tipo, consumo: form.consumo });
        router.replace(routes.salesSent, { scroll: false });
      }
      else {
        showErrors(result.errors);
        setFormError(result.formError);
      }
    });
  };

  const f = cfg.fields;
  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={`${styles.panel} ${styles.form}`}>
      <TextField
        label={f.nombre.label}
        name="nombre"
        autoComplete="name"
        placeholder={f.nombre.placeholder}
        value={form.nombre}
        onChange={(e) => set("nombre", e.target.value)}
        error={errors.nombre}
        required
      />
      <div className={styles.row}>
        <TextField
          label={f.email.label}
          type="email"
          name="email"
          autoComplete="email"
          placeholder={f.email.placeholder}
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          error={errors.email}
          required
        />
        <TextField
          label={f.whatsapp.label}
          type="tel"
          name="whatsapp"
          autoComplete="tel"
          inputMode="tel"
          placeholder={f.whatsapp.placeholder}
          value={form.whatsapp}
          onChange={(e) => set("whatsapp", e.target.value)}
          error={errors.whatsapp}
          required
        />
        <TextField
          label={f.cp.label}
          name="cp"
          autoComplete="postal-code"
          inputMode="numeric"
          maxLength={5}
          placeholder={f.cp.placeholder}
          value={form.cp}
          onChange={(e) => set("cp", e.target.value.replace(/\D/g, "").slice(0, 5))}
          error={errors.cp}
          required
        />
      </div>

      <SegmentedChoice
        label={f.consumo.label}
        name="consumo"
        options={cfg.consumoOptions}
        value={form.consumo}
        onChange={(v) => set("consumo", v)}
        error={errors.consumo}
      />

      <div className={`${styles.row} ${styles.selects}`}>
        <SelectField
          label={f.linea.label}
          name="linea"
          options={lineOptions}
          value={form.linea}
          onChange={(e) => set("linea", e.target.value)}
        />
        <SelectField
          label={f.tipo.label}
          name="tipo"
          options={businessOptions}
          value={form.tipo}
          onChange={(e) => set("tipo", e.target.value)}
          error={errors.tipo}
          required
        />
      </div>

      {form.tipo === OTHER_BUSINESS_TYPE && (
        <TextField
          label={f.tipoOtro.label}
          name="tipoOtro"
          placeholder={f.tipoOtro.placeholder}
          value={form.tipoOtro}
          onChange={(e) => set("tipoOtro", e.target.value)}
          error={errors.tipoOtro}
          required
        />
      )}

      {formError && (
        <p role="alert" className="cp-field-error">
          {formError}
        </p>
      )}

      <div className={styles.submit}>
        <Button
          type="submit"
          variant="roast"
          size="xl"
          iconAfter="send"
          pending={pending}
          pendingLabel={cfg.submit.pending}
          fullWidth
        >
          {cfg.submit.label}
        </Button>
      </div>
    </form>
  );
}
