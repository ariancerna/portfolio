import Reveal from './Reveal'
import Section from './Section'

export default function Process({ t }) {
  const p = t.process
  return (
    <Section index="03" label={p.kicker} title={p.title}>
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 list-none m-0 p-0">
        {p.steps.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 70} className="border-t border-line-strong pt-5">
            <span className="font-mono text-xs text-accent">0{i + 1}</span>
            <h3 className="mt-6 text-xl font-medium tracking-[-0.025em]">{step.title}</h3>
            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">{step.desc}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
