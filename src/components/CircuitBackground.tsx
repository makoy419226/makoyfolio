import { useEffect, useRef } from "react";
import * as THREE from "three";

const CircuitBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xeaf3fb, 0.045);

    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    const accent = new THREE.Color(0x2563eb);
    const ink = new THREE.Color(0x0f3a7a);
    const teal = new THREE.Color(0x0d9488);
    const amber = new THREE.Color(0xf59e0b);

    const nodeCount = 58;
    const nodeGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(nodeCount * 3);
    const velocities: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 36;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.005,
      ));
    }
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const nodeMat = new THREE.PointsMaterial({ color: ink, size: 0.14, sizeAttenuation: true, transparent: true, opacity: 0.42 });
    scene.add(new THREE.Points(nodeGeo, nodeMat));

    const lineMax = 130;
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(lineMax * 6);
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({ color: ink, transparent: true, opacity: 0.11 });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    const geometries = [
      new THREE.IcosahedronGeometry(1.5, 0),
      new THREE.OctahedronGeometry(1.1, 0),
      new THREE.TorusGeometry(1, 0.28, 8, 18),
      new THREE.BoxGeometry(1.6, 1.6, 1.6),
    ];
    const shapes: THREE.Mesh[] = [];

    const palette = [accent, teal, amber, ink];
    for (let i = 0; i < 7; i++) {
      const mesh = new THREE.Mesh(
        geometries[i % geometries.length],
        new THREE.MeshBasicMaterial({
          color: palette[i % palette.length],
          wireframe: true,
          transparent: true,
          opacity: i % 4 === 0 ? 0.22 : i % 4 === 1 ? 0.14 : 0.09,
        }),
      );
      mesh.position.set((Math.random() - 0.5) * 26, (Math.random() - 0.5) * 16, (Math.random() - 0.5) * 10 - 3);
      mesh.userData.rotSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.003,
        (Math.random() - 0.5) * 0.003,
        (Math.random() - 0.5) * 0.0015,
      );
      mesh.userData.floatPhase = Math.random() * Math.PI * 2;
      mesh.userData.basePos = mesh.position.clone();
      shapes.push(mesh);
      scene.add(mesh);
    }

    const pulseCount = 18;
    const pulseGeo = new THREE.BufferGeometry();
    const pulsePos = new Float32Array(pulseCount * 3);
    const pulses: { a: number; b: number; t: number; speed: number }[] = [];
    for (let i = 0; i < pulseCount; i++) pulses.push({ a: 0, b: 1, t: Math.random(), speed: 0.002 + Math.random() * 0.003 });
    pulseGeo.setAttribute("position", new THREE.BufferAttribute(pulsePos, 3));
    const pulseMat = new THREE.PointsMaterial({ color: accent, size: 0.24, sizeAttenuation: true, transparent: true, opacity: 0.55 });
    scene.add(new THREE.Points(pulseGeo, pulseMat));

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (event: MouseEvent) => {
      mouse.tx = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const time = clock.getElapsedTime();
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      camera.position.x = mouse.x * 1.6;
      camera.position.y = -mouse.y * 1.2;
      camera.lookAt(0, 0, 0);

      const pos = nodeGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < nodeCount; i++) {
        pos[i * 3] += velocities[i].x;
        pos[i * 3 + 1] += velocities[i].y;
        pos[i * 3 + 2] += velocities[i].z;
        if (Math.abs(pos[i * 3]) > 18) velocities[i].x *= -1;
        if (Math.abs(pos[i * 3 + 1]) > 12) velocities[i].y *= -1;
        if (Math.abs(pos[i * 3 + 2]) > 9) velocities[i].z *= -1;
      }
      nodeGeo.attributes.position.needsUpdate = true;

      const lineArray = lineGeo.attributes.position.array as Float32Array;
      let lineIndex = 0;
      for (let i = 0; i < nodeCount && lineIndex < lineMax; i++) {
        for (let j = i + 1; j < nodeCount && lineIndex < lineMax; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 4.2) {
            lineArray[lineIndex * 6] = pos[i * 3];
            lineArray[lineIndex * 6 + 1] = pos[i * 3 + 1];
            lineArray[lineIndex * 6 + 2] = pos[i * 3 + 2];
            lineArray[lineIndex * 6 + 3] = pos[j * 3];
            lineArray[lineIndex * 6 + 4] = pos[j * 3 + 1];
            lineArray[lineIndex * 6 + 5] = pos[j * 3 + 2];
            lineIndex++;
          }
        }
      }
      lineGeo.setDrawRange(0, lineIndex * 2);
      lineGeo.attributes.position.needsUpdate = true;

      const pulseArray = pulseGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < pulseCount; i++) {
        const pulse = pulses[i];
        pulse.t += pulse.speed;
        if (pulse.t >= 1) {
          pulse.t = 0;
          pulse.a = Math.floor(Math.random() * nodeCount);
          pulse.b = Math.floor(Math.random() * nodeCount);
        }
        const ax = pos[pulse.a * 3];
        const ay = pos[pulse.a * 3 + 1];
        const az = pos[pulse.a * 3 + 2];
        const bx = pos[pulse.b * 3];
        const by = pos[pulse.b * 3 + 1];
        const bz = pos[pulse.b * 3 + 2];
        pulseArray[i * 3] = ax + (bx - ax) * pulse.t;
        pulseArray[i * 3 + 1] = ay + (by - ay) * pulse.t;
        pulseArray[i * 3 + 2] = az + (bz - az) * pulse.t;
      }
      pulseGeo.attributes.position.needsUpdate = true;

      shapes.forEach((shape) => {
        shape.rotation.x += shape.userData.rotSpeed.x;
        shape.rotation.y += shape.userData.rotSpeed.y;
        shape.rotation.z += shape.userData.rotSpeed.z;
        shape.position.y = shape.userData.basePos.y + Math.sin(time * 0.5 + shape.userData.floatPhase) * 0.6;
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometries.forEach((geometry) => geometry.dispose());
      nodeGeo.dispose();
      lineGeo.dispose();
      pulseGeo.dispose();
      nodeMat.dispose();
      lineMat.dispose();
      pulseMat.dispose();
      shapes.forEach((shape) => (shape.material as THREE.Material).dispose());
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="circuit-bg" aria-hidden="true" />;
};

export default CircuitBackground;
