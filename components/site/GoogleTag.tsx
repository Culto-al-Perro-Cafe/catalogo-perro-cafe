import Script from "next/script";
import { analyticsConfig } from "@/config/analytics";

/**
 * Google tag (gtag.js) for Google Analytics 4. Production only, like PostHog, so local
 * development doesn't pollute the reports. GA4's enhanced measurement records the
 * client-side navigations (browser history changes) as page views.
 *
 * Both measurement IDs are configured in the same tag so custom events reach the current
 * and legacy properties.
 */
export function GoogleTag() {
  if (process.env.NODE_ENV !== "production") return null;
  const { ids } = analyticsConfig.googleTag;
  const primary = ids[0];
  const configs = ids.map((id) => `gtag('config', '${id}');`).join("\n");
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${primary}`} strategy="afterInteractive" />
      <Script id="google-tag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${configs}`}
      </Script>
    </>
  );
}
