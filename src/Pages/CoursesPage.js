import { useEffect, useRef, useState } from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";

const PUB = process.env.PUBLIC_URL || "";

/* ══════════════════════════════════════════════════════
   INTERSECTION OBSERVER HOOK
══════════════════════════════════════════════════════ */
function useInView(threshold = 0.08) {
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

/* ══════════════════════════════════════════════════════
   STAR RATING
══════════════════════════════════════════════════════ */
function StarRating({ rating = 4.7 }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={i <= full ? "#f59e0b" : (i === full + 1 && half ? "url(#half)" : "#e5e7eb")}
            stroke={i <= full || (i === full + 1 && half) ? "#f59e0b" : "#e5e7eb"}
            strokeWidth="0.5"
          />
          {i === full + 1 && half && (
            <defs>
              <linearGradient id="half" x1="0" x2="1" y1="0" y2="0">
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#e5e7eb" />
              </linearGradient>
            </defs>
          )}
        </svg>
      ))}
      <span style={{ fontSize: "13px", fontWeight: 700, color: "#f59e0b", marginLeft: "4px", fontFamily: "'Outfit', sans-serif" }}>
        ({rating})
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 1 — HERO
══════════════════════════════════════════════════════ */
function CourseHero() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", course: "" });
  const [errors, setErrors]     = useState({});
  const [touched, setTouched]   = useState({});
  const [submitted, setSubmitted] = useState(false);

  /* ── Validators ── */
  const validators = {
    name: (v) => {
      if (!v.trim()) return "Name is required";
      if (v.trim().length < 3) return "Minimum 3 characters required";
      if (v.trim().length > 50) return "Maximum 50 characters allowed";
      if (!/^[a-zA-Z\s'\-]+$/.test(v.trim())) return "Only letters, spaces & hyphens allowed";
      if (/\s{2,}/.test(v)) return "No consecutive spaces allowed";
      return "";
    },
    email: (v) => {
      if (!v.trim()) return "Email is required";
      if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(v.trim()))
        return "Enter a valid email (e.g. name@domain.com)";
      if (v.length > 100) return "Email address is too long";
      return "";
    },
    phone: (v) => {
      const d = v.replace(/\D/g, "");
      if (!d) return "Phone number is required";
      if (d.length !== 10) return "Must be exactly 10 digits";
      if (!/^[6-9]/.test(d)) return "Must start with 6, 7, 8 or 9";
      if (/^(\d)\1{9}$/.test(d)) return "Invalid number (all same digits)";
      return "";
    },
    course: (v) => (!v ? "Please select a course" : ""),
  };

  const validate = (field, value) => {
    const err = validators[field](value);
    setErrors(prev => ({ ...prev, [field]: err }));
    return err;
  };

  const handleChange = (field, value) => {
    // Name: block numbers & special chars while typing
    if (field === "name" && /[^a-zA-Z\s'\-]/.test(value)) return;
    // Phone: digits only, max 10
    if (field === "phone") value = value.replace(/\D/g, "").slice(0, 10);
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) validate(field, value);
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validate(field, formData[field]);
  };

  const handleSubmit = () => {
    setTouched({ name: true, email: true, phone: true, course: true });
    const newErrors = {};
    let hasError = false;
    Object.keys(validators).forEach(field => {
      const err = validators[field](formData[field]);
      newErrors[field] = err;
      if (err) hasError = true;
    });
    setErrors(newErrors);
    if (!hasError) setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: "", email: "", phone: "", course: "" });
    setErrors({});
    setTouched({});
  };

  /* ── Field border colour helper ── */
  const borderColor = (field) => {
    if (!touched[field]) return "#e5e7eb";
    if (errors[field]) return "#ef4444";
    return "#22c55e";
  };

  return (
    <section style={{
      background: "linear-gradient(135deg, #f3f0ff 0%, #ede9ff 60%, #e8e2f8 100%)",
      position: "relative", overflow: "hidden",
      fontFamily: "'Outfit', sans-serif",
      padding: "clamp(40px,6vw,80px) 0 0",
    }}>
      {/* Subtle dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "radial-gradient(rgba(124,58,237,0.07) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "0 clamp(16px,5%,60px)",
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        gap: "clamp(24px,4%,60px)", position: "relative", zIndex: 1, marginTop: "70px",
      }} className="hero-flex">

        {/* LEFT — Students image */}
        <div className="hero-img-wrap co-vR" style={{
          flex: 1, display: "flex", alignItems: "flex-end",
          justifyContent: "flex-start", minHeight: "300px",
        }}>
          <img
            src={`${PUB}/students.jpg`}
            alt="Students"
            style={{
              maxHeight: "clamp(240px,38vw,420px)",
              maxWidth: "100%", objectFit: "contain",
              objectPosition: "bottom center", display: "block",
              filter: "drop-shadow(0 16px 40px rgba(109,40,217,0.14))",
              borderRadius: "20px",
            }}
          />
        </div>

        {/* RIGHT — Contact form */}
        <div className="hero-form-wrap co-v1" style={{
          flex: "0 0 clamp(280px,38%,400px)",
          background: "#fff", borderRadius: "20px",
          padding: "clamp(24px,4%,36px) clamp(20px,4%,32px)",
          boxShadow: "0 8px 48px rgba(109,40,217,0.10)",
          border: "1.5px solid rgba(124,58,237,0.08)",
          marginBottom: "clamp(20px,4vw,48px)",
          alignSelf: "center",
        }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "28px 0" }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>🎉</div>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#111827", fontFamily: "'Outfit', sans-serif", marginBottom: "8px" }}>Brochure Sent!</h3>
              <p style={{ fontSize: "13px", color: "#6b7280", fontFamily: "'Outfit', sans-serif" }}>Check your email shortly.</p>
              <button onClick={handleReset}
                style={{ marginTop: "18px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: "50px", padding: "10px 24px", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>
                Submit Again
              </button>
            </div>
          ) : (
            <>
              <h3 style={{ fontSize: "clamp(16px,2vw,20px)", fontWeight: 900, color: "#111827", fontFamily: "'Outfit', sans-serif", marginBottom: "6px" }}>
                We're here to help!
              </h3>
              <p style={{ fontSize: "13px", color: "#9ca3af", fontFamily: "'Outfit', sans-serif", marginBottom: "22px" }}>
                Please contact us in case of any query.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

                {/* ── Text / Email / Phone inputs ── */}
                {[
                  { key: "name",  placeholder: "Your name",          type: "text"  },
                  { key: "email", placeholder: "Your email address",  type: "email" },
                  { key: "phone", placeholder: "Your phone number",   type: "tel"   },
                ].map(f => (
                  <div key={f.key}>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={formData[f.key]}
                      onChange={e => handleChange(f.key, e.target.value)}
                      onBlur={() => handleBlur(f.key)}
                      style={{
                        width: "100%", padding: "12px 14px",
                        border: `1.5px solid ${borderColor(f.key)}`,
                        borderRadius: "10px", fontSize: "13.5px",
                        fontFamily: "'Outfit', sans-serif", color: "#374151",
                        outline: "none", background: "#fafafa",
                        boxSizing: "border-box", transition: "border-color 0.2s",
                      }}
                      onFocus={e => { e.currentTarget.style.borderColor = "#a78bfa"; }}
                    />
                    {/* Error message */}
                    {touched[f.key] && errors[f.key] && (
                      <p style={{
                        fontSize: "11.5px", color: "#ef4444", marginTop: "5px",
                        fontFamily: "'Outfit', sans-serif",
                        display: "flex", alignItems: "center", gap: "4px",
                      }}>
                        <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="9" stroke="#ef4444" strokeWidth="1.8"/>
                          <path d="M10 6v4M10 14h.01" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                        {errors[f.key]}
                      </p>
                    )}
                    {/* Success message */}
                    {touched[f.key] && !errors[f.key] && formData[f.key] && (
                      <p style={{
                        fontSize: "11.5px", color: "#22c55e", marginTop: "5px",
                        fontFamily: "'Outfit', sans-serif",
                        display: "flex", alignItems: "center", gap: "4px",
                      }}>
                        <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="9" stroke="#22c55e" strokeWidth="1.8"/>
                          <path d="M6 10l3 3 5-5" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Looks good!
                      </p>
                    )}
                  </div>
                ))}

                {/* ── Course select ── */}
                <div>
                  <div style={{ position: "relative" }}>
                    <select
                      value={formData.course}
                      onChange={e => {
                        handleChange("course", e.target.value);
                        setTouched(prev => ({ ...prev, course: true }));
                        validate("course", e.target.value);
                      }}
                      onBlur={() => handleBlur("course")}
                      style={{
                        width: "100%", padding: "12px 14px",
                        border: `1.5px solid ${borderColor("course")}`,
                        borderRadius: "10px", fontSize: "13.5px",
                        fontFamily: "'Outfit', sans-serif",
                        color: formData.course ? "#374151" : "#9ca3af",
                        outline: "none", background: "#fafafa",
                        appearance: "none", WebkitAppearance: "none",
                        cursor: "pointer", boxSizing: "border-box",
                        transition: "border-color 0.2s",
                      }}
                    >
                      <option value="">Select Course</option>
                      <option value="medical-coding">Medical Coding</option>
                      <option value="medical-billing">Medical Billing</option>
                      <option value="medical-scribing">Medical Scribing</option>
                      <option value="full-stack">Full Stack Development</option>
                      <option value="data-analytics">Data Analytics</option>
                    </select>
                    <svg style={{ position: "absolute", right: "13px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="14" height="14" viewBox="0 0 20 20" fill="none">
                      <path d="M5 8l5 5 5-5" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {touched.course && errors.course && (
                    <p style={{
                      fontSize: "11.5px", color: "#ef4444", marginTop: "5px",
                      fontFamily: "'Outfit', sans-serif",
                      display: "flex", alignItems: "center", gap: "4px",
                    }}>
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="9" stroke="#ef4444" strokeWidth="1.8"/>
                        <path d="M10 6v4M10 14h.01" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                      {errors.course}
                    </p>
                  )}
                  {touched.course && !errors.course && formData.course && (
                    <p style={{
                      fontSize: "11.5px", color: "#22c55e", marginTop: "5px",
                      fontFamily: "'Outfit', sans-serif",
                      display: "flex", alignItems: "center", gap: "4px",
                    }}>
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="9" stroke="#22c55e" strokeWidth="1.8"/>
                        <path d="M6 10l3 3 5-5" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Looks good!
                    </p>
                  )}
                </div>

                {/* ── Submit button ── */}
                <button
                  onClick={handleSubmit}
                  style={{
                    background: "#7c3aed", color: "#fff", border: "none",
                    borderRadius: "50px", padding: "13px 24px",
                    fontSize: "14px", fontWeight: 700, cursor: "pointer",
                    fontFamily: "'Outfit', sans-serif",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    boxShadow: "0 6px 20px rgba(124,58,237,0.32)",
                    transition: "all 0.22s", marginTop: "4px",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(124,58,237,0.46)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(124,58,237,0.32)"; }}
                >
                  Download Brochures
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                    <path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — COURSE DETAIL
══════════════════════════════════════════════════════ */
const TABS = ["Overview", "Curriculum", "Instructor", "Reviews"];

const TAB_CONTENT = {
  Overview: {
    sections: [
      {
        heading: "COURSE DESCRIPTION",
        paras: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulpapertur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulpapertur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
        ],
      },
      {
        heading: "WHAT WILL I LEARN FROM THIS COURSE?",
        paras: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulpapertur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        ],
      },
    ],
  },
  Curriculum: {
    sections: [
      {
        heading: "COURSE MODULES",
        paras: [
          "Module 1: Introduction to Medical Coding — Understanding the basics of ICD-10-CM, CPT, and HCPCS coding systems used in healthcare.",
          "Module 2: Anatomy & Physiology for Coders — Body systems, medical terminology, and how clinical documentation maps to codes.",
          "Module 3: Outpatient Coding — Physician office coding, E&M services, and procedure coding guidelines.",
          "Module 4: Inpatient Coding — Hospital inpatient coding, DRGs, and MS-DRG systems explained in depth.",
        ],
      },
    ],
  },
  Instructor: {
    sections: [
      {
        heading: "ABOUT YOUR INSTRUCTOR",
        paras: [
          "Our instructor is a certified CPC (Certified Professional Coder) with over 10 years of hands-on experience in medical coding across various healthcare settings including hospitals, clinics, and insurance companies.",
          "They bring real-world coding scenarios into every session, ensuring students understand not just the codes but how they apply in actual practice. Past students have gone on to work at top healthcare organizations across India and abroad.",
        ],
      },
    ],
  },
  Reviews: {
    sections: [
      {
        heading: "STUDENT REVIEWS",
        paras: [
          "⭐⭐⭐⭐⭐ — \"This course completely changed my career. The instructor was clear, patient, and very knowledgeable. I passed my CPC exam on the first attempt!\" — Priya N.",
          "⭐⭐⭐⭐⭐ — \"Excellent course material and very practical examples. The mock tests were incredibly helpful in preparing for the real exam.\" — Rahul S.",
          "⭐⭐⭐⭐ — \"Great course overall. Would love more video content but the notes provided are very thorough and well-structured.\" — Kavitha M.",
        ],
      },
    ],
  },
};

function CourseDetailSection() {
  const [ref, inView] = useInView(0.06);
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <section ref={ref} style={{ background: "#fff", padding: "clamp(40px,6vw,72px) 0", fontFamily: "'Outfit', sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
        zIndex: 0,
      }} />
      <div style={{ maxWidth: "2000px", margin: "0 auto", padding: "0 clamp(16px,5%,60px)" }}>

        {/* Course title row */}
        <div style={{
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
          marginBottom: "16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", marginBottom: "10px" }}>
            <h1 style={{ fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 900, color: "#7c3aed", fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.5px" }}>
              Medical Coding
            </h1>
            <StarRating rating={4.7} />
          </div>

          {/* Meta info */}
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px,3%,28px)", flexWrap: "wrap" }}>
            {[
              { icon: "📋", label: "Lesson: 10" },
              { icon: "🕐", label: "9:00AM - 01:00 PM" },
              { icon: "👥", label: "Students: 20+" },
            ].map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "clamp(12px,1.2vw,13.5px)", color: "#6b7280", fontFamily: "'Outfit', sans-serif" }}>
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tab bar */}
        <div style={{
          display: "flex", gap: "0", borderBottom: "2px solid #f0ebff",
          marginBottom: "36px", overflowX: "auto", scrollbarWidth: "none",
          opacity: inView ? 1 : 0,
          transition: "all 0.6s ease 0.15s",
        }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "12px clamp(16px,3%,28px)",
              fontSize: "clamp(13px,1.3vw,14.5px)", fontWeight: 700,
              fontFamily: "'Outfit', sans-serif", cursor: "pointer",
              border: "none", background: "transparent",
              color: activeTab === tab ? "#7c3aed" : "#6b7280",
              borderBottom: activeTab === tab ? "3px solid #7c3aed" : "3px solid transparent",
              marginBottom: "-2px", transition: "all 0.22s", whiteSpace: "nowrap",
            }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div key={activeTab} className="tab-content-fade" style={{
          opacity: inView ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}>
          {TAB_CONTENT[activeTab].sections.map((sec, si) => (
            <div key={si} style={{ marginBottom: "36px" }}>
              <h3 style={{ fontSize: "clamp(13px,1.3vw,14px)", fontWeight: 800, color: "#111827", fontFamily: "'Outfit', sans-serif", letterSpacing: "0.04em", marginBottom: "16px" }}>
                {sec.heading}
              </h3>
              {sec.paras.map((p, pi) => (
                <p key={pi} style={{ fontSize: "clamp(13px,1.3vw,14px)", color: "#4b5563", fontFamily: "'Outfit', sans-serif", lineHeight: 1.85, marginBottom: "14px", fontWeight: 400 }}>
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — OTHER COURSES (horizontal scroll)
══════════════════════════════════════════════════════ */
const OTHER_COURSES = [
  {
    bg: "#e8f5e9", titleColor: "#1a5c2a", btnColor: "#f97316",
    title: "SAP Development",
    desc: "Become a full stack web developer with our MERN and MEAN Stack Course.",
    image: "course-sap.png",
    tags: ["SAP", "ABAP"],
  },
  {
    bg: "#fff8e1", titleColor: "#5c3d00", btnColor: "#f97316",
    title: "Tally & GST Course",
    desc: "Join our Data Analytics Course for a high-demand careers.",
    image: "course-tally.png",
    tags: [],
  },
  {
    bg: "#fff3e0", titleColor: "#7c3aed", btnColor: "#f97316",
    title: "Full Stack Course",
    desc: "Become a full stack web developer with our MERN and MEAN Stack Course.",
    image: "course-fullstack.png",
    tags: ["JS", "React", "Node"],
  },
  {
    bg: "#fce4ec", titleColor: "#1a237e", btnColor: "#f97316",
    title: "Data Analytics",
    desc: "Join our Data Analytics Course for a high-demand careers.",
    image: "course-data.png",
    tags: [],
  },
  {
    bg: "#e3f2fd", titleColor: "#0d47a1", btnColor: "#f97316",
    title: "Medical Billing",
    desc: "Master medical billing and insurance claims processing for healthcare careers.",
    image: "course-billing.png",
    tags: [],
  },
  {
    bg: "#f3e5f5", titleColor: "#4a148c", btnColor: "#f97316",
    title: "AI Medical Scribing",
    desc: "Learn AI-powered medical documentation and scribing for modern healthcare.",
    image: "course-scribing.png",
    tags: [],
  },
];

function OtherCourseCard({ course, inView, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: course.bg,
        borderRadius: "16px",
        padding: "20px 20px 24px",
        flex: "0 0 clamp(220px,28vw,280px)",
        minWidth: "220px",
        display: "flex", flexDirection: "column",
        scrollSnapAlign: "start",
        opacity: inView ? 1 : 0,
        transform: inView ? (hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)") : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.3s ease`,
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.12)" : "0 2px 12px rgba(0,0,0,0.06)",
        cursor: "pointer",
        position: "relative", overflow: "hidden",
      }}
    >
      {course.tags.length > 0 && (
        <div style={{ display: "flex", gap: "6px", marginBottom: "10px", flexWrap: "wrap" }}>
          {course.tags.map((tag, i) => (
            <span key={i} style={{ fontSize: "10px", fontWeight: 700, background: "rgba(0,0,0,0.08)", color: course.titleColor, borderRadius: "4px", padding: "2px 7px", fontFamily: "'Outfit', sans-serif" }}>
              {tag}
            </span>
          ))}
        </div>
      )}
      <div style={{ height: "140px", display: "flex", alignItems: "flex-end", justifyContent: "center", marginBottom: "14px", overflow: "hidden" }}>
        <img
          src={`${PUB}/${course.image}`}
          alt={course.title}
          style={{
            maxHeight: "140px", maxWidth: "100%", objectFit: "contain",
            objectPosition: "bottom center",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.4s ease",
          }}
        />
      </div>
      <h3 style={{ fontSize: "clamp(14px,1.5vw,16px)", fontWeight: 800, color: course.titleColor, fontFamily: "'Outfit', sans-serif", marginBottom: "10px", lineHeight: 1.3 }}>
        {course.title}
      </h3>
      <p style={{ fontSize: "12.5px", color: "#6b7280", fontFamily: "'Outfit', sans-serif", lineHeight: 1.6, marginBottom: "18px", flex: 1 }}>
        {course.desc}
      </p>
      <button style={{
        background: course.btnColor, color: "#fff", border: "none",
        borderRadius: "6px", padding: "10px 20px",
        fontSize: "12px", fontWeight: 800, letterSpacing: "0.06em",
        cursor: "pointer", fontFamily: "'Outfit', sans-serif",
        alignSelf: "flex-start",
        transition: "all 0.22s",
        boxShadow: hovered ? "0 6px 18px rgba(249,115,22,0.40)" : "none",
      }}
        onMouseEnter={e => { e.currentTarget.style.background = "#ea6c10"; }}
        onMouseLeave={e => { e.currentTarget.style.background = course.btnColor; }}
      >
        KNOW MORE
      </button>
    </div>
  );
}

function OtherCoursesSection() {
  const [ref, inView] = useInView(0.06);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <section ref={ref} style={{ background: "#fff", padding: "clamp(10px,3vw,10px) 0", fontFamily: "'Outfit', sans-serif", overflow: "hidden" }}>
      <div style={{ maxWidth: "2000px", margin: "0 auto", padding: "0 clamp(16px,5%,60px)" }}>

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: "28px", flexWrap: "wrap", gap: "12px",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.6s ease",
        }}>
          <h2 style={{ fontSize: "clamp(1.2rem,2.5vw,1.8rem)", fontWeight: 900, color: "#111827", fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.02em" }}>
            OTHER COURSE
          </h2>
          <div style={{ display: "flex", gap: "10px" }}>
            {[{ dir: -1, icon: "←" }, { dir: 1, icon: "→" }].map(({ dir, icon }) => (
              <button key={dir} onClick={() => scroll(dir)} style={{
                width: "36px", height: "36px", borderRadius: "50%",
                border: "1.5px solid #e5e7eb", background: "#fff",
                fontSize: "16px", cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center",
                color: "#7c3aed", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#7c3aed"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#7c3aed"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#7c3aed"; e.currentTarget.style.borderColor = "#e5e7eb"; }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          style={{
            display: "flex", gap: "20px",
            overflowX: "auto", scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            paddingBottom: "8px",
          }}
        >
          {OTHER_COURSES.map((course, i) => (
            <OtherCourseCard key={i} course={course} inView={inView} delay={0.05 + i * 0.08} />
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "20px" }}>
          {OTHER_COURSES.map((_, i) => (
            <div key={i} style={{
              width: i < 4 ? "8px" : "6px", height: i < 4 ? "8px" : "6px",
              borderRadius: "50%", background: i === 0 ? "#7c3aed" : "#d1d5db",
              transition: "background 0.3s",
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════ */
export default function CourseOffered() {
  return (
    <div style={{ fontFamily: "'Outfit','Segoe UI',sans-serif", margin: 0, padding: 0, overflowX: "hidden", background: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; }

        @keyframes coFadeRight { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes coFadeUp    { from{opacity:0;transform:translateY(22px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes coFadeScale { from{opacity:0;transform:scale(0.9)}        to{opacity:1;transform:scale(1)} }
        @keyframes coFadeIn    { from{opacity:0}                             to{opacity:1} }
        @keyframes tabFade     { from{opacity:0;transform:translateY(8px)}   to{opacity:1;transform:translateY(0)} }

        .co-v1 { animation: coFadeRight 0.65s ease forwards; opacity:0; animation-delay:0.15s; }
        .co-vR { animation: coFadeScale 0.9s  ease forwards; opacity:0; animation-delay:0.10s; }
        .tab-content-fade { animation: tabFade 0.35s ease forwards; }

        .course-scroll::-webkit-scrollbar { display:none; }

        input::placeholder { color: #9ca3af; }
        input:focus, select:focus { outline: none; }
        select option { color: #374151; }

        /* Tablet */
        @media (max-width: 1024px) and (min-width: 769px) {
          .hero-flex { gap: 24px !important; }
          .hero-form-wrap { flex: 0 0 clamp(260px,40%,360px) !important; }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .hero-flex {
            flex-direction: column !important;
            align-items: center !important;
            gap: 24px !important;
          }
          .hero-img-wrap {
            width: 100% !important;
            min-height: 200px !important;
            justify-content: center !important;
            margin-bottom: 0 !important;
          }
          .hero-img-wrap img {
            max-height: 220px !important;
          }
          .hero-form-wrap {
            flex: 0 0 auto !important;
            width: 100% !important;
            max-width: 100% !important;
            margin-bottom: 24px !important;
          }
        }

        @media (max-width: 480px) {
          .hero-img-wrap img { max-height: 180px !important; }
        }
      `}</style>

      <Navbar />
      <CourseHero />
      <CourseDetailSection />
      <OtherCoursesSection />
      <Footer />
    </div>
  );
}