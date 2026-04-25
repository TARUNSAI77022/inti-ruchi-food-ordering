import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SpiceParticles = ({ count = 30 }) => {
  const mesh = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 5;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 5;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.002;
      mesh.current.rotation.x += 0.001;
      
      const time = state.clock.getElapsedTime();
      mesh.current.position.y = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#F5A623"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

export default SpiceParticles;
