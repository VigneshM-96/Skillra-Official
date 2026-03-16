import { useState, useEffect, useRef } from "react";
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

function SectionLabel({ text, color = "#7c3aed", bg = "#f3f0ff", border = "#e4d9ff" }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: bg, border: `1.5px solid ${border}`, borderRadius: "9px", padding: "7px 16px", fontSize: "12px", color, fontWeight: 700, marginBottom: "16px", boxShadow: "0 2px 12px rgba(124,58,237,0.10)", letterSpacing: "0.08em" }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill={color}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
      {text}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SCALLOPED BADGE PATH
═══════════════════════════════════════════════════ */
function scallopPath(cx, cy, r, bumps) {
  let d = "";
  for (let i = 0; i < bumps * 2; i++) {
    const angle = (i / (bumps * 2)) * Math.PI * 2 - Math.PI / 2;
    const bumpR = i % 2 === 0 ? r : r - 8;
    const x = cx + Math.cos(angle) * bumpR;
    const y = cy + Math.sin(angle) * bumpR;
    d += (i === 0 ? "M" : "L") + `${x.toFixed(2)},${y.toFixed(2)} `;
  }
  return d + "Z";
}

/* ═══════════════════════════════════════════════════
   CARD ART COMPONENTS
═══════════════════════════════════════════════════ */
function PurpleCardArt({ hovered }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "160px", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: "-14px", top: "18px", display: "flex", flexDirection: "column", gap: "7px", transform: hovered ? "scale(1.08) translateX(-4px)" : "scale(1)", transition: "transform 0.5s ease" }}>
        {[{ w: 96, opacity: 0.55 }, { w: 84, opacity: 0.45 }, { w: 70, opacity: 0.35 }, { w: 54, opacity: 0.22 }].map((lobe, i) => (
          <div key={i} style={{ width: lobe.w, height: 26, borderRadius: "50px", background: `rgba(216,200,255,${lobe.opacity})`, marginLeft: "auto", animation: `lobeFloat ${2.4 + i * 0.3}s ${i * 0.15}s ease-in-out infinite` }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: "18px", top: "18px", width: "76px", height: "76px", display: "flex", alignItems: "center", justifyContent: "center", transform: hovered ? "scale(1.1) rotate(8deg)" : "scale(1) rotate(0deg)", transition: "transform 0.4s cubic-bezier(.34,1.56,.64,1)", animation: hovered ? "none" : "badgeWobble 4s ease-in-out infinite" }}>
        <svg width="76" height="76" viewBox="0 0 76 76" fill="none" style={{ position: "absolute" }}>
          <path d={scallopPath(38, 38, 36, 10)} fill="rgba(255,255,255,0.22)" />
        </svg>
        <svg width="28" height="30" viewBox="0 0 28 30" fill="none" style={{ position: "relative", zIndex: 2 }}>
          <path d="M14 2C9.58 2 6 5.58 6 10c0 2.76 1.38 5.2 3.5 6.7V19a1 1 0 001 1h7a1 1 0 001-1v-2.3C20.62 15.2 22 12.76 22 10c0-4.42-3.58-8-8-8z" fill="white" fillOpacity="0.95" />
          <rect x="10.5" y="20" width="7" height="2" rx="1" fill="white" fillOpacity="0.75" />
          <rect x="11" y="23" width="6" height="2" rx="1" fill="white" fillOpacity="0.55" />
        </svg>
      </div>
      <div style={{ position: "absolute", left: "102px", top: "24px", opacity: hovered ? 1 : 0.55, transition: "opacity 0.3s", animation: "sparklePulse 2s ease-in-out infinite" }}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><line x1="6.5" y1="0" x2="6.5" y2="13" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" /><line x1="0" y1="6.5" x2="13" y2="6.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" /></svg>
      </div>
      <div style={{ position: "absolute", left: "34px", top: "108px", opacity: hovered ? 0.8 : 0.35, transition: "opacity 0.3s", animation: "sparklePulse 2.5s 0.5s ease-in-out infinite" }}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><line x1="5" y1="0" x2="5" y2="10" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" /><line x1="0" y1="5" x2="10" y2="5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </div>
    </div>
  );
}

function OrangeCardArt({ hovered }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "160px", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: "-30px", top: "-12px", transform: hovered ? "scale(1.1)" : "scale(1)", transition: "transform 0.5s ease" }}>
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
          {[62, 52, 42, 32, 22, 12].map((r, i) => (
            <circle key={i} cx="70" cy="70" r={r} stroke="#6C3FC5" strokeWidth="2.2" fill="none" style={{ opacity: 0.55 - i * 0.05, animation: `rippleGrow ${2.2 + i * 0.25}s ${i * 0.18}s ease-in-out infinite`, transformOrigin: "70px 70px" }} />
          ))}
        </svg>
      </div>
      <div style={{ position: "absolute", left: "18px", top: "18px", width: "76px", height: "76px", display: "flex", alignItems: "center", justifyContent: "center", transform: hovered ? "scale(1.1) rotate(-8deg)" : "scale(1) rotate(0deg)", transition: "transform 0.4s cubic-bezier(.34,1.56,.64,1)", animation: hovered ? "none" : "badgeWobble 4.5s 0.3s ease-in-out infinite" }}>
        <svg width="76" height="76" viewBox="0 0 76 76" fill="none" style={{ position: "absolute" }}>
          <path d={scallopPath(38, 38, 36, 10)} fill="rgba(255,255,255,0.22)" />
        </svg>
        <svg width="32" height="28" viewBox="0 0 32 28" fill="none" style={{ position: "relative", zIndex: 2 }}>
          <rect x="3" y="10" width="26" height="17" rx="3" fill="#1a1a1a" fillOpacity="0.88" />
          <path d="M11 10V8a2 2 0 012-2h6a2 2 0 012 2v2" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <line x1="3" y1="18" x2="29" y2="18" stroke="#555" strokeWidth="1.8" />
          <rect x="13.5" y="16.5" width="5" height="3" rx="1.5" fill="#444" />
        </svg>
      </div>
      <div style={{ position: "absolute", left: "102px", top: "24px", opacity: hovered ? 1 : 0.55, transition: "opacity 0.3s", animation: "sparklePulse 2s ease-in-out infinite" }}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><line x1="6.5" y1="0" x2="6.5" y2="13" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" /><line x1="0" y1="6.5" x2="13" y2="6.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" /></svg>
      </div>
      <div style={{ position: "absolute", left: "34px", top: "108px", opacity: hovered ? 0.8 : 0.35, transition: "opacity 0.3s", animation: "sparklePulse 2.5s 0.4s ease-in-out infinite" }}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><line x1="5" y1="0" x2="5" y2="10" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" /><line x1="0" y1="5" x2="10" y2="5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </div>
    </div>
  );
}

function GreenCardArt({ hovered }) {
  const dots = [];
  for (let row = 0; row < 6; row++) for (let col = 0; col < 6; col++) dots.push({ x: col * 12, y: row * 12, i: row * 6 + col });
  return (
    <div style={{ position: "relative", width: "100%", height: "160px", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: "60px", top: "16px", transform: hovered ? "scale(1.06) rotate(3deg)" : "scale(1)", transition: "transform 0.5s ease" }}>
        {dots.map(d => (
          <div key={d.i} style={{ position: "absolute", left: d.x, top: d.y, width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.30)", animation: `dotBob ${2 + (d.i % 4) * 0.35}s ${(d.i % 6) * 0.1}s ease-in-out infinite` }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: "18px", top: "18px", width: "76px", height: "76px", display: "flex", alignItems: "center", justifyContent: "center", transform: hovered ? "scale(1.1) rotate(8deg)" : "scale(1) rotate(0deg)", transition: "transform 0.4s cubic-bezier(.34,1.56,.64,1)", animation: hovered ? "none" : "badgeWobble 5s 0.6s ease-in-out infinite" }}>
        <svg width="76" height="76" viewBox="0 0 76 76" fill="none" style={{ position: "absolute" }}>
          <path d={scallopPath(38, 38, 36, 10)} fill="rgba(255,255,255,0.20)" />
        </svg>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" style={{ position: "relative", zIndex: 2 }}>
          <circle cx="15" cy="15" r="13" fill="#1a1a1a" fillOpacity="0.88" />
          <path d="M9 15l4.5 4.5 7.5-9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div style={{ position: "absolute", left: "102px", top: "24px", opacity: hovered ? 1 : 0.55, transition: "opacity 0.3s", animation: "sparklePulse 2.2s 0.2s ease-in-out infinite" }}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><line x1="6.5" y1="0" x2="6.5" y2="13" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" /><line x1="0" y1="6.5" x2="13" y2="6.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" /></svg>
      </div>
      <div style={{ position: "absolute", left: "34px", top: "108px", opacity: hovered ? 0.8 : 0.35, transition: "opacity 0.3s", animation: "sparklePulse 2.8s 0.7s ease-in-out infinite" }}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><line x1="5" y1="0" x2="5" y2="10" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" /><line x1="0" y1="5" x2="10" y2="5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   COUNSELOR MODAL
═══════════════════════════════════════════════════ */
const CONTACT_COURSES = [
  "AI Medical Coding", "AI Medical Billing", "AI Medical Scribing",
  "Full Stack Development", "Data Analytics", "UI/UX Design",
  "SAP Development", "Tally & GST", "Financial Accounting",
];

function CounselorModal({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", course: "" });
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
        <button onClick={onClose} style={{ position: "absolute", top: "18px", right: "18px", width: "32px", height: "32px", borderRadius: "50%", background: "#f3f0ff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", color: "#7c3aed", fontWeight: 700 }}>x</button>
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
            <button onClick={handleSubmit} disabled={submitting}
              style={{ width: "100%", background: "linear-gradient(135deg,#ff6b35,#f03e00)", color: "#fff", border: "none", borderRadius: "50px", padding: "15px 30px", fontSize: "15px", fontWeight: 800, fontFamily: "'Outfit',sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", boxShadow: "0 6px 22px rgba(255,80,0,0.35)", transition: "all 0.22s" }}
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
   PAGE HERO
═══════════════════════════════════════════════════ */
function ServicesHero({ onCounselorClick }) {
  return (
    <section style={{ background: "radial-gradient(ellipse 80% 70% at 70% 40%,rgba(167,139,250,0.18) 0%,transparent 70%),radial-gradient(ellipse 50% 60% at 10% 80%,rgba(124,58,237,0.1) 0%,transparent 65%),#faf8ff", padding: "96px 6% 72px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
      <div style={{ position: "absolute", right: "-120px", top: "-120px", width: "520px", height: "520px", borderRadius: "50%", border: "1.5px solid rgba(124,58,237,0.08)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: "-60px", top: "-60px", width: "360px", height: "360px", borderRadius: "50%", border: "1px solid rgba(124,58,237,0.06)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ animation: "fadeRight .6s ease forwards", opacity: 0, animationDelay: ".05s" }}>
          <SectionLabel text="OUR SERVICES" />
        </div>
        <h1 style={{ fontSize: "clamp(2.4rem,5vw,3.8rem)", fontWeight: 900, lineHeight: 1.08, color: "#120630", letterSpacing: "-1.5px", marginBottom: "22px", maxWidth: "740px", animation: "fadeUp .65s ease forwards", opacity: 0, animationDelay: ".15s" }}>
          More Than Training —<br />
          <span style={{ color: "#7c3aed" }}>A Complete Career System</span>
        </h1>
        <p style={{ fontSize: "16px", color: "#5c4a80", lineHeight: 1.8, maxWidth: "580px", marginBottom: "36px", animation: "fadeUp .65s ease forwards", opacity: 0, animationDelay: ".28s" }}>
          Skillra delivers three integrated services that work together — campus-level training, dedicated placement support, and expert career mentorship — designed to take you from enrollment to employment.
        </p>

        <div style={{ display: "flex", gap: "28px", flexWrap: "wrap", marginBottom: "40px", animation: "fadeUp .65s ease forwards", opacity: 0, animationDelay: ".38s" }}>
          {[{ num: "3", label: "Core Services" }, { num: "15+", label: "Years Experience" }, { num: "500+", label: "Students Placed" }, { num: "120+", label: "Hiring Partners" }].map((s, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "clamp(1.6rem,2.5vw,2.1rem)", fontWeight: 900, color: "#7c3aed", lineHeight: 1, letterSpacing: "-1px" }}>{s.num}</span>
              <span style={{ fontSize: "12px", color: "#9270c0", marginTop: "3px", fontWeight: 600, letterSpacing: "0.04em", fontFamily: "'Outfit',sans-serif" }}>{s.label}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", animation: "fadeUp .65s ease forwards", opacity: 0, animationDelay: ".50s" }}>
          <button onClick={onCounselorClick}
            style={{ background: "linear-gradient(135deg,#ff6b35 0%,#f03e00 100%)", color: "#fff", border: "none", borderRadius: "32px", padding: "15px 32px", fontSize: "13.5px", fontWeight: 800, cursor: "pointer", letterSpacing: ".5px", boxShadow: "0 6px 22px rgba(255,80,0,.38)", transition: "all 0.22s", fontFamily: "'Outfit',sans-serif" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 34px rgba(255,80,0,.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 22px rgba(255,80,0,.38)"; }}>
            TALK TO OUR COUNSELORS
          </button>
          <a href="#services-detail"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1.5px solid #c4b5fd", color: "#7c3aed", background: "transparent", borderRadius: "32px", padding: "15px 28px", fontSize: "13.5px", fontWeight: 700, cursor: "pointer", textDecoration: "none", transition: "all 0.22s", fontFamily: "'Outfit',sans-serif" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(124,58,237,0.06)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            Explore Services
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 3l4 4-4 4M3 7h8" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SERVICE OVERVIEW CARDS (template cards — top)
═══════════════════════════════════════════════════ */
const OVERVIEW_CARDS = [
  {
    id: 1,
    bg: "linear-gradient(160deg, #7c3aed 0%, #6d28d9 100%)",
    shadowColor: "rgba(109,40,217,0.40)",
    title: "Campus Training Programs",
    titleColor: "#e9d5ff",
    desc: "We partner with colleges to deliver industry-ready training directly on campus, bridging the gap between academics and real-world skills.",
    Art: PurpleCardArt,
    contentPaddingTop: "28px",
    anchor: "#campus-training",
  },
  {
    id: 2,
    bg: "linear-gradient(160deg, #ea580c 0%, #c2410c 100%)",
    shadowColor: "rgba(234,88,12,0.40)",
    title: "Placement Support",
    titleColor: "#fed7aa",
    desc: "We guide every student with structured job preparation, resume building, and interview coaching to land roles in top companies.",
    Art: OrangeCardArt,
    contentPaddingTop: "4px",
    anchor: "#placement-support",
  },
  {
    id: 3,
    bg: "linear-gradient(160deg, #15803d 0%, #166534 100%)",
    shadowColor: "rgba(21,128,61,0.40)",
    title: "Career Guidance & Mentorship",
    titleColor: "#bbf7d0",
    desc: "Get personalized guidance from industry experts who understand market trends and help you chart your ideal career path.",
    Art: GreenCardArt,
    contentPaddingTop: "28px",
    anchor: "#career-mentorship",
  },
];

function OverviewCard({ card, index }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [ripples, setRipples] = useState([]);
  const cardRef = useRef(null);
  const { Art } = card;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150 + index * 140);
    return () => clearTimeout(t);
  }, [index]);

  const handleClick = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const id = Date.now();
    setRipples(r => [...r, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 800);
  };

  return (
    <a href={card.anchor} style={{ textDecoration: "none", flex: "1 1 280px", maxWidth: "360px" }}>
      <div ref={cardRef} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={handleClick}
        style={{ width: "100%", height: "100%", background: card.bg, borderRadius: "20px", overflow: "hidden", cursor: "pointer", position: "relative", opacity: visible ? 1 : 0, transform: visible ? (hovered ? "translateY(-10px) scale(1.025)" : "translateY(0) scale(1)") : "translateY(36px) scale(0.96)", transition: "opacity 0.6s ease, transform 0.35s cubic-bezier(.34,1.4,.64,1), box-shadow 0.35s ease", boxShadow: hovered ? `0 28px 60px ${card.shadowColor}, 0 4px 16px rgba(0,0,0,0.12)` : `0 8px 28px ${card.shadowColor.replace("0.40", "0.22")}`, display: "flex", flexDirection: "column" }}>
        {ripples.map(rp => (
          <div key={rp.id} style={{ position: "absolute", left: rp.x, top: rp.y, width: "10px", height: "10px", marginLeft: "-5px", marginTop: "-5px", borderRadius: "50%", background: "rgba(255,255,255,0.25)", animation: "clickRipple 0.7s ease-out forwards", pointerEvents: "none", zIndex: 20 }} />
        ))}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.10) 0%, transparent 65%)", opacity: hovered ? 1 : 0, transition: "opacity 0.4s ease", pointerEvents: "none", zIndex: 1 }} />
        <div style={{ position: "absolute", top: 0, left: hovered ? "110%" : "-60%", width: "50%", height: "100%", background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.07) 50%, transparent 70%)", transition: "left 0.6s cubic-bezier(.4,0,.2,1)", pointerEvents: "none", zIndex: 2 }} />
        <div style={{ position: "relative", zIndex: 3 }}><Art hovered={hovered} /></div>
        <div style={{ padding: `${card.contentPaddingTop} 24px 34px`, position: "relative", zIndex: 3 }}>
          <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: "1.18rem", color: card.titleColor, lineHeight: 1.28, marginBottom: "12px", transform: hovered ? "translateY(-2px)" : "translateY(0)", transition: "transform 0.3s ease" }}>{card.title}</h3>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.80)", lineHeight: 1.72, transform: hovered ? "translateY(-1px)" : "translateY(0)", transition: "transform 0.35s ease 0.04s" }}>{card.desc}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "18px", opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s" }}>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "rgba(255,255,255,0.95)", letterSpacing: "0.04em", textTransform: "uppercase" }}>View Details</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: hovered ? "arrowSlide 0.8s ease infinite" : "none" }}><path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "-28px", right: "-28px", width: "90px", height: "90px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.07)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-14px", right: "-14px", width: "54px", height: "54px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.05)", pointerEvents: "none" }} />
      </div>
    </a>
  );
}

function OverviewSection() {
  const [ref, inView] = useInView(0.08);
  return (
    <section ref={ref} style={{ padding: "80px 0", background: "#fff", borderTop: "1px solid #f0ebff", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "48px", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <SectionLabel text="WHAT WE OFFER" />
          <h2 style={{ fontSize: "clamp(1.9rem,3.5vw,2.7rem)", fontWeight: 900, fontFamily: "'Outfit',sans-serif", color: "#1a0a3c", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Services{" "}
            <span style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>We Do</span>
          </h2>
        </div>
        <div style={{ display: "flex", gap: "28px", flexWrap: "wrap", alignItems: "stretch" }}>
          {OVERVIEW_CARDS.map((card, i) => <OverviewCard key={card.id} card={card} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SERVICE 1 — CAMPUS TRAINING
═══════════════════════════════════════════════════ */
function CampusTrainingSection({ onEnroll }) {
  const [ref, inView] = useInView(0.07);

  const features = [
    { title: "On-Campus Delivery", desc: "Our trainers travel to your institution and deliver live, interactive sessions within your campus premises, eliminating commute barriers and maximizing attendance." },
    { title: "Curriculum Co-Design", desc: "We work with college placement cells and faculty to align our training content with the institution's academic calendar and student profile." },
    { title: "Batch Flexibility", desc: "We accommodate small cohorts of 20 students to large batches of 200+, with scheduling options that do not conflict with regular academic timetables." },
    { title: "Tamper-Proof Certification", desc: "Every student who completes the program receives a blockchain-verified Skillra certificate recognized by our 120+ hiring partners." },
    { title: "Faculty Development", desc: "As part of the partnership, we offer optional upskilling workshops for faculty to stay current with industry tools and practices." },
    { title: "Placement Integration", desc: "Campus programs automatically enroll students into our placement pipeline, connecting them with job opportunities before they even graduate." },
  ];

  const programs = [
    { label: "AI Medical Coding & Billing", color: "#1e3a8a", bg: "#eff6ff" },
    { label: "Full Stack Development", color: "#c2410c", bg: "#fff7ed" },
    { label: "Data Analytics", color: "#c2410c", bg: "#fff7ed" },
    { label: "UI/UX Design", color: "#c2410c", bg: "#fff7ed" },
    { label: "SAP Development", color: "#14532d", bg: "#f0fdf4" },
    { label: "Financial Accounting & Tally", color: "#14532d", bg: "#f0fdf4" },
  ];

  return (
    <section id="campus-training" ref={ref} style={{ padding: "88px 0", background: "#faf8ff", borderTop: "1px solid #f0ebff", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>

        {/* Section header */}
        <div style={{ marginBottom: "52px", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#f3f0ff", border: "1.5px solid #e4d9ff", borderRadius: "9px", padding: "7px 16px", fontSize: "12px", color: "#7c3aed", fontWeight: 700, marginBottom: "16px", letterSpacing: "0.08em" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#7c3aed" }} />
            SERVICE 01
          </div>
          <h2 style={{ fontSize: "clamp(1.9rem,3.5vw,2.7rem)", fontWeight: 900, fontFamily: "'Outfit',sans-serif", color: "#120630", letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: "16px" }}>
            Campus Training <span style={{ color: "#7c3aed", fontStyle: "italic" }}>Programs</span>
          </h2>
          <p style={{ fontSize: "15px", color: "#6b5a9e", fontFamily: "'Outfit',sans-serif", maxWidth: "640px", lineHeight: 1.8 }}>
            Skillra partners with engineering colleges, arts and science institutions, and polytechnics to deliver structured industry training directly within campus boundaries. Our campus programs are not supplementary workshops — they are full certification-grade programs that run alongside academics and produce job-ready graduates.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
          {/* Left — features */}
          <div>
            <div style={{ fontSize: "13px", fontWeight: 800, color: "#7c3aed", letterSpacing: "0.08em", marginBottom: "20px", fontFamily: "'Outfit',sans-serif" }}>WHAT IS INCLUDED</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {features.map((f, i) => (
                <div key={i} style={{ background: "#fff", border: "1.5px solid #e4d9ff", borderRadius: "16px", padding: "20px 22px", opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-24px)", transition: `all 0.65s ease ${i * 0.08}s`, cursor: "default" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#c4b5fd"; e.currentTarget.style.transform = "translateX(6px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(124,58,237,0.10)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#e4d9ff"; e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7c3aed", marginTop: "7px", flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 800, color: "#1a0640", marginBottom: "5px", fontFamily: "'Outfit',sans-serif" }}>{f.title}</div>
                      <div style={{ fontSize: "13px", color: "#6b5a9e", lineHeight: 1.72, fontFamily: "'Outfit',sans-serif" }}>{f.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — programs + stats + CTA */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(24px)", transition: "all 0.8s ease 0.15s" }}>
            <div style={{ background: "linear-gradient(145deg,#f3f0ff,#ede9fe)", border: "1.5px solid #e4d9ff", borderRadius: "24px", padding: "32px 28px", marginBottom: "24px" }}>
              <div style={{ fontSize: "13px", fontWeight: 800, color: "#7c3aed", letterSpacing: "0.08em", marginBottom: "18px", fontFamily: "'Outfit',sans-serif" }}>PROGRAMS AVAILABLE ON CAMPUS</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                {programs.map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", background: "#fff", borderRadius: "10px", padding: "10px 14px", border: `1.5px solid ${p.bg}` }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke={p.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span style={{ fontSize: "13.5px", fontWeight: 600, color: "#1a0640", fontFamily: "'Outfit',sans-serif" }}>{p.label}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "22px" }}>
                {[{ num: "30+", label: "Partner Colleges" }, { num: "1000+", label: "Campus Students" }, { num: "6", label: "Programs Offered" }, { num: "98%", label: "Satisfaction Rate" }].map((s, i) => (
                  <div key={i} style={{ background: "#fff", border: "1.5px solid #e4d9ff", borderRadius: "12px", padding: "14px", textAlign: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: 900, color: "#7c3aed", lineHeight: 1, fontFamily: "'Outfit',sans-serif" }}>{s.num}</div>
                    <div style={{ fontSize: "11px", color: "#9270c0", marginTop: "3px", fontWeight: 600, fontFamily: "'Outfit',sans-serif" }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <button onClick={onEnroll} style={{ width: "100%", background: "linear-gradient(135deg,#7c3aed,#5b21b6)", color: "#fff", border: "none", borderRadius: "50px", padding: "14px 24px", fontSize: "13px", fontWeight: 800, cursor: "pointer", fontFamily: "'Outfit',sans-serif", letterSpacing: "0.4px", transition: "all 0.22s", boxShadow: "0 4px 18px rgba(124,58,237,0.30)" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(124,58,237,0.42)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 18px rgba(124,58,237,0.30)"; }}>
                PARTNER WITH US
              </button>
            </div>

            {/* Process */}
            <div style={{ background: "#fff", border: "1.5px solid #e4d9ff", borderRadius: "20px", padding: "24px 26px" }}>
              <div style={{ fontSize: "13px", fontWeight: 800, color: "#7c3aed", letterSpacing: "0.08em", marginBottom: "16px", fontFamily: "'Outfit',sans-serif" }}>HOW THE PARTNERSHIP WORKS</div>
              {[
                "Initial consultation with your placement cell",
                "Curriculum alignment and scheduling",
                "Batch kickoff and live training delivery",
                "Assessment, certification, and placement",
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: i < 3 ? "12px" : 0 }}>
                  <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: i === 0 ? "#7c3aed" : "#f3f0ff", border: `1.5px solid ${i === 0 ? "#7c3aed" : "#e4d9ff"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: "10px", fontWeight: 900, color: i === 0 ? "#fff" : "#7c3aed", fontFamily: "'Outfit',sans-serif" }}>0{i + 1}</span>
                  </div>
                  <span style={{ fontSize: "13px", color: "#3b2a6e", lineHeight: 1.6, fontFamily: "'Outfit',sans-serif", paddingTop: "3px" }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SERVICE 2 — PLACEMENT SUPPORT
═══════════════════════════════════════════════════ */
function PlacementSupportSection({ onEnroll }) {
  const [ref, inView] = useInView(0.07);

  const pillars = [
    { title: "Resume & LinkedIn Optimisation", desc: "Our placement team reviews and rewrites every student's resume and LinkedIn profile using ATS-compatible templates that get noticed by real recruiters." },
    { title: "Mock Interview Program", desc: "Students undergo a minimum of three full-length mock interviews — technical, HR, and domain-specific — with detailed feedback after each round." },
    { title: "Job Referral Network", desc: "We maintain active relationships with 120+ hiring companies across healthcare, IT, and finance who post exclusive openings directly to our placement cell." },
    { title: "Aptitude & Communication Training", desc: "Dedicated modules on quantitative aptitude, verbal reasoning, and professional communication prepare students for every stage of the hiring process." },
    { title: "Offer Negotiation Guidance", desc: "Our counselors coach students on how to evaluate, compare, and negotiate job offers to maximise compensation and career trajectory." },
    { title: "Post-Placement Follow-Up", desc: "We maintain contact with placed students for six months post-joining to ensure a smooth transition and address any early-career challenges." },
  ];

  return (
    <section id="placement-support" ref={ref} style={{ padding: "88px 0", background: "#fff", borderTop: "1px solid #f0ebff", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "52px", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff7ed", border: "1.5px solid #fed7aa", borderRadius: "9px", padding: "7px 16px", fontSize: "12px", color: "#c2410c", fontWeight: 700, marginBottom: "16px", letterSpacing: "0.08em" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#c2410c" }} />
            SERVICE 02
          </div>
          <h2 style={{ fontSize: "clamp(1.9rem,3.5vw,2.7rem)", fontWeight: 900, fontFamily: "'Outfit',sans-serif", color: "#120630", letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: "16px" }}>
            Placement <span style={{ color: "#c2410c", fontStyle: "italic" }}>Support</span>
          </h2>
          <p style={{ fontSize: "15px", color: "#6b5a9e", fontFamily: "'Outfit',sans-serif", maxWidth: "640px", lineHeight: 1.8 }}>
            At Skillra, placement is not a bonus — it is the primary deliverable. From the first day of training, our dedicated placement cell is actively working to match each student with the right opportunity. We do not measure success by certifications issued but by offers accepted.
          </p>
        </div>

        {/* Stats banner */}
        <div style={{ background: "linear-gradient(135deg,#ea580c,#c2410c)", borderRadius: "20px", padding: "32px 40px", display: "flex", gap: "0", flexWrap: "wrap", marginBottom: "52px", opacity: inView ? 1 : 0, transition: "opacity 0.8s ease 0.1s", boxShadow: "0 16px 48px rgba(234,88,12,0.25)" }}>
          {[{ num: "98%", label: "Placement Rate" }, { num: "500+", label: "Students Placed" }, { num: "120+", label: "Hiring Partners" }, { num: "30", label: "Avg. Days to Offer" }].map((s, i) => (
            <div key={i} style={{ flex: "1 1 120px", textAlign: "center", padding: "0 16px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.20)" : "none" }}>
              <div style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-1px", fontFamily: "'Outfit',sans-serif" }}>{s.num}</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", marginTop: "5px", fontWeight: 600, fontFamily: "'Outfit',sans-serif" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Feature grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(330px,1fr))", gap: "20px", marginBottom: "40px" }}>
          {pillars.map((p, i) => (
            <div key={i} style={{ background: "#fff", border: "1.5px solid #fed7aa", borderRadius: "18px", padding: "24px 22px", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `all 0.65s ease ${i * 0.09}s`, cursor: "default" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(234,88,12,0.12)"; e.currentTarget.style.borderColor = "#fb923c"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#fed7aa"; }}>
              <div style={{ width: "36px", height: "4px", background: "#ea580c", borderRadius: "99px", marginBottom: "16px" }} />
              <h4 style={{ fontSize: "15px", fontWeight: 800, color: "#c2410c", marginBottom: "9px", fontFamily: "'Outfit',sans-serif", lineHeight: 1.3 }}>{p.title}</h4>
              <p style={{ fontSize: "13.5px", color: "#5a5275", lineHeight: 1.75, fontFamily: "'Outfit',sans-serif", margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Hiring partners note */}
        <div style={{ background: "linear-gradient(145deg,#fff7ed,#ffedd5)", border: "1.5px solid #fed7aa", borderRadius: "20px", padding: "28px 32px", display: "flex", alignItems: "center", gap: "28px", flexWrap: "wrap", opacity: inView ? 1 : 0, transition: "opacity 0.8s ease 0.45s" }}>
          <div style={{ flex: 1, minWidth: "260px" }}>
            <div style={{ fontSize: "13px", fontWeight: 800, color: "#c2410c", letterSpacing: "0.08em", marginBottom: "8px", fontFamily: "'Outfit',sans-serif" }}>ACTIVE HIRING PARTNERSHIPS</div>
            <p style={{ fontSize: "14px", color: "#5a5275", lineHeight: 1.75, fontFamily: "'Outfit',sans-serif", margin: 0 }}>
              Our placement cell maintains live relationships with hospitals, healthcare BPOs, IT product companies, software consultancies, finance firms, and SAP implementation partners. Exclusive job postings reach our students before they are listed publicly.
            </p>
          </div>
          <button onClick={onEnroll} style={{ background: "linear-gradient(135deg,#ff6b35,#f03e00)", color: "#fff", border: "none", borderRadius: "50px", padding: "14px 28px", fontSize: "13px", fontWeight: 800, cursor: "pointer", fontFamily: "'Outfit',sans-serif", letterSpacing: "0.4px", transition: "all 0.22s", boxShadow: "0 4px 18px rgba(255,80,0,0.28)", whiteSpace: "nowrap" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(255,80,0,0.42)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 18px rgba(255,80,0,0.28)"; }}>
            GET PLACEMENT SUPPORT
          </button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SERVICE 3 — CAREER GUIDANCE & MENTORSHIP
═══════════════════════════════════════════════════ */
function CareerMentorshipSection({ onEnroll }) {
  const [ref, inView] = useInView(0.07);

  const mentorshipAreas = [
    { title: "Career Path Mapping", desc: "During a structured one-on-one session, our counselors assess your background, aptitude, and long-term goals to create a personalised career roadmap." },
    { title: "Domain Selection Guidance", desc: "Not sure whether to pursue healthcare, technology, or finance? We use a structured framework to match your strengths with the right domain." },
    { title: "Industry Trend Briefings", desc: "Monthly sessions where our mentors walk students through evolving industry demands, emerging tools, and in-demand skill sets so you always stay ahead." },
    { title: "Ongoing Mentor Access", desc: "Students get direct access to assigned industry mentors via scheduled calls throughout their program duration — not just during a single orientation session." },
    { title: "Salary & Role Benchmarking", desc: "We provide current, data-backed salary benchmarks and role progression maps so students can set informed expectations and negotiate confidently." },
    { title: "Entrepreneurship & Freelancing Paths", desc: "For students interested in independent practice — medical coding freelancing, web development contracts, or accounting consulting — we provide dedicated guidance tracks." },
  ];

  const mentors = [
    { name: "Dr. Priya Menon", role: "Healthcare Technology Lead", exp: "18 Years Experience", domain: "Healthcare" },
    { name: "Karthik Subramanian", role: "Senior Software Architect", exp: "14 Years Experience", domain: "Technology" },
    { name: "Anitha Krishnamurthy", role: "SAP & Finance Consultant", exp: "16 Years Experience", domain: "Finance" },
  ];

  return (
    <section id="career-mentorship" ref={ref} style={{ padding: "88px 0", background: "#faf8ff", borderTop: "1px solid #f0ebff", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "52px", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: "9px", padding: "7px 16px", fontSize: "12px", color: "#14532d", fontWeight: 700, marginBottom: "16px", letterSpacing: "0.08em" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#14532d" }} />
            SERVICE 03
          </div>
          <h2 style={{ fontSize: "clamp(1.9rem,3.5vw,2.7rem)", fontWeight: 900, fontFamily: "'Outfit',sans-serif", color: "#120630", letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: "16px" }}>
            Career Guidance <span style={{ color: "#14532d", fontStyle: "italic" }}>& Mentorship</span>
          </h2>
          <p style={{ fontSize: "15px", color: "#6b5a9e", fontFamily: "'Outfit',sans-serif", maxWidth: "640px", lineHeight: 1.8 }}>
            Technical skills get you through the interview. Career clarity determines whether you thrive in the long run. Our mentorship service connects students with senior industry practitioners who provide sustained, personalised guidance from before enrollment through post-placement growth.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "48px", alignItems: "start" }}>
          {/* Left */}
          <div>
            <div style={{ fontSize: "13px", fontWeight: 800, color: "#14532d", letterSpacing: "0.08em", marginBottom: "20px", fontFamily: "'Outfit',sans-serif" }}>MENTORSHIP AREAS</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {mentorshipAreas.map((m, i) => (
                <div key={i} style={{ background: "#fff", border: "1.5px solid #bbf7d0", borderRadius: "16px", padding: "20px 18px", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: `all 0.65s ease ${i * 0.08}s`, cursor: "default" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(20,83,45,0.12)"; e.currentTarget.style.borderColor = "#4ade80"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#bbf7d0"; }}>
                  <div style={{ width: "28px", height: "3px", background: "#14532d", borderRadius: "99px", marginBottom: "12px" }} />
                  <div style={{ fontSize: "13px", fontWeight: 800, color: "#14532d", marginBottom: "7px", fontFamily: "'Outfit',sans-serif", lineHeight: 1.3 }}>{m.title}</div>
                  <div style={{ fontSize: "12.5px", color: "#5a5275", lineHeight: 1.72, fontFamily: "'Outfit',sans-serif" }}>{m.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — mentor profiles + engagement model */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(24px)", transition: "all 0.8s ease 0.15s" }}>
            <div style={{ fontSize: "13px", fontWeight: 800, color: "#14532d", letterSpacing: "0.08em", marginBottom: "18px", fontFamily: "'Outfit',sans-serif" }}>MEET YOUR MENTORS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "28px" }}>
              {mentors.map((m, i) => (
                <div key={i} style={{ background: "#fff", border: "1.5px solid #bbf7d0", borderRadius: "16px", padding: "18px 20px", display: "flex", alignItems: "center", gap: "16px", transition: "all 0.25s", cursor: "default" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateX(6px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(20,83,45,0.10)"; e.currentTarget.style.borderColor = "#4ade80"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#bbf7d0"; }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "linear-gradient(135deg,#14532d,#15803d)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: "16px", fontWeight: 900, color: "#fff", fontFamily: "'Outfit',sans-serif" }}>{m.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "14px", fontWeight: 800, color: "#1a0640", fontFamily: "'Outfit',sans-serif" }}>{m.name}</div>
                    <div style={{ fontSize: "12px", color: "#6b5a9e", fontFamily: "'Outfit',sans-serif", marginTop: "2px" }}>{m.role}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#14532d", fontFamily: "'Outfit',sans-serif" }}>{m.exp}</div>
                    <div style={{ fontSize: "11px", color: "#9270c0", fontFamily: "'Outfit',sans-serif", marginTop: "2px" }}>{m.domain}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Engagement model */}
            <div style={{ background: "linear-gradient(145deg,#f0fdf4,#dcfce7)", border: "1.5px solid #bbf7d0", borderRadius: "20px", padding: "24px 26px", marginBottom: "20px" }}>
              <div style={{ fontSize: "13px", fontWeight: 800, color: "#14532d", letterSpacing: "0.08em", marginBottom: "16px", fontFamily: "'Outfit',sans-serif" }}>HOW MENTORSHIP IS DELIVERED</div>
              {[
                { phase: "Pre-Enrollment", desc: "Free 30-minute career consultation to assess fit and set direction" },
                { phase: "During Training", desc: "Bi-weekly mentor check-ins and open Q&A sessions" },
                { phase: "Pre-Placement", desc: "Intensive 2-week career preparation sprint" },
                { phase: "Post-Placement", desc: "6-month follow-up and growth support" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: i < 3 ? "13px" : 0 }}>
                  <div style={{ minWidth: "100px", fontSize: "11px", fontWeight: 800, color: "#14532d", fontFamily: "'Outfit',sans-serif", paddingTop: "2px", letterSpacing: "0.03em" }}>{item.phase}</div>
                  <div style={{ width: "1px", background: "#bbf7d0", alignSelf: "stretch", flexShrink: 0 }} />
                  <div style={{ fontSize: "13px", color: "#3b5249", fontFamily: "'Outfit',sans-serif", lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              ))}
            </div>

            <button onClick={onEnroll} style={{ width: "100%", background: "linear-gradient(135deg,#15803d,#14532d)", color: "#fff", border: "none", borderRadius: "50px", padding: "14px 24px", fontSize: "13px", fontWeight: 800, cursor: "pointer", fontFamily: "'Outfit',sans-serif", letterSpacing: "0.4px", transition: "all 0.22s", boxShadow: "0 4px 18px rgba(20,83,45,0.28)" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(20,83,45,0.38)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 18px rgba(20,83,45,0.28)"; }}>
              BOOK FREE MENTORSHIP SESSION
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   WHY CHOOSE SKILLRA
═══════════════════════════════════════════════════ */
function WhyChooseSection() {
  const [ref, inView] = useInView(0.08);
  const reasons = [
    { title: "Integrated Training-to-Placement Pipeline", desc: "All three services — training, placement, and mentorship — are delivered by the same team, creating a seamless and accountable experience for every student.", color: "#7c3aed", bg: "#f3f0ff", border: "#e4d9ff" },
    { title: "Domain-Specific Expertise", desc: "We are not a generic training provider. Our deep specialisation in healthcare, technology, and finance means instructors and mentors speak your industry's language.", color: "#c2410c", bg: "#fff7ed", border: "#fed7aa" },
    { title: "Accountability at Every Stage", desc: "We hold ourselves accountable to placement outcomes — not just training hours. Our commitment is measured by employed students, not seat-filled batches.", color: "#14532d", bg: "#f0fdf4", border: "#bbf7d0" },
    { title: "15+ Years of Proven Results", desc: "Over a decade and a half of operation means our processes, partnerships, and programs have been tested, refined, and validated through hundreds of student journeys.", color: "#7c3aed", bg: "#f3f0ff", border: "#e4d9ff" },
  ];
  return (
    <section ref={ref} style={{ padding: "80px 0", background: "#fff", borderTop: "1px solid #f0ebff", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "48px", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <SectionLabel text="WHY SKILLRA" />
          <h2 style={{ fontSize: "clamp(1.9rem,3.5vw,2.7rem)", fontWeight: 900, fontFamily: "'Outfit',sans-serif", color: "#120630", letterSpacing: "-0.03em", lineHeight: 1.08 }}>
            Built Around <span style={{ color: "#7c3aed", fontStyle: "italic" }}>One Outcome</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "20px" }}>
          {reasons.map((r, i) => (
            <div key={i} style={{ background: r.bg, border: `1.5px solid ${r.border}`, borderRadius: "20px", padding: "28px 26px", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `all 0.65s ease ${i * 0.1}s`, cursor: "default" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${r.color}18`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: "40px", height: "4px", background: r.color, borderRadius: "99px", marginBottom: "18px" }} />
              <h4 style={{ fontSize: "15px", fontWeight: 800, color: r.color, marginBottom: "10px", fontFamily: "'Outfit',sans-serif", lineHeight: 1.3 }}>{r.title}</h4>
              <p style={{ fontSize: "13.5px", color: "#5a5275", lineHeight: 1.75, fontFamily: "'Outfit',sans-serif", margin: 0 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CTA BAND
═══════════════════════════════════════════════════ */
function CtaBand({ onEnroll }) {
  const [ref, inView] = useInView(0.15);
  return (
    <section ref={ref} style={{ padding: "72px 0", background: "linear-gradient(135deg,#4c1d95,#7c3aed,#6d28d9)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px,transparent 1px)", backgroundSize: "22px 22px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)", pointerEvents: "none" }} />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.8s ease" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "36px", flexWrap: "wrap" }}>
          <div>
            <SectionLabel text="GET STARTED" color="#e9d5ff" bg="rgba(255,255,255,0.10)" border="rgba(255,255,255,0.25)" />
            <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 900, fontFamily: "'Outfit',sans-serif", color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "10px" }}>
              Ready to Begin Your Career Journey?
            </h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", fontFamily: "'Outfit',sans-serif", maxWidth: "520px", lineHeight: 1.75 }}>
              Speak with our counselors for a free session — they will assess your profile, recommend the right program, and walk you through the entire process.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: "200px" }}>
            <button onClick={onEnroll} style={{ background: "linear-gradient(135deg,#ff6b35,#f03e00)", color: "#fff", border: "none", borderRadius: "50px", padding: "16px 36px", fontSize: "13.5px", fontWeight: 800, cursor: "pointer", letterSpacing: ".5px", boxShadow: "0 6px 22px rgba(255,80,0,.45)", transition: "all 0.22s", fontFamily: "'Outfit',sans-serif", whiteSpace: "nowrap" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 34px rgba(255,80,0,.58)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 22px rgba(255,80,0,.45)"; }}>
              BOOK FREE COUNSELING
            </button>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center" }}>
              {[{ icon: "📞", text: "+91 98765 43210" }, { icon: "✉", text: "info@skillra.com" }].map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "rgba(255,255,255,0.75)", fontFamily: "'Outfit',sans-serif", fontWeight: 600 }}>
                  <span style={{ fontSize: "13px" }}>{c.icon}</span>{c.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   NEWSLETTER
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
export default function ServicesPage() {
  const [showModal, setShowModal] = useState(false);

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

        @keyframes lobeFloat {0%,100%{transform:translateY(0px) scaleX(1)}50%{transform:translateY(-5px) scaleX(0.97)}}
        @keyframes badgeWobble {0%,100%{transform:scale(1) rotate(0deg)}25%{transform:scale(1.04) rotate(3deg)}75%{transform:scale(0.97) rotate(-2deg)}}
        @keyframes sparklePulse {0%,100%{opacity:0.35;transform:scale(0.85)}50%{opacity:1;transform:scale(1.2)}}
        @keyframes rippleGrow {0%,100%{transform:scale(1);opacity:0.55}50%{transform:scale(1.06);opacity:0.85}}
        @keyframes dotBob {0%,100%{transform:translateY(0);opacity:0.3}50%{transform:translateY(-4px);opacity:0.7}}
        @keyframes clickRipple {0%{width:10px;height:10px;opacity:0.8;margin-left:-5px;margin-top:-5px}100%{width:320px;height:320px;opacity:0;margin-left:-160px;margin-top:-160px}}
        @keyframes arrowSlide {0%{transform:translateX(0);opacity:1}45%{transform:translateX(5px);opacity:0.4}46%{transform:translateX(-5px);opacity:0}55%{transform:translateX(-5px);opacity:0}100%{transform:translateX(0);opacity:1}}

        @media(max-width:900px){
          .two-col-grid{grid-template-columns:1fr !important;}
        }
        @media(max-width:768px){
          .page-section-pad{padding-left:20px !important;padding-right:20px !important;}
        }
      `}</style>

      {showModal && <CounselorModal onClose={() => setShowModal(false)} />}

      <NavBar />
      <ServicesHero onCounselorClick={() => setShowModal(true)} />
      <OverviewSection />
      <div id="services-detail">
        <CampusTrainingSection onEnroll={() => setShowModal(true)} />
        <PlacementSupportSection onEnroll={() => setShowModal(true)} />
        <CareerMentorshipSection onEnroll={() => setShowModal(true)} />
      </div>
      <WhyChooseSection />
      <CtaBand onEnroll={() => setShowModal(true)} />
      <NewsletterSection />
      <Footer />
    </div>
  );
}