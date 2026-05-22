import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import FacultyInvite from './pages/FacultyInvite';
import Logout from './pages/Logout';
import { CustomCursor } from './components/ui/CustomCursor';
import { PageTransition } from './components/animations/PageTransition';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/invite/:id" element={<PageTransition><FacultyInvite /></PageTransition>} />
        <Route path="/logout" element={<PageTransition><Logout /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <CustomCursor />
      <Router>
        <ScrollToTop />
        <AnimatedRoutes />
      </Router>
    </ReactLenis>
  );
}

export default App;
