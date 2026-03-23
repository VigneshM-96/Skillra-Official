import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";
import { COURSES, nameToSlug } from "../data/CoursesData";

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
function StarRating({ rating = 4.7, color = "#f59e0b" }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={i <= full ? color : (i === full + 1 && half ? `url(#half-${rating})` : "#e5e7eb")}
            stroke={i <= full || (i === full + 1 && half) ? color : "#e5e7eb"}
            strokeWidth="0.5"
          />
          {i === full + 1 && half && (
            <defs>
              <linearGradient id={`half-${rating}`} x1="0" x2="1" y1="0" y2="0">
                <stop offset="50%" stopColor={color} />
                <stop offset="50%" stopColor="#e5e7eb" />
              </linearGradient>
            </defs>
          )}
        </svg>
      ))}
      <span style={{ fontSize: "13px", fontWeight: 700, color, marginLeft: "4px", fontFamily: "'Outfit', sans-serif" }}>
        ({rating})
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 1 — HERO
══════════════════════════════════════════════════════ */
function CourseHero({ course }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", course: "" });
  const [errors, setErrors]     = useState({});
  const [touched, setTouched]   = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validators = {
    name:   (v) => !v.trim() ? "Name is required" : v.trim().length < 3 ? "Minimum 3 characters" : !/^[a-zA-Z\s'\-]+$/.test(v.trim()) ? "Letters only" : "",
    email:  (v) => !v.trim() ? "Email is required" : !/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(v.trim()) ? "Enter a valid email" : "",
    phone:  (v) => { const d = v.replace(/\D/g,""); return !d ? "Phone required" : d.length!==10 ? "Must be 10 digits" : !/^[6-9]/.test(d) ? "Start with 6-9" : ""; },
    course: (v) => !v ? "Please select a course" : "",
  };

  const validate = (field, value) => {
    const err = validators[field](value);
    setErrors(prev => ({ ...prev, [field]: err }));
    return err;
  };

  const handleChange = (field, value) => {
    if (field === "name" && /[^a-zA-Z\s'\-]/.test(value)) return;
    if (field === "phone") value = value.replace(/\D/g,"").slice(0,10);
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) validate(field, value);
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validate(field, formData[field]);
  };

  const handleSubmit = () => {
    setTouched({ name:true, email:true, phone:true, course:true });
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

  const borderColor = (field) => {
    if (!touched[field]) return "#e5e7eb";
    if (errors[field]) return "#ef4444";
    return "#22c55e";
  };

  const accentColor = "#7c3aed";

  return (
    <section style={{
      background: `linear-gradient(135deg, #f8f6ff 0%, ${accentColor}18 60%, ${accentColor}10 100%)`,
      position: "relative", overflow: "hidden",
      fontFamily: "'Outfit', sans-serif",
      padding: "clamp(40px,6vw,80px) 0 0",
    }}>
      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `radial-gradient(${accentColor}22 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }} />

      {/* Category badge */}
      <div style={{
        position: "absolute", top: "90px", left: "clamp(16px,5%,60px)",
        background: `${accentColor}18`, border: `1.5px solid ${accentColor}44`,
        borderRadius: "999px", padding: "5px 14px",
        fontSize: "11.5px", fontWeight: 700, color: accentColor,
        fontFamily: "'Outfit', sans-serif", zIndex: 2, letterSpacing: "0.05em",
      }}>
        {course.category}
      </div>

      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "0 clamp(16px,5%,60px)",
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        gap: "clamp(24px,4%,60px)", position: "relative", zIndex: 1, marginTop: "80px",
      }} className="hero-flex">

        {/* LEFT — image */}
        <div className="hero-img-wrap co-vR" style={{
          flex: 1, display: "flex", alignItems: "flex-end",
          justifyContent: "flex-start", minHeight: "300px",
        }}>
          <img
            src={`${PUB}/${course.heroImage || "students.jpg"}`}
            alt={course.title}
            style={{
              maxHeight: "clamp(240px,38vw,420px)",
              maxWidth: "100%", objectFit: "contain",
              objectPosition: "bottom center", display: "block",
              filter: `drop-shadow(0 16px 40px ${accentColor}33)`,
              borderRadius: "20px",
            }}
          />
        </div>

        {/* RIGHT — form */}
        <div className="hero-form-wrap co-v1" style={{
          flex: "0 0 clamp(280px,38%,400px)",
          background: "#fff", borderRadius: "20px",
          padding: "clamp(24px,4%,36px) clamp(20px,4%,32px)",
          boxShadow: `0 8px 48px ${accentColor}22`,
          border: `1.5px solid ${accentColor}18`,
          marginBottom: "clamp(20px,4vw,48px)",
          alignSelf: "center",
        }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "28px 0" }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>🎉</div>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#111827", fontFamily: "'Outfit', sans-serif", marginBottom: "8px" }}>Brochure Sent!</h3>
              <p style={{ fontSize: "13px", color: "#6b7280", fontFamily: "'Outfit', sans-serif" }}>Check your email shortly.</p>
              <button onClick={() => { setSubmitted(false); setFormData({ name:"",email:"",phone:"",course:"" }); setErrors({}); setTouched({}); }}
                style={{ marginTop: "18px", background: accentColor, color: "#fff", border: "none", borderRadius: "50px", padding: "10px 24px", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>
                Submit Again
              </button>
            </div>
          ) : (
            <>
              <h3 style={{ fontSize: "clamp(16px,2vw,20px)", fontWeight: 900, color: "#111827", fontFamily: "'Outfit', sans-serif", marginBottom: "6px" }}>
                We're here to help!
              </h3>
              <p style={{ fontSize: "13px", color: "#9ca3af", fontFamily: "'Outfit', sans-serif", marginBottom: "22px" }}>
                Enquire about <strong style={{ color: accentColor }}>{course.title}</strong>
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { key: "name",  placeholder: "Your name",         type: "text"  },
                  { key: "email", placeholder: "Your email address", type: "email" },
                  { key: "phone", placeholder: "Your phone number",  type: "tel"   },
                ].map(f => (
                  <div key={f.key}>
                    <input
                      type={f.type} placeholder={f.placeholder}
                      value={formData[f.key]}
                      onChange={e => handleChange(f.key, e.target.value)}
                      onBlur={() => handleBlur(f.key)}
                      onFocus={e => { e.currentTarget.style.borderColor = accentColor + "99"; }}
                      style={{
                        width: "100%", padding: "12px 14px",
                        border: `1.5px solid ${borderColor(f.key)}`,
                        borderRadius: "10px", fontSize: "13.5px",
                        fontFamily: "'Outfit', sans-serif", color: "#374151",
                        outline: "none", background: "#fafafa",
                        boxSizing: "border-box", transition: "border-color 0.2s",
                      }}
                    />
                    {touched[f.key] && errors[f.key] && (
                      <p style={{ fontSize: "11.5px", color: "#ef4444", marginTop: "5px", fontFamily: "'Outfit', sans-serif", display: "flex", alignItems: "center", gap: "4px" }}>
                        <svg width="12" height="12" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#ef4444" strokeWidth="1.8"/><path d="M10 6v4M10 14h.01" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"/></svg>
                        {errors[f.key]}
                      </p>
                    )}
                    {touched[f.key] && !errors[f.key] && formData[f.key] && (
                      <p style={{ fontSize: "11.5px", color: "#22c55e", marginTop: "5px", fontFamily: "'Outfit', sans-serif", display: "flex", alignItems: "center", gap: "4px" }}>
                        <svg width="12" height="12" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#22c55e" strokeWidth="1.8"/><path d="M6 10l3 3 5-5" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Looks good!
                      </p>
                    )}
                  </div>
                ))}

                {/* Course select */}
                <div>
                  <div style={{ position: "relative" }}>
                    <select
                      value={formData.course}
                      onChange={e => { handleChange("course", e.target.value); setTouched(p => ({...p,course:true})); validate("course", e.target.value); }}
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
                      {Object.values(COURSES).map(c => (
                        <option key={c.title} value={nameToSlug(c.title)}>{c.title}</option>
                      ))}
                    </select>
                    <svg style={{ position: "absolute", right: "13px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="14" height="14" viewBox="0 0 20 20" fill="none">
                      <path d="M5 8l5 5 5-5" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {touched.course && errors.course && (
                    <p style={{ fontSize: "11.5px", color: "#ef4444", marginTop: "5px", fontFamily: "'Outfit', sans-serif", display: "flex", alignItems: "center", gap: "4px" }}>
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#ef4444" strokeWidth="1.8"/><path d="M10 6v4M10 14h.01" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"/></svg>
                      {errors.course}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  style={{
                    background: accentColor, color: "#fff", border: "none",
                    borderRadius: "50px", padding: "13px 24px",
                    fontSize: "14px", fontWeight: 700, cursor: "pointer",
                    fontFamily: "'Outfit', sans-serif",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    boxShadow: `0 6px 20px ${accentColor}44`,
                    transition: "all 0.22s", marginTop: "4px",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 12px 30px ${accentColor}66`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 6px 20px ${accentColor}44`; }}
                >
                  Download Brochure
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
   SECTION 2 — COURSE DETAIL TABS
══════════════════════════════════════════════════════ */
function CourseDetailSection({ course }) {
  const [ref, inView] = useInView(0.06);
  const [activeTab, setActiveTab] = useState("Overview");
  const TABS = Object.keys(course.tabs);
  const accentColor = course.color || "#7c3aed";

  return (
    <section ref={ref} style={{ background: "#fff", padding: "clamp(40px,6vw,72px) 0", fontFamily: "'Outfit', sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(${accentColor}08 1px, transparent 1px), linear-gradient(90deg, ${accentColor}08 1px, transparent 1px)`,
        backgroundSize: "32px 32px", zIndex: 0,
      }} />
      <div style={{ maxWidth: "2000px", margin: "0 auto", padding: "0 clamp(16px,5%,60px)", position: "relative", zIndex: 1 }}>

        {/* Course title row */}
        <div style={{
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease", marginBottom: "16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", marginBottom: "10px" }}>
            <h1 style={{ fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 900, color: accentColor, fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.5px" }}>
              {course.title}
            </h1>
            <StarRating rating={course.rating} color="#f59e0b" />
          </div>

          {/* Meta info */}
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px,3%,28px)", flexWrap: "wrap" }}>
            {[
              { icon: "📋", label: `Lessons: ${course.lessons}` },
              { icon: "🕐", label: course.timing },
              { icon: "👥", label: `Students: ${course.students}` },
              { icon: "⏱️", label: `Duration: ${course.duration}` },
            ].map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "clamp(12px,1.2vw,13.5px)", color: "#6b7280", fontFamily: "'Outfit', sans-serif" }}>
                <span>{m.icon}</span><span>{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tab bar */}
        <div style={{
          display: "flex", gap: "0",
          borderBottom: `2px solid ${accentColor}18`,
          marginBottom: "36px", overflowX: "auto", scrollbarWidth: "none",
          opacity: inView ? 1 : 0, transition: "all 0.6s ease 0.15s",
        }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "12px clamp(16px,3%,28px)",
              fontSize: "clamp(13px,1.3vw,14.5px)", fontWeight: 700,
              fontFamily: "'Outfit', sans-serif", cursor: "pointer",
              border: "none", background: "transparent",
              color: activeTab === tab ? accentColor : "#6b7280",
              borderBottom: activeTab === tab ? `3px solid ${accentColor}` : "3px solid transparent",
              marginBottom: "-2px", transition: "all 0.22s", whiteSpace: "nowrap",
            }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div key={activeTab} className="tab-content-fade" style={{ opacity: inView ? 1 : 0, transition: "opacity 0.4s ease" }}>
          {course.tabs[activeTab].sections.map((sec, si) => (
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
   SECTION 3 — OTHER COURSES
══════════════════════════════════════════════════════ */
function OtherCoursesSection({ currentCourseId, otherSlugs }) {
  const [ref, inView] = useInView(0.06);
  const scrollRef     = useRef(null);
  const navigate      = useNavigate();

  const others = otherSlugs
    .filter(slug => slug !== currentCourseId && COURSES[slug])
    .map(slug => ({ slug, ...COURSES[slug] }));

  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });

  if (!others.length) return null;

  return (
    <section ref={ref} style={{ background: "#fff", padding: "clamp(10px,3vw,40px) 0", fontFamily: "'Outfit', sans-serif", overflow: "hidden" }}>
      <div style={{ maxWidth: "2000px", margin: "0 auto", padding: "0 clamp(16px,5%,60px)" }}>

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: "28px", flexWrap: "wrap", gap: "12px",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.6s ease",
        }}>
          <h2 style={{ fontSize: "clamp(1.2rem,2.5vw,1.8rem)", fontWeight: 900, color: "#111827", fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.02em" }}>
            RELATED COURSES
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
              >{icon}</button>
            ))}
          </div>
        </div>

        <div ref={scrollRef} style={{
          display: "flex", gap: "20px",
          overflowX: "auto", scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch", scrollbarWidth: "none", paddingBottom: "8px",
        }}>
          {others.map((c, i) => (
            <OtherCourseCard
              key={c.slug} course={c} inView={inView}
              delay={0.05 + i * 0.08}
              onClick={() => navigate(`/courses/${c.slug}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function OtherCourseCard({ course, inView, delay, onClick }) {
  const [hovered, setHovered] = useState(false);
  const accent = "#7c3aed";
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        background: `${accent}12`,
        borderRadius: "16px",
        padding: "20px 20px 24px",
        flex: "0 0 clamp(220px,28vw,280px)",
        minWidth: "220px",
        display: "flex", flexDirection: "column",
        scrollSnapAlign: "start",
        opacity: inView ? 1 : 0,
        transform: inView ? (hovered ? "translateY(-6px) scale(1.02)" : "translateY(0)") : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.3s ease`,
        boxShadow: hovered ? `0 16px 40px ${accent}22` : "0 2px 12px rgba(0,0,0,0.06)",
        cursor: "pointer",
        border: `1.5px solid ${hovered ? accent + "44" : "transparent"}`,
      }}
    >
      {/* Icon */}
      <div style={{
        width: "48px", height: "48px", borderRadius: "14px",
        background: accent, display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: "22px", marginBottom: "14px",
        boxShadow: `0 4px 12px ${accent}44`,
      }}>
        📚
      </div>

      {/* Category badge */}
      <span style={{
        fontSize: "10px", fontWeight: 700, color: accent,
        background: `${accent}18`, borderRadius: "4px",
        padding: "2px 8px", fontFamily: "'Outfit', sans-serif",
        marginBottom: "8px", alignSelf: "flex-start",
      }}>
        {course.category}
      </span>

      <h3 style={{ fontSize: "clamp(14px,1.5vw,16px)", fontWeight: 800, color: "#111827", fontFamily: "'Outfit', sans-serif", marginBottom: "8px", lineHeight: 1.3 }}>
        {course.title}
      </h3>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
        <StarRating rating={course.rating} color="#f59e0b" />
      </div>
      <p style={{ fontSize: "12px", color: "#6b7280", fontFamily: "'Outfit', sans-serif", marginBottom: "6px" }}>
        ⏱️ {course.duration} &nbsp;|&nbsp; 👥 {course.students}
      </p>
      <div style={{ flex: 1 }} />
      <button style={{
        background: accent, color: "#fff", border: "none",
        borderRadius: "8px", padding: "10px 20px",
        fontSize: "12px", fontWeight: 800, letterSpacing: "0.04em",
        cursor: "pointer", fontFamily: "'Outfit', sans-serif",
        alignSelf: "flex-start", marginTop: "14px",
        transition: "all 0.22s",
        boxShadow: hovered ? `0 6px 18px ${accent}44` : "none",
      }}>
        KNOW MORE →
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   404 — COURSE NOT FOUND
══════════════════════════════════════════════════════ */
function CourseNotFound() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Outfit', sans-serif", gap: "16px" }}>
      <div style={{ fontSize: "60px" }}>🔍</div>
      <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#111827" }}>Course Not Found</h2>
      <p style={{ color: "#6b7280", fontSize: "14px" }}>The course you're looking for doesn't exist.</p>
      <button
        onClick={() => navigate("/courses/ai-medical-coding")}
        style={{ background: "#7c3aed", color: "#fff", border: "none", borderRadius: "50px", padding: "12px 28px", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}
      >
        Browse Courses
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN PAGE EXPORT
══════════════════════════════════════════════════════ */
export default function CoursesPage() {
  const { courseId } = useParams();

  // If no courseId in URL, default to first course
  const resolvedId = courseId || "ai-medical-coding";
  const course = COURSES[resolvedId];

  // Scroll to top when course changes
  useEffect(() => { window.scrollTo(0, 0); }, [resolvedId]);

  return (
    <div style={{ fontFamily: "'Outfit','Segoe UI',sans-serif", margin: 0, padding: 0, overflowX: "hidden", background: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; }

        @keyframes coFadeRight { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes coFadeScale { from{opacity:0;transform:scale(0.9)}        to{opacity:1;transform:scale(1)} }
        @keyframes tabFade     { from{opacity:0;transform:translateY(8px)}   to{opacity:1;transform:translateY(0)} }

        .co-v1 { animation: coFadeRight 0.65s ease forwards; opacity:0; animation-delay:0.15s; }
        .co-vR { animation: coFadeScale 0.9s  ease forwards; opacity:0; animation-delay:0.10s; }
        .tab-content-fade { animation: tabFade 0.35s ease forwards; }

        input::placeholder { color: #9ca3af; }
        input:focus, select:focus { outline: none; }
        select option { color: #374151; }

        @media (max-width: 1024px) and (min-width: 769px) {
          .hero-flex { gap: 24px !important; }
          .hero-form-wrap { flex: 0 0 clamp(260px,40%,360px) !important; }
        }
        @media (max-width: 768px) {
          .hero-flex { flex-direction: column !important; align-items: center !important; gap: 24px !important; }
          .hero-img-wrap { width: 100% !important; min-height: 200px !important; justify-content: center !important; }
          .hero-img-wrap img { max-height: 220px !important; }
          .hero-form-wrap { flex: 0 0 auto !important; width: 100% !important; max-width: 100% !important; margin-bottom: 24px !important; }
        }
        @media (max-width: 480px) {
          .hero-img-wrap img { max-height: 180px !important; }
        }
      `}</style>

      <Navbar />

      {course ? (
        <>
          <CourseHero course={course} />
          <CourseDetailSection course={course} />
          <OtherCoursesSection
            currentCourseId={resolvedId}
            otherSlugs={course.otherCourses || []}
          />
        </>
      ) : (
        <CourseNotFound />
      )}

      <Footer />
    </div>
  );
}