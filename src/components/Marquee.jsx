const skills = ['REACT', 'NEXT.JS', 'TYPESCRIPT', 'JAVA 21', 'SPRING BOOT', 'PYTHON', 'FASTAPI', 'NODE.JS', 'POSTGRESQL', 'SUPABASE', 'DOCKER', 'THREE.JS']

function Row({ hidden }) {
  return (
    <div className="flex gap-12 px-6 font-bold text-sm text-white/40 whitespace-nowrap" aria-hidden={hidden || undefined}>
      {skills.map((skill, i) => (
        <div key={skill} className="flex items-center gap-12">
          <span>{skill}</span>
          <span className={i % 2 === 0 ? 'text-purple' : 'text-cyan'}>✦</span>
        </div>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="border-y border-white/7 py-5 overflow-hidden bg-white/[0.02] mt-16">
      <div className="flex w-max animate-marquee">
        <Row />
        <Row hidden />
      </div>
    </div>
  )
}
