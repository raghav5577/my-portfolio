'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 2000;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    return [pos, vel];
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = Math.random();
      // Gold to warm white gradient
      cols[i * 3] = 0.96 - t * 0.3;     // R
      cols[i * 3 + 1] = 0.77 - t * 0.4;  // G
      cols[i * 3 + 2] = 0.09 + t * 0.3;   // B
    }
    return cols;
  }, []);

  const timer = useMemo(() => new THREE.Timer(), []);

  useFrame(() => {
    if (!meshRef.current) return;
    timer.update();
    const time = timer.getElapsed();
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i * 3] + Math.sin(time * 0.3 + i) * 0.001;
      positions[i * 3 + 1] += velocities[i * 3 + 1] + Math.cos(time * 0.2 + i) * 0.001;
      positions[i * 3 + 2] += velocities[i * 3 + 2];

      // Wrap around
      for (let j = 0; j < 3; j++) {
        if (positions[i * 3 + j] > 10) positions[i * 3 + j] = -10;
        if (positions[i * 3 + j] < -10) positions[i * 3 + j] = 10;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.02;
    meshRef.current.rotation.x = Math.sin(time * 0.01) * 0.1;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleField() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  );
}
