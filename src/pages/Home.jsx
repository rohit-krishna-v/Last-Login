import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminData, facultyData } from '../data/faculty';
import { motion, AnimatePresence } from 'framer-motion';
import { SplitText } from '../components/animations/SplitText';
import { MagneticButton } from '../components/ui/MagneticButton';
import { Scene3D } from '../components/ui/Scene3D';
import { LavenderMist } from '../components/ui/LavenderMist';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const memoryTimelineRef = useRef(null);
  const directoryRef = useRef(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('admin');

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".memory-item", {
        y: -50,
        opacity: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: memoryTimelineRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleToggle = (tab) => {
    setActiveTab(tab);
  };

  const displayedData = activeTab === 'admin' ? adminData : facultyData;

  return (
    <div ref={containerRef} className={`min-h-screen text-white overflow-hidden selection:bg-white/10 relative transition-colors duration-[2000ms] ease-in-out ${activeTab === 'faculty' ? 'bg-[#080211]' : 'bg-[#030303]'}`}>
      <LavenderMist active={activeTab === 'faculty'} />
      <div className="fixed inset-0 pointer-events-none z-0">
        <Scene3D isFaculty={activeTab === 'faculty'} />
      </div>

      {/* Navbar - Only Logo */}
      <nav className="fixed top-0 w-full p-4 md:p-6 z-50 glass">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src="/images/logo.png" alt="Last Login Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
          </div>
          <div className="text-[10px] md:text-xs tracking-widest uppercase text-gray-400">
            BCA 2023-2026
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 py-32 min-h-screen flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-gray-400 mb-6 glow-text">BCA Batch Party 2023–2026</p>
          <h1 className="text-6xl md:text-9xl font-bold mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-300 to-gray-700">
            LAST LOGIN
          </h1>
          <SplitText 
            text="Logging Out, But Staying Connected."
            className="text-xl md:text-3xl text-gray-400 font-light italic mb-12"
            delay={0.8}
          />
        </motion.div>

        {/* Premium Toggle Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="inline-flex bg-white/5 p-1.5 rounded-full border border-white/10 relative shadow-[0_0_40px_rgba(255,255,255,0.05)] backdrop-blur-xl mb-12"
        >
          <button
            onClick={() => handleToggle('admin')}
            className={`px-8 md:px-12 py-4 rounded-full text-xs md:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 relative z-10 ${
              activeTab === 'admin' ? 'text-black drop-shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Admin Access
          </button>
          <button
            onClick={() => handleToggle('faculty')}
            className={`px-8 md:px-12 py-4 rounded-full text-xs md:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 relative z-10 ${
              activeTab === 'faculty' ? 'text-black drop-shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Faculty Access
          </button>
          
          {/* Toggle Highlight */}
          <motion.div
            layoutId="activeTabIndicator"
            className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-gray-100 to-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)]"
            initial={false}
            animate={{
              left: activeTab === 'admin' ? '6px' : 'calc(50% + 0px)'
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 flex flex-col items-center hidden md:flex"
        >
          <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">Initialize Sequence</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent" />
        </motion.div>
      </section>

      {/* Memory Timeline Section (System Logs) */}
      <section ref={memoryTimelineRef} className="relative z-10 py-24 md:py-32 container mx-auto px-6 border-t border-white/5">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-6xl font-bold mb-4 tracking-tight">System Logs</h2>
          <p className="text-gray-400 text-base md:text-lg font-light max-w-2xl mx-auto">Retrieving cached memories from 2023 to 2026...</p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-16 md:space-y-24">
          {[
            { year: "2023", title: "Boot Sequence", desc: "The journey begins. Fresh faces, new syntax, and the first lines of code written together." },
            { year: "2024", title: "Compiling Dreams", desc: "Navigating through algorithms, late-night debugging sessions, and building lifelong bonds." },
            { year: "2025", title: "Runtime Excellence", desc: "Mastering the stack, hosting events, and reaching peak performance as a united batch." },
            { year: "2026", title: "System Shutdown", desc: "The final compile. Ready to deploy our skills into the real world. Logging out." }
          ].map((item, i) => (
            <div key={i} className="memory-item opacity-0 flex flex-col md:flex-row gap-4 md:gap-8 items-start group">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent">
                {item.year}
              </div>
              <div className="flex-1 glass p-6 md:p-8 rounded-2xl relative overflow-hidden w-full border border-white/5">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Directory Section (Cards) */}
      <section ref={directoryRef} className="relative z-10 py-24 md:py-32 container mx-auto px-6 border-t border-white/5 min-h-screen flex flex-col justify-start">
        <div className="text-center mb-16 md:mb-24 h-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-6xl font-bold mb-4 tracking-tight">
                {activeTab === 'admin' ? 'Admin Database' : 'Faculty Database'}
              </h2>
              <p className="text-gray-400 text-base md:text-lg font-light max-w-2xl mx-auto">
                {activeTab === 'admin' 
                  ? "Highly classified access codes for our esteemed administrators." 
                  : "Verified academic credentials for our guiding professors."}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto"
          >
            {displayedData.map((person) => (
              <Link 
                key={person.id} 
                to={`/invite/${person.id}`}
                className="group relative rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-500 ease-out h-[400px] border border-white/5 bg-black"
              >
                <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10`} />
                {person.image ? (
                  <img 
                    src={person.image} 
                    alt={person.name} 
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out opacity-60 group-hover:opacity-100"
                  />
                ) : (
                  <div className={`absolute inset-0 w-full h-full transform group-hover:scale-110 transition-transform duration-1000 ease-out opacity-20 group-hover:opacity-40 bg-gradient-to-br ${person.theme.accent}`} />
                )}
                <div className={`absolute inset-0 bg-gradient-to-br ${person.theme.accent} opacity-10 group-hover:opacity-30 transition-opacity duration-500 z-10 mix-blend-overlay`} />
                
                <div className="relative h-full p-6 flex flex-col justify-end text-left z-20">
                  <h3 className="text-2xl font-semibold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {person.name}
                  </h3>
                  <p className="text-sm text-gray-300 font-light drop-shadow-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                    {person.title}
                  </p>
                  <div className="mt-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-200">
                    <span className={`text-xs font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r ${person.theme.accent}`}>
                      Access Invite
                    </span>
                    <svg className={`w-4 h-4 text-white`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Cinematic Logout Footer */}
      <footer className="relative z-10 py-32 border-t border-white/5 bg-black">
        <div className="container mx-auto px-6 text-center flex flex-col items-center justify-center">
          <MagneticButton 
            onClick={() => navigate('/logout')}
            className="px-8 md:px-12 py-4 rounded-full border border-white/10 glass bg-white/5 hover:bg-white/10 transition-colors duration-300 mb-16 group"
          >
            <span className="text-xs md:text-sm tracking-[0.2em] uppercase font-bold text-white group-hover:text-red-400 transition-colors">
              Execute Logout Sequence
            </span>
          </MagneticButton>
          <div className="text-[10px] md:text-xs text-gray-600 uppercase tracking-widest">
            <p>System awaits termination...</p>
            <p className="mt-2">&copy; 2026 BCA BATCH. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
