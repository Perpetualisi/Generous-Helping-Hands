import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Mail, Heart, Gift, Instagram,
  Users, ChevronDown, Sparkles,
  ExternalLink, ArrowRight, ShieldCheck,
  Copy, Check, Building2, CreditCard, Flower2,
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
interface ContactMethod  { icon: React.ElementType; label: string; href: string; display: string; }
interface DonationMethod { icon: React.ElementType; title: string; description: string; }
interface FAQItem        { question: string; answer: string; }

const EMAIL = "info@generoushelpinghands.org";

const BANK = {
  bank:    "First Bank",
  account: "2045352809",
  name:    "Generous Helping Hands Foundation",
};

const CONTACT_METHODS: ContactMethod[] = [
  { icon: Mail,      label: "Email",     href: `mailto:${EMAIL}`,                             display: EMAIL                  },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/GenerousHands",         display: "@GenerousHands"       },
];

const DONATION_METHODS: DonationMethod[] = [
  { icon: Heart, title: "Direct Bank Transfer", description: "Secure transfer to our verified foundation account. 100% of funds go directly to field operations." },
  { icon: Gift,  title: "In-Kind Giving",        description: "Books, clothing, or professional skills that empower our communities."                              },
];

const FAQS: FAQItem[] = [
  { question: "How are donations used?",            answer: "100% of public donations go directly toward our core programs — school fees for girls, start-up support for women-led businesses, and community health outreach." },
  { question: "Can I donate from outside Nigeria?", answer: "Yes. We accept international transfers via SWIFT/IBAN. Contact us for specific routing details."                                                              },
];

// ─── EYEBROW ──────────────────────────────────────────────────────────────────
const Eyebrow: React.FC<{ icon: React.ElementType; children: React.ReactNode }> = ({ icon: Icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", borderRadius: 100, border: `1px solid ${C.border}`, background: "rgba(245,158,11,0.06)", marginBottom: "1.5rem" }}
  >
    <Icon size={11} color={C.gold} />
    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: C.gold, whiteSpace: "nowrap" }}>{children}</span>
  </motion.div>
);

// ─── COPY BUTTON ──────────────────────────────────────────────────────────────
const CopyBtn: React.FC<{ value: string }> = ({ value }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(value).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <motion.button onClick={copy} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} title="Copy"
      style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, background: copied ? "rgba(34,197,94,0.15)" : "rgba(245,158,11,0.1)", border: `1px solid ${copied ? "rgba(34,197,94,0.4)" : C.border}`, color: copied ? "#22c55e" : C.gold, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s ease" }}>
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </motion.button>
  );
};

// ─── BANK DETAILS PANEL ───────────────────────────────────────────────────────
const BankPanel: React.FC<{ show: boolean }> = ({ show }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "relative", overflow: "hidden", borderRadius: 20, background: C.bgCard, border: `1px solid ${C.borderHov}`, boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(245,158,11,0.07)", padding: "1.75rem" }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: C.gradient, borderRadius: "20px 20px 0 0" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(245,158,11,0.1)", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Building2 size={16} color={C.gold} />
          </div>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.52rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", color: C.textFaint, lineHeight: 1 }}>Bank Transfer Details</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 700, color: C.text, marginTop: 3, lineHeight: 1 }}>Donation Account</p>
          </div>
        </div>
        {[
          { label: "Bank",           icon: Building2,   value: BANK.bank    },
          { label: "Account Number", icon: CreditCard,  value: BANK.account },
          { label: "Account Name",   icon: ShieldCheck, value: BANK.name    },
        ].map(({ label, icon: Icon, value }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.85rem 1rem", borderRadius: 12, marginBottom: "0.5rem", background: "rgba(245,158,11,0.04)", border: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Icon size={14} color={C.gold} style={{ flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.48rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.18em", color: C.textFaint, marginBottom: 2 }}>{label}</p>
                <p style={{ fontFamily: label === "Account Number" ? "'Courier New', monospace" : "'DM Sans', sans-serif", fontSize: label === "Account Number" ? "1.05rem" : "0.85rem", fontWeight: label === "Account Number" ? 700 : 500, color: label === "Account Number" ? C.gold : "rgba(255,255,255,0.85)", letterSpacing: label === "Account Number" ? "0.12em" : "normal" }}>{value}</p>
              </div>
            </div>
            <CopyBtn value={value} />
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginTop: "1rem", padding: "0.75rem 1rem", borderRadius: 10, background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.15)" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.8)", flexShrink: 0 }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(34,197,94,0.8)", lineHeight: 1.5 }}>
            Verified foundation account · 100% goes to programs
          </p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── DONATE IN MEMORY CARD ────────────────────────────────────────────────────
const DonateInMemory: React.FC = () => {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative", overflow: "hidden",
        borderRadius: 24,
        background: hov
          ? "linear-gradient(135deg, rgba(245,158,11,0.09) 0%, rgba(234,88,12,0.07) 100%)"
          : C.bgCard,
        border: `1px solid ${hov ? C.borderHov : C.border}`,
        padding: "2rem 2rem 1.75rem",
        transition: "background 0.4s ease, border-color 0.3s ease",
        boxShadow: hov ? "0 24px 60px rgba(0,0,0,0.45)" : "0 12px 40px rgba(0,0,0,0.3)",
      }}
    >
      {/* Subtle top gradient bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: hov ? C.gradient : "transparent",
        transition: "background 0.4s ease",
        borderRadius: "24px 24px 0 0",
      }} />

      {/* Faint decorative bloom */}
      <div style={{
        position: "absolute", top: -30, right: -30, width: 160, height: 160,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)",
        filter: "blur(24px)",
        opacity: hov ? 1 : 0.4,
        transition: "opacity 0.5s ease",
        pointerEvents: "none",
      }} />

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.25rem", position: "relative", zIndex: 1 }}>
        <motion.div
          animate={{ background: hov ? C.gradient : "rgba(245,158,11,0.1)" }}
          transition={{ duration: 0.3 }}
          style={{ width: 46, height: 46, borderRadius: 13, flexShrink: 0, border: `1px solid ${hov ? "transparent" : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: hov ? "0 6px 20px rgba(245,158,11,0.3)" : "none", transition: "box-shadow 0.3s ease, border-color 0.3s ease" }}
        >
          <Flower2 size={19} color={hov ? "#fff" : C.gold} />
        </motion.div>
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.52rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.22em", color: C.textFaint, marginBottom: "0.3rem" }}>
            Legacy Gift
          </p>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: C.text, lineHeight: 1.15 }}>
            Donate in Memory
          </h3>
        </div>
      </div>

      {/* Body */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ width: 28, height: 2, background: C.gradient, borderRadius: 2, marginBottom: "1rem" }} />
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: C.textMuted, lineHeight: 1.8, fontWeight: 300, marginBottom: "1.5rem" }}>
          Honor the memory of a loved one by helping those in need. A donation made in their name keeps their compassion and kindness alive, creating a{" "}
          <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 400 }}>meaningful legacy</span>{" "}
          that continues to make a difference.
        </p>


      </div>
    </motion.div>
  );
};

// ─── 3D PHOTO ─────────────────────────────────────────────────────────────────
const PremiumPhoto: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const xs = useSpring(mx, { stiffness: 120, damping: 20 });
  const ys = useSpring(my, { stiffness: 120, damping: 20 });
  const rotX = useTransform(ys, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotY = useTransform(xs, [-0.5, 0.5], ["-5deg", "5deg"]);
  return (
    <motion.div ref={ref}
      onMouseMove={e => { const r = ref.current?.getBoundingClientRect(); if (r) { mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { mx.set(0); my.set(0); setHovered(false); }}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", position: "relative", maxWidth: 420, margin: "0 auto", width: "100%" }}
    >
      <div style={{ position: "absolute", inset: -24, background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)", filter: "blur(40px)", borderRadius: 60, opacity: hovered ? 1 : 0.4, transition: "opacity 0.6s ease", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", inset: -6, background: "rgba(245,158,11,0.05)", border: `1px solid ${C.border}`, borderRadius: 36, transform: "rotate(2deg)", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1, padding: 6, borderRadius: 32, overflow: "hidden", border: `1px solid ${C.border}`, background: C.bgCard, boxShadow: "0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)" }}>
        <img src={src} alt={alt} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block", borderRadius: 28, transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.7s ease", filter: "saturate(0.85) contrast(1.05)" }} />
        <div style={{ position: "absolute", inset: 0, borderRadius: 28, background: "linear-gradient(160deg, rgba(245,158,11,0.06) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)", pointerEvents: "none" }} />
      </div>
    </motion.div>
  );
};

// ─── CONTACT CARD ─────────────────────────────────────────────────────────────
const ContactCard: React.FC<{ method: ContactMethod }> = ({ method: m }) => {
  const [hov, setHov] = useState(false);
  return (
    <a href={m.href} target={m.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.1rem 1.25rem", borderRadius: 16, background: hov ? "rgba(245,158,11,0.05)" : C.bgCard, border: `1px solid ${hov ? C.borderHov : C.border}`, transition: "border-color 0.25s ease, background 0.25s ease", textDecoration: "none" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, flexShrink: 0, background: "rgba(245,158,11,0.08)", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <m.icon size={17} color={C.gold} />
        </div>
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.52rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", color: C.textFaint, marginBottom: 3 }}>{m.label}</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: hov ? "#fff" : C.textMuted, fontWeight: 500, transition: "color 0.2s" }}>{m.display}</p>
        </div>
      </div>
      <ExternalLink size={14} color={hov ? C.gold : C.textFaint} style={{ transition: "color 0.2s", flexShrink: 0 }} />
    </a>
  );
};

// ─── DONATION METHOD ROW ──────────────────────────────────────────────────────
const DonationRow: React.FC<{ m: DonationMethod }> = ({ m }) => (
  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
    <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: 12, background: "rgba(245,158,11,0.08)", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <m.icon size={16} color={C.gold} />
    </div>
    <div>
      <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.7)", marginBottom: "0.35rem" }}>{m.title}</h4>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: C.textMuted, lineHeight: 1.7, fontWeight: 300 }}>{m.description}</p>
    </div>
  </div>
);

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQAccordion: React.FC<{ faq: FAQItem; open: boolean; onToggle: () => void }> = ({ faq, open, onToggle }) => {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ background: C.bgCard, border: `1px solid ${open || hov ? C.borderHov : C.border}`, borderRadius: 18, overflow: "hidden", transition: "border-color 0.25s ease" }}>
      <button onClick={onToggle} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ width: "100%", padding: "1.4rem 1.75rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", textAlign: "left", background: "transparent", border: "none", cursor: "pointer" }}
      >
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 500, color: open || hov ? C.gold : "rgba(255,255,255,0.75)", transition: "color 0.2s" }}>{faq.question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ flexShrink: 0 }}>
          <ChevronDown size={17} color={open ? C.gold : C.textFaint} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: "easeInOut" }} style={{ overflow: "hidden" }}>
            <div style={{ padding: "1.25rem 1.75rem 1.5rem", borderTop: `1px solid ${C.border}` }}>
              <div style={{ width: 24, height: 2, background: C.gradient, borderRadius: 2, marginBottom: "0.85rem" }} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: C.textMuted, lineHeight: 1.75, fontWeight: 300 }}>{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Divider = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${C.border})` }} />
    <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.gold, opacity: 0.35 }} />
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${C.border}, transparent)` }} />
  </div>
);

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const GetInvolved: React.FC = () => {
  const [openFaq,       setOpenFaq]       = useState<number | null>(null);
  const [showBankPanel, setShowBankPanel] = useState(false);

  return (
    <div style={{ background: C.bg, color: C.text, position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: rgba(245,158,11,0.25); color: #fff; }

        .gi-grid         { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        .gi-grid-flipped { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; grid-template-areas: "img txt"; }
        .gi-grid-flipped .gi-text { grid-area: txt; }
        .gi-grid-flipped .gi-img  { grid-area: img; }

        @media (max-width: 1024px) {
          .gi-grid, .gi-grid-flipped { grid-template-columns: 1fr; grid-template-areas: none; gap: 3.5rem; }
          .gi-grid-flipped .gi-text,
          .gi-grid-flipped .gi-img { grid-area: auto; }
          .gi-headline { font-size: clamp(2.4rem, 8vw, 4rem) !important; }
        }
        @media (max-width: 640px) {
          .gi-headline { font-size: clamp(2rem, 10vw, 2.8rem) !important; }
          .gi-cta-row  { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>

      <div style={{ position: "fixed", top: "-10%", right: "-5%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "10%", left: "-8%", width: 550, height: 550, borderRadius: "50%", background: "radial-gradient(circle, rgba(234,88,12,0.05) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "7rem 6%", position: "relative", zIndex: 1 }}>

        {/* ── VOLUNTEER ── */}
        <section id="volunteer" style={{ marginBottom: "8rem", scrollMarginTop: 100 }}>
          <div className="gi-grid">
            <motion.div className="gi-text"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              <Eyebrow icon={Users}>Collaboration</Eyebrow>
              <h2 className="gi-headline" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 4.5vw, 5rem)", fontWeight: 700, lineHeight: 1.05, color: C.text, letterSpacing: "-0.01em" }}>
                Your hands can<br />
                <em style={{ fontStyle: "italic", fontWeight: 400, background: `linear-gradient(135deg, ${C.gold}, ${C.orange})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>build the future.</em>
              </h2>
              <p style={{ color: C.textMuted, fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", lineHeight: 1.8, fontWeight: 300, paddingLeft: "1.5rem", borderLeft: "2px solid rgba(245,158,11,0.2)", maxWidth: 460 }}>
                Whether you have professional skills to share or time to give, your presence strengthens our mission.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {CONTACT_METHODS.map(m => <ContactCard key={m.label} method={m} />)}
              </div>
            </motion.div>
            <motion.div className="gi-img"
              initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <PremiumPhoto src="/volut.jpg" alt="Volunteers" />
            </motion.div>
          </div>
        </section>

        <Divider />

        {/* ── DONATION ── */}
        <section id="donation" style={{ margin: "8rem 0", scrollMarginTop: 100 }}>
          <div className="gi-grid-flipped">
            <motion.div className="gi-text"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              <Eyebrow icon={Heart}>Impact</Eyebrow>
              <h2 className="gi-headline" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 4.5vw, 5rem)", fontWeight: 700, lineHeight: 1.05, color: C.text, letterSpacing: "-0.01em" }}>
                Transparency<br />
                <em style={{ fontStyle: "italic", fontWeight: 400, background: `linear-gradient(135deg, ${C.gold}, ${C.orange})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>in every gift.</em>
              </h2>
              <p style={{ color: C.textMuted, fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", lineHeight: 1.8, fontWeight: 300, paddingLeft: "1.5rem", borderLeft: "2px solid rgba(245,158,11,0.2)", maxWidth: 460 }}>
                No overhead cuts. Your contributions fund education, livelihoods, and medical outreach directly.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {DONATION_METHODS.map(m => <DonationRow key={m.title} m={m} />)}
              </div>

              {/* Bank details CTA */}
              <div className="gi-cta-row" style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                <motion.button
                  onClick={() => setShowBankPanel(v => !v)}
                  whileHover={{ scale: 1.04, boxShadow: "0 16px 50px rgba(245,158,11,0.45)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.6rem",
                    padding: "0.9rem 2.2rem", borderRadius: 100,
                    background: showBankPanel ? "rgba(245,158,11,0.15)" : C.gradient,
                    color: "#fff", border: showBankPanel ? `1px solid ${C.borderHov}` : "none",
                    fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", fontWeight: 700,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    boxShadow: showBankPanel ? "none" : "0 8px 30px rgba(245,158,11,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                    cursor: "pointer", transition: "all 0.3s ease",
                  }}
                >
                  {showBankPanel ? "Hide Details" : "View Bank Details"}
                  <ArrowRight size={14} style={{ transform: showBankPanel ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.3s ease" }} />
                </motion.button>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.textFaint }}>
                  <ShieldCheck size={15} color={C.gold} /> Guaranteed Secure
                </div>
              </div>

              {/* Bank panel */}
              <BankPanel show={showBankPanel} />

              {/* ── DONATE IN MEMORY ── */}
              <DonateInMemory />

            </motion.div>

            <motion.div className="gi-img"
              initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <PremiumPhoto src="/donations.jpg" alt="Donations" />
            </motion.div>
          </div>
        </section>

        <Divider />

        {/* ── FAQ ── */}
        <section id="faq" style={{ maxWidth: 760, margin: "8rem auto 0", scrollMarginTop: 100 }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <Eyebrow icon={Sparkles}>Clarity</Eyebrow>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 700, color: C.text, lineHeight: 1.1 }}
            >
              Common Questions
            </motion.h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {FAQS.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
                <FAQAccordion faq={faq} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} style={{ textAlign: "center", marginTop: "4rem" }}>
            <div style={{ width: 300, height: 80, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(245,158,11,0.1) 0%, transparent 70%)", filter: "blur(20px)", margin: "0 auto 1.5rem" }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", color: C.textMuted, lineHeight: 1.6 }}>
              Still have questions?{" "}
              <a href={`mailto:${EMAIL}`} style={{ color: C.gold, textDecoration: "none" }}>Reach out directly.</a>
            </p>
          </motion.div>
        </section>

      </div>
    </div>
  );
};

export default GetInvolved;