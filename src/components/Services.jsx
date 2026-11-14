import { trackWhatsApp, whatsappLink } from '../lib/contact'
import { ArrowIcon } from './Icons'
import Reveal from './Reveal'
import Section from './Section'

export default function Services({ t, scrollToSection }) {
  const s = t.services

  return (
    <Section id="servicios" index="01" label={s.kicker} title={s.title} desc={s.desc}>
      <ol className="list-none m-0 p-0 border-b border-line">
        {s.items.map((item, i) => (
          <Reveal as="li" key={item.title} delay={i * 60} className="border-t border-line">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-3 py-7 lg:py-9">
              <span className="font-mono text-xs text-faint lg:col-span-1 lg:pt-2">0{i + 1}</span>
              <h3 className="lg:col-span-4 text-2xl font-medium tracking-[-0.03em] leading-tight">{item.title}</h3>
              <p className="lg:col-span-5 text-[0.98rem] leading-relaxed text-muted">{item.desc}</p>
              <div className="lg:col-span-2 lg:text-right">
                <span className="label block mb-1.5">{s.example}</span>
                <button
                  type="button"
                  onClick={() => scrollToSection(item.target)}
                  className="group inline-flex items-center gap-1.5 text-sm text-left lg:text-right link"
                >
                  {item.example}
                  <ArrowIcon className="w-3.5 h-3.5 shrink-0 rotate-90 text-faint transition-colors group-hover:text-ink" />
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-muted">{s.other}</p>
        <a
          href={whatsappLink(t.hero.waMessage)}
          onClick={trackWhatsApp('servicios')}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-sm font-medium link"
        >
          {s.otherCta}
          <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </Reveal>
    </Section>
  )
}
