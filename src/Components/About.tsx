import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  type Variants,
} from "framer-motion";
import {
  Users, Globe, Sparkles, Heart, Target, Download, Quote, ArrowUpRight
} from "lucide-react";

// ─── THEME ────────────────────────────────────────────────────────────────────
const C = {
  bg:         "#1a1714",
  bgCard:     "#211e1a",
  bgDeep:     "#131110",
  gold:       "#F59E0B",
  goldDeep:   "#D97706",
  orange:     "#EA580C",
  text:       "#ffffff",
  textMuted:  "rgba(255,255,255,0.5)",
  textFaint:  "rgba(255,255,255,0.25)",
  border:     "rgba(245,158,11,0.12)",
  borderHov:  "rgba(245,158,11,0.3)",
  surface:    "rgba(255,255,255,0.04)",
  gradient:   "linear-gradient(135deg, #F59E0B, #EA580C)",
} as const;

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// ─── EYEBROW ──────────────────────────────────────────────────────────────────
const Eyebrow: React.FC<{ icon: React.ElementType; children: React.ReactNode }> = ({ icon: Icon, children }) => (
  <motion.div
    variants={fadeUp}
    style={{
      display: "inline-flex", alignItems: "center", gap: "0.5rem",
      padding: "0.4rem 1rem", borderRadius: 100,
      border: `1px solid ${C.border}`,
      background: "rgba(245,158,11,0.06)",
      marginBottom: "1.5rem",
    }}
  >
    <Icon size={11} color={C.gold} />
    <span style={{
      fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem",
      fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase",
      color: C.gold, whiteSpace: "nowrap",
    }}>{children}</span>
  </motion.div>
);

// ─── TICKER ───────────────────────────────────────────────────────────────────
const Ticker = () => (
  <div style={{
    width: "100%", overflow: "hidden",
    borderTop: `1px solid ${C.border}`,
    borderBottom: `1px solid ${C.border}`,
    padding: "14px 0",
    background: "rgba(245,158,11,0.03)",
  }}>
    <motion.div
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      style={{ display: "flex", gap: "3.5rem", whiteSpace: "nowrap" }}
    >
      {[...Array(16)].map((_, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <span style={{ color: C.border, fontSize: "1.1rem" }}>●</span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
            letterSpacing: "0.3em", textTransform: "uppercase",
            fontSize: "0.55rem", color: C.gold,
          }}>Impact Verified</span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1rem", fontStyle: "italic",
            color: "rgba(255,255,255,0.6)",
          }}>500+ Lives Reshaped</span>
        </div>
      ))}
    </motion.div>
  </div>
);

// ─── 3D TEAM CARD ─────────────────────────────────────────────────────────────
interface TeamCardProps {
  title: string;
  role: string;
  initial: string;
  desc: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ title, role, initial, desc }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], ["8deg", "-8deg"]), { stiffness: 80, damping: 18 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], ["-8deg", "8deg"]), { stiffness: 80, damping: 18 });

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (r) {
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    }
  };

  return (
    <motion.div
      ref={ref} variants={fadeUp}
      onMouseMove={move}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      <motion.div
        whileHover={{ borderColor: C.borderHov }}
        style={{
          background: C.bgCard,
          border: `1px solid ${C.border}`,
          borderRadius: 20, padding: "2rem",
          height: "100%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          transition: "border-color 0.3s ease",
        }}
      >
        <motion.div
          whileHover={{ background: C.gradient }}
          style={{
            width: 52, height: 52, borderRadius: 14,
            background: "rgba(245,158,11,0.1)",
            border: `1px solid ${C.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: "1.5rem",
            transition: "background 0.3s ease",
          }}
        >
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.5rem", fontWeight: 700, color: C.gold,
          }}>{initial}</span>
        </motion.div>
        <div style={{
          fontSize: "0.55rem", fontWeight: 800, letterSpacing: "0.25em",
          textTransform: "uppercase", color: C.gold,
          fontFamily: "'DM Sans', sans-serif", marginBottom: "0.6rem",
        }}>{role}</div>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.5rem", fontWeight: 700,
          color: C.text, marginBottom: "0.75rem", lineHeight: 1.2,
        }}>{title}</h3>
        <p style={{
          color: C.textMuted, fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.85rem", lineHeight: 1.7, fontWeight: 300,
        }}>{desc}</p>
      </motion.div>
    </motion.div>
  );
};

// ─── VISION CARD ──────────────────────────────────────────────────────────────
// FIX: `delay` was declared in the type and destructured but never used inside
// the component body — removed it from destructuring to fix TS6133.
// The prop is kept in the interface (as optional) so existing callers that pass
// it don't break; it's simply accepted and ignored here.
interface VisionCardProps {
  n: string;
  t: string;
  d: string;
  delay?: number;
}

const VisionCard: React.FC<VisionCardProps> = ({ n, t, d }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -6, borderColor: C.borderHov }}
    style={{
      padding: "2.5rem 2rem",
      borderRadius: 24,
      background: C.bgCard,
      border: `1px solid ${C.border}`,
      position: "relative", overflow: "hidden",
      transition: "border-color 0.3s ease, transform 0.4s ease",
      boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
    }}
  >
    {/* Number watermark */}
    <span style={{
      position: "absolute", top: "1rem", right: "1.5rem",
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "4rem", fontWeight: 800,
      color: "rgba(245,158,11,0.06)", lineHeight: 1, pointerEvents: "none",
    }}>{n}</span>
    {/* Top accent */}
    <div style={{
      width: 32, height: 2, borderRadius: 2,
      background: C.gradient, marginBottom: "1.5rem",
    }} />
    <h3 style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "1.35rem", fontWeight: 700,
      color: C.text, marginBottom: "0.75rem",
    }}>{t}</h3>
    <p style={{
      color: C.textMuted, fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.85rem", lineHeight: 1.7, fontWeight: 300,
    }}>{d}</p>
  </motion.div>
);

// ─── STAT BOX ─────────────────────────────────────────────────────────────────
interface StatBoxProps {
  v: string;
  l: string;
}

const StatBox: React.FC<StatBoxProps> = ({ v, l }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ borderColor: C.borderHov, y: -4 }}
    style={{
      padding: "1.5rem 1rem", borderRadius: 16,
      background: C.bgCard, border: `1px solid ${C.border}`,
      textAlign: "center", transition: "all 0.3s ease",
    }}
  >
    <div style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "2.2rem", fontWeight: 700, lineHeight: 1,
      background: `linear-gradient(135deg, ${C.gold}, #fff 70%)`,
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    }}>{v}</div>
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.55rem", fontWeight: 700,
      textTransform: "uppercase", letterSpacing: "0.2em",
      color: C.textFaint, marginTop: "0.4rem",
    }}>{l}</div>
  </motion.div>
);

// ─── SECTION DIVIDER ─────────────────────────────────────────────────────────
const Divider = () => (
  <div style={{
    display: "flex", alignItems: "center", gap: "1rem",
    padding: "0 6%", margin: "0 auto", maxWidth: 1200,
  }}>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${C.border})` }} />
    <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.gold, opacity: 0.4 }} />
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${C.border}, transparent)` }} />
  </div>
);

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const imageScale = useTransform(scrollYProgress, [0.1, 0.4], [1, 1.06]);

  return (
    <div
      ref={containerRef}
      style={{ background: C.bg, color: C.text, position: "relative", overflow: "hidden" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: rgba(245,158,11,0.25); color: #fff; }

        @media (max-width: 768px) {
          .about-hero-title    { font-size: clamp(2.2rem, 9vw, 3.5rem) !important; }
          .about-story-grid    { grid-template-columns: 1fr !important; }
          .about-mission-grid  { grid-template-columns: 1fr !important; }
          .about-vision-header { flex-direction: column !important; align-items: flex-start !important; }
          .about-vision-grid   { grid-template-columns: 1fr !important; }
          .about-team-grid     { grid-template-columns: 1fr !important; }
          .about-stats-grid    { grid-template-columns: repeat(2, 1fr) !important; }
          .about-section       { padding: 4rem 1.5rem !important; }
          .about-mission-section { border-radius: 24px !important; margin: 0 0.75rem !important; }
        }
        @media (max-width: 480px) {
          .about-hero-title  { font-size: clamp(1.9rem, 10vw, 2.5rem) !important; }
          .about-stats-grid  { grid-template-columns: repeat(2, 1fr) !important; gap: 0.5rem !important; }
        }
      `}</style>

      {/* ── SECTION 1: WHY IT MATTERS ──────────────────────────────────────── */}
      <section
        id="whyitmatters"
        className="about-section"
        style={{ padding: "8rem 6% 6rem", maxWidth: 1200, margin: "0 auto" }}
      >
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          style={{ textAlign: "center" }}
        >
          <Eyebrow icon={Globe}>Empowering Women · Uplifting Communities</Eyebrow>

          <motion.h1
            variants={fadeUp}
            className="about-hero-title"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)",
              fontWeight: 700, lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: C.text,
              marginBottom: "1.5rem",
            }}
          >
            Every Woman, Every Girl
            <span style={{
              display: "block", fontStyle: "italic", fontWeight: 400,
              background: `linear-gradient(135deg, ${C.gold}, ${C.orange})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              marginTop: "0.2rem",
            }}>
              Deserves to Rise.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{
              color: C.textMuted, fontSize: "1.1rem", fontStyle: "italic",
              fontFamily: "'Cormorant Garamond', serif",
              marginBottom: "3.5rem",
            }}
          >
            Because dignity is not a privilege — it is a right.
          </motion.p>

          {/* Two-column text cards */}
          <motion.div
            variants={stagger}
            style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "1rem", maxWidth: 900, margin: "0 auto 3rem",
              textAlign: "left",
            }}
            className="about-story-grid"
          >
            <motion.div
              variants={fadeUp}
              style={{
                background: C.bgCard,
                border: `1px solid ${C.border}`,
                borderRadius: 24, padding: "2.5rem",
              }}
            >
              <p style={{
                color: "rgba(255,255,255,0.75)", fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem", lineHeight: 1.75, fontWeight: 300,
              }}>
                We exist to empower those most often left behind — removing barriers to{" "}
                <span style={{ color: C.gold, fontWeight: 500 }}>
                  education, economic opportunity, and essential human rights.
                </span>
              </p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              style={{
                background: "rgba(245,158,11,0.05)",
                border: "1px solid rgba(245,158,11,0.1)",
                borderRadius: 24, padding: "2.5rem",
              }}
            >
              <p style={{
                color: C.textMuted, fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.95rem", lineHeight: 1.75, fontWeight: 300,
              }}>
                Through compassionate community engagement, youth empowerment, and advocacy, our work strengthens families, uplifts communities, and creates lasting change.
              </p>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={stagger}
            className="about-stats-grid"
            style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0.75rem", maxWidth: 900, margin: "0 auto",
            }}
          >
            {[
              { v: "500+", l: "Lives Impacted" },
              { v: "10+",  l: "Programs"       },
              { v: "2014", l: "Est. Year"       },
              { v: "100%", l: "Commitment"      },
            ].map((s, i) => <StatBox key={i} {...s} />)}
          </motion.div>
        </motion.div>
      </section>

      {/* Ticker */}
      <Ticker />
      <Divider />

      {/* ── SECTION 2: OUR STORY ───────────────────────────────────────────── */}
      <section
        id="ourstory"
        className="about-section"
        style={{ padding: "7rem 6%", maxWidth: 1200, margin: "0 auto" }}
      >
        <div
          className="about-story-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}
        >
          {/* Image */}
          <motion.div
            style={{ scale: imageScale, position: "relative" }}
          >
            {/* Glow behind */}
            <div style={{
              position: "absolute", inset: -20,
              background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)",
              filter: "blur(30px)", borderRadius: 40, zIndex: 0,
            }} />
            {/* Decorative rotated bg */}
            <div style={{
              position: "absolute", inset: -8,
              background: "rgba(245,158,11,0.06)",
              borderRadius: 32, transform: "rotate(2deg)",
              border: `1px solid ${C.border}`, zIndex: 0,
            }} />
            <div style={{
              position: "relative", zIndex: 1,
              borderRadius: 28, overflow: "hidden",
              border: `1px solid ${C.border}`,
              boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
            }}>
              <img
                src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2070"
                alt="Nigerian community support"
                style={{
                  width: "100%",
                  aspectRatio: "4/5",
                  objectFit: "cover",
                  display: "block",
                  filter: "saturate(0.85) contrast(1.05)",
                }}
              />
              {/* Color grade overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(160deg, rgba(245,158,11,0.06) 0%, transparent 50%, rgba(0,0,0,0.25) 100%)",
              }} />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <Eyebrow icon={Heart}>Our Story</Eyebrow>

            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
                fontWeight: 700, lineHeight: 1.1,
                color: C.text,
              }}
            >
              Built on the belief that{" "}
              <em style={{
                fontStyle: "italic", fontWeight: 400,
                background: `linear-gradient(135deg, ${C.gold}, ${C.orange})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                dignity is a right,
              </em>{" "}
              not a privilege.
            </motion.h2>

            <motion.div
              variants={fadeUp}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <p style={{
                color: C.textMuted, fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.95rem", lineHeight: 1.75, fontWeight: 300,
              }}>
                Generous Helping Hands Foundation began as a quiet promise to the women and girls of Nigeria — that no barrier should be too tall, no circumstance too fixed.
              </p>
              <p style={{
                color: C.textMuted, fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.95rem", lineHeight: 1.75, fontWeight: 300,
              }}>
                Our work strengthens families, uplifts communities, and creates the kind of lasting change that passes from one generation to the next.
              </p>
            </motion.div>

            {/* Tags */}
            <motion.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["Youth Empowerment", "Education", "Advocacy", "Human Rights"].map(tag => (
                <span key={tag} style={{
                  padding: "0.45rem 1rem", borderRadius: 100,
                  background: "rgba(245,158,11,0.07)",
                  border: `1px solid ${C.border}`,
                  fontSize: "0.6rem", fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "'DM Sans', sans-serif",
                }}>{tag}</span>
              ))}
            </motion.div>

            <motion.button
              variants={fadeUp}
              whileHover={{ x: 6 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "none", border: "none", cursor: "pointer", padding: 0,
                color: C.gold, fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem", fontWeight: 700,
                letterSpacing: "0.2em", textTransform: "uppercase",
                transition: "color 0.2s",
              }}
            >
              Download Impact Report <Download size={14} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ── SECTION 3: MISSION ─────────────────────────────────────────────── */}
      <section style={{ padding: "2rem 1rem" }}>
        <motion.div
          id="missionstatement"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="about-mission-section"
          style={{
            background: C.bgDeep,
            borderRadius: 40, padding: "5rem 6%",
            position: "relative", overflow: "hidden",
            border: `1px solid ${C.border}`,
            boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
          }}
        >
          {/* BG watermark icon */}
          <div style={{
            position: "absolute", top: 0, right: 0, padding: "3rem",
            opacity: 0.04, pointerEvents: "none",
          }}>
            <Target size={300} color={C.gold} />
          </div>

          {/* Ambient glow */}
          <div style={{
            position: "absolute", bottom: -100, left: "50%", transform: "translateX(-50%)",
            width: 600, height: 300,
            background: "radial-gradient(ellipse, rgba(245,158,11,0.08) 0%, transparent 70%)",
            filter: "blur(40px)", pointerEvents: "none",
          }} />

          <div style={{ textAlign: "center", marginBottom: "3.5rem", position: "relative", zIndex: 1 }}>
            <Eyebrow icon={Target}>Our Mission</Eyebrow>
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)",
                fontWeight: 700, color: C.text,
                marginBottom: "0.5rem",
              }}
            >
              Compassion in Action.
            </motion.h2>
          </div>

          <div
            className="about-mission-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", position: "relative", zIndex: 1 }}
          >
            <motion.div
              variants={fadeUp}
              style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              <p style={{
                color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.05rem", lineHeight: 1.8, fontWeight: 300,
              }}>
                At Generous Helping Hands Foundation, we believe every woman, every girl, and every young person deserves the opportunity to live with{" "}
                <span style={{ color: "#fff", fontWeight: 500 }}>dignity, hope, and purpose.</span>
              </p>
              <div style={{
                paddingTop: "1.25rem",
                borderTop: `1px solid ${C.border}`,
                fontStyle: "italic",
                color: C.gold, fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.1rem", fontWeight: 600,
              }}>
                Empowering women and youth. Advancing equity. Creating sustainable impact.
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${C.border}`,
                borderRadius: 24, padding: "2.5rem",
                backdropFilter: "blur(10px)",
                position: "relative", overflow: "hidden",
              }}
            >
              {/* Top gold line */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, ${C.gold}, transparent)`,
              }} />
              <Quote size={22} color={C.gold} style={{ marginBottom: "1.25rem" }} />
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.3rem", fontStyle: "italic",
                lineHeight: 1.55, color: C.text,
                marginBottom: "1.25rem",
              }}>
                "Every woman, every girl, and every young person deserves the opportunity to live with dignity, hope, and purpose."
              </p>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.6rem", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.2em",
                color: C.textFaint,
              }}>— GHHF Founding Principle</span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Divider />

      {/* ── SECTION 4: VISION ──────────────────────────────────────────────── */}
      <section
        id="visionstatement"
        className="about-section"
        style={{ padding: "7rem 6%", maxWidth: 1200, margin: "0 auto" }}
      >
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <div
            className="about-vision-header"
            style={{
              display: "flex", alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "4rem", gap: "2rem",
            }}
          >
            <div style={{ maxWidth: 600 }}>
              <Eyebrow icon={Sparkles}>Our Vision</Eyebrow>
              <motion.h2
                variants={fadeUp}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.5rem, 4.5vw, 5rem)",
                  fontWeight: 700, lineHeight: 1.05,
                  color: C.text,
                }}
              >
                A world where{" "}
                <em style={{
                  fontStyle: "italic", fontWeight: 400,
                  background: `linear-gradient(135deg, ${C.gold}, ${C.orange})`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  women and girls lead.
                </em>
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              style={{
                color: C.textMuted, fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.95rem", lineHeight: 1.75, fontWeight: 300,
                maxWidth: 380,
              }}
            >
              Our vision is a world where women and girls are empowered to overcome economic and social barriers and fully access their rights.
            </motion.p>
          </div>

          <div
            className="about-vision-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}
          >
            <VisionCard n="01" t="Economic Empowerment" d="Removing barriers to economic opportunity for sustainable, independent futures." />
            <VisionCard n="02" t="Rights & Health"      d="Ensuring full access to essential rights as a foundation for dignity and wellbeing." />
            <VisionCard n="03" t="Stronger Communities" d="Strengthening communities so every child can live a healthy, enriched life." />
          </div>
        </motion.div>
      </section>

      <Divider />

      {/* ── SECTION 5: TEAM ────────────────────────────────────────────────── */}
      <section
        id="meettheteam"
        className="about-section"
        style={{ padding: "7rem 6%", maxWidth: 1200, margin: "0 auto" }}
      >
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <Eyebrow icon={Users}>The Stewards</Eyebrow>
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.2rem, 4vw, 4rem)",
                fontWeight: 700, color: C.text,
              }}
            >
              People behind the mission.
            </motion.h2>
          </div>

          <motion.div
            variants={stagger}
            className="about-team-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}
          >
            <TeamCard role="Vision & Strategy"    initial="L" title="Leadership"           desc="Providing strategic direction and inspiring leadership to drive our mission forward." />
            <TeamCard role="Community Programs"   initial="P" title="Program Coordinators" desc="Planning and delivering outreach initiatives that meet real community needs." />
            <TeamCard role="Learning & Support"   initial="E" title="Education & Welfare"  desc="Supporting access to quality education and skills development across Nigeria." />
          </motion.div>
        </motion.div>
      </section>

      {/* ── FOOTER BRIDGE ──────────────────────────────────────────────────── */}
      <section style={{ padding: "5rem 6%", textAlign: "center" }}>
        {/* Glow above CTA */}
        <div style={{
          width: 400, height: 120, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(245,158,11,0.1) 0%, transparent 70%)",
          filter: "blur(30px)", margin: "0 auto 2rem",
        }} />
        <motion.button
          whileHover={{ scale: 1.04, boxShadow: "0 20px 60px rgba(245,158,11,0.5)" }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.75rem",
            padding: "1.1rem 3rem", borderRadius: 100,
            background: "linear-gradient(135deg, #F59E0B, #EA580C)",
            color: "#fff", border: "none", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem", fontWeight: 700,
            letterSpacing: "0.15em", textTransform: "uppercase",
            boxShadow: "0 10px 40px rgba(245,158,11,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          Join Our Mission
          <ArrowUpRight size={16} />
        </motion.button>
        <p style={{
          marginTop: "1.5rem",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.6rem", letterSpacing: "0.15em",
          textTransform: "uppercase", color: C.textFaint,
        }}>
          Together we can make a difference
        </p>
      </section>
    </div>
  );
};

export default About;