import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Heart, ArrowUpRight, Sparkles } from "lucide-react";

// ─── THEME CONFIGURATION ──────────────────────────────────────────────────────
const THEME = {
  // Matching the Hero's dark background
  bgDark: "#0f0e0c", 
  // Premium Gold Accents
  goldGradient: "linear-gradient(135deg, #D4AF37 0%, #F59E0B 50%, #B8860B 100%)",
  goldSolid: "#F59E0B",
  // Text Colors
  textMain: "#FFFFFF",
  textMuted: "rgba(255, 255, 255, 0.5)",
  glassBorder: "rgba(245, 158, 11, 0.15)",
  cardDark: "rgba(255, 255, 255, 0.03)",
} as const;

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface QuickLink {
  id: string;
  label: string;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const QUICK_LINKS: QuickLink[] = [
  { id: "hero",         label: "Home"         },
  { id: "about",        label: "Our Story"    },
  { id: "programs",     label: "Programs"     },
  { id: "testimonials", label: "Impact"       },
  { id: "contact",      label: "Contact"      },
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
          gap: "0.75rem",
          color: hovered ? THEME.goldSolid : THEME.textMuted,
          fontSize: "0.85rem",
          fontWeight: 500,
          fontFamily: "'DM Sans', sans-serif",
          transition: "all 0.3s ease",
        }}
      >
        <span style={{
          display: "inline-block",
          width: hovered ? "20px" : "0px",
          height: "1px",
          background: THEME.goldSolid,
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
        width: "42px", height: "42px",
        borderRadius: "12px",
        border: `1px solid ${THEME.glassBorder}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: hovered ? "transparent" : "rgba(255,255,255,0.03)",
        backgroundImage: hovered ? THEME.goldGradient : "none",
        color: hovered ? "#000" : THEME.goldSolid,
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        boxShadow: hovered ? "0 10px 20px rgba(245, 158, 11, 0.2)" : "none",
        flexShrink: 0,
        textDecoration: "none",
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,600&family=DM+Sans:wght@400;500;700&display=swap');

        .ft-grid {
          display: grid;
          grid-template-columns: 1.4fr 0.8fr 0.8fr 1.2fr;
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

        @media (max-width: 1024px) {
          .ft-grid { grid-template-columns: 1fr 1fr !important; gap: 3rem !important; }
        }

        @media (max-width: 600px) {
          .ft-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .ft-bottom { flex-direction: column; text-align: center; }
        }
      `}</style>

      <footer style={{
        position: "relative",
        background: THEME.bgDark,
        color: THEME.textMain,
        paddingTop: "8rem",
        paddingBottom: "3rem",
        overflow: "hidden",
        borderTop: `1px solid ${THEME.glassBorder}`,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {/* Ambient Top Glow to match Hero orbs */}
        <div style={{
          position: "absolute",
          top: 0, left: "50%",
          transform: "translateX(-50%)",
          width: "100%", height: "400px",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.07) 0%, transparent 70%)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 2 }}>

          <div className="ft-grid">
            {/* 01. Brand */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2.2rem",
                  fontWeight: 700,
                  lineHeight: 1,
                  color: "#fff",
                }}>
                  Generous{" "}
                  <span style={{
                    fontStyle: "italic",
                    backgroundImage: THEME.goldGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}>Hands</span>
                </span>
                <span style={{
                  fontSize: "0.6rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.45em",
                  color: THEME.goldSolid,
                  marginTop: "0.5rem",
                }}>
                  Foundation
                </span>
              </div>

              <p style={{
                color: THEME.textMuted,
                fontSize: "0.95rem",
                lineHeight: 1.8,
                maxWidth: "300px",
              }}>
                Empowering the next generation of women in Nigeria through education, resources, and community-led support.
              </p>

              <div style={{ display: "flex", gap: "0.85rem" }}>
                <SocialIcon href="https://instagram.com/generoushelpinghands" icon={Instagram} />
                <SocialIcon href="mailto:Giversgenerous@gmail.com" icon={Mail} />
              </div>
            </div>

            {/* 02. Navigation */}
            <div>
              <h3 style={{
                fontSize: "0.7rem",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: THEME.goldSolid,
                marginBottom: "2.5rem",
              }}>
                Navigation
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {QUICK_LINKS.map((link) => (
                  <NavLink key={link.id} link={link} onScroll={scrollToSection} />
                ))}
              </ul>
            </div>

            {/* 03. Headquarters */}
            <div>
              <h3 style={{
                fontSize: "0.7rem",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: THEME.goldSolid,
                marginBottom: "2.5rem",
              }}>
                Headquarters
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "2rem" }}>
                <li style={{ display: "flex", gap: "1.25rem" }}>
                  <MapPin size={20} color={THEME.goldSolid} style={{ flexShrink: 0 }} />
                  <span style={{ color: "#fff", fontSize: "0.9rem", lineHeight: 1.6 }}>
                    Lagos, Nigeria
                    <span style={{
                      display: "block",
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      color: THEME.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      marginTop: "0.4rem",
                    }}>
                      West Africa Ops
                    </span>
                  </span>
                </li>
                <li style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
                  <Phone size={20} color={THEME.goldSolid} style={{ flexShrink: 0 }} />
                  <a
                    href="tel:+2349036854354"
                    style={{
                      color: "#fff",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = THEME.goldSolid)}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#fff")}
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
                padding: "2.5rem",
                borderRadius: "2.5rem",
                background: "rgba(255,255,255,0.02)",
                border: `1px solid ${THEME.glassBorder}`,
                overflow: "hidden",
                backdropFilter: "blur(10px)",
              }}
            >
              <div style={{
                position: "absolute", top: "-10px", right: "-10px",
                opacity: 0.15,
                transform: ctaHovered ? "rotate(15deg) scale(1.1)" : "rotate(0deg)",
                transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                pointerEvents: "none",
              }}>
                <Sparkles size={80} color={THEME.goldSolid} />
              </div>

              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.4rem",
                fontWeight: 700,
                fontStyle: "italic",
                color: "#fff",
                marginBottom: "1rem",
              }}>
                Fuel the Change
              </h3>
              <p style={{
                color: THEME.textMuted,
                fontSize: "0.85rem",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}>
                Your contributions directly fund our grassroots empowerment initiatives.
              </p>

              <motion.button
                whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(245, 158, 11, 0.3)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection("donation")}
                style={{
                  width: "100%",
                  padding: "1.1rem",
                  backgroundImage: THEME.goldGradient,
                  color: "#000",
                  border: "none",
                  borderRadius: "1rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
                }}
              >
                Donate Now <ArrowUpRight size={16} />
              </motion.button>
            </div>
          </div>

          {/* ── BOTTOM BAR ── */}
          <div style={{ paddingTop: "3rem", borderTop: `1px solid ${THEME.glassBorder}` }}>
            <div className="ft-bottom">
              <p style={{
                fontSize: "0.65rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: THEME.textMuted,
              }}>
                © {new Date().getFullYear()} Generous Helping Hands Foundation.
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "0.6rem",
                  fontSize: "0.65rem", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.2em",
                  color: "#fff",
                }}>
                  <span>Legacy of</span>
                  <Heart size={14} fill={THEME.goldSolid} color={THEME.goldSolid} />
                  <span>Compassion</span>
                </div>
                <div style={{ height: "16px", width: "1px", background: THEME.glassBorder }} />
                <span style={{ fontSize: "0.65rem", fontWeight: 700, color: THEME.textMuted }}>
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