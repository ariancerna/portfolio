import { useEffect, useState } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Services from './components/Services'
import Projects from './components/Projects'
import Process from './components/Process'
import Pricing from './components/Pricing'
import About from './components/About'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import { translations } from './i18n/translations'

const LANG_KEY = 'ac-portfolio-lang'

function readSavedLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY)
    if (saved === 'es' || saved === 'en') return saved
  } catch {
    // storage can be blocked; fall back to Spanish
  }
  return 'es'
}

function App() {
  const [lang, setLangState] = useState(readSavedLang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (next) => {
    setLangState(next)
    try {
      localStorage.setItem(LANG_KEY, next)
    } catch {
      // ignore
    }
  }

  const t = translations[lang]

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white font-sora overflow-x-clip">
      <Navigation t={t} lang={lang} setLang={setLang} scrollToSection={scrollToSection} />
      <main>
        <Hero t={t} scrollToSection={scrollToSection} />
        <Services t={t} scrollToSection={scrollToSection} />
        <Projects t={t} />
        <Process t={t} />
        <Pricing t={t} />
        <About t={t} />
        <Skills t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
      <FloatingWhatsApp t={t} />
    </div>
  )
}

export default App
