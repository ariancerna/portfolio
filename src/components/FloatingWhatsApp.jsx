import { useEffect, useState } from 'react'
import { trackWhatsApp, whatsappLink } from '../lib/contact'
import { WhatsAppIcon } from './Icons'

// Appears once the visitor scrolls past the hero.
export default function FloatingWhatsApp({ t }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={whatsappLink(t.hero.waMessage)}
      onClick={trackWhatsApp('boton-flotante')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.floating}
      tabIndex={visible ? 0 : -1}
      className={`fixed z-40 bottom-5 right-5 inline-flex items-center gap-2 h-12 px-3.5 sm:pr-4 rounded-full bg-[#25d366] text-[#06200f] text-sm font-medium border border-black/20 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.8)] transition duration-300 hover:bg-[#3be07a] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <WhatsAppIcon className="w-5 h-5" />
      <span className="hidden sm:inline">{t.floating}</span>
    </a>
  )
}
