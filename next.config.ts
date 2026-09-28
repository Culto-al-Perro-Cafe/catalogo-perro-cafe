import type { NextConfig } from "next";
import { analyticsConfig } from "./config/analytics";
import { legacyRedirects } from "./config/redirects";

const { upstream, upstreamAssets, apiHost } = analyticsConfig.posthog;

const nextConfig: NextConfig = {
  // Self-contained server in .next/standalone for the Docker image (CapRover).
  output: "standalone",

  // Old Shopify URLs (www.perro.cafe) → their pages on this site. See config/redirects.ts.
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },

  // PostHog reverse proxy: the browser talks to /ingest on our own domain, so ad
  // blockers don't drop analytics. Static assets (recorder, toolbar) come from the CDN.
  async rewrites() {
    return [
      { source: `${apiHost}/static/:path*`, destination: `${upstreamAssets}/static/:path*` },
      { source: `${apiHost}/array/:path*`, destination: `${upstreamAssets}/array/:path*` },
      { source: `${apiHost}/:path*`, destination: `${upstream}/:path*` },
    ];
  },
  // PostHog API paths end in a trailing slash; don't redirect them.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
