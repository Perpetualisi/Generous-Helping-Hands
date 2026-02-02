import React, { useState, useMemo } from "react";
import { Mail, Heart, Users, Gift, Instagram, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

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
const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: React.ReactNode }) => (
  <header className="space-y-4">
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-900 dark:text-white tracking-tight leading-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="text-gray-600 dark:text-blue-100/70 text-base sm:text-lg max-w-2xl leading-relaxed">
        {subtitle}
      </p>
    )}
  </header>
);

const ImageCard = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative group w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
    <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-700" />
    <div className="relative h-full overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-2xl border border-blue-50/50 dark:border-blue-900/20">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
        loading="lazy"
      />
    </div>
  </div>
);

// ------------------ MAIN COMPONENT ------------------
const GetInvolved: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToContact = () => {
    const el = document.getElementById("volunteer");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative bg-white dark:bg-gray-950 transition-colors duration-500 py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent dark:from-blue-900/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 lg:space-y-48 relative z-10">
        
        {/* 1. VOLUNTEER SECTION */}
        <div id="volunteer" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-widest border border-blue-200/50 dark:border-blue-800/50">
              <Users className="w-3.5 h-3.5" />
              Join the movement
            </div>

            <SectionHeader
              title="Become a Volunteer"
              subtitle="Your skills and passion can change lives. Join our global network of changemakers dedicated to uplifting women and girls."
            />

            <nav className="grid grid-cols-1 gap-4" aria-label="Contact methods">
              {CONTACT_METHODS.map((method, i) => (
                <a
                  key={i}
                  href={method.link}
                  target={method.link.startsWith('http') ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 p-5 rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-white dark:bg-gray-900/50 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
                >
                  <div className="p-3.5 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <method.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest mb-1">
                      {method.text}
                    </p>
                    <p className="text-base font-semibold text-blue-900 dark:text-white flex items-center gap-2">
                      {method.linkText}
                      {method.link.startsWith('http') && <ExternalLink className="w-3 h-3 opacity-50" />}
                    </p>
                  </div>
                </a>
              ))}
            </nav>
          </div>

          <div className="lg:order-last order-first">
            <ImageCard src="/volut.jpg" alt="A diverse group of volunteers collaborating on a project" />
          </div>
        </div>

        {/* 2. DONATION SECTION */}
        <div id="donation" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-last lg:order-first">
            <ImageCard src="/donations.jpg" alt="Community members receiving support and resources" />
          </div>

          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 text-xs font-bold uppercase tracking-widest border border-pink-200/50 dark:border-pink-800/50">
              <Heart className="w-3.5 h-3.5" />
              Support Our Cause
            </div>

            <SectionHeader
              title="Ways to Donate"
              subtitle="Your donation significantly impacts women's and girls' empowerment and social equity. Every contribution builds a more just society."
            />

            <div className="space-y-5">
              {DONATION_METHODS.map((method, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-blue-50 dark:border-blue-900/30 shadow-sm flex gap-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <method.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-blue-900 dark:text-white">
                      {method.title}
                    </h4>
                    <p className="text-gray-600 dark:text-blue-100/60 mt-2 leading-relaxed">
                      {method.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold overflow-hidden transition-all hover:bg-blue-700 active:scale-95 shadow-xl shadow-blue-600/20"
                onClick={scrollToContact}
              >
                <span>Request Account Details</span>
                <Heart className="w-5 h-5 group-hover:fill-current transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. FAQ SECTION */}
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h3 className="text-3xl sm:text-4xl font-bold text-blue-900 dark:text-white">Common Questions</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Transparency is core to our mission. If you have more questions, don't hesitate to reach out.
            </p>
          </div>

          <div className="grid gap-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className={`group border rounded-2xl transition-all duration-300 ${
                  openFaq === idx 
                  ? "border-blue-200 bg-blue-50/30 dark:border-blue-700 dark:bg-blue-900/20" 
                  : "border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900/50 hover:border-blue-200 dark:hover:border-blue-800"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-bold text-blue-900 dark:text-white pr-8">
                    {faq.question}
                  </span>
                  <div className={`transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}>
                    <ChevronDown className={openFaq === idx ? "text-blue-600" : "text-gray-400"} />
                  </div>
                </button>
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    openFaq === idx ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-gray-600 dark:text-blue-100/70 text-base leading-relaxed border-t border-blue-100/50 dark:border-blue-800/50 mt-2 pt-4">
                      {faq.answer}
                    </div>
                  </div>
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