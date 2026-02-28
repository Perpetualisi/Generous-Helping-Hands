import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail, Phone, MapPin, Instagram, Facebook, Twitter,
  Heart, ArrowUpRight, Sparkles, ArrowRight, Globe
} from "lucide-react";

// ─── THEME ────────────────────────────────────────────────────────────────────
const C = {
  bg:        "#1a1714",
  bgDeep:    "#131110",
  bgCard:    "#211e1a",
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

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { id: "hero",         label: "Home"         },
  { id: "whyitmatters", label: "Why We Exist" },
  { id: "ourstory",     label: "Our Story"    },
  { id: "ourprograms",  label: "Programs"     },
  { id: "events",       label: "Events"       },
  { id: "testimonials", label: "Impact"       },
  { id: "contact",      label: "Contact"      },
];

const GET_INVOLVED = [
  { id: "volunteer", label: "Volunteer"     },
  { id: "donation",  label: "Donate"        },
  { id: "events",    label: "Attend Events" },
  { id: "contact",   label: "Partner With Us" },
];

const SOCIALS = [
  { href: "https://instagram.com/generoushelpinghands", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Facebook,  label: "Facebook"  },
  { href: "#", icon: Twitter,   label: "Twitter"   },
  { href: "mailto:Giversgenerous@gmail.com", icon: Mail, label: "Email" },
];

// ─── NAV LINK ─────────────────────────────────────────────────────────────────
const NavLink: React.FC<{ id: string; label: string; onScroll: (id: string) => void }> = ({ id, label, onScroll }) => {
  const [hov, setHov] = useState(false);
  return (
    <li>
      <button
        onClick={() => onScroll(id)}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: "transparent", border: "none", padding: 0,
          cursor: "pointer", display: "flex", alignItems: "center", gap: "0.6rem",
          color: hov ? C.gold : C.textMuted,
          fontSize: "0.85rem", fontWeight: 500,
          fontFamily: "'DM Sans', sans-serif",
          transition: "color 0.25s ease",
        }}
      >
        <motion.span
          animate={{ width: hov ? 18 : 0, opacity: hov ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            display: "inline-block", height: 1,
            background: C.gradient, borderRadius: 1, flexShrink: 0,
            overflow: "hidden",
          }}
        />
        {label}
      </button>
    </li>
  );
};

// ─── SOCIAL ICON ─────────────────────────────────────────────────────────────
const SocialBtn: React.FC<{ href: string; icon: React.ElementType; label: string }> = ({ href, icon: Icon, label }) => {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href={href} target="_blank" rel="noreferrer"
      whileHover={{ y: -4 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 42, height: 42, borderRadius: 13,
        border: `1px solid ${hov ? C.borderHov : C.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: hov ? C.gradient : "rgba(255,255,255,0.03)",
        color: hov ? "#fff" : C.gold,
        transition: "all 0.3s ease",
        boxShadow: hov ? "0 8px 24px rgba(245,158,11,0.3)" : "none",
        textDecoration: "none", flexShrink: 0,
        title: label,
      } as React.CSSProperties}
    >
      <Icon size={17} />
    </motion.a>
  );
};

// ─── SECTION HEADING ─────────────────────────────────────────────────────────
const ColHead: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "2rem" }}>
    <div style={{ width: 16, height: 1.5, background: C.gradient, borderRadius: 1 }} />
    <h3 style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.58rem", fontWeight: 800,
      textTransform: "uppercase", letterSpacing: "0.35em",
      color: C.gold, margin: 0,
    }}>{children}</h3>
  </div>
);

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer: React.FC = () => {
  const [ctaHov, setCtaHov] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .ft-grid {
          display: grid;
          grid-template-columns: 1.6fr 0.7fr 0.7fr 1.3fr;
          gap: 3.5rem;
          margin-bottom: 5rem;
        }
        .ft-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        @media (max-width: 1200px) {
          .ft-grid { grid-template-columns: 1fr 1fr !important; gap: 3rem !important; }
        }
        @media (max-width: 640px) {
          .ft-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .ft-bottom { flex-direction: column !important; text-align: center !important; }
        }
      `}</style>

      <footer style={{
        position: "relative",
        background: C.bgDeep,
        color: C.text,
        paddingTop: "7rem",
        paddingBottom: "3rem",
        overflow: "hidden",
        borderTop: `1px solid ${C.border}`,
        fontFamily: "'DM Sans', sans-serif",
      }}>

        {/* ── AMBIENT GLOWS ── */}
        <div style={{
          position: "absolute", top: 0, left: "50%",
          transform: "translateX(-50%)",
          width: "80%", height: 500,
          background: "radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 70%)",
          filter: "blur(80px)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: 0, right: "-10%",
          width: 400, height: 400,
          background: "radial-gradient(circle, rgba(234,88,12,0.05) 0%, transparent 65%)",
          filter: "blur(80px)", pointerEvents: "none",
        }} />

        {/* ── MARQUEE STRIP ── */}
        <div style={{
          overflow: "hidden",
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
          padding: "12px 0", marginBottom: "6rem",
          background: "rgba(245,158,11,0.03)",
          position: "relative", zIndex: 2,
        }}>
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 28, repeat: Infinity }}
            style={{ display: "flex", gap: "3rem", whiteSpace: "nowrap" }}
          >
            {[...Array(16)].map((_, i) => (
              <span key={i} style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.65rem", letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: i % 2 === 0 ? C.gold : C.textFaint,
                fontStyle: i % 2 === 0 ? "italic" : "normal",
              }}>
                {["Empower", "Transform", "Uplift", "Inspire", "Unite", "Rise"][i % 6]}&nbsp;{i % 2 === 0 ? "✦" : "◦"}
              </span>
            ))}
          </motion.div>
        </div>

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 6%", position: "relative", zIndex: 2 }}>

          <div className="ft-grid">

            {/* ── COL 1: BRAND ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              <div>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2rem", fontWeight: 700, lineHeight: 1, color: C.text,
                  display: "block",
                }}>
                  Generous{" "}
                  <em style={{
                    fontStyle: "italic",
                    background: C.gradient,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>Hands</em>
                </span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.55rem", fontWeight: 800,
                  textTransform: "uppercase", letterSpacing: "0.45em",
                  color: C.gold, marginTop: "0.4rem", display: "block",
                }}>Foundation</span>
              </div>

              <p style={{
                color: C.textMuted, fontSize: "0.9rem", lineHeight: 1.8,
                maxWidth: 280, fontWeight: 300,
              }}>
                Empowering the next generation of women in Nigeria through education, resources, and community-led support.
              </p>

              {/* Social row */}
              <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                {SOCIALS.map(s => <SocialBtn key={s.label} {...s} />)}
              </div>

              {/* Newsletter mini-widget */}
              <div style={{
                background: C.bgCard, border: `1px solid ${C.border}`,
                borderRadius: 16, padding: "1.25rem",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, ${C.gold}, transparent)`,
                }} />
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem",
                  fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
                  color: C.gold, marginBottom: "0.75rem",
                }}>Stay Updated</p>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="email" placeholder="Your email"
                    style={{
                      flex: 1, background: "rgba(255,255,255,0.04)",
                      border: `1px solid ${C.border}`, borderRadius: 10,
                      padding: "0.6rem 0.75rem",
                      color: C.text, fontSize: "0.8rem",
                      fontFamily: "'DM Sans', sans-serif", outline: "none",
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = C.borderHov}
                    onBlur={e => e.currentTarget.style.borderColor = C.border}
                  />
                  <motion.button
                    whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}
                    style={{
                      background: C.gradient, border: "none",
                      borderRadius: 10, padding: "0.6rem 0.9rem",
                      cursor: "pointer", flexShrink: 0,
                      display: "flex", alignItems: "center",
                      boxShadow: "0 4px 14px rgba(245,158,11,0.3)",
                    }}
                  >
                    <ArrowRight size={14} color="#fff" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* ── COL 2: NAVIGATION ── */}
            <div>
              <ColHead>Navigation</ColHead>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                {NAV_LINKS.map(l => <NavLink key={l.id} {...l} onScroll={scrollTo} />)}
              </ul>
            </div>

            {/* ── COL 3: GET INVOLVED ── */}
            <div>
              <ColHead>Get Involved</ColHead>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                {GET_INVOLVED.map(l => <NavLink key={l.id} {...l} onScroll={scrollTo} />)}
              </ul>

              {/* Contact details */}
              <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                {[
                  { icon: MapPin, text: "Lagos, Nigeria",               sub: "West Africa Ops"         },
                  { icon: Phone,  text: "+234 903 685 4354",             sub: "Mon–Fri, 9am–5pm WAT",   href: "tel:+2349036854354" },
                  { icon: Globe,  text: "Giversgenerous@gmail.com",      sub: "We reply within 24hrs",  href: "mailto:Giversgenerous@gmail.com" },
                ].map(({ icon: Icon, text, sub, href }, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 9,
                      background: "rgba(245,158,11,0.08)",
                      border: `1px solid ${C.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Icon size={13} color={C.gold} />
                    </div>
                    <div>
                      {href ? (
                        <a href={href} style={{
                          color: C.text, fontSize: "0.82rem", fontWeight: 500,
                          textDecoration: "none", display: "block",
                          transition: "color 0.2s",
                          wordBreak: "break-all",
                        }}
                          onMouseEnter={e => e.currentTarget.style.color = C.gold}
                          onMouseLeave={e => e.currentTarget.style.color = C.text}
                        >{text}</a>
                      ) : (
                        <span style={{ color: C.text, fontSize: "0.82rem", fontWeight: 500 }}>{text}</span>
                      )}
                      <span style={{
                        display: "block", fontSize: "0.6rem",
                        color: C.textFaint, marginTop: 2, letterSpacing: "0.05em",
                      }}>{sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── COL 4: CTA CARD ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Donate card */}
              <motion.div
                onMouseEnter={() => setCtaHov(true)}
                onMouseLeave={() => setCtaHov(false)}
                style={{
                  position: "relative", overflow: "hidden",
                  padding: "2.25rem", borderRadius: 24,
                  background: C.gradient,
                  boxShadow: ctaHov
                    ? "0 24px 60px rgba(245,158,11,0.4)"
                    : "0 12px 40px rgba(245,158,11,0.2)",
                  transition: "box-shadow 0.4s ease",
                  flex: 1,
                }}
              >
                <div style={{
                  position: "absolute", top: -16, right: -16, opacity: 0.1,
                  transform: ctaHov ? "rotate(20deg) scale(1.15)" : "rotate(0deg) scale(1)",
                  transition: "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  pointerEvents: "none",
                }}>
                  <Sparkles size={140} />
                </div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <p style={{
                    fontSize: "0.55rem", fontWeight: 700,
                    letterSpacing: "0.3em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.65)", marginBottom: "0.6rem",
                    fontFamily: "'DM Sans', sans-serif",
                  }}>Support the Mission</p>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.5rem", fontWeight: 700, fontStyle: "italic",
                    color: "#fff", lineHeight: 1.2, marginBottom: "0.75rem",
                  }}>Fuel the Change</h3>
                  <p style={{
                    color: "rgba(255,255,255,0.75)", fontSize: "0.82rem",
                    lineHeight: 1.65, marginBottom: "1.5rem", fontWeight: 300,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    Your contributions directly fund grassroots empowerment initiatives across Nigeria.
                  </p>
                  <motion.button
                    whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}
                    onClick={() => scrollTo("donation")}
                    style={{
                      width: "100%", padding: "0.9rem",
                      background: "#131110", color: "#fff",
                      border: "none", borderRadius: 12,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.68rem", fontWeight: 800,
                      textTransform: "uppercase", letterSpacing: "0.15em",
                      cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
                    }}
                  >
                    Donate Now <ArrowUpRight size={14} />
                  </motion.button>
                </div>
              </motion.div>

              {/* Stats mini-card */}
              <div style={{
                background: C.bgCard, border: `1px solid ${C.border}`,
                borderRadius: 20, padding: "1.5rem",
                display: "grid", gridTemplateColumns: "1fr 1fr",
                gap: "0.1rem",
              }}>
                {[
                  { v: "500+", l: "Lives" },
                  { v: "10+",  l: "Programs" },
                  { v: "8+",   l: "Communities" },
                  { v: "2014", l: "Founded" },
                ].map(({ v, l }, i) => (
                  <div key={i} style={{
                    textAlign: "center", padding: "0.75rem 0.5rem",
                    borderRight: i % 2 === 0 ? `1px solid ${C.border}` : "none",
                    borderBottom: i < 2 ? `1px solid ${C.border}` : "none",
                  }}>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.4rem", fontWeight: 700, lineHeight: 1,
                      background: `linear-gradient(135deg, ${C.gold}, #fff 70%)`,
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>{v}</div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: "0.52rem",
                      fontWeight: 700, textTransform: "uppercase",
                      letterSpacing: "0.15em", color: C.textFaint, marginTop: 3,
                    }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── BOTTOM BAR ── */}
          <div style={{ paddingTop: "2.5rem", borderTop: `1px solid ${C.border}` }}>
            <div className="ft-bottom">
              <p style={{
                fontSize: "0.58rem", fontWeight: 600,
                textTransform: "uppercase", letterSpacing: "0.15em",
                color: C.textFaint,
              }}>
                © {new Date().getFullYear()} Generous Helping Hands Foundation · All Rights Reserved
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap", justifyContent: "center" }}>
                {["Privacy Policy", "Terms of Use", "RC: 123456789"].map((item, i) => (
                  <React.Fragment key={item}>
                    <span style={{
                      fontSize: "0.58rem", fontWeight: 600,
                      textTransform: "uppercase", letterSpacing: "0.1em",
                      color: i < 2 ? C.textMuted : C.textFaint,
                      cursor: i < 2 ? "pointer" : "default",
                      transition: "color 0.2s",
                    }}
                      onMouseEnter={e => i < 2 && (e.currentTarget.style.color = C.gold)}
                      onMouseLeave={e => i < 2 && (e.currentTarget.style.color = C.textMuted)}
                    >{item}</span>
                    {i < 2 && <div style={{ width: 1, height: 12, background: C.border }} />}
                  </React.Fragment>
                ))}
                <div style={{ width: 1, height: 12, background: C.border }} />
                <div style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  fontSize: "0.58rem", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.15em", color: C.text,
                }}>
                  Legacy of <Heart size={12} fill={C.gold} color={C.gold} /> Compassion
                </div>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;