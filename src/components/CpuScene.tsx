import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Instance,
  Instances,
  RoundedBox,
  ContactShadows,
  Environment,
  Text,
} from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

/**
 * Full-page 3D motherboard scene.
 * Camera flies to a distinct component per section:
 *   top/hero  -> wide overview
 *   about     -> CPU heatspreader / die
 *   skills    -> RAM sticks
 *   experience-> chiplet cores under the IHS
 *   projects  -> GPU / expansion card
 *   education -> BIOS chip + coin battery
 *   contact   -> rear I/O port stack
 */

/* ---------------- camera targets ---------------- */
type Target = { pos: [number, number, number]; look: [number, number, number] };
const TARGETS: Record<string, Target> = {
  top:        { pos: [0, 10, 11], look: [0, 0, 0] },
  about:      { pos: [0.2, 3.4, 3.8], look: [0, 0.35, 0] },
  skills:     { pos: [4.8, 2.4, 3.6], look: [3.4, 0.5, 0] },
  experience: { pos: [-0.2, 1.35, 2.0], look: [0, 0.45, 0] },
  projects:   { pos: [-4.6, 2.4, 3.6], look: [-3.4, 0.55, 0.2] },
  education:  { pos: [3.0, 1.9, -1.2], look: [2.4, 0.2, -2.5] },
  contact:    { pos: [-2.4, 2.0, -1.2], look: [-2.6, 0.25, -3.1] },
};

/* ---------------- helpers ---------------- */
const Label = ({
  text,
  position,
  size = 0.22,
  color = "#dbeafe",
}: {
  text: string;
  position: [number, number, number];
  size?: number;
  color?: string;
}) => (
  <Text
    position={position}
    rotation={[-Math.PI / 2, 0, 0]}
    fontSize={size}
    color={color}
    anchorX="center"
    anchorY="middle"
    outlineWidth={0.008}
    outlineColor="#0b1a3a"
    letterSpacing={0.08}
  >
    {text}
  </Text>
);

/* ---------------- PCB (motherboard) ---------------- */
const Board = () => {
  // mounting screws + capacitors scattered on the board
  const screws: [number, number, number][] = [
    [-5.2, 0.02, -3.6], [5.2, 0.02, -3.6],
    [-5.2, 0.02, 3.6],  [5.2, 0.02, 3.6],
  ];
  const caps = useMemo(() => {
    const arr: [number, number, number][] = [];
    const spots = [
      [-1.9, -1.9], [-2.0, 1.8], [1.9, 1.9], [1.9, -1.9],
      [-1.2, -2.9], [1.2, -2.9], [0, 2.9], [0, -2.9],
      [2.7, 0.6], [2.7, -0.6], [-2.7, 0.6], [-2.7, -0.6],
    ];
    spots.forEach(([x, z]) => arr.push([x, 0.15, z]));
    return arr;
  }, []);

  return (
    <group>
      {/* base PCB with silkscreen tone */}
      <RoundedBox args={[11, 0.28, 8]} radius={0.14} smoothness={4} position={[0, -0.14, 0]} receiveShadow>
        <meshStandardMaterial color="#0a1f4a" roughness={0.7} metalness={0.25} />
      </RoundedBox>
      {/* solder-mask top layer, slightly lighter, embossed lines */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10.85, 7.85]} />
        <meshStandardMaterial color="#0e2a63" roughness={0.85} metalness={0.2} />
      </mesh>

      {/* mounting screws (gold) */}
      {screws.map((p, i) => (
        <group key={i} position={p}>
          <mesh>
            <cylinderGeometry args={[0.14, 0.14, 0.08, 20]} />
            <meshStandardMaterial color="#facc15" metalness={0.95} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[0.18, 0.02, 0.04]} />
            <meshStandardMaterial color="#78350f" />
          </mesh>
        </group>
      ))}

      {/* capacitors (cylinders) */}
      {caps.map((p, i) => (
        <group key={i} position={p}>
          <mesh>
            <cylinderGeometry args={[0.14, 0.14, 0.36, 20]} />
            <meshStandardMaterial color="#1e293b" metalness={0.55} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.19, 0]}>
            <cylinderGeometry args={[0.14, 0.14, 0.008, 20]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

/* ---------------- traces (silkscreen circuit lines) ---------------- */
const Traces = () => {
  const group = useRef<THREE.Group>(null);
  const segs = useMemo(() => {
    const s: { pos: [number, number, number]; scale: [number, number, number] }[] = [];
    for (let i = -5; i <= 5; i++) {
      s.push({ pos: [i * 0.85, 0.011, 0], scale: [0.015, 1, 7.2] });
      s.push({ pos: [0, 0.011, i * 0.62], scale: [10.4, 1, 0.015] });
    }
    return s;
  }, []);
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.children.forEach((c, i) => {
      const m = (c as THREE.Mesh).material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 0.35 + (Math.sin(t * 1.4 + i * 0.4) * 0.5 + 0.5) * 0.9;
    });
  });
  return (
    <group ref={group}>
      {segs.map((l, i) => (
        <mesh key={i} position={l.pos} scale={l.scale}>
          <boxGeometry args={[1, 0.008, 1]} />
          <meshStandardMaterial
            color="#60a5fa"
            emissive="#3b82f6"
            emissiveIntensity={0.6}
            toneMapped={false}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

/* ---------------- CPU package ---------------- */
const Cpu = () => {
  const ihsRef = useRef<THREE.MeshStandardMaterial>(null);
  const coreGroup = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ihsRef.current) ihsRef.current.emissiveIntensity = 0.05 + Math.sin(t * 1.2) * 0.04;
    if (coreGroup.current) {
      coreGroup.current.children.forEach((c, i) => {
        const m = (c as THREE.Mesh).material as THREE.MeshStandardMaterial;
        m.emissiveIntensity = 1.4 + Math.sin(t * 2.2 + i * 1.1) * 1.1;
      });
    }
  });

  const cores = useMemo(() => {
    const arr: [number, number][] = [];
    for (let x = -1; x <= 1; x += 2)
      for (let z = -1; z <= 1; z += 2) arr.push([x * 0.45, z * 0.45]);
    return arr;
  }, []);

  const pins = useMemo(() => {
    const arr: [number, number, number][] = [];
    const n = 28;
    const half = 1.55;
    for (let i = 0; i < n; i++) {
      const t = -half + (i / (n - 1)) * (half * 2);
      arr.push([t, -0.24, -1.62]);
      arr.push([t, -0.24, 1.62]);
      arr.push([-1.62, -0.24, t]);
      arr.push([1.62, -0.24, t]);
    }
    return arr;
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* substrate (green FR4 with gold pads) */}
      <RoundedBox args={[3.5, 0.15, 3.5]} radius={0.06} smoothness={3} position={[0, -0.04, 0]}>
        <meshStandardMaterial color="#0e2f18" roughness={0.7} metalness={0.2} />
      </RoundedBox>

      {/* silicon die visible under a translucent heat spreader */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[2.2, 0.05, 2.2]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* glowing chiplet cores */}
      <group ref={coreGroup}>
        {cores.map(([x, z], i) => (
          <mesh key={i} position={[x, 0.09, z]}>
            <boxGeometry args={[0.7, 0.03, 0.7]} />
            <meshStandardMaterial
              color="#60a5fa"
              emissive="#3b82f6"
              emissiveIntensity={2}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

      {/* Integrated Heat Spreader (metallic, beveled) */}
      <RoundedBox args={[2.8, 0.22, 2.8]} radius={0.09} smoothness={4} position={[0, 0.22, 0]} castShadow>
        <meshStandardMaterial
          ref={ihsRef}
          color="#cbd5e1"
          metalness={0.95}
          roughness={0.25}
          emissive="#3b82f6"
          emissiveIntensity={0.05}
        />
      </RoundedBox>
      {/* engraved CPU label on the IHS */}
      <Text
        position={[0, 0.34, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.28}
        color="#0f172a"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.12}
      >
        CPU
      </Text>
      <Text
        position={[0, 0.34, 0.55]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.11}
        color="#334155"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.3}
      >
        MA-CORE i9
      </Text>

      {/* corner triangle marker */}
      <mesh position={[-1.25, 0.34, -1.25]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.06, 3]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.6} />
      </mesh>

      {/* pins */}
      <Instances limit={pins.length}>
        <boxGeometry args={[0.05, 0.14, 0.05]} />
        <meshStandardMaterial color="#facc15" metalness={0.95} roughness={0.25} />
        {pins.map((p, i) => <Instance key={i} position={p} />)}
      </Instances>

      {/* floating label above CPU */}
      <Label text="PROCESSOR" position={[0, 1.6, -2.1]} size={0.18} />
    </group>
  );
};

/* ---------------- RAM sticks (DIMMs) ---------------- */
const Ram = () => {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.children.forEach((stick, i) => {
      // find the "chip" meshes
      stick.traverse((n) => {
        const m = (n as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
        if (m && m.userData?.pulse) {
          m.emissiveIntensity = 0.4 + Math.sin(t * 3 + i * 0.7) * 0.8;
        }
      });
    });
  });

  const sticks = [0, 1, 2, 3];
  return (
    <group ref={ref} position={[3.4, 0, 0]}>
      {sticks.map((i) => (
        <group key={i} position={[i * 0.42 - 0.7, 0.5, 0]}>
          {/* PCB */}
          <mesh>
            <boxGeometry args={[0.08, 1.0, 2.6]} />
            <meshStandardMaterial color="#0e2f18" roughness={0.6} />
          </mesh>
          {/* heat spreader (metallic) with slots */}
          <RoundedBox args={[0.16, 0.85, 2.55]} radius={0.03} smoothness={3} position={[0, 0.02, 0]}>
            <meshStandardMaterial
              color={i % 2 ? "#3b82f6" : "#1e40af"}
              metalness={0.9}
              roughness={0.3}
              // @ts-expect-error attach pulse marker
              userData={{ pulse: true }}
              emissive="#3b82f6"
              emissiveIntensity={0.4}
            />
          </RoundedBox>
          {/* fin slots (dark strips) */}
          {[-0.8, -0.4, 0, 0.4, 0.8].map((z, j) => (
            <mesh key={j} position={[0.085, 0.25, z]}>
              <boxGeometry args={[0.01, 0.35, 0.06]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
          ))}
          {/* gold contact edge */}
          <mesh position={[0, -0.53, 0]}>
            <boxGeometry args={[0.09, 0.06, 2.5]} />
            <meshStandardMaterial color="#facc15" metalness={0.95} roughness={0.25} />
          </mesh>
        </group>
      ))}
      <Label text="MEMORY" position={[0, 1.4, 1.9]} size={0.18} />
    </group>
  );
};

/* ---------------- GPU / expansion card ---------------- */
const Gpu = () => {
  const fanA = useRef<THREE.Group>(null);
  const fanB = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (fanA.current) fanA.current.rotation.y += dt * 8;
    if (fanB.current) fanB.current.rotation.y -= dt * 8;
  });

  const Fan = ({ innerRef }: { innerRef: React.RefObject<THREE.Group> }) => (
    <group ref={innerRef}>
      <mesh>
        <cylinderGeometry args={[0.55, 0.55, 0.06, 32]} />
        <meshStandardMaterial color="#0b1220" metalness={0.6} roughness={0.4} />
      </mesh>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <mesh
          key={a}
          rotation={[0, (a * Math.PI) / 180, 0.35]}
          position={[0.24 * Math.cos((a * Math.PI) / 180), 0.04, 0.24 * Math.sin((a * Math.PI) / 180)]}
        >
          <boxGeometry args={[0.5, 0.02, 0.14]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      ))}
      {/* hub */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.04, 20]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );

  return (
    <group position={[-3.6, 0.35, 0]}>
      {/* main shroud */}
      <RoundedBox args={[2.6, 0.7, 3.3]} radius={0.08} smoothness={3}>
        <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.35} />
      </RoundedBox>
      {/* accent strip along top */}
      <mesh position={[0, 0.36, 0]}>
        <boxGeometry args={[2.55, 0.02, 3.25]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={1.4} toneMapped={false} />
      </mesh>
      {/* dual fans */}
      <group position={[0, 0.4, -0.8]}><Fan innerRef={fanA} /></group>
      <group position={[0, 0.4, 0.8]}><Fan innerRef={fanB} /></group>
      {/* PCIe gold fingers */}
      <mesh position={[0, -0.42, 0]}>
        <boxGeometry args={[2.4, 0.05, 0.45]} />
        <meshStandardMaterial color="#facc15" metalness={0.95} roughness={0.25} />
      </mesh>
      {/* IO bracket (right side) */}
      <mesh position={[0, 0.05, -1.75]}>
        <boxGeometry args={[2.5, 0.9, 0.06]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.4} />
      </mesh>
      <Label text="GPU · PROJECTS" position={[0, 1.35, 0]} size={0.18} />
    </group>
  );
};

/* ---------------- BIOS chip + CMOS battery ---------------- */
const BiosChip = () => {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (mat.current) mat.current.emissiveIntensity = 0.4 + Math.sin(clock.getElapsedTime() * 2) * 0.5;
  });
  return (
    <group position={[2.3, 0.05, -2.6]}>
      {/* DIP-style chip with notch */}
      <mesh>
        <boxGeometry args={[1.0, 0.15, 0.65]} />
        <meshStandardMaterial ref={mat} color="#0f172a" emissive="#3b82f6" emissiveIntensity={0.6} />
      </mesh>
      {/* notch */}
      <mesh position={[-0.42, 0.08, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      {/* legs (gold) */}
      {[-0.35, -0.15, 0.05, 0.25, 0.45].map((x) => (
        <group key={x}>
          <mesh position={[x, -0.05, -0.36]}>
            <boxGeometry args={[0.05, 0.05, 0.06]} />
            <meshStandardMaterial color="#facc15" metalness={0.95} roughness={0.25} />
          </mesh>
          <mesh position={[x, -0.05, 0.36]}>
            <boxGeometry args={[0.05, 0.05, 0.06]} />
            <meshStandardMaterial color="#facc15" metalness={0.95} roughness={0.25} />
          </mesh>
        </group>
      ))}
      <Text
        position={[0, 0.09, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.09}
        color="#e2e8f0"
        anchorX="center"
        letterSpacing={0.2}
      >
        BIOS
      </Text>
      {/* CMOS coin battery next to it */}
      <group position={[0.9, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.32, 0.32, 0.08, 32]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.2} />
        </mesh>
        <Text
          position={[0, 0.045, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.08}
          color="#0f172a"
          anchorX="center"
        >
          CR2032
        </Text>
      </group>
      <Label text="BIOS · EDUCATION" position={[0.4, 1.1, 0]} size={0.14} />
    </group>
  );
};

/* ---------------- Rear I/O port stack ---------------- */
const IOPorts = () => {
  return (
    <group position={[-2.6, 0.2, -3.15]}>
      {/* metal shield */}
      <mesh position={[0, 0.1, 0.15]}>
        <boxGeometry args={[2.8, 0.9, 0.05]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.85} roughness={0.35} />
      </mesh>

      {/* USB stack (blue insert) */}
      {[-1.15, -1.15].map((_, i) => (
        <group key={i} position={[-1.15, 0.05 + i * 0.32, 0]}>
          <mesh>
            <boxGeometry args={[0.5, 0.22, 0.5]} />
            <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[0.4, 0.14, 0.42]} />
            <meshStandardMaterial color="#1e3a8a" emissive="#1e40af" emissiveIntensity={0.6} />
          </mesh>
        </group>
      ))}

      {/* Ethernet */}
      <group position={[-0.35, 0.2, 0]}>
        <mesh>
          <boxGeometry args={[0.55, 0.5, 0.55]} />
          <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.12, 0.05]}>
          <boxGeometry args={[0.14, 0.08, 0.02]} />
          <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={1.2} />
        </mesh>
      </group>

      {/* HDMI */}
      <group position={[0.55, 0.05, 0]}>
        <mesh>
          <boxGeometry args={[0.55, 0.22, 0.5]} />
          <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.42, 0.13, 0.42]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
      </group>

      {/* Audio jacks (3 circles) */}
      {[-0.2, 0, 0.2].map((x) => (
        <mesh key={x} position={[1.4 + x, 0.2, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.28, 20]} />
          <meshStandardMaterial color={x === -0.2 ? "#22c55e" : x === 0 ? "#ec4899" : "#3b82f6"} metalness={0.7} roughness={0.35} />
        </mesh>
      ))}

      <Label text="I/O · CONTACT" position={[0, 1.2, 0]} size={0.16} />
    </group>
  );
};

/* ---------------- data particles ---------------- */
const DataStream = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 300;
  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 10.5;
      positions[i * 3 + 1] = Math.random() * 3 + 0.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 7.5;
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
      <pointsMaterial size={0.035} color="#93c5fd" transparent opacity={0.85} sizeAttenuation depthWrite={false} />
    </points>
  );
};

/* ---------------- camera rig ---------------- */
const CameraRig = ({ targetRef }: { targetRef: React.MutableRefObject<Target> }) => {
  const look = useRef(new THREE.Vector3(0, 0, 0));
  useFrame(({ camera }, dt) => {
    const t = targetRef.current;
    const k = Math.min(1, dt * 1.7);
    camera.position.x += (t.pos[0] - camera.position.x) * k;
    camera.position.y += (t.pos[1] - camera.position.y) * k;
    camera.position.z += (t.pos[2] - camera.position.z) * k;
    const kl = Math.min(1, dt * 2.2);
    look.current.x += (t.look[0] - look.current.x) * kl;
    look.current.y += (t.look[1] - look.current.y) * kl;
    look.current.z += (t.look[2] - look.current.z) * kl;
    camera.lookAt(look.current);
  });
  return null;
};

/* ---------------- Scene ---------------- */
const SceneContents = ({ targetRef }: { targetRef: React.MutableRefObject<Target> }) => (
  <>
    <fog attach="fog" args={["#e6efff", 14, 30]} />
    <ambientLight intensity={0.4} />
    <directionalLight position={[6, 10, 4]} intensity={1.3} color="#ffffff" castShadow />
    <pointLight position={[0, 3, 0]} intensity={2.6} color="#3b82f6" distance={16} />
    <pointLight position={[-5, 2, 3]} intensity={1.4} color="#1e3a8a" distance={14} />
    <pointLight position={[5, 2, -3]} intensity={1.2} color="#60a5fa" distance={14} />

    <Environment preset="city" />

    <Board />
    <Traces />
    <Cpu />
    <Ram />
    <Gpu />
    <BiosChip />
    <IOPorts />
    <DataStream />

    <ContactShadows position={[0, -0.28, 0]} opacity={0.55} scale={16} blur={2.4} far={4} />

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
        maskImage: "radial-gradient(ellipse at center, black 62%, transparent 96%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 62%, transparent 96%)",
      }}
    >
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: TARGETS.top.pos, fov: 40 }}
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