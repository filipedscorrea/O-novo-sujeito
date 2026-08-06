import { useEffect, useState } from 'react'
import { WhatsAppIcon } from './icons'
import './WhatsAppButton.css'

const WHATSAPP_HREF =
  'https://wa.me/5551995612121?text=Ol%C3%A1%2C%20Louren%C3%A7o.%20Vim%20do%20seu%20site%20e%20queria%20conversar'

/**
 * Reveals once past scrollY 200 and stays visible from then on, even if the
 * user scrolls back to the top (handoff Parte 2, 11.2) — a one-shot reveal,
 * not a continuous show/hide toggle.
 */
export default function WhatsAppButton() {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (revealed) return
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setRevealed(true)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [revealed])

  return (
    <div className={`whatsapp-button-wrapper${revealed ? ' is-visible' : ''}`}>
      <a
        className="whatsapp-button"
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar no WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </div>
  )
}
