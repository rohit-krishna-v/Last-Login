import React from 'react';

const WaveSVG = ({ color, opacity }) => (
  <svg 
    className="w-full h-full block"
    preserveAspectRatio="none" 
    viewBox="0 0 1600 200" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      fill={color} 
      fillOpacity={opacity}
      d="M0,100 C200,200 200,0 400,100 C600,200 600,0 800,100 C1000,200 1000,0 1200,100 C1400,200 1400,0 1600,100 L1600,200 L0,200 Z" 
    />
  </svg>
);

export function GalaxyWavesBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#0d0415] z-0" style={{ backgroundColor: '#0d0415' }}>
      
      {/* Deep Space Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-[#0d0415] to-[#0d0415]" />

      {/* Back Wave */}
      <div 
        className="absolute bottom-0 h-[80vh] flex w-[200%]"
        style={{ animation: 'wave-translate 30s linear infinite' }}
      >
        <div className="w-[50%] h-full relative"><WaveSVG color="#9333ea" opacity="0.6" /></div>
        <div className="w-[50%] h-full relative"><WaveSVG color="#9333ea" opacity="0.6" /></div>
      </div>

      {/* Middle Wave */}
      <div 
        className="absolute bottom-0 h-[60vh] flex w-[200%]"
        style={{ animation: 'wave-translate 20s linear infinite reverse' }}
      >
        <div className="w-[50%] h-full relative"><WaveSVG color="#c084fc" opacity="0.7" /></div>
        <div className="w-[50%] h-full relative"><WaveSVG color="#c084fc" opacity="0.7" /></div>
      </div>

      {/* Front Wave */}
      <div 
        className="absolute bottom-0 h-[40vh] flex w-[200%]"
        style={{ animation: 'wave-translate 12s linear infinite' }}
      >
        <div className="w-[50%] h-full relative"><WaveSVG color="#d8b4fe" opacity="0.9" /></div>
        <div className="w-[50%] h-full relative"><WaveSVG color="#d8b4fe" opacity="0.9" /></div>
      </div>

    </div>
  );
}
