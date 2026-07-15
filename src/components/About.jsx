import Marquee from './Marquee'

export default function About({ t }) {
  const stats = [
    { number: '7º', label: t.tStatCiclo, color: 'from-purple to-cyan' },
    { number: '7', label: t.tStatRepos, color: 'from-cyan to-purple' },
    { number: '3', label: t.tStatApps, color: 'from-cyan to-purple' },
    { number: '3', label: t.tStatStacks, color: 'from-purple to-cyan' },
  ]

  return (
    <>
      <Marquee />
      <section id="sobre" className="relative max-w-4xl mx-auto px-8 py-24">
        <div className="text-cyan font-bold text-xs tracking-widest mb-3">{t.tSobreKicker}</div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-3">
            <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-6">{t.tSobreTitulo}</h2>
            <p className="text-base font-light leading-relaxed text-white/60 mb-4">{t.tSobreP1}</p>
            <p className="text-base font-light leading-relaxed text-white/60">{t.tSobreP2}</p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`bg-white/4 border border-${i % 2 === 0 ? 'purple' : 'cyan'}/30 rounded-2xl p-6 hover:bg-white/6 hover:border-${i % 2 === 0 ? 'purple' : 'cyan'}/60 transition hover:-translate-y-1`}
              >
                <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.number}
                </div>
                <div className="text-xs font-normal leading-tight text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
