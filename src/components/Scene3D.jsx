import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Billboard, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import {
  siDocker, siFastapi, siGit, siNextdotjs, siNodedotjs, siOpenjdk, siPostgresql, siPrisma,
  siPython, siReact, siSpringboot, siSupabase, siTailwindcss, siTypescript, siVercel,
} from 'simple-icons'

const orbits = [
  { radius: 1.85, tilt: [1.0, 0, 0.28], speed: 0.3, color: '#22d3ee', icons: [siReact, siNextdotjs, siTypescript, siTailwindcss] },
  { radius: 2.65, tilt: [1.0, 0, -0.2], speed: -0.19, color: '#8b5cf6', icons: [siOpenjdk, siSpringboot, siPython, siFastapi, siNodedotjs] },
  { radius: 3.4, tilt: [1.0, 0, 0.12], speed: 0.12, color: '#e879f9', icons: [siPostgresql, siSupabase, siDocker, siGit, siVercel, siPrisma] },
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

// Draws a glassy tile with the brand logo on it.
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

// The "</>" tile. Redrawn once the mono font has loaded.
function makeCodeTexture() {
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
    ctx.fillStyle = 'rgba(10, 8, 20, 0.9)'
    ctx.fill()
    ctx.fillStyle = g
    ctx.font = '600 170px "IBM Plex Mono", ui-monospace, monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('</>', size / 2, size / 2 + 6)
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

// Follows the pointer with a soft delay.
function Rig({ children }) {
  const group = useRef()
  useFrame((state, delta) => {
    if (!group.current) return
    const { x, y } = state.pointer
    const k = Math.min(1, delta * 2.5)
    group.current.rotation.y += (x * 0.35 - group.current.rotation.y) * k
    group.current.rotation.x += (-y * 0.25 - group.current.rotation.x) * k
  })
  return <group ref={group}>{children}</group>
}

function Center({ reduced }) {
  const ref = useRef()
  const code = useMemo(makeCodeTexture, [])
  const glowTex = useMemo(makeGlowTexture, [])

  useEffect(() => {
    document.fonts?.load('600 170px "IBM Plex Mono"').then(code.draw).catch(() => {})
  }, [code])
  useFrame((state) => {
    if (!ref.current || reduced) return
    const s = 1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.035
    ref.current.scale.setScalar(s)
  })
  return (
    <Billboard>
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[4.6, 4.6]} />
        <meshBasicMaterial map={glowTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={ref}>
        <planeGeometry args={[1.6, 1.6]} />
        <meshBasicMaterial map={code.tex} transparent toneMapped={false} />
      </mesh>
    </Billboard>
  )
}

function Orbit({ radius, tilt, speed, color, icons, reduced }) {
  const spin = useRef()
  const textures = useMemo(() => icons.map(makeLogoTexture), [icons])

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
        {textures.map((tex, i) => {
          const a = (i / textures.length) * Math.PI * 2
          return (
            <Billboard key={i} position={[Math.cos(a) * radius, Math.sin(a) * radius, 0]}>
              <mesh>
                <planeGeometry args={[0.74, 0.74]} />
                <meshBasicMaterial map={tex} transparent toneMapped={false} />
              </mesh>
            </Billboard>
          )
        })}
      </group>
    </group>
  )
}

export default function Scene3D({ active = true, reduced = false }) {
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
      <Rig>
        <Center reduced={reduced} />
        {orbits.map((orbit) => (
          <Orbit key={orbit.radius} {...orbit} reduced={reduced} />
        ))}
        <Sparkles count={60} scale={[9, 7, 5]} size={2} speed={reduced ? 0 : 0.3} color="#c4b5fd" opacity={0.6} />
      </Rig>
    </Canvas>
  )
}
