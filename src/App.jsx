import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import * as Icons from "lucide-react";

const GitHub = Icons.GitBranchIcon;
const Linkedin = Icons.Linkedin || Icons.Users;
const Terminal = Icons.Terminal;
const ArrowRight = Icons.ArrowRight;
const ChevronDown = Icons.ChevronDown;
const Route = Icons.Route;
const Cpu = Icons.Cpu;
const Shield = Icons.Shield;
const Globe = Icons.Globe;
const Code2 = Icons.Code2;
const Binary = Icons.Binary;
const Database = Icons.Database;
const Layers = Icons.Layers;
const MonitorSmartphone = Icons.MonitorSmartphone;
const Bug = Icons.Bug;
const TestTube2 = Icons.TestTube2;
const Box = Icons.Box;
const Sparkles = Icons.Sparkles;
const Users = Icons.Users;
const GraduationCap = Icons.GraduationCap;
const BookOpen = Icons.BookOpen;
const ShoppingBag = Icons.ShoppingBag;
const Zap = Icons.Zap;
const Image = Icons.Image;
const Bot = Icons.Bot;
const Workflow = Icons.Workflow;

/* ─── STATIC BACKGROUND ─── */
function StaticBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(16,185,129,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "0%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16,185,129,0.09) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "0%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(5,5,5,0.55) 100%)",
        }}
      />
    </div>
  );
}

/* ─── MAGNETIC BUTTON ─── */
function MagneticButton({ children, className, style, href, onClick, target, rel }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.1);
    y.set((e.clientY - cy) * 0.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, display: "inline-block" }}
    >
      <Tag href={href} onClick={onClick} target={target} rel={rel} className={className} style={style}>
        {children}
      </Tag>
    </motion.div>
  );
}

/* ─── STAGGERED TEXT REVEAL ─── */
function StaggerText({ text, className, style, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className} style={{ ...style, display: "flex", flexWrap: "wrap", gap: "0.25em" }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, delay: delay + i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: "inline-block" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── ANIMATION HELPERS ─── */
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};

function Section({ children, className = "", id }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function SectionLabel({ children }) {
  return (
    <motion.div variants={item} className="flex items-center gap-3 mb-3">
      <span className="inline-block w-8 h-px bg-emerald-500" />
      <span className="text-xs tracking-[0.3em] uppercase text-emerald-400" style={{ fontFamily: "'Geist Mono', monospace" }}>
        {children}
      </span>
    </motion.div>
  );
}

function SectionTitle({ children }) {
  return (
    <motion.h2
      variants={item}
      className="text-3xl md:text-4xl font-bold text-white mb-6"
      style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
    >
      {children}
    </motion.h2>
  );
}

/* ─── NAV ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["projects", "skills", "experience", "contact"];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled || mobileOpen ? "backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}
      style={scrolled || mobileOpen ? { backgroundColor: "rgba(5,5,5,0.95)" } : {}}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-emerald-400 text-sm tracking-wider" style={{ fontFamily: "'Geist Mono', monospace" }}>
          {"<lara.šare />"}
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l}`}
              className="text-xs tracking-widest uppercase text-neutral-400 hover:text-emerald-400 transition-colors relative group"
              style={{ fontFamily: "'Geist Mono', monospace" }}
            >
              {l}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-emerald-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>
        <button
          className="md:hidden text-neutral-400 hover:text-emerald-400 p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <Terminal size={20} />
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-b border-white/5 overflow-hidden"
            style={{ backgroundColor: "#0a0a0a" }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l}
                  href={`#${l}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    setTimeout(() => {
                      document.getElementById(l)?.scrollIntoView({ behavior: "smooth" });
                    }, 50);
                  }}
                  className="text-xs tracking-widest uppercase text-neutral-400 hover:text-emerald-400 transition-colors"
                  style={{ fontFamily: "'Geist Mono', monospace" }}
                >
                  {l}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{
          transform: "translate(-50%, -50%)",
          opacity: 0.15,
          background: "radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 65%)",
        }}
      />
      <motion.div style={{ y, opacity, willChange: "transform, opacity" }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 mb-8"
          style={{ backgroundColor: "rgba(16,185,129,0.05)" }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-400 tracking-wider uppercase" style={{ fontFamily: "'Geist Mono', monospace" }}>
            Open to opportunities · 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: "-0.02em" }}
        >
          Computer science{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #10b981 0%, #5eead4 50%, #34d399 100%)",
              WebkitBackgroundClip: "text",
            }}
          >
            student
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-neutral-400 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
        >
          CS Intern &amp; QA Engineer Building Practical Solutions
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <MagneticButton
            href="#projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm rounded-xl transition-all duration-300"
            style={{ fontFamily: "'DM Sans', sans-serif", boxShadow: "0 0 40px rgba(16,185,129,0.2), 0 0 80px rgba(16,185,129,0.08)" }}
          >
            View My Work <ArrowRight size={16} />
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/10 hover:border-emerald-500/40 text-neutral-300 hover:text-emerald-400 text-sm rounded-xl transition-all duration-300"
            style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: "rgba(255,255,255,0.02)" }}
          >
            Get in Touch
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-4 mt-8"
        >
          {[
            { icon: <GitHub size={18} />, href: "https://github.com/12lara5", label: "GitHub" },
            { icon: <Linkedin size={18} />, href: "https://linkedin.com/in/lara-š-465330224", label: "LinkedIn" },
          ].map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              title={s.label}
              className="w-10 h-10 rounded-lg border border-white/5 flex items-center justify-center text-neutral-600 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300"
              style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
            >
              {s.icon}
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-10 left-1/2"
        style={{ transform: "translateX(-50%)" }}
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown className="text-neutral-600" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── LAPTOP MOCKUP ─── */
function LaptopMockup({ label, videoUrl, urlLabel = "travel-route-swipe.app", accentColor = "rgba(16,185,129,0.04)", icon }) {
  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      <div
        className="relative rounded-2xl border-2 overflow-hidden"
        style={{ borderColor: "rgba(255,255,255,0.08)", paddingBottom: "62.5%", background: "#0a0a0a" }}
      >
        <div className="absolute inset-0 flex flex-col">
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5" style={{ backgroundColor: "#111" }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "rgba(239,68,68,0.5)" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "rgba(234,179,8,0.5)" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "rgba(34,197,94,0.5)" }} />
            <span
              className="flex-1 mx-4 h-4 rounded-sm text-center text-xs text-neutral-600 leading-4"
              style={{ backgroundColor: "rgba(255,255,255,0.03)", fontFamily: "'Geist Mono', monospace", fontSize: "10px" }}
            >
              {urlLabel}
            </span>
          </div>
          <div
            className="flex-1 flex items-center justify-center overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${accentColor} 0%, rgba(5,5,5,1) 60%)` }}
          >
            {videoUrl ? (
              <video
                autoPlay muted loop playsInline controls crossOrigin="anonymous"
                style={{ width: "100%", height: "100%", objectFit: "cover", backgroundColor: "#000" }}
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
            ) : (
              <div className="text-center px-6">
                <div
                  className="w-12 h-12 rounded-xl border border-emerald-500/20 flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: "rgba(16,185,129,0.08)" }}
                >
                  {icon || <Route className="text-emerald-400" size={22} />}
                </div>
                <p className="text-neutral-500 text-xs" style={{ fontFamily: "'Geist Mono', monospace" }}>{label}</p>
                <div className="mt-3 flex justify-center gap-1.5">
                  {[40, 60, 45, 70, 35].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 4 }}
                      animate={{ height: h * 0.4 }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                      className="w-1.5 rounded-full"
                      style={{ backgroundColor: `rgba(16,185,129,${0.3 + i * 0.1})` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-24 h-2 rounded-b-lg" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
      </div>
      <div className="flex justify-center">
        <div className="w-32 h-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.04)" }} />
      </div>
    </div>
  );
}

/* ─── PIPELINE MOCKUP for Boutique ─── */
function PipelineMockup({ videoUrl }) {
  const steps = [
    { icon: <Image size={14} />, label: "Raw Photos", color: "rgba(245,158,11,0.6)" },
    { icon: <Workflow size={14} />, label: "PS Script", color: "rgba(16,185,129,0.6)" },
    { icon: <Bot size={14} />, label: "AI Agent", color: "rgba(99,102,241,0.7)" },
    { icon: <Database size={14} />, label: "SQL DB", color: "rgba(14,165,233,0.7)" },
    { icon: <Globe size={14} />, label: "Web Catalog", color: "rgba(16,185,129,0.9)" },
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      <div
        className="relative rounded-2xl border-2 overflow-hidden"
        style={{ borderColor: "rgba(255,255,255,0.08)", background: "#0a0a0a" }}
      >
        {/* Menu bar */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5" style={{ backgroundColor: "#111" }}>
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "rgba(239,68,68,0.5)" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "rgba(234,179,8,0.5)" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "rgba(34,197,94,0.5)" }} />
          <span
            className="flex-1 mx-4 h-4 rounded-sm text-center text-xs text-neutral-600 leading-4"
            style={{ backgroundColor: "rgba(255,255,255,0.03)", fontFamily: "'Geist Mono', monospace", fontSize: "10px" }}
          >
            boutique-catalog.pipeline
          </span>
        </div>

        {/* Pipeline content */}
        <div className="p-6" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.04) 0%, rgba(5,5,5,1) 70%)" }}>
          {/* Pipeline steps */}
          <div className="flex items-center justify-between gap-1 mb-6">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-1 flex-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}
                  className="flex flex-col items-center gap-1.5 flex-shrink-0"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/5"
                    style={{ backgroundColor: "rgba(255,255,255,0.03)", color: s.color }}
                  >
                    {s.icon}
                  </div>
                  <span className="text-neutral-600 text-center leading-tight" style={{ fontFamily: "'Geist Mono', monospace", fontSize: "8px" }}>
                    {s.label}
                  </span>
                </motion.div>
                {i < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.35 + i * 0.15, duration: 0.3 }}
                    className="flex-1 h-px mx-1"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)", transformOrigin: "left" }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Video or terminal log */}
          {videoUrl ? (
            <div className="rounded-lg overflow-hidden border border-white/5" style={{ backgroundColor: "#000" }}>
              <video
                autoPlay muted loop playsInline controls
                style={{ width: "100%", display: "block", maxHeight: "180px", objectFit: "cover" }}
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
            </div>
          ) : (
            <div className="rounded-lg border border-white/5 p-3" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="text-emerald-400/50" size={10} />
                <span className="text-emerald-400/50 text-xs" style={{ fontFamily: "'Geist Mono', monospace", fontSize: "9px" }}>
                  agent.log
                </span>
              </div>
              {[
                { text: "✓ PS batch processed 48 images", color: "rgba(16,185,129,0.7)" },
                { text: "✓ AI agent parsed metadata → DB", color: "rgba(16,185,129,0.7)" },
                { text: "✓ 48 products inserted (SQL)", color: "rgba(16,185,129,0.7)" },
                { text: "✓ Catalog rebuilt — 0 errors", color: "rgba(16,185,129,0.9)" },
              ].map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.2, duration: 0.3 }}
                  style={{ fontFamily: "'Geist Mono', monospace", fontSize: "9px", color: line.color, marginBottom: "2px" }}
                >
                  {line.text}
                </motion.p>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Base */}
      <div className="flex justify-center">
        <div className="w-24 h-2 rounded-b-lg" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
      </div>
      <div className="flex justify-center">
        <div className="w-32 h-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.04)" }} />
      </div>
    </div>
  );
}


/* ─── PROJECT SPOTLIGHT 1 — Travel Route Swipe ─── */
function ProjectSpotlight() {
  const phases = [
    {
      icon: <Route size={22} />,
      label: "Optimization Algorithm",
      color: "text-amber-400",
      border: "border-amber-500/20",
      bgStyle: { backgroundColor: "rgba(245,158,11,0.05)" },
      content:
        "Real-world Traveling Salesman Problem (TSP) solved with a Nearest Neighbor heuristic for initial route construction, enhanced by 2-opt local search to iteratively eliminate crossing paths — computing near-optimal routes in real-time.",
    },
    {
      icon: <Cpu size={22} />,
      label: "Scalability & Performance",
      color: "text-emerald-400",
      border: "border-emerald-500/20",
      bgStyle: { backgroundColor: "rgba(16,185,129,0.05)" },
      content:
        "Architected for performance at scale: itineraries of 5–15 stops resolved under 100ms. Iterative optimization passes demonstrate production-ready algorithmic efficiency.",
    },
    {
      icon: <Shield size={22} />,
      label: "Quality Assurance & Security",
      color: "text-sky-400",
      border: "border-sky-500/20",
      bgStyle: { backgroundColor: "rgba(14,165,233,0.05)" },
      content:
        "Security-first backend proxy shields all external API calls (Google Maps, geolocation), preventing credential leakage. Automated testing validates route correctness across edge cases.",
    },
  ];

  const tech = ["Java", "Google Maps API", "Nearest Neighbor Heuristic", "2-opt Optimization", "Backend Proxy", "REST", "Automated Testing"];

  return (
    <Section id="projects" className="py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Featured Project · 2026</SectionLabel>
        <SectionTitle>
          <StaggerText text="Travel Route Swipe" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }} />
        </SectionTitle>

        <motion.div variants={item}>
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-white/5 overflow-hidden"
            style={{ backgroundColor: "#0a0a0a" }}
          >
            <div
              className="relative p-8 md:p-12 border-b border-white/5 overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.04) 0%, #0a0a0a 70%)" }}
            >
              <div
                className="absolute -top-32 -right-32 w-80 h-80 rounded-full pointer-events-none"
                style={{ opacity: 0.2, background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)" }}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: "rgba(239,68,68,0.6)" }} />
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: "rgba(234,179,8,0.6)" }} />
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: "rgba(34,197,94,0.6)" }} />
                    <span className="ml-2 text-xs text-neutral-500 truncate" style={{ fontFamily: "'Geist Mono', monospace" }}>
                      personal-projects/travel-route-swipe
                    </span>
                  </div>
                  <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-5">
                    A route optimization tool designed to help tourists efficiently navigate between selected landmarks. The application calculates optimal travel paths to minimize time and distance, using custom-built algorithms inspired by classical optimization problems.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-xs border rounded-md whitespace-nowrap"
                        style={{ fontFamily: "'Geist Mono', monospace", color: "rgba(16,185,129,0.8)", borderColor: "rgba(16,185,129,0.15)", backgroundColor: "rgba(16,185,129,0.05)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <LaptopMockup
                  label="route-optimizer.view"
                  videoUrl={`${import.meta.env.BASE_URL}media/travel-swipe.mp4`}
                  urlLabel="travel-route-swipe.app"
                />
              </div>
            </div>

            <div className="p-6 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {phases.map((p, i) => (
                  <motion.div
                    key={i}
                    variants={item}
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className={`rounded-xl border ${p.border} p-5`}
                    style={p.bgStyle}
                  >
                    <div className={`${p.color} mb-3`}>{p.icon}</div>
                    <h4 className={`text-sm font-semibold ${p.color} uppercase tracking-wider mb-3`} style={{ fontFamily: "'Geist Mono', monospace" }}>
                      {p.label}
                    </h4>
                    <p className="text-neutral-400 text-sm leading-relaxed">{p.content}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ─── FEATURED PROJECT 2 — Boutique Digital Catalogs ─── */}
        <motion.div variants={item} className="mt-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block w-8 h-px bg-violet-500" />
            <span className="text-xs tracking-[0.3em] uppercase text-violet-400" style={{ fontFamily: "'Geist Mono', monospace" }}>
              Featured Project · 2026
            </span>
          </div>
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-8"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            <StaggerText text="Boutique Digital Catalogs" delay={0.1} />
          </motion.h2>
        </motion.div>

        <motion.div variants={item}>
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border overflow-hidden"
            style={{ backgroundColor: "#0a0a0a", borderColor: "rgba(99,102,241,0.15)" }}
          >
            {/* Top visual area */}
            <div
              className="relative p-8 md:p-12 border-b overflow-hidden"
              style={{ borderColor: "rgba(99,102,241,0.1)", background: "linear-gradient(135deg, rgba(99,102,241,0.06) 0%, #0a0a0a 70%)" }}
            >
              <div
                className="absolute -top-32 -right-32 w-80 h-80 rounded-full pointer-events-none"
                style={{ opacity: 0.25, background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)" }}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="px-2.5 py-1 text-xs border rounded-full"
                      style={{ fontFamily: "'Geist Mono', monospace", color: "rgba(167,139,250,0.9)", borderColor: "rgba(99,102,241,0.2)", backgroundColor: "rgba(99,102,241,0.06)" }}
                    >
                      Entrepreneurial
                    </span>
                    <span
                      className="px-2.5 py-1 text-xs border rounded-full"
                      style={{ fontFamily: "'Geist Mono', monospace", color: "rgba(16,185,129,0.8)", borderColor: "rgba(16,185,129,0.15)", backgroundColor: "rgba(16,185,129,0.05)" }}
                    >
                      AI-Powered
                    </span>
                    <span
                      className="px-2.5 py-1 text-xs border rounded-full"
                      style={{ fontFamily: "'Geist Mono', monospace", color: "rgba(14,165,233,0.8)", borderColor: "rgba(14,165,233,0.15)", backgroundColor: "rgba(14,165,233,0.05)" }}
                    >
                      Full-Stack
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: "rgba(239,68,68,0.6)" }} />
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: "rgba(234,179,8,0.6)" }} />
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: "rgba(34,197,94,0.6)" }} />
                    <span className="ml-2 text-xs text-neutral-500 truncate" style={{ fontFamily: "'Geist Mono', monospace" }}>
                      personal-projects/boutique-digital-catalog
                    </span>
                  </div>
                  <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-5">
                    End-to-end digital transformation for boutique retail — from raw product photos to a live web catalog. Built a Photoshop automation script for batch image processing, a Claude AI agent that reads images and populates an SQL database, and a full frontend catalog with dynamic filtering. Deployed for a real client: 33 products, 150+ images processed. Solo-built, production-ready, demo available.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["HTML", "CSS", "JS", "SQL", "Photoshop Scripting", "Claude AI Agent", "Automation", "Retail Tech"].map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-xs border rounded-md whitespace-nowrap"
                        style={{ fontFamily: "'Geist Mono', monospace", color: "rgba(167,139,250,0.8)", borderColor: "rgba(99,102,241,0.15)", backgroundColor: "rgba(99,102,241,0.05)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Pipeline mockup */}
                <PipelineMockup videoUrl={`${import.meta.env.BASE_URL}media/Demobutik.mp4`} />
              </div>
            </div>

            {/* Phase cards */}
            <div className="p-6 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    icon: <Workflow size={22} />,
                    label: "Photoshop Automation",
                    color: "text-amber-400",
                    border: "border-amber-500/20",
                    bg: { backgroundColor: "rgba(245,158,11,0.05)" },
                    content: "Custom Photoshop script batch-processes raw product photos — selection, background removal/generation and export — cutting manual photo prep from hours to seconds.",
                  },
                  {
                    icon: <Bot size={22} />,
                    label: "Claude AI Agent",
                    color: "text-violet-400",
                    border: "border-violet-500/20",
                    bg: { backgroundColor: "rgba(99,102,241,0.05)" },
                    content: "AI agent reads processed product images, extracts metadata (name, category, price, description), and populates the SQL database.",
                  },
                  {
                    icon: <Globe size={22} />,
                    label: "Database & Web Catalog",
                    color: "text-sky-400",
                    border: "border-sky-500/20",
                    bg: { backgroundColor: "rgba(14,165,233,0.05)" },
                    content: "SQL database serves as the single source of truth. Frontend web catalog dynamically queries and displays products with filtering, search, and responsive layout — built for real commercial use.",
                  },
                ].map((p, i) => (
                  <motion.div
                    key={i}
                    variants={item}
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className={`rounded-xl border ${p.border} p-5`}
                    style={p.bg}
                  >
                    <div className={`${p.color} mb-3`}>{p.icon}</div>
                    <h4 className={`text-sm font-semibold ${p.color} uppercase tracking-wider mb-3`} style={{ fontFamily: "'Geist Mono', monospace" }}>
                      {p.label}
                    </h4>
                    <p className="text-neutral-400 text-sm leading-relaxed">{p.content}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Other Projects grid */}
        <motion.div variants={item} className="mt-16">
          <h3 className="text-lg font-semibold text-white mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
            Other Projects
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              title: "Law Firm Website",
              desc: "Client-facing website built with HTML & CSS for a law firm. Focused on UX/UI performance, clear information architecture, and professional stakeholder communication.",
              tags: ["HTML", "CSS", "Client Work", "UX/UI"],
              icon: <Globe size={18} />,
              year: "2025",
            },
            {
              title: "University CS Projects",
              desc: "Built production-grade applications in Java, Python, and C covering optimization algorithms, data structures, OOP principles, and SQL database scalability.",
              tags: ["Java", "Python", "C", "SQL", "Algorithms"],
              icon: <Code2 size={18} />,
              year: "2024–present",
            },
          ].map((p, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -5, borderColor: "rgba(16,185,129,0.25)" }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-white/5 p-6 transition-colors duration-300 group relative overflow-hidden"
              style={{ backgroundColor: "#0a0a0a" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-emerald-500/70 group-hover:text-emerald-400 transition-colors">{p.icon}</div>
                <span className="text-xs text-neutral-600" style={{ fontFamily: "'Geist Mono', monospace" }}>{p.year}</span>
              </div>
              <h4 className="text-white font-semibold mb-2" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{p.title}</h4>
              <p className="text-neutral-500 text-sm leading-relaxed mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 text-xs text-neutral-500 border border-white/5 rounded whitespace-nowrap" style={{ fontFamily: "'Geist Mono', monospace" }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── SKILLS ─── */
function Skills() {
  const stack = [
    { icon: <Binary size={20} />, name: "Java", level: "Primary Language" },
    { icon: <Terminal size={20} />, name: "Python", level: "Primary Language" },
    { icon: <Code2 size={20} />, name: "C", level: "Systems Programming" },
    { icon: <Database size={20} />, name: "SQL", level: "Database Engineering" },
    { icon: <Globe size={20} />, name: "HTML / CSS", level: "Frontend" },
    { icon: <Layers size={20} />, name: "OOP", level: "Design Paradigm" },
    { icon: <Cpu size={20} />, name: "Algorithms & DS", level: "Core Foundations" },
    { icon: <MonitorSmartphone size={20} />, name: "Linux / Windows", level: "Systems" },
  ];

  const mastering = [
    { icon: <Bug size={18} />, label: "Manual QA Testing" },
    { icon: <TestTube2 size={18} />, label: "Automated Testing" },
    { icon: <Box size={18} />, label: "Test Case Design" },
    { icon: <Shield size={18} />, label: "QA Processes & Cycles" },
    { icon: <Zap size={18} />, label: "Agile Problem Solving" },
    { icon: <Layers size={18} />, label: "Scalability Analysis" },
  ];

  return (
    <Section id="skills" className="py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Skills & Growth</SectionLabel>
        <SectionTitle>
          <StaggerText text="Tech Stack" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }} />
        </SectionTitle>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stack.map((s, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -4, borderColor: "rgba(16,185,129,0.3)" }}
              transition={{ duration: 0.2 }}
              className="group rounded-xl border border-white/5 p-5 transition-all duration-300"
              style={{ backgroundColor: "#0a0a0a" }}
            >
              <div className="text-emerald-500/60 group-hover:text-emerald-400 transition-colors mb-3">{s.icon}</div>
              <p className="text-white font-semibold text-sm mb-1" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{s.name}</p>
              <p className="text-neutral-600 text-xs" style={{ fontFamily: "'Geist Mono', monospace" }}>{s.level}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={item}
          className="rounded-2xl border border-emerald-500/15 p-6 md:p-8"
          style={{ backgroundImage: "linear-gradient(to bottom right, rgba(16,185,129,0.05), transparent)" }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Sparkles className="text-emerald-400" size={20} />
            <h3 className="text-lg font-semibold text-white" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              Currently Mastering
            </h3>
            <span
              className="px-3 py-1 text-xs text-emerald-400 border border-emerald-500/20 rounded-full whitespace-nowrap"
              style={{ fontFamily: "'Geist Mono', monospace", backgroundColor: "rgba(16,185,129,0.05)" }}
            >
              QA Bootcamp · 2026 · IBM-iX
            </span>
          </div>
          <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-2xl">
            Enrolled in a QA Engineering bootcamp focused on software quality, automated testing pipelines, and agile problem-solving methodologies — because building scalable web solutions means knowing how to verify they work under every condition.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {mastering.map((m, i) => (
              <motion.div
                key={i}
                variants={item}
                className="flex items-center gap-2.5 px-4 py-3 rounded-lg border border-white/5"
                style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
              >
                <span className="text-emerald-400/70 flex-shrink-0">{m.icon}</span>
                <span className="text-neutral-300 text-xs">{m.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
          {[
            { flag: "🇭🇷", lang: "Croatian — Native" },
            { flag: "🇬🇧", lang: "English — Fluent" },
          ].map((l, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/5" style={{ backgroundColor: "#0a0a0a" }}>
              <span className="text-sm">{l.flag}</span>
              <span className="text-neutral-400 text-xs whitespace-nowrap">{l.lang}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ─── EXPERIENCE & EDUCATION ─── */
function Experience() {
  const timeline = [
    {
      type: "experience",
      icon: <Users size={18} />,
      title: "Member / Communication Officer",
      org: "EUSAIR Youth Council",
      period: "2024 – present",
      desc: "Coordinated an EU-funded mentorship initiative within the EUSAIR for 32 young participants and 4 mentors, focused on entrepreneurship, IT skills for entry-level roles, CV development, and financial literacy.",
    },
    {
      type: "project",
      icon: <ShoppingBag size={18} />,
      title: "Co-Founder — Boutique Digital Catalogs",
      org: "Entrepreneurial Initiative",
      period: "2026",
      desc: "Built an end-to-end digital catalog system: Photoshop automation script for batch image processing, Claude AI agent for database population from product photos, SQL database, and full frontend catalog. 33 products, 150+ images.",
    },
    {
      type: "project",
      icon: <Globe size={18} />,
      title: "Website Development — Law Firm",
      org: "Freelance Project",
      period: "2025",
      desc: "Delivered a client-facing website using HTML and CSS, applying quality assurance practices and independent problem-solving while managing professional stakeholder communication.",
    },
    {
      type: "education",
      icon: <GraduationCap size={18} />,
      title: "B.Sc. Computer Science",
      org: "Faculty of Electrical Engineering and Computing (FER), University of Zagreb",
      period: "2024 – present",
      desc: "Core coursework in programming (Java, Python, C), optimization algorithms & data structures, databases, and object-oriented design with scalability focus.",
    },
    {
      type: "education",
      icon: <BookOpen size={18} />,
      title: "Natural Sciences & Mathematics Program",
      org: "Antun Vrančić Grammar School, Šibenik",
      period: "2020 – 2024",
      desc: "Strong analytical and mathematical foundations underpinning current engineering and problem-solving approach.",
    },
  ];

  return (
    <Section id="experience" className="py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Background</SectionLabel>
        <SectionTitle>
          <StaggerText text="Education & Experience" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }} />
        </SectionTitle>

        <div className="relative">
          <div className="absolute top-2 bottom-2 w-px" style={{ left: "19px", backgroundColor: "rgba(255,255,255,0.05)" }} />
          <div className="space-y-8">
            {timeline.map((t, i) => (
              <motion.div
                key={i}
                variants={item}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="relative"
                style={{ paddingLeft: "3.5rem" }}
              >
                <div
                  className="absolute top-1 w-3.5 h-3.5 rounded-full border-2"
                  style={{
                    left: "10px",
                    borderColor: t.type === "education" ? "rgba(16,185,129,0.4)" : "rgba(14,165,233,0.4)",
                    backgroundColor: t.type === "education" ? "rgba(16,185,129,0.1)" : "rgba(14,165,233,0.1)",
                  }}
                />
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className={t.type === "education" ? "text-emerald-400/70" : "text-sky-400/70"}>{t.icon}</span>
                  <h4 className="text-white font-semibold text-sm" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{t.title}</h4>
                  <span className="text-xs text-neutral-600" style={{ fontFamily: "'Geist Mono', monospace" }}>{t.period}</span>
                </div>
                <p className="text-xs mb-2" style={{ color: "rgba(16,185,129,0.6)" }}>{t.org}</p>
                <p className="text-neutral-500 text-sm leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── CONTACT ─── */
function Contact() {
  return (
    <Section id="contact" className="py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <SectionLabel>Get in Touch</SectionLabel>
        <SectionTitle>
          <StaggerText text="Let's Connect" style={{ fontFamily: "'Instrument Serif', Georgia, serif", justifyContent: "center" }} />
        </SectionTitle>

        <motion.p
          variants={item}
          className="text-neutral-400 text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed"
        >
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap justify-center gap-4 mb-12">
          <MagneticButton
            href="mailto:lara.sare.hr@gmail.com"
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-lg border border-white/10 text-neutral-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300 text-sm"
            style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
          >
            <Mail size={16} /> lara.sare.hr@gmail.com
          </MagneticButton>
          <MagneticButton
            href="tel:+385955634919"
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-lg border border-white/10 text-neutral-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300 text-sm"
            style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
          >
            <Phone size={16} /> +385 95 563 4919
          </MagneticButton>
        </motion.div>

        <motion.div variants={item} className="flex justify-center gap-5">
          {[
            { icon: <GitHub size={20} />, href: "https://github.com/12lara5", label: "GitHub" },
            { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/lara-š-465330224", label: "LinkedIn" },
          ].map((s, i) => (
            <MagneticButton
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-lg border border-white/5 flex items-center justify-center text-neutral-500 hover:text-emerald-400 hover:border-emerald-500/20 transition-all duration-300"
              style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
            >
              {s.icon}
            </MagneticButton>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-neutral-600" style={{ fontFamily: "'Geist Mono', monospace" }}>
          © 2026 Lara Šare. 
        </p>
        <p className="text-xs text-neutral-700" style={{ fontFamily: "'Geist Mono', monospace" }}>
          Designed to impress.
        </p>
      </div>
    </footer>
  );
}

/* ─── APP ─── */
export default function Portfolio() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div className="min-h-screen text-white" style={{ background: "#050505", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(16,185,129,0.3); color: white; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #10b981; }
      `}</style>
      <StaticBackground />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <ProjectSpotlight />
        <Skills />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}