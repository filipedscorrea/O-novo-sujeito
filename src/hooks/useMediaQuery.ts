import { useEffect, useState } from 'react'

/** Tracks a CSS media query in JS, for logic that must fully diverge across
 * breakpoints (not just be visually hidden), e.g. bypassing the mobile nav's
 * hamburger/scroll-lock/door-overlay state entirely on desktop. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}
