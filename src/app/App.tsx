import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, FileText, BookOpen, ChevronLeft } from "lucide-react";
import { Landing } from "./components/Landing";
import { Resume } from "./components/Resume";
import { Blog } from "./components/Blog";
import { CustomCursor } from "./components/CustomCursor";

{/* MARKER-MAKE-KIT-INVOKED */}

type Page = "home" | "resume" | "blog";
type BlogCategory = "all" | "tech" | "outdoors" | "projects" | "creative";

const NAV = [
  { page: "home" as Page, icon: Home, label: "Home" },
  { page: "resume" as Page, icon: FileText, label: "Resume" },
  { page: "blog" as Page, icon: BookOpen, label: "Blog" },
];

/* Sunset mountain layers — orange sky fading to blue, ideal glassmorphism backdrop */
const BG_IMAGE =
  "https://images.unsplash.com/photo-1599499332779-fda0f231964d?w=1920&h=1080&fit=crop&auto=format";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [blogCategory, setBlogCategory] = useState<BlogCategory>("all");

  function navigateToBlog(category: BlogCategory = "all") {
    setBlogCategory(category);
    setPage("blog");
  }

  return (
    <div className="w-full min-h-screen relative flex flex-col" style={{ fontFamily: "'Inter', sans-serif", cursor: "none" }}>
      <CustomCursor />

      {/* ── Background ── bright misty nature photo, barely tinted */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${BG_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
          backgroundAttachment: "fixed",
        }}
        aria-hidden="true"
      >
        {/* ultra-light overlay — just enough to soften, photo colors stay vivid */}
        <div className="absolute inset-0" style={{ background: "rgba(20,10,30,0.08)" }} />
      </div>

      {/* ── Navbar — white frosted glass ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-8"
        style={{
          height: 56,
          background: "rgba(255,255,255,0.2)",
          borderBottom: "1px solid rgba(255,255,255,0.75)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          boxShadow: "0 1px 24px rgba(50,90,60,0.08)",
        }}
      >
        <button
          onClick={() => setPage("home")}
          className="flex items-center gap-2"
          style={{ cursor: "pointer", background: "none", border: "none", padding: 0 }}
        >
          {page !== "home" && <ChevronLeft size={15} style={{ color: "#3a7d52" }} />}
          <span style={{ fontFamily: "'Lora', serif", fontSize: "1.05rem", fontWeight: 600, color: "#1a3020" }}>
            Alex Chen
          </span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem",
            color: "#3a7d52",
            background: "rgba(58,125,82,0.1)",
            border: "1px solid rgba(58,125,82,0.22)",
            borderRadius: 5,
            padding: "2px 7px",
          }}>
            BA · Data
          </span>
        </button>

        <nav className="flex items-center gap-1">
          {NAV.map(({ page: p, icon: Icon, label }) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-200"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 500,
                background: page === p ? "rgba(58,125,82,0.12)" : "transparent",
                border: page === p ? "1px solid rgba(58,125,82,0.28)" : "1px solid transparent",
                color: page === p ? "#3a7d52" : "#1a3520",
                cursor: "pointer",
              }}
            >
              <Icon size={14} />
              <span className="hidden md:inline">{label}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* ── Main ── */}
      <main className="relative z-10 flex-1 pt-[56px] overflow-y-auto" style={{ minHeight: "100vh" }}>
        <AnimatePresence mode="wait">

          {page === "home" && (
            <motion.div key="home"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full min-h-[calc(100vh-56px)] flex items-center"
            >
              <Landing onNavigate={(dest) => {
                if (dest === "blog") navigateToBlog("all");
                else if (dest === "outdoors") navigateToBlog("outdoors");
                else if (dest === "projects") navigateToBlog("projects");
                else setPage(dest as Page);
              }} />
            </motion.div>
          )}

          {page === "resume" && (
            <motion.div key="resume"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="w-full min-h-[calc(100vh-56px)]"
            >
              <Resume />
            </motion.div>
          )}

          {page === "blog" && (
            <motion.div key="blog"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="w-full min-h-[calc(100vh-56px)]"
            >
              <Blog initialCategory={blogCategory} onCategoryChange={setBlogCategory} />
            </motion.div>
          )}


        </AnimatePresence>
      </main>
    </div>
  );
}
