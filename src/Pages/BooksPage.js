import { useEffect, useRef, useState } from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";

const PUB = process.env.PUBLIC_URL || "";

// ── PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE ──
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbws7QqEJT-y2F_6U_VyyuQ56sdXZUYEgXb7qLagegYmmPfqI-5EoGJ6wXGrHuQIC-jTWA/exec";

/* ══════════════════════════════════════════════════════
   GOOGLE SHEETS SUBMIT HELPER
══════════════════════════════════════════════════════ */
async function submitToSheet(data) {
  const res = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors", // Google Apps Script requires no-cors
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  // no-cors returns opaque response, so we assume success if no error thrown
  return true;
}

/* ══════════════════════════════════════════════════════
   BUY BOOK MODAL
══════════════════════════════════════════════════════ */
function BuyBookModal({ onClose }) {
  const [form, setForm]       = useState({ name: "", email: "", contact: "", orders: "" });
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const validators = {
    name: (v) => {
      if (!v.trim()) return "Name is required";
      if (v.trim().length < 3) return "Minimum 3 characters";
      if (!/^[a-zA-Z\s'\-]+$/.test(v.trim())) return "Letters only";
      return "";
    },
    email: (v) => {
      if (!v.trim()) return "Email is required";
      if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(v.trim()))
        return "Enter a valid email";
      return "";
    },
    contact: (v) => {
      const d = v.replace(/\D/g, "");
      if (!d) return "Contact number is required";
      if (d.length !== 10) return "Must be exactly 10 digits";
      if (!/^[6-9]/.test(d)) return "Must start with 6, 7, 8 or 9";
      if (/^(\d)\1{9}$/.test(d)) return "Invalid number";
      return "";
    },
    orders: (v) => {
      if (!v) return "Number of orders is required";
      if (isNaN(v) || Number(v) < 1) return "Minimum 1 order";
      if (Number(v) > 100) return "Maximum 100 orders";
      return "";
    },
  };

  const validate = (field, value) => {
    const err = validators[field](value);
    setErrors(prev => ({ ...prev, [field]: err }));
    return err;
  };

  const handleChange = (field, value) => {
    if (field === "name" && /[^a-zA-Z\s'\-]/.test(value)) return;
    if (field === "contact") value = value.replace(/\D/g, "").slice(0, 10);
    if (field === "orders") value = value.replace(/\D/g, "").slice(0, 3);
    setForm(prev => ({ ...prev, [field]: value }));
    if (touched[field]) validate(field, value);
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validate(field, form[field]);
  };

  const handleSubmit = async () => {
    const allTouched = { name: true, email: true, contact: true, orders: true };
    setTouched(allTouched);
    const newErrors = {};
    let hasError = false;
    Object.keys(validators).forEach(f => {
      const err = validators[f](form[f]);
      newErrors[f] = err;
      if (err) hasError = true;
    });
    setErrors(newErrors);
    if (hasError) return;

    setLoading(true);
    try {
      await submitToSheet({
        type: "order",
        name: form.name.trim(),
        email: form.email.trim(),
        contact: form.contact,
        orders: Number(form.orders),
      });
      setSuccess(true);
    } catch {
      setSuccess(true); // no-cors can't confirm, treat as success
    } finally {
      setLoading(false);
    }
  };

  const borderColor = (field) => {
    if (!touched[field]) return "#e5e7eb";
    if (errors[field]) return "#ef4444";
    return "#22c55e";
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: "24px",
          padding: "clamp(24px,5%,40px)", width: "100%", maxWidth: "440px",
          boxShadow: "0 24px 80px rgba(109,40,217,0.22)",
          fontFamily: "'Outfit', sans-serif",
          animation: "modalPop 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button onClick={onClose} style={{
          position: "absolute", top: "16px", right: "16px",
          width: "32px", height: "32px", borderRadius: "50%",
          background: "#f3f4f6", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "16px", color: "#6b7280", transition: "background 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = "#e5e7eb"}
          onMouseLeave={e => e.currentTarget.style.background = "#f3f4f6"}
        >✕</button>

        {success ? (
          /* ── Success state ── */
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: "52px", marginBottom: "16px" }}>🎉</div>
            <h3 style={{ fontSize: "20px", fontWeight: 900, color: "#111827", marginBottom: "10px" }}>
              Order Placed!
            </h3>
            <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.6, marginBottom: "24px" }}>
              Thank you <strong style={{ color: "#7c3aed" }}>{form.name}</strong>! We've received your order for{" "}
              <strong style={{ color: "#7c3aed" }}>{form.orders} book(s)</strong>. We'll contact you shortly.
            </p>
            <button onClick={onClose} style={{
              background: "#7c3aed", color: "#fff", border: "none",
              borderRadius: "50px", padding: "12px 32px", fontSize: "14px",
              fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', sans-serif",
            }}>
              Close
            </button>
          </div>
        ) : (
          /* ── Form state ── */
          <>
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>📚</div>
              <h3 style={{ fontSize: "20px", fontWeight: 900, color: "#111827", marginBottom: "4px" }}>
                Buy CPC Question Bank
              </h3>
              <p style={{ fontSize: "13px", color: "#9ca3af" }}>
                Fill in your details and we'll process your order.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { key: "name",    label: "Full Name",       placeholder: "Your full name",     type: "text"   },
                { key: "email",   label: "Email Address",   placeholder: "your@email.com",     type: "email"  },
                { key: "contact", label: "Contact Number",  placeholder: "10-digit mobile no", type: "tel"    },
                { key: "orders",  label: "No. of Books",    placeholder: "How many copies?",   type: "number" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "5px", letterSpacing: "0.03em" }}>
                    {f.label} <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={e => handleChange(f.key, e.target.value)}
                    onBlur={() => handleBlur(f.key)}
                    onFocus={e => { e.currentTarget.style.borderColor = "#a78bfa"; }}
                    min={f.key === "orders" ? 1 : undefined}
                    style={{
                      width: "100%", padding: "11px 14px",
                      border: `1.5px solid ${borderColor(f.key)}`,
                      borderRadius: "10px", fontSize: "13.5px",
                      fontFamily: "'Outfit', sans-serif", color: "#374151",
                      outline: "none", background: "#fafafa",
                      boxSizing: "border-box", transition: "border-color 0.2s",
                    }}
                  />
                  {touched[f.key] && errors[f.key] && (
                    <p style={{ fontSize: "11.5px", color: "#ef4444", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px", fontFamily: "'Outfit', sans-serif" }}>
                      <svg width="11" height="11" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#ef4444" strokeWidth="1.8"/><path d="M10 6v4M10 14h.01" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"/></svg>
                      {errors[f.key]}
                    </p>
                  )}
                  {touched[f.key] && !errors[f.key] && form[f.key] && (
                    <p style={{ fontSize: "11.5px", color: "#22c55e", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px", fontFamily: "'Outfit', sans-serif" }}>
                      <svg width="11" height="11" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#22c55e" strokeWidth="1.8"/><path d="M6 10l3 3 5-5" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Looks good!
                    </p>
                  )}
                </div>
              ))}

              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  background: loading ? "#a78bfa" : "#7c3aed",
                  color: "#fff", border: "none", borderRadius: "50px",
                  padding: "13px 24px", fontSize: "14px", fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "'Outfit', sans-serif",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  boxShadow: "0 6px 20px rgba(124,58,237,0.35)",
                  transition: "all 0.22s", marginTop: "4px",
                }}
                onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(124,58,237,0.50)"; }}}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(124,58,237,0.35)"; }}
              >
                {loading ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 1s linear infinite" }}>
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Buy Now
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                      <path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   INTERSECTION OBSERVER
══════════════════════════════════════════════════════ */
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

/* ══════════════════════════════════════════════════════
   FLOATING BOOK
══════════════════════════════════════════════════════ */
function FloatingBook() {
  return (
    <div style={{
      position: "relative", width: "100%", height: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        position: "absolute", width: "340px", height: "340px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(160,100,255,0.08) 60%, transparent 75%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <img
        src={`${PUB}/books.png`}
        alt="CPC Medical Coding Question Bank"
        style={{
          position: "relative", zIndex: 1,
          maxHeight: "clamp(400px, 50vw, 800px)", maxWidth: "100%", objectFit: "contain",
          marginTop: "clamp(20px, 5vw, 120px)", marginLeft: "clamp(20px, 5vw, 150px)",
          filter: "drop-shadow(-18px 24px 40px rgba(60,0,120,0.45)) drop-shadow(4px 8px 18px rgba(0,0,0,0.22))",
          animation: "bookFloat 3.8s ease-in-out infinite",
          transformOrigin: "center bottom",
        }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 1 — HERO
══════════════════════════════════════════════════════ */
function BooksHero({ onBuyClick }) {
  const [arcReady, setArcReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setArcReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  const BULLETS = [
    "2000+ CPC Practice Questions",
    "10 Full-Length CPC Mock Tests",
    "Detailed Answer Keys & Explanations",
  ];

  const BuyBtn = ({ style = {} }) => (
    <button
      onClick={onBuyClick}
      className="books-cta-btn"
      style={{
        background: "#fff", color: "#6d28d9", border: "none",
        borderRadius: "50px", padding: "14px 28px", fontSize: "clamp(13px, 1.4vw, 14.5px)",
        fontWeight: 800, cursor: "pointer", fontFamily: "'Outfit', sans-serif",
        display: "inline-flex", alignItems: "center", gap: "10px",
        boxShadow: "0 8px 28px rgba(0,0,0,0.22)", letterSpacing: "0.2px",
        transition: "all 0.22s", position: "relative", overflow: "hidden",
        ...style,
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.03)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.30)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.22)"; }}
    >
      Buy Book
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
        <path d="M3 9h12M11 5l4 4-4 4" stroke="#6d28d9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );

  return (
    <section style={{
      background: "radial-gradient(ellipse 130% 110% at 0% 60%, #a259f7 0%, #7c3aed 28%, #6d28d9 55%, #5b21b6 80%, #3b0f8c 100%)",
      minHeight: "100vh", display: "flex", alignItems: "center",
      paddingBottom: "80px", position: "relative", overflow: "hidden",
      fontFamily: "'Outfit', sans-serif",
    }}>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "90px" }}>
          <path d="M0,70 C360,90 900,18 1440,0 L1440,90 L0,90 Z" fill="#ffffff" />
        </svg>
      </div>
      <div className="books-dotgrid" />

      <div className="books-inner" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", padding: "40px 6% 40px 3%",
        width: "100%", maxWidth: "1280px", margin: "0 auto",
        gap: "60px", position: "relative", zIndex: 1,
      }}>
        {/* Left */}
        <div className="books-left" style={{
          flex: "0 0 auto", width: "480px", maxWidth: "100%",
          display: "flex", flexDirection: "column", alignItems: "flex-start",
        }}>
          <h1 className="bk-v1 books-title" style={{
            fontSize: "clamp(2rem, 4.5vw, 3.6rem)", fontWeight: 900,
            lineHeight: 1.18, color: "#fff", letterSpacing: "-1.5px",
            marginBottom: "10px", whiteSpace: "nowrap",
          }}>
            Crack the AAPC CPC<br />Exam with<br />Confidence
          </h1>
          <div className="bk-v2" style={{ marginBottom: "30px" }}>
            <svg viewBox="0 0 340 18" style={{ width: "min(340px, 90vw)", height: "12px", overflow: "visible", display: "block" }} preserveAspectRatio="none">
              <path className={`books-arc${arcReady ? " arc-animate" : ""}`} d="M 4 13 C 70 2, 230 1, 336 11"
                fill="none" stroke="rgba(255,255,255,0.70)" strokeWidth="4.5" strokeLinecap="round" />
            </svg>
          </div>
          <ul className="bk-v3 books-bullets books-bullets-desktop" style={{
            listStyle: "none", padding: 0, margin: "0 0 36px 0",
            display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start",
          }}>
            {BULLETS.map((b, i) => (
              <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "clamp(13px, 1.5vw, 14.5px)", fontWeight: 500, color: "rgba(255,255,255,0.88)" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "rgba(255,255,255,0.75)", flexShrink: 0 }} />
                {b}
              </li>
            ))}
          </ul>
          <div className="bk-v4 books-btn-desktop">
            <BuyBtn />
          </div>
        </div>

        {/* Right — Book */}
        <div className="books-right bk-vR" style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", minHeight: "380px", maxHeight: "480px",
        }}>
          <FloatingBook />
        </div>

        {/* Mobile bottom */}
        <div className="books-bottom" style={{
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: "20px", width: "100%",
        }}>
          <ul className="books-bullets" style={{
            listStyle: "none", padding: 0, margin: 0,
            display: "flex", flexDirection: "column", gap: "12px", alignItems: "center",
          }}>
            {BULLETS.map((b, i) => (
              <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", fontWeight: 500, color: "rgba(255,255,255,0.88)" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "rgba(255,255,255,0.75)", flexShrink: 0 }} />
                {b}
              </li>
            ))}
          </ul>
          <BuyBtn />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — CHALLENGES
══════════════════════════════════════════════════════ */
const CHALLENGES = [
  {
    color: "#7c3aed", sealBg: "rgba(200,180,255,0.38)", sealBorder: "rgba(255,255,255,0.55)",
    title: "Time Management Issues",
    desc: "Struggling to complete the exam within the allotted time",
    decor: "blob", animClass: "icon-pulse", sparkles: true,
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 21h6M12 3C8.686 3 6 5.686 6 9c0 2.21 1.12 4.15 2.81 5.28.48.33.79.86.79 1.42V17a1 1 0 001 1h4a1 1 0 001-1v-1.3c0-.56.31-1.09.79-1.42C17.88 13.15 19 11.21 19 9c0-3.314-2.686-6-7-6z" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  },
  {
    color: "#f97316", sealBg: "rgba(255,210,180,0.50)", sealBorder: "rgba(255,255,255,0.40)",
    title: "Lack of Exam-Level Practice",
    desc: "Not enough realistic questions matching actual exam difficulty",
    decor: "circles", animClass: "icon-wobble", sparkles: false,
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2.5" stroke="#1a0a00" strokeWidth="1.8"/><path d="M8 10l2 2 4-4M8 15l4-4 4 4" stroke="#1a0a00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  },
  {
    color: "#16a34a", sealBg: "rgba(190,225,195,0.48)", sealBorder: "rgba(255,255,255,0.40)",
    title: "Guideline Confusion",
    desc: "Difficulty with ICD-10, CPT, and HCPCS coding guidelines",
    decor: "dots", animClass: "icon-bounce", sparkles: false,
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3.2" stroke="#0a1a0f" strokeWidth="1.8"/><circle cx="12" cy="12" r="7.5" stroke="#0a1a0f" strokeWidth="1.6" strokeDasharray="3 2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#0a1a0f" strokeWidth="1.8" strokeLinecap="round"/></svg>),
  },
];

function SealBadge({ bg, border, children, animClass }) {
  return (
    <div style={{ position: "relative", width: "58px", height: "58px", flexShrink: 0, animation: `${animClass} 2.8s ease-in-out infinite` }}>
      <svg width="58" height="58" viewBox="0 0 58 58" style={{ position: "absolute", inset: 0 }}>
        <path d="M29 3 C31 3 33 6 35 6 C37 6 39 3 41 4 C43 5 43 8 45 9 C47 10 50 9 51 11 C52 13 50 16 51 18 C52 20 55 21 55 23 C55 25 52 27 52 29 C52 31 55 33 55 35 C55 37 52 38 51 40 C50 42 52 45 51 47 C50 49 47 49 45 50 C43 51 43 54 41 55 C39 56 37 53 35 53 C33 53 31 56 29 56 C27 56 25 53 23 53 C21 53 19 56 17 55 C15 54 15 51 13 50 C11 49 8 49 7 47 C6 45 8 42 7 40 C6 38 3 37 3 35 C3 33 6 31 6 29 C6 27 3 25 3 23 C3 21 6 20 7 18 C8 16 6 13 7 11 C8 9 11 10 13 9 C15 8 15 5 17 4 C19 3 21 6 23 6 C25 6 27 3 29 3Z"
          fill={bg} stroke={border} strokeWidth="1.2"/>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {children}
      </div>
    </div>
  );
}

function ChallengeCard({ card, inView, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: card.color, borderRadius: "22px", padding: "28px 26px 36px",
        position: "relative", overflow: "hidden",
        flex: 1, minWidth: 0, minHeight: "340px",
        display: "flex", flexDirection: "column",
        opacity: inView ? 1 : 0,
        transform: inView ? (hovered ? "translateY(-10px) scale(1.025)" : "translateY(0) scale(1)") : "translateY(36px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.38s cubic-bezier(0.34,1.56,0.64,1)`,
        boxShadow: hovered ? `0 28px 60px ${card.color}66` : `0 6px 28px ${card.color}44`,
      }}>
      {card.decor === "blob" && (
        <>
          <svg width="290" height="220" viewBox="0 0 130 90" style={{ position: "absolute", top: "-40px", right: "-20px", zIndex: 1, transform: hovered ? "scale(1.12) rotate(-4deg)" : "scale(1) rotate(0deg)", transition: "transform 0.55s ease" }}>
            <path d="M20 70 Q10 70 10 58 Q10 50 18 48 Q16 42 22 38 Q28 34 36 38 Q38 28 50 26 Q62 24 66 34 Q74 30 82 36 Q90 42 88 52 Q96 54 96 63 Q96 72 86 72 Q80 76 72 74 Q66 80 56 78 Q46 82 38 76 Q28 78 20 70Z" fill="rgba(180,150,255,0.38)"/>
          </svg>
          {card.sparkles && (<>
            <div style={{ position:"absolute",top:"22px",left:"72px",width:"8px",height:"8px",zIndex:3,animation:"sparkle1 2.2s ease-in-out infinite"}}><svg width="8" height="8" viewBox="0 0 8 8"><path d="M4 0L4.8 3.2L8 4L4.8 4.8L4 8L3.2 4.8L0 4L3.2 3.2Z" fill="rgba(255,255,255,0.85)"/></svg></div>
            <div style={{ position:"absolute",top:"38px",left:"80px",width:"5px",height:"5px",zIndex:3,animation:"sparkle2 1.8s ease-in-out 0.4s infinite"}}><svg width="5" height="5" viewBox="0 0 8 8"><path d="M4 0L4.8 3.2L8 4L4.8 4.8L4 8L3.2 4.8L0 4L3.2 3.2Z" fill="rgba(255,255,255,0.70)"/></svg></div>
          </>)}
        </>
      )}
      {card.decor === "circles" && (
        <div style={{ position:"absolute",top:"-10px",right:"-10px",width:"110px",height:"110px",zIndex:1}}>
          {[100,76,52,28].map((s,i) => (<div key={i} style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:s,height:s,borderRadius:"50%",border:`2.5px solid rgba(109,40,217,${0.25+i*0.18})`,animation:`ringExpand 2.4s ease-in-out ${i*0.35}s infinite`}}/>))}
        </div>
      )}
      {card.decor === "dots" && (
        <div style={{ position:"absolute",top:"14px",right:"14px",width:"82px",height:"82px",zIndex:1,backgroundImage:"radial-gradient(rgba(255,255,255,0.60) 2px, transparent 2px)",backgroundSize:"12px 12px",transform:hovered?"scale(1.1)":"scale(1)",transition:"transform 0.5s ease"}}/>
      )}
      <div style={{ position:"relative",zIndex:4,alignSelf:"flex-start" }}>
        <SealBadge bg={card.sealBg} border={card.sealBorder} animClass={card.animClass}>{card.icon}</SealBadge>
      </div>
      <div style={{ flex:1,minHeight:"60px" }}/>
      <h3 style={{ fontSize:"clamp(17px,2vw,21px)",fontWeight:800,color:"#fff",fontFamily:"'Outfit',sans-serif",lineHeight:1.18,marginBottom:"20px",position:"relative",zIndex:2,letterSpacing:"-0.3px",maxWidth:"160px" }}>{card.title}</h3>
      <p style={{ fontSize:"clamp(12px,1.3vw,13.5px)",color:"rgba(255,255,255,0.78)",fontFamily:"'Outfit',sans-serif",lineHeight:1.75,fontWeight:400,position:"relative",zIndex:2 }}>{card.desc}</p>
    </div>
  );
}

function ChallengesSection() {
  const [ref, inView] = useInView(0.1);
  return (
    <section ref={ref} style={{ background:"#fff",padding:"88px 0 80px",fontFamily:"'Outfit',sans-serif" }}>
      <div style={{ maxWidth:"1100px",margin:"0 auto",padding:"0 clamp(16px,4%,40px)" }}>
        <h2 style={{ textAlign:"center",fontSize:"clamp(1.5rem,3vw,2.6rem)",fontWeight:900,color:"#111827",letterSpacing:"-0.03em",marginBottom:"52px",fontFamily:"'Outfit',sans-serif",opacity:inView?1:0,transform:inView?"translateY(0)":"translateY(20px)",transition:"all 0.6s ease" }}>
          Common CPC Exam Challenges
        </h2>
        <div className="challenges-grid">
          {CHALLENGES.map((card,i) => <ChallengeCard key={i} card={card} inView={inView} delay={0.1+i*0.13}/>)}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — PREP SYSTEM
══════════════════════════════════════════════════════ */
const PREP_CARDS = [
  { title:"Fundamentals", hoverColor:"#7c3aed", items:["Medical terminology and anatomy basics","ICD-10-CM fundamentals and coding structure","CPT and HCPCS basics","AAPC compliance rules and ethics"] },
  { title:"Advanced Practice", hoverColor:"#7c3aed", items:["2000+ CPC exam-level practice questions","Scenario-based coding questions","ICD-10, CPT, and HCPCS mixed cases","Focus on accuracy and speed improvement"] },
  { title:"Mock Tests", hoverColor:"#7c3aed", items:["10 Full-length CPC mock exams","Timed practice sessions","Comprehensive answer explanations","Performance tracking and analysis"] },
];

function PrepCard({ card, inView, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ flex:1,minWidth:0,background:hovered?card.hoverColor:"#fff",border:`1.5px solid ${hovered?card.hoverColor:"#e5e7eb"}`,borderRadius:"20px",padding:"32px 28px",boxShadow:hovered?`0 20px 48px ${card.hoverColor}44`:"0 2px 12px rgba(0,0,0,0.06)",opacity:inView?1:0,transform:inView?(hovered?"translateY(-10px) scale(1.02)":"translateY(0) scale(1)"):"translateY(30px)",transition:`opacity 0.6s ease ${delay}s, transform 0.30s cubic-bezier(0.34,1.56,0.64,1), background 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease` }}>
      <h3 style={{ fontSize:"clamp(15px,1.6vw,17px)",fontWeight:800,color:hovered?"#fff":"#111827",fontFamily:"'Outfit',sans-serif",marginBottom:"20px",textAlign:"center",transition:"color 0.28s ease" }}>{card.title}</h3>
      <ul style={{ listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:"13px" }}>
        {card.items.map((item,i) => (
          <li key={i} style={{ display:"flex",alignItems:"flex-start",gap:"10px",fontSize:"clamp(12px,1.2vw,13.5px)",color:hovered?"rgba(255,255,255,0.85)":"#374151",fontFamily:"'Outfit',sans-serif",lineHeight:1.65,transition:"color 0.28s ease" }}>
            <span style={{ width:"6px",height:"6px",borderRadius:"50%",background:hovered?"rgba(255,255,255,0.65)":"#7c3aed",flexShrink:0,marginTop:"7px",transition:"background 0.28s ease" }}/>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PrepSystemSection() {
  const [ref, inView] = useInView(0.08);
  return (
    <section ref={ref} style={{ background:"#f8f7ff",padding:"80px 0",fontFamily:"'Outfit',sans-serif" }}>
      <div style={{ maxWidth:"1100px",margin:"0 auto",padding:"0 clamp(16px,4%,40px)" }}>
        <div style={{ textAlign:"center",marginBottom:"52px",opacity:inView?1:0,transform:inView?"translateY(0)":"translateY(20px)",transition:"all 0.6s ease" }}>
          <h2 style={{ fontSize:"clamp(1.5rem,3vw,2.6rem)",fontWeight:900,color:"#111827",letterSpacing:"-0.03em",fontFamily:"'Outfit',sans-serif",marginBottom:"14px" }}>Complete 3-Volume CPC Preparation System</h2>
          <p style={{ fontSize:"clamp(13px,1.3vw,14px)",color:"#6b7280",fontFamily:"'Outfit',sans-serif",maxWidth:"520px",margin:"0 auto",lineHeight:1.7 }}>Everything you need to pass the CPC exam on your first attempt — practice questions, mock tests, and detailed explanations.</p>
        </div>
        <div className="prep-grid">
          {PREP_CARDS.map((card,i) => <PrepCard key={i} card={card} inView={inView} delay={0.1+i*0.12}/>)}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — BUNDLE
══════════════════════════════════════════════════════ */
const BUNDLE_ITEMS = [
  "Volume I: Fundamentals (400+ Questions)",
  "Volume II: Advanced Practice (2000+ Questions)",
  "Volume III: 10 Full-Length Mock Tests",
  "Detailed Answer Keys & Explanations",
  "AAPC 2025-2026 Exam Blueprint Aligned",
  "Ideal for Freshers & Repeat Exam Takers",
];

function BundleSection({ onBuyClick }) {
  const [ref, inView] = useInView(0.08);
  return (
    <section className="bundle-section" ref={ref} style={{ background:"#f3f0ff",padding:"clamp(32px,5vw,80px) 0 clamp(36px,5vw,88px)",position:"relative",overflow:"hidden",fontFamily:"'Outfit',sans-serif" }}>
      <div style={{ textAlign:"center",marginBottom:"44px",padding:"0 clamp(16px,4%,40px)",position:"relative",zIndex:1,opacity:inView?1:0,transform:inView?"translateY(0)":"translateY(20px)",transition:"all 0.6s ease" }}>
        <h2 style={{ fontSize:"clamp(1.5rem,3vw,2.6rem)",fontWeight:900,color:"#111827",letterSpacing:"-0.03em",fontFamily:"'Outfit',sans-serif",marginBottom:"14px" }}>Get the Complete CPC Preparation Package</h2>
        <p style={{ fontSize:"clamp(13px,1.3vw,14px)",color:"#6b7280",fontFamily:"'Outfit',sans-serif",maxWidth:"480px",margin:"0 auto",lineHeight:1.7 }}>One package. Everything you need. Pass with confidence.</p>
      </div>
      <div style={{ position:"relative",paddingBottom:"clamp(40px,8vw,80px)" }}>
        <img src={`${PUB}/bgbooks.png`} alt="" aria-hidden="true" style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"contain",transform:"scale(2.0)",transformOrigin:"center top",top:"-120px",objectPosition:"center top",opacity:0.18,pointerEvents:"none",zIndex:0 }}/>
        <div style={{ maxWidth:"860px",margin:"0 auto",padding:"0 clamp(16px,4%,40px)",position:"relative",zIndex:1 }}>
          <div style={{ background:"#fff",width:"min(400px, 100%)",margin:"0 auto",borderRadius:"16px 16px 80px 80px",padding:"clamp(28px,5%,44px) clamp(24px,6%,52px) clamp(32px,6%,52px)",boxShadow:"0 12px 60px rgba(109,40,217,0.12), 0 2px 8px rgba(0,0,0,0.06)",border:"1.5px solid rgba(124,58,237,0.10)",opacity:inView?1:0,transform:inView?"translateY(0) scale(1)":"translateY(30px) scale(0.97)",transition:"opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",position:"relative",zIndex:1 }}>
            <h3 style={{ fontSize:"18px",fontWeight:800,color:"#7c3aed",fontFamily:"'Outfit',sans-serif",textAlign:"center",marginBottom:"28px" }}>Bundle Package</h3>
            <ul style={{ listStyle:"none",padding:0,margin:"0 0 36px 0",display:"flex",flexDirection:"column",gap:"14px" }}>
              {BUNDLE_ITEMS.map((item,i) => (
                <li key={i} style={{ display:"flex",alignItems:"center",gap:"12px",fontSize:"clamp(13px,1.3vw,14.5px)",color:"#374151",fontFamily:"'Outfit',sans-serif",lineHeight:1.5 }}>
                  <span style={{ width:"7px",height:"7px",borderRadius:"50%",background:"#7c3aed",flexShrink:0 }}/>
                  {item}
                </li>
              ))}
            </ul>
            <div style={{ textAlign:"center" }}>
              <button onClick={onBuyClick} style={{
                background:"#7c3aed",color:"#fff",border:"none",borderRadius:"50px",padding:"14px 36px",fontSize:"14.5px",fontWeight:800,cursor:"pointer",fontFamily:"'Outfit',sans-serif",display:"inline-flex",alignItems:"center",gap:"10px",boxShadow:"0 6px 22px rgba(124,58,237,0.35)",transition:"all 0.22s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 14px 36px rgba(124,58,237,0.50)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 6px 22px rgba(124,58,237,0.35)"; }}
              >
                Buy Book
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   NEWSLETTER SECTION
══════════════════════════════════════════════════════ */
function NewsletterSection() {
  const [ref, inView]           = useInView(0.3);
  const [email, setEmail]       = useState("");
  const [emailError, setEmailError] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async () => {
  const v = email.trim();
  if (!v) { setEmailError("Email is required"); return; }
  if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(v)) {
    setEmailError("Enter a valid email address");
    return;
  }
  setEmailError("");
  setSubscribing(true);

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "subscriber", email: v }),
    });

    const result = await res.json();

    if (result.reason === "duplicate") {
      setEmailError("This email is already subscribed!");
      return;
    }

    setSubscribed(true);

  } catch {
    // Network issue — fallback
    setEmailError("Something went wrong. Please try again.");
  } finally {
    setSubscribing(false);
  }
};

  return (
    <div ref={ref} style={{ background:"linear-gradient(135deg,#6d28d9,#7c3aed,#6d28d9)",position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(255,255,255,0.10) 1px,transparent 1px)",backgroundSize:"22px 22px",pointerEvents:"none" }}/>
      <div style={{ maxWidth:"1200px",margin:"0 auto",padding:"36px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"36px",flexWrap:"wrap",position:"relative",zIndex:1,opacity:inView?1:0,transition:"opacity 0.8s ease" }}>
        <div style={{ display:"flex",alignItems:"center",gap:"20px" }}>
          <div style={{ width:"46px",height:"46px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",animation:"spinRingAnim 6s linear infinite" }}>
            <svg width="40" height="40" viewBox="0 0 46 46" fill="none"><path d="M23 4v38M4 23h38M8 8l30 30M38 8L8 38" stroke="rgba(255,255,255,0.85)" strokeWidth="3.5" strokeLinecap="round"/></svg>
          </div>
          <div>
            <h2 style={{ fontSize:"clamp(1.2rem,2.2vw,1.6rem)",fontWeight:900,color:"#fff",lineHeight:1.1,letterSpacing:"-0.02em",marginBottom:"5px",fontFamily:"'Outfit',sans-serif" }}>Join Our Newsletter</h2>
            <p style={{ fontSize:"13px",color:"rgba(255,255,255,0.75)",fontWeight:500,fontFamily:"'Outfit',sans-serif" }}>Subscribe to get our latest updates &amp; news.</p>
          </div>
        </div>

        {subscribed ? (
          <div style={{ display:"flex",alignItems:"center",gap:"10px",background:"rgba(255,255,255,0.15)",border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:"12px",padding:"12px 20px" }}>
            <div style={{ width:"28px",height:"28px",borderRadius:"50%",background:"#22c55e",display:"flex",alignItems:"center",justifyContent:"center" }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
            </div>
            <span style={{ color:"#fff",fontWeight:700,fontSize:"14px",fontFamily:"'Outfit',sans-serif" }}>You're subscribed!</span>
          </div>
        ) : (
          <div style={{ display:"flex",flexDirection:"column",gap:"6px" }}>
            <div style={{ display:"flex",gap:"10px",flexWrap:"wrap" }}>
              <div style={{ display:"flex",flexDirection:"column",gap:"4px" }}>
                <input
                  type="email" value={email}
                  onChange={e => { setEmail(e.target.value); if (emailError) setEmailError(""); }}
                  onKeyDown={e => e.key === "Enter" && handleSubscribe()}
                  placeholder="Enter your email"
                  style={{
                    height:"48px",width:"clamp(200px,26vw,300px)",padding:"0 16px",fontSize:"14px",
                    fontFamily:"'Outfit',sans-serif",fontWeight:500,color:"#1a0640",
                    background:"rgba(255,255,255,0.96)",
                    border:`2px solid ${emailError ? "#f87171" : "rgba(255,255,255,0.7)"}`,
                    borderRadius:"12px",outline:"none",
                  }}
                  onFocus={e => e.target.style.borderColor="#fff"}
                  onBlur={e => e.target.style.borderColor = emailError ? "#f87171" : "rgba(255,255,255,0.7)"}
                />
                {emailError && (
                  <p style={{ fontSize:"11.5px",color:"#fca5a5",fontFamily:"'Outfit',sans-serif",display:"flex",alignItems:"center",gap:"4px",margin:0 }}>
                    <svg width="11" height="11" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#fca5a5" strokeWidth="1.8"/><path d="M10 6v4M10 14h.01" stroke="#fca5a5" strokeWidth="1.8" strokeLinecap="round"/></svg>
                    {emailError}
                  </p>
                )}
              </div>
              <button
                onClick={handleSubscribe} disabled={subscribing}
                style={{ height:"48px",background:"#111",color:"#fff",border:"none",borderRadius:"12px",padding:"0 24px",fontSize:"14px",fontWeight:700,fontFamily:"'Outfit',sans-serif",cursor:subscribing?"not-allowed":"pointer",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:"8px",transition:"all 0.22s",opacity:subscribing?0.7:1 }}
                onMouseEnter={e => { if(!subscribing){e.currentTarget.style.background="#2d1b69";e.currentTarget.style.transform="translateY(-2px)";} }}
                onMouseLeave={e => { e.currentTarget.style.background="#111";e.currentTarget.style.transform="translateY(0)"; }}
              >
                {subscribing ? "Subscribing…" : "Subscribe Now"}
                {!subscribing && <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════ */
export default function BooksPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ fontFamily:"'Outfit','Segoe UI',sans-serif",margin:0,padding:0,overflowX:"hidden",background:"#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html, body { overflow-x:hidden; }

        @keyframes bookFloat { 0%,100%{transform:translateY(0px) rotate(-1deg)} 50%{transform:translateY(-18px) rotate(1.2deg)} }
        @keyframes drawBooksArc { from{stroke-dashoffset:420} to{stroke-dashoffset:0} }
        .books-arc { stroke-dasharray:420; stroke-dashoffset:420; }
        .books-arc.arc-animate { animation:drawBooksArc 1.8s cubic-bezier(0.25,0.1,0.2,1) 0.5s forwards; }

        @keyframes bkFadeRight { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes bkFadeUp    { from{opacity:0;transform:translateY(22px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes bkFadeScale { from{opacity:0;transform:scale(0.88)}       to{opacity:1;transform:scale(1)} }
        @keyframes shimmer     { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes modalPop    { from{opacity:0;transform:scale(0.88) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes spin        { to{transform:rotate(360deg)} }
        @keyframes spinRingAnim { to{transform:rotate(360deg)} }

        @keyframes icon-pulse  { 0%,100%{transform:scale(1)} 50%{transform:scale(1.14)} }
        @keyframes icon-wobble { 0%,100%{transform:rotate(0deg)} 25%{transform:rotate(9deg)} 75%{transform:rotate(-9deg)} }
        @keyframes icon-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes ringExpand  { 0%{transform:translate(-50%,-50%) scale(0.85);opacity:0.9} 60%{transform:translate(-50%,-50%) scale(1.08);opacity:0.5} 100%{transform:translate(-50%,-50%) scale(0.85);opacity:0.9} }
        @keyframes sparkle1    { 0%,100%{opacity:1;transform:scale(1) rotate(0deg)} 50%{opacity:0.4;transform:scale(0.6) rotate(20deg)} }
        @keyframes sparkle2    { 0%,100%{opacity:0.8;transform:scale(1)} 50%{opacity:0.2;transform:scale(0.5)} }

        .bk-v1 { animation:bkFadeRight 0.65s ease forwards; opacity:0; animation-delay:0.10s; }
        .bk-v2 { animation:bkFadeUp    0.65s ease forwards; opacity:0; animation-delay:0.26s; }
        .bk-v3 { animation:bkFadeUp    0.65s ease forwards; opacity:0; animation-delay:0.40s; }
        .bk-v4 { animation:bkFadeUp    0.65s ease forwards; opacity:0; animation-delay:0.54s; }
        .bk-vR { animation:bkFadeScale 1.00s ease forwards; opacity:0; animation-delay:0.20s; }

        .books-cta-btn::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent); background-size:200% 100%; animation:shimmer 2.6s infinite; }
        .books-dotgrid { position:absolute; inset:0; pointer-events:none; z-index:0; background-image:radial-gradient(rgba(255,255,255,0.09) 1.2px,transparent 1.2px); background-size:26px 26px; }

        .challenges-grid { display:flex; gap:22px; align-items:stretch; }
        .prep-grid { display:flex; gap:24px; align-items:stretch; }

        @media(max-width:900px) {
          .challenges-grid { flex-direction:column; }
          .prep-grid { flex-direction:column; }
        }

        @media(max-width:860px) {
          .books-inner { flex-direction:column !important; text-align:center !important; padding:100px 24px 60px !important; gap:20px !important; align-items:center !important; flex-wrap:wrap !important; }
          .books-left  { order:1 !important; width:100% !important; max-width:100% !important; align-items:center !important; }
          .books-right { order:2 !important; width:100% !important; height:52vw !important; min-height:220px !important; max-height:320px !important; }
          .books-bottom { order:3 !important; width:100% !important; align-items:center !important; display:flex !important; flex-direction:column !important; gap:20px !important; }
          .books-bullets-desktop { display:none !important; }
          .books-btn-desktop { display:none !important; }
          .books-title { white-space:normal !important; font-size:clamp(1.8rem,6vw,2.8rem) !important; }
          .books-bullets { align-items:center !important; }
        }
        @media(min-width:861px) { .books-bottom { display:none !important; } }
        @media(max-width:480px) { .bundle-section { padding:32px 0 40px !important; } .books-inner { padding:70px 16px 50px !important; } .books-title { font-size:clamp(1.6rem,7vw,2.2rem) !important; } }
        @media(max-width:1024px) and (min-width:861px) { .books-inner { gap:32px !important; padding:40px 3% !important; } .books-left { width:420px !important; } }
      `}</style>

      <Navbar />
      <BooksHero onBuyClick={() => setShowModal(true)} />
      <ChallengesSection />
      <PrepSystemSection />
      <BundleSection onBuyClick={() => setShowModal(true)} />
      <NewsletterSection />
      <Footer />

      {showModal && <BuyBookModal onClose={() => setShowModal(false)} />}
    </div>
  );
}