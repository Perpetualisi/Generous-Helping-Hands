import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Users,
  TrendingUp,
  Shield,
  Heart,
  Award,
  Target,
  ChevronRight,
  LucideIcon,
} from "lucide-react";

// --- Types & Data ---
interface TeamMember {
  name: string;
  role: string;
  description: string;
  emoji: string;
}

interface VisionPoint {
  icon: LucideIcon;
  title: string;
  text: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  { name: "Leadership", role: "Vision & Strategy", emoji: "🎯", description: "Providing direction, accountability, and leadership to drive our mission forward." },
  { name: "Program Coordinators", role: "Community Programs", emoji: "📦", description: "Planning and delivering outreach programs that meet real community needs." },
  { name: "Education & Welfare", role: "Learning & Support", emoji: "📚", description: "Supporting access to education, skills development, and personal growth." },
  { name: "Community Engagement", role: "Partnerships & Outreach", emoji: "🤝", description: "Building strong relationships with families, volunteers, and partners." },
  { name: "Advocacy & Awareness", role: "Voice for the Vulnerable", emoji: "📢", description: "Raising awareness and advocating for dignity, inclusion, and care." },
  { name: "Administrative Support", role: "Operations & Compliance", emoji: "⚙️", description: "Ensuring transparency, accountability, and smooth daily operations." },
];

const VISION_POINTS: VisionPoint[] = [
  { icon: TrendingUp, title: "Stable Futures", text: "Helping families move toward long-term stability" },
  { icon: Shield, title: "Dignity & Care", text: "Access to essential support and basic needs" },
  { icon: Users, title: "Stronger Communities", text: "Communities built on trust and hope" },
];

// --- Shared Components ---
const SectionBadge = ({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-6">
    <Icon className="w-4 h-4" /> {children}
  </div>
);

const About: React.FC = () => {
  // Centralized animation variants
  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.7, ease: "easeOut" },
  };

  return (
    <section className="bg-white dark:bg-gray-950 transition-colors duration-300 overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. WHY IT MATTERS */}
      <motion.div
        {...fadeInUp}
        id="whyitmatters"
        className="scroll-mt-32 py-24 px-4 max-w-4xl mx-auto text-center"
      >
        <span className="text-blue-600 font-bold tracking-widest uppercase text-xs sm:text-sm">
          The Challenge
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mt-4 leading-tight">
          Why Our Work Matters
        </h2>
        <p className="mt-8 text-xl text-gray-600 dark:text-gray-400 leading-relaxed italic border-l-4 md:border-l-0 border-blue-500 pl-6 md:pl-0">
          "Many families face daily challenges such as food insecurity, limited
          access to education, and lack of basic health support. These hurdles
          stifle community growth and children’s futures."
        </p>
      </motion.div>

      {/* 2. OUR STORY */}
      <div id="ourstory" className="scroll-mt-24 bg-gray-50 dark:bg-gray-900/50 py-24 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Our Story</h2>
            <div className="h-1.5 w-16 bg-blue-600 mt-4 mb-8 rounded-full" />
            <div className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed space-y-6">
              <p>
                Generous Helping Hands Foundation was founded with a simple belief
                — that <strong className="text-blue-600 dark:text-blue-400">small acts of kindness</strong> can transform lives.
              </p>
              <p>
                What began as a localized desire to help neighbors in need has grown
                into a mission-driven organization dedicated to serving communities
                with compassion, respect, and integrity.
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-blue-600/10 rounded-3xl -rotate-2" />
            <img
              loading="lazy"
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800"
              alt="Community support outreach"
              className="relative rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 w-full object-cover aspect-[4/3] md:aspect-square"
            />
          </motion.div>
        </div>
      </div>

      {/* 3. MISSION */}
      <div id="missionstatement" className="scroll-mt-24 py-24 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative group"
          >
             <div className="absolute inset-0 bg-blue-600/20 rounded-3xl translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
            <img
              loading="lazy"
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=800"
              alt="Educational Empowerment"
              className="rounded-3xl shadow-xl w-full object-cover h-[350px] md:h-[500px]"
            />
          </motion.div>
          <motion.div {...fadeInUp} className="order-1 lg:order-2">
            <SectionBadge icon={Target}>Our Mission</SectionBadge>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
              Supporting Lives, Building Hope
            </h2>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
              We are dedicated to improving the lives of vulnerable individuals
              and families through compassionate support, education, and
              practical assistance that promotes dignity and long-term well-being.
            </p>
            <button className="mt-8 flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:gap-4 transition-all group">
              Learn more about our programs 
              <ChevronRight className="w-5 h-5 group-hover:scale-110" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* 4. VISION */}
      <div id="visionstatement" className="scroll-mt-24 bg-gray-50 dark:bg-gray-900/50 py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <SectionBadge icon={Heart}>Our Vision</SectionBadge>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              Communities Where Everyone Feels Supported
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {VISION_POINTS.map((v, i) => (
                <div
                  key={v.title}
                  className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:bg-blue-600 dark:hover:bg-blue-600 transition-all duration-500"
                >
                  <v.icon className="w-12 h-12 mx-auto mb-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 group-hover:text-white transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-3 group-hover:text-blue-50 transition-colors">
                    {v.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 5. TEAM */}
      <div id="meettheteam" className="scroll-mt-24 py-24 px-4 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <SectionBadge icon={Award}>Our Team</SectionBadge>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            Meet the People Behind the Mission
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Our diverse team of dedicated professionals and volunteers work
            tirelessly to ensure that every hand reached out is met with support.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {TEAM_MEMBERS.map((member, idx) => (
            <motion.div
              key={member.name}
              {...fadeInUp}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-transparent hover:border-blue-200 dark:hover:border-blue-800 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-2xl shadow-inner flex items-center justify-center text-3xl mb-6">
                {member.emoji}
              </div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100">
                {member.name}
              </h3>
              <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-2">
                {member.role}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed text-sm italic">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;