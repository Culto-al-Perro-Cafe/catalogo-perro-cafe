import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

/** "link" is a text link (underlined small caps, no box). */
type Variant = "primary" | "secondary" | "roast" | "link";
type Size = "md" | "lg" | "xl";

type ButtonProps = Omit<ComponentProps<"button">, "children" | "className"> & {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconAfter?: IconName;
  fullWidth?: boolean;
  className?: string;
  /** Renders a Next.js <Link> instead of a <button>. */
  href?: string;
  pending?: boolean;
  pendingLabel?: string;
};

const ICON_SIZE: Record<Size, number> = { md: 16, lg: 18, xl: 24 };

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconAfter,
  fullWidth,
  className,
  href,
  pending = false,
  pendingLabel = "Procesando…",
  type = "button",
  disabled,
  ...rest
}: ButtonProps) {
  const iconSize = ICON_SIZE[size];
  const common = {
    className: className ? `cp-btn ${className}` : "cp-btn",
    "data-variant": variant,
    "data-size": size,
    "data-full-width": fullWidth || undefined,
  };

  if (href !== undefined) {
    // Links only take data-* attributes (e.g. analytics trackAttrs), not button props.
    const data = Object.fromEntries(Object.entries(rest).filter(([k]) => k.startsWith("data-")));
    return (
      <Link href={href} {...common} {...data}>
        {icon && <Icon name={icon} size={iconSize} />}
        <span className="cp-btn__label">{children}</span>
        {iconAfter && <Icon name={iconAfter} size={iconSize} />}
      </Link>
    );
  }

  const trailing = pending ? "progress_activity" : iconAfter;
  return (
    <button
      type={type}
      disabled={disabled || pending}
      aria-busy={pending || undefined}
      {...common}
      {...rest}
    >
      {icon && <Icon name={icon} size={iconSize} />}
      <span className="cp-btn__label">{pending ? pendingLabel : children}</span>
      {trailing && <Icon name={trailing} size={iconSize} spin={pending} />}
    </button>
  );
}
