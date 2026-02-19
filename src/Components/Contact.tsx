import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Share2, MapPin, Heart, ArrowRight, Sparkles } from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface ContactInfo {
  icon: React.ElementType;
  title: string;
  content: string;
  link?: string;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const CONTACT_INFO: ContactInfo[] = [
  { icon: Phone, title: "Phone", content: "+234 903 685 4354", link: "tel:+2349036854354" },
  { icon: Mail, title: "Email", content: "Giversgenerous@gmail.com", link: "mailto:Giversgenerous@gmail.com" },
  { icon: Share2, title: "Social Media", content: "@GenerousHelpingHands", link: "https://instagram.com/generoushelpinghands" },
  { icon: MapPin, title: "Location", content: "Lagos, Nigeria" },
];

// ─── CONTACT ROW ──────────────────────────────────────────────────────────────
const ContactRow: React.FC<{ info: ContactInfo }> = ({ info }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = info.icon;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "0.75rem",
        borderRadius: "1rem",
        background: hovered ? "rgba(255,255,255,0.04)" : "transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{
        width: "44px", height: "44px", flexShrink: 0,
        borderRadius: "0.75rem",
        background: hovered ? "#C9A96E" : "rgba(201,169,110,0.1)",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.4s ease",
      }}>
        <Icon size={18} color={hovered ? "#0A0908" : "#C9A96E"} style={{ transition: "color 0.4s ease" }} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: "0.65rem", fontWeight: 800,
          textTransform: "uppercase", letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.4)",
          marginBottom: "0.15rem",
        }}>
          {info.title}
        </p>
        {info.link ? (
          <a
            href={info.link}
            target={info.link.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            style={{
              color: hovered ? "#C9A96E" : "#fff",
              fontWeight: 500,
              fontSize: "clamp(0.85rem, 3vw, 0.95rem)",
              textDecoration: "none",
              transition: "color 0.3s ease",
              display: "block",
              overflowWrap: "anywhere", // Prevents breaking unless necessary
              lineHeight: 1.4,
            }}
          >
            {info.content}
          </a>
        ) : (
          <p style={{
            color: "#fff", fontWeight: 500,
            fontSize: "clamp(0.85rem, 3vw, 0.95rem)",
            overflowWrap: "anywhere",
          }}>
            {info.content}
          </p>
        )}
      </div>
    </div>
  );
};

// ─── CONTACT SECTION ──────────────────────────────────────────────────────────
const Contact: React.FC = () => {
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;700&display=swap');

        .ct-cards {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 2rem;
        }

        .ct-cta-btns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.875rem;
        }

        @media (max-width: 991px) {
          .ct-cards { grid-template-columns: 1fr; }
        }

        @media (max-width: 500px) {
          .ct-cta-btns { grid-template-columns: 1fr; }
          .ct-section { padding: 5rem 0 6rem !important; }
          .ct-header { margin-bottom: 3rem !important; }
          .ct-card-inner { padding: 1.5rem !important; }
        }
      `}</style>

      <section
        id="contact"
        className="ct-section"
        style={{
          position: "relative",
          background: "#0A0908",
          padding: "8rem 0",
          overflow: "hidden",
          color: "#fff",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* BG Orbs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{
            position: "absolute", top: "-10%", left: "-10%",
            width: "60%", height: "60%",
            background: "radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
          }} />
        </div>

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.25rem", position: "relative", zIndex: 2 }}>
          
          {/* Header */}
          <div className="ct-header" style={{ textAlign: "center", marginBottom: "4.5rem" }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.5rem 1rem",
                background: "rgba(201,169,110,0.1)",
                border: "1px solid rgba(201,169,110,0.2)",
                borderRadius: "100px",
                marginBottom: "1.5rem",
              }}
            >
              <Heart size={12} color="#C9A96E" />
              <span style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "#C9A96E" }}>
                Connect With Us
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.2rem, 8vw, 3.8rem)",
                lineHeight: 1.1,
                fontWeight: 400,
              }}
            >
              Get in <span style={{ fontStyle: "italic", color: "#C9A96E" }}>Touch.</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "1rem",
                maxWidth: "480px",
                margin: "1.5rem auto 0",
                lineHeight: 1.6,
              }}
            >
              Together, we can create a brighter future for women and girls everywhere.
            </motion.p>
          </div>

          <div className="ct-cards">
            {/* Card 1: Contact */}
            <motion.div
              className="ct-card-inner"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{
                background: "#111110",
                borderRadius: "2rem",
                border: "1px solid rgba(255,255,255,0.06)",
                padding: "2.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
                <Mail size={18} color="#C9A96E" />
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.35rem", fontWeight: 600 }}>
                  Inquiries
                </h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {CONTACT_INFO.map((info, i) => (
                  <ContactRow key={i} info={info} />
                ))}
              </div>
            </motion.div>

            {/* Card 2: CTA */}
            <motion.div
              className="ct-card-inner"
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(145deg, #C9A96E 0%, #a07840 100%)",
                borderRadius: "2rem",
                padding: "2.5rem",
                color: "#0A0908",
              }}
            >
              <div style={{ position: "absolute", top: "-10%", right: "-10%", opacity: 0.1, transform: ctaHovered ? "scale(1.1) rotate(15deg)" : "scale(1) rotate(0deg)", transition: "0.6s ease" }}>
                <Sparkles size={180} />
              </div>

              <div style={{ position: "relative", zIndex: 1 }}>
                <p style={{ fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(10,9,8,0.5)", marginBottom: "1rem" }}>
                  Support Our Mission
                </p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 4vw, 1.85rem)", fontWeight: 700, fontStyle: "italic", marginBottom: "1rem" }}>
                  Ready to Make a Difference?
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "rgba(10,9,8,0.7)", marginBottom: "2rem" }}>
                  Join us in empowering women and girls through direct action.
                </p>

                <div className="ct-cta-btns">
                  <motion.a
                    href="#donation"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      background: "#0A0908", color: "#fff",
                      padding: "1rem", borderRadius: "100px",
                      textAlign: "center", fontSize: "0.7rem", fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "0.1em",
                      textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem"
                    }}
                  >
                    Donate <ArrowRight size={14} />
                  </motion.a>
                  <motion.a
                    href="#volunteer"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      background: "rgba(10,9,8,0.1)", color: "#0A0908",
                      padding: "1rem", borderRadius: "100px",
                      textAlign: "center", fontSize: "0.7rem", fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "0.1em",
                      textDecoration: "none", border: "1px solid rgba(10,9,8,0.1)"
                    }}
                  >
                    Volunteer
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;