import Script from "next/script";
import { analyticsConfig } from "@/config/analytics";

/**
 * Google tag (gtag.js) for Google Analytics 4. Production only, like PostHog, so local
 * development doesn't pollute the reports. GA4's enhanced measurement records the
 * client-side navigations (browser history changes) as page views.
 */
export function GoogleTag() {
  if (process.env.NODE_ENV !== "production") return null;
  const { id } = analyticsConfig.googleTag;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="google-tag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
