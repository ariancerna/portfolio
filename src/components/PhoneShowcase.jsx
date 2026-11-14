import { useCallback, useEffect, useRef, useState } from 'react'
import { showcase } from '../data/projects'

const AUTO_MS = 3600
const PAUSE_AFTER_TOUCH_MS = 7000

// Phone mockup that cycles through real project screenshots.
// Used on phones instead of the 3D scene: just images and CSS, so it stays smooth.
export default function PhoneShowcase({ t, scrollToSection }) {
  const track = useRef(null)
  const [index, setIndex] = useState(0)
  const pausedUntil = useRef(0)

  const goTo = useCallback((i) => {
    const el = track.current
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      if (Date.now() < pausedUntil.current || document.hidden) return
      const el = track.current
      if (!el) return
      const current = Math.round(el.scrollLeft / el.clientWidth)
      goTo((current + 1) % showcase.length)
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

  const current = showcase[index] ?? showcase[0]

  return (
    <div className="border-t border-line pt-10">
      <div className="flex items-end gap-6">
        <div className="shrink-0 w-[188px] rounded-[2rem] p-[6px] bg-raise border border-line-strong">
          <div className="relative flex flex-col rounded-[1.65rem] overflow-hidden bg-black aspect-[390/844]">
            <div className="relative shrink-0 h-[22px]" aria-hidden="true">
              <span className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[50px] h-[13px] rounded-full bg-[#101010]"></span>
            </div>
            <div
              ref={track}
              onScroll={onScroll}
              onTouchStart={pause}
              onPointerDown={pause}
              className="no-scrollbar flex flex-1 min-h-0 overflow-x-auto snap-x snap-mandatory"
              aria-roledescription="carrusel"
            >
              {showcase.map((project, i) => (
                <button
                  key={project.key}
                  type="button"
                  onClick={() => scrollToSection(project.anchor)}
                  className="shrink-0 w-full h-full snap-center"
                  aria-label={project.name}
                >
                  <img
                    src={project.mobile}
                    alt={`${project.name} en el celular`}
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

        <div className="min-w-0 pb-2" aria-live="polite">
          <p className="font-mono text-xs text-accent">
            0{index + 1}
            <span className="text-faint"> / 0{showcase.length}</span>
          </p>
          <p className="mt-3 text-lg font-medium tracking-tight leading-tight">{current.name}</p>
          <p className="mt-1 text-sm leading-snug text-muted">{t.projects.items[current.key]?.subtitle}</p>
          <div className="mt-5 flex items-center gap-1.5">
            {showcase.map((project, i) => (
              <button
                key={project.key}
                type="button"
                onClick={() => {
                  pause()
                  goTo(i)
                }}
                aria-label={project.name}
                aria-current={i === index}
                className="py-2"
              >
                <span className={`block h-px transition-all duration-300 ${i === index ? 'w-7 bg-accent' : 'w-4 bg-line-strong'}`}></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
