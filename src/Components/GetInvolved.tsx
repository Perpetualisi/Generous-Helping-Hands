import React, { useState } from "react";
import { Mail, Heart, Users, Gift, ArrowRight, Instagram, ChevronDown, ChevronUp } from "lucide-react";

// ------------------ TYPES & DATA ------------------
const contactMethods = [
  {
    icon: Mail,
    text: "Email our team",
    link: "mailto:Giversgenerous@gmail.com",
    linkText: "Giversgenerous@gmail.com",
  },
  {
    icon: Instagram,
    text: "Message us on Instagram",
    link: "https://instagram.com/GenerousHands",
    linkText: "@GenerousHands",
  },
];

const faqs = [
  {
    question: "How are my donations used?",
    answer: "100% of public donations go directly toward our core programs: providing educational materials for girls, funding women-led micro-businesses, and community advocacy."
  },
  {
    question: "Can I donate from outside the country?",
    answer: "Yes! We accept international transfers. Please contact our team via email to receive the appropriate international banking details (SWIFT/IBAN)."
  },
  {
    question: "Is there a minimum donation amount?",
    answer: "No contribution is too small. Every bit of support helps us provide essential resources to those who need them most."
  }
];

const donationMethods = [
  {
    title: "Online Donation",
    description: "Account details available upon request. Contact our team to receive secure payment instructions.",
    icon: Heart,
  },
  {
    title: "In-Kind Donations",
    description: "Donate goods or services—educational materials, clothing, or professional expertise—that support our operations.",
    icon: Gift,
  },
];

// ------------------ REUSABLE COMPONENTS ------------------

const SectionHeader: React.FC<{ title: string; subtitle?: string | React.ReactNode }> = ({ title, subtitle }) => (
  <div className="space-y-4">
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-900 dark:text-white tracking-tight">
      {title}
    </h2>
    {subtitle && (
      <div className="text-gray-600 dark:text-blue-100/60 text-base sm:text-lg max-w-2xl leading-relaxed">
        {subtitle}
      </div>
    )}
  </div>
);

const ImageCard: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <div className="relative group w-full">
    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
    <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-blue-50 dark:border-blue-900/30">
      <img
        src={src}
        alt={alt}
        className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover transform transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
    </div>
  </div>
);

// ------------------ MAIN COMPONENT ------------------

const GetInvolved: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToContact = () => {
    document.getElementById('volunteer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-white dark:bg-gray-950 transition-colors duration-500 py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 lg:space-y-48">
        
        {/* ================= 1. VOLUNTEER SECTION ================= */}
        <div id="volunteer" className="scroll-mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-wider">
              <Users className="w-4 h-4" />
              Join the movement
            </div>
            
            <SectionHeader 
              title="Become a Volunteer" 
              subtitle="Your skills and passion can change lives. Join our global network of changemakers dedicated to uplifting women and girls."
            />

            <div className="grid grid-cols-1 gap-4">
              {contactMethods.map((method, i) => (
                <a 
                  key={i} 
                  href={method.link}
                  className="flex items-center gap-4 p-4 rounded-xl border border-blue-100 dark:border-blue-900/50 bg-blue-50/30 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-blue-900/20 hover:shadow-md transition-all group"
                >
                  <div className="p-3 rounded-lg bg-blue-600 text-white shadow-md group-hover:scale-110 transition-transform">
                    <method.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-blue-400 dark:text-blue-500 uppercase tracking-tight">{method.text}</p>
                    <p className="text-sm font-semibold text-blue-900 dark:text-white">{method.linkText}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="pt-4">
                {/* <a 
                  href="mailto:Giversgenerous@gmail.com?subject=Volunteer Application"
                  className="inline-flex w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-bold items-center justify-center gap-2 hover:bg-blue-700 transition-all hover:-translate-y-1 active:scale-95 shadow-lg shadow-blue-200 dark:shadow-none"
                >
                  Apply to Volunteer
                  <ArrowRight className="w-5 h-5" />
                </a> */}
            </div>
          </div>

          <div className="lg:order-last order-first">
            <ImageCard src="/volut.jpg" alt="Volunteers working together" />
          </div>
        </div>

        {/* ================= 2. DONATION SECTION ================= */}
        <div id="donation" className="scroll-mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-last lg:order-first">
            <ImageCard src="/donations.jpg" alt="Supporting the community" />
          </div>

          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-wider">
              <Heart className="w-4 h-4" />
              Support Our Cause
            </div>

            <SectionHeader 
              title="Ways to Donate" 
              subtitle="Your donation significantly impacts women's and girls' empowerment and social equity. Join us in creating a just society."
            />

            <div className="space-y-4">
              {donationMethods.map((method, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-blue-50 dark:border-blue-900/30 shadow-sm flex gap-5 hover:border-blue-200 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <method.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-blue-900 dark:text-white">{method.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-blue-100/60 mt-1 leading-relaxed">{method.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-2xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 text-center space-y-4">
                <button 
                  className="inline-flex w-full sm:w-auto px-10 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white rounded-xl font-bold items-center justify-center gap-2 transition-all hover:-translate-y-1 active:scale-95"
                  onClick={scrollToContact}
                >
                  Contact for More Information
                  <Heart className="w-5 h-5" />
                </button>
            </div>
          </div>
        </div>

        {/* ================= 3. FAQ SECTION ================= */}
        <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-4">
                <h3 className="text-3xl font-bold text-blue-900 dark:text-white">Common Questions</h3>
                <p className="text-gray-500">Everything you need to know about our work and contributions.</p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, idx) => (
                    <div 
                        key={idx} 
                        className="border border-blue-100 dark:border-blue-900/30 rounded-2xl overflow-hidden bg-blue-50/20 dark:bg-gray-900/30"
                    >
                        <button 
                            onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                            className="w-full flex items-center justify-between p-6 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        >
                            <span className="font-bold text-blue-900 dark:text-white">{faq.question}</span>
                            {openFaq === idx ? <ChevronUp className="text-blue-600" /> : <ChevronDown className="text-blue-400" />}
                        </button>
                        {openFaq === idx && (
                            <div className="px-6 pb-6 text-gray-600 dark:text-blue-100/60 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};

export default GetInvolved;