import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Process({ t }) {
  const p = t.process
  return (
    <section className="relative max-w-6xl mx-auto px-5 sm:px-8 py-24">
      <SectionHeading kicker={p.kicker} title={p.title} />
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 list-none p-0 m-0">
        {p.steps.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 90} className="relative">
            <div className="h-full bg-white/[0.03] border border-white/10 rounded-3xl p-7">
              <div className="font-mono text-sm font-semibold bg-gradient-to-r from-purple to-cyan bg-clip-text text-transparent mb-5">
                0{i + 1}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm font-light leading-relaxed text-white/55">{step.desc}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
