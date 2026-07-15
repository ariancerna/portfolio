export default function Skills({ t }) {
  const skillSets = [
    {
      title: 'BACKEND',
      color: 'text-purple',
      borderColor: 'border-purple/30',
      skills: ['Java 21', 'Spring Boot · Security · JPA', 'Python · FastAPI', 'PostgreSQL · MySQL', 'API REST', 'Maven · Apache POI'],
    },
    {
      title: 'FRONTEND',
      color: 'text-cyan',
      borderColor: 'border-cyan/30',
      skills: ['React 19 · Vite', 'React Router', 'JavaScript (ES6+)', 'HTML5 · CSS3', 'Bootstrap · Chart.js'],
    },
    {
      title: t.tHerramientas,
      color: 'text-white/60',
      borderColor: 'border-white/12',
      skills: ['Docker', 'Git · GitHub', 'Node.js · Electron', 'Linux · Bash', t.tMetodologias],
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
    </section>
  )
}
