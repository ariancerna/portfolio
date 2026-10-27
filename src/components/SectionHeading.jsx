import Reveal from './Reveal'

export default function SectionHeading({ kicker, title, desc, className = '' }) {
  return (
    <Reveal className={`mb-12 max-w-2xl ${className}`}>
      <div className="text-cyan font-bold text-xs tracking-[0.2em] mb-3">{kicker}</div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-balance">{title}</h2>
      {desc && <p className="mt-4 text-base font-light leading-relaxed text-white/55">{desc}</p>}
    </Reveal>
  )
}
