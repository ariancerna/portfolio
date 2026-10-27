import { useState } from 'react'
import { CV_FILENAME, CV_URL, EMAIL, GITHUB_URL, WHATSAPP_DISPLAY, whatsappLink } from '../lib/contact'
import { DownloadIcon, GitHubIcon, MailIcon, WhatsAppIcon } from './Icons'
import Reveal from './Reveal'

const inputClass =
  'w-full bg-white/[0.04] border border-white/12 rounded-2xl px-4 py-3.5 text-sm text-white transition focus:bg-white/[0.06]'

export default function Contact({ t }) {
  const c = t.contact
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [message, setMessage] = useState('')

  const buildMessage = () => {
    const lines = []
    lines.push(name ? `${c.intro} ${name}.` : t.hero.waMessage)
    if (type) lines.push(`${c.need}: ${type}.`)
    if (message) lines.push('', message)
    return lines.join('\n')
  }

  const sendWhatsapp = (e) => {
    e.preventDefault()
    window.open(whatsappLink(buildMessage()), '_blank', 'noopener,noreferrer')
  }

  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(`${c.subject}${name ? `: ${name}` : ''}`)}&body=${encodeURIComponent(buildMessage())}`

  return (
    <section id="contacto" className="relative max-w-6xl mx-auto px-5 sm:px-8 py-24">
      <div
        className="absolute -bottom-10 -right-10 w-[420px] h-[420px] rounded-full blur-[60px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,.12), transparent 65%)' }}
        aria-hidden="true"
      ></div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <Reveal>
          <div className="text-cyan font-bold text-xs tracking-[0.2em] mb-3">{c.kicker}</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight mb-5 text-balance">{c.title}</h2>
          <p className="text-base font-light leading-relaxed text-white/60 mb-8">{c.desc}</p>

          <a
            href={whatsappLink(t.hero.waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 bg-[#25d366]/10 border border-[#25d366]/35 rounded-3xl p-5 hover:bg-[#25d366]/15 hover:border-[#25d366]/60 transition mb-6"
          >
            <span className="w-12 h-12 shrink-0 rounded-2xl grid place-items-center bg-[#25d366] text-white">
              <WhatsAppIcon className="w-6 h-6" />
            </span>
            <span>
              <span className="block font-bold text-white">{c.whatsapp}</span>
              <span className="block font-mono text-sm text-white/55">{WHATSAPP_DISPLAY}</span>
            </span>
          </a>

          <div className="space-y-3">
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 font-medium text-sm text-white/75 hover:text-cyan transition break-all">
              <span className="w-10 h-10 shrink-0 rounded-2xl bg-purple/15 border border-purple/30 grid place-items-center">
                <MailIcon className="w-5 h-5" />
              </span>
              {EMAIL}
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-medium text-sm text-white/75 hover:text-cyan transition">
              <span className="w-10 h-10 shrink-0 rounded-2xl bg-cyan/15 border border-cyan/30 grid place-items-center">
                <GitHubIcon className="w-5 h-5" />
              </span>
              github.com/ariancerna
            </a>
          </div>

          <a
            href={CV_URL}
            download={CV_FILENAME}
            className="inline-flex items-center gap-2.5 mt-8 font-semibold text-sm text-white bg-white/6 border border-white/12 px-6 py-3 rounded-full transition hover:bg-white/10 hover:border-white/25 hover:-translate-y-0.5"
          >
            <DownloadIcon className="w-4 h-4" />
            {c.cv}
          </a>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={sendWhatsapp} className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white mb-2">{c.formTitle}</h3>
            <label className="block">
              <span className="sr-only">{c.name}</span>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={c.name} autoComplete="name" className={inputClass} />
            </label>

            <fieldset>
              <legend className="text-xs font-semibold text-white/45 mb-2.5">{c.type}</legend>
              <div className="flex flex-wrap gap-2">
                {c.types.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setType(type === option ? '' : option)}
                    aria-pressed={type === option}
                    className={`text-xs font-semibold rounded-full px-3.5 py-2 border transition ${
                      type === option
                        ? 'text-dark-bg bg-gradient-to-r from-purple to-cyan border-transparent'
                        : 'text-white/65 bg-white/[0.04] border-white/12 hover:border-white/30'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="block">
              <span className="sr-only">{c.message}</span>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={c.message} rows={5} className={`${inputClass} resize-none`}></textarea>
            </label>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2.5 font-semibold text-sm text-white bg-[#25d366] hover:bg-[#1fbe5b] px-6 py-4 rounded-full transition hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="w-5 h-5" />
              {c.sendWhatsapp}
            </button>
            <a href={mailHref} className="block text-center text-xs font-medium text-white/45 hover:text-cyan transition">
              {c.sendEmail}
            </a>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
