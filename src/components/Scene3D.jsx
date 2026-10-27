import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'

// Follows the pointer with a soft delay so the whole scene feels alive.
function Rig({ children, reduced }) {
  const group = useRef()
  useFrame((state, delta) => {
    if (!group.current) return
    const { x, y } = state.pointer
    const k = Math.min(1, delta * 2.5)
    group.current.rotation.y += (x * 0.45 - group.current.rotation.y) * k
    group.current.rotation.x += (-y * 0.3 - group.current.rotation.x) * k
    if (!reduced) group.current.rotation.z += delta * 0.04
  })
  return <group ref={group}>{children}</group>
}

function Core({ reduced }) {
  return (
    <Float speed={reduced ? 0 : 1.6} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh>
        <icosahedronGeometry args={[1.25, 24]} />
        <MeshDistortMaterial
          color="#a78bfa"
          emissive="#4c1d95"
          emissiveIntensity={0.45}
          roughness={0.18}
          metalness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.15}
          distort={reduced ? 0.2 : 0.38}
          speed={reduced ? 0 : 1.8}
        />
      </mesh>
    </Float>
  )
}

function Shell({ reduced }) {
  const ref = useRef()
  useFrame((_, delta) => {
    if (!ref.current || reduced) return
    ref.current.rotation.y -= delta * 0.12
    ref.current.rotation.x += delta * 0.05
  })
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[2.05, 1]} />
      <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.16} />
    </mesh>
  )
}

function Ring({ radius, tilt, color, speed, reduced }) {
  const ref = useRef()
  useFrame((_, delta) => {
    if (ref.current && !reduced) ref.current.rotation.z += delta * speed
  })
  return (
    <group rotation={tilt}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, 0.012, 16, 160]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

function Satellite({ position, color, geometry, reduced }) {
  return (
    <Float speed={reduced ? 0 : 2.4} rotationIntensity={2} floatIntensity={1.6}>
      <mesh position={position}>
        {geometry === 'box' ? <boxGeometry args={[0.32, 0.32, 0.32]} /> : <octahedronGeometry args={[0.24]} />}
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.25} metalness={0.4} />
      </mesh>
    </Float>
  )
}

export default function Scene3D({ active = true, reduced = false }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7.2], fov: 42 }}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <hemisphereLight args={['#67e8f9', '#6d28d9', 1.1]} />
      <pointLight position={[4, 3, 4]} intensity={90} color="#22d3ee" />
      <pointLight position={[-4, -2, 3]} intensity={80} color="#d946ef" />
      <directionalLight position={[0, 5, 3]} intensity={1.2} color="#ffffff" />

      <Rig reduced={reduced}>
        <Core reduced={reduced} />
        <Shell reduced={reduced} />
        <Ring radius={2.45} tilt={[1.25, 0.2, 0]} color="#22d3ee" speed={0.25} reduced={reduced} />
        <Ring radius={2.7} tilt={[1.05, -0.5, 0.3]} color="#8b5cf6" speed={-0.18} reduced={reduced} />
        <Satellite position={[2.3, 1.2, 0.4]} color="#22d3ee" geometry="box" reduced={reduced} />
        <Satellite position={[-2.4, -1.1, 0.6]} color="#a855f7" geometry="oct" reduced={reduced} />
        <Satellite position={[-1.6, 1.9, -0.8]} color="#e879f9" geometry="oct" reduced={reduced} />
        <Satellite position={[1.7, -1.9, -0.4]} color="#8b5cf6" geometry="box" reduced={reduced} />
        <Sparkles count={70} scale={[7, 6, 4]} size={2.2} speed={reduced ? 0 : 0.35} color="#c4b5fd" opacity={0.7} />
      </Rig>
    </Canvas>
  )
}
