import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Skills({ t }) {
  const s = t.skills
  const skillSets = [
    {
      title: 'FRONTEND',
      color: 'text-cyan',
      skills: ['React 19 · Vite', 'Next.js · App Router', 'TypeScript · JavaScript', 'Tailwind CSS', 'TanStack Query · React Router', 'React Hook Form · Zod', 'Three.js · React Three Fiber', 'PWA'],
    },
    {
      title: 'BACKEND',
      color: 'text-purple-300',
      skills: ['Java 21 · Spring Boot · Security', 'Python · FastAPI · SQLAlchemy', 'Node.js · Express', 'Prisma · Supabase', 'PostgreSQL · MySQL', 'API REST · JWT · Auth.js', 'OpenAPI · Swagger'],
    },
    {
      title: s.tools,
      color: 'text-white/60',
      skills: ['Docker · Docker Compose', 'nginx · SSL', 'Vercel · Railway', 'Git · GitHub', 'JUnit 5 · Mockito', 'Vitest · Playwright', 'Electron', s.methods],
    },
  ]

  return (
    <section id="habilidades" className="relative max-w-6xl mx-auto px-5 sm:px-8 py-24">
      <SectionHeading kicker={s.kicker} title={s.title} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {skillSets.map((set, i) => (
          <Reveal key={set.title} delay={i * 90}>
            <div className="h-full bg-white/[0.03] border border-white/10 rounded-3xl p-7">
              <div className={`font-bold text-xs tracking-[0.2em] mb-5 ${set.color}`}>{set.title}</div>
              <ul className="space-y-3 list-none p-0 m-0">
                {set.skills.map((skill) => (
                  <li key={skill} className="font-medium text-[15px] text-white/80">{skill}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-5">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-7">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
            <div className="font-bold text-xs tracking-[0.2em] text-cyan">{s.certKicker}</div>
            <div className="font-medium text-xs text-white/40">Cisco Networking Academy</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {s.certs.map((cert) => (
              <div
                key={cert.name}
                className="flex items-start justify-between gap-4 bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 transition hover:border-cyan/45"
              >
                <span className="font-medium text-sm leading-snug text-white/80">{cert.name}</span>
                <span className="font-mono text-xs text-white/40 shrink-0 pt-0.5">{cert.date}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
