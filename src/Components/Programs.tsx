import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import {
  Briefcase, BookOpen, HeartPulse, Star,
  Image as ImageIcon, Sparkles, ArrowUpRight, ArrowRight
} from "lucide-react";

// ─── THEME ────────────────────────────────────────────────────────────────────
const C = {
  bg:        "#1a1714",
  bgCard:    "#211e1a",
  bgDeep:    "#131110",
  gold:      "#F59E0B",
  goldDeep:  "#D97706",
  orange:    "#EA580C",
  text:      "#ffffff",
  textMuted: "rgba(255,255,255,0.5)",
  textFaint: "rgba(255,255,255,0.22)",
  border:    "rgba(245,158,11,0.12)",
  borderHov: "rgba(245,158,11,0.32)",
  gradient:  "linear-gradient(135deg, #F59E0B, #EA580C)",
};

// ─── ANIMATIONS ───────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};
const stagger: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.11 } },
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
interface Program { icon: React.ElementType; title: string; description: string; detail: string; tag: string; }

const PROGRAMS: Program[] = [
  {
    icon: Briefcase,
    title: "Economic Empowerment",
    tag: "Independence",
    description: "Helping women gain financial independence through training, resources, and support to build sustainable livelihoods.",
    detail: "Our vocational training covers tailoring, catering, and digital skills. Since 2018, over 200 women have launched independent businesses with our seed grants and mentorship support.",
  },
  {
    icon: BookOpen,
    title: "Educational Initiatives",
    tag: "Future Leaders",
    description: "Providing scholarships, mentorship, and workshops that unlock learning and open doors for women, girls, and young people.",
    detail: "Every scholarship covers tuition, books, and uniforms. We also run after-school STEM clubs in secondary schools to bridge the opportunity gap for girls in tech.",
  },
  {
    icon: HeartPulse,
    title: "Health & Wellbeing",
    tag: "Community Care",
    description: "Ensuring access to vital sexual and reproductive health information and services so individuals can live healthy, confident lives.",
    detail: "Our mobile clinics offer free health checks. Last year, we trained 50 community health ambassadors to serve over 1,200 mothers across Lagos.",
  },
  {
    icon: Star,
    title: "Youth Empowerment",
    tag: "Next Generation",
    description: "Equipping young people with leadership skills, life skills, and opportunities to realize their potential and become agents of change.",
    detail: "Our youth programmes run leadership academies, mentorship circles, and community action projects — giving young people the confidence to drive change.",
  },
];

const EVENT_PHOTOS = [
  { src: "/event11.jpeg", alt: "Community outreach", gridArea: "large"        },
  { src: "/event22.jpeg", alt: "Skills training",    gridArea: "top-right"    },
  { src: "/events3.jpg",  alt: "Youth mentorship",   gridArea: "mid-right"    },
  { src: "/events4.jpg",  alt: "Medical outreach",   gridArea: "bottom-left"  },
  { src: "/events5.jpg",  alt: "Empowerment summit", gridArea: "bottom-mid"   },
  { src: "/events6.jpg",  alt: "Advocacy walk",      gridArea: "bottom-right" },
];

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

// ─── PROGRAM CARD ─────────────────────────────────────────────────────────────
const ProgramCard: React.FC<{ program: Program; isMobile: boolean }> = ({ program, isMobile }) => {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], ["7deg", "-7deg"]), { stiffness: 120, damping: 20 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], ["-7deg", "7deg"]), { stiffness: 120, damping: 20 });

  const move = (e: React.MouseEvent) => {
    if (isMobile) return;
    const r = cardRef.current?.getBoundingClientRect();
    if (r) { mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      onMouseMove={move}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", height: "100%" }}
    >
      <motion.div
        whileHover={{ borderColor: C.borderHov }}
        style={{
          position: "relative", overflow: "hidden",
          padding: "2rem", borderRadius: 24, height: "100%",
          display: "flex", flexDirection: "column",
          background: C.bgCard,
          border: `1px solid ${C.border}`,
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          transition: "border-color 0.3s ease",
        }}
      >
        {/* Hover glow */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0,
          background: "radial-gradient(circle at 50% 0%, rgba(245,158,11,0.06) 0%, transparent 70%)",
          transition: "opacity 0.4s ease", pointerEvents: "none",
        }} className="card-glow" />

        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.75rem" }}>
          <motion.div
            whileHover={{ background: C.gradient }}
            style={{
              width: 46, height: 46, borderRadius: 13,
              background: "rgba(245,158,11,0.1)",
              border: `1px solid ${C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.3s ease", flexShrink: 0,
            }}
          >
            <program.icon size={18} color={C.gold} />
          </motion.div>
          <span style={{
            fontSize: "0.52rem", fontWeight: 800,
            letterSpacing: "0.2em", textTransform: "uppercase",
            padding: "0.35rem 0.85rem", borderRadius: 100,
            border: `1px solid ${C.border}`,
            background: "rgba(245,158,11,0.05)",
            color: C.gold,
            fontFamily: "'DM Sans', sans-serif",
          }}>{program.tag}</span>
        </div>

        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.4rem", fontWeight: 700,
          color: C.text, marginBottom: "0.9rem", lineHeight: 1.2,
        }}>{program.title}</h3>

        <p style={{
          color: C.textMuted, fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.85rem", lineHeight: 1.75, fontWeight: 300,
          marginBottom: "1.5rem", flex: 1,
        }}>{program.description}</p>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div style={{
                borderTop: `1px solid ${C.border}`,
                paddingTop: "1.25rem", marginBottom: "1.25rem",
              }}>
                {/* Gold accent line */}
                <div style={{ width: 24, height: 2, background: C.gradient, borderRadius: 2, marginBottom: "0.85rem" }} />
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1rem", fontStyle: "italic",
                  color: C.gold, lineHeight: 1.7,
                }}>{program.detail}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setOpen(!open)}
          style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            background: "none", border: "none", cursor: "pointer", padding: 0,
            color: "rgba(255,255,255,0.6)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.6rem", fontWeight: 800,
            letterSpacing: "0.25em", textTransform: "uppercase",
            transition: "color 0.2s ease",
            marginTop: "auto",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
        >
          <span>{open ? "Show Less" : "Discover Impact"}</span>
          <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}>
            <ArrowUpRight size={14} color={C.gold} />
          </motion.div>
        </button>
      </motion.div>
    </motion.div>
  );
};

// ─── DIVIDER ──────────────────────────────────────────────────────────────────
const Divider = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "0 auto", maxWidth: 1280, padding: "0 6%" }}>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${C.border})` }} />
    <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.gold, opacity: 0.35 }} />
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${C.border}, transparent)` }} />
  </div>
);

// ─── PROGRAMS PAGE ────────────────────────────────────────────────────────────
const Programs: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div style={{ background: C.bg, color: C.text, position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: rgba(245,158,11,0.25); color: #fff; }

        .event-grid {
          display: grid;
          gap: 1rem;
          grid-template-areas:
            "large large top-right"
            "large large mid-right"
            "bottom-left bottom-mid bottom-right";
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 240px;
        }
        @media (max-width: 1024px) {
          .event-grid { grid-template-areas: none; grid-template-columns: repeat(2, 1fr); grid-auto-rows: 200px; }
          .prog-header-grid { flex-direction: column !important; gap: 1.5rem !important; }
          .prog-headline { font-size: clamp(2.8rem, 9vw, 4.5rem) !important; }
          .prog-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .gallery-header { flex-direction: column !important; align-items: flex-start !important; }
        }
        @media (max-width: 640px) {
          .event-grid { grid-template-columns: 1fr; grid-auto-rows: 280px; }
          .prog-cards-grid { grid-template-columns: 1fr !important; }
          .prog-headline { font-size: clamp(2.2rem, 10vw, 3rem) !important; }
        }
      `}</style>

      {/* Ambient BG glows */}
      <div style={{
        position: "fixed", top: "-10%", right: "-5%",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 65%)",
        filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", bottom: "20%", left: "-10%",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(234,88,12,0.05) 0%, transparent 65%)",
        filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
      }} />

      <section
        id="ourprograms"
        style={{ padding: "7rem 6% 5rem", maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}
      >
        {/* ── HEADER ── */}
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          style={{ marginBottom: "5rem" }}
        >
          <Eyebrow icon={Sparkles}>Our Programs</Eyebrow>

          <div
            className="prog-header-grid"
            style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "3rem" }}
          >
            <motion.h2
              variants={fadeUp}
              className="prog-headline"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(3rem, 6vw, 6rem)",
                fontWeight: 700, lineHeight: 0.95,
                letterSpacing: "-0.01em", color: C.text,
                flex: "0 0 auto",
              }}
            >
              Creating <br />
              <em style={{
                fontStyle: "italic", fontWeight: 400,
                background: `linear-gradient(135deg, ${C.gold}, ${C.orange})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Real Impact.</em>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              style={{
                color: C.textMuted, fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem", lineHeight: 1.8, fontWeight: 300,
                maxWidth: 420,
                borderLeft: `2px solid rgba(245,158,11,0.2)`,
                paddingLeft: "1.5rem",
              }}
            >
              We empower women, girls, and youth to thrive through programs that create real, lasting change — from financial independence and education to health and leadership.
            </motion.p>
          </div>
        </motion.div>

        {/* ── PROGRAM CARDS ── */}
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="prog-cards-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            marginBottom: "7rem",
          }}
        >
          {PROGRAMS.map((p, i) => (
            <ProgramCard key={i} program={p} isMobile={isMobile} />
          ))}
        </motion.div>

        <Divider />

        {/* ── GALLERY ── */}
        <div id="events" style={{ marginTop: "5rem" }}>
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="gallery-header"
            style={{
              display: "flex", alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "3rem",
              paddingBottom: "2rem",
              borderBottom: `1px solid ${C.border}`,
              gap: "2rem",
            }}
          >
            <div>
              <Eyebrow icon={ImageIcon}>Field Operations</Eyebrow>
              <motion.h3
                variants={fadeUp}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  fontWeight: 700, color: C.text, lineHeight: 1.05,
                }}
              >
                In the Field
              </motion.h3>
            </div>
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.6rem", fontWeight: 700,
                letterSpacing: "0.35em", textTransform: "uppercase",
                color: C.textFaint,
              }}
            >
              Real Moments, Real Change
            </motion.p>
          </motion.div>

          {/* Photo grid */}
          <div className="event-grid">
            {EVENT_PHOTOS.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "relative", overflow: "hidden",
                  borderRadius: 20,
                  background: C.bgCard,
                  border: `1px solid ${C.border}`,
                  boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                  gridArea: isMobile ? "auto" : photo.gridArea,
                  cursor: "pointer",
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", display: "block",
                    transition: "transform 1s ease",
                    filter: "saturate(0.85) contrast(1.05)",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                />

                {/* Overlay on hover */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(10,8,6,0.85) 0%, rgba(10,8,6,0.2) 50%, transparent 100%)",
                  opacity: 0, transition: "opacity 0.4s ease",
                  display: "flex", flexDirection: "column", justifyContent: "flex-end",
                  padding: "1.5rem",
                }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "0")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <ImageIcon size={13} color={C.gold} />
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.58rem", fontWeight: 800,
                      letterSpacing: "0.2em", textTransform: "uppercase",
                      color: "#fff",
                    }}>{photo.alt}</span>
                  </div>
                </div>

                {/* Always-visible gold corner dot */}
                <div style={{
                  position: "absolute", top: "0.75rem", right: "0.75rem",
                  width: 8, height: 8, borderRadius: "50%",
                  background: C.gold, opacity: 0.6,
                  boxShadow: `0 0 10px ${C.gold}`,
                }} />
              </motion.div>
            ))}
          </div>

          {/* Gallery CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ marginTop: "3rem", display: "flex", justifyContent: "center" }}
          >
            <motion.button
              whileHover={{ borderColor: C.borderHov, y: -3 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "flex", alignItems: "center", gap: "1rem",
                padding: "1rem 2.5rem", borderRadius: 100,
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${C.border}`,
                color: "rgba(255,255,255,0.6)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.62rem", fontWeight: 800,
                letterSpacing: "0.35em", textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
            >
              View Full Gallery <ArrowRight size={14} color={C.gold} />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Programs;