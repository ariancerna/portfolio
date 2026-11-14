import { stackGroups } from '../data/tech'
import { brandColor } from '../lib/brandColor'
import Reveal from './Reveal'
import Section from './Section'
import TechIcon from './TechIcon'

export default function Skills({ t }) {
  const s = t.skills
  const titles = { frontend: 'Frontend', backend: 'Backend', tools: s.tools }

  return (
    <Section id="habilidades" index="06" label={s.kicker} title={s.title}>
      <div className="border-b border-line">
        {stackGroups.map((group, i) => (
          <Reveal key={group.id} delay={i * 70} className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-4 border-t border-line py-7">
            <h3 className="label lg:col-span-3 lg:pt-2.5">{titles[group.id]}</h3>
            <ul className="lg:col-span-9 flex flex-wrap gap-2 list-none m-0 p-0">
              {group.items.map((tech) => (
                <li
                  key={tech.name}
                  style={{ '--brand': brandColor(tech.icon) }}
                  className="group flex items-center gap-2.5 border border-line rounded-md pl-2.5 pr-3 py-2 text-sm text-muted transition-colors hover:border-line-strong hover:text-ink"
                >
                  <TechIcon icon={tech.icon} className="w-4 h-4 shrink-0 text-faint transition-colors group-hover:text-[var(--brand)]" />
                  {tech.name}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}

        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-4 border-t border-line py-7">
          <div className="lg:col-span-3 lg:pt-1">
            <h3 className="label">{s.certKicker}</h3>
            <p className="mt-2 text-sm text-faint">Cisco Networking Academy</p>
          </div>
          <ul className="lg:col-span-9 list-none m-0 p-0">
            {s.certs.map((cert, i) => (
              <li key={cert.name} className={`flex items-baseline justify-between gap-6 py-3 ${i > 0 ? 'border-t border-line' : 'pt-0 lg:pt-1'}`}>
                <span className="text-[0.95rem] text-muted">{cert.name}</span>
                <span className="font-mono text-xs text-faint shrink-0">{cert.date}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
