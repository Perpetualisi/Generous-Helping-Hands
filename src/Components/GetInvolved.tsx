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

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

const Eyebrow: React.FC<{ icon: React.ElementType; children: React.ReactNode }> = ({ icon: Icon, children }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="inline-flex items-center gap-3 px-5 py-2 bg-[#C9A96E]/10 border border-[#C9A96E]/20 rounded-full mb-8"
  >
    <Icon className="w-3.5 h-3.5 text-[#C9A96E]" />
    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A96E]">{children}</span>
  </motion.div>
);

const PremiumPhoto: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

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
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group w-full max-w-sm" // Reduced from max-w-md
    >
      <div className="absolute inset-0 bg-[#C9A96E]/15 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#141412] p-1.5"> {/* Reduced padding */}
        <img 
          src={src} 
          alt={alt} 
          className="w-full aspect-square object-contain bg-[#0A0908] rounded-[2.2rem] transition-all duration-700 group-hover:scale-105 group-hover:saturate-[1.1]" 
        />
      </div>
    </motion.div>
  );
};

// ─── MAIN SECTION ────────────────────────────────────────────────────────────

const GetInvolved: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="getinvolved" className="relative bg-[#0A0908] py-40 overflow-hidden text-white font-['DM_Sans',sans-serif]">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-[#C9A96E]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[50%] h-[50%] bg-[#C9A96E]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* 01. VOLUNTEER SECTION */}
        <div id="volunteer" className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-48 scroll-mt-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Eyebrow icon={Users}>Collaboration</Eyebrow>
            <h2 className="text-6xl md:text-7xl font-['Playfair_Display'] leading-[1.1] mb-8">
              Your hands can <br /><span className="italic text-[#C9A96E]">build the future.</span>
            </h2>
            <p className="text-xl text-gray-400 font-light leading-relaxed mb-12 max-w-lg border-l border-[#C9A96E]/30 pl-8">
              Whether you have professional skills to share or time to give, your presence strengthens our mission.
            </p>

            <div className="grid gap-4">
              {CONTACT_METHODS.map((m) => (
                <a key={m.label} href={m.href} className="group flex items-center justify-between p-6 rounded-3xl bg-[#141412] border border-white/5 hover:border-[#C9A96E]/40 transition-all duration-500">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#C9A96E]/10 flex items-center justify-center text-[#C9A96E]">
                      <m.icon size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{m.label}</p>
                      <p className="text-white font-medium">{m.display}</p>
                    </div>
                  </div>
                  <ExternalLink size={16} className="text-gray-600 group-hover:text-[#C9A96E] transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>

          <div className="flex justify-center lg:justify-end">
            <PremiumPhoto src="/volut.jpg" alt="Volunteers" />
          </div>
        </div>

        {/* 02. DONATION SECTION */}
        <div id="donation" className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-48 scroll-mt-20">
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <PremiumPhoto src="/donations.jpg" alt="Donations" />
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <Eyebrow icon={Heart}>Impact</Eyebrow>
            <h2 className="text-6xl md:text-7xl font-['Playfair_Display'] leading-[1.1] mb-8">
              Transparency <br /><span className="italic text-[#C9A96E]">in every gift.</span>
            </h2>
            <p className="text-xl text-gray-400 font-light leading-relaxed mb-12 max-w-lg border-l border-[#C9A96E]/30 pl-8">
              No overhead cuts. Your contributions fund education, livelihoods, and medical outreach directly.
            </p>

            <div className="space-y-8 mb-12">
              {DONATION_METHODS.map((m) => (
                <div key={m.title} className="flex gap-6">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-[#C9A96E]/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#C9A96E]" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-2">{m.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-8">
              <motion.a
                href="mailto:Giversgenerous@gmail.com"
                whileHover={{ scale: 1.05 }}
                className="px-10 py-5 bg-[#C9A96E] text-black rounded-full font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 shadow-[0_10px_30px_rgba(201,169,110,0.3)]"
              >
                Request Details <ArrowRight size={14} />
              </motion.a>
              <div className="flex items-center gap-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <ShieldCheck size={16} className="text-[#C9A96E]" /> Guaranteed Secure
              </div>
            </div>
          </motion.div>
        </div>

        {/* 03. FAQ SECTION */}
        <div id="faq" className="max-w-3xl mx-auto pt-20 border-t border-white/5 scroll-mt-20">
          <div className="text-center mb-20">
            <Eyebrow icon={Sparkles}>Clarity</Eyebrow>
            <h2 className="text-5xl font-['Playfair_Display']">Common Questions</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="group bg-[#141412] rounded-[2rem] border border-white/5 overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-10 py-8 flex items-center justify-between text-left transition-colors"
                >
                  <span className={`text-lg font-medium transition-colors ${openFaq === i ? 'text-[#C9A96E]' : 'text-white group-hover:text-[#C9A96E]'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown className={`text-[#C9A96E] transition-transform duration-500 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="px-10 pb-8 text-gray-400 font-light leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default GetInvolved;