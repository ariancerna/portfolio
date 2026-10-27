import { EMAIL, GITHUB_URL } from '../lib/contact'

export default function Footer({ t }) {
  return (
    <footer className="border-t border-white/7 px-5 sm:px-10 py-8 flex items-center justify-between flex-wrap gap-4 max-w-6xl mx-auto">
      <div className="text-xs text-white/40">© 2026 Arian Cerna · Lima, Perú</div>
      <div className="flex items-center gap-5 text-xs text-white/45">
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-cyan transition">GitHub</a>
        <a href={`mailto:${EMAIL}`} className="hover:text-cyan transition">Email</a>
        <span className="font-mono text-white/30">{t.footer}</span>
      </div>
    </footer>
  )
}
