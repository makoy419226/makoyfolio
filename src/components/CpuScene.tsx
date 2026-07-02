import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Instances, Instance } from "@react-three/drei";
import { useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import * as THREE from "three";

/**
 * Full-page 3D CPU scene background.
 * Camera flies into the die as the user scrolls, circuits pulse,
 * data particles stream across the substrate.
 */

/* ---------- CPU body ---------- */
const CpuBody = () => {
  const dieRef = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (dieRef.current) {
      // subtle emissive pulse
      const t = clock.getElapsedTime();
      dieRef.current.emissiveIntensity = 0.8 + Math.sin(t * 1.4) * 0.35;
    }
  });

  return (
    <group>
      {/* substrate (green-ish dark navy PCB square) */}
      <mesh position={[0, -0.12, 0]} receiveShadow castShadow>
        <boxGeometry args={[4.2, 0.18, 4.2]} />
        <meshStandardMaterial
          color="#0b1a3a"
          roughness={0.55}
          metalness={0.35}
        />
      </mesh>

      {/* die (silicon top) */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[2.6, 0.14, 2.6]} />
        <meshStandardMaterial
          ref={dieRef}
          color="#1e56aa"
          emissive="#3b82f6"
          emissiveIntensity={1.1}
          roughness={0.25}
          metalness={0.7}
        />
      </mesh>

      {/* engraved circuit grid on the die */}
      <CircuitGrid />

      {/* pins around edges */}
      <Pins />

      {/* corner marker */}
      <mesh position={[-1.15, 0.13, -1.15]}>
        <cylinderGeometry args={[0.06, 0.06, 0.03, 24]} />
        <meshStandardMaterial color="#93c5fd" emissive="#60a5fa" emissiveIntensity={2} />
      </mesh>
    </group>
  );
};

/* ---------- Circuit traces on die ---------- */
const CircuitGrid = () => {
  const groupRef = useRef<THREE.Group>(null);
  const lines = useMemo(() => {
    const segs: { pos: [number, number, number]; scale: [number, number, number] }[] = [];
    const step = 0.22;
    for (let i = -5; i <= 5; i++) {
      const x = i * step;
      // long horizontal + vertical traces with random gaps
      if (Math.abs(i) % 2 === 0) {
        segs.push({ pos: [x, 0.131, 0], scale: [0.02, 1, 2.4] });
      }
      if (Math.abs(i) % 2 === 1) {
        segs.push({ pos: [0, 0.131, x], scale: [2.4, 1, 0.02] });
      }
    }
    return segs;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((c, i) => {
      const m = (c as THREE.Mesh).material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 1.2 + Math.sin(t * 2 + i * 0.6) * 0.9;
    });
  });

  return (
    <group ref={groupRef}>
      {lines.map((l, i) => (
        <mesh key={i} position={l.pos} scale={l.scale}>
          <boxGeometry args={[1, 0.02, 1]} />
          <meshStandardMaterial
            color="#60a5fa"
            emissive="#3b82f6"
            emissiveIntensity={1.5}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
};

/* ---------- Pins around CPU ---------- */
const Pins = () => {
  const positions = useMemo(() => {
    const arr: [number, number, number][] = [];
    const n = 28;
    const half = 2.0;
    for (let i = 0; i < n; i++) {
      const t = -half + (i / (n - 1)) * (half * 2);
      arr.push([t, -0.24, -2.05]);
      arr.push([t, -0.24,  2.05]);
      arr.push([-2.05, -0.24, t]);
      arr.push([ 2.05, -0.24, t]);
    }
    return arr;
  }, []);

  return (
    <Instances limit={positions.length}>
      <boxGeometry args={[0.06, 0.16, 0.06]} />
      <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.25} />
      {positions.map((p, i) => (
        <Instance key={i} position={p} />
      ))}
    </Instances>
  );
};

/* ---------- Data particles ---------- */
const DataStream = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 220;
  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = Math.random() * 3 + 0.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      seeds[i] = Math.random();
    }
    return { positions, seeds };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const arr = (ref.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] = ((seeds[i] * 3 + t * 0.35) % 3) + 0.2;
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

/* ---------- Camera rig driven by scroll ---------- */
const CameraRig = ({ progress }: { progress: React.MutableRefObject<number> }) => {
  const { camera } = useThree();
  useFrame(({ clock }) => {
    const p = progress.current; // 0 -> 1
    const t = clock.getElapsedTime();
    // start: high above, angled; end: skimming across the die
    const radius = THREE.MathUtils.lerp(7.5, 2.2, p);
    const height = THREE.MathUtils.lerp(4.2, 0.55, p);
    const angle = t * 0.08 + p * Math.PI * 0.6;
    camera.position.x = Math.cos(angle) * radius;
    camera.position.z = Math.sin(angle) * radius;
    camera.position.y = height;
    camera.lookAt(0, THREE.MathUtils.lerp(0.1, 0.12, p), 0);
  });
  return null;
};

/* ---------- Scene composition ---------- */
const SceneContents = ({ progress }: { progress: React.MutableRefObject<number> }) => {
  return (
    <>
      <fog attach="fog" args={["#dfeaf8", 6, 18]} />

      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 8, 4]} intensity={1.2} color="#ffffff" />
      <pointLight position={[0, 3, 0]} intensity={2.2} color="#3b82f6" distance={10} />
      <pointLight position={[-4, 1.5, 4]} intensity={1.4} color="#1e3a8a" distance={12} />

      <Float speed={0.6} rotationIntensity={0.15} floatIntensity={0.3}>
        <CpuBody />
      </Float>

      <DataStream />

      {/* reflective floor for depth */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#c9d8ee" roughness={0.75} metalness={0.15} />
      </mesh>

      <CameraRig progress={progress} />
    </>
  );
};

const CpuScene = () => {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 0.4 });
  const progressRef = useRef(0);
  // mirror motion value into a ref so the r3f loop can read it cheaply
  useTransform(smooth, (v) => {
    progressRef.current = v;
    return v;
  });
  // subscribe so the transform actually runs
  useMemo(() => smooth.on("change", (v) => (progressRef.current = v)), [smooth]);

  if (reduce) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        maskImage:
          "radial-gradient(ellipse at center, black 55%, transparent 95%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 55%, transparent 95%)",
      }}
    >
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [5, 4, 5], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <SceneContents progress={progressRef} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CpuScene;