import { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

/* ═══════════════════════════════════════════════════
   SHARED UTILITIES
═══════════════════════════════════════════════════ */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function SectionLabel({ text }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", border: "1.5px solid #e4d9ff", borderRadius: "9px", padding: "7px 16px", fontSize: "12px", color: "#3b1f7a", fontWeight: 700, marginBottom: "16px", boxShadow: "0 2px 12px rgba(124,58,237,0.10)", letterSpacing: "0.08em" }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#7c3aed"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
      {text}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */
const CATEGORIES = [
  {
    key: "healthcare",
    label: "Healthcare",
    tagline: "AI-Powered Medical Careers",
    description: "Master the future of healthcare administration with AI-driven tools and industry-recognized certifications. Our healthcare programs are designed with practicing professionals and built around real clinical workflows.",
    activeColor: "#1e3a8a",
    accentLight: "#eff6ff",
    accentBorder: "#bfdbfe",
    badgeBg: "#1e3a8a",
    cardBg: "linear-gradient(145deg,#eff6ff 0%,#dbeafe 100%)",
    courses: [
      {
        id: "hc1",
        title: "AI Medical Coding",
        badge: "100% Success Rate",
        duration: "3 Months",
        mode: "Online / Offline",
        level: "Beginner to Advanced",
        image: "healthcare1.png",
        overview: "Become a certified AI Medical Coder with hands-on training in ICD-10, CPT, HCPCS coding systems combined with AI automation tools. Learn real-world case studies from hospitals and clinics.",
        modules: [
          "Introduction to Medical Terminology & Anatomy",
          "ICD-10-CM Diagnosis Coding",
          "CPT Procedural Coding",
          "HCPCS Level II Coding",
          "AI-Powered Coding Tools & Automation",
          "Compliance & HIPAA Regulations",
          "Mock Tests & CPC Exam Preparation",
        ],
        outcomes: [
          "Certified Professional Coder (CPC) Readiness",
          "Proficiency in AI coding software",
          "Live project experience with 50+ case studies",
          "Job placement within 30 days of certification",
        ],
        highlights: ["Industry-recognized certificate", "Live case studies", "Interview preparation", "100% job assistance"],
      },
      {
        id: "hc2",
        title: "AI Medical Billing",
        badge: "100% Success Rate",
        duration: "3 Months",
        mode: "Online / Offline",
        level: "Beginner to Advanced",
        image: "healthcare1.png",
        overview: "Learn end-to-end revenue cycle management with AI billing platforms. From claim submission to denial management, this course builds real billing expertise for hospitals, clinics, and insurance companies.",
        modules: [
          "Revenue Cycle Management Overview",
          "Insurance Verification & Eligibility",
          "Claim Submission & Processing",
          "Denial Management & Appeals",
          "AI Billing Software (AdvancedMD, Kareo)",
          "Accounts Receivable Follow-Up",
          "CMS Guidelines & Compliance",
        ],
        outcomes: [
          "Expertise in end-to-end billing workflows",
          "Hands-on experience with live billing software",
          "Certified Medical Billing Specialist credential",
          "Guaranteed placement support with 120+ partners",
        ],
        highlights: ["Live billing software training", "Denial management labs", "Mock billing cycles", "100% job assistance"],
      },
      {
        id: "hc3",
        title: "AI Medical Scribing",
        badge: "100% Success Rate",
        duration: "2 Months",
        mode: "Online / Offline",
        level: "Beginner",
        image: "healthcare1.png",
        overview: "Develop expertise in clinical documentation and AI-assisted medical scribing. Learn how to accurately capture physician encounters using EHR systems and emerging AI transcription technologies.",
        modules: [
          "Clinical Documentation Fundamentals",
          "EHR Systems — Epic, Cerner, eClinicalWorks",
          "Medical Terminology for Scribing",
          "AI Transcription & Voice Recognition Tools",
          "SOAP Note Writing & Chart Review",
          "HIPAA Compliance in Documentation",
          "Live Scribing Simulations",
        ],
        outcomes: [
          "Proficiency in major EHR platforms",
          "Certified Medical Scribe credential",
          "Real-time documentation speed and accuracy",
          "Direct placement with hospital networks",
        ],
        highlights: ["EHR lab access", "Live physician simulations", "AI transcription tools", "100% job assistance"],
      },
    ],
  },
  {
    key: "technology",
    label: "Technology",
    tagline: "Build, Deploy & Scale",
    description: "Gain in-demand technical skills through project-based learning. Our technology programs are built around real industry requirements, equipping you to design, develop, and deliver production-grade applications.",
    activeColor: "#c2410c",
    accentLight: "#fff7ed",
    accentBorder: "#fed7aa",
    badgeBg: "#c2410c",
    cardBg: "linear-gradient(145deg,#fff7ed 0%,#ffedd5 100%)",
    courses: [
      {
        id: "tc1",
        title: "Full Stack Development",
        badge: null,
        duration: "6 Months",
        mode: "Online / Offline",
        level: "Beginner to Advanced",
        image: "technology1.png",
        overview: "A comprehensive full-stack program covering both MERN and MEAN stacks. You will build and deploy complete web applications — from database architecture to responsive frontends — guided by senior industry engineers.",
        modules: [
          "HTML5, CSS3 & Responsive Design",
          "JavaScript ES6+ & TypeScript",
          "React.js with Hooks & Redux",
          "Node.js & Express.js",
          "MongoDB & SQL Databases",
          "REST APIs & GraphQL",
          "DevOps Basics — Docker, CI/CD, AWS Deployment",
        ],
        outcomes: [
          "Portfolio of 5+ deployed full-stack projects",
          "Proficiency in MERN and MEAN stacks",
          "GitHub profile with real production code",
          "Placement with top product and service companies",
        ],
        highlights: ["5+ live projects", "GitHub portfolio build", "System design sessions", "Placement guarantee"],
      },
      {
        id: "tc2",
        title: "Data Analytics",
        badge: null,
        duration: "4 Months",
        mode: "Online / Offline",
        level: "Beginner to Intermediate",
        image: "technology1.png",
        overview: "Learn to extract, analyze, and visualize data to drive business decisions. This program covers the entire analytics workflow — from data wrangling to dashboard creation — using tools that top companies rely on daily.",
        modules: [
          "Python for Data Analysis — Pandas, NumPy",
          "SQL for Analytics & Query Optimization",
          "Data Visualization — Matplotlib, Seaborn, Tableau",
          "Power BI Dashboards & Reports",
          "Statistics & Probability Foundations",
          "Machine Learning Fundamentals",
          "Capstone Project with Real Datasets",
        ],
        outcomes: [
          "Hands-on experience with real business datasets",
          "Tableau and Power BI certification readiness",
          "End-to-end analytics project in portfolio",
          "Placement support with analytics-focused firms",
        ],
        highlights: ["Real business datasets", "Tableau & Power BI labs", "ML foundation modules", "Placement assistance"],
      },
      {
        id: "tc3",
        title: "UI/UX Design",
        badge: null,
        duration: "3 Months",
        mode: "Online / Offline",
        level: "Beginner to Advanced",
        image: "technology1.png",
        overview: "Master the principles of user-centered design and build a professional design portfolio. Learn the complete design workflow from user research and wireframing to high-fidelity prototyping using industry-standard tools.",
        modules: [
          "Design Thinking & User Research",
          "Information Architecture & Wireframing",
          "Figma — Components, Auto Layout, Prototyping",
          "Visual Design Principles & Typography",
          "Interaction Design & Micro-animations",
          "Usability Testing & Heuristic Evaluation",
          "Portfolio Project — End-to-End Product Design",
        ],
        outcomes: [
          "Professional Figma design portfolio",
          "Research-to-prototype design workflow expertise",
          "Usability testing and iteration skills",
          "Placement with product teams and agencies",
        ],
        highlights: ["Figma mastery", "End-to-end product case study", "User testing labs", "Portfolio review sessions"],
      },
    ],
  },
  {
    key: "finance",
    label: "Finance",
    tagline: "Precision Financial Expertise",
    description: "Build a strong foundation in financial systems, accounting, and enterprise software. Our finance programs prepare you for roles in accounting, ERP consulting, and financial reporting with globally recognized tools.",
    activeColor: "#14532d",
    accentLight: "#f0fdf4",
    accentBorder: "#bbf7d0",
    badgeBg: "#14532d",
    cardBg: "linear-gradient(145deg,#f0fdf4 0%,#dcfce7 100%)",
    courses: [
      {
        id: "fc1",
        title: "SAP Development",
        badge: null,
        duration: "5 Months",
        mode: "Online / Offline",
        level: "Beginner to Advanced",
        image: "finance1.png",
        overview: "Become a certified SAP ABAP developer with deep expertise in enterprise application development. Learn to build, customize, and optimize SAP modules used by Fortune 500 companies worldwide.",
        modules: [
          "SAP Architecture & Navigation",
          "ABAP Programming Fundamentals",
          "Data Dictionary — Tables, Views, Domains",
          "Reports, ALV Programming",
          "Function Modules & BAPIs",
          "SAP Enhancements & User Exits",
          "SAP Fiori & UI5 Basics",
        ],
        outcomes: [
          "SAP ABAP developer certification readiness",
          "Hands-on SAP system access throughout the program",
          "Real-world module customization projects",
          "Placement with SAP consulting and implementation firms",
        ],
        highlights: ["Live SAP system access", "ABAP project labs", "SAP Fiori introduction", "Consulting firm placements"],
      },
      {
        id: "fc2",
        title: "Tally & GST",
        badge: null,
        duration: "2 Months",
        mode: "Online / Offline",
        level: "Beginner",
        image: "finance1.png",
        overview: "Master Tally Prime and the complete GST filing process for Indian businesses. This practical program is ideal for accounting professionals, business owners, and finance graduates seeking immediate employability.",
        modules: [
          "Tally Prime — Company Creation & Configuration",
          "Accounting Vouchers & Journal Entries",
          "Inventory Management in Tally",
          "GST Setup, Returns (GSTR-1, 3B, 9)",
          "TDS & TCS in Tally",
          "Payroll Processing",
          "MIS Reports & Financial Statements",
        ],
        outcomes: [
          "Tally Prime proficiency with live company data",
          "Complete GST return filing expertise",
          "Tally-certified professional credential",
          "Placement with CAs, firms, and SMEs",
        ],
        highlights: ["Live company data practice", "GST portal access", "Tally certification prep", "CA firm placements"],
      },
      {
        id: "fc3",
        title: "Financial Accounting",
        badge: null,
        duration: "3 Months",
        mode: "Online / Offline",
        level: "Beginner to Intermediate",
        image: "finance1.png",
        overview: "Build a thorough foundation in financial accounting principles, IFRS standards, and financial reporting. Designed for commerce graduates and professionals seeking to strengthen their core accounting competence.",
        modules: [
          "Accounting Principles & Standards (GAAP/IFRS)",
          "Journal, Ledger & Trial Balance",
          "Financial Statements — P&L, Balance Sheet, Cash Flow",
          "Bank Reconciliation & Accounts Receivable",
          "Depreciation, Provisions & Accruals",
          "Cost Accounting Basics",
          "Financial Ratio Analysis & Interpretation",
        ],
        outcomes: [
          "Strong IFRS and GAAP reporting foundation",
          "Hands-on financial statement preparation",
          "Analytical skills for finance roles",
          "Placement with accounting and audit firms",
        ],
        highlights: ["IFRS standards coverage", "Statement preparation labs", "Ratio analysis workshops", "Audit firm placements"],
      },
    ],
  },
];

const CONTACT_COURSES = [
  "AI Medical Coding", "AI Medical Billing", "AI Medical Scribing",
  "Full Stack Development", "Data Analytics", "UI/UX Design",
  "SAP Development", "Tally & GST", "Financial Accounting",
];

/* ═══════════════════════════════════════════════════
   COUNSELOR MODAL
═══════════════════════════════════════════════════ */
function CounselorModal({ onClose, defaultCourse }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", course: defaultCourse || "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.phone.trim() || form.phone.length < 8) e.phone = "Invalid number";
    if (!form.course) e.course = "Please select a course";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1400);
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(15,4,38,0.72)", backdropFilter: "blur(6px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: "28px", padding: "44px 40px", width: "100%", maxWidth: "480px", position: "relative", boxShadow: "0 32px 80px rgba(124,58,237,0.28)", animation: "modalPop 0.38s cubic-bezier(.34,1.56,.64,1) both" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg,#7c3aed,#a78bfa,#ff6b35,#7c3aed)", backgroundSize: "300% 100%", animation: "shimmer 3s linear infinite", borderRadius: "28px 28px 0 0" }} />
        <button onClick={onClose} style={{ position: "absolute", top: "18px", right: "18px", width: "32px", height: "32px", borderRadius: "50%", background: "#f3f0ff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", color: "#7c3aed" }}>x</button>
        {submitted ? (
          <div style={{ textAlign: "center", padding: "12px 0" }}>
            <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#5b21b6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", boxShadow: "0 8px 28px rgba(124,58,237,0.35)" }}>
              <svg width="30" height="30" viewBox="0 0 32 32" fill="none"><path d="M7 16l7 7 11-12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h3 style={{ fontSize: "22px", fontWeight: 900, color: "#1a0640", marginBottom: "10px", fontFamily: "'Outfit',sans-serif" }}>We will Call You Soon!</h3>
            <p style={{ fontSize: "14px", color: "#6b5a9e", lineHeight: 1.7, fontFamily: "'Outfit',sans-serif" }}>Our counselors will reach you within 24 hours.</p>
            <button onClick={onClose} style={{ marginTop: "22px", background: "linear-gradient(135deg,#7c3aed,#5b21b6)", border: "none", color: "#fff", borderRadius: "50px", padding: "11px 28px", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>Close</button>
          </div>
        ) : (
          <>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#f3f0ff", border: "1.5px solid #e4d9ff", borderRadius: "8px", padding: "6px 14px", fontSize: "11.5px", color: "#7c3aed", fontWeight: 700, marginBottom: "14px", letterSpacing: "0.08em" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#7c3aed"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              FREE COUNSELING
            </div>
            <h3 style={{ fontSize: "26px", fontWeight: 900, color: "#1a0640", marginBottom: "5px", letterSpacing: "-0.4px", fontFamily: "'Outfit',sans-serif" }}>Talk to Our Experts</h3>
            <p style={{ fontSize: "13.5px", color: "#9270c0", marginBottom: "26px", fontWeight: 500, fontFamily: "'Outfit',sans-serif" }}>Fill in your details and we will get back to you within 24 hours.</p>
            {[{ label: "Your full name", key: "name", type: "text" }, { label: "Email address", key: "email", type: "email" }, { label: "Phone number", key: "phone", type: "tel" }].map(f => (
              <div key={f.key} style={{ marginBottom: "13px" }}>
                <input type={f.type} placeholder={f.label} value={form[f.key]} onChange={e => { setForm({ ...form, [f.key]: e.target.value }); setErrors({ ...errors, [f.key]: "" }); }}
                  style={{ width: "100%", padding: "13px 16px", fontSize: "14px", fontFamily: "'Outfit',sans-serif", fontWeight: 500, color: "#1a0640", background: errors[f.key] ? "#fff5f5" : "#f8f5ff", border: `1.5px solid ${errors[f.key] ? "#ef4444" : "#e4d9ff"}`, borderRadius: "12px", outline: "none" }}
                  onFocus={e => { e.target.style.borderColor = "#7c3aed"; e.target.style.boxShadow = "0 0 0 4px rgba(124,58,237,0.09)"; }}
                  onBlur={e => { e.target.style.borderColor = errors[f.key] ? "#ef4444" : "#e4d9ff"; e.target.style.boxShadow = "none"; }} />
                {errors[f.key] && <div style={{ fontSize: "11px", color: "#ef4444", marginTop: "3px", fontFamily: "'Outfit',sans-serif" }}>{errors[f.key]}</div>}
              </div>
            ))}
            <div style={{ marginBottom: "22px", position: "relative" }}>
              <select value={form.course} onChange={e => { setForm({ ...form, course: e.target.value }); setErrors({ ...errors, course: "" }); }}
                style={{ width: "100%", padding: "13px 16px", fontSize: "14px", fontFamily: "'Outfit',sans-serif", fontWeight: 500, color: form.course ? "#1a0640" : "#9270c0", background: "#f8f5ff", border: `1.5px solid ${errors.course ? "#ef4444" : "#e4d9ff"}`, borderRadius: "12px", outline: "none", appearance: "none" }}>
                <option value="">Select a course</option>
                {CONTACT_COURSES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#9270c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              {errors.course && <div style={{ fontSize: "11px", color: "#ef4444", marginTop: "3px", fontFamily: "'Outfit',sans-serif" }}>{errors.course}</div>}
            </div>
            <button onClick={handleSubmit} disabled={submitting} style={{ width: "100%", background: "linear-gradient(135deg,#ff6b35,#f03e00)", color: "#fff", border: "none", borderRadius: "50px", padding: "15px 30px", fontSize: "15px", fontWeight: 800, fontFamily: "'Outfit',sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", boxShadow: "0 6px 22px rgba(255,80,0,0.35)", transition: "all 0.22s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(255,80,0,0.45)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 22px rgba(255,80,0,0.35)"; }}>
              {submitting ? "Sending..." : "Book Free Counseling Session"}
              {!submitting && <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE HERO — Courses Offered
═══════════════════════════════════════════════════ */
function CoursesHero({ onEnroll }) {
  return (
    <section style={{ background: "radial-gradient(ellipse 80% 70% at 70% 40%,rgba(167,139,250,0.18) 0%,transparent 70%),radial-gradient(ellipse 50% 60% at 10% 80%,rgba(124,58,237,0.1) 0%,transparent 65%),#faf8ff", padding: "96px 6% 72px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />

      {/* Decorative ring */}
      <div style={{ position: "absolute", right: "-120px", top: "-120px", width: "520px", height: "520px", borderRadius: "50%", border: "1.5px solid rgba(124,58,237,0.08)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: "-60px", top: "-60px", width: "360px", height: "360px", borderRadius: "50%", border: "1px solid rgba(124,58,237,0.06)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ animation: "fadeRight .6s ease forwards", opacity: 0, animationDelay: ".05s" }}>
          <SectionLabel text="COURSES OFFERED" />
        </div>
        <h1 style={{ fontSize: "clamp(2.4rem,5vw,3.8rem)", fontWeight: 900, lineHeight: 1.08, color: "#120630", letterSpacing: "-1.5px", marginBottom: "22px", maxWidth: "720px", animation: "fadeUp .65s ease forwards", opacity: 0, animationDelay: ".15s" }}>
          Industry-Ready Programs<br />
          <span style={{ color: "#7c3aed" }}>Built for Real Careers</span>
        </h1>
        <p style={{ fontSize: "16px", color: "#5c4a80", lineHeight: 1.8, maxWidth: "560px", marginBottom: "36px", animation: "fadeUp .65s ease forwards", opacity: 0, animationDelay: ".28s" }}>
          Every course at Skillra is crafted around current industry demands, taught by professionals with 15+ years of field experience, and backed by a 100% placement commitment.
        </p>
        <div style={{ display: "flex", gap: "28px", flexWrap: "wrap", animation: "fadeUp .65s ease forwards", opacity: 0, animationDelay: ".40s" }}>
          {[{ num: "9", label: "Programs" }, { num: "3", label: "Domains" }, { num: "500+", label: "Students Placed" }, { num: "120+", label: "Hiring Partners" }].map((s, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "clamp(1.6rem,2.5vw,2.1rem)", fontWeight: 900, color: "#7c3aed", lineHeight: 1, letterSpacing: "-1px" }}>{s.num}</span>
              <span style={{ fontSize: "12px", color: "#9270c0", marginTop: "3px", fontWeight: 600, letterSpacing: "0.04em" }}>{s.label}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "40px", display: "flex", gap: "14px", flexWrap: "wrap", animation: "fadeUp .65s ease forwards", opacity: 0, animationDelay: ".52s" }}>
          <button onClick={onEnroll} style={{ background: "linear-gradient(135deg,#ff6b35 0%,#f03e00 100%)", color: "#fff", border: "none", borderRadius: "32px", padding: "15px 32px", fontSize: "13.5px", fontWeight: 800, cursor: "pointer", letterSpacing: ".5px", boxShadow: "0 6px 22px rgba(255,80,0,.38)", transition: "all 0.22s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 34px rgba(255,80,0,.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 22px rgba(255,80,0,.38)"; }}>
            TALK TO OUR COUNSELORS
          </button>
          <a href="#courses-list" style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1.5px solid #c4b5fd", color: "#7c3aed", background: "transparent", borderRadius: "32px", padding: "15px 28px", fontSize: "13.5px", fontWeight: 700, cursor: "pointer", textDecoration: "none", transition: "all 0.22s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(124,58,237,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
            Explore Courses
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 3l4 4-4 4M3 7h8" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   DOMAIN OVERVIEW STRIP
═══════════════════════════════════════════════════ */
function DomainStrip() {
  const [ref, inView] = useInView(0.1);
  const domains = [
    { label: "Healthcare", sub: "3 Programs", color: "#1e3a8a", bg: "#eff6ff", border: "#bfdbfe" },
    { label: "Technology", sub: "3 Programs", color: "#c2410c", bg: "#fff7ed", border: "#fed7aa" },
    { label: "Finance", sub: "3 Programs", color: "#14532d", bg: "#f0fdf4", border: "#bbf7d0" },
  ];
  return (
    <div ref={ref} style={{ background: "#fff", borderTop: "1px solid #f0ebff", padding: "32px 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {domains.map((d, i) => (
          <a key={i} href={`#cat-${d.label.toLowerCase()}`} style={{ flex: "1 1 200px", background: d.bg, border: `1.5px solid ${d.border}`, borderRadius: "16px", padding: "20px 24px", display: "flex", alignItems: "center", gap: "16px", textDecoration: "none", cursor: "pointer", transition: "all 0.25s", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transitionDelay: `${i * 0.1}s` }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${d.color}22`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: d.color, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: d.color, fontFamily: "'Outfit',sans-serif" }}>{d.label}</div>
              <div style={{ fontSize: "12px", color: "#9270c0", marginTop: "2px", fontWeight: 600, fontFamily: "'Outfit',sans-serif" }}>{d.sub}</div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8h8M8 4l4 4-4 4" stroke={d.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SINGLE COURSE CARD — expanded detail
═══════════════════════════════════════════════════ */
function CourseCard({ course, cat, idx, onEnroll }) {
  const [ref, inView] = useInView(0.07);
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div ref={ref} id={`course-${course.id}`}
      style={{ background: "#fff", border: `1.5px solid ${hovered ? cat.activeColor + "44" : "#e4d9ff"}`, borderRadius: "24px", overflow: "hidden", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.65s ease ${idx * 0.12}s, transform 0.65s ease ${idx * 0.12}s, border-color 0.25s, box-shadow 0.25s`, boxShadow: hovered ? `0 20px 52px ${cat.activeColor}18` : "0 4px 18px rgba(124,58,237,0.07)", cursor: "default" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>

      {/* Top image band */}
      <div style={{ position: "relative", height: "200px", overflow: "hidden", background: cat.cardBg }}>
        {course.badge && (
          <div style={{ position: "absolute", top: 0, right: 0, fontSize: "11px", fontWeight: 800, padding: "7px 18px", borderRadius: "0 24px 0 16px", color: "#fff", background: cat.badgeBg, zIndex: 2 }}>{course.badge}</div>
        )}
        <img src={course.image} alt={course.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block", transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.5s" }}
          onError={e => { e.target.style.display = "none"; }} />
        {/* Meta pills over image bottom */}
        <div style={{ position: "absolute", bottom: "12px", left: "14px", display: "flex", gap: "7px", flexWrap: "wrap" }}>
          {[course.duration, course.mode, course.level].map((m, mi) => (
            <span key={mi} style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(8px)", borderRadius: "20px", padding: "4px 12px", fontSize: "11px", fontWeight: 700, color: cat.activeColor, fontFamily: "'Outfit',sans-serif" }}>{m}</span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "24px 26px 0" }}>
        <h3 style={{ fontSize: "20px", fontWeight: 900, color: cat.activeColor, marginBottom: "10px", fontFamily: "'Outfit',sans-serif", lineHeight: 1.2, transition: "color 0.25s" }}>{course.title}</h3>
        <p style={{ fontSize: "13.5px", color: "#5a5275", lineHeight: 1.75, marginBottom: "18px", fontFamily: "'Outfit',sans-serif" }}>{course.overview}</p>

        {/* Highlights */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "18px" }}>
          {course.highlights.map((h, hi) => (
            <span key={hi} style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: cat.accentLight, border: `1px solid ${cat.accentBorder}`, borderRadius: "20px", padding: "5px 13px", fontSize: "11.5px", color: cat.activeColor, fontWeight: 700, fontFamily: "'Outfit',sans-serif" }}>
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 4-4" stroke={cat.activeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {h}
            </span>
          ))}
        </div>

        {/* Expandable curriculum */}
        <div style={{ borderTop: `1.5px solid ${cat.accentBorder}`, marginBottom: "0" }}>
          <button onClick={() => setExpanded(x => !x)} style={{ width: "100%", background: "none", border: "none", padding: "14px 0", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: "13px", color: cat.activeColor, letterSpacing: "0.03em" }}>
            <span>COURSE MODULES</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>
              <path d="M4 6l4 4 4-4" stroke={cat.activeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div style={{ maxHeight: expanded ? "600px" : "0", overflow: "hidden", transition: "max-height 0.42s cubic-bezier(0.4,0,0.2,1)" }}>
            <div style={{ paddingBottom: "16px" }}>
              {course.modules.map((m, mi) => (
                <div key={mi} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "7px 0", borderBottom: mi < course.modules.length - 1 ? `1px solid ${cat.accentBorder}` : "none" }}>
                  <div style={{ minWidth: "22px", height: "22px", borderRadius: "50%", background: cat.accentLight, border: `1.5px solid ${cat.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                    <span style={{ fontSize: "10px", fontWeight: 800, color: cat.activeColor, fontFamily: "'Outfit',sans-serif" }}>{String(mi + 1).padStart(2, "0")}</span>
                  </div>
                  <span style={{ fontSize: "13px", color: "#3b2a6e", lineHeight: 1.6, fontFamily: "'Outfit',sans-serif", fontWeight: 500 }}>{m}</span>
                </div>
              ))}
            </div>

            {/* Outcomes */}
            <div style={{ background: cat.accentLight, border: `1.5px solid ${cat.accentBorder}`, borderRadius: "14px", padding: "16px 18px", marginBottom: "16px" }}>
              <div style={{ fontSize: "11.5px", fontWeight: 800, color: cat.activeColor, letterSpacing: "0.08em", marginBottom: "10px", fontFamily: "'Outfit',sans-serif" }}>LEARNING OUTCOMES</div>
              {course.outcomes.map((o, oi) => (
                <div key={oi} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: oi < course.outcomes.length - 1 ? "7px" : "0" }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ marginTop: "2px", flexShrink: 0 }}><path d="M3 8l4 4 6-6" stroke={cat.activeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span style={{ fontSize: "13px", color: "#3b2a6e", lineHeight: 1.6, fontFamily: "'Outfit',sans-serif" }}>{o}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ padding: "16px 26px 24px", display: "flex", gap: "10px", alignItems: "center" }}>
        <button onClick={() => onEnroll(course.title)} style={{ flex: 1, background: cat.activeColor, color: "#fff", border: "none", borderRadius: "50px", padding: "12px 20px", fontSize: "12.5px", fontWeight: 800, cursor: "pointer", fontFamily: "'Outfit',sans-serif", letterSpacing: "0.4px", transition: "all 0.22s", boxShadow: `0 4px 14px ${cat.activeColor}44` }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 10px 26px ${cat.activeColor}55`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 14px ${cat.activeColor}44`; }}>
          ENROLL NOW
        </button>
        <button onClick={() => onEnroll(course.title)} style={{ background: "transparent", border: `1.5px solid ${cat.accentBorder}`, borderRadius: "50px", padding: "12px 18px", fontSize: "12.5px", fontWeight: 700, cursor: "pointer", color: cat.activeColor, fontFamily: "'Outfit',sans-serif", transition: "all 0.22s" }}
          onMouseEnter={e => { e.currentTarget.style.background = cat.accentLight; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
          Free Counseling
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   CATEGORY SECTION
═══════════════════════════════════════════════════ */
function CategorySection({ cat, onEnroll }) {
  const [headerRef, headerInView] = useInView(0.08);

  return (
    <section id={`cat-${cat.key}`} style={{ padding: "80px 0", background: cat.key === "technology" ? "#faf8ff" : "#fff", borderTop: "1px solid #f0ebff", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>

        {/* Category header */}
        <div ref={headerRef} style={{ marginBottom: "48px", opacity: headerInView ? 1 : 0, transform: headerInView ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: cat.accentLight, border: `1.5px solid ${cat.accentBorder}`, borderRadius: "9px", padding: "7px 16px", fontSize: "12px", color: cat.activeColor, fontWeight: 700, marginBottom: "16px", letterSpacing: "0.08em" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: cat.activeColor }} />
            {cat.label.toUpperCase()}
          </div>
          <h2 style={{ fontSize: "clamp(1.9rem,3.5vw,2.7rem)", fontWeight: 900, fontFamily: "'Outfit',sans-serif", color: "#120630", letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: "14px" }}>
            {cat.label} <span style={{ color: cat.activeColor, fontStyle: "italic" }}>Programs</span>
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
            <p style={{ fontSize: "14.5px", color: "#6b5a9e", fontFamily: "'Outfit',sans-serif", maxWidth: "600px", lineHeight: 1.75, margin: 0 }}>{cat.description}</p>
            <div style={{ display: "flex", gap: "6px", marginLeft: "auto", flexShrink: 0 }}>
              <div style={{ height: "6px", width: "6px", borderRadius: "50%", background: cat.activeColor, opacity: 1 }} />
              <div style={{ height: "6px", width: "6px", borderRadius: "50%", background: cat.activeColor, opacity: 0.5 }} />
              <div style={{ height: "6px", width: "6px", borderRadius: "50%", background: cat.activeColor, opacity: 0.25 }} />
            </div>
          </div>
        </div>

        {/* Course cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(330px,1fr))", gap: "28px" }}>
          {cat.courses.map((course, idx) => (
            <CourseCard key={course.id} course={course} cat={cat} idx={idx} onEnroll={onEnroll} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   WHY SKILLRA SECTION
═══════════════════════════════════════════════════ */
function WhySkillraSection() {
  const [ref, inView] = useInView(0.08);
  const pillars = [
    { title: "15+ Years Experienced Trainers", desc: "Every instructor brings deep industry experience, teaching what actually gets you hired — not just theory.", color: "#7c3aed", bg: "#f3f0ff", border: "#e4d9ff" },
    { title: "Live Project-Based Learning", desc: "Real case studies, live simulations, and hands-on labs. You graduate with work you are genuinely proud to show employers.", color: "#c2410c", bg: "#fff7ed", border: "#fed7aa" },
    { title: "Tamper-Proof Digital Certificates", desc: "Our blockchain-verified certificates are recognized and verifiable by any employer globally with a single scan.", color: "#1e3a8a", bg: "#eff6ff", border: "#bfdbfe" },
    { title: "Dedicated Placement Cell", desc: "A full-time placement team works 1-on-1 with each student — resume building, mock interviews, and employer connects.", color: "#14532d", bg: "#f0fdf4", border: "#bbf7d0" },
    { title: "Flexible Online & Offline Modes", desc: "Learn at our training center or remotely with live sessions, recordings, and full access to mentor support.", color: "#7c3aed", bg: "#f3f0ff", border: "#e4d9ff" },
    { title: "100% Placement Guarantee", desc: "We do not stop until you are placed. Our track record of 98% placement rate is backed by 120+ active hiring partners.", color: "#c2410c", bg: "#fff7ed", border: "#fed7aa" },
  ];
  return (
    <section ref={ref} style={{ padding: "80px 0", background: "#faf8ff", borderTop: "1px solid #f0ebff", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "48px", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <SectionLabel text="WHY SKILLRA" />
          <h2 style={{ fontSize: "clamp(1.9rem,3.5vw,2.7rem)", fontWeight: 900, fontFamily: "'Outfit',sans-serif", color: "#120630", letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: "14px" }}>
            What Makes Us <span style={{ color: "#7c3aed", fontStyle: "italic" }}>Different</span>
          </h2>
          <p style={{ fontSize: "14.5px", color: "#6b5a9e", fontFamily: "'Outfit',sans-serif", maxWidth: "560px", lineHeight: 1.75 }}>
            Our training philosophy is built around one purpose — getting you a job. Every element of our programs, from curriculum design to placement support, is engineered for outcomes.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "20px" }}>
          {pillars.map((p, i) => (
            <div key={i} style={{ background: p.bg, border: `1.5px solid ${p.border}`, borderRadius: "20px", padding: "28px 26px", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: `all 0.65s ease ${i * 0.09}s`, cursor: "default" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${p.color}18`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: "40px", height: "4px", background: p.color, borderRadius: "99px", marginBottom: "18px" }} />
              <h4 style={{ fontSize: "15px", fontWeight: 800, color: p.color, marginBottom: "10px", fontFamily: "'Outfit',sans-serif", lineHeight: 1.3 }}>{p.title}</h4>
              <p style={{ fontSize: "13.5px", color: "#5a5275", lineHeight: 1.75, fontFamily: "'Outfit',sans-serif", margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   ADMISSION PROCESS SECTION
═══════════════════════════════════════════════════ */
function AdmissionSection({ onEnroll }) {
  const [ref, inView] = useInView(0.08);
  const steps = [
    { num: "01", title: "Free Counseling Session", desc: "Talk to our expert counselors to identify the right course based on your background, goals, and timeline." },
    { num: "02", title: "Course Enrollment", desc: "Choose your preferred mode — online or offline — and complete the enrollment with our team's support." },
    { num: "03", title: "Training Begins", desc: "Attend live sessions, access study materials, participate in projects, and get mentorship from day one." },
    { num: "04", title: "Certification", desc: "Complete assessments to earn your tamper-proof digital certificate recognized by employers nationwide." },
    { num: "05", title: "Placement Support", desc: "Our dedicated placement cell activates and works alongside you until you land your first offer." },
  ];
  return (
    <section ref={ref} style={{ padding: "80px 0", background: "#fff", borderTop: "1px solid #f0ebff", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "48px", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <SectionLabel text="HOW IT WORKS" />
          <h2 style={{ fontSize: "clamp(1.9rem,3.5vw,2.7rem)", fontWeight: 900, fontFamily: "'Outfit',sans-serif", color: "#120630", letterSpacing: "-0.03em", lineHeight: 1.08 }}>
            Your Path From <span style={{ color: "#7c3aed", fontStyle: "italic" }}>Enrollment to Employment</span>
          </h2>
        </div>
        <div style={{ position: "relative" }}>
          {/* Connector line */}
          <div style={{ position: "absolute", top: "32px", left: "31px", width: "2px", height: "calc(100% - 64px)", background: "linear-gradient(180deg,#7c3aed,#c4b5fd,#e4d9ff)", zIndex: 0 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {steps.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: "28px", alignItems: "flex-start", padding: "0 0 32px", position: "relative", zIndex: 1, opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-24px)", transition: `all 0.65s ease ${i * 0.1}s` }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: i === 0 ? "linear-gradient(135deg,#7c3aed,#5b21b6)" : "#fff", border: `2.5px solid ${i === 0 ? "#7c3aed" : "#e4d9ff"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: i === 0 ? "0 8px 24px rgba(124,58,237,0.35)" : "0 2px 12px rgba(124,58,237,0.08)" }}>
                  <span style={{ fontSize: "14px", fontWeight: 900, color: i === 0 ? "#fff" : "#7c3aed", fontFamily: "'Outfit',sans-serif" }}>{s.num}</span>
                </div>
                <div style={{ paddingTop: "12px" }}>
                  <h4 style={{ fontSize: "16px", fontWeight: 800, color: "#1a0640", marginBottom: "6px", fontFamily: "'Outfit',sans-serif" }}>{s.title}</h4>
                  <p style={{ fontSize: "13.5px", color: "#6b5a9e", lineHeight: 1.75, fontFamily: "'Outfit',sans-serif", maxWidth: "540px" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: "12px", opacity: inView ? 1 : 0, transition: "opacity 0.7s ease 0.55s" }}>
          <button onClick={() => onEnroll("")} style={{ background: "linear-gradient(135deg,#ff6b35 0%,#f03e00 100%)", color: "#fff", border: "none", borderRadius: "32px", padding: "15px 32px", fontSize: "13.5px", fontWeight: 800, cursor: "pointer", letterSpacing: ".5px", boxShadow: "0 6px 22px rgba(255,80,0,.38)", transition: "all 0.22s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 34px rgba(255,80,0,.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 22px rgba(255,80,0,.38)"; }}>
            START YOUR JOURNEY TODAY
          </button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   NEWSLETTER (copied from template)
═══════════════════════════════════════════════════ */
function NewsletterSection() {
  const [ref, inView] = useInView(0.3);
  const [email, setEmail] = useState(""), [subscribed, setSubscribed] = useState(false), [subscribing, setSubscribing] = useState(false);
  const handleSubscribe = () => { if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return; setSubscribing(true); setTimeout(() => { setSubscribing(false); setSubscribed(true); }, 1400); };
  return (
    <div ref={ref} style={{ background: "linear-gradient(135deg,#6d28d9,#7c3aed,#6d28d9)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.10) 1px,transparent 1px)", backgroundSize: "22px 22px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg,#06b6d4,#22d3ee,#67e8f9,#22d3ee,#06b6d4)", backgroundSize: "200% 100%", animation: "shimmer 3s linear infinite" }} />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "36px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "36px", flexWrap: "wrap", position: "relative", zIndex: 1, opacity: inView ? 1 : 0, transition: "opacity 0.8s ease" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ width: "46px", height: "46px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", animation: "spinRingAnim 6s linear infinite" }}>
            <svg width="40" height="40" viewBox="0 0 46 46" fill="none"><path d="M23 4v38M4 23h38M8 8l30 30M38 8L8 38" stroke="rgba(255,255,255,0.85)" strokeWidth="3.5" strokeLinecap="round" /></svg>
          </div>
          <div>
            <h2 style={{ fontSize: "clamp(1.2rem,2.2vw,1.6rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "5px", fontFamily: "'Outfit',sans-serif" }}>Join Our Newsletter</h2>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", fontWeight: 500, fontFamily: "'Outfit',sans-serif" }}>Subscribe to get our latest updates and news.</p>
          </div>
        </div>
        {subscribed ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: "12px", padding: "12px 20px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>
            </div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "14px", fontFamily: "'Outfit',sans-serif" }}>You are subscribed!</span>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubscribe()} placeholder="Enter your email"
              style={{ height: "48px", width: "clamp(200px,26vw,300px)", padding: "0 16px", fontSize: "14px", fontFamily: "'Outfit',sans-serif", fontWeight: 500, color: "#1a0640", background: "rgba(255,255,255,0.96)", border: "2px solid rgba(255,255,255,0.7)", borderRadius: "12px", outline: "none" }} />
            <button onClick={handleSubscribe} disabled={subscribing} style={{ height: "48px", background: "#111", color: "#fff", border: "none", borderRadius: "12px", padding: "0 24px", fontSize: "14px", fontWeight: 700, fontFamily: "'Outfit',sans-serif", cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "8px", transition: "all 0.22s" }}>
              {subscribing ? "Subscribing..." : "Subscribe Now"}
              {!subscribing && <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════ */
export default function CoursesOfferedPage() {
  const [modal, setModal] = useState({ open: false, course: "" });
  const openModal = (course) => setModal({ open: true, course });
  const closeModal = () => setModal({ open: false, course: "" });

  return (
    <div style={{ fontFamily: "'Outfit','Segoe UI',sans-serif", margin: 0, padding: 0, paddingTop: "62px", overflowX: "hidden", background: "#faf8ff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html,body{overflow-x:hidden;}

        @keyframes fadeUp    {from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeRight {from{opacity:0;transform:translateX(-22px)}to{opacity:1;transform:translateX(0)}}
        @keyframes shimmer   {0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes spinRingAnim{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes modalPop  {from{opacity:0;transform:scale(0.88) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}

        @media(max-width:768px){
          section > div, div[style*="maxWidth:1280"] {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }
      `}</style>

      {modal.open && <CounselorModal onClose={closeModal} defaultCourse={modal.course} />}

      <NavBar />
      <CoursesHero onEnroll={() => openModal("")} />
      <DomainStrip />

      <div id="courses-list">
        {CATEGORIES.map(cat => (
          <CategorySection key={cat.key} cat={cat} onEnroll={openModal} />
        ))}
      </div>

      <WhySkillraSection />
      <AdmissionSection onEnroll={openModal} />
      <NewsletterSection />
      <Footer />
    </div>
  );
}