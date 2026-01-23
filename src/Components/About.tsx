import React, { useState, useEffect, useRef } from "react";
import { BookOpen, Users, Megaphone, TrendingUp, Shield, Heart, Award, Target } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  icon: string;
}

const team: TeamMember[] = [
  { name: "Leadership", role: "Strategic Vision & Operations", icon: "🎯", description: "Guiding our mission with strategic vision and operational excellence" },
  { name: "Education Specialist", role: "Empowers women and girls", icon: "📚", description: "Creating pathways to knowledge and opportunity" },
  { name: "Program Directors", role: "Oversees key projects", icon: "💼", description: "Driving meaningful change through impactful programs" },
  { name: "Community Engagement", role: "Builds strong relationships", icon: "🤝", description: "Fostering connections that create lasting change" },
  { name: "Advocacy & Outreach", role: "Champions rights", icon: "📢", description: "Amplifying voices and advocating for equality" },
  { name: "Administrative Support", role: "Ensures smooth operations", icon: "⚙️", description: "Supporting our mission with organizational excellence" },
];

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState({ mission: false, team: false, vision: false });

  const missionRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === 'missionstatement') setIsVisible(prev => ({ ...prev, mission: true }));
            if (id === 'meettheteam') setIsVisible(prev => ({ ...prev, team: true }));
            if (id === 'visionstatement') setIsVisible(prev => ({ ...prev, vision: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (missionRef.current) observer.observe(missionRef.current);
    if (teamRef.current) observer.observe(teamRef.current);
    if (visionRef.current) observer.observe(visionRef.current);

    return () => observer.disconnect();
  }, []);

  const missionHighlights = [
    { icon: BookOpen, title: "Education", description: "Knowledge that empowers", color: "blue" },
    { icon: Users, title: "Community", description: "Together we rise", color: "purple" },
    { icon: Megaphone, title: "Advocacy", description: "Voices for change", color: "pink" },
  ];

  const visionPillars = [
    { icon: TrendingUp, title: "Economic Freedom", description: "Breaking barriers to financial independence" },
    { icon: Shield, title: "Rights & Health", description: "Ensuring access to fundamental rights" },
    { icon: Heart, title: "Healthy Communities", description: "Children thriving in nurturing environments" },
  ];

  const colorClasses = {
    blue: { 
      bg: "bg-blue-600 dark:bg-blue-500", 
      text: "text-blue-600 dark:text-blue-400", 
      border: "border-blue-200 dark:border-blue-700", 
      gradient: "from-blue-100 to-blue-50 dark:from-blue-900/50 dark:to-blue-800/30" 
    },
    purple: { 
      bg: "bg-purple-600 dark:bg-purple-500", 
      text: "text-purple-600 dark:text-purple-400", 
      border: "border-purple-200 dark:border-purple-700", 
      gradient: "from-purple-100 to-purple-50 dark:from-purple-900/50 dark:to-purple-800/30" 
    },
    pink: { 
      bg: "bg-pink-600 dark:bg-pink-500", 
      text: "text-pink-600 dark:text-pink-400", 
      border: "border-pink-200 dark:border-pink-700", 
      gradient: "from-pink-100 to-pink-50 dark:from-pink-900/50 dark:to-pink-800/30" 
    },
  };

  return (
    <section className="space-y-0 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Mission Statement */}
      <div
        id="missionstatement"
        ref={missionRef}
        className="scroll-mt-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Text Content */}
            <div className={`space-y-4 sm:space-y-6 transition-all duration-1000 ${isVisible.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-xs sm:text-sm font-semibold">
                <Target className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Our Mission</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                Empowering Women,{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Transforming Lives
                </span>
              </h2>
              
              <div className="space-y-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                <p>
                  At Generous Helping Hands Foundation, we are dedicated to empowering women and girls by promoting economic sustainability, advocating for societal equity, and ensuring access to fundamental rights.
                </p>
                <p>
                  Through education, community engagement, and advocacy, we work tirelessly to break down barriers and build a just society where women and girls are free to realize their full potential.
                </p>
              </div>

              {/* Mission Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-2 sm:pt-4">
                {missionHighlights.map((item, index) => {
                  const Icon = item.icon;
                  const colors = colorClasses[item.color as keyof typeof colorClasses];
                  
                  return (
                    <div 
                      key={index}
                      className={`space-y-2 sm:space-y-3 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${isVisible.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 ${colors.bg} rounded-lg flex items-center justify-center shadow-lg`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Image */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible.mission ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img
                  src="/mission_statement.png"
                  alt="Women and girls being empowered through our mission"
                  className="w-full aspect-[4/5] object-cover"
                  loading="lazy"
                />
                
                {/* Stat card on image corner */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-xs bg-white/95 dark:bg-gray-800/95 rounded-xl shadow-2xl p-4 sm:p-5 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                      <span className="text-white text-xl sm:text-2xl font-bold">500+</span>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100">Lives Transformed</p>
                      <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Since our founding</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meet the Team */}
      <div
        id="meettheteam"
        ref={teamRef}
        className="scroll-mt-24 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className={`text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12 transition-all duration-1000 ${isVisible.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-xs sm:text-sm font-semibold">
              <Award className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Our Team</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-gray-100">
              Meet the <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Changemakers</span>
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed px-4">
              Our team is composed of dedicated professionals passionate about empowering women and girls. Each member brings unique skills and experiences that drive our mission forward.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {team.map((member, index) => {
              const colors = ['blue', 'purple', 'pink'][index % 3] as keyof typeof colorClasses;
              const colorClass = colorClasses[colors];
              
              return (
                <div
                  key={member.name}
                  className={`group bg-white dark:bg-gray-800 border-2 ${colorClass.border} rounded-xl sm:rounded-2xl p-5 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${isVisible.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${colorClass.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl sm:text-3xl">{member.icon}</span>
                  </div>

                  {/* Content */}
                  <div className="space-y-2 sm:space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 transition-colors">
                        {member.name}
                      </h3>
                      <p className={`text-xs sm:text-sm ${colorClass.text} font-medium mt-1`}>
                        {member.role}
                      </p>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
                      {member.description}
                    </p>

                    {/* Decorative line */}
                    <div className={`w-12 h-1 ${colorClass.bg} rounded-full group-hover:w-full transition-all duration-500`}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Vision Statement */}
      <div
        id="visionstatement"
        ref={visionRef}
        className="scroll-mt-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-800 dark:via-purple-800 dark:to-pink-800 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-white dark:bg-gray-100/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-white dark:bg-gray-100/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className={`text-center space-y-6 sm:space-y-8 transition-all duration-1000 ${isVisible.vision ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 dark:bg-gray-800/30 text-white rounded-full text-xs sm:text-sm font-semibold border border-white/30 dark:border-gray-500/30">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Our Vision</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight px-4">
              A Future Where Every Woman and Girl Thrives
            </h2>
            
            <p className="text-blue-50 dark:text-gray-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-4xl mx-auto px-4">
              Our vision is to see women and girls empowered to break economic and social barriers, fully access their rights—particularly in sexual and reproductive health—and foster communities where children lead healthy and enriched lives.
            </p>

            {/* Vision pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-4 sm:pt-8">
              {visionPillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <div 
                    key={index}
                    className={`bg-white/10 dark:bg-gray-800/30 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-white/20 dark:border-gray-600/30 hover:bg-white/20 dark:hover:bg-gray-700/40 transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 ${isVisible.vision ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 dark:bg-gray-700/30 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-base sm:text-lg mb-2">{pillar.title}</h3>
                    <p className="text-blue-100 dark:text-gray-200 text-xs sm:text-sm leading-relaxed">{pillar.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;