// Brand colors that are too dark to read on the page background fall back to the text color.
export function brandColor(icon) {
  const n = parseInt(icon.hex, 16)
  const luminance = 0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)
  return luminance < 70 ? 'var(--color-ink)' : `#${icon.hex}`
}
