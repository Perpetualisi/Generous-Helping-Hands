import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import {
  Briefcase, BookOpen, HeartPulse, Star,
  Image as ImageIcon, Sparkles, ArrowUpRight, ArrowRight
} from "lucide-react";

// ─── PREMIUM DESIGN SYSTEM ──────────────────────────────────────────────────
const THEME = {
  gold: "linear-gradient(135deg, #D4AF37 0%, #F59E0B 50%, #B8860B 100%)",
  goldSolid: "#D4AF37",
  bgWarm: "#FFFDF9",
  textMain: "#2D241E",
  glassBorder: "rgba(212, 175, 55, 0.15)",
  cardWhite: "rgba(255, 255, 255, 0.7)",
};

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────
const revealVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.23, 1, 0.32, 1] } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

// ─── TYPES & DATA ──────────────────────────────────────────────────────────
interface Program {
  icon: React.ElementType;
  title: string;
  description: string;
  detail: string;
  tag: string;
}

const PROGRAMS: Program[] = [
  {
    icon: Briefcase,
    title: "Economic Empowerment",
    tag: "Independence",
    description: "Helping women gain financial independence through training, resources, and support to build sustainable livelihoods.",
    detail: "Our vocational training covers tailoring, catering, and digital skills. Since 2018, over 200 women have launched independent businesses with our seed grants and mentorship support.",
  },
  {
    icon: BookOpen,
    title: "Educational Initiatives",
    tag: "Future Leaders",
    description: "Providing scholarships, mentorship, and workshops that unlock learning and open doors for women, girls, and young people.",
    detail: "Every scholarship covers tuition, books, and uniforms. We also run after-school STEM clubs in secondary schools to bridge the opportunity gap for girls in tech.",
  },
  {
    icon: HeartPulse,
    title: "Health & Wellbeing",
    tag: "Community Care",
    description: "Ensuring access to vital sexual and reproductive health information and services so individuals can live healthy, confident lives.",
    detail: "Our mobile clinics offer free health checks. Last year, we trained 50 community health ambassadors to serve over 1,200 mothers across Lagos.",
  },
  {
    icon: Star,
    title: "Youth Empowerment",
    tag: "Next Generation",
    description: "Equipping young people with leadership skills, life skills, and opportunities to realize their potential and become agents of change.",
    detail: "Our youth programmes run leadership academies, mentorship circles, and community action projects — giving young people the confidence to drive change.",
  },
];

const EVENT_PHOTOS = [
  { src: "/event11.jpeg", alt: "Community outreach", gridArea: "large" },
  { src: "/event22.jpeg", alt: "Skills training",     gridArea: "top-right" },
  { src: "/events3.jpg",  alt: "Youth mentorship",    gridArea: "mid-right" },
  { src: "/events4.jpg",  alt: "Medical outreach",    gridArea: "bottom-left" },
  { src: "/events5.jpg",  alt: "Empowerment summit", gridArea: "bottom-mid" },
  { src: "/events6.jpg",  alt: "Advocacy walk",       gridArea: "bottom-right" },
];

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────
const PremiumEyebrow: React.FC<{ icon: React.ElementType; children: React.ReactNode }> = ({ icon: Icon, children }) => (
  <motion.div 
    variants={revealVariants}
    className="inline-flex items-center gap-3 px-5 py-2 rounded-full mb-8"
    style={{ background: "rgba(212, 175, 55, 0.05)", border: `1px solid ${THEME.glassBorder}` }}
  >
    <Icon size={14} style={{ color: THEME.goldSolid }} />
    <span className="font-['DM_Sans'] text-[0.65rem] font-black tracking-[0.3em] uppercase text-amber-800">
      {children}
    </span>
  </motion.div>
);

// Removed unused 'index' prop to pass build checks
const ProgramCard: React.FC<{ program: Program; isMobile: boolean }> = ({ program, isMobile }) => {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={(e) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (rect && !isMobile) {
          x.set((e.clientX - rect.left) / rect.width - 0.5);
          y.set((e.clientY - rect.top) / rect.height - 0.5);
        }
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      variants={revealVariants}
      className="group"
    >
      <div className="relative overflow-hidden p-8 md:p-10 rounded-[2.5rem] h-full flex flex-col transition-all duration-700 border border-stone-100 backdrop-blur-md"
           style={{ background: THEME.cardWhite, boxShadow: "0 20px 50px rgba(0,0,0,0.03)" }}>
        
        <div className="flex justify-between items-start mb-10">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:bg-amber-500 group-hover:text-white"
               style={{ background: "rgba(212,175,55,0.1)", color: THEME.goldSolid, border: `1px solid ${THEME.glassBorder}` }}>
            <program.icon size={20} />
          </div>
          <span className="text-[0.55rem] font-black tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-amber-100 text-amber-700 bg-white/50">
            {program.tag}
          </span>
        </div>

        <h3 className="font-['Playfair_Display'] text-2xl font-bold text-stone-800 mb-6 leading-tight">
          {program.title}
        </h3>
        
        <p className="text-stone-500 text-sm font-light leading-relaxed mb-8 flex-grow">
          {program.description}
        </p>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-amber-100 pt-6 mb-6"
            >
              <p className="font-['Playfair_Display'] text-amber-700 italic text-md leading-relaxed">
                {program.detail}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 text-stone-900 text-[0.6rem] font-black tracking-[0.3em] uppercase group/btn mt-auto"
        >
          <span className="group-hover/btn:text-amber-600 transition-colors">{open ? "Show Less" : "Discover Impact"}</span>
          <motion.div animate={{ rotate: open ? 45 : 0 }} className="text-amber-500">
            <ArrowUpRight size={16} />
          </motion.div>
        </button>
      </div>
    </motion.div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const Programs: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ background: THEME.bgWarm, color: THEME.textMain }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500;700;900&display=swap');
        .gold-text { background: ${THEME.gold}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .event-grid-premium {
          display: grid;
          gap: 1.5rem;
          grid-template-areas: 
            "large large top-right"
            "large large mid-right"
            "bottom-left bottom-mid bottom-right";
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 240px;
        }
        @media (max-width: 1024px) {
          .event-grid-premium {
            grid-template-areas: none;
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 200px;
          }
        }
        @media (max-width: 640px) {
          .event-grid-premium {
            grid-template-columns: 1fr;
            grid-auto-rows: 300px;
          }
        }
      `}</style>

      <section id="ourprograms" className="py-24 md:py-48 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="mb-20 md:mb-32"
        >
          <PremiumEyebrow icon={Sparkles}>Our Programs</PremiumEyebrow>
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <motion.h2 variants={revealVariants} className="font-['Playfair_Display'] text-4xl md:text-[5.5rem] font-bold leading-[0.95] tracking-tighter">
              Creating <br /><em className="gold-text italic font-normal">Real Impact.</em>
            </motion.h2>
            <motion.p variants={revealVariants} className="text-stone-500 text-lg md:text-xl font-light leading-relaxed border-l-2 border-amber-500/20 pl-8">
              We empower women, girls, and youth to thrive through programs that create real, lasting change — from financial independence and education to health and leadership.
            </motion.p>
          </div>
        </motion.div>

        {/* Programs Grid */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-40 md:mb-64"
        >
          {PROGRAMS.map((p, i) => (
            <ProgramCard key={i} program={p} isMobile={isMobile} />
          ))}
        </motion.div>

        {/* Gallery */}
        <div id="events" className="relative">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-stone-200 pb-12"
          >
            <div>
              <PremiumEyebrow icon={ImageIcon}>Field Operations</PremiumEyebrow>
              <h3 className="font-['Playfair_Display'] text-3xl md:text-5xl font-bold">In the Field</h3>
            </div>
            <div className="text-right">
               <p className="text-stone-400 text-[0.65rem] font-black tracking-[0.4em] uppercase">Real Moments, Real Change</p>
            </div>
          </motion.div>

          <div className="event-grid-premium">
            {EVENT_PHOTOS.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group overflow-hidden rounded-[2.5rem] bg-stone-100 shadow-xl shadow-stone-900/5"
                style={{ gridArea: isMobile ? "auto" : photo.gridArea }}
              >
                <img 
                  src={photo.src} 
                  alt={photo.alt} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-8 flex flex-col justify-end">
                   <div className="flex items-center gap-3 text-white">
                      <ImageIcon size={14} className="text-amber-500" />
                      <span className="text-[0.6rem] font-black uppercase tracking-widest">{photo.alt}</span>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="mt-20 flex justify-center"
          >
            <button className="flex items-center gap-6 text-stone-900 font-black text-[0.6rem] tracking-[0.5em] uppercase px-12 py-6 rounded-full border border-stone-200 hover:border-amber-500/50 hover:bg-white transition-all shadow-lg shadow-amber-900/5">
              View Full Gallery <ArrowRight size={16} className="text-amber-500" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-200/10 blur-[150px] -z-10 rounded-full" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-orange-200/10 blur-[150px] -z-10 rounded-full" />
    </div>
  );
};

export default Programs;