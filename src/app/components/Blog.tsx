import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FlaskConical, Trees, Sparkles, Clock, ArrowUpRight, Tag, Bike, BarChart2 } from "lucide-react";

const G = {
  background: "rgba(255,255,255,0.18)",
  border: "1px solid rgba(255,255,255,0.45)",
  backdropFilter: "blur(28px) saturate(180%)",
  WebkitBackdropFilter: "blur(28px) saturate(180%)",
  boxShadow: "0 8px 32px rgba(0,80,60,0.18), inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(255,255,255,0.1)",
};

export type BlogCategory = "all" | "tech" | "outdoors" | "projects" | "creative";

const CATEGORY_META: Record<Exclude<BlogCategory, "all">, { color: string; bg: string; bd: string }> = {
  tech:     { color: "#3a7d52", bg: "rgba(58,125,82,0.09)",    bd: "rgba(58,125,82,0.22)"    },
  outdoors: { color: "#2d7a87", bg: "rgba(45,122,135,0.09)",   bd: "rgba(45,122,135,0.22)"   },
  projects: { color: "#6a5acd", bg: "rgba(106,90,205,0.09)",   bd: "rgba(106,90,205,0.22)"   },
  creative: { color: "#9e6a3a", bg: "rgba(158,106,58,0.09)",   bd: "rgba(158,106,58,0.22)"   },
};

const POSTS = [
  {
    id: 1, category: "tech" as const,
    title: "Bucketing Response Times: A Statistical Approach to Support Ticket Triage",
    excerpt: "How I used histogram binning and KS tests to find three hidden operational patterns buried in 14 months of fragmented ticket data.",
    tags: ["SQL", "Statistics", "SaaS"],
    date: "Jun 09, 2026", readTime: "8 min",
    image: "https://images.unsplash.com/photo-1766939179898-f7e747d2624e?w=600&h=340&fit=crop&auto=format",
    imageAlt: "Misty hills at dawn",
  },
  {
    id: 2, category: "outdoors" as const,
    title: "Quarry Rock in the Rain: A Wednesday Morning Trail Report",
    excerpt: "A misty weekday hike up Deep Cove's most popular trail, the smell of cedar after rain, and why I prefer the mountain on quiet days.",
    tags: ["Hiking", "Deep Cove", "Vancouver"],
    date: "Jun 03, 2026", readTime: "5 min",
    image: "https://images.unsplash.com/photo-1759434188872-c33c531746a9?w=600&h=340&fit=crop&auto=format",
    imageAlt: "Misty forest at sunrise",
  },
  {
    id: 3, category: "projects" as const,
    title: "Building a Healthcare Data Pipeline: From 2M Dirty Records to Clean Gold",
    excerpt: "How I designed an end-to-end SQL + Python ETL pipeline to standardize patient records across disparate source systems with near-zero data loss.",
    tags: ["Python", "SQL", "ETL", "Healthcare"],
    date: "May 30, 2026", readTime: "12 min",
    image: "https://images.unsplash.com/photo-1764954967900-423d417bbfbc?w=600&h=340&fit=crop&auto=format",
    imageAlt: "Lush green misty mountains",
  },
  {
    id: 4, category: "tech" as const,
    title: "Mobile Frequency Bands Demystified: Which Phones Actually Work Globally",
    excerpt: "A breakdown of B2, B4, B7, B28, and n78 — why your North American device may be useless in Southeast Asia, and how to check before you go.",
    tags: ["Hardware", "Mobile", "Networks"],
    date: "May 20, 2026", readTime: "9 min",
    image: "https://images.unsplash.com/photo-1762178044046-b4d81bb6c4ee?w=600&h=340&fit=crop&auto=format",
    imageAlt: "Blue layered mountains in mist",
  },
  {
    id: 5, category: "outdoors" as const,
    title: "Crabbing at Nanaimo: A First Timer's Complete Field Notes",
    excerpt: "Gear list, tide tables, trap placement strategies, and what to do with a haul of Dungeness crab at 6am on a Saturday.",
    tags: ["Nanaimo", "Crabbing", "BC Coast"],
    date: "May 12, 2026", readTime: "7 min",
    image: "https://images.unsplash.com/photo-1762457189347-9061d9687390?w=600&h=340&fit=crop&auto=format",
    imageAlt: "Misty rolling hills at sunrise",
  },
  {
    id: 6, category: "projects" as const,
    title: "Open-Source SaaS KPI Dashboard: Design & Architecture Notes",
    excerpt: "A walkthrough of how I built a recharts-powered analytics dashboard that replaced 12 hours of manual weekly reporting for five enterprise clients.",
    tags: ["React", "Recharts", "Dashboard"],
    date: "May 05, 2026", readTime: "10 min",
    image: "https://images.unsplash.com/photo-1759476313158-5f5064f66b8a?w=600&h=340&fit=crop&auto=format",
    imageAlt: "Turquoise lake aerial view",
  },
  {
    id: 7, category: "creative" as const,
    title: "AI-Generated Visual Identity: Six Months of Prompt Engineering",
    excerpt: "Building a consistent personal visual language with Midjourney and DALL-E — the prompts, the failures, and the unexpected wins.",
    tags: ["AI Art", "Midjourney", "Design"],
    date: "Apr 28, 2026", readTime: "11 min",
    image: "https://images.unsplash.com/photo-1762457189347-9061d9687390?w=600&h=340&fit=crop&auto=format&crop=top",
    imageAlt: "Soft misty hills",
  },
  {
    id: 8, category: "outdoors" as const,
    title: "Stanley Park DIRT Crew: A Season of Trail Maintenance",
    excerpt: "What I learned volunteering with the DIRT crew — plant ecology, erosion patterns, and why the roots under your feet matter more than the view.",
    tags: ["Volunteering", "Stanley Park", "Ecology"],
    date: "Apr 15, 2026", readTime: "6 min",
    image: "https://images.unsplash.com/photo-1764954967900-423d417bbfbc?w=600&h=340&fit=crop&auto=format&crop=left",
    imageAlt: "Green mountain forest",
  },
  {
    id: 9, category: "creative" as const,
    title: "Niacinamide vs Retinol: Reading the Science Behind the Hype",
    excerpt: "A data-nerd's analysis of 40+ ingredient studies. What the evidence actually says, and how to stack these compounds without irritation.",
    tags: ["Skincare", "Science", "Health"],
    date: "Apr 05, 2026", readTime: "8 min",
    image: "https://images.unsplash.com/photo-1766939179898-f7e747d2624e?w=600&h=340&fit=crop&auto=format&crop=bottom",
    imageAlt: "Soft dawn hills",
  },
];

const TABS: { key: BlogCategory; label: string; icon: typeof Tag }[] = [
  { key: "all",      label: "All",         icon: Tag          },
  { key: "tech",     label: "Tech & Data",  icon: FlaskConical },
  { key: "outdoors", label: "Outdoors",     icon: Trees        },
  { key: "projects", label: "Projects",     icon: BarChart2    },
  { key: "creative", label: "Creative",     icon: Sparkles     },
];

interface BlogProps {
  initialCategory?: BlogCategory;
  onCategoryChange?: (c: BlogCategory) => void;
}

export function Blog({ initialCategory = "all", onCategoryChange }: BlogProps) {
  const [active, setActive] = useState<BlogCategory>(initialCategory);

  useEffect(() => {
    setActive(initialCategory);
  }, [initialCategory]);

  function handleTab(c: BlogCategory) {
    setActive(c);
    onCategoryChange?.(c);
  }

  const filtered = active === "all" ? POSTS : POSTS.filter(p => p.category === active);

  return (
    <div className="w-full min-h-full py-8 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-7">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "#3a7d52", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Writing
          </p>
          <h1 style={{ fontFamily: "'Lora', serif", fontSize: "2rem", fontWeight: 600, color: "#1a3020", marginTop: 3 }}>
            Blog
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.87rem", color: "#1a3520", marginTop: 5, lineHeight: 1.65 }}>
            Thoughts on data, technology, trail conditions, and the occasional tangent.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex gap-2 flex-wrap mb-7">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => handleTab(key)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all duration-200"
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 500,
                cursor: "pointer",
                background: active === key ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.18)",
                border: active === key ? "1px solid rgba(255,255,255,0.65)" : "1px solid rgba(255,255,255,0.35)",
                color: active === key ? "#1a3020" : "#2a4530",
                backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                boxShadow: active === key ? "0 4px 12px rgba(0,80,60,0.12), inset 0 1px 0 rgba(255,255,255,0.6)" : "none",
              }}>
              <Icon size={13} />
              {label}
            </button>
          ))}
        </motion.div>

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((post, i) => {
              const meta = CATEGORY_META[post.category];
              return (
                <motion.article key={post.id} layout
                  initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="rounded-2xl overflow-hidden group cursor-pointer transition-all duration-200"
                  style={G}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-4px)"; el.style.background = "rgba(255,255,255,0.26)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.background = "rgba(255,255,255,0.18)"; }}
                >
                  {/* Cover image */}
                  <div className="relative h-40 overflow-hidden" style={{ background: "#c8dcc9" }}>
                    <img src={post.image} alt={post.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.08))" }} />
                    <span className="absolute top-3 left-3" style={{
                      fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", fontWeight: 600,
                      color: meta.color, background: "rgba(255,255,255,0.82)",
                      border: `1px solid ${meta.bd}`, borderRadius: 6,
                      padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.07em",
                      backdropFilter: "blur(8px)",
                    }}>
                      {post.category}
                    </span>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.88)" }}>
                        <ArrowUpRight size={13} style={{ color: "#1a3020" }} />
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="p-4">
                    <h2 style={{ fontFamily: "'Lora', serif", fontSize: "0.93rem", fontWeight: 600, color: "#1a3020", lineHeight: 1.45, marginBottom: 6 }}>
                      {post.title}
                    </h2>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.77rem", color: "#1a3520", lineHeight: 1.62, marginBottom: 10 }}>
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.map(t => (
                        <span key={t} style={{
                          fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem",
                          color: meta.color, background: meta.bg,
                          border: `1px solid ${meta.bd}`, borderRadius: 4, padding: "1px 6px",
                        }}>#{t}</span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#2a4530" }}>{post.date}</span>
                      <span style={{ color: "rgba(40,80,50,0.25)" }}>·</span>
                      <div className="flex items-center gap-1">
                        <Clock size={11} style={{ color: "#2a4530" }} />
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "#2a4530" }}>{post.readTime} read</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
