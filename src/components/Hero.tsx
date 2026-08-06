import { useLoadReveal } from '../hooks/useScrollReveal'
import Kicker from './Kicker'
import SecondaryLink from './SecondaryLink'
import PrimaryButton from './PrimaryButton'
import './Hero.css'

export default function Hero() {
  const lockupReveal = useLoadReveal('right', 0)
  const headlineReveal = useLoadReveal('up', 200)
  const bodyReveal = useLoadReveal('up', 400)
  const linkReveal = useLoadReveal('up', 600)
  const ctaReveal = useLoadReveal('up', 800)

  return (
    <section className="hero-section" id="hero">
      <img
        {...lockupReveal}
        className={`hero-lockup ${lockupReveal.className}`}
        src="/assets/hero-lockup.png"
        alt="Lourenço Serpa, psicólogo, especialista em Psicologia Histórico-Cultural"
        width={440}
        height={288}
      />

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
        <PrimaryButton text="Vamos conversar" variant="red" />
      </div>
    </section>
  )
}
