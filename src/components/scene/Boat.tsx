'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Boat({ groupRef }: { groupRef?: React.RefObject<THREE.Group | null> }) {
  const inner = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (inner.current) {
      inner.current.rotation.z = Math.sin(s.clock.elapsedTime * 1.2) * 0.05;
      inner.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.9) * 0.04;
      inner.current.position.y = Math.sin(s.clock.elapsedTime * 1.5) * 0.12;
    }
  });
  return (
    <group ref={groupRef}>
      <group ref={inner}>
        {/* hull */}
        <mesh position={[0, 0.1, 0]} castShadow>
          <boxGeometry args={[1.4, 0.5, 3]} />
          <meshStandardMaterial color="#8a5f3c" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.1, -1.7]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.7, 1, 4]} />
          <meshStandardMaterial color="#6b4a2f" />
        </mesh>
        {/* mast + sail */}
        <mesh position={[0, 1.6, 0]}><cylinderGeometry args={[0.06, 0.06, 3, 8]} /><meshStandardMaterial color="#4a3426" /></mesh>
        <mesh position={[0.05, 1.9, 0.1]} rotation={[0, 0, 0]}>
          <planeGeometry args={[1.6, 1.9]} />
          <meshStandardMaterial color="#f4ecd8" side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 3.05, 0]} rotation={[0, 0, -0.2]}>
          <planeGeometry args={[0.7, 0.4]} />
          <meshStandardMaterial color="#e8508a" side={THREE.DoubleSide} />
        </mesh>
        {/* character */}
        <group position={[0, 0.6, 0.7]}>
          <mesh position={[0, 0.45, 0]}><capsuleGeometry args={[0.18, 0.4, 4, 8]} /><meshStandardMaterial color="#1d2850" /></mesh>
          <mesh position={[0, 0.95, 0]}><sphereGeometry args={[0.2, 12, 12]} /><meshStandardMaterial color="#e8b98a" /></mesh>
          <mesh position={[0, 1.12, 0]}><coneGeometry args={[0.3, 0.25, 12]} /><meshStandardMaterial color="#f2c94c" /></mesh>
        </group>
        <pointLight position={[0, 1.5, 0]} color="#fea0c0" intensity={3} distance={6} />
      </group>
    </group>
  );
}
