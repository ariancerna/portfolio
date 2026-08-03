export default function Projects({ t }) {
  const projects = [
    {
      id: 1,
      featured: true,
      name: 'Church Events',
      desc: t.tProy8Desc,
      icon: 'CE',
      gradient: 'from-purple to-cyan',
      url: 'https://github.com/ariancerna/church-events',
      tech: ['Next.js 15', 'TypeScript', 'Prisma', 'PostgreSQL 16', 'Auth.js v5', 'Docker'],
      borderColor: 'border-purple/35',
      hoverBorder: 'hover:border-purple/70',
      hoverShadow: 'hover:shadow-[0_18px_60px_rgba(139,92,246,0.2)]',
    },
    {
      id: 2,
      featured: false,
      name: 'STG Inventory Control',
      desc: t.tProy1Desc,
      icon: 'ST',
      gradient: 'from-purple to-cyan',
      url: 'https://github.com/ariancerna/tech-store',
      tech: ['Java 21', 'Spring Boot', 'Spring Security', 'React 19', 'PostgreSQL', 'Docker'],
      borderColor: 'border-purple/35',
      hoverBorder: 'hover:border-purple/70',
      hoverShadow: 'hover:shadow-[0_18px_60px_rgba(139,92,246,0.2)]',
      version: 'web · Spring Boot',
    },
    {
      id: 3,
      featured: false,
      name: 'Veterinaria Oyanguren',
      desc: t.tProy4Desc,
      icon: 'VO',
      gradient: 'from-purple to-cyan',
      url: 'https://github.com/ariancerna/veterinaria-oyanguren',
      tech: ['Python', 'FastAPI', 'React 18', 'PostgreSQL', 'JWT', 'Docker'],
      borderColor: 'border-purple/35',
      hoverBorder: 'hover:border-purple/70',
      hoverShadow: 'hover:shadow-[0_18px_60px_rgba(139,92,246,0.2)]',
      version: 'web · full-stack',
    },
    {
      id: 4,
      featured: false,
      name: 'Cineclub Salamanca',
      desc: t.tProy5Desc,
      icon: 'CS',
      gradient: 'from-cyan to-purple',
      url: 'https://github.com/ariancerna/cineclub-salamanca-app',
      tech: ['Java 21', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'JWT', 'Docker'],
      borderColor: 'border-cyan/30',
      hoverBorder: 'hover:border-cyan/70',
      hoverShadow: 'hover:shadow-[0_18px_60px_rgba(34,211,238,0.15)]',
      version: 'web · Java 21',
    },
    {
      id: 5,
      featured: false,
      name: 'Jesucristo Fuente de Vida',
      desc: t.tProy3Desc,
      icon: 'FV',
      gradient: 'from-cyan to-purple',
      url: 'https://github.com/ariancerna/jesucristo-fuente-de-vida',
      tech: ['React 19', 'React Router 7', 'Vite 6', 'Tailwind 4', 'Vercel'],
      borderColor: 'border-cyan/30',
      hoverBorder: 'hover:border-cyan/70',
      hoverShadow: 'hover:shadow-[0_18px_60px_rgba(34,211,238,0.15)]',
      version: `web · ${t.tEnProduccion}`,
    },
    {
      id: 6,
      featured: false,
      name: 'Academic Management',
      desc: t.tProy7Desc,
      icon: 'AM',
      gradient: 'from-cyan to-purple',
      url: 'https://github.com/ariancerna/academic-management-system',
      tech: ['Java 21', 'JavaFX', 'MySQL', 'SOLID', 'GoF Patterns'],
      borderColor: 'border-cyan/30',
      hoverBorder: 'hover:border-cyan/70',
      hoverShadow: 'hover:shadow-[0_18px_60px_rgba(34,211,238,0.15)]',
      version: 'desktop · JavaFX',
    },
    {
      id: 7,
      featured: false,
      name: 'E-commerce Inventory',
      desc: t.tProy6Desc,
      icon: 'EC',
      gradient: 'from-purple to-cyan',
      url: 'https://github.com/ariancerna/ecommerce-inventory-system',
      tech: ['Node.js', 'Express', 'MySQL', 'JWT', 'JavaScript'],
      borderColor: 'border-white/12',
      hoverBorder: 'hover:border-purple/60',
      hoverShadow: 'hover:shadow-[0_18px_60px_rgba(139,92,246,0.15)]',
      version: 'web · ventas',
    },
    {
      id: 8,
      featured: false,
      name: 'YT Downloader',
      desc: t.tProy2Desc,
      icon: 'YT',
      gradient: 'from-cyan to-cyan',
      url: 'https://github.com/ariancerna/youtube-downloader',
      tech: ['Electron', 'Node.js', 'yt-dlp', 'ffmpeg'],
      borderColor: 'border-white/12',
      hoverBorder: 'hover:border-cyan/60',
      hoverShadow: 'hover:shadow-[0_18px_60px_rgba(34,211,238,0.15)]',
      version: 'v1.0.0 · Windows',
    },
  ]

  return (
    <section id="proyectos" className="relative max-w-4xl mx-auto px-8 py-24">
      <div className="text-cyan font-bold text-xs tracking-widest mb-3">{t.tProyKicker}</div>
      <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-12">{t.tProyTitulo}</h2>

      <a
        href={projects[0].url}
        target="_blank"
        rel="noopener noreferrer"
        className={`grid grid-cols-1 lg:grid-cols-3 gap-0 bg-white/3 border ${projects[0].borderColor} rounded-3xl overflow-hidden mb-5 transition ${projects[0].hoverBorder} ${projects[0].hoverShadow} hover:-translate-y-1`}
      >
        <div className="p-10 lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <span className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${projects[0].gradient} grid place-items-center font-black text-sm text-dark-bg`}>
              {projects[0].icon}
            </span>
            <span className="font-bold text-xs text-purple bg-purple/12 border border-purple/30 rounded-full px-3 py-1">
              {t.tDestacado}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">{projects[0].name}</h3>
          <p className="text-sm font-light leading-relaxed text-white/55 mb-5">{projects[0].desc}</p>
          <div className="flex flex-wrap gap-2">
            {projects[0].tech.map((t, i) => (
              <span key={i} className="font-medium text-xs text-white/70 bg-white/6 rounded-full px-3 py-1">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple/14 to-cyan/6 items-center justify-center min-h-64 p-8 hidden lg:flex">
          <div className="w-full max-w-xs bg-dark-bg/75 border border-white/10 rounded-2xl p-5 font-mono text-sm">
            <div className="flex items-center justify-between border-b border-white/8 pb-2.5 mb-4">
              <span className="text-xs text-white/40">evento · check-in</span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-cyan">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse-dot"></span>
                {t.tEnVivo}
              </span>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-semibold leading-none text-white">74</span>
              <span className="text-base leading-none text-white/35">/ 128</span>
            </div>
            <div className="text-xs text-white/45 mt-1.5 mb-3">{t.tCheckinQr}</div>

            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-4">
              <div className="h-full w-[58%] rounded-full bg-gradient-to-r from-purple to-cyan"></div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-white/45">{t.tRegistrados}</span><span className="text-white/75">128</span></div>
              <div className="flex justify-between"><span className="text-white/45">{t.tPagos}</span><span className="text-cyan">92%</span></div>
              <div className="flex justify-between"><span className="text-white/45">{t.tRoles}</span><span className="text-white/75">RBAC ×3</span></div>
            </div>
          </div>
        </div>
      </a>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {projects.slice(1).map(project => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-white/3 border ${project.borderColor} rounded-3xl p-9 transition ${project.hoverBorder} ${project.hoverShadow} hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${project.gradient} grid place-items-center font-black text-sm text-dark-bg`}>
                {project.icon}
              </span>
              <span className="font-bold text-xs text-white/40">{project.version}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{project.name}</h3>
            <p className="text-sm font-light leading-relaxed text-white/55 mb-5">{project.desc}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, i) => (
                <span key={i} className="font-medium text-xs text-white/70 bg-white/6 rounded-full px-3 py-1">
                  {tech}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      <a
        href="https://github.com/ariancerna?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 mt-5 px-5 py-5 border border-dashed border-white/20 rounded-3xl font-bold text-sm text-white/60 hover:border-cyan/60 hover:text-cyan transition"
      >
        {t.tVerTodos} ↗
      </a>
    </section>
  )
}
