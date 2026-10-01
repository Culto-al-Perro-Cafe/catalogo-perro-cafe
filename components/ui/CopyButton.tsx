"use client";

import { useState } from "react";
import { Button } from "./Button";

/** Copies `value` to the clipboard and confirms with `copiedLabel` for a moment. */
export function CopyButton({ value, label, copiedLabel }: { value: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(value);
      ok = true;
    } catch {
      // Clipboard API unavailable or denied (older browsers, embedded views): legacy copy.
      const field = document.createElement("textarea");
      field.value = value;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      ok = document.execCommand("copy");
      field.remove();
    }
    if (!ok) return; // The value is still on the page to select by hand.
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button variant="secondary" onClick={copy} aria-live="polite">
      {copied ? copiedLabel : label}
    </Button>
  );
}
