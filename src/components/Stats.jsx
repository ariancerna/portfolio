import Reveal from './Reveal'

export default function Stats({ t }) {
  return (
    <section className="relative max-w-6xl mx-auto px-5 sm:px-8 pb-6" aria-label="Resumen">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {t.stats.map((stat, i) => (
          <Reveal key={i} delay={i * 80} className="h-full">
            <div className="h-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-6 hover:border-purple/40 transition">
              <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-purple to-cyan bg-clip-text text-transparent">{stat.number}</div>
              <div className="text-xs sm:text-sm leading-snug text-white/55 mt-1.5">{stat.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
