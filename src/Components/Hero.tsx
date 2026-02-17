import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, Users, Award, ArrowRight, ChevronDown, Sparkles } from "lucide-react";

// ------------------ TYPES ------------------
interface Stat {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}

// ------------------ DATA ------------------
const STATS: Stat[] = [
  { icon: Users, value: "500+", label: "Lives Impacted" },
  { icon: Heart, value: "50+", label: "Volunteers" },
  { icon: Award, value: "10+", label: "Programs" },
];

// ------------------ 3D IMAGE COMPONENT ------------------
const CinematicHeroImage = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="relative w-full max-w-[320px] sm:max-w-md lg:max-w-lg aspect-square flex items-center justify-center cursor-pointer mt-8 lg:mt-0"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/10 blur-[60px] lg:blur-[100px] rounded-full animate-pulse" />

      {/* Main Image Card */}
      <motion.div 
        style={{ transform: "translateZ(50px)" }}
        className="relative z-10 w-full h-full bg-white dark:bg-gray-800 rounded-[2rem] lg:rounded-[2.5rem] p-2 sm:p-3 shadow-2xl border border-white/20"
      >
        <img
          src="/Hero.png"
          alt="Community Empowerment"
          className="w-full h-full object-contain rounded-[1.8rem] lg:rounded-[2rem]"
        />
        
        {/* Floating cinematic badge */}
        <motion.div 
          style={{ transform: "translateZ(80px)" }}
          className="absolute -bottom-4 -right-4 md:right-0 p-3 lg:p-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3"
        >
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <Sparkles className="w-4 h-4 lg:w-5 lg:h-5" />
          </div>
          <div className="text-left">
            <p className="text-[10px] lg:text-[11px] font-bold text-gray-900 dark:text-white leading-tight uppercase">Join the Movement</p>
            <p className="text-[9px] lg:text-[10px] text-gray-600 dark:text-gray-400">Making a difference together.</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Frame */}
      <motion.div 
        style={{ transform: "translateZ(-20px)" }}
        className="absolute inset-0 border-2 border-blue-500/30 rounded-[2.5rem] lg:rounded-[3rem] scale-105"
      />
    </motion.div>
  );
};

// ------------------ MAIN COMPONENT ------------------
const Hero: React.FC = () => {
  const scrollToContent = () => {
    const section = document.getElementById("missionstatement") || document.getElementById("about") || document.getElementById("ourprograms");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#020617] pt-28 pb-20 lg:py-0 overflow-hidden"
    >
      {/* Background Ambient Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[0%] right-[-5%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Text Content - "order-1" ensures this stays first on mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 lg:space-y-8 text-center lg:text-left order-1"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 mx-auto lg:mx-0">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
              <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 dark:text-gray-300">
                Women Empowerment NGO
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-[1.1] tracking-tighter">
              Generous Helping <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 bg-[length:200%_auto] animate-[gradient: 4s linear infinite]">
                Hands Foundation
              </span>
            </h1>

            <p className="text-base lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl font-medium mx-auto lg:mx-0">
              We provide women and girls with the essential resources, 
              mentorship, and community support needed to break barriers and 
              build thriving futures.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 lg:gap-5 items-center justify-center lg:justify-start">
              <a href="#donation" className="w-full sm:w-auto group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:-translate-y-1 flex items-center justify-center gap-3 text-sm tracking-wide">
                Donate Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#volunteer" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-2xl font-bold transition-all hover:bg-gray-50 dark:hover:bg-gray-700 text-sm tracking-wide shadow-sm flex justify-center">
                Become a Volunteer
              </a>
            </div>

            {/* Stats Row */}
            <div className="pt-10 border-t border-gray-200 dark:border-gray-800 grid grid-cols-3 gap-4 lg:gap-6">
              {STATS.map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-2 mb-1 justify-center lg:justify-start">
                    <stat.icon className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                    <span className="text-xl lg:text-3xl font-black text-gray-900 dark:text-white">{stat.value}</span>
                  </div>
                  <p className="text-[8px] lg:text-[10px] uppercase tracking-widest font-bold text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Image comes second on mobile (below text) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 flex justify-center lg:justify-end order-2"
          >
            <CinematicHeroImage />
          </motion.div>

        </div>
      </div>

      {/* Scroll Down */}
      <button 
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 hover:text-blue-500 transition-all cursor-pointer z-20 group"
      >
        <span className="text-[9px] lg:text-[10px] uppercase font-black tracking-[0.3em]">Explore</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      {/* Wave Background Divider */}
      <div className="absolute bottom-0 w-full leading-[0] fill-white dark:fill-[#020617] z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 lg:h-16">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113,2,1200,0V120H0Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;