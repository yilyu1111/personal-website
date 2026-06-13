import { motion } from "motion/react";
import { Briefcase, GraduationCap, Wrench, Database, BarChart2, Code, Network, Activity } from "lucide-react";

const G = {
  background: "rgba(255,255,255,0.18)",
  border: "1px solid rgba(255,255,255,0.45)",
  backdropFilter: "blur(28px) saturate(180%)",
  WebkitBackdropFilter: "blur(28px) saturate(180%)",
  boxShadow: "0 8px 32px rgba(0,80,60,0.18), inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(255,255,255,0.1)",
};

const EXPERIENCE = [
  {
    role: "Business Analyst / Product Manager",
    company: "HealthTech Solutions Inc.",
    period: "2022 – Present",
    location: "Vancouver, BC",
    color: "#3a7d52",
    bullets: [
      "Led extraction and consolidation of 14+ months of fragmented technical support ticket data across 6 legacy systems, reducing data gaps by 91%.",
      "Designed a bucketed response-time statistical model identifying 3 operational patterns, cutting SLA breach rate by 28%.",
      "Drove go-live of enterprise SaaS payroll module for 400+ employees; authored training playbooks adopted company-wide.",
      "Built mentorship program onboarding framework matching 60 pairs in Q1 with 94% satisfaction score.",
    ],
  },
  {
    role: "Data & Systems Analyst",
    company: "Programmable Engines Corp.",
    period: "2020 – 2022",
    location: "Remote",
    color: "#2d7a87",
    bullets: [
      "Built automated SQL pipelines to cleanse and standardize healthcare datasets spanning 2M+ patient records.",
      "Produced statistical models for device network frequency band compatibility, enabling entry into 3 new regional markets.",
      "Translated complex business requirements into programmable engine logic in close collaboration with engineering.",
    ],
  },
  {
    role: "Junior Business Analyst",
    company: "Pacific Analytics Group",
    period: "2018 – 2020",
    location: "Vancouver, BC",
    color: "#7a6e9e",
    bullets: [
      "Developed dashboards tracking KPIs for 5 enterprise clients, automating weekly reporting that previously took 12 hours.",
      "Conducted mobile hardware spec and international network band analysis for client device procurement decisions.",
    ],
  },
];

const SKILLS = [
  { icon: Database,   label: "SQL & Data Warehousing",          level: 95, color: "#3a7d52" },
  { icon: BarChart2,  label: "Statistical Modeling (R / Python)", level: 88, color: "#2d7a87" },
  { icon: Code,       label: "Python — Pandas, NumPy",           level: 85, color: "#7a6e9e" },
  { icon: Network,    label: "UX Design",                         level: 82, color: "#3a7d52" },
  { icon: Activity,   label: "SaaS Product Management",          level: 90, color: "#2d7a87" },
  { icon: Wrench,     label: "Business Process Design",          level: 92, color: "#7a9e3a" },
];

const TOOLS = ["SQL", "Python", "R", "Pandas", "NumPy", "Tableau", "dbt", "Airflow", "JIRA", "Confluence", "Figma", "Excel"];

export function Resume() {
  return (
    <div className="w-full min-h-full py-8 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-7">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "#3a7d52", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Professional Profile
          </p>
          <h1 style={{ fontFamily: "'Lora', serif", fontSize: "2rem", fontWeight: 600, color: "#1a3020", marginTop: 3 }}>
            Resume
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.87rem", color: "#1a3520", marginTop: 5, maxWidth: 520, lineHeight: 1.65 }}>
            Under construction. My experience is real, but this page is still loading.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Timeline ── */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <div className="flex items-center gap-2 mb-5">
                <Briefcase size={15} style={{ color: "#3a7d52" }} />
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#1a3020", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Experience
                </p>
              </div>
            </motion.div>

            <div className="relative flex flex-col gap-5 pl-6">
              <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, #3a7d52, transparent)", opacity: 0.35 }} />

              {EXPERIENCE.map((exp, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }} className="relative">
                  <div className="absolute -left-9 top-4 w-3 h-3 rounded-full"
                    style={{ background: exp.color, border: "2px solid white", boxShadow: `0 0 10px ${exp.color}55` }} />

                  <div className="rounded-2xl p-5" style={G}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <h3 style={{ fontFamily: "'Lora', serif", fontSize: "1rem", fontWeight: 600, color: "#1a3020" }}>
                          {exp.role}
                        </h3>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.81rem", color: exp.color, fontWeight: 500, marginTop: 1 }}>
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: "#3d5c45" }}>{exp.period}</p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: "#3d5c45", marginTop: 1 }}>{exp.location}</p>
                      </div>
                    </div>
                    <ul className="mt-3 flex flex-col gap-2">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="flex gap-2">
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: exp.color }} />
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.81rem", color: "#152a1a", lineHeight: 1.62 }}>{b}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="flex flex-col gap-5">

            {/* Education */}
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="rounded-2xl p-5" style={G}>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap size={15} style={{ color: "#3a7d52" }} />
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#1a3020", textTransform: "uppercase", letterSpacing: "0.08em" }}>Education</p>
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "#3d5c45", fontStyle: "italic", lineHeight: 1.6 }}>
                Details coming soon...
              </p>
            </motion.div>

            {/* Skills */}
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="rounded-2xl p-5" style={G}>
              <div className="flex items-center gap-2 mb-4">
                <Wrench size={15} style={{ color: "#3a7d52" }} />
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#1a3020", textTransform: "uppercase", letterSpacing: "0.08em" }}>Skills</p>
              </div>
              <div className="flex flex-col gap-4">
                {SKILLS.map(({ icon: Icon, label, level, color }, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <Icon size={12} style={{ color, opacity: 0.8 }} />
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.76rem", color: "#152a1a" }}>{label}</p>
                      </div>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.66rem", color: "#3d5c45" }}>{level}%</p>
                    </div>
                    <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(40,80,50,0.08)" }}>
                      <motion.div
                        initial={{ width: 0 }} animate={{ width: `${level}%` }}
                        transition={{ duration: 0.9, delay: 0.45 + i * 0.06, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Toolbox */}
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="rounded-2xl p-5" style={G}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#1a3020", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Toolbox</p>
              <div className="flex flex-wrap gap-1.5">
                {TOOLS.map(t => (
                  <span key={t} style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem",
                    color: "#3a7d52", background: "rgba(58,125,82,0.08)",
                    border: "1px solid rgba(58,125,82,0.2)", borderRadius: 6, padding: "3px 8px",
                  }}>{t}</span>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
