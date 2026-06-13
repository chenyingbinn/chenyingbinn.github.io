import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import type { Group, Mesh } from "three";
import { AdditiveBlending, Color, DoubleSide } from "three";
import { SignalField } from "./SignalField";
import { useWebGLAvailable } from "../hooks/useWebGLAvailable";

const nodePositions = [
  [0, 0.04, 0.5],
  [-1.92, 0.72, -0.24],
  [-1.18, 1.48, 0.32],
  [0.06, 1.74, -0.34],
  [1.28, 1.18, 0.22],
  [2.02, 0.28, -0.22],
  [1.5, -0.92, 0.36],
  [0.28, -1.42, -0.3],
  [-1.1, -1.14, 0.18],
  [-2.08, -0.24, -0.28],
  [2.44, -0.52, 0.02],
  [-2.5, 0.12, 0.08],
] satisfies Array<[number, number, number]>;

const links = [
  [0, 1],
  [0, 3],
  [0, 5],
  [0, 7],
  [0, 9],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 10],
  [6, 7],
  [7, 8],
  [8, 9],
  [9, 11],
  [2, 8],
  [4, 6],
] as const;

function SignalLink({ from, to }: { from: [number, number, number]; to: [number, number, number] }) {
  const positions = useMemo(() => new Float32Array([...from, ...to]), [from, to]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#8cf6ff" opacity={0.62} transparent />
    </line>
  );
}

function SignalSculpture({ staticScene = false }: { staticScene?: boolean }) {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const planeRef = useRef<Group>(null);

  const nodeColors = useMemo(
    () => ({
      primary: new Color("#67e8f9"),
      secondary: new Color("#0f766e"),
      core: new Color("#d9fbff"),
    }),
    [],
  );

  useFrame(({ clock, pointer }) => {
    if (staticScene) return;

    const elapsed = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = -0.32 + Math.sin(elapsed * 0.22) * 0.08 + pointer.x * 0.08;
      groupRef.current.rotation.x = 0.24 + Math.sin(elapsed * 0.16) * 0.04 - pointer.y * 0.045;
      groupRef.current.position.y = Math.sin(elapsed * 0.46) * 0.075;
    }

    if (coreRef.current) {
      const scale = 1 + Math.sin(elapsed * 1.55) * 0.065;
      coreRef.current.scale.setScalar(scale);
    }

    if (planeRef.current) {
      planeRef.current.rotation.z = Math.sin(elapsed * 0.18) * 0.055;
      planeRef.current.rotation.y = Math.sin(elapsed * 0.1) * 0.045;
    }
  });

  return (
    <group ref={groupRef} position={[0.2, -0.02, 0.1]} rotation={[0.22, -0.32, 0.03]} scale={1.24}>
      <group ref={planeRef}>
        <mesh rotation={[1.18, 0, -0.34]} position={[0, -0.02, -0.48]}>
          <ringGeometry args={[1.32, 1.36, 128]} />
          <meshBasicMaterial color="#9dfcff" transparent opacity={0.34} side={DoubleSide} />
        </mesh>
        <mesh rotation={[1.04, 0.28, 0.5]} position={[0.06, 0.02, -0.64]}>
          <ringGeometry args={[2.25, 2.3, 144]} />
          <meshBasicMaterial color="#20c7bd" transparent opacity={0.22} side={DoubleSide} />
        </mesh>
        <mesh rotation={[1.26, -0.34, -0.68]} position={[-0.1, 0.1, -0.78]}>
          <ringGeometry args={[3.0, 3.035, 160]} />
          <meshBasicMaterial color="#67e8f9" transparent opacity={0.16} side={DoubleSide} />
        </mesh>
        <mesh rotation={[1.05, -0.18, -0.02]} position={[0.2, -0.02, -0.86]}>
          <planeGeometry args={[5.8, 3.05, 9, 5]} />
          <meshBasicMaterial color="#67e8f9" transparent opacity={0.06} wireframe side={DoubleSide} />
        </mesh>
      </group>

      {links.map(([from, to]) => (
        <SignalLink from={nodePositions[from]} key={`${from}-${to}`} to={nodePositions[to]} />
      ))}

      {nodePositions.map((position, index) => {
        const isCore = index === 0;
        const radius = isCore ? 0.34 : index > 9 ? 0.07 : index % 3 === 0 ? 0.13 : 0.105;
        const color = isCore ? nodeColors.core : index % 2 === 0 ? nodeColors.primary : nodeColors.secondary;

        return (
          <mesh key={position.join("-")} position={position} ref={isCore ? coreRef : undefined}>
            <sphereGeometry args={[radius, isCore ? 42 : 30, isCore ? 42 : 30]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={isCore ? 1.45 : 0.52}
              metalness={0.18}
              roughness={0.36}
            />
          </mesh>
        );
      })}

      <mesh position={[0, 0.04, 0.5]}>
        <sphereGeometry args={[0.68, 48, 48]} />
        <meshBasicMaterial
          blending={AdditiveBlending}
          color="#67e8f9"
          depthWrite={false}
          transparent
          opacity={0.18}
        />
      </mesh>
    </group>
  );
}

function HeroSignalFallback() {
  return (
    <div className="hero-signal-fallback" aria-hidden="true">
      <SignalField />
    </div>
  );
}

export function HeroSignalWorld() {
  const shouldReduceMotion = useReducedMotion();
  const webGLAvailable = useWebGLAvailable();
  const isCoarsePointer =
    typeof window !== "undefined" &&
    (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(max-width: 760px)").matches);

  if (!webGLAvailable || isCoarsePointer || shouldReduceMotion) {
    return <HeroSignalFallback />;
  }

  return (
    <div className="hero-signal-world" aria-hidden="true">
      <Canvas camera={{ fov: 36, position: [0.12, 0.12, 5.35] }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={1.18} />
        <directionalLight color="#e8fdff" intensity={1.55} position={[2.4, 3.1, 3.2]} />
        <pointLight color="#67e8f9" intensity={9.2} position={[1.35, 1.45, 2.6]} />
        <pointLight color="#0f766e" intensity={3.8} position={[-2.6, -1.4, 1.5]} />
        <SignalSculpture />
      </Canvas>
    </div>
  );
}
