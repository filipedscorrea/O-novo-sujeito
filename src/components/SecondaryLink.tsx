import { ArrowIcon } from './icons'
import './SecondaryLink.css'

type SecondaryLinkProps = {
  text: string
  /** No destination page exists yet for this v1 (handoff sec. 12) — left empty on purpose. */
  href?: string
}

export default function SecondaryLink({ text, href = '' }: SecondaryLinkProps) {
  // No destination page exists yet for this v1 (handoff sec. 12): the href
  // stays empty as specified, and the click is suppressed so it doesn't
  // reload the current page or simulate a page that doesn't exist yet.
  const isPlaceholder = href === ''

  return (
    <div className="secondary-link-area">
      <a
        className="secondary-link"
        href={href}
        onClick={isPlaceholder ? (e) => e.preventDefault() : undefined}
      >
        <span className="secondary-link__label">{text}</span>
        <ArrowIcon className="secondary-link__icon" />
      </a>
    </div>
  )
}
