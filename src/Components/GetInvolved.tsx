import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Mail, Heart, Gift, Instagram,
  Users, ChevronDown, Sparkles,
  ExternalLink, ArrowRight, ShieldCheck,
} from "lucide-react";

// ─── PREMIUM DESIGN SYSTEM (LIGHT) ────────────────────────────────────────────
const THEME = {
  gold: "linear-gradient(135deg, #D4AF37 0%, #F59E0B 50%, #B8860B 100%)",
  goldSolid: "#D4AF37",
  bgWarm: "#FFFDF9",
  textMain: "#2D241E",
  glassBorder: "rgba(212, 175, 55, 0.15)",
  cardWhite: "rgba(255, 255, 255, 0.7)",
  accentCream: "rgba(212, 175, 55, 0.05)",
};

// ─── TYPES & UNCHANGED DATA ──────────────────────────────────────────────────
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

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────
const Eyebrow: React.FC<{ icon: React.ElementType; children: React.ReactNode }> = ({ icon: Icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="inline-flex items-center gap-3 px-5 py-2 rounded-full mb-8"
    style={{ background: THEME.accentCream, border: `1px solid ${THEME.glassBorder}` }}
  >
    <Icon size={14} style={{ color: THEME.goldSolid }} />
    <span className="font-['DM_Sans'] text-[0.65rem] font-black tracking-[0.3em] uppercase text-amber-800">
      {children}
    </span>
  </motion.div>
);

const PremiumPhoto: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xs = useSpring(x, { stiffness: 120, damping: 20 });
  const ys = useSpring(y, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(ys, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(xs, [-0.5, 0.5], ["-5deg", "5deg"]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={(e) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (rect) {
          x.set((e.clientX - rect.left) / rect.width - 0.5);
          y.set((e.clientY - rect.top) / rect.height - 0.5);
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { x.set(0); y.set(0); setHovered(false); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full max-w-[420px] mx-auto"
    >
      <div className="absolute inset-0 bg-amber-200/20 blur-3xl opacity-0 transition-opacity duration-700 pointer-events-none" 
           style={{ opacity: hovered ? 1 : 0 }} />
      <div className="relative p-1.5 rounded-[2.5rem] overflow-hidden border border-amber-100 bg-white shadow-2xl shadow-stone-200">
        <img
          src={src}
          alt={alt}
          className="w-full aspect-square object-cover rounded-[2.2rem] transition-all duration-700"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
        />
      </div>
    </motion.div>
  );
};

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
      className="flex items-center justify-between p-5 rounded-2xl transition-all duration-300 border bg-white"
      style={{ borderColor: hovered ? THEME.goldSolid : "rgba(0,0,0,0.05)" }}
    >
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors"
             style={{ background: THEME.accentCream, color: THEME.goldSolid }}>
          <Icon size={18} />
        </div>
        <div>
          <p className="text-[0.55rem] font-black uppercase tracking-widest text-stone-400 mb-0.5">
            {method.label}
          </p>
          <p className="text-stone-800 font-medium text-sm">
            {method.display}
          </p>
        </div>
      </div>
      <ExternalLink size={15} className="transition-colors" 
                    style={{ color: hovered ? THEME.goldSolid : "rgba(0,0,0,0.1)" }} />
    </a>
  );
};

const FAQAccordion: React.FC<{
  faq: FAQItem;
  open: boolean;
  onToggle: () => void;
}> = ({ faq, open, onToggle }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-stone-100 overflow-hidden shadow-sm">
      <button
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full px-8 py-6 flex items-center justify-between text-left gap-4"
      >
        <span className={`text-base font-medium transition-colors duration-300 ${open || hovered ? 'text-amber-700' : 'text-stone-800'}`}>
          {faq.question}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} className="flex-shrink-0 text-amber-500">
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="px-8 pb-8 text-stone-500 font-light leading-relaxed text-sm">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const GetInvolved: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="relative overflow-hidden py-32 md:py-48" style={{ background: THEME.bgWarm, color: THEME.textMain }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;700;900&display=swap');
        .gold-text { background: ${THEME.gold}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .gi-section { margin-bottom: 12rem; }
        .gi-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        .gi-grid-flipped { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; grid-template-areas: "img txt"; }
        .gi-grid-flipped .gi-text-col { grid-area: txt; }
        .gi-grid-flipped .gi-img-col { grid-area: img; }
        
        @media (max-width: 1024px) {
          .gi-grid, .gi-grid-flipped { grid-template-columns: 1fr; grid-template-areas: none; gap: 4rem; }
          .gi-grid-flipped .gi-text-col, .gi-grid-flipped .gi-img-col { grid-area: auto; }
          .gi-img-col { order: 2; }
          .gi-text-col { order: 1; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* 01. VOLUNTEER SECTION */}
        <div id="volunteer" className="gi-section scroll-mt-20">
          <div className="gi-grid">
            <motion.div 
              className="gi-text-col"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <Eyebrow icon={Users}>Collaboration</Eyebrow>
              <h2 className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold leading-tight mb-8">
                Your hands can<br />
                <em className="gold-text italic font-normal">build the future.</em>
              </h2>
              <p className="text-stone-500 text-lg font-light leading-relaxed mb-10 pl-6 border-l-2 border-amber-500/20">
                Whether you have professional skills to share or time to give, your presence strengthens our mission.
              </p>
              <div className="flex flex-col gap-3">
                {CONTACT_METHODS.map((m) => <ContactCard key={m.label} method={m} />)}
              </div>
            </motion.div>

            <motion.div 
              className="gi-img-col"
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            >
              <PremiumPhoto src="/volut.jpg" alt="Volunteers" />
            </motion.div>
          </div>
        </div>

        {/* 02. DONATION SECTION */}
        <div id="donation" className="gi-section scroll-mt-20">
          <div className="gi-grid-flipped">
            <motion.div 
              className="gi-text-col"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <Eyebrow icon={Heart}>Impact</Eyebrow>
              <h2 className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold leading-tight mb-8">
                Transparency<br />
                <em className="gold-text italic font-normal">in every gift.</em>
              </h2>
              <p className="text-stone-500 text-lg font-light leading-relaxed mb-12 pl-6 border-l-2 border-amber-500/20">
                No overhead cuts. Your contributions fund education, livelihoods, and medical outreach directly.
              </p>

              <div className="space-y-8 mb-12">
                {DONATION_METHODS.map((m) => (
                  <div key={m.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-amber-50 text-amber-600">
                      <m.icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-[0.65rem] font-black uppercase tracking-widest text-stone-800 mb-1">{m.title}</h4>
                      <p className="text-stone-500 text-sm font-light leading-relaxed">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <a href="mailto:Giversgenerous@gmail.com" 
                   className="inline-flex items-center gap-3 px-10 py-5 bg-amber-500 text-white rounded-full text-[0.65rem] font-black uppercase tracking-widest shadow-xl shadow-amber-500/20 hover:bg-amber-600 transition-all hover:scale-105">
                  Request Details <ArrowRight size={14} />
                </a>
                <div className="flex items-center gap-2 text-[0.6rem] font-black uppercase tracking-widest text-stone-400">
                  <ShieldCheck size={16} className="text-amber-500" /> Guaranteed Secure
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="gi-img-col"
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            >
              <PremiumPhoto src="/donations.jpg" alt="Donations" />
            </motion.div>
          </div>
        </div>

        {/* 03. FAQ SECTION */}
        <div id="faq" className="max-w-3xl mx-auto pt-24 border-t border-stone-100 scroll-mt-20">
          <div className="text-center mb-16">
            <Eyebrow icon={Sparkles}>Clarity</Eyebrow>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-stone-800">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <FAQAccordion 
                key={i} 
                faq={faq} 
                open={openFaq === i} 
                onToggle={() => setOpenFaq(openFaq === i ? null : i)} 
              />
            ))}
          </div>
        </div>

      </div>

      {/* Background Decor */}
      <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] bg-amber-200/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-[10%] left-[-5%] w-[600px] h-[600px] bg-orange-200/10 blur-[120px] rounded-full -z-10" />
    </div>
  );
};

export default GetInvolved;