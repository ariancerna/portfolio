import { useEffect, useState } from 'react'
import { trackWhatsApp, whatsappLink } from '../lib/contact'

export default function Navigation({ t, lang, setLang, scrollToSection }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { id: 'servicios', label: t.nav.servicios },
    { id: 'proyectos', label: t.nav.proyectos },
    { id: 'precios', label: t.nav.precios },
    { id: 'sobre', label: t.nav.sobre },
    { id: 'habilidades', label: t.nav.habilidades },
    { id: 'contacto', label: t.nav.contacto },
  ]

  const go = (id) => {
    scrollToSection(id)
    setMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 border-b transition-colors duration-300 ${
        scrolled || menuOpen ? 'bg-bg border-line' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="wrap h-14 flex items-center justify-between gap-6">
        <button type="button" onClick={() => go('inicio')} className="font-medium tracking-tight text-[0.95rem]">
          Arian Cerna
        </button>

        <div className="flex items-center gap-6">
          <ul className="hidden lg:flex items-center gap-6 list-none m-0 p-0 text-sm text-muted">
            {navItems.map((item) => (
              <li key={item.id}>
                <button type="button" onClick={() => go(item.id)} className="hover:text-ink transition-colors">
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 font-mono text-xs" role="group" aria-label="Idioma / Language">
            {['es', 'en'].map((code, i) => (
              <span key={code} className="flex items-center gap-1">
                {i > 0 && <span className="text-line-strong" aria-hidden="true">/</span>}
                <button
                  type="button"
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  className={`uppercase px-1 py-1 transition-colors ${lang === code ? 'text-ink' : 'text-faint hover:text-muted'}`}
                >
                  {code}
                </button>
              </span>
            ))}
          </div>

          <a
            href={whatsappLink(t.hero.waMessage)}
            onClick={trackWhatsApp('nav')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-secondary hidden sm:inline-flex"
          >
            {t.nav.cta}
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative w-9 h-9 -mr-2 grid place-items-center"
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className={`absolute w-5 h-px bg-ink transition-transform ${menuOpen ? 'rotate-45' : '-translate-y-[4px]'}`}></span>
            <span className={`absolute w-5 h-px bg-ink transition-transform ${menuOpen ? '-rotate-45' : 'translate-y-[4px]'}`}></span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-line bg-bg">
          <ul className="wrap list-none py-3">
            {navItems.map((item, i) => (
              <li key={item.id} className={i > 0 ? 'border-t border-line' : ''}>
                <button type="button" onClick={() => go(item.id)} className="w-full flex items-center justify-between py-3.5 text-left text-lg tracking-tight">
                  {item.label}
                  <span className="font-mono text-xs text-faint">0{i + 1}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="wrap pb-5">
            <a
              href={whatsappLink(t.hero.waMessage)}
              onClick={trackWhatsApp('menu-movil')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
