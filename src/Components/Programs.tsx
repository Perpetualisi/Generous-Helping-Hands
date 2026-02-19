import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Briefcase, BookOpen, HeartPulse, Star,
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
    description: "Helping women gain financial independence through training, resources, and support to build sustainable livelihoods.",
    detail: "Our vocational training covers tailoring, catering, and digital skills. Since 2018, over 200 women have launched independent businesses with our seed grants and mentorship support.",
  },
  {
    icon: BookOpen,
    title: "Educational Initiatives",
    tag: "Future Leaders",
    description: "Providing scholarships, mentorship, and workshops that unlock learning and open doors for women, girls, and young people.",
    detail: "Every scholarship covers tuition, books, and uniforms. We also run after-school STEM clubs in Lagos secondary schools to bridge the opportunity gap for girls in tech.",
  },
  {
    icon: HeartPulse,
    title: "Health & Wellbeing",
    tag: "Community Care",
    description: "Ensuring access to vital sexual and reproductive health information and services so individuals can live healthy, confident lives.",
    detail: "Our mobile clinics offer free antenatal checks and reproductive health services. Last year, we trained 50 community health ambassadors to serve over 1,200 mothers across Lagos.",
  },
  {
    icon: Star,
    title: "Youth Empowerment",
    tag: "Next Generation",
    description: "Equipping young people with leadership skills, life skills, and opportunities to realize their potential and become agents of change.",
    detail: "Our youth programmes run leadership academies, mentorship circles, and community action projects — giving young people the confidence and skills to drive change in their own communities.",
  },
];

const EVENT_PHOTOS = [
  { src: "/event11.jpeg", alt: "Community outreach",  gridArea: "large" },
  { src: "/event22.jpeg", alt: "Skills training",     gridArea: "top-right" },
  { src: "/events3.jpg",  alt: "Youth mentorship",    gridArea: "mid-right" },
  { src: "/events4.jpg",  alt: "Medical outreach",    gridArea: "bottom-left" },
  { src: "/events5.jpg",  alt: "Empowerment summit",  gridArea: "bottom-mid" },
  { src: "/events6.jpg",  alt: "Advocacy walk",       gridArea: "bottom-right" },
];

// ─── 3D PROGRAM CARD ─────────────────────────────────────────────────────────
const ProgramCard: React.FC<{ program: Program; index: number; isMobile: boolean }> = ({ program, index, isMobile }) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0); 
    y.set(0);
    setHovered(false);
  };

  const Icon = program.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div style={{
        position: "relative",
        background: "linear-gradient(145deg, #141412 0%, #0d0d0c 100%)",
        borderRadius: isMobile ? "1.25rem" : "1.75rem",
        padding: isMobile ? "1.5rem" : "2rem",
        border: "1px solid",
        borderColor: hovered ? "rgba(201,169,110,0.4)" : "rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: hovered ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" : "0 10px 30px -10px rgba(0, 0, 0, 0.3)",
      }}>
        {/* Glow Effect */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(circle at 50% 0%, rgba(201,169,110,0.08), transparent 70%)`,
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.4s ease",
          pointerEvents: "none"
        }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", position: "relative" }}>
          <div style={{
            width: "44px", height: "44px", borderRadius: "10px",
            background: "rgba(201,169,110,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#C9A96E", border: "1px solid rgba(201,169,110,0.2)",
          }}>
            <Icon size={20} />
          </div>
          <span style={{
            fontSize: "0.5rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em",
            color: "#C9A96E", padding: "0.4rem 0.7rem", borderRadius: "20px",
            background: "rgba(201,169,110,0.05)", border: "1px solid rgba(201,169,110,0.1)",
          }}>
            {program.tag}
          </span>
        </div>

        <div style={{ position: "relative" }}>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.25rem",
            fontWeight: 700, color: "#fff", marginBottom: "0.75rem",
            lineHeight: 1.3
          }}>
            {program.title}
          </h3>
          <p style={{
            color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1.5rem",
          }}>
            {program.description}
          </p>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: "hidden" }}
            >
              <p style={{
                fontSize: "0.85rem", color: "#C9A96E", fontStyle: "italic",
                lineHeight: 1.6, paddingBottom: "1.5rem", fontFamily: "'Playfair Display', serif",
                borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1rem"
              }}>
                {program.detail}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setOpen(!open)}
          style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase",
            letterSpacing: "0.15em", color: "#C9A96E", background: "none",
            border: "none", cursor: "pointer", padding: "0.5rem 0",
            position: "relative", width: "fit-content", marginTop: "auto"
          }}
        >
          {open ? "Show Less" : "Discover Impact"}
          <motion.div animate={{ rotate: open ? 45 : 0 }}>
            <ArrowUpRight size={14} />
          </motion.div>
        </button>
      </div>
    </motion.div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const Programs: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    setIsMobile(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <>
      <style>{`
        /* Desktop: Forces 4 columns on one line */
        .prog-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-top: 4rem;
          align-items: flex-start; /* Prevents cards from stretching when one expands */
        }

        /* Responsive Grid Adjustments */
        @media (max-width: 1100px) {
          .prog-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .prog-grid { grid-template-columns: 1fr; }
        }

        .event-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-areas: 
            "large large top-right"
            "large large mid-right"
            "bottom-left bottom-mid bottom-right";
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 240px;
        }

        @media (max-width: 1024px) {
          .event-grid {
            grid-template-areas: none;
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 200px;
          }
          .event-photo-wrap { grid-area: auto !important; }
        }

        @media (max-width: 640px) {
          .event-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 250px;
            gap: 1rem;
          }
        }

        .img-zoom {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .event-photo-wrap:hover .img-zoom { transform: scale(1.1); }
      `}</style>

      <section id="ourprograms" style={{ background: "#0A0908", padding: isMobile ? "4rem 0" : "8rem 0", color: "#fff", overflow: "hidden" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          {/* Header */}
          <div style={{ maxWidth: "700px", marginBottom: "4rem" }}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#C9A96E", marginBottom: "1rem" }}
            >
              <Sparkles size={16} />
              <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em" }}>Our Programs</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "2.5rem" : "4rem", lineHeight: 1.1, marginBottom: "1.5rem" }}
            >
              Creating <span style={{ fontStyle: "italic", color: "#C9A96E" }}>Real Impact.</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{ color: "rgba(255,255,255,0.4)", fontSize: "1.05rem", lineHeight: 1.7, borderLeft: "2px solid #C9A96E", paddingLeft: "1.5rem" }}
            >
              We empower women, girls, and youth to thrive through programs that create real, lasting change — from financial independence and education to health and leadership.
            </motion.p>
          </div>

          {/* Cards Grid - Now strictly 4 columns on desktop */}
          <div className="prog-grid">
            {PROGRAMS.map((p, i) => (
              <ProgramCard key={i} program={p} index={i} isMobile={isMobile} />
            ))}
          </div>

          {/* Gallery Section */}
          <div id="events" style={{ marginTop: isMobile ? "6rem" : "10rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1.5rem" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "2rem" : "2.5rem" }}>In the Field</h2>
              {!isMobile && <span style={{ color: "#C9A96E", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em" }}>Real Moments, Real Change</span>}
            </div>

            <div className="event-grid">
              {EVENT_PHOTOS.map((photo, i) => (
                <motion.div
                  key={i}
                  className="event-photo-wrap"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  style={{ 
                    gridArea: photo.gridArea, 
                    position: "relative", 
                    overflow: "hidden", 
                    borderRadius: "1rem",
                    background: "#141412"
                  }}
                >
                  <img src={photo.src} alt={photo.alt} className="img-zoom" />
                  <div style={{
                    position: "absolute", inset: 0, 
                    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                    display: "flex", alignItems: "flex-end", padding: "1.25rem"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#fff" }}>
                      <ImageIcon size={14} color="#C9A96E" />
                      <span style={{ fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>{photo.alt}</span>
                    </div>
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