import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Kicker from './Kicker'
import './Pratica.css'

type PraticaVariant = 'default' | 'quem' | 'como' | 'sobre-o-que'

const MONTAGE_BODY: Record<Exclude<PraticaVariant, 'default'>, { alt: string; text: React.ReactNode }> = {
  quem: {
    alt: 'Quem',
    text: (
      <>
        Atendo <strong>adolescentes e adultos</strong>. Não faço atendimento infantil. Tenho
        vagas reservadas para atendimentos sociais.
      </>
    ),
  },
  como: {
    alt: 'Como',
    text: (
      <>
        Sessões <strong>presenciais ou online</strong>. O formato se combina com você, conforme o
        que funciona na sua rotina.
      </>
    ),
  },
  'sobre-o-que': {
    alt: 'Sobre o quê',
    text: (
      <>
        Tenho mais prática em alguns temas do que em outros. Não me chamo de especialista em
        nenhum deles, mas tenho experiência real com:{' '}
        <strong>
          Trabalho e falta de sentido, problemas familiares, ansiedade, transidentidade,
          sexualidade, transtornos do espectro autista
        </strong>.
      </>
    ),
  },
}

const LABELS: { variant: Exclude<PraticaVariant, 'default'>; text: string }[] = [
  { variant: 'quem', text: 'Quem' },
  { variant: 'como', text: 'Como' },
  { variant: 'sobre-o-que', text: 'Sobre o quê' },
]

const DESKTOP_PRATICA_QUERY = '(min-width: 1024px)'

// >=1024px moves the answer out of the montage image (an absolute overlay
// on mobile) into pratica-written-content beside it — a real structural
// change, not just CSS, same pattern as Nav/Abordagem's breakpoint hooks.
function useIsDesktopPratica() {
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_PRATICA_QUERY).matches)

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_PRATICA_QUERY)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return isDesktop
}

// Mobile's body-box text keeps its own sequential fade-out-then-fade-in
// (unchanged, tuned separately). The montage image's crossfade below and
// desktop's pratica-body-montage-related-body transition both use the
// longer, clearly-perceptible duration instead.
const MOBILE_FADE_MS = 250
const DESKTOP_TRANSITION_MS = 450
const CROSSFADE_MS = 450

export default function Pratica() {
  const [variant, setVariant] = useState<PraticaVariant>('default')
  const isDesktop = useIsDesktopPratica()
  const [headlineRef, headlineReveal] = useScrollReveal('pratica-headline', 'up', 0)
  const [montageRef, montageReveal] = useScrollReveal('pratica-montage', 'right', 200)

  // Mobile only (see the montage image markup below for the desktop
  // crossfade instead): swapping the image/answer directly on `variant`
  // change is an instant cut. `displayVariant` lags behind `variant` by one
  // fade-out, so the image and body-box both fade to transparent, swap
  // content, then fade back in. Desktop still uses this same mechanism for
  // pratica-body-montage-related-body's text (not the montage image).
  const [displayVariant, setDisplayVariant] = useState<PraticaVariant>('default')
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    if (variant === displayVariant) return

    const duration = isDesktop ? DESKTOP_TRANSITION_MS : MOBILE_FADE_MS
    setIsFading(true)
    const fadeOutTimeout = setTimeout(() => {
      setDisplayVariant(variant)
      // Land the new content at opacity 0 (isFading still true) first, then
      // flip to false a frame later so the fade-in is a real transition
      // instead of popping in at full opacity on the very first mount.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsFading(false))
      })
    }, duration)

    return () => clearTimeout(fadeOutTimeout)
  }, [variant, displayVariant, isDesktop])

  // All breakpoints: a real crossfade for the montage image — the outgoing
  // image (retiringVariant) is layered on top of the current one (always
  // rendered live off `variant`, no delay) and fades from opaque to
  // transparent, revealing the new image underneath instead of both images
  // fading through a blank gap sequentially.
  const [retiringVariant, setRetiringVariant] = useState<PraticaVariant | null>(null)
  const [retiringFadingOut, setRetiringFadingOut] = useState(false)
  const prevVariantRef = useRef<PraticaVariant>('default')

  useEffect(() => {
    const previous = prevVariantRef.current
    prevVariantRef.current = variant
    if (previous === variant) return

    setRetiringVariant(previous)
    setRetiringFadingOut(false)
    let fadeOutFrame = 0
    fadeOutFrame = requestAnimationFrame(() => {
      fadeOutFrame = requestAnimationFrame(() => setRetiringFadingOut(true))
    })
    const cleanupTimeout = setTimeout(() => {
      setRetiringVariant(null)
      setRetiringFadingOut(false)
    }, CROSSFADE_MS + 50)

    return () => {
      cancelAnimationFrame(fadeOutFrame)
      clearTimeout(cleanupTimeout)
    }
  }, [variant])

  // Desktop only: before the first click, pratica-headline-body sits alone,
  // vertically centered in pratica-written-content's full height (as if
  // pratica-body-montage-related-body didn't exist). `centerMargin` is the
  // margin-top (measured, not guessed — the available height varies by
  // breakpoint and by the montage image's own aspect-ratio-driven height)
  // that achieves that centering; `hasInteracted` latches true on the first
  // non-default variant and never resets, so the headline animates up to
  // its permanent top-aligned position exactly once, matching the
  // established rule that variant itself never returns to 'default'.
  const [hasInteracted, setHasInteracted] = useState(false)
  const [centerMargin, setCenterMargin] = useState(0)
  const writtenContentRef = useRef<HTMLDivElement>(null)
  const headlineBodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (variant !== 'default') setHasInteracted(true)
  }, [variant])

  useLayoutEffect(() => {
    if (!isDesktop || hasInteracted) return
    const recalc = () => {
      const containerHeight = writtenContentRef.current?.offsetHeight ?? 0
      const headlineHeight = headlineBodyRef.current?.offsetHeight ?? 0
      setCenterMargin(Math.max(0, (containerHeight - headlineHeight) / 2))
    }
    recalc()
    window.addEventListener('resize', recalc)
    // Rodchenko/Oswald can still be loading at first measurement, briefly
    // rendering the headline in a fallback font with different metrics —
    // re-measure once the real fonts are confirmed in so the centering
    // isn't left slightly off based on that first, wrong measurement.
    document.fonts?.ready.then(recalc)
    return () => window.removeEventListener('resize', recalc)
  }, [isDesktop, hasInteracted])

  // Desktop only: pratica-body-montage-related-body's height tracks its
  // content (0 while default, the answer's natural height otherwise) as a
  // real px value so it can transition smoothly instead of snapping —
  // "auto" heights can't be transitioned directly, so this measures the
  // natural height after each content swap and commits it as a number.
  const [relatedBoxHeight, setRelatedBoxHeight] = useState(0)
  const relatedBodyRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!isDesktop) return
    const el = relatedBodyRef.current
    if (!el) return

    if (displayVariant === 'default') {
      setRelatedBoxHeight(0)
      return
    }

    const measure = () => {
      const previousHeight = el.style.height
      el.style.height = 'auto'
      const natural = el.scrollHeight
      el.style.height = previousHeight
      setRelatedBoxHeight(natural)
    }

    measure()
    // Font-size scales again within the 1024+ range (1280/1440 tiers) —
    // resizing across those without a variant change would otherwise leave
    // the measured height stale for the new font-size.
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure)
    return () => window.removeEventListener('resize', measure)
  }, [displayVariant, isDesktop])

  useEffect(() => {
    const variants: PraticaVariant[] = ['default', 'quem', 'como', 'sobre-o-que']
    for (const v of variants) {
      const img = new Image()
      img.src = `/assets/pratica-montage-${v}.png`
    }
  }, [])

  const headline = (
    <div ref={headlineRef} {...headlineReveal} className={`pratica-headline ${headlineReveal.className}`}>
      <p className="pratica-headline__text">
        Sou o <em>psicólogo</em> <em>certo</em> para você?
      </p>
    </div>
  )

  const body = (
    <div className="pratica-body">
      <p className="pratica-body__text">
        Clique em <strong>Quem</strong>, <strong>Como</strong> e <strong>Sobre o quê</strong> e
        descubra.
      </p>
    </div>
  )

  // The words "Quem"/"Como"/"Sobre o quê" are pixels baked into the montage
  // photo itself, not real text — these are invisible click targets
  // positioned over them, not visible label chips.
  const montage = (
    <div ref={montageRef} {...montageReveal} className={`pratica-montage ${montageReveal.className}`}>
      {/* Crossfade (all breakpoints): the outgoing image sits on top,
          fading out to reveal the (already live) current image below it —
          pointer-events:none so hitbox clicks pass straight through it. */}
      {retiringVariant && (
        <img
          className={`pratica-montage__img pratica-montage__img--retiring${retiringFadingOut ? ' is-fading-out' : ''}`}
          src={`/assets/pratica-montage-${retiringVariant}.png`}
          alt=""
          aria-hidden="true"
        />
      )}
      <img className="pratica-montage__img" src={`/assets/pratica-montage-${variant}.png`} alt="Lourenço Serpa" />

      {LABELS.map((label) => (
        <button
          key={label.variant}
          type="button"
          className={`montage-hitbox montage-hitbox--${label.variant}`}
          aria-label={label.text}
          onClick={() => setVariant(label.variant)}
        />
      ))}

      {/* Mobile only: the answer overlays the image directly. Desktop shows
          the same answer in pratica-body-montage-related instead (below). */}
      {!isDesktop && displayVariant !== 'default' && (
        <div className={`montage-body-box montage-body-box--${displayVariant}${isFading ? ' is-fading' : ''}`}>
          <p className="montage-body-box__text">{MONTAGE_BODY[displayVariant].text}</p>
        </div>
      )}
    </div>
  )

  if (isDesktop) {
    return (
      <section className="pratica-section" id="pratica">
        <Kicker text="A prática" />

        <div className="pratica-content">
          <div className="pratica-montage-content">{montage}</div>

          <div className="pratica-written-content" ref={writtenContentRef}>
            <div
              className="pratica-headline-body"
              ref={headlineBodyRef}
              style={{ marginTop: hasInteracted ? 0 : centerMargin }}
            >
              {headline}
              {body}
            </div>

            <div
              className="pratica-body-montage-related-body"
              ref={relatedBodyRef}
              style={{
                height: relatedBoxHeight,
                opacity: relatedBoxHeight === 0 ? 0 : 1,
                marginTop: relatedBoxHeight === 0 ? 0 : 40,
              }}
            >
              {displayVariant !== 'default' && (
                <p className={`pratica-body-montage-related${isFading ? ' is-fading' : ''}`}>
                  {MONTAGE_BODY[displayVariant].text}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="pratica-section" id="pratica">
      <Kicker text="A prática" />

      <div className="pratica-content">
        {headline}
        {body}
        <div
          className={`pratica-montage-content${displayVariant === 'sobre-o-que' ? ' pratica-montage-content--sobre-o-que' : ''}`}
        >
          {montage}
        </div>
      </div>
    </section>
  )
}
