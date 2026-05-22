import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Sparkles, Cloud } from '@react-three/drei';
import * as THREE from 'three';

function InteractiveParticles({ isFaculty }) {
  const groupRef = useRef(null);
  const { viewport } = useThree();
  const target = new THREE.Vector3();
  const mouse = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Smooth transition logic for rotations
    const targetRotationY = state.clock.elapsedTime * (isFaculty ? 0.05 : 0.02);
    const targetRotationZ = isFaculty ? Math.sin(state.clock.elapsedTime * 0.2) * 0.1 : 0;
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.1);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotationZ, 0.05);
    
    target.set((mouse.current.x * viewport.width) / 5, (mouse.current.y * viewport.height) / 5, 0);
    groupRef.current.position.lerp(target, 0.05);
  });

  return (
    <group ref={groupRef}>
      <Stars 
        radius={50} 
        depth={50} 
        count={isFaculty ? 5000 : 3000} 
        factor={isFaculty ? 5 : 4} 
        saturation={isFaculty ? 1 : 0} 
        fade 
        speed={isFaculty ? 2 : 1} 
      />
      <Sparkles 
        count={isFaculty ? 800 : 400} 
        scale={20} 
        size={isFaculty ? 4 : 3} 
        speed={isFaculty ? 0.6 : 0.4} 
        opacity={isFaculty ? 0.6 : 0.4} 
        color={isFaculty ? "#d8b4fe" : "#ffffff"} 
      />
    </group>
  );
}

export function Scene3D({ isFaculty = false }) {
  return (
    <div className="fixed inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10] }} gl={{ antialias: false, alpha: true }}>
        <ambientLight 
          intensity={isFaculty ? 1.5 : 0.5} 
          color={isFaculty ? "#c084fc" : "#ffffff"} 
        />
        <pointLight 
          position={[0, 0, 5]} 
          color={isFaculty ? "#d8b4fe" : "#ffffff"} 
          intensity={isFaculty ? 8 : 5} 
          distance={20} 
        />
        
        <InteractiveParticles isFaculty={isFaculty} />
      </Canvas>
    </div>
  );
}
