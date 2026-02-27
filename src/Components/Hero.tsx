import { useEffect, useState, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { Heart, Users, Award, ArrowRight, Sparkles, Globe, ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
interface StatItem {
  icon: LucideIcon;
  value: string;
  label: string;
  sub: string;
}

const STATS: StatItem[] = [
  { icon: Users,  value: "500+", label: "Lives Impacted",  sub: "and growing" },
  { icon: Heart,  value: "50+",  label: "Volunteers",      sub: "worldwide"   },
  { icon: Award,  value: "10+",  label: "Programs",        sub: "active now"  },
  { icon: Globe,  value: "8+",   label: "Communities",     sub: "served"      },
];

const MARQUEE_WORDS: string[] = ["Empower", "Transform", "Uplift", "Mentor", "Support", "Inspire", "Elevate", "Unite"];

// ─── PARTICLE FIELD ───────────────────────────────────────────────────────────
const ParticleField = () => {
  const particles = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * -20,
      opacity: Math.random() * 0.4 + 0.1,
    })), []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(245,158,11,${p.opacity}) 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, p.opacity * 1.5, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }}>
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#F59E0B" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

// ─── GLOW ORBS ────────────────────────────────────────────────────────────────
interface GlowOrbsProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

const GlowOrbs = ({ mouseX, mouseY }: GlowOrbsProps) => {
  const orb1X = useTransform(mouseX, [0, 1], [-20, 20]);
  const orb1Y = useTransform(mouseY, [0, 1], [-20, 20]);
  const orb2X = useTransform(mouseX, [0, 1], [20, -20]);
  const orb2Y = useTransform(mouseY, [0, 1], [20, -20]);

  return (
    <>
      <motion.div style={{
        position: "absolute", width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 65%)",
        top: "-20%", right: "-5%", filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
        x: orb1X, y: orb1Y,
      }} />
      <motion.div style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(234,88,12,0.06) 0%, transparent 65%)",
        bottom: "10%", left: "-10%", filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
        x: orb2X, y: orb2Y,
      }} />
      <motion.div style={{
        position: "absolute", width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 65%)",
        top: "40%", left: "40%", filter: "blur(40px)", pointerEvents: "none", zIndex: 0,
      }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
};

// ─── MARQUEE ──────────────────────────────────────────────────────────────────
const MarqueeStrip = () => {
  const items = useMemo(() => [...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS], []);
  return (
    <div style={{
      overflow: "hidden",
      borderTop: "1px solid rgba(245,158,11,0.12)",
      borderBottom: "1px solid rgba(245,158,11,0.12)",
      padding: "12px 0",
      background: "rgba(245,158,11,0.03)",
      position: "relative", zIndex: 10,
    }}>
      <motion.div
        style={{ display: "flex", gap: "3rem", whiteSpace: "nowrap", willChange: "transform" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 30, repeat: Infinity }}
      >
        {items.map((w, i) => (
          <span key={i} style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.65rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: i % 2 === 0 ? "rgba(245,158,11,0.8)" : "rgba(255,255,255,0.2)",
            fontStyle: i % 2 === 0 ? "italic" : "normal",
          }}>
            {w}&nbsp;{i % 2 === 0 ? "✦" : "◦"}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// ─── STAT CARD ────────────────────────────────────────────────────────────────
interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  sub: string;
  index: number;
}

const StatCard = ({ icon: Icon, value, label, sub, index }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
    whileHover={{ y: -4, scale: 1.02 }}
    style={{
      flex: 1,
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(245,158,11,0.1)",
      borderRadius: 16,
      padding: "1.2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      backdropFilter: "blur(10px)",
      cursor: "default",
    }}
    onHoverStart={(_e, _info) => {
      /* border color is handled via whileHover / CSS — avoid direct DOM mutation here */
    }}
    onHoverEnd={(_e, _info) => {
      /* intentionally empty */
    }}
  >
    <div style={{
      width: 32, height: 32, borderRadius: 10,
      background: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(234,88,12,0.1))",
      display: "flex", alignItems: "center", justifyContent: "center",
      border: "1px solid rgba(245,158,11,0.2)",
    }}>
      <Icon size={14} color="#F59E0B" />
    </div>
    <div style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "1.8rem", fontWeight: 700,
      color: "#fff", lineHeight: 1,
      background: "linear-gradient(135deg, #F59E0B, #fff 60%)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    }}>{value}</div>
    <div>
      <div style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
      <div style={{ fontSize: "0.55rem", color: "rgba(245,158,11,0.6)", letterSpacing: "0.08em", marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>{sub}</div>
    </div>
  </motion.div>
);

// ─── 3D IMAGE CARD ────────────────────────────────────────────────────────────
interface Card3DProps {
  isMobile: boolean;
}

const Card3D = ({ isMobile }: Card3DProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xs = useSpring(x, { stiffness: 80, damping: 20 });
  const ys = useSpring(y, { stiffness: 80, damping: 20 });
  const rotateX = useTransform(ys, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(xs, [-0.5, 0.5], [-12, 12]);
  const glareX = useTransform(xs, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(ys, [-0.5, 0.5], ["0%", "100%"]);

  const glareBackground = useTransform(
    [glareX, glareY] as MotionValue[],
    ([gx, gy]: string[]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.06) 0%, transparent 60%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <div
      style={{ perspective: "1200px", position: "relative", width: "100%" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Halo */}
      <motion.div style={{
        position: "absolute", inset: -40,
        background: "radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.18) 0%, transparent 70%)",
        filter: "blur(50px)", zIndex: 0, borderRadius: 60, pointerEvents: "none",
      }}
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main 3D Card */}
      <motion.div
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: "preserve-3d",
          position: "relative", zIndex: 1,
          borderRadius: isMobile ? 20 : 28, overflow: "hidden",
          boxShadow: "0 50px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,158,11,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
          background: "#1a1714",
          willChange: "transform",
        }}
      >
        <img
          src="/Hero.png"
          alt="Women empowerment"
          style={{
            width: "100%", display: "block",
            objectFit: "cover", objectPosition: "center top",
            minHeight: isMobile ? "280px" : "560px",
            maxHeight: isMobile ? "380px" : "none",
            opacity: 0.85,
            filter: "saturate(0.9) contrast(1.05)",
          }}
        />

        {/* Cinematic color grade overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(160deg, rgba(245,158,11,0.08) 0%, transparent 40%, rgba(0,0,0,0.3) 100%)",
          mixBlendMode: "multiply",
        }} />

        {/* Bottom gradient */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "linear-gradient(to top, rgba(10,8,6,0.97) 0%, rgba(10,8,6,0.7) 40%, transparent 100%)",
          padding: isMobile ? "2rem 1.2rem 1.2rem" : "5rem 2.5rem 2.5rem",
        }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? "1rem" : "1.4rem",
              fontStyle: "italic", color: "#fff",
              margin: 0, lineHeight: 1.45,
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            "Every woman deserves<br />a chance to rise."
          </motion.p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginTop: "0.7rem" }}>
            <div style={{ width: "28px", height: "1px", background: "linear-gradient(90deg, #F59E0B, transparent)" }} />
            <span style={{ fontSize: "0.55rem", letterSpacing: "0.3em", color: "#F59E0B", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
              GHHF Mission
            </span>
          </div>
        </div>

        {/* Glare effect */}
        {!isMobile && (
          <motion.div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: glareBackground,
            borderRadius: 28,
          }} />
        )}

        {/* Corner badge */}
        <div style={{
          position: "absolute", top: "1rem", right: "1rem",
          border: "1px solid rgba(245,158,11,0.4)", borderRadius: "50%",
          width: 42, height: 42,
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(20px)", background: "rgba(245,158,11,0.1)",
        }}>
          <Heart size={15} fill="#F59E0B" color="#F59E0B" />
        </div>

        {/* Top tag */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          style={{
            position: "absolute", top: "1rem", left: "1rem",
            background: "rgba(26,23,20,0.75)", backdropFilter: "blur(20px)",
            border: "1px solid rgba(245,158,11,0.2)",
            borderRadius: 100, padding: "0.4rem 0.9rem",
            display: "flex", alignItems: "center", gap: "0.5rem",
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
          <span style={{ fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif" }}>
            Active Program
          </span>
        </motion.div>
      </motion.div>

      {/* Floating pill — desktop only */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "-2.5rem",
            background: "rgba(26,23,20,0.92)", backdropFilter: "blur(30px)",
            border: "1px solid rgba(245,158,11,0.25)",
            borderRadius: 100, padding: "0.65rem 1.2rem",
            display: "flex", alignItems: "center", gap: "0.9rem",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,158,11,0.05)",
            zIndex: 20, whiteSpace: "nowrap",
          }}
        >
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "linear-gradient(135deg, #F59E0B, #EA580C)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, boxShadow: "0 4px 15px rgba(245,158,11,0.4)",
          }}>
            <Users size={14} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", lineHeight: 1, fontFamily: "'Cormorant Garamond', serif" }}>500+</div>
            <div style={{ fontSize: "0.5rem", color: "rgba(245,158,11,0.7)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>
              Lives Changed
            </div>
          </div>
        </motion.div>
      )}

      {/* Second floating accent */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        style={{
          position: "absolute",
          top: isMobile ? "auto" : "30%",
          bottom: isMobile ? "1rem" : "auto",
          right: isMobile ? "1rem" : "-2rem",
          background: "rgba(26,23,20,0.85)", backdropFilter: "blur(20px)",
          border: "1px solid rgba(245,158,11,0.2)",
          borderRadius: 16, padding: "0.8rem 1rem",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem",
          zIndex: 20,
        }}
      >
        <Sparkles size={14} color="#F59E0B" />
        <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#fff", fontFamily: "'Cormorant Garamond', serif" }}>Est.</div>
        <div style={{ fontSize: "0.6rem", color: "#F59E0B", fontFamily: "'DM Sans', sans-serif" }}>2014</div>
      </motion.div>

      {/* Mobile-only floating pill — inline below card */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          style={{
            background: "rgba(26,23,20,0.92)", backdropFilter: "blur(30px)",
            border: "1px solid rgba(245,158,11,0.25)",
            borderRadius: 100, padding: "0.65rem 1.2rem",
            display: "flex", alignItems: "center", gap: "0.9rem",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            zIndex: 20, whiteSpace: "nowrap",
            width: "fit-content",
            margin: "1rem auto 0",
          }}
        >
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "linear-gradient(135deg, #F59E0B, #EA580C)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, boxShadow: "0 4px 15px rgba(245,158,11,0.4)",
          }}>
            <Users size={14} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", lineHeight: 1, fontFamily: "'Cormorant Garamond', serif" }}>500+</div>
            <div style={{ fontSize: "0.5rem", color: "rgba(245,158,11,0.7)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>
              Lives Changed
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// ─── HERO ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const mouseX = useMotionValue<number>(0.5);
  const mouseY = useMotionValue<number>(0.5);

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

  const scrollDown = () => {
    const id = ["missionstatement", "about", "ourprograms"].find(i => document.getElementById(i));
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold: #F59E0B;
          --gold-deep: #D97706;
          --orange: #EA580C;
          --bg: #1a1714;
          --bg-card: #1f1c19;
          --surface: rgba(255,255,255,0.03);
          --border: rgba(245,158,11,0.12);
          --text: #ffffff;
          --text-muted: rgba(255,255,255,0.5);
        }

        .h-cta-primary {
          background: linear-gradient(135deg, var(--gold), var(--orange));
          color: #fff; border: none;
          padding: 0.9rem 2.2rem; border-radius: 100px;
          font-family: 'DM Sans', sans-serif; font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer;
          display: inline-flex; align-items: center; gap: 0.6rem;
          transition: all 0.4s cubic-bezier(0.2, 1, 0.3, 1);
          box-shadow: 0 8px 30px rgba(245,158,11,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
          text-decoration: none; position: relative; overflow: hidden;
        }
        .h-cta-primary::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .h-cta-primary:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(245,158,11,0.5); }
        .h-cta-primary:hover::before { opacity: 1; }

        .h-cta-secondary {
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.8);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0.9rem 2.2rem; border-radius: 100px;
          font-family: 'DM Sans', sans-serif; font-size: 0.75rem;
          letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer;
          display: inline-flex; align-items: center; gap: 0.6rem;
          transition: all 0.3s ease; text-decoration: none;
          backdrop-filter: blur(10px);
        }
        .h-cta-secondary:hover { border-color: var(--gold); color: var(--gold); background: rgba(245,158,11,0.06); }

        /* Stat card hover border via CSS to avoid DOM mutation in TS */
        .stat-card { transition: border-color 0.3s ease; }
        .stat-card:hover { border-color: rgba(245,158,11,0.3) !important; }

        /* ── MOBILE LAYOUT ── */
        @media (max-width: 1023px) {
          .h-grid {
            flex-direction: column !important;
            padding: 3rem 1.25rem 4rem !important;
            gap: 2.5rem !important;
            align-items: stretch !important;
          }
          .h-img-col  { order: -1 !important; flex: none !important; width: 100% !important; }
          .h-text-col { order:  0 !important; align-items: center !important; text-align: center !important; }
          .h-eyebrow, .h-ctas { justify-content: center !important; }
          .h-divider { display: none !important; }
          .h-body { text-align: center !important; max-width: 520px !important; margin: 0 auto !important; }
          .h-headline { text-align: center !important; font-size: clamp(2.4rem, 8vw, 3.5rem) !important; }
          .h-stats-row { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 540px) {
          .h-grid { padding: 1.5rem 1rem 4rem !important; gap: 2rem !important; }
          .h-ctas { flex-direction: column !important; width: 100% !important; }
          .h-cta-primary, .h-cta-secondary { justify-content: center !important; width: 100% !important; }
          .h-stats-row { grid-template-columns: repeat(2, 1fr) !important; gap: 0.6rem !important; }
          .h-headline { font-size: clamp(2rem, 10vw, 2.8rem) !important; }
        }
      `}</style>

      <div
        id="hero"
        style={{
          background: "#1a1714",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          color: "var(--text)",
          fontFamily: "'DM Sans', sans-serif",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ParticleField />
        <GlowOrbs mouseX={mouseX} mouseY={mouseY} />

        {/* Noise texture */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }} />

        {/* Marquee */}
        <div style={{ position: "relative", zIndex: 10, paddingTop: isMobile ? "110px" : "160px" }}>
          <MarqueeStrip />
        </div>

        {/* Main content */}
        <main
          className="h-grid"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5rem",
            padding: "5rem 6% 5rem",
            maxWidth: "1440px",
            margin: "0 auto",
            position: "relative", zIndex: 5,
            flex: 1, width: "100%",
          }}
        >
          {/* Text col */}
          <motion.div
            className="h-text-col"
            style={{ flex: 1.15, display: "flex", flexDirection: "column", alignItems: "flex-start" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <motion.div
              className="h-eyebrow"
              style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <div style={{ display: "flex", gap: 3 }}>
                {[...Array(3)].map((_, i) => (
                  <div key={i} style={{ width: i === 1 ? 20 : 6, height: 2, background: "#F59E0B", borderRadius: 2, opacity: 1 - i * 0.25 }} />
                ))}
              </div>
              <span style={{
                fontSize: "0.6rem", letterSpacing: "0.45em", textTransform: "uppercase",
                color: "#F59E0B", fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
              }}>
                Women Empowerment Initiative
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="h-headline"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(3rem, 4.5vw, 5.2rem)",
                lineHeight: 1.05, fontWeight: 700,
                marginBottom: "2rem",
                color: "#fff",
                letterSpacing: "-0.01em",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9 }}
            >
              Generous{" "}
              <span style={{
                fontStyle: "italic",
                background: "linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Helping</span>
              <br />
              <span style={{ color: "rgba(255,255,255,0.9)" }}>Hands Foundation</span>
            </motion.h1>

            {/* Body */}
            <motion.div
              style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", marginBottom: "2.5rem" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div
                className="h-divider"
                style={{
                  width: 2, flexShrink: 0, alignSelf: "stretch", marginTop: 4,
                  background: "linear-gradient(to bottom, #F59E0B, transparent)",
                }}
              />
              <p
                className="h-body"
                style={{
                  color: "rgba(255,255,255,0.55)", fontSize: "1rem",
                  lineHeight: 1.75, fontWeight: 300, maxWidth: "480px",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                We provide women and girls with essential resources, mentorship, and community support to break barriers and build thriving futures — one life at a time.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="h-ctas"
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7 }}
            >
              <a href="#donation" className="h-cta-primary">
                Donate Now <ArrowRight size={15} />
              </a>
              <a href="#volunteer" className="h-cta-secondary">
                Join Community <ArrowRight size={15} />
              </a>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              className="h-stats-row"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "0.75rem",
                marginTop: "3.5rem",
                width: "100%",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {STATS.map((stat, i) => (
                <StatCard key={i} {...stat} index={i} />
              ))}
            </motion.div>

            {/* Trust line */}
            <motion.div
              style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "2rem" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <div style={{ display: "flex" }}>
                {[...Array(5)].map((_, i) => (
                  <div key={i} style={{
                    width: 22, height: 22, borderRadius: "50%",
                    background: "linear-gradient(135deg, #F59E0B, #EA580C)",
                    border: "2px solid var(--bg)", marginLeft: i > 0 ? -6 : 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.55rem", color: "#fff", fontWeight: 700,
                  }}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em", fontFamily: "'DM Sans', sans-serif" }}>
                Trusted by <span style={{ color: "#F59E0B" }}>500+</span> community members
              </span>
            </motion.div>
          </motion.div>

          {/* Image col */}
          <motion.div
            className="h-img-col"
            style={{ flex: 1, position: "relative", width: "100%" }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card3D isMobile={isMobile} />
          </motion.div>
        </main>

        {/* Footer bar */}
        <footer style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "1.2rem 6%",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(26,23,20,0.85)", backdropFilter: "blur(20px)",
          position: "relative", zIndex: 10,
          flexWrap: "wrap", gap: "1rem",
        }}>
          <span style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
            © 2026 Generous Helping Hands Foundation · All Rights Reserved
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            {["Privacy", "Terms", "Contact"].map(item => (
              <a
                key={item}
                href="#"
                style={{
                  fontSize: "0.55rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em",
                  textTransform: "uppercase", textDecoration: "none", transition: "color 0.2s",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#F59E0B")}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
              >{item}</a>
            ))}
            <button
              onClick={scrollDown}
              style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 100, padding: "0.55rem 1.2rem",
                color: "rgba(255,255,255,0.5)", fontSize: "0.6rem",
                letterSpacing: "0.15em", textTransform: "uppercase",
                cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem",
                transition: "all 0.3s ease", fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.borderColor = "rgba(245,158,11,0.4)";
                e.currentTarget.style.color = "#F59E0B";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "rgba(255,255,255,0.5)";
              }}
            >
              Explore <ChevronDown size={12} />
            </button>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Hero;