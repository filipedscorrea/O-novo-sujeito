type IconProps = {
  className?: string
}

/** link-icon: right-pointing arrow, 24x24, used in secondary links. */
export function ArrowIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 12H20M20 12L13 5M20 12L13 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  )
}

/** icon-toggle: FAQ accordion chevron, rotation handled by the parent via CSS transform. */
export function ChevronIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 9L12 16L19 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  )
}

/** WhatsApp glyph rendered in brand Vermelho Impulso, never the official green. */
export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="16" fill="var(--color-vermelho-impulso)" />
      <path
        d="M22.72 9.24A8.9 8.9 0 0 0 16.06 6.5c-4.94 0-8.96 4-8.96 8.94 0 1.58.42 3.12 1.2 4.47L7 25.5l5.72-1.5a9 9 0 0 0 4.33 1.1h.01c4.94 0 8.96-4 8.96-8.94a8.9 8.9 0 0 0-2.6-6.32zm-6.66 13.75h-.01a7.44 7.44 0 0 1-3.79-1.04l-.27-.16-2.83.74.76-2.76-.18-.28a7.4 7.4 0 0 1-1.14-3.95c0-4.1 3.34-7.44 7.46-7.44a7.4 7.4 0 0 1 5.27 2.18 7.36 7.36 0 0 1 2.18 5.26c0 4.1-3.35 7.45-7.45 7.45zm4.08-5.58c-.22-.11-1.32-.65-1.53-.73-.2-.08-.35-.11-.5.11-.15.22-.58.73-.71.88-.13.15-.26.16-.48.05-.22-.11-.93-.34-1.77-1.09-.65-.58-1.1-1.3-1.22-1.52-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.4.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.4-.06-.11-.5-1.21-.69-1.66-.18-.43-.37-.38-.5-.38-.13-.01-.28-.01-.43-.01a.83.83 0 0 0-.6.28c-.2.22-.79.77-.79 1.87s.81 2.17.92 2.32c.11.15 1.6 2.44 3.87 3.43.54.23.96.37 1.29.48.54.17 1.03.15 1.42.09.43-.06 1.32-.54 1.51-1.06.19-.52.19-.96.13-1.06-.06-.1-.2-.15-.42-.26z"
        fill="var(--color-white)"
      />
    </svg>
  )
}
