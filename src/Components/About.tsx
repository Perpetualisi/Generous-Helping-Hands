import React, { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring as useSpringFM, useTransform, type Variants } from "framer-motion";
import {
  Users, TrendingUp, Shield, Target, Globe, Sparkles, ArrowUpRight, Heart,
} from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
type IconComponent = React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>;
interface VisionPoint { icon: IconComponent; title: string; text: string; }
interface TeamMember  { name: string; role: string; description: string; initial: string; }

// ─── DATA ─────────────────────────────────────────────────────────────────────
const IMAGE_ASSETS = {
  heritage:   "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2070&auto=format&fit=crop",
  mission_bg: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=2031&auto=format&fit=crop",
};

const VISION_POINTS: VisionPoint[] = [
  { icon: TrendingUp, title: "Economic Empowerment", text: "Removing barriers to economic opportunity so women and girls can build sustainable, independent futures." },
  { icon: Shield,     title: "Rights & Health",       text: "Ensuring full access to essential rights — including sexual and reproductive health — as a foundation for dignity." },
  { icon: Users,      title: "Stronger Communities",  text: "Strengthening communities so every child can live a healthy, enriched, and purposeful life." },
];

const TEAM_MEMBERS: TeamMember[] = [
  { name: "Leadership",           role: "Vision & Strategy",  initial: "L", description: "Providing strategic direction and inspiring leadership to drive our mission forward with clarity and purpose." },
  { name: "Program Coordinators", role: "Community Programs", initial: "P", description: "Planning and delivering outreach initiatives that meet real community needs and create lasting impact." },
  { name: "Education & Welfare",  role: "Learning & Support", initial: "E", description: "Supporting access to quality education, skills development, and welfare resources across Nigeria." },
];

const WHY_STATS = [
  { value: "500+", label: "Lives Impacted" },
  { value: "10+",  label: "Programs"       },
  { value: "2014", label: "Est. Year"      },
  { value: "100%", label: "Commitment"     },
];

const MISSION_PILLARS = ["Youth Empowerment", "Education & Advocacy", "Human Rights", "Community Uplift"];

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────
const fadeUp: Variants    = { hidden: { opacity: 0, y: 32 },  visible: { opacity: 1, y: 0, transition: { duration: 0.8,  ease: [0.22, 1, 0.36, 1] } } };
const fadeLeft: Variants  = { hidden: { opacity: 0, x: -32 }, visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } } };
const fadeRight: Variants = { hidden: { opacity: 0, x: 32 },  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } } };
const stagger: Variants   = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
const Eyebrow: React.FC<{ icon: IconComponent; children: React.ReactNode }> = ({ icon: Icon, children }) => (
  <motion.div variants={fadeUp} style={{
    display: "inline-flex", alignItems: "center", gap: "0.55rem",
    padding: "0.4rem 1rem",
    background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.2)",
    borderRadius: "100px", marginBottom: "1.25rem",
  }}>
    <Icon size={11} color="#C9A96E" />
    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "#C9A96E" }}>
      {children}
    </span>
  </motion.div>
);

const GoldDivider: React.FC = () => (
  <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(201,169,110,0.28), transparent)" }} />
);

const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.025 }) => (
  <div style={{
    position: "absolute", inset: 0, opacity, pointerEvents: "none", zIndex: 1,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  }} />
);

// ─── TEAM CARD ────────────────────────────────────────────────────────────────
const CARD_ACCENTS = [
  { from: "#C9A96E", to: "#8B6535", particle: "rgba(201,169,110,0.6)" },
  { from: "#9B8EC4", to: "#5B4E8C", particle: "rgba(155,142,196,0.6)" },
  { from: "#7EB8A4", to: "#3D7A68", particle: "rgba(126,184,164,0.6)" },
];

const PARTICLES = [
  { top: "12%", left: "80%", size: 3, delay: 0 },
  { top: "25%", left: "10%", size: 2, delay: 0.4 },
  { top: "60%", left: "88%", size: 2, delay: 0.8 },
  { top: "78%", left: "15%", size: 3, delay: 1.2 },
  { top: "42%", left: "92%", size: 2, delay: 0.6 },
];

const TeamCard: React.FC<{ member: TeamMember; index: number }> = ({ member, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sX = useSpringFM(mx, { stiffness: 100, damping: 20 });
  const sY = useSpringFM(my, { stiffness: 100, damping: 20 });
  const rotY  = useTransform(sX, [-0.5, 0.5], ["-8deg", "8deg"]);
  const rotX  = useTransform(sY, [-0.5, 0.5], ["6deg", "-6deg"]);
  const glowX = useTransform(sX, [-0.5, 0.5], ["20%", "80%"]);
  const glowY = useTransform(sY, [-0.5, 0.5], ["20%", "80%"]);
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];

  const handleMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => { mx.set(0); my.set(0); setHovered(false); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", perspective: "1000px" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div style={{
        position: "relative",
        background: "linear-gradient(160deg, #14130f 0%, #0e0d0a 100%)",
        border: `1px solid ${hovered ? "rgba(201,169,110,0.3)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "24px",
        overflow: "hidden",
        transition: "border-color 0.5s ease, box-shadow 0.5s ease",
        boxShadow: hovered ? "0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,169,110,0.1)" : "0 8px 32px rgba(0,0,0,0.4)",
      }}>
        {/* Cursor glow */}
        <motion.div style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          opacity: hovered ? 1 : 0, transition: "opacity 0.5s ease",
          background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(201,169,110,0.08) 0%, transparent 60%)`,
        }} />
        {/* Top shimmer */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px", zIndex: 1,
          background: `linear-gradient(to right, transparent, ${accent.from}, transparent)`,
          opacity: hovered ? 1 : 0.3, transition: "opacity 0.5s ease",
        }} />
        {/* Particles */}
        {PARTICLES.map((p, pi) => (
          <motion.div key={pi}
            animate={hovered ? { opacity: [0, 1, 0], y: [0, -12, -24], scale: [0.5, 1, 0.3] } : { opacity: 0 }}
            transition={{ duration: 2, delay: p.delay, repeat: hovered ? Infinity : 0, ease: "easeOut" }}
            style={{ position: "absolute", top: p.top, left: p.left, width: `${p.size}px`, height: `${p.size}px`, borderRadius: "50%", background: accent.particle, pointerEvents: "none", zIndex: 1 }}
          />
        ))}

        {/* Avatar */}
        <div className="ab-team-avatar" style={{ position: "relative", overflow: "hidden", aspectRatio: "5/4" }}>
          <motion.div
            animate={hovered ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] } : { backgroundPosition: "0% 50%" }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ position: "absolute", inset: 0, backgroundSize: "200% 200%", background: `linear-gradient(135deg, #0e0d0a 0%, ${accent.from}18 40%, ${accent.to}10 70%, #0e0d0a 100%)` }}
          />
          {[140, 100, 64].map((size, ri) => (
            <motion.div key={ri}
              animate={hovered ? { scale: [1, 1.06, 1], opacity: [0.06, 0.12, 0.06] } : { scale: 1, opacity: 0.05 }}
              transition={{ duration: 3 + ri, repeat: Infinity, ease: "easeInOut", delay: ri * 0.4 }}
              style={{ position: "absolute", top: "50%", left: "50%", width: `${size}px`, height: `${size}px`, borderRadius: "50%", border: `1px solid ${accent.from}`, transform: "translate(-50%,-50%)", pointerEvents: "none" }}
            />
          ))}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
            <motion.span
              animate={hovered ? { scale: 1.08, opacity: 1 } : { scale: 1, opacity: 0.9 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(4rem,8vw,7rem)", fontWeight: 700, fontStyle: "italic",
                background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                userSelect: "none", lineHeight: 1, display: "block",
                filter: hovered ? `drop-shadow(0 0 20px ${accent.from}55)` : "none",
                transition: "filter 0.5s ease",
              }}
            >{member.initial}</motion.span>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "55%", zIndex: 2, background: "linear-gradient(to top, #14130f 0%, transparent 100%)" }} />
          <motion.div
            animate={hovered ? { y: 0, opacity: 1 } : { y: 6, opacity: 0.7 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "absolute", bottom: "1rem", left: "1.1rem", zIndex: 3, display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.3rem 0.8rem", background: "rgba(10,10,8,0.85)", backdropFilter: "blur(12px)", border: `1px solid ${accent.from}44`, borderRadius: "100px" }}
          >
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: accent.from, flexShrink: 0 }} />
            <span style={{ fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: accent.from }}>{member.role}</span>
          </motion.div>
        </div>

        {/* Text */}
        <div style={{ padding: "1.5rem 1.5rem 1.75rem", position: "relative", zIndex: 2 }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.15rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem", lineHeight: 1.2 }}>{member.name}</h3>
          <motion.div
            animate={{ width: hovered ? "44px" : "22px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "1px", background: `linear-gradient(to right, ${accent.from}, transparent)`, marginBottom: "0.875rem" }}
          />
          <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.42)", fontWeight: 300, lineHeight: 1.75 }}>{member.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const About: React.FC = () => {
  const storyRef = useRef<HTMLElement>(null);
  const isStoryInView = useInView(storyRef, { once: true, margin: "-60px" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        :root { --gold: #C9A96E; --dark: #060608; }

        /* ─── HOVER EFFECTS (pointer devices only) ─── */
        @media (hover: hover) {
          .av-card:hover .av-topline { opacity: 1 !important; }
          .av-card:hover             { border-color: rgba(201,169,110,0.25) !important; }
          .story-cta:hover svg       { transform: translate(3px,-3px); }
          .mission-pillar:hover      { background: rgba(201,169,110,0.12) !important; border-color: rgba(201,169,110,0.3) !important; }
        }
        .story-cta svg   { transition: transform 0.2s ease; }
        .mission-pillar  { transition: background 0.3s ease, border-color 0.3s ease; }

        /* ─── SECTION BASE ─── */
        .ab-why-section {
          position: relative; min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: 9rem 5% 7rem; overflow: hidden; background: #060608;
        }
        .ab-section-dark  { padding: 8rem 5%; background: #060608; position: relative; }
        .ab-section-light { padding: 8rem 5%; background: #fff; color: #0a0908; position: relative; }
        .ab-section-team  { padding: 8rem 5%; background: #08080a; color: #fff; position: relative; overflow: hidden; }

        /* ─── GRID LAYOUTS ─── */
        .ab-2col        { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; max-width: 1280px; margin: 0 auto; }
        .ab-3col        { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
        .ab-team-grid   { display: grid; grid-template-columns: repeat(3,1fr); gap: 2rem; }
        .ab-mission-col { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 5rem; align-items: start; max-width: 1280px; margin: 0 auto; }

        /* ─── STATS ROW ─── */
        .ab-stat-row {
          display: flex; align-items: stretch;
          border: 1px solid rgba(255,255,255,0.06); border-radius: 20px;
          overflow: hidden; background: rgba(255,255,255,0.02);
        }
        .ab-stat-cell {
          flex: 1; padding: 1.75rem 1rem; text-align: center;
          border-left: 1px solid rgba(255,255,255,0.06);
        }
        .ab-stat-cell:first-child { border-left: none; }

        /* ─── STORY SECTION ─── */
        .ab-story-frame { position: absolute; inset: -14px; border: 1px solid rgba(201,169,110,0.15); border-radius: 2.5rem; pointer-events: none; }
        .ab-story-img   { border-radius: 2rem; overflow: hidden; position: relative; }

        /* ─── TAGS / PILLS ─── */
        .ab-tag { display: inline-flex; align-items: center; gap: 0.4rem; }

        /* ══════════════════════════════════════
           TABLET  ≤ 900px
        ══════════════════════════════════════ */
        @media (max-width: 900px) {
          /* Section padding */
          .ab-why-section   { padding: 7rem 6% 5rem; min-height: auto; }
          .ab-section-dark  { padding: 6rem 6%; }
          .ab-section-light { padding: 6rem 6%; }
          .ab-section-team  { padding: 6rem 6%; }

          /* Grids */
          .ab-2col        { grid-template-columns: 1fr; gap: 3rem; }
          .ab-3col        { grid-template-columns: 1fr 1fr; gap: 1.25rem; }
          .ab-team-grid   { grid-template-columns: 1fr 1fr; gap: 1.25rem; }
          .ab-mission-col { grid-template-columns: 1fr; gap: 2.5rem; }

          /* Mission quote card hidden — shown in text column on mobile */
          .mission-quote-card { display: none !important; }

          /* Team header row */
          .ab-team-header-row { flex-direction: column !important; gap: 0.5rem !important; }
          .ab-team-header-row p { max-width: 100% !important; }

          /* Story image on tablet: wider aspect, no decorative frame */
          .ab-story-frame          { display: none !important; }
          .ab-story-img            { border-radius: 1.75rem !important; }
          .ab-story-img img        { aspect-ratio: 16/9 !important; }
        }

        /* ══════════════════════════════════════
           MOBILE  ≤ 580px
        ══════════════════════════════════════ */
        @media (max-width: 580px) {
          /* Section padding — breathable but not wasteful */
          .ab-why-section   { padding: 6rem 1.25rem 4.5rem; }
          .ab-section-dark  { padding: 5rem 1.25rem; }
          .ab-section-light { padding: 5rem 1.25rem; }
          .ab-section-team  { padding: 5rem 1.25rem; }

          /* All 3-col grids → single column */
          .ab-3col      { grid-template-columns: 1fr; gap: 1rem; }
          .ab-team-grid { grid-template-columns: 1fr; gap: 1.25rem; }

          /* Stats: 2×2 wrap */
          .ab-stat-row       { flex-wrap: wrap; border-radius: 16px; }
          .ab-stat-cell      { flex: 1 1 50%; padding: 1.1rem 0.75rem; border-left: none; border-top: 1px solid rgba(255,255,255,0.06); }
          .ab-stat-cell:first-child  { border-top: none; }
          .ab-stat-cell:nth-child(2) { border-top: none; border-left: 1px solid rgba(255,255,255,0.06); }

          /* Story image: cinematic aspect + tighter radius */
          .ab-story-img     { border-radius: 1.25rem !important; }
          .ab-story-img img { aspect-ratio: 4/3 !important; }

          /* Vision section header spacing */
          .ab-vision-header { margin-bottom: 2rem !important; }

          /* Team section header */
          .ab-team-header   { margin-bottom: 2.5rem !important; }

          /* Pill / tag tokens */
          .ab-tag { font-size: 0.54rem !important; padding: 0.28rem 0.7rem !important; letter-spacing: 0.12em !important; }

          /* Vision cards: horizontal layout on mobile (icon left, text right) */
          .av-card-inner { display: flex !important; gap: 1rem; align-items: flex-start; }
          .av-card-icon  { flex-shrink: 0; }
          .av-card-body  { flex: 1; }

          /* Team card: slightly shorter avatar block */
          .ab-team-avatar { aspect-ratio: 4/3 !important; }
        }

        /* ══════════════════════════════════════
           XS  ≤ 380px
        ══════════════════════════════════════ */
        @media (max-width: 380px) {
          .ab-why-section  { padding: 5.5rem 1rem 4rem; }
          .ab-section-dark  { padding: 4rem 1rem; }
          .ab-section-light { padding: 4rem 1rem; }
          .ab-section-team  { padding: 4rem 1rem; }

          /* Stats → full width per cell */
          .ab-stat-cell {
            flex: 1 1 100%;
            border-left: none !important;
            border-top: 1px solid rgba(255,255,255,0.06) !important;
          }
          .ab-stat-cell:first-child { border-top: none !important; }
          .ab-stat-cell:nth-child(2) { border-left: none !important; }
        }
      `}</style>

      <div style={{ background: "var(--dark)", color: "#fff", fontFamily: "'DM Sans',sans-serif" }}>

        {/* ═══════════════════════════════════════════════════
            1. WHY OUR WORK MATTERS
        ═══════════════════════════════════════════════════ */}
        <section id="whyitmatters" className="ab-why-section">
          <Grain />
          <div style={{
            position: "absolute", width: "700px", height: "700px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 65%)",
            top: "-15%", left: "50%", transform: "translateX(-50%)",
            filter: "blur(80px)", pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", left: "50%", top: 0, width: "1px", height: "100%",
            background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.06) 30%, rgba(201,169,110,0.06) 70%, transparent)",
            pointerEvents: "none",
          }} />

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ position: "relative", zIndex: 2, maxWidth: "820px", margin: "0 auto", textAlign: "center", width: "100%" }}
          >
            <Eyebrow icon={Globe}>Empowering Women · Uplifting Communities</Eyebrow>

            <motion.h1 variants={fadeUp} style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2.6rem,7vw,6.5rem)", fontWeight: 400,
              lineHeight: 1.06, marginBottom: "1.1rem",
            }}>
              Every Woman,{" "}<em style={{ color: "#C9A96E" }}>Every Girl</em>
              <br />Deserves to Rise.
            </motion.h1>

            <motion.p variants={fadeUp} style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(1rem,2vw,1.25rem)", fontStyle: "italic",
              color: "rgba(255,255,255,0.32)", marginBottom: "2.25rem", lineHeight: 1.6,
            }}>
              Because dignity is not a privilege — it is a right.
            </motion.p>

            <motion.div variants={fadeUp} style={{
              maxWidth: "640px", margin: "0 auto 2.75rem",
              display: "flex", flexDirection: "column", gap: "1rem",
            }}>
              <p style={{ fontSize: "clamp(0.95rem,1.8vw,1.08rem)", color: "rgba(255,255,255,0.55)", fontWeight: 300, lineHeight: 1.9 }}>
                We exist to empower those most often left behind — removing barriers to{" "}
                <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>education, economic opportunity, and essential human rights.</span>
              </p>
              <p style={{ fontSize: "clamp(0.88rem,1.5vw,0.98rem)", color: "rgba(255,255,255,0.3)", fontWeight: 300, lineHeight: 1.9 }}>
                Through compassionate community engagement, youth empowerment, and advocacy, our work strengthens families, uplifts communities, and creates lasting change — empowering individuals to shape brighter futures for themselves and{" "}
                <span style={{ color: "rgba(255,255,255,0.48)", fontWeight: 400 }}>generations to come.</span>
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="ab-stat-row">
              {WHY_STATS.map((s, i) => (
                <div key={i} className="ab-stat-cell">
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.35rem,3vw,2rem)", color: "#C9A96E", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: "0.56rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.26)", marginTop: "0.4rem" }}>{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Scroll cue */}
            <motion.div variants={fadeUp} style={{ marginTop: "3.5rem", display: "flex", justifyContent: "center" }}>
              <motion.div
                animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: "1px", height: "50px", background: "linear-gradient(to bottom, #C9A96E, transparent)" }}
              />
            </motion.div>
          </motion.div>
        </section>

        <GoldDivider />

        {/* ═══════════════════════════════════════════════════
            2. OUR STORY
        ═══════════════════════════════════════════════════ */}
        <section id="ourstory" ref={storyRef} className="ab-section-light">
          <div style={{ position: "absolute", top: 0, left: "5%", width: "50px", height: "3px", background: "linear-gradient(to right,#C9A96E,#a07840)" }} />

          <div className="ab-2col">
            {/* Image */}
            <motion.div
              initial="hidden" animate={isStoryInView ? "visible" : "hidden"} variants={fadeLeft}
              style={{ position: "relative" }}
            >
              {/* Decorative border frame — hidden on mobile via CSS */}
              <div className="ab-story-frame" />

              <div className="ab-story-img">
                <img
                  src={IMAGE_ASSETS.heritage} alt="GHHF Heritage"
                  style={{ width: "100%", display: "block", objectFit: "cover", aspectRatio: "4/5" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,9,8,0.45) 0%, transparent 55%)" }} />
              </div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={isStoryInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.55, duration: 0.6 }}
                style={{
                  position: "absolute", bottom: "1.75rem", left: "1.75rem",
                  background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)",
                  padding: "0.875rem 1.25rem", borderRadius: "12px", borderLeft: "3px solid #C9A96E",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.14)",
                }}
              >
                <div style={{ fontSize: "0.52rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "0.25rem" }}>Impact Verified</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.95rem", fontWeight: 700, fontStyle: "italic", color: "#0a0908" }}>500+ Lives Reshaped</div>
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial="hidden" animate={isStoryInView ? "visible" : "hidden"} variants={fadeRight}
              style={{ display: "flex", flexDirection: "column", gap: "1.35rem" }}
            >
              <div>
                <div style={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.35em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "0.875rem" }}>Our Story</div>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.85rem,3.5vw,3.2rem)", fontWeight: 700, lineHeight: 1.15, color: "#0a0908" }}>
                  Built on the belief that<br />
                  <em style={{ fontStyle: "italic", fontWeight: 400 }}>dignity is a right,</em><br />
                  not a privilege.
                </h2>
              </div>
              <div style={{ width: "36px", height: "2px", background: "#C9A96E" }} />
              <p style={{ fontSize: "clamp(0.9rem,1.4vw,1rem)", color: "#555", fontWeight: 300, lineHeight: 1.9 }}>
                Generous Helping Hands Foundation began as a quiet promise to the women and girls of Nigeria —
                that no barrier should be too tall, no circumstance too fixed. We recognised that the absence
                of opportunity isn't a lack of character.{" "}
                <strong style={{ color: "#0a0908", fontWeight: 600 }}>It's a lack of access.</strong>
              </p>
              <p style={{ fontSize: "clamp(0.9rem,1.4vw,1rem)", color: "#555", fontWeight: 300, lineHeight: 1.9 }}>
                Every girl kept out of school, every woman blocked from economic independence, every young person
                denied their rights — these are not inevitable realities. They are problems we can solve together.
                Our work strengthens families, uplifts communities, and creates the kind of lasting change that
                passes from one generation to the next.
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", paddingTop: "0.25rem" }}>
                {["Youth Empowerment", "Education", "Advocacy", "Human Rights"].map((tag) => (
                  <span key={tag} className="ab-tag" style={{
                    fontSize: "0.58rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em",
                    padding: "0.32rem 0.8rem",
                    background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.2)",
                    borderRadius: "100px", color: "#8B6535",
                  }}>{tag}</span>
                ))}
              </div>

              <button className="story-cta" style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "transparent", border: "none", cursor: "pointer", padding: 0,
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.65rem", fontWeight: 800,
                letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E",
              }}>
                Download Impact Report <ArrowUpRight size={13} color="#C9A96E" />
              </button>
            </motion.div>
          </div>
        </section>

        <GoldDivider />

        {/* ═══════════════════════════════════════════════════
            3. OUR MISSION
        ═══════════════════════════════════════════════════ */}
        <section id="missionstatement" className="ab-section-dark">
          <Grain />
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <img src={IMAGE_ASSETS.mission_bg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.12, filter: "grayscale(100%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #060608 45%, rgba(6,6,8,0.75) 70%, rgba(6,6,8,0.3))" }} />
          </div>

          <div className="ab-mission-col" style={{ position: "relative", zIndex: 2 }}>

            {/* Mission text */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <Eyebrow icon={Target}>Our Mission</Eyebrow>

              <motion.h2 variants={fadeUp} style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(2.4rem,5vw,4.8rem)", fontWeight: 400,
                lineHeight: 1.08, color: "#fff", marginBottom: "1.75rem",
              }}>
                Compassion <br /><em style={{ color: "#C9A96E" }}>in Action.</em>
              </motion.h2>

              <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: "1.1rem", marginBottom: "2.25rem" }}>
                <p style={{ fontSize: "clamp(0.92rem,1.4vw,1.05rem)", color: "rgba(255,255,255,0.6)", fontWeight: 300, lineHeight: 1.9 }}>
                  At Generous Helping Hands Foundation, we believe every woman, every girl, and every young person deserves the opportunity to live with{" "}
                  <span style={{ color: "#fff", fontWeight: 500 }}>dignity, hope, and purpose.</span>
                </p>
                <p style={{ fontSize: "clamp(0.92rem,1.4vw,1.05rem)", color: "rgba(255,255,255,0.5)", fontWeight: 300, lineHeight: 1.9 }}>
                  We exist to empower those most often left behind — removing barriers to education, economic opportunity, and essential human rights. Through compassionate community engagement, youth empowerment, and advocacy, we support women and young people in building the skills, confidence, and resources needed to transform their lives.
                </p>
                <p style={{ fontSize: "clamp(0.92rem,1.4vw,1.05rem)", color: "rgba(255,255,255,0.5)", fontWeight: 300, lineHeight: 1.9 }}>
                  Our work strengthens families, uplifts communities, and creates lasting change — empowering individuals to shape brighter futures for themselves and generations to come.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} style={{ borderLeft: "2px solid rgba(201,169,110,0.35)", paddingLeft: "1.35rem", marginBottom: "2.25rem" }}>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(0.95rem,1.4vw,1.05rem)", fontStyle: "italic", color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}>
                  Empowering women and youth. Advancing equity. Creating sustainable impact.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {MISSION_PILLARS.map((p) => (
                  <div key={p} className="mission-pillar ab-tag" style={{
                    display: "inline-flex", alignItems: "center", gap: "0.4rem",
                    padding: "0.4rem 0.875rem",
                    background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.15)",
                    borderRadius: "100px", cursor: "default",
                  }}>
                    <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#C9A96E", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>{p}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Pull-quote card — hidden on mobile via CSS */}
            <motion.div
              className="mission-quote-card"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: "rgba(201,169,110,0.05)", border: "1px solid rgba(201,169,110,0.14)",
                borderRadius: "26px", padding: "2.75rem",
                position: "sticky", top: "8rem", overflow: "hidden",
              }}
            >
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "8rem", lineHeight: 0.7, color: "rgba(201,169,110,0.08)", position: "absolute", top: "1.5rem", left: "2rem", fontWeight: 700, userSelect: "none" }}>"</div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <Heart size={18} fill="#C9A96E" color="#C9A96E" style={{ marginBottom: "1.5rem", display: "block" }} />
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontStyle: "italic", color: "#fff", lineHeight: 1.7, marginBottom: "1.75rem" }}>
                  Every woman, every girl, and every young person deserves the opportunity to live with dignity, hope, and purpose — not as a privilege, but as a right.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "2rem" }}>
                  <div style={{ width: "24px", height: "1px", background: "#C9A96E" }} />
                  <span style={{ fontSize: "0.56rem", letterSpacing: "0.22em", color: "#C9A96E", textTransform: "uppercase", fontWeight: 600 }}>GHHF Founding Principle</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  {[{ value: "500+", label: "Lives directly impacted" }, { value: "100%", label: "Funds to field operations" }, { value: "3", label: "Core empowerment programs" }].map((s) => (
                    <div key={s.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.7rem 0.9rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px" }}>
                      <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", fontWeight: 300 }}>{s.label}</span>
                      <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.05rem", color: "#C9A96E", fontWeight: 700 }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <GoldDivider />

        {/* ═══════════════════════════════════════════════════
            4. OUR VISION
        ═══════════════════════════════════════════════════ */}
        <section id="visionstatement" className="ab-section-dark">
          <Grain opacity={0.02} />
          <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>

            <motion.div
              className="ab-vision-header"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              style={{ maxWidth: "680px", marginBottom: "4rem" }}
            >
              <Eyebrow icon={Sparkles}>Our Vision</Eyebrow>
              <motion.h2 variants={fadeUp} style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 400, color: "#fff",
                marginBottom: "1.5rem", lineHeight: 1.1,
              }}>
                A world where women and girls{" "}<em style={{ color: "#C9A96E" }}>lead.</em>
              </motion.h2>
              <motion.p variants={fadeUp} style={{ fontSize: "clamp(0.9rem,1.5vw,1.05rem)", color: "rgba(255,255,255,0.46)", fontWeight: 300, lineHeight: 1.9 }}>
                Our vision is a world where women and girls are empowered to overcome economic and social barriers,
                fully access their rights — particularly in sexual and reproductive health — and where communities
                are strengthened so that every child can live a healthy and enriched life.
              </motion.p>
            </motion.div>

            <div className="ab-3col">
              {VISION_POINTS.map((v, i) => (
                <motion.div
                  key={v.title} className="av-card"
                  initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.13, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    padding: "2.25rem", background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)", borderRadius: "22px",
                    position: "relative", overflow: "hidden",
                    transition: "border-color 0.4s ease", cursor: "default",
                  }}
                >
                  <div className="av-topline" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, #C9A96E, transparent)", opacity: 0, transition: "opacity 0.4s ease" }} />
                  <div className="av-card-inner" style={{ display: "block" }}>
                    <div className="av-card-icon">
                      <div style={{ fontSize: "0.54rem", fontWeight: 800, letterSpacing: "0.3em", color: "rgba(201,169,110,0.28)", marginBottom: "1.25rem" }}>0{i + 1}</div>
                      <v.icon size={24} color="#C9A96E" style={{ marginBottom: "1.1rem", display: "block" }} />
                    </div>
                    <div className="av-card-body">
                      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "0.7rem" }}>{v.title}</h3>
                      <p style={{ fontSize: "0.86rem", color: "rgba(255,255,255,0.38)", fontWeight: 300, lineHeight: 1.75 }}>{v.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <GoldDivider />

        {/* ═══════════════════════════════════════════════════
            5. MEET THE TEAM
        ═══════════════════════════════════════════════════ */}
        <section id="meettheteam" className="ab-section-team">
          <Grain opacity={0.02} />
          <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: "800px", height: "800px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />

          <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>

            <motion.div
              className="ab-team-header"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              style={{ marginBottom: "4rem" }}
            >
              <Eyebrow icon={Users}>The Stewards</Eyebrow>
              <div className="ab-team-header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
                <motion.h2 variants={fadeLeft} style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(2.2rem,4.5vw,3.8rem)", fontWeight: 400, color: "#fff", lineHeight: 1.1,
                }}>
                  People behind<br /><em style={{ color: "#C9A96E" }}>the mission.</em>
                </motion.h2>
                <motion.p variants={fadeRight} style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.26)", maxWidth: "220px", lineHeight: 1.8 }}>
                  Leading with integrity, purpose, and compassion.
                </motion.p>
              </div>
            </motion.div>

            <div className="ab-team-grid">
              {TEAM_MEMBERS.map((member, i) => (
                <TeamCard key={member.name} member={member} index={i} />
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default About;