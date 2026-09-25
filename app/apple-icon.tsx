import { ImageResponse } from "next/og";
import { BRAND_MARK_PATH, BRAND_MARK_VIEWBOX } from "@/components/site/BrandMark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#222222",
        }}
      >
        <svg viewBox={BRAND_MARK_VIEWBOX} width={104} height={134}>
          <path fill="#e4734c" d={BRAND_MARK_PATH} />
        </svg>
      </div>
    ),
    size,
  );
}
