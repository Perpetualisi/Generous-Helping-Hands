import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Quote, Star, Sparkles } from "lucide-react";

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
  borderHov: "rgba(245,158,11,0.35)",
  gradient:  "linear-gradient(135deg, #F59E0B, #EA580C)",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
interface Testimonial { message: string; name: string; role?: string; rating?: number; }

const TESTIMONIALS: Testimonial[] = [
  {
    message: "Volunteering with GHHF has been one of the most rewarding experiences of my life. I've seen firsthand the positive impact this organization has on women and girls.",
    name: "Tolu Alvaro",
    role: "Volunteer",
    rating: 5,
  },
  {
    message: "From advocacy to education, the work they do is comprehensive and transformative. It's amazing to be part of a team that's genuinely making a difference.",
    name: "Aisha Yuhui",
    role: "Community Partner",
    rating: 5,
  },
  {
    message: "Supporting GHHF is an investment in a better future for women and girls. I've been consistently impressed with the transparency and effectiveness of their programs.",
    name: "Kunbi Ola",
    role: "Donor",
    rating: 5,
  },
];

// ─── TESTIMONIAL CARD ─────────────────────────────────────────────────────────
const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const xs = useSpring(mx, { stiffness: 120, damping: 20 });
  const ys = useSpring(my, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(ys, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(xs, [-0.5, 0.5], ["-6deg", "6deg"]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={(e) => {
        const r = cardRef.current?.getBoundingClientRect();
        if (r) { mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { mx.set(0); my.set(0); setHovered(false); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", height: "100%" }}
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={{
        position: "relative", height: "100%",
        padding: "2.5rem 2rem",
        borderRadius: 24, display: "flex", flexDirection: "column",
        background: hovered
          ? "rgba(35,31,27,0.98)"
          : C.bgCard,
        border: `1px solid ${hovered ? C.borderHov : C.border}`,
        boxShadow: hovered
          ? `0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px ${C.borderHov}`
          : "0 12px 40px rgba(0,0,0,0.35)",
        transition: "background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
        overflow: "hidden",
      }}>

        {/* Top ambient glow on hover */}
        <div style={{
          position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)",
          width: 200, height: 120,
          background: "radial-gradient(ellipse, rgba(245,158,11,0.12) 0%, transparent 70%)",
          filter: "blur(20px)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }} />

        {/* Top gold line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${hovered ? C.gold : "rgba(245,158,11,0.2)"}, transparent)`,
          transition: "background 0.4s ease",
        }} />

        {/* Quote badge */}
        <div style={{
          position: "absolute", top: "-1rem", right: "1.5rem",
          width: 42, height: 42, borderRadius: 14,
          background: hovered ? C.gradient : "rgba(245,158,11,0.15)",
          border: `1px solid ${hovered ? "transparent" : C.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: hovered ? "rotate(0deg)" : "rotate(12deg)",
          transition: "all 0.4s ease",
          boxShadow: hovered ? "0 8px 24px rgba(245,158,11,0.4)" : "none",
        }}>
          <Quote size={17} color={hovered ? "#fff" : C.gold} />
        </div>

        {/* Stars */}
        <div style={{
          display: "flex", gap: "0.25rem", marginBottom: "1.75rem",
          transform: "translateZ(30px)",
        }}>
          {[...Array(testimonial.rating ?? 5)].map((_, i) => (
            <Star key={i} size={13} fill={C.gold} color={C.gold} />
          ))}
        </div>

        {/* Message */}
        <div style={{ flex: 1, marginBottom: "2rem", transform: "translateZ(40px)" }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.1rem", fontStyle: "italic",
            lineHeight: 1.75, color: hovered ? "rgba(255,255,255,0.85)" : C.textMuted,
            transition: "color 0.3s ease",
          }}>
            &ldquo;{testimonial.message}&rdquo;
          </p>
        </div>

        {/* Author */}
        <div style={{
          paddingTop: "1.5rem",
          borderTop: `1px solid ${hovered ? "rgba(245,158,11,0.2)" : C.border}`,
          transform: "translateZ(20px)",
          transition: "border-color 0.3s ease",
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.2rem", fontWeight: 700,
            color: C.text, lineHeight: 1.2, marginBottom: "0.4rem",
          }}>{testimonial.name}</p>
          {testimonial.role && (
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.58rem", fontWeight: 800,
              textTransform: "uppercase", letterSpacing: "0.25em",
              color: C.gold,
            }}>{testimonial.role}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const Testimonials: React.FC = () => (
  <div
    id="testimonials"
    style={{ background: C.bg, color: C.text, position: "relative", overflow: "hidden", padding: "8rem 6%" }}
  >
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
      * { box-sizing: border-box; }
      ::selection { background: rgba(245,158,11,0.25); color: #fff; }
      .tm-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.25rem;
        perspective: 2000px;
      }
      @media (max-width: 1024px) { .tm-grid { grid-template-columns: repeat(2, 1fr); } }
      @media (max-width: 600px)  { .tm-grid { grid-template-columns: 1fr; } }
    `}</style>

    {/* Ambient glows */}
    <div style={{
      position: "absolute", top: "50%", left: "50%",
      transform: "translate(-50%, -50%)",
      width: "55%", height: "55%",
      background: "radial-gradient(ellipse, rgba(245,158,11,0.06) 0%, transparent 70%)",
      filter: "blur(80px)", borderRadius: "50%",
      pointerEvents: "none", zIndex: 0,
    }} />
    <div style={{
      position: "absolute", top: 0, right: "-10%",
      width: 500, height: 500, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 65%)",
      filter: "blur(100px)", pointerEvents: "none", zIndex: 0,
    }} />
    <div style={{
      position: "absolute", bottom: 0, left: "-10%",
      width: 500, height: 500, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(234,88,12,0.05) 0%, transparent 65%)",
      filter: "blur(100px)", pointerEvents: "none", zIndex: 0,
    }} />

    <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.4rem 1rem", borderRadius: 100,
            border: `1px solid ${C.border}`,
            background: "rgba(245,158,11,0.06)",
            marginBottom: "1.5rem",
          }}
        >
          <Sparkles size={11} color={C.gold} />
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem",
            fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase",
            color: C.gold,
          }}>Voice of the Community</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)",
            fontWeight: 700, lineHeight: 1.05,
            color: C.text, marginBottom: "1.25rem",
          }}
        >
          Trusted{" "}
          <em style={{
            fontStyle: "italic", fontWeight: 400,
            background: `linear-gradient(135deg, ${C.gold}, ${C.orange})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Testimonials.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            maxWidth: 500, margin: "0 auto",
            color: C.textMuted, fontFamily: "'DM Sans', sans-serif",
            fontSize: "1rem", lineHeight: 1.75, fontWeight: 300,
          }}
        >
          Real stories from those who have walked beside us in our journey to empower women and girls across Nigeria.
        </motion.p>
      </div>

      {/* Cards */}
      <div className="tm-grid">
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard key={i} testimonial={t} index={i} />
        ))}
      </div>

      {/* Bottom label */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ marginTop: "5rem", textAlign: "center" }}
      >
        {/* Divider */}
        <div style={{
          display: "flex", alignItems: "center", gap: "1rem",
          maxWidth: 300, margin: "0 auto 1.5rem",
        }}>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${C.border})` }} />
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.gold, opacity: 0.4 }} />
          <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${C.border}, transparent)` }} />
        </div>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.58rem", fontWeight: 700,
          letterSpacing: "0.45em", textTransform: "uppercase",
          color: C.textFaint,
        }}>Impact in Motion</p>
      </motion.div>

    </div>
  </div>
);

export default Testimonials;