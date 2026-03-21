import { useEffect, useRef, useState, useCallback } from "react";
import Footer from "./Footer";

/* ═══════════════════════════════════════════════════
   SHARED DATA
═══════════════════════════════════════════════════ */
const COMPANIES = [
  { name:"Unsplash",  icon:"🖼" }, { name:"Notion",    icon:"📝" },
  { name:"INTERCOM",  icon:"💬" }, { name:"descript",  icon:"🎙" },
  { name:"grammarly", icon:"✏️" }, { name:"Slack",     icon:"💼" },
  { name:"Figma",     icon:"🎨" }, { name:"Linear",    icon:"📐" },
  { name:"Vercel",    icon:"▲"  }, { name:"Stripe",    icon:"💳" },
];

/* CRA serves /public files via process.env.PUBLIC_URL */
const PUB = process.env.PUBLIC_URL || "";

/* Slides: purple → orange → green */
const SLIDES = [
  { img:`${PUB}/landingPageFrontImg.png`, bg:"linear-gradient(145deg,#6d28d9,#7c3aed,#4c1d95)", shadow:"rgba(79,28,200,.55)", ring:"rgba(124,58,237,.30)" },
  { img:`${PUB}/technology1.png`,         bg:"linear-gradient(145deg,#c2410c,#ea580c,#9a3412)", shadow:"rgba(194,65,12,.55)",  ring:"rgba(234,88,12,.30)"  },
  { img:`${PUB}/finance1.png`,            bg:"linear-gradient(145deg,#14532d,#15803d,#166534)", shadow:"rgba(20,83,45,.55)",   ring:"rgba(21,128,61,.30)"  },
];

const COURSES_DATA = {
  healthcare: {
    label:"Healthcare Courses",
    activeColor:"#1e3a8a",
    tagColor:"#1e3a8a",
    btnColor:"#1e3a8a",
    badgeBg:"#1e3a8a",
    cardBg:"linear-gradient(145deg,#eff6ff 0%,#dbeafe 100%)",
    courses:[
      { id:"hc1", title:"AI Medical Coding",   description:"Get certified and learn AI-powered coding skills with real case studies.", badge:"100% Success Rate", image:`${PUB}/healthcare1.png` },
      { id:"hc2", title:"AI Medical Billing",  description:"Become a certified AI Medical Billing professional with job guarantee.",    badge:"100% Success Rate", image:`${PUB}/healthcare1.png` },
      { id:"hc3", title:"AI Medical Scribing", description:"Learn AI-based medical scribing and clinical documentation.",              badge:"100% Success Rate", image:`${PUB}/healthcare1.png` },
    ],
  },
  technology: {
    label:"Technology Course",
    activeColor:"#c2410c",
    tagColor:"#c2410c",
    btnColor:"#c2410c",
    badgeBg:"#c2410c",
    cardBg:"linear-gradient(145deg,#fff7ed 0%,#ffedd5 100%)",
    courses:[
      { id:"tc1", title:"Full Stack Course", description:"Become a full-stack web developer with our MERN and MEAN Stack Course.", badge:null, image:`${PUB}/technology1.png` },
      { id:"tc2", title:"Data Analytics",    description:"Join our Data Analytics Course for high-demand data careers.",           badge:null, image:`${PUB}/technology1.png` },
      { id:"tc3", title:"UI/UX Design",      description:"Join our UI/UX Designing Course to build professional websites.",       badge:null, image:`${PUB}/technology1.png` },
    ],
  },
  finance: {
    label:"Finance Course",
    activeColor:"#14532d",
    tagColor:"#14532d",
    btnColor:"#14532d",
    badgeBg:"#14532d",
    cardBg:"linear-gradient(145deg,#f0fdf4 0%,#dcfce7 100%)",
    courses:[
      { id:"fc1", title:"SAP Development",      description:"Master SAP ABAP and become a certified SAP developer.",       badge:null, image:`${PUB}/finance1.png` },
      { id:"fc2", title:"Tally & GST Course",   description:"Learn Tally, GST filing, and financial accounting tools.",    badge:null, image:`${PUB}/finance1.png` },
      { id:"fc3", title:"Financial Accounting", description:"Master financial accounting and IFRS reporting standards.",   badge:null, image:`${PUB}/finance1.png` },
    ],
  },
};

const TESTIMONIALS = [
  { id:1, name:"Aria Zinanrio",   role:"Medical Coder",        avatar:`${PUB}/abtimg1.jpg`, text:"Skillra's AI Medical Coding course transformed my career completely — I landed a job within 3 weeks of completing the program. The trainers are incredibly experienced." },
  { id:2, name:"Ravi Kumar",      role:"Full Stack Developer", avatar:`${PUB}/abtimg2.jpg`, text:"The Full Stack course at Skillra is world-class. Hands-on projects, real mentorship, and 100% placement support made all the difference. Fresher to employed in 2 months." },
  { id:3, name:"Priya Nair",      role:"Financial Analyst",    avatar:`${PUB}/abtimg3.jpg`, text:"Skillra's Finance training is structured perfectly for career switchers. The Tally & GST module alone was worth every rupee. My interview confidence shot up." },
  { id:4, name:"Mohammed Farhan", role:"Data Analyst",         avatar:`${PUB}/abtimg1.jpg`, text:"The Data Analytics course was exactly what I needed. Practical assignments, weekly mentorship, and a placement team that genuinely cares — Skillra delivers every promise." },
];

const CONTACT_COURSES = [
  "AI Medical Coding","AI Medical Billing","AI Medical Scribing",
  "Full Stack Development","Data Analytics","UI/UX Design",
  "SAP Development","Tally & GST","Financial Accounting",
];

/* ═══════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════ */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/* ═══════════════════════════════════════════════════
   COUNSELOR MODAL FORM
═══════════════════════════════════════════════════ */
function CounselorModal({ onClose }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"", course:"" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Required";
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

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(15,4,38,0.72)", backdropFilter:"blur(6px)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}>
      <div onClick={e => e.stopPropagation()} style={{ background:"#fff", borderRadius:"28px", padding:"44px 40px", width:"100%", maxWidth:"480px", position:"relative", boxShadow:"0 32px 80px rgba(124,58,237,0.28)", animation:"modalPop 0.38s cubic-bezier(.34,1.56,.64,1) both" }}>
        {/* Top shimmer bar */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"4px", background:"linear-gradient(90deg,#7c3aed,#a78bfa,#ff6b35,#7c3aed)", backgroundSize:"300% 100%", animation:"shimmer 3s linear infinite", borderRadius:"28px 28px 0 0" }}/>

        {/* Close */}
        <button onClick={onClose} style={{ position:"absolute", top:"18px", right:"18px", width:"32px", height:"32px", borderRadius:"50%", background:"#f3f0ff", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px", color:"#7c3aed", transition:"all 0.2s" }}
          onMouseEnter={e=>e.currentTarget.style.background="#ede9fe"} onMouseLeave={e=>e.currentTarget.style.background="#f3f0ff"}>✕</button>

        {submitted ? (
          <div style={{ textAlign:"center", padding:"12px 0" }}>
            <div style={{ width:"70px", height:"70px", borderRadius:"50%", background:"linear-gradient(135deg,#7c3aed,#5b21b6)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px", boxShadow:"0 8px 28px rgba(124,58,237,0.35)", animation:"pulse 2s ease-in-out infinite" }}>
              <svg width="30" height="30" viewBox="0 0 32 32" fill="none"><path d="M7 16l7 7 11-12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 style={{ fontSize:"22px", fontWeight:900, color:"#1a0640", marginBottom:"10px", fontFamily:"'Outfit',sans-serif" }}>We'll Call You Soon!</h3>
            <p style={{ fontSize:"14px", color:"#6b5a9e", lineHeight:1.7, fontFamily:"'Outfit',sans-serif" }}>Our counselors will reach you within 24 hours.<br/>Get ready for your career journey!</p>
            <button onClick={onClose} style={{ marginTop:"22px", background:"linear-gradient(135deg,#7c3aed,#5b21b6)", border:"none", color:"#fff", borderRadius:"50px", padding:"11px 28px", fontSize:"13px", fontWeight:700, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>Close</button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom:"6px" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"#f3f0ff", border:"1.5px solid #e4d9ff", borderRadius:"8px", padding:"6px 14px", fontSize:"11.5px", color:"#7c3aed", fontWeight:700, marginBottom:"14px", letterSpacing:"0.08em" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#7c3aed"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                FREE COUNSELING
              </div>
            </div>
            <h3 style={{ fontSize:"26px", fontWeight:900, color:"#1a0640", marginBottom:"5px", letterSpacing:"-0.4px", fontFamily:"'Outfit',sans-serif" }}>Talk to Our Experts</h3>
            <p style={{ fontSize:"13.5px", color:"#9270c0", marginBottom:"26px", fontWeight:500, fontFamily:"'Outfit',sans-serif" }}>Fill in your details and we'll get back to you within 24 hours.</p>

            {[{label:"Your full name", key:"name", type:"text"}, {label:"Email address", key:"email", type:"email"}, {label:"Phone number", key:"phone", type:"tel"}].map(f => (
              <div key={f.key} style={{ marginBottom:"13px" }}>
                <input type={f.type} placeholder={f.label} value={form[f.key]}
                  onChange={e => { setForm({...form,[f.key]:e.target.value}); setErrors({...errors,[f.key]:""}); }}
                  style={{ width:"100%", padding:"13px 16px", fontSize:"14px", fontFamily:"'Outfit',sans-serif", fontWeight:500, color:"#1a0640", background:errors[f.key]?"#fff5f5":"#f8f5ff", border:`1.5px solid ${errors[f.key]?"#ef4444":"#e4d9ff"}`, borderRadius:"12px", outline:"none", transition:"all 0.22s" }}
                  onFocus={e => { e.target.style.borderColor="#7c3aed"; e.target.style.background="#fff"; e.target.style.boxShadow="0 0 0 4px rgba(124,58,237,0.09)"; }}
                  onBlur={e => { e.target.style.borderColor=errors[f.key]?"#ef4444":"#e4d9ff"; e.target.style.background=errors[f.key]?"#fff5f5":"#f8f5ff"; e.target.style.boxShadow="none"; }}
                />
                {errors[f.key] && <div style={{ fontSize:"11px", color:"#ef4444", marginTop:"3px", fontFamily:"'Outfit',sans-serif" }}>{errors[f.key]}</div>}
              </div>
            ))}

            <div style={{ marginBottom:"22px", position:"relative" }}>
              <select value={form.course} onChange={e => { setForm({...form,course:e.target.value}); setErrors({...errors,course:""}); }}
                style={{ width:"100%", padding:"13px 16px", fontSize:"14px", fontFamily:"'Outfit',sans-serif", fontWeight:500, color:form.course?"#1a0640":"#9270c0", background:"#f8f5ff", border:`1.5px solid ${errors.course?"#ef4444":"#e4d9ff"}`, borderRadius:"12px", outline:"none", cursor:"pointer", appearance:"none", WebkitAppearance:"none", transition:"all 0.22s" }}
                onFocus={e => e.target.style.borderColor="#7c3aed"} onBlur={e => e.target.style.borderColor=errors.course?"#ef4444":"#e4d9ff"}>
                <option value="">Select a course</option>
                {CONTACT_COURSES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <div style={{ position:"absolute", right:"14px", top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#9270c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              {errors.course && <div style={{ fontSize:"11px", color:"#ef4444", marginTop:"3px", fontFamily:"'Outfit',sans-serif" }}>{errors.course}</div>}
            </div>

            <button onClick={handleSubmit} disabled={submitting} style={{ width:"100%", position:"relative", overflow:"hidden", background:"linear-gradient(135deg,#ff6b35,#f03e00)", color:"#fff", border:"none", borderRadius:"50px", padding:"15px 30px", fontSize:"15px", fontWeight:800, fontFamily:"'Outfit',sans-serif", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"10px", boxShadow:"0 6px 22px rgba(255,80,0,0.35)", transition:"all 0.22s", letterSpacing:"0.3px" }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 12px 32px rgba(255,80,0,0.45)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 6px 22px rgba(255,80,0,0.35)"; }}>
              {submitting ? "Sending…" : "Book Free Counseling Session"}
              {!submitting && <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SECTION LABEL
═══════════════════════════════════════════════════ */
function SectionLabel({ text }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"#fff", border:"1.5px solid #e4d9ff", borderRadius:"9px", padding:"7px 16px", fontSize:"12px", color:"#3b1f7a", fontWeight:700, marginBottom:"16px", boxShadow:"0 2px 12px rgba(124,58,237,0.10)", letterSpacing:"0.08em" }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#7c3aed"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      {text}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   HERO — 3-slide smooth rotation
═══════════════════════════════════════════════════ */
const StarRating = ({ rating=4.5, max=5 }) => (
  <span style={{ color:"#f5a623", fontSize:"15px", letterSpacing:"2px" }}>
    {Array.from({length:max},(_,i)=>{
      const filled=i+1<=Math.floor(rating), half=!filled&&i<rating;
      return <span key={i} style={{opacity:filled?1:half?0.65:0.25}}>★</span>;
    })}
  </span>
);

const CalendarIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
    <rect x="1" y="5" width="28" height="24" rx="4.5" fill="url(#cg1)"/>
    <rect x="1" y="5" width="28" height="9" rx="4.5" fill="url(#cg2)"/>
    <rect x="8" y="1.5" width="3.2" height="7" rx="1.6" fill="#7c3aed"/>
    <rect x="18.8" y="1.5" width="3.2" height="7" rx="1.6" fill="#7c3aed"/>
    <rect x="6.5" y="17" width="4.5" height="4.5" rx="1.2" fill="white" opacity="0.9"/>
    <rect x="12.8" y="17" width="4.5" height="4.5" rx="1.2" fill="white" opacity="0.65"/>
    <rect x="19.1" y="17" width="4.5" height="4.5" rx="1.2" fill="white" opacity="0.4"/>
    <rect x="6.5" y="23" width="4.5" height="3.5" rx="1.2" fill="white" opacity="0.4"/>
    <rect x="12.8" y="23" width="4.5" height="3.5" rx="1.2" fill="white" opacity="0.65"/>
    <defs>
      <linearGradient id="cg1" x1="1" y1="5" x2="29" y2="29" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#f0ebff"/><stop offset="100%" stopColor="#c4b5fd"/></linearGradient>
      <linearGradient id="cg2" x1="1" y1="5" x2="29" y2="14" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#5b21b6"/></linearGradient>
    </defs>
  </svg>
);

function useSlideRotation() {
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setActiveIdx(i => (i + 1) % SLIDES.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);
  return activeIdx;
}

function ReviewAvatars({ centered=false }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"10px", justifyContent:centered?"center":"flex-start" }}>
      <div style={{ display:"flex" }}>
        {["#7c3aed","#059669","#2563eb"].map((bg,i) => (
          <div key={i} style={{ width:"34px", height:"34px", borderRadius:"50%", background:bg, border:"2.5px solid #fff", marginLeft:i===0?"0":"-10px", zIndex:3-i, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:"13px" }}>{["A","B","C"][i]}</div>
        ))}
      </div>
      <div><StarRating rating={4.5}/><div style={{ fontSize:"11px", color:"#9270c0", marginTop:"2px" }}>(100+ Reviews)</div></div>
    </div>
  );
}

function HeroSection({ scrollRef, onCounselorClick }) {
  const activeIdx = useSlideRotation();

  return (
    
    <section id="home" style={{ background:`radial-gradient(ellipse 80% 70% at 70% 40%,rgba(167,139,250,0.18) 0%,transparent 70%),radial-gradient(ellipse 50% 60% at 10% 80%,rgba(124,58,237,0.1) 0%,transparent 65%),#faf8ff`, minHeight:"calc(100vh - 84px)", display:"flex", flexDirection:"column", justifyContent:"center", position:"relative", overflow:"hidden", padding: "40px 0 0 0"}}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0, backgroundImage:`linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)`, backgroundSize:"32px 32px" }}/>

      <div className="hero-inner" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"56px 6% 20px", width:"100%", gap:"40px", position:"relative", zIndex:1 }}>
        {/* LEFT */}
        <div className="hero-left" style={{ flex:"0 0 auto", width:"590px" }}>
          <div className="v0 badge-tag" style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"#fff", border:"1.5px solid #e4d9ff", borderRadius:"9px", padding:"9px 18px", fontSize:"13px", color:"#3b1f7a", fontWeight:700, marginBottom:"22px", boxShadow:"0 2px 14px rgba(124,58,237,.12)" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1l1.8 3.6L14 5.6l-3 2.9.7 4.1L8 10.5l-3.7 2.1.7-4.1-3-2.9 4.2-.6L8 1z" fill="#7c3aed"/></svg>
            100% Placement Assistant
          </div>
          <h1 className="v1 hero-title" style={{ fontSize:"64px", fontWeight:900, lineHeight:1.09, color:"#120630", marginBottom:"20px", letterSpacing:"-1.5px" }}>
            From Learning to<br/>Placement-<span style={{ color:"#7c3aed" }}>Career</span><br/>
            <span style={{ position:"relative", display:"inline-block", color:"#7c3aed" }}>
              Companion
              <svg viewBox="0 0 280 36" style={{ position:"absolute", bottom:"-18px", left:"-6px", width:"calc(100% + 12px)", height:"20px", overflow:"visible" }} preserveAspectRatio="none">
                <path className="arc-path" d="M 4 30 C 55 4, 150 -2, 296 26" fill="none" stroke="#7c3aed" strokeWidth="8" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          <p className="v2" style={{ color:"#5c4a80", fontSize:"14.5px", lineHeight:1.8, marginBottom:"20px", maxWidth:"430px", marginTop:"8px" }}>
            Advance your career with <strong style={{ color:"#120630" }}>AI Medical Coding</strong> &amp; <strong style={{ color:"#120630" }}>Medical Billing</strong>, IT, and Finance courses, designed with a job-ready curriculum and 100% placement support.
          </p>
          <div className="v3 hero-bullets" style={{ display:"flex", gap:"12px", marginBottom:"30px", flexWrap:"wrap" }}>
            {["✓ 15+ Years Experienced Trainers","✓ Tamper-Proof Digital Certificate"].map((b,i) => (
              <span key={i} style={{ color:"#7c3aed", fontSize:"12.5px", fontWeight:700, display:"flex", alignItems:"center", gap:"5px", background:"rgba(124,58,237,.07)", borderRadius:"20px", padding:"6px 14px", border:"1px solid rgba(124,58,237,.15)" }}>{b}</span>
            ))}
          </div>
          <div className="v4 cta-row desktop-cta-block" style={{ alignItems:"center", gap:"20px" }}>
            <button className="cta-btn" onClick={onCounselorClick} style={{ background:"linear-gradient(135deg,#ff6b35 0%,#f03e00 100%)", color:"#fff", border:"none", borderRadius:"32px", padding:"15px 28px", fontSize:"13px", fontWeight:800, cursor:"pointer", letterSpacing:".5px", boxShadow:"0 6px 22px rgba(255,80,0,.38)", whiteSpace:"nowrap" }}>
              TALK TO OUR COUNSELORS
            </button>
            <ReviewAvatars/>
          </div>
        </div>

        {/* RIGHT — circle */}
        <div className="hero-right vR" style={{ flex:"1", display:"flex", justifyContent:"flex-end", alignItems:"center", position:"relative", minWidth:0 }}>
          {/* Glass card */}
          <div className="card-float glass-card-pos" style={{ position:"absolute", bottom:"200px", left:"10%", zIndex:30, background:"rgba(255,255,255,0.62)", backdropFilter:"blur(22px) saturate(1.8)", WebkitBackdropFilter:"blur(22px) saturate(1.8)", border:"1.5px solid rgba(255,255,255,0.82)", borderRadius:"20px", padding:"18px 28px", display:"flex", alignItems:"center", gap:"16px", boxShadow:"0 20px 56px rgba(80,20,180,.16),0 1px 0 rgba(255,255,255,.8) inset", minWidth:"230px" }}>
            <div style={{ width:"54px", height:"54px", background:"linear-gradient(135deg,rgba(124,58,237,.12),rgba(167,139,250,.22))", borderRadius:"14px", display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid rgba(124,58,237,.2)", flexShrink:0 }}><CalendarIcon/></div>
            <div>
              <div style={{ fontWeight:900, fontSize:"26px", color:"#1a0640", lineHeight:1, letterSpacing:"-0.5px" }}>100 +</div>
              <div style={{ fontSize:"12px", color:"#6b5a9e", marginTop:"4px", fontWeight:600 }}>Assisted Students</div>
            </div>
          </div>

          {/* Rotating circle */}
          <div className="hero-float" style={{ position:"relative", flexShrink:0 }}>
            <div className="circle-size" style={{
              width:"500px", height:"500px", borderRadius:"50%",
              overflow:"hidden", position:"relative",
              boxShadow:`0 40px 100px ${SLIDES[activeIdx].shadow}, 0 0 0 14px ${SLIDES[activeIdx].ring}`,
              transition:"box-shadow 0.8s ease",
            }}>
              {SLIDES.map((slide, i) => (
                <div key={i} style={{
                  position:"absolute", inset:0,
                  background: slide.bg,
                  opacity: i === activeIdx ? 1 : 0,
                  transition: "opacity 0.8s ease-in-out",
                  zIndex: i === activeIdx ? 2 : 1,
                }}>
                  <img src={slide.img} alt={`slide-${i}`} style={{
                    width:"100%", height:"100%",
                    objectFit:"cover", objectPosition:"top center", display:"block",
                  }}/>
                </div>
              ))}
            </div>

            {/* Indicator dots */}
            <div style={{ position:"absolute", bottom:"-28px", left:"50%", transform:"translateX(-50%)", display:"flex", gap:"8px" }}>
              {SLIDES.map((_,i) => (
                <div key={i} style={{
                  width: i===activeIdx ? 22 : 8, height:8,
                  borderRadius:"99px",
                  background: i===activeIdx ? "#7c3aed" : "#c4b5fd",
                  transition:"all 0.4s ease",
                }}/>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="mobile-cta-block" style={{ flexDirection:"column", alignItems:"center", gap:"18px", padding:"28px 24px 8px", width:"100%", position:"relative", zIndex:1 }}>
        <button className="cta-btn" onClick={onCounselorClick} style={{ background:"linear-gradient(135deg,#ff6b35 0%,#f03e00 100%)", color:"#fff", border:"none", borderRadius:"32px", padding:"16px 32px", fontSize:"14px", fontWeight:800, cursor:"pointer", letterSpacing:".5px", boxShadow:"0 6px 22px rgba(255,80,0,.38)", width:"100%", maxWidth:"360px" }}>
          TALK TO OUR COUNSELORS
        </button>
        <ReviewAvatars centered/>
      </div>

      {/* Partners ticker */}
      <div style={{ padding:"48px 0 28px", position:"relative", zIndex:1 }}>
        <div className="partners-title" style={{ textAlign:"center", fontWeight:900, fontSize:"26px", color:"#120630", marginBottom:"24px", letterSpacing:"-0.3px" }}>
          More than <span style={{ color:"#7c3aed" }}>50 +</span> Hiring Partners
        </div>
        <div style={{ overflow:"hidden", width:"100%", userSelect:"none" }} ref={scrollRef}>
          <div style={{ display:"flex", width:"max-content" }}>
            {[...COMPANIES,...COMPANIES,...COMPANIES].map((c,i) => (
              <div key={i} className="company-item" style={{ display:"flex", alignItems:"center", gap:"8px", padding:"0 40px", color:"#a08cc4", fontSize:"15px", fontWeight:700, whiteSpace:"nowrap" }}>
                <span style={{ fontSize:"20px", opacity:0.6 }}>{c.icon}</span><span>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   ABOUT SECTION
═══════════════════════════════════════════════════ */
function ImageCard({ src, alt, style, delay=0 }) {
  const [visible, setVisible] = useState(false), [hovered, setHovered] = useState(false);
  useEffect(() => { const t=setTimeout(()=>setVisible(true),delay); return()=>clearTimeout(t); }, [delay]);
  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} style={{ ...style, opacity:visible?1:0, transform:visible?(hovered?"scale(1.04) translateY(-4px)":"scale(1) translateY(0)"):"scale(0.93) translateY(18px)", transition:`opacity 0.7s ease ${delay}ms,transform 0.45s cubic-bezier(.4,0,.2,1)`, borderRadius:"18px", overflow:"hidden", boxShadow:hovered?"0 20px 50px rgba(108,43,217,0.22)":"0 8px 28px rgba(108,43,217,0.10)", cursor:"pointer", position:style.position||"relative" }}>
      <img src={src} alt={alt} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transform:hovered?"scale(1.08)":"scale(1)", transition:"transform 0.5s" }}/>
    </div>
  );
}

function AnimatedCircle() {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => { const t=setTimeout(()=>setDrawn(true),700); return()=>clearTimeout(t); }, []);
  return (
    <svg viewBox="-12 -6 299 106" style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-55%)", width:"205%", height:"225%", pointerEvents:"none", overflow:"visible" }}>
      <path d="M 103,19 C 196,8 272,12 278,36 C 284,60 250,80 200,86 C 150,92 82,90 40,80 C -2,70 -10,50 6,30 C 22,10 66,2 116,2 C 136,1 152,5 162,8 C 170,10 175,16 170,23 C 164,19 157,10 153,12" fill="none" stroke="#5b21b6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray:820, strokeDashoffset:drawn?0:820, transition:"stroke-dashoffset 2.8s cubic-bezier(0.25,0.1,0.2,1)" }}/>
    </svg>
  );
}

function AboutSection() {
  const [ref, inView] = useInView(0.1);
  const [cv, setCv] = useState(false);
  useEffect(() => { if(inView) setTimeout(()=>setCv(true),200); }, [inView]);

  return (
    <section id="about" ref={ref} style={{ padding:"80px 0", background:"#fff", borderTop:"1px solid #f0ebff", position:"relative" }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)`, backgroundSize:"32px 32px" }}/>
      <div style={{ maxWidth:"1180px", margin:"0 auto", padding:"0 48px", display:"flex", alignItems:"center", gap:"80px", flexWrap:"wrap", position:"relative", zIndex:1 }}>
        <div style={{ position:"relative", width:"480px", minWidth:"320px", height:"440px", flexShrink:0 }}>
          <ImageCard src={`${PUB}/abtimg3.jpg`} alt="Instructor" delay={100} style={{ position:"absolute", top:0, left:0, width:"260px", height:"196px" }}/>
          <ImageCard src={`${PUB}/abtimg2.jpg`} alt="Campus" delay={250} style={{ position:"absolute", top:0, right:0, width:"210px", height:"196px" }}/>
          <ImageCard src={`${PUB}/abtimg1.jpg`} alt="Students" delay={400} style={{ position:"absolute", top:"208px", left:0, width:"100%", height:"232px" }}/>
          <div style={{ position:"absolute", left:"50%", top:"200px", transform:"translate(-50%,-50%)", width:"130px", height:"130px", borderRadius:"50%", background:"linear-gradient(135deg,#7c3aed,#4c1d95)", boxShadow:"0 0 0 6px rgba(124,58,237,0.12),0 8px 32px rgba(108,43,217,0.38)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", zIndex:10 }}>
            <span style={{ fontWeight:900, fontSize:"2rem", color:"#fff", lineHeight:1 }}>1+</span>
            <span style={{ fontWeight:500, fontSize:"0.68rem", color:"rgba(255,255,255,0.88)", marginTop:"4px", textAlign:"center", lineHeight:1.4 }}>Years Of<br/>Experience</span>
          </div>
        </div>
        <div style={{ flex:1, opacity:cv?1:0, transform:cv?"translateY(0)":"translateY(24px)", transition:"all 0.9s cubic-bezier(.4,0,.2,1) 0.15s" }}>
          <SectionLabel text="ABOUT US"/>
          <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:900, fontSize:"clamp(2rem,3.5vw,2.6rem)", color:"#1a1035", lineHeight:1.15, marginBottom:"22px", letterSpacing:"-0.02em" }}>
            Your{" "}
            <span style={{ position:"relative", display:"inline-block", whiteSpace:"nowrap" }}>
              Skill Partner<AnimatedCircle/>
            </span>
            <br/>For Career Growth
          </h2>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.97rem", color:"#4b4466", lineHeight:1.78, marginBottom:"24px", maxWidth:"520px" }}>
            Skillra is a leading training institute specializing in <strong style={{ color:"#1e3a8a" }}>AI Medical Coding</strong> &amp; <strong style={{ color:"#1e3a8a" }}>Medical Billing</strong>, <strong style={{ color:"#c2410c" }}>IT development</strong>, <strong style={{ color:"#14532d" }}>Finance training</strong>, and Career oriented programs.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px", marginBottom:"32px" }}>
            <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.88rem", color:"#5a5275", lineHeight:1.8 }}>Our expert mentors guide students with hands-on experience, industry projects, and job-ready skill development.</p>
            <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.88rem", color:"#5a5275", lineHeight:1.8 }}>Skillra empowers learners to outperform industry expectations with confidence and credibility.</p>
          </div>
          <button style={{ display:"flex", alignItems:"center", gap:"10px", background:"#f05a00", color:"#fff", border:"none", borderRadius:"50px", padding:"13px 30px", fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:"1rem", cursor:"pointer", boxShadow:"0 4px 18px rgba(240,90,0,0.28)", transition:"all 0.25s" }}>
            Learn More
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   COURSES SECTION
═══════════════════════════════════════════════════ */
function CoursesSection() {
  const [ref, inView] = useInView(0.08);
  const [activeTab, setActiveTab] = useState("healthcare");
  const cat = COURSES_DATA[activeTab];

  return (
    <section id="courses" ref={ref} style={{ padding:"88px 0", background:"#faf8ff", borderTop:"1px solid #f0ebff", position:"relative" }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)`, backgroundSize:"32px 32px" }}/>
      <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 48px", position:"relative", zIndex:1 }}>

        <div style={{ marginBottom:"48px", opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(24px)", transition:"all 0.7s ease" }}>
          <SectionLabel text="OUR COURSES"/>
          <h2 style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:900, fontFamily:"'Outfit',sans-serif", color:"#120630", letterSpacing:"-0.03em", lineHeight:1.05, marginBottom:"12px" }}>
            Our <em style={{ fontStyle:"italic", color:cat.activeColor, transition:"color 0.4s" }}>interactive</em> Course
          </h2>
          <p style={{ fontSize:"15px", color:"#6b5a9e", fontFamily:"'Outfit',sans-serif", maxWidth:"520px", lineHeight:1.7 }}>
            Excellent courses, intellectual knowledge and industry-ready content. Dive into our learning pool and become a medical, technology or financial professional.
          </p>
        </div>

        <div style={{ display:"flex", gap:"36px", alignItems:"flex-start" }}>
          {/* Sidebar tabs */}
          <div style={{ width:"220px", flexShrink:0, display:"flex", flexDirection:"column", gap:"6px" }}>
            {Object.entries(COURSES_DATA).map(([key, val]) => (
              <button key={key} onClick={() => setActiveTab(key)} style={{
                display:"block", width:"100%", textAlign:"left",
                background: activeTab===key ? val.activeColor : "transparent",
                border: activeTab===key ? "none" : "1.5px solid #e4d9ff",
                fontSize:"15px", fontFamily:"'Outfit',sans-serif", fontWeight:700,
                color: activeTab===key ? "#fff" : "#444",
                padding:"11px 20px", borderRadius:"40px", cursor:"pointer",
                transition:"all 0.25s", whiteSpace:"nowrap",
                boxShadow: activeTab===key ? `0 6px 20px ${val.activeColor}44` : "none",
              }}
              onMouseEnter={e => { if(activeTab!==key){ e.currentTarget.style.background=val.activeColor+"18"; e.currentTarget.style.borderColor=val.activeColor+"66"; }}}
              onMouseLeave={e => { if(activeTab!==key){ e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="#e4d9ff"; }}}
              >{val.label}</button>
            ))}
          </div>

          {/* Cards */}
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:"flex", gap:"24px", overflowX:"auto", paddingBottom:"16px" }}>
              {cat.courses.map((course, idx) => (
                <div key={course.id} style={{
                  background: cat.cardBg, borderRadius:"24px",
                  boxShadow:`0 6px 28px ${cat.activeColor}18`,
                  overflow:"hidden", flexShrink:0, display:"flex", flexDirection:"column",
                  minWidth:"300px", maxWidth:"300px",
                  transition:"transform 0.25s,box-shadow 0.25s", cursor:"pointer",
                  border:`1.5px solid ${cat.activeColor}22`,
                  opacity: inView?1:0, transform: inView?"translateY(0)":"translateY(30px)",
                  transitionDelay:`${0.1+idx*0.1}s`,
                }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-10px) scale(1.025)"; e.currentTarget.style.boxShadow=`0 24px 56px ${cat.activeColor}30`; }}
                onMouseLeave={e => { e.currentTarget.style.transform="translateY(0) scale(1)"; e.currentTarget.style.boxShadow=`0 6px 28px ${cat.activeColor}18`; }}>
                  {/* Image */}
                  <div style={{ position:"relative", height:"220px", overflow:"hidden", flexShrink:0 }}>
                    {course.badge && (
                      <div style={{ position:"absolute", top:0, right:0, fontSize:"11px", fontWeight:800, padding:"7px 16px", borderRadius:"0 24px 0 16px", color:"#fff", background:cat.badgeBg, zIndex:2, boxShadow:"0 2px 8px rgba(0,0,0,0.15)" }}>{course.badge}</div>
                    )}
                    <img src={course.image} alt={course.title} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center", display:"block", transition:"transform 0.5s" }}
                      onMouseEnter={e => e.target.style.transform="scale(1.06)"}
                      onMouseLeave={e => e.target.style.transform="scale(1)"}
                    />
                  </div>

                  {/* Content */}
                  <div style={{ padding:"18px 20px 22px", flex:1, display:"flex", flexDirection:"column" }}>
                    <div style={{ fontWeight:800, fontSize:17, color:cat.tagColor, marginBottom:7, lineHeight:1.25, fontFamily:"'Outfit',sans-serif" }}>{course.title}</div>
                    <div style={{ fontSize:13, color:"#555", lineHeight:1.6, marginBottom:16, flex:1, fontFamily:"'Outfit',sans-serif" }}>{course.description}</div>
                    <button style={{ alignSelf:"flex-start", background:cat.btnColor, color:"#fff", border:"none", borderRadius:"24px", padding:"9px 22px", fontSize:"12px", fontWeight:800, letterSpacing:"0.5px", cursor:"pointer", fontFamily:"'Outfit',sans-serif", transition:"all 0.2s", boxShadow:`0 4px 14px ${cat.btnColor}44` }}
                      onMouseEnter={e => { e.currentTarget.style.transform="scale(1.06)"; e.currentTarget.style.boxShadow=`0 8px 22px ${cat.btnColor}55`; }}
                      onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow=`0 4px 14px ${cat.btnColor}44`; }}>
                      KNOW MORE
                    </button>
                  </div>
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
   SERVICES SECTION
═══════════════════════════════════════════════════ */
const SERVICE_CARDS = [
  { id:1, bg:"linear-gradient(160deg,#7c3aed,#6d28d9)", title:"Campus Training Programs",    titleColor:"#e9d5ff", desc:"We partner with colleges to deliver industry-ready training directly on campus.", shadowColor:"rgba(109,40,217,0.40)", icon:"🏫" },
  { id:2, bg:"linear-gradient(160deg,#ea580c,#c2410c)", title:"Placement Support",            titleColor:"#fed7aa", desc:"We guide every student with structured job preparation, resume building, and interview coaching.", shadowColor:"rgba(234,88,12,0.40)", icon:"🎯" },
  { id:3, bg:"linear-gradient(160deg,#15803d,#166534)", title:"Career Guidance & Mentorship", titleColor:"#bbf7d0", desc:"Get personalized guidance from industry experts who help you chart your ideal career path.", shadowColor:"rgba(21,128,61,0.40)", icon:"🧭" },
];

function ServiceCard({ card, delay, inView }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ripples, setRipples] = useState([]);
  const cardRef = useRef(null);

  useEffect(() => { if(inView) setTimeout(()=>setVisible(true), delay); }, [inView, delay]);

  const handleClick = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const id = Date.now();
    setRipples(r => [...r, { x:e.clientX-rect.left, y:e.clientY-rect.top, id }]);
    setTimeout(() => setRipples(r => r.filter(rp=>rp.id!==id)), 700);
  };

  return (
    <div ref={cardRef} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onClick={handleClick}
      style={{ flex:"1 1 280px", maxWidth:"360px", background:card.bg, borderRadius:"24px", overflow:"hidden", cursor:"pointer", position:"relative", opacity:visible?1:0, transform:visible?(hovered?"translateY(-12px) scale(1.03)":"translateY(0) scale(1)"):"translateY(40px) scale(0.94)", transition:"opacity 0.65s ease,transform 0.38s cubic-bezier(.34,1.4,.64,1),box-shadow 0.38s ease", boxShadow:hovered?`0 32px 70px ${card.shadowColor},0 4px 20px rgba(0,0,0,0.14)`:`0 10px 32px ${card.shadowColor.replace("0.40","0.24")}`, display:"flex", flexDirection:"column", minHeight:"340px" }}>

      {ripples.map(rp => (
        <div key={rp.id} style={{ position:"absolute", left:rp.x, top:rp.y, width:"10px", height:"10px", marginLeft:"-5px", marginTop:"-5px", borderRadius:"50%", background:"rgba(255,255,255,0.28)", animation:"svcRipple 0.65s ease-out forwards", pointerEvents:"none", zIndex:20 }}/>
      ))}

      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 30% 20%,rgba(255,255,255,0.13) 0%,transparent 65%)", opacity:hovered?1:0, transition:"opacity 0.4s", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", top:0, left:hovered?"110%":"-60%", width:"50%", height:"100%", background:"linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.08) 50%,transparent 70%)", transition:"left 0.65s cubic-bezier(.4,0,.2,1)", pointerEvents:"none", zIndex:2 }}/>

      <div style={{ position:"absolute", top:"22px", right:"22px", width:"48px", height:"48px", borderRadius:"14px", background:"rgba(255,255,255,0.15)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px", transform:hovered?"rotate(12deg) scale(1.15)":"rotate(0deg) scale(1)", transition:"transform 0.4s cubic-bezier(.34,1.56,.64,1)", zIndex:3 }}>
        {card.icon}
      </div>

      <div style={{ position:"absolute", bottom:"-28px", right:"-28px", width:"90px", height:"90px", borderRadius:"50%", border:"2px solid rgba(255,255,255,0.07)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"-14px", right:"-14px", width:"54px", height:"54px", borderRadius:"50%", border:"1.5px solid rgba(255,255,255,0.05)", pointerEvents:"none" }}/>

      <div style={{ padding:"36px 26px 32px", flex:1, display:"flex", flexDirection:"column", justifyContent:"flex-end", position:"relative", zIndex:3 }}>
        <h3 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:"1.22rem", color:card.titleColor, lineHeight:1.28, marginBottom:"12px", transform:hovered?"translateY(-3px)":"translateY(0)", transition:"transform 0.3s" }}>{card.title}</h3>
        <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.9rem", color:"rgba(255,255,255,0.80)", lineHeight:1.72, transform:hovered?"translateY(-2px)":"translateY(0)", transition:"transform 0.35s ease 0.04s" }}>{card.desc}</p>
        <div style={{ display:"flex", alignItems:"center", gap:"7px", marginTop:"18px", opacity:hovered?1:0, transform:hovered?"translateY(0)":"translateY(10px)", transition:"all 0.32s ease 0.06s" }}>
          <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:"0.82rem", color:"rgba(255,255,255,0.95)", letterSpacing:"0.05em", textTransform:"uppercase" }}>Learn More</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation:hovered?"arrowSlide 0.8s ease infinite":"none" }}><path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
    </div>
  );
}

function ServicesSection() {
  const [ref, inView] = useInView(0.1);
  return (
    <section id="services" ref={ref} style={{ padding:"80px 0", background:"#fff", borderTop:"1px solid #f0ebff", position:"relative" }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)`, backgroundSize:"32px 32px" }}/>
      <div style={{ maxWidth:"1160px", margin:"0 auto", padding:"0 48px", position:"relative", zIndex:1 }}>
        <div style={{ marginBottom:"48px", opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(20px)", transition:"all 0.7s ease" }}>
          <SectionLabel text="WHAT WE OFFER"/>
          <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:900, fontSize:"clamp(2rem,4vw,2.8rem)", color:"#1a0a3c", letterSpacing:"-0.03em", lineHeight:1.1 }}>
            Services <span style={{ background:"linear-gradient(135deg,#7c3aed,#a855f7)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>We Do</span>
          </h2>
        </div>
        <div style={{ display:"flex", gap:"26px", flexWrap:"wrap", alignItems:"stretch" }}>
          {SERVICE_CARDS.map((card, i) => <ServiceCard key={card.id} card={card} inView={inView} delay={120+i*140}/>)}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PLACEMENT SECTION
═══════════════════════════════════════════════════ */
const PLACEMENT_BARS = [
  { course:"AI Medical Coding",   rate:98, placed:142, avg:"3.8 LPA", color:"#1e3a8a" },
  { course:"AI Medical Billing",  rate:97, placed:88,  avg:"3.5 LPA", color:"#7c3aed" },
  { course:"Full Stack Dev",      rate:96, placed:118, avg:"5.2 LPA", color:"#c2410c" },
  { course:"SAP Development",     rate:95, placed:61,  avg:"6.0 LPA", color:"#14532d" },
  { course:"Data Analytics",      rate:94, placed:95,  avg:"4.5 LPA", color:"#0ea5e9" },
  { course:"UI/UX Design",        rate:92, placed:74,  avg:"4.8 LPA", color:"#ec4899" },
];

function PlacementSection() {
  const [ref, inView] = useInView(0.1);
  const [barWidths, setBarWidths] = useState(PLACEMENT_BARS.map(() => 0));

  useEffect(() => {
    if (!inView) return;
    PLACEMENT_BARS.forEach((b, i) => {
      setTimeout(() => {
        setBarWidths(prev => {
          const next = [...prev];
          next[i] = b.rate;
          return next;
        });
      }, 300 + i * 180);
    });
  }, [inView]);

  return (
    <section id="placement" ref={ref} style={{ padding:"80px 0", background:"#faf8ff", borderTop:"1px solid #f0ebff", position:"relative" }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)`, backgroundSize:"32px 32px" }}/>
      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 48px", position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom:"48px", opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(24px)", transition:"all 0.7s ease" }}>
          <SectionLabel text="PLACEMENT"/>
          <h2 style={{ fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:900, fontFamily:"'Outfit',sans-serif", color:"#0f0426", letterSpacing:"-0.02em" }}>
            Your Dream Job <span style={{ color:"#7c3aed" }}>Starts Here</span>
          </h2>
          <p style={{ fontSize:"15px", color:"#9270c0", marginTop:"10px", fontWeight:500, maxWidth:"500px", margin:"10px auto 0", fontFamily:"'Outfit',sans-serif" }}>
            We don't just train you — we place you. 100% placement assistance, 120+ hiring partners.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display:"flex", gap:"18px", flexWrap:"wrap", marginBottom:"48px" }}>
          {[{num:"500+",label:"Students Placed"},{num:"98%",label:"Placement Rate"},{num:"120+",label:"Hiring Partners"},{num:"4.2L",label:"Avg. Package"}].map((s,i) => (
            <div key={i} style={{ flex:1, minWidth:"140px", background:"#fff", border:"1.5px solid #e4d9ff", borderRadius:"20px", padding:"24px 18px", textAlign:"center", boxShadow:"0 4px 16px rgba(124,58,237,0.07)", transition:"all 0.32s", cursor:"default",
              opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(20px)", transitionDelay:`${i*0.1}s` }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-6px) scale(1.03)"; e.currentTarget.style.background="linear-gradient(135deg,#7c3aed,#5b21b6)"; e.currentTarget.querySelector(".sn").style.color="#fff"; e.currentTarget.querySelector(".sl").style.color="rgba(255,255,255,0.75)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0) scale(1)"; e.currentTarget.style.background="#fff"; e.currentTarget.querySelector(".sn").style.color="#7c3aed"; e.currentTarget.querySelector(".sl").style.color="#9270c0"; }}>
              <div className="sn" style={{ fontSize:"clamp(1.8rem,3vw,2.3rem)", fontWeight:900, color:"#7c3aed", lineHeight:1, letterSpacing:"-1px", transition:"color 0.32s" }}>{s.num}</div>
              <div className="sl" style={{ fontSize:"12px", color:"#9270c0", marginTop:"5px", fontWeight:600, letterSpacing:"0.04em", fontFamily:"'Outfit',sans-serif", transition:"color 0.32s" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Bars */}
        <div style={{ display:"flex", gap:"48px", alignItems:"flex-start", flexWrap:"wrap" }}>
          <div style={{ flex:"0 0 280px", opacity:inView?1:0, transform:inView?"translateX(0)":"translateX(-28px)", transition:"all 0.8s ease" }}>
            <h3 style={{ fontSize:"clamp(1.4rem,2.5vw,1.9rem)", fontWeight:900, fontFamily:"'Outfit',sans-serif", color:"#0f0426", lineHeight:1.15, letterSpacing:"-0.02em", marginBottom:"12px" }}>
              Course-wise<br/><span style={{ color:"#7c3aed" }}>Placement Rate</span>
            </h3>
            <p style={{ fontSize:"13.5px", color:"#9270c0", lineHeight:1.75, fontWeight:500, fontFamily:"'Outfit',sans-serif" }}>
              Every course at Skillra is backed by dedicated placement cells and active employer relationships built over 15+ years.
            </p>
          </div>
          <div style={{ flex:1, display:"flex", flexDirection:"column", gap:"12px" }}>
            {PLACEMENT_BARS.map((b, i) => (
              <div key={i}
                style={{ background:"#fff", border:"1.5px solid #e4d9ff", borderRadius:"14px", padding:"16px 20px", cursor:"default",
                  opacity:inView?1:0, transform:inView?"translateX(0)":"translateX(-30px)",
                  transition:`opacity 0.6s ease ${i*0.1}s, transform 0.6s ease ${i*0.1}s, border-color 0.22s, box-shadow 0.22s` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=b.color; e.currentTarget.style.boxShadow=`0 4px 20px ${b.color}22`; e.currentTarget.style.transform="translateX(6px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="#e4d9ff"; e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="translateX(0)"; }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
                  <span style={{ fontSize:"13.5px", fontWeight:700, color:"#1a0640", fontFamily:"'Outfit',sans-serif" }}>{b.course}</span>
                  <div style={{ display:"flex", gap:"14px", alignItems:"center" }}>
                    <span style={{ fontSize:"11px", color:"#9270c0", fontWeight:600, fontFamily:"'Outfit',sans-serif" }}>{b.placed} placed · {b.avg}</span>
                    <span style={{ fontSize:"15px", fontWeight:900, color:b.color, fontFamily:"'Outfit',sans-serif", minWidth:"42px", textAlign:"right" }}>{b.rate}%</span>
                  </div>
                </div>
                <div style={{ height:"8px", background:"#ede8ff", borderRadius:"99px", overflow:"hidden" }}>
                  <div style={{
                    height:"100%",
                    width:`${barWidths[i]}%`,
                    background:`linear-gradient(90deg, ${b.color}, ${b.color}aa)`,
                    borderRadius:"99px",
                    transition:"width 1.1s cubic-bezier(0.4,0,0.2,1)",
                    boxShadow:`0 2px 8px ${b.color}44`,
                  }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CONTACT SECTION
═══════════════════════════════════════════════════ */
function ContactSection() {
  const [ref, inView] = useInView(0.1);
  const [activeIdx, setActiveIdx] = useState(0);
  const [animating, setAnimating]  = useState(false);
  const [playing, setPlaying]      = useState(true);
  const timerRef = useRef(null);

  const goTo = useCallback((i) => {
    clearInterval(timerRef.current);
    setAnimating(true);
    setTimeout(() => { setActiveIdx(i); setAnimating(false); }, 320);
    if (playing) startAuto();
  }, [playing]);

  const startAuto = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setAnimating(true);
      setTimeout(() => { setActiveIdx(i => (i+1) % TESTIMONIALS.length); setAnimating(false); }, 320);
    }, 4500);
  }, []);

  useEffect(() => {
    if (playing) startAuto();
    else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [playing, startAuto]);

  const [form, setForm] = useState({ name:"", email:"", phone:"", course:"" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name="Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email="Invalid";
    if (!form.phone.trim() || form.phone.length<8) e.phone="Invalid";
    if (!form.course) e.course="Pick one";
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
    <section id="contact" ref={ref} style={{ padding:"80px 0", background:"#fff", borderTop:"1px solid #f0ebff", position:"relative" }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)`, backgroundSize:"32px 32px" }}/>
      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 48px", position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom:"48px", opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(20px)", transition:"all 0.7s ease" }}>
          <SectionLabel text="CONTACT US"/>
          <h2 style={{ fontSize:"clamp(1.8rem,3vw,2.4rem)", fontWeight:900, fontFamily:"'Outfit',sans-serif", color:"#120630", letterSpacing:"-0.02em" }}>
            We'd Love to <span style={{ color:"#7c3aed" }}>Hear From You</span>
          </h2>
        </div>

        <div style={{ display:"flex", gap:"48px", alignItems:"flex-start", flexWrap:"wrap" }}>
          {/* LEFT — testimonials */}
          <div style={{ flex:"0 0 auto", width:"420px", opacity:inView?1:0, transform:inView?"translateX(0)":"translateX(-28px)", transition:"all 0.9s ease 0.1s" }}>

            <div style={{ background:"#fff", borderRadius:"24px", padding:"32px 28px", border:"1.5px solid #e4d9ff", boxShadow:"0 8px 32px rgba(124,58,237,0.09)", position:"relative", overflow:"hidden", marginBottom:"20px", minHeight:"220px" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:"4px", background:"linear-gradient(90deg,#7c3aed,#a78bfa,#7c3aed)", backgroundSize:"200% 100%", animation:"shimmer 3s infinite" }}/>
              <div style={{ marginBottom:"14px" }}>
                <svg width="36" height="28" viewBox="0 0 44 36" fill="none"><path d="M0 36V22.5C0 14.9 4.1 8.6 12.3 3.6L15.6 7.4C11.9 9.8 9.5 13.2 8.4 17.7H16V36H0ZM28 36V22.5C28 14.9 32.1 8.6 40.3 3.6L43.6 7.4C39.9 9.8 37.5 13.2 36.4 17.7H44V36H28Z" fill="rgba(124,58,237,0.18)"/></svg>
              </div>
              <div style={{ opacity:animating?0:1, transform:animating?"translateY(10px)":"translateY(0)", transition:"all 0.32s", minHeight:"72px", marginBottom:"14px" }}>
                <p style={{ fontSize:"14.5px", lineHeight:1.75, color:"#3b2a6e", fontFamily:"'Outfit',sans-serif" }}>{t.text}</p>
              </div>
              <div style={{ opacity:animating?0:1, transition:"all 0.32s" }}>
                <div style={{ fontSize:"13px", color:"#7c3aed", fontWeight:700, fontFamily:"'Outfit',sans-serif" }}>— {t.name}</div>
                <div style={{ fontSize:"11.5px", color:"#9270c0", marginTop:"2px", fontFamily:"'Outfit',sans-serif" }}>{t.role}</div>
              </div>
            </div>

            {/* Avatars + play/pause */}
            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"20px" }}>
              {TESTIMONIALS.map((item, i) => (
                <div key={item.id} onClick={() => goTo(i)} style={{ width:i===activeIdx?48:38, height:i===activeIdx?48:38, borderRadius:"50%", overflow:"hidden", cursor:"pointer", border:`2.5px solid ${i===activeIdx?"#7c3aed":"#e4d9ff"}`, transform:i===activeIdx?"scale(1.10)":"scale(1)", transition:"all 0.28s", background:"linear-gradient(135deg,#7c3aed,#a78bfa)", boxShadow:i===activeIdx?"0 4px 16px rgba(124,58,237,0.30)":"none", flexShrink:0 }}>
                  <img src={item.avatar} alt={item.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e => e.target.style.display="none"}/>
                </div>
              ))}

              <button onClick={() => setPlaying(p => !p)} style={{ marginLeft:"auto", width:42, height:42, borderRadius:"50%", border:"1.5px solid #c4b5fd", background:playing?"rgba(124,58,237,0.07)":"rgba(124,58,237,0.14)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all 0.22s", flexShrink:0 }}
                onMouseEnter={e => e.currentTarget.style.background="rgba(124,58,237,0.16)"}
                onMouseLeave={e => e.currentTarget.style.background=playing?"rgba(124,58,237,0.07)":"rgba(124,58,237,0.14)"}>
                {playing ? (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <rect x="3" y="2" width="4" height="12" rx="1.5" fill="#7c3aed"/>
                    <rect x="9" y="2" width="4" height="12" rx="1.5" fill="#7c3aed"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M4 2.5l10 5.5-10 5.5V2.5z" fill="#7c3aed"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Progress dots */}
            <div style={{ display:"flex", gap:"6px", marginBottom:"20px" }}>
              {TESTIMONIALS.map((_,i) => (
                <div key={i} onClick={() => goTo(i)} style={{ height:"4px", borderRadius:"99px", background:i===activeIdx?"#7c3aed":"#e4d9ff", flex:i===activeIdx?2:1, transition:"all 0.4s ease", cursor:"pointer" }}/>
              ))}
            </div>

            {/* Stats */}
            <div style={{ display:"flex", gap:"12px" }}>
              {[{num:"100+",label:"Students Placed"},{num:"15+",label:"Years Experience"},{num:"50+",label:"Hiring Partners"}].map((s,i) => (
                <div key={i} style={{ flex:1, background:"#fff", border:"1.5px solid #e4d9ff", borderRadius:"14px", padding:"12px 10px", textAlign:"center", boxShadow:"0 2px 10px rgba(124,58,237,0.07)" }}>
                  <div style={{ fontSize:"20px", fontWeight:900, color:"#7c3aed", lineHeight:1, fontFamily:"'Outfit',sans-serif" }}>{s.num}</div>
                  <div style={{ fontSize:"10px", color:"#9270c0", marginTop:"3px", fontWeight:600, fontFamily:"'Outfit',sans-serif" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display:"flex", gap:"8px", marginTop:"16px", flexWrap:"wrap" }}>
              {[{icon:"📞",text:"+91 98765 43210"},{icon:"✉️",text:"info@skillra.com"},{icon:"📍",text:"Madurai"}].map((item,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:"7px", background:"#fff", border:"1.5px solid #e4d9ff", borderRadius:"50px", padding:"8px 14px", fontSize:"12px", color:"#3b1f7a", fontWeight:600, fontFamily:"'Outfit',sans-serif", boxShadow:"0 2px 10px rgba(124,58,237,0.07)", transition:"all 0.22s", cursor:"default" }}
                  onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(124,58,237,0.13)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 10px rgba(124,58,237,0.07)"; }}>
                  <span>{item.icon}</span><span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — form */}
          <div style={{ flex:1, opacity:inView?1:0, transform:inView?"translateX(0)":"translateX(28px)", transition:"all 0.9s ease 0.2s" }}>
            <div style={{ background:"#fff", borderRadius:"28px", padding:"40px 36px", border:"1.5px solid #e4d9ff", boxShadow:"0 16px 56px rgba(124,58,237,0.11)", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:"4px", background:"linear-gradient(90deg,#7c3aed,#a78bfa,#7c3aed)", backgroundSize:"200% 100%", animation:"shimmer 3s infinite" }}/>
              {submitted ? (
                <div style={{ textAlign:"center", padding:"20px 0" }}>
                  <div style={{ width:"64px", height:"64px", borderRadius:"50%", background:"linear-gradient(135deg,#7c3aed,#5b21b6)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", boxShadow:"0 8px 28px rgba(124,58,237,0.35)" }}>
                    <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M7 16l7 7 11-12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h3 style={{ fontSize:"20px", fontWeight:800, color:"#1a0640", marginBottom:"8px", fontFamily:"'Outfit',sans-serif" }}>Message Sent!</h3>
                  <p style={{ fontSize:"13px", color:"#6b5a9e", lineHeight:1.7, fontFamily:"'Outfit',sans-serif" }}>Our counselors will contact you within 24 hours.</p>
                  <button onClick={() => { setSubmitted(false); setForm({name:"",email:"",phone:"",course:""}); }} style={{ marginTop:"20px", background:"none", border:"1.5px solid #7c3aed", color:"#7c3aed", borderRadius:"50px", padding:"9px 24px", fontSize:"13px", fontWeight:700, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>Send Another</button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize:"24px", fontWeight:900, color:"#1a0640", marginBottom:"5px", letterSpacing:"-0.3px", fontFamily:"'Outfit',sans-serif" }}>We're here to help!</h3>
                  <p style={{ fontSize:"13px", color:"#9270c0", marginBottom:"24px", fontWeight:500, fontFamily:"'Outfit',sans-serif" }}>Please contact us in case of any query.</p>
                  {[{label:"Your name",key:"name",type:"text"},{label:"Your email address",key:"email",type:"email"},{label:"Your phone number",key:"phone",type:"tel"}].map(f => (
                    <div key={f.key} style={{ marginBottom:"13px" }}>
                      <input type={f.type} placeholder={f.label} value={form[f.key]}
                        onChange={e => { setForm({...form,[f.key]:e.target.value}); setErrors({...errors,[f.key]:""}); }}
                        style={{ width:"100%", padding:"12px 16px", fontSize:"14px", fontFamily:"'Outfit',sans-serif", fontWeight:500, color:"#1a0640", background:errors[f.key]?"#fff5f5":"#f8f5ff", border:`1.5px solid ${errors[f.key]?"#ef4444":"#e4d9ff"}`, borderRadius:"12px", outline:"none", transition:"all 0.22s" }}
                        onFocus={e => { e.target.style.borderColor="#7c3aed"; e.target.style.background="#fff"; e.target.style.boxShadow="0 0 0 4px rgba(124,58,237,0.09)"; }}
                        onBlur={e => { e.target.style.borderColor=errors[f.key]?"#ef4444":"#e4d9ff"; e.target.style.background=errors[f.key]?"#fff5f5":"#f8f5ff"; e.target.style.boxShadow="none"; }}
                      />
                    </div>
                  ))}
                  <div style={{ marginBottom:"20px", position:"relative" }}>
                    <select value={form.course} onChange={e => { setForm({...form,course:e.target.value}); setErrors({...errors,course:""}); }}
                      style={{ width:"100%", padding:"12px 16px", fontSize:"14px", fontFamily:"'Outfit',sans-serif", fontWeight:500, color:form.course?"#1a0640":"#9270c0", background:"#f8f5ff", border:`1.5px solid ${errors.course?"#ef4444":"#e4d9ff"}`, borderRadius:"12px", outline:"none", cursor:"pointer", appearance:"none", WebkitAppearance:"none", transition:"all 0.22s" }}
                      onFocus={e => e.target.style.borderColor="#7c3aed"} onBlur={e => e.target.style.borderColor=errors.course?"#ef4444":"#e4d9ff"}>
                      <option value="">Select Course</option>
                      {CONTACT_COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <div style={{ position:"absolute", right:"14px", top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#9270c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                  <button onClick={handleSubmit} disabled={submitting} style={{ position:"relative", overflow:"hidden", background:"linear-gradient(135deg,#7c3aed,#5b21b6)", color:"#fff", border:"none", borderRadius:"50px", padding:"13px 30px", fontSize:"14px", fontWeight:700, fontFamily:"'Outfit',sans-serif", cursor:"pointer", display:"flex", alignItems:"center", gap:"10px", boxShadow:"0 6px 20px rgba(124,58,237,0.30)", transition:"all 0.22s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 12px 32px rgba(124,58,237,0.42)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(124,58,237,0.30)"; }}>
                    {submitting?"Sending…":"Get in Touch"}
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
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
   NEWSLETTER
═══════════════════════════════════════════════════ */
function NewsletterSection() {
  const [ref, inView] = useInView(0.3);
  const [email, setEmail] = useState(""), [subscribed, setSubscribed] = useState(false), [subscribing, setSubscribing] = useState(false);
  const handleSubscribe = () => { if(!email.trim()||!/\S+@\S+\.\S+/.test(email))return; setSubscribing(true); setTimeout(()=>{setSubscribing(false);setSubscribed(true);},1400); };
  return (
    <div ref={ref} style={{ background:"linear-gradient(135deg,#6d28d9,#7c3aed,#6d28d9)", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,0.10) 1px,transparent 1px)", backgroundSize:"22px 22px", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"3px", background:"linear-gradient(90deg,#06b6d4,#22d3ee,#67e8f9,#22d3ee,#06b6d4)", backgroundSize:"200% 100%", animation:"shimmer 3s linear infinite" }}/>
      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"36px 48px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"36px", flexWrap:"wrap", position:"relative", zIndex:1, opacity:inView?1:0, transition:"opacity 0.8s ease" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"20px" }}>
          <div style={{ width:"46px", height:"46px", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", animation:"spinRingAnim 6s linear infinite" }}>
            <svg width="40" height="40" viewBox="0 0 46 46" fill="none"><path d="M23 4v38M4 23h38M8 8l30 30M38 8L8 38" stroke="rgba(255,255,255,0.85)" strokeWidth="3.5" strokeLinecap="round"/></svg>
          </div>
          <div>
            <h2 style={{ fontSize:"clamp(1.2rem,2.2vw,1.6rem)", fontWeight:900, color:"#fff", lineHeight:1.1, letterSpacing:"-0.02em", marginBottom:"5px", fontFamily:"'Outfit',sans-serif" }}>Join Our Newsletter</h2>
            <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.75)", fontWeight:500, fontFamily:"'Outfit',sans-serif" }}>Subscribe to get our latest updates &amp; news.</p>
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
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleSubscribe()} placeholder="Enter your email"
              style={{ height:"48px", width:"clamp(200px,26vw,300px)", padding:"0 16px", fontSize:"14px", fontFamily:"'Outfit',sans-serif", fontWeight:500, color:"#1a0640", background:"rgba(255,255,255,0.96)", border:"2px solid rgba(255,255,255,0.7)", borderRadius:"12px", outline:"none" }}
              onFocus={e=>e.target.style.borderColor="#fff"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.7)"}/>
            <button onClick={handleSubscribe} disabled={subscribing} style={{ height:"48px", background:"#111", color:"#fff", border:"none", borderRadius:"12px", padding:"0 24px", fontSize:"14px", fontWeight:700, fontFamily:"'Outfit',sans-serif", cursor:"pointer", whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:"8px", transition:"all 0.22s" }}
              onMouseEnter={e=>{e.currentTarget.style.background="#2d1b69";e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="#111";e.currentTarget.style.transform="translateY(0)";}}>
              {subscribing?"Subscribing…":"Subscribe Now"}
              {!subscribing&&<svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════ */
export default function HomePage() {
  const scrollRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let af, pos = 0;
    const step = () => { pos += 0.55; if(pos>=el.scrollWidth/2)pos=0; el.scrollLeft=pos; af=requestAnimationFrame(step); };
    af = requestAnimationFrame(step);
    return () => cancelAnimationFrame(af);
  }, []);

  return (
    <div style={{ fontFamily:"'Outfit','Segoe UI',sans-serif", margin:0, padding:0, overflowX:"hidden", background:"#faf8ff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html,body{overflow-x:hidden;}

        @keyframes floatY    {0%,100%{transform:translateY(0px)}50%{transform:translateY(-14px)}}
        @keyframes floatCard {0%,100%{transform:translateY(0px)}50%{transform:translateY(-7px)}}
        @keyframes drawArc   {from{stroke-dashoffset:750}to{stroke-dashoffset:0}}
        @keyframes fadeUp    {from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeRight {from{opacity:0;transform:translateX(-22px)}to{opacity:1;transform:translateX(0)}}
        @keyframes fadeScale {from{opacity:0;transform:scale(0.88)}to{opacity:1;transform:scale(1)}}
        @keyframes shimmer   {0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes glowPulse {0%,100%{box-shadow:0 2px 12px rgba(124,58,237,0.1)}50%{box-shadow:0 4px 20px rgba(124,58,237,0.25)}}
        @keyframes spinRingAnim{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes modalPop  {from{opacity:0;transform:scale(0.88) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes pulse     {0%,100%{box-shadow:0 8px 28px rgba(124,58,237,0.35)}50%{box-shadow:0 8px 40px rgba(124,58,237,0.55)}}
        @keyframes svcRipple {0%{width:10px;height:10px;opacity:0.8;margin-left:-5px;margin-top:-5px}100%{width:350px;height:350px;opacity:0;margin-left:-175px;margin-top:-175px}}
        @keyframes arrowSlide{0%{transform:translateX(0);opacity:1}45%{transform:translateX(5px);opacity:0.4}46%{transform:translateX(-5px);opacity:0}55%{transform:translateX(-5px);opacity:0}100%{transform:translateX(0);opacity:1}}

        .hero-float{animation:floatY 6s ease-in-out infinite;}
        .card-float{animation:floatCard 4.5s ease-in-out 0.5s infinite;}
        .v0{animation:fadeRight .6s ease forwards;opacity:0;animation-delay:.05s;}
        .v1{animation:fadeUp .6s ease forwards;opacity:0;animation-delay:.18s;}
        .v2{animation:fadeUp .6s ease forwards;opacity:0;animation-delay:.32s;}
        .v3{animation:fadeUp .6s ease forwards;opacity:0;animation-delay:.46s;}
        .v4{animation:fadeUp .6s ease forwards;opacity:0;animation-delay:.60s;}
        .vR{animation:fadeScale .9s ease forwards;opacity:0;animation-delay:.20s;}
        .arc-path{stroke-dasharray:750;stroke-dashoffset:750;animation:drawArc 3.6s ease 1.8s forwards;}

        .cta-btn{transition:transform .2s,box-shadow .2s;position:relative;overflow:hidden;}
        .cta-btn::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent);background-size:200% 100%;animation:shimmer 2.2s infinite;}
        .cta-btn:hover{transform:translateY(-3px) scale(1.03);box-shadow:0 12px 32px rgba(255,80,0,.55)!important;}

        .badge-tag{animation:glowPulse 3s ease-in-out infinite;}
        .company-item{transition:color .2s,transform .2s;}
        .company-item:hover{color:#7c3aed!important;transform:scale(1.06);}

        .mobile-cta-block{display:none;}
        .desktop-cta-block{display:flex;}

        @media(max-width:1100px){
          .hero-inner{padding:44px 40px 16px!important;gap:32px!important;}
          .hero-left{width:100%!important;max-width:480px!important;}
          .circle-size{width:400px!important;height:400px!important;}
          .hero-title{font-size:42px!important;}
        }
        @media(max-width:820px){
          .hero-inner{flex-direction:column!important;align-items:center!important;padding:36px 24px 16px!important;text-align:center!important;}
          .hero-left{width:100%!important;max-width:100%!important;}
          .badge-tag{margin:0 auto 18px!important;}
          .hero-bullets{justify-content:center!important;}
          .desktop-cta-block{display:none!important;}
          .mobile-cta-block{display:flex!important;}
          .hero-right{justify-content:center!important;width:100%!important;}
          .circle-size{width:300px!important;height:300px!important;}
          .hero-title{font-size:38px!important;letter-spacing:-1px!important;}
          .glass-card-pos{left:50%!important;transform:translateX(-50%)!important;bottom:-24px!important;}
        }
        @media(max-width:480px){
          .hero-title{font-size:30px!important;}
          .circle-size{width:260px!important;height:260px!important;}
          .hero-inner{padding:28px 16px 12px!important;}
          .partners-title{font-size:20px!important;}
        }
      `}</style>

      {showModal && <CounselorModal onClose={() => setShowModal(false)}/>}

      <HeroSection scrollRef={scrollRef} onCounselorClick={() => setShowModal(true)}/>
      <AboutSection />
      <CoursesSection />
      <PlacementSection />
      <ContactSection />
      <Footer />
    </div>
  );
}