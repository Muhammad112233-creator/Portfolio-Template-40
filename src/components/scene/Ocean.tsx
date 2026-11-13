'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertex = /* glsl */ `
  uniform float uTime;
  varying float vWave;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    float w = sin(p.x * 0.35 + uTime * 0.9) * 0.35
            + sin(p.y * 0.5 - uTime * 0.7) * 0.28
            + sin((p.x + p.y) * 0.22 + uTime * 0.5) * 0.4;
    p.z += w;
    vWave = w;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uDeep;
  uniform vec3 uShallow;
  uniform vec3 uFoam;
  uniform float uTime;
  varying float vWave;
  varying vec2 vUv;
  void main() {
    float t = smoothstep(-0.6, 0.9, vWave);
    vec3 col = mix(uDeep, uShallow, t);
    float foam = smoothstep(0.72, 0.95, vWave);
    col = mix(col, uFoam, foam * 0.35);
    float grid = step(0.985, fract(vUv.x * 120.0)) + step(0.985, fract(vUv.y * 120.0));
    col += grid * 0.02;
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function Ocean() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color('#0b1020') },
      uShallow: { value: new THREE.Color('#1d2850') },
      uFoam: { value: new THREE.Color('#9fb0e2') },
    }),
    []
  );

  useFrame((_, dt) => {
    if (mat.current) mat.current.uniforms.uTime.value += dt;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, -50]}>
      <planeGeometry args={[420, 420, 140, 140]} />
      <shaderMaterial ref={mat} uniforms={uniforms} vertexShader={vertex} fragmentShader={fragment} />
    </mesh>
  );
}
