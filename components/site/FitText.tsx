"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

/**
 * Scales a single line of text so it spans its container's full width.
 * Server HTML uses the CSS clamp() fallback from the parent's class,
 * then this refines it once fonts are loaded and on every resize.
 */
export function FitText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const box = el?.parentElement;
    if (!el || !box) return;

    const fit = () => {
      const cs = getComputedStyle(box);
      const available =
        box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      el.style.fontSize = "100px";
      const width = el.getBoundingClientRect().width;
      if (width > 0) el.style.fontSize = `${Math.floor((100 * available * 100) / width) / 100}px`;
    };

    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}
