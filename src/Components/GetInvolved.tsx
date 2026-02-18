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
        width: "100%", maxWidth: "380px",
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(201,169,110,0.15)",
        borderRadius: "2.5rem",
        filter: "blur(32px)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.7s ease",
        pointerEvents: "none",
      }} />

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
        padding: "1.5rem",
        borderRadius: "1.5rem",
        background: "#141412",
        border: hovered ? "1px solid rgba(201,169,110,0.4)" : "1px solid rgba(255,255,255,0.05)",
        textDecoration: "none",
        transition: "border-color 0.4s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
        <div style={{
          width: "48px", height: "48px",
          borderRadius: "0.875rem",
          background: "rgba(201,169,110,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#C9A96E", flexShrink: 0,
        }}>
          <Icon size={20} />
        </div>
        <div>
          <p style={{
            fontSize: "0.6rem", fontWeight: 800,
            textTransform: "uppercase" as const, letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.35)", marginBottom: "0.25rem",
          }}>
            {method.label}
          </p>
          <p style={{ color: "#fff", fontWeight: 500, fontSize: "0.95rem" }}>
            {method.display}
          </p>
        </div>
      </div>
      <ExternalLink
        size={16}
        color={hovered ? "#C9A96E" : "rgba(255,255,255,0.2)"}
        style={{ transition: "color 0.3s ease", flexShrink: 0 }}
      />
    </a>
  );
};

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────
const FAQAccordion: React.FC<{ faq: FAQItem; index: number; open: boolean; onToggle: () => void }> = ({
  faq, open, onToggle,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{
      background: "#141412",
      borderRadius: "2rem",
      border: "1px solid rgba(255,255,255,0.05)",
      overflow: "hidden",
    }}>
      <button
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: "100%", padding: "2rem 2.5rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "transparent", border: "none", cursor: "pointer",
          textAlign: "left" as const,
        }}
      >
        <span style={{
          fontSize: "1.05rem", fontWeight: 500,
          color: open || hovered ? "#C9A96E" : "#fff",
          transition: "color 0.3s ease",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ display: "flex", flexShrink: 0, marginLeft: "1rem" }}
        >
          <ChevronDown size={20} color="#C9A96E" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p style={{
              padding: "0 2.5rem 2rem",
              color: "rgba(255,255,255,0.45)",
              fontWeight: 300, lineHeight: 1.8,
              fontSize: "0.95rem",
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

        .gi-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        .gi-photo { display: flex; justify-content: flex-end; }
        .gi-photo-left { display: flex; justify-content: flex-start; }

        .gi-headline {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 5vw, 4.5rem);
          line-height: 1.1;
          font-weight: 400;
          margin-bottom: 2rem;
        }

        .gi-donate-btn {
          display: inline-flex; align-items: center; gap: 0.75rem;
          padding: 1.1rem 2.5rem;
          background: #C9A96E;
          color: #080808;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.3em;
          text-decoration: none;
          box-shadow: 0 10px 30px rgba(201,169,110,0.3);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .gi-donate-btn:hover {
          transform: scale(1.04);
          box-shadow: 0 16px 40px rgba(201,169,110,0.45);
        }

        @media (max-width: 900px) {
          .gi-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .gi-photo, .gi-photo-left { justify-content: center !important; order: -1; }
          .gi-order-fix { order: 1; }
          .gi-headline { font-size: clamp(2.2rem, 8vw, 3.2rem) !important; }
          .gi-faq-inner { padding: 0 !important; }
        }

        @media (max-width: 480px) {
          .gi-headline { font-size: clamp(1.9rem, 8vw, 2.6rem) !important; }
        }
      `}</style>

      <section
        id="getinvolved"
        style={{
          position: "relative",
          background: "#0A0908",
          padding: "10rem 0",
          overflow: "hidden",
          color: "#fff",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
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

          {/* ── 01. VOLUNTEER ── */}
          <div id="volunteer" style={{ marginBottom: "12rem", scrollMarginTop: "80px" }}>
            <div className="gi-grid">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Eyebrow icon={Users}>Collaboration</Eyebrow>

                <h2 className="gi-headline">
                  Your hands can{" "}
                  <br />
                  <span style={{ fontStyle: "italic", color: "#C9A96E" }}>build the future.</span>
                </h2>

                <p style={{
                  fontSize: "1.05rem",
                  color: "rgba(255,255,255,0.4)",
                  fontWeight: 300, lineHeight: 1.8,
                  marginBottom: "3rem",
                  maxWidth: "480px",
                  paddingLeft: "2rem",
                  borderLeft: "1px solid rgba(201,169,110,0.3)",
                }}>
                  Whether you have professional skills to share or time to give, your presence strengthens our mission.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {CONTACT_METHODS.map((m) => (
                    <ContactCard key={m.label} method={m} />
                  ))}
                </div>
              </motion.div>

              <div className="gi-photo">
                <PremiumPhoto src="/volut.jpg" alt="Volunteers" />
              </div>
            </div>
          </div>

          {/* ── 02. DONATION ── */}
          <div id="donation" style={{ marginBottom: "12rem", scrollMarginTop: "80px" }}>
            <div className="gi-grid">
              <div className="gi-photo-left">
                <PremiumPhoto src="/donations.jpg" alt="Donations" />
              </div>

              <motion.div
                className="gi-order-fix"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Eyebrow icon={Heart}>Impact</Eyebrow>

                <h2 className="gi-headline">
                  Transparency{" "}
                  <br />
                  <span style={{ fontStyle: "italic", color: "#C9A96E" }}>in every gift.</span>
                </h2>

                <p style={{
                  fontSize: "1.05rem",
                  color: "rgba(255,255,255,0.4)",
                  fontWeight: 300, lineHeight: 1.8,
                  marginBottom: "3rem",
                  maxWidth: "480px",
                  paddingLeft: "2rem",
                  borderLeft: "1px solid rgba(201,169,110,0.3)",
                }}>
                  No overhead cuts. Your contributions fund education, livelihoods, and medical outreach directly.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "3rem" }}>
                  {DONATION_METHODS.map((m) => {
                    const Icon = m.icon; // Correctly referencing and using the Icon
                    return (
                      <div key={m.title} style={{ display: "flex", gap: "1.25rem" }}>
                        <div style={{
                          flexShrink: 0,
                          width: "36px", height: "36px",
                          borderRadius: "10px",
                          background: "rgba(201,169,110,0.1)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#C9A96E"
                        }}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <h4 style={{
                            color: "#fff", fontWeight: 700,
                            fontSize: "0.65rem",
                            textTransform: "uppercase" as const,
                            letterSpacing: "0.2em",
                            marginBottom: "0.4rem",
                          }}>
                            {m.title}
                          </h4>
                          <p style={{
                            color: "rgba(255,255,255,0.4)",
                            fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.7,
                          }}>
                            {m.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "2rem" }}>
                  <a href="mailto:Giversgenerous@gmail.com" className="gi-donate-btn">
                    Request Details <ArrowRight size={14} />
                  </a>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "0.6rem",
                    fontSize: "0.62rem", fontWeight: 700,
                    textTransform: "uppercase" as const, letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.3)",
                  }}>
                    <ShieldCheck size={16} color="#C9A96E" /> Guaranteed Secure
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── 03. FAQ ── */}
          <div
            id="faq"
            className="gi-faq-inner"
            style={{
              maxWidth: "780px", margin: "0 auto",
              paddingTop: "5rem",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              scrollMarginTop: "80px",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <Eyebrow icon={Sparkles}>Clarity</Eyebrow>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 400, color: "#fff",
              }}>
                Common Questions
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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