import React from "react";
import { motion, easeOut } from "framer-motion";
import { Users, TrendingUp, Shield, Heart, Target } from "lucide-react";

// --- Data ---
const TEAM_MEMBERS = [
  { name: "Leadership", role: "Vision & Strategy", emoji: "🎯", description: "Providing direction and leadership to drive our mission forward." },
  { name: "Program Coordinators", role: "Community Programs", emoji: "📦", description: "Planning and delivering outreach programs that meet real needs." },
  { name: "Education & Welfare", role: "Learning & Support", emoji: "📚", description: "Supporting access to education and skills development." },
  { name: "Community Engagement", role: "Partnerships", emoji: "🤝", description: "Building strong relationships with families and partners." },
  { name: "Advocacy", role: "Voice for Vulnerable", emoji: "📢", description: "Raising awareness and advocating for dignity and care." },
  { name: "Admin Support", role: "Operations", emoji: "⚙️", description: "Ensuring transparency and smooth daily operations." },
];

const VISION_POINTS = [
  { icon: TrendingUp, title: "Stable Futures", text: "Helping families move toward long-term stability" },
  { icon: Shield, title: "Dignity & Care", text: "Access to essential support and basic needs" },
  { icon: Users, title: "Stronger Communities", text: "Communities built on trust and hope" },
];

// --- Sub-components ---
const SectionBadge = ({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-6">
    <Icon className="w-4 h-4" /> {children}
  </div>
);

const About = () => {
  // ✅ TypeScript-safe Framer Motion config
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.7, ease: easeOut },
  };

  return (
    <section className="bg-white dark:bg-gray-950 transition-colors duration-300 overflow-hidden">

      {/* 1. WHY IT MATTERS */}
      <motion.div
        {...fadeInUp}
        id="whyitmatters"
        className="scroll-mt-32 py-24 px-4 max-w-4xl mx-auto text-center"
      >
        <span className="text-blue-600 font-bold tracking-widest uppercase text-xs sm:text-sm">
          The Challenge
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mt-4">
          Why Our Work Matters
        </h2>
        <p className="mt-8 text-xl text-gray-600 dark:text-gray-400 leading-relaxed italic border-l-4 md:border-l-0 border-blue-500 pl-6 md:pl-0">
          "Many families face daily challenges such as food insecurity and limited access to education. 
          These hurdles stifle community growth."
        </p>
      </motion.div>

      {/* 2. OUR STORY */}
      <div id="ourstory" className="scroll-mt-24 bg-gray-50 dark:bg-gray-900/50 py-24 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Our Story</h2>
            <div className="h-1.5 w-16 bg-blue-600 mt-4 mb-8 rounded-full" />
            <p className="text-lg text-gray-600 dark:text-gray-400 space-y-6">
              Generous Helping Hands Foundation was founded on the belief that 
              <strong className="text-blue-600"> small acts of kindness</strong> can transform lives.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="relative">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800"
              alt="Community"
              className="rounded-2xl shadow-2xl w-full object-cover aspect-square"
            />
          </motion.div>
        </div>
      </div>

      {/* 3. MISSION */}
      <div id="missionstatement" className="scroll-mt-24 py-24 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeInUp} className="lg:order-2">
            <SectionBadge icon={Target}>Our Mission</SectionBadge>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Supporting Lives, Building Hope</h2>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
              Dedicated to improving lives through compassionate support and practical assistance.
            </p>
          </motion.div>
          <div className="lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=800"
              className="rounded-3xl shadow-xl w-full h-[400px] object-cover"
              alt="Mission"
            />
          </div>
        </div>
      </div>

      {/* 4. VISION */}
      <div id="visionstatement" className="scroll-mt-24 bg-gray-50 dark:bg-gray-900/50 py-24 px-4 text-center">
        <SectionBadge icon={Heart}>Our Vision</SectionBadge>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
          {VISION_POINTS.map((v) => (
            <div key={v.title} className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:bg-blue-600 group transition-all">
              <v.icon className="w-12 h-12 mx-auto mb-4 text-blue-600 group-hover:text-white" />
              <h3 className="font-bold text-xl group-hover:text-white">{v.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 group-hover:text-blue-50">{v.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. TEAM */}
      <div id="meettheteam" className="scroll-mt-24 py-24 px-4 bg-white dark:bg-gray-950 text-center">
        <h2 className="text-4xl font-bold mb-12">Meet the People</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl hover:shadow-xl transition-all">
              <div className="text-4xl mb-4">{member.emoji}</div>
              <h3 className="font-bold text-xl">{member.name}</h3>
              <p className="text-blue-600 text-xs font-bold uppercase mt-2">{member.role}</p>
              <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
