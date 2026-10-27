import { useCallback, useEffect, useRef, useState } from 'react'

const slides = [
  { key: 'titan', name: 'Titan Gym', anchor: 'proyecto-titan', img: '/projects/mobile/titan-gym.webp' },
  { key: 'bloome', name: 'Bloomé Flores', anchor: 'proyecto-bloome', img: '/projects/mobile/bloome-flores.webp' },
  { key: 'iglesia', name: 'Jesucristo Fuente de Vida', anchor: 'proyecto-iglesia', img: '/projects/mobile/iglesia.webp' },
  { key: 'voley', name: 'El Golazo Club', anchor: 'proyecto-voley', img: '/projects/mobile/voley-club.webp' },
]

const AUTO_MS = 3200
const PAUSE_AFTER_TOUCH_MS = 7000

// Phone mockup that cycles through real project screenshots.
// Used on phones instead of the 3D scene: just images and CSS, so it stays smooth.
export default function PhoneShowcase({ t, scrollToSection }) {
  const track = useRef(null)
  const [index, setIndex] = useState(0)
  const pausedUntil = useRef(0)

  const goTo = useCallback((i) => {
    const el = track.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      if (Date.now() < pausedUntil.current || document.hidden) return
      const el = track.current
      if (!el) return
      const current = Math.round(el.scrollLeft / el.clientWidth)
      goTo((current + 1) % slides.length)
    }, AUTO_MS)
    return () => clearInterval(id)
  }, [goTo])

  const onScroll = () => {
    const el = track.current
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth))
  }

  const pause = () => {
    pausedUntil.current = Date.now() + PAUSE_AFTER_TOUCH_MS
  }

  const current = slides[index] ?? slides[0]

  return (
    <div className="relative flex flex-col items-center">
      <div
        className="absolute top-8 w-64 h-64 rounded-full blur-[50px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,.45), rgba(34,211,238,.15) 55%, transparent 70%)' }}
        aria-hidden="true"
      ></div>

      <div className="phone-float relative w-[208px] rounded-[2.3rem] p-[7px] bg-gradient-to-b from-[#2a2638] to-[#141220] border border-white/15 shadow-[0_30px_70px_-20px_rgba(139,92,246,0.55)]">
        <div className="relative flex flex-col rounded-[1.9rem] overflow-hidden bg-black aspect-[390/844]">
          <div className="relative shrink-0 h-[26px] flex items-center justify-between px-5 text-[9px] font-semibold text-white/85" aria-hidden="true">
            <span>9:41</span>
            <span className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[58px] h-[16px] rounded-full bg-[#0b0b0f] ring-1 ring-white/5"></span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-[7px] rounded-[2px] border border-white/70 relative"><span className="absolute inset-[1px] right-[3px] bg-white/80 rounded-[1px]"></span></span>
            </span>
          </div>
          <div
            ref={track}
            onScroll={onScroll}
            onTouchStart={pause}
            onPointerDown={pause}
            className="no-scrollbar flex flex-1 min-h-0 overflow-x-auto snap-x snap-mandatory"
            aria-roledescription="carrusel"
          >
            {slides.map((slide, i) => (
              <button
                key={slide.key}
                type="button"
                onClick={() => scrollToSection(slide.anchor)}
                className="shrink-0 w-full h-full snap-center"
                aria-label={slide.name}
              >
                <img
                  src={slide.img}
                  alt={`${slide.name} en el celular`}
                  width="450"
                  height="974"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="block w-full h-full object-cover object-top"
                  draggable="false"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 text-center min-h-[3rem]" aria-live="polite">
        <div className="font-bold text-white">{current.name}</div>
        <div className="text-sm text-white/50">{t.projects.items[current.key]?.subtitle}</div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.key}
            type="button"
            onClick={() => {
              pause()
              goTo(i)
            }}
            aria-label={slide.name}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-gradient-to-r from-purple to-cyan' : 'w-1.5 bg-white/25'}`}
          ></button>
        ))}
      </div>
    </div>
  )
}
