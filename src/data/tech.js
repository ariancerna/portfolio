import {
  siDocker, siElectron, siExpress, siFastapi, siGit, siGithub, siJavascript, siJsonwebtokens,
  siJunit5, siLinux, siMysql, siNextdotjs, siNginx, siNodedotjs, siOpenjdk, siPostgresql,
  siPrisma, siPwa, siPython, siRailway, siReact, siReacthookform, siReactquery, siReactrouter,
  siSpringboot, siSpringsecurity, siSqlalchemy, siSupabase, siSwagger, siTailwindcss,
  siThreedotjs, siTypescript, siVercel, siVite, siVitest, siZod,
} from 'simple-icons'

const t = (name, icon) => ({ name, icon })

export const marqueeTech = [
  t('React', siReact), t('Next.js', siNextdotjs), t('TypeScript', siTypescript), t('Java', siOpenjdk),
  t('Spring Boot', siSpringboot), t('Python', siPython), t('FastAPI', siFastapi), t('Node.js', siNodedotjs),
  t('PostgreSQL', siPostgresql), t('Supabase', siSupabase), t('Docker', siDocker), t('Tailwind CSS', siTailwindcss),
  t('Three.js', siThreedotjs), t('Vercel', siVercel),
]

export const stackGroups = [
  {
    id: 'frontend',
    items: [
      t('React', siReact), t('Next.js', siNextdotjs), t('TypeScript', siTypescript), t('JavaScript', siJavascript),
      t('Tailwind CSS', siTailwindcss), t('Vite', siVite), t('React Router', siReactrouter), t('TanStack Query', siReactquery),
      t('React Hook Form', siReacthookform), t('Zod', siZod), t('Three.js', siThreedotjs), t('PWA', siPwa),
    ],
  },
  {
    id: 'backend',
    items: [
      t('Java', siOpenjdk), t('Spring Boot', siSpringboot), t('Spring Security', siSpringsecurity), t('Python', siPython),
      t('FastAPI', siFastapi), t('SQLAlchemy', siSqlalchemy), t('Node.js', siNodedotjs), t('Express', siExpress),
      t('PostgreSQL', siPostgresql), t('MySQL', siMysql), t('Prisma', siPrisma), t('Supabase', siSupabase),
      t('JWT', siJsonwebtokens), t('Swagger', siSwagger),
    ],
  },
  {
    id: 'tools',
    items: [
      t('Docker', siDocker), t('nginx', siNginx), t('Vercel', siVercel), t('Railway', siRailway),
      t('Git', siGit), t('GitHub', siGithub), t('JUnit 5', siJunit5), t('Vitest', siVitest),
      t('Electron', siElectron), t('Linux', siLinux),
    ],
  },
]
