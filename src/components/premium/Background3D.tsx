import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float } from '@react-three/drei';
import * as THREE from 'three';

const Grid = () => {
  const gridRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (gridRef.current) {
      // Slow ambient rotation
      gridRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      gridRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.1) * 0.1;
      
      // React to mouse
      const x = (state.mouse.x * Math.PI) / 20;
      const y = (state.mouse.y * Math.PI) / 20;
      gridRef.current.rotation.x += y;
      gridRef.current.rotation.y += x;
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.001;
    }
  });

  return (
    <group ref={gridRef}>
      <gridHelper args={[100, 50, 0xF5A623, 0xF5A623]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -10]}>
        {/* @ts-ignore */}
        <meshBasicMaterial attach="material" transparent opacity={0.08} color="#F5A623" />
      </gridHelper>
      
      {/* Floating Particles (Spices) */}
      <PointsComponent ref={meshRef} />
    </group>
  );
};

const PointsComponent = React.forwardRef<THREE.Points>((_, ref) => {
  const count = 40;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10;
    }
    return pos;
  }, []);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        color="#F5A623"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
});

const Background3D = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#0D0D0D]">
      <Suspense fallback={null}>
        <Canvas
          gl={{ alpha: true, antialias: true, clearColor: [0, 0, 0, 0] }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'transparent',
            zIndex: 0,
            pointerEvents: 'none'
          }}
          camera={{ position: [0, 0, 20], fov: 50 }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#F5A623" />
          <Grid />
        </Canvas>
      </Suspense>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0D0D]/50 to-[#0D0D0D]" />
    </div>
  );
};

export default Background3D;
