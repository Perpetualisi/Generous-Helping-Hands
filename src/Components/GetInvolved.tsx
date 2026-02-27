import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Mail, Heart, Gift, Instagram,
  Users, ChevronDown, Sparkles,
  ExternalLink, ArrowRight, ShieldCheck,
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
  borderHov: "rgba(245,158,11,0.32)",
  gradient:  "linear-gradient(135deg, #F59E0B, #EA580C)",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
interface ContactMethod { icon: React.ElementType; label: string; href: string; display: string; }
interface DonationMethod { icon: React.ElementType; title: string; description: string; }
interface FAQItem { question: string; answer: string; }

const CONTACT_METHODS: ContactMethod[] = [
  { icon: Mail,      label: "Email",     href: "mailto:Giversgenerous@gmail.com",       display: "Giversgenerous@gmail.com" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/GenerousHands",   display: "@GenerousHands"           },
];

const DONATION_METHODS: DonationMethod[] = [
  { icon: Heart, title: "Direct Support",  description: "Secure bank details for direct transfers. 100% of funds go to field operations."         },
  { icon: Gift,  title: "In-Kind Giving",  description: "Books, clothing, or professional skills that empower our communities."                   },
];

const FAQS: FAQItem[] = [
  { question: "How are donations used?",           answer: "100% of public donations go directly toward our core programs — school fees for girls, start-up support for women-led businesses, and community health outreach." },
  { question: "Can I donate from outside Nigeria?", answer: "Yes. We accept international transfers via SWIFT/IBAN. Contact us for specific routing details." },
];

// ─── EYEBROW ──────────────────────────────────────────────────────────────────
const Eyebrow: React.FC<{ icon: React.ElementType; children: React.ReactNode }> = ({ icon: Icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    style={{
      display: "inline-flex", alignItems: "center", gap: "0.5rem",
      padding: "0.4rem 1rem", borderRadius: 100,
      border: `1px solid ${C.border}`,
      background: "rgba(245,158,11,0.06)",
      marginBottom: "1.5rem",
    }}
  >
    <Icon size={11} color={C.gold} />
    <span style={{
      fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem",
      fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase",
      color: C.gold, whiteSpace: "nowrap",
    }}>{children}</span>
  </motion.div>
);

// ─── 3D PHOTO ─────────────────────────────────────────────────────────────────
const PremiumPhoto: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const xs = useSpring(mx, { stiffness: 120, damping: 20 });
  const ys = useSpring(my, { stiffness: 120, damping: 20 });
  const rotX = useTransform(ys, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotY = useTransform(xs, [-0.5, 0.5], ["-5deg", "5deg"]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (r) { mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { mx.set(0); my.set(0); setHovered(false); }}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", position: "relative", maxWidth: 420, margin: "0 auto", width: "100%" }}
    >
      {/* Halo */}
      <div style={{
        position: "absolute", inset: -24,
        background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)",
        filter: "blur(40px)", borderRadius: 60, opacity: hovered ? 1 : 0.4,
        transition: "opacity 0.6s ease", pointerEvents: "none", zIndex: 0,
      }} />
      {/* Rotated bg frame */}
      <div style={{
        position: "absolute", inset: -6,
        background: "rgba(245,158,11,0.05)",
        border: `1px solid ${C.border}`,
        borderRadius: 36, transform: "rotate(2deg)",
        zIndex: 0,
      }} />
      {/* Card */}
      <div style={{
        position: "relative", zIndex: 1,
        padding: 6, borderRadius: 32,
        overflow: "hidden",
        border: `1px solid ${C.border}`,
        background: C.bgCard,
        boxShadow: "0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}>
        <img
          src={src} alt={alt}
          style={{
            width: "100%", aspectRatio: "1/1",
            objectFit: "cover", display: "block",
            borderRadius: 28,
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.7s ease",
            filter: "saturate(0.85) contrast(1.05)",
          }}
        />
        {/* Cinematic overlay */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 28,
          background: "linear-gradient(160deg, rgba(245,158,11,0.06) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)",
          pointerEvents: "none",
        }} />
      </div>
    </motion.div>
  );
};

// ─── CONTACT CARD ─────────────────────────────────────────────────────────────
const ContactCard: React.FC<{ method: ContactMethod }> = ({ method: m }) => {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={m.href}
      target={m.href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.1rem 1.25rem", borderRadius: 16,
        background: C.bgCard,
        border: `1px solid ${hov ? C.borderHov : C.border}`,
        transition: "border-color 0.25s ease, background 0.25s ease",
        textDecoration: "none",
        ...(hov ? { background: "rgba(245,158,11,0.05)" } : {}),
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div style={{
          width: 42, height: 42, borderRadius: 12, flexShrink: 0,
          background: "rgba(245,158,11,0.08)",
          border: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <m.icon size={17} color={C.gold} />
        </div>
        <div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.52rem",
            fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em",
            color: C.textFaint, marginBottom: 3,
          }}>{m.label}</p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
            color: hov ? "#fff" : C.textMuted, fontWeight: 500,
            transition: "color 0.2s",
          }}>{m.display}</p>
        </div>
      </div>
      <ExternalLink size={14} color={hov ? C.gold : C.textFaint} style={{ transition: "color 0.2s", flexShrink: 0 }} />
    </a>
  );
};

// ─── DONATION METHOD ROW ──────────────────────────────────────────────────────
const DonationRow: React.FC<{ m: DonationMethod }> = ({ m }) => (
  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
    <div style={{
      flexShrink: 0, width: 40, height: 40, borderRadius: 12,
      background: "rgba(245,158,11,0.08)",
      border: `1px solid ${C.border}`,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <m.icon size={16} color={C.gold} />
    </div>
    <div>
      <h4 style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem",
        fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em",
        color: "rgba(255,255,255,0.7)", marginBottom: "0.35rem",
      }}>{m.title}</h4>
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
        color: C.textMuted, lineHeight: 1.7, fontWeight: 300,
      }}>{m.description}</p>
    </div>
  </div>
);

// ─── FAQ ACCORDION ────────────────────────────────────────────────────────────
const FAQAccordion: React.FC<{ faq: FAQItem; open: boolean; onToggle: () => void }> = ({ faq, open, onToggle }) => {
  const [hov, setHov] = useState(false);
  return (
    <div style={{
      background: C.bgCard,
      border: `1px solid ${open || hov ? C.borderHov : C.border}`,
      borderRadius: 18, overflow: "hidden",
      transition: "border-color 0.25s ease",
    }}>
      <button
        onClick={onToggle}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          width: "100%", padding: "1.4rem 1.75rem",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: "1rem", textAlign: "left",
          background: "transparent", border: "none", cursor: "pointer",
        }}
      >
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem",
          fontWeight: 500,
          color: open || hov ? C.gold : "rgba(255,255,255,0.75)",
          transition: "color 0.2s",
        }}>{faq.question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ flexShrink: 0 }}>
          <ChevronDown size={17} color={open ? C.gold : C.textFaint} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{
              padding: "0 1.75rem 1.5rem",
              borderTop: `1px solid ${C.border}`,
              paddingTop: "1.25rem",
            }}>
              {/* Gold accent */}
              <div style={{ width: 24, height: 2, background: C.gradient, borderRadius: 2, marginBottom: "0.85rem" }} />
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem",
                color: C.textMuted, lineHeight: 1.75, fontWeight: 300,
              }}>{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── DIVIDER ──────────────────────────────────────────────────────────────────
const Divider = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${C.border})` }} />
    <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.gold, opacity: 0.35 }} />
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${C.border}, transparent)` }} />
  </div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const GetInvolved: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: C.bg, color: C.text, position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: rgba(245,158,11,0.25); color: #fff; }

        .gi-grid         { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        .gi-grid-flipped { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center;
                           grid-template-areas: "img txt"; }
        .gi-grid-flipped .gi-text { grid-area: txt; }
        .gi-grid-flipped .gi-img  { grid-area: img; }

        @media (max-width: 1024px) {
          .gi-grid, .gi-grid-flipped {
            grid-template-columns: 1fr;
            grid-template-areas: none;
            gap: 3.5rem;
          }
          .gi-grid-flipped .gi-text,
          .gi-grid-flipped .gi-img { grid-area: auto; }
          .gi-headline { font-size: clamp(2.4rem, 8vw, 4rem) !important; }
        }
        @media (max-width: 640px) {
          .gi-headline { font-size: clamp(2rem, 10vw, 2.8rem) !important; }
          .gi-cta-row  { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>

      {/* Ambient glows */}
      <div style={{
        position: "fixed", top: "-10%", right: "-5%",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 65%)",
        filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", bottom: "10%", left: "-8%",
        width: 550, height: 550, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(234,88,12,0.05) 0%, transparent 65%)",
        filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "7rem 6%", position: "relative", zIndex: 1 }}>

        {/* ── 01. VOLUNTEER ─────────────────────────────────────────────────── */}
        <section id="volunteer" style={{ marginBottom: "8rem", scrollMarginTop: 100 }}>
          <div className="gi-grid">
            {/* Text */}
            <motion.div
              className="gi-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              <Eyebrow icon={Users}>Collaboration</Eyebrow>
              <h2
                className="gi-headline"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.8rem, 4.5vw, 5rem)",
                  fontWeight: 700, lineHeight: 1.05,
                  color: C.text, letterSpacing: "-0.01em",
                }}
              >
                Your hands can<br />
                <em style={{
                  fontStyle: "italic", fontWeight: 400,
                  background: `linear-gradient(135deg, ${C.gold}, ${C.orange})`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>build the future.</em>
              </h2>

              <p style={{
                color: C.textMuted, fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem", lineHeight: 1.8, fontWeight: 300,
                paddingLeft: "1.5rem",
                borderLeft: `2px solid rgba(245,158,11,0.2)`,
                maxWidth: 460,
              }}>
                Whether you have professional skills to share or time to give, your presence strengthens our mission.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {CONTACT_METHODS.map(m => <ContactCard key={m.label} method={m} />)}
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              className="gi-img"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <PremiumPhoto src="/volut.jpg" alt="Volunteers" />
            </motion.div>
          </div>
        </section>

        <Divider />

        {/* ── 02. DONATION ──────────────────────────────────────────────────── */}
        <section id="donation" style={{ margin: "8rem 0", scrollMarginTop: 100 }}>
          <div className="gi-grid-flipped">
            {/* Text */}
            <motion.div
              className="gi-text"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              <Eyebrow icon={Heart}>Impact</Eyebrow>
              <h2
                className="gi-headline"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.8rem, 4.5vw, 5rem)",
                  fontWeight: 700, lineHeight: 1.05,
                  color: C.text, letterSpacing: "-0.01em",
                }}
              >
                Transparency<br />
                <em style={{
                  fontStyle: "italic", fontWeight: 400,
                  background: `linear-gradient(135deg, ${C.gold}, ${C.orange})`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>in every gift.</em>
              </h2>

              <p style={{
                color: C.textMuted, fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem", lineHeight: 1.8, fontWeight: 300,
                paddingLeft: "1.5rem",
                borderLeft: `2px solid rgba(245,158,11,0.2)`,
                maxWidth: 460,
              }}>
                No overhead cuts. Your contributions fund education, livelihoods, and medical outreach directly.
              </p>

              {/* Donation methods */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {DONATION_METHODS.map(m => <DonationRow key={m.title} m={m} />)}
              </div>

              {/* CTA row */}
              <div
                className="gi-cta-row"
                style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}
              >
                <motion.a
                  href="mailto:Giversgenerous@gmail.com"
                  whileHover={{ scale: 1.04, boxShadow: "0 16px 50px rgba(245,158,11,0.45)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.6rem",
                    padding: "0.9rem 2.2rem", borderRadius: 100,
                    background: C.gradient,
                    color: "#fff", textDecoration: "none",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.7rem", fontWeight: 700,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    boxShadow: "0 8px 30px rgba(245,158,11,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                  }}
                >
                  Request Details <ArrowRight size={14} />
                </motion.a>
                <div style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.6rem", fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: C.textFaint,
                }}>
                  <ShieldCheck size={15} color={C.gold} /> Guaranteed Secure
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              className="gi-img"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <PremiumPhoto src="/donations.jpg" alt="Donations" />
            </motion.div>
          </div>
        </section>

        <Divider />

        {/* ── 03. FAQ ───────────────────────────────────────────────────────── */}
        <section id="faq" style={{ maxWidth: 760, margin: "8rem auto 0", scrollMarginTop: 100 }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <Eyebrow icon={Sparkles}>Clarity</Eyebrow>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                fontWeight: 700, color: C.text, lineHeight: 1.1,
              }}
            >
              Common Questions
            </motion.h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <FAQAccordion
                  faq={faq}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA glow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={{ textAlign: "center", marginTop: "4rem" }}
          >
            <div style={{
              width: 300, height: 80, borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(245,158,11,0.1) 0%, transparent 70%)",
              filter: "blur(20px)", margin: "0 auto 1.5rem",
            }} />
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.1rem", fontStyle: "italic",
              color: C.textMuted, lineHeight: 1.6,
            }}>
              Still have questions?{" "}
              <a href="mailto:Giversgenerous@gmail.com" style={{ color: C.gold, textDecoration: "none" }}>
                Reach out directly.
              </a>
            </p>
          </motion.div>
        </section>

      </div>
    </div>
  );
};

export default GetInvolved;