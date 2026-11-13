'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import Ocean from './Ocean';
import Island from './Island';
import Boat from './Boat';
import Collectibles from './Collectibles';
import { chapters } from '@/lib/content';
import { useGame } from '@/store/useGame';

const kinds = ['gameboy', 'mic', 'book', 'camera', 'chest'];

function CameraRig({ path, boatRef }: { path: THREE.CatmullRomCurve3; boatRef: React.RefObject<THREE.Group | null> }) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  const smooth = useRef(0);

  useFrame((_, dt) => {
    const progress = useGame.getState().progress;
    smooth.current = THREE.MathUtils.damp(smooth.current, progress, 3, dt);
    const p = path.getPointAt(THREE.MathUtils.clamp(smooth.current, 0, 1));
    const ahead = path.getPointAt(THREE.MathUtils.clamp(smooth.current + 0.03, 0, 1));
    if (boatRef.current) {
      boatRef.current.position.copy(p);
      boatRef.current.lookAt(ahead.x, p.y, ahead.z);
    }
    target.set(p.x * 0.6, 6.5, p.z + 13);
    camera.position.lerp(target, 1 - Math.pow(0.001, dt));
    look.set(p.x * 0.4, 1.2, p.z - 4);
    camera.lookAt(look);
  });
  return null;
}

function World() {
  const boatRef = useRef<THREE.Group>(null);
  const path = useMemo(() => {
    const pts = [new THREE.Vector3(0, 0, 6)];
    chapters.forEach((_, i) => {
      pts.push(new THREE.Vector3(i % 2 === 0 ? -5 : 5, 0, -i * 20 - 10));
    });
    pts.push(new THREE.Vector3(0, 0, -chapters.length * 20 - 16));
    return new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.5);
  }, []);

  const reduced = useGame((s) => s.reducedMotion);

  return (
    <>
      <color attach="background" args={['#070b16']} />
      <fog attach="fog" args={['#070b16', 22, 90]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 18, 8]} intensity={1.4} color="#c9d4f5" />
      <hemisphereLight args={['#5b8cff', '#0b1020', 0.6]} />
      <Stars radius={120} depth={60} count={reduced ? 600 : 1800} factor={4} saturation={0} fade speed={0.6} />
      <mesh position={[-30, 26, -80]}>
        <sphereGeometry args={[4, 24, 24]} />
        <meshBasicMaterial color="#f4ecd8" />
      </mesh>
      <Ocean />
      {chapters.map((c, i) => (
        <Island key={c.id} position={[i % 2 === 0 ? -9 : 9, 0, -i * 20 - 10]} accent={c.accent} kind={kinds[i]} scale={1.1} />
      ))}
      <Collectibles path={path} />
      <Boat groupRef={boatRef} />
      <CameraRig path={path} boatRef={boatRef} />
    </>
  );
}

export default function VoyageScene() {
  const isTouch = useGame((s) => s.isTouch);
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        dpr={[1, isTouch ? 1.5 : 2]}
        camera={{ position: [0, 6.5, 19], fov: 45, near: 0.1, far: 200 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <World />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.6)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(to_bottom,#070b16,transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_top,#070b16,transparent)]" />
    </div>
  );
}
