import posthog from "posthog-js";
import { analyticsConfig } from "@/config/analytics";

// Runs in the browser before the app becomes interactive (Next.js instrumentation-client).
const { token, apiHost, uiHost } = analyticsConfig.posthog;

if (process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_POSTHOG_DEV === "1") {
  try {
    posthog.init(token, {
      api_host: apiHost,
      ui_host: uiHost,
      // Latest defaults: page views on client-side navigation (history changes), etc.
      defaults: "2026-08-30",
      // Anonymous analytics only: we never identify visitors, so never create person profiles.
      person_profiles: "identified_only",
      // Session recordings on; everything typed into inputs is masked.
      disable_session_recording: false,
      session_recording: { maskAllInputs: true },
    });
  } catch {
    // Analytics must never break the page.
  }

  // Declarative click tracking: any element with data-ph-event (see trackAttrs in
  // lib/analytics.ts) reports that event plus its data-ph-* attributes as properties.
  document.addEventListener(
    "click",
    (e) => {
      const el = (e.target as Element | null)?.closest?.("[data-ph-event]");
      if (!el) return;
      const props: Record<string, string> = {};
      for (const { name, value } of Array.from(el.attributes)) {
        if (name.startsWith("data-ph-") && name !== "data-ph-event") {
          props[name.slice("data-ph-".length).replace(/-/g, "_")] = value;
        }
      }
      const href = el.getAttribute("href");
      if (href) props.href = href;
      posthog.capture(el.getAttribute("data-ph-event")!, props);
    },
    { capture: true },
  );
}
