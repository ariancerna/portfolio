import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, useTexture } from '@react-three/drei'
import * as THREE from 'three'

// Laptop dimensions, in scene units.
const W = 3.4
const D = 2.3
const BASE_T = 0.09
const LID_T = 0.05
const LID_H = 2.2
const LID_OPEN = -0.3 // radians past vertical
const LID_START = 1.46 // almost closed
const REST_YAW = -0.5

const ALUMINIUM = { color: '#62646a', metalness: 1, roughness: 0.38 }
const GRAPHITE = { color: '#26272a', metalness: 1, roughness: 0.36 }
const KEYCAP = { color: '#0d0d0e', metalness: 0.1, roughness: 0.7 }

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
const smooth = (t) => t * t * (3 - 2 * t)

function roundedRect(w, h, r) {
  const x = -w / 2
  const y = -h / 2
  const s = new THREE.Shape()
  s.moveTo(x + r, y)
  s.lineTo(x + w - r, y)
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false)
  s.lineTo(x + w, y + h - r)
  s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false)
  s.lineTo(x + r, y + h)
  s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false)
  s.lineTo(x, y + r)
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false)
  return s
}

// A flat slab with rounded corners and softly bevelled edges, centred on its depth.
function slabGeometry(w, h, r, depth, bevel = 0.012) {
  const geo = new THREE.ExtrudeGeometry(roundedRect(w - bevel * 2, h - bevel * 2, r - bevel), {
    depth: depth - bevel * 2,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 4,
    curveSegments: 20,
  })
  geo.translate(0, 0, -(depth - bevel * 2) / 2)
  return geo
}

const screenVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Cross-fades between two screenshots, rounds the corners and fades in when the display turns on.
const screenFragment = /* glsl */ `
  uniform sampler2D uFrom;
  uniform sampler2D uTo;
  uniform float uMix;
  uniform float uPower;
  uniform vec2 uSize;
  uniform float uRadius;
  varying vec2 vUv;

  float roundedBox(vec2 p, vec2 halfSize, float r) {
    vec2 q = abs(p) - halfSize + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  void main() {
    vec3 color = mix(texture2D(uFrom, vUv).rgb, texture2D(uTo, vUv).rgb, uMix) * uPower;
    float d = roundedBox((vUv - 0.5) * uSize, uSize * 0.5, uRadius);
    float alpha = 1.0 - smoothstep(-0.003, 0.003, d);
    gl_FragColor = vec4(color, alpha);
    #include <colorspace_fragment>
  }
`

function Screen({ textures, index, power, width, height, radius, onOpen, ...props }) {
  // Built once; later changes go through the uniforms.
  const [material] = useState(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: screenVertex,
        fragmentShader: screenFragment,
        transparent: true,
        uniforms: {
          uFrom: { value: textures[index] },
          uTo: { value: textures[index] },
          uMix: { value: 0 },
          uPower: { value: 0 },
          uSize: { value: new THREE.Vector2(width, height) },
          uRadius: { value: radius },
        },
      })
  )
  const fade = useRef(1)
  const { gl } = useThree()

  useEffect(() => {
    const u = material.uniforms
    if (u.uTo.value === textures[index]) return
    u.uFrom.value = u.uTo.value
    u.uTo.value = textures[index]
    u.uMix.value = 0
    fade.current = 0
  }, [index, textures, material])

  useFrame((_, delta) => {
    const u = material.uniforms
    u.uPower.value = power.current
    if (fade.current < 1) {
      fade.current = Math.min(1, fade.current + delta / 0.7)
      u.uMix.value = smooth(fade.current)
    }
  })

  return (
    <mesh
      material={material}
      onClick={(e) => {
        if (e.delta < 5) onOpen?.()
      }}
      onPointerOver={() => (gl.domElement.style.cursor = 'pointer')}
      onPointerOut={() => (gl.domElement.style.cursor = 'grab')}
      {...props}
    >
      <planeGeometry args={[width, height]} />
    </mesh>
  )
}

function Keyboard() {
  const ref = useRef()
  const keys = useMemo(() => {
    const list = []
    const cols = 14
    const kw = 0.188
    const kd = 0.168
    const gap = 0.026
    const totalW = cols * kw + (cols - 1) * gap
    const x0 = -totalW / 2 + kw / 2
    const z0 = -0.92
    for (let row = 0; row < 5; row++) {
      const z = z0 + row * (kd + gap)
      if (row < 4) {
        for (let c = 0; c < cols; c++) list.push([x0 + c * (kw + gap), z, kw, kd])
      } else {
        // Bottom row: four keys, the space bar, five keys.
        for (let c = 0; c < 4; c++) list.push([x0 + c * (kw + gap), z, kw, kd])
        const spaceW = 5 * kw + 4 * gap
        list.push([x0 + 4 * (kw + gap) + spaceW / 2 - kw / 2, z, spaceW, kd])
        for (let c = 9; c < cols; c++) list.push([x0 + c * (kw + gap), z, kw, kd])
      }
    }
    return list
  }, [])

  useLayoutEffect(() => {
    const m = new THREE.Matrix4()
    keys.forEach(([x, z, w, d], i) => {
      m.makeScale(w, 0.02, d)
      m.setPosition(x, BASE_T + 0.004, z)
      ref.current.setMatrixAt(i, m)
    })
    ref.current.instanceMatrix.needsUpdate = true
  }, [keys])

  return (
    <instancedMesh ref={ref} args={[null, null, keys.length]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial {...KEYCAP} />
    </instancedMesh>
  )
}

function Laptop({ textures, index, progress, power, onOpen }) {
  const lid = useRef()
  const base = useMemo(() => slabGeometry(W, D, 0.16, BASE_T), [])
  const lidGeo = useMemo(() => slabGeometry(W, LID_H, 0.14, LID_T), [])
  const bezel = useMemo(() => new THREE.ShapeGeometry(roundedRect(W - 0.06, LID_H - 0.06, 0.12), 20), [])

  useFrame(() => {
    lid.current.rotation.x = THREE.MathUtils.lerp(LID_START, LID_OPEN, easeOutCubic(progress.current))
  })

  return (
    <group>
      <mesh geometry={base} rotation-x={-Math.PI / 2} position-y={BASE_T / 2}>
        <meshStandardMaterial {...ALUMINIUM} />
      </mesh>

      {/* Keyboard well, keys and trackpad */}
      <mesh rotation-x={-Math.PI / 2} position={[0, BASE_T + 0.001, -0.5]}>
        <planeGeometry args={[3.08, 1.1]} />
        <meshStandardMaterial color="#17171a" metalness={0.6} roughness={0.6} />
      </mesh>
      <Keyboard />
      <mesh rotation-x={-Math.PI / 2} position={[0, BASE_T + 0.001, 0.62]}>
        <planeGeometry args={[1.15, 0.7]} />
        <meshStandardMaterial color="#565860" metalness={1} roughness={0.26} />
      </mesh>

      {/* Hinge */}
      <mesh rotation-z={Math.PI / 2} position={[0, BASE_T + 0.005, -D / 2 + 0.05]}>
        <cylinderGeometry args={[0.045, 0.045, 2.5, 24]} />
        <meshStandardMaterial {...GRAPHITE} />
      </mesh>

      <group ref={lid} position={[0, BASE_T + 0.01, -D / 2 + 0.05]}>
        <mesh geometry={lidGeo} position-y={LID_H / 2}>
          <meshStandardMaterial {...ALUMINIUM} />
        </mesh>
        {/* Glass bezel */}
        <mesh geometry={bezel} position={[0, LID_H / 2, LID_T / 2 + 0.001]}>
          <meshStandardMaterial color="#050506" metalness={0.2} roughness={0.25} />
        </mesh>
        <Screen
          textures={textures}
          index={index}
          power={power}
          width={3.2}
          height={2}
          radius={0.05}
          onOpen={onOpen}
          position={[0, LID_H / 2, LID_T / 2 + 0.002]}
        />
      </group>
    </group>
  )
}

function Phone({ textures, index, power, reduced, onOpen }) {
  const group = useRef()
  const body = useMemo(() => slabGeometry(0.8, 1.64, 0.13, 0.07), [])
  const glass = useMemo(() => new THREE.ShapeGeometry(roundedRect(0.76, 1.6, 0.11), 20), [])

  useFrame(({ clock }) => {
    if (reduced) return
    group.current.position.y = 1.02 + Math.sin(clock.elapsedTime * 0.9) * 0.035
  })

  return (
    <group ref={group} position={[2.55, 1.02, 1.15]} rotation={[-0.06, -0.3, 0.04]}>
      <mesh geometry={body}>
        <meshStandardMaterial {...GRAPHITE} />
      </mesh>
      <mesh geometry={glass} position-z={0.0355}>
        <meshStandardMaterial color="#050506" metalness={0.2} roughness={0.25} />
      </mesh>
      <Screen
        textures={textures}
        index={index}
        power={power}
        width={0.72}
        height={1.558}
        radius={0.09}
        onOpen={onOpen}
        position-z={0.0365}
      />
    </group>
  )
}

// Drag to turn the devices; they ease back to their resting angle when released.
// Touch only reacts to horizontal swipes, so vertical scrolling keeps working.
function Rig({ children, reduced, onInteract }) {
  const group = useRef()
  const { gl } = useThree()
  const state = useRef({ yaw: 0, pitch: 0, dragging: false, lastX: 0, lastY: 0, moved: false })

  useEffect(() => {
    const el = gl.domElement
    const s = state.current
    el.style.touchAction = 'pan-y'
    el.style.cursor = 'grab'

    const down = (e) => {
      s.dragging = true
      s.moved = false
      s.lastX = e.clientX
      s.lastY = e.clientY
      el.style.cursor = 'grabbing'
    }
    const move = (e) => {
      if (!s.dragging) return
      const dx = e.clientX - s.lastX
      const dy = e.clientY - s.lastY
      s.lastX = e.clientX
      s.lastY = e.clientY
      if (!s.moved && Math.abs(dx) + Math.abs(dy) > 2) {
        s.moved = true
        onInteract?.()
      }
      s.yaw = THREE.MathUtils.clamp(s.yaw + dx * 0.006, -0.8, 0.8)
      if (e.pointerType === 'mouse') s.pitch = THREE.MathUtils.clamp(s.pitch + dy * 0.004, -0.2, 0.4)
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

  useFrame(({ pointer, clock }, delta) => {
    const s = state.current
    if (!s.dragging) {
      const settle = Math.pow(0.08, delta)
      s.yaw *= settle
      s.pitch *= settle
    }
    const sway = reduced ? 0 : Math.sin(clock.elapsedTime * 0.35) * 0.035
    const hoverX = s.dragging ? 0 : pointer.x * 0.1
    const hoverY = s.dragging ? 0 : -pointer.y * 0.04
    const k = Math.min(1, delta * 7)
    const g = group.current
    g.rotation.y += (REST_YAW + s.yaw + sway + hoverX - g.rotation.y) * k
    g.rotation.x += (s.pitch + hoverY - g.rotation.x) * k
  })

  return (
    <group ref={group} rotation-y={REST_YAW}>
      {children}
    </group>
  )
}

// The canvas is wider than the column it belongs to, so the devices can turn
// without being cut off. This keeps them centred on that column (`frame`) and
// sized to it, by shifting the optical centre of the camera.
function CameraFit({ frame }) {
  const { camera, size, gl } = useThree()
  useLayoutEffect(() => {
    camera.manual = true
    const canvas = gl.domElement.getBoundingClientRect()
    const column = frame?.current?.getBoundingClientRect() ?? canvas
    const centre = column.left + column.width / 2 - canvas.left
    const fullWidth = 2 * Math.max(centre, size.width - centre)
    camera.aspect = fullWidth / size.height
    camera.setViewOffset(fullWidth, size.height, fullWidth / 2 - centre, 0, size.width, size.height)
    camera.position.set(0.1, 2.3, 8 * Math.max(1, 1.2 / (column.width / size.height)))
    camera.lookAt(0.22, 0.8, 0)
    camera.updateProjectionMatrix()
  }, [camera, size, gl, frame])
  return null
}

function Devices({ projects, index, reduced, onReady, onOpen }) {
  const desktop = useTexture(projects.map((p) => p.image))
  const mobile = useTexture(projects.map((p) => p.mobile))
  const { gl } = useThree()
  const progress = useRef(reduced ? 1 : 0)
  const power = useRef(reduced ? 1 : 0)
  const started = useRef(0)

  useLayoutEffect(() => {
    const anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy())
    ;[...desktop, ...mobile].forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace
      t.anisotropy = anisotropy
      t.needsUpdate = true
    })
  }, [desktop, mobile, gl])

  useEffect(() => {
    onReady?.()
  }, [onReady])

  // Opening sequence: the lid lifts, then the displays light up.
  useFrame(({ clock }) => {
    if (progress.current >= 1 && power.current >= 1) return
    if (!started.current) started.current = clock.elapsedTime + 0.25
    const t = clock.elapsedTime - started.current
    progress.current = THREE.MathUtils.clamp(t / 1.7, 0, 1)
    power.current = THREE.MathUtils.clamp((t - 0.75) / 0.8, 0, 1)
  })

  return (
    <>
      <Laptop textures={desktop} index={index} progress={progress} power={power} onOpen={onOpen} />
      <Phone textures={mobile} index={index} power={power} reduced={reduced} onOpen={onOpen} />
    </>
  )
}

export default function DeviceScene({ projects, index, frame, active = true, reduced = false, onReady, onInteract, onOpen }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: 30, near: 0.1, far: 60, position: [0.1, 2.3, 8] }}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <CameraFit frame={frame} />

      {/* Studio lighting: a large softbox above, a fill on the left and a warm rim on the right */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={5} position={[0, 7, 1]} rotation-x={Math.PI / 2} scale={[12, 7, 1]} />
        <Lightformer form="rect" intensity={2.2} position={[-7, 2.5, 3]} rotation-y={Math.PI / 2} scale={[8, 5, 1]} />
        <Lightformer form="rect" intensity={1.6} position={[7, 2, -1]} rotation-y={-Math.PI / 2} scale={[7, 4, 1]} color="#ffd2bd" />
        <Lightformer form="rect" intensity={1.2} position={[0, 2, -8]} scale={[12, 5, 1]} />
        <Lightformer form="rect" intensity={0.7} position={[0, 1, 9]} scale={[10, 4, 1]} />
      </Environment>
      <directionalLight position={[-3, 6, 4]} intensity={0.6} />

      <Rig reduced={reduced} onInteract={onInteract}>
        <Suspense fallback={null}>
          <Devices projects={projects} index={index} reduced={reduced} onReady={onReady} onOpen={onOpen} />
          <ContactShadows position={[0, 0.002, 0]} scale={14} resolution={512} blur={2.2} far={3} opacity={0.75} frames={150} />
        </Suspense>
      </Rig>
    </Canvas>
  )
}
