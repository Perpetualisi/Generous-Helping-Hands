import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Mail, Heart, Gift, Instagram,
  Users, Globe, ChevronDown,
  ExternalLink, ArrowRight, ShieldCheck,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContactMethod {
  icon: React.ElementType;
  label: string;
  href: string;
  display: string;
  iconBg: string;
}

interface DonationMethod {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONTACT_METHODS: ContactMethod[] = [
  {
    icon: Mail,
    label: "Email",
    href: "mailto:Giversgenerous@gmail.com",
    display: "Giversgenerous@gmail.com",
    iconBg: "bg-blue-600",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/GenerousHands",
    display: "@GenerousHands",
    iconBg: "bg-rose-500",
  },
];

const DONATION_METHODS: DonationMethod[] = [
  {
    icon: Heart,
    title: "Online Donation",
    description:
      "Contact our team to receive secure account details for a direct bank transfer. Every naira goes straight to our programs.",
  },
  {
    icon: Gift,
    title: "In-Kind Donations",
    description:
      "Books, clothing, food supplies, or professional skills — we welcome goods and services that help the communities we serve.",
  },
];

const FAQS: FAQItem[] = [
  {
    question: "How are donations used?",
    answer:
      "100% of public donations go directly toward our core programs — school fees for girls, start-up support for women-led businesses, and community health outreach. We publish a full transparency report annually.",
  },
  {
    question: "Can I donate from outside Nigeria?",
    answer:
      "Yes. We accept international transfers. Reach out via email and our team will send you the correct SWIFT/IBAN banking details.",
  },
  {
    question: "Is there a minimum donation amount?",
    answer:
      "No minimum at all. Every contribution — big or small — goes toward real, measurable change for women and girls in Nigeria.",
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

/**
 * Correctly named variants ("hidden" / "visible") so Framer Motion's
 * whileInView can resolve them. The previous code used "initial" /
 * "whileInView" as variant keys — those are reserved prop names, not
 * valid variant keys, causing silent animation failures.
 */
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.55, ease: "easeOut" } },
};

const fadeRight: Variants = {
  hidden:  { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.55, ease: "easeOut" } },
};

// ─── Shared components ────────────────────────────────────────────────────────

/** Small labelled pill used above section headings. */
const Eyebrow: React.FC<{ icon: React.ElementType; children: React.ReactNode }> = ({
  icon: Icon,
  children,
}) => (
  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 mb-5">
    <Icon size={12} aria-hidden="true" />
    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{children}</span>
  </div>
);

/**
 * Photo card with layered depth plates — premium feel without 3D transforms.
 * Keeps the full image visible via object-contain.
 */
const Photo: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <div className="relative w-full max-w-[300px] mx-auto lg:mx-0">
      {/* Back plates */}
      <div className="absolute inset-0 rounded-3xl bg-blue-100 dark:bg-blue-950 translate-x-4 translate-y-4" aria-hidden="true" />
      <div className="absolute inset-0 rounded-3xl bg-blue-200/60 dark:bg-blue-900/30 translate-x-2 translate-y-2" aria-hidden="true" />

      {/* Main card */}
      <div className="relative rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.14)] dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]">
        {status === "loading" && (
          <div className="absolute inset-0 animate-pulse bg-gray-100 dark:bg-gray-800" aria-hidden="true" />
        )}
        {status === "error" ? (
          <div className="aspect-square flex items-center justify-center bg-gray-50 dark:bg-gray-800 text-gray-300 text-sm font-medium">
            Photo unavailable
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setStatus("loaded")}
            onError={() => setStatus("error")}
            className={`w-full aspect-square object-cover transition-opacity duration-500 ${
              status === "loaded" ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>
    </div>
  );
};

// ─── FAQ row ─────────────────────────────────────────────────────────────────

const FAQRow: React.FC<{
  item: FAQItem;
  index: number;
  open: boolean;
  onToggle: () => void;
}> = ({ item, index, open, onToggle }) => (
  <div className="border-b border-gray-100 dark:border-gray-800 last:border-0">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="w-full flex items-center justify-between gap-6 py-6 text-left group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded"
    >
      <span className="flex items-center gap-4">
        <span className="text-[11px] font-black text-blue-500 shrink-0 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`font-bold text-sm leading-snug transition-colors ${
            open
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400"
          }`}
        >
          {item.question}
        </span>
      </span>
      <ChevronDown
        size={16}
        className={`shrink-0 text-gray-400 transition-transform duration-300 ${open ? "rotate-180 text-blue-500" : ""}`}
        aria-hidden="true"
      />
    </button>

    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="answer"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="pb-6 pl-9 text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
            {item.answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// ─── Section components ───────────────────────────────────────────────────────

const VolunteerSection: React.FC = () => (
  <div
    id="volunteer"
    className="py-20 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
  >
    {/* Copy — always first in DOM (good for mobile & screen readers) */}
    <motion.div
      variants={fadeLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="lg:col-span-7 space-y-6"
    >
      <Eyebrow icon={Users}>Volunteer</Eyebrow>

      <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.1] text-gray-900 dark:text-white">
        Your hands can{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
          build the future.
        </span>
      </h2>

      <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-lg">
        Whether you have two hours a week or a professional skill to share,
        there is a place for you. Reach out and we will find the right fit.
      </p>

      <div className="space-y-3 pt-2">
        {CONTACT_METHODS.map((m) => (
          <a
            key={m.href}
            href={m.href}
            className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-transparent hover:border-blue-200 dark:hover:border-blue-900 transition-all group focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
          >
            <div
              className={`w-11 h-11 rounded-xl ${m.iconBg} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0`}
            >
              <m.icon size={18} aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">
                {m.label}
              </p>
              <p className="text-sm font-bold text-gray-900 dark:text-white truncate flex items-center gap-1.5">
                {m.display}
                <ExternalLink size={11} className="shrink-0 opacity-40 group-hover:opacity-80 transition-opacity" aria-hidden="true" />
              </p>
            </div>
          </a>
        ))}
      </div>
    </motion.div>

    {/* Photo */}
    <motion.div
      variants={fadeRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="lg:col-span-5 flex justify-center lg:justify-end"
    >
      <Photo src="/volut.jpg" alt="Foundation volunteers working together" />
    </motion.div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────

const DonationSection: React.FC = () => (
  <div
    id="donation"
    className="py-20 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center border-t border-gray-100 dark:border-gray-800"
  >
    {/* Photo — visually left on desktop, below copy on mobile */}
    <motion.div
      variants={fadeLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1"
    >
      <Photo src="/donations.jpg" alt="Donated resources being distributed" />
    </motion.div>

    {/* Copy */}
    <motion.div
      variants={fadeRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="lg:col-span-7 space-y-6 order-1 lg:order-2"
    >
      <Eyebrow icon={Heart}>Donate</Eyebrow>

      <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.1] text-gray-900 dark:text-white">
        Every gift goes{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
          directly to people.
        </span>
      </h2>

      <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-lg">
        No middlemen, no overhead cuts. Whatever you give funds education,
        livelihoods, and health care for Nigerian women and girls.
      </p>

      {/* Donation methods */}
      <div className="space-y-5 pt-2">
        {DONATION_METHODS.map((m) => (
          <div key={m.title} className="flex gap-4">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
              <m.icon size={15} aria-hidden="true" />
            </div>
            <div>
              <h4 className="font-black text-sm text-gray-900 dark:text-white uppercase tracking-wide mb-0.5">
                {m.title}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {m.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2">
        <motion.a
          href="mailto:Giversgenerous@gmail.com"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-colors group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          Request Details
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </motion.a>

        <p className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
          <ShieldCheck size={13} className="text-blue-500" aria-hidden="true" />
          Transparency guaranteed
        </p>
      </div>
    </motion.div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────

const FAQSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="py-20 md:py-32 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-2xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <Eyebrow icon={Users}>FAQ</Eyebrow>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white">
            Common questions.
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {FAQS.map((faq, i) => (
            <FAQRow
              key={faq.question}
              item={faq}
              index={i}
              open={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const GetInvolved: React.FC = () => (
  <section
    aria-label="Get Involved — Volunteer and Donate"
    className="relative bg-white dark:bg-[#020617] transition-colors duration-500 overflow-hidden"
  >
    {/* Ambient background orbs */}
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute top-0 left-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[120px]" />
    </div>

    <div className="max-w-6xl mx-auto px-6 relative z-10">
      <VolunteerSection />
      <DonationSection />
      <FAQSection />
    </div>
  </section>
);

export default GetInvolved;