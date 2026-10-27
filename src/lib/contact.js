import { track } from '@vercel/analytics'

export const WHATSAPP_NUMBER = '51922863400'
export const WHATSAPP_DISPLAY = '+51 922 863 400'
export const EMAIL = 'ariancerna.dev@gmail.com'
export const GITHUB_URL = 'https://github.com/ariancerna'
export const CV_URL = '/cv-arian-cerna.pdf'
export const CV_FILENAME = 'CV-Arian-Cerna-Martinez.pdf'

export const whatsappLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`

// Counts WhatsApp clicks in Vercel Analytics, tagged with where on the page they happened.
export const trackWhatsApp = (source) => () => {
  try {
    track('WhatsApp', { source })
  } catch {
    // analytics must never block the link
  }
}

export const trackCV = (source) => () => {
  try {
    track('CV', { source })
  } catch {
    // ignore
  }
}
