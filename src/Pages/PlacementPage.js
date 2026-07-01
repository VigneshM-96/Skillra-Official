import { useEffect, useRef, useState } from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";
import SocialSidebar from "../components/SocialSideBar";
import { useSanityMeta } from '../hooks/useSanityMeta';

const PUB = process.env.PUBLIC_URL || "";
const SHEETS_URL = "https://script.google.com/macros/s/AKfycbws7QqEJT-y2F_6U_VyyuQ56sdXZUYEgXb7qLagegYmmPfqI-5EoGJ6wXGrHuQIC-jTWA/exec";

const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: currentYear - 2019 }, (_, i) => 2020 + i);

const META = {
  title:       "Placements | Skillra – 250+ Students Placed in Top Companies",
  description: "Discover Skillra's placement success with 250+ students placed in top companies like Cognizant, Optum, Sutherland, CorroHealth, R1, and more. Explore our corporate tie-ups and placement support.",
  canonical:   "https://www.skillra.com/placement",
  keywords:    "Skillra placements, medical coding jobs, IT placements, Cognizant hiring, Optum careers, Sutherland jobs, campus placements, corporate tie-ups, placement support, healthcare jobs",
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
  const id = "skillra-placements-jsonld";
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
    setMeta("property", "og:image:alt",   "Skillra placement success and hiring partners");
    setMeta("property", "og:site_name",   "Skillra");
    setMeta("property", "og:locale",      "en_IN");
    setMeta("name", "twitter:card",        "summary_large_image");
    setMeta("name", "twitter:title",       META.title);
    setMeta("name", "twitter:description", META.description);
    setMeta("name", "twitter:image",       META.ogImage);
    setMeta("name", "twitter:image:alt",   "Skillra placement success and hiring partners");
    setJsonLd({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Skillra Placements",
      "description": META.description,
      "url": META.canonical,
      "mainEntity": {
        "@type": "EducationalOrganization",
        "name": "Skillra Health Innovations Pvt Ltd",
        "logo": "/logo.png",
        "url": "https://www.skillra.com",
        "alumni": {
          "@type": "QuantitativeValue",
          "value": 250,
          "unitText": "students placed"
        },
        "member": [
          { "@type": "Organization", "name": "Cognizant" },
          { "@type": "Organization", "name": "Reveleer" },
          { "@type": "Organization", "name": "Sutherland" },
          { "@type": "Organization", "name": "Huron" },
          { "@type": "Organization", "name": "CorroHealth" },
          { "@type": "Organization", "name": "R1" },
          { "@type": "Organization", "name": "FirstSource" },
          { "@type": "Organization", "name": "Clarus" },
          { "@type": "Organization", "name": "Savista" },
          { "@type": "Organization", "name": "S10 Health" },
          { "@type": "Organization", "name": "Vee Healthtek" },
          { "@type": "Organization", "name": "Medcode Services" },
          { "@type": "Organization", "name": "Optum" },
          { "@type": "Organization", "name": "Aaneel" }
        ]
      }
    });
  }, []);
  return null;
}


function useInView(threshold = 0.12) {
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

/* ═══════════════════════════════════════════════════
   POPUP FORM
═══════════════════════════════════════════════════ */
function PlacementPopup({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", yearOut: "", qualification: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    else if (form.name.trim().length < 2) e.name = "Name must be at least 2 characters";
    else if (!/^[a-zA-Z\s.'-]+$/.test(form.name.trim())) e.name = "Name can only contain letters";

    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = "Enter a valid email address";

    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) e.phone = "Enter a valid 10-digit Indian mobile number";

    if (!form.yearOut) e.yearOut = "Please select your year of passout";
    if (!form.qualification.trim()) e.qualification = "Qualification is required";
    else if (form.qualification.trim().length < 2) e.qualification = "Enter a valid qualification";

    return e;
  };

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(p => ({ ...p, [field]: "" }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setStatus("loading");
    try {
      await fetch(SHEETS_URL, {
        method: "POST",
        body: JSON.stringify({
          type: "placement",
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          yearOut: form.yearOut,
          qualification: form.qualification.trim(),
        }),
      });
      setStatus("success");
      setTimeout(() => { onClose(); }, 2800);
    } catch {
      setStatus("error");
    }
  };

  const ErrorMsg = ({ field }) => errors[field] ? (
    <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "4px", paddingLeft: "2px" }}>
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <circle cx="6.5" cy="6.5" r="6" fill="#ef4444" />
        <text x="6.5" y="10" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">!</text>
      </svg>
      <span style={{ color: "#ef4444", fontSize: "11.5px", fontFamily: "'Outfit',sans-serif" }}>{errors[field]}</span>
    </div>
  ) : null;

  const inputStyle = (field) => ({
    width: "100%", padding: "11px 14px",
    border: `1.5px solid ${errors[field] ? "#ef4444" : "#e5e0f8"}`,
    borderRadius: "10px", fontSize: "13.5px",
    fontFamily: "'Outfit',sans-serif", color: "#1a0640",
    outline: "none", background: errors[field] ? "#fff5f5" : "#faf9ff",
    transition: "border-color 0.18s, background 0.18s",
    boxSizing: "border-box",
  });

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(15,5,40,0.60)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
        animation: "fadeInOverlay 0.2s ease",
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: "#fff", borderRadius: "22px",
        padding: "clamp(24px,4vw,36px) clamp(20px,4vw,32px) clamp(20px,4vw,30px)",
        width: "100%", maxWidth: "480px",
        position: "relative",
        boxShadow: "0 24px 64px rgba(124,58,237,0.20)",
        animation: "slideUpModal 0.28s cubic-bezier(0.34,1.56,0.64,1)",
        maxHeight: "90vh", overflowY: "auto",
      }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position: "absolute", top: "14px", right: "14px",
          background: "#f3f0ff", border: "none", borderRadius: "50%",
          width: "30px", height: "30px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#7c3aed", fontSize: "17px", fontWeight: 700,
        }}>×</button>

        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "28px 0" }}>
            <div style={{ fontSize: "52px", marginBottom: "14px" }}>🎉</div>
            <h3 style={{ color: "#1a0640", fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: "20px", marginBottom: "8px" }}>
              Application Submitted!
            </h3>
            <p style={{ color: "#6b5a9e", fontFamily: "'Outfit',sans-serif", fontSize: "13.5px", lineHeight: 1.6 }}>
              We'll review your details and get back to you shortly.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                background: "#f3f0ff", borderRadius: "50px",
                padding: "4px 12px", marginBottom: "10px",
              }}>
                <span style={{ fontSize: "13px" }}>🎓</span>
                <span style={{ fontSize: "11px", fontWeight: 800, color: "#7c3aed", fontFamily: "'Outfit',sans-serif", letterSpacing: "0.08em" }}>
                  PLACEMENT ASSISTANCE
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(18px,3vw,22px)", fontWeight: 900, color: "#1a0640", fontFamily: "'Outfit',sans-serif", lineHeight: 1.2, margin: 0 }}>
                Apply for Placement Support
              </h2>
              <p style={{ fontSize: "12.5px", color: "#6b5a9e", fontFamily: "'Outfit',sans-serif", marginTop: "5px" }}>
                Fill in your details — all fields are required.
              </p>
            </div>

            {/* Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

              {/* Name */}
              <div>
                <label style={{ fontSize: "11.5px", fontWeight: 700, color: "#5c4a80", fontFamily: "'Outfit',sans-serif", display: "block", marginBottom: "4px" }}>Full Name *</label>
                <input
                  style={inputStyle("name")}
                  placeholder="e.g. Priya Sharma"
                  value={form.name}
                  onChange={e => handleChange("name", e.target.value)}
                />
                <ErrorMsg field="name" />
              </div>

              {/* Email */}
              <div>
                <label style={{ fontSize: "11.5px", fontWeight: 700, color: "#5c4a80", fontFamily: "'Outfit',sans-serif", display: "block", marginBottom: "4px" }}>Email Address *</label>
                <input
                  style={inputStyle("email")}
                  placeholder="e.g. priya@gmail.com"
                  type="email"
                  value={form.email}
                  onChange={e => handleChange("email", e.target.value)}
                />
                <ErrorMsg field="email" />
              </div>

              {/* Phone */}
              <div>
                <label style={{ fontSize: "11.5px", fontWeight: 700, color: "#5c4a80", fontFamily: "'Outfit',sans-serif", display: "block", marginBottom: "4px" }}>Phone Number *</label>
                <input
                  style={inputStyle("phone")}
                  placeholder="10-digit mobile number"
                  type="tel"
                  value={form.phone}
                  onChange={e => handleChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                />
                <ErrorMsg field="phone" />
              </div>

              {/* Year of Passout */}
              <div>
                <label style={{ fontSize: "11.5px", fontWeight: 700, color: "#5c4a80", fontFamily: "'Outfit',sans-serif", display: "block", marginBottom: "4px" }}>Year of Passout *</label>
                <select
                  style={{ ...inputStyle("yearOut"), appearance: "none", cursor: "pointer", color: form.yearOut ? "#1a0640" : "#9ca3af" }}
                  value={form.yearOut}
                  onChange={e => handleChange("yearOut", e.target.value)}
                >
                  <option value="" disabled>Select year</option>
                  {YEAR_OPTIONS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <ErrorMsg field="yearOut" />
              </div>

              {/* Qualification */}
              <div>
                <label style={{ fontSize: "11.5px", fontWeight: 700, color: "#5c4a80", fontFamily: "'Outfit',sans-serif", display: "block", marginBottom: "4px" }}>Qualification *</label>
                <input
                  style={inputStyle("qualification")}
                  placeholder="e.g. B.Pharm, B.E CSE, MBA"
                  value={form.qualification}
                  onChange={e => handleChange("qualification", e.target.value)}
                />
                <ErrorMsg field="qualification" />
              </div>
            </div>

            {status === "error" && (
              <p style={{ color: "#ef4444", fontSize: "12px", fontFamily: "'Outfit',sans-serif", marginTop: "10px" }}>
                Something went wrong. Please try again.
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              style={{
                width: "100%", padding: "13px",
                background: status === "loading" ? "#a78bfa" : "#7c3aed",
                color: "#fff", border: "none", borderRadius: "50px",
                fontSize: "14.5px", fontWeight: 700,
                fontFamily: "'Outfit',sans-serif",
                cursor: status === "loading" ? "not-allowed" : "pointer",
                marginTop: "16px",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                transition: "all 0.22s",
                boxShadow: "0 6px 20px rgba(124,58,237,0.35)",
              }}
            >
              {status === "loading" ? "Submitting..." : "Submit Application"}
              {status !== "loading" && (
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   FLOATING BADGES
═══════════════════════════════════════════════════ */
function FloatingBadge({ icon, label, style, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div className="hero-badge" style={{
      position: "absolute", display: "flex", alignItems: "center", gap: "8px",
      background: "rgba(255,255,255,0.95)", backdropFilter: "blur(18px) saturate(1.6)",
      WebkitBackdropFilter: "blur(18px) saturate(1.6)",
      border: "1.5px solid rgba(255,255,255,0.98)", borderRadius: "12px",
      padding: "clamp(6px,1vw,10px) clamp(10px,2vw,16px)",
      boxShadow: "0 8px 28px rgba(109,40,217,0.13), 0 1px 0 rgba(255,255,255,0.9) inset",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.93)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.55s cubic-bezier(.34,1.56,.64,1) ${delay}ms`,
      zIndex: 20, ...style,
    }}>
      <div style={{
        width: "clamp(26px,3.5vw,34px)", height: "clamp(26px,3.5vw,34px)",
        borderRadius: "8px",
        background: "linear-gradient(135deg,rgba(124,58,237,0.10),rgba(167,139,250,0.18))",
        border: "1px solid rgba(124,58,237,0.18)",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>{icon}</div>
      <div style={{
        fontSize: "clamp(10px,1.2vw,13px)", fontWeight: 700, color: "#1a0640",
        lineHeight: 1.2, fontFamily: "'Outfit',sans-serif", whiteSpace: "nowrap",
      }}>{label}</div>
    </div>
  );
}

function ActiveStudentsBadge({ style, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div className="hero-badge" style={{
      position: "absolute", display: "flex", alignItems: "center", gap: "8px",
      background: "#1a1035", borderRadius: "50px",
      padding: "clamp(5px,1vw,8px) clamp(10px,2vw,16px) clamp(5px,1vw,8px) clamp(5px,1vw,8px)",
      boxShadow: "0 8px 28px rgba(20,8,56,0.35)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.93)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.55s cubic-bezier(.34,1.56,.64,1) ${delay}ms`,
      zIndex: 20, ...style,
    }}>
      <div style={{
        width: "clamp(26px,3.5vw,34px)", height: "clamp(26px,3.5vw,34px)",
        borderRadius: "50%",
        background: "linear-gradient(135deg,#7c3aed,#a78bfa)",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="7" r="3.5" stroke="white" strokeWidth="1.8" />
          <path d="M3 17c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
      <div>
        <div style={{ fontSize: "clamp(11px,1.4vw,14px)", fontWeight: 800, color: "#fff", lineHeight: 1, fontFamily: "'Outfit',sans-serif" }}>200+</div>
        <div style={{ fontSize: "clamp(8px,1vw,10px)", color: "rgba(255,255,255,0.65)", marginTop: "2px", fontWeight: 500, fontFamily: "'Outfit',sans-serif" }}>Active Learners</div>
      </div>
    </div>
  );
}

function PlacedBadge({ style, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div className="hero-badge" style={{
      position: "absolute", background: "#f5c518", borderRadius: "10px",
      padding: "clamp(6px,1vw,10px) clamp(12px,2vw,20px)",
      boxShadow: "0 8px 28px rgba(245,197,24,0.40)",
      opacity: visible ? 1 : 0,
      transform: visible ? "rotate(-2deg) scale(1)" : "rotate(-2deg) scale(0.88) translateY(10px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.55s cubic-bezier(.34,1.56,.64,1) ${delay}ms`,
      zIndex: 20, ...style,
    }}>
      <div style={{ fontSize: "clamp(11px,1.4vw,15px)", fontWeight: 900, color: "#1a0640", fontFamily: "'Outfit',sans-serif", letterSpacing: "0.3px" }}>Placed ✓</div>
    </div>
  );
}

function DiamondPattern({ isMobile = false }) {
  const patId = isMobile ? "diamondPatMobile" : "diamondPatDesktop";
  return (
    <div style={{
      position: "absolute", bottom: 0, left: "50%",
      transform: "translateX(-50%)",
      width: isMobile ? "min(340px, 85%)" : "min(490px, 90%)",
      aspectRatio: "490/530",
      borderRadius: "50% 50% 0 0 / 48% 48% 0 0",
      background: "rgba(195,180,255,0.25)", marginBottom : "100px",
      overflow: "hidden",
      zIndex: 1,
    }}>
      <svg viewBox="0 0 490 530" style={{ width: "100%", height: "100%", display: "block" }}>
        <defs>
          <pattern id={patId} x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <rect
              x="14" y="2" width="11" height="11" rx="1.5"
              transform="rotate(45 14 7.5)"
              fill="none"
              stroke="rgba(124,58,237,0.5)"
              strokeWidth="1.5"
            />
          </pattern>
        </defs>
        <rect x="0" y="0" width="490" height="530" fill={`url(#${patId})`} />
      </svg>
    </div>
  );
}

function AboutHero({ onCtaClick }) {
  return (
    <section id="about-home" style={{
      background: "radial-gradient(ellipse 110% 110% at 15% 50%,rgba(210,195,255,0.55) 0%,rgba(220,210,255,0.40) 40%,#ede8f8 100%)",
      minHeight: "100vh", display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `radial-gradient(rgba(124,58,237,0.08) 1px,transparent 1px)`,
        backgroundSize: "28px 28px"
      }} />

      {/* ── Desktop Layout ── */}
      <div className="about-inner about-desktop" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "nowrap",
        padding: "0 5%", width: "100%", gap: "16px",
        position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto",
      }}>

        {/* Left: Title */}
        <div className="about-left" style={{ flex: "0 0 auto", width: "500px", maxWidth: "100%" }}>
          <h1 className="cr-v1 about-title" style={{
            fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 900,
            lineHeight: 1.08, letterSpacing: "-1.5px",
            marginBottom: "12px", fontFamily: "'Outfit', sans-serif",
          }}>
            <span style={{ color: "#1a0640" }}>Your Skills Deserve</span><br />
            <span style={{ color: "#f97316" }}>the Right</span><br />
            <span style={{ color: "#f97316" }}>Opportunity</span>
          </h1>
          <div className="ab-v1" style={{ marginBottom: "24px" }}>
            <svg viewBox="0 0 320 20" style={{ width: "min(320px,100%)", height: "14px", overflow: "visible" }} preserveAspectRatio="none">
              <path className="about-arc" d="M 4 14 C 60 2, 200 0, 316 12" fill="none" stroke="#7c3aed" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>
          <p className="about-desc-desktop" style={{ color: "#5c4a80", fontSize: "clamp(13px,1.5vw,14.5px)", lineHeight: 1.8, marginBottom: "34px", maxWidth: "420px", fontFamily: "'Outfit',sans-serif", fontWeight: 400 }}>
            At Skillra, we don't just teach skills — we help you turn them into real careers. Our Placement Assistance Program is designed to help students land internships and jobs with confidence.
          </p>
          <div className="about-btn-desktop">
            <a href="/placement" style={{ textDecoration: "none" }} onClick={(e) => e.preventDefault()}>
            <button className="about-cta-btn" onClick={onCtaClick}
              style={{ background: "#7c3aed", color: "#fff", border: "none", borderRadius: "50px", padding: "15px 32px", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif", display: "inline-flex", alignItems: "center", gap: "10px", boxShadow: "0 6px 24px rgba(124,58,237,0.38)", letterSpacing: "0.3px", transition: "all 0.22s", position: "relative", overflow: "hidden" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.03)"; e.currentTarget.style.boxShadow = "0 14px 36px rgba(124,58,237,0.55)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(124,58,237,0.38)"; }}>
              Get Placement Assistance
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            </a>
          </div>
        </div>

        {/* Right: Image */}
        <div className="about-right ab-vR" style={{
          flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-end",
          position: "relative", minWidth: 0,
          height: "clamp(500px, 80vw, 950px)",
          overflow: "visible",
          marginTop: "-60px",
        }}>
          <DiamondPattern />
          <img
            src={`${PUB}/aboutusgirl.png`}
            alt="About Us"
            style={{
              position: "relative", zIndex: 5,
              height: "1300px",
              width: "auto", maxWidth: "120%",
              objectFit: "contain", objectPosition: "bottom center",
              display: "block", alignSelf: "flex-end",
              filter: "drop-shadow(0 20px 50px rgba(109,40,217,0.18))", marginBottom : "100px"
            }}
          />
          <FloatingBadge
            icon={<svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 2C6.13 2 3 5.13 3 9c0 2.38 1.19 4.47 3 5.74V17h8v-2.26C15.81 13.47 17 11.38 17 9c0-3.87-3.13-7-7-7z" stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" /><path d="M8 17h4" stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round" /></svg>}
            label="Lifetime Support" style={{ top: "38%", right: "2%" }} delay={600}
          />
          <ActiveStudentsBadge style={{ bottom: "44%", left: "2%" }} delay={800} />
          <PlacedBadge style={{ bottom: "32%", right: "5%" }} delay={700} />
          <FloatingBadge
            icon={<svg width="14" height="14" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2.5" stroke="#7c3aed" strokeWidth="1.8" /><path d="M2 8h16" stroke="#7c3aed" strokeWidth="1.5" /><circle cx="6" cy="12.5" r="1" fill="#7c3aed" /><circle cx="10" cy="12.5" r="1" fill="#7c3aed" /></svg>}
            label="10+ Courses" style={{ bottom: "18%", left: "4%" }} delay={1000}
          />
        </div>
      </div>

      {/* ── Mobile Layout ── */}
      <div className="about-mobile" style={{
        display: "none", flexDirection: "column", alignItems: "center",
        width: "100%", position: "relative", zIndex: 1,
        padding: "60px 5% 40px", gap: "0",
      }}>

        {/* 1. Title + Arc */}
        <div style={{ width: "100%", textAlign: "center", marginBottom: "24px", marginTop : "20px"}}>
          <h1 style={{
            fontSize: "clamp(1.8rem,7vw,2.6rem)", fontWeight: 900,
            lineHeight: 1.1, letterSpacing: "-1px",
            marginBottom: "10px", fontFamily: "'Outfit', sans-serif",
          }}>
            <span style={{ color: "#1a0640" }}>Your Skills Deserve</span><br />
            <span style={{ color: "#f97316" }}>the Right Opportunity</span>
          </h1>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <svg viewBox="0 0 320 20" style={{ width: "min(260px,80%)", height: "12px", overflow: "visible" }} preserveAspectRatio="none">
              <path d="M 4 14 C 60 2, 200 0, 316 12" fill="none" stroke="#7c3aed" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* 2. Image with Diamond background + Badges */}
<div style={{
  position: "relative", width: "100%",
  height: "clamp(380px, 95vw, 520px)", // ⬆️ taller container
  display: "flex", justifyContent: "center", alignItems: "flex-end",
  marginTop: "-150px", marginBottom : "20px",
}}>
  {/* Smaller diamond bg */}
  <div style={{
    position: "absolute", bottom: 0, left: "50%",
    transform: "translateX(-50%)",
    width: "min(240px, 65%)", // ⬇️ smaller than before (was 340px/85%)
    aspectRatio: "490/530",
    borderRadius: "50% 50% 0 0 / 48% 48% 0 0",
    background: "rgba(195,180,255,0.25)",
    overflow: "hidden",
    zIndex: 1,
  }}>
    <svg viewBox="0 0 490 530" style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <pattern id="diamondPatMobile" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <rect x="14" y="2" width="11" height="11" rx="1.5" transform="rotate(45 14 7.5)"
            fill="none" stroke="rgba(124,58,237,0.5)" strokeWidth="1.5" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="490" height="530" fill="url(#diamondPatMobile)" />
    </svg>
  </div>

  {/* Bigger image */}
  <img
    src={`${PUB}/aboutusgirl.png`}
    alt="About Us"
    style={{
      position: "relative", zIndex: 5,
      height: "55%", // ⬆️ overflows container to look bigger
      width: "auto",
      maxWidth: "100%",
      objectFit: "contain", objectPosition: "bottom center",
      display: "block", alignSelf: "flex-end",
      filter: "drop-shadow(0 16px 36px rgba(109,40,217,0.18))",
    }}
  />

  {/* Badges */}
  <FloatingBadge
  icon={<svg width="11" height="11" viewBox="0 0 20 20" fill="none"><path d="M10 2C6.13 2 3 5.13 3 9c0 2.38 1.19 4.47 3 5.74V17h8v-2.26C15.81 13.47 17 11.38 17 9c0-3.87-3.13-7-7-7z" stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" /><path d="M8 17h4" stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round" /></svg>}
  label="Lifetime Support" style={{ top: "44%", right: "8%", transform: "scale(0.82)", transformOrigin: "top right" }} delay={600}
/>
<ActiveStudentsBadge style={{ bottom: "40%", left: "8%", transform: "scale(0.82)", transformOrigin: "left center" }} delay={800} />
<PlacedBadge style={{ bottom: "28%", right: "8%", transform: "scale(0.82)", transformOrigin: "right center" }} delay={700} />
<FloatingBadge
  icon={<svg width="11" height="11" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2.5" stroke="#7c3aed" strokeWidth="1.8" /><path d="M2 8h16" stroke="#7c3aed" strokeWidth="1.5" /><circle cx="6" cy="12.5" r="1" fill="#7c3aed" /><circle cx="10" cy="12.5" r="1" fill="#7c3aed" /></svg>}
  label="4+ offers" style={{ bottom: "16%", left: "8%", transform: "scale(0.82)", transformOrigin: "left bottom" }} delay={1000}
/>
</div>

        {/* 3. Short Description */}
        <p style={{
          color: "#5c4a80", fontSize: "14px", lineHeight: 1.8,
          maxWidth: "360px", fontFamily: "'Outfit',sans-serif",
          fontWeight: 400, textAlign: "center", marginBottom: "24px",
        }}>
          At Skillra, we don't just teach skills — we help you turn them into real careers. Our Placement Assistance Program is designed to help students land internships and jobs with confidence.
        </p>

        {/* 4. Button */}
        <button className="about-cta-btn" onClick={onCtaClick}
          style={{ background: "#7c3aed", color: "#fff", border: "none", borderRadius: "50px", padding: "14px 30px", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif", display: "inline-flex", alignItems: "center", gap: "10px", boxShadow: "0 6px 24px rgba(124,58,237,0.38)", transition: "all 0.22s" }}>
          Get Placement Assistance
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-desktop { display: none !important; }
          .about-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .about-desktop { display: flex !important; }
          .about-mobile { display: none !important; }
        }
      `}</style>
    </section>
  );
}
/* ═══════════════════════════════════════════════════
   WHY STUDENTS TRUST SKILLRA
═══════════════════════════════════════════════════ */
const TRUST_TOP = [
  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>, title: "Practical skill training", desc: "Learn skills that are actually used in real jobs, not just theory from textbooks. Our training focuses on hands-on practice so you can confidently apply what you learn." },
  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>, title: "Career-focused learning", desc: "Every program at Skillra is designed with career outcomes in mind. You learn the exact skills companies expect from freshers and job seekers." },
];
const TRUST_BOTTOM = [
  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>, title: "Real industry projects", desc: "Work on projects that simulate real company tasks. Build a portfolio that proves your practical abilities to recruiters." },
  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>, title: "Interview preparation", desc: "Prepare for both HR and technical interviews with expert guidance. Practice with mock interviews to improve confidence." },
  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>, title: "Continuous mentorship", desc: "Get ongoing support from industry mentors who guide you through your learning journey and career decisions." },
];

function VerticalZigzag() {
  return (
    <div style={{ width: "1px", flexShrink: 0, position: "relative", background: "#e5e7eb" }}>
      <svg viewBox="0 0 16 140" style={{ width: "16px", height: "140px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} preserveAspectRatio="none">
        <polyline points="8,0 2,17.5 14,35 2,52.5 14,70 2,87.5 14,105 2,122.5 8,140" fill="none" stroke="#c4b5fd" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function TrustCard({ feat }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="trust-card"
      style={{ flex: 1, padding: "clamp(20px,3vw,32px) clamp(16px,2.5vw,28px)", background: hovered ? "#faf8ff" : "#fff", transition: "background 0.2s", cursor: "default", minWidth: 0 }}>
      <div style={{ marginBottom: "14px" }}>{feat.icon}</div>
      <h3 style={{ fontSize: "clamp(13px,1.4vw,14.5px)", fontWeight: 700, color: "#7c3aed", fontFamily: "'Outfit',sans-serif", marginBottom: "8px", lineHeight: 1.3 }}>{feat.title}</h3>
      <p style={{ fontSize: "clamp(12px,1.2vw,13px)", color: "#6b7280", fontFamily: "'Outfit',sans-serif", lineHeight: 1.75, fontWeight: 400 }}>{feat.desc}</p>
    </div>
  );
}

function WhyTrustSection() {
  const [ref, inView] = useInView(0.08);
  return (
    <section ref={ref} style={{ background: "#fff", borderTop: "1px solid #f0ebff", position: "relative", overflow: "hidden", padding: "clamp(40px,7vw,80px) 0 clamp(40px,7vw,90px)" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(124,58,237,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.035) 1px,transparent 1px)`, backgroundSize: "40px 40px" }} />
      <div className="sec-wrap" style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(16px,4%,24px)", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(32px,5vw,52px)", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.65s ease" }}>
          <h2 style={{ fontSize: "clamp(1.4rem,3.2vw,2.5rem)", fontWeight: 900, color: "#111827", fontFamily: "'Outfit',sans-serif", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "14px" }}>Why Students Trust Skillra</h2>
          <p style={{ fontSize: "clamp(13px,1.4vw,15px)", color: "#6b7280", fontFamily: "'Outfit',sans-serif", fontWeight: 400 }}>We focus on career outcomes, not just courses.</p>
        </div>
        <div className="trust-top" style={{ border: "1px solid #e5e7eb", borderRadius: "16px 16px 0 0", overflow: "hidden", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.65s ease 0.1s" }}>
          {TRUST_TOP.map((feat, i) => (
            <div key={i} style={{ display: "flex", flex: 1, minWidth: 0 }}>
              <TrustCard feat={feat} />
              {i < TRUST_TOP.length - 1 && <VerticalZigzag />}
            </div>
          ))}
        </div>
        <div style={{ width: "100%", borderLeft: "1px solid #e5e7eb", borderRight: "1px solid #e5e7eb", opacity: inView ? 1 : 0, transition: "opacity 0.65s ease 0.2s" }}>
          <svg viewBox="0 0 1100 28" preserveAspectRatio="none" style={{ width: "100%", height: "28px", display: "block" }}>
            <rect x="0" y="0" width="1100" height="28" fill="#fff" />
            <polyline points="0,14 27.5,4 55,24 82.5,4 110,24 137.5,4 165,24 192.5,4 220,24 247.5,4 275,24 302.5,4 330,24 357.5,4 385,24 412.5,4 440,24 467.5,4 495,24 522.5,4 550,24 577.5,4 605,24 632.5,4 660,24 687.5,4 715,24 742.5,4 770,24 797.5,4 825,24 852.5,4 880,24 907.5,4 935,24 962.5,4 990,24 1017.5,4 1045,24 1072.5,4 1100,14" fill="none" stroke="#c4b5fd" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="trust-bottom" style={{ border: "1px solid #e5e7eb", borderTop: "none", borderRadius: "0 0 16px 16px", overflow: "hidden", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.65s ease 0.25s" }}>
          {TRUST_BOTTOM.map((feat, i) => (
            <div key={i} style={{ display: "flex", flex: 1, minWidth: 0 }}>
              <TrustCard feat={feat} />
              {i < TRUST_BOTTOM.length - 1 && <VerticalZigzag />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HOW WE HELP — STEPS
═══════════════════════════════════════════════════ */
const PLACEMENT_STEPS = [
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>, title: "Build In-Demand Skills", desc: "Learn practical skills that companies are hiring for.", position: "bottom" },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2H3v16h5l3 3 3-3h7V2z" /><path d="M7 8h10M7 12h6" /></svg>, title: "Create Your Professional Profile", desc: "Build your resume, portfolio, and LinkedIn presence.", position: "top" },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></svg>, title: "Prepare for Interviews", desc: "Practice with mock interviews and expert feedback.", position: "bottom" },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></svg>, title: "Apply for Opportunities", desc: "Access internships and job openings through Skillra.", position: "top" },
  { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></svg>, title: "Get Hired", desc: "Land the job with full placement support.", position: "bottom" },
];

function StepNode({ step, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const isTop = step.position === "top";
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        position: "relative", flex: 1,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(32px) scale(0.9)",
        transition: `opacity 0.6s ease ${0.1 + index * 0.12}s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${0.1 + index * 0.12}s`
      }}>

      {/* TOP LABEL — increased to 130px, bigger text */}
      <div style={{
        height: "130px",                          // ← was 100px
        display: "flex", flexDirection: "column",
        justifyContent: "flex-end", alignItems: "center",
        paddingBottom: "14px", textAlign: "center",
        visibility: isTop ? "visible" : "hidden",
      }}>
        <p style={{ fontSize: "clamp(12px,1.3vw,15px)", fontWeight: 700, color: "#7c3aed", fontFamily: "'Outfit',sans-serif", marginBottom: "6px", lineHeight: 1.35, maxWidth: "130px" }}>{step.title}</p>
        <p style={{ fontSize: "clamp(11px,1.1vw,13px)", color: "#6b7280", fontFamily: "'Outfit',sans-serif", lineHeight: 1.6, maxWidth: "120px" }}>{step.desc}</p>
      </div>

      {/* STEP NUMBER BADGE */}
      <div style={{
        position: "absolute",
        top: "130px",                             // ← was 100px
        left: "50%", transform: "translateX(-50%) translateY(-8px)",
        width: "20px", height: "20px", borderRadius: "50%",
        background: "#7c3aed", color: "#fff",
        fontSize: "11px", fontWeight: 800,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Outfit',sans-serif",
        zIndex: 4, boxShadow: "0 2px 8px rgba(124,58,237,0.4)",
      }}>{index + 1}</div>

      {/* CIRCLE NODE */}
      <div style={{
        width: "clamp(54px,5.5vw,68px)", height: "clamp(54px,5.5vw,68px)",
        borderRadius: "50%",
        background: hovered
          ? "linear-gradient(135deg,#4c1d95,#6d28d9)"
          : "linear-gradient(135deg,#7c3aed,#a78bfa)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: hovered
          ? "0 12px 40px rgba(109,40,217,0.55),0 0 0 6px rgba(124,58,237,0.15)"
          : "0 8px 28px rgba(109,40,217,0.28),0 0 0 6px rgba(124,58,237,0.10)",
        transition: "all 0.28s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hovered ? "scale(1.12)" : "scale(1)",
        cursor: "default", flexShrink: 0,
        zIndex: 3, position: "relative",
      }}>
        {step.icon}
      </div>

      {/* BOTTOM LABEL — increased to 130px, bigger text */}
      <div style={{
        height: "130px",                          // ← was 100px
        display: "flex", flexDirection: "column",
        justifyContent: "flex-start", alignItems: "center",
        paddingTop: "14px", textAlign: "center",
        visibility: isTop ? "hidden" : "visible",
      }}>
        <p style={{ fontSize: "clamp(12px,1.3vw,15px)", fontWeight: 700, color: "#7c3aed", fontFamily: "'Outfit',sans-serif", marginBottom: "6px", lineHeight: 1.35, maxWidth: "130px" }}>{step.title}</p>
        <p style={{ fontSize: "clamp(11px,1.1vw,13px)", color: "#6b7280", fontFamily: "'Outfit',sans-serif", lineHeight: 1.6, maxWidth: "120px" }}>{step.desc}</p>
      </div>

    </div>
  );
}

function HowWeHelpSection() {
  const [ref, inView] = useInView(0.08);

  // Total height = topLabel(100px) + circle(~66px) + bottomLabel(100px) = 266px
  // Circle center is at 100 + 33 = 133px from top = 133/266 = ~50%
  // So top: "50%" on the SVG is correct — but we use exact px offset below

  return (
    <section ref={ref} style={{
      background: "#ffffff",
      padding: "clamp(40px,7vw,88px) 0 clamp(48px,8vw,100px)",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `radial-gradient(rgba(124,58,237,0.07) 1px,transparent 1px)`,
        backgroundSize: "30px 30px"
      }} />

      <div className="sec-wrap" style={{
        maxWidth: "1500px", margin: "0 auto",
        padding: "0 clamp(16px,4%,40px)",
        position: "relative", zIndex: 1,
      }}>

        {/* Heading */}
        <div style={{
          textAlign: "center", marginBottom: "clamp(32px,5vw,60px)",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.65s ease"
        }}>
          <h2 style={{ fontSize: "clamp(1.4rem,3.5vw,2.6rem)", fontWeight: 900, color: "#111827", fontFamily: "'Outfit',sans-serif", letterSpacing: "-0.03em", marginBottom: "14px" }}>
            How We Help You Get Placed
          </h2>
          <p style={{ fontSize: "clamp(13px,1.4vw,14.5px)", color: "#6b7280", fontFamily: "'Outfit',sans-serif", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
            A structured path from skill-building to landing your dream role — with full support at every stage.
          </p>
        </div>

        {/* ── Desktop Steps ── */}
        <div className="steps-desktop" style={{ position: "relative", display: "flex" }}>

          {/* SVG Roadmap — sits behind nodes, top offset = topLabel height = 100px, circle center = 100 + 33 = 133px */}
          <svg
            viewBox="0 0 1000 328"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%", height: "100%",
              zIndex: 0,
              opacity: inView ? 1 : 0,
              transition: "opacity 0.8s ease 0.4s",
            }}>
            <defs>
              <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="pathGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.15" />
              </linearGradient>
            </defs>

            {/*
              5 nodes evenly spaced at x = 100, 300, 500, 700, 900
              positions (top=bottom): bottom, top, bottom, top, bottom
              bottom node circle center y = 100 + 33 = 133
              top    node circle center y = 100 + 33 = 133  (same! labels are hidden)
              So all circles are at y=133 in 266px viewBox = 50%
              Zigzag goes: node1(bottom)→node2(top)→node3(bottom)→node4(top)→node5(bottom)
              y values: bottom=170, top=96  (visual zigzag above/below center line)
            */}

            {/* Shadow/glow path */}
            <path
              d="M 100 164 C 150 164, 200 164, 250 164 C 300 164, 350 164, 400 164 C 450 164, 500 164, 550 164 C 600 164, 650 164, 700 164 C 750 164, 800 164, 900 164"

              fill="none"
              stroke="url(#pathGrad2)"
              strokeWidth="12"
              strokeLinecap="round"
            />

            {/* Main zigzag dashed path */}
            <path
              d="M 100 200 C 160 200, 190 128, 250 128 C 310 128, 340 200, 400 200 C 460 200, 490 128, 550 128 C 610 128, 640 200, 700 200 C 760 200, 830 200, 900 200"
              fill="none"
              stroke="url(#pathGrad)"
              strokeWidth="2.5"
              strokeDasharray="7 5"
              strokeLinecap="round"
            />

            {/* Arrow heads at each transition */}
            {[[250,128],[400,200],[550,128],[700,200]].map(([x,y], i) => (
    <circle key={i} cx={x} cy={y} r="4" fill="#7c3aed" opacity="0.6" />
  ))}
          </svg>

          {/* Nodes */}
          <div style={{
            display: "flex", alignItems: "stretch",
            justifyContent: "space-between",
            position: "relative", zIndex: 1,
            width: "100%",
          }}>
            {PLACEMENT_STEPS.map((step, i) => (
              <StepNode key={i} step={step} index={i} inView={inView} />
            ))}
          </div>
        </div>

        {/* ── Mobile Steps ── */}
        <div className="steps-mobile" style={{ flexDirection: "column", gap: "0px" }}>
          {PLACEMENT_STEPS.map((step, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: "16px",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-20px)",
              transition: `opacity 0.5s ease ${0.1 + i * 0.1}s, transform 0.5s ease ${0.1 + i * 0.1}s`
            }}>
              {/* Left: icon + connector */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div style={{
                  width: "46px", height: "46px", borderRadius: "50%",
                  background: "linear-gradient(135deg,#7c3aed,#a78bfa)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 6px 20px rgba(109,40,217,0.28)",
                  fontSize: "11px", fontWeight: 800, color: "#fff",
                  fontFamily: "'Outfit',sans-serif", position: "relative",
                }}>
                  {step.icon}
                  <span style={{
                    position: "absolute", top: "-4px", right: "-4px",
                    width: "16px", height: "16px", borderRadius: "50%",
                    background: "#f97316", color: "#fff",
                    fontSize: "9px", fontWeight: 800,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>{i + 1}</span>
                </div>
                {i < PLACEMENT_STEPS.length - 1 && (
                  <div style={{
                    width: "2px", height: "36px",
                    background: "linear-gradient(to bottom,#a78bfa,rgba(167,139,250,0.1))",
                    marginTop: "4px", marginBottom: "4px",
                  }} />
                )}
              </div>
              {/* Right: text */}
              <div style={{ paddingTop: "8px", paddingBottom: i < PLACEMENT_STEPS.length - 1 ? "0" : "0" }}>
                <p style={{ fontSize: "13.5px", fontWeight: 700, color: "#7c3aed", fontFamily: "'Outfit',sans-serif", marginBottom: "4px" }}>{step.title}</p>
                <p style={{ fontSize: "12.5px", color: "#6b7280", fontFamily: "'Outfit',sans-serif", lineHeight: 1.6, marginBottom: "16px" }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (min-width: 769px) {
          .steps-desktop { display: flex !important; }
          .steps-mobile { display: none !important; }
        }
        @media (max-width: 768px) {
          .steps-desktop { display: none !important; }
          .steps-mobile { display: flex !important; }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   STUDENTS PLACED
═══════════════════════════════════════════════════ */
const PLACED_STUDENTS = [
  { name: "Kishore M", company: "Unitic", companyColor: "#037946", img: "/PlacedStudents/kishoreunitic.jpeg" },
  { name: "Deepak", company: "Cognizant", companyColor: "#0099ff", img: "/PlacedStudents/deepakcognizant.jpeg" },
  { name: "Manikandan SP", company: "TCS", companyColor: "#000000", img: "/PlacedStudents/manitcs.jpeg" },
  { name: "Mary", company: "Shai Health", companyColor: "#ff009d", img: "student4.png" },
];

function StudentCard({ student, index, inView }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.6s ease ${0.1 + index * 0.12}s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${0.1 + index * 0.12}s`, cursor: "default" }}>
      <div style={{ width: "clamp(100px,14vw,180px)", height: "clamp(130px,17vw,220px)", borderRadius: "90px 90px 12px 12px", background: hovered ? "linear-gradient(180deg,#c4b5fd 0%,#ddd6fe 100%)" : "linear-gradient(180deg,#e9e3ff 0%,#f3f0ff 100%)", overflow: "hidden", display: "flex", alignItems: "flex-end", justifyContent: "center", boxShadow: hovered ? "0 20px 48px rgba(109,40,217,0.22)" : "0 8px 32px rgba(109,40,217,0.10)", transition: "all 0.30s cubic-bezier(0.34,1.56,0.64,1)", transform: hovered ? "translateY(-8px) scale(1.03)" : "translateY(0) scale(1)", position: "relative" }}>
        <img
  src={`${PUB}/${student.img}`}
  alt={student.name}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "top center",
    display: "block",
    transition: "transform 0.4s ease",           // ← add
    transform: hovered ? "scale(1.2)" : "scale(1)", // ← add
  }}
  onError={e => { e.target.style.display = "none"; }}
/>
      </div>
      <p style={{ marginTop: "12px", fontSize: "clamp(11px,1.3vw,14px)", fontWeight: 600, color: "#111827", fontFamily: "'Outfit',sans-serif" }}>{student.name}</p>
      <p style={{ marginTop: "3px", fontSize: "clamp(12px,1.4vw,16px)", fontWeight: 900, color: student.companyColor, fontFamily: "'Outfit',sans-serif" }}>{student.company}</p>
    </div>
  );
}

function StudentsPlacedSection() {
  const [ref, inView] = useInView(0.08);
  return (
    <section ref={ref} style={{ background: "#fff", padding: "clamp(40px,7vw,88px) 0 clamp(48px,8vw,96px)", borderTop: "1px solid #f0ebff", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(124,58,237,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.03) 1px,transparent 1px)`, backgroundSize: "40px 40px" }} />
      <div className="sec-wrap" style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 clamp(16px,4%,24px)", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(32px,5vw,60px)", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.65s ease" }}>
          <h2 style={{ fontSize: "clamp(1.4rem,3.5vw,2.6rem)", fontWeight: 900, color: "#111827", fontFamily: "'Outfit',sans-serif", letterSpacing: "-0.03em", marginBottom: "14px" }}>Students Placed</h2>
          <p style={{ fontSize: "clamp(13px,1.4vw,14.5px)", color: "#6b7280", fontFamily: "'Outfit',sans-serif", maxWidth: "900px", margin: "0 auto", lineHeight: 1.7 }}>Our students have been placed in top companies across India, proving that the right skills, the right guidance, and the right support system can open doors that once felt out of reach.</p>
        </div>
        <div className="students-grid">
          {PLACED_STUDENTS.map((student, i) => <StudentCard key={i} student={student} index={i} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════ */
export default function PlacementPage() {
  const [showPopup, setShowPopup] = useState(false);
  const handleCtaClick = () => setShowPopup(true);

  useSanityMeta('placement', {
  title:       'Placement | Skillra – 100% Placement Support',
  description: 'Skillra offers dedicated placement assistance with top healthcare and IT companies. Check our placement records and success stories.',
  canonicalUrl:'https://www.skillra.com/placement',
})
 

  return (
    <div style={{ fontFamily: "'Outfit','Segoe UI',sans-serif", margin: 0, padding: 0, overflowX: "hidden", background: "#faf8ff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; }

        @keyframes fadeInOverlay { from{opacity:0} to{opacity:1} }
        @keyframes slideUpModal  { from{opacity:0;transform:translateY(32px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeRight { from{opacity:0;transform:translateX(-22px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeScale { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }
        @keyframes shimmer   { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes drawArc   { from{stroke-dashoffset:400} to{stroke-dashoffset:0} }

        .cr-v1  { animation:fadeRight .65s ease forwards; opacity:0; animation-delay:.10s; }
        .ab-v1  { animation:fadeRight .6s ease forwards;  opacity:0; animation-delay:.1s;  }
        .ab-v2  { animation:fadeUp   .65s ease forwards;  opacity:0; animation-delay:.28s; }
        .ab-v3  { animation:fadeUp   .65s ease forwards;  opacity:0; animation-delay:.44s; }
        .ab-vR  { animation:fadeScale 1s ease forwards;   opacity:0; animation-delay:.2s;  }

        .about-arc {
          stroke-dasharray:400; stroke-dashoffset:400;
          animation:drawArc 1.8s cubic-bezier(0.25,0.1,0.2,1) 0.6s forwards;
        }
        .about-cta-btn::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);
          background-size:200% 100%; animation:shimmer 2.4s infinite;
        }

        /* ── Layout defaults (desktop) ── */
        .campus-grid   { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .students-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:32px; justify-items:center; }
        .steps-desktop { display:block; }
        .steps-mobile  { display:none; }
        .opp-row       { display:flex; }
        .opp-left      { flex:0 0 42%; }
        .opp-right     { flex:1; }
        .trust-top     { display:flex; }
        .trust-bottom  { display:flex; }

        input::placeholder, select::placeholder { color:#9ca3af; }
        input:focus, select:focus { outline:none; border-color:#7c3aed !important; background:#fff !important; }

        /* ════════════════════════════════
           LARGE ≥ 1400px
        ════════════════════════════════ */
        @media (min-width:1400px) {
          .about-left  { width:580px !important; }
          .about-right { height:780px !important; }
          .campus-grid { gap:28px; }
          .students-grid { gap:40px; }
        }

        /* ════════════════════════════════
           TABLET 769–1100px
        ════════════════════════════════ */
        @media (max-width:1100px) and (min-width:769px) {
          .about-inner { padding:0 4% !important; gap:12px !important; }
          .about-left  { width:380px !important; }
          .about-right { height:clamp(340px,55vw,580px) !important; }
        }

        /* ════════════════════════════════
           TABLET ≤ 900px
        ════════════════════════════════ */
        @media (max-width:900px) {
          .campus-grid   { grid-template-columns:1fr 1fr !important; }
          .opp-row       { flex-direction:column !important; }
          .opp-left      { flex:unset !important; width:100% !important; }
          .opp-right     { flex:unset !important; width:100% !important; }
          .students-grid { grid-template-columns:repeat(2,1fr) !important; gap:24px !important; }
          .steps-desktop { display:none !important; }
          .steps-mobile  { display:flex !important; }
          .trust-top     { flex-direction:column !important; }
          .trust-bottom  { flex-direction:column !important; }
        }

        /* ════════════════════════════════
           MOBILE ≤ 768px
        ════════════════════════════════ */
        @media (max-width:768px) {
          .about-inner {
            flex-direction:column !important;
            align-items:center !important;
            padding:90px 16px 28px !important;
            text-align:center !important;
            gap:0 !important;
          }
          .about-left {
            order:1 !important;
            width:100% !important;
            max-width:100% !important;
          }
          .about-right {
            order:2 !important;
            width:100% !important;
            height:clamp(260px,68vw,360px) !important;
            min-width:0 !important;
            margin-top:8px !important;
          }
          
          .about-bottom {
            order:3 !important;
            margin-top:20px !important;
          }

          /* Hide desktop desc+button */
          .about-desc-desktop { display:none !important; }
          .about-btn-desktop  { display:none !important; }

          /* Shrink badges significantly on mobile */
          .hero-badge {
            transform:scale(0.78) !important;
            transform-origin:top left !important;
          }

          /* Campus */
          .campus-grid { grid-template-columns:1fr !important; gap:12px !important; }

          /* Opportunities */
          .opp-row   { flex-direction:column !important; }
          .opp-left  { flex:unset !important; width:100% !important; padding:32px 18px !important; }
          .opp-right { flex:unset !important; width:100% !important; padding:32px 18px !important; gap:20px !important; }
          .opp-bg-design { height:70px !important; opacity:0.4 !important; }

          /* Students */
          .students-grid { grid-template-columns:repeat(2,1fr) !important; gap:14px !important; }

          /* Trust cards */
          .trust-top    { flex-direction:column !important; }
          .trust-bottom { flex-direction:column !important; }
          .trust-card   { padding:20px 16px !important; }
        }

        /* Hide mobile-bottom on desktop */
        @media (min-width:769px) {
          .about-bottom { display:none !important; }
        }

        /* ════════════════════════════════
           SMALL MOBILE ≤ 480px
        ════════════════════════════════ */
        @media (max-width:480px) {
          .about-inner { padding:80px 14px 24px !important; }
          .about-right { height:clamp(220px,65vw,300px) !important; }
          .about-title { font-size:1.75rem !important; }
          .students-grid { gap:10px !important; }
          .hero-badge { transform:scale(0.70) !important; }
        }

        /* ════════════════════════════════
           VERY SMALL ≤ 360px
        ════════════════════════════════ */
        @media (max-width:360px) {
          .about-inner { padding:70px 12px 20px !important; }
          .about-title { font-size:1.5rem !important; }
          .about-right { height:200px !important; }
          .sec-wrap    { padding-left:12px !important; padding-right:12px !important; }
          .hero-badge  { transform:scale(0.62) !important; }
        }
      `}</style>

      <Navbar />
      <SocialSidebar />
      {showPopup && <PlacementPopup onClose={() => setShowPopup(false)} />}
      <AboutHero onCtaClick={handleCtaClick} />
      <WhyTrustSection />
      <HowWeHelpSection />
      {/* <StudentsPlacedSection /> */}
      <PageMeta />
      <Footer />
    </div>
  );
}