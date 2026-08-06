import type { CSSProperties, ReactElement } from 'react'

type PilarState = 'a' | 'b'

type PilarIconProps = {
  state: PilarState
}

const TRANSITION = 'transform 900ms ease-in-out, fill 900ms ease-in-out'

/** Semicírculo: same red in both states, flips 180° around its own center. */
export function HistoriaIcon({ state }: PilarIconProps) {
  return (
    <svg viewBox="0 0 70 70" width="70" height="70" aria-hidden="true">
      <path
        d="M9 35 A26 26 0 0 1 61 35 Z"
        fill="var(--color-vermelho-impulso)"
        style={{
          transformOrigin: '35px 35px',
          transform: state === 'b' ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: TRANSITION,
        }}
      />
    </svg>
  )
}

/** Triângulo: bordô apontando para cima (a) → vermelho apontando para baixo (b). */
export function CulturaIcon({ state }: PilarIconProps) {
  return (
    <svg viewBox="0 0 70 70" width="70" height="70" aria-hidden="true">
      <polygon
        points="35,11 60,59 10,59"
        fill={state === 'b' ? 'var(--color-vermelho-impulso)' : 'var(--color-bordo-estrutura)'}
        style={{
          transformOrigin: '35px 35px',
          transform: state === 'b' ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: TRANSITION,
        }}
      />
    </svg>
  )
}

/** Círculos sobrepostos: preenchido e contornado cruzam de posição via translate. */
export function ColetivoIcon({ state }: PilarIconProps) {
  return (
    <svg viewBox="0 0 70 70" width="70" height="70" aria-hidden="true">
      <circle
        cx="27"
        cy="35"
        r="18"
        fill="var(--color-vermelho-impulso)"
        style={{
          transition: 'transform 900ms ease-in-out',
          transform: state === 'b' ? 'translate(22px, 22px)' : 'translate(0, 0)',
        }}
      />
      <circle
        cx="43"
        cy="35"
        r="18"
        fill="none"
        stroke="var(--color-vermelho-impulso)"
        strokeWidth="2"
        style={{
          transition: 'transform 900ms ease-in-out',
          transform: state === 'b' ? 'translate(-22px, -22px)' : 'translate(0, 0)',
        }}
      />
    </svg>
  )
}

/** Linha cortada: a diagonal roda 90°, a linha horizontal nunca se move. */
export function MediacaoIcon({ state }: PilarIconProps) {
  return (
    <svg viewBox="0 0 70 70" width="70" height="70" aria-hidden="true">
      <rect x="9" y="33.5" width="52" height="3" fill="var(--color-bordo-estrutura)" />
      <rect
        x="20"
        y="33.5"
        width="30"
        height="3"
        fill="var(--color-vermelho-impulso)"
        style={{
          transformOrigin: '35px 35px',
          transform: state === 'b' ? 'rotate(45deg)' : 'rotate(-45deg)',
          transition: 'transform 900ms ease-in-out',
        }}
      />
    </svg>
  )
}

/** Hexágono: bordô (a) → vermelho (b), único pilar com ângulo diferente de 180° (30°). */
export function AutonomiaIcon({ state }: PilarIconProps) {
  return (
    <svg viewBox="0 0 70 70" width="70" height="70" aria-hidden="true">
      <polygon
        points="35,9 57.5,22 57.5,48 35,61 12.5,48 12.5,22"
        fill={state === 'b' ? 'var(--color-vermelho-impulso)' : 'var(--color-bordo-estrutura)'}
        style={{
          transformOrigin: '35px 35px',
          transform: state === 'b' ? 'rotate(30deg)' : 'rotate(0deg)',
          transition: TRANSITION,
        }}
      />
    </svg>
  )
}

/** Quadrado pequeno vermelho → círculo grande vermelho: scale + border-radius simultâneos. */
export function ConscienciaIcon({ state }: PilarIconProps) {
  return (
    <svg viewBox="0 0 70 70" width="70" height="70" aria-hidden="true">
      <rect
        x="1"
        y="1"
        width="68"
        height="68"
        fill="var(--color-vermelho-impulso)"
        style={
          {
            transformOrigin: '35px 35px',
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
