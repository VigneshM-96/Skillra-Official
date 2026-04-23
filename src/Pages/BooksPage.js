import { useEffect, useRef, useState } from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";
import SocialSidebar from "../components/SocialSideBar";

const PUB = process.env.PUBLIC_URL || "";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbws7QqEJT-y2F_6U_VyyuQ56sdXZUYEgXb7qLagegYmmPfqI-5EoGJ6wXGrHuQIC-jTWA/exec";


const META = {
  title:       "Books | Skillra – CPC Exam Training Book Bundle",
  description: "Explore Skillra's own CPC Exam Training Book Bundle (3 Volumes) – comprehensive study material for medical coding certification by experienced trainers with 15+ years of expertise.",
  canonical:   "https://www.skillra.com/books",
  keywords:    "CPC exam books, medical coding books, CPC training material, Skillra books, medical coding study guide, CPC certification prep",
};

function setMeta(attr, value, content) {
  let el = document.querySelector(`meta[${attr}="${value}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, value); document.head.appendChild(el); }
  el.setAttribute("content", content);
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) { el = document.createElement("link"); el.setAttribute("rel", rel); document.head.appendChild(el); }
  el.setAttribute("href", href);
}

function setJsonLd(data) {
  const id = "skillra-books-jsonld";
  let el = document.getElementById(id);
  if (!el) { el = document.createElement("script"); el.type = "application/ld+json"; el.id = id; document.head.appendChild(el); }
  el.textContent = JSON.stringify(data);
}

function PageMeta() {
  useEffect(() => {
    document.title = META.title;
    setMeta("name", "description",  META.description);
    setMeta("name", "keywords",     META.keywords);
    setMeta("name", "robots",       "index, follow");
    setMeta("name", "author",       "Skillra");
    setLink("canonical",            META.canonical);
    setMeta("property", "og:type",        "website");
    setMeta("property", "og:url",         META.canonical);
    setMeta("property", "og:title",       META.title);
    setMeta("property", "og:description", META.description);
    setMeta("property", "og:image",       META.ogImage);
    setMeta("property", "og:image:alt",   "Skillra CPC Exam Training Book Bundle");
    setMeta("property", "og:site_name",   "Skillra");
    setMeta("property", "og:locale",      "en_IN");
    setMeta("name", "twitter:card",        "summary_large_image");
    setMeta("name", "twitter:title",       META.title);
    setMeta("name", "twitter:description", META.description);
    setMeta("name", "twitter:image",       META.ogImage);
    setMeta("name", "twitter:image:alt",   "Skillra CPC Exam Training Book Bundle");
    setJsonLd({
      "@context": "https://schema.org",
      "@type": "Book",
      "name": "CPC Exam Training Book Bundle",
      "author": { "@type": "Organization", "name": "Skillra" },
      "publisher": { "@type": "Organization", "name": "Skillra Health Innovations Pvt Ltd", "logo": { "@type": "ImageObject", "url": "/logo.png" } },
      "description": META.description,
      "numberOfPages": 3,
      "bookFormat": "https://schema.org/Hardcover",
      "url": META.canonical,
      "inLanguage": "en",
      "about": { "@type": "Thing", "name": "CPC Medical Coding Certification" }
    });
  }, []);
  return null;
}


/* ══════════════════════════════════════════════════════
   GOOGLE SHEETS SUBMIT HELPER
══════════════════════════════════════════════════════ */
async function submitToSheet(data) {
  await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  });
  return true;
}

/* ══════════════════════════════════════════════════════
   INTERSECTION OBSERVER HOOKS
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

// Per-card observer with a built-in delay — solves stagger on mobile
function useInViewDelayed(delayMs = 0) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setInView(true), delayMs);
        }
      },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delayMs]);
  return [ref, inView];
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
      setSuccess(true);
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
    <div onClick={onClose} style={{
      position:"fixed",inset:0,zIndex:9999,
      background:"rgba(0,0,0,0.55)",backdropFilter:"blur(4px)",
      display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background:"#fff",borderRadius:"24px",
        padding:"clamp(24px,5%,40px)",width:"100%",maxWidth:"440px",
        boxShadow:"0 24px 80px rgba(109,40,217,0.22)",
        fontFamily:"'Outfit',sans-serif",
        animation:"modalPop 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards",
        position:"relative",
      }}>
        <button onClick={onClose} style={{
          position:"absolute",top:"16px",right:"16px",
          width:"32px",height:"32px",borderRadius:"50%",
          background:"#f3f4f6",border:"none",cursor:"pointer",
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:"16px",color:"#6b7280",transition:"background 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.background="#e5e7eb"}
          onMouseLeave={e => e.currentTarget.style.background="#f3f4f6"}
        >✕</button>

        {success ? (
          <div style={{textAlign:"center",padding:"20px 0"}}>
            <div style={{fontSize:"52px",marginBottom:"16px"}}>🎉</div>
            <h3 style={{fontSize:"20px",fontWeight:900,color:"#111827",marginBottom:"10px"}}>Order Placed!</h3>
            <p style={{fontSize:"14px",color:"#6b7280",lineHeight:1.6,marginBottom:"24px"}}>
              Thank you <strong style={{color:"#7c3aed"}}>{form.name}</strong>! We've received your order for{" "}
              <strong style={{color:"#7c3aed"}}>{form.orders} book(s)</strong>. We'll contact you shortly.
            </p>
            <button onClick={onClose} style={{
              background:"#7c3aed",color:"#fff",border:"none",
              borderRadius:"50px",padding:"12px 32px",fontSize:"14px",
              fontWeight:700,cursor:"pointer",fontFamily:"'Outfit',sans-serif",
            }}>Close</button>
          </div>
        ) : (
          <>
            <div style={{marginBottom:"24px"}}>
              <div style={{fontSize:"28px",marginBottom:"8px"}}>📚</div>
              <h3 style={{fontSize:"20px",fontWeight:900,color:"#111827",marginBottom:"4px"}}>Buy CPC Question Bank</h3>
              <p style={{fontSize:"13px",color:"#9ca3af"}}>Fill in your details and we'll process your order.</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
              {[
                {key:"name",    label:"Full Name",      placeholder:"Your full name",     type:"text"},
                {key:"email",   label:"Email Address",  placeholder:"your@email.com",     type:"email"},
                {key:"contact", label:"Contact Number", placeholder:"10-digit mobile no", type:"tel"},
                {key:"orders",  label:"No. of Bundle",   placeholder:"How many Bundle package?",   type:"number"},
              ].map(f => (
                <div key={f.key}>
                  <label style={{fontSize:"12px",fontWeight:700,color:"#374151",display:"block",marginBottom:"5px",letterSpacing:"0.03em"}}>
                    {f.label} <span style={{color:"#ef4444"}}>*</span>
                  </label>
                  <input
                    type={f.type} placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={e => handleChange(f.key, e.target.value)}
                    onBlur={() => handleBlur(f.key)}
                    onFocus={e => { e.currentTarget.style.borderColor="#a78bfa"; }}
                    min={f.key==="orders"?1:undefined}
                    style={{
                      width:"100%",padding:"11px 14px",
                      border:`1.5px solid ${borderColor(f.key)}`,
                      borderRadius:"10px",fontSize:"13.5px",
                      fontFamily:"'Outfit',sans-serif",color:"#374151",
                      outline:"none",background:"#fafafa",
                      boxSizing:"border-box",transition:"border-color 0.2s",
                    }}
                  />
                  {touched[f.key] && errors[f.key] && (
                    <p style={{fontSize:"11.5px",color:"#ef4444",marginTop:"4px",display:"flex",alignItems:"center",gap:"4px",fontFamily:"'Outfit',sans-serif"}}>
                      <svg width="11" height="11" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#ef4444" strokeWidth="1.8"/><path d="M10 6v4M10 14h.01" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"/></svg>
                      {errors[f.key]}
                    </p>
                  )}
                  {touched[f.key] && !errors[f.key] && form[f.key] && (
                    <p style={{fontSize:"11.5px",color:"#22c55e",marginTop:"4px",display:"flex",alignItems:"center",gap:"4px",fontFamily:"'Outfit',sans-serif"}}>
                      <svg width="11" height="11" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#22c55e" strokeWidth="1.8"/><path d="M6 10l3 3 5-5" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Looks good!
                    </p>
                  )}
                </div>
              ))}
              
              <button onClick={handleSubmit} disabled={loading} style={{
                background:loading?"#a78bfa":"#7c3aed",
                color:"#fff",border:"none",borderRadius:"50px",
                padding:"13px 24px",fontSize:"14px",fontWeight:700,
                cursor:loading?"not-allowed":"pointer",
                fontFamily:"'Outfit',sans-serif",
                display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",
                boxShadow:"0 6px 20px rgba(124,58,237,0.35)",
                transition:"all 0.22s",marginTop:"4px",
              }}
                onMouseEnter={e => { if(!loading){e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 12px 30px rgba(124,58,237,0.50)";}}}
                onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 6px 20px rgba(124,58,237,0.35)"; }}
              >
                {loading ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{animation:"spin 1s linear infinite"}}>
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>Buy Now <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></>
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
   FLOATING BOOK
══════════════════════════════════════════════════════ */
function FloatingBook() {
  return (
    <div style={{position:"relative",width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{position:"absolute",width:"340px",height:"340px",borderRadius:"50%",background:"radial-gradient(circle,rgba(255,255,255,0.18) 0%,rgba(160,100,255,0.08) 60%,transparent 75%)",pointerEvents:"none",zIndex:0}}/>
      <img src={`${PUB}/books.png`} alt="CPC Medical Coding Question Bank" style={{
        position:"relative",zIndex:1,
        maxHeight:"clamp(400px,50vw,800px)",maxWidth:"100%",objectFit:"contain",
        marginTop:"clamp(20px,5vw,120px)",marginLeft:"clamp(20px,5vw,150px)",
        filter:"drop-shadow(-18px 24px 40px rgba(60,0,120,0.45)) drop-shadow(4px 8px 18px rgba(0,0,0,0.22))",
        animation:"bookFloat 3.8s ease-in-out infinite",
        transformOrigin:"center bottom",
      }}/>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 1 — HERO
══════════════════════════════════════════════════════ */
function BooksHero({ onBuyClick }) {
  const [arcReady, setArcReady] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const t = setTimeout(() => setArcReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const PARA = "Prepare smarter with the Skillra CPC Exam Practice Book, designed to help medical coding students build strong fundamentals, practice extensively, and approach the CPC exam with confidence.";

  const BuyBtn = ({ style={} }) => (
    <a href="https://skillrabook.base44.app" style={{ textDecoration: "none" }}>
  <button
    className="books-cta-btn"
    style={{
      background:"#fff",color:"#6d28d9",border:"none",
      borderRadius:"50px",padding:"14px 28px",fontSize:"clamp(13px,1.4vw,14.5px)",
      fontWeight:800,cursor:"pointer",fontFamily:"'Outfit',sans-serif",
      display:"inline-flex",alignItems:"center",gap:"10px",
      boxShadow:"0 8px 28px rgba(0,0,0,0.22)",letterSpacing:"0.2px",
      transition:"all 0.22s",position:"relative",overflow:"hidden",...style,
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform="translateY(-3px) scale(1.03)";
      e.currentTarget.style.boxShadow="0 16px 40px rgba(0,0,0,0.30)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform="translateY(0) scale(1)";
      e.currentTarget.style.boxShadow="0 8px 28px rgba(0,0,0,0.22)";
    }}
  >
    Buy Book
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <path d="M3 9h12M11 5l4 4-4 4" stroke="#6d28d9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </button>
</a>
  );

  return (
    <section style={{
      background:"radial-gradient(ellipse 130% 110% at 0% 60%,#a259f7 0%,#7c3aed 28%,#6d28d9 55%,#5b21b6 80%,#3b0f8c 100%)",
      minHeight:"100vh",display:"flex",alignItems:"center",
      paddingBottom:"80px",position:"relative",overflow:"hidden",
      fontFamily:"'Outfit',sans-serif",
    }}>
      <div style={{position:"absolute",bottom:0,left:0,right:0,zIndex:2,lineHeight:0}}>
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{display:"block",width:"100%",height:"90px"}}>
          <path d="M0,70 C360,90 900,18 1440,0 L1440,90 L0,90 Z" fill="#ffffff"/>
        </svg>
      </div>
      <div className="books-dotgrid"/>
      <div className="books-inner" style={{
        display:"flex",alignItems:"center",justifyContent:"space-between",
        flexWrap:"wrap",padding:"clamp(90px,14vw,40px) 6% 40px 3%",
        width:"100%",maxWidth:"1280px",margin:"0 auto",
        gap:"60px",position:"relative",zIndex:1,
      }}>
        <div className="books-left" style={{flex:"0 0 auto",width:"480px",maxWidth:"100%",display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
          <h1 className="bk-v1 books-title" style={{fontSize:"clamp(2rem,4.5vw,3.6rem)",fontWeight:900,lineHeight:1.18,color:"#fff",letterSpacing:"-1.5px",marginBottom:"10px",whiteSpace:"nowrap"}}>
            Skillra CPC® Exam<br/>Preparation<br/>Combo Kit.
          </h1>
          <div className="bk-v2" style={{marginBottom:"30px"}}>
            <svg viewBox="0 0 340 18" style={{width:"min(340px,90vw)",height:"12px",overflow:"visible",display:"block"}} preserveAspectRatio="none">
              <path className={`books-arc${arcReady?" arc-animate":""}`} d="M 4 13 C 70 2, 230 1, 336 11" fill="none" stroke="rgba(255,255,255,0.70)" strokeWidth="4.5" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Desktop only paragraph */}
          {!isMobile && (
            <p className="bk-v3" style={{margin:"0 0 36px 0",fontSize:"clamp(13px,1.5vw,15px)",fontWeight:400,color:"rgba(255,255,255,0.88)",lineHeight:1.7,maxWidth:"420px"}}>
              {PARA}
            </p>
          )}

          <div className="bk-v4 books-btn-desktop"><BuyBtn/></div>
        </div>
        <div className="books-right bk-vR" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",minHeight:"380px",maxHeight:"480px"}}>
          <FloatingBook/>
        </div>
        <div className="books-bottom" style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"20px",width:"100%"}}>

          {/* Mobile only paragraph — shows once, below the book image */}
          {isMobile && (
            <p style={{margin:0,fontSize:"14px",fontWeight:400,color:"rgba(255,255,255,0.88)",lineHeight:1.7,textAlign:"center",maxWidth:"480px"}}>
              {PARA}
            </p>
          )}

          <BuyBtn/>
        </div>
      </div>
    </section>
  );
}



// Each card has its OWN observer with its own delay — this is the stagger fix
// Add this to your global CSS or a <style> tag
/*
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes badgePop {
  0%   { transform: scale(0.6); opacity: 0; }
  70%  { transform: scale(1.15); }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes dotBounce {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.7); }
}
*/

function ChallengesSection() {
  const [ref, inView] = useInView(0.1);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const MODULES = [
    {
      label: "Module 1",
      title: "Foundations & compliance",
      items: [
        "Medical terminology and anatomy basics",
        "ICD-10-CM fundamentals and coding structure",
        "CPT and HCPCS basics",
        "AAPC compliance rules and ethics",
      ],
    },
    {
      label: "Module 2",
      title: "Practice questions & scenarios",
      items: [
        "2000+ CPC exam-level practice questions",
        "Scenario-based coding questions",
        "ICD-10, CPT, and HCPCS mixed cases",
        "Focus on accuracy and speed improvement",
      ],
    },
    {
      label: "Module 3",
      title: "Full-length mock exams",
      items: [
        "10 full-length CPC mock exams",
        "Timed practice sessions",
        "Comprehensive answer explanations",
        "Performance tracking and analysis",
      ],
    },
  ];

  return (
    <section
      ref={ref}
      style={{
        background: "#fff",
        padding: "88px 0 80px",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(16px,4%,40px)",
        }}
      >
        {/* Heading */}
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(1.5rem,3vw,2.6rem)",
            fontWeight: 900,
            color: "#111827",
            letterSpacing: "-0.03em",
            marginBottom: "12px",
            fontFamily: "'Outfit', sans-serif",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          What the CPC Books Contain
        </h2>

        {/* Intro para */}
        <p
          style={{
            textAlign: "center",
            fontSize: "clamp(13px,1.4vw,15px)",
            color: "#6b7280",
            maxWidth: "580px",
            margin: "0 auto 40px",
            lineHeight: 1.7,
            fontWeight: 400,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          The Skillra CPC book is organized into three powerful modules, each
          focusing on a key part of CPC preparation.
        </p>

        {/* Module cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {MODULES.map((mod, i) => {
            const hovered = hoveredIdx === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  background: "#fff",
                  border: `0.5px solid ${hovered ? "#c4b5fd" : "#e5e7eb"}`,
                  borderRadius: "16px",
                  padding: "clamp(20px,4vw,28px) clamp(20px,4vw,32px)",
                  display: "flex",
                  gap: "24px",
                  alignItems: "flex-start",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "default",
                  opacity: inView ? 1 : 0,
                  transform: inView
                    ? hovered
                      ? "translateY(-4px) scale(1.012)"
                      : "translateY(0) scale(1)"
                    : "translateY(32px)",
                  boxShadow: hovered
                    ? "0 12px 36px rgba(109,40,217,0.10)"
                    : "none",
                  transition: `opacity 0.55s cubic-bezier(0.34,1.3,0.64,1) ${0.15 + i * 0.14}s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s ease, box-shadow 0.25s ease`,
                }}
              >
                {/* Left accent bar */}
                <div
                  style={{
                    position: "absolute",
                    left: 0, top: 0, bottom: 0,
                    width: "3px",
                    background: "#6d28d9",
                    borderRadius: "3px 0 0 3px",
                    transform: hovered ? "scaleY(1)" : "scaleY(0)",
                    transformOrigin: "bottom",
                    transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                />

                {/* Number badge */}
                <div
                  style={{
                    flexShrink: 0,
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: hovered ? "#ede9fe" : "#f3f4f6",
                    border: `1px solid ${hovered ? "#c4b5fd" : "#e5e7eb"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#6d28d9",
                    fontFamily: "'Outfit', sans-serif",
                    transform: hovered ? "scale(1.15) rotate(-6deg)" : "scale(1) rotate(0deg)",
                    transition: "background 0.25s ease, border-color 0.25s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                >
                  {i + 1}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      color: "#9ca3af",
                      textTransform: "uppercase",
                      margin: "0 0 4px",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    {mod.label}
                  </p>

                  <p
                    style={{
                      fontSize: "clamp(15px,1.6vw,17px)",
                      fontWeight: 800,
                      color: hovered ? "#6d28d9" : "#111827",
                      margin: "0 0 6px",
                      fontFamily: "'Outfit', sans-serif",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {mod.title}
                  </p>

                  {/* Animated underline */}
                  <div
                    style={{
                      height: "2px",
                      background: "#6d28d9",
                      borderRadius: "2px",
                      marginBottom: "14px",
                      transformOrigin: "left",
                      transform: hovered ? "scaleX(1)" : "scaleX(0)",
                      transition: "transform 0.35s ease 0.05s",
                    }}
                  />

                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "9px",
                    }}
                  >
                    {mod.items.map((item, j) => (
                      <li
                        key={j}
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: "10px",
                          fontSize: "clamp(13px,1.3vw,14px)",
                          color: hovered ? "#374151" : "#6b7280",
                          lineHeight: 1.5,
                          fontFamily: "'Outfit', sans-serif",
                          transform: hovered ? "translateX(3px)" : "translateX(0)",
                          transition: `color 0.2s ease, transform 0.2s ease ${j * 0.04}s`,
                        }}
                      >
                        <span
                          style={{
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            background: hovered ? "#6d28d9" : "#d1d5db",
                            flexShrink: 0,
                            marginTop: "6px",
                            transition: "background 0.2s ease",
                          }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const [ref, inView] = useInView(0.15);

  return (
    <section
      ref={ref}
      style={{
        background: "#faf5ff",
        padding: "88px 0 80px",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(16px,4%,40px)",
        }}
      >
        {/* Label pill */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s ease 0.05s, transform 0.5s ease 0.05s",
          }}
        >
          <span
            style={{
              display: "inline-block",
              background: "#ede9fe",
              color: "#6d28d9",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              padding: "6px 16px",
              borderRadius: "50px",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            About the Kit
          </span>
        </div>

        {/* Heading */}
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(1.5rem,3vw,2.6rem)",
            fontWeight: 900,
            color: "#111827",
            letterSpacing: "-0.03em",
            marginBottom: "48px",
            fontFamily: "'Outfit', sans-serif",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          About the CPC Combo Kit
        </h2>

        {/* Card */}
        <AboutCard inView={inView} />
      </div>
    </section>
  );
}

function AboutCard({ inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: `0.5px solid ${hovered ? "#c4b5fd" : "#e5e7eb"}`,
        borderRadius: "20px",
        padding: "clamp(28px,5vw,48px) clamp(24px,5vw,52px)",
        position: "relative",
        overflow: "hidden",
        opacity: inView ? 1 : 0,
        transform: inView
          ? hovered ? "translateY(-4px) scale(1.008)" : "translateY(0) scale(1)"
          : "translateY(32px)",
        boxShadow: hovered ? "0 16px 48px rgba(109,40,217,0.10)" : "none",
        transition:
          "opacity 0.6s ease 0.2s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s ease, box-shadow 0.25s ease",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #6d28d9, #a78bfa)",
          borderRadius: "20px 20px 0 0",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      />

      {/* Decorative blob */}
      <div
        style={{
          position: "absolute",
          top: "-60px", right: "-60px",
          width: "200px", height: "200px",
          borderRadius: "50%",
          background: hovered ? "rgba(109,40,217,0.06)" : "rgba(109,40,217,0.03)",
          transition: "background 0.4s ease, transform 0.4s ease",
          transform: hovered ? "scale(1.2)" : "scale(1)",
        }}
      />

      {/* Intro paragraph */}
      <p
        style={{
          fontSize: "clamp(14px,1.5vw,16px)",
          fontWeight: 500,
          color: "#111827",
          lineHeight: 1.75,
          margin: "0 0 24px 0",
          fontFamily: "'Outfit', sans-serif",
          position: "relative",
          zIndex: 1,
          transition: "color 0.2s ease",
        }}
      >
        The Skillra CPC Combo Kit is a comprehensive practice resource designed
        to support students preparing for the{" "}
        <span
          style={{
            color: "#6d28d9",
            fontWeight: 700,
          }}
        >
          Certified Professional Coder (CPC) exam.
        </span>
      </p>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: hovered
            ? "linear-gradient(90deg, #6d28d9 0%, #e5e7eb 100%)"
            : "#f3f4f6",
          margin: "0 0 24px 0",
          transition: "background 0.4s ease",
        }}
      />

      {/* Body paragraph */}
      <p
        style={{
          fontSize: "clamp(13px,1.4vw,15px)",
          fontWeight: 400,
          color: hovered ? "#374151" : "#6b7280",
          lineHeight: 1.85,
          margin: 0,
          fontFamily: "'Outfit', sans-serif",
          position: "relative",
          zIndex: 1,
          transition: "color 0.3s ease",
        }}
      >
        This book is designed as a structured, exam-focused learning system that
        bridges theory, coding standards, and real-world application, helping
        learners move confidently from fundamentals to professional readiness.
        Consistent practice with the modules builds{" "}
        <span style={{ color: "#6d28d9", fontWeight: 600 }}>
          accuracy, speed, and industry-level competence
        </span>{" "}
        — the exact skills required to succeed in certification exams and
        workplace environments.
      </p>
    </div>
  );
}

function ReviewsSection() {
  const [ref, inView] = useInView(0.1);

  const REVIEWS = [
    {
      quote: "The Skillra CPC Question Bank was instrumental in my exam success. The 2000+ practice questions helped me build confidence and speed.",
      name: "Priya Sharma",
      role: "CPC Certified",
      initials: "PS",
    },
    {
      quote: "Excellent resource! The mock tests are very close to the actual exam. Passed on my first attempt thanks to this book.",
      name: "Rahul Verma",
      role: "Medical Coding Professional",
      initials: "RV",
    },
    {
      quote: "The detailed answer explanations are fantastic. I understood the 'why' behind each answer, which made a huge difference.",
      name: "Anitha Rajan",
      role: "Healthcare IT Specialist",
      initials: "AR",
    },
  ];

  return (
    <section
      ref={ref}
      style={{
        background: "#fff",
        padding: "88px 0 80px",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(16px,4%,40px)",
        }}
      >
        {/* Pill label */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "12px",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s ease 0.05s, transform 0.5s ease 0.05s",
          }}
        >
          <span
            style={{
              display: "inline-block",
              background: "#ede9fe",
              color: "#6d28d9",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              padding: "6px 16px",
              borderRadius: "50px",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Success Stories
          </span>
        </div>

        {/* Heading */}
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(1.5rem,3vw,2.6rem)",
            fontWeight: 900,
            color: "#111827",
            letterSpacing: "-0.03em",
            marginBottom: "12px",
            fontFamily: "'Outfit', sans-serif",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          Success Stories from Certified Professionals
        </h2>

        {/* Description */}
        <p
          style={{
            textAlign: "center",
            fontSize: "clamp(13px,1.4vw,15px)",
            color: "#6b7280",
            maxWidth: "560px",
            margin: "0 auto 48px",
            lineHeight: 1.7,
            fontWeight: 400,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
          }}
        >
          Insights from individuals who enhanced their skills, strengthened
          their knowledge, and achieved certification success through structured
          practice and guidance.
        </p>

        {/* Review rows */}
        <div>
          {REVIEWS.map((r, i) => (
            <ReviewRow key={i} review={r} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewRow({ review, index, inView }) {
  const [hovered, setHovered] = useState(false);

  const StarRow = () => (
    <div style={{ display: "flex", gap: "3px", marginLeft: "auto", flexShrink: 0 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        gap: "24px",
        alignItems: "flex-start",
        padding: "28px 0",
        borderBottom: index < 2 ? "0.5px solid #f3f4f6" : "none",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s cubic-bezier(0.34,1.2,0.64,1) ${0.2 + index * 0.12}s, transform 0.55s cubic-bezier(0.34,1.2,0.64,1) ${0.2 + index * 0.12}s`,
        cursor: "default",
      }}
    >
      {/* Large quote mark */}
      <div
        style={{
          fontSize: "56px",
          lineHeight: 1,
          color: hovered ? "#c4b5fd" : "#ede9fe",
          fontFamily: "Georgia, serif",
          flexShrink: 0,
          marginTop: "-4px",
          userSelect: "none",
          transition: "color 0.3s ease",
        }}
      >
        "
      </div>

      {/* Left accent bar */}
      <div
        style={{
          width: "3px",
          flexShrink: 0,
          borderRadius: "3px",
          background: hovered ? "#6d28d9" : "#e5e7eb",
          alignSelf: "stretch",
          minHeight: "80px",
          transition: "background 0.3s ease",
        }}
      />

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: "clamp(13px,1.5vw,15px)",
            color: "#111827",
            lineHeight: 1.8,
            fontStyle: "italic",
            margin: "0 0 16px 0",
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 400,
          }}
        >
          {review.quote}
        </p>

        {/* Meta row */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Avatar */}
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: hovered ? "#6d28d9" : "#ede9fe",
              border: `1.5px solid ${hovered ? "#6d28d9" : "#c4b5fd"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontWeight: 700,
              color: hovered ? "#fff" : "#6d28d9",
              flexShrink: 0,
              fontFamily: "'Outfit', sans-serif",
              transform: hovered ? "scale(1.1)" : "scale(1)",
              transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            {review.initials}
          </div>

          {/* Name + role */}
          <div>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#111827",
                margin: "0 0 2px",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {review.name}
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "#9ca3af",
                margin: 0,
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {review.role}
            </p>
          </div>

          {/* Stars */}
          <StarRow />
        </div>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════
   SECTION 4 — BUNDLE
══════════════════════════════════════════════════════ */
const BUNDLE_ITEMS = [
  "Covers All Key CPC Exam Domains",
  "Real Operative Note Practice",
  "Answers Included with Every Question",
  "Builds from Basics to Advanced",
  "Mock Tests Simulate Exam Conditions",
  "Compliance & Regulatory Questions Included",
];

function BundleSection({ onBuyClick }) {
  const [showDownloadForm, setShowDownloadForm] = useState(false);
  const [downloadFormData, setDownloadFormData] = useState({
    name: "", email: "", phone: "", expectation: ""
  });
  const [downloadFormErrors, setDownloadFormErrors] = useState({});
  const [downloadFormLoading, setDownloadFormLoading] = useState(false);

  const validateDownloadForm = () => {
    const errors = {};
    const { name, email, phone, expectation } = downloadFormData;

    if (!name.trim() || name.trim().length < 2) errors.name = "Enter a valid name (min 2 chars)";
    if (!/^[a-zA-Z\s.]+$/.test(name.trim())) errors.name = "Name should only contain letters";

    if (!email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = "Enter a valid email";

    if (!phone.trim()) errors.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(phone.trim())) errors.phone = "Enter a valid 10-digit Indian number";

    if (!expectation) errors.expectation = "Please select an option";

    setDownloadFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleDownloadFormSubmit = async () => {
    if (!validateDownloadForm()) return;
    setDownloadFormLoading(true);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbws7QqEJT-y2F_6U_VyyuQ56sdXZUYEgXb7qLagegYmmPfqI-5EoGJ6wXGrHuQIC-jTWA/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({
            type: "download-sample",
            name: downloadFormData.name.trim(),
            email: downloadFormData.email.trim(),
            phone: downloadFormData.phone.trim(),
            expectation: downloadFormData.expectation,
          }),
        }
      );

      const link = document.createElement("a");
      link.href = "/DownloadablePDF/CPC QUESTION BANK BOOK SAMPLE.pdf";
      link.download = "CPC QUESTION BANK BOOK SAMPLE.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setShowDownloadForm(false);
      setDownloadFormData({ name: "", email: "", phone: "", expectation: "" });
      setDownloadFormErrors({});
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    } finally {
      setDownloadFormLoading(false);
    }
  };

  const [ref, inView] = useInView(0.08);

  return (
    <>
      <section className="bundle-section" ref={ref} style={{ background: "#f3f0ff", padding: "clamp(32px,5vw,80px) 0 clamp(36px,5vw,88px)", position: "relative", overflow: "hidden", fontFamily: "'Outfit',sans-serif" }}>
        <div style={{ textAlign: "center", marginBottom: "44px", padding: "0 clamp(16px,4%,40px)", position: "relative", zIndex: 1, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
          <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.6rem)", fontWeight: 900, color: "#111827", letterSpacing: "-0.03em", fontFamily: "'Outfit',sans-serif", marginBottom: "14px" }}>Try Our Sample Question Bank Now</h2>
          <p style={{ fontSize: "clamp(13px,1.3vw,14px)", color: "#6b7280", fontFamily: "'Outfit',sans-serif", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>One package. Everything you need. Pass with confidence. Take Demo and check.</p>
        </div>
        <div style={{ position: "relative", paddingBottom: "clamp(40px,8vw,80px)" }}>
          <img src={`${PUB}/bgbooks.png`} alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", transform: "scale(2.0)", transformOrigin: "center top", top: "-120px", objectPosition: "center top", opacity: 0.18, pointerEvents: "none", zIndex: 0 }} />
          <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 clamp(16px,4%,40px)", position: "relative", zIndex: 1 }}>
            <div style={{ background: "#fff", width: "min(400px,100%)", margin: "0 auto", borderRadius: "16px 16px 80px 80px", padding: "clamp(28px,5%,44px) clamp(24px,6%,52px) clamp(32px,6%,52px)", boxShadow: "0 12px 60px rgba(109,40,217,0.12),0 2px 8px rgba(0,0,0,0.06)", border: "1.5px solid rgba(124,58,237,0.10)", opacity: inView ? 1 : 0, transform: inView ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)", transition: "opacity 0.7s ease 0.15s,transform 0.7s ease 0.15s", position: "relative", zIndex: 1 }}>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#7c3aed", fontFamily: "'Outfit',sans-serif", textAlign: "center", marginBottom: "28px" }}>CPC Question Bank Sample</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px 0", display: "flex", flexDirection: "column", gap: "14px" }}>
                {BUNDLE_ITEMS.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "clamp(13px,1.3vw,14.5px)", color: "#374151", fontFamily: "'Outfit',sans-serif", lineHeight: 1.5 }}>
                    <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#7c3aed", flexShrink: 0 }} />{item}
                  </li>
                ))}
              </ul>
              <div style={{ textAlign: "center" }}>
                <button
                  onClick={() => setShowDownloadForm(true)}
                  style={{
                    background: "#7c3aed", color: "#fff", border: "none", borderRadius: "50px",
                    padding: "14px 36px", fontSize: "14.5px", fontWeight: 800, cursor: "pointer",
                    fontFamily: "'Outfit',sans-serif", display: "inline-flex", alignItems: "center",
                    gap: "10px", boxShadow: "0 6px 22px rgba(124,58,237,0.35)", transition: "all 0.22s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 36px rgba(124,58,237,0.50)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 22px rgba(124,58,237,0.35)"; }}
                >
                  Download
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                    <path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL — rendered outside <section> to avoid overflow/transform clipping */}
      {showDownloadForm && (
        <div
          onClick={() => { setShowDownloadForm(false); setDownloadFormErrors({}); }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "16px",
            boxSizing: "border-box",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "clamp(20px, 4vw, 32px)",
              width: "90%",
              maxWidth: "420px",
              maxHeight: "90vh",
              overflowY: "auto",
              fontFamily: "'Outfit',sans-serif",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
              position: "relative",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => { setShowDownloadForm(false); setDownloadFormErrors({}); }}
              style={{
                position: "absolute", top: "12px", right: "16px", background: "none",
                border: "none", fontSize: "22px", cursor: "pointer", color: "#888",
              }}
            >✕</button>

            <h3 style={{ margin: "0 0 6px", fontSize: "20px", fontWeight: 700, color: "#1e1e2e" }}>
              Download Sample
            </h3>
            <p style={{ margin: "0 0 20px", fontSize: "13.5px", color: "#666" }}>
              Fill in your details to get the free sample PDF
            </p>

            {/* Name */}
            <div style={{ marginBottom: "14px" }}>
              <input
                type="text" placeholder="Full Name"
                value={downloadFormData.name}
                onChange={e => setDownloadFormData({ ...downloadFormData, name: e.target.value })}
                style={{
                  width: "100%", padding: "12px 14px", borderRadius: "10px", fontSize: "14px",
                  border: downloadFormErrors.name ? "1.5px solid #ef4444" : "1.5px solid #ddd",
                  outline: "none", fontFamily: "'Outfit',sans-serif", boxSizing: "border-box",
                }}
              />
              {downloadFormErrors.name && (
                <p style={{ color: "#ef4444", fontSize: "12px", margin: "4px 0 0" }}>{downloadFormErrors.name}</p>
              )}
            </div>

            {/* Email */}
            <div style={{ marginBottom: "14px" }}>
              <input
                type="email" placeholder="Email Address"
                value={downloadFormData.email}
                onChange={e => setDownloadFormData({ ...downloadFormData, email: e.target.value })}
                style={{
                  width: "100%", padding: "12px 14px", borderRadius: "10px", fontSize: "14px",
                  border: downloadFormErrors.email ? "1.5px solid #ef4444" : "1.5px solid #ddd",
                  outline: "none", fontFamily: "'Outfit',sans-serif", boxSizing: "border-box",
                }}
              />
              {downloadFormErrors.email && (
                <p style={{ color: "#ef4444", fontSize: "12px", margin: "4px 0 0" }}>{downloadFormErrors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div style={{ marginBottom: "14px" }}>
              <input
                type="tel" placeholder="Phone Number"
                value={downloadFormData.phone}
                onChange={e => setDownloadFormData({ ...downloadFormData, phone: e.target.value })}
                style={{
                  width: "100%", padding: "12px 14px", borderRadius: "10px", fontSize: "14px",
                  border: downloadFormErrors.phone ? "1.5px solid #ef4444" : "1.5px solid #ddd",
                  outline: "none", fontFamily: "'Outfit',sans-serif", boxSizing: "border-box",
                }}
              />
              {downloadFormErrors.phone && (
                <p style={{ color: "#ef4444", fontSize: "12px", margin: "4px 0 0" }}>{downloadFormErrors.phone}</p>
              )}
            </div>

            {/* Expectation Dropdown */}
            <div style={{ marginBottom: "20px" }}>
              <select
                value={downloadFormData.expectation}
                onChange={e => setDownloadFormData({ ...downloadFormData, expectation: e.target.value })}
                style={{
                  width: "100%", padding: "12px 14px", borderRadius: "10px", fontSize: "14px",
                  border: downloadFormErrors.expectation ? "1.5px solid #ef4444" : "1.5px solid #ddd",
                  outline: "none", fontFamily: "'Outfit',sans-serif", boxSizing: "border-box",
                  color: downloadFormData.expectation ? "#1e1e2e" : "#999", background: "#fff",
                }}
              >
                <option value="" disabled>How do you expect to read the sample?</option>
                <option value="More excited">More excited</option>
                <option value="Excited">Excited</option>
                <option value="No idea">No idea</option>
              </select>
              {downloadFormErrors.expectation && (
                <p style={{ color: "#ef4444", fontSize: "12px", margin: "4px 0 0" }}>{downloadFormErrors.expectation}</p>
              )}
            </div>

            {/* Submit */}
            <button
              onClick={handleDownloadFormSubmit}
              disabled={downloadFormLoading}
              style={{
                width: "100%", padding: "13px", borderRadius: "50px", border: "none",
                background: downloadFormLoading ? "#a78bfa" : "#7c3aed", color: "#fff",
                fontSize: "15px", fontWeight: 700, cursor: downloadFormLoading ? "not-allowed" : "pointer",
                fontFamily: "'Outfit',sans-serif", display: "flex", alignItems: "center",
                justifyContent: "center", gap: "8px", transition: "all 0.2s",
              }}
            >
              {downloadFormLoading ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" style={{ animation: "spin 1s linear infinite" }}>
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" fill="none" strokeDasharray="31.4 31.4" strokeLinecap="round" />
                  </svg>
                  Submitting...
                </>
              ) : "Submit & Download"}
            </button>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      )}
    </>
  );
}


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
      await fetch(APPS_SCRIPT_URL, {
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
              <a href="/Skillra" style={{ textDecoration: "none" }} onClick={(e) => e.preventDefault()}>
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

/* ══════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════ */
export default function BooksPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{fontFamily:"'Outfit','Segoe UI',sans-serif",margin:0,padding:0,overflowX:"hidden",background:"#fff"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html, body { overflow-x:hidden; }

        @keyframes bookFloat   { 0%,100%{transform:translateY(0px) rotate(-1deg)} 50%{transform:translateY(-18px) rotate(1.2deg)} }
        @keyframes drawBooksArc{ from{stroke-dashoffset:420} to{stroke-dashoffset:0} }
        .books-arc { stroke-dasharray:420; stroke-dashoffset:420; }
        .books-arc.arc-animate { animation:drawBooksArc 1.8s cubic-bezier(0.25,0.1,0.2,1) 0.5s forwards; }

        @keyframes bkFadeRight { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes bkFadeUp    { from{opacity:0;transform:translateY(22px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes bkFadeScale { from{opacity:0;transform:scale(0.88)}       to{opacity:1;transform:scale(1)} }
        @keyframes shimmer     { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes modalPop    { from{opacity:0;transform:scale(0.88) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes spin        { to{transform:rotate(360deg)} }
        @keyframes spinRingAnim{ to{transform:rotate(360deg)} }

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
        .prep-grid       { display:flex; gap:24px; align-items:stretch; }

        /* ── Default decor sizes (desktop) ── */
        .decor-blob    { width:290px; height:220px; }
        .decor-sparkle1{ width:8px;   height:8px; }
        .decor-sparkle2{ width:5px;   height:5px; }
        .decor-circles { width:110px; height:110px; }
        .decor-dots    { width:82px;  height:82px; }

        /* ════════════════════════════════════════
           MOBILE — stacked cards, bigger decor
        ════════════════════════════════════════ */
        @media(max-width:900px) {

          .challenges-grid { flex-direction:column; gap:28px; }
          .prep-grid       { flex-direction:column; gap:20px; }

          /* Bigger card padding & min-height */
          .challenges-grid > div {
            min-height: 280px !important;
            padding: 28px 24px 36px !important;
          }

          /* Bigger badge */
          .card-seal > div {
            width: 72px !important;
            height: 72px !important;
          }

          /* Bigger title & desc */
          .card-title { font-size: 22px !important; max-width: 100% !important; margin-bottom: 14px !important; }
          .card-desc  { font-size: 14.5px !important; line-height: 1.85 !important; }

          /* ── Bigger blob ── */
          .decor-blob    { width: 380px !important; height: 290px !important; top: -100px !important; right: -150px !important; }
          .decor-sparkle1{ width: 16px  !important; height: 16px  !important; top: 28px !important; left: 110px !important; }
          .decor-sparkle2{ width: 11px  !important; height: 11px  !important; top: 52px !important; left: 136px !important; }

          /* ── Bigger circles ── */
          .decor-circles { width: 180px !important; height: 180px !important; top: -20px !important; right: -20px !important; }

          /* ── Bigger dots ── */
          .decor-dots { width: 150px !important; height: 150px !important; background-size: 18px 18px !important; top: 10px !important; right: 10px !important; }
        }

        @media(max-width:860px) {
        .decor-blob {
    top: -100px !important;    /* ← change this for mobile */
    right: -150px !important; /* ← change this for mobile */
  }
          .books-inner        { flex-direction:column !important; text-align:center !important; padding:120px 24px 60px !important; gap:20px !important; align-items:center !important; flex-wrap:wrap !important; }
          .books-left         { order:1 !important; width:100% !important; max-width:100% !important; align-items:center !important; }
          .books-right        { order:2 !important; width:100% !important; height:52vw !important; min-height:220px !important; max-height:320px !important; }
          .books-bottom       { order:3 !important; width:100% !important; align-items:center !important; display:flex !important; flex-direction:column !important; gap:20px !important; }
          .books-bullets-desktop { display:none !important; }
          .books-btn-desktop  { display:none !important; }
          .books-title        { white-space:normal !important; font-size:clamp(1.8rem,6vw,2.8rem) !important; }
          .books-bullets      { align-items:center !important; }
        }

        @media(min-width:861px) { .books-bottom { display:none !important; } }

        @media(max-width:480px) {
          .bundle-section { padding:32px 0 40px !important; }
          .books-inner    { padding:110px 16px 50px !important; }
          .books-title    { font-size:clamp(1.6rem,7vw,2.2rem) !important; }
          .challenges-grid > div { min-height: 260px !important; }
        }

        @media(max-width:1024px) and (min-width:861px) {
          .books-inner { gap:32px !important; padding:40px 3% !important; }
          .books-left  { width:420px !important; }
        }
      `}</style>

      <Navbar/>
      <SocialSidebar />
      <BooksHero onBuyClick={() => setShowModal(true)}/>
      <ChallengesSection/>
      <AboutSection />
      <ReviewsSection />
      <BundleSection onBuyClick={() => setShowModal(true)}/>
      <NewsletterSection/>
      <Footer/>
      <PageMeta />
      {showModal && <BuyBookModal onClose={() => setShowModal(false)}/>}
    </div>
  );
} 