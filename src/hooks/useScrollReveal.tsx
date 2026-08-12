import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'

// Single IntersectionObserver for the whole page (handoff Parte 2, 12.2).
// Entries that cross the threshold in the same callback invocation are
// merged into one state update instead of one setState per element — this
// was the confirmed fix for the scroll stutter found during the original
// animation session.

const THRESHOLD = 0.18

type RevealContextValue = {
  observe: (el: Element, id: string) => void
  unobserve: (el: Element) => void
  revealedIds: Set<string>
}

const RevealContext = createContext<RevealContextValue | null>(null)

export function RevealProvider({ children }: { children: ReactNode }) {
  const [revealedIds, setRevealedIds] = useState<Set<string>>(() => new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)
  const idByElement = useRef(new WeakMap<Element, string>())

  // Lazily created during render (not inside useEffect): child sections call
  // observe() from their ref callbacks, which fire during commit — a phase
  // that runs entirely before any passive effect (including one that would
  // create this observer) gets a chance to. On the very first mount that left
  // observerRef.current null when every section's ref callback ran, so
  // observe() was a silent no-op and nothing was ever registered. Creating
  // the observer synchronously during render removes that race.
  //
  // Deliberately no cleanup effect disconnecting it: RevealProvider wraps
  // the whole app at the root and is never unmounted while the page is
  // alive, so there's no real unmount to clean up for. A cleanup effect
  // here would actively break things instead — React Strict Mode's dev-only
  // extra mount/cleanup/remount pass would disconnect this observer (which
  // every section's ref had already registered with) and swap in a
  // replacement that nothing re-registers against, since none of those refs
  // fire again on their own. That's what left every section stuck at
  // opacity: 0 in dev after the previous fix (production has no Strict
  // Mode, so it never hit this path — it just had the original race).
  if (observerRef.current === null) {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const newlyRevealed: string[] = []
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = idByElement.current.get(entry.target)
            if (id) {
              newlyRevealed.push(id)
              observerRef.current?.unobserve(entry.target)
            }
          }
        }
        if (newlyRevealed.length > 0) {
          setRevealedIds((prev) => {
            const next = new Set(prev)
            for (const id of newlyRevealed) next.add(id)
            return next
          })
        }
      },
      { threshold: THRESHOLD },
    )
  }

  const observe = useCallback((el: Element, id: string) => {
    idByElement.current.set(el, id)
    observerRef.current?.observe(el)
  }, [])

  const unobserve = useCallback((el: Element) => {
    observerRef.current?.unobserve(el)
  }, [])

  const value = useMemo(
    () => ({ observe, unobserve, revealedIds }),
    [observe, unobserve, revealedIds],
  )

  return <RevealContext.Provider value={value}>{children}</RevealContext.Provider>
}

type RevealDirection = 'up' | 'right' | 'left'

type RevealProps = {
  className: string
  style: { animationDelay: string }
  onAnimationEnd: () => void
}

/**
 * Registers `id` with the page's single IntersectionObserver and returns the
 * props to spread on the animated element. `alwaysVisible` bypasses the
 * observer entirely for on-load animations (Hero) or elements deliberately
 * excluded from the observer for performance (redes-icon-area, footer-info).
 */
export function useScrollReveal(
  id: string,
  direction: RevealDirection,
  delayMs: number,
  alwaysVisible = false,
): [(el: HTMLElement | null) => void, RevealProps] {
  const ctx = useContext(RevealContext)
  const [settled, setSettled] = useState(false)
  const elRef = useRef<HTMLElement | null>(null)

  const isVisible = alwaysVisible || ctx?.revealedIds.has(id) || false

  const refCallback = useCallback(
    (el: HTMLElement | null) => {
      if (alwaysVisible || !ctx) return
      if (elRef.current && elRef.current !== el) {
        ctx.unobserve(elRef.current)
      }
      elRef.current = el
      if (el) {
        ctx.observe(el, id)
      }
    },
    [ctx, id, alwaysVisible],
  )

  const directionClass =
    direction === 'up' ? 'reveal--up' : direction === 'right' ? 'reveal--right' : 'reveal--left'

  const className = `reveal ${directionClass}${isVisible ? ' is-visible' : ''}${settled ? ' reveal-done' : ''}`

  return [
    refCallback,
    {
      className,
      style: { animationDelay: `${delayMs}ms` },
      onAnimationEnd: () => setSettled(true),
    },
  ]
}

/** On-load reveal for above-the-fold content (Hero): visible from mount, no observer. */
export function useLoadReveal(
  direction: RevealDirection,
  delayMs: number,
): RevealProps & { className: string } {
  const [settled, setSettled] = useState(false)
  const directionClass =
    direction === 'up' ? 'reveal--up' : direction === 'right' ? 'reveal--right' : 'reveal--left'
  return {
    className: `reveal ${directionClass} is-visible${settled ? ' reveal-done' : ''}`,
    style: { animationDelay: `${delayMs}ms` },
    onAnimationEnd: () => setSettled(true),
  }
}
