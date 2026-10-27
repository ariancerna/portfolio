import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Billboard, Html, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import {
  siDocker, siFastapi, siGit, siNextdotjs, siNodedotjs, siOpenjdk, siPostgresql, siPrisma,
  siPython, siReact, siSpringboot, siSupabase, siTailwindcss, siTypescript, siVercel,
} from 'simple-icons'

const tech = (icon, name) => ({ icon, name })

const orbits = [
  {
    radius: 1.85, tilt: [1.0, 0, 0.28], speed: 0.3, color: '#22d3ee',
    items: [tech(siReact, 'React'), tech(siNextdotjs, 'Next.js'), tech(siTypescript, 'TypeScript'), tech(siTailwindcss, 'Tailwind CSS')],
  },
  {
    radius: 2.65, tilt: [1.0, 0, -0.2], speed: -0.19, color: '#8b5cf6',
    items: [tech(siOpenjdk, 'Java'), tech(siSpringboot, 'Spring Boot'), tech(siPython, 'Python'), tech(siFastapi, 'FastAPI'), tech(siNodedotjs, 'Node.js')],
  },
  {
    radius: 3.4, tilt: [1.0, 0, 0.12], speed: 0.12, color: '#e879f9',
    items: [tech(siPostgresql, 'PostgreSQL'), tech(siSupabase, 'Supabase'), tech(siDocker, 'Docker'), tech(siGit, 'Git'), tech(siVercel, 'Vercel'), tech(siPrisma, 'Prisma')],
  },
]

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function isDark(hex) {
  const n = parseInt(hex, 16)
  return 0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255) < 70
}

// Glassy tile with the brand logo on it.
function makeLogoTexture(icon) {
  const size = 256
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')
  roundRect(ctx, 8, 8, size - 16, size - 16, 52)
  ctx.fillStyle = 'rgba(20, 18, 34, 0.92)'
  ctx.fill()
  ctx.lineWidth = 5
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)'
  ctx.stroke()
  const scale = 5.4
  ctx.save()
  ctx.translate(size / 2 - 12 * scale, size / 2 - 12 * scale)
  ctx.scale(scale, scale)
  ctx.fillStyle = isDark(icon.hex) ? '#ffffff' : `#${icon.hex}`
  ctx.fill(new Path2D(icon.path))
  ctx.restore()
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  return tex
}

// The "ac." brand tile in the middle. Redrawn once the Sora font has loaded.
function makeBrandTexture() {
  const size = 512
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  const draw = () => {
    ctx.clearRect(0, 0, size, size)
    const g = ctx.createLinearGradient(0, 0, size, size)
    g.addColorStop(0, '#8b5cf6')
    g.addColorStop(0.55, '#c026d3')
    g.addColorStop(1, '#22d3ee')
    roundRect(ctx, 16, 16, size - 32, size - 32, 120)
    ctx.fillStyle = g
    ctx.fill()
    roundRect(ctx, 26, 26, size - 52, size - 52, 110)
    ctx.fillStyle = 'rgba(10, 8, 20, 0.92)'
    ctx.fill()

    ctx.font = '800 200px Sora, "Segoe UI", sans-serif'
    ctx.textBaseline = 'alphabetic'
    const text = 'ac'
    const textW = ctx.measureText(text).width
    const dot = 34
    const total = textW + dot * 1.6
    const x = (size - total) / 2
    const baseline = size / 2 + 62
    ctx.fillStyle = '#ffffff'
    ctx.fillText(text, x, baseline)
    const dg = ctx.createLinearGradient(x + textW, baseline - dot * 2, x + textW + dot * 2, baseline)
    dg.addColorStop(0, '#8b5cf6')
    dg.addColorStop(1, '#22d3ee')
    ctx.fillStyle = dg
    ctx.beginPath()
    ctx.arc(x + textW + dot * 0.85, baseline - dot * 0.75, dot * 0.75, 0, Math.PI * 2)
    ctx.fill()
    tex.needsUpdate = true
  }
  draw()
  return { tex, draw }
}

function makeGlowTexture() {
  const size = 256
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(168, 85, 247, 0.85)')
  g.addColorStop(0.45, 'rgba(99, 102, 241, 0.3)')
  g.addColorStop(1, 'rgba(34, 211, 238, 0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(c)
}

// Pulls the camera back on narrow canvases so the outer orbit never gets cut off.
function CameraFit() {
  const { camera, size } = useThree()
  useEffect(() => {
    const aspect = size.width / size.height
    camera.position.z = aspect < 1.3 ? 11.4 : 10.2
    camera.updateProjectionMatrix()
  }, [camera, size])
  return null
}

// Drag to spin (with inertia), plus a soft tilt toward the pointer.
// Touch only spins on horizontal swipes, so vertical scrolling still works.
function DragRig({ children, reduced, onInteract }) {
  const group = useRef()
  const { gl } = useThree()
  const state = useRef({ yaw: 0, pitch: 0, vel: 0, dragging: false, lastX: 0, lastY: 0, moved: false })

  useEffect(() => {
    const el = gl.domElement
    el.style.touchAction = 'pan-y'
    el.style.cursor = 'grab'
    const s = state.current

    const down = (e) => {
      s.dragging = true
      s.moved = false
      s.lastX = e.clientX
      s.lastY = e.clientY
      s.vel = 0
      el.style.cursor = 'grabbing'
    }
    const move = (e) => {
      if (!s.dragging) return
      const dx = e.clientX - s.lastX
      const dy = e.clientY - s.lastY
      s.lastX = e.clientX
      s.lastY = e.clientY
      if (Math.abs(dx) + Math.abs(dy) > 2 && !s.moved) {
        s.moved = true
        onInteract?.()
      }
      s.yaw += dx * 0.009
      s.vel = dx * 0.009
      if (e.pointerType === 'mouse') {
        s.pitch = THREE.MathUtils.clamp(s.pitch + dy * 0.006, -0.55, 0.55)
      }
    }
    const up = () => {
      s.dragging = false
      el.style.cursor = 'grab'
    }

    el.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    return () => {
      el.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
    }
  }, [gl, onInteract])

  useFrame((three, delta) => {
    const g = group.current
    if (!g) return
    const s = state.current
    if (!s.dragging) {
      s.yaw += s.vel
      s.vel *= Math.pow(0.04, delta) // inertia fades out in about a second
      if (!reduced) s.yaw += delta * 0.06 // slow idle spin
      s.pitch *= Math.pow(0.35, delta) // tilt eases back to level
    }
    const hoverX = s.dragging ? 0 : three.pointer.x * 0.25
    const hoverY = s.dragging ? 0 : -three.pointer.y * 0.18
    const k = Math.min(1, delta * 6)
    g.rotation.y += (s.yaw + hoverX - g.rotation.y) * k
    g.rotation.x += (s.pitch + hoverY - g.rotation.x) * k
  })

  return <group ref={group}>{children}</group>
}

function Center({ reduced }) {
  const ref = useRef()
  const brand = useMemo(makeBrandTexture, [])
  const glowTex = useMemo(makeGlowTexture, [])

  useEffect(() => {
    document.fonts?.load('800 200px Sora').then(brand.draw).catch(() => {})
  }, [brand])

  useFrame((three) => {
    if (!ref.current || reduced) return
    ref.current.scale.setScalar(1 + Math.sin(three.clock.elapsedTime * 1.6) * 0.035)
  })

  return (
    <Billboard>
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[4.6, 4.6]} />
        <meshBasicMaterial map={glowTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={ref}>
        <planeGeometry args={[1.6, 1.6]} />
        <meshBasicMaterial map={brand.tex} transparent toneMapped={false} />
      </mesh>
    </Billboard>
  )
}

// One logo on an orbit. Grows and shows its name on hover or tap.
function LogoTile({ texture, name, position }) {
  const ref = useRef()
  const [active, setActive] = useState(false)

  useFrame((_, delta) => {
    if (!ref.current) return
    const target = active ? 1.35 : 1
    const s = ref.current.scale.x + (target - ref.current.scale.x) * Math.min(1, delta * 10)
    ref.current.scale.setScalar(s)
  })

  return (
    <Billboard position={position}>
      <mesh
        ref={ref}
        onPointerOver={(e) => {
          e.stopPropagation()
          setActive(true)
        }}
        onPointerOut={() => setActive(false)}
        onClick={(e) => {
          e.stopPropagation()
          setActive((v) => !v)
        }}
      >
        <planeGeometry args={[0.74, 0.74]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>
      {active && (
        <Html position={[0, -0.62, 0]} center zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
          <span className="whitespace-nowrap rounded-full border border-white/15 bg-dark-bg/90 px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg">
            {name}
          </span>
        </Html>
      )}
    </Billboard>
  )
}

function Orbit({ radius, tilt, speed, color, items, reduced }) {
  const spin = useRef()
  const textures = useMemo(() => items.map((item) => makeLogoTexture(item.icon)), [items])

  useFrame((_, delta) => {
    if (spin.current && !reduced) spin.current.rotation.z += delta * speed
  })

  return (
    <group rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.008, 12, 200]} />
        <meshBasicMaterial color={color} transparent opacity={0.55} />
      </mesh>
      <group ref={spin}>
        {items.map((item, i) => {
          const a = (i / items.length) * Math.PI * 2
          return (
            <LogoTile
              key={item.name}
              texture={textures[i]}
              name={item.name}
              position={[Math.cos(a) * radius, Math.sin(a) * radius, 0]}
            />
          )
        })}
      </group>
    </group>
  )
}

export default function Scene3D({ active = true, reduced = false, onInteract }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.6, 10.2], fov: 42 }}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <CameraFit />
      <fog attach="fog" args={['#08070f', 9.5, 18]} />
      <DragRig reduced={reduced} onInteract={onInteract}>
        <Center reduced={reduced} />
        {orbits.map((orbit) => (
          <Orbit key={orbit.radius} {...orbit} reduced={reduced} />
        ))}
        <Sparkles count={60} scale={[9, 7, 5]} size={2} speed={reduced ? 0 : 0.3} color="#c4b5fd" opacity={0.6} />
      </DragRig>
    </Canvas>
  )
}
