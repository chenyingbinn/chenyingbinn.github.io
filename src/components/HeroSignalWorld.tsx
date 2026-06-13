import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import type { Group, Mesh } from "three";
import { AdditiveBlending, Color, DoubleSide } from "three";
import { SignalField } from "./SignalField";
import { useWebGLAvailable } from "../hooks/useWebGLAvailable";

const nodePositions = [
  [-2.4, 0.55, 0.2],
  [-1.55, 1.22, -0.38],
  [-0.55, 0.48, 0.58],
  [0.28, 1.03, -0.22],
  [0.94, 0.1, 0.5],
  [1.8, 0.72, -0.34],
  [2.42, -0.12, 0.2],
  [-1.76, -0.76, 0.3],
  [-0.42, -0.98, -0.42],
  [0.74, -0.78, 0.22],
  [1.86, -1.05, -0.3],
] satisfies Array<[number, number, number]>;

const links = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 5],
  [5, 6],
  [0, 7],
  [7, 8],
  [8, 9],
  [9, 10],
  [2, 8],
  [4, 9],
  [4, 6],
] as const;

function SignalLink({ from, to }: { from: [number, number, number]; to: [number, number, number] }) {
  const positions = useMemo(() => new Float32Array([...from, ...to]), [from, to]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#67e8f9" opacity={0.32} transparent />
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
      groupRef.current.rotation.y = -0.18 + Math.sin(elapsed * 0.18) * 0.05 + pointer.x * 0.055;
      groupRef.current.rotation.x = 0.18 + Math.sin(elapsed * 0.14) * 0.035 - pointer.y * 0.035;
      groupRef.current.position.y = Math.sin(elapsed * 0.42) * 0.055;
    }

    if (coreRef.current) {
      const scale = 1 + Math.sin(elapsed * 1.9) * 0.045;
      coreRef.current.scale.setScalar(scale);
    }

    if (planeRef.current) {
      planeRef.current.rotation.z = Math.sin(elapsed * 0.12) * 0.035;
    }
  });

  return (
    <group ref={groupRef} position={[0.3, -0.02, 0]} rotation={[0.18, -0.18, 0.03]}>
      <group ref={planeRef}>
        <mesh rotation={[1.18, 0, -0.34]} position={[0.08, -0.18, -0.62]}>
          <ringGeometry args={[1.52, 1.56, 96]} />
          <meshBasicMaterial color="#67e8f9" transparent opacity={0.18} side={DoubleSide} />
        </mesh>
        <mesh rotation={[1.1, 0.16, 0.52]} position={[0.28, 0.04, -0.72]}>
          <ringGeometry args={[2.25, 2.28, 128]} />
          <meshBasicMaterial color="#0f766e" transparent opacity={0.12} side={DoubleSide} />
        </mesh>
        <mesh rotation={[1.05, -0.18, -0.02]} position={[0.2, -0.02, -0.82]}>
          <planeGeometry args={[5.4, 2.6, 8, 4]} />
          <meshBasicMaterial color="#67e8f9" transparent opacity={0.035} wireframe side={DoubleSide} />
        </mesh>
      </group>

      {links.map(([from, to]) => (
        <SignalLink from={nodePositions[from]} key={`${from}-${to}`} to={nodePositions[to]} />
      ))}

      {nodePositions.map((position, index) => {
        const isCore = index === 4;
        const radius = isCore ? 0.18 : index % 3 === 0 ? 0.105 : 0.082;
        const color = isCore ? nodeColors.core : index % 2 === 0 ? nodeColors.primary : nodeColors.secondary;

        return (
          <mesh key={position.join("-")} position={position} ref={isCore ? coreRef : undefined}>
            <sphereGeometry args={[radius, 28, 28]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={isCore ? 0.58 : 0.26}
              metalness={0.16}
              roughness={0.42}
            />
          </mesh>
        );
      })}

      <mesh position={[0.94, 0.1, 0.5]}>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshBasicMaterial
          blending={AdditiveBlending}
          color="#67e8f9"
          depthWrite={false}
          transparent
          opacity={0.09}
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
      <Canvas camera={{ fov: 42, position: [0, 0.18, 6.4] }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.92} />
        <directionalLight color="#d9fbff" intensity={1.05} position={[2.4, 2.8, 3.2]} />
        <pointLight color="#67e8f9" intensity={5.6} position={[1.8, 1.8, 2.2]} />
        <pointLight color="#0f766e" intensity={2.1} position={[-2.6, -1.4, 1.5]} />
        <SignalSculpture />
      </Canvas>
    </div>
  );
}
