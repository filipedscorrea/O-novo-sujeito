import { useScrollReveal } from '../hooks/useScrollReveal'
import './Redes.css'

const SOCIAL_ICONS = [
  {
    name: 'instagram',
    href: 'https://www.instagram.com/psi.lourencoserpa?igsh=NGFlbXNtbmZpemo3',
  },
  {
    name: 'tiktok',
    href: 'https://www.tiktok.com/@psi.lourencoserpa?lang=en-GB&is_from_webapp=1&sender_device=mobile&sender_web_id=7670237734015157781',
  },
  {
    name: 'youtube',
    href: 'https://youtube.com/@psilourencoserpa?si=zS7m_tY12jTO_tG3',
  },
]

const INSTAGRAM_PROFILE = 'https://www.instagram.com/psi.lourencoserpa'

export default function Redes() {
  // redes-icon-area is deliberately excluded from the Intersection Observer
  // (handoff Parte 2, 9.2), always visible, no reveal wrapper.
  const [carrosselRef, carrosselReveal] = useScrollReveal('redes-carrossel', 'right', 200)

  return (
    <section className="redes-section" id="redes">
      <div className="redes-title-area">
        <span className="redes-title-area__text">ME SIGA</span>
      </div>

      <div className="redes-icon-area">
        {SOCIAL_ICONS.map((icon) => (
          <a
            key={icon.name}
            className="redes-icon-area__link"
            href={icon.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={icon.name}
          >
            <img
              className="redes-icon-area__img"
              src={`/assets/icon-${icon.name}.svg`}
              alt=""
              aria-hidden="true"
            />
          </a>
        ))}
      </div>

      <div ref={carrosselRef} {...carrosselReveal} className={`redes-carrossel ${carrosselReveal.className}`}>
        {[1, 2, 3].map((n) => (
          <a
            key={n}
            className="redes-carrossel__post"
            href={INSTAGRAM_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="redes-carrossel__img"
              src={`/assets/post-${n}.png`}
              alt={`Publicação ${n} do Instagram de Lourenço Serpa`}
            />
          </a>
        ))}
      </div>
    </section>
  )
}
