import { trackWhatsApp, whatsappLink } from '../lib/contact'
import { CheckIcon } from './Icons'
import Reveal from './Reveal'
import Section from './Section'

export default function Pricing({ t }) {
  const p = t.pricing

  return (
    <Section id="precios" index="04" label={p.kicker} title={p.title} desc={p.desc}>
      <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-3 border border-line rounded-lg overflow-hidden">
          {p.plans.map((plan, i) => {
            const highlighted = Boolean(plan.tag)
            return (
              <div
                key={plan.name}
                className={`relative flex flex-col p-7 lg:p-9 ${i > 0 ? 'border-t lg:border-t-0 lg:border-l border-line' : ''} ${
                  highlighted ? 'bg-surface' : ''
                }`}
              >
                {highlighted && <span className="absolute inset-x-0 top-0 h-px bg-accent" aria-hidden="true"></span>}
                <div className="flex items-center justify-between gap-3 min-h-5">
                  <h3 className="text-[0.95rem] font-medium">{plan.name}</h3>
                  {highlighted && <span className="label !text-accent">{plan.tag}</span>}
                </div>

                <p className="mt-8 flex items-baseline gap-2">
                  <span className="label">{p.from}</span>
                  <span className="text-5xl font-medium tracking-[-0.045em]">S/ {plan.price}</span>
                </p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-muted lg:min-h-[3.2rem]">{plan.for}</p>

                <ul className="mt-7 pt-6 border-t border-line space-y-3 list-none p-0 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-muted">
                      <CheckIcon className="w-3.5 h-3.5 mt-[3px] shrink-0 text-faint" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappLink(`${p.waPlan} "${plan.name}" (${p.from} S/ ${plan.price}).`)}
                  onClick={trackWhatsApp(`precios-${i + 1}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn mt-9 ${highlighted ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {plan.cta}
                </a>
              </div>
            )
          })}
        </div>
      </Reveal>

      <Reveal className="mt-6">
        <p className="max-w-3xl text-sm leading-relaxed text-faint">
          {p.note} {p.currencyNote}
        </p>
      </Reveal>
    </Section>
  )
}
