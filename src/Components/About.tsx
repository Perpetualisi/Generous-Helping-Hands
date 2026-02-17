import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Users, TrendingUp, Shield, Target, Quote, Globe, Sparkles } from "lucide-react";

/**
 * DEVELOPER NOTES:
 * IDs match your Navbar: whyitmatters, ourstory, missionstatement, visionstatement, meettheteam.
 */
const IMAGE_ASSETS = {
  hero_bg: "https://images.unsplash.com/photo-1518005020250-6eb5f3f2f669?q=80&w=1600&auto=format&fit=crop",
  mission_bg: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=1200" 
};

const TEAM_MEMBERS = [
  { name: "Leadership", role: "Vision & Strategy", emoji: "🎯", description: "Providing direction and leadership to drive our mission forward." },
  { name: "Program Coordinators", role: "Community Programs", emoji: "📦", description: "Planning and delivering outreach programs that meet real needs." },
  { name: "Education & Welfare", role: "Learning & Support", emoji: "📚", description: "Supporting access to education and skills development." },
  { name: "Community Engagement", role: "Partnerships", emoji: "🤝", description: "Building strong relationships with families and partners." },
  { name: "Advocacy", role: "Voice for Vulnerable", emoji: "📢", description: "Raising awareness and advocating for dignity and care." },
  { name: "Admin Support", role: "Operations", emoji: "⚙️", description: "Ensuring transparency and smooth daily operations." },
];

const VISION_POINTS = [
  { icon: TrendingUp, title: "Stable Futures", text: "Empowering Nigerian families toward long-term economic independence." },
  { icon: Shield, title: "Dignity & Care", text: "Ensuring access to basic healthcare and nutritional security." },
  { icon: Users, title: "Stronger Communities", text: "Building local resilience through trust and shared values." },
];

const SectionBadge = ({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-sm text-blue-700 dark:text-blue-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-blue-100 dark:border-blue-800/50"
  >
    <Icon className="w-3.5 h-3.5" /> {children}
  </motion.div>
);

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const scale = useTransform(smoothProgress, [0, 0.1], [1, 0.97]);

  return (
    <div ref={containerRef} className="bg-[#FCFCFD] dark:bg-gray-950 transition-colors duration-700">
      
      {/* 1. WHY OUR WORK MATTERS */}
      <section 
        id="whyitmatters" 
        className="relative min-h-[70vh] flex items-center justify-center px-6 overflow-hidden pt-24 scroll-mt-20"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-[120px]" />
        </div>

        <motion.div style={{ scale }} className="relative z-10 max-w-4xl mx-auto text-center">
          <SectionBadge icon={Globe}>Nigeria Focus</SectionBadge>
          <h1 className="text-4xl md:text-7xl font-serif text-gray-900 dark:text-gray-100 leading-[1.1] mb-8">
            Every act of <span className="italic text-blue-600">kindness</span> ripples across a nation.
          </h1>
          <div className="flex justify-center gap-4 mb-10">
            <Quote className="w-8 h-8 text-blue-500/20" />
            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-light max-w-2xl italic leading-relaxed">
              "In the heart of Nigeria, families face hurdles that stifle growth. We exist to clear the path."
            </p>
          </div>
        </motion.div>
      </section>

      {/* 2. OUR STORY */}
      <section id="ourstory" className="py-32 px-6 relative overflow-hidden scroll-mt-24">
        {/* Background Decorative Grid - Fixed 'size' error here */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
          style={{ 
            backgroundImage: `radial-gradient(#2563eb 1px, transparent 1px)`, 
            backgroundSize: '40px 40px' 
          }} 
        />
        
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="inline-block relative">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-gray-100 uppercase italic opacity-10 absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap select-none">
                    Our Heritage
                </h2>
                <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 uppercase relative">
                    Our Story
                </h2>
                <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 gap-12 text-left items-start">
                <p className="text-2xl md:text-3xl font-serif leading-tight text-gray-800 dark:text-gray-200 italic border-l-4 border-blue-600 pl-6">
                    Generous Helping Hands Foundation was born from a simple observation in our local neighborhoods.
                </p>
                <div className="space-y-6">
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                        We saw immense potential held back by the weight of systemic poverty. What began as individual acts of charity has evolved into a <span className="font-semibold text-blue-600 dark:text-blue-400">structured pillar of hope</span>. 
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                        Today, we provide the strategic tools and compassionate support necessary for Nigerian families to reclaim their dignity and build a self-sustaining future.
                    </p>
                </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. OUR MISSION */}
      <section id="missionstatement" className="relative py-40 px-6 overflow-hidden scroll-mt-24 bg-blue-600 dark:bg-blue-900">
        <div className="absolute inset-0 z-0 opacity-20">
            <img src={IMAGE_ASSETS.mission_bg} className="w-full h-full object-cover mix-blend-overlay" alt="" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-white/20">
            <Target className="w-3.5 h-3.5" /> The Mission
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight uppercase tracking-tighter">
            Supporting Lives,<br/>Building Hope
          </h2>
          <p className="text-xl text-blue-50 font-light max-w-2xl mx-auto leading-relaxed opacity-90">
            Our mission is simple: to improve lives through compassionate support and practical assistance, 
            focusing on measurable impact and personal dignity for every Nigerian we serve.
          </p>
        </div>
      </section>

      {/* 4. OUR VISION */}
      <section id="visionstatement" className="py-32 px-6 bg-gray-50 dark:bg-gray-900/40 relative overflow-hidden scroll-mt-24">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <SectionBadge icon={Sparkles}>Our Strategy</SectionBadge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase">Our Vision</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {VISION_POINTS.map((v, i) => (
              <motion.div 
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="p-10 bg-white dark:bg-gray-800/60 backdrop-blur-xl rounded-[2.5rem] border border-white dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/30">
                  <v.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-4 tracking-tight text-gray-900 dark:text-white">{v.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MEET THE TEAM */}
      <section id="meettheteam" className="py-32 px-6 max-w-7xl mx-auto scroll-mt-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 px-4">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold mb-4 tracking-tighter uppercase text-gray-900 dark:text-white">Meet the Team</h2>
            <p className="text-gray-500 font-light">The dedicated hearts driving change across Nigeria.</p>
          </div>
          <div className="hidden md:block w-32 h-px bg-gray-200 dark:bg-gray-800 mb-4" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div 
              key={member.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group p-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] hover:bg-blue-600 dark:hover:bg-blue-600 transition-all duration-500 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 group-hover:scale-150 transition-all text-6xl pointer-events-none">
                {member.emoji}
              </div>
              <p className="text-blue-600 dark:text-blue-400 group-hover:text-blue-100 text-[9px] font-black uppercase tracking-[0.2em] mb-2 transition-colors">
                {member.role}
              </p>
              <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-white transition-colors">{member.name}</h3>
              <p className="text-gray-500 dark:text-gray-400 group-hover:text-blue-50 mt-6 text-sm leading-relaxed font-light transition-colors">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;