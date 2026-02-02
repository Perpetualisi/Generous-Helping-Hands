import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Shield,
  Heart,
  Award,
  Target,
  HelpingHand,
} from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  icon: string;
}

const team: TeamMember[] = [
  {
    name: "Leadership",
    role: "Vision & Strategy",
    icon: "🎯",
    description:
      "Providing direction, accountability, and leadership to drive our mission forward.",
  },
  {
    name: "Program Coordinators",
    role: "Community Programs",
    icon: "📦",
    description:
      "Planning and delivering outreach programs that meet real community needs.",
  },
  {
    name: "Education & Welfare",
    role: "Learning & Support",
    icon: "📚",
    description:
      "Supporting access to education, skills development, and personal growth.",
  },
  {
    name: "Community Engagement",
    role: "Partnerships & Outreach",
    icon: "🤝",
    description:
      "Building strong relationships with families, volunteers, and partners.",
  },
  {
    name: "Advocacy & Awareness",
    role: "Voice for the Vulnerable",
    icon: "📢",
    description:
      "Raising awareness and advocating for dignity, inclusion, and care.",
  },
  {
    name: "Administrative Support",
    role: "Operations & Compliance",
    icon: "⚙️",
    description:
      "Ensuring transparency, accountability, and smooth daily operations.",
  },
];

const About: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <section className="bg-white dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
      {/* 1. WHY IT MATTERS */}
      <motion.div
        {...fadeInUp}
        id="whyitmatters"
        className="scroll-mt-32 py-24 px-4 max-w-4xl mx-auto text-center"
      >
        <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">
          The Challenge
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mt-4">
          Why Our Work Matters
        </h2>
        <p className="mt-8 text-xl text-gray-600 dark:text-gray-400 leading-relaxed italic border-l-4 border-blue-500 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
          "Many families face daily challenges such as food insecurity, limited
          access to education, and lack of basic health support. These hurdles
          stifle community growth and children’s futures."
        </p>
      </motion.div>

      {/* 2. OUR STORY */}
      <div id="ourstory" className="scroll-mt-24 bg-gray-50 dark:bg-gray-900/50 py-24 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Our Story</h2>
            <div className="h-1 w-20 bg-blue-600 mt-4 mb-8 rounded-full"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">
              Generous Helping Hands Foundation was founded with a simple belief —
              that <strong>small acts of kindness</strong> can transform lives.
              <br />
              <br />
              What began as a localized desire to help neighbors in need has grown
              into a mission-driven organization dedicated to serving communities
              with compassion, respect, and integrity.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="relative">
            <div className="absolute -inset-4 bg-blue-600/10 rounded-2xl -rotate-2"></div>
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800"
              alt="Community support"
              className="relative rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 w-full object-cover h-64 md:h-96"
            />
          </motion.div>
        </div>
      </div>

      {/* 3. MISSION */}
      <div id="missionstatement" className="scroll-mt-24 py-24 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="order-2 lg:order-1"
          >
            <img
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=800"
              alt="Empowerment"
              className="rounded-3xl shadow-xl w-full object-cover h-64 md:h-[450px]"
            />
          </motion.div>
          <motion.div {...fadeInUp} className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
              <Target className="w-4 h-4" /> Our Mission
            </div>
            <h2 className="text-4xl font-bold mt-6 text-gray-900 dark:text-gray-100">
              Supporting Lives, Building Hope
            </h2>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
              We are dedicated to improving the lives of vulnerable individuals
              and families through compassionate support, education, and
              practical assistance that promotes dignity and long-term
              well-being.
            </p>
          </motion.div>
        </div>
      </div>

      {/* 4. VISION */}
      <div id="visionstatement" className="scroll-mt-24 bg-gray-50 dark:bg-gray-900/50 py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
              <Heart className="w-4 h-4" /> Our Vision
            </div>
            <h2 className="text-4xl font-bold mt-6 text-gray-900 dark:text-gray-100">
              Communities Where Everyone Feels Supported
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {[
                {
                  icon: TrendingUp,
                  title: "Stable Futures",
                  text: "Helping families move toward long-term stability",
                },
                { icon: Shield, title: "Dignity & Care", text: "Access to essential support and basic needs" },
                { icon: Users, title: "Stronger Communities", text: "Communities built on trust and hope" },
              ].map((v, i) => (
                <div
                  key={i}
                  className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:bg-blue-600 transition-all duration-300"
                >
                  <v.icon className="w-12 h-12 mx-auto mb-6 text-blue-600 group-hover:text-white transition-colors" />
                  <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 group-hover:text-white transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-3 group-hover:text-blue-100 transition-colors">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
            <Award className="w-4 h-4" /> Our Team
          </div>
          <h2 className="text-4xl font-bold mt-4 text-gray-900 dark:text-gray-100">
            Meet the People Behind the Mission
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our diverse team of dedicated professionals and volunteers work tirelessly to ensure
            that every hand reached out is met with support.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-blue-100 dark:hover:border-blue-900"
            >
              <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center justify-center text-3xl mb-6">
                {member.icon}
              </div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100">
                {member.name}
              </h3>
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mt-1">
                {member.role}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
