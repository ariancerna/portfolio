import { useState } from 'react'

export default function Navigation({ t, lang, toggleLang, scrollToSection }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { id: 'inicio', label: t.tNavInicio },
    { id: 'sobre', label: t.tNavSobre },
    { id: 'proyectos', label: t.tNavProyectos },
    { id: 'habilidades', label: t.tNavHabilidades },
    { id: 'contacto', label: t.tNavContacto },
  ]

  const handleNav = (id) => {
    scrollToSection(id)
    setMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-12 py-4 bg-dark-bg/72 backdrop-blur-[16px] border-b border-white/[0.06]">
      <div
        className="font-black text-lg cursor-pointer text-white"
        onClick={() => handleNav('inicio')}
      >
        ac<span className="bg-gradient-to-r from-purple to-cyan bg-clip-text text-transparent">.</span>
      </div>

      <div className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-1 py-1 font-semibold text-xs">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNav(item.id)}
            className="text-white/70 px-4 py-2 rounded-full hover:text-white hover:bg-white/[0.08] transition"
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-0 font-semibold text-xs border border-white/15 rounded-full px-1 py-1 cursor-pointer select-none">
          <button
            onClick={toggleLang}
            className={`px-3 py-1 rounded-full transition ${lang === 'es' ? 'text-dark-bg bg-gradient-to-r from-purple to-cyan' : 'text-white/55 bg-transparent'}`}
          >
            ES
          </button>
          <button
            onClick={toggleLang}
            className={`px-3 py-1 rounded-full transition ${lang === 'en' ? 'text-dark-bg bg-gradient-to-r from-purple to-cyan' : 'text-white/55 bg-transparent'}`}
          >
            EN
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 border border-white/15 rounded-full"
          aria-label="Menu"
        >
          <span className={`block w-4 h-0.5 bg-white transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-4 h-0.5 bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-4 h-0.5 bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-dark-bg/95 backdrop-blur-[16px] border-b border-white/10 flex flex-col py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="text-white/80 px-6 py-3 text-left font-semibold text-sm hover:bg-white/[0.06] transition"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
