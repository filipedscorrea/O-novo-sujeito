import { useCallback, useEffect, useRef, useState } from 'react'
import PrimaryButton from './PrimaryButton'
import { useMediaQuery } from '../hooks/useMediaQuery'
import './Nav.css'

const NAV_LINKS = [
  { id: 'sobre', label: 'A história' },
  { id: 'abordagem', label: 'A abordagem' },
  { id: 'contato', label: 'Contato' },
]

const DESKTOP_QUERY = '(min-width: 1024px)'

export default function Nav() {
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
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
    // No open/closed state exists at the desktop breakpoint (links + CTA
    // render inline, always visible) — scroll-lock/door logic is fully
    // bypassed there, not just visually hidden.
    if (isDesktop) return
    if (isOpen) {
      lockScroll()
    } else {
      unlockScroll()
    }
    return () => {
      unlockScroll()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isDesktop])

  // If the mobile menu was left open and the viewport grows past the
  // desktop breakpoint (e.g. rotating a tablet, resizing a window), force
  // it closed instead of leaving a stale scroll-locked state with no
  // hamburger left to close it.
  useEffect(() => {
    if (isDesktop && isOpen) {
      setIsOpen(false)
    }
  }, [isDesktop, isOpen])

  const handleToggle = () => setIsOpen((open) => !open)

  const handleNavigate = (sectionId: string) => {
    setIsOpen(false)
    window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  if (isDesktop) {
    return (
      <header className="nav-bar">
        <img className="nav-brand" src="/assets/nav-brand.png" alt="Lourenço Serpa" />
        <ul className="nav-links-list-desktop">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                className="nav-link"
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigate(link.id)
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <PrimaryButton
          text="VAMOS CONVERSAR"
          variant="gold"
          className="nav-cta-desktop-button"
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
                  <a
                    className="nav-link"
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigate(link.id)
                    }}
                  >
                    {link.label}
                  </a>
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
