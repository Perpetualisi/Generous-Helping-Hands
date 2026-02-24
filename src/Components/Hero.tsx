import React, { useEffect, useState, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, Users, Award, ArrowRight, MoveRight } from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Stat {
  icon: React.ElementType;
  value: string;
  label: string;
}

interface StatItemProps extends Stat {
  index: number;
}

interface CinematicImageProps {
  isMobile: boolean;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STATS: Stat[] = [
  { icon: Users, value: "500+", label: "Lives Impacted" },
  { icon: Heart, value: "50+",  label: "Volunteers"      },
  { icon: Award, value: "10+",  label: "Programs"         },
];

const MARQUEE_ITEMS: string[] = [
  "Empower", "Transform", "Uplift", "Mentor", "Support", "Inspire",
];

// ─── STAT ITEM ────────────────────────────────────────────────────────────────
const StatItem: React.FC<StatItemProps> = ({ icon: Icon, value, label }) => (
  <div
    className="h-stat"
    style={{
      flex: 1,
      transition: "transform 0.4s cubic-bezier(0.2, 1, 0.3, 1)",
    }}
  >
    <Icon 
      size={15} 
      color="#D97706" 
      style={{ marginBottom: "0.6rem", display: "block" }} 
    />
    <div className="h-stat-value" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#2D241E", lineHeight: 1 }}>
      {value}
    </div>
    <div className="h-stat-label" style={{ letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(45,36,30,0.6)", marginTop: "0.3rem" }}>
      {label}
    </div>
  </div>
);

// ─── MARQUEE ──────────────────────────────────────────────────────────────────
const MarqueeStrip: React.FC = () => {
  const items = useMemo(
    () => [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS],
    []
  );

  return (
    <div style={{
      overflow: "hidden",
      borderTop: "1px solid rgba(245,158,11,0.15)",
      borderBottom: "1px solid rgba(245,158,11,0.15)",
      padding: "14px 0",
      background: "rgba(245,158,11,0.03)",
    }}>
      <motion.div
        style={{ display: "flex", gap: "3.5rem", whiteSpace: "nowrap" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 25, repeat: Infinity }}
      >
        {items.map((w, i) => (
          <span key={i} style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "0.7rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: i % 2 === 0 ? "#D97706" : "rgba(45,36,30,0.3)",
            fontStyle: i % 2 === 0 ? "italic" : "normal",
          }}>
            {w}&nbsp;{i % 2 === 0 ? "✦" : "·"}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// ─── CINEMATIC IMAGE ──────────────────────────────────────────────────────────
const CinematicImage: React.FC<CinematicImageProps> = ({ isMobile }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xs = useSpring(x, { stiffness: 60, damping: 15 });
  const ys = useSpring(y, { stiffness: 60, damping: 15 });
  const rotateX = useTransform(ys, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(xs, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ perspective: "1500px", position: "relative", width: "100%" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          position: "absolute", inset: "-20px",
          background: "radial-gradient(circle at 50% 50%, rgba(245,158,11,0.15) 0%, transparent 75%)",
          filter: "blur(40px)", zIndex: 0, borderRadius: "40px", pointerEvents: "none",
        }}
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: "preserve-3d",
        position: "relative", zIndex: 1,
        borderRadius: "24px", overflow: "hidden",
        boxShadow: "0 40px 80px rgba(45,36,30,0.15), 0 0 0 1px rgba(245,158,11,0.1)",
        background: "#fff",
        willChange: "transform"
      }}>
        <img
          src="/Hero.png"
          alt="Mother and daughter"
          style={{
            width: "100%", display: "block",
            objectFit: "cover", objectPosition: "center",
            minHeight: isMobile ? "400px" : "580px",
          }}
        />

        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "linear-gradient(to top, rgba(45,36,30,0.9) 15%, transparent 100%)",
          padding: isMobile ? "2rem 1.25rem" : "4rem 2.5rem 2.5rem",
        }}>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? "1.1rem" : "1.4rem",
            fontStyle: "italic", color: "#fff", margin: 0, lineHeight: 1.4,
          }}>
            "Every woman deserves<br />a chance to rise."
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginTop: "1rem" }}>
            <div style={{ width: "30px", height: "1px", background: "#F59E0B" }} />
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.25em", color: "#F59E0B", textTransform: "uppercase", fontWeight: 600 }}>
              GHHF Mission
            </span>
          </div>
        </div>

        <div style={{
          position: "absolute", top: "1rem", right: "1rem",
          border: "1px solid rgba(245,158,11,0.3)", borderRadius: "50%",
          width: "44px", height: "44px",
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(15px)", background: "rgba(255,255,255,0.2)",
        }}>
          <Heart size={16} fill="#F59E0B" color="#F59E0B" />
        </div>
      </motion.div>

      {/* Stats Floating Pill */}
      <motion.div
        className="h-floating-pill"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div className="h-pill-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Users size={16} color="#fff" />
        </div>
        <div style={{ whiteSpace: "nowrap" }}>
          <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>500+</div>
          <div style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "2px" }}>
            Lives Changed
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── HERO ─────────────────────────────────────────────────────────────────────
const Hero: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    const onMove = (e: MouseEvent) => {
      if (window.innerWidth >= 1024) {
        mouseX.set(e.clientX / window.innerWidth);
        mouseY.set(e.clientY / window.innerHeight);
      }
    };
    onResize();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [mouseX, mouseY]);

  const orbX = useTransform(mouseX, [0, 1], [-30, 30]);
  const orbY = useTransform(mouseY, [0, 1], [-30, 30]);

  const scrollDown = (): void => {
    const id = ["missionstatement", "about", "ourprograms"].find(
      (i) => document.getElementById(i)
    );
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        
        :root { 
          --accent: #F59E0B; 
          --accent-deep: #D97706;
          --text-main: #2D241E;
          --bg-warm: #FFFDF9; 
        }

        .h-cta-primary {
          background: linear-gradient(135deg, var(--accent), #EA580C);
          color: #fff; border: none;
          padding: 0.9rem 2rem; border-radius: 100px;
          font-family: 'DM Sans', sans-serif; font-size: 0.8rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer;
          display: inline-flex; align-items: center; gap: 0.7rem;
          transition: all 0.4s cubic-bezier(0.2, 1, 0.3, 1);
          box-shadow: 0 10px 30px rgba(245,158,11,0.3);
          text-decoration: none;
        }

        .h-cta-primary:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(245,158,11,0.4); }

        .h-cta-secondary {
          background: transparent; color: var(--text-main);
          border: 1px solid rgba(45,36,30,0.15);
          padding: 0.9rem 2rem; border-radius: 100px;
          font-family: 'DM Sans', sans-serif; font-size: 0.8rem;
          letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer;
          display: inline-flex; align-items: center; gap: 0.7rem;
          transition: all 0.3s ease; text-decoration: none;
        }

        .h-cta-secondary:hover { border-color: var(--accent-deep); color: var(--accent-deep); background: rgba(245,158,11,0.05); }

        .h-stat { border-left: 1px solid rgba(45,36,30,0.08); padding: 0 2rem; }
        .h-stat:first-child { border-left: none; padding-left: 0; }
        .h-stat-value { font-size: 2rem; }
        .h-stat-label { font-size: 0.65rem; }

        .h-floating-pill {
          position: absolute; bottom: 3rem; left: -2rem;
          background: #2D241E; border: 1px solid rgba(245,158,11,0.3);
          border-radius: 100px; padding: 0.7rem 1.2rem; backdrop-filter: blur(20px);
          display: flex; align-items: center; gap: 0.8rem; z-index: 10;
          box-shadow: 0 20px 50px rgba(45,36,30,0.25);
        }

        .h-pill-icon {
          width: 32px; height: 32px; border-radius: 50%;
          background: linear-gradient(135deg, #F59E0B, #EA580C);
          flex-shrink: 0;
        }

        @media (max-width: 1024px) {
          .h-grid { flex-direction: column !important; padding: 4rem 1.5rem 5rem !important; gap: 4rem !important; }
          .h-text { align-items: center !important; text-align: center !important; }
          .h-eyebrow, .h-ctas { justify-content: center !important; }
          .h-divider { display: none !important; }
          .h-headline { white-space: normal !important; text-align: center; margin-bottom: 1.5rem !important; }
          .h-body { text-align: center; margin: 0 auto !important; }
          .h-imgcol { width: 100% !important; flex: none !important; max-width: 550px; }
          
          .h-stats { 
             display: flex !important; 
             flex-direction: row !important; 
             flex-wrap: nowrap !important; 
             justify-content: space-between !important; 
             gap: 0.5rem !important; 
             border-top: 1px solid rgba(45,36,30,0.08); 
             padding-top: 2rem !important; 
             width: 100% !important;
          }
          .h-stat { border-left: none; padding: 0; flex: 1 !important; text-align: center; }
          .h-stat-value { font-size: 1.4rem !important; }
          .h-stat-label { font-size: 0.55rem !important; white-space: nowrap; }

          .h-floating-pill { left: 50%; transform: translateX(-50%); bottom: -1.25rem; }
          .h-footer { flex-direction: column; gap: 1.5rem; text-align: center; padding: 2rem 1.5rem !important; }
        }

        @media (max-width: 480px) {
          .h-headline { font-size: 2.5rem !important; }
          .h-ctas { flex-direction: column; width: 100%; }
          .h-cta-primary, .h-cta-secondary { justify-content: center; width: 100%; }
        }
      `}</style>

      <div
        id="hero"
        style={{
          background: "var(--bg-warm)",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          color: "var(--text-main)",
          fontFamily: "'DM Sans', sans-serif",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Subtle Noise Texture */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.02, pointerEvents: "none", zIndex: 1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} />

        {!isMobile && (
          <motion.div style={{
            position: "absolute", width: "800px", height: "800px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
            top: "-10%", right: "-10%", filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
            x: orbX, y: orbY,
          }} />
        )}

        <div style={{ position: "relative", zIndex: 5, paddingTop: "100px" }}>
          <MarqueeStrip />
        </div>

        <main
          className="h-grid"
          style={{
            display: "flex", alignItems: "center",
            gap: "4rem", padding: "4rem 6%",
            maxWidth: "1400px", margin: "0 auto",
            position: "relative", zIndex: 2,
            flex: 1, width: "100%"
          }}
        >
          <motion.div
            className="h-text"
            style={{ flex: 1.2, display: "flex", flexDirection: "column", alignItems: "flex-start" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-eyebrow" style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{ width: "30px", height: "2px", background: "#D97706" }} />
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#D97706", fontWeight: 700 }}>
                Women Empowerment Initiative
              </span>
            </div>

            <h1
              className="h-headline"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.5rem, 4.5vw, 4.8rem)",
                lineHeight: 1.1, fontWeight: 700,
                marginBottom: "2rem",
                color: "#2D241E"
              }}
            >
              Generous{" "}
              <span style={{ fontStyle: "italic", color: "#D97706" }}>Helping</span>
              <br />Hands Foundation
            </h1>

            <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", marginBottom: "2.5rem" }}>
              <div
                className="h-divider"
                style={{ width: "2px", background: "rgba(217,119,6,0.2)", flexShrink: 0, alignSelf: "stretch", marginTop: "8px" }}
              />
              <p
                className="h-body"
                style={{ color: "rgba(45,36,30,0.7)", fontSize: "1.05rem", lineHeight: 1.7, fontWeight: 400, maxWidth: "480px", margin: 0 }}
              >
                We provide women and girls with the essential resources, mentorship, and community support needed to break barriers and build thriving futures.
              </p>
            </div>

            <div className="h-ctas" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#donation" className="h-cta-primary">
                Donate Now <ArrowRight size={16} />
              </a>
              <a href="#volunteer" className="h-cta-secondary">
                Join Community <MoveRight size={16} />
              </a>
            </div>

            <div
              className="h-stats"
              style={{
                display: "flex", width: "100%",
                marginTop: "4rem", paddingTop: "2.5rem",
                borderTop: "1px solid rgba(45,36,30,0.1)",
              }}
            >
              {STATS.map((stat, i) => (
                <StatItem key={i} {...stat} index={i} />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="h-imgcol"
            style={{ flex: 1, position: "relative", width: "100%" }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <CinematicImage isMobile={isMobile} />
          </motion.div>
        </main>

        <footer
          className="h-footer"
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "1.5rem 6%",
            borderTop: "1px solid rgba(45,36,30,0.05)",
            background: "rgba(255,253,249,0.8)",
            backdropFilter: "blur(10px)",
            position: "relative", zIndex: 10,
          }}
        >
          <span style={{ fontSize: "0.6rem", color: "rgba(45,36,30,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            © 2026 Generous Helping Hands Foundation · All Rights Reserved
          </span>
          <button
            onClick={scrollDown}
            style={{
              background: "none", border: "1px solid rgba(45,36,30,0.15)",
              borderRadius: "100px", padding: "0.6rem 1.4rem",
              color: "rgba(45,36,30,0.6)", fontSize: "0.65rem",
              letterSpacing: "0.15em", textTransform: "uppercase",
              cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem",
              transition: "all 0.3s ease",
            }}
          >
            Explore More <ArrowRight size={14} />
          </button>
        </footer>
      </div>
    </>
  );
};

export default Hero;