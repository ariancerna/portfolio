import { CV_FILENAME, CV_URL, trackCV } from '../lib/contact'
import { CheckIcon, DownloadIcon } from './Icons'
import Marquee from './Marquee'
import Reveal from './Reveal'
import Section from './Section'

export default function About({ t }) {
  const a = t.about
  return (
    <>
      <Marquee />
      <Section id="sobre" index="05" label={a.kicker} title={a.title}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12">
          <Reveal className="lg:col-start-4 lg:col-span-5 space-y-5 text-lg leading-relaxed text-muted">
            <p>{a.p1}</p>
            <p>{a.p2}</p>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-4">
            <div className="border border-line rounded-lg p-7">
              <p className="label !text-accent">{a.recruiterKicker}</p>
              <h3 className="mt-4 text-xl font-medium tracking-[-0.025em] leading-snug">{a.recruiterTitle}</h3>
              <ul className="mt-6 pt-5 border-t border-line space-y-3 list-none p-0">
                {a.recruiterPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                    <CheckIcon className="w-3.5 h-3.5 mt-[4px] shrink-0 text-faint" />
                    {point}
                  </li>
                ))}
              </ul>
              <a href={CV_URL} download={CV_FILENAME} onClick={trackCV('sobre-mi')} className="btn btn-secondary mt-7 w-full">
                <DownloadIcon className="w-4 h-4" />
                {a.cv}
              </a>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
