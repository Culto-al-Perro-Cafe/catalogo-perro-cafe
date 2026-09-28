/**
 * Material Symbols (Outlined) glyphs inlined as SVG so we don't ship the
 * whole icon font. Add a path here to support a new icon name.
 */
const PATHS = {
  arrow_forward: "M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z",
  arrow_outward: "m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z",
  arrow_back: "m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z",
  send: "M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z",
  expand_more: "M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z",
  progress_activity:
    "M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z",
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({
  name,
  size = 20,
  spin = false,
}: {
  name: IconName;
  size?: number;
  spin?: boolean;
}) {
  return (
    <svg
      className="cp-icon"
      data-spin={spin || undefined}
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
