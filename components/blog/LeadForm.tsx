"use client";

import { useState, useTransition, type FormEvent } from "react";
import { submitLead } from "@/app/blogs/actions";
import type { LeadFormConfig, LeadFormId } from "@/config/ctas";
import { Button } from "@/components/ui/Button";
import { SelectField, TextField } from "@/components/ui/fields";
import styles from "./LeadForm.module.css";

type Copy = Omit<LeadFormConfig, "webhookUrl" | "source" | "leadMagnet">;

/** Lead-capture form embedded in an article via `::lead-form{id="…"}`. */
export function LeadForm({ id, copy }: { id: LeadFormId; copy: Copy }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [pending, startTransition] = useTransition();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "");
    setStatus("idle");
    startTransition(async () => {
      const { ok } = await submitLead(
        id,
        { name: get("name"), email: get("email"), city: get("city"), opening_stage: get("opening_stage"), company: get("company") },
        window.location.href,
      );
      setStatus(ok ? "success" : "error");
      if (ok) form.reset();
    });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <p className={styles.title}>{copy.title}</p>
      <p className={styles.body}>{copy.body}</p>
      <div className={styles.fields}>
        <TextField label="Nombre" name="name" autoComplete="name" placeholder="Tu nombre" required />
        <TextField label="Email" name="email" type="email" autoComplete="email" placeholder="correo@ejemplo.com" required />
        <TextField label="Ciudad" name="city" autoComplete="address-level2" placeholder="Ej. Hermosillo" required />
        <SelectField
          label={copy.stageLabel}
          name="opening_stage"
          defaultValue=""
          required
          options={[{ value: "", label: "Selecciona una opción" }, ...copy.stageOptions.map((o) => ({ value: o, label: o }))]}
        />
      </div>
      <div className={styles.honeypot} aria-hidden="true">
        <label>
          Empresa
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className={styles.actions}>
        <Button type="submit" variant="roast" size="lg" iconAfter="send" pending={pending} pendingLabel={copy.pendingLabel}>
          {copy.submitLabel}
        </Button>
        <span className={styles.trust}>{copy.trustCopy}</span>
      </div>
      <p className={styles.message} role="status" aria-live="polite" data-status={status}>
        {status === "success" ? copy.success : status === "error" ? copy.error : ""}
      </p>
    </form>
  );
}
