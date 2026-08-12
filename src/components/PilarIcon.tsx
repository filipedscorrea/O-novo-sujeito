import type { CSSProperties, ReactElement } from 'react'

type PilarState = 'a' | 'b'

type PilarIconProps = {
  state: PilarState
}

/**
 * Shapes below are traced from the real exported pilar-*-a/b.svg pair for
 * each category (public/assets/pilar-*.svg) — state 'a' geometry is used as
 * the base path, and state 'b' is reproduced exactly by the CSS transform
 * documented in handoff-consolidado.md Parte 2, seção 5.3, confirmed by
 * comparing the two exported SVGs coordinate-for-coordinate. None of the six
 * pilares actually change fill color between states in the real assets
 * (Parte 1's "bordô → vermelho" description for cultura/autonomia doesn't
 * match what was exported/implemented) — only shape/position changes.
 */

const SHAPE_TRANSITION = 'transform 900ms ease-in-out'

export function HistoriaIcon({ state }: PilarIconProps) {
  return (
    <svg viewBox="0 0 70 70" width="70" height="70" aria-hidden="true">
      <path
        d="M70 35C70 44.2826 66.3125 53.185 59.7487 59.7487C53.185 66.3125 44.2826 70 35 70C25.7174 70 16.815 66.3125 10.2513 59.7487C3.68749 53.185 1.40163e-06 44.2826 0 35L35 35H70Z"
        fill="var(--color-vermelho-impulso)"
        style={{
          transformOrigin: '35px 35px',
          transform: state === 'b' ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: SHAPE_TRANSITION,
        }}
      />
    </svg>
  )
}

export function CulturaIcon({ state }: PilarIconProps) {
  return (
    <svg viewBox="0 0 70 70" width="70" height="70" aria-hidden="true">
      <path
        d="M64.4453 52H5.55469L35 0.999023L64.4453 52Z"
        fill="var(--color-bordo-estrutura)"
        stroke="var(--color-bordo-estrutura)"
        style={{
          transformOrigin: '35px 35px',
          transform: state === 'b' ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: SHAPE_TRANSITION,
        }}
      />
    </svg>
  )
}

export function ColetivoIcon({ state }: PilarIconProps) {
  return (
    <svg viewBox="0 0 70 70" width="70" height="70" aria-hidden="true">
      <circle
        cx="24"
        cy="24"
        r="24"
        fill="var(--color-vermelho-impulso)"
        style={{
          transition: SHAPE_TRANSITION,
          transform: state === 'b' ? 'translate(22px, 22px)' : 'translate(0, 0)',
        }}
      />
      <circle
        cx="46"
        cy="46"
        r="23.5"
        fill="none"
        stroke="var(--color-bordo-estrutura)"
        style={{
          transition: SHAPE_TRANSITION,
          transform: state === 'b' ? 'translate(-22px, -22px)' : 'translate(0, 0)',
        }}
      />
    </svg>
  )
}

export function MediacaoIcon({ state }: PilarIconProps) {
  return (
    <svg viewBox="0 0 70 70" width="70" height="70" aria-hidden="true">
      <path d="M6.5 35H65" stroke="var(--color-bordo-estrutura)" strokeWidth="2" />
      <path
        d="M15.4082 15.9081L53.592 54.0918"
        stroke="var(--color-vermelho-impulso)"
        strokeWidth="4"
        style={{
          transformOrigin: '35px 35px',
          transform: state === 'b' ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: SHAPE_TRANSITION,
        }}
      />
    </svg>
  )
}

export function AutonomiaIcon({ state }: PilarIconProps) {
  return (
    <svg viewBox="0 0 70 70" width="70" height="70" aria-hidden="true">
      <path
        d="M35.5 0.5L63.6458 17.5V51.5L35.5 68.5L7.35417 51.5V17.5L35.5 0.5Z"
        fill="var(--color-bordo-estrutura)"
        style={{
          transformOrigin: '35px 35px',
          transform: state === 'b' ? 'rotate(30deg)' : 'rotate(0deg)',
          transition: SHAPE_TRANSITION,
        }}
      />
    </svg>
  )
}

export function ConscienciaIcon({ state }: PilarIconProps) {
  return (
    <svg viewBox="0 0 70 70" width="70" height="70" aria-hidden="true">
      <rect
        x="1"
        y="0.5"
        width="68"
        height="68"
        fill="var(--color-vermelho-impulso)"
        style={
          {
            transformOrigin: '35px 34.5px',
            transform: state === 'b' ? 'scale(1)' : 'scale(0.3824)',
            rx: state === 'b' ? '34px' : '0px',
            transition: 'transform 900ms ease-in-out, rx 900ms ease-in-out',
          } as CSSProperties
        }
      />
    </svg>
  )
}

export const PILAR_ICONS: Record<string, (props: PilarIconProps) => ReactElement> = {
  historia: HistoriaIcon,
  cultura: CulturaIcon,
  coletivo: ColetivoIcon,
  mediacao: MediacaoIcon,
  autonomia: AutonomiaIcon,
  consciencia: ConscienciaIcon,
}
