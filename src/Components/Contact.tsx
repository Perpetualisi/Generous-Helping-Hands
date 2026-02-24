import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Share2, MapPin, Heart, ArrowRight, Sparkles } from "lucide-react";

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

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface ContactInfo {
  icon: React.ElementType;
  title: string;
  content: string;
  link?: string;
}

// ─── DATA (RETAINED) ──────────────────────────────────────────────────────────
const CONTACT_INFO: ContactInfo[] = [
  { icon: Phone, title: "Phone", content: "+234 903 685 4354", link: "tel:+2349036854354" },
  { icon: Mail, title: "Email", content: "Giversgenerous@gmail.com", link: "mailto:Giversgenerous@gmail.com" },
  { icon: Share2, title: "Social Media", content: "@GenerousHelpingHands", link: "https://instagram.com/generoushelpinghands" },
  { icon: MapPin, title: "Location", content: "Lagos, Nigeria" },
];

// ─── CONTACT ROW ──────────────────────────────────────────────────────────────
const ContactRow: React.FC<{ info: ContactInfo }> = ({ info }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = info.icon;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-4 p-3 rounded-2xl transition-all duration-300"
      style={{ background: hovered ? "rgba(212, 175, 55, 0.08)" : "transparent" }}
    >
      <div 
        className="w-11 h-11 flex-shrink-0 rounded-xl flex items-center justify-center transition-all duration-400"
        style={{ 
          background: hovered ? THEME.goldSolid : "rgba(212, 175, 55, 0.1)",
        }}
      >
        <Icon size={18} color={hovered ? "#fff" : THEME.goldSolid} style={{ transition: "color 0.4s ease" }} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[0.6rem] font-black uppercase tracking-[0.15em] text-stone-400 mb-1 font-['DM_Sans']">
          {info.title}
        </p>
        {info.link ? (
          <a
            href={info.link}
            target={info.link.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="font-medium text-stone-800 transition-colors duration-300 block overflow-wrap-anywhere leading-snug"
            style={{ 
              fontSize: "clamp(0.85rem, 3vw, 0.95rem)",
              color: hovered ? THEME.goldSolid : "#2D241E" 
            }}
          >
            {info.content}
          </a>
        ) : (
          <p className="font-medium text-stone-800 overflow-wrap-anywhere" style={{ fontSize: "clamp(0.85rem, 3vw, 0.95rem)" }}>
            {info.content}
          </p>
        )}
      </div>
    </div>
  );
};

// ─── CONTACT SECTION ──────────────────────────────────────────────────────────
const Contact: React.FC = () => {
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden font-['DM_Sans']" style={{ background: THEME.bgWarm }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;700;900&display=swap');
        .ct-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 2.5rem; }
        .gold-text { background: ${THEME.gold}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        @media (max-width: 991px) { .ct-grid { grid-template-columns: 1fr; } }
        @media (max-width: 500px) { .ct-cta-btns { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] blur-[120px] rounded-full opacity-30"
             style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: THEME.accentCream, border: `1px solid ${THEME.glassBorder}` }}
          >
            <Heart size={12} style={{ color: THEME.goldSolid }} />
            <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-amber-800">
              Connect With Us
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-['Playfair_Display'] text-4xl md:text-6xl text-stone-800 font-bold leading-tight"
          >
            Get in <span className="gold-text italic font-normal">Touch.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="max-w-lg mx-auto text-stone-500 text-lg mt-6 font-light leading-relaxed"
          >
            Together, we can create a brighter future for women and girls everywhere.
          </motion.p>
        </div>

        <div className="ct-grid">
          {/* Card 1: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 border border-stone-100 shadow-xl shadow-stone-200/50"
          >
            <div className="flex items-center gap-3 mb-8">
              <Mail size={18} style={{ color: THEME.goldSolid }} />
              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-stone-800">Inquiries</h3>
            </div>
            <div className="flex flex-col gap-2">
              {CONTACT_INFO.map((info, i) => (
                <ContactRow key={i} info={info} />
              ))}
            </div>
          </motion.div>

          {/* Card 2: CTA Callout */}
          <motion.div
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-center"
            style={{ background: THEME.gold, color: "#fff" }}
          >
            {/* Animated Decor */}
            <div 
              className="absolute -top-10 -right-10 opacity-10 transition-transform duration-700"
              style={{ transform: ctaHovered ? "scale(1.1) rotate(15deg)" : "scale(1) rotate(0deg)" }}
            >
              <Sparkles size={220} />
            </div>

            <div className="relative z-10">
              <p className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-white/60 mb-4">
                Support Our Mission
              </p>
              <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold italic mb-6 leading-tight">
                Ready to Make a Difference?
              </h3>
              <p className="text-white/80 text-lg font-light mb-10 leading-relaxed">
                Join us in empowering women and girls through direct action.
              </p>

              <div className="ct-cta-btns grid grid-cols-2 gap-4">
                <motion.a
                  href="#donation"
                  whileHover={{ y: -3, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-stone-900 text-white py-4 rounded-full text-center text-[0.7rem] font-bold uppercase tracking-widest flex items-center justify-center gap-2 no-underline shadow-lg transition-all"
                >
                  Donate <ArrowRight size={14} />
                </motion.a>
                <motion.a
                  href="#volunteer"
                  whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/10 backdrop-blur-sm text-white py-4 rounded-full text-center text-[0.7rem] font-bold uppercase tracking-widest no-underline border border-white/20 transition-all"
                >
                  Volunteer
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;