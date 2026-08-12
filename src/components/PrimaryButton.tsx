import { useState } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import './PrimaryButton.css'

type PrimaryButtonProps = {
  text: string
  variant?: 'red' | 'gold'
} & ButtonHTMLAttributes<HTMLButtonElement>

/**
 * button-label with press state (handoff Parte 2, 12.3): the drop shadow
 * collapses to zero exactly as the button translates by the same offset,
 * so it reads as the button sinking into its own shadow.
 *
 * Kept as its own DOM node, separate from any entrance-animation wrapper —
 * an `animation` with fill-mode:both on the same node that also receives an
 * inline `transform` from press-state would freeze the transform after the
 * entrance finishes and block the press interaction.
 */
export default function PrimaryButton({
  text,
  variant = 'red',
  className,
  ...buttonProps
}: PrimaryButtonProps) {
  const [pressed, setPressed] = useState(false)

  return (
    <button
      type="button"
      {...buttonProps}
      className={`primary-button primary-button--${variant}${pressed ? ' is-pressed' : ''}${className ? ` ${className}` : ''}`}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
    >
      {text}
    </button>
  )
}
