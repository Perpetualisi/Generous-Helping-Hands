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
  { icon: Phone,  title: "Phone",        content: "+234 903 685 4354",        link: "tel:+2349036854354" },
  { icon: Mail,   title: "Email",        content: "Giversgenerous@gmail.com", link: "mailto:Giversgenerous@gmail.com" },
  { icon: Share2, title: "Social Media", content: "@GenerousHelpingHands",    link: "https://instagram.com/generoushelpinghands" },
  { icon: MapPin, title: "Location",     content: "Lagos, Nigeria" },
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
        gap: "1.25rem",
        padding: "0.875rem 1rem",
        borderRadius: "1rem",
        background: hovered ? "rgba(255,255,255,0.04)" : "transparent",
        transition: "background 0.3s ease",
        cursor: "default",
      }}
    >
      {/* Icon bubble */}
      <div style={{
        width: "50px", height: "50px", flexShrink: 0,
        borderRadius: "0.875rem",
        background: hovered ? "#C9A96E" : "rgba(201,169,110,0.1)",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background 0.4s ease",
      }}>
        <Icon size={20} color={hovered ? "#0A0908" : "#C9A96E"} style={{ transition: "color 0.4s ease" }} />
      </div>

      {/* Label + value */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: "0.58rem", fontWeight: 800,
          textTransform: "uppercase" as const, letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.28)",
          marginBottom: "0.2rem",
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
              fontSize: "0.92rem",
              textDecoration: "none",
              transition: "color 0.3s ease",
              wordBreak: "break-all",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {info.content}
          </a>
        ) : (
          <p style={{
            color: "#fff", fontWeight: 500,
            fontSize: "0.92rem",
            fontFamily: "'DM Sans', sans-serif",
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

        /* Two-card side by side on desktop */
        .ct-cards {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 2rem;
          align-items: start;
        }

        .ct-cta-btns {
          display: flex;
          gap: 0.875rem;
        }

        @media (max-width: 860px) {
          .ct-cards { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 480px) {
          .ct-cta-btns { flex-direction: column !important; }
          .ct-headline { font-size: clamp(2.2rem, 9vw, 3rem) !important; }
        }
      `}</style>

      <section
        id="contact"
        style={{
          position: "relative",
          background: "#0A0908",
          padding: "9rem 0 10rem",
          overflow: "hidden",
          color: "#fff",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Ambient orbs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{
            position: "absolute", top: "-10%", left: "-10%",
            width: "55%", height: "55%",
            background: "rgba(201,169,110,0.05)",
            borderRadius: "50%", filter: "blur(130px)",
          }} />
          <div style={{
            position: "absolute", bottom: "-10%", right: "-10%",
            width: "55%", height: "55%",
            background: "rgba(201,169,110,0.05)",
            borderRadius: "50%", filter: "blur(130px)",
          }} />
        </div>

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 2 }}>

          {/* ── HEADER ── */}
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>

            {/* Eyebrow pill */}
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
                marginBottom: "1.75rem",
              }}
            >
              <Heart size={13} color="#C9A96E" />
              <span style={{
                fontSize: "0.6rem", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.3em",
                color: "#C9A96E",
              }}>
                Connect With Us
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              className="ct-headline"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.75 }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.6rem, 6vw, 4.2rem)",
                lineHeight: 1.12,
                fontWeight: 400,
                marginBottom: "1.5rem",
              }}
            >
              Get in{" "}
              <span style={{ fontStyle: "italic", color: "#C9A96E" }}>Touch.</span>
            </motion.h2>

            {/* Sub-text */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.75 }}
              style={{
                color: "rgba(255,255,255,0.38)",
                fontSize: "1rem", fontWeight: 300,
                maxWidth: "500px", margin: "0 auto",
                lineHeight: 1.8,
                paddingTop: "1.75rem",
                borderTop: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              Together, we can create a brighter future for women and girls everywhere.
            </motion.p>
          </div>

          {/* ── CARDS ── */}
          <motion.div
            className="ct-cards"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.15 }}
          >
            {/* ── CARD 1: Contact info ── */}
            <div style={{
              background: "#111110",
              borderRadius: "2.25rem",
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "2.25rem",
              boxShadow: "0 30px 60px rgba(0,0,0,0.45)",
            }}>
              {/* Card header */}
              <div style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                paddingBottom: "1.5rem",
                marginBottom: "0.75rem",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "0.75rem",
                  background: "rgba(201,169,110,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Mail size={16} color="#C9A96E" />
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.25rem", fontWeight: 700,
                  color: "#fff",
                }}>
                  Contact Information
                </h3>
              </div>

              {/* Rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                {CONTACT_INFO.map((info, i) => (
                  <ContactRow key={i} info={info} />
                ))}
              </div>
            </div>

            {/* ── CARD 2: Gold CTA ── */}
            <div
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              style={{
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(145deg, #C9A96E 0%, #a07840 100%)",
                borderRadius: "2.25rem",
                padding: "2.25rem",
                color: "#0A0908",
                boxShadow: "0 30px 60px rgba(201,169,110,0.22)",
              }}
            >
              {/* Decorative bg sparkle */}
              <div style={{
                position: "absolute", top: "-15%", right: "-8%",
                opacity: ctaHovered ? 0.15 : 0.08,
                transform: `rotate(${ctaHovered ? "20deg" : "10deg"})`,
                transition: "opacity 0.6s ease, transform 0.6s ease",
                pointerEvents: "none",
              }}>
                <Sparkles size={160} color="#0A0908" />
              </div>

              <div style={{ position: "relative", zIndex: 1 }}>

                {/* Label */}
                <p style={{
                  fontSize: "0.58rem", fontWeight: 800,
                  textTransform: "uppercase", letterSpacing: "0.3em",
                  color: "rgba(10,9,8,0.5)",
                  marginBottom: "1.25rem",
                }}>
                  Support Our Mission
                </p>

                {/* Headline */}
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.5rem, 3.5vw, 1.9rem)",
                  fontWeight: 700, fontStyle: "italic",
                  lineHeight: 1.2,
                  marginBottom: "1rem",
                  color: "#0A0908",
                }}>
                  Ready to Make a Difference?
                </h3>

                {/* Body */}
                <p style={{
                  fontSize: "0.9rem", fontWeight: 400,
                  lineHeight: 1.75,
                  color: "rgba(10,9,8,0.65)",
                  marginBottom: "2rem",
                }}>
                  Join us in empowering women and girls. Your support creates lasting change in our community.
                </p>

                {/* Stat pills */}
                <div style={{
                  display: "flex", gap: "0.75rem", flexWrap: "wrap",
                  marginBottom: "2rem",
                }}>
                  {[
                    { value: "500+", label: "Lives Impacted" },
                    { value: "100%", label: "Direct Funding" },
                  ].map((s) => (
                    <div key={s.label} style={{
                      padding: "0.5rem 1rem",
                      background: "rgba(10,9,8,0.12)",
                      borderRadius: "100px",
                      display: "flex", flexDirection: "column", alignItems: "center",
                    }}>
                      <span style={{ fontSize: "1rem", fontWeight: 800, color: "#0A0908", lineHeight: 1 }}>
                        {s.value}
                      </span>
                      <span style={{ fontSize: "0.55rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(10,9,8,0.5)", marginTop: "2px" }}>
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="ct-cta-btns">
                  <motion.a
                    href="#donation"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      flex: 1,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                      padding: "0.95rem 1.5rem",
                      background: "#0A0908",
                      color: "#fff",
                      borderRadius: "100px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.65rem", fontWeight: 800,
                      textTransform: "uppercase", letterSpacing: "0.2em",
                      textDecoration: "none",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Donate Now <ArrowRight size={13} />
                  </motion.a>
                  <motion.a
                    href="#volunteer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      flex: 1,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      padding: "0.95rem 1.5rem",
                      background: "rgba(10,9,8,0.12)",
                      border: "1px solid rgba(10,9,8,0.15)",
                      borderRadius: "100px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.65rem", fontWeight: 800,
                      textTransform: "uppercase", letterSpacing: "0.2em",
                      color: "#0A0908",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Volunteer
                  </motion.a>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;