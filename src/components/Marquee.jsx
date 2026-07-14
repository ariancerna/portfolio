export default function Marquee() {
  const skills = ['JAVA 21', 'SPRING BOOT', 'POSTGRESQL', 'REACT', 'VITE', 'DOCKER', 'ELECTRON', 'NODE.JS', 'GIT']

  return (
    <div className="border-t border-b border-white/7 py-5 overflow-hidden bg-white/2">
      <div className="flex gap-12 animate-marquee">
        <div className="flex gap-12 px-12 font-bold text-sm text-white/45 whitespace-nowrap">
          {skills.map((skill, i) => (
            <div key={`skill-1-${i}`} className="flex items-center gap-6">
              <span>{skill}</span>
              <span className={i % 2 === 0 ? 'text-purple' : 'text-cyan'}>✦</span>
            </div>
          ))}
        </div>
        <div className="flex gap-12 px-12 font-bold text-sm text-white/45 whitespace-nowrap">
          {skills.map((skill, i) => (
            <div key={`skill-2-${i}`} className="flex items-center gap-6">
              <span>{skill}</span>
              <span className={i % 2 === 0 ? 'text-purple' : 'text-cyan'}>✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
