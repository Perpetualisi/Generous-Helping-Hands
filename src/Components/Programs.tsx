import React from "react";

interface Program {
  icon: string;
  title: string;
  description: string;
}

// Programs data
const programs: Program[] = [
  {
    icon: "💼",
    title: "Economic Empowerment",
    description: "Training and resources to help women achieve financial independence",
  },
  {
    icon: "📚",
    title: "Educational Initiatives",
    description: "Scholarships, mentorship, and education workshops",
  },
  {
    icon: "🏥",
    title: "Health and Wellbeing",
    description: "Access to sexual and reproductive health services and information",
  },
];

// Program images (from public folder)
const programImages = [
  "/programs1.jpg",
  "/Programs_children.jpg",
  "/programs_pads.jpg",
  "/programs4'.jpg", 
];

// Event images
const eventImages = [
  "/events1.jpg",
  "/events2.jpg",
  "/events3.jpg",
  "/events4.jpg",
  "/events5.jpg",
  "/events6.jpg",
];

const Programs: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-24 space-y-24">

        {/* ================= Our Programs ================= */}
        <div
          id="ourprograms"
          className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left: Images */}
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              {programImages.map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2"
                >
                  <img
                    src={image}
                    alt={`Program activity ${index + 1}`}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 hover:opacity-50 transition-opacity duration-300 dark:from-blue-800/30"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Programs List */}
          <div className="order-1 lg:order-2 space-y-6 sm:space-y-8 md:space-y-10">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-xs sm:text-sm uppercase tracking-wider bg-blue-100 dark:bg-blue-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full inline-block">
              What We Do
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
              Our <span className="text-blue-600 dark:text-blue-400">Programs</span>
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
              Discover the various programs we offer to support women and girls:
            </p>

            {/* Programs List */}
            <div className="space-y-4 sm:space-y-6">
              {programs.map((program, index) => (
                <div
                  key={index}
                  className="group flex gap-3 sm:gap-4 md:gap-6 p-4 sm:p-5 md:p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-100 dark:border-gray-700 hover:border-blue-600 hover:shadow-lg dark:hover:border-blue-400 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-100 to-blue-300 dark:from-blue-700 dark:to-blue-500 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-lg sm:text-xl">{program.icon}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1 sm:mb-2">
                      {program.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      {program.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 self-center hidden sm:block">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= Events ================= */}
        <div id="events" className="scroll-mt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventImages.map((image, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={image}
                  alt={`Event ${index + 1}`}
                  className="w-full h-64 sm:h-72 md:h-80 lg:h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Programs;
