import { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import PrimaryButton from './PrimaryButton'
import './Nav.css'

const NAV_LINKS = [
  { id: 'sobre', label: 'A história' },
  { id: 'abordagem', label: 'A abordagem' },
  { id: 'contato', label: 'Contato' },
]

const DESKTOP_NAV_QUERY = '(min-width: 1024px)'

// Same hover-underline technique as the FAQ accordion title (line-title,
// interactions handoff 6.3): a relatively-positioned label wrapping the text,
// with a sibling underline span scaling in from the left.
function NavLink({
  href,
  label,
  onClick,
}: {
  href: string
  label: string
  onClick: (e: MouseEvent) => void
}) {
  return (
    <a className="nav-link" href={href} onClick={onClick}>
      <span className="nav-link__label">
        {label}
        <span className="nav-link__underline" aria-hidden="true" />
      </span>
    </a>
  )
}

// Ranges 2 and 3 (>=1024px) render nav-links and the CTA inline in nav-bar
// and drop hamburger/overlay/scroll-lock entirely (handoff request: bypassed,
// not just visually hidden), so this tracks the breakpoint as real state
// rather than a CSS-only show/hide.
function useIsDesktopNav() {
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_NAV_QUERY).matches)

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_NAV_QUERY)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return isDesktop
}

export default function Nav() {
  const isDesktopNav = useIsDesktopNav()
  const [isOpen, setIsOpen] = useState(false)
  const savedScrollY = useRef(0)

  const lockScroll = useCallback(() => {
    savedScrollY.current = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${savedScrollY.current}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'
  }, [])

  const unlockScroll = useCallback(() => {
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.right = ''
    document.body.style.width = ''
    document.body.style.overflow = ''
    window.scrollTo(0, savedScrollY.current)
  }, [])

  useEffect(() => {
    // Desktop nav (Ranges 2/3) has no open/closed state, so scroll-lock
    // never engages there — bypassed outright rather than left dormant.
    if (isDesktopNav) {
      return
    }
    if (isOpen) {
      lockScroll()
    } else {
      unlockScroll()
    }
    return () => {
      unlockScroll()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isDesktopNav])

  // If the viewport crosses into desktop range while the mobile overlay
  // happens to be open, close it so state doesn't linger unseen.
  useEffect(() => {
    if (isDesktopNav) {
      setIsOpen(false)
    }
  }, [isDesktopNav])

  const handleToggle = () => setIsOpen((open) => !open)

  const handleNavigate = (sectionId: string) => {
    setIsOpen(false)
    window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  if (isDesktopNav) {
    return (
      <header className="nav-bar">
        <img className="nav-brand" src="/assets/nav-brand.png" alt="Lourenço Serpa" />
        <ul className="nav-links-list--desktop">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <NavLink
                href={`#${link.id}`}
                label={link.label}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigate(link.id)
                }}
              />
            </li>
          ))}
        </ul>
        <PrimaryButton
          text="VAMOS CONVERSAR"
          variant="gold"
          className="nav-cta-button--desktop"
          onClick={() => handleNavigate('contato')}
        />
      </header>
    )
  }

  return (
    <>
      <header className={`nav-bar${isOpen ? ' is-open' : ''}`}>
        <img className="nav-brand" src="/assets/nav-brand.png" alt="Lourenço Serpa" />
        <button
          type="button"
          className={`hamburger-icon${isOpen ? ' is-open' : ''}`}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
          onClick={handleToggle}
        >
          <span className="hamburger-icon__line hamburger-icon__line--top" />
          <span className="hamburger-icon__line hamburger-icon__line--middle" />
          <span className="hamburger-icon__line hamburger-icon__line--bottom" />
        </button>
      </header>

      <div className={`nav-overlay${isOpen ? ' is-open' : ''}`} aria-hidden={!isOpen}>
        <nav className="nav-links">
          <div className="nav-links-content">
            <ul className="nav-links-list">
              {NAV_LINKS.map((link, index) => (
                <li
                  key={link.id}
                  className={`nav-fade-item${isOpen ? ' is-open' : ''}`}
                  style={{ animationDelay: `${350 + index * 200}ms` }}
                >
                  <NavLink
                    href={`#${link.id}`}
                    label={link.label}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigate(link.id)
                    }}
                  />
                </li>
              ))}
            </ul>
            <div
              className={`nav-cta-area nav-fade-item${isOpen ? ' is-open' : ''}`}
              style={{ animationDelay: '950ms' }}
            >
              <PrimaryButton
                text="VAMOS CONVERSAR"
                variant="gold"
                onClick={() => handleNavigate('contato')}
              />
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
