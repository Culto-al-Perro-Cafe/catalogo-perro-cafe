"use client";

import { useRouter } from "next/navigation";
import { Button } from "./Button";

/**
 * "← Regresar": goes back to the page the visitor came from (menudeo, a line, /kit…);
 * on a direct visit there's nothing to go back to, so it opens `fallbackHref` instead.
 */
export function BackButton({ label, fallbackHref }: { label: string; fallbackHref: string }) {
  const router = useRouter();
  const goBack = () => {
    // In-site visit: either the page loaded from one of ours, or the visitor navigated here
    // client-side (the URL differs from the one the document first loaded with).
    const firstLoad = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const navigatedInApp = Boolean(firstLoad && firstLoad.name !== window.location.href);
    const referredBySite = Boolean(document.referrer) && new URL(document.referrer).origin === window.location.origin;
    if ((navigatedInApp || referredBySite) && window.history.length > 1) router.back();
    else router.push(fallbackHref);
  };
  return (
    <Button variant="secondary" icon="arrow_back" onClick={goBack}>
      {label}
    </Button>
  );
}
