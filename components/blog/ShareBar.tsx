"use client";

import { useState } from "react";
import { blogSection } from "@/config/blogs";
import styles from "./ShareBar.module.css";
import { track } from "@/lib/analytics";
import { analyticsEvents } from "@/config/analytics";

/* Monochrome icons (currentColor). */
const icons = {
  facebook: (
    <path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.2C16.7 2.1 15.6 2 14.4 2 11.8 2 10 3.6 10 6.5v2H7.2V12H10v10h4V12h2.9l.5-3.5H14z" fill="currentColor" />
  ),
  x: (
    <path
      d="M17.8 3h3l-6.6 7.6L22 21h-6.1l-4.8-6.3L5.6 21h-3l7.1-8.1L2.3 3h6.2l4.3 5.7L17.8 3zm-1 16.2h1.7L7.4 4.7H5.6l11.2 14.5z"
      fill="currentColor"
    />
  ),
  email: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" />
      <path d="m3 6 9 7 9-7" />
    </g>
  ),
  link: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1" />
      <path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" />
    </g>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" />,
};

function Icon({ name }: { name: keyof typeof icons }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      {icons[name]}
    </svg>
  );
}

/**
 * Share quick actions for a blog post: Facebook, X, email and copy link.
 * `tagged` holds the article URL with per-network UTMs (built on the server, see
 * config/utm.ts); the copy button uses the clean `url`.
 */
export function ShareBar({
  url,
  title,
  tagged,
  article,
}: {
  url: string;
  title: string;
  tagged: { facebook: string; x: string; email: string };
  /** Article slug, for analytics. */
  article: string;
}) {
  const shared = (network: string) => track(analyticsEvents.articleShared, { network, article });
  const [copied, setCopied] = useState(false);
  const t = blogSection.share;
  const enc = encodeURIComponent;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Older browsers / insecure contexts: fall back to a hidden textarea.
      const el = document.createElement("textarea");
      el.value = url;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      el.remove();
    }
    setCopied(true);
    shared("copy_link");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.bar} role="group" aria-label={t.label}>
      <a
        className={styles.action}
        href={`https://www.facebook.com/sharer/sharer.php?u=${enc(tagged.facebook)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.facebook}
        onClick={() => shared("facebook")}
        title={t.facebook}
      >
        <Icon name="facebook" />
      </a>
      <a
        className={styles.action}
        href={`https://x.com/intent/post?url=${enc(tagged.x)}&text=${enc(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.x}
        onClick={() => shared("x")}
        title={t.x}
      >
        <Icon name="x" />
      </a>
      <a
        className={styles.action}
        href={`mailto:?subject=${enc(title)}&body=${enc(`${title}\n\n${tagged.email}`)}`}
        aria-label={t.email}
        onClick={() => shared("email")}
        title={t.email}
      >
        <Icon name="email" />
      </a>
      <button
        type="button"
        className={styles.action}
        onClick={copy}
        aria-label={copied ? t.copied : t.copy}
        title={copied ? t.copied : t.copy}
        data-copied={copied || undefined}
      >
        <Icon name={copied ? "check" : "link"} />
      </button>
      <span className={styles.status} role="status" aria-live="polite">
        {copied ? t.copied : ""}
      </span>
    </div>
  );
}
