import { useEffect, useState } from 'react'
import { whatsappLink } from '../lib/contact'
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
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.floating}
      tabIndex={visible ? 0 : -1}
      className={`fixed z-40 bottom-5 right-5 inline-flex items-center gap-2 font-semibold text-sm text-white bg-[#25d366] rounded-full p-3.5 sm:pl-4 sm:pr-5 shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:-translate-y-0.5 transition duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <WhatsAppIcon className="w-6 h-6" />
      <span className="hidden sm:inline">{t.floating}</span>
    </a>
  )
}
