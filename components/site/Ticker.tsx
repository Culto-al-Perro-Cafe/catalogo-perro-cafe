import styles from "./Ticker.module.css";

function Star() {
  return (
    <svg className={styles.star} viewBox="0 0 9.54 9.54" aria-hidden="true">
      <path
        fill="currentColor"
        d="M.5,4.27c2.08,0,3.77-1.69,3.77-3.77,0-.28.22-.5.5-.5s.5.22.5.5c0,2.08,1.69,3.77,3.77,3.77.28,0,.5.22.5.5s-.22.5-.5.5c-2.08,0-3.77,1.69-3.77,3.77,0,.28-.22.5-.5.5s-.5-.22-.5-.5c0-2.08-1.69-3.77-3.77-3.77-.28,0-.5-.22-.5-.5s.22-.5.5-.5Z"
      />
    </svg>
  );
}

/**
 * Looping announcement band. Pure CSS — no client JS.
 * "banner": small caps strip at the top of every page. "band": big headline band (e.g. /nosotros).
 */
export function Ticker({ items, variant = "banner" }: { items: readonly string[]; variant?: "banner" | "band" }) {
  // Two identical runs, each containing the list twice, so the -50% loop is seamless.
  const run = [...items, ...items];
  return (
    <div className={styles.ticker} data-variant={variant} role="marquee" aria-label={items.join(" · ")}>
      <div className={styles.track}>
        {[0, 1].map((copy) => (
          <div key={copy} className={styles.run} aria-hidden="true">
            {run.map((item, i) => (
              <span key={i} className={styles.item}>
                <span className={styles.text}>{item}</span>
                <Star />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
