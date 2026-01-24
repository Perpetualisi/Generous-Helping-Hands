import React, { useState, useEffect } from "react";
import { Heart, Users, Award, ArrowRight, ChevronDown } from "lucide-react";

interface Stat {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  color: string;
}

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats: Stat[] = [
    { 
      icon: Users, 
      value: "500+", 
      label: "Lives Impacted", 
      color: "text-gray-600 dark:text-gray-400" 
    },
    { 
      icon: Heart, 
      value: "50+", 
      label: "Active Volunteers", 
      color: "text-gray-600 dark:text-gray-400" 
    },
    { 
      icon: Award, 
      value: "10+", 
      label: "Programs", 
      color: "text-gray-600 dark:text-gray-400" 
    },
  ];

  const scrollToNext = () => {
    const section = document.getElementById("missionstatement") || document.getElementById("about");
    if (section) {
      const offset = 140;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: sectionTop - offset, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden
                 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200
                 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300
                 pt-24 sm:pt-28 md:pt-32 lg:pt-40"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-48 h-48 sm:w-64 sm:h-64 bg-gray-300 dark:bg-gray-700/20 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 sm:w-80 sm:h-80 bg-gray-300 dark:bg-gray-700/20 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 sm:w-40 sm:h-40 bg-gray-200 dark:bg-gray-600/20 rounded-full opacity-20 blur-2xl animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">

          {/* Left side: Text Content */}
          <div
            className={`space-y-5 sm:space-y-6 text-center lg:text-left transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-semibold">
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Empowering Women & Girls</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
              Generous Helping Hands
              <span className="block mt-2 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 dark:from-gray-400 dark:via-gray-500 dark:to-gray-600 bg-clip-text text-transparent">
                Foundation
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              We take pride in helping women and girls from all walks of life
              achieve their full potential and access the opportunities they
              deserve.
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4">
              <a
                href="#donation"
                className="group relative inline-flex items-center justify-center gap-2
                           bg-gradient-to-r from-blue-600 to-blue-700
                           text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg
                           hover:from-blue-700 hover:to-blue-800
                           transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
              >
                <span>Donate Now</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#volunteer"
                className="group inline-flex items-center justify-center gap-2
                           bg-gradient-to-r from-blue-500 to-blue-600
                           text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg
                           hover:from-blue-600 hover:to-blue-700
                           transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 text-sm sm:text-base"
              >
                <span>Volunteer</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className={`text-center lg:text-left transition-all duration-700 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
                      <div className={`text-xl sm:text-2xl lg:text-3xl font-bold ${stat.color}`}>
                        {stat.value}
                      </div>
                    </div>
                    <div className="text-[10px] sm:text-xs lg:text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right side: Hero Image */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative max-w-lg mx-auto">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl">
                <img
                  src="/Hero.png"
                  alt="Women and girls empowered through our community programs"
                  className="w-full h-[350px] sm:h-[450px] lg:h-[550px] xl:h-[600px] object-cover transform hover:scale-102 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none dark:from-black/40"></div>
              </div>

              {/* Floating accent dots - hidden on mobile */}
              <div className="absolute top-10 -left-4 w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 dark:bg-gray-700/40 rounded-full opacity-40 blur-xl animate-pulse hidden sm:block"></div>
              <div className="absolute bottom-20 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-gray-300 dark:bg-gray-700/40 rounded-full opacity-40 blur-xl animate-pulse hidden sm:block"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-2
                   text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors group cursor-pointer"
        aria-label="Scroll to next section"
      >
        <span className="text-xs sm:text-sm font-medium">Scroll to explore</span>
        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce group-hover:text-gray-500 dark:group-hover:text-gray-400" />
      </button>

      {/* Decorative wave divider */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          className="w-full h-8 sm:h-12 lg:h-16 text-white dark:text-gray-900"
          viewBox="0 0 1440 100"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,100 L0,100 Z" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
