import './TopicsTicker.css'

const TOPICS = [
  'Sofrimento no trabalho',
  'Falta de sentido',
  'Ansiedade',
  'Falta de horizonte de vida',
  'Transidentidade',
  'Autismo',
]

function TickerSequence({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="ticker-sequence" aria-hidden={hidden}>
      {TOPICS.map((topic) => (
        <span className="ticker-item" key={topic}>
          {topic} ·
        </span>
      ))}
    </div>
  )
}

export default function TopicsTicker() {
  return (
    <div className="topics-ticker">
      <div className="ticker-track">
        <div className="ticker-scroll">
          <TickerSequence />
          <TickerSequence hidden />
        </div>
      </div>
    </div>
  )
}
