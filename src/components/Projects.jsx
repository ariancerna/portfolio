import { featured, more } from '../data/projects'
import { ExternalIcon, GitHubIcon } from './Icons'
import Reveal from './Reveal'
import Section from './Section'
import Tilt from './Tilt'

function Status({ type, t }) {
  const label = { live: t.projects.live, production: t.projects.production, team: t.projects.team }[type]
  return (
    <span className="label inline-flex items-center gap-2">
      {type !== 'team' && <span className="w-1.5 h-1.5 rounded-full bg-ok" aria-hidden="true"></span>}
      {label}
    </span>
  )
}

function BrowserFrame({ url, children }) {
  return (
    <div className="rounded-lg overflow-hidden border border-line-strong bg-surface shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-1.5 h-9 px-3.5 border-b border-line">
        <span className="w-2 h-2 rounded-full bg-line-strong"></span>
        <span className="w-2 h-2 rounded-full bg-line-strong"></span>
        <span className="w-2 h-2 rounded-full bg-line-strong"></span>
        <span className="flex-1 text-center truncate font-mono text-[11px] text-faint pr-9">{url}</span>
      </div>
      {children}
    </div>
  )
}

// Desktop screenshot with the phone version floating in front of it.
function Screens({ project }) {
  return (
    <Tilt className="pb-[7%] pr-[4%]">
      <BrowserFrame url={project.url}>
        <img
          src={project.image}
          alt={`${project.name}, versión de escritorio`}
          width="1200"
          height="750"
          loading="lazy"
          decoding="async"
          className="block w-full h-auto"
        />
      </BrowserFrame>
      <div className="tilt-layer absolute right-0 bottom-0 w-[21%] rounded-[12%/5.6%] p-[1.1%] bg-raise border border-line-strong shadow-[0_30px_50px_-20px_rgba(0,0,0,0.95)]">
        <img
          src={project.mobile}
          alt={`${project.name}, versión de celular`}
          width="450"
          height="974"
          loading="lazy"
          decoding="async"
          className="block w-full h-auto rounded-[10.5%/4.8%]"
        />
      </div>
    </Tilt>
  )
}

// Church Events has no public demo, so it shows a sketch of its check-in screen instead.
function CheckInSketch({ t }) {
  const m = t.projects.mock
  return (
    <Tilt>
      <BrowserFrame url={m.title}>
        <div className="grid place-items-center aspect-[16/10] p-6">
          <div className="tilt-layer w-full max-w-[19rem] rounded-md border border-line-strong bg-bg p-5 font-mono text-sm">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-line">
              <span className="text-xs text-faint">{m.checkin}</span>
              <span className="inline-flex items-center gap-1.5 text-[10px] tracking-wider text-ok">
                <span className="w-1.5 h-1.5 rounded-full bg-ok"></span>
                {m.live}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-medium tracking-tight text-ink">74</span>
              <span className="text-faint">/ 128</span>
            </div>
            <div className="mt-4 h-px bg-line-strong">
              <div className="h-px w-[58%] bg-accent"></div>
            </div>
            <dl className="mt-5 space-y-2 text-xs">
              <div className="flex justify-between"><dt className="text-faint">{m.registered}</dt><dd className="text-muted">128</dd></div>
              <div className="flex justify-between"><dt className="text-faint">{m.payments}</dt><dd className="text-muted">92%</dd></div>
              <div className="flex justify-between"><dt className="text-faint">{m.roles}</dt><dd className="text-muted">RBAC ×3</dd></div>
            </dl>
          </div>
        </div>
      </BrowserFrame>
    </Tilt>
  )
}

function CaseStudy({ project, index, t }) {
  const copy = t.projects.items[project.key]
  const rows = [
    [t.projects.problem, copy.problem, 'text-muted'],
    [t.projects.solution, copy.solution, 'text-muted'],
    [t.projects.result, copy.result, 'text-ink'],
  ]

  return (
    <article id={project.anchor} className="scroll-mt-14 border-t border-line pt-8 lg:pt-10 pb-16 lg:pb-24">
      <div className="flex items-center justify-between mb-8 lg:mb-10">
        <span className="font-mono text-xs text-accent">0{index + 1}</span>
        <Status type={project.badge} t={t} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10 items-start">
        <Reveal tilt className="lg:col-span-7">
          {project.mock ? <CheckInSketch t={t} /> : <Screens project={project} />}
        </Reveal>

        <Reveal delay={80} className="lg:col-span-5 lg:pl-6">
          <h3 className="text-3xl sm:text-[2.6rem] font-medium tracking-[-0.04em] leading-[1.05]">{project.name}</h3>
          <p className="mt-3 text-lg text-muted">{copy.subtitle}</p>

          <dl className="mt-8 border-t border-line">
            {rows.map(([label, text, tone]) => (
              <div key={label} className="grid grid-cols-[6rem_1fr] gap-4 py-4 border-b border-line">
                <dt className="label pt-1">{label}</dt>
                <dd className={`m-0 text-[0.95rem] leading-relaxed ${tone}`}>{text}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 font-mono text-xs leading-relaxed text-faint">{project.tech.join('  ·  ')}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                {t.projects.demo}
                <ExternalIcon className="w-4 h-4" />
              </a>
            )}
            <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <GitHubIcon className="w-4 h-4" />
              {t.projects.code}
            </a>
            {project.repoBackend && (
              <a href={project.repoBackend} target="_blank" rel="noopener noreferrer" className="text-sm link ml-1">
                API
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </article>
  )
}

export default function Projects({ t }) {
  return (
    <Section id="proyectos" index="02" label={t.projects.kicker} title={t.projects.title} desc={t.projects.desc}>
      {featured.map((project, i) => (
        <CaseStudy key={project.key} project={project} index={i} t={t} />
      ))}

      <div className="border-t border-line pt-8 lg:pt-10">
        <h3 className="label mb-6">{t.projects.moreTitle}</h3>
        <ul className="list-none m-0 p-0 border-t border-line">
          {more.map((project) => (
            <li key={project.key} className="border-b border-line">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-1.5 py-5 transition-colors hover:bg-surface -mx-3 px-3 rounded-sm"
              >
                <span className="lg:col-span-3 font-medium tracking-tight">{project.name}</span>
                <span className="lg:col-span-6 text-sm leading-relaxed text-muted">{t.projects.more[project.key]}</span>
                <span className="lg:col-span-3 flex items-start justify-between gap-4 font-mono text-xs text-faint lg:pt-0.5">
                  {project.tech}
                  <ExternalIcon className="w-3.5 h-3.5 shrink-0 transition-colors group-hover:text-ink" />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <a
          href="https://github.com/ariancerna?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 inline-flex items-center gap-2 text-sm font-medium link"
        >
          <GitHubIcon className="w-4 h-4" />
          {t.projects.seeAll}
        </a>
      </div>
    </Section>
  )
}
