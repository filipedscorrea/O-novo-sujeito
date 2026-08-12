import { useEffect, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Kicker from './Kicker'
import SecondaryLink from './SecondaryLink'
import FaqItem from './FaqItem'
import { PILAR_ICONS } from './PilarIcon'
import './Abordagem.css'

type PilarState = 'a' | 'b'

const PILARES: { id: string; label: string }[] = [
  { id: 'historia', label: 'História' },
  { id: 'cultura', label: 'Cultura' },
  { id: 'coletivo', label: 'Coletivo' },
  { id: 'mediacao', label: 'Mediação' },
  { id: 'autonomia', label: 'Autonomia' },
  { id: 'consciencia', label: 'Consciência' },
]

const FAQS = [
  {
    id: 'faq-fala-escuta',
    question: 'A terapia fala, ou só escuta?',
    answer:
      'Existe uma ideia de que psicólogo só escuta e fica quieto. Aqui não é assim. Eu escuto com atenção o que você traz, mas também pergunto, aponto o que percebo e proponho reflexões. É diálogo ativo, não silêncio.',
  },
  {
    id: 'faq-diagnostico',
    question: 'Vou receber um diagnóstico?',
    answer:
      'Nem todo processo passa por um diagnóstico. Meu olhar é crítico com rótulos rápidos. Seus desafios podem ser entendidos sem precisar de um nome clínico. Isso não significa negar o sofrimento, significa não te reduzir a um sintoma.',
  },
  {
    id: 'faq-duracao',
    question: 'Quanto tempo dura o processo?',
    answer:
      'Cada processo é único porque cada história é diferente. Pode durar meses ou anos, depende do que a gente for construindo junto. O que acompanho com frequência é se os objetivos estão sendo alcançados, não um prazo fechado desde o início.',
  },
  {
    id: 'faq-objetivo',
    question: 'Qual é o objetivo da terapia?',
    answer:
      'Muita gente vive no piloto automático, sem entender bem por que sofre. A terapia ajuda a sair desse lugar, trazendo mais consciência sobre sua história e mais autonomia nas suas escolhas. O foco é sempre você.',
  },
]

const DESKTOP_ABORDAGEM_QUERY = '(min-width: 1024px)'

// >=1024px regroups FAQ + secondary link under a new abordagem-faq-content
// wrapper (beside the pilares grid) instead of stacking as flat siblings —
// a real structural difference, not just a CSS reflow, so it's tracked as
// state and switches the rendered JSX tree, same pattern as Nav's
// useIsDesktopNav.
function useIsDesktopAbordagem() {
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_ABORDAGEM_QUERY).matches)

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_ABORDAGEM_QUERY)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return isDesktop
}

function PilarItem({
  id,
  label,
  direction,
  delay,
}: {
  id: string
  label: string
  direction: 'left' | 'right'
  delay: number
}) {
  const [state, setState] = useState<PilarState>('a')
  const [ref, reveal] = useScrollReveal(`pilar-${id}`, direction, delay)
  const Icon = PILAR_ICONS[id]

  return (
    <div ref={ref} {...reveal} className={`pilar ${reveal.className}`}>
      <button
        type="button"
        className="pilar-icon"
        aria-label={label}
        onClick={() => setState((s) => (s === 'a' ? 'b' : 'a'))}
      >
        <Icon state={state} />
      </button>
      <span className="pilar-label">{label}</span>
    </div>
  )
}

export default function Abordagem() {
  const isDesktop = useIsDesktopAbordagem()
  const [openFaqId, setOpenFaqId] = useState<string | null>(null)

  const pilaresGrid = (
    <div className="abordagem-pilares">
      {PILARES.map((pilar, index) => (
        <PilarItem
          key={pilar.id}
          id={pilar.id}
          label={pilar.label}
          direction={index % 2 === 0 ? 'left' : 'right'}
          delay={Math.floor(index / 2) * 200}
        />
      ))}
    </div>
  )

  const faqList = (
    <div className="abordagem-faq">
      {FAQS.map((faq) => (
        <FaqItem
          key={faq.id}
          question={faq.question}
          answer={faq.answer}
          isOpen={openFaqId === faq.id}
          onToggle={() => setOpenFaqId((current) => (current === faq.id ? null : faq.id))}
        />
      ))}
    </div>
  )

  const secondaryLink = <SecondaryLink text="Entenda um pouco mais" />

  return (
    <section className="abordagem-section" id="abordagem">
      <Kicker text="Abordagem Histórico-Cultural" />

      <div className="abordagem-content">
        {pilaresGrid}
        {isDesktop ? (
          <div className="abordagem-faq-content">
            {faqList}
            {secondaryLink}
          </div>
        ) : (
          <>
            {faqList}
            {secondaryLink}
          </>
        )}
      </div>
    </section>
  )
}
