import { ExternalIcon, GitHubIcon } from './Icons'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import TiltCard from './TiltCard'

const featured = [
  {
    key: 'titan',
    anchor: 'proyecto-titan',
    name: 'Titan Gym',
    badge: 'live',
    image: '/projects/titan-gym.webp',
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
    url: 'voleyclub.vercel.app',
    demo: 'https://voleyclub.vercel.app',
    repo: 'https://github.com/ariancerna/HerramientasDesarrollo_Grupo4_Frontend',
    repoBackend: 'https://github.com/ariancerna/HerramientasDesarrollo_Grupo4_Backend',
    tech: ['Next.js', 'TypeScript', 'Express', 'Supabase', 'Swagger', 'Zod'],
  },
]

const more = [
  { key: 'stg', name: 'STG Inventory Control', meta: 'Spring Boot · React', url: 'https://github.com/ariancerna/tech-store', tech: ['Java 21', 'Spring Security', 'React 19', 'PostgreSQL'] },
  { key: 'vet', name: 'Veterinaria Oyanguren', meta: 'FastAPI · React', url: 'https://github.com/ariancerna/veterinaria-oyanguren', tech: ['Python', 'FastAPI', 'React', 'PostgreSQL'] },
  { key: 'cineclub', name: 'Cineclub Salamanca', meta: 'Spring Boot', url: 'https://github.com/ariancerna/cineclub-salamanca-app', tech: ['Java 21', 'Spring Boot', 'JWT', 'JUnit 5'] },
  { key: 'ecommerce', name: 'E-commerce Inventory', meta: 'Node.js', url: 'https://github.com/ariancerna/ecommerce-inventory-system', tech: ['Node.js', 'Express', 'MySQL', 'JWT'] },
  { key: 'academic', name: 'Academic Management', meta: 'JavaFX', url: 'https://github.com/ariancerna/academic-management-system', tech: ['Java 21', 'JavaFX', 'MySQL', 'SOLID'] },
  { key: 'yt', name: 'YT Downloader', meta: 'Electron · Windows', url: 'https://github.com/ariancerna/youtube-downloader', tech: ['Electron', 'Node.js', 'yt-dlp', 'ffmpeg'] },
]

function Badge({ type, t }) {
  const styles = {
    live: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/30',
    production: 'text-cyan bg-cyan/10 border-cyan/30',
    team: 'text-fuchsia-300 bg-fuchsia-400/10 border-fuchsia-400/30',
  }
  const label = { live: t.projects.live, production: t.projects.production, team: t.projects.team }[type]
  return (
    <span className={`inline-flex items-center gap-1.5 font-bold text-[10px] tracking-wider border rounded-full px-2.5 py-1 ${styles[type]}`}>
      {type !== 'team' && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>}
      {label}
    </span>
  )
}

function BrowserFrame({ project }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/12 bg-[#0f0d1a] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8 bg-white/[0.03]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></span>
        <span className="ml-3 flex-1 min-w-0 truncate text-[11px] font-mono text-white/40 bg-white/5 rounded-md px-3 py-1">{project.url}</span>
      </div>
      <img
        src={project.image}
        alt={`Captura de ${project.name}`}
        width="1200"
        height="750"
        loading="lazy"
        decoding="async"
        className="block w-full h-auto"
      />
    </div>
  )
}

function CheckInMock({ t }) {
  const m = t.projects.mock
  return (
    <div className="rounded-2xl border border-white/12 bg-gradient-to-br from-purple/20 to-cyan/10 p-6 sm:p-10 grid place-items-center aspect-[16/10] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
      <div className="w-full max-w-xs bg-dark-bg/80 border border-white/10 rounded-2xl p-5 font-mono text-sm tilt-pop">
        <div className="flex items-center justify-between border-b border-white/8 pb-2.5 mb-4">
          <span className="text-xs text-white/40">{m.title}</span>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-cyan">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse-dot"></span>
            {m.live}
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-semibold leading-none text-white">74</span>
          <span className="text-base leading-none text-white/35">/ 128</span>
        </div>
        <div className="text-xs text-white/45 mt-1.5 mb-3">{m.checkin}</div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-4">
          <div className="h-full w-[58%] rounded-full bg-gradient-to-r from-purple to-cyan"></div>
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between"><span className="text-white/45">{m.registered}</span><span className="text-white/75">128</span></div>
          <div className="flex justify-between"><span className="text-white/45">{m.payments}</span><span className="text-cyan">92%</span></div>
          <div className="flex justify-between"><span className="text-white/45">{m.roles}</span><span className="text-white/75">RBAC ×3</span></div>
        </div>
      </div>
    </div>
  )
}

function CaseStudy({ project, index, t }) {
  const copy = t.projects.items[project.key]
  const reversed = index % 2 === 1

  return (
    <article id={project.anchor} className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
      <Reveal className={reversed ? 'lg:order-2' : ''}>
        <TiltCard max={7}>
          {project.mock ? <CheckInMock t={t} /> : <BrowserFrame project={project} />}
        </TiltCard>
      </Reveal>

      <Reveal delay={100} className={reversed ? 'lg:order-1' : ''}>
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs text-white/35">0{index + 1}</span>
          <Badge type={project.badge} t={t} />
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{project.name}</h3>
        <p className="mt-1 text-sm font-medium text-cyan/90">{copy.subtitle}</p>

        <dl className="mt-6 space-y-4">
          {[
            [t.projects.problem, copy.problem],
            [t.projects.solution, copy.solution],
            [t.projects.result, copy.result],
          ].map(([label, text], i) => (
            <div key={label} className={`pl-4 border-l-2 ${i === 2 ? 'border-cyan/60' : 'border-white/12'}`}>
              <dt className="text-[11px] font-bold tracking-wider uppercase text-white/40 mb-1">{label}</dt>
              <dd className={`m-0 text-sm leading-relaxed ${i === 2 ? 'text-white/85' : 'text-white/60'} font-light`}>{text}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="font-medium text-xs text-white/70 bg-white/6 border border-white/8 rounded-full px-3 py-1">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-sm text-dark-bg bg-gradient-to-r from-purple to-cyan px-5 py-3 rounded-full hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(139,92,246,0.4)] transition"
            >
              {t.projects.demo} <ExternalIcon className="w-4 h-4" />
            </a>
          )}
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-sm text-white bg-white/6 border border-white/12 px-5 py-3 rounded-full hover:bg-white/10 hover:-translate-y-0.5 transition"
          >
            <GitHubIcon className="w-4 h-4" /> {t.projects.code}
          </a>
          {project.repoBackend && (
            <a
              href={project.repoBackend}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-sm text-white/70 px-3 py-3 hover:text-cyan transition"
            >
              API <ExternalIcon className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </Reveal>
    </article>
  )
}

export default function Projects({ t }) {
  return (
    <section id="proyectos" className="relative max-w-6xl mx-auto px-5 sm:px-8 py-24">
      <SectionHeading kicker={t.projects.kicker} title={t.projects.title} desc={t.projects.desc} />

      <div className="space-y-24 lg:space-y-32">
        {featured.map((project, i) => (
          <CaseStudy key={project.key} project={project} index={i} t={t} />
        ))}
      </div>

      <Reveal className="mt-28 mb-8">
        <h3 className="text-2xl font-black tracking-tight">{t.projects.moreTitle}</h3>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {more.map((project, i) => (
          <Reveal key={project.key} delay={(i % 3) * 80}>
            <TiltCard max={6} className="h-full">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col h-full bg-white/[0.03] border border-white/10 rounded-3xl p-6 hover:border-cyan/40 transition"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h4 className="text-base font-bold text-white">{project.name}</h4>
                  <GitHubIcon className="w-4 h-4 shrink-0 text-white/35" />
                </div>
                <div className="text-[11px] font-mono text-white/40 mb-3">{project.meta}</div>
                <p className="text-sm font-light leading-relaxed text-white/55 mb-5 flex-1">{t.projects.more[project.key]}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-[11px] font-medium text-white/60 bg-white/6 rounded-full px-2.5 py-0.5">
                      {tech}
                    </span>
                  ))}
                </div>
              </a>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <a
          href="https://github.com/ariancerna?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 mt-4 px-5 py-5 border border-dashed border-white/20 rounded-3xl font-bold text-sm text-white/60 hover:border-cyan/60 hover:text-cyan transition"
        >
          {t.projects.seeAll} <ExternalIcon className="w-4 h-4" />
        </a>
      </Reveal>
    </section>
  )
}
