'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Collectibles({ path }: { path: THREE.CatmullRomCurve3 }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = 26;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const points = useMemo(() => Array.from({ length: count }, (_, i) => path.getPointAt((i + 0.5) / count)), [path]);

  useFrame((s) => {
    if (!ref.current) return;
    points.forEach((p, i) => {
      dummy.position.set(p.x + Math.sin(i) * 1.5, 1.4 + Math.sin(s.clock.elapsedTime * 2 + i) * 0.2, p.z);
      dummy.rotation.set(0, s.clock.elapsedTime * 2 + i, 0);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <cylinderGeometry args={[0.22, 0.22, 0.06, 16]} />
      <meshStandardMaterial color="#f2c94c" emissive="#f2c94c" emissiveIntensity={0.5} metalness={0.7} roughness={0.3} />
    </instancedMesh>
  );
}
