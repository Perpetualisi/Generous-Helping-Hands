import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

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

// ─── REVEAL WRAPPER ──────────────────────────────────────────
const RevealSection: React.FC<{ children: React.ReactNode; id?: string }> = ({ children, id }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
    transition={{ duration: 0.9, ease: [0.21, 1.02, 0.47, 0.98] }}
    className="relative"
  >
    {children}
  </motion.section>
);

const App: React.FC = () => {
  // Optional: Cinematic Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-[#0A0908] text-white selection:bg-[#C9A96E] selection:text-black antialiased">
      
      {/* ─── SCROLL PROGRESS ─── */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#C9A96E] origin-left z-[1100]"
        style={{ scaleX }}
      />

      {/* ─── NAVIGATION ─── */}
      <Navbar />
      
      <main>
        {/* Hero: No RevealSection wrapper here so it's visible on LCP */}
        <section id="hero">
          <Hero />
        </section>

        <div className="space-y-0">
          <RevealSection id="about">
            <About />
          </RevealSection>

          <RevealSection id="ourprograms">
            <Programs />
          </RevealSection>

          <RevealSection id="getinvolved">
            <GetInvolved />
          </RevealSection>

          <RevealSection id="testimonials">
            <Testimonials />
          </RevealSection>

          <RevealSection id="contact">
            <Contact />
          </RevealSection>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;