export default function Footer({ t }) {
  return (
    <footer className="border-t border-white/7 px-12 py-7 flex items-center justify-between flex-wrap gap-3">
      <div className="text-xs font-normal text-white/40">© 2026 Arian Cerna</div>
      <div className="text-xs font-medium font-mono text-white/35">{t.tFooter}</div>
    </footer>
  )
}
