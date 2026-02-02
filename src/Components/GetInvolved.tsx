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
  <header className={`space-y-4 ${align === "center" ? "text-center mx-auto" : "text-left"}`}>
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-950 dark:text-white tracking-tight leading-[1.1]">
      {title}
    </h2>
    {subtitle && (
      <p className={`text-gray-600 dark:text-blue-100/70 text-base sm:text-lg leading-relaxed ${align === "center" ? "max-w-2xl mx-auto" : "max-w-xl"}`}>
        {subtitle}
      </p>
    )}
  </header>
);

const ImageCard = ({ src, alt, reverse = false }: { src: string; alt: string; reverse?: boolean }) => (
  <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
    {/* Decorative background element that shifts based on section side */}
    <div className={`absolute -inset-4 bg-gradient-to-br from-blue-100 to-transparent dark:from-blue-900/20 rounded-[2.5rem] -z-10 transform ${reverse ? '-rotate-2' : 'rotate-2'}`} />
    
    <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl shadow-blue-900/10 border border-white/50 dark:border-gray-800">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
        loading="lazy"
      />
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl" />
    </div>
  </div>
);

// ------------------ MAIN COMPONENT ------------------
const GetInvolved: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToContact = () => {
    document.getElementById("volunteer")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative bg-slate-50/50 dark:bg-gray-950 transition-colors duration-500 py-16 sm:py-24 lg:py-32 overflow-hidden">
      
      {/* Background blobs for visual interest */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 lg:space-y-48">
        
        {/* 1. VOLUNTEER SECTION */}
        <div id="volunteer" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="order-2 lg:order-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-600/20">
              <Users className="w-4 h-4" />
              Join Us
            </div>

            <SectionHeader
              title="Become a Volunteer"
              subtitle="Your skills and passion can change lives. Join our network of changemakers dedicated to uplifting women and girls."
            />

            <div className="space-y-4">
              {CONTACT_METHODS.map((method, i) => (
                <a
                  key={i}
                  href={method.link}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-xl transition-all group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <method.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter mb-0.5">{method.text}</p>
                    <p className="text-sm sm:text-base font-bold text-blue-900 dark:text-white truncate flex items-center gap-2">
                      {method.linkText}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
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
        <div id="donation" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="order-1">
            <ImageCard src="/donations.jpg" alt="Support and resources" reverse />
          </div>

          <div className="order-2 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-pink-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-pink-600/20">
              <Heart className="w-4 h-4" />
              Impact
            </div>

            <SectionHeader
              title="Ways to Give"
              subtitle="Your contribution builds a more just society. We ensure every resource reaches the heart of the community."
            />

            <div className="space-y-4">
              {DONATION_METHODS.map((method, i) => (
                <div key={i} className="flex gap-5 p-5 rounded-2xl bg-white dark:bg-gray-900 shadow-sm border border-gray-50 dark:border-gray-800">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-50 dark:bg-pink-900/20 flex items-center justify-center text-pink-600 dark:text-pink-400">
                    <method.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 dark:text-white">{method.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{method.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={scrollToContact}
              className="group flex items-center justify-between w-full sm:w-auto gap-8 px-8 py-4 bg-blue-900 dark:bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-800 dark:hover:bg-blue-700 transition-all shadow-xl"
            >
              <span>Request Account Details</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 3. FAQ SECTION */}
        <div className="max-w-3xl mx-auto">
          <SectionHeader 
            align="center"
            title="Common Questions"
            subtitle="Everything you need to know about our transparency and donation process."
          />

          <div className="mt-12 space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  openFaq === idx 
                  ? "border-blue-200 bg-blue-50/40 dark:border-blue-700 dark:bg-blue-900/20 shadow-inner" 
                  : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 hover:border-blue-300"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className={`font-bold transition-colors ${openFaq === idx ? 'text-blue-700 dark:text-blue-400' : 'text-blue-950 dark:text-white'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-blue-600' : 'text-gray-400'}`} />
                </button>
                <div className={`px-5 transition-all duration-300 ease-in-out ${openFaq === idx ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-blue-100/50 dark:border-blue-800 pt-4">
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