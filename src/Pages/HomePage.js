import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import SocialSidebar from "../components/SocialSideBar";

const SHEETS_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
const GOOGLE_PLACE_ID = "YOUR_GOOGLE_PLACE_ID";

const COMPANIES = [
  { name:"Unsplash", icon:"🖼" },{ name:"Notion", icon:"📝" },
  { name:"INTERCOM", icon:"💬" },{ name:"descript", icon:"🎙" },
  { name:"grammarly", icon:"✏️" },{ name:"Slack", icon:"💼" },
  { name:"Figma", icon:"🎨" },{ name:"Linear", icon:"📐" },
  { name:"Vercel", icon:"▲" },{ name:"Stripe", icon:"💳" },
];

const PUB = process.env.PUBLIC_URL || "";

const SLIDES = [
  { img:`${PUB}/landingPageFrontImg.png`, bg:"linear-gradient(145deg,#6d28d9,#7c3aed,#4c1d95)", shadow:"rgba(79,28,200,.55)", ring:"rgba(124,58,237,.30)" },
  { img:`${PUB}/technology1.png`,         bg:"linear-gradient(145deg,#c2410c,#ea580c,#9a3412)", shadow:"rgba(194,65,12,.55)",  ring:"rgba(234,88,12,.30)"  },
  { img:`${PUB}/finance1.png`,            bg:"linear-gradient(145deg,#14532d,#15803d,#166534)", shadow:"rgba(20,83,45,.55)",   ring:"rgba(21,128,61,.30)"  },
];

const COURSES_DATA = {
  healthcare: {
    label:"Healthcare Courses", activeColor:"#1e3a8a", tagColor:"#1e3a8a", btnColor:"#1e3a8a", badgeBg:"#1e3a8a",
    cardBg:"linear-gradient(145deg,#eff6ff 0%,#dbeafe 100%)",
    courses:[
      { id:"ai-medical-coding",   title:"AI Medical Coding",   description:"Get certified and learn AI-powered coding skills with real case studies.", image:`${PUB}/healthcare1.png` },
      { id:"ai-medical-billing",  title:"AI Medical Billing",  description:"Become a certified AI Medical Billing professional with job guarantee.",    image:`${PUB}/healthcare1.png` },
      { id:"ai-medical-scribing", title:"AI Medical Scribing", description:"Learn AI-based medical scribing and clinical documentation.",              image:`${PUB}/healthcare1.png` },
    ],
  },
  technology: {
    label:"Technology Course", activeColor:"#c2410c", tagColor:"#c2410c", btnColor:"#c2410c", badgeBg:"#c2410c",
    cardBg:"linear-gradient(145deg,#fff7ed 0%,#ffedd5 100%)",
    courses:[
      { id:"full-stack",    title:"Full Stack Course", description:"Become a full-stack web developer with our MERN and MEAN Stack Course.", image:`${PUB}/technology1.png` },
      { id:"data-analytics",title:"Data Analytics",    description:"Join our Data Analytics Course for high-demand data careers.",           image:`${PUB}/technology1.png` },
      { id:"ui-ux-design",  title:"UI/UX Design",      description:"Join our UI/UX Designing Course to build professional websites.",       image:`${PUB}/technology1.png` },
    ],
  },
  finance: {
    label:"Finance Course", activeColor:"#14532d", tagColor:"#14532d", btnColor:"#14532d", badgeBg:"#14532d",
    cardBg:"linear-gradient(145deg,#f0fdf4 0%,#dcfce7 100%)",
    courses:[
      { id:"sap-development",      title:"SAP Development",      description:"Master SAP ABAP and become a certified SAP developer.",     image:`${PUB}/finance1.png` },
      { id:"tally-gst",            title:"Tally & GST Course",   description:"Learn Tally, GST filing, and financial accounting tools.",  image:`${PUB}/finance1.png` },
      { id:"financial-accounting", title:"Financial Accounting", description:"Master financial accounting and IFRS reporting standards.", image:`${PUB}/finance1.png` },
    ],
  },
};

const FALLBACK_REVIEWS = [
  { name:"Aria Zinanrio",   role:"Medical Coder",        rating:5, avatar:`${PUB}/abtimg1.jpg`, text:"Skillra's AI Medical Coding course transformed my career — I landed a job within 3 weeks! Incredibly experienced trainers." },
  { name:"Ravi Kumar",      role:"Full Stack Developer", rating:5, avatar:`${PUB}/abtimg2.jpg`, text:"World-class Full Stack course. Real projects, great mentorship, 100% placement support. Fresher to employed in 2 months." },
  { name:"Priya Nair",      role:"Financial Analyst",    rating:5, avatar:`${PUB}/abtimg3.jpg`, text:"Finance training structured perfectly for career switchers. Tally & GST module was worth every rupee. Confidence shot up!" },
  { name:"Mohammed Farhan", role:"Data Analyst",         rating:5, avatar:`${PUB}/abtimg1.jpg`, text:"Exactly what I needed. Practical assignments, weekly mentorship, placement team that genuinely cares — Skillra delivers." },
  { name:"Sneha Reddy",     role:"Medical Biller",       rating:5, avatar:`${PUB}/abtimg2.jpg`, text:"The AI Medical Billing course is thorough and practical. Got placed in a top hospital within a month of completion." },
  { name:"Arjun Mehta",     role:"SAP Consultant",       rating:4, avatar:`${PUB}/abtimg3.jpg`, text:"SAP Development course covered everything I needed. The trainers have real industry experience and are very approachable." },
  { name:"Lakshmi Devi",    role:"UI/UX Designer",       rating:5, avatar:`${PUB}/abtimg1.jpg`, text:"Skillra's UI/UX course helped me build a stunning portfolio. Got hired at a product company 3 weeks after graduation!" },
  { name:"Karthik V",       role:"Medical Scribe",       rating:5, avatar:`${PUB}/abtimg2.jpg`, text:"Best decision ever. Hands-on projects gave me confidence to clear every interview. The community support is amazing." },
  { name:"Divya S",         role:"Data Scientist",       rating:4, avatar:`${PUB}/abtimg3.jpg`, text:"Data Analytics course with real datasets made all the difference. Well-structured curriculum and supportive mentors." },
  { name:"Rahul Sharma",    role:"Full Stack Dev",        rating:5, avatar:`${PUB}/abtimg1.jpg`, text:"From zero to full-stack hero in 4 months. Skillra's placement team worked tirelessly to get me into a top startup." },
];

const CONTACT_COURSES = [
  "AI Medical Coding","AI Medical Billing","AI Medical Scribing",
  "Full Stack Development","Data Analytics","UI/UX Design",
  "SAP Development","Tally & GST","Financial Accounting",
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
function ReviewsModal({ onClose }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avgRating, setAvgRating] = useState(4.9);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => { document.body.style.overflow="hidden"; return () => { document.body.style.overflow=""; }; }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/google-reviews?place_id=${GOOGLE_PLACE_ID}`, { signal: controller.signal })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        if (data?.result?.reviews?.length) {
          const raw = data.result.reviews;
          setReviews(raw.map(r => ({ name:r.author_name, role:"Google Review", rating:r.rating, avatar:r.profile_photo_url||`${PUB}/abtimg1.jpg`, text:r.text, time:r.relative_time_description })));
          setAvgRating(data.result.rating || 4.9);
          setTotalCount(data.result.user_ratings_total || raw.length);
        } else throw new Error("no reviews");
      })
      .catch(() => { setReviews(FALLBACK_REVIEWS); setAvgRating(4.9); setTotalCount(100); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const Stars = ({ n }) => (
    <span style={{ color:"#f5a623", fontSize:"14px" }}>
      {Array.from({length:5},(_,i)=><span key={i} style={{ opacity:i<n?1:0.25 }}>★</span>)}
    </span>
  );

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(15,4,38,0.75)", backdropFilter:"blur(8px)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#fff", borderRadius:"28px", width:"100%", maxWidth:"600px", maxHeight:"85vh", display:"flex", flexDirection:"column", position:"relative", boxShadow:"0 32px 80px rgba(124,58,237,0.28)", animation:"modalPop 0.38s cubic-bezier(.34,1.56,.64,1) both" }}>
        <div style={{ padding:"24px 28px 20px", borderBottom:"1px solid #f0ebff", flexShrink:0 }}>
          <div style={{ position:"absolute", top:0, left:0, right:0, height:"4px", background:"linear-gradient(90deg,#7c3aed,#a78bfa,#f5a623,#7c3aed)", backgroundSize:"300% 100%", animation:"shimmer 3s linear infinite", borderRadius:"28px 28px 0 0" }}/>
          <button onClick={onClose} style={{ position:"absolute", top:"16px", right:"16px", width:"32px", height:"32px", borderRadius:"50%", background:"#f3f0ff", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px", color:"#7c3aed" }}>✕</button>
          <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"6px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            <h3 style={{ fontSize:"20px", fontWeight:900, color:"#1a0640", fontFamily:"'Outfit',sans-serif" }}>Google Reviews</h3>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
            <Stars n={Math.round(avgRating)}/>
            <span style={{ fontSize:"13px", color:"#9270c0", fontFamily:"'Outfit',sans-serif", fontWeight:600 }}>{avgRating.toFixed(1)} · {totalCount > 0 ? `${totalCount}+` : "100+"} reviews</span>
            <a href={`https://search.google.com/local/reviews?placeid=${GOOGLE_PLACE_ID}`} target="_blank" rel="noopener noreferrer" style={{ fontSize:"12px", color:"#7c3aed", fontWeight:700, textDecoration:"none", marginLeft:"auto" }} onClick={e=>e.stopPropagation()}>View on Google →</a>
          </div>
        </div>
        <div style={{ overflowY:"auto", padding:"16px 28px 24px", display:"flex", flexDirection:"column", gap:"16px" }}>
          {loading ? Array.from({length:4}).map((_,i) => (
            <div key={i} style={{ background:"#faf8ff", border:"1.5px solid #e4d9ff", borderRadius:"16px", padding:"18px 20px", animation:"shimmerBg 1.5s ease infinite" }}>
              <div style={{ display:"flex", gap:"12px", marginBottom:"10px" }}>
                <div style={{ width:"40px", height:"40px", borderRadius:"50%", background:"#e4d9ff" }}/>
                <div style={{ flex:1 }}>
                  <div style={{ height:"14px", background:"#e4d9ff", borderRadius:"6px", width:"40%", marginBottom:"8px" }}/>
                  <div style={{ height:"10px", background:"#e4d9ff", borderRadius:"6px", width:"25%" }}/>
                </div>
              </div>
              <div style={{ height:"10px", background:"#e4d9ff", borderRadius:"6px", width:"90%", marginBottom:"6px" }}/>
              <div style={{ height:"10px", background:"#e4d9ff", borderRadius:"6px", width:"70%" }}/>
            </div>
          )) : reviews.map((r, i) => (
            <div key={i} style={{ background:"#faf8ff", border:"1.5px solid #e4d9ff", borderRadius:"16px", padding:"18px 20px", animation:`reviewSlide 0.4s ease ${i*0.05}s both` }}>
              <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"10px" }}>
                <div style={{ width:"40px", height:"40px", borderRadius:"50%", background:"linear-gradient(135deg,#7c3aed,#a78bfa)", overflow:"hidden", flexShrink:0 }}>
                  <img src={r.avatar} alt={r.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>e.target.style.display="none"}/>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:"14px", fontWeight:800, color:"#1a0640", fontFamily:"'Outfit',sans-serif" }}>{r.name}</div>
                  <div style={{ fontSize:"12px", color:"#9270c0", fontFamily:"'Outfit',sans-serif" }}>{r.role}{r.time ? ` · ${r.time}` : ""}</div>
                </div>
                <div style={{ flexShrink:0 }}><Stars n={r.rating}/></div>
              </div>
              <p style={{ fontSize:"13.5px", color:"#4b4466", lineHeight:1.7, fontFamily:"'Outfit',sans-serif" }}>{r.text}</p>
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

function ReviewAvatars({ centered=false, onViewAll }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"10px", justifyContent:centered?"center":"flex-start" }}>
      <div style={{ display:"flex" }}>
        {["#7c3aed","#059669","#2563eb"].map((bg,i) => (
          <div key={i} style={{ width:"34px", height:"34px", borderRadius:"50%", background:bg, border:"2.5px solid #fff", marginLeft:i===0?"0":"-10px", zIndex:3-i, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:"13px" }}>{["A","B","C"][i]}</div>
        ))}
      </div>
      <div onClick={onViewAll} style={{ cursor:"pointer" }}>
        <StarRating rating={4.9}/>
        <div style={{ fontSize:"11px", color:"#9270c0", marginTop:"2px" }}>(100+ Reviews) <span style={{ color:"#7c3aed", fontWeight:700 }}>View all →</span></div>
      </div>
    </div>
  );
}

function HeroSection({ scrollRef, onCounselorClick, onViewReviews }) {
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
            <button className="cta-btn" onClick={onCounselorClick} style={{ background:"linear-gradient(135deg,#ff6b35 0%,#f03e00 100%)", color:"#fff", border:"none", borderRadius:"32px", padding:"15px 28px", fontSize:"13px", fontWeight:800, cursor:"pointer", letterSpacing:".5px", boxShadow:"0 6px 22px rgba(255,80,0,.38)", whiteSpace:"nowrap", position:"relative", overflow:"hidden" }}>
              TALK TO OUR COUNSELLORS
            </button>
            <ReviewAvatars onViewAll={onViewReviews}/>
          </div>
        </div>
        <div className="hero-right vR" style={{ flex:"1", display:"flex", justifyContent:"flex-end", alignItems:"center", position:"relative", minWidth:0 }}>
          <div className="card-float glass-card-pos hero-glass-card" style={{ position:"absolute", bottom:"200px", left:"10%", zIndex:30, background:"rgba(255,255,255,0.62)", backdropFilter:"blur(22px) saturate(1.8)", WebkitBackdropFilter:"blur(22px) saturate(1.8)", border:"1.5px solid rgba(255,255,255,0.82)", borderRadius:"20px", padding:"18px 28px", display:"flex", alignItems:"center", gap:"16px", boxShadow:"0 20px 56px rgba(80,20,180,.16)", minWidth:"230px" }}>
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
                  <img src={slide.img} alt={`slide-${i}`} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center", display:"block" }}/>
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
            Advance your career with <strong style={{ color:"#120630" }}>AI Medical Coding</strong>, IT, and Finance courses with 100% placement support.
          </p>
          <div style={{ display:"flex", gap:"10px", flexWrap:"wrap", justifyContent:"center" }}>
            {["✓ 15+ Years Experienced Trainers","✓ Tamper-Proof Digital Certificate"].map((b,i) => (
              <span key={i} style={{ color:"#7c3aed", fontSize:"12px", fontWeight:700, display:"flex", alignItems:"center", gap:"5px", background:"rgba(124,58,237,.07)", borderRadius:"20px", padding:"6px 12px", border:"1px solid rgba(124,58,237,.15)" }}>{b}</span>
            ))}
          </div>
          <button className="cta-btn" onClick={onCounselorClick} style={{ background:"linear-gradient(135deg,#ff6b35 0%,#f03e00 100%)", color:"#fff", border:"none", borderRadius:"32px", padding:"16px 32px", fontSize:"14px", fontWeight:800, cursor:"pointer", letterSpacing:".5px", boxShadow:"0 6px 22px rgba(255,80,0,.38)", width:"100%", maxWidth:"360px", position:"relative", overflow:"hidden" }}>
            TALK TO OUR COUNSELORS
          </button>
          <ReviewAvatars centered onViewAll={onViewReviews}/>
        </div>
      </div>
      <div style={{ padding:"48px 0 28px", position:"relative", zIndex:1 }}>
        <div className="partners-title" style={{ textAlign:"center", fontWeight:900, fontSize:"clamp(18px,3vw,26px)", color:"#120630", marginBottom:"24px", letterSpacing:"-0.3px" }}>
          More than <span style={{ color:"#7c3aed" }}>25 +</span> Hiring Partners
        </div>
        <div style={{ overflow:"hidden", width:"100%", userSelect:"none" }} ref={scrollRef}>
          <div style={{ display:"flex", width:"max-content" }}>
            {[...COMPANIES,...COMPANIES,...COMPANIES].map((c,i) => (
              <div key={i} className="company-item" style={{ display:"flex", alignItems:"center", gap:"8px", padding:"0 clamp(20px,3vw,40px)", color:"#a08cc4", fontSize:"15px", fontWeight:700, whiteSpace:"nowrap" }}>
                <span style={{ fontSize:"20px", opacity:0.6 }}>{c.icon}</span><span>{c.name}</span>
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
        <div className="about-images" style={{ position:"relative", width:"clamp(260px,40%,460px)", minWidth:"260px", height:"400px", flexShrink:0 }}>
          <ImageCard src={`${PUB}/abtimg3.jpg`} alt="Instructor" delay={100} style={{ position:"absolute", top:0, left:0, width:"220px", height:"170px" }}/>
          <ImageCard src={`${PUB}/abtimg2.jpg`} alt="Campus" delay={250} style={{ position:"absolute", top:0, right:0, width:"180px", height:"170px" }}/>
          <ImageCard src={`${PUB}/abtimg1.jpg`} alt="Students" delay={400} style={{ position:"absolute", top:"182px", left:0, width:"100%", height:"210px" }}/>
          <div style={{ position:"absolute", left:"50%", top:"178px", transform:"translate(-50%,-50%)", width:"110px", height:"110px", borderRadius:"50%", background:"linear-gradient(135deg,#7c3aed,#4c1d95)", boxShadow:"0 0 0 6px rgba(124,58,237,0.12),0 8px 32px rgba(108,43,217,0.38)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", zIndex:10 }}>
            <span style={{ fontWeight:900, fontSize:"1.8rem", color:"#fff", lineHeight:1 }}>25+</span>
            <span style={{ fontWeight:500, fontSize:"0.62rem", color:"rgba(255,255,255,0.88)", marginTop:"4px", textAlign:"center", lineHeight:1.4 }}>Hiring<br/>Partners</span>
          </div>
        </div>
        <div style={{ flex:1, minWidth:"260px", opacity:cv?1:0, transform:cv?"translateY(0)":"translateY(24px)", transition:"all 0.9s cubic-bezier(.4,0,.2,1) 0.15s" }}>
          <SectionLabel text="ABOUT US"/>
          <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:900, fontSize:"clamp(1.8rem,3.5vw,2.6rem)", color:"#1a1035", lineHeight:1.15, marginBottom:"22px", letterSpacing:"-0.02em" }}>
            Your{" "}<span style={{ position:"relative", display:"inline-block", whiteSpace:"nowrap" }}>Skill Partner<AnimatedCircle/></span><br/>For Career Growth
          </h2>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.97rem", color:"#4b4466", lineHeight:1.78, marginBottom:"24px", maxWidth:"520px" }}>
            Skillra is a leading training institute specializing in <strong style={{ color:"#1e3a8a" }}>AI Medical Coding</strong> &amp; <strong style={{ color:"#1e3a8a" }}>Medical Billing</strong>, <strong style={{ color:"#c2410c" }}>IT development</strong>, <strong style={{ color:"#14532d" }}>Finance training</strong>, and Career oriented programs.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px", marginBottom:"32px" }}>
            <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.88rem", color:"#5a5275", lineHeight:1.8 }}>Our expert mentors guide students with hands-on experience, industry projects, and job-ready skill development.</p>
            <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.88rem", color:"#5a5275", lineHeight:1.8 }}>Skillra empowers learners to outperform industry expectations with confidence and credibility.</p>
          </div>
          <button onClick={() => navigate("/about")} style={{ display:"flex", alignItems:"center", gap:"10px", background:"#f05a00", color:"#fff", border:"none", borderRadius:"50px", padding:"13px 30px", fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:"1rem", cursor:"pointer", boxShadow:"0 4px 18px rgba(240,90,0,0.28)", transition:"all 0.25s" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(240,90,0,0.38)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 18px rgba(240,90,0,0.28)";}}>
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
   ─ Everything is inline-styled. No CSS classes touch this section.
   ─ isMobile drives ALL layout, sizes, and arrow visibility.
   ─ Arrows are plain <button> elements with fully inline styles.
═══════════════════════════════════════════════════ */
function CoursesSection() {
  const [ref, inView] = useInView(0.08);
  const [activeTab, setActiveTab] = useState("healthcare");
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 820);

  /* ── detect mobile ── */
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 820);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── scroll state ── */
  const updateScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollLeft = 0;
    updateScroll();

    el.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);

    return () => {
      el.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [activeTab, updateScroll]);

  /* ── improved scroll ── */
  const doScroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;

    const card = el.querySelector(".course-card");
    const scrollAmount = card ? card.clientWidth + 20 : 200;

    el.scrollBy({
      left: dir * scrollAmount,
      behavior: "smooth",
    });
  };

  const handleCourseClick = (id) => navigate(`/courses?course=${id}`);

  const cat = COURSES_DATA[activeTab];

  /* UI sizes (UNCHANGED) */
  const w = window.innerWidth;
  const cardW = !isMobile ? "clamp(280px,28vw,340px)" : w <= 360 ? "140px" : w <= 480 ? "155px" : "170px";
  const imgH = !isMobile ? "220px" : w <= 480 ? "110px" : "120px";
  const bodyP = !isMobile ? "20px 22px 24px" : "10px 12px 12px";
  const titleF = !isMobile ? "17px" : "12px";
  const descF = !isMobile ? "13px" : "11px";
  const btnP = !isMobile ? "9px 20px" : "5px 12px";
  const btnF = !isMobile ? "12px" : "10px";

  return (
    <section
      id="courses"
      ref={ref}
      style={{
        padding: "clamp(48px,8vw,88px) 0",
        background: "#F3F4F4",
        borderTop: "1px solid #e5e7eb",
        position: "relative",
      }}
    >
      <div style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(124,58,237,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.035) 1px,transparent 1px)`,
        backgroundSize: "32px 32px"
      }}/>

      <div style={{ maxWidth:"1400px", margin:"0 auto", padding:"0 clamp(16px,4%,64px)", position:"relative", zIndex:1 }}>

        {/* header */}
        <div style={{ textAlign:"center", marginBottom:"52px", opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(24px)", transition:"all 0.7s ease" }}>
          <SectionLabel text="OUR COURSES"/>
          <h2 style={{ fontSize:"clamp(1.8rem,4vw,3.2rem)", fontWeight:900, fontFamily:"'Outfit',sans-serif", color:"#120630", letterSpacing:"-0.03em", lineHeight:1.05, marginBottom:"12px" }}>
            Our <em style={{ fontStyle:"italic", color:cat.activeColor }}>interactive</em> Course
          </h2>
          <p style={{ fontSize:"clamp(13px,1.4vw,15px)", color:"#6b5a9e", fontFamily:"'Outfit',sans-serif", maxWidth:"520px", margin:"0 auto", lineHeight:1.7 }}>
            Excellent courses, intellectual knowledge and industry-ready content.
          </p>
        </div>

        <div style={{ display:"flex", flexDirection:isMobile?"column":"row", gap:"40px" }}>

          {/* tabs */}
          <div style={{ width:isMobile?"100%":"220px", display:"flex", flexDirection:isMobile?"row":"column", flexWrap:isMobile?"wrap":"nowrap", gap:"8px" }}>
            {Object.entries(COURSES_DATA).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  flex:isMobile?"1 1 auto":undefined,
                  minWidth:isMobile?"100px":undefined,
                  width:isMobile?undefined:"100%",
                  background:activeTab===key ? val.activeColor : "#fff",
                  border:activeTab===key ? "none" : "1.5px solid #e4d9ff",
                  fontSize:isMobile?"13px":"15px",
                  fontWeight:700,
                  color:activeTab===key ? "#fff" : "#444",
                  padding:isMobile?"8px 14px":"13px 22px",
                  borderRadius:"40px",
                  cursor:"pointer",
                }}
              >{val.label}</button>
            ))}
          </div>

          {/* cards */}
          <div style={{ flex:1, position:"relative" }}>

            {/* LEFT */}
            {isMobile && (
              <button
                onClick={() => doScroll(-1)}
                style={{
                  position:"absolute",
                  left:"-14px",
                  top:"50%",
                  transform:"translateY(-50%)",
                  zIndex:40,
                  pointerEvents:canScrollLeft ? "auto" : "none",
                  opacity:canScrollLeft ? 1 : 0.4,
                }}
              >◀</button>
            )}

            {/* RIGHT */}
            {isMobile && (
              <button
                onClick={() => doScroll(1)}
                style={{
                  position:"absolute",
                  right:"-14px",
                  top:"50%",
                  transform:"translateY(-50%)",
                  zIndex:40,
                  pointerEvents:canScrollRight ? "auto" : "none",
                  opacity:canScrollRight ? 1 : 0.4,
                }}
              >▶</button>
            )}

            <div
              ref={scrollRef}
              id="courses-scroll-inner"
              style={{
                display:"flex",
                gap:"20px",
                overflowX:"auto",   // ✅ FIXED
                WebkitOverflowScrolling:"touch",
                scrollSnapType:isMobile ? "x mandatory" : "none",
                scrollbarWidth:"none",
              }}
            >
              {cat.courses.map((course, idx) => (
                <div
                  key={course.id}
                  className="course-card"
                  onClick={() => handleCourseClick(course.id)}
                  style={{
                    width:cardW,
                    minWidth:cardW,
                    flexShrink:0,
                    scrollSnapAlign:isMobile ? "start" : "none",
                    background:cat.cardBg,
                    borderRadius:"22px",
                    cursor:"pointer",
                  }}
                >
                  <img src={course.image} alt={course.title} style={{ width:"100%", height:imgH, objectFit:"cover" }} />
                  <div style={{ padding:bodyP }}>
                    <div style={{ fontSize:titleF, fontWeight:800 }}>{course.title}</div>
                    <div style={{ fontSize:descF }}>{course.description}</div>
                    <button style={{ padding:btnP, fontSize:btnF }}>KNOW MORE</button>
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

/* ═══════════════ SERVICES ═══════════════ */
const SERVICE_CARDS = [
  {
    id:1, bg:"linear-gradient(160deg,#7c3aed,#6d28d9)", title:"Campus Training Programs",
    titleColor:"#e9d5ff", shadowColor:"rgba(109,40,217,0.40)",
    shortDesc:"We partner with colleges to deliver industry-ready training directly on campus.",
    longDesc:"Our Campus Training Programs bring Skillra's expertise directly to your institution. We design and deliver structured training modules on AI Medical Coding, Full Stack Development, Data Analytics, and Finance — tailored to your curriculum. Students receive hands-on projects, live mentorship, and industry certifications without leaving campus. We have partnered with 50+ institutions across South India.",
    icon: <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4L4 10l12 6 12-6-12-6z"/><path d="M4 16l12 6 12-6"/><path d="M4 22l12 6 12-6"/></svg>,
  },
  {
    id:2, bg:"linear-gradient(160deg,#ea580c,#c2410c)", title:"Placement Support",
    titleColor:"#fed7aa", shadowColor:"rgba(234,88,12,0.40)",
    shortDesc:"We guide every student with structured job preparation, resume building, and interview coaching.",
    longDesc:"Our dedicated Placement Cell works tirelessly to connect students with the right opportunities. We provide resume building workshops, mock interview sessions, LinkedIn profile optimization, and direct referrals to our 120+ hiring partners across Medical Coding firms, IT companies, and Finance organizations. We maintain a 98% placement rate and a 4.2L average package across all courses.",
    icon: <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="16" cy="10" r="5"/><path d="M6 28c0-5.523 4.477-10 10-10s10 4.477 10 10"/><path d="M22 14l3 3-3 3"/></svg>,
  },
  {
    id:3, bg:"linear-gradient(160deg,#15803d,#166534)", title:"Career Guidance & Mentorship",
    titleColor:"#bbf7d0", shadowColor:"rgba(21,128,61,0.40)",
    shortDesc:"Get personalized guidance from industry experts who help you chart your ideal career path.",
    longDesc:"Our Career Guidance program pairs every student with an industry mentor who has 10+ years of real-world experience. Through one-on-one sessions, group workshops, and personality assessments, we help you identify your strengths, pick the right specialization, and build a roadmap to your dream role. Mentors are available throughout the course and for 6 months post-placement.",
    icon: <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 20c0-4.418 3.582-8 8-8s8 3.582 8 8"/><circle cx="16" cy="10" r="3"/><path d="M4 28h24"/><path d="M12 28v-4h8v4"/></svg>,
  },
];

function ServiceCard({ card, delay, inView }) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => { if(inView) setTimeout(()=>setVisible(true), delay); },[inView,delay]);
  return (
    <div
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      onClick={()=>setExpanded(p=>!p)}
      style={{ flex:"1 1 280px", minWidth:"280px", maxWidth:"380px", background:card.bg, borderRadius:"24px", overflow:"hidden", cursor:"pointer", position:"relative", opacity:visible?1:0, transform:visible?(hovered&&!expanded?"translateY(-10px) scale(1.02)":"translateY(0) scale(1)"):"translateY(40px) scale(0.94)", transition:"opacity 0.65s ease, transform 0.35s cubic-bezier(.34,1.4,.64,1), box-shadow 0.35s ease", boxShadow:expanded?`0 40px 80px ${card.shadowColor}`:(hovered?`0 28px 60px ${card.shadowColor}`:`0 10px 32px ${card.shadowColor.replace("0.40","0.24")}`), display:"flex", flexDirection:"column" }}
    >
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 30% 20%,rgba(255,255,255,0.12) 0%,transparent 65%)", opacity:hovered||expanded?1:0, transition:"opacity 0.4s", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)", backgroundSize:"200% 100%", animation:"shimmer 2.5s infinite", pointerEvents:"none" }}/>
      <div style={{ padding:"clamp(24px,4%,36px) clamp(20px,4%,28px) 0", position:"relative", zIndex:2 }}>
        <div style={{ width:"58px", height:"58px", borderRadius:"16px", background:"rgba(255,255,255,0.18)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", transform:hovered||expanded?"rotate(8deg) scale(1.12)":"rotate(0deg) scale(1)", transition:"transform 0.45s cubic-bezier(.34,1.56,.64,1)", boxShadow:"0 4px 16px rgba(0,0,0,0.18)" }}>{card.icon}</div>
      </div>
      <div style={{ padding:"clamp(16px,3%,22px) clamp(20px,4%,28px) clamp(24px,4%,32px)", flex:1, display:"flex", flexDirection:"column", position:"relative", zIndex:2 }}>
        <h3 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:"clamp(1rem,1.6vw,1.22rem)", color:card.titleColor, lineHeight:1.28, marginBottom:"10px" }}>{card.title}</h3>
        <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(12px,1.2vw,14px)", color:"rgba(255,255,255,0.82)", lineHeight:1.75, marginBottom:expanded?"16px":"0" }}>{card.shortDesc}</p>
        <div style={{ overflow:"hidden", maxHeight:expanded?"300px":"0", opacity:expanded?1:0, transition:"max-height 0.45s ease, opacity 0.35s ease" }}>
          <div style={{ height:"1px", background:"rgba(255,255,255,0.2)", margin:"12px 0" }}/>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(12px,1.1vw,13.5px)", color:"rgba(255,255,255,0.78)", lineHeight:1.8 }}>{card.longDesc}</p>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"6px", marginTop:"16px", opacity:hovered||expanded?1:0.7, transition:"all 0.28s" }}>
          <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:"12px", color:"rgba(255,255,255,0.90)", letterSpacing:"0.08em", textTransform:"uppercase" }}>{expanded?"Show less":"Learn more"}</span>
          <div style={{ width:"20px", height:"20px", borderRadius:"50%", background:"rgba(255,255,255,0.22)", display:"flex", alignItems:"center", justifyContent:"center", transform:expanded?"rotate(180deg)":"rotate(0deg)", transition:"transform 0.35s ease" }}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesSection() {
  const [ref, inView] = useInView(0.1);
  return (
    <section id="services" ref={ref} style={{ padding:"clamp(48px,8vw,80px) 0", background:"#F3F4F4", borderTop:"1px solid #e5e7eb", position:"relative" }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(rgba(124,58,237,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.035) 1px,transparent 1px)`, backgroundSize:"32px 32px" }}/>
      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 clamp(16px,4%,48px)", position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom:"52px", opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(20px)", transition:"all 0.7s ease" }}>
          <SectionLabel text="WHAT WE OFFER"/>
          <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:900, fontSize:"clamp(1.8rem,4vw,2.8rem)", color:"#1a0a3c", letterSpacing:"-0.03em", lineHeight:1.1 }}>
            Services <span style={{ background:"linear-gradient(135deg,#7c3aed,#a855f7)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>We Do</span>
          </h2>
          <p style={{ fontSize:"clamp(13px,1.3vw,14.5px)", color:"#6b5a9e", fontFamily:"'Outfit',sans-serif", marginTop:"12px" }}>Click any card to learn more about what we offer.</p>
        </div>
        <div style={{ display:"flex", gap:"24px", flexWrap:"wrap", alignItems:"flex-start", justifyContent:"center" }}>
          {SERVICE_CARDS.map((card, i) => <ServiceCard key={card.id} card={card} inView={inView} delay={120+i*140}/>)}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ PLACEMENT ═══════════════ */
const PLACEMENT_BARS = [
  { course:"AI Medical Coding",  rate:98, placed:142, avg:"3.8 LPA", color:"#1e3a8a" },
  { course:"AI Medical Billing", rate:97, placed:88,  avg:"3.5 LPA", color:"#7c3aed" },
  { course:"Full Stack Dev",     rate:96, placed:118, avg:"5.2 LPA", color:"#c2410c" },
  { course:"SAP Development",    rate:95, placed:61,  avg:"6.0 LPA", color:"#14532d" },
  { course:"Data Analytics",     rate:94, placed:95,  avg:"4.5 LPA", color:"#0ea5e9" },
  { course:"UI/UX Design",       rate:92, placed:74,  avg:"4.8 LPA", color:"#ec4899" },
];

function PlacementSection() {
  const [ref, inView] = useInView(0.1);
  const [barWidths, setBarWidths] = useState(PLACEMENT_BARS.map(()=>0));
  useEffect(() => {
    if (!inView) return;
    PLACEMENT_BARS.forEach((b,i) => { setTimeout(()=>{ setBarWidths(prev=>{const n=[...prev];n[i]=b.rate;return n;}); }, 300+i*180); });
  },[inView]);
  return (
    <section id="placement" ref={ref} style={{ padding:"clamp(48px,8vw,80px) 0", background:"#F3F4F4", borderTop:"1px solid #e5e7eb", position:"relative" }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)`, backgroundSize:"32px 32px" }}/>
      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 clamp(16px,4%,48px)", position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom:"48px", opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(24px)", transition:"all 0.7s ease" }}>
          <SectionLabel text="PLACEMENT"/>
          <h2 style={{ fontSize:"clamp(1.6rem,3.5vw,2.6rem)", fontWeight:900, fontFamily:"'Outfit',sans-serif", color:"#0f0426", letterSpacing:"-0.02em" }}>
            Your Dream Job <span style={{ color:"#7c3aed" }}>Starts Here</span>
          </h2>
          <p style={{ fontSize:"clamp(13px,1.4vw,15px)", color:"#9270c0", marginTop:"10px", fontWeight:500, maxWidth:"500px", margin:"10px auto 0", fontFamily:"'Outfit',sans-serif" }}>
            We don't just train you — we place you. 100% placement assistance, 120+ hiring partners.
          </p>
        </div>
        <div style={{ display:"flex", gap:"18px", flexWrap:"wrap", marginBottom:"48px" }}>
          {[{num:"500+",label:"Students Placed"},{num:"98%",label:"Placement Rate"},{num:"120+",label:"Hiring Partners"},{num:"4.2L",label:"Avg. Package"}].map((s,i) => (
            <div key={i} style={{ flex:"1 1 120px", minWidth:"120px", background:"#fff", border:"1.5px solid #e4d9ff", borderRadius:"20px", padding:"clamp(16px,3%,24px) 18px", textAlign:"center", boxShadow:"0 4px 16px rgba(124,58,237,0.07)", transition:"all 0.32s", cursor:"default", opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(20px)", transitionDelay:`${i*0.1}s` }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px) scale(1.03)";e.currentTarget.style.background="linear-gradient(135deg,#7c3aed,#5b21b6)";e.currentTarget.querySelector(".sn").style.color="#fff";e.currentTarget.querySelector(".sl").style.color="rgba(255,255,255,0.75)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0) scale(1)";e.currentTarget.style.background="#fff";e.currentTarget.querySelector(".sn").style.color="#7c3aed";e.currentTarget.querySelector(".sl").style.color="#9270c0";}}>
              <div className="sn" style={{ fontSize:"clamp(1.5rem,3vw,2.3rem)", fontWeight:900, color:"#7c3aed", lineHeight:1, letterSpacing:"-1px", transition:"color 0.32s" }}>{s.num}</div>
              <div className="sl" style={{ fontSize:"11px", color:"#9270c0", marginTop:"5px", fontWeight:600, fontFamily:"'Outfit',sans-serif", transition:"color 0.32s" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div className="placement-bars-row" style={{ display:"flex", gap:"48px", alignItems:"flex-start", flexWrap:"wrap" }}>
          <div style={{ flex:"0 0 clamp(200px,28%,280px)", opacity:inView?1:0, transform:inView?"translateX(0)":"translateX(-28px)", transition:"all 0.8s ease" }}>
            <h3 style={{ fontSize:"clamp(1.2rem,2.5vw,1.9rem)", fontWeight:900, fontFamily:"'Outfit',sans-serif", color:"#0f0426", lineHeight:1.15, letterSpacing:"-0.02em", marginBottom:"12px" }}>Course-wise<br/><span style={{ color:"#7c3aed" }}>Placement Rate</span></h3>
            <p style={{ fontSize:"13.5px", color:"#9270c0", lineHeight:1.75, fontWeight:500, fontFamily:"'Outfit',sans-serif" }}>Every course at Skillra is backed by dedicated placement cells and active employer relationships.</p>
          </div>
          <div style={{ flex:1, display:"flex", flexDirection:"column", gap:"12px" }}>
            {PLACEMENT_BARS.map((b,i) => (
              <div key={i} style={{ background:"#fff", border:"1.5px solid #e4d9ff", borderRadius:"14px", padding:"14px 18px", cursor:"default", opacity:inView?1:0, transform:inView?"translateX(0)":"translateX(-30px)", transition:`opacity 0.6s ease ${i*0.1}s, transform 0.6s ease ${i*0.1}s, border-color 0.22s, box-shadow 0.22s` }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=b.color;e.currentTarget.style.boxShadow=`0 4px 20px ${b.color}22`;e.currentTarget.style.transform="translateX(6px)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#e4d9ff";e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateX(0)";}}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
                  <span style={{ fontSize:"clamp(12px,1.3vw,13.5px)", fontWeight:700, color:"#1a0640", fontFamily:"'Outfit',sans-serif" }}>{b.course}</span>
                  <div style={{ display:"flex", gap:"14px", alignItems:"center" }}>
                    <span style={{ fontSize:"11px", color:"#9270c0", fontWeight:600, fontFamily:"'Outfit',sans-serif" }}>{b.placed} placed · {b.avg}</span>
                    <span style={{ fontSize:"15px", fontWeight:900, color:b.color, fontFamily:"'Outfit',sans-serif", minWidth:"42px", textAlign:"right" }}>{b.rate}%</span>
                  </div>
                </div>
                <div style={{ height:"8px", background:"#ede8ff", borderRadius:"99px", overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${barWidths[i]}%`, background:`linear-gradient(90deg,${b.color},${b.color}aa)`, borderRadius:"99px", transition:"width 1.1s cubic-bezier(0.4,0,0.2,1)", boxShadow:`0 2px 8px ${b.color}44` }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ NEWSLETTER ═══════════════ */
function NewsletterSection() {
  const [ref, inView] = useInView(0.3);
  const [email, setEmail]           = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [nlError, setNlError]       = useState("");

  const handleSubscribe = async () => {
    if (!email.trim()) { setNlError("Please enter your email"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setNlError("Please enter a valid email address"); return; }
    setNlError(""); setSubscribing(true);
    try {
      const res = await fetch(SHEETS_URL, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ type:"subscriber", email:email.trim().toLowerCase() }) });
      const data = await res.json();
      if (data.success) setSubscribed(true);
      else if (data.reason === "duplicate") setNlError("This email is already subscribed!");
      else setNlError("Something went wrong. Please try again.");
    } catch { setNlError("Network error. Please try again."); }
    finally { setSubscribing(false); }
  };

  return (
    <div ref={ref} style={{ background:"linear-gradient(135deg,#6d28d9,#7c3aed,#6d28d9)", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,0.10) 1px,transparent 1px)", backgroundSize:"22px 22px", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"3px", background:"linear-gradient(90deg,#06b6d4,#22d3ee,#67e8f9,#22d3ee,#06b6d4)", backgroundSize:"200% 100%", animation:"shimmer 3s linear infinite" }}/>
      <div className="nl-inner" style={{ maxWidth:"1200px", margin:"0 auto", padding:"clamp(24px,4vw,36px) clamp(16px,4%,48px)", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"clamp(20px,3%,36px)", flexWrap:"wrap", position:"relative", zIndex:1, opacity:inView?1:0, transition:"opacity 0.8s ease" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"20px" }}>
          <div style={{ width:"46px", height:"46px", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", animation:"spinRingAnim 6s linear infinite" }}>
            <svg width="40" height="40" viewBox="0 0 46 46" fill="none"><path d="M23 4v38M4 23h38M8 8l30 30M38 8L8 38" stroke="rgba(255,255,255,0.85)" strokeWidth="3.5" strokeLinecap="round"/></svg>
          </div>
          <div>
            <h2 style={{ fontSize:"clamp(1.1rem,2.2vw,1.6rem)", fontWeight:900, color:"#fff", lineHeight:1.1, letterSpacing:"-0.02em", marginBottom:"5px", fontFamily:"'Outfit',sans-serif" }}>Join Our Newsletter</h2>
            <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.75)", fontWeight:500, fontFamily:"'Outfit',sans-serif" }}>Subscribe to get our latest updates &amp; news.</p>
          </div>
        </div>
        {subscribed ? (
          <div style={{ display:"flex", alignItems:"center", gap:"10px", background:"rgba(255,255,255,0.15)", border:"1.5px solid rgba(255,255,255,0.4)", borderRadius:"12px", padding:"12px 20px" }}>
            <div style={{ width:"28px", height:"28px", borderRadius:"50%", background:"#22c55e", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
            </div>
            <span style={{ color:"#fff", fontWeight:700, fontSize:"14px", fontFamily:"'Outfit',sans-serif" }}>You're subscribed! 🎉</span>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
            <div className="nl-form" style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
              <input type="email" value={email} onChange={e=>{setEmail(e.target.value);setNlError("");}} onKeyDown={e=>e.key==="Enter"&&handleSubscribe()} placeholder="Enter your email"
                style={{ height:"48px", width:"clamp(180px,26vw,300px)", padding:"0 16px", fontSize:"14px", fontFamily:"'Outfit',sans-serif", fontWeight:500, color:"#1a0640", background:nlError?"rgba(255,220,220,0.96)":"rgba(255,255,255,0.96)", border:`2px solid ${nlError?"#f87171":"rgba(255,255,255,0.7)"}`, borderRadius:"12px", outline:"none", transition:"border-color 0.2s, background 0.2s" }}
                onFocus={e=>{e.target.style.borderColor="#fff";e.target.style.background="rgba(255,255,255,0.98)";}}
                onBlur={e=>{e.target.style.borderColor=nlError?"#f87171":"rgba(255,255,255,0.7)";}}
              />
              <button onClick={handleSubscribe} disabled={subscribing}
                style={{ height:"48px", background:"#111", color:"#fff", border:"none", borderRadius:"12px", padding:"0 24px", fontSize:"14px", fontWeight:700, fontFamily:"'Outfit',sans-serif", cursor:subscribing?"not-allowed":"pointer", whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:"8px", transition:"all 0.22s", opacity:subscribing?0.7:1 }}
                onMouseEnter={e=>{if(!subscribing){e.currentTarget.style.background="#2d1b69";e.currentTarget.style.transform="translateY(-2px)";}}}
                onMouseLeave={e=>{e.currentTarget.style.background="#111";e.currentTarget.style.transform="translateY(0)";}}>
                {subscribing?"Subscribing…":"Subscribe Now"}
                {!subscribing&&<svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </button>
            </div>
            {nlError && (
              <div style={{ display:"flex", alignItems:"center", gap:"6px", background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,100,100,0.4)", borderRadius:"8px", padding:"6px 12px" }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#fca5a5" strokeWidth="1.5"/><path d="M8 5v4M8 11v.5" stroke="#fca5a5" strokeWidth="1.5" strokeLinecap="round"/></svg>
                <span style={{ fontSize:"13px", color:"#fca5a5", fontWeight:600, fontFamily:"'Outfit',sans-serif" }}>{nlError}</span>
              </div>
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
  const [showModal,   setShowModal]   = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let af, pos=0;
    const step=()=>{ pos+=0.55; if(pos>=el.scrollWidth/2)pos=0; el.scrollLeft=pos; af=requestAnimationFrame(step); };
    af=requestAnimationFrame(step);
    return ()=>cancelAnimationFrame(af);
  },[]);

  return (
    <div style={{ fontFamily:"'Outfit','Segoe UI',sans-serif", margin:0, padding:0, overflowX:"hidden", background:"#F3F4F4" }}>
      <title>Skillra — AI Medical Coding, IT &amp; Finance Training with 100% Placement</title>
      <meta name="description" content="Skillra offers industry-aligned training in AI Medical Coding, Medical Billing, Full Stack Development, Data Analytics, SAP, Tally & GST with 100% placement assistance."/>

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

        /* ── Non-courses responsive ── */
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
          .about-images{width:100%!important;min-width:unset!important;height:400px!important;max-width:360px!important;margin:0 auto!important;}
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
      `}</style>

      {showModal   && <CounselorModal onClose={()=>setShowModal(false)}/>}
      {showReviews && <ReviewsModal   onClose={()=>setShowReviews(false)}/>}

      <HeroSection scrollRef={scrollRef} onCounselorClick={()=>setShowModal(true)} onViewReviews={()=>setShowReviews(true)}/>
      <SocialSidebar />
      <AboutSection />
      <CoursesSection />
      <ServicesSection />
      <PlacementSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}