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

// ─── THEME CONSTANTS ──────────────────────────────────────────────────────────
const COLORS = {
  gold:       "#F59E0B",
  goldDeep:   "#D97706",
  orange:     "#EA580C",
  bg:         "#1a1714",
  bgCard:     "#211e1a",
  surface:    "rgba(255,255,255,0.04)",
  border:     "rgba(245,158,11,0.12)",
  borderHov:  "rgba(245,158,11,0.3)",
  text:       "#ffffff",
  textMuted:  "rgba(255,255,255,0.5)",
  gradient:   "linear-gradient(135deg, #F59E0B, #EA580C)",
};

const MENU_ITEMS: MenuItem[] = [
  { name: "Home", href: "hero" },
  {
    name: "About",
    subLinks: [
      { name: "Why Our Work Matters", href: "whyitmatters"    },
      { name: "Our Story",            href: "ourstory"        },
      { name: "Our Mission",          href: "missionstatement"},
      { name: "Our Vision",           href: "visionstatement" },
      { name: "Meet the Team",        href: "meettheteam"     },
    ],
  },
  {
    name: "Programs",
    subLinks: [
      { name: "Our Programs", href: "ourprograms" },
      { name: "Events",       href: "events"      },
    ],
  },
  {
    name: "Get Involved",
    subLinks: [
      { name: "Volunteer", href: "volunteer" },
      { name: "Donate",    href: "donation"  },
    ],
  },
  { name: "Testimonials", href: "testimonials" },
  { name: "Contact",      href: "contact"      },
];

// ─── LOGO ─────────────────────────────────────────────────────────────────────
const ResponsiveLogo: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: "flex", alignItems: "center", gap: "0.75rem",
      background: "transparent", border: "none", cursor: "pointer", padding: 0,
    }}
  >
    <div style={{
      width: 42, height: 42, borderRadius: 12, overflow: "hidden",
      boxShadow: "0 4px 20px rgba(245,158,11,0.25), 0 0 0 1px rgba(245,158,11,0.2)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      flexShrink: 0,
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = "scale(1.06)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 28px rgba(245,158,11,0.4), 0 0 0 1px rgba(245,158,11,0.35)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(245,158,11,0.25), 0 0 0 1px rgba(245,158,11,0.2)";
      }}
    >
      <img src="/logo_light.jpg" alt="GHHF Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
    <div style={{ textAlign: "left" }} className="hidden-sm">
      <div style={{
        fontFamily: "'Cormorant Garamond', serif", fontWeight: 700,
        fontSize: "1.15rem", color: "#fff", lineHeight: 1, letterSpacing: "-0.01em",
      }}>GHHF</div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem",
        textTransform: "uppercase", letterSpacing: "0.3em",
        color: "rgba(245,158,11,0.7)", marginTop: 3, fontWeight: 600,
      }}>Helping Hands</div>
    </div>
  </button>
);

// ─── DESKTOP DROPDOWN ─────────────────────────────────────────────────────────
const DesktopDropdown: React.FC<DesktopDropdownProps> = ({ item, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => { if (timer.current) clearTimeout(timer.current); setOpen(true); };
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 150); };

  const navLinkStyle: React.CSSProperties = {
    padding: "0.55rem 0.9rem",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.72rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 700,
    color: open ? COLORS.gold : COLORS.textMuted,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    display: "flex", alignItems: "center", gap: "0.3rem",
    whiteSpace: "nowrap",
    transition: "color 0.25s ease",
    borderRadius: 8,
  };

  if (!item.subLinks) {
    return (
      <button
        style={navLinkStyle}
        onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
        onMouseLeave={e => (e.currentTarget.style.color = COLORS.textMuted)}
        onClick={() => onNavigate(item.href || "hero")}
      >
        {item.name}
      </button>
    );
  }

  return (
    <div style={{ position: "relative" }} onMouseEnter={show} onMouseLeave={hide}>
      <button style={navLinkStyle}>
        {item.name}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={13} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute", top: "calc(100% + 10px)", left: 0,
              minWidth: 230,
              background: "rgba(26,23,20,0.96)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(245,158,11,0.15)",
              borderRadius: 16, padding: "0.5rem",
              boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,158,11,0.05)",
              zIndex: 200,
            }}
          >
            {/* Top accent line */}
            <div style={{
              height: 1, margin: "0 0.5rem 0.5rem",
              background: "linear-gradient(90deg, #F59E0B, transparent)",
              borderRadius: 1,
            }} />
            {item.subLinks.map((sub) => (
              <button
                key={sub.href}
                onClick={() => { onNavigate(sub.href); setOpen(false); }}
                style={{
                  width: "100%", textAlign: "left",
                  padding: "0.7rem 1rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.6)",
                  background: "transparent", border: "none",
                  borderRadius: 10, cursor: "pointer",
                  transition: "all 0.2s ease",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "#F59E0B";
                  e.currentTarget.style.background = "rgba(245,158,11,0.07)";
                  e.currentTarget.style.paddingLeft = "1.3rem";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.paddingLeft = "1rem";
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
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          width: "100%", padding: "1.1rem 0",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "transparent", border: "none",
          borderBottomWidth: 1, borderBottomStyle: "solid",
          borderBottomColor: "rgba(255,255,255,0.06)",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.85rem", letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: isOpen ? COLORS.gold : "rgba(255,255,255,0.75)",
          fontWeight: isOpen ? 700 : 500,
          cursor: "pointer", transition: "color 0.2s",
        }}
      >
        <span>{item.name}</span>
        {item.subLinks && (
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={16} color={isOpen ? COLORS.gold : "rgba(255,255,255,0.3)"} />
          </motion.div>
        )}
      </button>

      <AnimatePresence>
        {isOpen && item.subLinks && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{
              overflow: "hidden",
              background: "rgba(245,158,11,0.04)",
              borderRadius: 12, marginBottom: 4,
              borderLeft: "2px solid rgba(245,158,11,0.2)",
            }}
          >
            {item.subLinks.map((sub) => (
              <button
                key={sub.href}
                onClick={() => onNavigate(sub.href)}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "0.85rem 1.2rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.5)",
                  background: "transparent", border: "none",
                  cursor: "pointer", transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = COLORS.gold)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
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
  const [isOpen, setIsOpen]           = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled]       = useState(false);

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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        .hidden-sm { display: block; }
        @media (max-width: 480px) { .hidden-sm { display: none !important; } }
      `}</style>

      {/* Announcement Bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: 34, display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1100,
        background: "linear-gradient(135deg, #D97706, #EA580C)",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.62rem", fontWeight: 700,
        letterSpacing: "0.25em", textTransform: "uppercase",
        color: "#fff",
        gap: "0.5rem",
        boxShadow: "0 2px 20px rgba(234,88,12,0.4)",
      }}>
        <Heart size={11} fill="white" color="white" />
        Empowering Women &amp; Girls Across Nigeria
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -(NAVBAR_HEIGHT + 34) }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed", left: 0, right: 0,
          top: 34, height: NAVBAR_HEIGHT,
          zIndex: 1000,
          transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
          background: scrolled
            ? "rgba(22,19,16,0.92)"
            : "rgba(26,23,20,0.6)",
          backdropFilter: "blur(24px)",
          borderBottom: scrolled
            ? "1px solid rgba(245,158,11,0.12)"
            : "1px solid rgba(255,255,255,0.04)",
          boxShadow: scrolled
            ? "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)"
            : "none",
        }}
      >
        <div style={{
          maxWidth: 1440, margin: "0 auto",
          padding: "0 5%", height: "100%",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <ResponsiveLogo onClick={() => handleNavigate("hero")} />

          {/* Desktop Navigation */}
          <div style={{ display: "none" }} className="desktop-nav">
            {MENU_ITEMS.map((item) => (
              <DesktopDropdown key={item.name} item={item} onNavigate={handleNavigate} />
            ))}
          </div>

          {/* Inline desktop nav (CSS trick for lg) */}
          <style>{`
            @media (min-width: 1024px) {
              .desktop-nav { display: flex !important; align-items: center; gap: 0.25rem; }
              .mobile-toggle { display: none !important; }
            }
          `}</style>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Desktop CTA */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNavigate("donation")}
              className="desktop-nav"
              style={{
                display: "none",
                alignItems: "center", gap: "0.5rem",
                padding: "0.65rem 1.6rem",
                background: "linear-gradient(135deg, #F59E0B, #EA580C)",
                color: "#fff", border: "none", borderRadius: 100,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                cursor: "pointer",
                boxShadow: "0 6px 25px rgba(245,158,11,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              <Heart size={13} fill="white" color="white" />
              Donate Now
            </motion.button>

            {/* Separator (desktop) */}
            <div className="desktop-nav" style={{ display: "none", width: 1, height: 22, background: "rgba(255,255,255,0.08)", margin: "0 0.5rem" }} />

            {/* Mobile toggle */}
            <button
              className="mobile-toggle"
              onClick={() => setIsOpen(!isOpen)}
              style={{
                padding: "0.55rem",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(245,158,11,0.2)",
                borderRadius: 10,
                color: "#fff", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(245,158,11,0.5)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(245,158,11,0.2)")}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            style={{
              position: "fixed", inset: 0,
              zIndex: 1200,
              background: "#1a1714",
              display: "flex", flexDirection: "column",
              padding: "0 1.5rem 2rem",
            }}
          >
            {/* Mobile header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              paddingTop: 34 + NAVBAR_HEIGHT + 16, paddingBottom: "1.5rem",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
              <ResponsiveLogo onClick={() => handleNavigate("hero")} />
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 10, padding: "0.5rem",
                  color: "rgba(255,255,255,0.6)", cursor: "pointer",
                  display: "flex",
                }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Nav items */}
            <div style={{ flex: 1, overflowY: "auto", paddingTop: "1.5rem" }}>
              <p style={{
                fontSize: "0.55rem", fontWeight: 700,
                letterSpacing: "0.3em", textTransform: "uppercase",
                color: "#F59E0B", marginBottom: "1rem",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                Main Menu
              </p>
              {MENU_ITEMS.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
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

            {/* Mobile CTA */}
            <div style={{ paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <button
                onClick={() => handleNavigate("donation")}
                style={{
                  width: "100%", padding: "1.1rem",
                  background: "linear-gradient(135deg, #F59E0B, #EA580C)",
                  color: "#fff", border: "none", borderRadius: 16,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700, fontSize: "0.9rem",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.7rem",
                  boxShadow: "0 12px 40px rgba(245,158,11,0.35)",
                }}
              >
                <Heart size={18} fill="white" color="white" />
                Support Our Mission
              </button>
              <p style={{
                textAlign: "center", marginTop: "1.2rem",
                fontSize: "0.55rem", letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
                fontFamily: "'DM Sans', sans-serif",
              }}>
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