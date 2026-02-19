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

// ─── DATA ─────────────────────────────────────────────────────────────────────
const MENU_ITEMS: MenuItem[] = [
  { name: "Home", href: "hero" },
  {
    name: "About",
    subLinks: [
      { name: "Why Our Work Matters", href: "whyitmatters" },
      { name: "Our Story",           href: "ourstory" },
      { name: "Our Mission",          href: "missionstatement" },
      { name: "Our Vision",           href: "visionstatement" },
      { name: "Meet the Team",        href: "meettheteam" },
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
  { name: "Contact",       href: "contact" },
];

// ─── HOOK ─────────────────────────────────────────────────────────────────────
const useScrolled = (threshold = 20): boolean => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const onScroll = () => {
      const isOverThreshold = window.scrollY > threshold;
      setScrolled((prev) => (prev !== isOverThreshold ? isOverThreshold : prev));
    };
    
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  
  return scrolled;
};

// ─── LOGO ─────────────────────────────────────────────────────────────────────
const ResponsiveLogo: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Go to home"
    style={{
      background: "transparent",
      border: "none",
      cursor: "pointer",
      padding: 0,
      display: "flex",
      alignItems: "center",
      height: "100%",
    }}
  >
    <img 
      src="/ghhf-logo.jpeg" // Replace with your actual path (e.g., /logo.svg or /logo.png)
      alt="Generous Helping Hands Foundation Logo"
      style={{
        height: "45px", // Adjust size to fit your design
        width: "auto",
        display: "block",
        objectFit: "contain"
      }}
    />
  </button>
);

// ─── DESKTOP DROPDOWN ─────────────────────────────────────────────────────────
const DesktopDropdown: React.FC<DesktopDropdownProps> = ({ item, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => { if (timer.current) clearTimeout(timer.current); setOpen(true); };
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 150); };

  const baseLinkStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    padding: "0.5rem 0.8rem",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.78rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.65)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
    fontWeight: 500,
  };

  if (!item.subLinks) {
    return (
      <button
        style={baseLinkStyle}
        onClick={() => onNavigate(item.href || "hero")}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
      >
        {item.name}
      </button>
    );
  }

  return (
    <div style={{ position: "relative" }} onMouseEnter={show} onMouseLeave={hide}>
      <button 
        style={{ ...baseLinkStyle, color: open ? "#C9A96E" : "rgba(255,255,255,0.65)" }}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {item.name}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={13} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "circOut" }}
            style={{
              position: "absolute",
              top: "100%",
              left: "0",
              minWidth: "220px",
              background: "rgba(10, 9, 8, 0.98)",
              border: "1px solid rgba(201,169,110,0.2)",
              borderRadius: "12px",
              padding: "0.5rem 0",
              boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
              backdropFilter: "blur(20px)",
              zIndex: 200,
              marginTop: "8px"
            }}
          >
            {item.subLinks.map((sub) => (
              <button
                key={sub.href}
                onClick={() => { onNavigate(sub.href); setOpen(false); }}
                className="dropdown-item"
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "0.75rem 1.25rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.6)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
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
    <div style={{ width: "100%" }}>
      <button
        onClick={() => item.subLinks ? onToggle(item.name) : onNavigate(item.href || "hero")}
        aria-expanded={isOpen}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "1.2rem 0",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.9rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          background: "transparent",
          border: "none",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          color: isOpen ? "#C9A96E" : "rgba(255,255,255,0.8)",
          fontWeight: isOpen ? 600 : 400,
        }}
      >
        <span>{item.name}</span>
        {item.subLinks && (
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            <ChevronDown size={16} color={isOpen ? "#C9A96E" : "rgba(255,255,255,0.3)"} />
          </motion.div>
        )}
      </button>

      <AnimatePresence>
        {isOpen && item.subLinks && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: "hidden", background: "rgba(201,169,110,0.02)" }}
          >
            {item.subLinks.map((sub) => (
              <button
                key={sub.href}
                onClick={() => onNavigate(sub.href)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "1rem 1.5rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.5)",
                  background: "transparent",
                  border: "none",
                  borderLeft: "2px solid rgba(201,169,110,0.3)",
                }}
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
export const NAVBAR_HEIGHT = 72;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const scrolled = useScrolled();

  const handleNavigate = useCallback((id: string) => {
    setIsOpen(false);
    setOpenDropdown(null);
    
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.pageYOffset - NAVBAR_HEIGHT;
      window.scrollTo({ top, behavior: "smooth" });
    }, 100);
  }, []);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = originalStyle; };
  }, [isOpen]);

  return (
    <>
      <style>{`
        .dropdown-item:hover {
          color: #C9A96E !important;
          background: rgba(201,169,110,0.06) !important;
          padding-left: 1.5rem !important;
        }
        .nb-desktop { display: flex; align-items: center; }
        .nb-mobile-toggle { display: none; }
        
        @media (max-width: 1024px) {
          .nb-desktop { display: none; }
          .nb-mobile-toggle { display: flex; }
        }
      `}</style>

      <motion.nav
        initial={{ y: -NAVBAR_HEIGHT }}
        animate={{ y: 0 }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          height: `${NAVBAR_HEIGHT}px`,
          background: scrolled ? "rgba(6, 6, 8, 0.95)" : "#060608",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: scrolled ? "blur(15px)" : "none",
          transition: "background 0.4s ease, backdrop-filter 0.4s ease",
        }}
      >
        <div style={{
          maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem",
          height: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between",
        }}>
          <ResponsiveLogo onClick={() => handleNavigate("hero")} />

          {/* Desktop Navigation */}
          <div className="nb-desktop" style={{ gap: "0.5rem" }}>
            {MENU_ITEMS.map((item) => (
              <DesktopDropdown key={item.name} item={item} onNavigate={handleNavigate} />
            ))}
            <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.1)", margin: "0 1rem" }} />
            <button
              onClick={() => handleNavigate("donation")}
              style={{
                padding: "0.6rem 1.4rem",
                background: "linear-gradient(135deg, #C9A96E, #a07840)",
                border: "none", borderRadius: "100px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem", fontWeight: 700,
                color: "#080808", cursor: "pointer",
                display: "flex", alignItems: "center", gap: "0.5rem",
                boxShadow: "0 4px 15px rgba(201,169,110,0.2)",
              }}
            >
              <Heart size={14} fill="#080808" /> Donate
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="nb-mobile-toggle"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px", padding: "0.5rem",
              color: "#fff", cursor: "pointer"
            }}
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
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            style={{
              position: "fixed",
              top: 0, right: 0, bottom: 0, left: 0,
              zIndex: 999,
              background: "#060608",
              padding: `${NAVBAR_HEIGHT + 20}px 1.5rem 2rem`,
              display: "flex", flexDirection: "column"
            }}
          >
            <div style={{ flex: 1, overflowY: "auto" }}>
              {MENU_ITEMS.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
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

            <button
              onClick={() => handleNavigate("donation")}
              style={{
                width: "100%", padding: "1.2rem",
                background: "linear-gradient(135deg, #C9A96E, #a07840)",
                border: "none", borderRadius: "12px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem", fontWeight: 700,
                color: "#080808", marginTop: "2rem"
              }}
            >
              Donate Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;