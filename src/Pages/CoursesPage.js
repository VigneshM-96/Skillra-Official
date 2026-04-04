import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";
import { COURSES, nameToSlug } from "../data/CoursesData";
import SocialSidebar from "../components/SocialSideBar";


const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbws7QqEJT-y2F_6U_VyyuQ56sdXZUYEgXb7qLagegYmmPfqI-5EoGJ6wXGrHuQIC-jTWA/exec";


const META = {
  title:       "Courses Offered | Skillra – AI Medical Coding, IT & Finance Training",
  description: "Explore Skillra's industry-aligned courses in AI Medical Coding, AI Medical Billing, MERN/MEAN Stack, AI & ML, Data Analytics, UI/UX Design, SAP ABAP, Tally & GST, Digital Marketing, and Personality Development.",
  canonical:   "https://www.skillra.com/courses",
  keywords:    "Skillra courses, AI medical coding course, MERN stack training, data analytics course, medical billing course, IT training Tamil Nadu, finance courses, digital marketing course",
};

function setMeta(attr, value, content) {
  let el = document.querySelector(`meta[${attr}="${value}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, value); document.head.appendChild(el); }
  el.setAttribute("content", content);
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) { el = document.createElement("link"); el.setAttribute("rel", rel); document.head.appendChild(el); }
  el.setAttribute("href", href);
}

function setJsonLd(data) {
  const id = "skillra-courses-jsonld";
  let el = document.getElementById(id);
  if (!el) { el = document.createElement("script"); el.type = "application/ld+json"; el.id = id; document.head.appendChild(el); }
  el.textContent = JSON.stringify(data);
}

function PageMeta() {
  useEffect(() => {
    document.title = META.title;
    setMeta("name", "description",  META.description);
    setMeta("name", "keywords",     META.keywords);
    setMeta("name", "robots",       "index, follow");
    setMeta("name", "author",       "Skillra");
    setLink("canonical",            META.canonical);
    setMeta("property", "og:type",        "website");
    setMeta("property", "og:url",         META.canonical);
    setMeta("property", "og:title",       META.title);
    setMeta("property", "og:description", META.description);
    setMeta("property", "og:image",       META.ogImage);
    setMeta("property", "og:image:alt",   "Skillra courses and training programs");
    setMeta("property", "og:site_name",   "Skillra");
    setMeta("property", "og:locale",      "en_IN");
    setMeta("name", "twitter:card",        "summary_large_image");
    setMeta("name", "twitter:title",       META.title);
    setMeta("name", "twitter:description", META.description);
    setMeta("name", "twitter:image",       META.ogImage);
    setMeta("name", "twitter:image:alt",   "Skillra courses and training programs");
    setJsonLd({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Skillra Training Courses",
      "description": META.description,
      "url": META.canonical,
      "provider": {
        "@type": "EducationalOrganization",
        "name": "Skillra Health Innovations Pvt Ltd",
        "logo": "/logo.png",
        "url": "https://www.skillra.com"
      },
      "itemListElement": [
        { "@type": "Course", "position": 1, "name": "AI Medical Coding", "category": "Health" },
        { "@type": "Course", "position": 2, "name": "AI Medical Billing", "category": "Health" },
        { "@type": "Course", "position": 3, "name": "AI Medical Scribing", "category": "Health" },
        { "@type": "Course", "position": 4, "name": "MEAN / MERN Stack", "category": "Technology" },
        { "@type": "Course", "position": 5, "name": "AI & ML", "category": "Technology" },
        { "@type": "Course", "position": 6, "name": "Data Analytics", "category": "Technology" },
        { "@type": "Course", "position": 7, "name": "UI/UX Design", "category": "Technology" },
        { "@type": "Course", "position": 8, "name": "SAP ABAP", "category": "Technology" },
        { "@type": "Course", "position": 9, "name": "Tally & GST", "category": "Finance" },
        { "@type": "Course", "position": 10, "name": "Digital Marketing", "category": "Marketing" },
        { "@type": "Course", "position": 11, "name": "Personality Development", "category": "Personality" }
      ]
    });
  }, []);
  return null;
}

/* ══════════════════════════════════════════════════════
   SVG ICON COMPONENTS
══════════════════════════════════════════════════════ */
const IcoClipboard = ({ size = 18, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>);
const IcoTarget = ({ size = 18, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>);
const IcoLightbulb = ({ size = 18, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 019 14"/></svg>);
const IcoUsers = ({ size = 18, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>);
const IcoRocket = ({ size = 18, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>);
const IcoAward = ({ size = 18, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>);
const IcoWrench = ({ size = 18, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>);
const IcoZap = ({ size = 18, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>);
const IcoClock = ({ size = 14, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);
const IcoTimer = ({ size = 14, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M5 3L2 6"/><path d="M22 6l-3-3"/><line x1="6" y1="19" x2="6.01" y2="19"/><line x1="18" y1="19" x2="18.01" y2="19"/></svg>);
const IcoBook = ({ size = 18, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>);
const IcoSearch = ({ size = 48, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>);
const IcoCheckCircle = ({ size = 40, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>);
const IcoGraduationCap = ({ size = 14, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5"/></svg>);

const OV_ICON_COMPONENTS = [IcoClipboard, IcoTarget, IcoLightbulb, IcoUsers, IcoRocket, IcoAward, IcoWrench, IcoZap];

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
  }, [threshold]);
  return [ref, inView];
}

/* ══════════════════════════════════════════════════════
   STAR RATING
══════════════════════════════════════════════════════ */
function StarRating({ rating = 4.7, color = "#f59e0b", size = 16 }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={i <= full ? color : i === full + 1 && half ? `url(#half-${rating}-${size})` : "#e5e7eb"} stroke={i <= full || (i === full + 1 && half) ? color : "#e5e7eb"} strokeWidth="0.5" />
          {i === full + 1 && half && (<defs><linearGradient id={`half-${rating}-${size}`} x1="0" x2="1" y1="0" y2="0"><stop offset="50%" stopColor={color} /><stop offset="50%" stopColor="#e5e7eb" /></linearGradient></defs>)}
        </svg>
      ))}
      <span style={{ fontSize: `${size - 3}px`, fontWeight: 700, color, marginLeft: "4px", fontFamily: "'Outfit', sans-serif" }}>({rating})</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   COURSE HERO
══════════════════════════════════════════════════════ */
function CourseHero({ course }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", course: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validators = {
    name: (v) => !v.trim() ? "Name is required" : v.trim().length < 3 ? "Minimum 3 characters" : !/^[a-zA-Z\s'\-]+$/.test(v.trim()) ? "Letters only" : "",
    email: (v) => !v.trim() ? "Email is required" : !/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(v.trim()) ? "Enter a valid email" : "",
    phone: (v) => { const d = v.replace(/\D/g, ""); return !d ? "Phone required" : d.length !== 10 ? "Must be 10 digits" : !/^[6-9]/.test(d) ? "Start with 6-9" : ""; },
    course: (v) => (!v ? "Please select a course" : ""),
  };
  const validate = (field, value) => { const err = validators[field](value); setErrors((p) => ({ ...p, [field]: err })); return err; };
  const handleChange = (field, value) => { if (field === "name" && /[^a-zA-Z\s'\-]/.test(value)) return; if (field === "phone") value = value.replace(/\D/g, "").slice(0, 10); setFormData((p) => ({ ...p, [field]: value })); if (touched[field]) validate(field, value); };
  const handleBlur = (field) => { setTouched((p) => ({ ...p, [field]: true })); validate(field, formData[field]); };

  const handleSubmit = async () => {
    let hasError = false;
    setTouched({ name: true, email: true, phone: true, course: true });
    ["name", "email", "phone", "course"].forEach((f) => { if (validate(f, formData[f])) hasError = true; });
    if (hasError) return;
    setSubmitted("loading");
    try {
      const now = new Date();
      const date = now.toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" });
      const time = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
      await fetch(SHEETS_URL, { method: "POST", mode: "no-cors", body: JSON.stringify({ type: "brochure", date, time, name: formData.name.trim(), email: formData.email.trim(), phone: formData.phone, course: formData.course }) });
      const link = document.createElement("a"); link.href = "/DownloadablePDF/brouchre.pdf"; link.download = "Skillra_Brochure.pdf"; document.body.appendChild(link); link.click(); document.body.removeChild(link);
      setSubmitted(true);
    } catch { setSubmitted(false); alert("Something went wrong. Please try again."); }
  };

  const borderColor = (field) => (!touched[field] ? "#e5e7eb" : errors[field] ? "#ef4444" : "#22c55e");
  const ac = "#7c3aed";

  return (
    <section style={{ background: `linear-gradient(135deg, #f8f6ff 0%, ${ac}18 60%, ${ac}10 100%)`, position: "relative", overflow: "hidden", fontFamily: "'Outfit', sans-serif", padding: "clamp(40px,6vw,80px) 0 0" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: `radial-gradient(${ac}22 1px, transparent 1px)`, backgroundSize: "28px 28px" }} />
      <div style={{ position: "absolute", top: "90px", left: "clamp(16px,5%,60px)", background: `${ac}18`, border: `1.5px solid ${ac}44`, borderRadius: "999px", padding: "5px 14px", fontSize: "11.5px", fontWeight: 700, color: ac, fontFamily: "'Outfit', sans-serif", zIndex: 2, letterSpacing: "0.05em" }}>{course.category}</div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(16px,5%,60px)", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "clamp(24px,4%,60px)", position: "relative", zIndex: 1, marginTop: "80px" }} className="hero-flex">
        <div className="hero-img-wrap co-vR" style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "flex-start", minHeight: "300px" }}>
          <img src={`/${course.heroImage || "students.jpg"}`} alt={course.title} style={{ maxHeight: "clamp(240px,58vw,390px)", maxWidth: "150%", objectFit: "contain", marginBottom: "0px", objectPosition: "bottom center", display: "block", filter: `drop-shadow(0 16px 40px ${ac}33)`, borderRadius: "20px" }} />
        </div>

        <div className="hero-form-wrap co-v1" style={{ flex: "0 0 clamp(280px,38%,420px)", background: "#fff", borderRadius: "20px", padding: "clamp(24px,4%,36px) clamp(20px,4%,32px)", boxShadow: `0 8px 48px ${ac}22`, border: `1.5px solid ${ac}18`, marginBottom: "clamp(20px,4vw,48px)", alignSelf: "center" }}>
          {submitted === true ? (
            <div style={{ textAlign: "center", padding: "28px 0" }}>
              <div style={{ marginBottom: "12px", display: "flex", justifyContent: "center" }}><IcoCheckCircle size={44} color="#22c55e" /></div>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#111827", fontFamily: "'Outfit', sans-serif", marginBottom: "8px" }}>Brochure Downloaded!</h3>
              <p style={{ fontSize: "13px", color: "#6b7280", fontFamily: "'Outfit', sans-serif" }}>Read. Learnt. Connect.</p>
              <button onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", course: "" }); setErrors({}); setTouched({}); }} style={{ marginTop: "18px", background: ac, color: "#fff", border: "none", borderRadius: "50px", padding: "10px 24px", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>Submit Again</button>
            </div>
          ) : (
            <>
              <h3 style={{ fontSize: "clamp(16px,2vw,20px)", fontWeight: 900, color: "#111827", fontFamily: "'Outfit', sans-serif", marginBottom: "6px" }}>We're here to help!</h3>
              <p style={{ fontSize: "13px", color: "#9ca3af", fontFamily: "'Outfit', sans-serif", marginBottom: "22px" }}>Enquire about <strong>Courses & Training</strong></p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[{ key: "name", placeholder: "Your name", type: "text" }, { key: "email", placeholder: "Your email address", type: "email" }, { key: "phone", placeholder: "Your phone number", type: "tel" }].map((f) => (
                  <div key={f.key}>
                    <input type={f.type} placeholder={f.placeholder} value={formData[f.key]} onChange={(e) => handleChange(f.key, e.target.value)} onBlur={() => handleBlur(f.key)} onFocus={(e) => { e.currentTarget.style.borderColor = ac + "99"; }} style={{ width: "100%", padding: "12px 14px", border: `1.5px solid ${borderColor(f.key)}`, borderRadius: "10px", fontSize: "13.5px", fontFamily: "'Outfit', sans-serif", color: "#374151", outline: "none", background: "#fafafa", boxSizing: "border-box", transition: "border-color 0.2s" }} />
                    {touched[f.key] && errors[f.key] && (<p style={{ fontSize: "11.5px", color: "#ef4444", marginTop: "5px", fontFamily: "'Outfit', sans-serif", display: "flex", alignItems: "center", gap: "4px" }}><svg width="12" height="12" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#ef4444" strokeWidth="1.8" /><path d="M10 6v4M10 14h.01" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" /></svg>{errors[f.key]}</p>)}
                    {touched[f.key] && !errors[f.key] && formData[f.key] && (<p style={{ fontSize: "11.5px", color: "#22c55e", marginTop: "5px", fontFamily: "'Outfit', sans-serif", display: "flex", alignItems: "center", gap: "4px" }}><svg width="12" height="12" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#22c55e" strokeWidth="1.8" /><path d="M6 10l3 3 5-5" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>Looks good!</p>)}
                  </div>
                ))}
                <div>
                  <div style={{ position: "relative" }}>
                    <select value={formData.course} onChange={(e) => { handleChange("course", e.target.value); setTouched((p) => ({ ...p, course: true })); validate("course", e.target.value); }} onBlur={() => handleBlur("course")} style={{ width: "100%", padding: "12px 14px", border: `1.5px solid ${borderColor("course")}`, borderRadius: "10px", fontSize: "13.5px", fontFamily: "'Outfit', sans-serif", color: formData.course ? "#374151" : "#9ca3af", outline: "none", background: "#fafafa", appearance: "none", WebkitAppearance: "none", cursor: "pointer", boxSizing: "border-box", transition: "border-color 0.2s" }}>
                      <option value="">Select Course</option>
                      {Object.values(COURSES).map((c) => (<option key={c.title} value={nameToSlug(c.title)}>{c.title}</option>))}
                    </select>
                    <svg style={{ position: "absolute", right: "13px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M5 8l5 5 5-5" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  {touched.course && errors.course && (<p style={{ fontSize: "11.5px", color: "#ef4444", marginTop: "5px", fontFamily: "'Outfit', sans-serif", display: "flex", alignItems: "center", gap: "4px" }}><svg width="12" height="12" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#ef4444" strokeWidth="1.8" /><path d="M10 6v4M10 14h.01" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" /></svg>{errors.course}</p>)}
                </div>
                <button onClick={handleSubmit} disabled={submitted === "loading"} style={{ background: submitted === "loading" ? "#a78bfa" : ac, color: "#fff", border: "none", borderRadius: "50px", padding: "13px 24px", fontSize: "14px", fontWeight: 700, cursor: submitted === "loading" ? "not-allowed" : "pointer", fontFamily: "'Outfit', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: `0 6px 20px ${ac}44`, transition: "all 0.22s", marginTop: "4px", width: "100%", opacity: submitted === "loading" ? 0.8 : 1 }} onMouseEnter={(e) => { if (submitted !== "loading") { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 12px 30px ${ac}66`; } }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 6px 20px ${ac}44`; }}>
                  {submitted === "loading" ? (<><svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 1s linear infinite" }}><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" /><path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" /></svg>Downloading...</>) : (<>Download Brochure<svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></>)}
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
   PARSERS
══════════════════════════════════════════════════════ */
function parseFAQs(sections) {
  const items = [];
  sections.forEach((sec) => {
    sec.paras.forEach((p) => {
      const match = p.match(/Q:\s*(.+?)\s*[—\-]+\s*A:\s*(.+)/i);
      if (match) { items.push({ question: match[1].trim(), answer: match[2].trim() }); return; }
      const match2 = p.match(/Q:\s*(.+?\?)\s*A:\s*(.+)/i);
      if (match2) { items.push({ question: match2[1].trim(), answer: match2[2].trim() }); }
    });
  });
  return items;
}

function parseReviews(sections) {
  const items = [];
  sections.forEach((sec) => {
    sec.paras.forEach((p) => {
      const starMatch = p.match(/^(⭐+)/);
      const stars = starMatch ? starMatch[1].length : 5;
      let rest = p.replace(/^⭐+\s*[—\-]*\s*/, "");
      const quoteMatch = rest.match(/"(.+?)"\s*[—\-]+\s*(.+)/);
      if (quoteMatch) { items.push({ text: quoteMatch[1].trim(), name: quoteMatch[2].trim(), stars }); }
      else { items.push({ text: rest.replace(/"/g, "").trim(), name: "Student", stars }); }
    });
  });
  return items;
}

function parseCurriculumModules(sections) {
  const items = [];
  if (sections.length === 1 && sections[0].paras.length > 1) {
    sections[0].paras.forEach((p) => {
      const match = p.match(/^(Module\s*\d+:\s*.+?)\s*[—\-]+\s*(.+)/i);
      if (match) { items.push({ title: match[1].trim(), content: match[2].trim() }); }
      else { items.push({ title: "Module", content: p }); }
    });
  } else {
    sections.forEach((sec) => { items.push({ title: sec.heading, content: sec.paras.join(" ") }); });
  }
  return items;
}

/* ══════════════════════════════════════════════════════
   OVERVIEW — info card grid with SVG icons
══════════════════════════════════════════════════════ */
function OverviewRenderer({ sections, inView, accentColor }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 560px), 1fr))", gap: "18px" }}>
      {sections.map((sec, si) => (<OverviewCard key={si} section={sec} index={si} inView={inView} accentColor={accentColor} />))}
    </div>
  );
}

function OverviewCard({ section, index, inView, accentColor }) {
  const [hov, setHov] = useState(false);
  const IconComp = OV_ICON_COMPONENTS[index % OV_ICON_COMPONENTS.length];
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ opacity: inView ? 1 : 0, transform: inView ? (hov ? "translateY(-3px)" : "translateY(0)") : "translateY(20px)", transition: `all 0.45s ease ${0.04 + index * 0.05}s`, background: "#fff", borderRadius: "14px", padding: "clamp(20px,2.5vw,28px)", border: `1px solid ${hov ? accentColor + "28" : "#eeeaf5"}`, boxShadow: hov ? `0 10px 32px ${accentColor}10` : "0 1px 6px rgba(0,0,0,0.03)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${accentColor}, ${accentColor}44)`, borderRadius: "14px 14px 0 0" }} />
      <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${accentColor}0c`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
          <IconComp size={19} color={accentColor} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: "clamp(14px,1.5vw,16px)", fontWeight: 800, color: "#111827", fontFamily: "'Outfit', sans-serif", marginBottom: "10px", lineHeight: 1.35 }}>{section.heading}</h3>
          {section.paras.map((p, pi) => (<p key={pi} style={{ fontSize: "clamp(13px,1.2vw,14.5px)", color: "#5b6478", fontFamily: "'Outfit', sans-serif", lineHeight: 1.8, marginBottom: pi < section.paras.length - 1 ? "8px" : 0 }}>{p}</p>))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   CURRICULUM — timeline with book icons
══════════════════════════════════════════════════════ */
function CurriculumRenderer({ sections, inView, accentColor }) {
  const items = parseCurriculumModules(sections);
  return (
    <div style={{ position: "relative", paddingLeft: "40px" }}>
      <div style={{ position: "absolute", left: "15px", top: "8px", bottom: "8px", width: "2.5px", background: `linear-gradient(180deg, ${accentColor}, ${accentColor}33, ${accentColor}11)`, borderRadius: "2px" }} />
      {items.map((mod, i) => (<CurriculumCard key={i} module={mod} index={i} total={items.length} inView={inView} accentColor={accentColor} />))}
    </div>
  );
}

function CurriculumCard({ module, index, total, inView, accentColor }) {
  const [hov, setHov] = useState(false);
  const points = module.content.split(/[,.]/).map((s) => s.trim()).filter((s) => s.length > 2);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ position: "relative", marginBottom: index < total - 1 ? "18px" : 0, opacity: inView ? 1 : 0, transform: inView ? (hov ? "translateX(4px)" : "translateX(0)") : "translateX(-20px)", transition: `all 0.45s ease ${0.06 + index * 0.07}s` }}>
      <div style={{ position: "absolute", left: "-33px", top: "18px", width: "20px", height: "20px", borderRadius: "50%", background: hov ? accentColor : "#fff", border: `3px solid ${accentColor}`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, boxShadow: `0 0 0 4px ${accentColor}12`, transition: "all 0.25s" }}>
        <span style={{ fontSize: "8px", fontWeight: 900, color: hov ? "#fff" : accentColor, fontFamily: "'Outfit', sans-serif", transition: "color 0.25s" }}>{index + 1}</span>
      </div>
      <div style={{ background: hov ? `linear-gradient(135deg, ${accentColor}06, ${accentColor}03)` : "#fff", borderRadius: "12px", padding: "clamp(16px,2vw,22px)", border: `1.5px solid ${hov ? accentColor + "25" : "#eeeaf5"}`, boxShadow: hov ? `0 6px 24px ${accentColor}0c` : "0 1px 4px rgba(0,0,0,0.02)", transition: "all 0.25s", marginLeft: "4px" }}>
        <h4 style={{ fontSize: "clamp(13.5px,1.4vw,15px)", fontWeight: 800, color: accentColor, fontFamily: "'Outfit', sans-serif", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
          <IcoBook size={15} color={accentColor} />
          {module.title}
        </h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {points.map((pt, pi) => (<span key={pi} style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12.5px", color: "#5b6478", fontFamily: "'Outfit', sans-serif", background: `${accentColor}08`, borderRadius: "6px", padding: "4px 10px", lineHeight: 1.5 }}><span style={{ color: accentColor, fontSize: "7px" }}>●</span>{pt}</span>))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   FAQ — accordion cards
══════════════════════════════════════════════════════ */
function FAQRenderer({ sections, inView, accentColor }) {
  const faqs = parseFAQs(sections);
  const [openIndex, setOpenIndex] = useState(0);
  if (!faqs.length) return <DefaultRenderer sections={sections} inView={inView} accentColor={accentColor} />;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {faqs.map((faq, i) => (<FAQCard key={i} faq={faq} index={i} isOpen={openIndex === i} onClick={() => setOpenIndex(openIndex === i ? -1 : i)} inView={inView} accentColor={accentColor} />))}
    </div>
  );
}

function FAQCard({ faq, index, isOpen, onClick, inView, accentColor }) {
  return (
    <div onClick={onClick} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(14px)", transition: `opacity 0.4s ease ${0.03 + index * 0.04}s, transform 0.4s ease ${0.03 + index * 0.04}s`, background: isOpen ? "#fff" : "#fafbff", borderRadius: "12px", border: `1.5px solid ${isOpen ? accentColor + "30" : "#eeeaf5"}`, boxShadow: isOpen ? `0 6px 24px ${accentColor}10` : "none", cursor: "pointer", overflow: "hidden" }}>
      <div style={{ padding: "clamp(14px,2vw,18px) clamp(16px,2.5vw,22px)", display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: isOpen ? accentColor : `${accentColor}10`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.25s" }}>
          <span style={{ fontSize: "11px", fontWeight: 800, color: isOpen ? "#fff" : accentColor, fontFamily: "'Outfit', sans-serif" }}>{index + 1}</span>
        </div>
        <h4 style={{ flex: 1, fontSize: "clamp(13.5px,1.4vw,15px)", fontWeight: 700, color: isOpen ? "#111827" : "#374151", fontFamily: "'Outfit', sans-serif", lineHeight: 1.45 }}>{faq.question}</h4>
        <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: isOpen ? accentColor : `${accentColor}0c`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.25s" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}><path d="M6 9l6 6 6-6" stroke={isOpen ? "#fff" : accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </div>
      <div style={{ maxHeight: isOpen ? "400px" : "0px", overflow: "hidden", transition: "max-height 0.35s ease" }}>
        <div style={{ padding: "0 clamp(16px,2.5vw,22px) clamp(14px,2vw,18px)", paddingLeft: "clamp(56px,5.5vw,62px)" }}>
          <div style={{ width: "28px", height: "2px", background: `${accentColor}22`, borderRadius: "2px", marginBottom: "8px" }} />
          <p style={{ fontSize: "clamp(13px,1.25vw,14.5px)", color: "#5b6478", fontFamily: "'Outfit', sans-serif", lineHeight: 1.8 }}>{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   REVIEWS — testimonial cards
══════════════════════════════════════════════════════ */
function ReviewsRenderer({ sections, inView, accentColor }) {
  const reviews = parseReviews(sections);
  const scrollRef = useRef(null);
  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  if (!reviews.length) return <DefaultRenderer sections={sections} inView={inView} accentColor={accentColor} />;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginBottom: "14px" }}>
        {[{ d: -1, i: "←" }, { d: 1, i: "→" }].map(({ d, i }) => (
          <button key={d} onClick={() => scroll(d)} style={{ width: "30px", height: "30px", borderRadius: "50%", border: `1.5px solid ${accentColor}28`, background: "#fff", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: accentColor, transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = accentColor; e.currentTarget.style.color = "#fff"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = accentColor; }}>{i}</button>
        ))}
      </div>
      <div ref={scrollRef} style={{ display: "flex", gap: "16px", overflowX: "auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", paddingBottom: "8px" }}>
        {reviews.map((rev, i) => (<ReviewCard key={i} review={rev} index={i} inView={inView} accentColor={accentColor} />))}
      </div>
    </div>
  );
}

function ReviewCard({ review, index, inView, accentColor }) {
  const [hov, setHov] = useState(false);
  const colors = ["#7c3aed", "#2563eb", "#059669", "#d97706", "#dc2626", "#8b5cf6", "#0891b2", "#c026d3"];
  const bg = colors[index % colors.length];
  const initials = review.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ opacity: inView ? 1 : 0, transform: inView ? (hov ? "translateY(-4px)" : "translateY(0)") : "translateY(20px)", transition: `all 0.4s ease ${0.04 + index * 0.07}s`, background: "#fff", borderRadius: "14px", padding: "clamp(20px,2.5vw,26px)", border: `1.5px solid ${hov ? accentColor + "28" : "#eeeaf5"}`, boxShadow: hov ? `0 10px 36px ${accentColor}12` : "0 1px 6px rgba(0,0,0,0.03)", flex: "0 0 clamp(280px,34vw,360px)", minWidth: "280px", scrollSnapAlign: "start", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "10px", right: "16px", fontSize: "48px", fontWeight: 900, color: `${accentColor}08`, fontFamily: "Georgia, serif", lineHeight: 1, pointerEvents: "none" }}>"</div>
      <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
        {Array.from({ length: review.stars }, (_, i) => (<svg key={i} width="14" height="14" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0.5" /></svg>))}
      </div>
      <p style={{ fontSize: "clamp(13px,1.25vw,14.5px)", color: "#4b5563", fontFamily: "'Outfit', sans-serif", lineHeight: 1.8, marginBottom: "16px", fontStyle: "italic", position: "relative", zIndex: 1 }}>"{review.text}"</p>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", borderTop: `1px solid ${accentColor}0a`, paddingTop: "12px" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: `linear-gradient(135deg, ${bg}, ${bg}bb)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 2px 8px ${bg}40` }}>
          <span style={{ fontSize: "12px", fontWeight: 800, color: "#fff", fontFamily: "'Outfit', sans-serif" }}>{initials}</span>
        </div>
        <div>
          <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#111827", fontFamily: "'Outfit', sans-serif" }}>{review.name}</h4>
          <span style={{ fontSize: "10.5px", color: "#9ca3af", fontFamily: "'Outfit', sans-serif" }}>Verified Student</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   DEFAULT RENDERER
══════════════════════════════════════════════════════ */
function DefaultRenderer({ sections, inView, accentColor }) {
  return (
    <div>
      {sections.map((sec, si) => (
        <div key={si} style={{ marginBottom: "28px", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(14px)", transition: `all 0.45s ease ${0.08 + si * 0.06}s` }}>
          <h3 style={{ fontSize: "clamp(14px,1.4vw,16px)", fontWeight: 800, color: "#111827", fontFamily: "'Outfit', sans-serif", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: accentColor, flexShrink: 0 }} />
            {sec.heading}
          </h3>
          {sec.paras.map((p, pi) => (<p key={pi} style={{ fontSize: "clamp(13px,1.3vw,14.5px)", color: "#5b6478", fontFamily: "'Outfit', sans-serif", lineHeight: 1.85, marginBottom: "10px" }}>{p}</p>))}
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   TAB CONTENT ROUTER
══════════════════════════════════════════════════════ */
function TabContentRenderer({ tabName, sections, inView, accentColor }) {
  const n = tabName.toLowerCase();
  if (n.includes("faq")) return <FAQRenderer sections={sections} inView={inView} accentColor={accentColor} />;
  if (n.includes("review") || n.includes("testimonial")) return <ReviewsRenderer sections={sections} inView={inView} accentColor={accentColor} />;
  if (n.includes("curriculum") || n.includes("syllabus") || n.includes("module")) return <CurriculumRenderer sections={sections} inView={inView} accentColor={accentColor} />;
  if (n.includes("overview") || n.includes("about")) return <OverviewRenderer sections={sections} inView={inView} accentColor={accentColor} />;
  return <DefaultRenderer sections={sections} inView={inView} accentColor={accentColor} />;
}

/* ══════════════════════════════════════════════════════
   COURSE DETAIL TABS
══════════════════════════════════════════════════════ */
function CourseDetailSection({ course }) {
  const [ref, inView] = useInView(0.06);
  const [activeTab, setActiveTab] = useState(Object.keys(course.tabs)[0] || "Overview");
  const TABS = Object.keys(course.tabs);
  const accentColor = course.color || "#7c3aed";

  return (
    <section ref={ref} style={{ background: "#fafbff", padding: "clamp(40px,6vw,72px) 0", fontFamily: "'Outfit', sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `radial-gradient(${accentColor}06 1px, transparent 1px)`, backgroundSize: "24px 24px", zIndex: 0 }} />
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(16px,5%,60px)", position: "relative", zIndex: 1 }}>
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", marginBottom: "10px" }}>
            <h1 style={{ fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 900, color: accentColor, fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.5px" }}>{course.title}</h1>
            <StarRating rating={course.rating} color="#f59e0b" />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px,3%,28px)", flexWrap: "wrap" }}>
            {[
              { icon: <IcoClock size={14} color="#6b7280" />, label: course.timing },
              { icon: <IcoUsers size={14} color="#6b7280" />, label: `Students: ${course.students}` },
              { icon: <IcoTimer size={14} color="#6b7280" />, label: `Duration: ${course.duration}` },
            ].map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "clamp(12px,1.2vw,13.5px)", color: "#6b7280", fontFamily: "'Outfit', sans-serif" }}>{m.icon}<span>{m.label}</span></div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "0", borderBottom: `2px solid ${accentColor}18`, marginBottom: "36px", overflowX: "auto", scrollbarWidth: "none", opacity: inView ? 1 : 0, transition: "all 0.6s ease 0.15s" }}>
          {TABS.map((tab) => (<button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "12px clamp(16px,3%,28px)", fontSize: "clamp(13px,1.3vw,14.5px)", fontWeight: 700, fontFamily: "'Outfit', sans-serif", cursor: "pointer", border: "none", background: "transparent", color: activeTab === tab ? accentColor : "#6b7280", borderBottom: activeTab === tab ? `3px solid ${accentColor}` : "3px solid transparent", marginBottom: "-2px", transition: "all 0.22s", whiteSpace: "nowrap" }}>{tab}</button>))}
        </div>

        <div key={activeTab} className="tab-content-fade" style={{ opacity: inView ? 1 : 0, transition: "opacity 0.4s ease" }}>
          <TabContentRenderer tabName={activeTab} sections={course.tabs[activeTab].sections} inView={inView} accentColor={accentColor} />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   OTHER COURSES
══════════════════════════════════════════════════════ */
function OtherCoursesSection({ currentCourseId, otherSlugs }) {
  const [ref, inView] = useInView(0.06);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const others = otherSlugs.filter((s) => s !== currentCourseId && COURSES[s]).map((s) => ({ slug: s, ...COURSES[s] }));
  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  if (!others.length) return null;

  return (
    <section ref={ref} style={{ background: "#fff", padding: "clamp(10px,3vw,40px) 0 clamp(30px,5vw,60px)", fontFamily: "'Outfit', sans-serif", overflow: "hidden" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(16px,5%,60px)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px", flexWrap: "wrap", gap: "12px", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)", transition: "all 0.6s ease" }}>
          <h2 style={{ fontSize: "clamp(1.2rem,2.5vw,1.8rem)", fontWeight: 900, color: "#111827", fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.02em" }}>RELATED COURSES</h2>
          <div style={{ display: "flex", gap: "10px" }}>
            {[{ dir: -1, icon: "←" }, { dir: 1, icon: "→" }].map(({ dir, icon }) => (
              <button key={dir} onClick={() => scroll(dir)} style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid #e5e7eb", background: "#fff", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#7c3aed", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#7c3aed"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#7c3aed"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#7c3aed"; e.currentTarget.style.borderColor = "#e5e7eb"; }}>{icon}</button>
            ))}
          </div>
        </div>
        <div ref={scrollRef} style={{ display: "flex", gap: "20px", overflowX: "auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", paddingBottom: "8px" }}>
          {others.map((c, i) => (<OtherCourseCard key={c.slug} course={c} inView={inView} delay={0.05 + i * 0.08} onClick={() => navigate(`/courses/${c.slug}`)} />))}
        </div>
      </div>
    </section>
  );
}

function OtherCourseCard({ course, inView, delay, onClick }) {
  const [hovered, setHovered] = useState(false);
  const accent = course.color || "#7c3aed";
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={onClick} style={{ background: "#fff", borderRadius: "16px", padding: 0, overflow: "hidden", flex: "0 0 clamp(240px,30vw,300px)", minWidth: "240px", display: "flex", flexDirection: "column", scrollSnapAlign: "start", opacity: inView ? 1 : 0, transform: inView ? (hovered ? "translateY(-6px) scale(1.02)" : "translateY(0)") : "translateY(24px)", transition: `opacity 0.6s ease ${delay}s, transform 0.3s ease`, boxShadow: hovered ? `0 16px 40px ${accent}22` : "0 2px 12px rgba(0,0,0,0.06)", cursor: "pointer", border: `1.5px solid ${hovered ? accent + "44" : "#f0edf7"}` }}>
      <div style={{ width: "100%", height: "150px", overflow: "hidden", position: "relative" }}>
        <img src={`/${course.heroImage || "students.jpg"}`} alt={course.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease", transform: hovered ? "scale(1.08)" : "scale(1)" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 40%, ${accent}30 100%)`, pointerEvents: "none" }} />
      </div>
      <div style={{ padding: "16px 18px 20px" }}>
        <span style={{ fontSize: "10px", fontWeight: 700, color: accent, background: `${accent}14`, borderRadius: "4px", padding: "2px 8px", fontFamily: "'Outfit', sans-serif", marginBottom: "8px", display: "inline-block" }}>{course.category}</span>
        <h3 style={{ fontSize: "clamp(14px,1.5vw,16px)", fontWeight: 800, color: "#111827", fontFamily: "'Outfit', sans-serif", marginBottom: "8px", marginTop: "6px", lineHeight: 1.3 }}>{course.title}</h3>
        <div style={{ marginBottom: "8px" }}><StarRating rating={course.rating} color="#f59e0b" size={13} /></div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "12px", color: "#6b7280", fontFamily: "'Outfit', sans-serif", marginBottom: "12px" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><IcoTimer size={12} color="#6b7280" />{course.duration}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><IcoGraduationCap size={12} color="#6b7280" />{course.students}</span>
        </div>
        <button style={{ background: accent, color: "#fff", border: "none", borderRadius: "8px", padding: "9px 18px", fontSize: "12px", fontWeight: 800, letterSpacing: "0.04em", cursor: "pointer", fontFamily: "'Outfit', sans-serif", transition: "all 0.22s", boxShadow: hovered ? `0 6px 18px ${accent}44` : "none" }}>KNOW MORE →</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   404
══════════════════════════════════════════════════════ */
function CourseNotFound() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Outfit', sans-serif", gap: "16px" }}>
      <IcoSearch size={52} color="#9ca3af" />
      <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#111827" }}>Course Not Found</h2>
      <p style={{ color: "#6b7280", fontSize: "14px" }}>The course you're looking for doesn't exist.</p>
      <button onClick={() => navigate("/courses/ai-medical-coding")} style={{ background: "#7c3aed", color: "#fff", border: "none", borderRadius: "50px", padding: "12px 28px", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>Browse Courses</button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════ */
export default function CoursesPage() {
  const { courseId } = useParams();
  const resolvedId = courseId || "ai-medical-coding";
  const course = COURSES[resolvedId];
  useEffect(() => { window.scrollTo(0, 0); }, [resolvedId]);

  return (
    <div style={{ fontFamily: "'Outfit','Segoe UI',sans-serif", margin: 0, padding: 0, overflowX: "hidden", background: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; }
        @keyframes coFadeRight { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes coFadeScale { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
        @keyframes tabFade { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .co-v1 { animation: coFadeRight 0.65s ease forwards; opacity:0; animation-delay:0.15s; }
        .co-vR { animation: coFadeScale 0.9s ease forwards; opacity:0; animation-delay:0.10s; }
        .tab-content-fade { animation: tabFade 0.35s ease forwards; }
        input::placeholder { color: #9ca3af; }
        input:focus, select:focus { outline: none; }
        select option { color: #374151; }
        *::-webkit-scrollbar { display: none; }
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
          <OtherCoursesSection currentCourseId={resolvedId} otherSlugs={course.otherCourses || []} />
        </>
      ) : (
        <CourseNotFound />
      )}
      <Footer />
      <PageMeta />
      <SocialSidebar />
    </div>
  );
}