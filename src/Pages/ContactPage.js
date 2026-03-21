import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
const PUB = process.env.PUBLIC_URL || "";

/* ═══════════════════════════════════════════════════
   useInView hook
═══════════════════════════════════════════════════ */
function useInView(threshold = 0.3) {
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

/* ═══════════════════════════════════════════════════
   Floating particles
═══════════════════════════════════════════════════ */
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  size: 6 + (i * 7) % 12,
  left: (i * 6.25) % 100,
  delay: (i * 1.3) % 9,
  duration: 14 + (i * 2.1) % 10,
}));

/* ═══════════════════════════════════════════════════
   Form validators
═══════════════════════════════════════════════════ */
const VALIDATORS = {
  name:        v => v.trim().length < 2  ? "Name must be at least 2 characters"  : "",
  email:       v => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "Enter a valid email address" : "",
  phone:       v => !/^[+]?[\d\s\-().]{7,15}$/.test(v.trim()) ? "Enter a valid phone number" : "",
  description: v => v.trim().length < 10 ? "Message must be at least 10 characters" : "",
};

/* ═══════════════════════════════════════════════════
   Field component
═══════════════════════════════════════════════════ */
const Field = ({ label, type = "text", value, onChange, textarea, error, touched }) => {
  const [focus, setFocus] = useState(false);
  const hasErr = touched && error;
  const isOk   = touched && !error && value.length > 0;

  const borderColor = hasErr ? "#ef4444" : isOk ? "#22c55e" : focus ? "#7C3AED" : "#e2e8f0";
  const shadowColor = hasErr ? "rgba(239,68,68,.13)" : isOk ? "rgba(34,197,94,.12)" : focus ? "rgba(124,58,237,.12)" : "none";

  const inputStyle = {
    width: "100%",
    height: textarea ? "auto" : "48px",
    padding: textarea ? "12px 40px 12px 14px" : "0 40px 0 14px",
    fontSize: "14px",
    fontFamily: "'Poppins', sans-serif",
    color: "#1a0640",
    background: hasErr ? "#fff8f8" : isOk ? "#f0fdf4" : "#fafafa",
    border: `1.5px solid ${borderColor}`,
    borderRadius: "10px",
    outline: "none",
    boxSizing: "border-box",
    resize: "none",
    transition: "border-color .18s, box-shadow .18s, background .18s",
    boxShadow: `0 0 0 3px ${shadowColor}`,
    display: "block",
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{
        display: "flex", alignItems: "center", gap: "4px",
        fontSize: "11px", fontWeight: 700,
        letterSpacing: ".06em", textTransform: "uppercase",
        color: hasErr ? "#ef4444" : isOk ? "#16a34a" : focus ? "#7C3AED" : "#64748b",
        fontFamily: "'Poppins', sans-serif",
        marginBottom: "6px", transition: "color .18s",
      }}>
        {label}<span style={{ color: "#ef4444", fontSize: "13px" }}>*</span>
      </label>
      <div style={{ position: "relative" }}>
        {textarea
          ? <textarea rows={3} value={value} onChange={onChange}
              onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
              style={inputStyle} />
          : <input type={type} value={value} onChange={onChange}
              onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
              style={inputStyle} />
        }
        {(hasErr || isOk) && (
          <div style={{
            position: "absolute", right: "13px",
            top: textarea ? "12px" : "50%",
            transform: textarea ? "none" : "translateY(-50%)",
            fontSize: "16px", lineHeight: 1,
            color: hasErr ? "#ef4444" : "#22c55e",
            pointerEvents: "none",
          }}>
            {hasErr ? "✕" : "✓"}
          </div>
        )}
      </div>
      <div style={{
        overflow: "hidden",
        maxHeight: hasErr ? "24px" : "0px",
        opacity: hasErr ? 1 : 0,
        transition: "max-height .22s ease, opacity .2s ease",
        marginTop: "4px",
      }}>
        <p style={{
          margin: 0, fontSize: "11.5px", color: "#ef4444",
          fontFamily: "'Poppins', sans-serif",
          display: "flex", alignItems: "center", gap: "4px",
        }}>
          <span style={{ fontSize: "12px" }}>⚠</span> {error}
        </p>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   Social Sidebar — hidden on mobile, fixed on desktop
═══════════════════════════════════════════════════ */
const SIDEBAR_SOCIALS = [
  {
    label: "Facebook", url: "https://www.facebook.com/skillratechnologies/",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  },
  {
    label: "LinkedIn", url: "https://www.linkedin.com/company/skillra-technologies/",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  {
    label: "X (Twitter)", url: "https://x.com/skillra_tech",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M4 4l16 16M4 20L20 4"/></svg>,
  },
];

function SocialSidebar() {
  return (
    <>
      <style>{`
        .skl-sidebar {
          position: fixed; right: 16px; top: 50%;
          transform: translateY(-50%);
          display: flex; flex-direction: column; gap: 10px;
          z-index: 50;
        }
        @media(max-width: 768px) { .skl-sidebar { display: none; } }

        .skl-soc-link {
          width: 32px; height: 32px;
          background: white; border-radius: 4px;
          display: flex; align-items: center; justify-content: center;
          color: #6C2BD9; cursor: pointer; text-decoration: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          transition: transform .2s, box-shadow .2s, background .2s, color .2s;
        }
        .skl-soc-link:hover {
          transform: scale(1.18);
          box-shadow: 0 4px 16px rgba(108,43,217,.30);
          background: #7c3aed; color: #fff;
        }
      `}</style>
      <div className="skl-sidebar">
        {SIDEBAR_SOCIALS.map((s, i) => (
          <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
            aria-label={s.label} className="skl-soc-link" title={s.label}>
            {s.icon}
          </a>
        ))}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════
   Contact Section
═══════════════════════════════════════════════════ */
const ContactSection = () => {
  const [form,    setForm]    = useState({ name: "", email: "", phone: "", description: "" });
  const [touched, setTouched] = useState({});
  const [sent,    setSent]    = useState(false);
  const [sending, setSending] = useState(false);
  const [shake,   setShake]   = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [headVisible, setHeadVisible] = useState(false);
  const [mapVisible,  setMapVisible]  = useState(false);

  useEffect(() => {
    setTimeout(() => setHeadVisible(true), 80);
    setTimeout(() => setCardVisible(true), 260);
    setTimeout(() => setMapVisible(true),  480);
  }, []);

  const errors = {
    name:        VALIDATORS.name(form.name),
    email:       VALIDATORS.email(form.email),
    phone:       VALIDATORS.phone(form.phone),
    description: VALIDATORS.description(form.description),
  };
  const isValid = Object.values(errors).every(e => e === "");
  const touch = (f) => setTouched(t => ({ ...t, [f]: true }));

  const submit = () => {
    setTouched({ name: true, email: true, phone: true, description: true });
    if (!isValid) { setShake(true); setTimeout(() => setShake(false), 520); return; }
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1500);
  };

  return (
    <section style={{
      background: "linear-gradient(135deg,#f3e8ff 0%,#ede9fe 50%,#e0d7ff 100%)",
      minHeight: "90vh",
      padding: "40px 16px 64px",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Outfit:wght@400;500;700;900&display=swap');

        @keyframes particleRise {
          0%   { transform:translateY(105vh) rotate(0deg); opacity:0; }
          8%   { opacity:.13; } 92% { opacity:.07; }
          100% { transform:translateY(-8vh) rotate(360deg); opacity:0; }
        }
        @keyframes cardEnter {
          0%   { opacity:0; transform:translateY(48px) scale(.97); }
          60%  { opacity:1; transform:translateY(-4px) scale(1.005); }
          100% { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes headReveal {
          from { opacity:0; clip-path:inset(0 100% 0 0); }
          to   { opacity:1; clip-path:inset(0 0% 0 0); }
        }
        @keyframes mapFade {
          from { opacity:0; transform:translateY(32px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes popIn {
          0%  { transform:scale(0); }
          65% { transform:scale(1.22); }
          100%{ transform:scale(1); }
        }
        @keyframes spin    { to { transform:rotate(360deg); } }
        @keyframes shimmer { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        @keyframes shake {
          0%,100%{ transform:translateX(0); }
          18%{ transform:translateX(-7px); }
          36%{ transform:translateX(7px); }
          54%{ transform:translateX(-5px); }
          72%{ transform:translateX(5px); }
          88%{ transform:translateX(-2px); }
        }

        .skl-card-wrap         { opacity:0; transition:none; }
        .skl-card-wrap.visible { animation:cardEnter .65s cubic-bezier(.22,1,.36,1) forwards; }
        .skl-card-wrap.shake   { animation:shake .52s cubic-bezier(.36,.07,.19,.97) both !important; }

        .skl-head-wrap         { opacity:0; }
        .skl-head-wrap.visible { animation:headReveal .6s cubic-bezier(.22,1,.36,1) forwards; }

        .skl-map-wrap-anim         { opacity:0; }
        .skl-map-wrap-anim.visible { animation:mapFade .65s cubic-bezier(.22,1,.36,1) forwards; }

        .skl-card { transition:box-shadow .22s, transform .22s; will-change:transform; }
        .skl-card:hover {
          box-shadow:0 24px 56px rgba(108,43,217,.18) !important;
          transform:translateY(-4px) !important;
        }

        .skl-btn {
          background:linear-gradient(90deg,#7C3AED,#9333ea,#A855F7,#7C3AED);
          background-size:220% auto;
          color:#fff; border:none; border-radius:10px;
          padding:13px 40px; font-size:14px;
          font-family:'Poppins',sans-serif; font-weight:600;
          cursor:pointer; display:inline-flex; align-items:center; gap:8px;
          box-shadow:0 4px 18px rgba(108,43,217,.38);
          transition:background-position .45s, transform .18s, box-shadow .18s;
          letter-spacing:.02em; width:100%; justify-content:center;
        }
        .skl-btn:hover:not(:disabled) {
          background-position:right center;
          transform:translateY(-2px);
          box-shadow:0 10px 28px rgba(108,43,217,.48);
        }
        .skl-btn:active:not(:disabled) { transform:translateY(0); }
        .skl-btn:disabled { opacity:.7; cursor:not-allowed; }

        .skl-map-wrap {
          border-radius:16px; overflow:hidden;
          box-shadow:0 8px 40px rgba(108,43,217,.16);
          border:2px solid rgba(108,43,217,.12);
          transition:box-shadow .25s;
        }
        .skl-map-wrap:hover { box-shadow:0 16px 56px rgba(108,43,217,.25); }

        /* ── Contact section responsive ── */
        .contact-head h1 { font-size: clamp(24px, 5vw, 36px) !important; }
        .contact-head p  { font-size: clamp(13px, 2vw, 14px) !important; }

        .skl-form-card { padding: 48px 52px !important; }
        @media(max-width: 600px) {
          .skl-form-card { padding: 28px 20px !important; }
          .skl-btn { padding: 13px 24px !important; font-size: 13px !important; }
        }

        /* map height responsive */
        .skl-map-iframe { height: 380px; }
        @media(max-width: 768px) { .skl-map-iframe { height: 260px; } }
        @media(max-width: 480px) { .skl-map-iframe { height: 200px; } }
      `}</style>

      {/* Floating particles */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0 }}>
        {PARTICLES.map(p => (
          <div key={p.id} style={{
            position:"absolute", bottom:"-20px", left:`${p.left}%`,
            width:`${p.size}px`, height:`${p.size}px`, borderRadius:"50%",
            background:"rgba(108,43,217,.26)",
            animation:`particleRise ${p.duration}s ${p.delay}s infinite linear`,
          }} />
        ))}
      </div>

      <SocialSidebar />

      <div style={{ maxWidth:"1200px", margin:"0 auto", position:"relative", zIndex:1, padding:"40px 0 0 0" }}>

        {/* Heading */}
        <div className={`skl-head-wrap contact-head${headVisible ? " visible" : ""}`}
          style={{ padding: "0 8px" }}>
          <h1 style={{ color:"#6C2BD9", fontWeight:700, fontFamily:"'Poppins',sans-serif", marginBottom:"14px" }}>
            Contact Us
          </h1>
          <p style={{ color:"#555", lineHeight:"1.7", fontFamily:"'Poppins',sans-serif", marginBottom:"44px", maxWidth:"1700px" }}>
            At Skillra, we're here to support your learning, career, and organizational growth.
            Whether you have questions about our courses, need guidance for enrollment, or want to
            explore partnership opportunities, our team is ready to assist you.
          </p>
        </div>

        {/* Form card */}
        <div style={{ display:"flex", justifyContent:"center", padding: "0 8px" }}>
          <div
            className={`skl-card-wrap${cardVisible ? " visible" : ""}${shake ? " shake" : ""}`}
            style={{ width:"100%", maxWidth:"560px" }}
          >
            <div className="skl-card skl-form-card" style={{
              background:"white", borderRadius:"20px",
              boxShadow:"0 10px 48px rgba(108,43,217,.12)",
            }}>
              {sent ? (
                <div style={{ textAlign:"center", padding:"24px 0" }}>
                  <div style={{
                    width:"68px", height:"68px", borderRadius:"50%",
                    background:"linear-gradient(135deg,#7C3AED,#A855F7)",
                    display:"inline-flex", alignItems:"center", justifyContent:"center",
                    fontSize:"30px", color:"white", marginBottom:"20px",
                    animation:"popIn .5s cubic-bezier(.34,1.56,.64,1) both",
                  }}>✓</div>
                  <h3 style={{ fontFamily:"'Poppins',sans-serif", fontSize:"21px", fontWeight:700, color:"#222", marginBottom:"8px" }}>
                    Message Sent!
                  </h3>
                  <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:"13px", color:"#aaa" }}>
                    We'll get back to you within 24 hours.
                  </p>
                  <div style={{ display:"flex", justifyContent:"center", marginTop:"28px" }}>
                    <button className="skl-btn" style={{ width:"auto" }} onClick={() => {
                      setSent(false);
                      setForm({ name:"", email:"", phone:"", description:"" });
                      setTouched({});
                    }}>Send Another →</button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 style={{ fontFamily:"'Poppins',sans-serif", fontSize:"clamp(17px,4vw,21px)", fontWeight:700, color:"#222", marginBottom:"4px", textAlign:"center" }}>
                    We're here to help!
                  </h2>
                  <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:"13px", color:"#bbb", textAlign:"center", marginBottom:"36px" }}>
                    All fields are required. Please fill them in correctly.
                  </p>

                  <Field label="Your Name" value={form.name}
                    onChange={e => { setForm({...form, name:e.target.value}); touch("name"); }}
                    error={errors.name} touched={touched.name} />
                  <Field label="Email Address" type="email" value={form.email}
                    onChange={e => { setForm({...form, email:e.target.value}); touch("email"); }}
                    error={errors.email} touched={touched.email} />
                  <Field label="Phone Number" type="tel" value={form.phone}
                    onChange={e => { setForm({...form, phone:e.target.value}); touch("phone"); }}
                    error={errors.phone} touched={touched.phone} />
                  <Field label="Description" value={form.description}
                    onChange={e => { setForm({...form, description:e.target.value}); touch("description"); }}
                    error={errors.description} touched={touched.description} textarea />

                  {/* Progress bar */}
                  <div style={{ marginBottom:"20px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"5px" }}>
                      <span style={{ fontSize:"11px", color:"#94a3b8", fontFamily:"'Poppins',sans-serif" }}>Form completion</span>
                      <span style={{ fontSize:"11px", fontWeight:600, color:"#7C3AED", fontFamily:"'Poppins',sans-serif" }}>
                        {Object.values(errors).filter(e => e === "").length} / 4
                      </span>
                    </div>
                    <div style={{ height:"4px", background:"#f1f5f9", borderRadius:"4px", overflow:"hidden" }}>
                      <div style={{
                        height:"100%", borderRadius:"4px",
                        background:"linear-gradient(90deg,#7C3AED,#A855F7)",
                        width:`${(Object.keys(touched).length > 0 ? Object.values(errors).filter(e=>e==="").length / 4 : 0) * 100}%`,
                        transition:"width .35s ease",
                      }} />
                    </div>
                  </div>

                  <button className="skl-btn" onClick={submit} disabled={sending}>
                    {sending ? (
                      <>
                        <span style={{ width:"14px", height:"14px", border:"2px solid rgba(255,255,255,.35)", borderTop:"2px solid white", borderRadius:"50%", display:"inline-block", animation:"spin .7s linear infinite" }} />
                        Sending…
                      </>
                    ) : <>Get In Touch →</>}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div style={{ display:"flex", justifyContent:"center", marginTop:"52px", padding:"0 8px" }}>
          <div className={`skl-map-wrap-anim${mapVisible ? " visible" : ""}`} style={{ width:"100%", maxWidth:"900px" }}>
            <div className="skl-map-wrap">
              <iframe
                title="Skillra Office — KK Nagar Chennai"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.2!2d80.2090!3d13.0350!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5260e1b7ef0a3d%3A0x9e0f4b1c2d3e4f5a!2sPV%20Rajamannar%20Salai%2C%20KK%20Nagar%20West%2C%20Chennai%2C%20Tamil%20Nadu%20600078!5e0!3m2!1sen!2sin!4v1710000000001!5m2!1sen!2sin"
                width="100%"
                className="skl-map-iframe"
                style={{ border:0, display:"block" }}
                allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════
   Contact Info Section
═══════════════════════════════════════════════════ */
const ContactInfoSection = () => (
  <section style={{ background:"white", padding:"48px 16px", borderTop:"1px solid #f0f0f0" }}>
    <style>{`
      .contact-info-grid {
        max-width: 1200px; margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 40px;
      }
      @media(max-width: 900px) {
        .contact-info-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
      }
      @media(max-width: 580px) {
        .contact-info-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
      }
    `}</style>
    <div className="contact-info-grid">
      <div>
        <p style={{ color:"#666", fontSize:"13px", fontFamily:"'Poppins',sans-serif", lineHeight:"1.6" }}>Contact Info</p>
        <h3 style={{ fontFamily:"'Poppins',sans-serif", fontSize:"clamp(18px,3vw,22px)", fontWeight:700, color:"#111", lineHeight:"1.4", marginTop:"8px" }}>
          We are always happy<br />to assist you
        </h3>
      </div>
      <div>
        <h4 style={{ fontFamily:"'Poppins',sans-serif", fontSize:"15px", fontWeight:700, color:"#111", marginBottom:"8px" }}>Email Address</h4>
        <div style={{ width:"40px", height:"2px", background:"#6C2BD9", marginBottom:"16px" }} />
        <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:"13px", color:"#6C2BD9", marginBottom:"4px", wordBreak:"break-word" }}>
          support@skillra.com / admin@skillra.com
        </p>
        <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:"12px", color:"#999", marginTop:"12px", fontWeight:600 }}>Assistance hours:</p>
        <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:"12px", color:"#666" }}>Monday – Friday 6 am to 8 pm EST</p>
      </div>
      <div>
        <h4 style={{ fontFamily:"'Poppins',sans-serif", fontSize:"15px", fontWeight:700, color:"#111", marginBottom:"8px" }}>Number &amp; Address</h4>
        <div style={{ width:"40px", height:"2px", background:"#6C2BD9", marginBottom:"16px" }} />
        <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:"13px", color:"#6C2BD9", marginBottom:"12px" }}>
          74486 65622 · +91 8779487948
        </p>
        <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:"12px", color:"#666", lineHeight:"1.7" }}>
          FIRST FLOOR, 92/A19, PV Rajamannar Salai,<br />
          Ayyavupuram, KK Nagar West, K. K. Nagar,<br />
          Chennai, Tamil Nadu 600078<br />
          Landmark: RTO Ground, KK Nagar, Chennai
        </p>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════
   Newsletter Section
═══════════════════════════════════════════════════ */
function NewsletterSection() {
  const [ref, inView] = useInView(0.3);
  const [email, setEmail]           = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return;
    setSubscribing(true);
    setTimeout(() => { setSubscribing(false); setSubscribed(true); }, 1400);
  };

  return (
    <div ref={ref} style={{ background:"linear-gradient(135deg,#6d28d9,#7c3aed,#6d28d9)", position:"relative", overflow:"hidden" }}>
      <style>{`
        @keyframes spinRingAnim { to { transform:rotate(360deg); } }
      `}</style>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,0.10) 1px,transparent 1px)", backgroundSize:"22px 22px", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"3px", background:"linear-gradient(90deg,#06b6d4,#22d3ee,#67e8f9,#22d3ee,#06b6d4)", backgroundSize:"200% 100%", animation:"shimmer 3s linear infinite" }} />
      <div style={{
        maxWidth:"1200px", margin:"0 auto", padding:"36px 24px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        gap:"36px", flexWrap:"wrap", position:"relative", zIndex:1,
        opacity: inView ? 1 : 0, transition:"opacity 0.8s ease",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:"20px" }}>
          <div style={{ width:"46px", height:"46px", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", animation:"spinRingAnim 6s linear infinite" }}>
            <svg width="40" height="40" viewBox="0 0 46 46" fill="none">
              <path d="M23 4v38M4 23h38M8 8l30 30M38 8L8 38" stroke="rgba(255,255,255,0.85)" strokeWidth="3.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h2 style={{ fontSize:"clamp(1.2rem,2.2vw,1.6rem)", fontWeight:900, color:"#fff", lineHeight:1.1, letterSpacing:"-0.02em", marginBottom:"5px", fontFamily:"'Outfit',sans-serif" }}>
              Join Our Newsletter
            </h2>
            <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.75)", fontWeight:500, fontFamily:"'Outfit',sans-serif" }}>
              Subscribe to get our latest updates &amp; news.
            </p>
          </div>
        </div>
        {subscribed ? (
          <div style={{ display:"flex", alignItems:"center", gap:"10px", background:"rgba(255,255,255,0.15)", border:"1.5px solid rgba(255,255,255,0.4)", borderRadius:"12px", padding:"12px 20px" }}>
            <div style={{ width:"28px", height:"28px", borderRadius:"50%", background:"#22c55e", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
            </div>
            <span style={{ color:"#fff", fontWeight:700, fontSize:"14px", fontFamily:"'Outfit',sans-serif" }}>You're subscribed!</span>
          </div>
        ) : (
          <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubscribe()} placeholder="Enter your email"
              style={{ height:"48px", width:"clamp(200px,26vw,300px)", padding:"0 16px", fontSize:"14px", fontFamily:"'Outfit',sans-serif", fontWeight:500, color:"#1a0640", background:"rgba(255,255,255,0.96)", border:"2px solid rgba(255,255,255,0.7)", borderRadius:"12px", outline:"none" }}
              onFocus={e => e.target.style.borderColor="#fff"}
              onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.7)"} />
            <button onClick={handleSubscribe} disabled={subscribing}
              style={{ height:"48px", background:"#111", color:"#fff", border:"none", borderRadius:"12px", padding:"0 24px", fontSize:"14px", fontWeight:700, fontFamily:"'Outfit',sans-serif", cursor:"pointer", whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:"8px", transition:"all 0.22s" }}
              onMouseEnter={e => { e.currentTarget.style.background="#2d1b69"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="#111"; e.currentTarget.style.transform="translateY(0)"; }}>
              {subscribing ? "Subscribing…" : "Subscribe Now"}
              {!subscribing && <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════
   ROOT EXPORT
═══════════════════════════════════════════════════ */
export default function SkillraContactPage() {
  return (
    <div style={{ fontFamily:"'Poppins', sans-serif" }}>
      <ContactSection />
      <ContactInfoSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}