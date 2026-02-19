import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Mail, Heart, Gift, Instagram,
  Users, ChevronDown, Sparkles,
  ExternalLink, ArrowRight, ShieldCheck,
} from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface ContactMethod {
  icon: React.ElementType;
  label: string;
  href: string;
  display: string;
}

interface DonationMethod {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const CONTACT_METHODS: ContactMethod[] = [
  {
    icon: Mail,
    label: "Email",
    href: "mailto:Giversgenerous@gmail.com",
    display: "Giversgenerous@gmail.com",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/GenerousHands",
    display: "@GenerousHands",
  },
];

const DONATION_METHODS: DonationMethod[] = [
  {
    icon: Heart,
    title: "Direct Support",
    description: "Secure bank details for direct transfers. 100% of funds go to field operations.",
  },
  {
    icon: Gift,
    title: "In-Kind Giving",
    description: "Books, clothing, or professional skills that empower our communities.",
  },
];

const FAQS: FAQItem[] = [
  {
    question: "How are donations used?",
    answer: "100% of public donations go directly toward our core programs — school fees for girls, start-up support for women-led businesses, and community health outreach.",
  },
  {
    question: "Can I donate from outside Nigeria?",
    answer: "Yes. We accept international transfers via SWIFT/IBAN. Contact us for specific routing details.",
  },
];

// ─── EYEBROW ──────────────────────────────────────────────────────────────────
const Eyebrow: React.FC<{ icon: React.ElementType; children: React.ReactNode }> = ({ icon: Icon, children }) => (
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
    <Icon size={14} color="#C9A96E" />
    <span style={{
      fontSize: "0.62rem", fontWeight: 700,
      textTransform: "uppercase" as const, letterSpacing: "0.3em",
      color: "#C9A96E",
    }}>
      {children}
    </span>
  </motion.div>
);

// ─── PREMIUM PHOTO ────────────────────────────────────────────────────────────
const PremiumPhoto: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

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
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { x.set(0); y.set(0); setHovered(false); }}
      style={{
        rotateX, rotateY, transformStyle: "preserve-3d",
        position: "relative",
        width: "100%",
        maxWidth: "420px",
        margin: "0 auto",
      }}
    >
      {/* Glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(201,169,110,0.15)",
        borderRadius: "2.5rem",
        filter: "blur(32px)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.7s ease",
        pointerEvents: "none",
      }} />

      {/* Card */}
      <div style={{
        position: "relative",
        borderRadius: "2.5rem",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.1)",
        background: "#141412",
        padding: "6px",
      }}>
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            aspectRatio: "1 / 1",
            objectFit: "cover",
            background: "#0A0908",
            borderRadius: "2.2rem",
            display: "block",
            transition: "transform 0.7s ease, filter 0.7s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            filter: hovered ? "saturate(1.1)" : "saturate(1)",
          }}
        />
      </div>
    </motion.div>
  );
};

// ─── CONTACT CARD ─────────────────────────────────────────────────────────────
const ContactCard: React.FC<{ method: ContactMethod }> = ({ method }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = method.icon;

  return (
    <a
      href={method.href}
      target={method.href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.25rem 1.5rem",
        borderRadius: "1.25rem",
        background: "#141412",
        border: hovered ? "1px solid rgba(201,169,110,0.4)" : "1px solid rgba(255,255,255,0.05)",
        textDecoration: "none",
        transition: "border-color 0.3s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", minWidth: 0 }}>
        <div style={{
          width: "44px", height: "44px", flexShrink: 0,
          borderRadius: "0.75rem",
          background: "rgba(201,169,110,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#C9A96E",
        }}>
          <Icon size={18} />
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{
            fontSize: "0.58rem", fontWeight: 800,
            textTransform: "uppercase" as const, letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.35)", marginBottom: "0.2rem",
          }}>
            {method.label}
          </p>
          <p style={{
            color: "#fff", fontWeight: 500, fontSize: "0.9rem",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {method.display}
          </p>
        </div>
      </div>
      <ExternalLink
        size={15}
        color={hovered ? "#C9A96E" : "rgba(255,255,255,0.2)"}
        style={{ transition: "color 0.3s ease", flexShrink: 0, marginLeft: "0.75rem" }}
      />
    </a>
  );
};

// ─── FAQ ACCORDION ────────────────────────────────────────────────────────────
const FAQAccordion: React.FC<{
  faq: FAQItem;
  index: number;
  open: boolean;
  onToggle: () => void;
}> = ({ faq, open, onToggle }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{
      background: "#141412",
      borderRadius: "1.5rem",
      border: "1px solid rgba(255,255,255,0.05)",
      overflow: "hidden",
    }}>
      <button
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: "100%", padding: "1.5rem 2rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "transparent", border: "none", cursor: "pointer",
          textAlign: "left" as const, gap: "1rem",
        }}
      >
        <span style={{
          fontSize: "0.95rem", fontWeight: 500,
          color: open || hovered ? "#C9A96E" : "#fff",
          transition: "color 0.3s ease",
          fontFamily: "'DM Sans', sans-serif",
          lineHeight: 1.4,
        }}>
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.35 }}
          style={{ display: "flex", flexShrink: 0 }}
        >
          <ChevronDown size={18} color="#C9A96E" />
        </motion.span>
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
            <p style={{
              padding: "0 2rem 1.75rem",
              color: "rgba(255,255,255,0.45)",
              fontWeight: 300, lineHeight: 1.8,
              fontSize: "0.9rem",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
const GetInvolved: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;700&display=swap');

        /* ── SHARED GRID ── */
        /* Text col always first in DOM, image always second.
           On desktop we use grid-template-areas to swap for the donation row. */
        .gi-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        /* Donation row: image left, text right on desktop */
        .gi-grid-flipped {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
          grid-template-areas: "img txt";
        }
        .gi-grid-flipped .gi-text-col { grid-area: txt; }
        .gi-grid-flipped .gi-img-col  { grid-area: img; }

        .gi-headline {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 4.5vw, 4rem);
          line-height: 1.1;
          font-weight: 400;
          margin-bottom: 1.75rem;
          color: #fff;
        }

        .gi-donate-btn {
          display: inline-flex; align-items: center; gap: 0.65rem;
          padding: 1rem 2rem;
          background: #C9A96E; color: #080808;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.25em;
          text-decoration: none;
          box-shadow: 0 8px 24px rgba(201,169,110,0.28);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          white-space: nowrap;
        }
        .gi-donate-btn:hover {
          transform: scale(1.04);
          box-shadow: 0 14px 36px rgba(201,169,110,0.44);
        }

        /* ── MOBILE — stack: text on top, image below ── */
        @media (max-width: 900px) {
          .gi-grid,
          .gi-grid-flipped {
            grid-template-columns: 1fr !important;
            grid-template-areas: none !important;
            gap: 2.5rem !important;
          }

          /* Reset area assignments so DOM order (text first) wins */
          .gi-grid-flipped .gi-text-col,
          .gi-grid-flipped .gi-img-col { grid-area: auto !important; }

          /* Image always below text */
          .gi-img-col { order: 1; }
          .gi-text-col { order: 0; }

          .gi-headline { font-size: clamp(2rem, 7vw, 2.8rem) !important; }

          .gi-body-text { max-width: 100% !important; }
          .gi-donate-btn { width: 100%; justify-content: center; }
          .gi-cta-row { flex-direction: column !important; align-items: stretch !important; }
        }

        @media (max-width: 480px) {
          .gi-headline { font-size: clamp(1.75rem, 7vw, 2.2rem) !important; }
          .gi-section { margin-bottom: 6rem !important; }
          .gi-faq-inner { padding-top: 3rem !important; }
        }
      `}</style>

      <section
        id="getinvolved"
        style={{
          position: "relative",
          background: "#0A0908",
          padding: "8rem 0 10rem",
          overflow: "hidden",
          color: "#fff",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Ambient orbs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{
            position: "absolute", top: "20%", right: "-10%",
            width: "50%", height: "50%",
            background: "rgba(201,169,110,0.05)",
            borderRadius: "50%", filter: "blur(120px)",
          }} />
          <div style={{
            position: "absolute", bottom: "20%", left: "-10%",
            width: "50%", height: "50%",
            background: "rgba(201,169,110,0.05)",
            borderRadius: "50%", filter: "blur(120px)",
          }} />
        </div>

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 2 }}>

          {/* ── 01. VOLUNTEER ──
               DOM: text col first → image col second
               Both desktop and mobile: text above image  */}
          <div id="volunteer" className="gi-section" style={{ marginBottom: "10rem", scrollMarginTop: "80px" }}>
            <div className="gi-grid">

              {/* TEXT — first in DOM = first on mobile */}
              <motion.div
                className="gi-text-col"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75 }}
              >
                <Eyebrow icon={Users}>Collaboration</Eyebrow>

                <h2 className="gi-headline">
                  Your hands can<br />
                  <span style={{ fontStyle: "italic", color: "#C9A96E" }}>build the future.</span>
                </h2>

                <p className="gi-body-text" style={{
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.42)",
                  fontWeight: 300, lineHeight: 1.8,
                  marginBottom: "2.5rem",
                  maxWidth: "460px",
                  paddingLeft: "1.5rem",
                  borderLeft: "1px solid rgba(201,169,110,0.28)",
                }}>
                  Whether you have professional skills to share or time to give, your presence strengthens our mission.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  {CONTACT_METHODS.map((m) => (
                    <ContactCard key={m.label} method={m} />
                  ))}
                </div>
              </motion.div>

              {/* IMAGE — second in DOM = below text on mobile */}
              <motion.div
                className="gi-img-col"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.1 }}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <PremiumPhoto src="/volut.jpg" alt="Volunteers" />
              </motion.div>

            </div>
          </div>

          {/* ── 02. DONATION ──
               DOM: text col first → image col second  (text first on mobile)
               Desktop: grid-template-areas swaps them so image appears left */}
          <div id="donation" className="gi-section" style={{ marginBottom: "10rem", scrollMarginTop: "80px" }}>
            <div className="gi-grid-flipped">

              {/* TEXT — first in DOM → shows first on mobile */}
              <motion.div
                className="gi-text-col"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75 }}
              >
                <Eyebrow icon={Heart}>Impact</Eyebrow>

                <h2 className="gi-headline">
                  Transparency<br />
                  <span style={{ fontStyle: "italic", color: "#C9A96E" }}>in every gift.</span>
                </h2>

                <p className="gi-body-text" style={{
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.42)",
                  fontWeight: 300, lineHeight: 1.8,
                  marginBottom: "2.5rem",
                  maxWidth: "460px",
                  paddingLeft: "1.5rem",
                  borderLeft: "1px solid rgba(201,169,110,0.28)",
                }}>
                  No overhead cuts. Your contributions fund education, livelihoods, and medical outreach directly.
                </p>

                {/* Donation methods */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
                  {DONATION_METHODS.map((m) => {
                    const Icon = m.icon;
                    return (
                      <div key={m.title} style={{ display: "flex", gap: "1rem" }}>
                        <div style={{
                          flexShrink: 0,
                          width: "38px", height: "38px",
                          borderRadius: "10px",
                          background: "rgba(201,169,110,0.1)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#C9A96E",
                          marginTop: "2px",
                        }}>
                          <Icon size={17} />
                        </div>
                        <div>
                          <h4 style={{
                            color: "#fff", fontWeight: 700,
                            fontSize: "0.63rem",
                            textTransform: "uppercase" as const,
                            letterSpacing: "0.18em",
                            marginBottom: "0.35rem",
                          }}>
                            {m.title}
                          </h4>
                          <p style={{
                            color: "rgba(255,255,255,0.4)",
                            fontSize: "0.88rem", fontWeight: 300, lineHeight: 1.7,
                          }}>
                            {m.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* CTA row */}
                <div className="gi-cta-row" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.5rem" }}>
                  <a href="mailto:Giversgenerous@gmail.com" className="gi-donate-btn">
                    Request Details <ArrowRight size={14} />
                  </a>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    fontSize: "0.6rem", fontWeight: 700,
                    textTransform: "uppercase" as const, letterSpacing: "0.18em",
                    color: "rgba(255,255,255,0.3)",
                  }}>
                    <ShieldCheck size={15} color="#C9A96E" /> Guaranteed Secure
                  </div>
                </div>
              </motion.div>

              {/* IMAGE — second in DOM → shows below text on mobile */}
              <motion.div
                className="gi-img-col"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.1 }}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <PremiumPhoto src="/donations.jpg" alt="Donations" />
              </motion.div>

            </div>
          </div>

          {/* ── 03. FAQ ── */}
          <div
            id="faq"
            className="gi-faq-inner"
            style={{
              maxWidth: "720px", margin: "0 auto",
              paddingTop: "5rem",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              scrollMarginTop: "80px",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <Eyebrow icon={Sparkles}>Clarity</Eyebrow>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 5vw, 3rem)",
                fontWeight: 400, color: "#fff",
              }}>
                Common Questions
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {FAQS.map((faq, i) => (
                <FAQAccordion
                  key={i}
                  faq={faq}
                  index={i}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default GetInvolved;