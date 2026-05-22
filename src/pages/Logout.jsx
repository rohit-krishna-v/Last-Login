import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scene3D } from '../components/ui/Scene3D';

export default function Logout() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <Scene3D accentColor="#ff0000" />
      
      <div className="relative z-10 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="w-24 h-24 rounded-full border-2 border-red-500/30 flex items-center justify-center mx-auto mb-8 relative">
            <div className="absolute inset-0 bg-red-500/10 rounded-full animate-ping" />
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
            SYSTEM SESSION ENDED
          </h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="space-y-6"
          >
            <p className="text-xl text-gray-400 font-light">
              BCA Batch 2023–2026 has successfully logged out.
            </p>
            <p className="text-lg text-gray-500 italic font-light">
              Wishing you immense success in the real world. May your code always compile and your dreams deploy smoothly.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="mt-16"
        >
          <Link to="/" className="text-xs tracking-widest uppercase text-gray-600 hover:text-white transition-colors underline underline-offset-8">
            Return to Directory
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
