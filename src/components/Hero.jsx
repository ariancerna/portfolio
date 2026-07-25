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
          href="/cv-arian-cerna.pdf"
          download="CV-Arian-Cerna-Martinez.pdf"
          className="inline-flex items-center gap-2.5 font-semibold text-sm text-white bg-white/6 border border-white/12 px-8 py-4 rounded-full transition hover:bg-white/10 hover:border-white/25 hover:-translate-y-1"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
            <path d="M12 3a1 1 0 0 1 1 1v9.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V4a1 1 0 0 1 1-1zM5 19a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z" />
          </svg>
          {t.tDescargarCV}
        </a>
        <a
          href="https://github.com/ariancerna"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 font-semibold text-sm text-white bg-white/6 border border-white/12 px-8 py-4 rounded-full transition hover:bg-white/10 hover:border-white/25 hover:-translate-y-1"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
            <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.12-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.77.84 1.24 1.92 1.24 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
          </svg>
          GitHub
        </a>
      </div>
    </div>
  )
}
