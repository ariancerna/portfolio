import { useRef } from 'react'

// Tilts its content in 3D toward the pointer. Children with the `tilt-layer`
// class sit closer to the viewer, so they shift with real depth.
// Only reacts to a real mouse; touch devices see the static composition.
export default function Tilt({ children, className = '', max = 6 }) {
  const ref = useRef(null)

  const canTilt = () =>
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const onMove = (e) => {
    const el = ref.current
    if (!el || !canTilt()) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.classList.add('is-tracking')
    el.style.setProperty('--rx', `${-py * max}deg`)
    el.style.setProperty('--ry', `${px * max}deg`)
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.classList.remove('is-tracking')
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <div className="tilt-wrap">
      <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`tilt ${className}`}>
        {children}
      </div>
    </div>
  )
}
