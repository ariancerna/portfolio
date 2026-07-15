import { useState, useEffect } from 'react'

export default function Hero({ t, scrollToSection }) {
  const [typed, setTyped] = useState('')
  const [typeState, setTypeState] = useState({ i: 0, pos: 0, del: false })

  useEffect(() => {
    const interval = setInterval(() => {
      setTypeState(prev => {
        const s = { ...prev }
        const word = t.roles[s.i % t.roles.length]
        if (!s.del) {
          s.pos++
          if (s.pos >= word.length + 14) s.del = true
        } else {
          s.pos--
          if (s.pos <= 0) {
            s.del = false
            s.i++
          }
        }
        const displayText = word.slice(0, Math.min(s.pos, word.length))
        setTyped(displayText)
        return s
      })
    }, 55)

    return () => clearInterval(interval)
  }, [t.roles])

  return (
    <div id="inicio" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 overflow-hidden">
      <div
        className="absolute -top-36 -left-24 w-[560px] h-[560px] rounded-full blur-[50px] animate-orb-a pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,.35), transparent 65%)' }}
      ></div>
      <div
        className="absolute top-[20%] -right-36 w-[500px] h-[500px] rounded-full blur-[50px] animate-orb-b pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,.22), transparent 65%)' }}
      ></div>
      <div
        className="absolute -bottom-40 left-[35%] w-[440px] h-[440px] rounded-full blur-[50px] animate-orb-c pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,.18), transparent 65%)' }}
      ></div>

      <div className="relative w-32 h-32 mb-9">
        <div className="absolute inset-[-13px] border border-dashed border-purple/55 rounded-full animate-spin-slow"></div>
        <img
          src="https://avatars.githubusercontent.com/u/155792867?v=4"
          alt="Arian Cerna"
          className="w-32 h-32 rounded-full object-cover border-2 border-cyan/50 shadow-[0_0_60px_rgba(139,92,246,0.35)]"
        />
      </div>

      <div className="inline-flex items-center gap-2 font-semibold text-xs text-cyan bg-cyan/8 border border-cyan/25 rounded-full px-5 py-2 mb-7">
        <span className="w-2 h-2 rounded-full bg-cyan animate-pulse-dot"></span>
        {t.tBadge}
      </div>

      <h1 className="m-0 font-black text-5xl sm:text-6xl lg:text-7xl leading-tight tracking-tight text-white">
        {t.tHeroHola} <span className="bg-gradient-to-r from-purple to-cyan bg-clip-text text-transparent">Arian</span>
      </h1>

      <div className="mt-6 font-mono text-lg sm:text-2xl text-white/75 min-h-8">
        {typed}<span className="text-cyan animate-blink">▌</span>
      </div>

      <p className="mt-6 font-light text-lg text-white/55 max-w-2xl">{t.tHeroDesc}</p>

      <div className="flex gap-4 justify-center mt-10 flex-wrap">
        <button
          onClick={() => scrollToSection('proyectos')}
          className="font-semibold text-sm text-dark-bg bg-gradient-to-r from-purple to-cyan px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition"
        >
          {t.tCtaProyectos}
        </button>
        <a
          href="https://github.com/ariancerna"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-sm text-white border border-white/20 px-8 py-4 rounded-full hover:border-cyan/60 hover:bg-cyan/6 transition"
        >
          GitHub ↗
        </a>
      </div>
    </div>
  )
}
