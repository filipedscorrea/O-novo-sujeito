import { useCallback, useEffect, useRef, useState } from 'react'
import PrimaryButton from './PrimaryButton'
import './Nav.css'

const NAV_LINKS = [
  { id: 'sobre', label: 'A história' },
  { id: 'abordagem', label: 'A abordagem' },
  { id: 'contato', label: 'Contato' },
]

export default function Nav() {
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
    if (isOpen) {
      lockScroll()
    } else {
      unlockScroll()
    }
    return () => {
      unlockScroll()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const handleToggle = () => setIsOpen((open) => !open)

  const handleNavigate = (sectionId: string) => {
    setIsOpen(false)
    window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
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
