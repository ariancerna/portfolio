import { useEffect, useState } from 'react'
import { whatsappLink } from '../lib/contact'
import { WhatsAppIcon } from './Icons'

export default function Navigation({ t, lang, setLang, scrollToSection }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { id: 'servicios', label: t.nav.servicios },
    { id: 'proyectos', label: t.nav.proyectos },
    { id: 'sobre', label: t.nav.sobre },
    { id: 'habilidades', label: t.nav.habilidades },
    { id: 'contacto', label: t.nav.contacto },
  ]

  const handleNav = (id) => {
    scrollToSection(id)
    setMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-10 py-3.5 transition-colors duration-300 ${
        scrolled || menuOpen ? 'bg-dark-bg/80 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <button
        type="button"
        className="font-black text-lg text-white"
        onClick={() => handleNav('inicio')}
        aria-label="Inicio"
      >
        ac<span className="bg-gradient-to-r from-purple to-cyan bg-clip-text text-transparent">.</span>
      </button>

      <div className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-1 py-1 font-semibold text-xs">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleNav(item.id)}
            className="text-white/70 px-4 py-2 rounded-full hover:text-white hover:bg-white/[0.08] transition"
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2.5">
        <div className="flex items-center font-semibold text-xs border border-white/15 rounded-full p-1 select-none" role="group" aria-label="Idioma / Language">
          {['es', 'en'].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              aria-pressed={lang === code}
              className={`px-2.5 py-1 rounded-full transition uppercase ${lang === code ? 'text-dark-bg bg-gradient-to-r from-purple to-cyan' : 'text-white/55'}`}
            >
              {code}
            </button>
          ))}
        </div>

        <a
          href={whatsappLink(t.hero.waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 font-semibold text-xs text-dark-bg bg-gradient-to-r from-purple to-cyan px-4 py-2.5 rounded-full hover:shadow-[0_8px_30px_rgba(139,92,246,0.45)] transition"
        >
          <WhatsAppIcon className="w-4 h-4" />
          {t.nav.cta}
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 border border-white/15 rounded-full"
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <span className={`block w-4 h-0.5 bg-white transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-4 h-0.5 bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-4 h-0.5 bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-dark-bg/95 backdrop-blur-xl border-b border-white/10 flex flex-col py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNav(item.id)}
              className="text-white/80 px-6 py-3 text-left font-semibold text-sm hover:bg-white/[0.06] transition"
            >
              {item.label}
            </button>
          ))}
          <a
            href={whatsappLink(t.hero.waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-5 mt-2 mb-2 inline-flex items-center justify-center gap-2 font-semibold text-sm text-dark-bg bg-gradient-to-r from-purple to-cyan px-4 py-3 rounded-full"
          >
            <WhatsAppIcon className="w-4 h-4" />
            {t.nav.cta}
          </a>
        </div>
      )}
    </nav>
  )
}
