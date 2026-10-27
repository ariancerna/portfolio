import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import { CV_FILENAME, CV_URL, trackCV, trackWhatsApp, whatsappLink } from '../lib/contact'
import { ArrowIcon, DownloadIcon, PinIcon, WhatsAppIcon } from './Icons'
import PhoneShowcase from './PhoneShowcase'

const Scene3D = lazy(() => import('./Scene3D'))

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}

// Soft glow shown while the 3D scene loads, or instead of it when WebGL is off.
function Glow() {
  return (
    <div className="absolute inset-0 grid place-items-center pointer-events-none" aria-hidden="true">
      <div className="w-[62%] aspect-square rounded-full blur-[30px] bg-[radial-gradient(circle_at_35%_35%,rgba(34,211,238,.55),rgba(139,92,246,.55)_45%,transparent_70%)] animate-orb-a"></div>
    </div>
  )
}

const DESKTOP_QUERY = '(min-width: 1024px)'

export default function Hero({ t, scrollToSection }) {
  const sceneRef = useRef(null)
  // Phones and tablets get a light phone mockup; the 3D scene is only loaded on desktop.
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_QUERY).matches)
  const [show3D, setShow3D] = useState(false)
  const [active, setActive] = useState(true)
  const [reduced, setReduced] = useState(false)
  const [touched, setTouched] = useState(false)
  const [coarse, setCoarse] = useState(false)
  const onInteract = useCallback(() => setTouched(true), [])

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    setShow3D(hasWebGL())
    setCoarse(window.matchMedia('(pointer: coarse)').matches)
    const mq = window.matchMedia(DESKTOP_QUERY)
    const onChange = () => setIsDesktop(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Pause rendering when the hero is off screen to save battery.
  useEffect(() => {
    const el = sceneRef.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [isDesktop])

  return (
    <header id="inicio" className="relative min-h-[100svh] flex items-center overflow-hidden pt-20 pb-16 lg:pt-28">
      <div className="absolute inset-0 hero-grid pointer-events-none" aria-hidden="true"></div>
      <div
        className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full blur-[60px] animate-orb-a pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,.28), transparent 65%)' }}
        aria-hidden="true"
      ></div>
      <div
        className="absolute bottom-0 -right-40 w-[520px] h-[520px] rounded-full blur-[60px] animate-orb-b pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,.16), transparent 65%)' }}
        aria-hidden="true"
      ></div>

      <div className="relative w-full max-w-6xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-4 items-center">
        {isDesktop ? (
          <div ref={sceneRef} className="relative order-last h-[580px] -mr-16">
            {!show3D && <Glow />}
            {show3D && (
              <Suspense fallback={null}>
                <div className="absolute inset-0 fade-in">
                  <Scene3D active={active} reduced={reduced} onInteract={onInteract} />
                </div>
                <div
                  className={`absolute left-1/2 -translate-x-1/2 bottom-1 lg:bottom-10 pointer-events-none inline-flex items-center gap-2 whitespace-nowrap text-[11px] font-semibold text-white/55 bg-white/[0.05] border border-white/10 rounded-full px-3 py-1.5 backdrop-blur transition-opacity duration-500 ${
                    touched ? 'opacity-0' : 'opacity-100'
                  }`}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 7 4 12l4 5M16 7l4 5-4 5M4 12h16" />
                  </svg>
                  {coarse ? t.hero.dragTouch : t.hero.drag}
                </div>
              </Suspense>
            )}
          </div>
        ) : (
          <div className="order-last mt-8">
            <PhoneShowcase t={t} scrollToSection={scrollToSection} />
          </div>
        )}

        <div className="relative text-center lg:text-left">
          <div className="inline-flex items-center gap-2 font-semibold text-xs text-emerald-300 bg-emerald-400/10 border border-emerald-400/25 rounded-full px-4 py-2 mb-6">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70"></span>
              <span className="relative w-2 h-2 rounded-full bg-emerald-400"></span>
            </span>
            {t.hero.badge}
          </div>

          <p className="font-mono text-xs sm:text-sm text-white/55 mb-4">{t.hero.hello}</p>

          <h1 className="m-0 font-black text-[2.4rem] leading-[1.08] sm:text-6xl lg:text-[4.1rem] tracking-tight text-white text-balance">
            {t.hero.title1}{' '}
            <span className="bg-gradient-to-r from-purple via-fuchsia-400 to-cyan bg-clip-text text-transparent">{t.hero.title2}</span>
          </h1>

          <p className="mt-6 font-light text-base sm:text-lg leading-relaxed text-white/60 max-w-xl mx-auto lg:mx-0">{t.hero.desc}</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mt-9">
            <a
              href={whatsappLink(t.hero.waMessage)}
              onClick={trackWhatsApp('inicio')}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 font-semibold text-sm text-dark-bg bg-gradient-to-r from-purple to-cyan px-7 py-4 rounded-full shadow-[0_10px_40px_rgba(139,92,246,0.35)] hover:shadow-[0_14px_50px_rgba(139,92,246,0.55)] hover:-translate-y-0.5 transition"
            >
              <WhatsAppIcon className="w-5 h-5" />
              {t.hero.ctaWhatsapp}
            </a>
            <button
              type="button"
              onClick={() => scrollToSection('proyectos')}
              className="group inline-flex items-center justify-center gap-2 font-semibold text-sm text-white bg-white/6 border border-white/12 px-7 py-4 rounded-full transition hover:bg-white/10 hover:border-white/25 hover:-translate-y-0.5"
            >
              {t.hero.ctaProjects}
              <ArrowIcon className="w-4 h-4 transition group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-white/50">
            <a href={CV_URL} download={CV_FILENAME} onClick={trackCV('inicio')} className="inline-flex items-center gap-2 font-medium text-white/70 hover:text-cyan transition">
              <DownloadIcon className="w-4 h-4" />
              {t.hero.cv}
            </a>
            <span className="inline-flex items-center gap-2">
              <PinIcon className="w-4 h-4" />
              {t.hero.location}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
