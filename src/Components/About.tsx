import React, { useRef } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue, 
  type Variants 
} from "framer-motion";
import {
  Users, Globe, Sparkles, Heart, Target, Download, Quote, ArrowUpRight
} from "lucide-react";

/**
 * THEME COLORS
 * Reflecting a premium, warm "Ice Cream" aesthetic
 */
const COLORS = {
  accent: "#D4AF37", // Gold Primary
  textMain: "#2D241E",
  bgWarm: "#FFFDF9",
};

// --- ANIMATION VARIANTS ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

// --- REUSABLE COMPONENTS ---

const PremiumEyebrow: React.FC<{ icon: React.ElementType; children: React.ReactNode }> = ({ icon: Icon, children }) => (
  <motion.div 
    variants={fadeUp}
    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 md:mb-6 bg-white shadow-sm"
    style={{ borderColor: "rgba(212,175,55,0.15)" }}
  >
    <Icon size={12} className="text-[#D4AF37]" />
    <span className="font-['DM_Sans'] text-[0.6rem] font-bold tracking-[0.1em] uppercase text-amber-800 whitespace-nowrap">
      {children}
    </span>
  </motion.div>
);

const ImpactTicker = () => (
  <div className="w-full bg-stone-900 py-4 overflow-hidden flex whitespace-nowrap border-y border-white/5">
    <motion.div 
      animate={{ x: [0, -1000] }} 
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="flex gap-12 items-center"
    >
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex items-center gap-6">
          <span className="text-white/20 font-serif text-xl">●</span>
          <span className="text-[#D4AF37] font-bold tracking-[0.2em] uppercase text-[0.55rem] md:text-[0.65rem]">Impact Verified</span>
          <span className="text-white font-['Playfair_Display'] text-sm md:text-xl italic">500+ Lives Reshaped</span>
        </div>
      ))}
    </motion.div>
  </div>
);

const InteractiveTeamCard: React.FC<{ title: string; role: string; initial: string; desc: string }> = ({ title, role, initial, desc }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]));

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      variants={fadeUp}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative h-full"
    >
      <div className="bg-white rounded-2xl p-6 md:p-8 h-full border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500 group-hover:border-amber-200">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-amber-50 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors">
             <span className="font-['Playfair_Display'] text-xl md:text-2xl font-bold text-[#D4AF37] group-hover:text-white">{initial}</span>
        </div>
        <div className="text-[0.55rem] md:text-[0.6rem] font-black tracking-widest text-amber-600 uppercase mb-2">{role}</div>
        <h3 className="font-['Playfair_Display'] text-xl md:text-2xl font-bold mb-3 text-stone-800">{title}</h3>
        <p className="text-stone-500 font-light leading-relaxed text-xs md:text-sm">{desc}</p>
      </div>
    </motion.div>
  );
};

const About: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const imageScale = useTransform(scrollYProgress, [0.1, 0.4], [1, 1.05]);

  return (
    <div ref={containerRef} className="relative overflow-hidden w-full selection:bg-amber-100 selection:text-amber-900" style={{ background: COLORS.bgWarm, color: COLORS.textMain }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500;700;900&display=swap');
        html { scroll-behavior: smooth; }
        .text-balance { text-wrap: balance; }
      `}</style>

      {/* ─── SECTION 1: HERO ─── */}
      <section id="whyitmatters" className="pt-16 pb-12 lg:pt-40 lg:pb-32 px-5">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-6xl mx-auto text-center">
          <PremiumEyebrow icon={Globe}>Empowering Women · Uplifting Communities</PremiumEyebrow>
          
          <motion.div variants={fadeUp} className="mb-8 lg:mb-16">
            <h1 className="font-['Playfair_Display'] text-3xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-stone-900">
              Every Woman, Every Girl
              <span className="block italic font-normal text-[#D4AF37] mt-2">Deserves to Rise.</span>
            </h1>
            <p className="mt-6 md:mt-8 text-stone-500 text-base md:text-2xl font-light italic">
              Because dignity is not a privilege — it is a right.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-3 lg:gap-6 text-left max-w-5xl mx-auto mb-12 lg:mb-16">
            <div className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-amber-50 shadow-sm flex flex-col justify-center">
              <p className="text-stone-700 leading-relaxed font-light text-sm md:text-xl">
                We exist to empower those most often left behind — removing barriers to <span className="text-amber-600 font-medium">education, economic opportunity, and essential human rights.</span>
              </p>
            </div>
            <div className="bg-stone-900 p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] text-stone-300 flex flex-col justify-center">
              <p className="leading-relaxed opacity-90 font-light text-xs md:text-base">
                Through compassionate community engagement, youth empowerment, and advocacy, our work strengthens families, uplifts communities, and creates lasting change.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 max-w-5xl mx-auto">
            {[
                { l: "Lives Impacted", v: "500+" },
                { l: "Programs", v: "10+" },
                { l: "Est. Year", v: "2014" },
                { l: "Commitment", v: "100%" }
            ].map((stat, i) => (
                <motion.div key={i} variants={fadeUp} className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-white border border-stone-100">
                    <div className="text-2xl md:text-4xl font-bold font-['Playfair_Display'] text-[#D4AF37]">{stat.v}</div>
                    <div className="text-[0.5rem] md:text-[0.6rem] font-black uppercase tracking-widest text-stone-400 mt-1">{stat.l}</div>
                </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* MOVING TICKER */}
      <ImpactTicker />

      {/* ─── SECTION 2: OUR STORY ─── */}
      <section id="ourstory" className="py-12 lg:py-32 px-5 bg-stone-50/50">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          <motion.div style={{ scale: imageScale }} className="relative order-2 lg:order-1">
            <div className="absolute -inset-2 md:-inset-4 bg-amber-100/50 rounded-[2rem] md:rounded-[3rem] -z-10 rotate-2" />
            <div className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2070" 
                className="w-full aspect-square md:aspect-[4/5] object-cover" 
                alt="Nigerian community support" 
              />
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-4 md:space-y-6 lg:order-2">
            <PremiumEyebrow icon={Heart}>Our Story</PremiumEyebrow>
            <motion.h2 variants={fadeUp} className="font-['Playfair_Display'] text-2xl md:text-5xl lg:text-6xl font-bold leading-tight text-stone-900">
              Built on the belief that <br /><em className="text-[#D4AF37] font-normal italic">dignity is a right,</em> not a privilege.
            </motion.h2>
            <motion.div variants={fadeUp} className="space-y-3 md:space-y-4 text-stone-600 font-light leading-relaxed text-sm md:text-lg">
              <p>Generous Helping Hands Foundation began as a quiet promise to the women and girls of Nigeria — that no barrier should be too tall, no circumstance too fixed.</p>
              <p>Our work strengthens families, uplifts communities, and creates the kind of lasting change that passes from one generation to the next.</p>
            </motion.div>

            <div className="flex flex-wrap gap-2 pt-2">
                {["Youth Empowerment", "Education", "Advocacy", "Human Rights"].map(tag => (
                    <span key={tag} className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white border border-stone-200 text-[0.55rem] md:text-[0.6rem] font-bold text-stone-500 uppercase tracking-widest">{tag}</span>
                ))}
            </div>
            
            <motion.button variants={fadeUp} className="flex items-center gap-2 text-[#D4AF37] font-bold text-[0.65rem] md:text-xs uppercase tracking-[0.2em] pt-4 hover:translate-x-2 transition-transform">
              Download Impact Report <Download size={14} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 3: MISSION ─── */}
      <section id="missionstatement" className="py-16 lg:py-40 px-5 bg-stone-900 text-white rounded-[2rem] lg:rounded-[5rem] mx-2 md:mx-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 lg:p-20 opacity-5 pointer-events-none">
            <Target size={200} className="md:w-[400px] md:h-[400px]" />
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-10 lg:mb-16">
            <PremiumEyebrow icon={Target}>Our Mission</PremiumEyebrow>
            <motion.h2 variants={fadeUp} className="font-['Playfair_Display'] text-3xl md:text-6xl font-bold mb-6">
              Compassion in Action.
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-start">
            <motion.div variants={fadeUp} className="space-y-4 md:space-y-6 text-stone-300 font-light leading-relaxed text-sm md:text-xl">
              <p>At Generous Helping Hands Foundation, we believe every woman, every girl, and every young person deserves the opportunity to live with <span className="text-white font-medium">dignity, hope, and purpose.</span></p>
              <div className="pt-4 border-t border-white/10 italic text-[#D4AF37] font-medium">
                Empowering women and youth. Advancing equity. Creating sustainable impact.
              </div>
            </motion.div>

            <div className="space-y-4 md:space-y-6">
               <div className="bg-white/5 p-6 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 backdrop-blur-sm">
                  <Quote className="text-[#D4AF37] mb-4 md:mb-6" size={24} />
                  <p className="text-base md:text-2xl italic leading-relaxed text-white mb-4">
                    "Every woman, every girl, and every young person deserves the opportunity to live with dignity, hope, and purpose."
                  </p>
                  <span className="text-[0.55rem] md:text-[0.7rem] font-bold uppercase tracking-[0.2em] text-stone-500">— GHHF Founding Principle</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: VISION ─── */}
      <section id="visionstatement" className="py-16 lg:py-40 px-5">
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 lg:mb-24 gap-6">
              <div className="max-w-2xl">
                <PremiumEyebrow icon={Sparkles}>Our Vision</PremiumEyebrow>
                <h2 className="font-['Playfair_Display'] text-3xl md:text-6xl lg:text-7xl font-bold text-stone-900 leading-tight">
                  A world where <br /><em className="text-[#D4AF37] italic font-normal">women and girls lead.</em>
                </h2>
              </div>
              <p className="text-stone-500 font-light lg:max-w-md text-sm md:text-lg leading-relaxed">
                Our vision is a world where women and girls are empowered to overcome economic and social barriers and fully access their rights.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
              {[
                { n: "01", t: "Economic Empowerment", d: "Removing barriers to economic opportunity for sustainable, independent futures." },
                { n: "02", t: "Rights & Health", d: "Ensuring full access to essential rights as a foundation for dignity." },
                { n: "03", t: "Stronger Communities", d: "Strengthening communities so every child can live a healthy, enriched life." }
              ].map((v, i) => (
                <motion.div key={i} variants={fadeUp} className="p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] bg-white border border-stone-100 shadow-sm relative overflow-hidden group hover:border-amber-100 transition-colors">
                  <span className="absolute top-4 right-6 text-3xl md:text-5xl font-black text-stone-50 group-hover:text-amber-50 transition-colors">{v.n}</span>
                  <h3 className="text-lg md:text-2xl font-bold mb-3 font-['Playfair_Display'] relative z-10">{v.t}</h3>
                  <p className="text-stone-500 text-xs md:text-base leading-relaxed font-light relative z-10">{v.d}</p>
                </motion.div>
              ))}
            </div>
        </div>
      </section>

      {/* ─── SECTION 5: TEAM ─── */}
      <section id="meettheteam" className="py-16 lg:py-40 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 lg:mb-24">
            <PremiumEyebrow icon={Users}>The Stewards</PremiumEyebrow>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-6xl font-bold text-stone-900 leading-tight">People behind the mission.</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            <InteractiveTeamCard 
              role="Vision & Strategy" 
              initial="L" 
              title="Leadership" 
              desc="Providing strategic direction and inspiring leadership to drive our mission forward." 
            />
            <InteractiveTeamCard 
              role="Community Programs" 
              initial="P" 
              title="Program Coordinators" 
              desc="Planning and delivering outreach initiatives that meet real community needs." 
            />
            <InteractiveTeamCard 
              role="Learning & Support" 
              initial="E" 
              title="Education & Welfare" 
              desc="Supporting access to quality education and skills development across Nigeria." 
            />
          </div>
        </div>
      </section>

      {/* ─── FOOTER BRIDGE ─── */}
      <section className="py-16 lg:py-32 px-5 text-center bg-stone-50">
         <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="group w-full md:w-auto px-8 py-4 md:px-10 md:py-5 bg-[#D4AF37] text-white rounded-full font-bold text-[0.65rem] md:text-[0.7rem] tracking-[0.2em] uppercase shadow-2xl shadow-amber-500/30 flex items-center justify-center gap-4 mx-auto transition-all"
         >
            Join Our Mission <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
         </motion.button>
      </section>
    </div>
  );
};

export default About;