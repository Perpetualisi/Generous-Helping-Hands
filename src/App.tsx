import React from "react";
import { motion } from "framer-motion";

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
// This component triggers the "fade-up" effect as you scroll.
const RevealSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const App: React.FC = () => {
  return (
    /* Locked to Matte Black (#0A0908) with White text */
    <div className="min-h-screen bg-[#0A0908] text-white selection:bg-[#C9A96E] selection:text-black">
      
      {/* ─── MAIN LAYOUT ─── */}
      <Navbar />
      
      <main>
        {/* Hero enters immediately for instant impact */}
        <Hero />

        <div className="relative">
          <RevealSection>
            <About />
          </RevealSection>

          <RevealSection>
            <div id="ourprograms">
              <Programs />
            </div>
          </RevealSection>

          <RevealSection>
            <GetInvolved />
          </RevealSection>

          <RevealSection>
            <div id="testimonials">
              <Testimonials />
            </div>
          </RevealSection>

          <RevealSection>
            <Contact />
          </RevealSection>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;