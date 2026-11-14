import { useEffect, useRef, useState } from 'react'

// Fades its children in the first time they scroll into view.
// `tilt` makes them tip up into place, used for screenshots.
export default function Reveal({ children, delay = 0, tilt = false, className = '', as: Tag = 'div' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${tilt ? 'reveal-tilt' : ''} ${shown ? 'reveal-in' : ''} ${className}`}
    >
      {children}
    </Tag>
  )
}
