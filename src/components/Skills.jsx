export default function Skills({ t }) {
  const skillSets = [
    {
      title: 'BACKEND',
      color: 'text-purple',
      borderColor: 'border-purple/30',
      skills: ['Java 21', 'Spring Boot · Security · JPA', 'Python · FastAPI · Pydantic', 'SQLAlchemy · Alembic', 'Node.js · Express', 'PostgreSQL · MySQL', 'API REST · JWT', 'Maven · Apache POI'],
    },
    {
      title: 'FRONTEND',
      color: 'text-cyan',
      borderColor: 'border-cyan/30',
      skills: ['React 19 · Vite', 'React Router', 'JavaScript (ES6+)', 'HTML5 · CSS3', 'Tailwind CSS · Bootstrap', 'Chart.js · Font Awesome'],
    },
    {
      title: t.tHerramientas,
      color: 'text-white/60',
      borderColor: 'border-white/12',
      skills: ['Docker · Docker Compose', 'Git · GitHub', 'Electron', 'JUnit 5 · Mockito', 'Linux · Bash', t.tMetodologias],
    },
  ]

  return (
    <section id="habilidades" className="relative max-w-4xl mx-auto px-8 py-24">
      <div className="text-cyan font-bold text-xs tracking-widest mb-3">{t.tHabKicker}</div>
      <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-12">{t.tHabTitulo}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {skillSets.map((set, i) => (
          <div key={i} className={`bg-white/3 border ${set.borderColor} rounded-3xl p-8`}>
            <div className={`font-bold text-xs tracking-widest mb-5 ${set.color}`}>{set.title}</div>
            <div className="space-y-3">
              {set.skills.map((skill, j) => (
                <div key={j} className="font-medium text-base text-white/80">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 bg-white/3 border border-white/12 rounded-3xl p-8">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
          <div className="font-bold text-xs tracking-widest text-cyan">{t.tCertKicker}</div>
          <div className="font-medium text-xs text-white/40">Cisco Networking Academy</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {t.certificaciones.map((cert, i) => (
            <div
              key={i}
              className={`flex items-start justify-between gap-4 bg-white/4 border border-white/10 rounded-2xl px-5 py-4 transition hover:border-cyan/45 hover:bg-white/6 ${
                t.certificaciones.length % 2 === 1 && i === t.certificaciones.length - 1 ? 'sm:col-span-2' : ''
              }`}
            >
              <span className="font-medium text-sm leading-snug text-white/80">{cert.name}</span>
              <span className="font-mono text-xs text-white/40 shrink-0 pt-0.5">{cert.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
