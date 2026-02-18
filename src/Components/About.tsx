import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Users, TrendingUp, Shield, Target, Globe, Sparkles, ArrowUpRight, Heart,
} from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
type IconComponent = React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>;

interface VisionPoint { icon: IconComponent; title: string; text: string; }
interface TeamMember  { name: string; role: string; description: string; initial: string; }

// ─── DATA ─────────────────────────────────────────────────────────────────────
const IMAGE_ASSETS = {
  heritage:   "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2070&auto=format&fit=crop",
  mission_bg: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=2031&auto=format&fit=crop",
};

const VISION_POINTS: VisionPoint[] = [
  { icon: TrendingUp, title: "Stable Futures",      text: "Empowering Nigerian families toward long-term economic independence and sustainable prosperity." },
  { icon: Shield,     title: "Dignity & Care",       text: "Ensuring access to basic healthcare, nutritional security, and human dignity for all." },
  { icon: Users,      title: "Stronger Communities", text: "Building local resilience through trust, shared values, and collective empowerment." },
];

const TEAM_MEMBERS: TeamMember[] = [
  { name: "Leadership",           role: "Vision & Strategy",  initial: "L", description: "Providing strategic direction and inspiring leadership to drive our mission forward with clarity and purpose." },
  { name: "Program Coordinators", role: "Community Programs", initial: "P", description: "Planning and delivering outreach initiatives that meet real community needs and create lasting impact." },
  { name: "Education & Welfare",  role: "Learning & Support", initial: "E", description: "Supporting access to quality education, skills development, and welfare resources across Nigeria." },
];

const WHY_STATS = [
  { value: "500+",  label: "Lives Impacted" },
  { value: "10+",   label: "Programs" },
  { value: "2014",  label: "Est. Year" },
  { value: "100%",  label: "Commitment" },
];

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────
const fadeUp: Variants   = { hidden: { opacity: 0, y: 36 },  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const fadeLeft: Variants = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } } };
const fadeRight: Variants= { hidden: { opacity: 0, x: 40 },  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } } };
const stagger: Variants  = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────
const Eyebrow: React.FC<{ icon: IconComponent; children: React.ReactNode }> = ({ icon: Icon, children }) => (
  <motion.div variants={fadeUp} style={{
    display: "inline-flex", alignItems: "center", gap: "0.6rem",
    padding: "0.45rem 1.1rem",
    background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.2)",
    borderRadius: "100px", marginBottom: "1.5rem",
  }}>
    <Icon size={12} color="#C9A96E" />
    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E" }}>
      {children}
    </span>
  </motion.div>
);

const GoldDivider: React.FC = () => (
  <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(201,169,110,0.3), transparent)" }} />
);

const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.025 }) => (
  <div style={{
    position: "absolute", inset: 0, opacity, pointerEvents: "none", zIndex: 1,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  }} />
);

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const About: React.FC = () => {
  const storyRef = useRef<HTMLElement>(null);
  const isStoryInView = useInView(storyRef, { once: true, margin: "-80px" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        :root { --gold: #C9A96E; --dark: #060608; }

        .av-card:hover .av-topline { opacity: 1 !important; }
        .av-card:hover              { border-color: rgba(201,169,110,0.25) !important; }
        .at-card:hover .at-avatar   { transform: scale(1.04); }
        .at-avatar                  { transition: transform 0.5s cubic-bezier(0.22,1,0.36,1); }
        .story-cta:hover svg        { transform: translate(3px,-3px); }
        .story-cta svg              { transition: transform 0.2s ease; }

        @media (max-width: 900px) {
          .ab-2col  { grid-template-columns: 1fr !important; }
          .ab-3col  { grid-template-columns: 1fr !important; }
          .ab-pad   { padding: 5rem 1.5rem !important; }
          .ab-why   { padding: 6rem 1.5rem !important; }
          .ab-team-hd { flex-direction: column !important; }
        }
        @media (max-width: 480px) {
          .ab-stat-row { flex-wrap: wrap; }
          .ab-stat-row > div { flex: 1 1 45% !important; }
        }
      `}</style>

      <div style={{ background: "var(--dark)", color: "#fff", fontFamily: "'DM Sans',sans-serif" }}>

        {/* ─── 1. WHY OUR WORK MATTERS ─── */}
        <section id="whyitmatters" className="ab-why" style={{
          position: "relative", minHeight: "100vh",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "8rem 5%", overflow: "hidden", background: "#060608",
        }}>
          <Grain />
          <div style={{
            position: "absolute", width: "700px", height: "700px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 65%)",
            top: "-15%", left: "50%", transform: "translateX(-50%)",
            filter: "blur(80px)", pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", left: "50%", top: 0, width: "1px", height: "100%",
            background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.06) 30%, rgba(201,169,110,0.06) 70%, transparent)",
            pointerEvents: "none",
          }} />

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ position: "relative", zIndex: 2, maxWidth: "900px", margin: "0 auto", textAlign: "center" }}
          >
            <Eyebrow icon={Globe}>Lagos · Abuja · Port Harcourt</Eyebrow>

            <motion.h1 variants={fadeUp} style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(3rem,7vw,7rem)", fontWeight: 400,
              lineHeight: 1.05, marginBottom: "2.5rem",
            }}>
              Every Hand{" "}<em style={{ color: "#C9A96E" }}>Lifts</em>
              <br />a Thriving Future.
            </motion.h1>

            <motion.p variants={fadeUp} style={{
              fontSize: "clamp(1rem,1.8vw,1.15rem)", color: "rgba(255,255,255,0.45)",
              fontWeight: 300, lineHeight: 1.85, maxWidth: "600px", margin: "0 auto 3rem",
            }}>
              In the vibrant heart of Nigeria, potential often meets unyielding barriers. We are the bridge
              between survival and{" "}<span style={{ color: "#fff", fontWeight: 500 }}>soaring success.</span>
            </motion.p>

            {/* Stats row */}
            <motion.div variants={fadeUp} className="ab-stat-row" style={{
              display: "flex", alignItems: "stretch",
              border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px",
              overflow: "hidden", background: "rgba(255,255,255,0.02)",
            }}>
              {WHY_STATS.map((s, i) => (
                <div key={i} style={{
                  flex: 1, padding: "1.75rem 1rem", textAlign: "center",
                  borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.4rem,2.5vw,2rem)", color: "#C9A96E", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginTop: "0.4rem" }}>{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Scroll cue */}
            <motion.div variants={fadeUp} style={{ marginTop: "4rem", display: "flex", justifyContent: "center" }}>
              <motion.div
                animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: "1px", height: "60px", background: "linear-gradient(to bottom, #C9A96E, transparent)" }}
              />
            </motion.div>
          </motion.div>
        </section>

        <GoldDivider />

        {/* ─── 2. OUR STORY ─── */}
        <section id="ourstory" ref={storyRef} className="ab-pad" style={{
          padding: "8rem 5%", background: "#fff", color: "#0a0908", position: "relative",
        }}>
          <div style={{ position: "absolute", top: 0, left: "5%", width: "60px", height: "3px", background: "linear-gradient(to right,#C9A96E,#a07840)" }} />

          <div className="ab-2col" style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
            {/* Image */}
            <motion.div initial="hidden" animate={isStoryInView ? "visible" : "hidden"} variants={fadeLeft} style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: "-16px", border: "1px solid rgba(201,169,110,0.15)", borderRadius: "2.5rem", pointerEvents: "none" }} />
              <div style={{ borderRadius: "2rem", overflow: "hidden", position: "relative" }}>
                <img src={IMAGE_ASSETS.heritage} alt="Nigerian Heritage" style={{ width: "100%", display: "block", objectFit: "cover", aspectRatio: "4/5" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,9,8,0.5) 0%, transparent 60%)" }} />
              </div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={isStoryInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.55, duration: 0.6 }}
                style={{
                  position: "absolute", bottom: "2rem", left: "2rem",
                  background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)",
                  padding: "1rem 1.4rem", borderRadius: "14px", borderLeft: "3px solid #C9A96E",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
                }}
              >
                <div style={{ fontSize: "0.56rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "0.3rem" }}>Impact Verified</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 700, fontStyle: "italic", color: "#0a0908" }}>1,200+ Lives Reshaped</div>
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div initial="hidden" animate={isStoryInView ? "visible" : "hidden"} variants={fadeRight} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <div style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.35em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "1rem" }}>The Heritage</div>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,3.5vw,3.5rem)", fontWeight: 700, lineHeight: 1.15, color: "#0a0908" }}>
                  A legacy built on <br /><em style={{ fontStyle: "italic", fontWeight: 400 }}>unwavering</em> empathy.
                </h2>
              </div>
              <div style={{ width: "40px", height: "2px", background: "#C9A96E" }} />
              <p style={{ fontSize: "1rem", color: "#555", fontWeight: 300, lineHeight: 1.85 }}>
                Generous Helping Hands Foundation began as a quiet promise to the neighborhoods of Nigeria.
                We recognized that poverty isn't a lack of character — it's a lack of{" "}
                <strong style={{ color: "#0a0908", fontWeight: 600 }}>access.</strong>
              </p>
              <p style={{ fontSize: "1rem", color: "#555", fontWeight: 300, lineHeight: 1.85 }}>
                Our history is written in the success stories of local traders, the health of our elders, and
                the laughter in our schools. We don't just give — we invest in the human spirit.
              </p>
              <button className="story-cta" style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "transparent", border: "none", cursor: "pointer", padding: 0,
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", fontWeight: 800,
                letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E", marginTop: "0.25rem",
              }}>
                Download Impact Report <ArrowUpRight size={14} color="#C9A96E" />
              </button>
            </motion.div>
          </div>
        </section>

        <GoldDivider />

        {/* ─── 3. OUR MISSION ─── */}
        <section id="missionstatement" className="ab-pad" style={{ position: "relative", padding: "9rem 5%", overflow: "hidden", background: "#060608" }}>
          <Grain />
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <img src={IMAGE_ASSETS.mission_bg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.18, filter: "grayscale(100%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #060608 40%, rgba(6,6,8,0.7) 70%, rgba(6,6,8,0.2))" }} />
          </div>

          <div className="ab-2col" style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <Eyebrow icon={Target}>Our Core Mission</Eyebrow>
              <motion.h2 variants={fadeUp} style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(2.8rem,5vw,5.5rem)", fontWeight: 400,
                lineHeight: 1.1, color: "#fff", marginBottom: "2.5rem",
              }}>
                Compassion <br /><em style={{ color: "#C9A96E" }}>in Action.</em>
              </motion.h2>

              <motion.div variants={fadeUp} style={{ borderLeft: "2px solid rgba(201,169,110,0.4)", paddingLeft: "1.75rem" }}>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1rem,1.5vw,1.15rem)", color: "rgba(255,255,255,0.65)", fontWeight: 300, lineHeight: 1.85, fontStyle: "italic" }}>
                  "To improve lives through practical assistance, focusing on measurable impact and personal dignity for every Nigerian we serve."
                </p>
              </motion.div>

              <motion.div variants={fadeUp} style={{ display: "flex", gap: "2rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
                {["Practical Aid", "Measurable Impact", "Personal Dignity"].map((p) => (
                  <div key={p} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#C9A96E", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>{p}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Pull quote card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: "rgba(201,169,110,0.05)", border: "1px solid rgba(201,169,110,0.15)",
                borderRadius: "28px", padding: "3rem", position: "relative", overflow: "hidden",
              }}
            >
              <div style={{
                fontFamily: "'Playfair Display',serif", fontSize: "8rem", lineHeight: 0.75,
                color: "rgba(201,169,110,0.1)", position: "absolute", top: "1.5rem", left: "2rem",
                fontWeight: 700, userSelect: "none",
              }}>"</div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <Heart size={20} fill="#C9A96E" color="#C9A96E" style={{ marginBottom: "1.5rem", display: "block" }} />
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontStyle: "italic", color: "#fff", lineHeight: 1.65, marginBottom: "2rem" }}>
                  We believe every Nigerian deserves a life of dignity, opportunity, and hope — not as a privilege, but as a right.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: "28px", height: "1px", background: "#C9A96E" }} />
                  <span style={{ fontSize: "0.6rem", letterSpacing: "0.22em", color: "#C9A96E", textTransform: "uppercase", fontWeight: 600 }}>GHHF Founding Principle</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <GoldDivider />

        {/* ─── 4. OUR VISION ─── */}
        <section id="visionstatement" className="ab-pad" style={{ padding: "8rem 5%", background: "#060608", position: "relative" }}>
          <Grain opacity={0.02} />
          <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ marginBottom: "5rem" }}>
              <Eyebrow icon={Sparkles}>Strategic Horizon</Eyebrow>
              <motion.h2 variants={fadeUp} style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 400, color: "#fff",
              }}>
                Shaping <em style={{ color: "#C9A96E" }}>Tomorrow</em>
              </motion.h2>
            </motion.div>

            <div className="ab-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
              {VISION_POINTS.map((v, i) => (
                <motion.div
                  key={v.title} className="av-card"
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    padding: "2.5rem", background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)", borderRadius: "24px",
                    position: "relative", overflow: "hidden", transition: "border-color 0.4s ease", cursor: "default",
                  }}
                >
                  <div className="av-topline" style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                    background: "linear-gradient(to right, transparent, #C9A96E, transparent)",
                    opacity: 0, transition: "opacity 0.4s ease",
                  }} />
                  <div style={{ fontSize: "0.56rem", fontWeight: 800, letterSpacing: "0.3em", color: "rgba(201,169,110,0.3)", marginBottom: "1.5rem" }}>0{i + 1}</div>
                  <v.icon size={26} color="#C9A96E" style={{ marginBottom: "1.25rem", display: "block" }} />
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.15rem", fontWeight: 700, color: "#fff", marginBottom: "0.8rem" }}>{v.title}</h3>
                  <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.4)", fontWeight: 300, lineHeight: 1.75 }}>{v.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <GoldDivider />

        {/* ─── 5. MEET THE TEAM ─── */}
        <section id="meettheteam" className="ab-pad" style={{ padding: "8rem 5%", background: "#fff", color: "#0a0908", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, right: "5%", width: "60px", height: "3px", background: "linear-gradient(to left,#C9A96E,#a07840)" }} />
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="ab-team-hd"
              style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "5rem", flexWrap: "wrap", gap: "1rem" }}
            >
              <motion.h2 variants={fadeLeft} style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.2rem,4vw,3.5rem)", fontWeight: 400, color: "#0a0908" }}>
                The Stewards
              </motion.h2>
              <motion.p variants={fadeRight} style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E" }}>
                Leading with Integrity
              </motion.p>
            </motion.div>

            <div className="ab-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2.5rem" }}>
              {TEAM_MEMBERS.map((member, i) => (
                <motion.div
                  key={member.name} className="at-card"
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  style={{ cursor: "default" }}
                >
                  {/* Avatar */}
                  <div style={{ marginBottom: "1.75rem", position: "relative", borderRadius: "20px", overflow: "hidden", aspectRatio: "4/5", background: "linear-gradient(145deg,#f0ede8,#e8e4dc)" }}>
                    <div className="at-avatar" style={{
                      width: "100%", height: "100%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "linear-gradient(145deg,rgba(201,169,110,0.1),rgba(201,169,110,0.03))",
                    }}>
                      <span style={{
                        fontFamily: "'Playfair Display',serif",
                        fontSize: "clamp(4rem,8vw,6rem)", fontWeight: 700, fontStyle: "italic",
                        color: "rgba(201,169,110,0.32)", userSelect: "none", lineHeight: 1,
                      }}>
                        {member.initial}
                      </span>
                    </div>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top,rgba(10,9,8,0.07),transparent)" }} />
                    {/* Role pill */}
                    <div style={{
                      position: "absolute", bottom: "1rem", left: "1rem",
                      background: "rgba(255,255,255,0.94)", backdropFilter: "blur(8px)",
                      padding: "0.3rem 0.75rem", borderRadius: "100px",
                      border: "1px solid rgba(201,169,110,0.2)",
                    }}>
                      <span style={{ fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A96E" }}>{member.role}</span>
                    </div>
                  </div>

                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 700, color: "#0a0908", marginBottom: "0.4rem" }}>{member.name}</h3>
                  <p style={{ fontSize: "0.88rem", color: "#777", fontWeight: 300, lineHeight: 1.75 }}>{member.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default About;