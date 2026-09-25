import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { BRAND_MARK_PATH, BRAND_MARK_VIEWBOX } from "@/components/site/BrandMark";

export const ogSize = { width: 1200, height: 630 };

const INK = "#222222";
const ORANGE = "#e4734c";
const IVORY = "#faefdf";

/** Shared Open Graph card in the brand's ink / orange style. */
export function renderOgImage({
  eyebrow,
  title,
  highlight,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: INK,
          color: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 40,
            padding: "18px 56px",
            background: ORANGE,
            color: IVORY,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          {siteConfig.ticker.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 28,
            padding: "0 72px",
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#f2b561",
            }}
          >
            {eyebrow}
          </span>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 88,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: -3,
              textTransform: "uppercase",
            }}
          >
            <span style={{ marginRight: 24 }}>{title}</span>
            {highlight && <span style={{ color: ORANGE }}>{highlight}</span>}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 72px 40px",
            borderTop: "2px solid rgba(255,255,255,.2)",
          }}
        >
          <span
            style={{
              fontSize: 40,
              fontWeight: 900,
              color: ORANGE,
              textTransform: "uppercase",
              letterSpacing: -1,
            }}
          >
            {siteConfig.shortName}
          </span>
          <svg viewBox={BRAND_MARK_VIEWBOX} width={62} height={80}>
            <path fill="#fff" d={BRAND_MARK_PATH} />
          </svg>
        </div>
      </div>
    ),
    ogSize,
  );
}
