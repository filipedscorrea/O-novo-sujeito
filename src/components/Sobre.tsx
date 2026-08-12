import { useScrollReveal } from '../hooks/useScrollReveal'
import SecondaryLink from './SecondaryLink'
import './Sobre.css'

export default function Sobre() {
  const [lockupRef, lockupReveal] = useScrollReveal('sobre-lockup', 'left', 0)
  const [headlineRef, headlineReveal] = useScrollReveal('sobre-headline', 'up', 200)
  const [bodyRef, bodyReveal] = useScrollReveal('sobre-body', 'up', 400)
  const [linkRef, linkReveal] = useScrollReveal('sobre-link', 'up', 600)

  return (
    <section className="sobre-section" id="sobre">
      <img
        ref={lockupRef}
        {...lockupReveal}
        className={`sobre-lockup ${lockupReveal.className}`}
        src="/assets/sobre-lockup.png"
        alt="Lourenço Serpa em seu consultório, cercado por ilustrações que remetem à sua trajetória"
        width={440}
        height={332}
      />

      <div className="sobre-content">
        <div ref={headlineRef} {...headlineReveal} className={`sobre-headline ${headlineReveal.className}`}>
          <p className="sobre-headline__text">
            Minha <em>trajetória</em> também tem uma história por trás.
          </p>
        </div>

        <div ref={bodyRef} {...bodyReveal} className={`sobre-body ${bodyReveal.className}`}>
          <p className="sobre-body__text">
            Antes de ouvir a história dos outros, precisei entender a minha. Um pouco de como
            cheguei até aqui, o que me formou e por que escolhi esse caminho.
          </p>
        </div>

        <div ref={linkRef} {...linkReveal} className={`sobre-link ${linkReveal.className}`}>
          <SecondaryLink text="Um pouco mais sobre mim" />
        </div>
      </div>
    </section>
  )
}
