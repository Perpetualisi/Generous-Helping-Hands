import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  { icon: Phone,  title: "Phone",        content: "+234 903 685 4354",         link: "tel:+2349036854354" },
  { icon: Mail,   title: "Email",        content: "Giversgenerous@gmail.com",  link: "mailto:Giversgenerous@gmail.com" },
  { icon: Share2, title: "Social Media", content: "@GenerousHelpingHands",     link: "https://instagram.com/generoushelpinghands" },
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
        display: "flex", alignItems: "center", gap: "1.5rem",
        padding: "1rem",
        borderRadius: "1rem",
        background: hovered ? "rgba(255,255,255,0.04)" : "transparent",
        transition: "background 0.3s ease",
      }}
    >
      {/* Icon */}
      <div style={{
        width: "56px", height: "56px", flexShrink: 0,
        borderRadius: "1rem",
        background: hovered ? "#C9A96E" : "rgba(201,169,110,0.1)",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background 0.5s ease",
      }}>
        <Icon size={22} color={hovered ? "#0A0908" : "#C9A96E"} style={{ transition: "color 0.5s ease" }} />
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4 style={{
          fontSize: "0.58rem", fontWeight: 800,
          textTransform: "uppercase" as const, letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.3)",
          marginBottom: "0.3rem",
        }}>
          {info.title}
        </h4>
        {info.link ? (
          <a
            href={info.link}
            target={info.link.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            style={{
              color: hovered ? "#C9A96E" : "#fff",
              fontWeight: 500, fontSize: "0.95rem",
              textDecoration: "none",
              transition: "color 0.3s ease",
              wordBreak: "break-all",
            }}
          >
            {info.content}
          </a>
        ) : (
          <p style={{ color: "#fff", fontWeight: 500, fontSize: "0.95rem" }}>
            {info.content}
          </p>
        )}
      </div>
    </div>
  );
};

// ─── CONTACT SECTION ──────────────────────────────────────────────────────────
const Contact: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardHovered, setCardHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xs = useSpring(x, { stiffness: 120, damping: 20 });
  const ys = useSpring(y, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(ys, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(xs, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;700&display=swap');

        .ct-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        .ct-image-col { display: block; }

        .ct-cta-btns {
          display: flex;
          flex-direction: row;
          gap: 1rem;
        }

        @media (max-width: 1024px) {
          .ct-grid { grid-template-columns: 1fr !important; }
          .ct-image-col { display: none !important; }
        }

        @media (max-width: 560px) {
          .ct-cta-btns { flex-direction: column !important; }
          .ct-headline { font-size: clamp(2.2rem, 9vw, 3rem) !important; }
        }
      `}</style>

      <section
        id="contact"
        style={{
          position: "relative",
          background: "#0A0908",
          padding: "10rem 0",
          overflow: "hidden",
          color: "#fff",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Ambient orbs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{
            position: "absolute", top: "-10%", left: "-10%",
            width: "50%", height: "50%",
            background: "rgba(201,169,110,0.05)",
            borderRadius: "50%", filter: "blur(120px)",
          }} />
          <div style={{
            position: "absolute", bottom: "-10%", right: "-10%",
            width: "50%", height: "50%",
            background: "rgba(201,169,110,0.05)",
            borderRadius: "50%", filter: "blur(120px)",
          }} />
        </div>

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
              <Heart size={14} color="#C9A96E" />
              <span style={{
                fontSize: "0.62rem", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.3em",
                color: "#C9A96E",
              }}>
                Connect With Us
              </span>
            </motion.div>

            <motion.h2
              className="ct-headline"
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
              Get in{" "}
              <span style={{ fontStyle: "italic", color: "#C9A96E" }}>Touch.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "1.05rem", fontWeight: 300,
                maxWidth: "560px", margin: "0 auto",
                lineHeight: 1.8,
                paddingTop: "2rem",
                borderTop: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              Together, we can create a brighter future for women and girls everywhere.
            </motion.p>
          </div>

          {/* ── TWO-COLUMN LAYOUT ── */}
          <div className="ct-grid">

            {/* LEFT — 3D image card (desktop only) */}
            <motion.div
              ref={cardRef}
              className="ct-image-col"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setCardHovered(true)}
              onMouseLeave={() => { x.set(0); y.set(0); setCardHovered(false); }}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d", position: "relative" }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Glow */}
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(201,169,110,0.15)",
                borderRadius: "3rem",
                filter: "blur(40px)",
                opacity: cardHovered ? 1 : 0,
                transition: "opacity 0.7s ease",
                pointerEvents: "none",
              }} />

              {/* Card */}
              <div style={{
                position: "relative",
                borderRadius: "3rem",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "#141412",
                padding: "8px",
              }}>
                <img
                  src="/contact.png"
                  alt="Community outreach"
                  style={{
                    width: "100%",
                    aspectRatio: "4 / 5",
                    objectFit: "cover",
                    borderRadius: "2.8rem",
                    display: "block",
                    transition: "transform 0.7s ease",
                    transform: cardHovered ? "scale(1.05)" : "scale(1)",
                  }}
                />
                {/* Gradient overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(10,9,8,0.85) 0%, transparent 60%)",
                  borderRadius: "2.8rem",
                }} />
                {/* Overlay text */}
                <div style={{
                  position: "absolute",
                  bottom: "3rem", left: "3rem", right: "3rem",
                  transform: "translateZ(50px)",
                }}>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.75rem", fontWeight: 700,
                    fontStyle: "italic",
                    color: "#C9A96E",
                    marginBottom: "0.75rem", lineHeight: 1.2,
                  }}>
                    We're Here to Help
                  </h3>
                  <p style={{
                    color: "rgba(255,255,255,0.75)",
                    fontWeight: 300, lineHeight: 1.7,
                    fontSize: "0.9rem",
                  }}>
                    Connect with us to learn more about our local programs and international initiatives.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT — Info + CTA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ display: "flex", flexDirection: "column", gap: "3rem" }}
            >
              {/* Contact info card */}
              <div style={{
                background: "#141412",
                padding: "2.5rem",
                borderRadius: "2.5rem",
                border: "1px solid rgba(255,255,255,0.05)",
                boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
              }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.5rem", fontWeight: 700,
                  color: "#fff", marginBottom: "2rem",
                }}>
                  Contact Information
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {CONTACT_INFO.map((info, i) => (
                    <ContactRow key={i} info={info} />
                  ))}
                </div>
              </div>

              {/* Gold CTA card */}
              <div style={{
                position: "relative",
                overflow: "hidden",
                background: "#C9A96E",
                padding: "2.5rem",
                borderRadius: "2.5rem",
                color: "#0A0908",
              }}>
                {/* Decorative sparkle */}
                <div style={{
                  position: "absolute", top: "-20%", right: "-10%",
                  opacity: 0.1, transform: "rotate(12deg)",
                  pointerEvents: "none",
                }}>
                  <Sparkles size={200} color="#0A0908" />
                </div>

                <div style={{ position: "relative", zIndex: 1 }}>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1.6rem, 3vw, 2rem)",
                    fontWeight: 700, fontStyle: "italic",
                    lineHeight: 1.2, marginBottom: "1rem",
                    color: "#0A0908",
                  }}>
                    Ready to Make a Difference?
                  </h3>
                  <p style={{
                    fontWeight: 500, marginBottom: "2rem",
                    opacity: 0.75, maxWidth: "360px",
                    lineHeight: 1.7, fontSize: "0.95rem",
                  }}>
                    Join us in empowering women and girls. Your support creates lasting change in our community.
                  </p>

                  <div className="ct-cta-btns">
                    <motion.a
                      href="#donation"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      style={{
                        flex: 1,
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                        padding: "1rem 2rem",
                        background: "#0A0908",
                        color: "#fff",
                        borderRadius: "100px",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.65rem", fontWeight: 800,
                        textTransform: "uppercase", letterSpacing: "0.2em",
                        textDecoration: "none",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                      }}
                    >
                      Donate Now <ArrowRight size={13} />
                    </motion.a>
                    <motion.a
                      href="#volunteer"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      style={{
                        flex: 1,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        padding: "1rem 2rem",
                        background: "rgba(255,255,255,0.2)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(0,0,0,0.1)",
                        borderRadius: "100px",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.65rem", fontWeight: 800,
                        textTransform: "uppercase", letterSpacing: "0.2em",
                        color: "#0A0908",
                        textDecoration: "none",
                      }}
                    >
                      Volunteer
                    </motion.a>
                  </div>
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