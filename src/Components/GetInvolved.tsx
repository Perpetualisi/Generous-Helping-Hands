import React, { useState } from "react";
import { Mail, Heart, Users, Gift, Instagram, ChevronDown, ExternalLink, ArrowRight } from "lucide-react";

// ------------------ TYPES ------------------
interface ContactMethod {
  icon: React.ElementType;
  text: string;
  link: string;
  linkText: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface DonationMethod {
  title: string;
  description: string;
  icon: React.ElementType;
}

// ------------------ DATA ------------------
const CONTACT_METHODS: ContactMethod[] = [
  { icon: Mail, text: "Email our team", link: "mailto:Giversgenerous@gmail.com", linkText: "Giversgenerous@gmail.com" },
  { icon: Instagram, text: "Message us on Instagram", link: "https://instagram.com/GenerousHands", linkText: "@GenerousHands" },
];

const FAQS: FAQItem[] = [
  {
    question: "How are my donations used?",
    answer: "100% of public donations go directly toward our core programs: providing educational materials for girls, funding women-led micro-businesses, and community advocacy.",
  },
  {
    question: "Can I donate from outside the country?",
    answer: "Yes! We accept international transfers. Please contact our team via email to receive the appropriate international banking details (SWIFT/IBAN).",
  },
  {
    question: "Is there a minimum donation amount?",
    answer: "No contribution is too small. Every bit of support helps us provide essential resources to those who need them most.",
  },
];

const DONATION_METHODS: DonationMethod[] = [
  {
    title: "Online Donation",
    description: "Account details available upon request. Contact our team to receive secure payment instructions.",
    icon: Heart,
  },
  {
    title: "In-Kind Donations",
    description: "Donate goods or services—educational materials, clothing, or professional expertise.",
    icon: Gift,
  },
];

// ------------------ REUSABLE COMPONENTS ------------------

const SectionHeader = ({ title, subtitle, align = "left" }: { title: string; subtitle?: React.ReactNode; align?: "left" | "center" }) => (
  <header className={`space-y-3 sm:space-y-4 ${align === "center" ? "text-center mx-auto" : "text-left"}`}>
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-950 dark:text-white tracking-tight leading-tight">
      {title}
    </h2>
    {subtitle && (
      <p className={`text-gray-600 dark:text-blue-100/70 text-sm sm:text-base lg:text-lg leading-relaxed ${align === "center" ? "max-w-2xl mx-auto" : "max-w-xl"}`}>
        {subtitle}
      </p>
    )}
  </header>
);

const ImageCard = ({ src, alt, reverse = false }: { src: string; alt: string; reverse?: boolean }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full max-w-md mx-auto lg:max-w-lg">
      {/* Decorative background element - smaller and more subtle */}
      <div className={`absolute -inset-3 bg-gradient-to-br from-blue-100 to-transparent dark:from-blue-900/20 rounded-3xl -z-10 transform ${reverse ? '-rotate-1' : 'rotate-1'}`} />
      
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl shadow-blue-900/10 border border-white/50 dark:border-gray-800">
        {/* Loading skeleton */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        )}
        
        {hasError ? (
          <div className="w-full aspect-[4/3] flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <span className="text-gray-400 dark:text-gray-600 text-sm">Image unavailable</span>
          </div>
        ) : (
          <>
            <img
              src={src}
              alt={alt}
              className={`w-full h-auto object-cover aspect-[4/3] sm:aspect-[3/2] transform hover:scale-105 transition-all duration-700 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
            />
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl sm:rounded-3xl pointer-events-none" />
          </>
        )}
      </div>
    </div>
  );
};

// ------------------ MAIN COMPONENT ------------------
const GetInvolved: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToContact = () => {
    document.getElementById("volunteer")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative bg-slate-50/50 dark:bg-gray-950 transition-colors duration-500 py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden">
      
      {/* Background blobs for visual interest */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28 lg:space-y-40">
        
        {/* 1. VOLUNTEER SECTION */}
        <div id="volunteer" className="scroll-mt-20 sm:scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
          <div className="order-2 lg:order-1 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-600/20">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs">Join Us</span>
            </div>

            <SectionHeader
              title="Become a Volunteer"
              subtitle="Your skills and passion can change lives. Join our network of changemakers dedicated to uplifting women and girls."
            />

            <div className="space-y-3 sm:space-y-4">
              {CONTACT_METHODS.map((method, i) => (
                <a
                  key={i}
                  href={method.link}
                  className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-xl transition-all group"
                >
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <method.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-tight mb-0.5">{method.text}</p>
                    <p className="text-xs sm:text-sm md:text-base font-bold text-blue-900 dark:text-white truncate flex items-center gap-1.5 sm:gap-2">
                      <span className="truncate">{method.linkText}</span>
                      <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <ImageCard src="/volut.jpg" alt="Volunteers collaborating" />
          </div>
        </div>

        {/* 2. DONATION SECTION */}
        <div id="donation" className="scroll-mt-20 sm:scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
          <div className="order-1">
            <ImageCard src="/donations.jpg" alt="Support and resources" reverse />
          </div>

          <div className="order-2 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-pink-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-pink-600/20">
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs">Impact</span>
            </div>

            <SectionHeader
              title="Ways to Give"
              subtitle="Your contribution builds a more just society. We ensure every resource reaches the heart of the community."
            />

            <div className="space-y-3 sm:space-y-4">
              {DONATION_METHODS.map((method, i) => (
                <div key={i} className="flex gap-3 sm:gap-4 md:gap-5 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white dark:bg-gray-900 shadow-sm border border-gray-50 dark:border-gray-800">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pink-50 dark:bg-pink-900/20 flex items-center justify-center text-pink-600 dark:text-pink-400">
                    <method.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm sm:text-base text-blue-900 dark:text-white">{method.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{method.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={scrollToContact}
              className="group flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6 lg:gap-8 px-6 sm:px-8 py-3 sm:py-4 bg-blue-900 dark:bg-blue-600 text-white rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold hover:bg-blue-800 dark:hover:bg-blue-700 transition-all shadow-xl active:scale-95"
            >
              <span>Request Account Details</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 3. FAQ SECTION */}
        <div className="max-w-3xl mx-auto px-2 sm:px-0">
          <SectionHeader 
            align="center"
            title="Common Questions"
            subtitle="Everything you need to know about our transparency and donation process."
          />

          <div className="mt-8 sm:mt-10 lg:mt-12 space-y-2.5 sm:space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className={`overflow-hidden rounded-xl sm:rounded-2xl border transition-all duration-300 ${
                  openFaq === idx 
                  ? "border-blue-200 bg-blue-50/40 dark:border-blue-700 dark:bg-blue-900/20 shadow-inner" 
                  : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-800"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-3"
                  aria-expanded={openFaq === idx}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className={`font-bold text-sm sm:text-base transition-colors pr-2 ${openFaq === idx ? 'text-blue-700 dark:text-blue-400' : 'text-blue-950 dark:text-white'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === idx ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-gray-400'
                    }`} 
                    aria-hidden="true"
                  />
                </button>
                <div 
                  id={`faq-answer-${idx}`}
                  className={`px-4 sm:px-5 transition-all duration-300 ease-in-out ${
                    openFaq === idx ? "max-h-48 pb-4 sm:pb-5 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed border-t border-blue-100/50 dark:border-blue-800 pt-3 sm:pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;