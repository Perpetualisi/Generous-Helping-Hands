import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Quote, Star, Sparkles } from "lucide-react";

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
interface Testimonial {
  message: string;
  name: string;
  role?: string;
  rating?: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    message: "Volunteering with GHHF has been one of the most rewarding experiences of my life. I've seen firsthand the positive impact this organization has on women and girls.",
    name: "Tolu Alvaro",
    role: "Volunteer",
    rating: 5,
  },
  {
    message: "From advocacy to education, the work they do is comprehensive and transformative. It's amazing to be part of a team that's genuinely making a difference.",
    name: "Aisha Yuhui",
    role: "Community Partner",
    rating: 5,
  },
  {
    message: "Supporting GHHF is an investment in a better future for women and girls. I've been consistently impressed with the transparency and effectiveness of their programs.",
    name: "Kunbi Ola",
    role: "Donor",
    rating: 5,
  },
];

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────
const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xs = useSpring(x, { stiffness: 120, damping: 20 });
  const ys = useSpring(y, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(ys, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(xs, [-0.5, 0.5], ["-6deg", "6deg"]);

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="h-full"
    >
      <div className="relative h-full p-10 rounded-[2.5rem] flex flex-col transition-all duration-500 border border-stone-100 bg-white/70 backdrop-blur-md shadow-2xl shadow-stone-200/50"
           style={{ borderColor: hovered ? THEME.goldSolid : "rgba(0,0,0,0.03)" }}>

        {/* Quote badge */}
        <div className="absolute -top-4 right-10 p-3 rounded-2xl shadow-lg transition-transform duration-500"
             style={{ 
               background: THEME.goldSolid, 
               transform: hovered ? "rotate(0deg)" : "rotate(12deg)",
               boxShadow: "0 10px 25px rgba(212, 175, 55, 0.3)" 
             }}>
          <Quote size={20} className="text-white" />
        </div>

        {/* Stars */}
        <div className="flex gap-1 mb-8" style={{ transform: "translateZ(30px)" }}>
          {[...Array(testimonial.rating ?? 5)].map((_, i) => (
            <Star key={i} size={14} fill={THEME.goldSolid} color={THEME.goldSolid} />
          ))}
        </div>

        {/* Message */}
        <div className="flex-grow mb-10" style={{ transform: "translateZ(40px)" }}>
          <p className="text-stone-500 font-light italic leading-relaxed text-lg font-['DM_Sans']">
            &ldquo;{testimonial.message}&rdquo;
          </p>
        </div>

        {/* Author */}
        <div className="pt-8 border-t border-stone-100" style={{ transform: "translateZ(20px)" }}>
          <p className="font-['Playfair_Display'] text-xl font-bold text-stone-800 leading-tight">
            {testimonial.name}
          </p>
          {testimonial.role && (
            <p className="text-amber-600 text-[0.6rem] font-black uppercase tracking-[0.2em] mt-2 font-['DM_Sans']">
              {testimonial.role}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const Testimonials: React.FC = () => {
  return (
    <div id="testimonials" className="relative py-32 md:py-48 overflow-hidden" style={{ background: THEME.bgWarm, color: THEME.textMain }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;700;900&display=swap');
        .gold-text { background: ${THEME.gold}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .tm-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          perspective: 2000px;
        }
        @media (max-width: 1024px) {
          .tm-grid { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
        }
        @media (max-width: 640px) {
          .tm-grid { grid-template-columns: 1fr; gap: 1.5rem; }
        }
      `}</style>

      {/* Ambient Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-amber-200/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full mb-8"
            style={{ background: THEME.accentCream, border: `1px solid ${THEME.glassBorder}` }}
          >
            <Sparkles size={14} style={{ color: THEME.goldSolid }} />
            <span className="font-['DM_Sans'] text-[0.62rem] font-black tracking-[0.3em] uppercase text-amber-800">
              Voice of the Community
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-['Playfair_Display'] text-4xl md:text-7xl font-bold leading-tight mb-8 text-stone-800"
          >
            Trusted <em className="gold-text italic font-normal">Testimonials.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="max-w-xl mx-auto text-stone-500 text-lg md:text-xl font-light leading-relaxed font-['DM_Sans']"
          >
            Real stories from those who have walked beside us in our journey to empower women and girls across Nigeria.
          </motion.p>
        </div>

        {/* GRID */}
        <div className="tm-grid">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* BOTTOM LABEL */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <p className="text-[0.6rem] font-black uppercase tracking-[0.5em] text-amber-900/30 font-['DM_Sans']">
            Impact in Motion
          </p>
        </motion.div>

      </div>

      {/* Background Accents */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-amber-100/20 blur-[150px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-orange-100/20 blur-[150px] rounded-full -z-10" />
    </div>
  );
};

export default Testimonials;