import { trackWhatsApp, whatsappLink } from '../lib/contact'
import { CheckIcon, WhatsAppIcon } from './Icons'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Pricing({ t }) {
  const p = t.pricing

  return (
    <section id="precios" className="relative max-w-6xl mx-auto px-5 sm:px-8 py-24">
      <SectionHeading kicker={p.kicker} title={p.title} desc={p.desc} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
        {p.plans.map((plan, i) => {
          const featured = Boolean(plan.tag)
          return (
            <Reveal key={plan.name} delay={i * 90} className="h-full">
              <div
                className={`relative h-full flex flex-col rounded-3xl p-7 sm:p-8 ${
                  featured
                    ? 'bg-gradient-to-b from-purple/20 to-cyan/5 border border-purple/50 shadow-[0_20px_60px_-20px_rgba(139,92,246,0.45)]'
                    : 'bg-white/[0.03] border border-white/10'
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 left-7 font-bold text-[11px] tracking-wider uppercase text-dark-bg bg-gradient-to-r from-purple to-cyan rounded-full px-3 py-1">
                    {plan.tag}
                  </span>
                )}
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-white/55 min-h-[2.75rem]">{plan.for}</p>

                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-sm text-white/45">{p.from}</span>
                  <span className="text-4xl font-black tracking-tight text-white">S/ {plan.price}</span>
                </div>

                <ul className="mt-6 space-y-3 list-none p-0 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-white/75">
                      <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full grid place-items-center bg-cyan/15 text-cyan">
                        <CheckIcon className="w-3 h-3" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappLink(`${p.waPlan} "${plan.name}" (${p.from} S/ ${plan.price}).`)}
                  onClick={trackWhatsApp(`precios-${i + 1}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 inline-flex items-center justify-center gap-2 font-semibold text-sm px-6 py-3.5 rounded-full transition hover:-translate-y-0.5 ${
                    featured
                      ? 'text-dark-bg bg-gradient-to-r from-purple to-cyan hover:shadow-[0_10px_30px_rgba(139,92,246,0.45)]'
                      : 'text-white bg-white/6 border border-white/12 hover:bg-white/10'
                  }`}
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  {plan.cta}
                </a>
              </div>
            </Reveal>
          )
        })}
      </div>

      <Reveal className="mt-6">
        <p className="text-sm text-white/50 leading-relaxed max-w-3xl">
          {p.note} {p.currencyNote}
        </p>
      </Reveal>
    </section>
  )
}
