import { useState, useEffect, useRef } from "react";
import NavBar from "./NavBar";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const CAREER_PATHS = [
  {
    id: "healthcare",
    title: "Healthcare IT",
    subtitle: "Medical Coding · Billing · Scribing",
    desc: "Step into the booming healthcare industry. AI-driven medical coding and billing roles are in massive demand globally with exceptional job security.",
    courses: ["AI Medical Coding", "AI Medical Billing", "AI Medical Scribing"],
    avg: "₹3.5–6 LPA", growth: "+22% YoY", openings: "4,200+",
    color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc",
  },
  {
    id: "tech",
    title: "Technology",
    subtitle: "Full Stack · Data · UI/UX · SAP",
    desc: "Build digital products, analyze data, and design experiences. Tech careers offer the highest salaries and the most dynamic growth trajectories.",
    courses: ["Full Stack Development", "Data Analytics", "UI/UX Design", "SAP Development"],
    avg: "₹4.5–9 LPA", growth: "+31% YoY", openings: "8,500+",
    color: "#7c3aed", bg: "#ede9ff", border: "#c4b5fd",
  },
  {
    id: "finance",
    title: "Finance & Accounts",
    subtitle: "Tally · GST · Financial Accounting",
    desc: "Every business needs financial talent. Tally, GST compliance, and accounting skills open doors across industries from startups to MNCs.",
    courses: ["Tally & GST", "Financial Accounting"],
    avg: "₹2.8–5 LPA", growth: "+18% YoY", openings: "6,100+",
    color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0",
  },
];

const GUIDANCE_SERVICES = [
  { title:"Career Assessment",   desc:"Personalised aptitude and interest profiling to identify your strongest career fit.",               tag:"Free for all students",  color:"#f59e0b" },
  { title:"Roadmap Planning",    desc:"A custom 3–6 month learning plan mapped to your target job role and industry.",                    tag:"1-on-1 session",         color:"#0891b2" },
  { title:"Mentor Matching",     desc:"Get paired with an industry professional who coaches you through your journey.",                   tag:"Industry experts",       color:"#7c3aed" },
  { title:"Resume & LinkedIn",   desc:"ATS-optimised resume crafting and LinkedIn profile overhaul by career coaches.",                   tag:"Professional writers",   color:"#16a34a" },
  { title:"Interview Coaching",  desc:"Role-specific mock interviews with detailed feedback on delivery and content.",                    tag:"Unlimited sessions",     color:"#ec4899" },
  { title:"Job Connect",         desc:"Direct introductions to 120+ hiring partners actively recruiting Skillra graduates.",              tag:"Exclusive network",      color:"#f59e0b" },
];

const MENTORS = [
  { name:"Dr. Kavitha Rajan",    role:"Healthcare IT Lead",      exp:"14 yrs", company:"Apollo Hospitals", avatar:"abtimg1.jpg" },
  { name:"Arjun Subramaniam",    role:"Senior Data Engineer",    exp:"11 yrs", company:"Cognizant",        avatar:"abtimg2.jpg" },
  { name:"Meera Balakrishnan",   role:"UX Principal Designer",   exp:"9 yrs",  company:"Wipro Digital",    avatar:"abtimg3.jpg" },
  { name:"Sanjay Krishnamurthy", role:"SAP Solutions Architect", exp:"16 yrs", company:"HCL Technologies", avatar:"abtimg1.jpg" },
];

const JOURNEY_STEPS = [
  { num:"01", title:"Book a Free Session",    desc:"Schedule a no-obligation career counselling call with our experts.",                accent:"#7c3aed" },
  { num:"02", title:"Assessment & Profiling", desc:"Complete our career aptitude test to uncover your strengths and gaps.",            accent:"#0891b2" },
  { num:"03", title:"Your Personalised Plan", desc:"Receive a custom learning roadmap aligned to your dream job.",                     accent:"#16a34a" },
  { num:"04", title:"Learn & Get Mentored",   desc:"Upskill with expert-led courses and weekly mentor check-ins.",                     accent:"#f59e0b" },
  { num:"05", title:"Interview & Placement",  desc:"We prep you, introduce you, and stay with you until you're placed.",              accent:"#ec4899" },
];

const FAQS = [
  { q:"Is the career guidance completely free?",            a:"Yes — the initial career assessment and counselling session are completely free for all enrolled students. Additional mentor sessions may be available as part of select course packages." },
  { q:"How is a mentor matched to me?",                    a:"We match mentors based on your target domain, experience level, location preference, and availability. The pairing is reviewed by our counselling team to ensure the best fit." },
  { q:"How long does the career guidance process take?",   a:"The assessment and roadmap delivery typically takes 2–3 days. Ongoing mentoring continues throughout your course and up to 6 months post-placement." },
  { q:"Can I switch career tracks mid-way?",               a:"Absolutely. Our counsellors are here to support your evolving goals. You can request a re-assessment and updated roadmap at any point during your program." },
  { q:"Do you help with international job placements?",    a:"Yes — especially in healthcare IT, where there is strong demand in the US, UK, and Gulf markets. Our placement team has dedicated international hiring partnerships." },
];

/* ─────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────── */
const IcoStar      = ({s=13,c="#7c3aed"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>);
const IcoArrow     = ({s=16,c="#fff"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>);
const IcoPin       = ({s=13,c="#9270c0"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>);
const IcoCompass   = ({s=28,c="#7c3aed"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>);
const IcoMap       = ({s=20,c="#7c3aed"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>);
const IcoUsers     = ({s=20,c="#7c3aed"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
const IcoTrend     = ({s=20,c="#7c3aed"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>);
const IcoSearch    = ({s=20,c="#0891b2"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>);
const IcoPath      = ({s=20,c="#7c3aed"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9"/><path d="M12 3c2.76 0 5 4.03 5 9s-2.24 9-5 9"/></svg>);
const IcoUserCheck = ({s=20,c="#7c3aed"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>);
const IcoFile      = ({s=20,c="#16a34a"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>);
const IcoMic       = ({s=20,c="#ec4899"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>);
const IcoLink      = ({s=20,c="#f59e0b"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>);
const IcoBook      = ({s=20,c="#7c3aed"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>);
const IcoCalendar  = ({s=18,c="#7c3aed"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>);
const IcoCheck     = ({s=28,c="#10b981"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>);
const IcoHandshake = ({s=22,c="white"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>);
const IcoRocket    = ({s=20,c="#7c3aed"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>);
const IcoPlus      = ({s=14,c="#a78bfa"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>);

const SERVICE_ICONS = [IcoSearch, IcoMap, IcoUserCheck, IcoFile, IcoMic, IcoLink];
const JOURNEY_ICONS = [IcoCalendar, IcoSearch, IcoMap, IcoBook, IcoRocket];

/* ─────────────────────────────────────────
   HOOKS
───────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/* ─────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────── */
function CareerPathCard({ path, delay, inView }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex:1, minWidth:"260px",
        background:"#fff",
        border:`1.5px solid ${hovered ? path.border : "#e4d9ff"}`,
        borderRadius:"24px", overflow:"hidden",
        cursor:"default",
        transition:"all 0.35s cubic-bezier(.4,0,.2,1)",
        transform: hovered ? "translateY(-10px) scale(1.02)" : inView ? "translateY(0)" : "translateY(40px)",
        opacity: inView ? 1 : 0, transitionDelay: delay,
        boxShadow: hovered ? `0 24px 56px ${path.color}22` : "0 4px 16px rgba(124,58,237,0.07)",
        position:"relative",
      }}
    >
      {/* top accent bar */}
      <div style={{ height:"4px", background:`linear-gradient(90deg,${path.color},${path.color}88)`, transform:hovered?"scaleX(1)":"scaleX(0.4)", transformOrigin:"left", transition:"transform 0.45s ease" }} />

      {/* blob */}
      <div style={{ position:"absolute", top:"-30px", right:"-30px", width:"120px", height:"120px", borderRadius:"50%", background:`radial-gradient(circle,${path.bg} 0%,transparent 70%)`, opacity:hovered?1:0.5, transition:"opacity 0.35s", pointerEvents:"none" }} />

      <div style={{ padding:"26px 24px 24px", position:"relative", zIndex:1 }}>
        {/* header row */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"16px" }}>
          <div style={{ width:52, height:52, borderRadius:"14px", background:path.bg, border:`1.5px solid ${path.border}`, display:"flex", alignItems:"center", justifyContent:"center", transform:hovered?"scale(1.1) rotate(-4deg)":"scale(1)", transition:"transform 0.3s" }}>
            <IcoTrend s={22} c={path.color} />
          </div>
          <div style={{ background:path.bg, border:`1px solid ${path.border}`, borderRadius:"99px", padding:"4px 12px", fontSize:"11px", fontWeight:800, color:path.color, fontFamily:"'Outfit',sans-serif", letterSpacing:"0.05em" }}>
            {path.growth}
          </div>
        </div>

        <h3 style={{ fontSize:"19px", fontWeight:900, color:"#1a0640", fontFamily:"'Outfit',sans-serif", letterSpacing:"-0.02em", marginBottom:"4px" }}>{path.title}</h3>
        <div style={{ fontSize:"11.5px", fontWeight:700, color:path.color, fontFamily:"'Outfit',sans-serif", marginBottom:"12px", letterSpacing:"0.04em" }}>{path.subtitle}</div>
        <p style={{ fontSize:"13px", color:"#5c4a80", lineHeight:1.72, fontFamily:"'Outfit',sans-serif", marginBottom:"18px" }}>{path.desc}</p>

        {/* metrics */}
        <div style={{ display:"flex", gap:0, borderTop:"1px solid #f0ebff", paddingTop:"16px", marginBottom:"16px" }}>
          {[{label:"Avg Package",value:path.avg},{label:"Openings",value:path.openings}].map((m,i)=>(
            <div key={i} style={{ flex:1, borderRight:i===0?"1px solid #f0ebff":"none", paddingRight:i===0?"14px":0, paddingLeft:i===0?0:"14px" }}>
              <div style={{ fontSize:"15px", fontWeight:900, color:"#1a0640", fontFamily:"'Outfit',sans-serif", lineHeight:1 }}>{m.value}</div>
              <div style={{ fontSize:"10.5px", color:"#9270c0", marginTop:"3px", fontWeight:600, fontFamily:"'Outfit',sans-serif" }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* course tags */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"16px" }}>
          {path.courses.map((c,i)=>(
            <span key={i} style={{ fontSize:"10.5px", fontWeight:700, color:path.color, background:path.bg, border:`1px solid ${path.border}`, borderRadius:"6px", padding:"3px 10px", fontFamily:"'Outfit',sans-serif" }}>{c}</span>
          ))}
        </div>

        {/* CTA row */}
        <div style={{ display:"flex", alignItems:"center", gap:"6px", color:path.color, fontSize:"13px", fontWeight:700, fontFamily:"'Outfit',sans-serif", opacity:hovered?1:0.55, transform:hovered?"translateX(4px)":"translateX(0)", transition:"all 0.3s" }}>
          Explore this path <IcoArrow s={14} c={path.color} />
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ service, delay, inView, SvcIcon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:"#fff", border:`1.5px solid ${hovered ? service.color+"44" : "#e4d9ff"}`,
        borderRadius:"20px", padding:"24px",
        transition:"all 0.32s cubic-bezier(.4,0,.2,1)",
        transform: hovered ? "translateY(-6px)" : inView ? "translateY(0)" : "translateY(28px)",
        opacity: inView ? 1 : 0, transitionDelay: delay,
        boxShadow: hovered ? `0 18px 44px ${service.color}18` : "0 3px 14px rgba(124,58,237,0.06)",
        cursor:"default", position:"relative", overflow:"hidden",
      }}
    >
      <div style={{ position:"absolute", bottom:"-24px", right:"-24px", width:"100px", height:"100px", borderRadius:"50%", background:`radial-gradient(circle,${service.color}10 0%,transparent 70%)`, opacity:hovered?1:0, transition:"opacity 0.35s", pointerEvents:"none" }} />

      <div style={{ width:46, height:46, borderRadius:"13px", background:`rgba(${service.color === "#7c3aed" ? "124,58,237" : service.color === "#0891b2" ? "8,145,178" : service.color === "#16a34a" ? "22,163,74" : service.color === "#ec4899" ? "236,72,153" : "245,158,11"},0.10)`, border:`1.5px solid ${service.color}22`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"14px", transform:hovered?"scale(1.1) rotate(-5deg)":"scale(1)", transition:"transform 0.3s" }}>
        <SvcIcon s={20} c={service.color} />
      </div>

      <h4 style={{ fontSize:"14.5px", fontWeight:800, color:"#1a0640", fontFamily:"'Outfit',sans-serif", marginBottom:"7px" }}>{service.title}</h4>
      <p style={{ fontSize:"12.5px", color:"#9270c0", lineHeight:1.7, fontFamily:"'Outfit',sans-serif", marginBottom:"14px" }}>{service.desc}</p>
      <div style={{ display:"inline-flex", alignItems:"center", gap:"6px", background:`${service.color}10`, border:`1px solid ${service.color}25`, borderRadius:"99px", padding:"4px 12px", fontSize:"10.5px", fontWeight:700, color:service.color, fontFamily:"'Outfit',sans-serif" }}>
        <span style={{ width:5, height:5, borderRadius:"50%", background:service.color, flexShrink:0 }} />
        {service.tag}
      </div>
    </div>
  );
}

function MentorCard({ mentor, delay, inView }) {
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex:1, minWidth:"210px",
        background:"#fff", border:`1.5px solid ${hovered ? "#c4b5fd" : "#e4d9ff"}`,
        borderRadius:"22px", padding:"26px 20px",
        transition:"all 0.35s cubic-bezier(.4,0,.2,1)",
        transform: hovered ? "translateY(-8px)" : inView ? "translateY(0)" : "translateY(28px)",
        opacity: inView ? 1 : 0, transitionDelay: delay,
        boxShadow: hovered ? "0 20px 52px rgba(124,58,237,0.16)" : "0 4px 16px rgba(124,58,237,0.07)",
        cursor:"default", textAlign:"center", position:"relative", overflow:"hidden",
      }}
    >
      {/* shimmer bar */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:"linear-gradient(90deg,#7c3aed,#a78bfa,#7c3aed)", backgroundSize:"200% 100%", animation:"shimmer 3s infinite", transform:hovered?"scaleX(1)":"scaleX(0)", transformOrigin:"left", transition:"transform 0.4s ease" }} />

      {/* avatar */}
      <div style={{ position:"relative", display:"inline-block", marginBottom:"14px" }}>
        <div style={{ width:70, height:70, borderRadius:"50%", overflow:"hidden", border:`3px solid ${hovered?"#c4b5fd":"#e4d9ff"}`, margin:"0 auto", boxShadow:hovered?"0 0 0 6px rgba(124,58,237,0.12)":"none", transition:"all 0.32s ease", background:"linear-gradient(135deg,#7c3aed,#a78bfa)" }}>
          {imgErr ? (
            <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px", fontWeight:900, color:"#fff", fontFamily:"'Outfit',sans-serif" }}>{mentor.name[0]}</div>
          ) : (
            <img src={mentor.avatar} alt={mentor.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={() => setImgErr(true)} />
          )}
        </div>
        <div style={{ position:"absolute", bottom:"-2px", right:"-2px", width:24, height:24, borderRadius:"50%", background:"linear-gradient(135deg,#7c3aed,#5b21b6)", border:"2px solid #fff", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <IcoStar s={10} c="#fff" />
        </div>
      </div>

      <div style={{ fontSize:"15px", fontWeight:800, color:"#1a0640", fontFamily:"'Outfit',sans-serif", marginBottom:"3px" }}>{mentor.name}</div>
      <div style={{ fontSize:"12px", fontWeight:600, color:"#7c3aed", fontFamily:"'Outfit',sans-serif", marginBottom:"4px" }}>{mentor.role}</div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"4px", marginBottom:"14px" }}>
        <IcoPin s={11} c="#b0a0d8" />
        <span style={{ fontSize:"11.5px", color:"#b0a0d8", fontFamily:"'Outfit',sans-serif" }}>{mentor.company}</span>
      </div>
      <div style={{ display:"inline-flex", alignItems:"center", gap:"6px", background:"rgba(124,58,237,0.07)", border:"1px solid #e4d9ff", borderRadius:"99px", padding:"5px 14px", fontSize:"11px", fontWeight:700, color:"#7c3aed", fontFamily:"'Outfit',sans-serif" }}>
        <IcoStar s={10} c="#7c3aed" /> {mentor.exp} Experience
      </div>
    </div>
  );
}

function FAQItem({ q, a, delay, inView }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        background: open ? "#fff" : "#fff",
        border:`1.5px solid ${open ? "#c4b5fd" : "#e4d9ff"}`,
        borderRadius:"16px", overflow:"hidden", cursor:"pointer",
        transition:"all 0.28s ease",
        transform: inView ? "translateY(0)" : "translateY(20px)",
        opacity: inView ? 1 : 0, transitionDelay: delay,
        boxShadow: open ? "0 10px 32px rgba(124,58,237,0.12)" : "0 2px 10px rgba(124,58,237,0.05)",
      }}
    >
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"18px 20px", gap:"16px" }}>
        <span style={{ fontSize:"14px", fontWeight:700, color: open ? "#7c3aed" : "#1a0640", fontFamily:"'Outfit',sans-serif", lineHeight:1.4, transition:"color 0.25s" }}>{q}</span>
        <div style={{ width:28, height:28, borderRadius:"50%", flexShrink:0, background: open ? "rgba(124,58,237,0.12)" : "#f8f5ff", border:"1px solid #e4d9ff", display:"flex", alignItems:"center", justifyContent:"center", transform:open?"rotate(45deg)":"rotate(0deg)", transition:"all 0.28s ease" }}>
          <IcoPlus s={13} c="#7c3aed" />
        </div>
      </div>
      {open && (
        <div style={{ padding:"0 20px 18px", borderTop:"1px solid #f0ebff" }}>
          <p style={{ fontSize:"13.5px", color:"#5c4a80", lineHeight:1.75, fontFamily:"'Outfit',sans-serif", paddingTop:"14px" }}>{a}</p>
        </div>
      )}
    </div>
  );
}

function JourneyStep({ step, index, inView, StepIcon }) {
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;
  return (
    <div style={{
      display:"flex", flexDirection: isEven ? "row" : "row-reverse",
      gap:"36px", alignItems:"center",
      opacity: inView ? 1 : 0,
      transform: inView ? "translateX(0)" : isEven ? "translateX(-36px)" : "translateX(36px)",
      transition:`all 0.75s cubic-bezier(.4,0,.2,1) ${index*0.12}s`,
    }}>
      {/* Card */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          flex:1, background:"#fff",
          border:`1.5px solid ${hovered ? step.accent+"44" : "#e4d9ff"}`,
          borderRadius:"20px", padding:"24px",
          transition:"all 0.30s ease",
          boxShadow: hovered ? `0 14px 40px ${step.accent}18` : "0 3px 14px rgba(124,58,237,0.06)",
          cursor:"default",
        }}
      >
        <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"10px" }}>
          <div style={{ width:40, height:40, borderRadius:"12px", background:`${step.accent}12`, border:`1.5px solid ${step.accent}22`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <StepIcon s={18} c={step.accent} />
          </div>
          <div>
            <div style={{ fontSize:"10px", fontWeight:800, color:step.accent, fontFamily:"'Outfit',sans-serif", letterSpacing:"0.12em", marginBottom:"1px" }}>STEP {step.num}</div>
            <h4 style={{ fontSize:"15.5px", fontWeight:800, color:"#1a0640", fontFamily:"'Outfit',sans-serif", letterSpacing:"-0.01em", lineHeight:1.2 }}>{step.title}</h4>
          </div>
        </div>
        <p style={{ fontSize:"13px", color:"#9270c0", lineHeight:1.7, fontFamily:"'Outfit',sans-serif" }}>{step.desc}</p>
      </div>

      {/* Centre node */}
      <div style={{ flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center" }}>
        <div style={{ width:52, height:52, borderRadius:"50%", background:`${step.accent}12`, border:`2px solid ${step.accent}44`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 0 0 8px ${step.accent}08` }}>
          <span style={{ fontSize:"16px", fontWeight:900, color:step.accent, fontFamily:"'Outfit',sans-serif" }}>{step.num}</span>
        </div>
        {index < JOURNEY_STEPS.length - 1 && (
          <div style={{ width:"2px", height:"56px", background:`linear-gradient(to bottom,${step.accent}44,transparent)`, marginTop:"4px" }} />
        )}
      </div>

      <div style={{ flex:1 }} />
    </div>
  );
}

/* ─────────────────────────────────────────
   BOOKING MODAL
───────────────────────────────────────── */
function BookingModal({ onClose }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"", track:"", date:"" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const tracks = ["Healthcare IT","Technology","Finance & Accounts","Not Sure Yet"];
  const dates  = ["Mon, 17 Mar","Tue, 18 Mar","Wed, 19 Mar","Thu, 20 Mar","Fri, 21 Mar"];

  const handleBook = () => {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1200);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:1000, background:"rgba(10,1,24,0.55)", backdropFilter:"blur(6px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", animation:"fadeInBg 0.25s ease" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#fff", borderRadius:"28px", padding:"40px", width:"100%", maxWidth:"460px", position:"relative", boxShadow:"0 32px 80px rgba(124,58,237,0.25)", border:"1.5px solid #e4d9ff", animation:"slideUpM 0.32s cubic-bezier(.4,0,.2,1)" }}>
        {/* shimmer bar */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", borderRadius:"28px 28px 0 0", background:"linear-gradient(90deg,#7c3aed,#a78bfa,#7c3aed)", backgroundSize:"200% 100%", animation:"shimmer 3s infinite" }} />

        {/* close */}
        <button onClick={onClose} style={{ position:"absolute", top:16, right:16, width:30, height:30, borderRadius:"50%", background:"#f8f5ff", border:"1px solid #e4d9ff", color:"#7c3aed", cursor:"pointer", fontSize:"16px", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}
          onMouseEnter={e=>e.currentTarget.style.background="rgba(124,58,237,0.12)"}
          onMouseLeave={e=>e.currentTarget.style.background="#f8f5ff"}
        >×</button>

        {submitted ? (
          <div style={{ textAlign:"center", padding:"20px 0" }}>
            <div style={{ width:68, height:68, borderRadius:"50%", background:"linear-gradient(135deg,#10b981,#059669)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px", boxShadow:"0 10px 32px rgba(16,185,129,0.35)" }}>
              <IcoCheck s={30} c="#fff" />
            </div>
            <h3 style={{ fontSize:"22px", fontWeight:900, color:"#1a0640", fontFamily:"'Outfit',sans-serif", marginBottom:"10px" }}>Session Booked!</h3>
            <p style={{ fontSize:"13.5px", color:"#9270c0", lineHeight:1.7, fontFamily:"'Outfit',sans-serif" }}>Your free career guidance session is confirmed.<br/>A counsellor will reach out within 2 hours.</p>
            <button onClick={onClose} style={{ marginTop:"22px", background:"linear-gradient(135deg,#7c3aed,#5b21b6)", border:"none", color:"#fff", borderRadius:"50px", padding:"12px 32px", fontSize:"14px", fontWeight:700, fontFamily:"'Outfit',sans-serif", cursor:"pointer", boxShadow:"0 6px 20px rgba(124,58,237,0.30)" }}>Close</button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom:"26px" }}>
              <div style={{ fontSize:"11px", fontWeight:800, color:"#7c3aed", letterSpacing:"0.12em", marginBottom:"8px", fontFamily:"'Outfit',sans-serif" }}>FREE SESSION</div>
              <h3 style={{ fontSize:"22px", fontWeight:900, color:"#1a0640", fontFamily:"'Outfit',sans-serif", letterSpacing:"-0.02em" }}>Book Your Career<br/>Guidance Call</h3>
              <p style={{ fontSize:"13px", color:"#9270c0", marginTop:"6px", fontFamily:"'Outfit',sans-serif" }}>No obligations. 30-minute expert session.</p>
            </div>

            {[{label:"Your Name",key:"name",type:"text"},{label:"Email Address",key:"email",type:"email"},{label:"Phone Number",key:"phone",type:"tel"}].map(f=>(
              <div key={f.key} style={{ marginBottom:"12px" }}>
                <input type={f.type} placeholder={f.label} value={form[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})}
                  style={{ width:"100%", padding:"12px 16px", background:"#f8f5ff", border:"1.5px solid #e4d9ff", borderRadius:"12px", color:"#1a0640", fontSize:"14px", fontFamily:"'Outfit',sans-serif", fontWeight:500, outline:"none", transition:"all 0.22s" }}
                  onFocus={e=>{e.target.style.borderColor="#7c3aed";e.target.style.background="#fff";e.target.style.boxShadow="0 0 0 3px rgba(124,58,237,0.09)";}}
                  onBlur={e=>{e.target.style.borderColor="#e4d9ff";e.target.style.background="#f8f5ff";e.target.style.boxShadow="none";}}
                />
              </div>
            ))}

            <div style={{ marginBottom:"12px" }}>
              <select value={form.track} onChange={e=>setForm({...form,track:e.target.value})}
                style={{ width:"100%", padding:"12px 16px", background:"#f8f5ff", border:"1.5px solid #e4d9ff", borderRadius:"12px", color:form.track?"#1a0640":"#b9a8d4", fontSize:"14px", fontFamily:"'Outfit',sans-serif", fontWeight:500, outline:"none", appearance:"none" }}
                onFocus={e=>{e.target.style.borderColor="#7c3aed";}}
                onBlur={e=>{e.target.style.borderColor="#e4d9ff";}}
              >
                <option value="">Select Career Track</option>
                {tracks.map(t=><option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div style={{ marginBottom:"22px" }}>
              <div style={{ fontSize:"11px", fontWeight:700, color:"#9270c0", marginBottom:"8px", fontFamily:"'Outfit',sans-serif", letterSpacing:"0.06em" }}>PREFERRED DATE</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"7px" }}>
                {dates.map(d=>(
                  <button key={d} onClick={()=>setForm({...form,date:d})} style={{ padding:"6px 13px", background:form.date===d?"rgba(124,58,237,0.10)":"#f8f5ff", border:`1.5px solid ${form.date===d?"#c4b5fd":"#e4d9ff"}`, borderRadius:"99px", color:form.date===d?"#7c3aed":"#9270c0", fontSize:"11.5px", fontWeight:700, fontFamily:"'Outfit',sans-serif", cursor:"pointer", transition:"all 0.18s" }}>{d}</button>
                ))}
              </div>
            </div>

            <button onClick={handleBook} disabled={submitting}
              style={{ width:"100%", background:"linear-gradient(135deg,#7c3aed,#5b21b6)", border:"none", color:"#fff", borderRadius:"14px", padding:"14px", fontSize:"14.5px", fontWeight:800, fontFamily:"'Outfit',sans-serif", cursor:"pointer", boxShadow:"0 8px 28px rgba(124,58,237,0.32)", transition:"all 0.22s", display:"flex", alignItems:"center", justifyContent:"center", gap:"10px", position:"relative", overflow:"hidden" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 14px 40px rgba(124,58,237,0.45)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 8px 28px rgba(124,58,237,0.32)";}}
            >
              {submitting ? "Confirming…" : "Confirm Free Session"}
              <IcoArrow s={16} c="#fff" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function CareerGuidancePage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [modalOpen,   setModalOpen]   = useState(false);
  const [pathsRef,    pathsInView]    = useInView(0.1);
  const [servicesRef, servicesInView] = useInView(0.1);
  const [journeyRef,  journeyInView]  = useInView(0.1);
  const [mentorsRef,  mentorsInView]  = useInView(0.1);
  const [faqRef,      faqInView]      = useInView(0.1);
  const [ctaRef,      ctaInView]      = useInView(0.2);

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        @keyframes shimmer    { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes heroFadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatY     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulseDot   { 0%,100%{transform:scale(1);opacity:0.7} 50%{transform:scale(1.7);opacity:0.3} }
        @keyframes badgePop   { from{transform:scale(0) rotate(-12deg);opacity:0} to{transform:scale(1) rotate(0);opacity:1} }
        @keyframes drawLine   { from{stroke-dashoffset:300} to{stroke-dashoffset:0} }
        @keyframes waveShift  { 0%{stroke-dashoffset:0} 100%{stroke-dashoffset:-60} }
        @keyframes fadeInBg   { from{opacity:0} to{opacity:1} }
        @keyframes slideUpM   { from{opacity:0;transform:translateY(36px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }

        .cgp { font-family:'Outfit',sans-serif; }

        .grid-bg {
          position:absolute; inset:0; pointer-events:none; z-index:0;
          background-image:
            linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),
            linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px);
          background-size:32px 32px;
        }

        .section-label {
          display:inline-flex; align-items:center; gap:8px;
          background:#fff; border:1.5px solid #e4d9ff; border-radius:9px;
          padding:7px 16px; font-size:11.5px; color:#3b1f7a; font-weight:700;
          letter-spacing:0.08em; box-shadow:0 2px 12px rgba(124,58,237,0.10);
          font-family:'Outfit',sans-serif;
        }

        .cta-primary {
          display:inline-flex; align-items:center; gap:10px;
          background:linear-gradient(135deg,#7c3aed,#5b21b6);
          color:#fff; border:none; border-radius:50px;
          padding:14px 32px; font-size:14px; font-weight:700;
          font-family:'Outfit',sans-serif; cursor:pointer;
          transition:transform 0.22s,box-shadow 0.22s;
          box-shadow:0 6px 22px rgba(124,58,237,0.32);
          position:relative; overflow:hidden;
        }
        .cta-primary::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent); background-size:200% 100%; animation:shimmer 2.2s infinite; }
        .cta-primary:hover  { transform:translateY(-3px) scale(1.03); box-shadow:0 14px 36px rgba(124,58,237,0.42); }
        .cta-primary:active { transform:scale(0.97); }

        .cta-outline {
          display:inline-flex; align-items:center; gap:8px;
          background:transparent; color:#7c3aed;
          border:1.5px solid #c4b5fd; border-radius:50px;
          padding:13px 28px; font-size:14px; font-weight:700;
          font-family:'Outfit',sans-serif; cursor:pointer; transition:all 0.22s;
        }
        .cta-outline:hover { background:rgba(124,58,237,0.06); border-color:#7c3aed; transform:translateY(-2px); }
      `}</style>

      <NavBar />

      <div className="cgp" style={{ background:"#faf8ff", minHeight:"100vh", paddingTop:"62px", position:"relative" }}>
        {/* Global grid — fixed so it covers all sections */}
        <div className="grid-bg" style={{ position:"fixed" }} />

        {/* ══ HERO ══ */}
        <section style={{ position:"relative", overflow:"hidden", background:"radial-gradient(ellipse 85% 70% at 65% 40%,rgba(167,139,250,0.18) 0%,transparent 60%),radial-gradient(ellipse 50% 55% at 5% 85%,rgba(124,58,237,0.10) 0%,transparent 60%),transparent", padding:"72px 0 80px" }}>
          {/* Blobs */}
          <div style={{ position:"absolute", top:"-50px", right:"-60px", width:"360px", height:"360px", borderRadius:"50%", background:"radial-gradient(circle,rgba(167,139,250,0.16) 0%,transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"-30px", left:"-40px", width:"280px", height:"280px", borderRadius:"50%", background:"radial-gradient(circle,rgba(124,58,237,0.09) 0%,transparent 70%)", pointerEvents:"none" }} />
          {/* Dots */}
          {[{t:"16%",l:"7%",s:9,d:"0s"},{t:"72%",l:"3%",s:6,d:"1.5s"},{t:"30%",l:"92%",s:7,d:"0.8s"},{t:"80%",l:"87%",s:5,d:"2s"}].map((p,i)=>(
            <div key={i} style={{ position:"absolute",top:p.t,left:p.l,width:p.s,height:p.s,borderRadius:"50%",background:"rgba(124,58,237,0.18)",animation:`pulseDot 3s ${p.d} ease-in-out infinite`,pointerEvents:"none" }} />
          ))}

          <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 48px", position:"relative", zIndex:1 }}>
            <div style={{ display:"flex", gap:"60px", alignItems:"center", flexWrap:"wrap" }}>

              {/* Left */}
              <div style={{ flex:1, minWidth:"300px" }}>
                <div className="section-label" style={{ marginBottom:"20px", opacity:heroVisible?1:0, animation:heroVisible?"heroFadeUp 0.7s ease 0.05s both":"none" }}>
                  <IcoCompass s={13} c="#7c3aed" />
                  CAREER GUIDANCE
                </div>

                <h1 style={{ fontSize:"clamp(2.2rem,5vw,3.5rem)", fontWeight:900, fontFamily:"'Outfit',sans-serif", color:"#0f0426", lineHeight:1.07, letterSpacing:"-0.03em", marginBottom:"20px", opacity:heroVisible?1:0, animation:heroVisible?"heroFadeUp 0.8s ease 0.15s both":"none" }}>
                  Navigate Your<br />
                  <span style={{ color:"#7c3aed", position:"relative" }}>
                    Career with Clarity
                    <svg viewBox="0 0 320 14" style={{ position:"absolute", bottom:"-10px", left:0, width:"100%", height:"13px", overflow:"visible" }}>
                      <path d="M4 10 Q40 2 80 10 Q120 18 160 10 Q200 2 240 10 Q280 18 310 8"
                        stroke="#a78bfa" strokeWidth="3" fill="none" strokeLinecap="round"
                        strokeDasharray="12 4"
                        style={{ animation:"waveShift 1.2s linear infinite" }}
                      />
                    </svg>
                  </span>
                </h1>

                <p style={{ fontSize:"16px", color:"#5c4a8a", lineHeight:1.78, maxWidth:"520px", marginBottom:"34px", fontWeight:500, opacity:heroVisible?1:0, animation:heroVisible?"heroFadeUp 0.8s ease 0.28s both":"none" }}>
                  Don't guess your next move — own it. Our expert counsellors map your strengths to the right career path, build your skill plan, and stand with you until you're placed.
                </p>

                <div style={{ display:"flex", gap:"14px", flexWrap:"wrap", marginBottom:"40px", opacity:heroVisible?1:0, animation:heroVisible?"heroFadeUp 0.8s ease 0.38s both":"none" }}>
                  <button className="cta-primary" onClick={() => setModalOpen(true)}>
                    Book Free Session <IcoArrow s={16} c="#fff" />
                  </button>
                  <button className="cta-outline">Explore Paths</button>
                </div>

                {/* Trust stats */}
                <div style={{ display:"flex", gap:"28px", flexWrap:"wrap", opacity:heroVisible?1:0, animation:heroVisible?"heroFadeUp 0.8s ease 0.48s both":"none" }}>
                  {[{val:"2,000+",label:"Students guided"},{val:"15+",label:"Years of expertise"},{val:"4.9",label:"Counsellor rating"}].map((s,i)=>(
                    <div key={i}>
                      <div style={{ fontSize:"20px", fontWeight:900, color:"#7c3aed", fontFamily:"'Outfit',sans-serif", lineHeight:1 }}>{s.val}</div>
                      <div style={{ fontSize:"11.5px", color:"#9270c0", marginTop:"3px", fontWeight:600, fontFamily:"'Outfit',sans-serif" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right visual */}
              <div style={{ flex:"0 0 300px", height:"300px", position:"relative", display:"flex", alignItems:"center", justifyContent:"center", opacity:heroVisible?1:0, animation:heroVisible?"heroFadeUp 1s ease 0.4s both":"none" }}>
                {/* rings */}
                {[150,110,70].map((r,i)=>(
                  <div key={i} style={{ position:"absolute", width:r*2, height:r*2, borderRadius:"50%", border:`1px solid rgba(124,58,237,${0.10+i*0.07})`, top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}>
                    <div style={{ width:i===0?10:i===1?8:6, height:i===0?10:i===1?8:6, borderRadius:"50%", background:i===0?"#0891b2":i===1?"#7c3aed":"#10b981", position:"absolute", top:"50%", left:"50%", transformOrigin:`${-r}px 0`, animation:`${i%2===0?"orbitA":"orbitB"} ${8+i*4}s linear infinite`, boxShadow:`0 0 8px ${i===0?"#0891b2":i===1?"#7c3aed":"#10b981"}` }} />
                  </div>
                ))}
                {/* Floating labels */}
                {[{t:"6%",l:"58%",text:"Career Map",c:"#0891b2"},{t:"36%",l:"70%",text:"Mentorship",c:"#7c3aed"},{t:"68%",l:"55%",text:"Placement",c:"#10b981"},{t:"46%",l:"-2%",text:"Assessment",c:"#f59e0b"}].map((lb,i)=>(
                  <div key={i} style={{ position:"absolute", top:lb.t, left:lb.l, background:"#fff", border:`1.5px solid ${lb.c}33`, borderRadius:"99px", padding:"5px 12px", fontSize:"11px", fontWeight:700, color:lb.c, fontFamily:"'Outfit',sans-serif", whiteSpace:"nowrap", boxShadow:`0 2px 12px ${lb.c}18`, animation:`floatY ${5+i}s ${i*0.5}s ease-in-out infinite` }}>
                    {lb.text}
                  </div>
                ))}
                {/* Centre */}
                <div style={{ width:88, height:88, borderRadius:"50%", background:"linear-gradient(135deg,#7c3aed,#5b21b6)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", boxShadow:"0 0 52px rgba(124,58,237,0.40)", zIndex:2 }}>
                  <IcoCompass s={30} c="#fff" />
                  <div style={{ fontSize:"9px", fontWeight:800, color:"rgba(255,255,255,0.72)", fontFamily:"'Outfit',sans-serif", letterSpacing:"0.1em", marginTop:"4px" }}>GUIDE</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ CAREER PATHS ══ */}
        <section ref={pathsRef} style={{ padding:"72px 0", background:"transparent", borderTop:"1px solid #f0ebff", position:"relative", zIndex:1 }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 48px" }}>
            <div style={{ textAlign:"center", marginBottom:"48px", opacity:pathsInView?1:0, transform:pathsInView?"translateY(0)":"translateY(24px)", transition:"all 0.7s ease" }}>
              <div className="section-label" style={{ marginBottom:"14px" }}><IcoMap s={13} c="#7c3aed" /> CAREER TRACKS</div>
              <h2 style={{ fontSize:"clamp(1.6rem,3.5vw,2.6rem)", fontWeight:900, fontFamily:"'Outfit',sans-serif", color:"#0f0426", letterSpacing:"-0.03em", lineHeight:1.1 }}>
                Choose Your <span style={{ color:"#7c3aed" }}>Career Path</span>
              </h2>
              <p style={{ fontSize:"14.5px", color:"#9270c0", marginTop:"10px", fontWeight:500, maxWidth:"440px", margin:"10px auto 0", fontFamily:"'Outfit',sans-serif" }}>
                Three powerhouse industries. Unlimited potential. Which one is yours?
              </p>
            </div>
            <div style={{ display:"flex", gap:"20px", flexWrap:"wrap" }}>
              {CAREER_PATHS.map((p,i)=>(
                <CareerPathCard key={p.id} path={p} delay={`${i*0.12}s`} inView={pathsInView} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ GUIDANCE SERVICES ══ */}
        <section ref={servicesRef} style={{ padding:"72px 0", background:"#fff", borderTop:"1px solid #f0ebff", position:"relative", zIndex:1 }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 48px" }}>
            <div style={{ display:"flex", gap:"56px", alignItems:"flex-start", flexWrap:"wrap" }}>
              <div style={{ flex:"0 0 280px", opacity:servicesInView?1:0, transform:servicesInView?"translateX(0)":"translateX(-28px)", transition:"all 0.8s ease" }}>
                <div className="section-label" style={{ marginBottom:"16px" }}><IcoRocket s={13} c="#7c3aed" /> WHAT WE OFFER</div>
                <h2 style={{ fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:900, fontFamily:"'Outfit',sans-serif", color:"#0f0426", letterSpacing:"-0.02em", lineHeight:1.1, marginBottom:"14px" }}>
                  End-to-End<br /><span style={{ color:"#7c3aed" }}>Guidance Suite</span>
                </h2>
                <p style={{ fontSize:"13.5px", color:"#9270c0", lineHeight:1.78, fontWeight:500, fontFamily:"'Outfit',sans-serif" }}>
                  From knowing yourself to signing your offer letter — we walk every step with you.
                </p>
                <button className="cta-primary" style={{ marginTop:"26px", fontSize:"13px", padding:"12px 26px" }} onClick={() => setModalOpen(true)}>
                  Start Free Assessment <IcoArrow s={14} c="#fff" />
                </button>
              </div>
              <div style={{ flex:1, display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))", gap:"14px" }}>
                {GUIDANCE_SERVICES.map((s,i)=>(
                  <ServiceCard key={i} service={s} delay={`${i*0.08}s`} inView={servicesInView} SvcIcon={SERVICE_ICONS[i]} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ JOURNEY ══ */}
        <section ref={journeyRef} style={{ padding:"72px 0", background:"transparent", borderTop:"1px solid #f0ebff", position:"relative", zIndex:1 }}>
          <div style={{ maxWidth:"860px", margin:"0 auto", padding:"0 48px" }}>
            <div style={{ textAlign:"center", marginBottom:"52px", opacity:journeyInView?1:0, transform:journeyInView?"translateY(0)":"translateY(24px)", transition:"all 0.7s ease" }}>
              <div className="section-label" style={{ marginBottom:"14px" }}><IcoRocket s={13} c="#7c3aed" /> YOUR JOURNEY</div>
              <h2 style={{ fontSize:"clamp(1.6rem,3.5vw,2.4rem)", fontWeight:900, fontFamily:"'Outfit',sans-serif", color:"#0f0426", letterSpacing:"-0.02em", lineHeight:1.1 }}>
                From <span style={{ color:"#7c3aed" }}>Uncertain</span> to Unstoppable
              </h2>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {JOURNEY_STEPS.map((s,i)=>(
                <JourneyStep key={i} step={s} index={i} inView={journeyInView} StepIcon={JOURNEY_ICONS[i]} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ MENTORS ══ */}
        <section ref={mentorsRef} style={{ padding:"72px 0", background:"#fff", borderTop:"1px solid #f0ebff", position:"relative", zIndex:1 }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 48px" }}>
            <div style={{ textAlign:"center", marginBottom:"44px", opacity:mentorsInView?1:0, transform:mentorsInView?"translateY(0)":"translateY(20px)", transition:"all 0.7s ease" }}>
              <div className="section-label" style={{ marginBottom:"14px" }}><IcoUsers s={13} c="#7c3aed" /> MEET YOUR MENTORS</div>
              <h2 style={{ fontSize:"clamp(1.6rem,3.5vw,2.4rem)", fontWeight:900, fontFamily:"'Outfit',sans-serif", color:"#0f0426", letterSpacing:"-0.02em" }}>
                Learn From the <span style={{ color:"#7c3aed" }}>Best in Industry</span>
              </h2>
              <p style={{ fontSize:"14.5px", color:"#9270c0", marginTop:"8px", fontWeight:500, fontFamily:"'Outfit',sans-serif" }}>Real professionals. Real experience. Real guidance.</p>
            </div>
            <div style={{ display:"flex", gap:"18px", flexWrap:"wrap" }}>
              {MENTORS.map((m,i)=>(
                <MentorCard key={i} mentor={m} delay={`${i*0.10}s`} inView={mentorsInView} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section ref={faqRef} style={{ padding:"72px 0", background:"transparent", borderTop:"1px solid #f0ebff", position:"relative", zIndex:1 }}>
          <div style={{ maxWidth:"720px", margin:"0 auto", padding:"0 48px" }}>
            <div style={{ textAlign:"center", marginBottom:"40px", opacity:faqInView?1:0, transform:faqInView?"translateY(0)":"translateY(20px)", transition:"all 0.7s ease" }}>
              <div className="section-label" style={{ marginBottom:"14px" }}><IcoStar s={13} c="#7c3aed" /> COMMON QUESTIONS</div>
              <h2 style={{ fontSize:"clamp(1.6rem,3.5vw,2.2rem)", fontWeight:900, fontFamily:"'Outfit',sans-serif", color:"#0f0426", letterSpacing:"-0.02em" }}>
                Got Questions? <span style={{ color:"#7c3aed" }}>We've Got Answers.</span>
              </h2>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              {FAQS.map((f,i)=>(
                <FAQItem key={i} {...f} delay={`${i*0.07}s`} inView={faqInView} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section ref={ctaRef} style={{ padding:"72px 0 80px", background:"transparent", position:"relative", zIndex:1 }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 48px" }}>
            <div style={{
              background:"linear-gradient(135deg,#6d28d9 0%,#7c3aed 50%,#4c1d95 100%)",
              borderRadius:"28px", padding:"60px 52px",
              position:"relative", overflow:"hidden",
              opacity:ctaInView?1:0, transform:ctaInView?"translateY(0) scale(1)":"translateY(28px) scale(0.97)",
              transition:"all 0.9s cubic-bezier(.4,0,.2,1)",
            }}>
              <div style={{ position:"absolute", top:"-50px", right:"-50px", width:"240px", height:"240px", borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
              <div style={{ position:"absolute", bottom:"-40px", left:"-40px", width:"200px", height:"200px", borderRadius:"50%", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }} />
              <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,0.08) 1px,transparent 1px)", backgroundSize:"22px 22px", pointerEvents:"none" }} />
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"3px", background:"linear-gradient(90deg,#7c3aed,#a78bfa,#7c3aed)", backgroundSize:"200% 100%", animation:"shimmer 3s linear infinite" }} />

              <div style={{ position:"relative", zIndex:1, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"28px" }}>
                <div style={{ maxWidth:"500px" }}>
                  <div style={{ fontSize:"11px", fontWeight:800, color:"rgba(255,255,255,0.58)", letterSpacing:"0.12em", marginBottom:"14px", fontFamily:"'Outfit',sans-serif" }}>TAKE CONTROL OF YOUR FUTURE</div>
                  <h2 style={{ fontSize:"clamp(1.6rem,4vw,2.8rem)", fontWeight:900, fontFamily:"'Outfit',sans-serif", color:"#fff", lineHeight:1.08, letterSpacing:"-0.03em", marginBottom:"12px" }}>
                    Your Career Clarity<br />Is One Call Away.
                  </h2>
                  <p style={{ fontSize:"14px", color:"rgba(255,255,255,0.72)", lineHeight:1.75, fontWeight:500, fontFamily:"'Outfit',sans-serif" }}>
                    Stop second-guessing. Book a free 30-minute guidance session with our expert counsellors and get a clear direction — today.
                  </p>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:"14px", alignItems:"flex-start" }}>
                  <button style={{ background:"#fff", color:"#7c3aed", border:"none", borderRadius:"50px", padding:"15px 34px", fontSize:"14px", fontWeight:800, fontFamily:"'Outfit',sans-serif", cursor:"pointer", display:"flex", alignItems:"center", gap:"10px", boxShadow:"0 8px 28px rgba(0,0,0,0.18)", transition:"all 0.22s", whiteSpace:"nowrap" }}
                    onClick={() => setModalOpen(true)}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px) scale(1.04)";e.currentTarget.style.boxShadow="0 16px 40px rgba(0,0,0,0.25)";}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0) scale(1)";e.currentTarget.style.boxShadow="0 8px 28px rgba(0,0,0,0.18)";}}
                  >
                    Book Free Session Now <IcoArrow s={16} c="#7c3aed" />
                  </button>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", paddingLeft:"6px" }}>
                    <div style={{ display:"flex" }}>
                      {["abtimg1.jpg","abtimg2.jpg","abtimg3.jpg"].map((a,i)=>(
                        <div key={i} style={{ width:26, height:26, borderRadius:"50%", border:"2px solid rgba(255,255,255,0.3)", overflow:"hidden", marginLeft:i>0?"-7px":"0", background:"linear-gradient(135deg,#7c3aed,#a78bfa)" }}>
                          <img src={a} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>{e.target.style.display="none";}} />
                        </div>
                      ))}
                    </div>
                    <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.68)", fontWeight:600, fontFamily:"'Outfit',sans-serif" }}>2,000+ students guided</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <style>{`
          @keyframes orbitA { from{transform:rotate(0deg) translateX(var(--r,90px)) rotate(0deg)} to{transform:rotate(360deg) translateX(var(--r,90px)) rotate(-360deg)} }
          @keyframes orbitB { from{transform:rotate(0deg) translateX(var(--r,130px)) rotate(0deg)} to{transform:rotate(-360deg) translateX(var(--r,130px)) rotate(360deg)} }
        `}</style>
      </div>

      {modalOpen && <BookingModal onClose={() => setModalOpen(false)} />}
    </>
  );
}