import { useEffect, useRef, useState } from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";

const PUB = process.env.PUBLIC_URL || "";

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
   FLOATING BADGES
═══════════════════════════════════════════════════ */
function FloatingBadge({ icon, label, style, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div style={{
      position: "absolute", display: "flex", alignItems: "center", gap: "10px",
      background: "rgba(255,255,255,0.95)", backdropFilter: "blur(18px) saturate(1.6)",
      WebkitBackdropFilter: "blur(18px) saturate(1.6)",
      border: "1.5px solid rgba(255,255,255,0.98)", borderRadius: "14px", padding: "10px 18px",
      boxShadow: "0 8px 32px rgba(109,40,217,0.14), 0 1px 0 rgba(255,255,255,0.9) inset",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.93)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.55s cubic-bezier(.34,1.56,.64,1) ${delay}ms`,
      zIndex: 20, ...style,
    }}>
      <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: "linear-gradient(135deg,rgba(124,58,237,0.10),rgba(167,139,250,0.18))", border: "1px solid rgba(124,58,237,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div>
      <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a0640", lineHeight: 1.2, fontFamily: "'Outfit',sans-serif", whiteSpace: "nowrap" }}>{label}</div>
    </div>
  );
}

function ActiveStudentsBadge({ style, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div style={{ position: "absolute", display: "flex", alignItems: "center", gap: "10px", background: "#1a1035", borderRadius: "50px", padding: "8px 16px 8px 8px", boxShadow: "0 8px 28px rgba(20,8,56,0.35)", opacity: visible ? 1 : 0, transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.93)", transition: `opacity 0.6s ease ${delay}ms, transform 0.55s cubic-bezier(.34,1.56,.64,1) ${delay}ms`, zIndex: 20, ...style }}>
      <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3.5" stroke="white" strokeWidth="1.8" /><path d="M3 17c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="white" strokeWidth="1.8" strokeLinecap="round" /></svg>
      </div>
      <div>
        <div style={{ fontSize: "14px", fontWeight: 800, color: "#fff", lineHeight: 1, fontFamily: "'Outfit',sans-serif" }}>1k</div>
        <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.65)", marginTop: "2px", fontWeight: 500, fontFamily: "'Outfit',sans-serif" }}>Active Students</div>
      </div>
    </div>
  );
}

function PlacedBadge({ style, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div style={{ position: "absolute", background: "#f5c518", borderRadius: "12px", padding: "10px 20px", boxShadow: "0 8px 28px rgba(245,197,24,0.40)", opacity: visible ? 1 : 0, transform: visible ? "rotate(-2deg) scale(1)" : "rotate(-2deg) scale(0.88) translateY(10px)", transition: `opacity 0.6s ease ${delay}ms, transform 0.55s cubic-bezier(.34,1.56,.64,1) ${delay}ms`, zIndex: 20, ...style }}>
      <div style={{ fontSize: "15px", fontWeight: 900, color: "#1a0640", fontFamily: "'Outfit',sans-serif", letterSpacing: "0.3px" }}>Placed ✓</div>
    </div>
  );
}

function DiamondPattern() {
  return (
    <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "min(490px, 90%)", aspectRatio: "490/530", borderRadius: "50% 50% 0 0 / 48% 48% 0 0", background: "rgba(195,180,255,0.25)", overflow: "hidden", zIndex: 1 }}>
      <svg viewBox="0 0 490 530" style={{ width: "100%", height: "100%" }}>
        <defs><pattern id="diamondPat" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse"><rect x="14" y="2" width="11" height="11" rx="1.5" transform="rotate(45 14 7.5)" fill="none" stroke="rgba(124,58,237,0.26)" strokeWidth="1.5" /></pattern></defs>
        <rect x="0" y="0" width="490" height="530" fill="url(#diamondPat)" />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SECTION 1 — HERO
   Order on mobile: 1. Title+arc  2. Image  3. Desc+button
═══════════════════════════════════════════════════ */
function AboutHero({ onCtaClick }) {
  return (
    <section id="about-home" style={{
      background: "radial-gradient(ellipse 110% 110% at 15% 50%,rgba(210,195,255,0.55) 0%,rgba(220,210,255,0.40) 40%,#ede8f8 100%)",
      minHeight: "100vh", display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: `radial-gradient(rgba(124,58,237,0.08) 1px,transparent 1px)`, backgroundSize: "28px 28px" }} />

      <div className="about-inner" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap",
        padding: "0 5%", width: "100%", gap: "16px",
        position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto",
      }}>

        {/* ── 1st on mobile: Title + arc ── */}
        <div className="about-left" style={{ flex: "0 0 auto", width: "500px", maxWidth: "100%" }}>
          <h1 className="cr-v1 about-title" style={{
            fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 900,
            lineHeight: 1.08, letterSpacing: "-1.5px",
            marginBottom: "12px", fontFamily: "'Outfit', sans-serif",
          }}>
            <span style={{ color: "#7c3aed" }}>Your </span>
            <span style={{ color: "#ff6b35" }}>Skills Deserve</span><br />
            <span style={{ color: "#ff6b35" }}>the Right</span><br />
            <span style={{ color: "#16a34a" }}>Opportunity</span>
          </h1>
          <div className="ab-v1" style={{ marginBottom: "24px" }}>
            <svg viewBox="0 0 320 20" style={{ width: "min(320px,100%)", height: "14px", overflow: "visible" }} preserveAspectRatio="none">
              <path className="about-arc" d="M 4 14 C 60 2, 200 0, 316 12" fill="none" stroke="#7c3aed" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Desktop — desc + button */}
          <p className="ab-v2 about-desc-desktop" style={{ color: "#5c4a80", fontSize: "clamp(13px,1.5vw,14.5px)", lineHeight: 1.8, marginBottom: "34px", maxWidth: "420px", fontFamily: "'Outfit',sans-serif", fontWeight: 400 }}>
            At Skillra, we don't just teach skills — we help you turn them into real careers. Our Placement Assistance Program is designed to help students land internships and jobs with confidence.
          </p>
          <div className="ab-v3 about-btn-desktop">
            <button className="about-cta-btn" onClick={onCtaClick}
              style={{ background: "#7c3aed", color: "#fff", border: "none", borderRadius: "50px", padding: "15px 32px", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif", display: "inline-flex", alignItems: "center", gap: "10px", boxShadow: "0 6px 24px rgba(124,58,237,0.38)", letterSpacing: "0.3px", transition: "all 0.22s", position: "relative", overflow: "hidden" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.03)"; e.currentTarget.style.boxShadow = "0 14px 36px rgba(124,58,237,0.55)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(124,58,237,0.38)"; }}>
              Get Placement Assistance
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>

        {/* ── 2nd on mobile: Image ── */}
        <div className="about-right ab-vR" style={{
          flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-end",
          position: "relative", minWidth: 0,
          height: "clamp(300px, 60vw, 700px)",
        }}>
          <DiamondPattern />
          <img src={`${PUB}/aboutusgirl.png`} alt="About Us"
            style={{ position: "relative", zIndex: 5, height: "92%", width: "auto", maxWidth: "100%", objectFit: "contain", objectPosition: "bottom center", display: "block", alignSelf: "flex-end", filter: "drop-shadow(0 20px 50px rgba(109,40,217,0.18))" }}
          />
          <FloatingBadge
            icon={<svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 2C6.13 2 3 5.13 3 9c0 2.38 1.19 4.47 3 5.74V17h8v-2.26C15.81 13.47 17 11.38 17 9c0-3.87-3.13-7-7-7z" stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" /><path d="M8 17h4" stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round" /></svg>}
            label="Lifetime Support" style={{ top: "21%", right: "3%" }} delay={600}
          />
          <ActiveStudentsBadge style={{ bottom: "42%", left: "4%" }} delay={800} />
          <PlacedBadge style={{ bottom: "34%", right: "6%" }} delay={700} />
          <FloatingBadge
            icon={<svg width="16" height="16" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2.5" stroke="#7c3aed" strokeWidth="1.8" /><path d="M2 8h16" stroke="#7c3aed" strokeWidth="1.5" /><circle cx="6" cy="12.5" r="1" fill="#7c3aed" /><circle cx="10" cy="12.5" r="1" fill="#7c3aed" /></svg>}
            label="4+ offers" style={{ bottom: "16%", right: "73%" }} delay={1000}
          />
        </div>

        {/* ── 3rd on mobile: Desc + button (mobile only) ── */}
        <div className="about-bottom" style={{
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: "24px", width: "100%",
        }}>
          <p style={{ color: "#5c4a80", fontSize: "14.5px", lineHeight: 1.8, maxWidth: "380px", fontFamily: "'Outfit',sans-serif", fontWeight: 400, textAlign: "center" }}>
            At Skillra, we don't just teach skills — we help you turn them into real careers. Our Placement Assistance Program is designed to help students land internships and jobs with confidence.
          </p>
          <button className="about-cta-btn" onClick={onCtaClick}
            style={{ background: "#7c3aed", color: "#fff", border: "none", borderRadius: "50px", padding: "15px 32px", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif", display: "inline-flex", alignItems: "center", gap: "10px", boxShadow: "0 6px 24px rgba(124,58,237,0.38)", transition: "all 0.22s", position: "relative", overflow: "hidden" }}>
            Get Placement Assistance
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>

      </div>
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
      style={{ flex: 1, padding: "32px 28px", background: hovered ? "#faf8ff" : "#fff", transition: "background 0.2s", cursor: "default", minWidth: 0 }}>
      <div style={{ marginBottom: "14px" }}>{feat.icon}</div>
      <h3 style={{ fontSize: "clamp(13px,1.4vw,14.5px)", fontWeight: 700, color: "#7c3aed", fontFamily: "'Outfit',sans-serif", marginBottom: "8px", lineHeight: 1.3 }}>{feat.title}</h3>
      <p style={{ fontSize: "clamp(12px,1.2vw,13px)", color: "#6b7280", fontFamily: "'Outfit',sans-serif", lineHeight: 1.75, fontWeight: 400 }}>{feat.desc}</p>
    </div>
  );
}

function WhyTrustSection() {
  const [ref, inView] = useInView(0.08);
  return (
    <section ref={ref} style={{ background: "#fff", borderTop: "1px solid #f0ebff", position: "relative", overflow: "hidden", padding: "clamp(48px,8vw,80px) 0 clamp(48px,8vw,90px)" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(124,58,237,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.035) 1px,transparent 1px)`, backgroundSize: "40px 40px" }} />
      <div className="sec-wrap" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(16px,4%,24px)", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "52px", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.65s ease" }}>
          <h2 style={{ fontSize: "clamp(1.5rem,3.2vw,2.5rem)", fontWeight: 900, color: "#111827", fontFamily: "'Outfit',sans-serif", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "14px" }}>Why Students Trust Skillra</h2>
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
  { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>, title: "Build In-Demand Skills", desc: "Learn practical skills that companies are hiring for.", position: "bottom" },
  { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2H3v16h5l3 3 3-3h7V2z" /><path d="M7 8h10M7 12h6" /></svg>, title: "Create Your Professional Profile", desc: "Build your resume, portfolio, and LinkedIn presence.", position: "top" },
  { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></svg>, title: "Prepare for Interviews", desc: "Practice with mock interviews and expert feedback.", position: "bottom" },
  { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></svg>, title: "Apply for Opportunities", desc: "Access internships and job openings through Skillra.", position: "top" },
  { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></svg>, title: "Get Hired", desc: "Land the job with full placement support.", position: "bottom" },
];

function StepNode({ step, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const isTop = step.position === "top";
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", opacity: inView ? 1 : 0, transform: inView ? "translateY(0) scale(1)" : "translateY(32px) scale(0.9)", transition: `opacity 0.6s ease ${0.1 + index * 0.12}s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${0.1 + index * 0.12}s` }}>
      {isTop && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <p style={{ fontSize: "clamp(11px,1.2vw,13px)", fontWeight: 700, color: "#7c3aed", fontFamily: "'Outfit',sans-serif", marginBottom: "6px", lineHeight: 1.3 }}>{step.title}</p>
          <p style={{ fontSize: "clamp(10px,1vw,12px)", color: "#6b7280", fontFamily: "'Outfit',sans-serif", lineHeight: 1.6, maxWidth: "140px" }}>{step.desc}</p>
        </div>
      )}
      <div style={{ width: "clamp(52px,6vw,72px)", height: "clamp(52px,6vw,72px)", borderRadius: "50%", background: hovered ? "linear-gradient(135deg,#4c1d95,#6d28d9)" : "linear-gradient(135deg,#7c3aed,#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: hovered ? "0 12px 40px rgba(109,40,217,0.55),0 0 0 6px rgba(124,58,237,0.15)" : "0 8px 28px rgba(109,40,217,0.30),0 0 0 6px rgba(124,58,237,0.10)", transition: "all 0.28s cubic-bezier(0.34,1.56,0.64,1)", transform: hovered ? "scale(1.14)" : "scale(1)", cursor: "default", flexShrink: 0, zIndex: 2, position: "relative" }}>
        {step.icon}
      </div>
      {!isTop && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p style={{ fontSize: "clamp(11px,1.2vw,13px)", fontWeight: 700, color: "#7c3aed", fontFamily: "'Outfit',sans-serif", marginBottom: "6px", lineHeight: 1.3 }}>{step.title}</p>
          <p style={{ fontSize: "clamp(10px,1vw,12px)", color: "#6b7280", fontFamily: "'Outfit',sans-serif", lineHeight: 1.6, maxWidth: "140px" }}>{step.desc}</p>
        </div>
      )}
    </div>
  );
}

function HowWeHelpSection() {
  const [ref, inView] = useInView(0.08);
  return (
    <section ref={ref} style={{ background: "linear-gradient(160deg,#f3eeff 0%,#ede8f8 50%,#e8e0f8 100%)", padding: "clamp(48px,8vw,88px) 0 clamp(56px,10vw,100px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `radial-gradient(rgba(124,58,237,0.07) 1px,transparent 1px)`, backgroundSize: "30px 30px" }} />
      <div className="sec-wrap" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(16px,4%,24px)", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "72px", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.65s ease" }}>
          <h2 style={{ fontSize: "clamp(1.5rem,3.5vw,2.6rem)", fontWeight: 900, color: "#111827", fontFamily: "'Outfit',sans-serif", letterSpacing: "-0.03em", marginBottom: "14px" }}>How We Help You Get Placed</h2>
          <p style={{ fontSize: "clamp(13px,1.4vw,14.5px)", color: "#6b7280", fontFamily: "'Outfit',sans-serif", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>Powerful natural language processing capabilities, that can understand and respond to customer inquiries in real-time &amp; improve customer satisfaction.</p>
        </div>
        {/* Desktop S-curve */}
        <div className="steps-desktop" style={{ position: "relative" }}>
          <svg viewBox="0 0 1000 120" preserveAspectRatio="none" style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: "120px", transform: "translateY(-50%)", zIndex: 0, opacity: inView ? 1 : 0, transition: "opacity 0.8s ease 0.3s" }}>
            <defs><linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#a78bfa" stopOpacity="0.5" /><stop offset="50%" stopColor="#7c3aed" stopOpacity="0.8" /><stop offset="100%" stopColor="#a78bfa" stopOpacity="0.5" /></linearGradient></defs>
            <path d="M 100 60 C 160 60, 190 10, 250 10 C 310 10, 340 110, 400 110 C 460 110, 490 10, 550 10 C 610 10, 640 110, 700 110 C 760 110, 830 60, 900 60" fill="none" stroke="url(#pathGrad)" strokeWidth="2.5" strokeDasharray="6 5" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1, minHeight: "260px" }}>
            {PLACEMENT_STEPS.map((step, i) => <StepNode key={i} step={step} index={i} inView={inView} />)}
          </div>
        </div>
        {/* Mobile vertical */}
        <div className="steps-mobile" style={{ flexDirection: "column", gap: "24px" }}>
          {PLACEMENT_STEPS.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "16px", opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-20px)", transition: `opacity 0.5s ease ${0.1 + i * 0.1}s, transform 0.5s ease ${0.1 + i * 0.1}s` }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 6px 20px rgba(109,40,217,0.30)" }}>{step.icon}</div>
              <div style={{ paddingTop: "4px" }}>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#7c3aed", fontFamily: "'Outfit',sans-serif", marginBottom: "4px" }}>{step.title}</p>
                <p style={{ fontSize: "13px", color: "#6b7280", fontFamily: "'Outfit',sans-serif", lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CAMPUS CARDS SECTION
═══════════════════════════════════════════════════ */
const CAMPUS_CARDS = [
  { heading: "Heading", body: "Skillra Campus brings together education, industry insight, and student leadership to create meaningful opportunities within college campuses." },
  { heading: "Heading", body: "The program enables students to go beyond academic learning by participating in skill development initiatives, collaborative activities, and professional growth programs." },
  { heading: "Heading", body: "The program enables students to go beyond academic learning by participating in skill development initiatives, collaborative activities, and professional growth programs." },
];

function CampusCard({ heading, body, delay, inView }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? "linear-gradient(145deg,#6d28d9,#4c1d95)" : "#fff", border: hovered ? "1.5px solid transparent" : "1.5px solid #e5e7eb", borderRadius: "20px", padding: "32px 26px", boxShadow: hovered ? "0 20px 52px rgba(109,40,217,0.38)" : "0 4px 20px rgba(124,58,237,0.06)", opacity: inView ? 1 : 0, transform: inView ? (hovered ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)") : "translateY(30px)", transition: [`opacity 0.65s ease ${delay}s`, "transform 0.30s cubic-bezier(0.34,1.56,0.64,1)", "background 0.28s ease", "border-color 0.28s ease", "box-shadow 0.28s ease"].join(", "), cursor: "default" }}>
      <h3 style={{ fontSize: "clamp(15px,1.6vw,18px)", fontWeight: 800, color: hovered ? "#fff" : "#7c3aed", fontFamily: "'Outfit',sans-serif", marginBottom: "14px", transition: "color 0.28s ease" }}>{heading}</h3>
      <p style={{ fontSize: "clamp(12.5px,1.3vw,13.5px)", color: hovered ? "rgba(255,255,255,0.85)" : "#6b7280", fontFamily: "'Outfit',sans-serif", lineHeight: 1.8, fontWeight: 400, transition: "color 0.28s ease" }}>{body}</p>
    </div>
  );
}

function AboutCampusSection() {
  const [ref, inView] = useInView(0.08);
  return (
    <section ref={ref} id="campus" style={{ background: "#fff", padding: "clamp(48px,8vw,88px) 0", borderTop: "1px solid #f0ebff", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(124,58,237,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.03) 1px,transparent 1px)`, backgroundSize: "40px 40px" }} />
      <div className="sec-wrap" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(16px,4%,24px)", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "52px", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.65s ease" }}>
          <h2 style={{ fontSize: "clamp(1.5rem,3.2vw,2.6rem)", fontWeight: 900, color: "#111827", fontFamily: "'Outfit',sans-serif", letterSpacing: "-0.03em", marginBottom: "14px" }}>About Skillra Campus</h2>
          <p style={{ fontSize: "clamp(13px,1.4vw,14.5px)", color: "#6b7280", fontFamily: "'Outfit',sans-serif", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>Powerful natural language processing capabilities, that can understand and respond to customer inquiries in real-time &amp; improve customer satisfaction.</p>
        </div>
        <div className="campus-grid">
          {CAMPUS_CARDS.map((card, i) => <CampusCard key={i} heading={card.heading} body={card.body} delay={0.1 + i * 0.1} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   OPPORTUNITIES
═══════════════════════════════════════════════════ */
function OpportunitiesSection() {
  const [ref, inView] = useInView(0.08);
  return (
    <section ref={ref} style={{ background: "#0e0e0e", position: "relative", overflow: "hidden" }}>
      <div className="opp-row" style={{ display: "flex", minHeight: "480px", alignItems: "stretch" }}>
        <div className="opp-left" style={{ flex: "0 0 42%", position: "relative", overflow: "hidden", padding: "clamp(40px,6vw,72px) clamp(24px,4%,52px)", display: "flex", flexDirection: "column", justifyContent: "center", opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-30px)", transition: "all 0.7s ease 0.1s" }}>
          <div className="opp-bg-design" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "220px", overflow: "hidden" }}>
            <svg viewBox="0 0 500 220" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
              {Array.from({ length: 14 }).map((_, row) => (
                <polyline key={row} points={Array.from({ length: 28 }).map((_, i) => `${i * 19},${row * 16 + (i % 2 === 0 ? 0 : 10)}`).join(" ")} fill="none" stroke={row % 2 === 0 ? "#b8962a" : "#d4aa40"} strokeWidth="2.2" strokeLinejoin="round" opacity={0.55 + row * 0.03} />
              ))}
            </svg>
          </div>
          <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,3rem)", fontWeight: 900, color: "#fff", fontFamily: "'Outfit',sans-serif", letterSpacing: "-0.03em", lineHeight: 1.1, position: "relative", zIndex: 2, marginBottom: "auto", paddingBottom: "clamp(60px,10vw,120px)" }}>
            Opportunities<br />Through Skillra<br />Campus
          </h2>
        </div>
        <div className="opp-right" style={{ flex: 1, background: "#1a1a1a", padding: "clamp(40px,6vw,72px) clamp(24px,5%,60px)", display: "flex", flexDirection: "column", justifyContent: "center", gap: "clamp(24px,4vw,44px)", opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(30px)", transition: "all 0.7s ease 0.2s" }}>
          {[
            { title: "Skill Development Programs", desc: "Skillra Campus organizes learning initiatives focused on in-demand skills and emerging industry trends. Students gain exposure to practical knowledge that supports their academic learning with real-world relevance." },
            { title: "Campus Leadership Experience", desc: "Selected students can represent Skillra as Campus Leaders, contributing to community engagement and learning initiatives within their institutions." },
          ].map((item, i) => (
            <div key={i}>
              <h3 style={{ fontSize: "clamp(14px,1.6vw,17px)", fontWeight: 800, color: "#fff", fontFamily: "'Outfit',sans-serif", marginBottom: "14px", letterSpacing: "-0.01em" }}>{item.title}</h3>
              <p style={{ fontSize: "clamp(12.5px,1.3vw,13.5px)", color: "rgba(255,255,255,0.6)", fontFamily: "'Outfit',sans-serif", lineHeight: 1.85, fontWeight: 400 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   STUDENTS PLACED
═══════════════════════════════════════════════════ */
const PLACED_STUDENTS = [
  { name: "Ezhil N", company: "cognizant", companyColor: "#1a77d4", img: "student1.png" },
  { name: "Ezhil N", company: "Optum", companyColor: "#ff6600", img: "student2.png" },
  { name: "Ezhil N", company: "Optum", companyColor: "#ff6600", img: "student3.png" },
  { name: "Ezhil N", company: "Optum", companyColor: "#ff6600", img: "student4.png" },
];

function StudentCard({ student, index, inView }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.6s ease ${0.1 + index * 0.12}s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${0.1 + index * 0.12}s`, cursor: "default" }}>
      <div style={{ width: "clamp(120px,15vw,180px)", height: "clamp(150px,18vw,220px)", borderRadius: "90px 90px 12px 12px", background: hovered ? "linear-gradient(180deg,#c4b5fd 0%,#ddd6fe 100%)" : "linear-gradient(180deg,#e9e3ff 0%,#f3f0ff 100%)", overflow: "hidden", display: "flex", alignItems: "flex-end", justifyContent: "center", boxShadow: hovered ? "0 20px 48px rgba(109,40,217,0.22)" : "0 8px 32px rgba(109,40,217,0.10)", transition: "all 0.30s cubic-bezier(0.34,1.56,0.64,1)", transform: hovered ? "translateY(-8px) scale(1.03)" : "translateY(0) scale(1)", position: "relative" }}>
        <img src={`${PUB}/${student.img}`} alt={student.name} style={{ width: "85%", height: "95%", objectFit: "cover", objectPosition: "top center", display: "block" }}
          onError={e => { e.target.style.display = "none"; }} />
      </div>
      <p style={{ marginTop: "14px", fontSize: "clamp(12px,1.3vw,14.5px)", fontWeight: 600, color: "#111827", fontFamily: "'Outfit',sans-serif" }}>{student.name}</p>
      <p style={{ marginTop: "4px", fontSize: "clamp(13px,1.4vw,16px)", fontWeight: 900, color: student.companyColor, fontFamily: "'Outfit',sans-serif" }}>{student.company}</p>
    </div>
  );
}

function StudentsPlacedSection() {
  const [ref, inView] = useInView(0.08);
  return (
    <section ref={ref} style={{ background: "#fff", padding: "clamp(48px,8vw,88px) 0 clamp(56px,10vw,96px)", borderTop: "1px solid #f0ebff", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(124,58,237,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.03) 1px,transparent 1px)`, backgroundSize: "40px 40px" }} />
      <div className="sec-wrap" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(16px,4%,24px)", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "60px", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.65s ease" }}>
          <h2 style={{ fontSize: "clamp(1.5rem,3.5vw,2.6rem)", fontWeight: 900, color: "#111827", fontFamily: "'Outfit',sans-serif", letterSpacing: "-0.03em", marginBottom: "14px" }}>Students Placed</h2>
          <p style={{ fontSize: "clamp(13px,1.4vw,14.5px)", color: "#6b7280", fontFamily: "'Outfit',sans-serif", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>Our students have been placed in top companies across India. Here are some of their success stories.</p>
        </div>
        <div className="students-grid">
          {PLACED_STUDENTS.map((student, i) => <StudentCard key={i} student={student} index={i} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   TESTIMONIALS + CONTACT FORM
═══════════════════════════════════════════════════ */
const TESTIMONIALS = [
  { name: "Aria Zinario", text: "I am very helped by this E-wallet application, my days are very easy to use this application and its very helpful in my life, even I can pay a short time 😊", avatar: "AZ" },
  { name: "Rahul Sharma", text: "Skillra transformed my career path completely. The placement support was exceptional and I got 3 offers within a month of completing the course.", avatar: "RS" },
  { name: "Priya Nair", text: "The mentors at Skillra are incredibly supportive. Real industry experience combined with structured learning made all the difference for me.", avatar: "PN" },
  { name: "Karthik V", text: "Best decision I ever made. The hands-on projects gave me the confidence to clear technical interviews at top product companies.", avatar: "KV" },
];
const AVATAR_COLORS = ["#7c3aed", "#059669", "#dc2626", "#d97706"];

function TestimonialsContactSection() {
  const [ref, inView] = useInView(0.06);
  const [activeIdx, setActiveIdx] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", course: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => { if (formData.name && formData.email) setSubmitted(true); };
  return (
    <section ref={ref} id="contact" style={{ background: "#f8f7ff", borderTop: "1px solid #f0ebff", padding: "clamp(48px,8vw,88px) 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `radial-gradient(rgba(124,58,237,0.05) 1px,transparent 1px)`, backgroundSize: "32px 32px" }} />
      <div className="sec-wrap" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(16px,4%,24px)", position: "relative", zIndex: 1 }}>
        <div className="tc-row" style={{ display: "flex", gap: "clamp(24px,5%,60px)", alignItems: "flex-start" }}>
          <div className="tc-left" style={{ flex: 1, minWidth: 0, opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-24px)", transition: "all 0.7s ease 0.1s" }}>
            <h2 style={{ fontSize: "clamp(1.5rem,3.5vw,2.8rem)", fontWeight: 900, color: "#111827", fontFamily: "'Outfit',sans-serif", letterSpacing: "-0.03em", marginBottom: "8px" }}>Testimonials</h2>
            <p style={{ fontSize: "14px", color: "#9ca3af", fontFamily: "'Outfit',sans-serif", marginBottom: "32px", fontStyle: "italic" }}>Every Story Matters. Every Success Counts.</p>
            <div style={{ marginBottom: "16px" }}>
              <svg width="48" height="36" viewBox="0 0 48 36" fill="none"><path d="M0 36V22C0 14.8 2.6 9.4 7.8 5.8 13 2.2 19.2 0.4 26.4 0.4V7C23.2 7 20.4 7.8 18 9.4 15.8 11 14.6 13.2 14.4 16H22V36H0ZM26 36V22C26 14.8 28.6 9.4 33.8 5.8 39 2.2 45.2 0.4 52.4 0.4V7C49.2 7 46.4 7.8 44 9.4 41.8 11 40.6 13.2 40.4 16H48V36H26Z" fill="#7c3aed" opacity="0.15" /></svg>
            </div>
            <div style={{ minHeight: "100px", marginBottom: "28px" }}>
              <p style={{ fontSize: "clamp(13px,1.4vw,15px)", color: "#374151", fontFamily: "'Outfit',sans-serif", lineHeight: 1.85, fontWeight: 400 }}>{TESTIMONIALS[activeIdx].text}</p>
              <p style={{ fontSize: "13px", color: "#7c3aed", fontFamily: "'Outfit',sans-serif", fontWeight: 700, marginTop: "16px" }}>— {TESTIMONIALS[activeIdx].name}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} onClick={() => setActiveIdx(i)} style={{ width: "44px", height: "44px", borderRadius: "50%", background: AVATAR_COLORS[i], display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#fff", fontFamily: "'Outfit',sans-serif", cursor: "pointer", flexShrink: 0, border: activeIdx === i ? "3px solid #7c3aed" : "3px solid transparent", boxShadow: activeIdx === i ? "0 0 0 2px #fff, 0 0 0 4px #7c3aed" : "none", transition: "all 0.2s", transform: activeIdx === i ? "scale(1.1)" : "scale(1)" }}>{t.avatar}</div>
              ))}
            </div>
          </div>
          <div className="tc-right" style={{ flex: "0 0 clamp(280px,36%,380px)", minWidth: 0, background: "#fff", borderRadius: "24px", padding: "clamp(24px,4%,36px) clamp(20px,4%,32px)", boxShadow: "0 8px 48px rgba(124,58,237,0.10)", border: "1.5px solid #e9e4ff", opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(24px)", transition: "all 0.7s ease 0.2s" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#111827", fontFamily: "'Outfit',sans-serif", marginBottom: "10px" }}>Message Sent!</h3>
                <p style={{ fontSize: "14px", color: "#6b7280", fontFamily: "'Outfit',sans-serif" }}>We'll get back to you shortly.</p>
                <button onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", course: "" }); }} style={{ marginTop: "24px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: "50px", padding: "10px 28px", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>Send another</button>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: "clamp(16px,1.8vw,20px)", fontWeight: 900, color: "#111827", fontFamily: "'Outfit',sans-serif", marginBottom: "6px" }}>We're here to help!</h3>
                <p style={{ fontSize: "13px", color: "#9ca3af", fontFamily: "'Outfit',sans-serif", marginBottom: "24px" }}>Please contact us in case of any query.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[{ key: "name", placeholder: "Your name", type: "text" }, { key: "email", placeholder: "Your email address", type: "email" }, { key: "phone", placeholder: "Your phone number", type: "tel" }].map(field => (
                    <input key={field.key} type={field.type} placeholder={field.placeholder} value={formData[field.key]} onChange={e => setFormData(p => ({ ...p, [field.key]: e.target.value }))}
                      style={{ width: "100%", padding: "13px 16px", border: "1.5px solid #e5e7eb", borderRadius: "12px", fontSize: "13.5px", fontFamily: "'Outfit',sans-serif", color: "#374151", outline: "none", background: "#fafafa", transition: "border-color 0.2s", boxSizing: "border-box" }}
                      onFocus={e => { e.currentTarget.style.borderColor = "#a78bfa"; e.currentTarget.style.background = "#fff"; }}
                      onBlur={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.background = "#fafafa"; }} />
                  ))}
                  <select value={formData.course} onChange={e => setFormData(p => ({ ...p, course: e.target.value }))} style={{ width: "100%", padding: "13px 16px", border: "1.5px solid #e5e7eb", borderRadius: "12px", fontSize: "13.5px", fontFamily: "'Outfit',sans-serif", color: formData.course ? "#374151" : "#9ca3af", outline: "none", background: "#fafafa", appearance: "none", cursor: "pointer", boxSizing: "border-box" }}>
                    <option value="">Select Course</option>
                    <option value="medical-coding">Medical Coding</option>
                    <option value="full-stack">Full Stack</option>
                    <option value="data">Data Analytics</option>
                  </select>
                  <button onClick={handleSubmit} style={{ background: "linear-gradient(135deg,#7c3aed,#5b21b6)", color: "#fff", border: "none", borderRadius: "50px", padding: "14px 28px", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 6px 20px rgba(124,58,237,0.35)", transition: "all 0.22s", marginTop: "4px", width: "100%" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(124,58,237,0.48)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(124,58,237,0.35)"; }}>
                    Get in Touch
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════ */
export default function PlacementPage() {
  const handleCtaClick = () => { const el = document.getElementById("contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); };
  return (
    <div style={{ fontFamily: "'Outfit','Segoe UI',sans-serif", margin: 0, padding: 0, overflowX: "hidden", background: "#faf8ff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; }

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
        .tc-row        { display:flex; }
        .tc-left       { flex:1; min-width:0; }
        .tc-right      { flex:0 0 clamp(280px,36%,380px); min-width:0; }
        .trust-top     { display:flex; }
        .trust-bottom  { display:flex; }

        input::placeholder { color:#9ca3af; }
        input:focus, select:focus { outline:none; }
        select option { color:#374151; }

        /* ════════════════════════════════
           LARGE ≥ 1400px
        ════════════════════════════════ */
        @media (min-width:1400px) {
          .about-left    { width:560px !important; }
          .campus-grid   { gap:28px; }
          .students-grid { gap:40px; }
        }

        /* ════════════════════════════════
           TABLET 769–1100px
        ════════════════════════════════ */
        @media (max-width:1100px) {
          .about-inner { padding:0 4% !important; }
          .about-left  { width:420px !important; }
          .campus-grid { gap:16px; }
        }

        /* ════════════════════════════════
           TABLET ≤ 900px
        ════════════════════════════════ */
        @media (max-width:900px) {
          .campus-grid   { grid-template-columns:1fr 1fr !important; }
          .opp-row       { flex-direction:column !important; }
          .opp-left      { flex:unset !important; width:100% !important; }
          .opp-right     { flex:unset !important; width:100% !important; }
          .tc-row        { flex-direction:column !important; gap:36px !important; }
          .tc-left       { width:100% !important; }
          .tc-right      { flex:unset !important; width:100% !important; max-width:500px !important; }
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

          /* ── Hero: 1. title+arc  2. image  3. desc+button ── */
          .about-inner {
            flex-direction: column !important;
            align-items: center !important;
            padding: 100px 20px 32px !important;
            text-align: center !important;
            gap: 20px !important;
          }
          .about-left {
            order: 1 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .about-right {
            order: 2 !important;
            width: 100% !important;
            height: 240px !important;
          }
          .about-right img {
            height: 220px !important;
            width: auto !important;
            max-width: 100% !important;
          }
          .about-right > div:first-child {
            width: 60% !important;
            max-width: 220px !important;
            bottom: -20px !important;
          }
          .about-bottom {
            order: 3 !important;
          }

          /* Hide desktop desc+button in about-left on mobile */
          .about-desc-desktop { display: none !important; }
          .about-btn-desktop  { display: none !important; }

          /* Hide badges on mobile */
          .about-right > div[style*="Lifetime"],
          .about-right > div[style*="offers"],
          .about-right > div[style*="Active"],
          .about-right > div[style*="Placed"] { display: none !important; }

          /* Campus */
          .campus-grid { grid-template-columns:1fr !important; gap:14px !important; }
          .campus-grid > div { padding:24px 18px !important; border-radius:14px !important; }

          /* Opportunities */
          .opp-row   { flex-direction:column !important; }
          .opp-left  { flex:unset !important; width:100% !important; padding:36px 20px !important; }
          .opp-right { flex:unset !important; width:100% !important; padding:36px 20px !important; gap:24px !important; }
          .opp-bg-design { height:80px !important; opacity:0.5 !important; }

          /* Testimonials */
          .tc-row  { flex-direction:column !important; gap:32px !important; }
          .tc-right { flex:unset !important; width:100% !important; max-width:100% !important; }

          /* Students */
          .students-grid { grid-template-columns:repeat(2,1fr) !important; gap:16px !important; }

          /* Trust cards */
          .trust-top    { flex-direction:column !important; }
          .trust-bottom { flex-direction:column !important; }
          .trust-card   { padding:24px 18px !important; }
        }

        /* Hide mobile-bottom on desktop */
        @media (min-width:769px) {
          .about-bottom { display:none !important; }
        }

        /* ════════════════════════════════
           SMALL MOBILE ≤ 480px
        ════════════════════════════════ */
        @media (max-width:480px) {
          .about-inner   { padding:80px 16px 28px !important; }
          .about-right   { height:200px !important; }
          .about-right img { height:185px !important; }
          .about-right > div:first-child { width:55% !important; max-width:180px !important; }
          .about-title   { font-size:1.8rem !important; }
          .students-grid { gap:12px !important; }
        }

        /* ════════════════════════════════
           VERY SMALL ≤ 360px
        ════════════════════════════════ */
        @media (max-width:360px) {
          .about-inner { padding:70px 12px 24px !important; }
          .about-title { font-size:1.6rem !important; }
          .about-right { height:170px !important; }
          .about-right img { height:155px !important; }
          .sec-wrap { padding-left:12px !important; padding-right:12px !important; }
        }
      `}</style>

      <Navbar />
      <AboutHero onCtaClick={handleCtaClick} />
      <WhyTrustSection />
      <HowWeHelpSection />
      <StudentsPlacedSection /> 
    
      <Footer />
    </div>
  );
}