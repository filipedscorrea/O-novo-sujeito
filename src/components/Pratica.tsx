import { useEffect, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Kicker from './Kicker'
import './Pratica.css'

type PraticaVariant = 'default' | 'quem' | 'como' | 'sobre-o-que'

const MONTAGE_BODY: Record<Exclude<PraticaVariant, 'default'>, { alt: string; text: React.ReactNode }> = {
  quem: {
    alt: 'Quem',
    text: (
      <>
        Atendo <strong>adolescentes e adultos</strong>. Não faço atendimento infantil. Tenho
        vagas reservadas para atendimentos sociais.
      </>
    ),
  },
  como: {
    alt: 'Como',
    text: (
      <>
        Sessões <strong>presenciais ou online</strong>. O formato se combina com você, conforme o
        que funciona na sua rotina.
      </>
    ),
  },
  'sobre-o-que': {
    alt: 'Sobre o quê',
    text: (
      <>
        Tenho mais prática em alguns temas do que em outros. Não me chamo de especialista em
        nenhum deles, mas tenho experiência real com:{' '}
        <strong>
          Trabalho e falta de sentido, problemas familiares, ansiedade, transidentidade,
          sexualidade, transtornos do espectro autista
        </strong>
      </>
    ),
  },
}

const LABELS: { variant: Exclude<PraticaVariant, 'default'>; text: string }[] = [
  { variant: 'quem', text: 'Quem' },
  { variant: 'como', text: 'Como' },
  { variant: 'sobre-o-que', text: 'Sobre o quê' },
]

export default function Pratica() {
  const [variant, setVariant] = useState<PraticaVariant>('default')
  const [headlineRef, headlineReveal] = useScrollReveal('pratica-headline', 'up', 0)
  const [montageRef, montageReveal] = useScrollReveal('pratica-montage', 'right', 200)

  useEffect(() => {
    const variants: PraticaVariant[] = ['default', 'quem', 'como', 'sobre-o-que']
    for (const v of variants) {
      const img = new Image()
      img.src = `/assets/lourenco-montage-${v}.png`
    }
  }, [])

  return (
    <section className="pratica-section" id="pratica">
      <Kicker text="A prática" />

      <div className="pratica-content">
        <div ref={headlineRef} {...headlineReveal} className={`pratica-headline ${headlineReveal.className}`}>
          <p className="pratica-headline__text">
            Sou o <em>psicólogo</em> <em>certo</em> para você?
          </p>
        </div>

        <div ref={montageRef} {...montageReveal} className={`pratica-montage ${montageReveal.className}`}>
          {/* Declarative binding: src recalculated from state on every render.
              This is the recommended fix (handoff Parte 2, 7.4) for the flash
              seen during the original prototype's imperative img.src swap. */}
          <img
            className="pratica-montage__img"
            src={`/assets/lourenco-montage-${variant}.png`}
            alt="Lourenço Serpa"
          />

          {LABELS.map((label) => (
            <button
              key={label.variant}
              type="button"
              className={`montage-label montage-label--${label.variant}`}
              onClick={() => setVariant(label.variant)}
            >
              <span className="montage-label__title">{label.text}</span>
            </button>
          ))}

          {variant !== 'default' && (
            <div className={`montage-body-box montage-body-box--${variant}`}>
              <p className="montage-body-box__text">{MONTAGE_BODY[variant].text}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
