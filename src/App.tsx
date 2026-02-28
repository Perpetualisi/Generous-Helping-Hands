import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

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

// ─── THEME ───────────────────────────────────────────────────
const T = {
  bg:      "#1a1714",
  gold:    "#F59E0B",
  orange:  "#EA580C",
  border:  "rgba(245,158,11,0.12)",
};

// ─── REVEAL WRAPPER ──────────────────────────────────────────
const RevealSection: React.FC<{ children: React.ReactNode; id?: string }> = ({ children, id }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-8%" }}
    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    style={{ position: "relative" }}
  >
    {children}
  </motion.section>
);

// ─── DUAL-RING CUSTOM CURSOR ─────────────────────────────────
const CustomCursor: React.FC = () => {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos  = useRef({ x: 0, y: 0 });
  const raf  = useRef<number>(0);
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // RAF loop for ring lag
    let rx = 0, ry = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = () => {
      rx = lerp(rx, pos.current.x, 0.12);
      ry = lerp(ry, pos.current.y, 0.12);
      if (ring.current) {
        ring.current.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
      }
      setVisible(true);
    };

    const onLeave  = () => setVisible(false);
    const onEnter  = () => setVisible(true);
    const onDown   = () => setClicking(true);
    const onUp     = () => setClicking(false);

    const onHoverStart = () => setHovering(true);
    const onHoverEnd   = () => setHovering(false);

    // Track interactive elements
    const addHover = () => {
      document.querySelectorAll("a, button, [role='button']").forEach(el => {
        el.addEventListener("mouseenter", onHoverStart);
        el.addEventListener("mouseleave", onHoverEnd);
      });
    };
    addHover();

    window.addEventListener("mousemove",  onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dot}
        style={{
          position: "fixed", top: 0, left: 0,
          width: clicking ? 6 : 10, height: clicking ? 6 : 10,
          borderRadius: "50%",
          background: T.gold,
          pointerEvents: "none", zIndex: 10001,
          opacity: visible ? 1 : 0,
          boxShadow: `0 0 ${hovering ? 16 : 8}px rgba(245,158,11,${hovering ? 0.9 : 0.6})`,
          mixBlendMode: "screen",
          transition: "width 0.15s ease, height 0.15s ease, opacity 0.2s ease, box-shadow 0.2s ease",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ring}
        style={{
          position: "fixed", top: 0, left: 0,
          width: hovering ? 52 : clicking ? 28 : 40,
          height: hovering ? 52 : clicking ? 28 : 40,
          borderRadius: "50%",
          border: `1px solid rgba(245,158,11,${hovering ? 0.7 : 0.4})`,
          pointerEvents: "none", zIndex: 10000,
          opacity: visible ? 1 : 0,
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, opacity 0.2s ease",
          willChange: "transform",
        }}
      />
    </>
  );
};

// ─── SCROLL PROGRESS BAR ─────────────────────────────────────
const ProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: 2, transformOrigin: "left",
        scaleX,
        background: `linear-gradient(90deg, ${T.gold}, ${T.orange})`,
        zIndex: 1200,
        boxShadow: `0 0 12px rgba(245,158,11,0.6)`,
      }}
    />
  );
};

// ─── AMBIENT BACKGROUND SYSTEM ───────────────────────────────
const AmbientBg: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 3000], [0, -300]);
  const y2 = useTransform(scrollY, [0, 3000], [0, -180]);
  const y3 = useTransform(scrollY, [0, 3000], [0, -420]);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {/* Top-right gold orb */}
      <motion.div style={{
        position: "absolute", top: "-10%", right: "-5%",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 65%)",
        filter: "blur(80px)", y: y1,
      }} />
      {/* Bottom-left orange orb */}
      <motion.div style={{
        position: "absolute", bottom: "10%", left: "-10%",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(234,88,12,0.05) 0%, transparent 65%)",
        filter: "blur(90px)", y: y2,
      }} />
      {/* Mid center soft bloom */}
      <motion.div style={{
        position: "absolute", top: "40%", left: "35%",
        width: 500, height: 400, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(245,158,11,0.04) 0%, transparent 70%)",
        filter: "blur(60px)", y: y3,
      }} />
    </div>
  );
};

// ─── SECTION DIVIDER ─────────────────────────────────────────
const SectionDivider: React.FC = () => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "3rem 6%", gap: "1.5rem",
  }}>
    <div style={{ flex: 1, height: 1, maxWidth: 120, background: `linear-gradient(90deg, transparent, ${T.border})` }} />
    <motion.div
      animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: 5, height: 5, borderRadius: "50%", background: T.gold, flexShrink: 0 }}
    />
    <div style={{ width: 24, height: 1, background: T.border }} />
    <div style={{ width: 5, height: 5, borderRadius: "50%", background: `rgba(245,158,11,0.3)`, flexShrink: 0 }} />
    <div style={{ width: 24, height: 1, background: T.border }} />
    <motion.div
      animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      style={{ width: 5, height: 5, borderRadius: "50%", background: T.gold, flexShrink: 0 }}
    />
    <div style={{ flex: 1, height: 1, maxWidth: 120, background: `linear-gradient(90deg, ${T.border}, transparent)` }} />
  </div>
);

// ─── PAGE LOADER ─────────────────────────────────────────────
const PageLoader: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(onDone, 400); return 100; }
        return p + Math.random() * 18;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: T.bg,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: "2rem",
      }}
    >
      {/* Animated logo ring */}
      <div style={{ position: "relative", width: 80, height: 80 }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute", inset: 0,
            border: "1.5px solid transparent",
            borderTopColor: T.gold,
            borderRightColor: `rgba(245,158,11,0.3)`,
            borderRadius: "50%",
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute", inset: 8,
            border: "1px solid transparent",
            borderTopColor: T.orange,
            borderRadius: "50%",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            width: 10, height: 10, borderRadius: "50%",
            background: `linear-gradient(135deg, ${T.gold}, ${T.orange})`,
            boxShadow: `0 0 16px rgba(245,158,11,0.6)`,
          }} />
        </div>
      </div>

      {/* Name */}
      <div style={{ textAlign: "center" }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.2rem", fontWeight: 700,
          color: "rgba(255,255,255,0.9)", letterSpacing: "0.05em",
        }}>Generous Helping Hands</p>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.55rem", fontWeight: 700,
          letterSpacing: "0.35em", textTransform: "uppercase",
          color: T.gold, marginTop: "0.3rem",
        }}>Foundation</p>
      </div>

      {/* Progress bar */}
      <div style={{
        width: 180, height: 1,
        background: "rgba(255,255,255,0.08)",
        borderRadius: 100, overflow: "hidden",
      }}>
        <motion.div
          style={{
            height: "100%", borderRadius: 100,
            background: `linear-gradient(90deg, ${T.gold}, ${T.orange})`,
            width: `${Math.min(progress, 100)}%`,
            transition: "width 0.15s ease",
            boxShadow: `0 0 8px rgba(245,158,11,0.5)`,
          }}
        />
      </div>
    </motion.div>
  );
};

// ─── APP ─────────────────────────────────────────────────────
const App: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        html, body, #root { background-color: #1a1714 !important; }
        a, button { cursor: pointer; }
      `}</style>

      {/* Page loader */}
      {!loaded && <PageLoader onDone={() => setLoaded(true)} />}

      {/* Custom cursor — desktop only */}
      <div className="hidden-touch">
        <CustomCursor />
      </div>

      {/* Scroll progress thread */}
      <ProgressBar />

      {/* Parallax ambient orbs — fixed behind everything */}
      <AmbientBg />

      <div style={{ minHeight: "100vh", background: T.bg, color: "#fff", position: "relative" }}>

        {/* Navigation */}
        <Navbar />

        <main style={{ position: "relative", zIndex: 1 }}>

          {/* Hero: no reveal wrapper (has its own animations) */}
          <section id="hero" style={{ position: "relative", zIndex: 10 }}>
            <Hero />
          </section>

          {/* Content sections */}
          <div style={{ position: "relative", zIndex: 5 }}>

            <RevealSection id="about">
              <About />
            </RevealSection>

            <SectionDivider />

            <RevealSection id="ourprograms">
              <Programs />
            </RevealSection>

            <SectionDivider />

            <RevealSection id="getinvolved">
              <GetInvolved />
            </RevealSection>

            <SectionDivider />

            <RevealSection id="testimonials">
              <Testimonials />
            </RevealSection>

            <SectionDivider />

            <RevealSection id="contact">
              <Contact />
            </RevealSection>

          </div>
        </main>

        <Footer />
      </div>

      <style>{`
        @media (hover: none) and (pointer: coarse) {
          .hidden-touch { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default App;