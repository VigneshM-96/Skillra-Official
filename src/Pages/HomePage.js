import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import SocialSidebar from "../components/SocialSideBar";
import { BLOG_POSTS } from "./BlogDatas";
import { Link } from "react-router-dom";

// ─── Update this with your Google Apps Script URL for newsletter ───────────────
const SHEETS_URL = "https://script.google.com/macros/s/AKfycbws7QqEJT-y2F_6U_VyyuQ56sdXZUYEgXb7qLagegYmmPfqI-5EoGJ6wXGrHuQIC-jTWA/exec";



const PUB = process.env.PUBLIC_URL || "";

const COMPANIES = [
  { name: "Unsplash",   logo: `${PUB}/HiringPartners/CORRO.png`   },
  { name: "Notion",     logo: `${PUB}/HiringPartners/R1.png`     },
  { name: "Intercom",   logo: `${PUB}/HiringPartners/FIRSTSOURCE.png`   },
  { name: "Descript",   logo: `${PUB}/HiringPartners/CLARUS.png`   },
  { name: "Grammarly",  logo: `${PUB}/HiringPartners/SAVISTA.png`  },
  { name: "Slack",      logo: `${PUB}/HiringPartners/S10.png`      },
  { name: "Figma",      logo: `${PUB}/HiringPartners/VEE HEALTHTEK.png`      },
  { name: "Linear",     logo: `${PUB}/HiringPartners/MEDCODE.png`     },
  { name: "Vercel",     logo: `${PUB}/HiringPartners/OPTUM.png`     },
  { name: "Stripe",     logo: `${PUB}/HiringPartners/AANEEL.png`     },
  { name: "Stripe",     logo: `${PUB}/HiringPartners/ACCESSHEALTH.png`},
  { name: "Stripe",     logo: `${PUB}/HiringPartners/REVEELER.png` },
  { name: "Stripe",     logo: `${PUB}/HiringPartners/SUTHERLAND.png` },
  { name: "Stripe",     logo: `${PUB}/HiringPartners/HURON.png` },
  { name: "Stripe",     logo: `${PUB}/HiringPartners/COGNIZANT.png` },
];

const SLIDES = [
  {
    img: `${PUB}/HomeImages/MedicalCodingHero.png` ,
    // 👩‍⚕️ Female doctor/nurse in medical setting — white coat, slight purple-cool tone
    bg: "linear-gradient(145deg,#6d28d9,#7c3aed,#4c1d95)",
    shadow: "rgba(79,28,200,.55)",
    ring: "rgba(124,58,237,.30)"
  },
  {
    img: `${PUB}/HomeImages/TechHomeHero.png`,
    // 👨‍💻 Male developer/tech professional with screens/code background — warm orange tone
    bg: "linear-gradient(145deg,#c2410c,#ea580c,#9a3412)",
    shadow: "rgba(194,65,12,.55)",
    ring: "rgba(234,88,12,.30)",
    imgStyle: {
      transform: "scale(1.2) translateY(-5%)",
      transformOrigin: "center top",
      objectFit: "cover"
    }
  },
  {
    img: `${PUB}/HomeImages/FinanceHero.png`,
    // 👩‍💼 Female finance professional with charts/office background — green tone
    bg: "linear-gradient(145deg,#14532d,#15803d,#166534)",
    shadow: "rgba(20,83,45,.55)",
    ring: "rgba(21,128,61,.30)",
    imgStyle: {
      transform: "scale(1.2) translateY(-5%)",
      transformOrigin: "center top",
      objectFit: "cover"
    }
  },
];
const COURSES_DATA = {
  healthcare: {
    label: "Healthcare",
    activeColor: "#1e3a8a", tagColor: "#1e3a8a", btnColor: "#1e3a8a", badgeBg: "#1e3a8a",
    cardBg: "linear-gradient(145deg,#eff6ff 0%,#dbeafe 100%)",
    courses: [
      {
        id: "ai-medical-coding-course",
        title: "AI Medical Coding Course",
        description: "Get certified and learn AI-powered coding skills with real case studies.",
        image: `${PUB}/coursemedicalcoding.jpg`,
        // Doctor reviewing digital patient records / medical data on screen
      },
      {
        id: "ai-medical-billing-course",
        title: "AI Medical Billing Course",
        description: "Become a certified AI Medical Billing professional with job guarantee.",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&auto=format&fit=crop",
        // Medical billing / finance paperwork and calculator
      },
      {
        id: "ai-medical-scribing-course",
        title: "AI Medical Scribing Course",
        description: "Learn AI-based medical scribing and clinical documentation.",
        image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&auto=format&fit=crop",
        // Medical professional writing/documenting clinical notes
      },
    ],
  },

  technology: {
    label: "Technology",
    activeColor: "#c2410c", tagColor: "#c2410c", btnColor: "#c2410c", badgeBg: "#c2410c",
    cardBg: "linear-gradient(145deg,#fff7ed 0%,#ffedd5 100%)",
    courses: [
      {
        id: "full-stack-course",
        title: "Full Stack Course",
        description: "Become a full-stack web developer with our MERN and MEAN Stack Course.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop",
        // Developer coding on laptop with multiple screens
      },
      {
  id: "ai-machine-learning-course",
  title: "AI & Machine Learning Course",
  description: "Master Python, ML algorithms, and deep learning to build intelligent real-world AI applications.",
  image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&auto=format&fit=crop",
  // AI neural network / machine learning concept with glowing tech background
},
      {
        id: "data-analytics-course",
        title: "Data Analytics Course",
        description: "Join our Data Analytics Course for high-demand data careers.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop",
        // Data charts and analytics dashboard
      },
      
      
    ],
  },

  finance: {
    label: "Finance",
    activeColor: "#14532d", tagColor: "#14532d", btnColor: "#14532d", badgeBg: "#14532d",
    cardBg: "linear-gradient(145deg,#f0fdf4 0%,#dcfce7 100%)",
    courses: [
      {
        id: "sap-development-course",
        title: "SAP Development Course",
        description: "Master SAP ABAP and become a certified SAP developer.",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&auto=format&fit=crop",
        // ERP / enterprise software dashboard on screen
      },
      {
        id: "tally-gst-course",
        title: "Tally & GST Course",
        description: "Learn Tally with GST accounting and prepare for accounting careers.",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop",
        // Accountant working with financial spreadsheets / calculator
      },
    ],
  },

  others: {
  label: "Others",
  activeColor: "#b45309", tagColor: "#b45309", btnColor: "#b45309", badgeBg: "#b45309",
  cardBg: "linear-gradient(145deg,#fffbeb 0%,#fef3c7 100%)",
  courses: [
    {
        id: "ui-ux-design-course",
        title: "UI/UX Design Course",
        description: "Join our UI/UX Designing Course to build professional websites.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop",
        // Designer working on UI wireframes / design mockups
      },
    {
      id: "personality-development-course",
      title: "Personality Development Course",
      description: "Build confidence, communication skills, and a winning mindset for personal and professional growth.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop",
      // Group of confident professionals in a training/workshop setting
    },
    {
  id: "digital-marketing-course",
  title: "Digital Marketing Course",
  description: "Master SEO, social media, content strategy, and paid advertising to grow brands and drive results in the digital world.",
  image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&auto=format&fit=crop",
  // Digital marketing professionals analyzing campaign metrics and strategy
},

  ],
},
};

// ─── REPLACE THESE with your real student reviews ────────────────────────────
// Just edit name, role, rating, text for each student.
// For avatar, either use a real photo path like `${PUB}/student1.jpg`
// or leave the default images as-is.
const STUDENT_REVIEWS = [
  {
    name: "Swetha K H",
    role: "Student",
    rating: 5,
    avatar: `${PUB}/userreview1.png`,
    text: "Best experience we had in SkillRaa Technology, I gained extensive exposure to medical coding across multiple specialties. Staff are very friendly and thank you for Dr Saraswathi mam she is teaching very well and easily understand.. thankyou skillra technology",
    time: "1 month ago",
  },
  {
    name: "Klara Racheel",
    role: "Student",
    rating: 5,
    avatar: `${PUB}/userreview7.png`,
    text: "Good coaching with clear explanation and proper guidance.",
    time: "1 months ago",
  },
  
  {
    name: "Jeffrey Sebastian",
    role: "Student",
    rating: 5,
    avatar: `${PUB}/userreview2.png`,
    text: "I studied SAP ABAB here and got placed as a Senior Consultant. Very thanks to Skillra as the teaching was good and supportive.",
    time: "4 months ago",
  },
  {
    name: "SURIYA 11",
    role: "Student",
    rating: 5,
    avatar: `${PUB}/userreview5.png`,
    text: "Practical classes helped me understand concepts easily.",
    time: "3 weeks ago",
  },

  {
    name: "Mohan Raj",
    role: "Student",
    rating: 4,
    avatar: `${PUB}/userreview4.png`,
    text: "Great place to start a career in medical coding. Teachers are supportive and friendly.",
    time: "1 months ago",
  },
  
  
];

// Average rating computed automatically from the reviews above
const AVG_RATING = (STUDENT_REVIEWS.reduce((s, r) => s + r.rating, 0) / STUDENT_REVIEWS.length).toFixed(1);
const TOTAL_COUNT = "100+";

const CONTACT_COURSES = [
  "AI Medical Coding","AI Medical Billing","AI Medical Scribing",
  "MERN / MEAN Stack","UI/UX Designing","AI & Machine Learning",
  "SAP ABAP Development","Tally & GST",
];

/* ═══════════════ HOOK ═══════════════ */
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

/* ═══════════════ COUNSELOR MODAL ═══════════════ */
function CounselorModal({ onClose }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"", course:"" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { document.body.style.overflow="hidden"; return () => { document.body.style.overflow=""; }; }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Enter your full name";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim() || !/^\d{10,}$/.test(form.phone.replace(/[\s\-+]/g,""))) e.phone = "Enter a valid 10-digit number";
    if (!form.course) e.course = "Please select a course";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1400);
  };

  const Field = ({ fkey, label, type }) => (
    <div style={{ marginBottom:"14px" }}>
      <input type={type} placeholder={label} value={form[fkey]}
        onChange={e => { setForm(p=>({...p,[fkey]:e.target.value})); setErrors(p=>({...p,[fkey]:""})); }}
        style={{ width:"100%", padding:"13px 16px", fontSize:"14px", fontFamily:"'Outfit',sans-serif", fontWeight:500, color:"#1a0640", background:errors[fkey]?"#fff5f5":"#f8f5ff", border:`1.5px solid ${errors[fkey]?"#ef4444":"#e4d9ff"}`, borderRadius:"12px", outline:"none", transition:"all 0.22s", boxSizing:"border-box" }}
        onFocus={e => { e.target.style.borderColor="#7c3aed"; e.target.style.background="#fff"; e.target.style.boxShadow="0 0 0 4px rgba(124,58,237,0.09)"; }}
        onBlur={e => { e.target.style.borderColor=errors[fkey]?"#ef4444":"#e4d9ff"; e.target.style.background=errors[fkey]?"#fff5f5":"#f8f5ff"; e.target.style.boxShadow="none"; }}
      />
      {errors[fkey] && <div style={{ fontSize:"11.5px", color:"#ef4444", marginTop:"4px", fontFamily:"'Outfit',sans-serif", display:"flex", alignItems:"center", gap:"4px" }}>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.5"/><path d="M8 5v4M8 11v.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
        {errors[fkey]}
      </div>}
    </div>
  );

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(15,4,38,0.75)", backdropFilter:"blur(8px)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#fff", borderRadius:"28px", padding:"clamp(28px,5%,44px) clamp(20px,5%,40px)", width:"100%", maxWidth:"480px", position:"relative", boxShadow:"0 32px 80px rgba(124,58,237,0.28)", animation:"modalPop 0.38s cubic-bezier(.34,1.56,.64,1) both", maxHeight:"90vh", overflowY:"auto" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"4px", background:"linear-gradient(90deg,#7c3aed,#a78bfa,#ff6b35,#7c3aed)", backgroundSize:"300% 100%", animation:"shimmer 3s linear infinite", borderRadius:"28px 28px 0 0" }}/>
        <button onClick={onClose} style={{ position:"absolute", top:"16px", right:"16px", width:"32px", height:"32px", borderRadius:"50%", background:"#f3f0ff", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px", color:"#7c3aed", transition:"all 0.2s" }}
          onMouseEnter={e=>e.currentTarget.style.background="#ede9fe"} onMouseLeave={e=>e.currentTarget.style.background="#f3f0ff"}>✕</button>
        {submitted ? (
          <div style={{ textAlign:"center", padding:"16px 0" }}>
            <div style={{ width:"72px", height:"72px", borderRadius:"50%", background:"linear-gradient(135deg,#7c3aed,#5b21b6)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px", boxShadow:"0 8px 28px rgba(124,58,237,0.35)", animation:"pulse 2s ease-in-out infinite" }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M7 16l7 7 11-12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 style={{ fontSize:"22px", fontWeight:900, color:"#1a0640", marginBottom:"10px", fontFamily:"'Outfit',sans-serif" }}>We'll Call You Soon!</h3>
            <p style={{ fontSize:"14px", color:"#6b5a9e", lineHeight:1.7, fontFamily:"'Outfit',sans-serif" }}>Our counselors will reach you within 24 hours.<br/>Get ready for your career journey! 🚀</p>
            <button onClick={onClose} style={{ marginTop:"22px", background:"linear-gradient(135deg,#7c3aed,#5b21b6)", border:"none", color:"#fff", borderRadius:"50px", padding:"11px 28px", fontSize:"13px", fontWeight:700, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>Close</button>
          </div>
        ) : (
          <>
            <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"#f3f0ff", border:"1.5px solid #e4d9ff", borderRadius:"8px", padding:"6px 14px", fontSize:"11.5px", color:"#7c3aed", fontWeight:700, marginBottom:"14px", letterSpacing:"0.08em" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#7c3aed"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              FREE COUNSELING
            </div>
            <h3 style={{ fontSize:"clamp(20px,4vw,26px)", fontWeight:900, color:"#1a0640", marginBottom:"5px", letterSpacing:"-0.4px", fontFamily:"'Outfit',sans-serif" }}>Talk to Our Experts</h3>
            <p style={{ fontSize:"13.5px", color:"#9270c0", marginBottom:"22px", fontWeight:500, fontFamily:"'Outfit',sans-serif" }}>Fill in your details — we'll get back within 24 hours.</p>
            <Field fkey="name"  label="Your full name"  type="text"  />
            <Field fkey="email" label="Email address"   type="email" />
            <Field fkey="phone" label="Phone number (10 digits)" type="tel" />
            <div style={{ marginBottom:"20px", position:"relative" }}>
              <select value={form.course} onChange={e => { setForm(p=>({...p,course:e.target.value})); setErrors(p=>({...p,course:""})); }}
                style={{ width:"100%", padding:"13px 16px", fontSize:"14px", fontFamily:"'Outfit',sans-serif", fontWeight:500, color:form.course?"#1a0640":"#9270c0", background:"#f8f5ff", border:`1.5px solid ${errors.course?"#ef4444":"#e4d9ff"}`, borderRadius:"12px", outline:"none", cursor:"pointer", appearance:"none", WebkitAppearance:"none", boxSizing:"border-box" }}
                onFocus={e=>e.target.style.borderColor="#7c3aed"} onBlur={e=>e.target.style.borderColor=errors.course?"#ef4444":"#e4d9ff"}>
                <option value="">Select a course</option>
                {CONTACT_COURSES.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
              <div style={{ position:"absolute", right:"14px", top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#9270c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              {errors.course && <div style={{ fontSize:"11.5px", color:"#ef4444", marginTop:"4px", fontFamily:"'Outfit',sans-serif" }}>{errors.course}</div>}
            </div>
            <button onClick={handleSubmit} disabled={submitting}
              style={{ width:"100%", position:"relative", overflow:"hidden", background:"linear-gradient(135deg,#ff6b35,#f03e00)", color:"#fff", border:"none", borderRadius:"50px", padding:"15px 30px", fontSize:"15px", fontWeight:800, fontFamily:"'Outfit',sans-serif", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"10px", boxShadow:"0 6px 22px rgba(255,80,0,0.35)", transition:"all 0.22s", letterSpacing:"0.3px" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(255,80,0,0.45)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 6px 22px rgba(255,80,0,0.35)";}}>
              {submitting?"Sending…":"Book Free Counseling Session"}
              {!submitting&&<svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════ REVIEWS MODAL ═══════════════ */
// No API call — uses STUDENT_REVIEWS directly.
// To update reviews, just edit the STUDENT_REVIEWS array at the top of this file.
function ReviewsModal({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const Stars = ({ n }) => (
    <span style={{ color:"#f5a623", fontSize:"14px" }}>
      {Array.from({ length:5 }, (_,i) => (
        <span key={i} style={{ opacity: i < n ? 1 : 0.25 }}>★</span>
      ))}
    </span>
  );

  return (
    <div
      onClick={onClose}
      style={{ position:"fixed", inset:0, background:"rgba(15,4,38,0.75)", backdropFilter:"blur(8px)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background:"#fff", borderRadius:"28px", width:"100%", maxWidth:"600px", maxHeight:"85vh", display:"flex", flexDirection:"column", position:"relative", boxShadow:"0 32px 80px rgba(124,58,237,0.28)", animation:"modalPop 0.38s cubic-bezier(.34,1.56,.64,1) both" }}
      >
        {/* Header */}
        <div style={{ padding:"24px 28px 20px", borderBottom:"1px solid #f0ebff", flexShrink:0 }}>
          <div style={{ position:"absolute", top:0, left:0, right:0, height:"4px", background:"linear-gradient(90deg,#7c3aed,#a78bfa,#f5a623,#7c3aed)", backgroundSize:"300% 100%", animation:"shimmer 3s linear infinite", borderRadius:"28px 28px 0 0" }}/>
          <button
            onClick={onClose}
            style={{ position:"absolute", top:"16px", right:"16px", width:"32px", height:"32px", borderRadius:"50%", background:"#f3f0ff", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px", color:"#7c3aed" }}
          >✕</button>

          <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"8px" }}>
            {/* Star icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#f5a623">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <h3 style={{ fontSize:"20px", fontWeight:900, color:"#1a0640", fontFamily:"'Outfit',sans-serif" }}>
              Student Reviews
            </h3>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
            <Stars n={Math.round(Number(AVG_RATING))} />
            <span style={{ fontSize:"13px", color:"#9270c0", fontFamily:"'Outfit',sans-serif", fontWeight:600 }}>
              {AVG_RATING} · {TOTAL_COUNT} reviews
            </span>
            {/* Badge */}
            <span style={{ marginLeft:"auto", fontSize:"11px", background:"#f0fdf4", color:"#15803d", border:"1px solid #bbf7d0", borderRadius:"20px", padding:"3px 10px", fontWeight:700, fontFamily:"'Outfit',sans-serif" }}>
              ✓ Verified Students
            </span>
          </div>
        </div>

        {/* Reviews list */}
        <div style={{ overflowY:"auto", padding:"16px 28px 24px", display:"flex", flexDirection:"column", gap:"16px" }}>
          {STUDENT_REVIEWS.map((r, i) => (
            <div
              key={i}
              style={{ background:"#faf8ff", border:"1.5px solid #e4d9ff", borderRadius:"16px", padding:"18px 20px", animation:`reviewSlide 0.4s ease ${i * 0.05}s both` }}
            >
              <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"10px" }}>
                {/* Avatar */}
                <div style={{ width:"42px", height:"42px", borderRadius:"50%", background:"linear-gradient(135deg,#7c3aed,#a78bfa)", overflow:"hidden", flexShrink:0 }}>
                  <img
                    src={r.avatar}
                    alt={r.name}
                    style={{ width:"100%", height:"100%", objectFit:"cover" }}
                    onError={e => { e.target.style.display="none"; }}
                  />
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:"14px", fontWeight:800, color:"#1a0640", fontFamily:"'Outfit',sans-serif" }}>{r.name}</div>
                  <div style={{ fontSize:"12px", color:"#9270c0", fontFamily:"'Outfit',sans-serif" }}>
                    {r.role}{r.time ? ` · ${r.time}` : ""}
                  </div>
                </div>
                <div style={{ flexShrink:0 }}>
                  <Stars n={r.rating} />
                </div>
              </div>
              <p style={{ fontSize:"13.5px", color:"#4b4466", lineHeight:1.7, fontFamily:"'Outfit',sans-serif", margin:0 }}>
                {r.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ SECTION LABEL ═══════════════ */
function SectionLabel({ text }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"#fff", border:"1.5px solid #e4d9ff", borderRadius:"9px", padding:"7px 16px", fontSize:"12px", color:"#3b1f7a", fontWeight:700, marginBottom:"16px", boxShadow:"0 2px 12px rgba(124,58,237,0.10)", letterSpacing:"0.08em" }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#7c3aed"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      {text}
    </div>
  );
}

/* ═══════════════ HERO ═══════════════ */
const StarRating = ({ rating=4.9, max=5 }) => (
  
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
    const t = setInterval(() => setActiveIdx(i => (i + 1) % SLIDES.length), 3000);
    return () => clearInterval(t);
  }, []);
  return activeIdx;
}

function ReviewAvatars({ centered = false, onViewAll }) {
  const avatars = [`${PUB}/userreview1.png`, `${PUB}/userreview2.png`, `${PUB}/userreview3.png`];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: centered ? "center" : "flex-start" }}>
      <div style={{ display: "flex" }}>
        {avatars.map((src, i) => (
          <div
            key={i}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              border: "2.5px solid #fff",
              marginLeft: i === 0 ? "0" : "-10px",
              zIndex: 3 - i,
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src={src}
              alt={`reviewer ${i + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                // Fallback to colored circle if image fails to load
                e.target.style.display = "none";
                e.target.parentNode.style.background = ["#7c3aed", "#059669", "#2563eb"][i];
                e.target.parentNode.style.display = "flex";
                e.target.parentNode.style.alignItems = "center";
                e.target.parentNode.style.justifyContent = "center";
                e.target.parentNode.innerHTML = `<span style="color:#fff;font-weight:800;font-size:13px">${["A","B","C"][i]}</span>`;
              }}
            />
          </div>
        ))}
      </div>
      <div onClick={onViewAll} style={{ cursor: "pointer" }}>
        <StarRating rating={4.9} />
        <div style={{ fontSize: "11px", color: "#9270c0", marginTop: "2px" }}>
          ({TOTAL_COUNT} Reviews){" "}
          <a href="/Reviews" style={{ textDecoration: "none" }} onClick={(e) => e.preventDefault()}>
          <span style={{ color: "#7c3aed", fontWeight: 700 }}>View all →</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function HeroSection({ scrollRef, pausedRef, onCounselorClick, onViewReviews }) {
  const activeIdx = useSlideRotation();
  return (
    <section id="home" style={{ background:`radial-gradient(ellipse 80% 70% at 70% 40%,rgba(167,139,250,0.18) 0%,transparent 70%),radial-gradient(ellipse 50% 60% at 10% 80%,rgba(124,58,237,0.1) 0%,transparent 65%),#faf8ff`, minHeight:"calc(100vh - 84px)", display:"flex", flexDirection:"column", justifyContent:"center", position:"relative", overflow:"hidden", paddingTop:"40px" }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0, backgroundImage:`linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)`, backgroundSize:"32px 32px" }}/>
      <div className="hero-inner" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", padding:"56px 6% 20px", width:"100%", gap:"40px", position:"relative", zIndex:1 }}>
        <div className="hero-left" style={{ flex:"0 0 auto", width:"590px", maxWidth:"100%" }}>
          <div className="v0 badge-tag" style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"#fff", border:"1.5px solid #e4d9ff", borderRadius:"9px", padding:"9px 18px", fontSize:"13px", color:"#3b1f7a", fontWeight:700, marginBottom:"22px", boxShadow:"0 2px 14px rgba(124,58,237,.12)" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1l1.8 3.6L14 5.6l-3 2.9.7 4.1L8 10.5l-3.7 2.1.7-4.1-3-2.9 4.2-.6L8 1z" fill="#7c3aed"/></svg>
            100% Placement Assistant
          </div>
          <h1 className="v1 hero-title" style={{ fontSize:"clamp(2rem,5vw,64px)", fontWeight:900, lineHeight:1.09, color:"#120630", marginBottom:"20px", letterSpacing:"-1.5px" }}>
            From Learning to<br/>Placement-<span style={{ color:"#7c3aed" }}>Career</span><br/>
            <span style={{ position:"relative", display:"inline-block", color:"#7c3aed" }}>
              Companion
              <svg viewBox="0 0 280 36" style={{ position:"absolute", bottom:"-18px", left:"-6px", width:"calc(100% + 12px)", height:"20px", overflow:"visible" }} preserveAspectRatio="none">
                <path className="arc-path" d="M 4 30 C 55 4, 150 -2, 296 26" fill="none" stroke="#7c3aed" strokeWidth="8" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          <p className="v2 hero-desc-desktop" style={{ color:"#5c4a80", fontSize:"14.5px", lineHeight:1.8, marginBottom:"20px", maxWidth:"430px", marginTop:"8px" }}>
            Advance your career with <strong style={{ color:"#120630" }}>AI Medical Coding</strong> &amp; <strong style={{ color:"#120630" }}>Medical Billing, IT, and Finance courses,</strong> designed with a job-ready curriculum and 100% placement support.
          </p>
          <div className="v3 hero-bullets hero-bullets-desktop" style={{ display:"flex", gap:"12px", marginBottom:"30px", flexWrap:"wrap" }}>
            {["✓ 15+ Years Experienced Trainers","✓ Tamper-Proof Digital Certificate"].map((b,i) => (
              <span key={i} style={{ color:"#7c3aed", fontSize:"12.5px", fontWeight:700, display:"flex", alignItems:"center", gap:"5px", background:"rgba(124,58,237,.07)", borderRadius:"20px", padding:"6px 14px", border:"1px solid rgba(124,58,237,.15)" }}>{b}</span>
            ))}
          </div>
          <div className="v4 hero-cta-desktop" style={{ display:"flex", alignItems:"center", gap:"20px", flexWrap:"wrap" }}>
  <Link to="/contact-us" style={{ textDecoration: "none" }}>
  <button
    className="cta-btn"
    style={{
      background: "linear-gradient(135deg,#ff6b35 0%,#f03e00 100%)",
      color: "#fff",
      border: "none",
      borderRadius: "32px",
      padding: "16px 32px",
      fontSize: "14px",
      fontWeight: 800,
      cursor: "pointer",
      letterSpacing: ".5px",
      boxShadow: "0 6px 22px rgba(255,80,0,.38)",
      width: "100%",
      maxWidth: "340px",
      position: "relative",
      overflow: "hidden",
    }}
  >
    TALK TO OUR COUNSELLORS
  </button>
</Link>   
            <ReviewAvatars onViewAll={onViewReviews}/>
          </div>
        </div>
        <div className="hero-right vR" style={{ flex:"1", display:"flex", justifyContent:"flex-end", alignItems:"center", position:"relative", minWidth:0 }}>
          <div className="card-float glass-card-pos hero-glass-card" style={{ position:"absolute", bottom:"200px", left:"10%", zIndex:30, background:"rgba(255,255,255,0.62)", backdropFilter:"blur(22px) saturate(1.8)", WebkitBackdropFilter:"blur(22px) saturate(1.8)", border:"1.5px solid rgba(255,255,255,0.82)", borderRadius:"20px", padding:"18px 28px", display:"flex", alignItems:"center", gap:"16px", boxShadow:"0 20px 56px rgba(80,20,180,.16)", minWidth:"230px", marginLeft : "40px" }}>
            <div style={{ width:"54px", height:"54px", background:"linear-gradient(135deg,rgba(124,58,237,.12),rgba(167,139,250,.22))", borderRadius:"14px", display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid rgba(124,58,237,.2)", flexShrink:0 }}><CalendarIcon/></div>
            <div>
              <div style={{ fontWeight:900, fontSize:"26px", color:"#1a0640", lineHeight:1, letterSpacing:"-0.5px" }}>250 +</div>
              <div style={{ fontSize:"12px", color:"#6b5a9e", marginTop:"4px", fontWeight:600 }}>Assisted Students</div>
            </div>
          </div>
          <div className="hero-float" style={{ position:"relative", flexShrink:0 }}>
            <div className="circle-size" style={{ borderRadius:"50%", overflow:"hidden", position:"relative", boxShadow:`0 40px 100px ${SLIDES[activeIdx].shadow}, 0 0 0 14px ${SLIDES[activeIdx].ring}`, transition:"box-shadow 0.8s ease" }}>
              {SLIDES.map((slide, i) => (
                <div key={i} style={{ position:"absolute", inset:0, background:slide.bg, opacity:i===activeIdx?1:0, transition:"opacity 0.8s ease-in-out", zIndex:i===activeIdx?2:1 }}>
                  <img
  src={slide.img}
  alt={`slide-${i}`}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "top center",
    display: "block",
    ...slide.imgStyle
  }}
/>
                </div>
              ))}
            </div>
            <div style={{ position:"absolute", bottom:"-28px", left:"50%", transform:"translateX(-50%)", display:"flex", gap:"8px" }}>
              {SLIDES.map((_,i) => (<div key={i} style={{ width:i===activeIdx?22:8, height:8, borderRadius:"99px", background:i===activeIdx?"#7c3aed":"#c4b5fd", transition:"all 0.4s ease" }}/>))}
            </div>
          </div>
        </div>
        <div className="hero-bottom" style={{ width:"100%", display:"flex", flexDirection:"column", alignItems:"center", gap:"16px" }}>
          <p style={{ color:"#5c4a80", fontSize:"14.5px", lineHeight:1.8, maxWidth:"400px", textAlign:"center" }}>
            Advance your career with <strong style={{ color:"#120630" }}>AI Medical Coding, Medical Billing, IT, and Finance courses </strong> with 100% placement support.
          </p>
          <div style={{ display:"flex", gap:"10px", flexWrap:"wrap", justifyContent:"center" }}>
            {["✓ 15+ Years Experienced Trainers","✓ Tamper-Proof Digital Certificate"].map((b,i) => (
              <span key={i} style={{ color:"#7c3aed", fontSize:"12px", fontWeight:700, display:"flex", alignItems:"center", gap:"5px", background:"rgba(124,58,237,.07)", borderRadius:"20px", padding:"6px 12px", border:"1px solid rgba(124,58,237,.15)" }}>{b}</span>
            ))}
          </div>
          <Link to="/contact-us" style={{ textDecoration: "none" }}>
  <button
    className="cta-btn"
    style={{
      background: "linear-gradient(135deg,#ff6b35 0%,#f03e00 100%)",
      color: "#fff",
      border: "none",
      borderRadius: "32px",
      padding: "16px 32px",
      fontSize: "14px",
      fontWeight: 800,
      cursor: "pointer",
      letterSpacing: ".5px",
      boxShadow: "0 6px 22px rgba(255,80,0,.38)",
      width: "100%",
      maxWidth: "340px",
      position: "relative",
      overflow: "hidden",
    }}
  >
    TALK TO OUR COUNSELLORS
  </button>
</Link>  
          <ReviewAvatars centered onViewAll={onViewReviews}/>
        </div>
      </div>
      <div style={{ padding:"48px 0 28px", position:"relative", zIndex:1 }}>
        <div className="partners-title" style={{ textAlign:"center", fontWeight:900, fontSize:"clamp(18px,3vw,26px)", color:"#120630", marginBottom:"24px", letterSpacing:"-0.3px" }}>
          More than <span style={{ color:"#7c3aed" }}>25 +</span> Hiring Partners
        </div>
        <div style={{ overflow:"hidden", width:"100%", userSelect:"none" }} ref={scrollRef} onMouseEnter={()=>{ if(pausedRef) pausedRef.current=true; }} onMouseLeave={()=>{ if(pausedRef) pausedRef.current=false; }}>
          <div style={{ display:"flex", width:"max-content" }}>
            {[...COMPANIES,...COMPANIES,...COMPANIES].map((c,i) => (
  <div key={i} className="company-item" style={{ display:"flex", alignItems:"center", padding:"0 clamp(16px,2.5vw,32px)" }}>
    <img
      src={c.logo}
      alt={c.name}
      style={{ height:"90px", width:"auto", maxWidth:"120px", objectFit:"contain", opacity:0.65, filter:"grayscale(30%)", transition:"opacity 0.2s, filter 0.2s" }}
      onMouseEnter={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.filter="grayscale(0%)"; }}
      onMouseLeave={e => { e.currentTarget.style.opacity="0.65"; e.currentTarget.style.filter="grayscale(30%)"; }}
    />
  </div>
))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ ABOUT ═══════════════ */
function ImageCard({ src, alt, style, delay=0 }) {
  const [visible, setVisible] = useState(false), [hovered, setHovered] = useState(false);
  useEffect(() => { const t=setTimeout(()=>setVisible(true),delay); return()=>clearTimeout(t); },[delay]);
  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{ ...style, opacity:visible?1:0, transform:visible?(hovered?"scale(1.04) translateY(-4px)":"scale(1) translateY(0)"):"scale(0.93) translateY(18px)", transition:`opacity 0.7s ease ${delay}ms,transform 0.45s cubic-bezier(.4,0,.2,1)`, borderRadius:"18px", overflow:"hidden", boxShadow:hovered?"0 20px 50px rgba(108,43,217,0.22)":"0 8px 28px rgba(108,43,217,0.10)", cursor:"pointer", position:style.position||"relative" }}>
      <img src={src} alt={alt} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transform:hovered?"scale(1.08)":"scale(1)", transition:"transform 0.5s" }}/>
    </div>
  );
}

function AnimatedCircle() {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => { const t=setTimeout(()=>setDrawn(true),700); return()=>clearTimeout(t); },[]);
  return (
    <svg viewBox="-12 -6 299 106" style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-55%)", width:"205%", height:"225%", pointerEvents:"none", overflow:"visible" }}>
      <path d="M 103,19 C 196,8 272,12 278,36 C 284,60 250,80 200,86 C 150,92 82,90 40,80 C -2,70 -10,50 6,30 C 22,10 66,2 116,2 C 136,1 152,5 162,8 C 170,10 175,16 170,23 C 164,19 157,10 153,12"
        fill="none" stroke="#5b21b6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        style={{ strokeDasharray:820, strokeDashoffset:drawn?0:820, transition:"stroke-dashoffset 2.8s cubic-bezier(0.25,0.1,0.2,1)" }}/>
    </svg>
  );
}

function AboutSection() {
  const [ref, inView] = useInView(0.1);
  const [cv, setCv] = useState(false);
  const navigate = useNavigate();
  useEffect(() => { if(inView) setTimeout(()=>setCv(true),200); },[inView]);
  return (
    <section id="about" ref={ref} style={{ padding:"clamp(48px,8vw,80px) 0", background:"#fff", borderTop:"1px solid #e5e7eb", position:"relative" }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)`, backgroundSize:"32px 32px" }}/>
      <div className="about-inner" style={{ maxWidth:"1180px", margin:"0 auto", padding:"0 clamp(16px,4%,48px)", display:"flex", alignItems:"center", gap:"clamp(32px,6%,80px)", flexWrap:"wrap", position:"relative", zIndex:1 }}>
        <>
  <style>{`
    .about-images {
      position: relative;
      width: clamp(260px, 40%, 460px);
      min-width: 260px;
      height: 400px;
      flex-shrink: 0;
    }

    @media (max-width: 768px) {
      .about-images {
        width: 100% !important;
        min-width: unset !important;
        height: 300px !important;
      }
      .about-images [data-abt="i1"] { height: 130px !important; }
      .about-images [data-abt="i2"] { height: 130px !important; }
      .about-images [data-abt="i3"] { top: 140px !important; height: 155px !important; }
      .about-images [data-abt="badge"] {
        top: 136px !important;
        width: 90px !important; height: 90px !important;
      }
      .about-images [data-abt="badge"] .abt-num { font-size: 1.5rem !important; }
      .about-images [data-abt="badge"] .abt-label { font-size: 0.55rem !important; }
    }

    @media (max-width: 480px) {
      .about-images { height: 240px !important; }
      .about-images [data-abt="i1"] { height: 105px !important; }
      .about-images [data-abt="i2"] { height: 105px !important; }
      .about-images [data-abt="i3"] { top: 113px !important; height: 122px !important; }
      .about-images [data-abt="badge"] {
        top: 109px !important;
        width: 76px !important; height: 76px !important;
      }
      .about-images [data-abt="badge"] .abt-num { font-size: 1.3rem !important; }
      .about-images [data-abt="badge"] .abt-label { font-size: 0.5rem !important; }
    }
  `}</style>

  <div className="about-images">
    <div data-abt="i1" style={{ position:"absolute", top:0, left:0, width:"57%", height:"170px", borderRadius:"12px", overflow:"hidden" }}>
      <ImageCard src={`${PUB}/HomeImages/abtimg3.jpg`} alt="Instructor" delay={100} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
    </div>

    <div data-abt="i2" style={{ position:"absolute", top:0, right:0, width:"41%", height:"170px", borderRadius:"12px", overflow:"hidden" }}>
      <ImageCard src={`${PUB}/HomeImages/abtimg2.jpg`} alt="Campus" delay={250} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
    </div>

    <div data-abt="i3" style={{ position:"absolute", top:"182px", left:0, width:"100%", height:"210px", borderRadius:"12px", overflow:"hidden" }}>
      <ImageCard src={`${PUB}/HomeImages/abtimg1.jpg`} alt="Students" delay={400} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
    </div>

    <div data-abt="badge" style={{ position:"absolute", left:"50%", top:"178px", transform:"translate(-50%,-50%)", width:"110px", height:"110px", borderRadius:"50%", background:"linear-gradient(135deg,#7c3aed,#4c1d95)", boxShadow:"0 0 0 6px rgba(124,58,237,0.12),0 8px 32px rgba(108,43,217,0.38)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", zIndex:10 }}>
      <span className="abt-num" style={{ fontWeight:900, fontSize:"1.8rem", color:"#fff", lineHeight:1 }}>25+</span>
      <span className="abt-label" style={{ fontWeight:500, fontSize:"0.62rem", color:"rgba(255,255,255,0.88)", marginTop:"4px", textAlign:"center", lineHeight:1.4 }}>Hiring<br/>Partners</span>
    </div>
  </div>
</>
        <div style={{ flex:1, minWidth:"260px", opacity:cv?1:0, transform:cv?"translateY(0)":"translateY(24px)", transition:"all 0.9s cubic-bezier(.4,0,.2,1) 0.15s" }}>
          <SectionLabel text="ABOUT US"/>
          <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:900, fontSize:"clamp(1.8rem,3.5vw,2.6rem)", color:"#1a1035", lineHeight:1.15, marginBottom:"22px", letterSpacing:"-0.02em" }}>
            Your{" "}<span style={{ position:"relative", display:"inline-block", whiteSpace:"nowrap" }}>Skill Partner<AnimatedCircle/></span><br/>For Career Growth
          </h2>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.97rem", color:"#4b4466", lineHeight:1.78, marginBottom:"24px", maxWidth:"520px", textAlign: "justify"}}>
            Skillra is a leading training institute specializing in <strong style={{ color:"#1e3a8a" }}>AI Medical Coding</strong> &amp; <strong style={{ color:"#1e3a8a" }}>Medical Billing</strong>, <strong style={{ color:"#c2410c" }}>IT development</strong>, <strong style={{ color:"#14532d" }}>Finance training</strong>, and Career oriented programs.
             We focus on bridging the gap between academic learning and industry expectations through practical, real-world training. Our expert mentors guide students with hands-on experience, industry projects, and job-ready skill development. With structured learning pathways, live mentor interactions, and outcome-driven practical training, Skillra empowers learners to outperform industry expectations with confidence and credibility. As a trusted upskilling institute, we prepare students for high-growth job roles in top companies. Our commitment is to ensure every learner moves from classroom to career with ease. Skillra, you learn faster, grow smarter, and succeed with industry-recognized skills.
          </p>
          <a href="/about-us" style={{ textDecoration: "none" }} onClick={(e) => e.preventDefault()}>
          <button onClick={() => navigate("/about-us")} style={{ display:"flex", alignItems:"center", gap:"10px", background:"#f05a00", color:"#fff", border:"none", borderRadius:"50px", padding:"13px 30px", fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:"1rem", cursor:"pointer", boxShadow:"0 4px 18px rgba(240,90,0,0.28)", transition:"all 0.25s" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(240,90,0,0.38)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 18px rgba(240,90,0,0.28)";}}>
            Learn More
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          </a>
        </div>
      </div>
    </section>
  );
}

function HashtagBubblesDesktop() {
  return (
    <div
      className="hashtag-desktop"
      style={{
        position: "absolute",
        top: "0",
        right: "10px",
        width: "200px",
        height: "172px",
        pointerEvents: "none",
        zIndex: 2,
      }}
    >
      {/* Dashed oval connecting circle */}
      <svg
        viewBox="0 0 200 172"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <ellipse cx="100" cy="90" rx="90" ry="74" fill="rgba(167,139,250,0.06)" />
        <path
          d="M 54 30 C 80 8, 140 6, 168 34 C 188 56, 186 90, 170 116 C 154 142, 114 160, 78 156 C 42 152, 14 128, 12 100 C 8 70, 26 50, 54 30 Z"
          fill="none"
          stroke="#c4b5fd"
          strokeWidth="1.8"
          strokeDasharray="7 4"
          strokeLinecap="round"
          opacity="0.65"
        />
        <circle cx="100" cy="13"  r="3.5" fill="#c4b5fd" opacity="0.7" />
        <circle cx="180" cy="76"  r="3.5" fill="#fde047" opacity="0.7" />
        <circle cx="58"  cy="158" r="3.5" fill="#86efac" opacity="0.7" />
      </svg>
 
      {/* #certified — top centre */}
      <div style={{
        position: "absolute", top: "0", left: "50%",
        transform: "translateX(-50%) rotate(-5deg)",
        background: "#ede9fe", border: "1.5px solid #c4b5fd",
        borderRadius: "22px", padding: "5px 13px",
        fontSize: "12px", fontWeight: 700, color: "#6d28d9",
        fontFamily: "'Outfit',sans-serif", whiteSpace: "nowrap",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        animation: "floatY 4s ease-in-out 0s infinite",
      }}>#certified</div>
 
      {/* #enjoy — right */}
      <div style={{
        position: "absolute", top: "98px", right: "-6px",
        transform: "rotate(5deg)",
        background: "#fef9c3", border: "1.5px solid #fde047",
        borderRadius: "22px", padding: "5px 13px",
        fontSize: "12px", fontWeight: 700, color: "#854d0e",
        fontFamily: "'Outfit',sans-serif", whiteSpace: "nowrap",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        animation: "floatY 4.7s ease-in-out 0.4s infinite",
      }}>#enjoy</div>
 
      {/* #happy — bottom centre */}
      <div style={{
        position: "absolute", bottom: "40px", left: "-10%",
        transform: "translateX(-50%) rotate(-3deg)",
        background: "#dcfce7", border: "1.5px solid #86efac",
        borderRadius: "22px", padding: "5px 13px",
        fontSize: "12px", fontWeight: 700, color: "#15803d",
        fontFamily: "'Outfit',sans-serif", whiteSpace: "nowrap",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        animation: "floatY 5.4s ease-in-out 0.8s infinite",
      }}>#happy</div>
    </div>
  );
}
 

 
function CoursesSection() {
  const [ref, inView] = useInView(0.08);
  const [activeTab, setActiveTab] = useState("healthcare");
  const scrollRef = useRef(null);
  const navigate  = useNavigate();

  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= 820
  );

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= 820);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // ── FIXED: simple syncArrows, no useCallback dependency issues ──
  const syncArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 2);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  };

  // ── FIXED: single clean useEffect for scroll sync ──
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = 0;
    // Delay so DOM has painted and scrollWidth is accurate
    const t = setTimeout(syncArrows, 120);
    el.addEventListener("scroll", syncArrows, { passive: true });
    window.addEventListener("resize", syncArrows);
    return () => {
      clearTimeout(t);
      el.removeEventListener("scroll", syncArrows);
      window.removeEventListener("resize", syncArrows);
    };
  }, [activeTab, isMobile]);

  useEffect(() => {
    if (inView) setTimeout(syncArrows, 200);
  }, [inView]);

  // ── FIXED: direct scrollLeft assignment, no scrollBy behavior issues ──
  const doScroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const STEP = 320;
    const target = el.scrollLeft + dir * STEP;
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  const cat = COURSES_DATA[activeTab];
  const TAB_META = {
    healthcare: { active: "#4c1d95", label: "Healthcare" },
    technology: { active: "#c2410c", label: "Technology"  },
    finance:    { active: "#14532d", label: "Finance"     },
    others:     { active: "#b45309", label: "Others"             },
  };

  return (
    <section id="courses" ref={ref} style={{
      padding: "clamp(40px,6vw,80px) 0",
      background: "#F3F4F4",
      borderTop: "1px solid #e5e7eb",
      position: "relative",
    }}>

      {/* Grid background */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(124,58,237,0.035) 1px,transparent 1px),
                          linear-gradient(90deg,rgba(124,58,237,0.035) 1px,transparent 1px)`,
        backgroundSize: "32px 32px",
      }} />

      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "0 clamp(16px,4%,56px)",
        position: "relative",
        zIndex: 1,
      }}>

        {/* ── HEADER ── */}
        <div style={{
          position: "relative",
          marginBottom: "clamp(20px,3.5vw,40px)",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(22px)",
          transition: "all 0.7s ease",
          paddingRight: isMobile ? "0" : "220px",
          textAlign: "center",
        }}>
          <SectionLabel text="OUR COURSES" />
          <h2 style={{
            fontSize: "clamp(1.8rem,4vw,3.2rem)",
            fontWeight: 900,
            fontFamily: "'Outfit',sans-serif",
            color: "#120630",
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            marginBottom: "8px",
          }}>
            Build Your{" "}
            <em style={{
              fontStyle: "italic",
              color: TAB_META[activeTab].active,
              transition: "color .3s",
            }}>
              Career 
            </em> {" "} with High-Demand Professional Courses
          </h2>
          <p style={{
            fontSize: "clamp(13px,1.3vw,15px)",
            color: "#6b5a9e",
            fontFamily: "'Outfit',sans-serif",
            maxWidth: "1400px",
            lineHeight: 1.7,
            margin: "0 auto",
          }}>
           Explore our most popular career-oriented programs designed for students and professionals.
            Each course includes hands-on training, tools, and certification support for job readiness.
          </p>
          {!isMobile && <HashtagBubblesDesktop />}
        </div>

        {/* ── LAYOUT ── */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "clamp(18px,3vw,38px)",
        }}>

          {/* ── SIDEBAR ── */}
          <div
            className={isMobile ? "courses-sidebar-wrap" : ""}
            style={{
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              gap: "6px",
              width: isMobile ? "100%" : "210px",
              flexShrink: 0,
              overflowX: isMobile ? "auto" : "unset",
              paddingBottom: isMobile ? "4px" : "0",
            }}
          >
            {Object.entries(TAB_META).map(([key, meta]) => (
              <button
                key={key}
                className="courses-tab-btn"
                onClick={() => setActiveTab(key)}
                style={{
                  flexShrink: 0,
                  width: isMobile ? "auto" : "100%",
                  padding: isMobile ? "9px 16px" : "13px 22px",
                  textAlign: "left",
                  fontFamily: "'Outfit',sans-serif",
                  fontSize: isMobile ? "12.5px" : "14px",
                  fontWeight: 700,
                  borderRadius: "40px",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  background: activeTab === key ? meta.active : "#fff",
                  color:      activeTab === key ? "#fff"       : "#555",
                  boxShadow:  activeTab === key
                    ? `0 6px 20px ${meta.active}44`
                    : "0 2px 8px rgba(0,0,0,0.06)",
                  transition: "all 0.25s ease",
                }}
              >
                {meta.label}
              </button>
            ))}
          </div>

          {/* ── CARDS ── */}
          <div style={{ flex: 1, position: "relative", minWidth: 0 }}>

            {/* ── MOBILE left arrow ── */}
            {isMobile && (
              <button
                onClick={() => doScroll(-1)}
                style={{
                  position: "absolute",
                  left: "4px", top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  opacity: canLeft ? 1 : 0.3,
                  pointerEvents: canLeft ? "auto" : "none",
                  touchAction: "manipulation",
                  background: "#fff",
                  border: "1.5px solid #e4d9ff",
                  borderRadius: "50%",
                  width: "34px", height: "34px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 3px 12px rgba(0,0,0,0.15)",
                  transition: "opacity .2s",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7l5 5" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}

            {/* ── MOBILE right arrow ── */}
            {isMobile && (
              <button
                onClick={() => doScroll(1)}
                style={{
                  position: "absolute",
                  right: "4px", top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  opacity: canRight ? 1 : 0.3,
                  pointerEvents: canRight ? "auto" : "none",
                  touchAction: "manipulation",
                  background: "#fff",
                  border: "1.5px solid #e4d9ff",
                  borderRadius: "50%",
                  width: "34px", height: "34px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 3px 12px rgba(0,0,0,0.15)",
                  transition: "opacity .2s",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M5 2l5 5-5 5" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}

            {/* ── DESKTOP right arrow — outside map, before scroll track ── */}
            {!isMobile && canRight && (
              <button
                onClick={() => doScroll(1)}
                style={{
                  position: "absolute",
                  right: "-22px", top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  background: "#fff",
                  border: "1.5px solid #e4d9ff",
                  borderRadius: "50%",
                  width: "44px", height: "44px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                  transition: "box-shadow .2s",
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 20px rgba(124,58,237,0.3)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)"}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 2l5 5-5 5" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}

            {/* ── DESKTOP left arrow ── */}
            {!isMobile && canLeft && (
              <button
                onClick={() => doScroll(-1)}
                style={{
                  position: "absolute",
                  left: "-22px", top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  background: "#fff",
                  border: "1.5px solid #e4d9ff",
                  borderRadius: "50%",
                  width: "44px", height: "44px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                  transition: "box-shadow .2s",
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 20px rgba(124,58,237,0.3)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)"}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7l5 5" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}

            {/* ── SCROLL TRACK ── */}
            <div
              ref={scrollRef}
              className="hide-scrollbar"
              style={isMobile ? {
                // ── MOBILE ──
                display: "flex",
                gap: "12px",
                overflowX: "auto",
                overflowY: "hidden",
                WebkitOverflowScrolling: "touch",
                scrollSnapType: "x mandatory",
                scrollBehavior: "smooth",
                paddingLeft: "48px",
                paddingRight: "48px",
              } : {
                // ── DESKTOP — KEY FIX: flex not grid ──
                display: "flex",
                flexWrap: "nowrap",         // never wrap to next row
                flexDirection: "row",
                gap: "20px",
                overflowX: "auto",          // allow horizontal scroll
                overflowY: "hidden",
                width: "100%",
                boxSizing: "border-box",
                paddingBottom: "8px",
              }}
            >
              {cat.courses.map((course, idx) => (
                <div
                  key={course.id}
                  className="c-card"
                  onClick={() => navigate(`/courses/${course.id}`)}
                  style={{
                    background: "#fff",
                    borderRadius: "18px",
                    cursor: "pointer",
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: "0 5px 20px rgba(0,0,0,0.07)",
                    opacity:   inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(26px)",
                    transition: `opacity 0.5s ease ${0.08 + idx * 0.1}s,
                                 transform 0.5s ease ${0.08 + idx * 0.1}s`,
                    // ── KEY FIX: both mobile and desktop get flexShrink:0 ──
                    flexShrink: 0,
                    ...(isMobile ? {
                      width: "70vw",
                      maxWidth: "260px",
                      minWidth: "200px",
                      scrollSnapAlign: "start",
                      scrollSnapStop: "always",
                    } : {
                      width: "300px",       // fixed width forces overflow with 4+ cards
                      scrollSnapAlign: "start",
                    }),
                  }}
                >

                  {/* Success badge */}
                  <div style={{
                    position: "absolute", top: "9px", right: "9px", zIndex: 10,
                    background: cat.activeColor,
                    color: "#fff",
                    fontSize: isMobile ? "8.5px" : "9.5px",
                    fontWeight: 800,
                    fontFamily: "'Outfit',sans-serif",
                    padding: "3px 8px",
                    borderRadius: "20px",
                    letterSpacing: "0.04em",
                    boxShadow: "0 3px 10px rgba(255,80,0,0.28)",
                    whiteSpace: "nowrap",
                  }}>
                    100% Success Rate
                  </div>

                  {/* Image */}
                  <div style={{
                    width: "100%",
                    height: isMobile ? "120px" : "clamp(145px,15vw,205px)",
                    overflow: "hidden",
                    background: cat.cardBg,
                    flexShrink: 0,
                  }}>
                    <img
                      src={course.image}
                      alt={course.title}
                      style={{
                        width: "100%", height: "100%",
                        objectFit: "cover",
                        objectPosition: "top center",
                        display: "block",
                        transition: "transform 0.45s ease",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.07)"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                    />
                  </div>

                  {/* Card body */}
                  <div style={{ padding: isMobile ? "9px 10px 12px" : "clamp(12px,1.6vw,18px)" }}>

                    {/* Category chip */}
                    <div style={{
                      display: "inline-block",
                      background: `${cat.activeColor}18`,
                      color: cat.activeColor,
                      fontSize: isMobile ? "8.5px" : "10px",
                      fontWeight: 800,
                      fontFamily: "'Outfit',sans-serif",
                      padding: "2px 8px",
                      borderRadius: "20px",
                      marginBottom: isMobile ? "4px" : "5px",
                      letterSpacing: "0.05em",
                    }}>
                      {cat.label.replace(" Courses","").replace(" Course","")}
                    </div>

                    {/* Title */}
                    <h3 style={{
                      fontSize: isMobile ? "12px" : "clamp(13.5px,1.5vw,17px)",
                      fontWeight: 900,
                      color: "#120630",
                      fontFamily: "'Outfit',sans-serif",
                      lineHeight: 1.25,
                      margin: `0 0 ${isMobile ? "3px" : "6px"} 0`,
                    }}>
                      {course.title}
                    </h3>

                    {/* Description */}
                    <p style={{
                      fontSize: isMobile ? "10px" : "clamp(11px,1vw,12.5px)",
                      color: "#6b5a9e",
                      fontFamily: "'Outfit',sans-serif",
                      lineHeight: 1.55,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      margin: `0 0 ${isMobile ? "8px" : "clamp(10px,1.3vw,15px)"} 0`,
                    }}>
                      {course.description}
                    </p>

                      <a href={`/courses/${course.id}`} style={{ textDecoration: "none" }} onClick={(e) => e.preventDefault()}>
                      <button
  className="know-more-btn"
  onClick={() => navigate(`/courses/${course.id}`)}
  style={{
    width: "100%",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    padding: isMobile ? "7px 10px" : "clamp(8px,1vw,10px) 16px",
    fontSize: isMobile ? "9.5px" : "clamp(10.5px,1vw,12px)",
    fontWeight: 800,
    fontFamily: "'Outfit',sans-serif",
    cursor: "pointer",
    letterSpacing: "0.07em",
    background: cat.activeColor,
    boxShadow: `0 3px 12px ${cat.activeColor}44`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
  }}
>
  KNOW MORE
  <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
    <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
</button>
</a>
                    

                  </div>
                </div>
              ))}
            </div>
            {/* end scroll track */}

          </div>
          {/* end cards */}

        </div>
        {/* end layout */}

      </div>
    </section>
  );
}
const COLLEGES = [
  { name: "Agurchand Manmull Jain College",                          logo: `${PUB}/CollegePartners/AMJcollege.webp` },
  { name: "GRT College of Engineering",                     logo: `${PUB}/CollegePartners/GRTcollege.jpg` },
  { name: "GRD College",                      logo: `${PUB}/CollegePartners/GRDcollege.png` },
  { name: "KP College",              logo: `${PUB}/CollegePartners/KPcollege.jpg` },
  { name: "Apollo college of Pharmacy",              logo: `${PUB}/CollegePartners/APOLLOcollege.jpg` },
  
];

function CollegesSection() {
  const [ref, inView] = useInView(0.1);

  // Duplicate colleges so the loop looks seamless
  const LOOPED = [...COLLEGES, ...COLLEGES, ...COLLEGES];

  return (
    <section ref={ref} style={{
      padding: "clamp(48px,8vw,80px) 0",
      background: "#fff",
      borderTop: "1px solid #e5e7eb",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Dot pattern */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(124,58,237,0.07) 1.5px,transparent 1.5px)",
        backgroundSize: "28px 28px",
      }}/>

      {/* Blobs */}
      <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"300px", height:"300px", borderRadius:"50%", background:"radial-gradient(circle,rgba(167,139,250,0.12) 0%,transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"-40px", left:"-40px", width:"220px", height:"220px", borderRadius:"50%", background:"radial-gradient(circle,rgba(124,58,237,0.09) 0%,transparent 70%)", pointerEvents:"none" }}/>

      {/* Keyframe injection */}
      <style>{`
        @keyframes college-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .college-track {
          animation: college-scroll 18s linear infinite;
        }
        
      `}</style>

      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 clamp(16px,4%,48px)",
        position: "relative",
        zIndex: 1,
      }}>

        {/* Header */}
        <div style={{
          textAlign: "center",
          marginBottom: "clamp(32px,5vw,48px)",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.7s ease",
        }}>
          <SectionLabel text="TIE-UP COLLEGES"/>
          <h2 style={{
            fontSize: "clamp(1.8rem,4vw,2.8rem)",
            fontWeight: 900,
            fontFamily: "'Outfit',sans-serif",
            color: "#120630",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}>
            Our Campus{" "}
            <span style={{
              background: "linear-gradient(135deg,#7c3aed,#a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Partners
            </span>
          </h2>
          <p style={{
            fontSize: "clamp(13px,1.3vw,15px)",
            color: "#6b5a9e",
            fontFamily: "'Outfit',sans-serif",
            marginTop: "10px",
            maxWidth: "480px",
            margin: "10px auto 0",
            lineHeight: 1.7,
          }}>
            We proudly collaborate with 5+ leading institutions across South India
            to deliver industry-ready education directly on campus.
          </p>
        </div>

        {/* ── Infinite scroll track ── */}
        {/* Outer masks left & right edges with a fade */}
        <div style={{
          position: "relative",
          overflow: "hidden",
          // Fade edges
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          maskImage:        "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}>
          {/* Inner flex row — 3× items so translateX(-33.333%) = seamless */}
          <div
            className="college-track"
            style={{
              display: "flex",
              gap: "clamp(14px,2vw,22px)",
              width: "max-content",       // shrink-wrap all cards
              padding: "8px 0 16px",
            }}
          >
            {LOOPED.map((col, i) => (
              <div
  key={i}
  style={{
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    opacity: inView ? 1 : 0,
    transition: `opacity 0.5s ease ${(i % COLLEGES.length) * 0.06}s`,
  }}
>
                <div style={{
                  width: "clamp(64px,8vw,84px)",
                  height: "clamp(64px,8vw,84px)",
                  borderRadius: "14px",
                  background: "#fff",
                  border: "1.5px solid #ede9fe",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                }}>
                  <img
                    src={col.logo}
                    alt={col.name}
                    style={{ width:"80%", height:"80%", objectFit:"contain" }}
                    onError={e => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  {/* Fallback initial */}
                  <div style={{
                    display: "none",
                    width: "100%", height: "100%",
                    alignItems: "center", justifyContent: "center",
                    background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
                    color: "#fff", fontWeight: 900, fontSize: "18px",
                    fontFamily: "'Outfit',sans-serif", borderRadius: "12px",
                  }}>
                    {col.name.charAt(0)}
                  </div>
                </div>

                <span style={{
                  fontSize: "clamp(10px,1.1vw,12px)",
                  fontWeight: 700,
                  color: "#3b1f7a",
                  fontFamily: "'Outfit',sans-serif",
                  textAlign: "center",
                  lineHeight: 1.4,
                }}>
                  {col.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(12px,2vw,20px)",
          justifyContent: "center",
          marginTop: "clamp(28px,4vw,40px)",
          opacity: inView ? 1 : 0,
          transition: "opacity 0.8s ease 0.4s",
        }}>
          {[
            { num:"5+",   label:"Partner Colleges"       },
            { num:"10+",   label:"Courses Covered"         },
            { num:"100%",  label:"Placement from Campus"  },
          ].map((s, i) => (
            <div key={i} style={{
              background: "linear-gradient(135deg,#7c3aed11,#a855f711)",
              border: "1.5px solid #e4d9ff",
              borderRadius: "16px",
              padding: "clamp(12px,2vw,18px) clamp(20px,3vw,32px)",
              textAlign: "center",
              minWidth: "clamp(110px,14vw,160px)",
            }}>
              <div style={{
                fontSize: "clamp(1.4rem,2.5vw,2rem)",
                fontWeight: 900,
                color: "#7c3aed",
                fontFamily: "'Outfit',sans-serif",
                letterSpacing: "-0.5px",
              }}>
                {s.num}
              </div>
              <div style={{
                fontSize: "clamp(11px,1.1vw,12.5px)",
                color: "#9270c0",
                fontWeight: 600,
                fontFamily: "'Outfit',sans-serif",
                marginTop: "4px",
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
 
// ═══════════════════════════════════════════════════════════════════
// 3. BLOGS SECTION  (NEW — place just before NewsletterSection)
// ═══════════════════════════════════════════════════════════════════
 

 
function BlogCard({ post, inView, delay }) {
  const navigate = useNavigate();
 
  return (
    <div
      className="blog-card"
      style={{
        background: "#fff",
        borderRadius: "22px",
        overflow: "hidden",
        boxShadow: "0 6px 24px rgba(0,0,0,0.07)",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {/* Image */}
      <div style={{ overflow: "hidden", flexShrink: 0 }}>
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: "100%",
            height: "clamp(160px,18vw,210px)",
            objectFit: "cover",
            objectPosition: "top center",
            display: "block",
            transition: "transform 0.5s ease",
          }}
          onMouseEnter={e => (e.target.style.transform = "scale(1.06)")}
          onMouseLeave={e => (e.target.style.transform = "scale(1)")}
        />
      </div>
 
      {/* Body */}
      <div
        style={{
          padding: "clamp(14px,2.5vw,22px)",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* Meta */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
          <span
            style={{
              background: post.tagBg,
              color: post.tagColor,
              fontSize: "11px",
              fontWeight: 800,
              fontFamily: "'Outfit',sans-serif",
              padding: "3px 10px",
              borderRadius: "20px",
              letterSpacing: "0.05em",
            }}
          >
            {post.tag}
          </span>
          <span style={{ fontSize: "11.5px", color: "#9ca3af", fontFamily: "'Outfit',sans-serif", fontWeight: 500 }}>
            {post.date}
          </span>
          <span style={{ fontSize: "11.5px", color: "#9ca3af", fontFamily: "'Outfit',sans-serif", fontWeight: 500 }}>
            · {post.readTime}
          </span>
        </div>
 
        {/* Title */}
        <h3
          style={{
            fontSize: "clamp(14px,1.6vw,17px)",
            fontWeight: 900,
            color: "#120630",
            fontFamily: "'Outfit',sans-serif",
            margin: "0 0 10px",
            lineHeight: 1.3,
          }}
        >
          {post.title}
        </h3>
 
        {/* Excerpt only — no expandable content anymore */}
        <p
          style={{
            fontSize: "clamp(12px,1.2vw,13.5px)",
            color: "#6b5a9e",
            fontFamily: "'Outfit',sans-serif",
            lineHeight: 1.7,
            margin: "0 0 14px",
          }}
        >
          {post.excerpt}
        </p>
 
        {/* Read more — navigates to BlogPage */}
        
        <a href="/blog" style={{ textDecoration: "none" }}>
  <button
    style={{
      marginTop: "auto",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "8px 0 0",
      fontFamily: "'Outfit',sans-serif",
      fontWeight: 700,
      fontSize: "clamp(12px,1.2vw,13.5px)",
      color: post.tagColor,
      transition: "gap 0.2s",
    }}
    onMouseEnter={e => (e.currentTarget.style.gap = "10px")}
    onMouseLeave={e => (e.currentTarget.style.gap = "6px")}
  >
    View more
    <div
      style={{
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        background: `${post.tagColor}18`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 4l4 4 4-4"
          stroke={post.tagColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </button>
</a>
      </div>
    </div>
  );
}
 
 
// ─── BlogsSection — unchanged except removed expand style tag ────────────────
 
function BlogsSection() {
  const [ref, inView] = useInView(0.08);
 
  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(48px,8vw,88px) 0",
        background: "#F3F4F4",
        borderTop: "1px solid #e5e7eb",
        position: "relative",
      }}
    >
      <style>{`
        @media (max-width: 560px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
 
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(124,58,237,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />
 
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 clamp(16px,4%,48px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "clamp(32px,5vw,52px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease",
          }}
        >
          <SectionLabel text="LATEST BLOGS" />
 
          <h2
            style={{
              fontSize: "clamp(1.8rem,4vw,2.8rem)",
              fontWeight: 900,
              fontFamily: "'Outfit',sans-serif",
              color: "#120630",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              margin: "0 0 10px",
            }}
          >
            Learn, &amp;{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Explore &amp; Stay Industry-Updated
            </span>
          </h2>
 
          <p
            style={{
              fontSize: "clamp(13px,1.3vw,15px)",
              color: "#6b5a9e",
              fontFamily: "'Outfit',sans-serif",
              maxWidth: "1480px",
              margin: "10px auto 0",
              lineHeight: 1.7,
            }}
          >
            Explore expert articles on Medical Coding, IT trends, Finance skills,
            AI innovations, career tips, and industry insights. Stay updated with
            the latest advancements in AI-driven healthcare, automation, and
            technology. Grow your knowledge through fresh, insightful, and
            student-friendly blog posts designed to keep you ahead in a rapidly
            evolving digital world.
          </p>
        </div>
 
        <div
          className="blog-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(16px,2.5vw,28px)",
            alignItems: "start",
          }}
        >
          {BLOG_POSTS.slice(0, 3).map((post, i) => (
  <BlogCard
    key={post.id}
    post={post}
    inView={inView}
    delay={0.1 + i * 0.13}
  />
))}
        </div>
      </div>
    </section>
  );
}



const SERVICE_CARDS = [
  {
    id:1, bg:"linear-gradient(160deg,#7c3aed,#6d28d9)", title:"Campus Training Programs",
    titleColor:"#e9d5ff", shadowColor:"rgba(109,40,217,0.40)",
    shortDesc:"We partner with colleges to deliver industry-ready training directly on campus.",
    longDesc:"We partner with colleges to deliver industry-ready training directly on campus. Students get exposure to practical skills, real projects, and updated industry tools. Our programs help institutions boost student employability before graduation with strong placement outcomes.",
    icon: <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4L4 10l12 6 12-6-12-6z"/><path d="M4 16l12 6 12-6"/><path d="M4 22l12 6 12-6"/></svg>,
  },
  {
    id:2, bg:"linear-gradient(160deg,#ea580c,#c2410c)", title:"Placement Support",
    titleColor:"#fed7aa", shadowColor:"rgba(234,88,12,0.40)",
    shortDesc:"We guide every student with structured job preparation, resume building, and interview.",
    longDesc:"We guide every student with structured job preparation, resume building, and interview coaching. Our dedicated placement team connects you with top companies across healthcare, IT, and finance. From mock interviews to real job opportunities.",
    icon: <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="16" cy="10" r="5"/><path d="M6 28c0-5.523 4.477-10 10-10s10 4.477 10 10"/><path d="M22 14l3 3-3 3"/></svg>,
  },
  {
    id:3, bg:"linear-gradient(160deg,#15803d,#166534)", title:"Career Guidance & Mentorship",
    titleColor:"#bbf7d0", shadowColor:"rgba(21,128,61,0.40)",
    shortDesc:"Get personalized guidance from industry experts who help you chart your ideal career path.",
    longDesc:"Get personalized guidance from experts who understand industry trends and hiring expectations. We help you choose the right career path based on your strengths and goals. Mentors support you throughout your journey—from course selection to job placement.",
    icon: <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 20c0-4.418 3.582-8 8-8s8 3.582 8 8"/><circle cx="16" cy="10" r="3"/><path d="M4 28h24"/><path d="M12 28v-4h8v4"/></svg>,
  },
];

function ServiceCard({ card, delay, inView }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const ROUTES = {
    1: "/campus",
    2: "/placement",
    3: "/career",
  };

  useEffect(() => {
    if (inView) setTimeout(() => setVisible(true), delay);
  }, [inView, delay]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(ROUTES[card.id])}
      style={{
        flex: "1 1 280px",
        minWidth: "280px",
        maxWidth: "380px",
        background: card.bg,
        borderRadius: "24px",
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        opacity: visible ? 1 : 0,
        transform: visible
          ? (hovered ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)")
          : "translateY(40px) scale(0.94)",
        transition: "opacity 0.65s ease, transform 0.35s cubic-bezier(.34,1.4,.64,1), box-shadow 0.35s ease",
        boxShadow: hovered
          ? `0 28px 60px ${card.shadowColor}`
          : `0 10px 32px ${card.shadowColor.replace("0.40","0.24")}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Radial shine on hover */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 30% 20%,rgba(255,255,255,0.12) 0%,transparent 65%)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s",
        pointerEvents: "none",
      }}/>

      {/* Top shimmer bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)",
        backgroundSize: "200% 100%",
        animation: "shimmer 2.5s infinite",
        pointerEvents: "none",
      }}/>

      {/* Icon */}
      <div style={{ padding: "clamp(24px,4%,36px) clamp(20px,4%,28px) 0", position: "relative", zIndex: 2 }}>
        <div style={{
          width: "58px", height: "58px",
          borderRadius: "16px",
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: hovered ? "rotate(8deg) scale(1.12)" : "rotate(0deg) scale(1)",
          transition: "transform 0.45s cubic-bezier(.34,1.56,.64,1)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
        }}>
          {card.icon}
        </div>
      </div>

      {/* Body */}
      <div style={{
        padding: "clamp(16px,3%,22px) clamp(20px,4%,28px) clamp(24px,4%,32px)",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        zIndex: 2,
      }}>
        <h3 style={{
          fontFamily: "'Outfit',sans-serif",
          fontWeight: 800,
          fontSize: "clamp(1rem,1.6vw,1.22rem)",
          color: card.titleColor,
          lineHeight: 1.28,
          marginBottom: "10px",
        }}>
          {card.title}
        </h3>

        

        {/* Long desc — always visible */}
        <p style={{
          fontFamily: "'Outfit',sans-serif",
          fontSize: "clamp(12px,1.1vw,13.5px)",
          color: "rgba(255,255,255,0.78)",
          lineHeight: 1.8,
          margin: "0 0 20px 0",
          textAlign : 'justify'
        }}>
          {card.longDesc}
        </p>

        {/* Learn More button */}
        
        <a href={`${ROUTES[card.id]}`} style={{ textDecoration: "none" }} onClick={(e) => e.preventDefault()}>
  <div
    onClick={() => navigate(ROUTES[card.id])}
    style={{
      marginTop: "auto",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      background: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(8px)",
      border: "1.5px solid rgba(255,255,255,0.3)",
      borderRadius: "50px",
      padding: "9px 18px",
      cursor: "pointer",
      width: "fit-content",
      transition: "background 0.25s, transform 0.25s",
      transform: hovered ? "translateX(4px)" : "translateX(0)",
    }}
    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
  >
    <span style={{
      fontFamily: "'Outfit',sans-serif",
      fontWeight: 700,
      fontSize: "12px",
      color: "#fff",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    }}>
      Learn More
    </span>
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 6h8M6 2l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
</a>
       
      
      </div>
    </div>
  );
}

function ServicesSection() {
  const [ref, inView] = useInView(0.1);
  return (
    <section id="services" ref={ref} style={{
      padding: "clamp(48px,8vw,80px) 0",
      background: "#F3F4F4",
      borderTop: "1px solid #e5e7eb",
      position: "relative",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(124,58,237,0.035) 1px,transparent 1px),
                          linear-gradient(90deg,rgba(124,58,237,0.035) 1px,transparent 1px)`,
        backgroundSize: "32px 32px",
      }}/>

      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "0 clamp(16px,4%,48px)",
        position: "relative", zIndex: 1,
      }}>

        {/* Header */}
        <div style={{
          textAlign: "center", marginBottom: "52px",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease",
        }}>
          <SectionLabel text="WHAT WE OFFER"/>
          <h2 style={{
            fontFamily: "'Outfit',sans-serif", fontWeight: 900,
            fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "#1a0a3c",
            letterSpacing: "-0.03em", lineHeight: 1.1,
          }}>
            Complete Career Support from{" "}
            <span style={{
              background: "linear-gradient(135deg,#7c3aed,#a855f7)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Start to Success
            </span>
          </h2>
          <p style={{
            fontSize: "clamp(13px,1.3vw,14.5px)", color: "#6b5a9e",
            fontFamily: "'Outfit',sans-serif", marginTop: "12px",
          }}>
            We provide end-to-end training and career services to help students build strong professional pathways.From learning to placement, Skillra ensures every stage of your growth is supported.
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: "flex", gap: "24px",
          flexWrap: "wrap", alignItems: "flex-start", justifyContent: "center",
        }}>
          {SERVICE_CARDS.map((card, i) => (
            <ServiceCard key={card.id} card={card} inView={inView} delay={120 + i * 140}/>
          ))}
        </div>

      </div>
    </section>
  );
}



const TESTIMONIALS = [
  {
    text: "Working with this team transformed our product completely. Their attention to detail and commitment to quality is unmatched — we saw a 3x improvement in user engagement within weeks.",
    name: "Sandeep. Product Assoc. Manager",
    color: "#7c3aed",
    avatar: "SM",
    image: `${PUB}/TestimonialsChars/sandeep.jpeg`,
    // Professional woman, warm smile — fits "Product Lead"
  },
  {
    text: "I was skeptical at first, but the results exceeded every expectation. The support team is incredibly responsive and the platform itself is intuitive and powerful.",
    name: "Kishore. Digital Marketer",
    color: "#a855f7",
    avatar: "JK",
    image: `${PUB}/TestimonialsChars/Kishore.jpeg`,
    // Young professional man — fits "Startup Founder"
  },
  {
    text: "From onboarding to delivery, everything was seamless. Our clients noticed the difference immediately. Highly recommend to anyone serious about growth.",
    name: "Ezhilarasi. Marketing Director",
    color: "#6d28d9",
    avatar: "PR",
    image: `${PUB}/TestimonialsChars/Ezhilarasi.jpeg`,
    // South Asian professional woman — fits "Priya, Marketing Director"
  },
  {
    text: "The best investment we made this year. Our workflows are faster, our team is happier, and we're delivering better results than ever before.",
    name: "Varalakshmi. Jr. UI/UX Designer",
    color: "#8b5cf6",
    avatar: "TB",
    image: `${PUB}/TestimonialsChars/varalakshmi.jpeg`,
    // Professional man in suit — fits "Operations Manager"
  },
];

const styles = `
  .testi-inner {
    display: flex;
    gap: clamp(24px, 5%, 64px);
    align-items: flex-start;
  }
  .testi-form-card {
    flex: 0 0 clamp(280px, 38%, 400px);
  }
  .testi-avatar-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  /* ── Mobile: stack vertically ── */
  @media (max-width: 700px) {
    .testi-inner {
      flex-direction: column;
      gap: 32px;
    }
    .testi-form-card {
      flex: none;
      width: 100%;
    }
  }
`;



function TestimonialsSection() {
  const [ref, inView] = useInView(0.06);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", desc: "" });
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false); // 👈 sending state
  const autoRef = useRef(null);

  const goNext = () => setActiveIdx(p => (p + 1) % TESTIMONIALS.length);

  const startAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(goNext, 5000);
    setIsPlaying(true);
  };

  const handlePlay = () => {
    if (isPlaying) {
      clearInterval(autoRef.current);
      setIsPlaying(false);
    } else {
      goNext();
      startAuto();
    }
  };

  const handleAvatar = (i) => {
    clearInterval(autoRef.current);
    setActiveIdx(i);
    autoRef.current = setInterval(goNext, 5000);
    setIsPlaying(true);
  };

  useEffect(() => {
    autoRef.current = setInterval(goNext, 5000);
    setIsPlaying(true);
    return () => clearInterval(autoRef.current);
  }, []);

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    border: "1.5px solid #e5e7eb",
    borderRadius: "10px",
    fontSize: "13.5px",
    fontFamily: "'Outfit', sans-serif",
    color: "#374151",
    outline: "none",
    background: "#fafafa",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
    display: "block",
  };

  const validateForm = () => {
  const errs = {};
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number

  if (!formData.name.trim())               errs.name  = "Name is required.";
  else if (!nameRegex.test(formData.name)) errs.name  = "Enter a valid name (letters only).";

  if (!formData.email.trim())                errs.email = "Email is required.";
  else if (!emailRegex.test(formData.email)) errs.email = "Enter a valid email address.";

  if (!formData.phone.trim())                errs.phone = "Phone number is required.";
  else if (!phoneRegex.test(formData.phone)) errs.phone = "Enter a valid 10-digit mobile number.";

  if (!formData.desc.trim())                errs.desc  = "Description is required.";
  else if (formData.desc.trim().length < 10) errs.desc  = "Description must be at least 10 characters.";

  return errs;
};

  return (
    <>
      <style>{styles}</style>
      <section
        id="testimonials"
        ref={ref}
        style={{
          background: "#ede9ff",
          padding: "clamp(48px,8vw,88px) 0 clamp(56px,10vw,96px)",
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(16px,4%,40px)" }}>
          <div className="testi-inner">

            {/* ── LEFT: testimonial carousel ── */}
            <div
              style={{
                flex: 1,
                minWidth: 0,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateX(0)" : "translateX(-24px)",
                transition: "all 0.7s ease 0.1s",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  fontWeight: 900,
                  color: "#7c3aed",
                  fontFamily: "'Outfit', sans-serif",
                  margin: "0 0 8px",
                }}
              >
                Testimonials
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  color: "#5c4a80",
                  fontFamily: "'Outfit', sans-serif",
                  margin: "0 0 32px",
                  fontStyle: "italic",
                }}
              >
                Every Story Matters. Every Success Counts.
              </p>

              <div style={{ marginBottom: "18px" }}>
                <svg width="48" height="36" viewBox="0 0 52 38" fill="none">
                  <path
                    d="M0 38V23C0 15.3 2.8 9.6 8.4 5.8 14 2 20.7 0.2 28.5 0.2V7.4C25 7.4 22 8.3 19.4 10 16.8 11.6 15.5 14 15.3 17.2H24V38H0ZM28 38V23C28 15.3 30.8 9.6 36.4 5.8 42 2 48.7 0.2 56.5 0.2V7.4C53 7.4 50 8.3 47.4 10 44.8 11.6 43.5 14 43.3 17.2H52V38H28Z"
                    fill="#7c3aed"
                    opacity="0.18"
                  />
                </svg>
              </div>

              {/* Slide text */}
              <div key={activeIdx} style={{ minHeight: "110px", marginBottom: "28px" }}>
                <p
                  style={{
                    fontSize: "clamp(13px,1.4vw,15px)",
                    color: "#374151",
                    fontFamily: "'Outfit', sans-serif",
                    lineHeight: 1.85,
                    margin: 0,
                  }}
                >
                  {TESTIMONIALS[activeIdx].text}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#7c3aed",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    marginTop: "14px",
                    marginBottom: 0,
                  }}
                >
                  — {TESTIMONIALS[activeIdx].name}
                </p>
              </div>

              {/* Avatar dots + play/pause */}
              <div className="testi-avatar-row">
                {TESTIMONIALS.map((t, i) => (
                  <div
  key={i}
  onClick={() => handleAvatar(i)}
  style={{
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: t.color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: 700,
    color: "#fff",
    fontFamily: "'Outfit', sans-serif",
    cursor: "pointer",
    flexShrink: 0,
    border: activeIdx === i ? "3px solid #7c3aed" : "3px solid transparent",
    boxShadow: activeIdx === i ? "0 0 0 2px #fff, 0 0 0 4px #7c3aed" : "none",
    transform: activeIdx === i ? "scale(1.12)" : "scale(1)",
    transition: "all 0.22s",
    overflow: "hidden", // 👈 add this so image respects border-radius
  }}
>
  <img
    src={t.image}
    alt={t.name}
    style={{ width: "100%", height: "100%", objectFit: "cover" }}
    onError={e => { e.target.style.display = "none"; }}
  />
</div>
                ))}

                {/* Play / Pause button */}
                <div
                  onClick={handlePlay}
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    border: `2px solid ${isPlaying ? "#7c3aed" : "#c4b5fd"}`,
                    background: isPlaying ? "#f3f0ff" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    marginLeft: "4px",
                    transition: "all 0.22s",
                    flexShrink: 0,
                  }}
                >
                  {isPlaying ? (
                    <svg width="11" height="13" viewBox="0 0 12 14" fill="none">
                      <rect x="1" y="1" width="3.5" height="12" rx="1" fill="#7c3aed" />
                      <rect x="7.5" y="1" width="3.5" height="12" rx="1" fill="#7c3aed" />
                    </svg>
                  ) : (
                    <svg width="12" height="14" viewBox="0 0 14 16" fill="none">
                      <path d="M1 1l12 7-12 7V1z" fill="#9ca3af" />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            {/* ── RIGHT: contact form ── */}
            <div
              className="testi-form-card"
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "clamp(24px,4%,36px) clamp(20px,4%,32px)",
                boxShadow: "0 8px 40px rgba(109,40,217,0.10)",
                border: "1.5px solid rgba(124,58,237,0.08)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateX(0)" : "translateX(24px)",
                transition: "all 0.7s ease 0.2s",
                boxSizing: "border-box",
              }}
            >
              {submitted ? (
  <div style={{ textAlign: "center", padding: "32px 0" }}>
    <div style={{ fontSize: "44px", marginBottom: "14px" }}>🎉</div>
    <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#111827", fontFamily: "'Outfit', sans-serif", margin: "0 0 8px" }}>
      Message Sent!
    </h3>
    <p style={{ fontSize: "13px", color: "#6b7280", fontFamily: "'Outfit', sans-serif", margin: 0 }}>
      We'll get back to you shortly.
    </p>
    <button
      onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", desc: "" }); setFormErrors({}); }}
      style={{ marginTop: "20px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: "50px", padding: "10px 24px", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}
    >
      Send another
    </button>
  </div>
) : (
  <>
    <h3 style={{ fontSize: "clamp(16px,2vw,20px)", fontWeight: 900, color: "#111827", fontFamily: "'Outfit', sans-serif", margin: "0 0 6px" }}>
      We're here to help!
    </h3>
    <p style={{ fontSize: "13px", color: "#9ca3af", fontFamily: "'Outfit', sans-serif", margin: "0 0 24px" }}>
      Please contact us in case of any query.
    </p>

    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {[
        { key: "name",  placeholder: "Your name",         type: "text",  maxLength: 50  },
        { key: "email", placeholder: "Your email address", type: "email", maxLength: 254 },
        { key: "phone", placeholder: "Your phone number",  type: "tel",   maxLength: 10  },
        { key: "desc",  placeholder: "Description",        type: "text",  maxLength: 300 },
      ].map(field => (
        <div key={field.key} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          <input
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.key]}
            maxLength={field.maxLength}
            onChange={e => {
              setFormData(p => ({ ...p, [field.key]: e.target.value }));
              if (formErrors[field.key]) setFormErrors(p => ({ ...p, [field.key]: "" }));
            }}
            style={{
              ...inputStyle,
              borderColor: formErrors[field.key] ? "#ef4444" : "#e5e7eb",
              background: formErrors[field.key] ? "#fff5f5" : "#fafafa",
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = formErrors[field.key] ? "#ef4444" : "#a78bfa";
              e.currentTarget.style.background = "#fff";
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = formErrors[field.key] ? "#ef4444" : "#e5e7eb";
              e.currentTarget.style.background = formErrors[field.key] ? "#fff5f5" : "#fafafa";
            }}
          />
          {/* Inline error */}
          {formErrors[field.key] && (
            <span style={{ fontSize: "11px", color: "#ef4444", fontFamily: "'Outfit',sans-serif", fontWeight: 600, paddingLeft: "4px" }}>
              ⚠ {formErrors[field.key]}
            </span>
          )}
        </div>
      ))}

      <button
        disabled={sending} // 👈 disables after first click
        onClick={async () => {
          if (sending) return; // 👈 extra guard
          const errs = validateForm();
          if (Object.keys(errs).length) { setFormErrors(errs); return; }
          setSending(true);
          try {
            await fetch(SHEETS_URL, {
              method: "POST",
              mode: "no-cors",
              headers: { "Content-Type": "text/plain" },
              body: JSON.stringify({
                type:  "enquiry",
                name:  formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                desc:  formData.desc.trim(),
              }),
            });
          } catch (err) {
            console.error("Sheet error:", err);
          } finally {
            setSending(false);
            setSubmitted(true);
          }
        }}
        style={{
          background: sending
            ? "linear-gradient(135deg,#a78bfa,#7c3aed)"  // 👈 dimmed while sending
            : "linear-gradient(135deg,#7c3aed,#5b21b6)",
          color: "#fff", border: "none", borderRadius: "50px",
          padding: "13px 24px", fontSize: "14px", fontWeight: 700,
          cursor: sending ? "not-allowed" : "pointer",
          fontFamily: "'Outfit', sans-serif",
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "8px",
          boxShadow: "0 6px 18px rgba(124,58,237,0.32)",
          transition: "all 0.22s", marginTop: "4px", width: "100%",
          opacity: sending ? 0.8 : 1,
        }}
        onMouseEnter={e => { if (!sending) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(124,58,237,0.46)"; } }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(124,58,237,0.32)"; }}
      >
        {/* 👇 Spinner shown while sending */}
        {sending ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              style={{ animation: "spin 0.8s linear infinite" }}>
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            Sending...
          </>
        ) : (
          <>
            Get in Touch
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
        </div>
      </section>
    </>
  );
}


// /* ═══════════════ PLACEMENT ═══════════════ */
// const PLACEMENT_BARS = [
//   { course:"AI Medical Coding",  rate:98, placed:142, avg:"3.8 LPA", color:"#1e3a8a" },
//   { course:"AI Medical Billing", rate:97, placed:88,  avg:"3.5 LPA", color:"#7c3aed" },
//   { course:"Full Stack Dev",     rate:96, placed:118, avg:"5.2 LPA", color:"#c2410c" },
//   { course:"SAP Development",    rate:95, placed:61,  avg:"6.0 LPA", color:"#14532d" },
//   { course:"Data Analytics",     rate:94, placed:95,  avg:"4.5 LPA", color:"#0ea5e9" },
//   { course:"UI/UX Design",       rate:92, placed:74,  avg:"4.8 LPA", color:"#ec4899" },
// ];

// function PlacementSection() {
//   const [ref, inView] = useInView(0.1);
//   const [barWidths, setBarWidths] = useState(PLACEMENT_BARS.map(()=>0));
//   useEffect(() => {
//     if (!inView) return;
//     PLACEMENT_BARS.forEach((b,i) => { setTimeout(()=>{ setBarWidths(prev=>{const n=[...prev];n[i]=b.rate;return n;}); }, 300+i*180); });
//   },[inView]);
//   return (
//     <section id="placement" ref={ref} style={{ padding:"clamp(48px,8vw,80px) 0", background:"#F3F4F4", borderTop:"1px solid #e5e7eb", position:"relative" }}>
//       <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)`, backgroundSize:"32px 32px" }}/>
//       <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 clamp(16px,4%,48px)", position:"relative", zIndex:1 }}>
//         <div style={{ textAlign:"center", marginBottom:"48px", opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(24px)", transition:"all 0.7s ease" }}>
//           <SectionLabel text="PLACEMENT"/>
//           <h2 style={{ fontSize:"clamp(1.6rem,3.5vw,2.6rem)", fontWeight:900, fontFamily:"'Outfit',sans-serif", color:"#0f0426", letterSpacing:"-0.02em" }}>
//             Your Dream Job <span style={{ color:"#7c3aed" }}>Starts Here</span>
//           </h2>
//           <p style={{ fontSize:"clamp(13px,1.4vw,15px)", color:"#9270c0", marginTop:"10px", fontWeight:500, maxWidth:"500px", margin:"10px auto 0", fontFamily:"'Outfit',sans-serif" }}>
//             We don't just train you — we place you. 100% placement assistance, 30+ hiring partners.
//           </p>
//         </div>
//         <div style={{ display:"flex", gap:"18px", flexWrap:"wrap", marginBottom:"48px" }}>
//           {[{num:"500+",label:"Students Placed"},{num:"100%",label:"Placement Rate"},{num:"120+",label:"Hiring Partners"},{num:"4.2L",label:"Avg. Package"}].map((s,i) => (
//             <div key={i} style={{ flex:"1 1 120px", minWidth:"120px", background:"#fff", border:"1.5px solid #e4d9ff", borderRadius:"20px", padding:"clamp(16px,3%,24px) 18px", textAlign:"center", boxShadow:"0 4px 16px rgba(124,58,237,0.07)", transition:"all 0.32s", cursor:"default", opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(20px)", transitionDelay:`${i*0.1}s` }}
//               onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px) scale(1.03)";e.currentTarget.style.background="linear-gradient(135deg,#7c3aed,#5b21b6)";e.currentTarget.querySelector(".sn").style.color="#fff";e.currentTarget.querySelector(".sl").style.color="rgba(255,255,255,0.75)";}}
//               onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0) scale(1)";e.currentTarget.style.background="#fff";e.currentTarget.querySelector(".sn").style.color="#7c3aed";e.currentTarget.querySelector(".sl").style.color="#9270c0";}}>
//               <div className="sn" style={{ fontSize:"clamp(1.5rem,3vw,2.3rem)", fontWeight:900, color:"#7c3aed", lineHeight:1, letterSpacing:"-1px", transition:"color 0.32s" }}>{s.num}</div>
//               <div className="sl" style={{ fontSize:"11px", color:"#9270c0", marginTop:"5px", fontWeight:600, fontFamily:"'Outfit',sans-serif", transition:"color 0.32s" }}>{s.label}</div>
//             </div>
//           ))}
//         </div>
//         <div className="placement-bars-row" style={{ display:"flex", gap:"48px", alignItems:"flex-start", flexWrap:"wrap" }}>
//           <div style={{ flex:"0 0 clamp(200px,28%,280px)", opacity:inView?1:0, transform:inView?"translateX(0)":"translateX(-28px)", transition:"all 0.8s ease" }}>
//             <h3 style={{ fontSize:"clamp(1.2rem,2.5vw,1.9rem)", fontWeight:900, fontFamily:"'Outfit',sans-serif", color:"#0f0426", lineHeight:1.15, letterSpacing:"-0.02em", marginBottom:"12px" }}>Course-wise<br/><span style={{ color:"#7c3aed" }}>Placement Rate</span></h3>
//             <p style={{ fontSize:"13.5px", color:"#9270c0", lineHeight:1.75, fontWeight:500, fontFamily:"'Outfit',sans-serif" }}>Every course at Skillra is backed by dedicated placement cells and active employer relationships.</p>
//           </div>
//           <div style={{ flex:1, display:"flex", flexDirection:"column", gap:"12px" }}>
//             {PLACEMENT_BARS.map((b,i) => (
//               <div key={i} style={{ background:"#fff", border:"1.5px solid #e4d9ff", borderRadius:"14px", padding:"14px 18px", cursor:"default", opacity:inView?1:0, transform:inView?"translateX(0)":"translateX(-30px)", transition:`opacity 0.6s ease ${i*0.1}s, transform 0.6s ease ${i*0.1}s, border-color 0.22s, box-shadow 0.22s` }}
//                 onMouseEnter={e=>{e.currentTarget.style.borderColor=b.color;e.currentTarget.style.boxShadow=`0 4px 20px ${b.color}22`;e.currentTarget.style.transform="translateX(6px)";}}
//                 onMouseLeave={e=>{e.currentTarget.style.borderColor="#e4d9ff";e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateX(0)";}}>
//                 <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
//                   <span style={{ fontSize:"clamp(12px,1.3vw,13.5px)", fontWeight:700, color:"#1a0640", fontFamily:"'Outfit',sans-serif" }}>{b.course}</span>
//                   <div style={{ display:"flex", gap:"14px", alignItems:"center" }}>
//                     <span style={{ fontSize:"11px", color:"#9270c0", fontWeight:600, fontFamily:"'Outfit',sans-serif" }}>{b.placed} placed · {b.avg}</span>
//                     <span style={{ fontSize:"15px", fontWeight:900, color:b.color, fontFamily:"'Outfit',sans-serif", minWidth:"42px", textAlign:"right" }}>{b.rate}%</span>
//                   </div>
//                 </div>
//                 <div style={{ height:"8px", background:"#ede8ff", borderRadius:"99px", overflow:"hidden" }}>
//                   <div style={{ height:"100%", width:`${barWidths[i]}%`, background:`linear-gradient(90deg,${b.color},${b.color}aa)`, borderRadius:"99px", transition:"width 1.1s cubic-bezier(0.4,0,0.2,1)", boxShadow:`0 2px 8px ${b.color}44` }}/>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

/* ═══════════════════════════════════════════
   NEWSLETTER — STRICT INPUT VALIDATION
═══════════════════════════════════════════ */

/* Disposable / throwaway email domains to reject */
const BLOCKED_DOMAINS = new Set([
  "mailinator.com","guerrillamail.com","tempmail.com","throwam.com",
  "yopmail.com","sharklasers.com","guerrillamailblock.com","grr.la",
  "guerrillamail.info","spam4.me","trashmail.com","trashmail.me",
  "fakeinbox.com","maildrop.cc","dispostable.com","mailnull.com",
  "spamgourmet.com","trashmail.at","discard.email","getnada.com",
  "tempinbox.com","33mail.com","spamgourmet.net","spamgourmet.org",
]);

/* Strict RFC-5321-aligned regex — no consecutive dots, no leading/trailing dot in local */
const EMAIL_REGEX = /^(?![.\-])(?!.*[.\-]{2})[a-zA-Z0-9._%+\-]{1,64}(?<![.\-])@[a-zA-Z0-9\-]{1,63}(?:\.[a-zA-Z0-9\-]{1,63})*\.[a-zA-Z]{2,}$/;

/* Strip any HTML / script injection attempts from the value */
function sanitise(raw) {
  return raw
    .replace(/[<>"'`]/g, "")
    .replace(/javascript:/gi, "")
    .trim()
    .slice(0, 254);
}

function validateEmail(raw) {
  const val = sanitise(raw);
  if (!val)                        return "Email address is required.";
  if (val.length > 254)            return "Email address is too long (max 254 characters).";
  if (!EMAIL_REGEX.test(val))      return "Please enter a valid email address (e.g. name@example.com).";
  const domain = val.split("@")[1].toLowerCase();
  if (BLOCKED_DOMAINS.has(domain)) return "Disposable email addresses are not accepted. Please use a real email.";
  if (domain.split(".").pop().length < 2) return "Email domain extension is invalid.";
  return null;
}

const MAX_ATTEMPTS = 3;

function NewsletterSection() {
  const [ref, inView]                 = useInView(0.3);
  const [email, setEmail]             = useState("");
  const [error, setError]             = useState("");
  const [touched, setTouched]         = useState(false);
  const [subscribed, setSubscribed]   = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [attempts, setAttempts]       = useState(0);
  const [locked, setLocked]           = useState(false);

  useEffect(() => {
    if (touched) setError(validateEmail(email) || "");
  }, [email, touched]);

  const handleChange = (e) => {
    const clean = sanitise(e.target.value);
    setEmail(clean);
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validateEmail(email) || "");
  };

  const handleSubscribe = async () => {
    if (locked || subscribing) return;
    setTouched(true);
    const err = validateEmail(email);
    if (err) {
      setError(err);
      const next = attempts + 1;
      setAttempts(next);
      if (next >= MAX_ATTEMPTS) {
        setLocked(true);
        setError("Too many invalid attempts. Please refresh the page to try again.");
      }
      return;
    }
    setError("");
    setSubscribing(true);

    try {
      await fetch(SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ type: "subscriber", email: email.trim() }),
      });
      setSubscribed(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setTouched(true);
    } finally {
      setSubscribing(false);
    }
  };

  const inputBorderColor = !touched
    ? "rgba(255,255,255,0.7)"
    : error
      ? "#f87171"
      : "#4ade80";

  return (
    <div ref={ref} style={{ background: "linear-gradient(135deg,#6d28d9,#7c3aed,#6d28d9)", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes spinRingAnim { to { transform: rotate(360deg); } }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }

        /* ── Newsletter form row ── */
        .nl-form-row {
          display: flex;
          flex-direction: row;
          gap: 10px;
          flex-wrap: nowrap;
          align-items: flex-start;
        }

        /* On mobile: stack input above button, both full width */
        @media (max-width: 600px) {
          .nl-form-row {
            flex-direction: column !important;
            width: 100%;
          }
          .nl-input-wrap {
            width: 100% !important;
          }
          .nl-input-wrap input {
            width: 100% !important;
          }
          .nl-submit-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>

      {/* Dot grid background */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.10) 1px,transparent 1px)", backgroundSize: "22px 22px", pointerEvents: "none" }} />

      {/* Bottom shimmer bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg,#06b6d4,#22d3ee,#67e8f9,#22d3ee,#06b6d4)", backgroundSize: "200% 100%", animation: "shimmer 3s linear infinite" }} />

      <div style={{
        maxWidth: "1200px", margin: "0 auto", padding: "36px 24px",
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        gap: "36px", flexWrap: "wrap", position: "relative", zIndex: 1,
        opacity: inView ? 1 : 0, transition: "opacity 0.8s ease",
      }}>

        {/* ── Left — branding ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", paddingTop: "6px" }}>
          <div style={{ width: "46px", height: "46px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", animation: "spinRingAnim 6s linear infinite" }}>
            <svg width="40" height="40" viewBox="0 0 46 46" fill="none">
              <path d="M23 4v38M4 23h38M8 8l30 30M38 8L8 38" stroke="rgba(255,255,255,0.85)" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h2 style={{ fontSize: "clamp(1.2rem,2.2vw,1.6rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "5px", fontFamily: "'Outfit',sans-serif" }}>
              Join Our Newsletter
            </h2>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", fontWeight: 500, fontFamily: "'Outfit',sans-serif" }}>
              Subscribe to get our latest updates &amp; news.
            </p>
          </div>
        </div>

        {/* ── Right — form / success ── */}
        {subscribed ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: "12px", padding: "12px 20px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8l4 4 6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "14px", fontFamily: "'Outfit',sans-serif" }}>You're subscribed!</span>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "0 0 auto", width: "100%", maxWidth: "460px" }}>

            {/* Input + Button row */}
            <div className="nl-form-row">

              {/* Email input wrapper */}
              <div className="nl-input-wrap" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  aria-label="Email address"
                  aria-describedby={error ? "nl-error" : undefined}
                  aria-invalid={touched && !!error}
                  value={email}
                  disabled={locked}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  placeholder="Enter your email"
                  maxLength={254}
                  style={{
                    height: "48px",
                    width: "clamp(200px,26vw,300px)",
                    padding: "0 16px",
                    fontSize: "14px",
                    fontFamily: "'Outfit',sans-serif",
                    fontWeight: 500,
                    color: locked ? "#999" : "#1a0640",
                    background: locked ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.96)",
                    border: `2px solid ${inputBorderColor}`,
                    borderRadius: "12px",
                    outline: "none",
                    cursor: locked ? "not-allowed" : "text",
                    transition: "border-color 0.2s",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Submit button */}
              <a href="/Newsletter" style={{ textDecoration: "none" }} onClick={(e) => e.preventDefault()}>
                <button
                  className="nl-submit-btn"
                  onClick={handleSubscribe}
                  disabled={subscribing || locked}
                  aria-disabled={subscribing || locked}
                  style={{
                    height: "48px",
                    background: locked ? "#555" : "#111",
                    color: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    padding: "0 24px",
                    fontSize: "14px",
                    fontWeight: 700,
                    fontFamily: "'Outfit',sans-serif",
                    cursor: (subscribing || locked) ? "not-allowed" : "pointer",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.22s",
                    opacity: locked ? 0.6 : 1,
                    alignSelf: "flex-start",
                    boxSizing: "border-box",
                  }}
                  onMouseEnter={(e) => { if (!locked && !subscribing) { e.currentTarget.style.background = "#2d1b69"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = locked ? "#555" : "#111"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  {subscribing ? "Subscribing…" : "Subscribe Now"}
                  {!subscribing && !locked && (
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </a>
            </div>

            {/* Inline error message */}
            {touched && error && (
              <p
                id="nl-error"
                role="alert"
                style={{
                  margin: 0,
                  fontSize: "12px",
                  fontWeight: 600,
                  fontFamily: "'Outfit',sans-serif",
                  color: "#fca5a5",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  animation: "fadeIn 0.2s ease",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="8" cy="8" r="7" stroke="#fca5a5" strokeWidth="1.8" />
                  <path d="M8 4.5v4M8 10.5v1" stroke="#fca5a5" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                {error}
              </p>
            )}

            {/* Attempt counter hint */}
            {touched && error && !locked && attempts > 0 && attempts < MAX_ATTEMPTS && (
              <p style={{ margin: 0, fontSize: "11px", color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit',sans-serif" }}>
                {MAX_ATTEMPTS - attempts} attempt{MAX_ATTEMPTS - attempts !== 1 ? "s" : ""} remaining.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}



/* ═══════════════ MAIN ═══════════════ */
export default function HomePage() {
  const scrollRef = useRef(null);
  const pausedRef = useRef(false);
  const [showModal,   setShowModal]   = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  // Add this useEffect inside HomePage
useEffect(() => {
  if (sessionStorage.getItem("bannerSeen")) return;

  const timer = setTimeout(() => {
    setShowBanner(true);
  }, 5000);

  return () => clearTimeout(timer);
}, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let af, pos=0;
    const step=()=>{ if(!pausedRef.current){ pos+=0.55; if(pos>=el.scrollWidth/2)pos=0; el.scrollLeft=pos; } af=requestAnimationFrame(step); };
    af=requestAnimationFrame(step);
    return ()=>cancelAnimationFrame(af);
  },[]);

  return (
    <div style={{ fontFamily:"'Outfit','Segoe UI',sans-serif", margin:0, padding:0, overflowX:"hidden", background:"#F3F4F4" }}>
      
      <title>Skillra — AI Medical Coding, IT &amp; Finance Training with 100% Placement</title>
      <meta name="description" content="Skillra offers industry-aligned training and internships in AI Medical Coding, Medical Billing, Full Stack Development, Data Analytics, SAP, Tally & GST with 100% placement assistance."/>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html,body{overflow-x:hidden;background:#F3F4F4;}

        @keyframes floatY    {0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes floatCard {0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes drawArc   {from{stroke-dashoffset:750}to{stroke-dashoffset:0}}
        @keyframes fadeUp    {from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeRight {from{opacity:0;transform:translateX(-22px)}to{opacity:1;transform:translateX(0)}}
        @keyframes fadeScale {from{opacity:0;transform:scale(0.88)}to{opacity:1;transform:scale(1)}}
        @keyframes shimmer   {0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes shimmerBg {0%,100%{opacity:0.6}50%{opacity:1}}
        @keyframes glowPulse {0%,100%{box-shadow:0 2px 12px rgba(124,58,237,0.1)}50%{box-shadow:0 4px 20px rgba(124,58,237,0.25)}}
        @keyframes spinRingAnim{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes modalPop  {from{opacity:0;transform:scale(0.88) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes pulse     {0%,100%{box-shadow:0 8px 28px rgba(124,58,237,0.35)}50%{box-shadow:0 8px 40px rgba(124,58,237,0.55)}}
        @keyframes reviewSlide{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}

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

        .circle-size{width:500px;height:500px;}

        @media(max-width:820px){
          .hero-inner{flex-direction:column!important;align-items:center!important;padding:52px 20px 20px!important;text-align:center!important;gap:20px!important;}
          .hero-left{order:1!important;width:100%!important;max-width:100%!important;}
          .badge-tag{margin:0 auto 18px!important;}
          .hero-title{font-size:clamp(1.9rem,7vw,38px)!important;letter-spacing:-1px!important;}
          .hero-right{order:2!important;justify-content:center!important;width:100%!important;}
          .circle-size{width:clamp(200px,52vw,290px)!important;height:clamp(200px,52vw,290px)!important;}
          .glass-card-pos{left:50%!important;transform:translateX(-50%)!important;bottom:-24px!important;}
          .hero-glass-card{display:none!important;}
          .hero-bottom{order:3!important;display:flex!important;}
          .hero-desc-desktop{display:none!important;}
          .hero-bullets-desktop{display:none!important;}
          .hero-cta-desktop{display:none!important;}
          
          .about-inner{justify-content:center!important;}
          .nl-form{width:100%!important;flex-direction:column!important;}
          .nl-form input{width:100%!important;}
          .nl-form button{width:100%!important;justify-content:center!important;}
          .placement-bars-row{flex-direction:column!important;}
        }
        @media(min-width:821px){.hero-bottom{display:none!important;}}
        @media(max-width:480px){
          .hero-title{font-size:clamp(1.7rem,8vw,28px)!important;}
          .circle-size{width:clamp(180px,48vw,230px)!important;height:clamp(180px,48vw,230px)!important;}
          .hero-inner{padding:44px 16px 16px!important;}
          .about-images{height:320px!important;max-width:300px!important;}
        }
        @media(max-width:360px){
          .hero-title{font-size:1.55rem!important;}
          .circle-size{width:175px!important;height:175px!important;}
          .hero-inner{padding:40px 12px 12px!important;}
        }

        input::placeholder{color:#9ca3af;}
        input:focus,select:focus{outline:none;}

        
    }
      `}</style>

      {showModal   && <CounselorModal onClose={()=>setShowModal(false)}/>}
      {showReviews && <ReviewsModal   onClose={()=>setShowReviews(false)}/>}

      <HeroSection scrollRef={scrollRef} pausedRef={pausedRef} onCounselorClick={()=>setShowModal(true)} onViewReviews={()=>setShowReviews(true)}/>
      <SocialSidebar />
      <AboutSection />
      <CoursesSection />
      <ServicesSection />
      <CollegesSection />        {/* ← new */}
      {/* <PlacementSection /> */}
      {/* <TestimonialsSection /> */}
      <BlogsSection />           {/* ← new */}
      <NewsletterSection />
      <Footer />
    </div>
  );
}