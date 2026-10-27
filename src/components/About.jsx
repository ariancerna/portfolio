import { CV_FILENAME, CV_URL } from '../lib/contact'
import { CheckIcon, DownloadIcon } from './Icons'
import Marquee from './Marquee'
import Reveal from './Reveal'

export default function About({ t }) {
  const a = t.about
  return (
    <>
      <Marquee />
      <section id="sobre" className="relative max-w-6xl mx-auto px-5 sm:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-12 lg:gap-16 items-start">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <img
                src="https://avatars.githubusercontent.com/u/155792867?v=4"
                alt="Arian Cerna"
                width="64"
                height="64"
                loading="lazy"
                className="w-16 h-16 shrink-0 rounded-2xl object-cover border border-white/15 shadow-[0_0_40px_rgba(139,92,246,0.3)]"
              />
              <div>
                <div className="text-cyan font-bold text-xs tracking-[0.2em] mb-1">{a.kicker}</div>
                <div className="font-semibold text-white/80">Arian Cerna</div>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight text-balance mb-6">{a.title}</h2>
            <p className="text-base font-light leading-relaxed text-white/60 mb-4">{a.p1}</p>
            <p className="text-base font-light leading-relaxed text-white/60">{a.p2}</p>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative bg-gradient-to-br from-purple/15 to-cyan/5 border border-purple/30 rounded-3xl p-7 sm:p-8 overflow-hidden">
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-purple/30 blur-3xl pointer-events-none" aria-hidden="true"></div>
              <div className="relative">
                <div className="text-purple-300 font-bold text-xs tracking-[0.2em] mb-2">{a.recruiterKicker}</div>
                <h3 className="text-xl font-bold text-white mb-5">{a.recruiterTitle}</h3>
                <ul className="space-y-3 mb-7 list-none p-0">
                  {a.recruiterPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-white/75">
                      <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full grid place-items-center bg-cyan/15 text-cyan">
                        <CheckIcon className="w-3 h-3" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                <a
                  href={CV_URL}
                  download={CV_FILENAME}
                  className="inline-flex items-center gap-2.5 font-semibold text-sm text-dark-bg bg-white px-6 py-3 rounded-full hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,255,255,0.15)] transition"
                >
                  <DownloadIcon className="w-4 h-4" />
                  {a.cv}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
