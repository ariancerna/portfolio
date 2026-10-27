import { stackGroups } from '../data/tech'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import TechIcon from './TechIcon'

export default function Skills({ t }) {
  const s = t.skills
  const titles = { frontend: 'FRONTEND', backend: 'BACKEND', tools: s.tools }
  const colors = { frontend: 'text-cyan', backend: 'text-purple-300', tools: 'text-white/60' }

  return (
    <section id="habilidades" className="relative max-w-6xl mx-auto px-5 sm:px-8 py-24">
      <SectionHeading kicker={s.kicker} title={s.title} />

      <div className="space-y-4 sm:space-y-5">
        {stackGroups.map((group, i) => (
          <Reveal key={group.id} delay={i * 90}>
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-7">
              <div className={`font-bold text-xs tracking-[0.2em] mb-5 ${colors[group.id]}`}>{titles[group.id]}</div>
              <ul className="flex flex-wrap gap-2.5 list-none p-0 m-0">
                {group.items.map((tech) => (
                  <li
                    key={tech.name}
                    className="flex items-center gap-2.5 bg-white/[0.04] border border-white/10 rounded-xl pl-3 pr-4 py-2.5 text-white/90 hover:border-white/25 hover:bg-white/[0.07] transition"
                  >
                    <TechIcon icon={tech.icon} className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-medium text-white/80">{tech.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-5">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
            <div className="font-bold text-xs tracking-[0.2em] text-cyan">{s.certKicker}</div>
            <div className="font-medium text-xs text-white/40">Cisco Networking Academy</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {s.certs.map((cert) => (
              <div
                key={cert.name}
                className="flex items-start justify-between gap-4 bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 transition hover:border-cyan/45"
              >
                <span className="font-medium text-sm leading-snug text-white/80">{cert.name}</span>
                <span className="font-mono text-xs text-white/40 shrink-0 pt-0.5">{cert.date}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
