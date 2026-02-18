import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Users, TrendingUp, Shield, Target, Quote, Globe, Sparkles, ArrowUpRight } from "lucide-react";

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────
const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

// ─── ASSETS (Nigerian Context) ───────────────────────────────────────────────
const IMAGE_ASSETS = {
  heritage: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2070&auto=format&fit=crop", // Community gathering
  mission_bg: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=2031&auto=format&fit=crop", // Warm, hopeful portraits
};

const VISION_POINTS = [
  { icon: TrendingUp, title: "Stable Futures", text: "Empowering Nigerian families toward long-term economic independence." },
  { icon: Shield, title: "Dignity & Care", text: "Ensuring access to basic healthcare and nutritional security." },
  { icon: Users, title: "Stronger Communities", text: "Building local resilience through trust and shared values." },
];

const TEAM_MEMBERS = [
  { name: "Leadership", role: "Vision & Strategy", emoji: "🎯", description: "Providing direction and leadership to drive our mission forward." },
  { name: "Program Coordinators", role: "Community Programs", emoji: "📦", description: "Planning and delivering outreach programs that meet real needs." },
  { name: "Education & Welfare", role: "Learning & Support", emoji: "📚", description: "Supporting access to education and skills development." },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
const PremiumBadge = ({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) => (
  <motion.div 
    variants={fadeIn}
    className="inline-flex items-center gap-3 px-5 py-2 bg-[#C9A96E]/10 border border-[#C9A96E]/20 rounded-full mb-8"
  >
    <Icon className="w-3.5 h-3.5 text-[#C9A96E]" />
    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A96E]">{children}</span>
  </motion.div>
);

const About = () => {
  const heritageRef = useRef(null);
  const isHeritageInView = useInView(heritageRef, { once: true, margin: "-100px" });

  return (
    <div className="bg-[#0A0908] text-white font-['DM_Sans',sans-serif] selection:bg-[#C9A96E] selection:text-black">
      
      {/* 1. WHY OUR WORK MATTERS */}
      <section id="whyitmatters" className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative z-10 max-w-5xl mx-auto text-center"
        >
          <PremiumBadge icon={Globe}>Lagos • Abuja • Port Harcourt</PremiumBadge>
          <motion.h1 variants={fadeIn} className="text-5xl md:text-8xl font-['Playfair_Display'] leading-[1.05] mb-10 tracking-tight">
            Every Hand <span className="italic text-[#C9A96E]">Lifts</span> <br/>
            a Thriving Future.
          </motion.h1>
          <motion.div variants={fadeIn} className="flex flex-col items-center gap-8">
            <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
              In the vibrant heart of Nigeria, potential often meets unyielding barriers. We are the bridge between survival and <span className="text-white font-medium">soaring success.</span>
            </p>
            <div className="w-px h-24 bg-gradient-to-b from-[#C9A96E] to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. OUR STORY (Editorial Scroll Reveal) */}
      <section id="ourstory" ref={heritageRef} className="py-40 px-6 relative bg-white text-[#0A0908]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={isHeritageInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative group"
          >
            <div className="absolute -inset-4 border border-[#C9A96E]/20 rounded-[2.5rem] scale-95 group-hover:scale-100 transition-transform duration-700" />
            <img 
              src={IMAGE_ASSETS.heritage} 
              alt="Nigerian Heritage" 
              className="rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] z-10 relative"
            />
            <div className="absolute bottom-8 left-8 z-20 bg-white/90 backdrop-blur-md p-6 rounded-xl border-l-4 border-[#C9A96E]">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#C9A96E] mb-1">Impact Verified</p>
              <p className="font-['Playfair_Display'] text-xl italic font-bold">Reshaping 1,200+ Lives</p>
            </div>
          </motion.div>

          <div className="space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={isHeritageInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-[#C9A96E] text-xs font-black uppercase tracking-[0.4em] mb-4">The Heritage</h2>
              <h2 className="text-5xl md:text-6xl font-['Playfair_Display'] font-bold leading-[1.15]">
                A legacy built on <br/>
                <span className="italic">unwavering</span> empathy.
              </h2>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isHeritageInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6 text-lg text-gray-600 font-light leading-relaxed"
            >
              <p>
                Generous Helping Hands Foundation began as a quiet promise to the neighborhoods of Nigeria. We recognized that poverty isn't a lack of character—it's a lack of <span className="text-black font-semibold">access.</span>
              </p>
              <p>
                Our history is written in the success stories of local traders, the health of our elders, and the laughter in our schools. We don't just give; we invest in the human spirit.
              </p>
              <button className="flex items-center gap-3 text-[#C9A96E] font-bold text-xs uppercase tracking-widest pt-4 group">
                Download Impact Report <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. OUR MISSION */}
      <section id="missionstatement" className="relative py-48 px-6 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img src={IMAGE_ASSETS.mission_bg} className="w-full h-full object-cover opacity-30 grayscale" alt="" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0908] via-[#0A0908]/80 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <PremiumBadge icon={Target}>Our Core Mission</PremiumBadge>
            <h2 className="text-5xl md:text-7xl font-['Playfair_Display'] text-white mb-8 leading-tight">
              Compassion <br/>in Action.
            </h2>
            <p className="text-xl text-gray-300 font-light leading-relaxed border-l border-[#C9A96E]/40 pl-8">
              "To improve lives through practical assistance, focusing on measurable impact and personal dignity for every Nigerian we serve."
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. OUR VISION GRID */}
      <section id="visionstatement" className="py-40 px-6 bg-[#0A0908] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <PremiumBadge icon={Sparkles}>Strategic Horizon</PremiumBadge>
            <h2 className="text-5xl md:text-6xl font-['Playfair_Display'] text-white">Shaping Tomorrow</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {VISION_POINTS.map((v, i) => (
              <motion.div 
                key={v.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                viewport={{ once: true }}
                className="p-12 bg-[#141412] border border-white/5 rounded-[3rem] hover:border-[#C9A96E]/30 transition-all duration-500 relative group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <v.icon className="w-10 h-10 text-[#C9A96E] mb-8" />
                <h3 className="font-bold text-2xl mb-4 font-['Playfair_Display'] text-white uppercase tracking-tight">{v.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 5. MEET THE TEAM (Minimalist Premium) */}
      <section id="meettheteam" className="py-40 px-6 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-24">
            <h2 className="text-5xl font-['Playfair_Display']">The Stewards</h2>
            <p className="text-[#C9A96E] font-bold text-xs uppercase tracking-[0.3em] mt-4 md:mt-0">Leading with Integrity</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {TEAM_MEMBERS.map((member, i) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group cursor-default"
              >
                <div className="relative mb-8 overflow-hidden rounded-2xl bg-[#F4F4F4] aspect-[4/5] flex items-center justify-center text-7xl grayscale group-hover:grayscale-0 transition-all duration-700">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  {member.emoji}
                </div>
                <h3 className="text-2xl font-['Playfair_Display'] font-bold mb-2">{member.name}</h3>
                <p className="text-[#C9A96E] text-[10px] font-black uppercase tracking-[0.2em] mb-4">{member.role}</p>
                <p className="text-gray-500 text-sm font-light leading-relaxed pr-6">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;