import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Instance, Instances, RoundedBox } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

/**
 * Full-page 3D motherboard/CPU scene.
 * As the visitor scrolls between sections, the camera flies to the part of
 * the motherboard that maps to that section:
 *   hero       -> wide overview of the whole board
 *   about      -> CPU die (the "brain")
 *   skills     -> RAM modules (memory = toolkit)
 *   experience -> CPU chiplet cores (roles = cores)
 *   projects   -> GPU / expansion card (shipped work)
 *   education  -> BIOS / firmware chip (foundation)
 *   contact    -> I/O ports (reach out)
 */

/* ---------------- camera targets per section ---------------- */
type Target = {
  pos: [number, number, number];
  look: [number, number, number];
};
const TARGETS: Record<string, Target> = {
  top:        { pos: [0, 9.5, 10], look: [0, 0, 0] },
  hero:       { pos: [0, 9.5, 10], look: [0, 0, 0] },
  about:      { pos: [0, 3.2, 3.6], look: [0, 0.2, 0] },
  skills:     { pos: [4.6, 2.6, 3.8], look: [3.4, 0.4, 0] },
  experience: { pos: [-0.4, 1.4, 1.9], look: [0, 0.25, 0] },
  projects:   { pos: [-4.6, 2.6, 3.8], look: [-3.4, 0.4, 0.4] },
  education:  { pos: [2.6, 1.9, -1.2], look: [2.2, 0.15, -2.4] },
  contact:    { pos: [-2.4, 1.9, -1.4], look: [-2.4, 0.15, -3.0] },
};

/* ---------------- board (PCB) ---------------- */
const Board = () => (
  <RoundedBox args={[11, 0.25, 8]} radius={0.12} smoothness={4} position={[0, -0.14, 0]} receiveShadow>
    <meshStandardMaterial color="#0b1a3a" roughness={0.55} metalness={0.35} />
  </RoundedBox>
);

/* ---------------- CPU (die + cores + pins) ---------------- */
const Cpu = () => {
  const dieMat = useRef<THREE.MeshStandardMaterial>(null);
  const coreGroup = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (dieMat.current) dieMat.current.emissiveIntensity = 0.9 + Math.sin(t * 1.3) * 0.35;
    if (coreGroup.current) {
      coreGroup.current.children.forEach((c, i) => {
        const m = (c as THREE.Mesh).material as THREE.MeshStandardMaterial;
        m.emissiveIntensity = 1.4 + Math.sin(t * 2.2 + i * 1.1) * 1.1;
      });
    }
  });

  // 4 chiplet "cores" on the die
  const cores = useMemo(() => {
    const arr: [number, number][] = [];
    for (let x = -1; x <= 1; x += 2)
      for (let z = -1; z <= 1; z += 2) arr.push([x * 0.45, z * 0.45]);
    return arr;
  }, []);

  // pin ring
  const pins = useMemo(() => {
    const arr: [number, number, number][] = [];
    const n = 26;
    const half = 1.6;
    for (let i = 0; i < n; i++) {
      const t = -half + (i / (n - 1)) * (half * 2);
      arr.push([t, -0.22, -1.65]);
      arr.push([t, -0.22, 1.65]);
      arr.push([-1.65, -0.22, t]);
      arr.push([1.65, -0.22, t]);
    }
    return arr;
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* CPU substrate */}
      <RoundedBox args={[3.4, 0.18, 3.4]} radius={0.05} smoothness={3} position={[0, -0.02, 0]}>
        <meshStandardMaterial color="#0e2a5a" metalness={0.5} roughness={0.4} />
      </RoundedBox>
      {/* Silicon die */}
      <mesh position={[0, 0.11, 0]}>
        <boxGeometry args={[2.2, 0.08, 2.2]} />
        <meshStandardMaterial
          ref={dieMat}
          color="#1e56aa"
          emissive="#3b82f6"
          emissiveIntensity={1}
          roughness={0.22}
          metalness={0.75}
        />
      </mesh>
      {/* Chiplet cores (experience = cores) */}
      <group ref={coreGroup}>
        {cores.map(([x, z], i) => (
          <mesh key={i} position={[x, 0.17, z]}>
            <boxGeometry args={[0.7, 0.05, 0.7]} />
            <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={2} toneMapped={false} />
          </mesh>
        ))}
      </group>
      {/* corner marker */}
      <mesh position={[-1.0, 0.16, -1.0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 20]} />
        <meshStandardMaterial color="#93c5fd" emissive="#60a5fa" emissiveIntensity={2} />
      </mesh>
      {/* pins */}
      <Instances limit={pins.length}>
        <boxGeometry args={[0.05, 0.14, 0.05]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.25} />
        {pins.map((p, i) => <Instance key={i} position={p} />)}
      </Instances>
    </group>
  );
};

/* ---------------- RAM modules (skills) ---------------- */
const Ram = () => {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.children.forEach((stick, i) => {
      stick.children.forEach((chip, j) => {
        const m = (chip as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
        if (m && "emissiveIntensity" in m) {
          m.emissiveIntensity = 0.6 + Math.sin(t * 3 + i + j * 0.6) * 0.6;
        }
      });
    });
  });
  const sticks = [0, 1, 2, 3];
  return (
    <group ref={ref} position={[3.4, 0, 0]}>
      {sticks.map((i) => (
        <group key={i} position={[i * 0.35 - 0.5, 0.35, 0]}>
          <mesh>
            <boxGeometry args={[0.16, 0.7, 2.6]} />
            <meshStandardMaterial color="#123063" metalness={0.6} roughness={0.4} />
          </mesh>
          {[-1, -0.5, 0, 0.5, 1].map((z, j) => (
            <mesh key={j} position={[0.09, 0.05, z]}>
              <boxGeometry args={[0.02, 0.28, 0.36]} />
              <meshStandardMaterial color="#1e293b" emissive="#3b82f6" emissiveIntensity={0.8} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
};

/* ---------------- GPU / expansion card (projects) ---------------- */
const Gpu = () => {
  const fan = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (fan.current) fan.current.rotation.y += dt * 6;
  });
  return (
    <group position={[-3.6, 0.35, 0]}>
      <RoundedBox args={[2.6, 0.7, 3.2]} radius={0.06} smoothness={3}>
        <meshStandardMaterial color="#0f2b66" metalness={0.6} roughness={0.35} />
      </RoundedBox>
      {[-0.7, 0.7].map((z) => (
        <group key={z} ref={z === -0.7 ? fan : undefined} position={[0, 0.4, z]}>
          <mesh>
            <cylinderGeometry args={[0.55, 0.55, 0.05, 24]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <mesh key={a} rotation={[0, (a * Math.PI) / 180, 0]} position={[0, 0.035, 0]}>
              <boxGeometry args={[0.5, 0.02, 0.12]} />
              <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.6} />
            </mesh>
          ))}
        </group>
      ))}
      {/* PCIe strip */}
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[2.4, 0.05, 0.4]} />
        <meshStandardMaterial color="#eab308" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
};

/* ---------------- BIOS chip (education) ---------------- */
const BiosChip = () => {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (mat.current) mat.current.emissiveIntensity = 0.5 + Math.sin(clock.getElapsedTime() * 2) * 0.5;
  });
  return (
    <group position={[2.3, 0.06, -2.6]}>
      <mesh>
        <boxGeometry args={[1.0, 0.15, 0.7]} />
        <meshStandardMaterial ref={mat} color="#111827" emissive="#3b82f6" emissiveIntensity={0.7} />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[0.6, 0.02, 0.3]} />
        <meshStandardMaterial color="#93c5fd" emissive="#60a5fa" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
};

/* ---------------- I/O ports (contact) ---------------- */
const IOPorts = () => (
  <group position={[-2.6, 0.15, -3.2]}>
    {[-1.2, -0.4, 0.4, 1.2].map((x) => (
      <mesh key={x} position={[x, 0, 0]}>
        <boxGeometry args={[0.55, 0.35, 0.55]} />
        <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.3} />
      </mesh>
    ))}
  </group>
);

/* ---------------- circuit traces on board ---------------- */
const Traces = () => {
  const group = useRef<THREE.Group>(null);
  const segs = useMemo(() => {
    const s: { pos: [number, number, number]; scale: [number, number, number] }[] = [];
    for (let i = -5; i <= 5; i++) {
      s.push({ pos: [i * 0.8, 0.001, 0], scale: [0.02, 1, 7.4] });
      s.push({ pos: [0, 0.001, i * 0.6], scale: [10.4, 1, 0.02] });
    }
    return s;
  }, []);
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.children.forEach((c, i) => {
      const m = (c as THREE.Mesh).material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 0.4 + (Math.sin(t * 1.4 + i * 0.4) * 0.5 + 0.5) * 0.9;
    });
  });
  return (
    <group ref={group}>
      {segs.map((l, i) => (
        <mesh key={i} position={l.pos} scale={l.scale}>
          <boxGeometry args={[1, 0.01, 1]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.6} toneMapped={false} transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  );
};

/* ---------------- data particles ---------------- */
const DataStream = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 260;
  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = Math.random() * 3 + 0.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 7;
      seeds[i] = Math.random();
    }
    return { positions, seeds };
  }, []);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const arr = (ref.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] = ((seeds[i] * 3 + t * 0.35) % 3) + 0.15;
    }
    (ref.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#93c5fd" transparent opacity={0.9} sizeAttenuation depthWrite={false} />
    </points>
  );
};

/* ---------------- camera rig (eases to active section target) ---------------- */
const CameraRig = ({ targetRef }: { targetRef: React.MutableRefObject<Target> }) => {
  const look = useRef(new THREE.Vector3(0, 0, 0));
  useFrame(({ camera }, dt) => {
    const t = targetRef.current;
    // ease camera position
    camera.position.x += (t.pos[0] - camera.position.x) * Math.min(1, dt * 1.6);
    camera.position.y += (t.pos[1] - camera.position.y) * Math.min(1, dt * 1.6);
    camera.position.z += (t.pos[2] - camera.position.z) * Math.min(1, dt * 1.6);
    // ease lookAt
    look.current.x += (t.look[0] - look.current.x) * Math.min(1, dt * 2);
    look.current.y += (t.look[1] - look.current.y) * Math.min(1, dt * 2);
    look.current.z += (t.look[2] - look.current.z) * Math.min(1, dt * 2);
    camera.lookAt(look.current);
  });
  return null;
};

/* ---------------- Scene ---------------- */
const SceneContents = ({ targetRef }: { targetRef: React.MutableRefObject<Target> }) => (
  <>
    <fog attach="fog" args={["#dfeaf8", 10, 26]} />
    <ambientLight intensity={0.55} />
    <directionalLight position={[6, 10, 4]} intensity={1.1} color="#ffffff" />
    <pointLight position={[0, 3, 0]} intensity={2.4} color="#3b82f6" distance={14} />
    <pointLight position={[-5, 2, 3]} intensity={1.4} color="#1e3a8a" distance={14} />
    <pointLight position={[5, 2, -3]} intensity={1.2} color="#60a5fa" distance={14} />

    <Board />
    <Traces />
    <Cpu />
    <Ram />
    <Gpu />
    <BiosChip />
    <IOPorts />
    <DataStream />

    <CameraRig targetRef={targetRef} />
  </>
);

/* ---------------- section tracker ---------------- */
const useActiveSection = (ids: string[], fallback: string) => {
  const [active, setActive] = useState<string>(fallback);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setActive(vis.target.id);
        else if (window.scrollY < 120) setActive(fallback);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids.join("|"), fallback]);
  return active;
};

const CpuScene = () => {
  const reduce = useReducedMotion();
  const active = useActiveSection(
    ["about", "skills", "experience", "projects", "education", "contact"],
    "top"
  );
  const targetRef = useRef<Target>(TARGETS.top);
  useEffect(() => {
    targetRef.current = TARGETS[active] ?? TARGETS.top;
  }, [active]);

  if (reduce) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        maskImage: "radial-gradient(ellipse at center, black 60%, transparent 96%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 60%, transparent 96%)",
      }}
    >
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: TARGETS.top.pos, fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <SceneContents targetRef={targetRef} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CpuScene;