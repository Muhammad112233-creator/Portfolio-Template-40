'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Palm({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 1.1, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.14, 2.2, 6]} />
        <meshStandardMaterial color="#6b4a2f" roughness={0.9} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[0, 2.2, 0]} rotation={[0.5, (i / 5) * Math.PI * 2, 0.6]}>
          <coneGeometry args={[0.16, 1.5, 4]} />
          <meshStandardMaterial color={i % 2 ? '#3f7d4f' : '#4f9a5f'} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Prop({ kind, accent }: { kind: string; accent: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.6;
      ref.current.position.y = 2.4 + Math.sin(s.clock.elapsedTime * 1.4) * 0.15;
    }
  });
  return (
    <group ref={ref} position={[0, 2.4, 0]}>
      {kind === 'gameboy' && (
        <group>
          <mesh><boxGeometry args={[0.9, 1.4, 0.25]} /><meshStandardMaterial color="#c9d4f5" /></mesh>
          <mesh position={[0, 0.3, 0.14]}><boxGeometry args={[0.6, 0.5, 0.02]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.5} /></mesh>
          <mesh position={[-0.22, -0.35, 0.14]}><boxGeometry args={[0.28, 0.08, 0.04]} /><meshStandardMaterial color="#121a33" /></mesh>
          <mesh position={[-0.22, -0.35, 0.14]}><boxGeometry args={[0.08, 0.28, 0.04]} /><meshStandardMaterial color="#121a33" /></mesh>
          <mesh position={[0.22, -0.35, 0.14]}><sphereGeometry args={[0.07, 8, 8]} /><meshStandardMaterial color="#e8508a" /></mesh>
        </group>
      )}
      {kind === 'mic' && (
        <group>
          <mesh position={[0, -0.4, 0]}><cylinderGeometry args={[0.06, 0.06, 1, 8]} /><meshStandardMaterial color="#9fb0e2" metalness={0.6} /></mesh>
          <mesh position={[0, 0.35, 0]}><sphereGeometry args={[0.32, 16, 16]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} metalness={0.4} /></mesh>
        </group>
      )}
      {kind === 'book' && (
        <group rotation={[0.2, 0, 0.1]}>
          <mesh><boxGeometry args={[1, 1.3, 0.18]} /><meshStandardMaterial color={accent} /></mesh>
          <mesh position={[0.05, 0, 0.1]}><boxGeometry args={[0.85, 1.15, 0.02]} /><meshStandardMaterial color="#fff9" /></mesh>
        </group>
      )}
      {kind === 'camera' && (
        <group>
          <mesh><boxGeometry args={[1.1, 0.7, 0.6]} /><meshStandardMaterial color="#121a33" /></mesh>
          <mesh position={[0, 0, 0.4]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.25, 0.28, 0.4, 16]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.3} /></mesh>
          <mesh position={[0.35, 0.4, 0]}><boxGeometry args={[0.2, 0.12, 0.2]} /><meshStandardMaterial color="#e8508a" /></mesh>
        </group>
      )}
      {kind === 'chest' && (
        <group>
          <mesh position={[0, -0.15, 0]}><boxGeometry args={[1.2, 0.6, 0.8]} /><meshStandardMaterial color="#6b4a2f" /></mesh>
          <mesh position={[0, 0.25, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.4, 0.4, 1.2, 12, 1, false, 0, Math.PI]} /><meshStandardMaterial color="#8a5f3c" /></mesh>
          <mesh position={[0, 0.05, 0.41]}><boxGeometry args={[0.2, 0.25, 0.05]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} metalness={0.7} /></mesh>
        </group>
      )}
      <pointLight color={accent} intensity={6} distance={7} />
    </group>
  );
}

export default function Island({
  position,
  accent,
  kind,
  scale = 1,
}: {
  position: [number, number, number];
  accent: string;
  kind: string;
  scale?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (ref.current) ref.current.position.y = Math.sin(s.clock.elapsedTime * 0.5 + position[2]) * 0.08;
  });
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <cylinderGeometry args={[3.4, 4.2, 1.2, 9]} />
        <meshStandardMaterial color="#d9c39a" roughness={1} />
      </mesh>
      <mesh position={[0, 0.45, 0]} receiveShadow>
        <cylinderGeometry args={[2.6, 3.2, 0.6, 9]} />
        <meshStandardMaterial color="#4f9a5f" roughness={0.9} />
      </mesh>
      <mesh position={[1.6, 0.9, -1.2]}><dodecahedronGeometry args={[0.5, 0]} /><meshStandardMaterial color="#5b6478" /></mesh>
      <mesh position={[-1.8, 0.8, 1.1]}><dodecahedronGeometry args={[0.35, 0]} /><meshStandardMaterial color="#6b7488" /></mesh>
      <Palm position={[-1.6, 0.7, -1.4]} scale={0.9} />
      <Palm position={[1.9, 0.7, 1.3]} scale={0.7} />
      <Prop kind={kind} accent={accent} />
      <mesh position={[0, 0.78, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.1, 1.25, 32]} />
        <meshBasicMaterial color={accent} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
