import { ChevronIcon } from './icons'

type FaqItemProps = {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

/**
 * Single accordion entry. Radio behaviour (only one open at a time) is owned
 * by the parent Abordagem component, which passes down isOpen/onToggle.
 * FAQ_DURATION_MS = 750ms drives max-height, opacity, chevron and underline
 * transitions from one place (Abordagem.css) so they never fall out of sync.
 */
export default function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
  return (
    <div className={`faq-item${isOpen ? ' is-open' : ''}`}>
      <button
        type="button"
        className="faq-item__header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="faq-item__title-wrap">
          <span className="faq-item__title">{question}</span>
          <span className="faq-item__underline" aria-hidden="true" />
        </span>
        <ChevronIcon className="faq-item__chevron" />
      </button>
      <div className="faq-item__content">
        <p className="faq-item__answer">{answer}</p>
      </div>
      <div className="faq-item__separator" />
    </div>
  )
}
