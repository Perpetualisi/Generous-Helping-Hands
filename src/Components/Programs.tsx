import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  motion, AnimatePresence, useMotionValue, useSpring,
  useTransform, type Variants
} from "framer-motion";
import {
  Briefcase, BookOpen, HeartPulse, Star,
  Image as ImageIcon, Sparkles, ArrowUpRight, ArrowRight,
  X, ChevronLeft, ChevronRight, ZoomIn, Grid3x3,
  LayoutGrid, ArrowLeft, Home, Share2, Download,
  Maximize2, Filter, Search, SlidersHorizontal
} from "lucide-react";

// ─── THEME ────────────────────────────────────────────────────────────────────
const C = {
  bg:        "#1a1714",
  bgCard:    "#211e1a",
  bgDeep:    "#0e0c0a",
  gold:      "#F59E0B",
  orange:    "#EA580C",
  text:      "#ffffff",
  textMuted: "rgba(255,255,255,0.5)",
  textFaint: "rgba(255,255,255,0.22)",
  border:    "rgba(245,158,11,0.12)",
  borderHov: "rgba(245,158,11,0.38)",
  gradient:  "linear-gradient(135deg, #F59E0B, #EA580C)",
} as const;

// ─── ANIMATIONS ───────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};
const stagger: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.11 } },
};

// ─── SCROLL LOCK ──────────────────────────────────────────────────────────────
function useBodyScrollLock() {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
interface Program {
  icon: React.ElementType; title: string; description: string;
  detail: string; tag: string; stat: string; statLabel: string; color: string;
}
const PROGRAMS: Program[] = [
  { icon: Briefcase,  title: "Economic Empowerment", tag: "Independence",   stat: "200+", statLabel: "Businesses Launched", color: "#F59E0B", description: "Helping women gain financial independence through training, resources, and support to build sustainable livelihoods.", detail: "Our vocational training covers tailoring, catering, and digital skills. Since 2018, over 200 women have launched independent businesses with our seed grants and mentorship support." },
  { icon: BookOpen,   title: "Educational Initiatives", tag: "Future Leaders", stat: "150+", statLabel: "Scholarships Awarded", color: "#3B82F6", description: "Providing scholarships, mentorship, and workshops that unlock learning and open doors for women, girls, and young people.", detail: "Every scholarship covers tuition, books, and uniforms. We also run after-school STEM clubs in secondary schools to bridge the opportunity gap for girls in tech." },
  { icon: HeartPulse, title: "Health & Wellbeing",    tag: "Community Care",  stat: "1,200+", statLabel: "Mothers Served",    color: "#EC4899", description: "Ensuring access to vital sexual and reproductive health information and services so individuals can live healthy, confident lives.", detail: "Our mobile clinics offer free health checks. Last year, we trained 50 community health ambassadors to serve over 1,200 mothers across Lagos." },
  { icon: Star,       title: "Youth Empowerment",     tag: "Next Generation", stat: "500+",  statLabel: "Youth Trained",      color: "#10B981", description: "Equipping young people with leadership skills, life skills, and opportunities to realize their potential and become agents of change.", detail: "Our youth programmes run leadership academies, mentorship circles, and community action projects — giving young people the confidence to drive change." },
];

const PHOTO_CATEGORIES = ["All", "Community", "Training", "Youth", "Health", "Leadership"] as const;
type PhotoCategory = typeof PHOTO_CATEGORIES[number];

const EVENT_PHOTOS: { src: string; alt: string; label: string; category: PhotoCategory }[] = [
  { src: "/events/event1.jpeg",   alt: "Community Outreach",   label: "Building Together",    category: "Community"  },
  { src: "/events/event2.jpeg",   alt: "Skills Training",      label: "Hands-On Learning",    category: "Training"   },
  { src: "/events/events3.jpg",   alt: "Youth Mentorship",     label: "Guiding the Next Gen", category: "Youth"      },
  { src: "/events/events4.jpeg",  alt: "Medical Outreach",     label: "Care in Action",       category: "Health"     },
  { src: "/events/events5.jpg",   alt: "Empowerment Summit",   label: "Rising Together",      category: "Community"  },
  { src: "/events/events6.jpg",   alt: "Advocacy Walk",        label: "Voices for Change",    category: "Community"  },
  { src: "/events/events7.jpeg",  alt: "Field Operations",     label: "On the Ground",        category: "Community"  },
  { src: "/events/events8.jpeg",  alt: "Community Gathering",  label: "One Community",        category: "Community"  },
  { src: "/events/events9.jpeg",  alt: "Training Session",     label: "Skills for Life",      category: "Training"   },
  { src: "/events/events10.jpeg", alt: "Health Outreach",      label: "Healthy Futures",      category: "Health"     },
  { src: "/events/events11.jpeg", alt: "Leadership Workshop",  label: "Leaders Emerging",     category: "Leadership" },
  { src: "/events/events12.jpeg", alt: "Graduation Ceremony",  label: "Celebrating Success",  category: "Community"  },
  { src: "/events/events13.jpeg", alt: "Women Empowerment",    label: "Strength in Numbers",  category: "Community"  },
  { src: "/events/events14.jpeg", alt: "Youth Program",        label: "Youth in Motion",      category: "Youth"      },
  { src: "/events/events15.jpeg", alt: "Foundation Milestone", label: "A Decade of Impact",   category: "Leadership" },
  { src: "/events/events16.jpeg", alt: "Foundation Milestone", label: "A Decade of Impact",   category: "Leadership" },
  { src: "/events/events17.jpeg", alt: "Foundation Milestone", label: "A Decade of Impact",   category: "Training"   },
  { src: "/events/events18.jpeg", alt: "Foundation Milestone", label: "A Decade of Impact",   category: "Health"     },
  { src: "/events/events19.jpeg", alt: "Foundation Milestone", label: "A Decade of Impact",   category: "Youth"      },
];

// ─── EYEBROW ──────────────────────────────────────────────────────────────────
const Eyebrow: React.FC<{ icon: React.ElementType; children: React.ReactNode }> = ({ icon: Icon, children }) => (
  <motion.div variants={fadeUp} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", borderRadius: 100, border: `1px solid ${C.border}`, background: "rgba(245,158,11,0.06)", marginBottom: "1.5rem" }}>
    <Icon size={11} color={C.gold} />
    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: C.gold, whiteSpace: "nowrap" }}>{children}</span>
  </motion.div>
);

// ─── PROGRAM CARD ─────────────────────────────────────────────────────────────
const ProgramCard: React.FC<{ program: Program; isMobile: boolean }> = ({ program, isMobile }) => {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], ["8deg", "-8deg"]), { stiffness: 120, damping: 20 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], ["-8deg", "8deg"]), { stiffness: 120, damping: 20 });
  const move = (e: React.MouseEvent) => {
    if (isMobile) return;
    const r = cardRef.current?.getBoundingClientRect();
    if (r) { mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); }
  };
  return (
    <motion.div ref={cardRef} variants={fadeUp} onMouseMove={move} onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateX: isMobile ? 0 : rotX, rotateY: isMobile ? 0 : rotY, transformStyle: "preserve-3d", height: "100%" }}>
      <motion.div whileHover={{ borderColor: C.borderHov }} style={{ position: "relative", overflow: "hidden", padding: "clamp(1.25rem, 3vw, 2rem)", borderRadius: 24, height: "100%", display: "flex", flexDirection: "column", background: C.bgCard, border: `1px solid ${C.border}`, boxShadow: "0 20px 60px rgba(0,0,0,0.35)", transition: "border-color 0.3s ease" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: open ? C.gradient : "transparent", transition: "background 0.4s ease", borderRadius: "24px 24px 0 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <motion.div whileHover={{ background: C.gradient }} style={{ width: 46, height: 46, borderRadius: 13, background: "rgba(245,158,11,0.1)", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s ease", flexShrink: 0 }}>
            <program.icon size={18} color={C.gold} />
          </motion.div>
          <span style={{ fontSize: "0.52rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", padding: "0.35rem 0.85rem", borderRadius: 100, border: `1px solid ${C.border}`, background: "rgba(245,158,11,0.05)", color: C.gold, fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>{program.tag}</span>
        </div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.2rem, 2.5vw, 1.4rem)", fontWeight: 700, color: C.text, marginBottom: "0.9rem", lineHeight: 1.2 }}>{program.title}</h3>
        <p style={{ color: C.textMuted, fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.78rem, 1.5vw, 0.85rem)", lineHeight: 1.75, fontWeight: 300, marginBottom: "1.5rem", flex: 1 }}>{program.description}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", borderRadius: 12, background: "rgba(245,158,11,0.05)", border: `1px solid ${C.border}`, marginBottom: "1.25rem" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.3rem, 3vw, 1.6rem)", fontWeight: 700, lineHeight: 1, background: `linear-gradient(135deg, ${C.gold}, #fff 70%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{program.stat}</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: C.textFaint, lineHeight: 1.4 }}>{program.statLabel}</div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} style={{ overflow: "hidden" }}>
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "1.25rem", marginBottom: "1.25rem" }}>
                <div style={{ width: 24, height: 2, background: C.gradient, borderRadius: 2, marginBottom: "0.85rem" }} />
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontStyle: "italic", color: C.gold, lineHeight: 1.7 }}>{program.detail}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "none", border: "none", cursor: "pointer", padding: 0, color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.25em", textTransform: "uppercase", transition: "color 0.2s ease", marginTop: "auto" }}
          onMouseEnter={e => (e.currentTarget.style.color = C.gold)} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}>
          <span>{open ? "Show Less" : "Discover Impact"}</span>
          <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}><ArrowUpRight size={14} color={C.gold} /></motion.div>
        </button>
      </motion.div>
    </motion.div>
  );
};

// ─── 3D PHOTO CARD ────────────────────────────────────────────────────────────
const Photo3D: React.FC<{ photo: typeof EVENT_PHOTOS[0]; index: number; total: number; onClick: () => void; height?: string; isMobile?: boolean }> =
  ({ photo, index, total, onClick, height = "280px", isMobile = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], ["14deg", "-14deg"]), { stiffness: 90, damping: 16 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], ["-14deg", "14deg"]), { stiffness: 90, damping: 16 });
  const [hov, setHov] = useState(false);
  const move = (e: React.MouseEvent) => {
    if (isMobile) return;
    const r = ref.current?.getBoundingClientRect();
    if (r) { mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); }
  };
  return (
    <motion.div ref={ref} onClick={onClick} onMouseMove={move}
      onMouseEnter={() => !isMobile && setHov(true)}
      onMouseLeave={() => { mx.set(0); my.set(0); setHov(false); }}
      initial={{ opacity: 0, y: 50, scale: 0.88 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.06, 0.5), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX: isMobile ? 0 : rotX, rotateY: isMobile ? 0 : rotY, transformStyle: "preserve-3d", height, cursor: "pointer", perspective: "1000px" }}
      whileHover={isMobile ? { scale: 1.02 } : { scale: 1.05, zIndex: 5 }}>
      <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", borderRadius: 20, border: `1px solid ${hov ? C.borderHov : C.border}`, boxShadow: hov ? `0 50px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(245,158,11,0.3)` : "0 24px 55px rgba(0,0,0,0.55)", transition: "box-shadow 0.45s ease, border-color 0.3s ease" }}>
        <img src={photo.src} alt={photo.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: hov ? "saturate(1.3) contrast(1.1) brightness(1.2)" : "saturate(1.0) contrast(1.05) brightness(1.05)", transform: hov ? "scale(1.1)" : "scale(1)", transition: "filter 0.55s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(160deg, rgba(245,158,11,0.05) 0%, transparent 45%, rgba(0,0,0,0.4) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to top, rgba(8,6,4,0.92) 0%, rgba(8,6,4,0.25) 50%, transparent 100%)", opacity: hov ? 1 : 0, transition: "opacity 0.35s ease" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: hov ? C.gradient : "transparent", transition: "background 0.4s ease" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem 1.25rem 1.25rem", transform: hov ? "translateY(0)" : "translateY(10px)", opacity: hov ? 1 : 0, transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)", pointerEvents: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", marginBottom: "0.3rem" }}>
            <div style={{ width: 18, height: 2, background: C.gradient, borderRadius: 2, flexShrink: 0 }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)" }}>{photo.alt}</span>
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontStyle: "italic", color: C.gold, lineHeight: 1.3 }}>{photo.label}</p>
        </div>
        <div style={{ position: "absolute", top: "0.7rem", right: "0.7rem", background: "rgba(14,11,8,0.72)", backdropFilter: "blur(16px)", border: `1px solid ${C.border}`, borderRadius: 100, padding: "0.2rem 0.65rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.48rem", fontWeight: 700, letterSpacing: "0.1em", color: C.gold }}>{index + 1}/{total}</div>
        <div style={{ position: "absolute", top: "0.7rem", left: "0.7rem", width: 30, height: 30, borderRadius: "50%", background: "rgba(245,158,11,0.15)", backdropFilter: "blur(12px)", border: "1px solid rgba(245,158,11,0.3)", display: "flex", alignItems: "center", justifyContent: "center", opacity: hov ? 1 : 0, transition: "opacity 0.25s ease" }}>
          <ZoomIn size={13} color={C.gold} />
        </div>
        {/* Mobile tap hint */}
        {isMobile && (
          <div style={{ position: "absolute", bottom: "0.6rem", right: "0.6rem", background: "rgba(14,11,8,0.72)", backdropFilter: "blur(12px)", border: `1px solid ${C.border}`, borderRadius: 100, padding: "0.25rem 0.6rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <ZoomIn size={10} color={C.gold} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.44rem", fontWeight: 700, color: C.textMuted }}>Tap</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ─── SHARE HELPER ─────────────────────────────────────────────────────────────
const sharePhoto = async (photo: typeof EVENT_PHOTOS[0]) => {
  if (navigator.share) {
    try {
      await navigator.share({ title: photo.label, text: photo.alt, url: window.location.href });
    } catch { /* user cancelled */ }
  } else {
    await navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  }
};

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────
const Lightbox: React.FC<{
  photos: typeof EVENT_PHOTOS;
  index: number;
  onClose: () => void;
  onExitAll: () => void;
  onPrev: () => void;
  onNext: () => void;
  fromGallery: boolean;
  onBackToGallery: () => void;
}> = ({ photos, index, onClose, onExitAll, onPrev, onNext, fromGallery, onBackToGallery }) => {
  const photo = photos[index];
  const stripRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")     { zoomed ? setZoomed(false) : onClose(); }
      if (e.key === "ArrowLeft"  && !zoomed) onPrev();
      if (e.key === "ArrowRight" && !zoomed) onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext, zoomed]);

  useBodyScrollLock();

  useEffect(() => { setZoomed(false); }, [index]);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const el = strip.children[index] as HTMLElement;
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (!zoomed) dx > 0 ? onNext() : onPrev();
    } else if (dy < -80 && !zoomed) {
      onClose(); // swipe down to close
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
      style={{ position: "fixed", inset: 0, zIndex: 9500, background: "rgba(7,5,3,0.97)", backdropFilter: "blur(30px)", display: "flex", flexDirection: "column" }}
    >
      {/* ── TOP BAR ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.65rem 0.85rem", flexShrink: 0, borderBottom: "1px solid rgba(255,255,255,0.06)", gap: "0.5rem", flexWrap: "nowrap" }}>

        {/* LEFT: back */}
        <button onClick={fromGallery ? onBackToGallery : onClose}
          style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.06)", border: `1px solid ${C.border}`, borderRadius: 100, padding: "0.45rem 0.85rem", color: C.textMuted, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.2s", whiteSpace: "nowrap", flexShrink: 0 }}
          onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = C.borderHov; }}
          onMouseLeave={e => { e.currentTarget.style.color = C.textMuted; e.currentTarget.style.borderColor = C.border; }}>
          <ArrowLeft size={12} />
          <span className="lb-back-label">{fromGallery ? "Gallery" : "Back"}</span>
        </button>

        {/* CENTER: caption */}
        <div style={{ textAlign: "center", flex: 1, minWidth: 0, overflow: "hidden" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", fontStyle: "italic", color: C.gold, lineHeight: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{photo.label}</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.46rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: C.textFaint, marginTop: 2 }}>{index + 1} / {photos.length}</p>
        </div>

        {/* RIGHT: actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexShrink: 0 }}>
          {/* Share */}
          <button onClick={() => sharePhoto(photo)} title="Share"
            style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: `1px solid ${C.border}`, color: C.textMuted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(245,158,11,0.15)"; e.currentTarget.style.color = C.gold; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = C.textMuted; }}>
            <Share2 size={14} />
          </button>

          {/* Zoom toggle */}
          <button onClick={() => setZoomed(z => !z)} title="Zoom"
            style={{ width: 34, height: 34, borderRadius: "50%", background: zoomed ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.06)", border: `1px solid ${zoomed ? C.borderHov : C.border}`, color: zoomed ? C.gold : C.textMuted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
            <Maximize2 size={14} />
          </button>

          {/* Exit to page */}
          <button onClick={onExitAll}
            style={{ display: "flex", alignItems: "center", gap: "0.35rem", background: "rgba(245,158,11,0.08)", border: `1px solid ${C.borderHov}`, borderRadius: 100, padding: "0.45rem 0.8rem", color: C.gold, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.2s", whiteSpace: "nowrap" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(245,158,11,0.18)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(245,158,11,0.08)"}>
            <Home size={11} />
            <span className="lb-exit-label">Exit</span>
          </button>

          {/* X close */}
          <button onClick={onClose}
            style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.07)", border: `1px solid ${C.border}`, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", flexShrink: 0 }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(245,158,11,0.18)"; e.currentTarget.style.borderColor = C.borderHov; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = C.border; }}>
            <X size={15} />
          </button>
        </div>
      </div>

      {/* ── SWIPE HINT (mobile) ── */}
      <div style={{ textAlign: "center", padding: "0.35rem 1rem", background: "rgba(245,158,11,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)", flexShrink: 0 }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.42rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: C.textFaint }}>
          ← Swipe to navigate · Swipe down to close →
        </span>
      </div>

      {/* ── IMAGE AREA ── */}
      <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.75rem 3rem", minHeight: 0, overflow: "hidden" }}>

        {/* PREV */}
        <button onClick={onPrev}
          style={{ position: "absolute", left: "0.4rem", top: "50%", transform: "translateY(-50%)", width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.07)", border: `1px solid ${C.border}`, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.25s", zIndex: 5 }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(245,158,11,0.15)"; e.currentTarget.style.borderColor = C.borderHov; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = C.border; }}>
          <ChevronLeft size={20} />
        </button>

        <AnimatePresence mode="wait">
          <motion.div key={index}
            initial={{ opacity: 0, scale: 0.9, rotateY: -8 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateY: 8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative", borderRadius: 18, overflow: "hidden", boxShadow: "0 60px 120px rgba(0,0,0,0.9), 0 0 0 1px rgba(245,158,11,0.25)", border: `1px solid ${C.borderHov}`, maxWidth: "100%", cursor: zoomed ? "zoom-out" : "zoom-in" }}
            onClick={() => setZoomed(z => !z)}>
            <motion.img
              src={photo.src} alt={photo.alt}
              animate={{ scale: zoomed ? 1.8 : 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ maxWidth: "min(76vw, 100%)", maxHeight: "calc(100vh - 240px)", objectFit: "contain", display: "block", filter: "saturate(1.15) contrast(1.07) brightness(1.1)", transformOrigin: "center center" }}
            />
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(160deg, rgba(245,158,11,0.04) 0%, transparent 45%, rgba(0,0,0,0.25) 100%)" }} />
            {!zoomed && (
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(7,5,3,0.95) 0%, transparent 100%)", padding: "2rem 1.5rem 1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <div style={{ width: 20, height: 2, background: C.gradient, borderRadius: 2 }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.56rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}>{photo.alt}</span>
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", color: C.gold, marginTop: "0.25rem" }}>{photo.label}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* NEXT */}
        <button onClick={onNext}
          style={{ position: "absolute", right: "0.4rem", top: "50%", transform: "translateY(-50%)", width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.07)", border: `1px solid ${C.border}`, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.25s", zIndex: 5 }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(245,158,11,0.15)"; e.currentTarget.style.borderColor = C.borderHov; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = C.border; }}>
          <ChevronRight size={20} />
        </button>

        {/* Floating "Back to Gallery" pill — always visible */}
        <motion.button
          onClick={fromGallery ? onBackToGallery : onClose}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
          style={{
            position: "absolute", bottom: "1rem", left: "50%", transform: "translateX(-50%)",
            zIndex: 10, display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.65rem 1.5rem",
            background: "rgba(14,11,8,0.85)", backdropFilter: "blur(20px)",
            border: `1px solid ${C.borderHov}`,
            borderRadius: 100, color: C.gold, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 800,
            letterSpacing: "0.15em", textTransform: "uppercase",
            boxShadow: "0 8px 28px rgba(0,0,0,0.5)", whiteSpace: "nowrap",
          }}>
          <ArrowLeft size={13} strokeWidth={2.5} />
          {fromGallery ? "Back to Gallery" : "Back"}
        </motion.button>

        {/* Zoom indicator */}
        {zoomed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ position: "absolute", top: "0.75rem", left: "50%", transform: "translateX(-50%)", background: "rgba(14,11,8,0.85)", backdropFilter: "blur(12px)", border: `1px solid ${C.borderHov}`, borderRadius: 100, padding: "0.3rem 1rem", color: C.gold, fontFamily: "'DM Sans', sans-serif", fontSize: "0.5rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Zoomed — Click image to zoom out
          </motion.div>
        )}
      </div>

      {/* ── THUMBNAIL STRIP ── */}
      <div style={{ flexShrink: 0, padding: "0.5rem 0.85rem 0.75rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div ref={stripRef} style={{ display: "flex", gap: "0.4rem", overflowX: "auto", scrollbarWidth: "none", justifyContent: "flex-start", paddingBottom: "2px" }}>
          {photos.map((p, i) => (
            <motion.button key={i} whileHover={{ scale: 1.1 }}
              onClick={() => {
                const diff = i - index;
                if (diff > 0) for (let x = 0; x < diff; x++) onNext();
                else if (diff < 0) for (let x = 0; x < Math.abs(diff); x++) onPrev();
              }}
              style={{ width: i === index ? 60 : 44, height: i === index ? 44 : 36, borderRadius: i === index ? 10 : 7, overflow: "hidden", flexShrink: 0, padding: 0, border: `2px solid ${i === index ? C.gold : "rgba(255,255,255,0.08)"}`, cursor: "pointer", transition: "all 0.3s ease", boxShadow: i === index ? `0 0 14px ${C.gold}55` : "none", opacity: i === index ? 1 : 0.5, background: "transparent" }}>
              <img src={p.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ─── FULL GALLERY ─────────────────────────────────────────────────────────────
const FullGallery: React.FC<{
  photos: typeof EVENT_PHOTOS;
  onBack: () => void;
  onOpenPhoto: (i: number) => void;
}> = ({ photos, onBack, onOpenPhoto }) => {
  const [gview, setGview]         = useState<"masonry" | "grid">("masonry");
  const [activeFilter, setFilter] = useState<PhotoCategory>("All");
  const [searchQuery, setSearch]  = useState("");

  useBodyScrollLock();

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onBack(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onBack]);

  const filtered = photos.filter(p => {
    const matchCat = activeFilter === "All" || p.category === activeFilter;
    const matchSearch = !searchQuery || p.alt.toLowerCase().includes(searchQuery.toLowerCase()) || p.label.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // Map filtered photos back to their original indices
  const filteredWithIdx = filtered.map(p => ({ ...p, origIdx: photos.indexOf(p) }));

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "100%" }}
      transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "fixed", inset: 0, zIndex: 8500, background: C.bgDeep, display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.9rem 1.25rem", borderBottom: `1px solid ${C.border}`, background: "rgba(14,12,10,0.98)", backdropFilter: "blur(20px)", flexShrink: 0, gap: "0.75rem", flexWrap: "wrap" }}>
        <button onClick={onBack}
          style={{ display: "flex", alignItems: "center", gap: "0.55rem", background: "rgba(245,158,11,0.08)", border: `1px solid ${C.borderHov}`, borderRadius: 100, padding: "0.5rem 1.1rem", color: C.gold, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", transition: "all 0.25s", whiteSpace: "nowrap" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(245,158,11,0.16)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(245,158,11,0.08)"}>
          <ArrowLeft size={14} /> Back
        </button>

        <div style={{ textAlign: "center", flex: 1, minWidth: 120 }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 700, color: C.text, lineHeight: 1 }}>Field Operations Gallery</h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.5rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.textFaint, marginTop: 3 }}>{filteredWithIdx.length} of {photos.length} moments</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          {(["masonry", "grid"] as const).map(v => (
            <button key={v} onClick={() => setGview(v)} style={{ width: 34, height: 34, borderRadius: 9, background: gview === v ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${gview === v ? C.borderHov : C.border}`, color: gview === v ? C.gold : C.textMuted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
              {v === "masonry" ? <LayoutGrid size={15} /> : <Grid3x3 size={15} />}
            </button>
          ))}
          <button onClick={onBack} style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(255,255,255,0.05)", border: `1px solid ${C.border}`, color: C.textMuted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(245,158,11,0.1)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = C.textMuted; }}>
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Search + Filter bar */}
      <div style={{ padding: "0.75rem 1.25rem", borderBottom: `1px solid ${C.border}`, background: "rgba(10,8,6,0.9)", backdropFilter: "blur(10px)", flexShrink: 0, display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
        {/* Search input */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 100, padding: "0.4rem 0.9rem", flex: "1 1 180px", minWidth: 150 }}>
          <Search size={12} color={C.textFaint} />
          <input
            type="text" placeholder="Search photos…" value={searchQuery}
            onChange={e => setSearch(e.target.value)}
            style={{ background: "transparent", border: "none", outline: "none", color: C.text, fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", width: "100%" }}
          />
          {searchQuery && <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", color: C.textFaint, padding: 0, display: "flex" }}><X size={11} /></button>}
        </div>

        {/* Category filters */}
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {PHOTO_CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              style={{ padding: "0.35rem 0.85rem", borderRadius: 100, border: `1px solid ${activeFilter === cat ? C.borderHov : C.border}`, background: activeFilter === cat ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.03)", color: activeFilter === cat ? C.gold : C.textMuted, fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}>
              {cat} {cat !== "All" && `(${photos.filter(p => p.category === cat).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable grid */}
      <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.25rem" }}>
        <style>{`
          .gal-card:hover .gal-overlay { opacity: 1 !important; }
          .gal-card:hover img { filter: saturate(1.3) contrast(1.1) brightness(1.2) !important; transform: scale(1.06) !important; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-thumb { background: rgba(245,158,11,0.3); border-radius: 2px; }
        `}</style>

        {filteredWithIdx.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 1rem", color: C.textMuted }}>
            <Search size={40} color={C.textFaint} style={{ margin: "0 auto 1rem", display: "block" }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontStyle: "italic", color: C.textMuted }}>No photos found</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: C.textFaint, marginTop: "0.5rem" }}>Try a different search or filter</p>
          </div>
        ) : gview === "masonry" ? (
          <div style={{ columns: "3 140px", columnGap: "0.75rem" }}>
            {filteredWithIdx.map((photo, i) => (
              <motion.div key={photo.origIdx} className="gal-card"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.025, duration: 0.4 }}
                onClick={() => onOpenPhoto(photo.origIdx)}
                style={{ breakInside: "avoid", marginBottom: "0.75rem", position: "relative", overflow: "hidden", borderRadius: 14, cursor: "pointer", border: `1px solid ${C.border}`, boxShadow: "0 8px 28px rgba(0,0,0,0.55)", display: "block" }}>
                <img src={photo.src} alt={photo.alt} style={{ width: "100%", display: "block", filter: "saturate(1.05) contrast(1.05) brightness(1.07)", transition: "filter 0.45s ease, transform 0.65s ease" }} />
                <div style={{ position: "absolute", top: "0.5rem", left: "0.5rem", background: "rgba(14,11,8,0.75)", backdropFilter: "blur(8px)", border: `1px solid ${C.border}`, borderRadius: 100, padding: "0.15rem 0.55rem" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.44rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.gold }}>{photo.category}</span>
                </div>
                <div className="gal-overlay" style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to top, rgba(7,5,3,0.9) 0%, transparent 60%)", opacity: 0, transition: "opacity 0.3s", display: "flex", alignItems: "flex-end", padding: "0.85rem" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.15rem" }}>
                      <ZoomIn size={11} color={C.gold} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.54rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff" }}>{photo.alt}</span>
                    </div>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", fontStyle: "italic", color: C.gold }}>{photo.label}</p>
                  </div>
                </div>
                <div style={{ position: "absolute", top: "0.5rem", right: "0.5rem", width: 6, height: 6, borderRadius: "50%", background: C.gold, opacity: 0.7, boxShadow: `0 0 8px ${C.gold}` }} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "0.75rem" }}>
            {filteredWithIdx.map((photo, i) => (
              <motion.div key={photo.origIdx} className="gal-card"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.025, duration: 0.35 }}
                onClick={() => onOpenPhoto(photo.origIdx)}
                style={{ aspectRatio: "1", position: "relative", overflow: "hidden", borderRadius: 14, cursor: "pointer", border: `1px solid ${C.border}`, boxShadow: "0 6px 22px rgba(0,0,0,0.55)" }}>
                <img src={photo.src} alt={photo.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "saturate(1.05) contrast(1.05) brightness(1.07)", transition: "filter 0.45s ease, transform 0.6s ease" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0.5rem", background: "linear-gradient(to top, rgba(7,5,3,0.85) 0%, transparent 100%)" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.44rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.gold }}>{photo.category}</span>
                </div>
                <div className="gal-overlay" style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "rgba(7,5,3,0.65)", opacity: 0, transition: "opacity 0.25s", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ZoomIn size={24} color={C.gold} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: "0.75rem 1.25rem", borderTop: `1px solid ${C.border}`, background: "rgba(14,12,10,0.98)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, gap: "0.5rem", flexWrap: "wrap" }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: "0.45rem", background: "none", border: "none", cursor: "pointer", color: C.textMuted, fontFamily: "'DM Sans', sans-serif", fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", transition: "color 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.color = C.gold}
          onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>
          <ArrowLeft size={12} /> Back to Programs
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.8)" }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.5rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: C.textFaint }}>
            {filteredWithIdx.length} photo{filteredWithIdx.length !== 1 ? "s" : ""} shown
          </span>
        </div>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.5rem", fontWeight: 700, color: C.textFaint }}>{photos.length} total</span>
      </div>
    </motion.div>
  );
};

// ─── DIVIDER ──────────────────────────────────────────────────────────────────
const Divider = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "0 auto", maxWidth: 1280, padding: "0 6%" }}>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${C.border})` }} />
    <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.gold, opacity: 0.35 }} />
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${C.border}, transparent)` }} />
  </div>
);

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
type AppView = "programs" | "gallery";

const Programs: React.FC = () => {
  const [isMobile,    setIsMobile]    = useState(false);
  const [view,        setView]        = useState<AppView>("programs");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [fromGallery, setFromGallery] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const openFromGrid    = useCallback((i: number) => { setFromGallery(false); setLightboxIdx(i); }, []);
  const openFromGallery = useCallback((i: number) => { setFromGallery(true);  setLightboxIdx(i); }, []);
  const closeLightbox   = useCallback(() => setLightboxIdx(null), []);
  const backToGallery   = useCallback(() => { setLightboxIdx(null); setView("gallery"); }, []);
  const closeGallery    = useCallback(() => setView("programs"), []);

  const exitAll = useCallback(() => {
    setLightboxIdx(null);
    setView("programs");
    setTimeout(() => {
      document.getElementById("ourprograms")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 380);
  }, []);

  const prev = useCallback(() => setLightboxIdx(i => i !== null ? (i - 1 + EVENT_PHOTOS.length) % EVENT_PHOTOS.length : null), []);
  const next = useCallback(() => setLightboxIdx(i => i !== null ? (i + 1) % EVENT_PHOTOS.length : null), []);

  const R1     = EVENT_PHOTOS.slice(0, 3);
  const R2     = EVENT_PHOTOS.slice(3, 7);
  const R3     = EVENT_PHOTOS.slice(7, 11);
  const THUMBS = EVENT_PHOTOS.slice(11);

  return (
    <div style={{ background: C.bg, color: C.text, position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: rgba(245,158,11,0.25); color: #fff; }
        input::placeholder { color: rgba(255,255,255,0.25); }

        .bento-hero { display: grid; grid-template-columns: 1.5fr 1fr; grid-template-rows: 260px 260px; gap: 0.85rem; }
        .bento-hero > *:first-child { grid-row: 1 / 3; }
        .row-4  { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.85rem; }
        .prog-cards-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .prog-header-grid { display: flex; align-items: flex-end; justify-content: space-between; gap: 3rem; }
        .gallery-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 2rem; }

        @media (max-width: 1024px) {
          .bento-hero { grid-template-columns: 1fr 1fr; grid-template-rows: 220px 220px; }
          .bento-hero > *:first-child { grid-row: 1/1; }
          .row-4  { grid-template-columns: repeat(2, 1fr); }
          .prog-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .prog-header-grid { flex-direction: column !important; gap: 1.5rem !important; align-items: flex-start !important; }
          .gallery-header { flex-direction: column !important; align-items: flex-start !important; }
        }
        @media (max-width: 640px) {
          .bento-hero { grid-template-columns: 1fr; grid-template-rows: auto; gap: 0.6rem; }
          .bento-hero > *:first-child { grid-row: 1/1; min-height: 220px; }
          .bento-hero > *:not(:first-child) { min-height: 160px; }
          .row-4 { grid-template-columns: 1fr 1fr; gap: 0.6rem; }
          .prog-cards-grid { grid-template-columns: 1fr !important; }
          .row-4 > * { height: 140px !important; }
        }
        @media (max-width: 420px) {
          .row-4 { grid-template-columns: 1fr 1fr !important; }
          .lb-exit-label { display: none; }
          .lb-back-label { display: none; }
          .bento-hero > *:not(:first-child) { min-height: 130px; }
        }
        @media (max-width: 360px) {
          .row-4 { grid-template-columns: 1fr !important; }
        }

        /* Mobile lightbox adjustments */
        @media (max-width: 640px) {
          .lb-img { max-width: 92vw !important; max-height: calc(100vh - 260px) !important; }
        }
      `}</style>

      <div style={{ position: "fixed", top: "-10%", right: "-5%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "20%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(234,88,12,0.05) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />

      <section id="ourprograms" style={{ padding: "clamp(3rem,8vw,7rem) clamp(1rem,6%,6%) clamp(3rem,6vw,5rem)", maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} style={{ marginBottom: "clamp(2.5rem,6vw,5rem)" }}>
          <Eyebrow icon={Sparkles}>Our Programs</Eyebrow>
          <div className="prog-header-grid">
            <motion.h2 variants={fadeUp} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem,6vw,6rem)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.01em", color: C.text, flex: "0 0 auto" }}>
              Creating <br />
              <em style={{ fontStyle: "italic", fontWeight: 400, background: `linear-gradient(135deg, ${C.gold}, ${C.orange})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Real Impact.</em>
            </motion.h2>
            <motion.p variants={fadeUp} style={{ color: C.textMuted, fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.82rem,2vw,1rem)", lineHeight: 1.8, fontWeight: 300, maxWidth: 420, borderLeft: "2px solid rgba(245,158,11,0.2)", paddingLeft: "1.5rem" }}>
              We empower women, girls, and youth to thrive through programs that create real, lasting change — from financial independence and education to health and leadership.
            </motion.p>
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="prog-cards-grid" style={{ marginBottom: "clamp(3rem,7vw,7rem)" }}>
          {PROGRAMS.map((p, i) => <ProgramCard key={i} program={p} isMobile={isMobile} />)}
        </motion.div>

        <Divider />

        {/* Gallery section */}
        <div id="events" style={{ marginTop: "clamp(2.5rem,5vw,5rem)" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="gallery-header"
            style={{ marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: `1px solid ${C.border}` }}>
            <div>
              <Eyebrow icon={ImageIcon}>Field Operations</Eyebrow>
              <motion.h3 variants={fadeUp} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem,4vw,3.5rem)", fontWeight: 700, color: C.text, lineHeight: 1.05 }}>In the Field</motion.h3>
            </div>
            <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              <div style={{ padding: "0.4rem 1rem", borderRadius: 100, background: "rgba(245,158,11,0.07)", border: `1px solid ${C.border}`, fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold }}>{EVENT_PHOTOS.length} photos</div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: C.textFaint }}>Real Moments, Real Change</p>
            </motion.div>
          </motion.div>

          {/* Bento rows */}
          <div className="bento-hero" style={{ marginBottom: "0.85rem" }}>
            {R1.map((p, i) => <Photo3D key={i} photo={p} index={i} total={EVENT_PHOTOS.length} onClick={() => openFromGrid(i)} height="100%" isMobile={isMobile} />)}
          </div>
          <div className="row-4" style={{ marginBottom: "0.85rem" }}>
            {R2.map((p, i) => <Photo3D key={i} photo={p} index={3+i} total={EVENT_PHOTOS.length} onClick={() => openFromGrid(3+i)} height="200px" isMobile={isMobile} />)}
          </div>
          <div className="row-4" style={{ marginBottom: "0.85rem" }}>
            {R3.map((p, i) => <Photo3D key={i} photo={p} index={7+i} total={EVENT_PHOTOS.length} onClick={() => openFromGrid(7+i)} height="160px" isMobile={isMobile} />)}
          </div>

          {/* Thumbnail strip + CTA */}
          <div style={{ padding: "1rem 1.25rem", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 18, display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.textFaint, flexShrink: 0 }}>+{THUMBS.length} more</span>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {THUMBS.map((p, i) => (
                <motion.div key={i} whileHover={{ scale: 1.15 }} onClick={() => openFromGrid(11 + i)}
                  style={{ width: 46, height: 46, borderRadius: 10, overflow: "hidden", border: `2px solid ${C.border}`, cursor: "pointer", flexShrink: 0, transition: "border-color 0.2s", boxShadow: "0 4px 14px rgba(0,0,0,0.45)" }}>
                  <img src={p.src} alt={p.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(1.1) saturate(1.05)" }} />
                </motion.div>
              ))}
            </div>
            <div style={{ flex: 1, minWidth: 0 }} />
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => setView("gallery")}
              style={{ display: "flex", alignItems: "center", gap: "0.6rem", background: C.gradient, border: "none", borderRadius: 100, padding: "0.62rem 1.5rem", color: "#fff", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", boxShadow: "0 6px 22px rgba(245,158,11,0.32)", flexShrink: 0, whiteSpace: "nowrap" }}>
              View Full Gallery <ArrowRight size={13} />
            </motion.button>
          </div>

          {/* Secondary CTA */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} style={{ marginTop: "2.5rem", display: "flex", justifyContent: "center" }}>
            <motion.button whileHover={{ borderColor: C.borderHov, y: -3 }} whileTap={{ scale: 0.97 }} onClick={() => setView("gallery")}
              style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem clamp(1.25rem,4vw,2.5rem)", borderRadius: 100, background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.55rem, 1.5vw, 0.62rem)", fontWeight: 800, letterSpacing: "0.35em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s ease", backdropFilter: "blur(10px)", whiteSpace: "nowrap" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#fff"; }} onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
              View Full Gallery ({EVENT_PHOTOS.length} Photos) <ArrowRight size={14} color={C.gold} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Full Gallery */}
      <AnimatePresence>
        {view === "gallery" && (
          <FullGallery key="full-gallery" photos={EVENT_PHOTOS} onBack={closeGallery} onOpenPhoto={openFromGallery} />
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            key="lightbox"
            photos={EVENT_PHOTOS}
            index={lightboxIdx}
            onClose={closeLightbox}
            onExitAll={exitAll}
            onPrev={prev}
            onNext={next}
            fromGallery={fromGallery}
            onBackToGallery={backToGallery}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Programs;