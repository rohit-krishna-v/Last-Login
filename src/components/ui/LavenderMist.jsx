import React from 'react';

export function LavenderMist({ active }) {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none transition-opacity duration-[2000ms] ease-in-out z-0 ${active ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Mist Core Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent opacity-80" />

      {/* Dynamic Mist Layers */}
      <div 
        className="absolute w-[150vw] h-[150vh] -top-[25%] -left-[25%] mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 60%)',
          filter: 'blur(100px)',
          animation: 'mist-drift 20s ease-in-out infinite alternate',
        }}
      />
      <div 
        className="absolute w-[150vw] h-[150vh] top-[10%] left-[10%] mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(192, 132, 252, 0.2) 0%, transparent 60%)',
          filter: 'blur(120px)',
          animation: 'mist-drift 25s ease-in-out infinite alternate-reverse',
        }}
      />
      <div 
        className="absolute w-[200vw] h-[100vh] bottom-[-20%] left-[-50%] mix-blend-screen"
        style={{
          background: 'radial-gradient(ellipse, rgba(216, 180, 254, 0.15) 0%, transparent 70%)',
          filter: 'blur(110px)',
          animation: 'mist-drift 30s ease-in-out infinite alternate',
        }}
      />
    </div>
  );
}
