export const WHATSAPP_NUMBER = '51922863400'
export const WHATSAPP_DISPLAY = '+51 922 863 400'
export const EMAIL = 'ariancerna.dev@gmail.com'
export const GITHUB_URL = 'https://github.com/ariancerna'
export const CV_URL = '/cv-arian-cerna.pdf'
export const CV_FILENAME = 'CV-Arian-Cerna-Martinez.pdf'

export const whatsappLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`
