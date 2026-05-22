import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function InteractiveParticles() {
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
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    
    target.set((mouse.current.x * viewport.width) / 5, (mouse.current.y * viewport.height) / 5, 0);
    groupRef.current.position.lerp(target, 0.05);
  });

  return (
    <group ref={groupRef}>
      <Stars radius={50} depth={50} count={3000} factor={4} saturation={1} fade speed={1} />
      <Sparkles count={400} scale={20} size={3} speed={0.4} opacity={0.4} />
    </group>
  );
}

export function Scene3D({ accentColor = "#ffffff" }) {
  return (
    <div className="fixed inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10] }} gl={{ antialias: false, alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 5]} color={accentColor} intensity={5} distance={20} />
        <InteractiveParticles />
      </Canvas>
    </div>
  );
}
