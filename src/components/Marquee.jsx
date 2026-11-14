import { marqueeTech } from '../data/tech'
import TechIcon from './TechIcon'

function Row({ hidden }) {
  return (
    <ul className="flex items-center gap-14 px-7 m-0 list-none" aria-hidden={hidden || undefined}>
      {marqueeTech.map((tech) => (
        <li key={tech.name} className="flex items-center gap-2.5 shrink-0 text-faint">
          <TechIcon icon={tech.icon} className="w-5 h-5" />
          <span className="text-sm whitespace-nowrap">{tech.name}</span>
        </li>
      ))}
    </ul>
  )
}

// Slow strip of the technologies used across the projects.
export default function Marquee() {
  return (
    <div className="strip-mask border-t border-line py-7 overflow-hidden">
      <div className="flex w-max animate-marquee">
        <Row />
        <Row hidden />
      </div>
    </div>
  )
}
