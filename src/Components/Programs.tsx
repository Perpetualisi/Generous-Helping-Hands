import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Briefcase, BookOpen, HeartPulse,
  Image as ImageIcon, Sparkles, ArrowUpRight
} from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface Program {
  icon: React.ElementType;
  title: string;
  description: string;
  detail: string;
  tag: string;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const PROGRAMS: Program[] = [
  {
    icon: Briefcase,
    title: "Economic Empowerment",
    tag: "Independence",
    description: "We give women the skills and start-up support they need to run their own businesses.",
    detail: "Our vocational training covers tailoring, catering, and digital skills. Since 2018, over 200 women have launched independent businesses with our seed grants.",
  },
  {
    icon: BookOpen,
    title: "Education Support",
    tag: "Future Leaders",
    description: "We pay school fees and provide materials so nothing stops girls from finishing school.",
    detail: "Every scholarship covers tuition, books, and uniforms. We also run after-school STEM clubs in five Lagos secondary schools to bridge the tech gap.",
  },
  {
    icon: HeartPulse,
    title: "Health & Wellbeing",
    tag: "Community Care",
    description: "We run free clinics and wellness workshops, bringing care to families who need it most.",
    detail: "Our mobile clinics offer free antenatal checks and medications. Last year, we trained 50 community health ambassadors to serve 1,200+ mothers.",
  },
];

const EVENT_PHOTOS = [
  { src: "/event11.jpeg", alt: "Community outreach", span: "md:col-span-2 md:row-span-2" },
  { src: "/event22.jpeg", alt: "Skills training", span: "col-span-1" },
  { src: "/events3.jpg", alt: "Youth mentorship", span: "col-span-1" },
  { src: "/events4.jpg", alt: "Medical outreach", span: "md:col-span-2" },
  { src: "/events5.jpg", alt: "Empowerment summit", span: "col-span-1" },
  { src: "/events6.jpg", alt: "Advocacy walk", span: "col-span-1" },
];

// ─── 3D PROGRAM CARD ──────────────────────────────────────────────────────────

const ProgramCard: React.FC<{ program: Program; index: number }> = ({ program, index }) => {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = program.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative group h-full"
    >
      <div 
        className="relative h-full bg-[#141412] rounded-[2.5rem] p-10 border border-white/5 flex flex-col overflow-hidden transition-all duration-500 group-hover:border-[#C9A96E]/40 shadow-2xl"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="flex justify-between items-start mb-10" style={{ transform: "translateZ(40px)" }}>
          <div className="w-16 h-16 rounded-2xl bg-[#C9A96E]/10 flex items-center justify-center text-[#C9A96E] border border-[#C9A96E]/20 shadow-[0_0_20px_rgba(201,169,110,0.1)]">
            <Icon size={28} strokeWidth={1.5} />
          </div>
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#C9A96E] border border-[#C9A96E]/20 px-3 py-1.5 rounded-lg bg-[#C9A96E]/5">
            {program.tag}
          </span>
        </div>

        <div className="flex-1" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-3xl font-['Playfair_Display'] font-bold text-white mb-4 leading-tight">
            {program.title}
          </h3>
          <p className="text-gray-400 font-light leading-relaxed mb-8">
            {program.description}
          </p>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="pt-6 border-t border-white/5">
                <p className="text-sm text-[#C9A96E] leading-relaxed italic font-light">
                  {program.detail}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#C9A96E] group/btn mt-auto"
        >
          {open ? "Show Less" : "Discover Impact"}
          <ArrowUpRight className={`w-4 h-4 transition-all duration-500 ${open ? "rotate-45" : "group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"}`} />
        </button>
      </div>
    </motion.div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const Programs: React.FC = () => {
  return (
    <section id="ourprograms" className="relative bg-[#0A0908] py-40 overflow-hidden text-white font-['DM_Sans',sans-serif]">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#C9A96E]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2 bg-[#C9A96E]/10 border border-[#C9A96E]/20 rounded-full mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A96E]">Our Strategic Pillars</span>
          </motion.div>
          
          <h2 className="text-6xl md:text-8xl font-['Playfair_Display'] leading-[1.05] mb-10 tracking-tight">
            Direct <span className="italic text-[#C9A96E]">Interventions.</span>
          </h2>
          <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed border-l border-[#C9A96E]/30 pl-8">
            Meaningful change requires more than just charity. It requires structured programs that provide the tools for self-reliance and community health.
          </p>
        </div>

        {/* 3D Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 perspective-2000">
          {PROGRAMS.map((program, i) => (
            <ProgramCard key={program.title} program={program} index={i} />
          ))}
        </div>

        {/* ── Colorful Bento Gallery ── */}
        <div id="events" className="mt-48">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 border-b border-white/10 pb-10">
            <h2 className="text-5xl font-['Playfair_Display']">In the Field</h2>
            <p className="text-[#C9A96E] font-bold text-[10px] uppercase tracking-[0.3em] mt-4 md:mt-0">Real Moments, Real Change</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-6">
            {EVENT_PHOTOS.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`${photo.span} relative rounded-[2.5rem] overflow-hidden bg-[#141412] group border border-white/5 shadow-lg`}
              >
                {/* Removed grayscale, added vibrant hover effect */}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:saturate-[1.2]"
                />
                
                {/* Overlay for text legibility on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8">
                  <p className="text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
                    <ImageIcon size={14} className="text-[#C9A96E]" /> {photo.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;