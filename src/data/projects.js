// Case studies shown in the hero devices and in the projects section.
export const featured = [
  {
    key: 'titan',
    anchor: 'proyecto-titan',
    name: 'Titan Gym',
    badge: 'live',
    image: '/projects/titan-gym.webp',
    mobile: '/projects/mobile/titan-gym.webp',
    url: 'titan-gym-tau.vercel.app',
    demo: 'https://titan-gym-tau.vercel.app',
    repo: 'https://github.com/ariancerna/Titan-Gym',
    tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'TanStack Query', 'Playwright'],
  },
  {
    key: 'iglesia',
    anchor: 'proyecto-iglesia',
    name: 'Jesucristo Fuente de Vida',
    badge: 'production',
    image: '/projects/iglesia.webp',
    mobile: '/projects/mobile/iglesia.webp',
    url: 'jesucristofuentedevida.org',
    demo: 'https://jesucristofuentedevida.org',
    repo: 'https://github.com/ariancerna/jesucristo-fuente-de-vida',
    tech: ['React 19', 'React Router 7', 'Vite', 'Tailwind 4', 'SEO · JSON-LD'],
  },
  {
    key: 'churchEvents',
    anchor: 'proyecto-church-events',
    name: 'Church Events',
    badge: 'production',
    mock: true,
    repo: 'https://github.com/ariancerna/church-events',
    tech: ['Next.js 15', 'TypeScript', 'Prisma', 'PostgreSQL', 'Auth.js', 'Docker'],
  },
  {
    key: 'bloome',
    anchor: 'proyecto-bloome',
    name: 'Bloomé Flores',
    badge: 'live',
    image: '/projects/bloome-flores.webp',
    mobile: '/projects/mobile/bloome-flores.webp',
    url: 'bloome-flores.vercel.app',
    demo: 'https://bloome-flores.vercel.app',
    repo: 'https://github.com/ariancerna/bloome-flores',
    tech: ['React 19', 'TypeScript', 'Vite', 'WhatsApp', 'Vercel Analytics'],
  },
  {
    key: 'voley',
    anchor: 'proyecto-voley',
    name: 'El Golazo Club',
    badge: 'team',
    image: '/projects/voley-club.webp',
    mobile: '/projects/mobile/voley-club.webp',
    url: 'voleyclub.vercel.app',
    demo: 'https://voleyclub.vercel.app',
    repo: 'https://github.com/ariancerna/HerramientasDesarrollo_Grupo4_Frontend',
    repoBackend: 'https://github.com/ariancerna/HerramientasDesarrollo_Grupo4_Backend',
    tech: ['Next.js', 'TypeScript', 'Express', 'Supabase', 'Swagger', 'Zod'],
  },
]

// Projects with both a desktop and a phone screenshot, used by the hero devices.
export const showcase = featured.filter((p) => p.image && p.mobile)

export const more = [
  { key: 'stg', name: 'STG Inventory Control', url: 'https://github.com/ariancerna/tech-store', tech: 'Java · Spring Boot · React' },
  { key: 'vet', name: 'Veterinaria Oyanguren', url: 'https://github.com/ariancerna/veterinaria-oyanguren', tech: 'Python · FastAPI · React' },
  { key: 'cineclub', name: 'Cineclub Salamanca', url: 'https://github.com/ariancerna/cineclub-salamanca-app', tech: 'Java · Spring Boot · JUnit 5' },
  { key: 'ecommerce', name: 'E-commerce Inventory', url: 'https://github.com/ariancerna/ecommerce-inventory-system', tech: 'Node.js · Express · MySQL' },
  { key: 'academic', name: 'Academic Management', url: 'https://github.com/ariancerna/academic-management-system', tech: 'Java · JavaFX · MySQL' },
  { key: 'yt', name: 'YT Downloader', url: 'https://github.com/ariancerna/youtube-downloader', tech: 'Electron · Node.js' },
]
