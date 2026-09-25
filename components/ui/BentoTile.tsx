import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type Tone = "ivory" | "sand" | "white" | "ink" | "orange" | "yellow";

type BentoTileProps = {
  tone?: Tone;
  shadow?: "none" | "offset";
  href?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export function BentoTile({
  tone = "ivory",
  shadow = "none",
  href,
  className,
  style,
  children,
}: BentoTileProps) {
  const props = {
    className: className ? `cp-tile ${className}` : "cp-tile",
    "data-tone": tone,
    "data-shadow": shadow,
    style,
  };
  if (href) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  return <div {...props}>{children}</div>;
}

/** Real product photo when available, hatched placeholder otherwise. */
export function TileMedia({
  image,
  placeholder,
  sizes,
  priority,
}: {
  image?: { src: string; alt: string };
  placeholder: string;
  sizes: string;
  priority?: boolean;
}) {
  if (image) {
    return (
      <Image
        className="cp-tile__img"
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
      />
    );
  }
  return (
    <div className="cp-placeholder" aria-hidden="true">
      <span>{placeholder}</span>
    </div>
  );
}
