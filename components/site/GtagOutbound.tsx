"use client";

import { useEffect } from "react";
import { gtagEvents } from "@/config/analytics";
import { gtagEvent, isWhatsAppUrl, marketplaceFromUrl } from "@/lib/analytics";

/**
 * Delegated click listener for GA4 outbound events. Safe when gtag isn't loaded.
 * Covers every wa.me / WhatsApp link and Mercado Libre / Amazon outbound click on the page
 * (buttons, footer, article Markdown, etc.) without per-link wiring.
 */
export function GtagOutbound() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const el = (event.target as Element | null)?.closest?.("a");
      if (!el) return;
      const href = el.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      // Same-origin navigations are not outbound marketplace/WhatsApp clicks.
      if (url.origin === window.location.origin) return;

      if (isWhatsAppUrl(url)) {
        gtagEvent(gtagEvents.whatsappClick, { link_url: url.href });
        return;
      }

      const marketplace = marketplaceFromUrl(url);
      if (marketplace) {
        gtagEvent(gtagEvents.marketplaceClick, { marketplace, link_url: url.href });
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
