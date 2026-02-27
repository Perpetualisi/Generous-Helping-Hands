import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail, Phone, Share2, MapPin, Heart, ArrowRight,
  Sparkles, Globe, Clock
} from "lucide-react";

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
interface ContactInfo { icon: React.ElementType; title: string; content: string; link?: string; sub?: string; }

const CONTACT_INFO: ContactInfo[] = [
  { icon: Phone,  title: "Phone",        content: "+234 903 685 4354",       link: "tel:+2349036854354",                          sub: "Mon–Fri, 9am–5pm WAT" },
  { icon: Mail,   title: "Email",        content: "Giversgenerous@gmail.com", link: "mailto:Giversgenerous@gmail.com",              sub: "We reply within 24hrs" },
  { icon: Share2, title: "Social Media", content: "@GenerousHelpingHands",    link: "https://instagram.com/generoushelpinghands",   sub: "Follow our journey" },
  { icon: MapPin, title: "Location",     content: "Lagos, Nigeria",           sub: "Serving communities nationwide" },
];

const SOCIALS = [
  { icon: Mail,   label: "Instagram", href: "https://instagram.com/generoushelpinghands" },
  { icon: Share2, label: "Facebook",  href: "#" },
  { icon: Globe,  label: "Twitter",   href: "#" },
];

const QUICK_LINKS = [
  { label: "Our Programs",  href: "#ourprograms" },
  { label: "Volunteer",     href: "#volunteer"   },
  { label: "Donate",        href: "#donation"    },
  { label: "Impact Report", href: "#"            },
];

const STATS = [
  { v: "500+", l: "Lives touched"   },
  { v: "10+",  l: "Active programs" },
  { v: "8+",   l: "Communities"     },
  { v: "2014", l: "Founded"         },
];

// ─── CONTACT ROW ─────────────────────────────────────────────────────────────
const ContactRow: React.FC<{ info: ContactInfo }> = ({ info }) => {
  const [hov, setHov] = useState(false);
  const Icon = info.icon;
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: "1rem",
        padding: "0.9rem 0.75rem", borderRadius: 16,
        background: hov ? "rgba(245,158,11,0.06)" : "transparent",
        transition: "background 0.25s ease", cursor: "default",
      }}
    >
      <div style={{
        width: 44, height: 44, flexShrink: 0, borderRadius: 13,
        background: hov ? C.gradient : "rgba(245,158,11,0.1)",
        border: `1px solid ${hov ? "transparent" : C.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.3s ease",
        boxShadow: hov ? "0 6px 20px rgba(245,158,11,0.3)" : "none",
      }}>
        <Icon size={17} color={hov ? "#fff" : C.gold} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.56rem",
          fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em",
          color: C.textFaint, marginBottom: "0.2rem",
        }}>{info.title}</p>
        {info.link ? (
          <a href={info.link} target={info.link.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer" style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 500,
              color: hov ? C.gold : C.text, display: "block",
              textDecoration: "none", transition: "color 0.25s ease",
              wordBreak: "break-all", lineHeight: 1.3,
            }}>{info.content}</a>
        ) : (
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 500,
            color: C.text, lineHeight: 1.3,
          }}>{info.content}</p>
        )}
        {info.sub && (
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem",
            color: C.textFaint, marginTop: "0.15rem", display: "flex", alignItems: "center", gap: "0.3rem",
          }}>
            <Clock size={9} color={C.textFaint} />{info.sub}
          </p>
        )}
      </div>
    </div>
  );
};

// ─── CONTACT SECTION ─────────────────────────────────────────────────────────
const Contact: React.FC = () => {
  const [ctaHov, setCtaHov] = useState(false);

  return (
    <section
      id="contact"
      style={{ background: C.bg, color: C.text, position: "relative", overflow: "hidden", padding: "8rem 6% 5rem" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: rgba(245,158,11,0.25); color: #fff; }

        .ct-main-grid   { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .ct-bottom-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem; margin-top: 1.5rem; }
        .ct-cta-btns    { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }

        @media (max-width: 1024px) {
          .ct-main-grid   { grid-template-columns: 1fr; }
          .ct-bottom-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .ct-bottom-grid { grid-template-columns: 1fr; }
          .ct-cta-btns    { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Ambient glows */}
      <div style={{
        position: "absolute", top: "-15%", left: "-5%",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 60%)",
        filter: "blur(90px)", pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "absolute", bottom: "-10%", right: "-5%",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(234,88,12,0.06) 0%, transparent 65%)",
        filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── HEADER ── */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.4rem 1rem", borderRadius: 100,
              border: `1px solid ${C.border}`, background: "rgba(245,158,11,0.06)",
              marginBottom: "1.5rem",
            }}
          >
            <Heart size={11} color={C.gold} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: C.gold }}>
              Connect With Us
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)",
              fontWeight: 700, lineHeight: 1.05,
              color: C.text, marginBottom: "1rem",
            }}
          >
            Get in{" "}
            <em style={{
              fontStyle: "italic", fontWeight: 400,
              background: `linear-gradient(135deg, ${C.gold}, ${C.orange})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Touch.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            style={{
              maxWidth: 480, margin: "0 auto",
              fontFamily: "'DM Sans', sans-serif", fontSize: "1rem",
              lineHeight: 1.75, fontWeight: 300, color: C.textMuted,
            }}
          >
            Together, we can create a brighter future for women and girls everywhere.
          </motion.p>
        </div>

        {/* ── MINI STATS BAR ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{
            display: "flex", justifyContent: "center",
            gap: 0, marginBottom: "3.5rem",
            background: C.bgCard, border: `1px solid ${C.border}`,
            borderRadius: 16, padding: "1.25rem 2rem",
            flexWrap: "wrap",
          }}
        >
          {STATS.map((s, i) => (
            <React.Fragment key={i}>
              <div style={{ textAlign: "center", padding: "0.25rem 2rem" }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem",
                  fontWeight: 700, lineHeight: 1,
                  background: `linear-gradient(135deg, ${C.gold}, #fff 70%)`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>{s.v}</div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem",
                  fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.15em", color: C.textFaint, marginTop: 3,
                }}>{s.l}</div>
              </div>
              {i < STATS.length - 1 && (
                <div style={{ width: 1, background: C.border, margin: "0.25rem 0", alignSelf: "stretch" }} />
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* ── CONTACT INFO CARD (full width now) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: C.bgCard, border: `1px solid ${C.border}`,
            borderRadius: 24, padding: "2.5rem",
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
            position: "relative", overflow: "hidden",
            marginBottom: "1.5rem",
          }}
        >
          {/* Top gold line */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, ${C.gold}, transparent)`,
          }} />

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
            <div style={{
              width: 38, height: 38, borderRadius: 11,
              background: "rgba(245,158,11,0.1)", border: `1px solid ${C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Mail size={16} color={C.gold} />
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: C.text }}>
              Inquiries
            </h3>
          </div>

          {/* Contact rows in a 2-col grid on wider screens */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "0.25rem",
          }}>
            {CONTACT_INFO.map((info, i) => <ContactRow key={i} info={info} />)}
          </div>

          {/* Social links */}
          <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: `1px solid ${C.border}` }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.56rem",
              fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.25em",
              color: C.textFaint, marginBottom: "0.9rem",
            }}>Follow Our Journey</p>
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label} href={href} target="_blank" rel="noreferrer"
                  whileHover={{ y: -3, borderColor: C.borderHov }}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.5rem 0.9rem", borderRadius: 100,
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${C.border}`,
                    textDecoration: "none", color: C.textMuted,
                    fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem",
                    fontWeight: 600, letterSpacing: "0.05em",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = C.textMuted)}
                >
                  <Icon size={13} color={C.gold} />{label}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── BOTTOM 3-COL GRID ── */}
        <div className="ct-bottom-grid">

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
            onMouseEnter={() => setCtaHov(true)}
            onMouseLeave={() => setCtaHov(false)}
            style={{
              position: "relative", overflow: "hidden",
              borderRadius: 24, padding: "2.5rem",
              background: C.gradient,
              boxShadow: ctaHov ? "0 24px 60px rgba(245,158,11,0.35)" : "0 12px 40px rgba(245,158,11,0.2)",
              transition: "box-shadow 0.4s ease",
            }}
          >
            <div style={{
              position: "absolute", top: -20, right: -20, opacity: 0.1,
              transform: ctaHov ? "scale(1.15) rotate(15deg)" : "scale(1) rotate(0deg)",
              transition: "transform 0.6s ease",
              pointerEvents: "none",
            }}>
              <Sparkles size={180} />
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem",
                fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.25em",
                color: "rgba(255,255,255,0.6)", marginBottom: "0.75rem",
              }}>Support Our Mission</p>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.7rem", fontWeight: 700, fontStyle: "italic",
                color: "#fff", lineHeight: 1.2, marginBottom: "0.75rem",
              }}>Ready to Make a Difference?</h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
                color: "rgba(255,255,255,0.75)", fontWeight: 300,
                lineHeight: 1.6, marginBottom: "1.75rem",
              }}>Join us in empowering women and girls through direct action.</p>
              <div className="ct-cta-btns">
                <motion.a
                  href="#donation" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}
                  style={{
                    background: "#131110", color: "#fff", borderRadius: 100,
                    padding: "0.85rem 1rem", textAlign: "center",
                    fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem",
                    fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
                    textDecoration: "none", boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                  }}
                >Donate <ArrowRight size={13} /></motion.a>
                <motion.a
                  href="#volunteer" whileHover={{ y: -3, background: "rgba(255,255,255,0.18)" }} whileTap={{ scale: 0.97 }}
                  style={{
                    background: "rgba(255,255,255,0.12)", color: "#fff", borderRadius: 100,
                    padding: "0.85rem 1rem", textAlign: "center",
                    fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem",
                    fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                    border: "1px solid rgba(255,255,255,0.25)", textDecoration: "none",
                    transition: "background 0.25s ease",
                  }}
                >Volunteer</motion.a>
              </div>
            </div>
          </motion.div>

          {/* Quick Links card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              background: C.bgCard, border: `1px solid ${C.border}`,
              borderRadius: 24, padding: "2.5rem",
              boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.75rem" }}>
              <Globe size={15} color={C.gold} />
              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 700, color: C.text }}>
                Quick Links
              </h4>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              {QUICK_LINKS.map(({ label, href }) => (
                <motion.a
                  key={label} href={href}
                  whileHover={{ x: 6 }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "0.75rem 0.75rem", borderRadius: 10,
                    fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
                    color: C.textMuted, textDecoration: "none",
                    transition: "all 0.2s ease",
                    border: "1px solid transparent",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = C.text;
                    e.currentTarget.style.background = "rgba(245,158,11,0.05)";
                    e.currentTarget.style.borderColor = C.border;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = C.textMuted;
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                >
                  <span>{label}</span>
                  <ArrowRight size={13} color={C.gold} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Map / Location card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              background: C.bgCard, border: `1px solid ${C.border}`,
              borderRadius: 24, overflow: "hidden",
              boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
              position: "relative", minHeight: 220,
            }}
          >
            <div style={{
              position: "absolute", inset: 0,
              background: `repeating-linear-gradient(
                0deg, transparent, transparent 39px,
                rgba(245,158,11,0.04) 39px, rgba(245,158,11,0.04) 40px
              ), repeating-linear-gradient(
                90deg, transparent, transparent 39px,
                rgba(245,158,11,0.04) 39px, rgba(245,158,11,0.04) 40px
              )`,
            }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(circle at 50% 50%, rgba(245,158,11,0.08) 0%, transparent 60%)",
            }} />
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -60%)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem",
            }}>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: C.gradient,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 8px 30px rgba(245,158,11,0.5)",
                }}
              >
                <MapPin size={20} color="#fff" fill="#fff" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 2], opacity: [0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                style={{
                  position: "absolute", top: 0,
                  width: 44, height: 44, borderRadius: "50%",
                  border: `2px solid ${C.gold}`,
                }}
              />
            </div>
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(to top, rgba(20,17,14,0.96) 0%, transparent 100%)",
              padding: "1.5rem 1.5rem 1.25rem",
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.1rem", fontWeight: 700, color: C.text,
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}>
                <MapPin size={14} color={C.gold} /> Lagos, Nigeria
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem",
                color: C.textFaint, marginTop: "0.2rem",
              }}>Serving communities nationwide</p>
            </div>
          </motion.div>
        </div>

        {/* ── BOTTOM COPYRIGHT ── */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginTop: "4rem", textAlign: "center" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", maxWidth: 300, margin: "0 auto 1.25rem" }}>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${C.border})` }} />
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.gold, opacity: 0.4 }} />
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${C.border}, transparent)` }} />
          </div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem",
            letterSpacing: "0.15em", textTransform: "uppercase", color: C.textFaint,
          }}>© 2026 Generous Helping Hands Foundation · All Rights Reserved</p>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;