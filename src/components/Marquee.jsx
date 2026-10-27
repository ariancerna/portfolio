import { marqueeTech } from '../data/tech'
import TechIcon from './TechIcon'

function Row({ hidden }) {
  return (
    <ul className="flex items-center gap-12 sm:gap-16 px-6 sm:px-8 m-0 list-none" aria-hidden={hidden || undefined}>
      {marqueeTech.map((tech) => (
        <li key={tech.name} className="flex items-center gap-3 shrink-0 text-white/85">
          <TechIcon icon={tech.icon} className="w-7 h-7" />
          <span className="font-semibold text-sm text-white/55 whitespace-nowrap">{tech.name}</span>
        </li>
      ))}
    </ul>
  )
}

export default function Marquee() {
  return (
    <div className="marquee-mask border-y border-white/7 py-6 overflow-hidden bg-white/[0.02] mt-16">
      <div className="flex w-max animate-marquee">
        <Row />
        <Row hidden />
      </div>
    </div>
  )
}
