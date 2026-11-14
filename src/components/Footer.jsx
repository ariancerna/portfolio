import { EMAIL, GITHUB_URL, whatsappLink } from '../lib/contact'

export default function Footer({ t }) {
  return (
    <footer className="border-t border-line">
      <div className="wrap py-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 text-sm text-faint">
        <p>© 2026 Arian Cerna · Lima, Perú</p>
        <ul className="flex items-center gap-6 list-none m-0 p-0">
          <li><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">GitHub</a></li>
          <li><a href={whatsappLink(t.hero.waMessage)} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">WhatsApp</a></li>
          <li><a href={`mailto:${EMAIL}`} className="hover:text-ink transition-colors">Email</a></li>
        </ul>
        <p className="font-mono text-xs">{t.footer}</p>
      </div>
    </footer>
  )
}
