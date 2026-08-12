import { useEffect, useRef, useState } from 'react'
import './TopicsTicker.css'

const TOPICS = [
  'Sofrimento no trabalho',
  'Falta de sentido',
  'Ansiedade',
  'Falta de horizonte na vida',
  'Transidentidade',
  'Autismo',
  'Sexualidade',
]

const MARQUEE_SPEED_PX_PER_SECOND = 40

/**
 * Content is rendered twice back-to-back (this component, called from both
 * copies below) and animated via translateX(-50%): once the first copy has
 * scrolled fully past, the second is sitting exactly where the first
 * started, so the loop resets with nothing to see — no gap, no jump.
 */
function TickerSequence({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="ticker-sequence" aria-hidden={hidden}>
      {TOPICS.flatMap((topic) => [
        <span className="ticker-item" key={topic}>
          {topic}
        </span>,
        <span className="ticker-item ticker-item--divider" key={`${topic}-divider`} aria-hidden="true">
          ·
        </span>,
      ])}
    </div>
  )
}

// A fixed animation-duration would make the marquee move at different
// px/second depending on breakpoint (mobile's 14px content is narrower per
// copy than desktop's 20px content). Measuring the actual rendered width
// and solving duration = distance / speed keeps the speed constant instead.
function useMarqueeDuration(pxPerSecond: number) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [duration, setDuration] = useState(20)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const measure = () => {
      const oneCopyWidth = el.scrollWidth / 2
      if (oneCopyWidth > 0) {
        setDuration(oneCopyWidth / pxPerSecond)
      }
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [pxPerSecond])

  return { scrollRef, duration }
}

export default function TopicsTicker() {
  const { scrollRef, duration } = useMarqueeDuration(MARQUEE_SPEED_PX_PER_SECOND)

  return (
    <div className="topics-ticker">
      <div className="ticker-track">
        <div ref={scrollRef} className="ticker-scroll" style={{ animationDuration: `${duration}s` }}>
          <TickerSequence />
          <TickerSequence hidden />
        </div>
      </div>
    </div>
  )
}
