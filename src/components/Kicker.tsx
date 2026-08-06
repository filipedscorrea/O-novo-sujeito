import './Kicker.css'

type KickerProps = {
  text: string
}

export default function Kicker({ text }: KickerProps) {
  return (
    <div className="kicker">
      <span className="kicker__text">{text}</span>
      <span className="kicker__line" aria-hidden="true" />
    </div>
  )
}
