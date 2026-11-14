import { useState } from 'react'
import { CV_FILENAME, CV_URL, EMAIL, GITHUB_URL, WHATSAPP_DISPLAY, trackCV, trackWhatsApp, whatsappLink } from '../lib/contact'
import { ExternalIcon, WhatsAppIcon } from './Icons'
import Reveal from './Reveal'
import Section from './Section'

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
    trackWhatsApp('formulario')()
    window.open(whatsappLink(buildMessage()), '_blank', 'noopener,noreferrer')
  }

  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(`${c.subject}${name ? `: ${name}` : ''}`)}&body=${encodeURIComponent(buildMessage())}`

  const channels = [
    { label: 'WhatsApp', value: WHATSAPP_DISPLAY, href: whatsappLink(t.hero.waMessage), onClick: trackWhatsApp('contacto'), external: true },
    { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
    { label: 'GitHub', value: 'github.com/ariancerna', href: GITHUB_URL, external: true },
    { label: 'CV', value: c.cv, href: CV_URL, download: CV_FILENAME, onClick: trackCV('contacto') },
  ]

  return (
    <Section id="contacto" index="07" label={c.kicker} title={c.title} desc={c.desc}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-14">
        <Reveal className="lg:col-start-4 lg:col-span-4">
          <a
            href={whatsappLink(t.hero.waMessage)}
            onClick={trackWhatsApp('contacto-boton')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <WhatsAppIcon className="w-[18px] h-[18px]" />
            {c.whatsapp}
          </a>

          <dl className="mt-10 border-t border-line">
            {channels.map((ch) => (
              <div key={ch.label} className="grid grid-cols-[5.25rem_1fr] gap-4 items-baseline py-3.5 border-b border-line">
                <dt className="label">{ch.label}</dt>
                <dd className="m-0 min-w-0">
                  <a
                    href={ch.href}
                    onClick={ch.onClick}
                    download={ch.download}
                    target={ch.external ? '_blank' : undefined}
                    rel={ch.external ? 'noopener noreferrer' : undefined}
                    className="group inline-flex items-center gap-1.5 max-w-full text-[0.95rem] text-muted hover:text-ink transition-colors"
                  >
                    <span className="truncate">{ch.value}</span>
                    {ch.external && <ExternalIcon className="w-3.5 h-3.5 shrink-0 text-faint group-hover:text-ink transition-colors" />}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-5">
          <form onSubmit={sendWhatsapp} className="border border-line rounded-lg p-6 sm:p-8">
            <h3 className="text-lg font-medium tracking-[-0.02em]">{c.formTitle}</h3>

            <label className="block mt-6">
              <span className="label block mb-2">{c.name}</span>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="field" />
            </label>

            <fieldset className="mt-6 border-0 p-0 m-0">
              <legend className="label mb-2.5 p-0">{c.type}</legend>
              <div className="flex flex-wrap gap-2">
                {c.types.map((option) => {
                  const selected = type === option
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setType(selected ? '' : option)}
                      aria-pressed={selected}
                      className={`text-sm rounded-md px-3 py-2 border transition-colors ${
                        selected ? 'bg-ink text-bg border-ink' : 'text-muted border-line-strong hover:border-faint hover:text-ink'
                      }`}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <label className="block mt-6">
              <span className="label block mb-2">{c.message}</span>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="field resize-none"></textarea>
            </label>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <button type="submit" className="btn btn-primary">
                <WhatsAppIcon className="w-[18px] h-[18px]" />
                {c.sendWhatsapp}
              </button>
              <a href={mailHref} className="text-sm text-muted link">
                {c.sendEmail}
              </a>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
