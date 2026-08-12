import { useEffect, useState } from 'react'
import { useLoadReveal } from '../hooks/useScrollReveal'
import Kicker from './Kicker'
import SecondaryLink from './SecondaryLink'
import PrimaryButton from './PrimaryButton'
import './Hero.css'

const DESKTOP_LOCKUP_QUERY = '(min-width: 1024px)'

// hero-lockup(-frame) is the only element whose entrance direction flips at
// this breakpoint (right below 1024px, left at/above it) — everything else
// in the hero, and every other section's reveal, stays as-is.
function useIsDesktopLockup() {
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_LOCKUP_QUERY).matches)

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_LOCKUP_QUERY)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return isDesktop
}

export default function Hero() {
  const isDesktopLockup = useIsDesktopLockup()
  const lockupReveal = useLoadReveal(isDesktopLockup ? 'left' : 'right', 0)
  const headlineReveal = useLoadReveal('up', 200)
  const bodyReveal = useLoadReveal('up', 400)
  const linkReveal = useLoadReveal('up', 600)
  const ctaReveal = useLoadReveal('up', 800)

  return (
    <section className="hero-section" id="hero">
      {/* Desktop (>=1024px) swaps to a purpose-recomposed asset rather than
          resizing the mobile lockup (handoff: proportion is close but not
          identical, and the desktop frame uses object-fit: contain). */}
      <picture className="hero-lockup-frame">
        <source media="(min-width: 1024px)" srcSet="/assets/hero-lockup-982x928.png" />
        <img
          {...lockupReveal}
          className={`hero-lockup ${lockupReveal.className}`}
          src="/assets/hero-lockup.png"
          alt="Lourenço Serpa, psicólogo, especialista em Psicologia Histórico-Cultural"
          width={440}
          height={288}
        />
      </picture>

      {/* Grouping wrapper only matters >=1024px, where kicker+content+cta
          stack in a column beside the lockup frame. Below that it's
          display:contents (Hero.css) so these three stay flat siblings of
          hero-section, exactly matching the original mobile markup. */}
      <div className="hero-kicker-content">
        <Kicker text="Psicologia Histórico-Cultural" />

        <div className="hero-content">
          <div {...headlineReveal} className={`hero-headline ${headlineReveal.className}`}>
            <p className="hero-headline__text">
              Sua <em>história</em> não começou com <em>você.</em>
            </p>
          </div>

          <div {...bodyReveal} className={`hero-body ${bodyReveal.className}`}>
            <p className="hero-body__text">
              Suas condições de vida, trabalho e história moldaram quem você é hoje. Aqui, a
              terapia parte disso, não do discurso de que basta força de vontade.
            </p>
          </div>

          <div {...linkReveal} className={linkReveal.className}>
            <SecondaryLink text="Como funciona a terapia" />
          </div>
        </div>

        <div {...ctaReveal} className={`hero-cta-primary-area ${ctaReveal.className}`}>
          <PrimaryButton
            text="Vamos conversar"
            variant="red"
            onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          />
        </div>
      </div>
    </section>
  )
}
