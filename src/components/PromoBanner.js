// src/components/PromoBanner.jsx
import { useState, useEffect, useRef } from "react";

const PUB = process.env.PUBLIC_URL || "";
const SHEETS_URL = "https://script.google.com/macros/s/AKfycbws7QqEJT-y2F_6U_VyyuQ56sdXZUYEgXb7qLagegYmmPfqI-5EoGJ6wXGrHuQIC-jTWA/exec";

// Key used in localStorage to track submission
const SUBMITTED_KEY = "skillra_promo_submitted";

/* ═══════════════ PROMO BANNER WRAPPER ═══════════════ */
// This wrapper controls WHEN the banner is shown.
// It shows the banner every 40 seconds if the user hasn't submitted.
export function PromoBannerController() {
  const [showBanner, setShowBanner] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const timerRef = useRef(null);

  // On mount: check if already submitted
  useEffect(() => {
    try {
      if (localStorage.getItem(SUBMITTED_KEY) === "true") {
        setHasSubmitted(true);
        return;
      }
    } catch (_) {}

    // Show banner on first load after 40 seconds
    startTimer();

    return () => clearTimer();
  }, []);

  const startTimer = () => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      setShowBanner(true);
    }, 40000); // 40 seconds
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleClose = () => {
    setShowBanner(false);
    // User closed without submitting — show again after 40 seconds
    if (!hasSubmitted) {
      startTimer();
    }
  };

  const handleSubmitted = () => {
    setHasSubmitted(true);
    clearTimer();
    // Banner will auto-close after 3s (handled inside PromoBanner)
    // After that, never show again
  };

  const handleCloseAfterSubmit = () => {
    setShowBanner(false);
    // Don't restart timer — form was submitted
  };

  // Never show if already submitted
  if (hasSubmitted && !showBanner) return null;

  if (!showBanner) return null;

  return (
    <PromoBanner
      onClose={hasSubmitted ? handleCloseAfterSubmit : handleClose}
      onSubmitted={handleSubmitted}
    />
  );
}

/* ═══════════════ PROMO BANNER ═══════════════ */
function PromoBanner({ onClose, onSubmitted }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState(() => ({
    a: Math.floor(Math.random() * 9) + 1,
    b: Math.floor(Math.random() * 9) + 1,
  }));
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const BANNER_IMAGES = [
    "/CurrentOffers/skillraoffer1.webp",
  ];

  const [bannerIdx, setBannerIdx] = useState(0);
  const captchaCanvasRef = useRef(null);
  const touchStartX = useRef(null);

  // Auto-slide images
  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIdx(prev => (prev + 1) % BANNER_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Captcha canvas
  useEffect(() => {
    const canvas = captchaCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#f0ebff";
    ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 80; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * W, Math.random() * H, Math.random() * 2, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${Math.random() * 360},60%,70%)`;
      ctx.fill();
    }
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * W, Math.random() * H);
      ctx.lineTo(Math.random() * W, Math.random() * H);
      ctx.strokeStyle = `hsl(${Math.random() * 360},50%,60%)`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    const text = `${captchaAnswer.a} + ${captchaAnswer.b} = ?`;
    ctx.font = "bold 22px 'Courier New', monospace";
    ctx.textBaseline = "middle";
    let x = 10;
    for (let i = 0; i < text.length; i++) {
      ctx.save();
      const offsetY = H / 2 + (Math.random() * 8 - 4);
      ctx.translate(x, offsetY);
      ctx.rotate((Math.random() * 0.4) - 0.2);
      ctx.fillStyle = `hsl(${260 + Math.random() * 40},60%,35%)`;
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
      x += ctx.measureText(text[i]).width + 2;
    }
  }, [captchaAnswer]);

  // Lock body scroll when banner is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Swipe handlers
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      setBannerIdx(prev => diff > 0
        ? (prev + 1) % BANNER_IMAGES.length
        : (prev - 1 + BANNER_IMAGES.length) % BANNER_IMAGES.length
      );
    }
    touchStartX.current = null;
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Enter your full name";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim() || !/^\d{10,}$/.test(form.phone.replace(/[\s\-+]/g, ""))) e.phone = "Enter a valid 10-digit number";
    if (!form.message.trim()) e.message = "Please enter a message";
    if (parseInt(captchaInput) !== captchaAnswer.a + captchaAnswer.b) e.captcha = `Wrong! ${captchaAnswer.a} + ${captchaAnswer.b} = ?`;
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitting(true);
    try {
      await fetch(SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "popup",
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
        }),
      });
    } catch (_) {}
    setSubmitting(false);
    setSubmitted(true);

    // Mark as submitted in localStorage so banner never shows again
    try {
      localStorage.setItem(SUBMITTED_KEY, "true");
    } catch (_) {}

    // Notify the controller that form was submitted
    if (onSubmitted) onSubmitted();

    // Auto-close after showing success message
    setTimeout(() => onClose(), 3000);
  };

  const inputBase = (hasError) => ({
    width: "100%",
    padding: "11px 14px",
    fontSize: "13.5px",
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 500,
    color: "#1a0640",
    background: hasError ? "#fff5f5" : "#f8f5ff",
    border: `1.5px solid ${hasError ? "#ef4444" : "#ddd6fe"}`,
    borderRadius: "10px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s, background 0.2s",
    display: "block",
  });

  return (
    <>
      <style>{`
        @keyframes shimmer { 0%{background-position:0% 50%} 100%{background-position:300% 50%} }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }

        .pb-overlay {
          position: fixed; inset: 0; z-index: 99997;
          background: rgba(8,3,25,0.78);
          backdrop-filter: blur(7px);
        }
        .pb-close {
          position: absolute; z-index: 10;
          top: 10px; right: 10px;
          width: 32px; height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.92);
          border: 2px solid #7c3aed;
          color: #7c3aed;
          font-size: 15px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Outfit',sans-serif;
          line-height: 1;
          box-shadow: 0 2px 12px rgba(0,0,0,0.2);
          transition: background 0.2s, color 0.2s;
        }
        .pb-close:hover { background: #7c3aed; color: #fff; }

        .pb-wrap {
          position: fixed; z-index: 99998;
          top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          display: flex;
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 32px 90px rgba(109,40,217,0.38);
        }
        .pb-left {
          position: relative; overflow: hidden; flex-shrink: 0;
          cursor: grab;
        }
        .pb-left:active { cursor: grabbing; }
        .pb-right {
          flex: 1; background: #fff; position: relative;
          display: flex; flex-direction: column;
        }
        .pb-shimmer {
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg,#7c3aed,#a78bfa,#ff6b35,#7c3aed);
          background-size: 300% 100%;
          animation: shimmer 3s linear infinite;
        }
        .pb-field-wrap { margin-bottom: 9px; }
        .pb-err { font-size: 11px; color: #ef4444; margin-top: 3px; font-family:'Outfit',sans-serif; }
        .pb-submit {
          width: 100%;
          background: linear-gradient(135deg,#ff6b35,#f03e00);
          color: #fff; border: none;
          border-radius: 50px;
          padding: 13px 20px;
          font-size: 14px; font-weight: 800;
          font-family: 'Outfit',sans-serif;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 6px 22px rgba(255,80,0,0.35);
          transition: transform 0.2s, box-shadow 0.2s;
          letter-spacing: 0.3px;
          margin-top: 4px;
        }
        .pb-submit:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(255,80,0,0.48); }
        .pb-submit:disabled { background: #d1d5db; box-shadow: none; cursor: not-allowed; }

        .pb-dots {
          position: absolute; bottom: 10px; left: 50%;
          transform: translateX(-50%); z-index: 5;
          display: flex; gap: 6px;
        }
        .pb-dot {
          width: 8px; height: 8px; border-radius: 50%;
          border: none; padding: 0; cursor: pointer;
          transition: all 0.3s;
        }

        .pb-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          z-index: 5; width: 30px; height: 30px;
          border-radius: 50%; border: none;
          background: rgba(255,255,255,0.85);
          color: #7c3aed; font-size: 14px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          transition: background 0.2s;
          backdrop-filter: blur(4px);
        }
        .pb-arrow:hover { background: #fff; }
        .pb-arrow-l { left: 8px; }
        .pb-arrow-r { right: 8px; }

        @media (min-width: 640px) {
          .pb-wrap {
            width: min(870px, calc(100vw - 40px));
            height: min(510px, calc(100vh - 60px));
            flex-direction: row;
          }
          .pb-left { width: 50%; height: 100%; }
          .pb-right { padding: 30px 28px 26px; overflow-y: auto; }
        }

        @media (max-width: 639px) {
          .pb-wrap {
            width: calc(100vw - 20px);
            max-height: calc(100vh - 30px);
            flex-direction: column;
            border-radius: 16px;
          }
          .pb-left { width: 100%; aspect-ratio: 16/9; flex-shrink: 0; }
          .pb-right { padding: 12px 14px 16px; overflow-y: auto; }
          .pb-field-wrap { margin-bottom: 5px; }
          .pb-mob-compact { padding: 8px 11px !important; font-size: 12.5px !important; }
          .pb-mob-row { display: flex; gap: 6px; }
          .pb-mob-row > .pb-field-wrap { flex: 1; min-width: 0; }
          .pb-arrow { width: 26px; height: 26px; font-size: 12px; }
          .pb-dot { width: 6px; height: 6px; }
        }
      `}</style>

      <div className="pb-overlay" onClick={onClose} />

      <div className="pb-wrap">
        <button className="pb-close" onClick={onClose}>✕</button>

        {/* LEFT — image carousel */}
        <div
          className="pb-left"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div style={{
            position: "absolute", top: "14px", left: "14px", zIndex: 5,
            background: "#ff6b35", color: "#fff",
            fontSize: "10.5px", fontWeight: 800,
            fontFamily: "'Outfit',sans-serif",
            padding: "5px 11px", borderRadius: "20px",
            letterSpacing: "0.06em",
            boxShadow: "0 3px 12px rgba(255,80,0,0.45)",
            animation: "pulse 2s ease-in-out infinite",
          }}>LIMITED OFFER</div>

          {BANNER_IMAGES.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Offer ${idx + 1}`}
              loading="lazy" decoding="async"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                height: "70%",
                objectFit: "contain",
                objectPosition: "center center",
                display: "block",
                opacity: idx === bannerIdx ? 1 : 0,
                transition: "opacity 0.6s ease",
                borderRadius: "12px",
              }}
            />
          ))}

          <button
            className="pb-arrow pb-arrow-l"
            onClick={() => setBannerIdx(prev => (prev - 1 + BANNER_IMAGES.length) % BANNER_IMAGES.length)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <button
            className="pb-arrow pb-arrow-r"
            onClick={() => setBannerIdx(prev => (prev + 1) % BANNER_IMAGES.length)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>

          <div className="pb-dots">
            {BANNER_IMAGES.map((_, idx) => (
              <button
                key={idx}
                className="pb-dot"
                onClick={() => setBannerIdx(idx)}
                style={{
                  background: idx === bannerIdx ? "#fff" : "rgba(255,255,255,0.45)",
                  transform: idx === bannerIdx ? "scale(1.25)" : "scale(1)",
                  boxShadow: idx === bannerIdx ? "0 0 6px rgba(255,255,255,0.6)" : "none",
                }}
              />
            ))}
          </div>

          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: "55%",
            background: "linear-gradient(to top, rgba(60,20,130,0.90) 0%, transparent 100%)",
            zIndex: 2, pointerEvents: "none",
          }} />

          <div style={{
            position: "absolute", bottom: "16px",
            left: 0, right: 0,
            zIndex: 3, textAlign: "center", padding: "0 12px",
            pointerEvents: "none",
          }}>
            <div style={{ fontSize: "26px", fontWeight: 900, color: "#fff", fontFamily: "'Outfit',sans-serif", letterSpacing: "-1px", lineHeight: 1 }}>FREE</div>
            <div style={{ fontSize: "12.5px", fontWeight: 700, color: "rgba(255,255,255,0.92)", fontFamily: "'Outfit',sans-serif", marginTop: "3px" }}>Counseling Session</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", justifyContent: "center", marginTop: "9px" }}>
              {["✓ 100% Placement", "✓ Expert Mentors", "✓ Live Projects", "Internships"].map((b, i) => (
                <span key={i} style={{
                  background: "rgba(255,255,255,0.18)",
                  border: "1px solid rgba(255,255,255,0.30)",
                  color: "#fff", fontSize: "9.5px", fontWeight: 700,
                  fontFamily: "'Outfit',sans-serif",
                  padding: "3px 8px", borderRadius: "20px",
                }}>{b}</span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="pb-right">
          <div className="pb-shimmer" />

          {submitted ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center", padding: "20px 0" }}>
              <div style={{
                width: "58px", height: "58px", borderRadius: "50%",
                background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 14px",
                animation: "pulse 2s ease-in-out infinite",
              }}>
                <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
                  <path d="M7 16l7 7 11-12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{ fontSize: "19px", fontWeight: 900, color: "#1a0640", marginBottom: "7px", fontFamily: "'Outfit',sans-serif" }}>We'll Call You Soon!</h3>
              <p style={{ fontSize: "13px", color: "#6b5a9e", lineHeight: 1.7, fontFamily: "'Outfit',sans-serif" }}>Our counselors will reach you within 24 hours. 🚀</p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: "14px" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  background: "#f3f0ff", border: "1.5px solid #e4d9ff",
                  borderRadius: "8px", padding: "4px 11px",
                  fontSize: "10.5px", color: "#7c3aed", fontWeight: 700,
                  marginBottom: "8px", letterSpacing: "0.08em",
                  fontFamily: "'Outfit',sans-serif",
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#7c3aed">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  BOOK FREE SESSION
                </div>
                <h3 style={{ fontSize: "clamp(16px,2.5vw,20px)", fontWeight: 900, color: "#1a0640", marginBottom: "3px", letterSpacing: "-0.3px", fontFamily: "'Outfit',sans-serif" }}>
                  Get Expert Guidance
                </h3>
                <p style={{ fontSize: "12.5px", color: "#9270c0", fontWeight: 500, fontFamily: "'Outfit',sans-serif" }}>
                  Fill the form — we'll call you within 24 hours.
                </p>
              </div>

              {/* Name */}
              <div className="pb-field-wrap">
                <input
                  className="pb-mob-compact"
                  type="text" placeholder="Your full name"
                  value={form.name}
                  onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: "" })); }}
                  style={inputBase(errors.name)}
                  onFocus={e => { e.target.style.borderColor = "#7c3aed"; e.target.style.background = "#fff"; e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.10)"; }}
                  onBlur={e => { e.target.style.borderColor = errors.name ? "#ef4444" : "#ddd6fe"; e.target.style.background = errors.name ? "#fff5f5" : "#f8f5ff"; e.target.style.boxShadow = "none"; }}
                />
                {errors.name && <div className="pb-err">{errors.name}</div>}
              </div>

              {/* Email */}
              <div className="pb-field-wrap">
                <input
                  className="pb-mob-compact"
                  type="email" placeholder="Email address"
                  value={form.email}
                  onChange={e => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: "" })); }}
                  style={inputBase(errors.email)}
                  onFocus={e => { e.target.style.borderColor = "#7c3aed"; e.target.style.background = "#fff"; e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.10)"; }}
                  onBlur={e => { e.target.style.borderColor = errors.email ? "#ef4444" : "#ddd6fe"; e.target.style.background = errors.email ? "#fff5f5" : "#f8f5ff"; e.target.style.boxShadow = "none"; }}
                />
                {errors.email && <div className="pb-err">{errors.email}</div>}
              </div>

              {/* Phone */}
              <div className="pb-field-wrap">
                <input
                  className="pb-mob-compact"
                  type="tel" placeholder="Phone number (10 digits)"
                  value={form.phone}
                  onChange={e => { setForm(p => ({ ...p, phone: e.target.value })); setErrors(p => ({ ...p, phone: "" })); }}
                  style={inputBase(errors.phone)}
                  onFocus={e => { e.target.style.borderColor = "#7c3aed"; e.target.style.background = "#fff"; e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.10)"; }}
                  onBlur={e => { e.target.style.borderColor = errors.phone ? "#ef4444" : "#ddd6fe"; e.target.style.background = errors.phone ? "#fff5f5" : "#f8f5ff"; e.target.style.boxShadow = "none"; }}
                />
                {errors.phone && <div className="pb-err">{errors.phone}</div>}
              </div>

              {/* Message */}
              <div className="pb-field-wrap">
                <textarea
                  className="pb-mob-compact"
                  placeholder="Message us…"
                  value={form.message}
                  rows={3}
                  onChange={e => { setForm(p => ({ ...p, message: e.target.value })); setErrors(p => ({ ...p, message: "" })); }}
                  style={{ ...inputBase(errors.message), resize: "none" }}
                  onFocus={e => { e.target.style.borderColor = "#7c3aed"; e.target.style.background = "#fff"; e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.10)"; }}
                  onBlur={e => { e.target.style.borderColor = errors.message ? "#ef4444" : "#ddd6fe"; e.target.style.background = errors.message ? "#fff5f5" : "#f8f5ff"; e.target.style.boxShadow = "none"; }}
                />
                {errors.message && <div className="pb-err">{errors.message}</div>}
              </div>

              {/* Captcha */}
              <div className="pb-field-wrap">
                <div style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  background: errors.captcha ? "#fff5f5" : "#f8f5ff",
                  border: `1.5px solid ${errors.captcha ? "#ef4444" : "#ddd6fe"}`,
                  borderRadius: "10px", padding: "6px 10px",
                  transition: "border-color 0.2s",
                }}>
                  <canvas
                    ref={captchaCanvasRef}
                    width={160}
                    height={36}
                    style={{
                      borderRadius: "6px",
                      userSelect: "none",
                      pointerEvents: "none",
                      filter: "contrast(1.1)",
                      flexShrink: 0,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setCaptchaAnswer({ a: Math.floor(Math.random() * 9) + 1, b: Math.floor(Math.random() * 9) + 1 });
                      setCaptchaInput("");
                      setErrors(p => ({ ...p, captcha: "" }));
                    }}
                    title="Refresh CAPTCHA"
                    style={{
                      flexShrink: 0,
                      width: "28px", height: "28px",
                      borderRadius: "50%",
                      border: "1.5px solid #ddd6fe",
                      background: "#fff",
                      cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "#7c3aed";
                      e.currentTarget.style.borderColor = "#7c3aed";
                      e.currentTarget.querySelector("svg").style.stroke = "#fff";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "#fff";
                      e.currentTarget.style.borderColor = "#ddd6fe";
                      e.currentTarget.querySelector("svg").style.stroke = "#7c3aed";
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ stroke: "#7c3aed", transition: "stroke 0.2s" }}>
                      <path d="M1 4v6h6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3.51 15a9 9 0 1 0 .49-3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <input
                    type="number"
                    placeholder="Answer"
                    value={captchaInput}
                    onChange={e => { setCaptchaInput(e.target.value); setErrors(p => ({ ...p, captcha: "" })); }}
                    style={{
                      border: "none",
                      borderLeft: "1.5px solid #ede9fe",
                      background: "transparent",
                      fontSize: "13px",
                      fontFamily: "'Outfit',sans-serif",
                      fontWeight: 700,
                      color: "#1a0640",
                      outline: "none",
                      padding: "4px 8px",
                      width: "80px",
                      flexShrink: 0,
                    }}
                  />
                </div>
                {errors.captcha && <div className="pb-err">{errors.captcha}</div>}
              </div>

              {/* Submit */}
              <button className="pb-submit" onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Submitting…" : "Submit & Book My Session"}
                {!submitting && (
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                    <path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default PromoBanner;