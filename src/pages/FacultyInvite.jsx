import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { facultyData } from '../data/faculty';
import { motion, AnimatePresence } from 'framer-motion';
import { Scene3D } from '../components/ui/Scene3D';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FacultyInvite() {
  const { id } = useParams();
  const faculty = facultyData.find(f => f.id === id);
  const containerRef = useRef(null);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!faculty) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h2>404 - Invitation not found.</h2>
        <Link to="/" className="text-blue-500 ml-4">Go Home</Link>
      </div>
    );
  }

  const handleAccept = () => {
    setIsAccepting(true);
    // Add a dramatic burst effect before switching state
    setTimeout(() => {
      setIsAccepted(true);
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }, 800); // Wait for burst animation
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#030303] text-white selection:bg-white/10 relative overflow-hidden">
      <Scene3D accentColor={faculty.theme.glow} />

      <nav className="fixed top-0 w-full p-6 z-50 glass">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xs md:text-sm tracking-widest uppercase text-gray-400 hover:text-white transition-colors">
            &larr; Back to Directory
          </Link>
          <div className="text-xs md:text-sm tracking-widest uppercase hidden md:block">
            BCA 2023-2026
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col md:flex-row items-center justify-center p-6 md:p-12 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex-1 text-center md:text-left"
        >
          <p className={`text-xs md:text-sm tracking-[0.4em] uppercase mb-4 ${faculty.theme.text}`}>
            You are cordially invited
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            {faculty.name}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-12">
            {faculty.title}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="flex-1 max-w-sm md:max-w-md relative group"
        >
          <div className={`absolute -inset-4 bg-gradient-to-tr ${faculty.theme.accent} rounded-2xl opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-700`} />
          <img 
            src={faculty.image} 
            alt={faculty.name} 
            className="relative z-10 w-full rounded-2xl object-cover shadow-2xl border border-white/10"
          />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Scroll to Unlock</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent" />
        </motion.div>
      </section>

      {/* Message Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center p-6 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className={`text-3xl md:text-5xl font-light leading-relaxed mb-12 bg-clip-text text-transparent bg-gradient-to-r ${faculty.theme.accent}`}
          >
            "{faculty.quote}"
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed"
          >
            {faculty.message}
          </motion.p>
        </div>
      </section>

      {/* Accept Interaction & Details Reveal */}
      <section className="relative z-10 min-h-[80vh] flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {!isAccepted ? (
            <motion.div
              key="button"
              initial={{ opacity: 1, scale: 1 }}
              animate={isAccepting ? { 
                scale: 20, 
                opacity: 0,
                filter: "blur(20px)"
              } : { scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              exit={{ opacity: 0, scale: 0 }}
              className="text-center group cursor-pointer"
              onClick={handleAccept}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center justify-center w-40 h-40 rounded-full border border-white/10 glass bg-gradient-to-br ${faculty.theme.accent} opacity-80 hover:opacity-100 transition-all duration-500 relative overflow-hidden`}
                style={{ boxShadow: `0 0 50px ${faculty.theme.glow}` }}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="font-bold tracking-widest text-lg relative z-10">ACCEPT</span>
              </motion.div>
              <p className={`mt-8 text-xs text-gray-500 uppercase tracking-widest transition-opacity duration-300 ${isAccepting ? 'opacity-0' : 'opacity-100'}`}>
                Click to Confirm Attendance
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="max-w-4xl w-full"
            >
              <div className="glass p-8 md:p-16 rounded-3xl border border-white/10 text-center relative overflow-hidden bg-black/40 backdrop-blur-xl">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${faculty.theme.accent}`} />
                <h3 className={`text-4xl md:text-5xl font-bold mb-4 ${faculty.theme.text} drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]`}>
                  ACCESS GRANTED
                </h3>
                <p className="text-gray-300 mb-12 text-lg">Thank you for accepting. We look forward to celebrating with you.</p>
                
                {/* Stylish Event Details Display */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors duration-300">
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Date</h4>
                    <p className="text-2xl md:text-3xl font-light text-white">23rd May</p>
                    <p className="text-sm text-gray-400 mt-1">2026</p>
                  </div>
                  <div className="p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors duration-300">
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Timing</h4>
                    <p className="text-2xl md:text-3xl font-light text-white">10:00 AM</p>
                    <p className="text-sm text-gray-400 mt-1">to 12:30 PM</p>
                  </div>
                  <div className="p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors duration-300">
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Venue</h4>
                    <p className="text-2xl md:text-3xl font-light text-white">Room 207</p>
                    <p className="text-sm text-gray-400 mt-1">Campus</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
