// Brand logo from Simple Icons. Very dark brand colors (Next.js, Vercel...)
// are drawn in white so they stay visible on the dark background.
function isDark(hex) {
  const n = parseInt(hex, 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 70
}

export default function TechIcon({ icon, className = 'w-5 h-5', mono = false }) {
  const fill = mono || isDark(icon.hex) ? 'currentColor' : `#${icon.hex}`
  return (
    <svg viewBox="0 0 24 24" className={className} fill={fill} aria-hidden="true">
      <path d={icon.path} />
    </svg>
  )
}
