import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Quote, Star, Sparkles } from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Testimonial {
  message: string;
  name: string;
  role?: string;
  rating?: number;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
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

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xs = useSpring(x, { stiffness: 120, damping: 20 });
  const ys = useSpring(y, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(ys, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(xs, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { x.set(0); y.set(0); setHovered(false); }}
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
        transition: "border-color 0.5s ease",
        boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
      }}>

        {/* Quote badge */}
        <div style={{
          position: "absolute",
          top: "-16px", right: "2.5rem",
          background: "#C9A96E",
          padding: "0.75rem",
          borderRadius: "1rem",
          boxShadow: "0 8px 24px rgba(201,169,110,0.4)",
          transform: hovered ? "rotate(0deg)" : "rotate(12deg)",
          transition: "transform 0.5s ease",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Quote size={20} color="#0A0908" />
        </div>

        {/* Stars */}
        <div style={{
          display: "flex", gap: "0.25rem",
          marginBottom: "1.5rem",
          transform: "translateZ(30px)",
        }}>
          {[...Array(testimonial.rating ?? 5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              fill="#C9A96E"
              color="#C9A96E"
            />
          ))}
        </div>

        {/* Message */}
        <div style={{ flex: 1, transform: "translateZ(40px)" }}>
          <p style={{
            color: "rgba(255,255,255,0.45)",
            fontWeight: 300,
            lineHeight: 1.8,
            fontStyle: "italic",
            fontSize: "1rem",
            marginBottom: "2rem",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            &ldquo;{testimonial.message}&rdquo;
          </p>
        </div>

        {/* Author */}
        <div style={{
          paddingTop: "1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          transform: "translateZ(20px)",
        }}>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.2,
          }}>
            {testimonial.name}
          </p>
          {testimonial.role && (
            <p style={{
              color: "#C9A96E",
              fontSize: "0.6rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              marginTop: "0.5rem",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {testimonial.role}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ─── TESTIMONIALS SECTION ─────────────────────────────────────────────────────
const Testimonials: React.FC = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;700&display=swap');

        .tm-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          perspective: 2000px;
          align-items: stretch;
        }

        @media (max-width: 900px) {
          .tm-grid { grid-template-columns: 1fr 1fr !important; gap: 1.5rem !important; }
          .tm-headline { font-size: clamp(2.5rem, 8vw, 4rem) !important; }
        }

        @media (max-width: 560px) {
          .tm-grid { grid-template-columns: 1fr !important; }
          .tm-headline { font-size: clamp(2rem, 9vw, 3rem) !important; }
        }
      `}</style>

      <section
        id="testimonials"
        style={{
          position: "relative",
          background: "#0A0908",
          padding: "10rem 0",
          overflow: "hidden",
          color: "#fff",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Centre ambient orb */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%", height: "60%",
          background: "rgba(201,169,110,0.05)",
          borderRadius: "50%",
          filter: "blur(120px)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 2 }}>

          {/* ── HEADER ── */}
          <div style={{ textAlign: "center", marginBottom: "6rem" }}>
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
                Voice of the Community
              </span>
            </motion.div>

            <motion.h2
              className="tm-headline"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                lineHeight: 1.15,
                marginBottom: "1.5rem",
                fontWeight: 400,
              }}
            >
              Trusted{" "}
              <span style={{ fontStyle: "italic", color: "#C9A96E" }}>Testimonials.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "1.05rem",
                fontWeight: 300,
                maxWidth: "560px",
                margin: "0 auto",
                lineHeight: 1.8,
              }}
            >
              Real stories from those who have walked beside us in our journey to empower women and girls across Nigeria.
            </motion.p>
          </div>

          {/* ── CARDS GRID ── */}
          <div className="tm-grid">
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>

          {/* ── BOTTOM LABEL ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={{ marginTop: "6rem", textAlign: "center" }}
          >
            <p style={{
              fontSize: "0.58rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.4em",
              color: "rgba(201,169,110,0.5)",
            }}>
              Impact in Motion
            </p>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default Testimonials;