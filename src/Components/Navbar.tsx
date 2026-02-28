import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ChevronDown, Heart, Phone, Mail, Globe } from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface SubLink  { name: string; href: string; }
interface MenuItem { name: string; href?: string; subLinks?: SubLink[]; }

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const C = {
  gold:      "#F59E0B",
  orange:    "#EA580C",
  bg:        "#1a1714",
  bgCard:    "#1e1b17",
  border:    "rgba(245,158,11,0.13)",
  borderHov: "rgba(245,158,11,0.38)",
  text:      "#ffffff",
  textMuted: "rgba(255,255,255,0.48)",
  textFaint: "rgba(255,255,255,0.22)",
  gradient:  "linear-gradient(135deg,#F59E0B,#EA580C)",
} as const;

const NAV_H_DEFAULT  = 78;
const NAV_H_COMPACT  = 52;
const ANNOUNCE_H     = 34;

export const NAVBAR_HEIGHT = NAV_H_DEFAULT + ANNOUNCE_H;

const MENU_ITEMS: MenuItem[] = [
  { name: "Home", href: "hero" },
  {
    name: "About",
    subLinks: [
      { name: "Why Our Work Matters", href: "whyitmatters"     },
      { name: "Our Story",            href: "ourstory"         },
      { name: "Our Mission",          href: "missionstatement" },
      { name: "Our Vision",           href: "visionstatement"  },
      { name: "Meet the Team",        href: "meettheteam"      },
    ],
  },
  {
    name: "Programs",
    subLinks: [
      { name: "Our Programs", href: "ourprograms" },
      { name: "Field Events",  href: "events"      },
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

const ALL_IDS = [
  "hero","whyitmatters","ourstory","missionstatement","visionstatement",
  "meettheteam","ourprograms","events","volunteer","donation","testimonials","contact",
];
const SECTION_NAV: Record<string,string> = {
  hero:"Home", whyitmatters:"About", ourstory:"About", missionstatement:"About",
  visionstatement:"About", meettheteam:"About", ourprograms:"Programs",
  events:"Programs", volunteer:"Get Involved", donation:"Get Involved",
  testimonials:"Testimonials", contact:"Contact",
};

// ─── SCROLL PROGRESS ─────────────────────────────────────────────────────────
const ProgressThread: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  return (
    <motion.div style={{
      position:"absolute", bottom:0, left:0, right:0, height:1.5,
      background: C.gradient, transformOrigin:"0%", scaleX,
      boxShadow:"0 0 10px rgba(245,158,11,0.55)",
    }} />
  );
};

// ─── LOGO ─────────────────────────────────────────────────────────────────────
const Logo: React.FC<{ onClick: () => void; compact: boolean }> = ({ onClick, compact }) => (
  <button onClick={onClick} aria-label="Go to home" style={{
    display:"flex", alignItems:"center",
    gap: compact ? "0.55rem" : "0.8rem",
    background:"transparent", border:"none",
    cursor:"pointer", padding:0, flexShrink:0,
    transition:"gap 0.4s ease",
  }}>
    <div style={{
      position:"relative", flexShrink:0,
      width: compact ? 34 : 42, height: compact ? 34 : 42,
      borderRadius: compact ? 9 : 12, overflow:"hidden",
      transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)",
      boxShadow:"0 0 0 1px rgba(245,158,11,0.25), 0 4px 18px rgba(245,158,11,0.22)",
    }}>
      <img src="/logo_light.jpg" alt="GHHF" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
      <div style={{
        position:"absolute", inset:0,
        background:"linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%)",
        pointerEvents:"none",
      }} />
    </div>
    <div style={{ overflow:"hidden" }} className="logo-wordmark">
      <div style={{
        fontFamily:"'Cormorant Garamond', serif",
        fontWeight:700, lineHeight:1, letterSpacing:"-0.01em",
        color: C.text,
        fontSize: compact ? "1.05rem" : "1.2rem",
        transition:"font-size 0.4s ease",
      }}>GHHF</div>
      <div style={{
        fontFamily:"'DM Sans', sans-serif",
        fontSize:"0.5rem", fontWeight:700,
        textTransform:"uppercase", letterSpacing:"0.35em",
        color:"rgba(245,158,11,0.65)", marginTop:3,
        maxHeight: compact ? 0 : 16, opacity: compact ? 0 : 1,
        overflow:"hidden",
        transition:"all 0.35s ease",
      }}>Helping Hands</div>
    </div>
  </button>
);

// ─── ACTIVE DOT ───────────────────────────────────────────────────────────────
const Dot: React.FC = () => (
  <span style={{
    position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)",
    width:3.5, height:3.5, borderRadius:"50%",
    background: C.gold, boxShadow:`0 0 7px ${C.gold}`,
    pointerEvents:"none",
  }} />
);

// ─── DESKTOP DROPDOWN ─────────────────────────────────────────────────────────
const DesktopDropdown: React.FC<{
  item: MenuItem; onNavigate: (id:string) => void; active: boolean;
}> = ({ item, onNavigate, active }) => {
  const [open, setOpen] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout>|null>(null);
  const show = () => { t.current && clearTimeout(t.current); setOpen(true); };
  const hide = () => { t.current = setTimeout(() => setOpen(false), 160); };

  const linkBtn: React.CSSProperties = {
    position:"relative",
    padding:"0.45rem 0.8rem",
    fontFamily:"'DM Sans', sans-serif",
    fontSize:"0.68rem", letterSpacing:"0.1em", textTransform:"uppercase",
    fontWeight:700,
    color: active ? C.gold : open ? C.text : C.textMuted,
    background:"transparent", border:"none", cursor:"pointer",
    display:"flex", alignItems:"center", gap:"0.25rem",
    whiteSpace:"nowrap", borderRadius:8,
    transition:"color 0.22s ease",
  };

  if (!item.subLinks) return (
    <button
      style={linkBtn}
      onClick={() => onNavigate(item.href || "hero")}
      onMouseEnter={e => e.currentTarget.style.color = C.text}
      onMouseLeave={e => e.currentTarget.style.color = active ? C.gold : C.textMuted}
    >
      {item.name}
      {active && <Dot />}
    </button>
  );

  return (
    <div style={{ position:"relative" }} onMouseEnter={show} onMouseLeave={hide}>
      <button style={linkBtn}>
        {item.name}
        {active && <Dot />}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration:0.22 }}>
          <ChevronDown size={11} strokeWidth={2.5} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, y:8, scale:0.96 }}
            animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y:5, scale:0.96 }}
            transition={{ duration:0.17, ease:[0.16,1,0.3,1] }}
            style={{
              position:"absolute", top:"calc(100% + 10px)", left:"50%",
              transform:"translateX(-50%)",
              minWidth:218,
              background:"rgba(18,15,12,0.97)",
              backdropFilter:"blur(32px)",
              border:`1px solid ${C.border}`,
              borderRadius:18, padding:"0.55rem 0.45rem",
              boxShadow:"0 28px 65px rgba(0,0,0,0.75), 0 0 0 1px rgba(245,158,11,0.04)",
              zIndex:300,
            }}
          >
            <div style={{
              height:1, margin:"0 0.6rem 0.5rem",
              background:`linear-gradient(90deg,${C.gold},transparent)`,
            }} />
            {item.subLinks.map(sub => (
              <button
                key={sub.href}
                onClick={() => { onNavigate(sub.href); setOpen(false); }}
                style={{
                  width:"100%", textAlign:"left",
                  padding:"0.65rem 1rem",
                  fontFamily:"'DM Sans', sans-serif", fontSize:"0.78rem",
                  color: C.textMuted,
                  background:"transparent", border:"none",
                  borderRadius:11, cursor:"pointer",
                  transition:"all 0.18s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = C.gold;
                  e.currentTarget.style.background = "rgba(245,158,11,0.07)";
                  e.currentTarget.style.paddingLeft = "1.25rem";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = C.textMuted;
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.paddingLeft = "1rem";
                }}
              >{sub.name}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── MOBILE ITEM ──────────────────────────────────────────────────────────────
const MobileItem: React.FC<{
  item: MenuItem;
  openDropdown: string | null;
  onToggle: (n:string) => void;
  onNavigate: (id:string) => void;
  active: boolean;
}> = ({ item, openDropdown, onToggle, onNavigate, active }) => {
  const isOpen = openDropdown === item.name;
  return (
    <div>
      <button
        onClick={() => item.subLinks ? onToggle(item.name) : onNavigate(item.href||"hero")}
        style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          width:"100%", padding:"0.95rem 0",
          background:"transparent", border:"none",
          borderBottom:"1px solid rgba(255,255,255,0.05)",
          fontFamily:"'DM Sans', sans-serif",
          fontSize:"0.83rem", letterSpacing:"0.14em", textTransform:"uppercase",
          color: active ? C.gold : isOpen ? C.gold : "rgba(255,255,255,0.72)",
          fontWeight: active || isOpen ? 700 : 500,
          cursor:"pointer", transition:"color 0.2s",
        }}
      >
        <span style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
          {active && (
            <span style={{
              width:5, height:5, borderRadius:"50%",
              background: C.gold, boxShadow:`0 0 8px ${C.gold}`,
              flexShrink:0, display:"inline-block",
            }} />
          )}
          {item.name}
        </span>
        {item.subLinks && (
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration:0.2 }}>
            <ChevronDown size={15} color={isOpen ? C.gold : "rgba(255,255,255,0.28)"} />
          </motion.div>
        )}
      </button>

      <AnimatePresence>
        {isOpen && item.subLinks && (
          <motion.div
            initial={{ height:0, opacity:0 }}
            animate={{ height:"auto", opacity:1 }}
            exit={{ height:0, opacity:0 }}
            transition={{ duration:0.24, ease:"easeInOut" }}
            style={{
              overflow:"hidden",
              borderLeft:"2px solid rgba(245,158,11,0.2)",
              marginLeft:"0.3rem",
            }}
          >
            {item.subLinks.map(sub => (
              <button key={sub.href} onClick={() => onNavigate(sub.href)}
                style={{
                  display:"block", width:"100%", textAlign:"left",
                  padding:"0.75rem 1.1rem",
                  fontFamily:"'DM Sans', sans-serif", fontSize:"0.81rem",
                  color: C.textMuted,
                  background:"transparent", border:"none",
                  cursor:"pointer", transition:"color 0.18s, padding-left 0.18s",
                }}
                onMouseEnter={e => { e.currentTarget.style.color=C.gold; e.currentTarget.style.paddingLeft="1.5rem"; }}
                onMouseLeave={e => { e.currentTarget.style.color=C.textMuted; e.currentTarget.style.paddingLeft="1.1rem"; }}
              >{sub.name}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── MAIN NAVBAR ─────────────────────────────────────────────────────────────
const Navbar: React.FC = () => {
  const [isOpen,        setIsOpen]        = useState(false);
  const [openDropdown,  setOpenDropdown]  = useState<string|null>(null);
  const [scrolled,      setScrolled]      = useState(false);
  const [compact,       setCompact]       = useState(false);
  const [showAnnounce,  setShowAnnounce]  = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [donorCount,    setDonorCount]    = useState(247);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setCompact(y > 90);
      setShowAnnounce(y < 40 || y < lastY.current);
      lastY.current = y;
      let cur = "hero";
      for (const id of ALL_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 110) cur = id;
      }
      setActiveSection(cur);
    };
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (Math.random() < 0.3) setDonorCount(n => n + Math.floor(Math.random() * 2));
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const handleNavigate = useCallback((id: string) => {
    setIsOpen(false);
    setOpenDropdown(null);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const navH = compact ? NAV_H_COMPACT : NAV_H_DEFAULT;
      const annH = showAnnounce ? ANNOUNCE_H : 0;
      const top  = el.getBoundingClientRect().top + window.pageYOffset - navH - annH - 6;
      window.scrollTo({ top, behavior:"smooth" });
    }, 120);
  }, [compact, showAnnounce]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navH = compact ? NAV_H_COMPACT : NAV_H_DEFAULT;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600;700&display=swap');

        /* hide wordmark on mobile — image logo only */
        @media (max-width: 1023px) { .logo-wordmark { display: none !important; } }

        /* desktop nav unlocks at 1024px */
        @media (min-width: 1024px) {
          .dsk-links  { display: flex !important; }
          .dsk-right  { display: flex !important; }
          .mob-toggle { display: none  !important; }
        }

        /* hide announcement contacts on narrow mobile */
        @media (max-width: 640px) { .ann-contact { display: none !important; } }

        .nav-shell {
          transition:
            height       0.42s cubic-bezier(0.16,1,0.3,1),
            top          0.38s cubic-bezier(0.16,1,0.3,1),
            background   0.38s ease,
            border-color 0.38s ease,
            box-shadow   0.38s ease;
        }
      `}</style>

      {/* ── ANNOUNCEMENT BAR ── */}
      <motion.div
        animate={{ y: showAnnounce ? 0 : -ANNOUNCE_H, opacity: showAnnounce ? 1 : 0 }}
        transition={{ duration:0.36, ease:[0.16,1,0.3,1] }}
        style={{
          position:"fixed", top:0, left:0, right:0,
          height: ANNOUNCE_H, zIndex:1100,
          background:"linear-gradient(135deg,#C05621,#D97706 50%,#EA580C)",
          display:"flex", alignItems:"center", justifyContent:"center",
          gap:"2rem", overflow:"hidden",
          boxShadow:"0 2px 24px rgba(234,88,12,0.4)",
        }}
      >
        <a href="tel:+2349036854354" className="ann-contact" style={{
          display:"flex", alignItems:"center", gap:"0.4rem",
          color:"rgba(255,255,255,0.72)", textDecoration:"none",
          fontFamily:"'DM Sans', sans-serif",
          fontSize:"0.54rem", fontWeight:600, letterSpacing:"0.12em",
          transition:"color 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.color="#fff"}
          onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,0.72)"}
        >
          <Phone size={10}/> +234 903 685 4354
        </a>

        <div style={{ display:"flex", alignItems:"center", gap:"0.55rem" }}>
          <Heart size={10} fill="white" color="white"/>
          <span style={{
            fontFamily:"'DM Sans', sans-serif",
            fontSize:"0.58rem", fontWeight:700,
            letterSpacing:"0.28em", textTransform:"uppercase", color:"#fff",
            whiteSpace:"nowrap",
          }}>
            Empowering Women &amp; Girls Across Nigeria
          </span>
          <Heart size={10} fill="white" color="white"/>
        </div>

        <a href="mailto:Giversgenerous@gmail.com" className="ann-contact" style={{
          display:"flex", alignItems:"center", gap:"0.4rem",
          color:"rgba(255,255,255,0.72)", textDecoration:"none",
          fontFamily:"'DM Sans', sans-serif",
          fontSize:"0.54rem", fontWeight:600, letterSpacing:"0.12em",
          transition:"color 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.color="#fff"}
          onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,0.72)"}
        >
          <Mail size={10}/> Giversgenerous@gmail.com
        </a>
      </motion.div>

      {/* ── MAIN NAV SHELL ── */}
      <nav className="nav-shell" style={{
        position:"fixed", left:0, right:0,
        top: showAnnounce ? ANNOUNCE_H : 0,
        height: navH, zIndex:1000,
        background: scrolled
          ? "rgba(14,11,8,0.97)"
          : compact
            ? "rgba(24,21,17,0.88)"
            : "rgba(26,23,20,0.52)",
        backdropFilter:"blur(28px)",
        WebkitBackdropFilter:"blur(28px)",
        borderBottom: scrolled
          ? `1px solid ${C.border}`
          : "1px solid rgba(255,255,255,0.04)",
        boxShadow: scrolled
          ? "0 8px 50px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.03)"
          : "none",
      }}>
        <div style={{
          maxWidth:1440, margin:"0 auto",
          padding:"0 4%",
          height:"100%",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          gap:"0.75rem",
        }}>
          <Logo onClick={() => handleNavigate("hero")} compact={compact} />

          {/* ── DESKTOP NAV LINKS ── */}
          <div className="dsk-links" style={{
            display:"none", alignItems:"center",
            gap:"0.05rem", flex:1, justifyContent:"center",
          }}>
            {MENU_ITEMS.map(item => (
              <DesktopDropdown
                key={item.name} item={item}
                onNavigate={handleNavigate}
                active={SECTION_NAV[activeSection] === item.name}
              />
            ))}
          </div>

          {/* ── DESKTOP RIGHT — donor counter + Donate only (no Volunteer, it's in Get Involved) ── */}
          <div className="dsk-right" style={{
            display:"none", alignItems:"center", gap:"0.6rem", flexShrink:0,
          }}>
            {/* Live donor counter */}
            <div style={{
              display:"flex", alignItems:"center", gap:"0.45rem",
              padding:"0.38rem 0.85rem", borderRadius:100,
              border:`1px solid ${C.border}`,
              background:"rgba(245,158,11,0.05)",
            }}>
              <span style={{
                width:6, height:6, borderRadius:"50%",
                background:"#22c55e",
                boxShadow:"0 0 8px rgba(34,197,94,0.8)",
                display:"inline-block", flexShrink:0,
              }}/>
              <span style={{
                fontFamily:"'DM Sans', sans-serif",
                fontSize:"0.56rem", fontWeight:700,
                letterSpacing:"0.08em", textTransform:"uppercase",
                color:"rgba(255,255,255,0.52)", whiteSpace:"nowrap",
              }}>
                <motion.span
                  key={donorCount}
                  initial={{ y:-8, opacity:0 }}
                  animate={{ y:0, opacity:1 }}
                  transition={{ duration:0.3 }}
                  style={{ display:"inline-block" }}
                >
                  {donorCount}
                </motion.span>
                {" "}supporters
              </span>
            </div>

            {/* Donate CTA only */}
            <motion.button
              whileHover={{ scale:1.05, boxShadow:"0 14px 34px rgba(245,158,11,0.48)" }}
              whileTap={{ scale:0.97 }}
              onClick={() => handleNavigate("donation")}
              style={{
                display:"flex", alignItems:"center", gap:"0.45rem",
                padding: compact ? "0.48rem 1.15rem" : "0.6rem 1.4rem",
                background: C.gradient,
                border:"none", borderRadius:100, cursor:"pointer",
                fontFamily:"'DM Sans', sans-serif",
                fontSize:"0.68rem", fontWeight:700,
                letterSpacing:"0.12em", textTransform:"uppercase",
                color:"#fff", whiteSpace:"nowrap",
                boxShadow:"0 6px 22px rgba(245,158,11,0.32), inset 0 1px 0 rgba(255,255,255,0.16)",
                transition:"padding 0.4s ease, box-shadow 0.3s ease",
              }}
            >
              <Heart size={12} fill="white" color="white"/>
              {compact ? "Donate" : "Donate Now"}
            </motion.button>
          </div>

          {/* ── HAMBURGER ── */}
          <button
            className="mob-toggle"
            onClick={() => setIsOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              padding:"0.5rem",
              background: isOpen ? "rgba(245,158,11,0.1)" : "rgba(255,255,255,0.05)",
              border:`1px solid ${isOpen ? C.border : "rgba(245,158,11,0.18)"}`,
              borderRadius:10, color:"#fff", cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center",
              transition:"all 0.2s ease", flexShrink:0,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? "x" : "m"}
                initial={{ rotate:-90, opacity:0 }}
                animate={{ rotate:0, opacity:1 }}
                exit={{ rotate:90, opacity:0 }}
                transition={{ duration:0.17 }}
              >
                {isOpen ? <X size={20}/> : <Menu size={20}/>}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>

        <ProgressThread />
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity:0, x:"100%" }}
            animate={{ opacity:1, x:0 }}
            exit={{ opacity:0, x:"100%" }}
            transition={{ type:"spring", damping:28, stiffness:220 }}
            style={{
              position:"fixed", inset:0, zIndex:1200,
              background: C.bg,
              display:"flex", flexDirection:"column",
              overflowY:"auto",
              /* account for announce bar + nav bar */
              paddingTop: (showAnnounce ? ANNOUNCE_H : 0) + navH,
            }}
          >
            {/* inner scroll area */}
            <div style={{
              flex:1,
              display:"flex", flexDirection:"column",
              padding:"0 1.25rem",
              /* safe area for notched phones */
              paddingBottom:"max(1.5rem, env(safe-area-inset-bottom))",
            }}>

              {/* logo + close */}
              <div style={{
                display:"flex", alignItems:"center", justifyContent:"space-between",
                paddingTop:"1rem", paddingBottom:"1.2rem",
                borderBottom:"1px solid rgba(255,255,255,0.06)",
              }}>
                <Logo onClick={() => handleNavigate("hero")} compact={false} />
                <button onClick={() => setIsOpen(false)} style={{
                  background:"rgba(255,255,255,0.05)",
                  border:"1px solid rgba(255,255,255,0.1)",
                  borderRadius:10, padding:"0.45rem",
                  color: C.textMuted, cursor:"pointer", display:"flex",
                }}>
                  <X size={20}/>
                </button>
              </div>

              {/* label */}
              <p style={{
                fontFamily:"'DM Sans', sans-serif",
                fontSize:"0.52rem", fontWeight:700,
                letterSpacing:"0.35em", textTransform:"uppercase",
                color: C.gold, marginTop:"1.2rem", marginBottom:"0.4rem",
              }}>Main Menu</p>

              {/* nav items */}
              <div style={{ flex:1 }}>
                {MENU_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity:0, x:20 }}
                    animate={{ opacity:1, x:0 }}
                    transition={{ delay: i*0.055, ease:[0.16,1,0.3,1] }}
                  >
                    <MobileItem
                      item={item}
                      openDropdown={openDropdown}
                      onToggle={n => setOpenDropdown(openDropdown===n ? null : n)}
                      onNavigate={handleNavigate}
                      active={SECTION_NAV[activeSection] === item.name}
                    />
                  </motion.div>
                ))}

                {/* quick-contact card */}
                <motion.div
                  initial={{ opacity:0, y:14 }}
                  animate={{ opacity:1, y:0 }}
                  transition={{ delay:0.42, ease:[0.16,1,0.3,1] }}
                  style={{
                    marginTop:"1.75rem", padding:"1.2rem 1.25rem",
                    background: C.bgCard, border:`1px solid ${C.border}`,
                    borderRadius:16, display:"flex", flexDirection:"column", gap:"0.75rem",
                    position:"relative", overflow:"hidden",
                  }}
                >
                  <div style={{
                    position:"absolute", top:0, left:0, right:0, height:1.5,
                    background:`linear-gradient(90deg,${C.gold},transparent)`,
                  }} />
                  <p style={{
                    fontFamily:"'DM Sans', sans-serif", fontSize:"0.52rem",
                    fontWeight:700, letterSpacing:"0.3em", textTransform:"uppercase",
                    color: C.gold,
                  }}>Quick Contact</p>

                  {([
                    { icon:Phone, label:"+234 903 685 4354",        href:"tel:+2349036854354"               },
                    { icon:Mail,  label:"Giversgenerous@gmail.com",  href:"mailto:Giversgenerous@gmail.com" },
                    { icon:Globe, label:"Lagos, Nigeria",            href: undefined                        },
                  ] as { icon: React.ElementType; label: string; href?: string }[]).map(({ icon:Icon, label, href }, idx) => (
                    <div key={idx} style={{ display:"flex", alignItems:"center", gap:"0.65rem" }}>
                      <div style={{
                        width:28, height:28, borderRadius:8, flexShrink:0,
                        background:"rgba(245,158,11,0.08)", border:`1px solid ${C.border}`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                      }}>
                        <Icon size={12} color={C.gold}/>
                      </div>
                      {href ? (
                        <a href={href} style={{
                          fontFamily:"'DM Sans', sans-serif", fontSize:"0.78rem",
                          color: C.textMuted, textDecoration:"none", transition:"color 0.2s",
                        }}
                          onMouseEnter={e => e.currentTarget.style.color=C.gold}
                          onMouseLeave={e => e.currentTarget.style.color=C.textMuted}
                        >{label}</a>
                      ) : (
                        <span style={{ fontFamily:"'DM Sans', sans-serif", fontSize:"0.78rem", color: C.textMuted }}>
                          {label}
                        </span>
                      )}
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* mobile CTAs */}
              <div style={{
                paddingTop:"1.25rem",
                borderTop:"1px solid rgba(255,255,255,0.06)",
                display:"flex", flexDirection:"column", gap:"0.6rem",
                marginTop:"1.5rem",
              }}>
                <button onClick={() => handleNavigate("donation")} style={{
                  width:"100%", padding:"1rem",
                  background: C.gradient, color:"#fff", border:"none", borderRadius:14,
                  fontFamily:"'DM Sans', sans-serif",
                  fontWeight:700, fontSize:"0.82rem",
                  letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer",
                  display:"flex", alignItems:"center", justifyContent:"center", gap:"0.55rem",
                  boxShadow:"0 10px 34px rgba(245,158,11,0.35)",
                }}>
                  <Heart size={15} fill="white" color="white"/> Support Our Mission
                </button>

                <button onClick={() => handleNavigate("volunteer")} style={{
                  width:"100%", padding:"0.8rem",
                  background:"transparent", color: C.textMuted,
                  border:`1px solid ${C.border}`, borderRadius:14,
                  fontFamily:"'DM Sans', sans-serif",
                  fontWeight:600, fontSize:"0.76rem",
                  letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer",
                  transition:"border-color 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor=C.borderHov}
                  onMouseLeave={e => e.currentTarget.style.borderColor=C.border}
                >
                  Become a Volunteer
                </button>

                <div style={{
                  display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem",
                  paddingTop:"0.4rem",
                }}>
                  <span style={{
                    width:5, height:5, borderRadius:"50%",
                    background:"#22c55e", boxShadow:"0 0 8px rgba(34,197,94,0.8)",
                    display:"inline-block",
                  }}/>
                  <span style={{
                    fontFamily:"'DM Sans', sans-serif", fontSize:"0.52rem",
                    fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase",
                    color: C.textFaint,
                  }}>
                    {donorCount} supporters · Lagos, Nigeria
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;