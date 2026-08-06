import { useState } from 'react'
import type { FormEvent } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Kicker from './Kicker'
import PrimaryButton from './PrimaryButton'
import './Contato.css'

// Swap for your own Formspree form endpoint (see README "Formulário de contato").
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

const FORM_ID = 'contato-form'

export default function Contato() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle')

  const [bodyRef, bodyReveal] = useScrollReveal('contato-body', 'up', 0)
  const [nomeRef, nomeReveal] = useScrollReveal('field-nome', 'up', 200)
  const [motivoRef, motivoReveal] = useScrollReveal('field-motivo', 'up', 400)
  const [emailRef, emailReveal] = useScrollReveal('field-email', 'up', 600)
  const [telefoneRef, telefoneReveal] = useScrollReveal('field-telefone', 'up', 800)
  const [ctaRef, ctaReveal] = useScrollReveal('contato-cta', 'up', 1000)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(event.currentTarget),
      })
      if (response.ok) {
        setStatus('submitted')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="contato-section" id="contato">
      <Kicker text="Me manda um oi" />

      <div className="contato-content">
        {status === 'submitted' ? (
          <div className="contato-confirmation">
            <p className="contato-confirmation__title">Mensagem enviada!</p>
            <p className="contato-confirmation__body">
              <u>O Lourenço vai te responder pessoalmente em breve.</u>
            </p>
          </div>
        ) : (
          <>
            <div ref={bodyRef} {...bodyReveal} className={`contato-body ${bodyReveal.className}`}>
              <p className="contato-body__text">
                Chegou até aqui e ainda tem dúvida se essa terapia é pra você? Normal. Manda um
                oi, a gente conversa antes de qualquer compromisso.
              </p>
            </div>

            <form id={FORM_ID} className="contato-form" onSubmit={handleSubmit}>
              <div ref={nomeRef} {...nomeReveal} className={`form-field ${nomeReveal.className}`}>
                <label className="form-field__label" htmlFor="field-nome">
                  Oi, meu nome é (obrigatório)
                </label>
                <input
                  className="form-field__input"
                  id="field-nome"
                  name="nome"
                  type="text"
                  required
                />
              </div>

              <div ref={motivoRef} {...motivoReveal} className={`form-field ${motivoReveal.className}`}>
                <label className="form-field__label" htmlFor="field-motivo">
                  Estou procurando terapia para lidar com
                </label>
                <input className="form-field__input" id="field-motivo" name="motivo" type="text" />
              </div>

              <div ref={emailRef} {...emailReveal} className={`form-field ${emailReveal.className}`}>
                <label className="form-field__label" htmlFor="field-email">
                  Meu e-mail é (obrigatório)
                </label>
                <input
                  className="form-field__input"
                  id="field-email"
                  name="email"
                  type="email"
                  required
                />
              </div>

              <div ref={telefoneRef} {...telefoneReveal} className={`form-field ${telefoneReveal.className}`}>
                <label className="form-field__label" htmlFor="field-telefone">
                  E meu telefone é
                </label>
                <input
                  className="form-field__input"
                  id="field-telefone"
                  name="telefone"
                  type="tel"
                />
              </div>
            </form>

            {status === 'error' && (
              <p className="form-error">
                Não foi possível enviar sua mensagem agora. Tente novamente em instantes.
              </p>
            )}

            <div ref={ctaRef} {...ctaReveal} className={`contato-cta-primary-area ${ctaReveal.className}`}>
              <PrimaryButton
                text="Enviar mensagem"
                variant="red"
                type="submit"
                form={FORM_ID}
                disabled={status === 'submitting'}
              />
            </div>
          </>
        )}
      </div>
    </section>
  )
}
