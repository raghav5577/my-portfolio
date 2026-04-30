'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function MorphingParticles() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 4000; // Increased for better text definition
  const { mouse, viewport } = useThree();

  // Create target positions for text
  const [positions, velocities, targetPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const tar = new Float32Array(count * 3);
    
    // 1. Create text points using a hidden canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const text = 'raghavv.dev';
    
    canvas.width = 800;
    canvas.height = 200;
    
    if (ctx) {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 100px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const points = [];
      
      // Sample points where alpha/color is white
      for (let y = 0; y < canvas.height; y += 2) {
        for (let x = 0; x < canvas.width; x += 2) {
          const index = (y * canvas.width + x) * 4;
          if (data[index] > 128) {
            points.push({
              x: (x - canvas.width / 2) * 0.04,
              y: (canvas.height / 2 - y) * 0.04
            });
          }
        }
      }
      
      // Fill targets with sampled points, extruding them into 3D
      for (let i = 0; i < count; i++) {
        // Random start positions
        pos[i * 3] = (Math.random() - 0.5) * 20;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
        
        vel[i * 3] = 0;
        vel[i * 3 + 1] = 0;
        vel[i * 3 + 2] = 0;

        const pt = points[i % points.length];
        
        // 2D Text: Flat on the Z-axis
        tar[i * 3] = pt.x + (Math.random() - 0.5) * 0.1;
        tar[i * 3 + 1] = pt.y + (Math.random() - 0.5) * 0.1;
        tar[i * 3 + 2] = (Math.random() - 0.5) * 0.2; // Tiny scatter to prevent z-fighting
      }
    }
    
    return [pos, vel, tar];
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Warm gold theme
      cols[i * 3] = 0.96;     // R
      cols[i * 3 + 1] = 0.77;  // G
      cols[i * 3 + 2] = 0.09;  // B
    }
    return cols;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const currentPos = meshRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    const mx = mouse.x * viewport.width / 2;
    const my = mouse.y * viewport.height / 2;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Attraction
      const dx = targetPositions[ix] - currentPos[ix];
      const dy = targetPositions[iy] - currentPos[iy];
      const dz = targetPositions[iz] - currentPos[iz];

      velocities[ix] += dx * 0.03;
      velocities[iy] += dy * 0.03;
      velocities[iz] += dz * 0.03;

      // Mouse Repulsion
      const mdx = currentPos[ix] - mx;
      const mdy = currentPos[iy] - my;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      
      const threshold = 1.2;
      if (mdist < threshold) {
        const force = (threshold - mdist) / threshold;
        velocities[ix] += (mdx / mdist) * force * 1.5;
        velocities[iy] += (mdy / mdist) * force * 1.5;
      }

      // Physics
      currentPos[ix] += velocities[ix];
      currentPos[iy] += velocities[iy];
      currentPos[iz] += velocities[iz];

      velocities[ix] *= 0.8;
      velocities[iy] *= 0.8;
      velocities[iz] *= 0.8;

      // Float
      currentPos[iy] += Math.sin(time * 0.5 + i) * 0.001;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    // Rotation removed so the text stays in one position
    meshRef.current.rotation.y = 0;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
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

export default function ParticleMorph() {
  return (
    <div style={{ width: '100%', height: '400px', cursor: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <MorphingParticles />
      </Canvas>
    </div>
  );
}
