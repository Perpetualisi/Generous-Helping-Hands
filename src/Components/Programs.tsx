import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Briefcase, BookOpen, HeartPulse,
  Image as ImageIcon, ChevronDown, Zap, ArrowUpRight
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Program {
  icon: React.ElementType;
  title: string;
  description: string;
  detail: string;
  tag: string;
  accent: string; // Tailwind color name like 'blue' or 'rose'
  gradient: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROGRAMS: Program[] = [
  {
    icon: Briefcase,
    title: "Economic Empowerment",
    tag: "Independence",
    description: "We give women the skills and start-up support they need to run their own businesses.",
    detail: "Our vocational training covers tailoring, catering, and digital skills. Since 2018, over 200 women have launched independent businesses with our seed grants.",
    accent: "amber",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: BookOpen,
    title: "Education Support",
    tag: "Future Leaders",
    description: "We pay school fees and provide materials so nothing stops girls from finishing school.",
    detail: "Every scholarship covers tuition, books, and uniforms. We also run after-school STEM clubs in five Lagos secondary schools to bridge the tech gap.",
    accent: "rose",
    gradient: "from-rose-500 to-purple-600",
  },
  {
    icon: HeartPulse,
    title: "Health & Wellbeing",
    tag: "Community Care",
    description: "We run free clinics and wellness workshops, bringing care to families who need it most.",
    detail: "Our mobile clinics offer free antenatal checks and medications. Last year, we trained 50 community health ambassadors to serve 1,200+ mothers.",
    accent: "emerald",
    gradient: "from-emerald-400 to-teal-600",
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

// ─── 3D Program Card ──────────────────────────────────────────────────────────

const ProgramCard: React.FC<{ program: Program; index: number }> = ({ program, index }) => {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group h-full"
    >
      <div 
        className={`relative h-full bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-2xl transition-all duration-500 group-hover:shadow-${program.accent}-500/10 flex flex-col`}
        style={{ transform: "translateZ(20px)" }}
      >
        {/* Decorative Background Blur */}
        <div className={`absolute -top-10 -right-10 w-32 h-32 bg-${program.accent}-500/10 blur-[50px] group-hover:bg-${program.accent}-500/20 transition-colors duration-500`} />

        {/* Icon & Tag */}
        <div className="flex justify-between items-start mb-8" style={{ transform: "translateZ(40px)" }}>
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${program.gradient} flex items-center justify-center text-white shadow-lg`}>
            <Icon size={28} />
          </div>
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg bg-${program.accent}-50 dark:bg-${program.accent}-500/10 text-${program.accent}-600 dark:text-${program.accent}-400 border border-${program.accent}-100 dark:border-${program.accent}-500/20`}>
            {program.tag}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            {program.title}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-light mb-6">
            {program.description}
          </p>
        </div>

        {/* Detail Accordion */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic">
                  {program.detail}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white group/btn"
        >
          <span className="relative overflow-hidden">
            <span className="block transition-transform duration-300 group-hover/btn:-translate-y-full">
              {open ? "Close" : "Learn More"}
            </span>
            <span className="absolute top-0 block transition-transform duration-300 translate-y-full group-hover/btn:translate-y-0">
              {open ? "Close" : "Learn More"}
            </span>
          </span>
          <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : "group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"}`} />
        </button>
      </div>
    </motion.div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────

const Programs: React.FC = () => {
  return (
    <section
      id="ourprograms"
      className="relative bg-[#FCFCFD] dark:bg-gray-950 py-24 md:py-40 overflow-hidden"
    >
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[50%] bg-rose-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest mb-6">
              <Zap size={12} fill="currentColor" /> Our Impact
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 dark:text-white leading-[0.9]">
              Our Programs
            </h2>
            <p className="mt-8 text-xl text-gray-500 dark:text-gray-400 font-light leading-relaxed">
              Three focused areas where we put our energy to make real, lasting change for Nigerian women and girls.
            </p>
          </motion.div>

          {/* Ghost Text Background */}
          <div className="hidden lg:block text-[12rem] font-black text-gray-900/[0.02] dark:text-white/[0.02] absolute right-0 top-0 select-none -z-10 tracking-tighter">
            IMPACT
          </div>
        </div>

        {/* 3D Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
          {PROGRAMS.map((program, i) => (
            <ProgramCard key={program.title} program={program} index={i} />
          ))}
        </div>

        {/* ── Events Section ── */}
        <div id="events" className="mt-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 dark:text-white mb-4">
              From the Field
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full" />
          </motion.div>

          {/* Cinematic Bento Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
            {EVENT_PHOTOS.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`${photo.span} relative rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 group cursor-pointer`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <p className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <ImageIcon size={14} /> {photo.alt}
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