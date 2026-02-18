import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Briefcase, BookOpen, HeartPulse,
  Image as ImageIcon, Sparkles, ArrowUpRight,
} from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Program {
  icon: React.ElementType;
  title: string;
  description: string;
  detail: string;
  tag: string;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PROGRAMS: Program[] = [
  {
    icon: Briefcase,
    title: "Economic Empowerment",
    tag: "Independence",
    description: "We give women the skills and start-up support they need to run their own businesses.",
    detail: "Our vocational training covers tailoring, catering, and digital skills. Since 2018, over 200 women have launched independent businesses with our seed grants.",
  },
  {
    icon: BookOpen,
    title: "Education Support",
    tag: "Future Leaders",
    description: "We pay school fees and provide materials so nothing stops girls from finishing school.",
    detail: "Every scholarship covers tuition, books, and uniforms. We also run after-school STEM clubs in five Lagos secondary schools to bridge the tech gap.",
  },
  {
    icon: HeartPulse,
    title: "Health & Wellbeing",
    tag: "Community Care",
    description: "We run free clinics and wellness workshops, bringing care to families who need it most.",
    detail: "Our mobile clinics offer free antenatal checks and medications. Last year, we trained 50 community health ambassadors to serve 1,200+ mothers.",
  },
];

const EVENT_PHOTOS = [
  { src: "/event11.jpeg", alt: "Community outreach",   gridArea: "1 / 1 / 3 / 3" },
  { src: "/event22.jpeg", alt: "Skills training",      gridArea: "1 / 3 / 2 / 4" },
  { src: "/events3.jpg",  alt: "Youth mentorship",     gridArea: "2 / 3 / 3 / 4" },
  { src: "/events4.jpg",  alt: "Medical outreach",     gridArea: "3 / 1 / 4 / 3" },
  { src: "/events5.jpg",  alt: "Empowerment summit",   gridArea: "3 / 3 / 4 / 4" },
  { src: "/events6.jpg",  alt: "Advocacy walk",        gridArea: "4 / 1 / 5 / 2" },
];

// Mobile order (simple sequential)
const EVENT_PHOTOS_MOBILE = EVENT_PHOTOS.map((p) => ({ ...p, gridArea: "auto" }));

// ─── 3D PROGRAM CARD ─────────────────────────────────────────────────────────
const ProgramCard: React.FC<{ program: Program; index: number }> = ({ program, index }) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xs = useSpring(x, { stiffness: 120, damping: 20 });
  const ys = useSpring(y, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(ys, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(xs, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0); y.set(0);
    setHovered(false);
  };

  const Icon = program.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", height: "100%" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div style={{
        position: "relative",
        height: "100%",
        background: "#141412",
        borderRadius: "2.5rem",
        padding: "2.5rem",
        border: hovered ? "1px solid rgba(201,169,110,0.4)" : "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "border-color 0.5s ease",
        boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
      }}>
        {/* Top gold shimmer line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(to right, transparent, #C9A96E, transparent)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }} />

        {/* Icon + Tag row */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          marginBottom: "2.5rem",
          transform: "translateZ(40px)",
        }}>
          <div style={{
            width: "64px", height: "64px", borderRadius: "1rem",
            background: "rgba(201,169,110,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#C9A96E",
            border: "1px solid rgba(201,169,110,0.2)",
            boxShadow: "0 0 20px rgba(201,169,110,0.08)",
          }}>
            <Icon size={28} strokeWidth={1.5} />
          </div>
          <span style={{
            fontSize: "0.6rem", fontWeight: 800,
            textTransform: "uppercase", letterSpacing: "0.3em",
            color: "#C9A96E",
            border: "1px solid rgba(201,169,110,0.2)",
            padding: "0.35rem 0.75rem",
            borderRadius: "0.5rem",
            background: "rgba(201,169,110,0.05)",
          }}>
            {program.tag}
          </span>
        </div>

        {/* Text content */}
        <div style={{ flex: 1, transform: "translateZ(30px)" }}>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.5rem, 2.5vw, 1.85rem)",
            fontWeight: 700, color: "#fff",
            marginBottom: "1rem", lineHeight: 1.2,
          }}>
            {program.title}
          </h3>
          <p style={{
            color: "rgba(255,255,255,0.45)",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300, lineHeight: 1.7,
            fontSize: "0.95rem", marginBottom: "2rem",
          }}>
            {program.description}
          </p>
        </div>

        {/* Expandable detail */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden", marginBottom: "2rem" }}
            >
              <div style={{
                paddingTop: "1.5rem",
                borderTop: "1px solid rgba(255,255,255,0.05)",
              }}>
                <p style={{
                  fontSize: "0.85rem",
                  color: "#C9A96E",
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 1.7,
                  fontFamily: "'Playfair Display', serif",
                }}>
                  {program.detail}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            fontSize: "0.65rem", fontWeight: 800,
            textTransform: "uppercase", letterSpacing: "0.3em",
            color: "#C9A96E",
            background: "transparent", border: "none",
            cursor: "pointer", marginTop: "auto", padding: 0,
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          {open ? "Show Less" : "Discover Impact"}
          <ArrowUpRight
            size={16}
            style={{
              transition: "transform 0.4s ease",
              transform: open ? "rotate(45deg)" : "none",
            }}
          />
        </button>
      </div>
    </motion.div>
  );
};

// ─── PROGRAMS SECTION ─────────────────────────────────────────────────────────
const Programs: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;700&display=swap');

        .prog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          perspective: 2000px;
        }

        .event-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 220px;
          gap: 1.5rem;
        }

        @media (max-width: 900px) {
          .prog-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .event-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 180px;
            gap: 1rem;
          }
          .event-item { grid-area: auto !important; }
          .prog-headline { font-size: clamp(2.8rem, 10vw, 5rem) !important; }
        }

        @media (max-width: 480px) {
          .event-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 220px;
          }
          .prog-headline { font-size: clamp(2.2rem, 9vw, 3.5rem) !important; }
        }

        .event-photo-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 1s ease, filter 0.5s ease;
          filter: saturate(0.9);
        }
        .event-photo-wrap:hover .event-photo-img {
          transform: scale(1.1);
          filter: saturate(1.2);
        }
        .event-photo-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 50%, transparent 100%);
          opacity: 0;
          transition: opacity 0.5s ease;
          display: flex; align-items: flex-end;
          padding: 1.75rem;
        }
        .event-photo-wrap:hover .event-photo-overlay { opacity: 1; }
      `}</style>

      <section
        id="ourprograms"
        style={{
          position: "relative",
          background: "#0A0908",
          padding: "10rem 0",
          overflow: "hidden",
          color: "#fff",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Background orb */}
        <div style={{
          position: "absolute", top: "-10%", right: "-10%",
          width: "50%", height: "50%",
          background: "rgba(201,169,110,0.05)",
          borderRadius: "50%", filter: "blur(120px)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 2 }}>

          {/* ── HEADER ── */}
          <div style={{ marginBottom: "6rem" }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.6rem",
                padding: "0.45rem 1.1rem",
                background: "rgba(201,169,110,0.08)",
                border: "1px solid rgba(201,169,110,0.2)",
                borderRadius: "100px",
                marginBottom: "2rem",
              }}
            >
              <Sparkles size={14} color="#C9A96E" />
              <span style={{
                fontSize: "0.62rem", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.3em",
                color: "#C9A96E",
              }}>
                Our Strategic Pillars
              </span>
            </motion.div>

            <motion.h2
              className="prog-headline"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(3rem, 7vw, 6rem)",
                lineHeight: 1.05,
                marginBottom: "2.5rem",
                letterSpacing: "-0.01em",
                fontWeight: 400,
              }}
            >
              Direct{" "}
              <span style={{ fontStyle: "italic", color: "#C9A96E" }}>Interventions.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{
                fontSize: "1.1rem",
                color: "rgba(255,255,255,0.4)",
                fontWeight: 300,
                maxWidth: "580px",
                lineHeight: 1.8,
                paddingLeft: "2rem",
                borderLeft: "1px solid rgba(201,169,110,0.3)",
              }}
            >
              Meaningful change requires more than just charity. It requires structured programs that provide the tools for self-reliance and community health.
            </motion.p>
          </div>

          {/* ── PROGRAMS GRID ── */}
          <div className="prog-grid">
            {PROGRAMS.map((program, i) => (
              <ProgramCard key={program.title} program={program} index={i} />
            ))}
          </div>

          {/* ── EVENTS GALLERY ── */}
          <div id="events" style={{ marginTop: "12rem" }}>
            {/* Gallery header */}
            <div style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "baseline",
              marginBottom: "4rem",
              paddingBottom: "2.5rem",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              gap: "0.75rem",
            }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 400, color: "#fff",
              }}>
                In the Field
              </h2>
              <span style={{
                fontSize: "0.6rem", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.3em",
                color: "#C9A96E",
              }}>
                Real Moments, Real Change
              </span>
            </div>

            {/* Bento grid */}
            <div className="event-grid">
              {EVENT_PHOTOS.map((photo, i) => (
                <motion.div
                  key={i}
                  className="event-photo-wrap event-item"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.08 }}
                  style={{
                    gridArea: isMobile ? "auto" : photo.gridArea,
                    position: "relative",
                    borderRadius: "2rem",
                    overflow: "hidden",
                    background: "#141412",
                    border: "1px solid rgba(255,255,255,0.05)",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="event-photo-img"
                  />
                  <div className="event-photo-overlay">
                    <p style={{
                      color: "#fff",
                      fontSize: "0.6rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                    }}>
                      <ImageIcon size={13} color="#C9A96E" />
                      {photo.alt}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Programs;