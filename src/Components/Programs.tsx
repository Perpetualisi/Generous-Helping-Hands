import React, { useState } from "react";

// --- Types ---
interface Program {
  icon: string;
  title: string;
  description: string;
}

interface ImageItem {
  src: string;
  alt: string;
  objectPosition?: string;
  useContain?: boolean;
}

// --- Data ---
const programs: Program[] = [
  { icon: "💼", title: "Economic Empowerment", description: "Training and resources to help women achieve financial independence" },
  { icon: "📚", title: "Educational Initiatives", description: "Scholarships, mentorship, and education workshops" },
  { icon: "🏥", title: "Health and Wellbeing", description: "Access to sexual and reproductive health services and information" },
];

const programImages: ImageItem[] = [
  { src: "/programs1.jpg", alt: "Women participating in economic empowerment program" },
  { src: "/Programs_children.jpg", alt: "Children benefiting from educational initiatives" },
  { src: "/programs_pads.jpg", alt: "Health and wellbeing program distribution" },
  { src: "/programs4.jpg", alt: "Community program activity" },
];

const eventImages: ImageItem[] = [
  { src: "/event11.jpeg", alt: "Community event gathering" },
  { src: "/event22.jpeg", alt: "Workshop and training session" },
  { src: "/events3.jpg", alt: "Educational outreach event" },
  { src: "/events4.jpg", alt: "Health awareness campaign" },
  { src: "/events5.jpg", alt: "Community empowerment event" },
  { src: "/events6.jpg", alt: "Women's support group meeting" },
  { src: "/events7.jpeg", alt: "Skill development workshop" },
  { src: "/events8.jpeg", alt: "Woman with machine", useContain: true },
  { src: "/events9.jpeg", alt: "Awareness and advocacy event" },
];

// --- Custom Hook for Image Loading ---
const useImageLoader = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return {
    isLoaded,
    hasError,
    onLoad: () => setIsLoaded(true),
    onError: () => setHasError(true),
  };
};

// --- Components ---

// Removed 'index' from props since it was unused
const ProgramCard: React.FC<{ program: Program }> = ({ program }) => (
  <div
    className="group flex gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-600 hover:shadow-xl transition-all duration-300"
    role="listitem"
  >
    <div className="flex-shrink-0">
      <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <span className="text-2xl" role="img" aria-hidden="true">{program.icon}</span>
      </div>
    </div>
    <div className="flex-1">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {program.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
        {program.description}
      </p>
    </div>
  </div>
);

const ImageCard: React.FC<{ image: ImageItem; isGallery?: boolean }> = ({ image, isGallery = false }) => {
  const { isLoaded, hasError, onLoad, onError } = useImageLoader();

  const objectFit = image.useContain ? "object-contain" : "object-cover";
  const heightClass = isGallery ? "h-48 sm:h-64" : "h-64 sm:h-80";

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-md bg-gray-100 dark:bg-gray-800 transition-all duration-300 hover:shadow-2xl">
      {!isLoaded && !hasError && (
        <div className={`absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700 ${heightClass}`} />
      )}
      
      {hasError ? (
        <div className={`${heightClass} flex items-center justify-center italic text-gray-400 text-xs`}>
          Image unavailable
        </div>
      ) : (
        <img
          src={image.src}
          alt={image.alt}
          onLoad={onLoad}
          onError={onError}
          loading="lazy"
          className={`w-full ${heightClass} ${objectFit} transition-all duration-700 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          } ${!image.useContain && "hover:scale-110"}`}
          style={{ objectPosition: image.objectPosition || "center" }}
        />
      )}
      {isGallery && <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl" />}
    </div>
  );
};

const Programs: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 lg:py-24" aria-labelledby="programs-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: Our Programs */}
        <div id="ourprograms" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start scroll-mt-24 mb-32">
          {/* Images Grid */}
          <div className="grid grid-cols-2 gap-4">
            {programImages.map((img, i) => (
              <ImageCard key={i} image={img} isGallery />
            ))}
          </div>

          {/* Text Content */}
          <div className="space-y-8">
            <div>
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Empowerment</span>
              <h2 id="programs-heading" className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mt-2">
                Our <span className="text-blue-600">Programs</span>
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              We provide holistic support through focused initiatives designed to uplift, 
              educate, and protect women and girls in our community.
            </p>
            <div className="space-y-4" role="list">
              {/* Removed 'index' from the map callback */}
              {programs.map((p, i) => <ProgramCard key={i} program={p} />)}
            </div>
          </div>
        </div>

        {/* Section 2: Our Events */}
        <div id="events" className="scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white">
              Latest <span className="text-blue-600">Events</span>
            </h2>
            <div className="h-1.5 w-20 bg-blue-600 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventImages.map((img, i) => (
              <ImageCard key={i} image={img} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;