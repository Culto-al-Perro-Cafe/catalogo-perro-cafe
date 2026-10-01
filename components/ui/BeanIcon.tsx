import styles from "./BeanIcon.module.css";

/**
 * Coffee bean used as the list bullet across the site (design: Sobre nosotros checklist).
 * Blog Markdown lists draw the same bean in CSS (components/blog/ArticleBody.module.css).
 */
export function BeanIcon({ className }: { className?: string }) {
  return (
    <svg className={className ? `${styles.bean} ${className}` : styles.bean} viewBox="0 0 14 18" aria-hidden="true">
      <ellipse cx="7" cy="9" rx="6" ry="8" fill="var(--color-the-orange)" stroke="var(--color-the-black)" strokeWidth="1.6" />
      <path
        d="M7.6 1.6 C 4.6 5.4, 9.4 12.6, 6.4 16.4"
        fill="none"
        stroke="var(--color-the-black)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
