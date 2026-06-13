import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, Twitter, Mountain, Code2, ChevronRight, MapPin, Quote } from "lucide-react";
import { motion } from "motion/react";

/* ── Shared glass style ── bright white frosted cards */
const G = {
  background: "rgba(255,255,255,0.18)",
  border: "1px solid rgba(255,255,255,0.45)",
  backdropFilter: "blur(28px) saturate(180%)",
  WebkitBackdropFilter: "blur(28px) saturate(180%)",
  boxShadow: "0 8px 32px rgba(0,80,60,0.18), inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(255,255,255,0.1)",
};

const QUOTES = [
  { text: "The mountains are calling and I must go.", author: "John Muir" },
  { text: "In every walk with nature, one receives far more than he seeks.", author: "John Muir" },
  { text: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
  { text: "Data is the new oil, but insight is the refined product.", author: "Anonymous" },
];

interface LandingProps {
  onNavigate: (page: "resume" | "blog" | "outdoors" | "projects") => void;
}

const NAV_ITEMS = [
  { icon: Code2,    label: "Resume", sub: "Experience & Skills", page: "resume" as const, accent: "#3a7d52", bg: "rgba(58,125,82,0.12)", bd: "rgba(58,125,82,0.28)" },
  { icon: Mountain, label: "Blog",   sub: "Tech · Outdoors · Life", page: "blog" as const, accent: "#2d7a87", bg: "rgba(45,122,135,0.12)", bd: "rgba(45,122,135,0.28)" },
];

const SOCIALS = [
  { icon: Github,   href: "https://github.com",          label: "GitHub"   },
  { icon: Linkedin, href: "https://linkedin.com",         label: "LinkedIn" },
  { icon: Twitter,  href: "https://twitter.com",          label: "Twitter"  },
  { icon: Mail,     href: "mailto:hello@alexchen.dev",    label: "Email"    },
];

export function Landing({ onNavigate }: LandingProps) {
  const [time, setTime] = useState(new Date());
  const [qi] = useState(() => Math.floor(Math.random() * QUOTES.length));

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const hh = time.getHours().toString().padStart(2, "0");
  const mm = time.getMinutes().toString().padStart(2, "0");
  const ss = time.getSeconds().toString().padStart(2, "0");
  const dateStr = time.toLocaleDateString("en-CA", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="w-full h-full flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-5">

        {/* ── Left column ── */}
        <motion.div
          initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="lg:col-span-2 flex flex-col gap-4"
        >
          {/* Profile card */}
          <div className="rounded-3xl p-6 flex flex-col items-center text-center gap-4" style={G}>

            {/* Avatar */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1759434188872-c33c531746a9?w=200&h=200&fit=crop&auto=format"
                alt="Forest sunrise — profile placeholder"
                className="w-24 h-24 rounded-full object-cover"
                style={{ border: "3px solid rgba(255,255,255,0.85)", boxShadow: "0 4px 16px rgba(40,80,50,0.18)" }}
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full"
                style={{ background: "#3a7d52", border: "2px solid white", boxShadow: "0 2px 6px rgba(58,125,82,0.5)" }} />
            </div>

            {/* Identity */}
            <div>
              <h1 style={{ fontFamily: "'Lora', serif", fontSize: "1.45rem", fontWeight: 600, color: "#1a3020" }}>
                Alex Chen
              </h1>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.81rem", fontWeight: 500, color: "#3a7d52", marginTop: 3 }}>
                Business Analyst · Data Enthusiast
              </p>
              <div className="flex items-center justify-center gap-1 mt-1.5" style={{ color: "#2a4530" }}>
                <MapPin size={11} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.74rem" }}>Vancouver, BC</span>
              </div>
            </div>

            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.83rem", color: "#152a1a", lineHeight: 1.65 }}>
              Turning messy data into clear decisions. Hiking Quarry Rock on weekends. Math grad who never stopped counting.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="transition-all duration-200"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 36, height: 36, borderRadius: "50%",
                    background: "rgba(255,255,255,0.65)",
                    border: "1px solid rgba(255,255,255,0.85)",
                    color: "#2a4530",
                    boxShadow: "0 2px 8px rgba(40,80,50,0.08)",
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#3a7d52"; el.style.background = "rgba(255,255,255,0.92)"; el.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#2a4530"; el.style.background = "rgba(255,255,255,0.65)"; el.style.transform = ""; }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quote card */}
          <div className="rounded-3xl p-5 flex flex-col gap-3" style={G}>
            <Quote size={17} style={{ color: "#3a7d52", opacity: 0.55 }} />
            <p style={{ fontFamily: "'Lora', serif", fontSize: "0.87rem", fontStyle: "italic", color: "#1a3020", lineHeight: 1.7 }}>
              {QUOTES[qi].text}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "#2a4530" }}>
              — {QUOTES[qi].author}
            </p>
          </div>
        </motion.div>

        {/* ── Right column ── */}
        <div className="lg:col-span-3 flex flex-col gap-4">

          {/* Clock */}
          <motion.div
            initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="rounded-3xl p-5" style={G}
          >
            <div className="flex items-end justify-between">
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "2.9rem", fontWeight: 500, color: "#1a3020", letterSpacing: "-0.02em", lineHeight: 1 }}>
                  {hh}<span style={{ color: "#3a7d52", opacity: 0.5 }}>:</span>{mm}
                  <span style={{ color: "#2a4530", fontSize: "1.5rem" }}>:{ss}</span>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.77rem", color: "#2a4530", marginTop: 5 }}>
                  {dateStr}
                </p>
              </div>
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(58,125,82,0.1)", border: "1px solid rgba(58,125,82,0.2)" }}>
                <Mountain size={20} style={{ color: "#3a7d52" }} />
              </div>
            </div>
          </motion.div>

          {/* Navigation — two prominent cards */}
          <div className="grid grid-cols-2 gap-4">
            {NAV_ITEMS.map(({ icon: Icon, label, sub, page, accent, bg, bd }, i) => (
              <motion.button
                key={label}
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22 + i * 0.1 }}
                onClick={() => onNavigate(page)}
                className="rounded-3xl text-left transition-all duration-200"
                style={{ ...G, cursor: "pointer", padding: "1.5rem" }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.28)";
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.18)";
                  el.style.transform = "";
                }}
              >
                {/* Icon row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{ background: bg, border: `1px solid ${bd}` }}>
                    <Icon size={20} style={{ color: accent }} />
                  </div>
                  <ChevronRight size={15} style={{ color: accent, opacity: 0.7 }} />
                </div>
                {/* Label */}
                <p style={{ fontFamily: "'Lora', serif", fontSize: "1.25rem", fontWeight: 600, color: "#1a3020", marginBottom: 4 }}>
                  {label}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.76rem", color: "#2a4530", lineHeight: 1.5 }}>
                  {sub}
                </p>
                {/* Subtle bottom accent line */}
                <div className="mt-5 h-0.5 rounded-full w-8" style={{ background: accent, opacity: 0.45 }} />
              </motion.button>
            ))}
          </div>

          {/* Recent activity */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="rounded-3xl p-5" style={G}
          >
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", fontWeight: 600, color: "#3d5c45", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
              Recent Activity
            </p>
            <div className="flex flex-col gap-3">
              {[
                { dot: "#3a7d52", text: "Published: \"Bucketing Response Times in SQL\"", time: "2d ago" },
                { dot: "#2d7a87", text: "Hiked Quarry Rock — 8.4 km trail", time: "4d ago" },
                { dot: "#7a9e3a", text: "Updated Healthcare Data Pipeline docs", time: "1w ago" },
              ].map(({ dot, text, time }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: dot }} />
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.81rem", color: "#152a1a", flex: 1 }}>{text}</p>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.66rem", color: "#3d5c45", flexShrink: 0 }}>{time}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
