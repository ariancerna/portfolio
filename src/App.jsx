import { useState, useEffect, useRef } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { translations } from './i18n/translations'

function App() {
  const [lang, setLang] = useState('es')

  useEffect(() => {
    const saved = localStorage.getItem('ac-portfolio-lang')
    if (saved) setLang(saved)
  }, [])

  const toggleLang = () => {
    const newLang = lang === 'es' ? 'en' : 'es'
    setLang(newLang)
    localStorage.setItem('ac-portfolio-lang', newLang)
  }

  const t = translations[lang]

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white font-sora overflow-x-clip">
      <Navigation
        t={t}
        lang={lang}
        toggleLang={toggleLang}
        scrollToSection={scrollToSection}
      />
      <Hero t={t} scrollToSection={scrollToSection} />
      <About t={t} />
      <Projects t={t} />
      <Skills t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </div>
  )
}

export default App
