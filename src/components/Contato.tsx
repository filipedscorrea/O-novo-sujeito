import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Kicker from './Kicker'
import PrimaryButton from './PrimaryButton'
import './Contato.css'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mbgrydgb'

const FORM_ID = 'contato-form'

type FieldErrors = { nome?: string; email?: string }

export default function Contato() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle')
  const [errors, setErrors] = useState<FieldErrors>({})

  const [bodyRef, bodyReveal] = useScrollReveal('contato-body', 'up', 0)
  const [nomeRef, nomeReveal] = useScrollReveal('field-nome', 'up', 200)
  const [motivoRef, motivoReveal] = useScrollReveal('field-motivo', 'up', 400)
  const [emailRef, emailReveal] = useScrollReveal('field-email', 'up', 600)
  const [telefoneRef, telefoneReveal] = useScrollReveal('field-telefone', 'up', 800)
  const [ctaRef, ctaReveal] = useScrollReveal('contato-cta', 'up', 1000)

  const clearError = (field: keyof FieldErrors) => {
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleNomeChange = (_e: ChangeEvent<HTMLInputElement>) => clearError('nome')
  const handleEmailChange = (_e: ChangeEvent<HTMLInputElement>) => clearError('email')

  const validate = (form: HTMLFormElement): FieldErrors => {
    const nomeEl = form.elements.namedItem('name') as HTMLInputElement
    const emailEl = form.elements.namedItem('email') as HTMLInputElement
    const nextErrors: FieldErrors = {}

    if (!nomeEl.value.trim()) {
      nextErrors.nome = 'Preenche seu nome, por favor.'
    }

    if (!emailEl.value.trim()) {
      nextErrors.email = 'Preenche seu e-mail, por favor.'
    } else if (!emailEl.checkValidity()) {
      nextErrors.email = 'Esse e-mail não parece certo — confere aí?'
    }

    return nextErrors
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
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

  const isSubmitting = status === 'submitting'

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

            <form id={FORM_ID} className="contato-form" onSubmit={handleSubmit} noValidate>
              <div ref={nomeRef} {...nomeReveal} className={`form-field ${nomeReveal.className}`}>
                <label className="form-field__label" htmlFor="field-nome">
                  Oi, meu nome é (obrigatório)
                </label>
                <input
                  className={`form-field__input${errors.nome ? ' form-field__input--error' : ''}`}
                  id="field-nome"
                  name="name"
                  type="text"
                  required
                  disabled={isSubmitting}
                  aria-invalid={!!errors.nome}
                  aria-describedby={errors.nome ? 'field-nome-error' : undefined}
                  onChange={handleNomeChange}
                />
                {errors.nome && (
                  <p className="form-field__error" id="field-nome-error">
                    {errors.nome}
                  </p>
                )}
              </div>

              <div ref={motivoRef} {...motivoReveal} className={`form-field ${motivoReveal.className}`}>
                <label className="form-field__label" htmlFor="field-motivo">
                  Estou procurando terapia para lidar com
                </label>
                <input
                  className="form-field__input"
                  id="field-motivo"
                  name="reason"
                  type="text"
                  disabled={isSubmitting}
                />
              </div>

              <div ref={emailRef} {...emailReveal} className={`form-field ${emailReveal.className}`}>
                <label className="form-field__label" htmlFor="field-email">
                  Meu e-mail é (obrigatório)
                </label>
                <input
                  className={`form-field__input${errors.email ? ' form-field__input--error' : ''}`}
                  id="field-email"
                  name="email"
                  type="email"
                  required
                  disabled={isSubmitting}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'field-email-error' : undefined}
                  onChange={handleEmailChange}
                />
                {errors.email && (
                  <p className="form-field__error" id="field-email-error">
                    {errors.email}
                  </p>
                )}
              </div>

              <div
                ref={telefoneRef}
                {...telefoneReveal}
                className={`form-field ${telefoneReveal.className}`}
              >
                <label className="form-field__label" htmlFor="field-telefone">
                  E meu telefone é
                </label>
                <input
                  className="form-field__input"
                  id="field-telefone"
                  name="phone"
                  type="tel"
                  disabled={isSubmitting}
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
                text={isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
                variant="red"
                type="submit"
                form={FORM_ID}
                disabled={isSubmitting}
              />
            </div>
          </>
        )}
      </div>
    </section>
  )
}
