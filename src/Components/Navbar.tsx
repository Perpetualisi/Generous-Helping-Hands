import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Heart } from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface SubLink {
  name: string;
  href: string;
}

interface MenuItem {
  name: string;
  href?: string;
  subLinks?: SubLink[];
}

interface DesktopDropdownProps {
  item: MenuItem;
  onNavigate: (id: string) => void;
}

interface MobileMenuItemProps {
  item: MenuItem;
  openDropdown: string | null;
  onToggle: (name: string) => void;
  onNavigate: (id: string) => void;
}

// ─── THEME CONSTANTS (Matching Hero.tsx) ──────────────────────────────────────
const COLORS = {
  accent: "#F59E0B", // Warm Amber
  accentDeep: "#D97706",
  textMain: "#2D241E", // Deep Brown
  bgWarm: "#FFFDF9",
  border: "rgba(45,36,30,0.08)",
  gradient: "linear-gradient(135deg, #F59E0B, #EA580C)",
};

const MENU_ITEMS: MenuItem[] = [
  { name: "Home", href: "hero" },
  {
    name: "About",
    subLinks: [
      { name: "Why Our Work Matters", href: "whyitmatters" },
      { name: "Our Story",           href: "ourstory" },
      { name: "Our Mission",         href: "missionstatement" },
      { name: "Our Vision",          href: "visionstatement" },
      { name: "Meet the Team",       href: "meettheteam" },
    ],
  },
  {
    name: "Programs",
    subLinks: [
      { name: "Our Programs", href: "ourprograms" },
      { name: "Events",       href: "events" },
    ],
  },
  {
    name: "Get Involved",
    subLinks: [
      { name: "Volunteer", href: "volunteer" },
      { name: "Donate",    href: "donation" },
    ],
  },
  { name: "Testimonials", href: "testimonials" },
  { name: "Contact",      href: "contact" },
];

// ─── LOGO ─────────────────────────────────────────────────────────────────────
const ResponsiveLogo: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 bg-transparent border-none cursor-pointer p-0 group"
  >
    <div className="w-[42px] h-[42px] sm:w-[48px] sm:h-[48px] rounded-xl overflow-hidden shadow-lg shadow-amber-200/50 transition-transform group-hover:scale-105 duration-300">
      <img 
        src="/logo_light.jpg" 
        alt="GHHF Logo"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="text-left hidden sm:block">
      <div 
        className="font-['Playfair_Display'] font-bold leading-none text-[1.1rem]"
        style={{ color: COLORS.textMain }}
      >
        GHHF
      </div>
      <div 
        className="font-['DM_Sans'] text-[0.6rem] uppercase tracking-widest font-bold opacity-60"
        style={{ color: COLORS.textMain }}
      >
        Helping Hands
      </div>
    </div>
  </button>
);

// ─── DESKTOP DROPDOWN ─────────────────────────────────────────────────────────
const DesktopDropdown: React.FC<DesktopDropdownProps> = ({ item, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => { if (timer.current) clearTimeout(timer.current); setOpen(true); };
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 150); };

  const linkStyle = "px-3 py-2 font-['DM_Sans'] text-[0.75rem] tracking-widest uppercase font-bold transition-all duration-300 flex items-center gap-1 cursor-pointer border-none bg-transparent whitespace-nowrap";

  if (!item.subLinks) {
    return (
      <button 
        className={linkStyle} 
        style={{ color: COLORS.textMain }}
        onClick={() => onNavigate(item.href || "hero")}
      >
        {item.name}
      </button>
    );
  }

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button 
        className={linkStyle}
        style={{ color: open ? COLORS.accentDeep : COLORS.textMain }}
      >
        {item.name}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="absolute top-full left-0 min-w-[230px] bg-white border border-amber-100 rounded-2xl p-2 shadow-2xl z-[200] mt-2 backdrop-blur-xl"
          >
            {item.subLinks.map((sub) => (
              <button
                key={sub.href}
                onClick={() => { onNavigate(sub.href); setOpen(false); }}
                className="w-full text-left px-4 py-3 font-['DM_Sans'] text-[0.85rem] text-stone-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200 border-none bg-transparent cursor-pointer"
              >
                {sub.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── MOBILE MENU ITEM ─────────────────────────────────────────────────────────
const MobileMenuItem: React.FC<MobileMenuItemProps> = ({ item, openDropdown, onToggle, onNavigate }) => {
  const isOpen = openDropdown === item.name;

  return (
    <div className="w-full">
      <button
        onClick={() => item.subLinks ? onToggle(item.name) : onNavigate(item.href || "hero")}
        className="flex items-center justify-between w-full py-5 border-b border-stone-100 bg-transparent font-['DM_Sans'] text-[0.9rem] tracking-widest uppercase transition-colors"
        style={{ color: isOpen ? COLORS.accentDeep : COLORS.textMain, fontWeight: isOpen ? 800 : 600 }}
      >
        <span>{item.name}</span>
        {item.subLinks && (
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            <ChevronDown size={18} className={isOpen ? "text-amber-600" : "text-stone-300"} />
          </motion.div>
        )}
      </button>

      <AnimatePresence>
        {isOpen && item.subLinks && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-amber-50/30 rounded-2xl mb-2"
          >
            {item.subLinks.map((sub) => (
              <button
                key={sub.href}
                onClick={() => onNavigate(sub.href)}
                className="w-full text-left py-4 px-6 font-['DM_Sans'] text-[0.9rem] text-stone-500 bg-transparent border-none border-l-4 border-amber-200"
              >
                {sub.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
export const NAVBAR_HEIGHT = 80;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = useCallback((id: string) => {
    setIsOpen(false);
    setOpenDropdown(null);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.pageYOffset - NAVBAR_HEIGHT;
      window.scrollTo({ top, behavior: "smooth" });
    }, 150);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;700&display=swap');
      `}</style>

      {/* Announcement Bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-[36px] flex items-center justify-center z-[1100] text-[0.7rem] font-bold tracking-widest text-white px-4"
        style={{ background: COLORS.gradient, fontFamily: "'DM Sans', sans-serif" }}
      >
        <Heart size={12} fill="white" className="mr-2" />
        EMPOWERING WOMEN & GIRLS ACROSS NIGERIA
      </div>

      <motion.nav
        initial={{ y: -NAVBAR_HEIGHT }}
        animate={{ y: 0 }}
        className="fixed left-0 right-0 z-[1000] transition-all duration-500"
        style={{
          top: "36px",
          height: `${NAVBAR_HEIGHT}px`,
          background: scrolled ? "rgba(255, 253, 249, 0.9)" : "rgba(255, 253, 249, 1)",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid ${COLORS.border}` : "1px solid transparent",
          boxShadow: scrolled ? "0 10px 30px -10px rgba(45,36,30,0.08)" : "none",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
          <ResponsiveLogo onClick={() => handleNavigate("hero")} />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {MENU_ITEMS.map((item) => (
              <DesktopDropdown key={item.name} item={item} onNavigate={handleNavigate} />
            ))}
            <div className="w-[1px] h-6 bg-stone-200 mx-4" />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigate("donation")}
              className="flex items-center gap-2 px-7 py-3 text-white font-['DM_Sans'] text-[0.75rem] font-bold rounded-full transition-all shadow-xl shadow-amber-200/50 border-none cursor-pointer"
              style={{ background: COLORS.gradient }}
            >
              <Heart size={14} fill="white" /> DONATE NOW
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2.5 bg-amber-50 border border-amber-100 rounded-xl text-stone-700 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[1200] bg-[#FFFDF9] p-6 pt-10 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
               <ResponsiveLogo onClick={() => handleNavigate("hero")} />
               <button onClick={() => setIsOpen(false)} className="p-2 text-stone-400"><X size={32} /></button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <p className="text-[0.65rem] font-bold tracking-[0.2em] text-amber-600 mb-4 uppercase">Main Menu</p>
              {MENU_ITEMS.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <MobileMenuItem
                    item={item}
                    openDropdown={openDropdown}
                    onToggle={(name) => setOpenDropdown(openDropdown === name ? null : name)}
                    onNavigate={handleNavigate}
                  />
                </motion.div>
              ))}
            </div>

            <div className="pt-6 border-t border-stone-100">
              <button
                onClick={() => handleNavigate("donation")}
                className="w-full py-5 text-white rounded-2xl font-['DM_Sans'] font-bold text-[1rem] shadow-2xl shadow-amber-200 border-none flex items-center justify-center gap-3"
                style={{ background: COLORS.gradient }}
              >
                <Heart size={20} fill="white" /> Support Our Mission
              </button>
              <p className="text-center text-[0.6rem] text-stone-400 mt-6 tracking-widest uppercase">
                © 2026 Generous Helping Hands Foundation
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;