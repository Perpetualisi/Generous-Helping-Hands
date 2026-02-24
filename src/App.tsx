import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

// Component Imports
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Programs from "./Components/Programs";
import GetInvolved from "./Components/GetInvolved";
import Testimonials from "./Components/Testimonials";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";

// Global Styles
import "./index.css";

// ─── TYPES ───────────────────────────────────────────────────
const THEME = {
  cream: "#FFFDF9",
  gold: "#D4AF37",
  textMain: "#2D241E",
};

// ─── REVEAL WRAPPER ──────────────────────────────────────────
const RevealSection: React.FC<{ children: React.ReactNode; id?: string }> = ({ children, id }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
    className="relative"
  >
    {children}
  </motion.section>
);

// ─── CUSTOM CURSOR ───────────────────────────────────────────
const CustomCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="hidden md:block fixed top-0 left-0 w-8 h-8 rounded-full border border-[#D4AF37] pointer-events-none z-[9999]"
      animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
      transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.5 }}
    />
  );
};

// ─── APP ─────────────────────────────────────────────────────
const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2D241E] antialiased">
      
      {/* 1. Custom Aesthetic Cursor */}
      <CustomCursor />

      {/* 2. Cinematic Progress Bar (Gold Thread) */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] origin-left z-[1100]"
        style={{ scaleX }}
      />

      {/* 3. Global Grain Overlay (Adds tactile texture) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9998] bg-noise" />

      {/* 4. Navigation */}
      <Navbar />
      
      <main className="relative">
        
        {/* Cinematic Background Elements (Subtle parallax blobs) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <motion.div 
            style={{ y: useSpring(useScroll().scrollY, { stiffness: 50, damping: 20 }) }}
            className="absolute top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-[#D4AF37]/5 rounded-full blur-[120px]" 
          />
          <motion.div 
            style={{ y: useSpring(useScroll().scrollY, { stiffness: 40, damping: 25 }) }}
            className="absolute top-[60%] -right-[10%] w-[40vw] h-[40vw] bg-[#B8860B]/5 rounded-full blur-[100px]" 
          />
        </div>

        {/* Hero: Priority Load */}
        <section id="hero" className="relative z-10">
          <Hero />
        </section>

        {/* Content Sections */}
        <div className="relative z-10">
          <RevealSection id="about">
            <About />
          </RevealSection>

          <RevealSection id="ourprograms">
            <Programs />
          </RevealSection>

          <RevealSection id="getinvolved">
            <GetInvolved />
          </RevealSection>

          <div className="py-20 flex items-center justify-center">
             <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent" />
          </div>

          <RevealSection id="testimonials">
            <Testimonials />
          </RevealSection>

          <RevealSection id="contact">
            <Contact />
          </RevealSection>
        </div>
      </main>

      <Footer />

      {/* Dynamic Style for Noise (Optional fallback) */}
      <style>{`
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
};

export default App;