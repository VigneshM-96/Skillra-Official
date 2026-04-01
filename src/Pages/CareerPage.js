import { useEffect, useRef, useState } from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";
import SocialSidebar from "../components/SocialSideBar";

const PUB = process.env.PUBLIC_URL || "";

const SHEETS_URL = "https://script.google.com/macros/s/AKfycbws7QqEJT-y2F_6U_VyyuQ56sdXZUYEgXb7qLagegYmmPfqI-5EoGJ6wXGrHuQIC-jTWA/exec";


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

function CareerHero() {
  const [arcReady, setArcReady] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  useEffect(() => {
    const t = setTimeout(() => setArcReady(true), 500);
    return () => clearTimeout(t);
  }, []);

const [errors, setErrors] = useState({});

const validate = () => {
  const e = {};
  if (!form.name.trim()) {
    e.name = "Name is required";
  } else if (form.name.trim().length < 2) {
    e.name = "Name must be at least 2 characters";
  }

  if (!form.email.trim()) {
    e.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    e.email = "Enter a valid email address";
  }

  if (!form.phone.trim()) {
    e.phone = "Phone number is required";
  } else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
    e.phone = "Enter a valid 10-digit Indian mobile number";
  }

  return e;
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
        type: "popup",
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
      }),
    });
    setStatus("success");
    setTimeout(() => {
      setShowPopup(false);
      setStatus("idle");
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 2000);
  } catch {
    setStatus("error");
  }
};
  return (
    <section style={{
      background: "#ede9ff",
      position: "relative", overflow: "hidden",
      fontFamily: "'Outfit', sans-serif",
      minHeight: "100vh",
      display: "flex", flexDirection: "column",
    }}>

      <style>{`
        /* ── Arc animation ── */
        .career-arc {
          stroke-dasharray: 320;
          stroke-dashoffset: 320;
          transition: stroke-dashoffset 1.1s cubic-bezier(0.4,0,0.2,1) 0.2s;
        }
        .career-arc-animate { stroke-dashoffset: 0; }

        /* ── Desktop: show desktop els, hide mobile bottom ── */
        .career-desc-desktop { display: block; }
        .career-btn-desktop  { display: block; }
        .career-bottom       { display: none;  }

        /* ── Mobile ── */
        @media(max-width: 768px) {
          .career-desc-desktop { display: none !important; }
          .career-btn-desktop  { display: none !important; }

          .career-bottom {
            display: flex !important;
            flex-direction: column;
            align-items: center;
            gap: 14px;
            width: 100%;
            padding: 0 16px 24px !important;
            margin: 0 !important;
          }

          .career-hero-left {
            width: 100% !important;
            align-items: center !important;
            text-align: center !important;
            padding-top: 150px !important;
          }

          .career-title { text-align: center !important; }

          .career-hero-right {
            width: 100% !important;
            flex: unset !important;
            min-height: unset !important;
            height: auto !important;
          }

          .career-hero-img {
            max-height: 440px !important;
            width: 90% !important;
          }

          .career-hero-inner {
            padding-top: 88px !important;
            padding-bottom: 0 !important;
            gap: 8px !important;
          }

          .cr-v5 { margin-top: 0 !important; }
        }

        /* ── Popup ── */
        .consult-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(15,5,40,0.55);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          animation: fadeInOverlay 0.2s ease;
        }
        @keyframes fadeInOverlay { from{opacity:0} to{opacity:1} }

        .consult-modal {
          background: #fff;
          border-radius: 24px;
          padding: 36px 32px 32px;
          width: 100%; max-width: 460px;
          position: relative;
          box-shadow: 0 24px 64px rgba(124,58,237,0.18);
          animation: slideUpModal 0.28s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes slideUpModal {
          from{opacity:0;transform:translateY(32px) scale(0.97)}
          to{opacity:1;transform:translateY(0) scale(1)}
        }

        .consult-close {
          position: absolute; top: 16px; right: 16px;
          background: #f3f0ff; border: none; border-radius: 50%;
          width: 32px; height: 32px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #7c3aed; font-size: 18px; line-height: 1;
          transition: background 0.18s;
        }
        .consult-close:hover { background: #ede9ff; }

        .consult-input {
          width: 100%; padding: 12px 16px;
          border: 1.5px solid #e5e0f8;
          border-radius: 12px; font-size: 14px;
          font-family: 'Outfit', sans-serif;
          color: #1a0640; outline: none;
          transition: border-color 0.18s;
          box-sizing: border-box;
          background: #faf9ff;
        }
        .consult-input:focus { border-color: #7c3aed; background: #fff; }
        .consult-input::placeholder { color: #b0a0d0; }

        .consult-submit {
          width: 100%; padding: 14px;
          background: #7c3aed; color: #fff;
          border: none; border-radius: 50px;
          font-size: 15px; font-weight: 700;
          font-family: 'Outfit', sans-serif;
          cursor: pointer; margin-top: 8px;
          transition: all 0.22s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .consult-submit:hover { background: #6d28d9; transform: translateY(-2px); }
        .consult-submit:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
      `}</style>

      {/* ── Popup Modal ── */}
      {showPopup && (
        <div className="consult-overlay" onClick={e => { if (e.target === e.currentTarget) setShowPopup(false); }}>
          <div className="consult-modal">
            <button className="consult-close" onClick={() => setShowPopup(false)}>×</button>

            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎉</div>
                <h3 style={{ color: "#1a0640", fontFamily: "'Outfit',sans-serif", fontWeight: 800, marginBottom: "8px" }}>
                  Booking Confirmed!
                </h3>
                <p style={{ color: "#6b5a9e", fontFamily: "'Outfit',sans-serif", fontSize: "14px" }}>
                  We'll get back to you shortly.
                </p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div style={{ marginBottom: "24px" }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    background: "#f3f0ff", borderRadius: "50px",
                    padding: "5px 14px", marginBottom: "12px",
                  }}>
                    <span style={{ fontSize: "14px" }}>📅</span>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#7c3aed", fontFamily: "'Outfit',sans-serif", letterSpacing: "0.06em" }}>
                      BOOK A CONSULTATION
                    </span>
                  </div>
                  <h2 style={{
                    fontSize: "22px", fontWeight: 900, color: "#1a0640",
                    fontFamily: "'Outfit',sans-serif", lineHeight: 1.2, margin: 0,
                  }}>
                    Let's Plan Your Career
                  </h2>
                  <p style={{ fontSize: "13px", color: "#6b5a9e", fontFamily: "'Outfit',sans-serif", marginTop: "6px" }}>
                    Fill in your details and we'll reach out to you.
                  </p>
                </div>
<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

  {/* Name */}
  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
    <input
      className="consult-input"
      placeholder="Your Name"
      value={form.name}
      onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(p => ({ ...p, name: "" })); }}
      style={{ borderColor: errors.name ? "#ef4444" : undefined, background: errors.name ? "#fff5f5" : undefined }}
    />
    {errors.name && (
      <div style={{ display: "flex", alignItems: "center", gap: "5px", paddingLeft: "4px" }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5.5" fill="#ef4444"/>
          <text x="6" y="9" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">!</text>
        </svg>
        <span style={{ color: "#ef4444", fontSize: "12px", fontFamily: "'Outfit',sans-serif" }}>{errors.name}</span>
      </div>
    )}
  </div>

  {/* Email */}
  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
    <input
      className="consult-input"
      placeholder="Email Address"
      type="email"
      value={form.email}
      onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(p => ({ ...p, email: "" })); }}
      style={{ borderColor: errors.email ? "#ef4444" : undefined, background: errors.email ? "#fff5f5" : undefined }}
    />
    {errors.email && (
      <div style={{ display: "flex", alignItems: "center", gap: "5px", paddingLeft: "4px" }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5.5" fill="#ef4444"/>
          <text x="6" y="9" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">!</text>
        </svg>
        <span style={{ color: "#ef4444", fontSize: "12px", fontFamily: "'Outfit',sans-serif" }}>{errors.email}</span>
      </div>
    )}
  </div>

  {/* Phone */}
  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
    <input
      className="consult-input"
      placeholder="Phone Number"
      type="tel"
      value={form.phone}
      onChange={e => { setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })); setErrors(p => ({ ...p, phone: "" })); }}
      style={{ borderColor: errors.phone ? "#ef4444" : undefined, background: errors.phone ? "#fff5f5" : undefined }}
    />
    {errors.phone && (
      <div style={{ display: "flex", alignItems: "center", gap: "5px", paddingLeft: "4px" }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5.5" fill="#ef4444"/>
          <text x="6" y="9" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">!</text>
        </svg>
        <span style={{ color: "#ef4444", fontSize: "12px", fontFamily: "'Outfit',sans-serif" }}>{errors.phone}</span>
      </div>
    )}
  </div>

  {/* Message */}
  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
    <textarea
      className="consult-input"
      placeholder="Your Message (optional)"
      rows={3}
      value={form.message}
      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
      style={{ resize: "none" }}
    />
  </div>

</div>

                {status === "error" && (
                  <p style={{ color: "#ef4444", fontSize: "13px", fontFamily: "'Outfit',sans-serif", marginTop: "8px" }}>
                    Something went wrong. Please try again.
                  </p>
                )}

                <a href="/Skillra" style={{ textDecoration: "none" }} onClick={(e) => e.preventDefault()}>
                <button
                  className="consult-submit"
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending..." : "Book Consultation"}
                  {status !== "loading" && (
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                      <path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                </a>
              </>
            )}
          </div>
        </div>
      )}

      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "radial-gradient(rgba(124,58,237,0.08) 1px,transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      {/* Hero row */}
      <div className="career-hero-inner" style={{
        flex: 1,
        display: "flex", alignItems: "center",
        flexWrap: "wrap",
        maxWidth: "1280px", margin: "0 auto", width: "100%",
        padding: "100px clamp(16px,5%,72px) 0",
        gap: "0", position: "relative", zIndex: 1, marginTop: "-100px",
      }}>

        {/* ── 1st: Title + arc ── */}
        <div className="career-hero-left" style={{
          flex: "0 0 auto", width: "clamp(280px,44%,520px)", maxWidth: "100%",
          display: "flex", flexDirection: "column", alignItems: "flex-start",
          paddingTop: "180px",
        }}>
          <h1 className="cr-v1 career-title" style={{
            fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 900,
            lineHeight: 1.08, letterSpacing: "-1.5px",
            marginBottom: "12px", fontFamily: "'Outfit', sans-serif",
          }}>
            <span style={{ color: "#1a0640" }}>Best Career Guidance for</span><br />
            <span style={{ color: "#f97316" }}>Students and Job Seekers</span>
          </h1>

          <div className="cr-v2" style={{ marginBottom: "22px" }}>
            <svg viewBox="0 0 300 16"
              style={{ width: "clamp(180px,26vw,300px)", height: "10px", overflow: "visible", display: "block" }}
              preserveAspectRatio="none"
            >
              <path
                className={`career-arc${arcReady ? " career-arc-animate" : ""}`}
                d="M 4 12 C 65 2, 200 1, 296 10"
                fill="none" stroke="#7c3aed" strokeWidth="4.5" strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Desktop only — desc */}
          <p className="cr-v3 career-desc-desktop" style={{
            fontSize: "clamp(13px,1.3vw,14.5px)", color: "#5c4a80",
            lineHeight: 1.78, fontWeight: 400, marginBottom: "36px",
            maxWidth: "380px", fontFamily: "'Outfit', sans-serif",
          }}>
            Get best career guidance for students and job seekers with personalized
            planning, skill development, and placement support.
          </p>

          {/* Desktop only — button */}
          <div className="cr-v4 career-btn-desktop">
             <a href="/Skillra" style={{ textDecoration: "none" }} onClick={(e) => e.preventDefault()}>
            <button className="career-cta-btn" onClick={() => setShowPopup(true)} style={{
              background: "#7c3aed", color: "#fff", border: "none",
              borderRadius: "50px", padding: "14px 32px",
              fontSize: "clamp(13px,1.3vw,14.5px)", fontWeight: 700,
              cursor: "pointer", fontFamily: "'Outfit', sans-serif",
              display: "inline-flex", alignItems: "center", gap: "10px",
              boxShadow: "0 6px 24px rgba(124,58,237,0.40)",
              transition: "all 0.22s", position: "relative", overflow: "hidden",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.03)"; e.currentTarget.style.boxShadow = "0 14px 36px rgba(124,58,237,0.55)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(124,58,237,0.40)"; }}
            >
              Book Consultation
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                <path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            </a>
          </div>
        </div>

        {/* ── 2nd: Image ── */}
        <div className="career-hero-right cr-vR" style={{
          flex: 1, position: "relative",
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          minHeight: "380px", overflow: "visible",
        }}>
          <svg
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
            viewBox="0 0 480 500" preserveAspectRatio="xMidYMid slice" fill="none"
          >
            {[
              "M 80 10 C 140 30, 320 20, 420 80 C 460 120, 470 200, 430 280 C 400 340, 320 390, 240 420 C 160 450, 60 440, 20 380 C -20 320, 10 200, 50 130 C 70 80, 80 10, 80 10Z",
              "M 100 30 C 160 50, 300 40, 390 95 C 430 130, 445 210, 410 285 C 385 340, 310 385, 235 410 C 165 435, 75 425, 38 368 C 0 310, 28 205, 68 138 C 88 92, 100 30, 100 30Z",
              "M 120 52 C 178 70, 285 62, 365 108 C 400 138, 418 215, 390 286 C 368 338, 298 380, 228 402 C 164 422, 90 412, 58 358 C 24 302, 48 208, 88 144 C 108 102, 120 52, 120 52Z",
              "M 140 74 C 196 90, 272 84, 342 122 C 374 148, 390 220, 366 288 C 346 336, 284 374, 220 394 C 162 412, 104 400, 76 350 C 46 296, 68 212, 106 152 C 126 114, 140 74, 140 74Z",
              "M 162 98 C 214 112, 258 108, 318 138 C 346 158, 362 228, 340 290 C 323 334, 268 368, 212 386 C 160 402, 116 390, 94 342 C 68 290, 88 216, 124 160 C 144 126, 162 98, 162 98Z",
              "M 184 122 C 232 136, 244 132, 294 154 C 318 170, 334 236, 314 292 C 300 332, 252 362, 202 378 C 156 392, 128 382, 110 336 C 88 284, 108 220, 142 168 C 162 138, 184 122, 184 122Z",
              "M 206 148 C 250 160, 232 158, 270 172 C 292 184, 306 244, 288 294 C 276 330, 236 356, 194 370 C 152 382, 140 372, 126 330 C 108 278, 128 224, 160 176 C 180 150, 206 148, 206 148Z",
            ].map((d, i) => (
              <path key={i} d={d} stroke="#9b7fe8" strokeWidth={1.4 - i * 0.08} opacity={0.55 - i * 0.04} />
            ))}
          </svg>

          <img
            src={`${PUB}/career-hero.png`}
            alt="Career Guidance"
            className="career-hero-img"
            style={{
              position: "relative", zIndex: 2,
              maxHeight: "clamp(260px,48vw,820px)",
              maxWidth: "100%", objectFit: "contain",
              objectPosition: "bottom center", display: "block",
              filter: "drop-shadow(0 16px 40px rgba(109,40,217,0.14))",
            }}
          />
        </div>

        {/* ── 3rd on mobile only: Desc + button ── */}
        <div className="career-bottom">
          <p style={{
            fontSize: "14px", color: "#5c4a80",
            lineHeight: 1.78, fontWeight: 400,
            maxWidth: "380px", fontFamily: "'Outfit', sans-serif",
            textAlign: "center", margin: 0,
          }}>
            Get best career guidance for students and job seekers with personalized
            planning, skill development, and placement support.
          </p>
          <button className="career-cta-btn" onClick={() => setShowPopup(true)} style={{
            background: "#7c3aed", color: "#fff", border: "none",
            borderRadius: "50px", padding: "13px 28px", fontSize: "14px", fontWeight: 700,
            cursor: "pointer", fontFamily: "'Outfit', sans-serif",
            display: "inline-flex", alignItems: "center", gap: "10px",
            boxShadow: "0 6px 24px rgba(124,58,237,0.40)",
            transition: "all 0.22s",
          }}>
            Book Consultation
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

      </div>

      {/* Purple quote band */}
      <div className="cr-v5" style={{
        background: "#7c3aed",
        padding: "clamp(22px,4vw,38px) clamp(20px,6%,80px)",
        position: "relative", zIndex: 1,
        marginTop: "clamp(8px, 8vw, 90px)",
      }}>
        <p style={{
          fontSize: "clamp(13px,1.6vw,17px)", color: "#fff",
          fontFamily: "'Outfit', sans-serif", fontStyle: "italic",
          fontWeight: 400, lineHeight: 1.75, textAlign: "center",
          maxWidth: "920px", margin: "0 auto",
        }}>
          "With the right guidance, you can understand your strengths,
           explore career options, and build the skills needed to succeed with confidence."
        </p>
      </div>

    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROCESS SECTION — Curved Roadmap, Light Theme
══════════════════════════════════════════════════════ */
const PROCESS_STEPS = [
  {
    label: "Confused About Your Future",
    lottie: `${PUB}/lottie/CONFUSION.json`,
    desc: "Too many options and no clear direction this is where most students start.",
    color: "#7c3aed",
    side: "top",
  },
  {
    label: "Understanding Your Strengths",
    lottie: `${PUB}/lottie/STUDENT.json`,
    desc: "We identify what suits you based on your interests and goals.",
    color: "#f97316",
    side: "bottom",
  },
  {
    label: "Exploring the Right Careers",
    lottie: `${PUB}/lottie/EXPLORE.json`,
    desc: "We show you relevant career options that match your profile.",
    color: "#0ea5e9",
    side: "top",
  },
  {
    label: "Skill Development & Preparation",
    lottie: `${PUB}/lottie/SKILL.json`,
    desc: "Develop skills with training, resume, and interview support.",
    color: "#10b981",
    side: "bottom",
  },
  {
    label: "Placement & Career Launch",
    lottie: `${PUB}/lottie/PLACEMENT.json`,
    desc: "We support you in securing jobs and starting your career.",
    color: "#f59e0b",
    side: "top",
  },
];

function ProcessSection() {
  const [ref, inView] = useInView(0.06);

  return (
    <section ref={ref} style={{
      background: "#f8f5ff",
      padding: "clamp(56px,8vw,88px) 0 clamp(64px,10vw,100px)",
      fontFamily: "'Outfit',sans-serif",
      overflow: "hidden",
      position: "relative",
      borderTop: "1px solid #ede9ff",
    }}>

      {/* Dot grid — matches rest of site */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(124,58,237,0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(124,58,237,0.035) 1px, transparent 1px)
        `,
        backgroundSize: "32px 32px",
      }}/>

      <style>{`
        @keyframes proc-fadeUp  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes proc-floatA  { 0%,100%{transform:translateY(0)}    50%{transform:translateY(-10px)} }
        @keyframes proc-floatB  { 0%,100%{transform:translateY(-6px)} 50%{transform:translateY(6px)}  }
        @keyframes proc-popIn   { from{transform:scale(0) rotate(-180deg);opacity:0} to{transform:scale(1) rotate(0deg);opacity:1} }
        .proc-float-a { animation: proc-floatA 3.8s ease-in-out infinite; }
        .proc-float-b { animation: proc-floatB 4.3s ease-in-out infinite; }
        .proc-card-inner {
          transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s ease !important;
        }
        .proc-card-inner:hover {
          transform: translateY(-6px) scale(1.03) !important;
        }
        .proc-desktop { display: block; }
        .proc-mobile  { display: none;  }
        @media(max-width: 768px) {
        .cr-v5 {
    margin-top: -80px; /* 👈 increase negative value to pull it up more e.g. -30px, -40px */
  }
          .proc-desktop { display: none  !important; }
          .proc-mobile  { display: flex  !important; }
        }
      `}</style>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(16px,4%,48px)", position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <div style={{
          textAlign: "center",
          marginBottom: "clamp(40px,6vw,72px)",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease",
        }}>
          <div style={{
            display: "inline-block",
            background: "rgba(124,58,237,0.08)",
            border: "1px solid rgba(124,58,237,0.2)",
            borderRadius: "50px",
            padding: "5px 16px",
            fontSize: "11px", fontWeight: 800,
            color: "#7c3aed", letterSpacing: "0.12em",
            textTransform: "uppercase", marginBottom: "14px",
          }}>
            How It Works
          </div>
          <h2 style={{
            fontSize: "clamp(1.8rem,4vw,3rem)",
            fontWeight: 900, color: "#1a0640",
            letterSpacing: "-0.03em", lineHeight: 1.08,
            marginBottom: "12px",
          }}>
            From Confusion to{" "}
            <span style={{ color: "#f97316" }}>Career Clarity</span>
          </h2>
          <p style={{
            fontSize: "clamp(13px,1.3vw,14.5px)",
            color: "#6b5a9e", maxWidth: "480px",
            margin: "0 auto", lineHeight: 1.78,
          }}>
            Our proven process helps you identify the right path, build a plan, and take confident steps toward your future.
          </p>
        </div>

        {/* ══════════════════════════
            DESKTOP — Curved Roadmap
        ══════════════════════════ */}
        <div className="proc-desktop" style={{ position: "relative", height: "560px" }}>

          {/* SVG curved road */}
          <svg
            viewBox="0 0 1100 300"
            preserveAspectRatio="xMidYMid meet"
            style={{
              position: "absolute",
              top: "50%", left: 0,
              transform: "translateY(-50%)",
              width: "100%",
              height: "300px",
              overflow: "visible",
              zIndex: 0,
            }}
          >
            <defs>
              <filter id="pathShadow" x="-20%" y="-40%" width="140%" height="180%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#7c3aed" floodOpacity="0.12"/>
              </filter>
              <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#7c3aed"/>
                <stop offset="25%"  stopColor="#f97316"/>
                <stop offset="50%"  stopColor="#0ea5e9"/>
                <stop offset="75%"  stopColor="#10b981"/>
                <stop offset="100%" stopColor="#f59e0b"/>
              </linearGradient>
            </defs>

            {/* Road shadow base */}
            <path
              d="M 55 150 C 155 150, 175 55, 275 55 C 375 55, 395 245, 550 245 C 705 245, 725 55, 825 55 C 925 55, 945 150, 1045 150"
              fill="none"
              stroke="#ddd6fe"
              strokeWidth="34"
              strokeLinecap="round"
              filter="url(#pathShadow)"
            />

            {/* Road fill — white */}
            <path
              d="M 55 150 C 155 150, 175 55, 275 55 C 375 55, 395 245, 550 245 C 705 245, 725 55, 825 55 C 925 55, 945 150, 1045 150"
              fill="none"
              stroke="#fff"
              strokeWidth="28"
              strokeLinecap="round"
            />

            {/* Animated gradient top stroke — draws in on inView */}
            <path
              d="M 55 150 C 155 150, 175 55, 275 55 C 375 55, 395 245, 550 245 C 705 245, 725 55, 825 55 C 925 55, 945 150, 1045 150"
              fill="none"
              stroke="url(#roadGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="1500"
              strokeDashoffset={inView ? "0" : "1500"}
              style={{ transition: inView ? "stroke-dashoffset 2.4s ease 0.6s" : "none" }}
            />

            {/* Dashed center lane */}
            <path
              d="M 55 150 C 155 150, 175 55, 275 55 C 375 55, 395 245, 550 245 C 705 245, 725 55, 825 55 C 925 55, 945 150, 1045 150"
              fill="none"
              stroke="rgba(124,58,237,0.15)"
              strokeWidth="2"
              strokeDasharray="10 14"
              strokeLinecap="round"
            />

            {/* Node circles on path */}
            {[
              { cx: 55,   cy: 150 },
              { cx: 275,  cy: 55  },
              { cx: 550,  cy: 245 },
              { cx: 825,  cy: 55  },
              { cx: 1045, cy: 150 },
            ].map((pt, i) => (
              <g key={i} style={{
                opacity: inView ? 1 : 0,
                transition: `opacity 0.4s ease ${0.8 + i * 0.2}s`,
              }}>
                {/* Outer ring */}
                <circle cx={pt.cx} cy={pt.cy} r="26"
                  fill="none"
                  stroke={PROCESS_STEPS[i].color}
                  strokeWidth="1.5"
                  opacity="0.3"
                />
                {/* White fill with colored border */}
                <circle cx={pt.cx} cy={pt.cy} r="20"
                  fill="#fff"
                  stroke={PROCESS_STEPS[i].color}
                  strokeWidth="3"
                  style={{ filter: `drop-shadow(0 4px 10px ${PROCESS_STEPS[i].color}44)` }}
                />
                {/* Step number */}
                <text x={pt.cx} y={pt.cy + 5}
                  textAnchor="middle"
                  fill={PROCESS_STEPS[i].color}
                  fontSize="13"
                  fontWeight="900"
                  fontFamily="'Outfit',sans-serif"
                >
                  {i + 1}
                </text>
              </g>
            ))}
          </svg>

          {/* ── Step cards positioned above/below curve ── */}
          {[
            { left: "0%",    isTop: true  },
            { left: "22.5%", isTop: false },
            { left: "45%",   isTop: true  },
            { left: "67.5%", isTop: false },
            { left: "90%",   isTop: true  },
          ].map((pos, i) => {
            const step = PROCESS_STEPS[i];
            const delay = `${0.5 + i * 0.18}s`;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: pos.left,
                  top:    pos.isTop ? "0px"  : "auto",
                  bottom: pos.isTop ? "auto" : "0px",
                  width: "190px",
                  transform: "translateX(-38%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  zIndex: 2,
                  opacity: inView ? 1 : 0,
                  transition: `opacity 0.6s ease ${delay}`,
                }}
              >
                {/* Top connector stem */}
                {pos.isTop && (
                  <div style={{
                    width: "2px", height: "26px",
                    background: `linear-gradient(180deg, transparent, ${step.color}66)`,
                    order: 2,
                  }} />
                )}

                {/* Card */}
                <div
                  className={`proc-card-inner ${i % 2 === 0 ? "proc-float-a" : "proc-float-b"}`}
                  style={{
                    background: "#fff",
                    border: `1.5px solid ${step.color}28`,
                    borderRadius: "18px",
                    padding: "16px 14px 14px",
                    width: "100%",
                    boxSizing: "border-box",
                    boxShadow: `0 8px 28px ${step.color}16, 0 2px 8px rgba(0,0,0,0.05)`,
                    order: pos.isTop ? 1 : 3,
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Colored top bar */}
                  <div style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0,
                    height: "3px",
                    background: step.color,
                    borderRadius: "18px 18px 0 0",
                  }} />

                  {/* Lottie */}
                  <div dangerouslySetInnerHTML={{ __html: `
                    <dotlottie-player
                      src="${step.lottie}"
                      autoplay loop
                      style="width:76px;height:76px;margin:0 auto"
                    ></dotlottie-player>
                  `}} />

                  {/* Label */}
                  <div style={{
                    fontSize: "12px", fontWeight: 800,
                    color: "#1a0640",
                    fontFamily: "'Outfit',sans-serif",
                    lineHeight: 1.3,
                    marginTop: "8px", marginBottom: "5px",
                  }}>
                    {step.label}
                  </div>

                  {/* Desc */}
                  <div style={{
                    fontSize: "10.5px", color: "#6b5a9e",
                    fontFamily: "'Outfit',sans-serif",
                    lineHeight: 1.6,
                  }}>
                    {step.desc}
                  </div>
                </div>

                {/* Bottom connector stem */}
                {!pos.isTop && (
                  <div style={{
                    width: "2px", height: "26px",
                    background: `linear-gradient(0deg, transparent, ${step.color}66)`,
                    order: 2,
                  }} />
                )}
              </div>
            );
          })}
        </div>

        {/* ══════════════════════════
            MOBILE — Vertical timeline
        ══════════════════════════ */}
        <div
          className="proc-mobile"
          style={{ flexDirection: "column", gap: 0, position: "relative" }}
        >
          {/* Vertical line */}
          <div style={{
            position: "absolute",
            left: "24px", top: "28px", bottom: "28px",
            width: "3px",
            background: "linear-gradient(180deg,#7c3aed,#f97316,#0ea5e9,#10b981,#f59e0b)",
            borderRadius: "3px",
            opacity: 0.3,
          }} />

          {PROCESS_STEPS.map((step, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                paddingBottom: i < PROCESS_STEPS.length - 1 ? "20px" : "0",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateX(0)" : "translateX(-20px)",
                transition: `all 0.55s ease ${0.3 + i * 0.15}s`,
                position: "relative",
              }}
            >
              {/* Node dot */}
              <div style={{
                flexShrink: 0,
                width: "48px", height: "48px",
                borderRadius: "50%",
                background: "#fff",
                border: `3px solid ${step.color}`,
                boxShadow: `0 4px 16px ${step.color}33`,
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 2, position: "relative",
              }}>
                <span style={{
                  fontSize: "15px", fontWeight: 900,
                  color: step.color,
                  fontFamily: "'Outfit',sans-serif",
                }}>
                  {i + 1}
                </span>
              </div>

              {/* Mobile card */}
              <div style={{
                flex: 1,
                background: "#fff",
                border: `1.5px solid ${step.color}22`,
                borderRadius: "16px",
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: `0 4px 16px ${step.color}12, 0 1px 4px rgba(0,0,0,0.04)`,
              }}>
                <div dangerouslySetInnerHTML={{ __html: `
                  <dotlottie-player
                    src="${step.lottie}"
                    autoplay loop
                    style="width:56px;height:56px;flex-shrink:0"
                  ></dotlottie-player>
                `}} />
                <div>
                  <div style={{
                    fontSize: "13px", fontWeight: 800,
                    color: "#1a0640",
                    fontFamily: "'Outfit',sans-serif",
                    marginBottom: "3px", lineHeight: 1.3,
                  }}>
                    {step.label}
                  </div>
                  <div style={{
                    fontSize: "11px", color: "#6b5a9e",
                    fontFamily: "'Outfit',sans-serif",
                    lineHeight: 1.6,
                  }}>
                    {step.desc}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom quote band ── */}
        <div style={{
          marginTop: "clamp(48px,7vw,72px)",
          background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
          borderRadius: "20px",
          padding: "clamp(22px,4vw,36px) clamp(24px,5%,64px)",
          opacity: inView ? 1 : 0,
          transition: "opacity 0.8s ease 1.2s",
          textAlign: "center",
          boxShadow: "0 12px 40px rgba(124,58,237,0.22)",
        }}>
          <p style={{
            fontSize: "clamp(13px,1.5vw,16px)",
            color: "#fff",
            fontFamily: "'Outfit',sans-serif",
            fontStyle: "italic", fontWeight: 400,
            lineHeight: 1.75, margin: 0,
            maxWidth: "780px", display: "inline-block",
          }}>
            "Students who follow a structured career guidance approach make informed decisions, build relevant skills, and achieve their goals with confidence."
          </p>
        </div>

      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — SERVICE CARDS
   Rounded corners + gap between cards
   Horizontal scroll on mobile
══════════════════════════════════════════════════════ */
const SERVICES = [
  {
    bg: "#7c3aed", title: "Career Clarity",
    para: "Making the best academic and professional choices starts with having a clear career. It starts with recognizing your strengths, which will help you comprehend your fundamental skills and passions. After gaining this knowledge, you can investigate the best choices that complement your abilities and long-term objectives. You are better equipped to make assured decisions and select a career path with certainty when you have a clear understanding of the options.",
    decor: "stars",
  },
  {
    bg: "#f97316", title: "Personalized Guidance",
    para: "Individualized counseling guarantees that career choices are grounded in personal strengths, passions, and objectives rather than broad presumptions. Students receive targeted assistance to address their particular career concerns and goals through one-on-one mentoring. Evaluation of skills, preferences, and possible career paths is aided by a thorough profile-based analysis. A personalized career plan is developed based on these insights.",
    decor: "dots",
  },
  {
    bg: "#5b9d55", title: "Skill-Based Roadmap",
    para: "The goal of a skill-based roadmap is to develop the competencies needed in the modern labor market. Students can better understand what they need to succeed in their chosen field by identifying skills that are relevant to the industry. By using real-world situations and practical experience, a practical learning approach guarantees that knowledge is applied. Students can progress from novices to professionals who are prepared for the workforce.",
    decor: "circle",
  },
  {
    bg: "#111827", title: "Career Success Support",
    para: "Success in the workplace requires more than just knowledge; it also requires the appropriate planning and direction. Building a portfolio and resume makes it easier to showcase accomplishments and abilities to prospective employers. Students who prepare for interviews gain the self-assurance and skills necessary to succeed in selection procedures. Placement assistance helps students apply for opportunities and get off to a good start in their careers..",
    decor: "stars2",
  },
];

function ServiceCard({ card, inView, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: card.bg,
        borderRadius: "20px",
        padding: "clamp(20px,3%,32px) clamp(18px,2.5%,28px) clamp(20px,3%,28px)",
        position: "relative", overflow: "hidden",
        flex: "1 0 0", minWidth: "220px",
        display: "flex", flexDirection: "column",
        opacity: inView ? 1 : 0,
        transform: inView ? (hov ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)") : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.32s cubic-bezier(0.34,1.56,0.64,1)`,
        boxShadow: hov ? `0 20px 50px ${card.bg}66` : "0 4px 20px rgba(0,0,0,0.10)",
        cursor: "default",
        minHeight: "220px",
      }}>

      {(card.decor === "stars" || card.decor === "stars2") && (<>
        <div style={{ position: "absolute", top: "16px", right: "20px", color: "rgba(255,255,255,0.28)", fontSize: "20px", animation: "starTwinkle 2.4s ease-in-out infinite" }}>✦</div>
        <div style={{ position: "absolute", bottom: "52px", right: "16px", color: "rgba(255,255,255,0.16)", fontSize: "12px", animation: "starTwinkle 2.4s ease-in-out 0.8s infinite" }}>✦</div>
        <div style={{ position: "absolute", top: "50px", right: "40px", color: "rgba(255,255,255,0.12)", fontSize: "8px", animation: "starTwinkle 2.4s ease-in-out 1.4s infinite" }}>✦</div>
      </>)}
      {card.decor === "dots" && (
        <div style={{ position: "absolute", bottom: "12px", right: "12px", width: "60px", height: "60px",
          backgroundImage: "radial-gradient(rgba(255,255,255,0.28) 1.8px,transparent 1.8px)", backgroundSize: "9px 9px",
          animation: "dotPulse 3s ease-in-out infinite" }} />
      )}
      {card.decor === "circle" && (<>
        <div style={{ position: "absolute", bottom: "-24px", right: "-24px", width: "100px", height: "100px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.14)", animation: "ringPulse 3s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "-10px", right: "-10px", width: "60px", height: "60px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)" }} />
      </>)}

      <h3 style={{ fontSize: "clamp(13px,1.4vw,15px)", fontWeight: 800, color: "#fff", fontFamily: "'Outfit',sans-serif", marginBottom: "14px", lineHeight: 1.3, position: "relative", zIndex: 1 }}>
        {card.title}
      </h3>
      <p style={{
  fontSize: "clamp(11px,1.1vw,12.5px)",
  color: "rgba(255,255,255,0.78)",
  fontFamily: "'Outfit',sans-serif",
  lineHeight: 1.75,
  margin: 0,
  textAlign: "justify",
  position: "relative",
  zIndex: 1,
}}>
  {card.para}
</p>
      
    </div>
  );
}

function ServicesSection() {
  const [ref, inView] = useInView(0.08);
  return (
    <section ref={ref} style={{ background: "#fff", padding: "clamp(32px,5vw,52px) 0" }}>
      <style>{`
        @keyframes starTwinkle { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.7)} }
        @keyframes dotPulse    { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes ringPulse   { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(1.1);opacity:1} }
        .srv-grid { display:flex; gap:16px; padding:0 clamp(16px,4%,40px); }
        .srv-grid::-webkit-scrollbar { display:none; }
        @media(max-width:768px){
          .srv-grid { overflow-x:auto !important; scroll-snap-type:x mandatory !important; -webkit-overflow-scrolling:touch !important; padding-bottom:8px !important; }
          .srv-grid > div { flex:0 0 78vw !important; min-width:78vw !important; scroll-snap-align:start !important; }
        }
        @media(max-width:480px){
          .srv-grid > div { flex:0 0 86vw !important; min-width:86vw !important; }
        }
      `}</style>
      <div className="srv-grid" style={{ scrollbarWidth: "none" }}>
        {SERVICES.map((card, i) => (
          <div key={i} style={{ flex: "1 0 0", minWidth: "220px" }}>
            <ServiceCard card={card} inView={inView} delay={0.05 + i * 0.1} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — TESTIMONIALS + CONTACT FORM
══════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════ */
export default function CareerPage() {
  return (
    <div style={{ fontFamily: "'Outfit','Segoe UI',sans-serif", margin: 0, padding: 0, overflowX: "hidden", background: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html, body { overflow-x:hidden; }

        /* Arc */
        @keyframes drawCareerArc { from{stroke-dashoffset:380} to{stroke-dashoffset:0} }
        .career-arc             { stroke-dasharray:380; stroke-dashoffset:380; }
        .career-arc.career-arc-animate { animation:drawCareerArc 1.6s cubic-bezier(0.25,0.1,0.2,1) 0.5s forwards; }

        /* Hero entrances */
        @keyframes crFadeRight { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes crFadeUp    { from{opacity:0;transform:translateY(22px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes crFadeScale { from{opacity:0;transform:scale(0.90)}       to{opacity:1;transform:scale(1)} }
        @keyframes crFadeIn    { from{opacity:0} to{opacity:1} }
        @keyframes shimmer     { 0%{background-position:-200% center} 100%{background-position:200% center} }

        .cr-v1 { animation:crFadeRight 0.65s ease forwards; opacity:0; animation-delay:0.10s; }
        .cr-v2 { animation:crFadeUp    0.65s ease forwards; opacity:0; animation-delay:0.24s; }
        .cr-v3 { animation:crFadeUp    0.65s ease forwards; opacity:0; animation-delay:0.38s; }
        .cr-v4 { animation:crFadeUp    0.65s ease forwards; opacity:0; animation-delay:0.52s; }
        .cr-v5 { animation:crFadeIn    0.8s  ease forwards; opacity:0; animation-delay:0.70s; }
        .cr-vR { animation:crFadeScale 1.0s  ease forwards; opacity:0; animation-delay:0.20s; }

        .career-cta-btn::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent);
          background-size:200% 100%; animation:shimmer 2.4s infinite;
        }

        /* Testi */
        @keyframes tesFadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .testi-slide { animation:tesFadeUp 0.36s cubic-bezier(0.22,1,0.36,1) forwards; }

        input::placeholder { color:#9ca3af; }
        input:focus { outline:none; }

        /* ══ RESPONSIVE ══ */

        /* Tablet */
        @media(max-width:1024px) and (min-width:769px){
          .career-hero-inner { gap:20px !important; padding:50px clamp(16px,4%,40px) 0 !important; }
          .career-hero-left  { width:clamp(260px,44%,420px) !important; }
        }

        /* Mobile ≤ 768px — same 3-order pattern as CampusPage */
        @media(max-width:768px){
          .career-hero-inner {
            flex-direction: column !important;
            text-align: center !important;
            padding: 90px 16px 0 !important;
            gap: 16px !important;
            align-items: center !important;
          }

          /* 1st — title + arc */
          .career-hero-left {
            order: 1 !important;
            width: 100% !important;
            max-width: 100% !important;
            align-items: center !important;
            padding-top: 0 !important;
          }

          /* 2nd — image */
          .career-hero-right {
            order: 2 !important;
            width: 100% !important;
            min-height: 200px !important;
            max-height: 360px !important;
          }
          .career-hero-right img { max-height: 400px !important; }

          /* 3rd — desc + button */
          .career-bottom { order: 3 !important; }

          

          /* Testimonials */
          .testi-inner { flex-direction: column !important; }
          .testi-form  { flex:0 0 auto !important; width:100% !important; max-width:100% !important; }

          /* Process — on mobile, stack to left side only */
          .proc-label-l, .proc-label-r {
            align-items: flex-start !important;
            padding-left: 24px !important;
            padding-right: 0 !important;
          }
        }

        /* Hide mobile-bottom on desktop */
        @media(min-width:769px){
          .career-bottom { display:none !important; }
        }

        /* Small mobile */
        @media(max-width:480px){
          .career-title { font-size:1.8rem !important; }
          .career-hero-right { max-height:220px !important; }
          .career-hero-right img { max-height:200px !important; }
        }

        /* Very small */
        @media(max-width:360px){
          .career-hero-inner { padding:70px 12px 0 !important; }
          .career-title { font-size:1.6rem !important; }
        }
      `}</style>

      <Navbar />
      <SocialSidebar />
      <CareerHero />
      <ServicesSection />
      <ProcessSection />
      <Footer />
    </div>
  );
}