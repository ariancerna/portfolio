import Reveal from './Reveal'

// Shared section shell: a hairline on top, a numbered label on the left
// and the heading on the right, so every section lines up on the same grid.
export default function Section({ id, index, label, title, desc, children, className = '' }) {
  return (
    <section id={id} className={`border-t border-line scroll-mt-14 ${className}`}>
      <div className="wrap py-20 lg:py-28">
        <Reveal as="header" className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-5 mb-12 lg:mb-16">
          <p className="label lg:col-span-3 lg:pt-3">
            <span className="text-accent">{index}</span>
            <span className="mx-2 text-line-strong">/</span>
            {label}
          </p>
          <div className="lg:col-span-9">
            <h2 className="text-[2rem] leading-[1.08] sm:text-5xl sm:leading-[1.04] font-medium tracking-[-0.035em] text-balance max-w-3xl">
              {title}
            </h2>
            {desc && <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-muted">{desc}</p>}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  )
}
