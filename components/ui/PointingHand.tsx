import Image from "next/image";

/** Decorative cartoon hand (public/brand/hand-pointing.svg) that points right at a CTA. */
export function PointingHand({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/hand-pointing.svg"
      alt=""
      aria-hidden="true"
      width={811}
      height={508}
      unoptimized
      className={className}
    />
  );
}
