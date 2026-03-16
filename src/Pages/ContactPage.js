import { useState, useEffect, useRef } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    id: 1,
    name: "Aria Zinanrio",
    role: "AI Medical Coder",
    company: "Apollo Healthcare",
    avatar: "abtimg1.jpg",
    text: "Skillra's AI Medical Coding course completely transformed my career trajectory. The curriculum was practical, industry-aligned, and the placement team genuinely cared about my success. I landed a role within 3 weeks of completing the program.",
  },
  {
    id: 2,
    name: "Ravi Kumar",
    role: "Full Stack Developer",
    company: "Zoho Corporation",
    avatar: "abtimg2.jpg",
    text: "The Full Stack course at Skillra is world-class. Hands-on projects with real mentorship and structured interview preparation made all the difference. I transitioned from a fresher to a working developer in under two months.",
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "Financial Analyst",
    company: "HDFC Bank",
    avatar: "abtimg3.jpg",
    text: "Skillra's Finance program is structured perfectly for career switchers. The Tally & GST module alone was worth every rupee. My confidence during interviews completely transformed after completing this course.",
  },
  {
    id: 4,
    name: "Mohammed Farhan",
    role: "Data Analyst",
    company: "Infosys",
    avatar: "abtimg1.jpg",
    text: "Practical assignments, weekly mentorship, and a placement team that genuinely follows through — Skillra delivers on every promise. The Data Analytics curriculum was exactly what the industry demands.",
  },
];

const COURSES = [
  "AI Medical Coding", "AI Medical Billing", "AI Medical Scribing",
  "Full Stack Development", "Data Analytics", "UI/UX Design",
  "SAP Development", "Tally & GST", "Financial Accounting",
];

const CONTACT_INFO = [
  {
    label: "Phone",
    value: "+91 98765 43210",
    sub: "Mon – Sat, 9 AM – 6 PM",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Email",
    value: "info@skillra.com",
    sub: "We reply within 24 hours",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M2 8l10 6 10-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Coimbatore, Tamil Nadu",
    sub: "India – 641 001",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    label: "Working Hours",
    value: "Mon – Saturday",
    sub: "9:00 AM to 6:00 PM IST",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

/* ═══════════════════════════════════════════════════
   useInView HOOK
═══════════════════════════════════════════════════ */
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
   SECTION LABEL
═══════════════════════════════════════════════════ */
function SectionLabel({ text }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "8px",
      background: "#fff", border: "1.5px solid #e4d9ff",
      borderRadius: "9px", padding: "7px 16px",
      fontSize: "11.5px", color: "#3b1f7a", fontWeight: 700,
      marginBottom: "18px",
      boxShadow: "0 2px 12px rgba(124,58,237,0.09)",
      letterSpacing: "0.1em",
    }}>
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7c3aed", display: "inline-block" }} />
      {text}
    </div>
  );
}

const GridBg = () => (
  <div style={{
    position: "absolute", inset: 0, pointerEvents: "none",
    backgroundImage: `linear-gradient(rgba(124,58,237,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.035) 1px,transparent 1px)`,
    backgroundSize: "32px 32px",
  }} />
);

/* ═══════════════════════════════════════════════════
   INPUT FIELD
═══════════════════════════════════════════════════ */
function InputField({ label, type = "text", value, onChange, error }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative", marginBottom: "14px" }}>
      <input
        type={type} value={value} onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={label}
        style={{
          width: "100%", padding: "13px 18px",
          fontSize: "14px", fontFamily: "'Outfit', sans-serif", fontWeight: 500,
          color: "#1a0640",
          background: error ? "#fff8f8" : focused ? "#fff" : "#f8f5ff",
          border: error
            ? "1.5px solid #ef4444"
            : focused ? "1.5px solid #7c3aed"
            : "1.5px solid #e4d9ff",
          borderRadius: "12px", outline: "none",
          transition: "all 0.25s ease",
          boxShadow: focused ? "0 0 0 4px rgba(124,58,237,0.09)" : "none",
        }}
      />
      {error && (
        <span style={{
          position: "absolute", right: "14px", top: "50%",
          transform: "translateY(-50%)",
          color: "#ef4444", fontSize: "11px", fontWeight: 700,
        }}>
          {error}
        </span>
      )}
    </div>
  );
}

function SelectField({ value, onChange, error }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative", marginBottom: "22px" }}>
      <select
        value={value} onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%", padding: "13px 18px",
          fontSize: "14px", fontFamily: "'Outfit', sans-serif", fontWeight: 500,
          color: value ? "#1a0640" : "#9270c0",
          background: focused ? "#fff" : "#f8f5ff",
          border: error
            ? "1.5px solid #ef4444"
            : focused ? "1.5px solid #7c3aed"
            : "1.5px solid #e4d9ff",
          borderRadius: "12px", outline: "none", cursor: "pointer",
          appearance: "none", WebkitAppearance: "none",
          transition: "all 0.25s ease",
          boxShadow: focused ? "0 0 0 4px rgba(124,58,237,0.09)" : "none",
        }}
      >
        <option value="">Select a Course</option>
        {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      <div style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 6l4 4 4-4" stroke="#9270c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function TextAreaField({ label, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative", marginBottom: "14px" }}>
      <textarea
        value={value} onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={label}
        rows={4}
        style={{
          width: "100%", padding: "13px 18px",
          fontSize: "14px", fontFamily: "'Outfit', sans-serif", fontWeight: 500,
          color: "#1a0640",
          background: focused ? "#fff" : "#f8f5ff",
          border: focused ? "1.5px solid #7c3aed" : "1.5px solid #e4d9ff",
          borderRadius: "12px", outline: "none", resize: "vertical",
          transition: "all 0.25s ease",
          boxShadow: focused ? "0 0 0 4px rgba(124,58,237,0.09)" : "none",
          minHeight: "100px",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   NEWSLETTER
═══════════════════════════════════════════════════ */
function NewsletterSection() {
  const [ref, inView] = useInView(0.3);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleSubscribe = () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setTimeout(() => setEmailError(false), 800);
      return;
    }
    setSubscribing(true);
    setTimeout(() => { setSubscribing(false); setSubscribed(true); }, 1400);
  };

  return (
    <div ref={ref} style={{ background: "linear-gradient(135deg,#1a0a3c,#2d1b69,#1a0a3c)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(167,139,250,0.08) 1px,transparent 1px)", backgroundSize: "22px 22px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,#7c3aed,#a78bfa,#7c3aed)", backgroundSize: "200% 100%", animation: "shimmer 3s linear infinite" }} />
      <div style={{
        maxWidth: "1200px", margin: "0 auto", padding: "40px 6%",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "36px", flexWrap: "wrap", position: "relative", zIndex: 1,
        opacity: inView ? 1 : 0, transition: "opacity 0.8s ease",
      }}>
        <div>
          <h2 style={{ fontSize: "clamp(1.2rem,2.2vw,1.6rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "6px", fontFamily: "'Outfit',sans-serif" }}>Join Our Newsletter</h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", fontWeight: 500, fontFamily: "'Outfit',sans-serif" }}>Get latest updates, course launches &amp; career tips.</p>
        </div>
        {subscribed ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.10)", border: "1.5px solid rgba(255,255,255,0.18)", borderRadius: "12px", padding: "12px 20px" }}>
            <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
            </div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "14px", fontFamily: "'Outfit',sans-serif" }}>You're subscribed!</span>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <input
              type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubscribe()}
              placeholder="Enter your email"
              style={{
                height: "46px", width: "clamp(200px,26vw,300px)", padding: "0 16px",
                fontSize: "14px", fontFamily: "'Outfit',sans-serif", fontWeight: 500,
                color: "#1a0640",
                background: emailError ? "rgba(254,202,202,0.95)" : "rgba(255,255,255,0.96)",
                border: emailError ? "1.5px solid #fca5a5" : "1.5px solid rgba(255,255,255,0.5)",
                borderRadius: "10px", outline: "none",
                transition: "all 0.25s",
                animation: emailError ? "shakeX 0.5s ease" : "none",
              }}
            />
            <button
              onClick={handleSubscribe} disabled={subscribing}
              style={{
                height: "46px", background: "linear-gradient(135deg,#7c3aed,#5b21b6)", color: "#fff",
                border: "none", borderRadius: "10px", padding: "0 24px",
                fontSize: "13.5px", fontWeight: 700, fontFamily: "'Outfit',sans-serif",
                cursor: "pointer", whiteSpace: "nowrap",
                display: "flex", alignItems: "center", gap: "8px",
                transition: "all 0.22s", boxShadow: "0 4px 16px rgba(124,58,237,0.4)",
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {subscribing ? "Subscribing…" : "Subscribe"}
              {!subscribing && <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════════════ */
function ContactHero({ visible }) {
  return (
    <section style={{
      background: "radial-gradient(ellipse 80% 60% at 70% 40%,rgba(167,139,250,0.16) 0%,transparent 65%),#faf8ff",
      padding: "clamp(80px,10vw,120px) 6% clamp(60px,7vw,80px)",
      position: "relative", overflow: "hidden",
    }}>
      <GridBg />
      {/* Large decorative watermark */}
      <div style={{
        position: "absolute", right: "-2%", top: "50%", transform: "translateY(-50%)",
        fontSize: "clamp(80px,14vw,180px)", fontWeight: 900,
        color: "rgba(124,58,237,0.04)", lineHeight: 1,
        userSelect: "none", letterSpacing: "-6px", pointerEvents: "none",
      }}>CONTACT</div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "all 0.9s cubic-bezier(.4,0,.2,1)",
        }}>
          <SectionLabel text="CONTACT US" />
          <h1 style={{
            fontSize: "clamp(2.4rem,5vw,3.8rem)", fontWeight: 900,
            color: "#120630", lineHeight: 1.06, letterSpacing: "-2.5px",
            marginBottom: "20px", maxWidth: "700px",
          }}>
            Let's Start a<br />
            <span style={{ color: "#7c3aed" }}>Conversation</span>
          </h1>
          <p style={{
            fontSize: "clamp(14px,1.4vw,16px)", color: "#5c4a80",
            lineHeight: 1.85, maxWidth: "520px", fontWeight: 500,
          }}>
            Whether you're exploring a career change, looking for placement support, or want to know which course is right for you — our counselors are ready to guide you.
          </p>
        </div>

        {/* Quick stat strip */}
        <div style={{
          display: "flex", gap: "clamp(16px,3vw,32px)", flexWrap: "wrap",
          marginTop: "clamp(32px,5vw,48px)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.9s ease 0.25s",
        }}>
          {[
            { num: "500+", label: "Students Counselled" },
            { num: "< 24h", label: "Response Time" },
            { num: "98%", label: "Placement Rate" },
            { num: "50+", label: "Hiring Partners" },
          ].map((s, i) => (
            <div key={i} style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: `all 0.7s ease ${0.3 + i * 0.09}s`,
            }}>
              <div style={{ fontSize: "clamp(1.6rem,2.2vw,2rem)", fontWeight: 900, color: "#7c3aed", lineHeight: 1, letterSpacing: "-1px" }}>{s.num}</div>
              <div style={{ fontSize: "11.5px", color: "#9270c0", marginTop: "3px", fontWeight: 600, letterSpacing: "0.04em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CONTACT INFO CARDS
═══════════════════════════════════════════════════ */
function ContactInfoSection() {
  const [ref, inView] = useInView(0.1);
  return (
    <section ref={ref} style={{ padding: "0 6% clamp(48px,7vw,80px)", background: "#faf8ff", position: "relative" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "16px",
        }}>
          {CONTACT_INFO.map((item, i) => (
            <div key={i} style={{
              background: "#fff", border: "1.5px solid #e4d9ff",
              borderRadius: "20px", padding: "clamp(20px,2.5vw,28px)",
              boxShadow: "0 4px 18px rgba(124,58,237,0.06)",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: `all 0.7s ease ${i * 0.09}s`,
              cursor: "default",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "#7c3aed";
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(124,58,237,0.13)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "#e4d9ff";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 18px rgba(124,58,237,0.06)";
              }}
            >
              <div style={{
                width: "44px", height: "44px", borderRadius: "12px",
                background: "linear-gradient(135deg,rgba(124,58,237,0.10),rgba(167,139,250,0.18))",
                border: "1.5px solid rgba(124,58,237,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#7c3aed", marginBottom: "16px",
              }}>
                {item.icon}
              </div>
              <div style={{ fontSize: "11px", fontWeight: 800, color: "#9270c0", letterSpacing: "0.12em", marginBottom: "6px", textTransform: "uppercase" }}>{item.label}</div>
              <div style={{ fontSize: "clamp(13px,1.2vw,15px)", fontWeight: 800, color: "#1a1035", marginBottom: "3px", letterSpacing: "-0.02em" }}>{item.value}</div>
              <div style={{ fontSize: "12px", color: "#9270c0", fontWeight: 500 }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN FORM + TESTIMONIALS
═══════════════════════════════════════════════════ */
function ContactFormSection() {
  const [ref, inView] = useInView(0.08);

  const [activeIdx, setActiveIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const [form, setForm] = useState({ name: "", email: "", phone: "", course: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setAnimating(true);
      setTimeout(() => { setActiveIdx(i => (i + 1) % TESTIMONIALS.length); setAnimating(false); }, 350);
    }, 5500);
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = i => {
    clearInterval(timerRef.current);
    setAnimating(true);
    setTimeout(() => { setActiveIdx(i); setAnimating(false); }, 280);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid";
    if (!form.phone.trim() || form.phone.length < 8) e.phone = "Invalid";
    if (!form.course) e.course = "Pick one";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1400);
  };

  const t = TESTIMONIALS[activeIdx];

  return (
    <section ref={ref} style={{ padding: "clamp(48px,7vw,80px) 6%", background: "#fff", borderTop: "1px solid #f0ebff", position: "relative" }}>
      <GridBg />
      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Section heading */}
        <div style={{
          marginBottom: "clamp(32px,5vw,52px)",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease",
        }}>
          <SectionLabel text="GET IN TOUCH" />
          <h2 style={{ fontSize: "clamp(1.8rem,3.2vw,2.6rem)", fontWeight: 900, color: "#120630", letterSpacing: "-0.03em", marginBottom: "10px" }}>
            We'd Love to <span style={{ color: "#7c3aed" }}>Hear From You</span>
          </h2>
          <p style={{ fontSize: "clamp(13px,1.2vw,15px)", color: "#9270c0", maxWidth: "460px", lineHeight: 1.75, fontWeight: 500 }}>
            Fill out the form and a Skillra counselor will reach out within 24 hours to guide you on the right path.
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{ display: "flex", gap: "clamp(24px,4vw,56px)", alignItems: "flex-start", flexWrap: "wrap" }}>

          {/* ── LEFT: Testimonial + Avatars + Stats ── */}
          <div style={{
            flex: "0 0 auto", width: "clamp(280px,36%,440px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(-32px)",
            transition: "all 0.95s cubic-bezier(.4,0,.2,1) 0.1s",
          }}>

            {/* Testimonial card */}
            <div style={{
              background: "#fff", borderRadius: "24px",
              padding: "clamp(24px,3vw,36px) clamp(20px,2.5vw,32px)",
              border: "1.5px solid #e4d9ff",
              boxShadow: "0 8px 32px rgba(124,58,237,0.09)",
              position: "relative", overflow: "hidden", marginBottom: "20px",
              transition: "box-shadow 0.3s, transform 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 24px 60px rgba(124,58,237,0.14)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(124,58,237,0.09)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {/* Top shimmer */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg,#7c3aed,#a78bfa,#7c3aed)", backgroundSize: "200% 100%", animation: "shimmer 3s infinite" }} />

              {/* Quote mark */}
              <div style={{ marginBottom: "18px" }}>
                <svg width="36" height="28" viewBox="0 0 44 36" fill="none">
                  <path d="M0 36V22.5C0 14.9 4.1 8.6 12.3 3.6L15.6 7.4C11.9 9.8 9.5 13.2 8.4 17.7H16V36H0ZM28 36V22.5C28 14.9 32.1 8.6 40.3 3.6L43.6 7.4C39.9 9.8 37.5 13.2 36.4 17.7H44V36H28Z" fill="rgba(124,58,237,0.18)" />
                </svg>
              </div>

              {/* Quote text */}
              <p style={{
                fontSize: "clamp(13px,1.1vw,14.5px)", lineHeight: 1.8,
                color: "#3b2a6e", minHeight: "90px", marginBottom: "20px",
                opacity: animating ? 0 : 1,
                transform: animating ? "translateY(8px)" : "translateY(0)",
                transition: "all 0.3s ease",
              }}>
                {t.text}
              </p>

              {/* Author */}
              <div style={{
                opacity: animating ? 0 : 1,
                transition: "all 0.3s ease",
                display: "flex", alignItems: "center", gap: "12px",
              }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  overflow: "hidden", border: "2px solid #e4d9ff", flexShrink: 0,
                }}>
                  <img src={t.avatar} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={e => { e.target.style.display = "none"; e.target.parentNode.style.background = "rgba(124,58,237,0.12)"; }} />
                </div>
                <div>
                  <div style={{ fontSize: "13.5px", fontWeight: 800, color: "#7c3aed" }}>{t.name}</div>
                  <div style={{ fontSize: "11.5px", color: "#9270c0", fontWeight: 600 }}>{t.role} · {t.company}</div>
                </div>
              </div>
            </div>

            {/* Avatar dots nav */}
            <div style={{ padding: "0 4px", marginBottom: "24px" }}>
              <div style={{ fontSize: "10.5px", fontWeight: 700, color: "#9270c0", letterSpacing: "0.12em", marginBottom: "12px" }}>HAPPY STUDENTS</div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                {TESTIMONIALS.map((item, i) => (
                  <div
                    key={item.id} onClick={() => goTo(i)}
                    style={{
                      width: "40px", height: "40px", borderRadius: "50%",
                      overflow: "hidden", cursor: "pointer",
                      border: i === activeIdx ? "3px solid #7c3aed" : "3px solid #e4d9ff",
                      transform: i === activeIdx ? "scale(1.12)" : "scale(1)",
                      transition: "all 0.28s cubic-bezier(.4,0,.2,1)",
                      boxShadow: i === activeIdx ? "0 4px 18px rgba(124,58,237,0.35)" : "none",
                    }}
                  >
                    <img src={item.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={e => { e.target.style.display = "none"; e.target.parentNode.style.background = "rgba(124,58,237,0.12)"; }} />
                  </div>
                ))}
                {/* Next arrow */}
                <div
                  onClick={() => goTo((activeIdx + 1) % TESTIMONIALS.length)}
                  style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    border: "2px solid #c4b5fd", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(124,58,237,0.08)"; e.currentTarget.style.transform = "scale(1.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "scale(1)"; }}
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M4 2.5l6 4.5-6 4.5" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Mini stats */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {[{ num: "100+", label: "Students Placed" }, { num: "15+", label: "Yrs Experience" }, { num: "50+", label: "Partners" }].map((s, i) => (
                <div key={i} style={{
                  flex: "1 1 80px", background: "#faf8ff", border: "1.5px solid #e4d9ff",
                  borderRadius: "14px", padding: "clamp(10px,1.5vw,14px) 10px", textAlign: "center",
                  transition: "all 0.22s", cursor: "default",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg,#7c3aed,#5b21b6)"; e.currentTarget.querySelector(".mn").style.color = "#fff"; e.currentTarget.querySelector(".ml").style.color = "rgba(255,255,255,0.75)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#faf8ff"; e.currentTarget.querySelector(".mn").style.color = "#7c3aed"; e.currentTarget.querySelector(".ml").style.color = "#9270c0"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div className="mn" style={{ fontSize: "clamp(16px,1.6vw,20px)", fontWeight: 900, color: "#7c3aed", lineHeight: 1, transition: "color 0.22s" }}>{s.num}</div>
                  <div className="ml" style={{ fontSize: "10px", color: "#9270c0", marginTop: "3px", fontWeight: 600, transition: "color 0.22s" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div style={{
            flex: 1, minWidth: "min(100%, 300px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(32px)",
            transition: "all 0.95s cubic-bezier(.4,0,.2,1) 0.22s",
          }}>
            <div style={{
              background: "#fff", borderRadius: "28px",
              padding: "clamp(28px,4vw,44px) clamp(24px,3.5vw,40px)",
              border: "1.5px solid #e4d9ff",
              boxShadow: "0 16px 56px rgba(124,58,237,0.11)",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg,#7c3aed,#a78bfa,#7c3aed)", backgroundSize: "200% 100%", animation: "shimmer 3s infinite" }} />

              {submitted ? (
                <div style={{ textAlign: "center", padding: "clamp(20px,4vw,32px) 0" }}>
                  <div style={{
                    width: "68px", height: "68px", borderRadius: "50%",
                    background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 20px",
                    boxShadow: "0 8px 28px rgba(124,58,237,0.35)",
                    animation: "popIn 0.5s cubic-bezier(.4,0,.2,1) both",
                  }}>
                    <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
                      <path d="M7 16l7 7 11-12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: "clamp(18px,2vw,22px)", fontWeight: 800, color: "#1a0640", marginBottom: "10px" }}>Message Sent!</h3>
                  <p style={{ fontSize: "clamp(12px,1.1vw,14px)", color: "#6b5a9e", lineHeight: 1.75 }}>
                    Thank you for reaching out.<br />Our counselors will contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", course: "", message: "" }); }}
                    style={{
                      marginTop: "24px", background: "none", border: "1.5px solid #7c3aed",
                      color: "#7c3aed", borderRadius: "50px", padding: "10px 28px",
                      fontSize: "13px", fontWeight: 700, cursor: "pointer",
                      fontFamily: "'Outfit',sans-serif", transition: "all 0.2s",
                    }}
                    onMouseEnter={e => { e.target.style.background = "#7c3aed"; e.target.style.color = "#fff"; }}
                    onMouseLeave={e => { e.target.style.background = "none"; e.target.style.color = "#7c3aed"; }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 900, color: "#1a0640", marginBottom: "6px", letterSpacing: "-0.4px" }}>
                    We're here to help
                  </h3>
                  <p style={{ fontSize: "clamp(12px,1.1vw,13.5px)", color: "#9270c0", marginBottom: "clamp(20px,3vw,28px)", fontWeight: 500 }}>
                    Tell us about yourself and what you're looking for.
                  </p>

                  {/* Two-column name + phone on wider screens */}
                  <div className="form-row" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <div style={{ flex: "1 1 180px" }}>
                      <InputField label="Your full name" value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }} error={errors.name} />
                    </div>
                    <div style={{ flex: "1 1 180px" }}>
                      <InputField label="Phone number" type="tel" value={form.phone} onChange={e => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: "" }); }} error={errors.phone} />
                    </div>
                  </div>

                  <InputField label="Email address" type="email" value={form.email} onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }} error={errors.email} />
                  <SelectField value={form.course} onChange={e => { setForm({ ...form, course: e.target.value }); setErrors({ ...errors, course: "" }); }} error={errors.course} />
                  <TextAreaField label="Your message (optional)" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginTop: "8px" }}>
                    <button
                      onClick={handleSubmit} disabled={submitting}
                      className="submit-btn"
                      style={{
                        background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
                        color: "#fff", border: "none", borderRadius: "50px",
                        padding: "clamp(12px,1.5vw,14px) clamp(24px,3vw,32px)",
                        fontSize: "clamp(13px,1.2vw,15px)", fontWeight: 700,
                        fontFamily: "'Outfit',sans-serif", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: "10px",
                        boxShadow: "0 6px 20px rgba(124,58,237,0.30)",
                        transition: "transform 0.22s, box-shadow 0.22s",
                        letterSpacing: "0.3px",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(124,58,237,0.45)"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(124,58,237,0.30)"; }}
                    >
                      {submitting ? (
                        <>
                          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" style={{ animation: "spinRing 0.8s linear infinite" }}>
                            <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" />
                            <path d="M9 2a7 7 0 0 1 7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Get in Touch
                          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                            <path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </>
                      )}
                    </button>
                    <p style={{ fontSize: "11.5px", color: "#b0a0cc", fontWeight: 500, maxWidth: "200px", lineHeight: 1.5 }}>
                      We respect your privacy. No spam, ever.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   MAP / LOCATION SECTION
═══════════════════════════════════════════════════ */
function LocationSection() {
  const [ref, inView] = useInView(0.1);
  return (
    <section ref={ref} style={{ padding: "clamp(48px,7vw,80px) 6%", background: "#faf8ff", borderTop: "1px solid #f0ebff", position: "relative" }}>
      <GridBg />
      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{
          marginBottom: "clamp(28px,4vw,44px)",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease",
        }}>
          <SectionLabel text="FIND US" />
          <h2 style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)", fontWeight: 900, color: "#120630", letterSpacing: "-0.03em" }}>
            Visit Our <span style={{ color: "#7c3aed" }}>Campus</span>
          </h2>
        </div>

        <div style={{ display: "flex", gap: "clamp(20px,3.5vw,40px)", alignItems: "stretch", flexWrap: "wrap" }}>
          {/* Map placeholder */}
          <div style={{
            flex: "1 1 300px", borderRadius: "24px", overflow: "hidden",
            background: "linear-gradient(145deg,#ede9ff,#f5f0ff)",
            border: "1.5px solid #e4d9ff",
            minHeight: "clamp(220px,35vw,320px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",
            opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-28px)",
            transition: "all 0.9s cubic-bezier(.4,0,.2,1) 0.1s",
          }}>
            {/* Stylised map grid */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(124,58,237,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.06) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
            <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
              <div style={{
                width: "56px", height: "56px", borderRadius: "50%",
                background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
                boxShadow: "0 0 0 12px rgba(124,58,237,0.14), 0 8px 24px rgba(124,58,237,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px",
                animation: "pinPulse 2.4s ease-in-out infinite",
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="white" />
                  <circle cx="12" cy="9" r="2.5" fill="#7c3aed" />
                </svg>
              </div>
              <div style={{ fontWeight: 800, fontSize: "15px", color: "#1a1035", marginBottom: "4px" }}>Skillra — Coimbatore</div>
              <div style={{ fontSize: "12.5px", color: "#7c3aed", fontWeight: 600 }}>Tamil Nadu, India · 641 001</div>
            </div>
          </div>

          {/* Address details */}
          <div style={{
            flex: "0 0 auto", width: "clamp(260px,32%,340px)",
            display: "flex", flexDirection: "column", gap: "14px",
            opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(28px)",
            transition: "all 0.9s cubic-bezier(.4,0,.2,1) 0.2s",
          }}>
            {[
              {
                heading: "Main Campus",
                lines: ["Ground Floor, Tech Park Building", "Peelamedu, Coimbatore", "Tamil Nadu — 641 004"],
              },
              {
                heading: "Working Hours",
                lines: ["Monday to Saturday", "9:00 AM – 6:00 PM IST", "Sundays & Holidays: Closed"],
              },
              {
                heading: "Reach Us",
                lines: ["+91 98765 43210", "info@skillra.com", "www.skillra.com"],
              },
            ].map((block, i) => (
              <div key={i} style={{
                background: "#fff", border: "1.5px solid #e4d9ff",
                borderRadius: "16px", padding: "clamp(16px,2vw,20px) clamp(16px,2vw,22px)",
                boxShadow: "0 4px 14px rgba(124,58,237,0.06)",
                transition: "all 0.22s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#7c3aed"; e.currentTarget.style.transform = "translateX(4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e4d9ff"; e.currentTarget.style.transform = "translateX(0)"; }}
              >
                <div style={{ fontSize: "10.5px", fontWeight: 800, color: "#7c3aed", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "8px" }}>{block.heading}</div>
                {block.lines.map((l, j) => (
                  <div key={j} style={{ fontSize: "clamp(12px,1.1vw,13.5px)", color: j === 0 ? "#1a1035" : "#6b5a9e", fontWeight: j === 0 ? 700 : 500, lineHeight: 1.65 }}>{l}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FAQ SECTION
═══════════════════════════════════════════════════ */
const FAQS = [
  { q: "How long does it take to get a response after submitting the form?", a: "Our counselors respond within 24 hours on working days. For urgent queries, you can call us directly at +91 98765 43210." },
  { q: "Do I need prior experience to enrol in a course?", a: "Most of our programs are designed for beginners and career switchers. Some technology courses may benefit from basic computer literacy, but no prior domain experience is required." },
  { q: "Is placement support guaranteed for all courses?", a: "Yes. All courses at Skillra come with 100% placement assistance. This includes resume building, mock interviews, job referrals, and active employer connects." },
  { q: "Can I attend a demo session before enrolling?", a: "Absolutely. We offer free demo classes for all our courses. Simply contact us and we'll schedule a session at your convenience." },
  { q: "Are the certifications recognised by employers?", a: "Yes. Our certifications are tamper-proof, digitally verifiable, and recognised by 50+ hiring partners across healthcare, technology, and finance sectors." },
];

function FAQSection() {
  const [ref, inView] = useInView(0.08);
  const [open, setOpen] = useState(null);

  return (
    <section ref={ref} style={{ padding: "clamp(48px,7vw,80px) 6%", background: "#fff", borderTop: "1px solid #f0ebff", position: "relative" }}>
      <GridBg />
      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{
          marginBottom: "clamp(28px,4vw,48px)",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease",
        }}>
          <SectionLabel text="FAQ" />
          <h2 style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)", fontWeight: 900, color: "#120630", letterSpacing: "-0.03em", marginBottom: "10px" }}>
            Common <span style={{ color: "#7c3aed" }}>Questions</span>
          </h2>
          <p style={{ fontSize: "clamp(13px,1.2vw,15px)", color: "#9270c0", maxWidth: "420px", lineHeight: 1.75, fontWeight: 500 }}>
            Everything you need to know before reaching out.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{
              background: open === i ? "#faf8ff" : "#fff",
              border: `1.5px solid ${open === i ? "#7c3aed" : "#e4d9ff"}`,
              borderRadius: "16px", overflow: "hidden",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.7s ease ${i * 0.07}s, transform 0.7s ease ${i * 0.07}s, border-color 0.25s, background 0.25s`,
              boxShadow: open === i ? "0 8px 28px rgba(124,58,237,0.10)" : "none",
            }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", background: "none", border: "none",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "clamp(16px,2vw,20px) clamp(18px,2.5vw,24px)",
                  cursor: "pointer", textAlign: "left", gap: "16px",
                }}
              >
                <span style={{ fontSize: "clamp(13.5px,1.2vw,15px)", fontWeight: 700, color: "#1a1035", lineHeight: 1.4, flex: 1 }}>{faq.q}</span>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "8px",
                  background: open === i ? "#7c3aed" : "rgba(124,58,237,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, transition: "all 0.28s ease",
                }}>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none"
                    style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.28s ease" }}>
                    <path d="M2 4l5 5 5-5" stroke={open === i ? "#fff" : "#7c3aed"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
              <div style={{
                maxHeight: open === i ? "200px" : "0",
                overflow: "hidden",
                transition: "max-height 0.38s cubic-bezier(.4,0,.2,1)",
              }}>
                <p style={{
                  padding: "0 clamp(18px,2.5vw,24px) clamp(16px,2vw,20px)",
                  fontSize: "clamp(13px,1.1vw,14px)", color: "#5c4a80",
                  lineHeight: 1.82, fontWeight: 500,
                }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE ROOT
═══════════════════════════════════════════════════ */
export default function ContactPage() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);

  return (
    <div style={{ fontFamily: "'Outfit','Segoe UI',sans-serif", margin: 0, padding: 0, paddingTop: "62px", overflowX: "hidden", background: "#faf8ff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; }

        @keyframes shimmer   { 0%{background-position:-200% center}100%{background-position:200% center} }
        @keyframes spinRing  { from{transform:rotate(0deg)}to{transform:rotate(360deg)} }
        @keyframes popIn     { 0%{transform:scale(0.6);opacity:0}70%{transform:scale(1.1)}100%{transform:scale(1);opacity:1} }
        @keyframes shakeX    { 0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)} }
        @keyframes pinPulse  { 0%,100%{box-shadow:0 0 0 0 rgba(124,58,237,0.35)}50%{box-shadow:0 0 0 16px rgba(124,58,237,0)} }

        .mn, .ml { transition: color 0.22s; }

        /* Responsive overrides */
        @media (max-width: 768px) {
          .form-row > div { flex: 1 1 100% !important; }
        }
        @media (max-width: 600px) {
          section { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>

      <NavBar />
      <ContactHero visible={visible} />
      <ContactInfoSection />
      <ContactFormSection />
      <LocationSection />
      <FAQSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}