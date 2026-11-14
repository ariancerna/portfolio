import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import { showcase } from '../data/projects'
import { CV_FILENAME, CV_URL, trackCV, trackWhatsApp, whatsappLink } from '../lib/contact'
import { ArrowIcon, DownloadIcon, WhatsAppIcon } from './Icons'
import PhoneShowcase from './PhoneShowcase'

const DeviceScene = lazy(() => import('./DeviceScene'))

const DESKTOP_QUERY = '(min-width: 1024px)'
const SLIDE_MS = 6000

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}

export default function Hero({ t, scrollToSection }) {
  const sceneRef = useRef(null)
  // Phones and tablets get a light phone mockup; the 3D scene is only loaded on desktop.
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_QUERY).matches)
  const [webgl] = useState(hasWebGL)
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [index, setIndex] = useState(0)
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(true)
  const [dragged, setDragged] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY)
    const onChange = () => setIsDesktop(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Pause the scene and the slide timer while the hero is off screen.
  useEffect(() => {
    const el = sceneRef.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [isDesktop])

  const onReady = useCallback(() => setReady(true), [])
  const onInteract = useCallback(() => setDragged(true), [])
  const next = useCallback(() => setIndex((i) => (i + 1) % showcase.length), [])
  const current = showcase[index]
  const openCurrent = useCallback(() => scrollToSection(current.anchor), [scrollToSection, current.anchor])

  return (
    <header id="inicio" className="relative pt-14">
      <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-x-8 items-center lg:min-h-[calc(100svh-3.5rem-7.5rem)]">
        <div className="relative z-10 lg:col-span-6 pt-14 pb-12 lg:py-10">
          <p className="flex items-center gap-2.5 text-sm text-muted">
            <span className="relative flex w-2 h-2" aria-hidden="true">
              <span className="absolute inset-0 rounded-full bg-ok animate-ping opacity-60"></span>
              <span className="relative w-2 h-2 rounded-full bg-ok"></span>
            </span>
            {t.hero.badge}
          </p>

          <h1 className="mt-7 text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[4.25rem] lg:leading-[0.98] font-medium tracking-[-0.045em] text-balance">
            {t.hero.title1} {t.hero.title2}
          </h1>

          <p className="mt-7 max-w-[33rem] text-base sm:text-lg leading-relaxed text-muted">
            <span className="text-ink">{t.hero.hello}</span> {t.hero.desc}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappLink(t.hero.waMessage)}
              onClick={trackWhatsApp('inicio')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <WhatsAppIcon className="w-[18px] h-[18px]" />
              {t.hero.ctaWhatsapp}
            </a>
            <button type="button" onClick={() => scrollToSection('proyectos')} className="btn btn-secondary group">
              {t.hero.ctaProjects}
              <ArrowIcon className="w-4 h-4 rotate-90 transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 label">
            <span>{t.hero.location}</span>
            <a
              href={CV_URL}
              download={CV_FILENAME}
              onClick={trackCV('inicio')}
              className="inline-flex items-center gap-1.5 text-muted hover:text-ink transition-colors"
            >
              <DownloadIcon className="w-3.5 h-3.5" />
              {t.hero.cv}
            </a>
          </div>
        </div>

        {isDesktop ? (
          <div ref={sceneRef} className="relative lg:col-span-6 h-[520px] xl:h-[600px]">
            {webgl ? (
              <>
                {/* Soft studio light on the floor under the devices */}
                <div
                  className={`absolute left-[4%] right-[4%] top-[52%] h-[34%] rounded-[50%] pointer-events-none transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}
                  style={{ background: 'radial-gradient(closest-side, rgba(255,255,255,0.075), rgba(255,255,255,0.02) 60%, transparent)' }}
                  aria-hidden="true"
                ></div>
                {/* Wider than the column, out to the edge of the window, so turning the devices never crops them */}
                <div
                  className={`absolute inset-y-0 -left-[22%] transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
                  style={{ right: 'calc(-1 * max(2.5rem, (100vw - 1240px) / 2 + 2.5rem))' }}
                >
                  <Suspense fallback={null}>
                    <DeviceScene
                      projects={showcase}
                      index={index}
                      frame={sceneRef}
                      active={visible}
                      reduced={reduced}
                      onReady={onReady}
                      onInteract={onInteract}
                      onOpen={openCurrent}
                    />
                  </Suspense>
                </div>
                <p
                  className={`label absolute right-0 bottom-4 pointer-events-none transition-opacity duration-500 ${
                    ready && !dragged ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden="true"
                >
                  {t.hero.drag}
                </p>
              </>
            ) : (
              <div className="absolute inset-0 grid place-items-center">
                <img
                  src={current.image}
                  alt={current.name}
                  width="1200"
                  height="750"
                  className="w-full h-auto rounded-md border border-line"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="pb-14">
            <PhoneShowcase t={t} scrollToSection={scrollToSection} />
          </div>
        )}
      </div>

      {/* Recent work: drives what the devices show */}
      {isDesktop && (
        <div className="border-t border-line">
          <ol className="wrap grid grid-cols-4 list-none">
            {showcase.map((project, i) => {
              const active = i === index
              return (
                <li key={project.key} className={`relative ${i > 0 ? 'border-l border-line' : ''}`}>
                  <button
                    type="button"
                    onClick={() => (active ? openCurrent() : setIndex(i))}
                    aria-current={active}
                    className={`group w-full h-[7.5rem] text-left flex flex-col justify-between py-5 ${i > 0 ? 'pl-6' : ''} pr-6 transition-colors ${
                      active ? 'text-ink' : 'text-faint hover:text-muted'
                    }`}
                  >
                    <span className="flex items-center justify-between font-mono text-xs">
                      <span className={active ? 'text-accent' : ''}>0{i + 1}</span>
                      <ArrowIcon className={`w-3.5 h-3.5 -rotate-45 transition-opacity ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`} />
                    </span>
                    <span>
                      <span className="block text-[0.95rem] font-medium tracking-tight">{project.name}</span>
                      <span className="block text-[0.82rem] leading-snug text-faint mt-0.5">{t.projects.items[project.key].subtitle}</span>
                    </span>
                  </button>
                  {active && (
                    <span
                      key={`${index}-${visible}`}
                      onAnimationEnd={next}
                      style={{ '--progress-duration': `${SLIDE_MS}ms`, animationPlayState: visible && ready ? 'running' : 'paused' }}
                      className="progress-bar absolute -top-px left-0 right-0 h-px bg-accent"
                      aria-hidden="true"
                    ></span>
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      )}
    </header>
  )
}
