import { trackWhatsApp, whatsappLink } from '../lib/contact'
import { ArrowIcon, BagIcon, CalendarIcon, DashboardIcon, GlobeIcon } from './Icons'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import TiltCard from './TiltCard'

const icons = [GlobeIcon, BagIcon, CalendarIcon, DashboardIcon]

export default function Services({ t, scrollToSection }) {
  const s = t.services

  return (
    <section id="servicios" className="relative max-w-6xl mx-auto px-5 sm:px-8 py-24">
      <SectionHeading kicker={s.kicker} title={s.title} desc={s.desc} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {s.items.map((item, i) => {
          const Icon = icons[i]
          return (
            <Reveal key={item.title} delay={i * 90}>
              <TiltCard max={6} className="h-full bg-white/[0.03] border border-white/10 rounded-3xl p-7 sm:p-8 hover:border-purple/45">
                <div className="w-12 h-12 rounded-2xl grid place-items-center text-cyan bg-gradient-to-br from-purple/25 to-cyan/15 border border-white/10 mb-6 tilt-pop">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm font-light leading-relaxed text-white/60 mb-6">{item.desc}</p>
                <button
                  type="button"
                  onClick={() => scrollToSection(item.target)}
                  className="group inline-flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-cyan transition"
                >
                  <span className="text-white/35">{s.example}:</span> {item.example}
                  <ArrowIcon className="w-3.5 h-3.5 transition group-hover:translate-x-0.5" />
                </button>
              </TiltCard>
            </Reveal>
          )
        })}
      </div>

      <Reveal className="mt-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-dashed border-white/15 rounded-3xl px-7 py-6 text-center sm:text-left">
          <p className="text-sm text-white/65">{s.other}</p>
          <a
            href={whatsappLink(t.hero.waMessage)}
            onClick={trackWhatsApp('servicios')}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 font-semibold text-sm text-cyan hover:text-white transition"
          >
            {s.otherCta} <ArrowIcon className="w-4 h-4" />
          </a>
        </div>
      </Reveal>
    </section>
  )
}
