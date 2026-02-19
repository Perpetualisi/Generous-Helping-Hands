import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Heart, ArrowUpRight, Sparkles } from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface QuickLink {
  id: string;
  label: string;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const QUICK_LINKS: QuickLink[] = [
  { id: "hero",         label: "Home"         },
  { id: "ourprograms",  label: "Our Programs"  },
  { id: "volunteer",    label: "Volunteer"     },
  { id: "donation",     label: "Donation"      },
  { id: "testimonials", label: "Testimonials"  },
];

// ─── NAV LINK ─────────────────────────────────────────────────────────────────
const NavLink: React.FC<{ link: QuickLink; onScroll: (id: string) => void }> = ({ link, onScroll }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <li>
      <button
        onClick={() => onScroll(link.id)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          color: hovered ? "#fff" : "rgba(255,255,255,0.4)",
          fontSize: "0.875rem",
          fontWeight: 300,
          fontFamily: "'DM Sans', sans-serif",
          transition: "color 0.3s ease",
        }}
      >
        {/* Animated line */}
        <span style={{
          display: "inline-block",
          width: hovered ? "16px" : "0px",
          height: "1px",
          background: "#C9A96E",
          transition: "width 0.3s ease",
          flexShrink: 0,
        }} />
        {link.label}
      </button>
    </li>
  );
};

// ─── SOCIAL ICON ──────────────────────────────────────────────────────────────
const SocialIcon: React.FC<{ href: string; icon: React.ElementType }> = ({ href, icon: Icon }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "40px", height: "40px",
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.1)",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: hovered ? "#C9A96E" : "transparent",
        color: hovered ? "#0A0908" : "#C9A96E",
        transition: "background 0.5s ease, color 0.5s ease",
        flexShrink: 0,
      }}
    >
      <Icon size={18} />
    </motion.a>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer: React.FC = () => {
  const [ctaHovered, setCtaHovered] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;700&display=swap');

        .ft-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
          gap: 4rem;
          margin-bottom: 5rem;
        }

        .ft-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .ft-bottom-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .ft-divider { display: block; }

        @media (max-width: 1024px) {
          .ft-grid { grid-template-columns: 1fr 1fr !important; gap: 3rem !important; }
        }

        @media (max-width: 600px) {
          .ft-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .ft-bottom { flex-direction: column; text-align: center; }
          .ft-bottom-right { flex-direction: column; gap: 0.75rem; }
          .ft-divider { display: none !important; }
        }
      `}</style>

      <footer style={{
        position: "relative",
        background: "#0A0908",
        color: "#fff",
        paddingTop: "6rem",
        paddingBottom: "3rem",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {/* Bottom ambient glow */}
        <div style={{
          position: "absolute",
          bottom: 0, left: "50%",
          transform: "translateX(-50%)",
          width: "100%", height: "300px",
          background: "rgba(201,169,110,0.05)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 2 }}>

          {/* ── MAIN GRID ── */}
          <div className="ft-grid">

            {/* 01. Brand */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Logo text */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  lineHeight: 1,
                  color: "#fff",
                }}>
                  Generous{" "}
                  <span style={{ fontStyle: "italic", color: "#C9A96E" }}>Hands</span>
                </span>
                <span style={{
                  fontSize: "0.58rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.4em",
                  color: "rgba(255,255,255,0.3)",
                  marginTop: "0.4rem",
                }}>
                  Foundation
                </span>
              </div>

              <p style={{
                color: "rgba(255,255,255,0.38)",
                fontSize: "0.875rem",
                lineHeight: 1.75,
                fontWeight: 300,
                maxWidth: "280px",
              }}>
                Crafting a future where every woman and girl in Nigeria has the tools to lead, learn, and thrive.
              </p>

              {/* Social icons */}
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <SocialIcon href="https://instagram.com/generoushelpinghands" icon={Instagram} />
                <SocialIcon href="mailto:Giversgenerous@gmail.com" icon={Mail} />
              </div>
            </div>

            {/* 02. Navigation */}
            <div>
              <h3 style={{
                fontSize: "0.62rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: "#C9A96E",
                marginBottom: "2rem",
              }}>
                Navigation
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                {QUICK_LINKS.map((link) => (
                  <NavLink key={link.id} link={link} onScroll={scrollToSection} />
                ))}
              </ul>
            </div>

            {/* 03. Headquarters */}
            <div>
              <h3 style={{
                fontSize: "0.62rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: "#C9A96E",
                marginBottom: "2rem",
              }}>
                Headquarters
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <li style={{ display: "flex", gap: "1rem" }}>
                  <MapPin size={18} color="#C9A96E" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", fontWeight: 300, lineHeight: 1.6 }}>
                    Lagos, Nigeria
                    <span style={{
                      display: "block",
                      fontSize: "0.58rem",
                      color: "rgba(255,255,255,0.2)",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      marginTop: "0.3rem",
                    }}>
                      West Africa Operations
                    </span>
                  </span>
                </li>
                <li style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <Phone size={18} color="#C9A96E" style={{ flexShrink: 0 }} />
                  <a
                    href="tel:+2349036854354"
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "0.875rem",
                      fontWeight: 300,
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                  >
                    +234 903 685 4354
                  </a>
                </li>
              </ul>
            </div>

            {/* 04. Support CTA card */}
            <div
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              style={{
                position: "relative",
                padding: "2rem",
                borderRadius: "2rem",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                overflow: "hidden",
              }}
            >
              {/* Decorative sparkle */}
              <div style={{
                position: "absolute", top: 0, right: 0,
                padding: "1rem",
                opacity: 0.2,
                transform: ctaHovered ? "rotate(12deg)" : "rotate(0deg)",
                transition: "transform 0.7s ease",
                pointerEvents: "none",
              }}>
                <Sparkles size={40} color="#C9A96E" />
              </div>

              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.2rem",
                fontStyle: "italic",
                color: "#fff",
                marginBottom: "0.75rem",
              }}>
                Support the Mission
              </h3>
              <p style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "0.78rem",
                fontWeight: 300,
                lineHeight: 1.7,
                marginBottom: "1.5rem",
              }}>
                Your contribution goes 100% to field operations and community empowerment.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection("donation")}
                style={{
                  width: "100%",
                  padding: "1rem",
                  background: "#C9A96E",
                  color: "#0A0908",
                  border: "none",
                  borderRadius: "0.875rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.62rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                  boxShadow: "0 8px 24px rgba(201,169,110,0.25)",
                }}
              >
                Donate Now <ArrowUpRight size={14} />
              </motion.button>
            </div>

          </div>

          {/* ── BOTTOM BAR ── */}
          <div style={{
            paddingTop: "3rem",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}>
            <div className="ft-bottom">
              <p style={{
                fontSize: "0.6rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.25)",
              }}>
                © {new Date().getFullYear()} Generous Helping Hands Foundation. All Rights Reserved.
              </p>

              <div className="ft-bottom-right">
                <div style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  fontSize: "0.6rem", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.25)",
                }}>
                  <span>Legacy of</span>
                  <Heart size={12} fill="#C9A96E" color="#C9A96E" />
                  <span>Compassion</span>
                </div>

                <div className="ft-divider" style={{ height: "16px", width: "1px", background: "rgba(255,255,255,0.1)" }} />

                <span style={{
                  fontSize: "0.6rem", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.35)",
                }}>
                  RC: 123456789
                </span>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;