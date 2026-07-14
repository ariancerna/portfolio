import { useRef, useState } from 'react'

export default function Contact({ t }) {
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const msgRef = useRef(null)
  const [sent, setSent] = useState(false)

  const handleSubmit = () => {
    const name = nameRef.current?.value || ''
    const email = emailRef.current?.value || ''
    const message = msgRef.current?.value || ''

    const subject = encodeURIComponent(`Contacto desde tu portafolio — ${name}`)
    const body = encodeURIComponent(`${message}\n\n${name}${email ? ' · ' + email : ''}`)

    window.location.href = `mailto:swiftdeskk@gmail.com?subject=${subject}&body=${body}`

    setSent(true)
    setTimeout(() => setSent(false), 2500)
  }

  const contacts = [
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="2.5" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      ),
      label: 'swiftdeskk@gmail.com', href: 'mailto:swiftdeskk@gmail.com', bg: 'bg-purple/15', border: 'border-purple/30', hover: 'hover:text-cyan'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
          <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.12-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.77.84 1.24 1.92 1.24 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
        </svg>
      ),
      label: 'github.com/swiftdeskk', href: 'https://github.com/swiftdeskk', bg: 'bg-cyan/12', border: 'border-cyan/30', hover: 'hover:text-cyan'
    },
  ]

  return (
    <section id="contacto" className="relative max-w-4xl mx-auto px-8 py-24 overflow-visible">
      <div
        className="absolute -bottom-20 -right-16 w-[420px] h-[420px] rounded-full blur-[50px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,.15), transparent 65%)' }}
      ></div>

      <div className="text-cyan font-bold text-xs tracking-widest mb-3">{t.tContKicker}</div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-1">
          <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-5">{t.tContTitulo}</h2>
          <p className="text-base font-light leading-relaxed text-white/55 mb-8">{t.tContDesc}</p>

          <div className="space-y-3">
            {contacts.map((contact, i) => (
              <a
                key={i}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`flex items-center gap-3 font-medium text-sm text-white/80 transition ${contact.hover}`}
              >
                <span className={`w-10 h-10 rounded-2xl ${contact.bg} border ${contact.border} grid place-items-center text-base font-bold`}>
                  {contact.icon}
                </span>
                {contact.label}
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white/3 backdrop-blur-2xl border border-white/10 rounded-3xl p-9">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                ref={nameRef}
                type="text"
                placeholder={t.tFormNombre}
                className="bg-white/5 border border-white/12 rounded-2xl px-4 py-3 text-sm font-normal text-white placeholder-white/30 transition focus:border-purple/70 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
              />
              <input
                ref={emailRef}
                type="email"
                placeholder={t.tFormEmail}
                className="bg-white/5 border border-white/12 rounded-2xl px-4 py-3 text-sm font-normal text-white placeholder-white/30 transition focus:border-purple/70 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
              />
            </div>
            <textarea
              ref={msgRef}
              placeholder={t.tFormMensaje}
              rows="6"
              className="w-full bg-white/5 border border-white/12 rounded-2xl px-4 py-3 text-sm font-normal text-white placeholder-white/30 resize-vertical transition focus:border-purple/70 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
            ></textarea>
            <button
              onClick={handleSubmit}
              className="w-full text-center font-bold text-sm text-dark-bg bg-gradient-to-r from-purple to-cyan py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition"
            >
              {sent ? t.tFormEnviado : t.tFormEnviar}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
