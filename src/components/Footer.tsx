import { useScrollReveal } from '../hooks/useScrollReveal'
import './Footer.css'

export default function Footer() {
  const [brandRef, brandReveal] = useScrollReveal('footer-brand', 'left', 0)

  return (
    <footer className="footer">
      <div ref={brandRef} {...brandReveal} className={`footer-brand ${brandReveal.className}`}>
        <img className="footer-brand__logo" src="/assets/brand-logo.png" alt="Lourenço Serpa" />
        <span className="footer-brand__tagline">PSICOLOGIA HISTÓRICO-CULTURAL</span>
      </div>

      {/* footer-info is deliberately excluded from the Intersection Observer
          (handoff Parte 2, 10.3), always visible, no reveal wrapper. */}
      <div className="footer-info">
        <div className="footer-contato">
          <span className="footer-contato__label">CONTATO</span>
          <div className="footer-contato__links">
            <a className="footer-contato__link" href="mailto:lourencoserpa@gmail.com">
              lourencoserpa@gmail.com
            </a>
            <a
              className="footer-contato__link"
              href="https://www.instagram.com/psi.lourencoserpa"
              target="_blank"
              rel="noopener noreferrer"
            >
              @psi.lourencoserpa
            </a>
          </div>
        </div>

        <div className="footer-legal">
          {/* No destination page exists yet for this v1 (handoff sec. 12.3):
              href stays empty, click suppressed so it doesn't reload the page. */}
          <a className="footer-legal__link" href="" onClick={(e) => e.preventDefault()}>
            TERMOS E CONDIÇÕES
          </a>
          <a className="footer-legal__link" href="" onClick={(e) => e.preventDefault()}>
            POLÍTICA DE PRIVACIDADE
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-bottom__text">
          CRP 07/43508 · © 2026 Lourenço Serpa · Todos os direitos reservados
        </p>
      </div>
    </footer>
  )
}
