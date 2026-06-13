import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { useReducedMotion } from "motion/react";
import type { Group, Mesh } from "three";
import { AdditiveBlending, CatmullRomCurve3, Color, DoubleSide, Vector3 } from "three";
import { SignalField } from "./SignalField";
import { useWebGLAvailable } from "../hooks/useWebGLAvailable";

const nodePositions = [
  [0.46, 0.12, 0.82],
  [-2.86, 0.96, -0.44],
  [-1.98, 1.6, 0.28],
  [-0.72, 1.12, -0.96],
  [0.2, 1.72, 0.04],
  [1.78, 1.22, -0.32],
  [2.74, 0.34, 0.18],
  [2.08, -1.02, -0.72],
  [0.7, -1.48, 0.38],
  [-1.22, -1.18, -0.24],
  [-2.54, -0.34, 0.52],
  [3.06, -0.66, 0.78],
  [-3.34, 0.16, -0.88],
  [-0.18, -0.08, 1.28],
  [1.38, -0.78, 1.32],
] satisfies Array<[number, number, number]>;

const links = [
  [0, 2],
  [0, 5],
  [0, 8],
  [0, 13],
  [0, 14],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 11],
  [7, 8],
  [8, 9],
  [9, 10],
  [10, 12],
  [12, 1],
  [3, 9],
  [4, 13],
  [6, 14],
] as const;

const signalTrails = [
  [
    [-3.7, 0.82, -1.06],
    [-2.2, 1.14, -0.52],
    [-0.55, 0.72, 0.04],
    [0.46, 0.12, 0.82],
    [3.7, 0.64, 0.22],
  ],
  [
    [-3.28, -1.12, -0.42],
    [-1.62, -0.72, 0.44],
    [0.56, -1.22, 0.78],
    [2.54, -0.82, 0.16],
    [3.62, -0.34, 0.68],
  ],
  [
    [-2.92, 0.08, -1.24],
    [-1.1, -0.12, -0.58],
    [0.38, 0.64, -0.18],
    [1.88, 1.2, 0.34],
    [3.34, 1.06, -0.18],
  ],
  [
    [-1.9, 1.92, -0.72],
    [-0.22, 1.34, -0.2],
    [0.46, 0.12, 0.82],
    [2.02, -1.36, 0.34],
  ],
] satisfies Array<Array<[number, number, number]>>;

const dataPlanes = [
  { position: [-1.2, 0.62, -1.52], rotation: [1.17, -0.36, -0.22], size: [4.6, 1.7], opacity: 0.08, color: "#67e8f9" },
  { position: [1.32, 0.04, -1.02], rotation: [1.02, 0.28, 0.34], size: [5.3, 2.0], opacity: 0.07, color: "#2dd4bf" },
  { position: [0.54, -0.94, -0.64], rotation: [1.25, -0.52, -0.48], size: [4.2, 1.45], opacity: 0.06, color: "#bae6fd" },
  { position: [2.12, 0.86, -0.22], rotation: [1.34, 0.12, -0.72], size: [2.35, 0.92], opacity: 0.08, color: "#67e8f9" },
] satisfies Array<{
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number];
  opacity: number;
  color: string;
}>;

function SignalLink({ from, to }: { from: [number, number, number]; to: [number, number, number] }) {
  const positions = useMemo(() => new Float32Array([...from, ...to]), [from, to]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#9dfcff" opacity={0.54} transparent />
    </line>
  );
}

function SignalTrail({
  points,
  opacity = 0.42,
}: {
  points: Array<[number, number, number]>;
  opacity?: number;
}) {
  const positions = useMemo(() => {
    const curve = new CatmullRomCurve3(points.map((point) => new Vector3(...point)));
    return new Float32Array(curve.getPoints(72).flatMap((point) => [point.x, point.y, point.z]));
  }, [points]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial blending={AdditiveBlending} color="#b8fbff" opacity={opacity} transparent />
    </line>
  );
}

function SignalSculpture({ staticScene = false }: { staticScene?: boolean }) {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const planeRef = useRef<Group>(null);
  const trailRef = useRef<Group>(null);

  const nodeColors = useMemo(
    () => ({
      primary: new Color("#67e8f9"),
      secondary: new Color("#0f766e"),
      core: new Color("#7dd3fc"),
    }),
    [],
  );

  useFrame(({ clock, pointer }) => {
    if (staticScene) return;

    const elapsed = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = -0.22 + Math.sin(elapsed * 0.18) * 0.06 + pointer.x * 0.07;
      groupRef.current.rotation.x = 0.18 + Math.sin(elapsed * 0.13) * 0.035 - pointer.y * 0.038;
      groupRef.current.position.y = Math.sin(elapsed * 0.4) * 0.07;
      groupRef.current.position.x = pointer.x * 0.08;
    }

    if (coreRef.current) {
      const scale = 1 + Math.sin(elapsed * 1.35) * 0.055;
      coreRef.current.scale.setScalar(scale);
    }

    if (planeRef.current) {
      planeRef.current.rotation.z = Math.sin(elapsed * 0.12) * 0.04;
      planeRef.current.rotation.y = Math.sin(elapsed * 0.09) * 0.04;
    }

    if (trailRef.current) {
      trailRef.current.rotation.z = Math.sin(elapsed * 0.16) * 0.026;
      trailRef.current.position.z = Math.sin(elapsed * 0.28) * 0.06;
    }
  });

  return (
    <group ref={groupRef} position={[-0.3, -0.04, -0.1]} rotation={[0.18, -0.22, 0.02]} scale={1.02}>
      <group ref={planeRef}>
        {dataPlanes.map((plane) => (
          <mesh key={`${plane.position.join("-")}-${plane.size.join("-")}`} position={plane.position} rotation={plane.rotation}>
            <planeGeometry args={[plane.size[0], plane.size[1], 8, 3]} />
            <meshBasicMaterial
              color={plane.color}
              depthWrite={false}
              opacity={plane.opacity}
              side={DoubleSide}
              transparent
              wireframe
            />
          </mesh>
        ))}
      </group>

      <group ref={trailRef}>
        {signalTrails.map((points, index) => (
          <SignalTrail key={points.map((point) => point.join(",")).join("|")} opacity={index === 0 ? 0.58 : 0.36} points={points} />
        ))}
      </group>

      {links.map(([from, to]) => (
        <SignalLink from={nodePositions[from]} key={`${from}-${to}`} to={nodePositions[to]} />
      ))}

      {nodePositions.map((position, index) => {
        const isCore = index === 0;
        const isForeground = index === 13 || index === 14 || index === 11;
        const radius = isCore ? 0.14 : isForeground ? 0.13 : index > 10 ? 0.07 : index % 3 === 0 ? 0.108 : 0.09;
        const color = isCore ? nodeColors.core : isForeground || index % 2 === 0 ? nodeColors.primary : nodeColors.secondary;

        return (
          <mesh key={position.join("-")} position={position} ref={isCore ? coreRef : undefined}>
            <sphereGeometry args={[radius, isCore ? 42 : 30, isCore ? 42 : 30]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={isCore ? 0.72 : isForeground ? 0.68 : 0.4}
              metalness={0.18}
              roughness={0.36}
            />
          </mesh>
        );
      })}

      <mesh position={[0.46, 0.12, 0.82]}>
        <sphereGeometry args={[0.24, 40, 40]} />
        <meshBasicMaterial blending={AdditiveBlending} color="#67e8f9" depthWrite={false} transparent opacity={0.04} />
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
      <Canvas camera={{ fov: 33, position: [0.2, 0.06, 6.2] }} dpr={[1, 1.45]} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={1.04} />
        <directionalLight color="#e8fdff" intensity={1.42} position={[2.8, 3.2, 4.0]} />
        <pointLight color="#67e8f9" intensity={8.4} position={[2.2, 1.3, 2.4]} />
        <pointLight color="#0f766e" intensity={4.6} position={[-2.7, -1.2, 1.2]} />
        <SignalSculpture />
        <EffectComposer multisampling={0}>
          <Vignette darkness={0.28} eskil={false} offset={0.2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
