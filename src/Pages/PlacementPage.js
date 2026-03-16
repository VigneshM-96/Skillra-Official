import { useState, useEffect, useRef } from "react";
import NavBar from "./NavBar";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const STATS = [
  { value: 500,  suffix: "+", label: "Students Placed",    decimal: false },
  { value: 98,   suffix: "%", label: "Placement Rate",     decimal: false },
  { value: 120,  suffix: "+", label: "Hiring Partners",    decimal: false },
  { value: 4.2,  suffix: "L", label: "Avg. Package (CTC)", decimal: true  },
];

const COMPANIES = [
  "Apollo Hospitals","Fortis Healthcare","Max Healthcare","Medanta",
  "Manipal Hospitals","Narayana Health","KIMS Hospitals","Care Hospitals",
  "Infosys BPM","Cognizant","Wipro","HCL Technologies",
  "Omega Healthcare","Acuity Knowledge","eClinicalWorks","Nthrive",
  "TCS Healthcare","Mphasis","Hexaware","Sutherland Global",
];

const PLACED_STUDENTS = [
  { name:"Priya Sharma",    role:"Medical Coder",        company:"Apollo Hospitals",  course:"AI Medical Coding",  package:"3.8 LPA", avatar:"abtimg1.jpg", location:"Chennai"    },
  { name:"Rahul Menon",     role:"Full Stack Developer", company:"Infosys BPM",       course:"Full Stack Dev",     package:"5.2 LPA", avatar:"abtimg2.jpg", location:"Bangalore"  },
  { name:"Ananya Krishnan", role:"Data Analyst",         company:"Cognizant",         course:"Data Analytics",     package:"4.5 LPA", avatar:"abtimg3.jpg", location:"Hyderabad"  },
  { name:"Karthik Rajan",   role:"Medical Biller",       company:"Omega Healthcare",  course:"AI Medical Billing", package:"3.5 LPA", avatar:"abtimg1.jpg", location:"Coimbatore" },
  { name:"Deepa Nair",      role:"UI/UX Designer",       company:"Wipro",             course:"UI/UX Design",       package:"4.8 LPA", avatar:"abtimg2.jpg", location:"Pune"       },
  { name:"Mohammed Irfan",  role:"SAP Consultant",       company:"HCL Technologies",  course:"SAP Development",    package:"6.0 LPA", avatar:"abtimg3.jpg", location:"Mumbai"     },
];

const PROCESS_STEPS = [
  { step:"01", title:"Enroll & Learn",      desc:"Join your chosen course with expert-led live and recorded sessions.", color:"#7c3aed" },
  { step:"02", title:"Build Projects",      desc:"Work on real-world case studies and build a job-ready portfolio.",    color:"#0ea5e9" },
  { step:"03", title:"Resume & Interview",  desc:"Professional resume crafting and unlimited mock interview sessions.", color:"#10b981" },
  { step:"04", title:"Get Placed",          desc:"Connect with 120+ hiring partners and land your dream job.",          color:"#f59e0b" },
];

const COURSE_PLACEMENT = [
  { course:"AI Medical Coding",  rate:98, placed:142, avg:"3.8 LPA", color:"#7c3aed" },
  { course:"Full Stack Dev",     rate:96, placed:118, avg:"5.2 LPA", color:"#0ea5e9" },
  { course:"Data Analytics",     rate:94, placed:95,  avg:"4.5 LPA", color:"#10b981" },
  { course:"AI Medical Billing", rate:97, placed:88,  avg:"3.5 LPA", color:"#f59e0b" },
  { course:"UI/UX Design",       rate:92, placed:74,  avg:"4.8 LPA", color:"#ec4899" },
  { course:"SAP Development",    rate:95, placed:61,  avg:"6.0 LPA", color:"#14b8a6" },
];

const GUARANTEES = [
  { title:"100% Placement Assistance", desc:"Dedicated team works until you're placed." },
  { title:"Unlimited Mock Interviews",  desc:"Practice until you ace every round."       },
  { title:"Professional Resume Build",  desc:"ATS-ready resumes by career experts."      },
  { title:"Global Job Network",         desc:"Access to national & international openings." },
];

/* ─────────────────────────────────────────
   SVG ICONS — no emojis anywhere
───────────────────────────────────────── */
const IcoStar      = ({s=13,c="#7c3aed"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>);
const IcoArrow     = ({s=16,c="#fff"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>);
const IcoPin       = ({s=13,c="#9270c0"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>);
const IcoBuilding  = ({s=14,c="#7c3aed"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9M15 21V9"/></svg>);
const IcoUsers     = ({s=14,c="#7c3aed"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
const IcoTrend     = ({s=14,c="#7c3aed"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>);
const IcoBriefcase = ({s=14,c="#7c3aed"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/><line x1="12" y1="12" x2="12.01" y2="12"/></svg>);
const IcoBook      = ({s=20,c="#7c3aed"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>);
const IcoTool      = ({s=20,c="#0ea5e9"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>);
const IcoFile      = ({s=20,c="#10b981"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>);
const IcoRocket    = ({s=20,c="#f59e0b"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>);
const IcoShield    = ({s=18,c="#7c3aed"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);
const IcoRepeat    = ({s=18,c="#0ea5e9"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>);
const IcoClip      = ({s=18,c="#10b981"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>);
const IcoGlobe     = ({s=18,c="#f59e0b"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>);
const IcoHandshake = ({s=22,c="white"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>);
const IcoCheck     = ({s=16,c="#7c3aed"})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>);

const STEP_ICONS = [IcoBook, IcoTool, IcoFile, IcoRocket];
const GUARANTEE_ICONS = [IcoShield, IcoRepeat, IcoClip, IcoGlobe];

/* ─────────────────────────────────────────
   HOOKS
───────────────────────────────────────── */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useCountUp(target, duration = 1800, start = false, decimal = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(decimal ? parseFloat((eased * target).toFixed(1)) : Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration, decimal]);
  return count;
}

/* ─────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────── */
function StatCard({ value, suffix, label, decimal, delay, Icon }) {
  const [ref, inView] = useInView(0.3);
  const count = useCountUp(value, 1800, inView, decimal);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex:1, minWidth:"150px",
        background: hovered ? "linear-gradient(135deg,#7c3aed 0%,#5b21b6 100%)" : "#fff",
        border: hovered ? "1.5px solid transparent" : "1.5px solid #e4d9ff",
        borderRadius:"20px", padding:"28px 20px", textAlign:"center",
        cursor:"default",
        transition:"all 0.35s cubic-bezier(.4,0,.2,1)",
        boxShadow: hovered ? "0 20px 50px rgba(124,58,237,0.28)" : "0 4px 16px rgba(124,58,237,0.07)",
        transform: hovered ? "translateY(-8px) scale(1.04)" : inView ? "translateY(0)" : "translateY(20px)",
        opacity: inView ? 1 : 0,
        transitionDelay: delay,
      }}
    >
      <div style={{ display:"flex", justifyContent:"center", marginBottom:"10px" }}>
        <Icon s={22} c={hovered ? "rgba(255,255,255,0.85)" : "#7c3aed"} />
      </div>
      <div style={{ fontSize:"clamp(1.9rem,3vw,2.5rem)", fontWeight:900, color: hovered?"#fff":"#7c3aed", fontFamily:"'Outfit',sans-serif", lineHeight:1, letterSpacing:"-1px", transition:"color 0.3s" }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize:"12px", color: hovered?"rgba(255,255,255,0.75)":"#9270c0", marginTop:"6px", fontWeight:600, letterSpacing:"0.04em", fontFamily:"'Outfit',sans-serif", transition:"color 0.3s" }}>
        {label}
      </div>
    </div>
  );
}

function PlacementBar({ course, rate, placed, avg, color, delay, inView }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#fff" : "#faf8ff",
        border:`1.5px solid ${hovered ? color : "#e4d9ff"}`,
        borderRadius:"16px", padding:"18px 22px",
        transition:"all 0.28s ease",
        transform: hovered ? "translateX(6px)" : inView ? "translateX(0)" : "translateX(-30px)",
        opacity: inView ? 1 : 0, transitionDelay: delay, cursor:"default",
        boxShadow: hovered ? `0 8px 28px ${color}22` : "none",
      }}
    >
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
        <span style={{ fontSize:"13.5px", fontWeight:700, color:"#1a0640", fontFamily:"'Outfit',sans-serif" }}>{course}</span>
        <div style={{ display:"flex", gap:"12px", alignItems:"center" }}>
          <span style={{ fontSize:"11.5px", color:"#9270c0", fontWeight:600, fontFamily:"'Outfit',sans-serif" }}>{placed} placed · {avg}</span>
          <span style={{ fontSize:"15px", fontWeight:900, color, fontFamily:"'Outfit',sans-serif" }}>{rate}%</span>
        </div>
      </div>
      <div style={{ height:"7px", background:"#ede8ff", borderRadius:"99px", overflow:"hidden" }}>
        <div style={{ height:"100%", width: inView ? `${rate}%` : "0%", background:`linear-gradient(90deg,${color},${color}cc)`, borderRadius:"99px", transition:`width 1.2s cubic-bezier(.4,0,.2,1) ${delay}`, boxShadow:`0 2px 8px ${color}44` }} />
      </div>
    </div>
  );
}

function StudentCard({ student, delay, inView }) {
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:"#fff", border: hovered ? "1.5px solid #c4b5fd" : "1.5px solid #e4d9ff",
        borderRadius:"20px", padding:"22px",
        transition:"all 0.30s cubic-bezier(.4,0,.2,1)",
        transform: hovered ? "translateY(-6px)" : inView ? "translateY(0)" : "translateY(30px)",
        opacity: inView ? 1 : 0, transitionDelay: delay,
        boxShadow: hovered ? "0 16px 48px rgba(124,58,237,0.14)" : "0 3px 14px rgba(124,58,237,0.06)",
        cursor:"default", position:"relative", overflow:"hidden",
      }}
    >
      {/* Top shimmer bar */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:"linear-gradient(90deg,#7c3aed,#a78bfa)", transform: hovered?"scaleX(1)":"scaleX(0)", transformOrigin:"left", transition:"transform 0.38s ease" }} />

      <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"14px" }}>
        <div style={{ width:50, height:50, borderRadius:"50%", overflow:"hidden", flexShrink:0, border:"2.5px solid #c4b5fd", boxShadow:"0 4px 14px rgba(124,58,237,0.18)", background:"linear-gradient(135deg,#7c3aed,#a78bfa)" }}>
          {imgErr ? (
            <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px", fontWeight:900, color:"#fff", fontFamily:"'Outfit',sans-serif" }}>
              {student.name[0]}
            </div>
          ) : (
            <img src={student.avatar} alt={student.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={() => setImgErr(true)} />
          )}
        </div>
        <div>
          <div style={{ fontSize:"15px", fontWeight:800, color:"#1a0640", fontFamily:"'Outfit',sans-serif", lineHeight:1.2 }}>{student.name}</div>
          <div style={{ fontSize:"12px", color:"#9270c0", fontWeight:600, marginTop:"2px", fontFamily:"'Outfit',sans-serif" }}>{student.role}</div>
        </div>
      </div>

      <div style={{ background:"rgba(124,58,237,0.05)", borderRadius:"12px", padding:"12px 14px", marginBottom:"12px", border:"1px solid rgba(124,58,237,0.09)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"3px" }}>
          <IcoBuilding s={13} c="#7c3aed" />
          <span style={{ fontSize:"13px", fontWeight:700, color:"#7c3aed", fontFamily:"'Outfit',sans-serif" }}>{student.company}</span>
        </div>
        <div style={{ fontSize:"11.5px", color:"#9270c0", fontFamily:"'Outfit',sans-serif" }}>{student.course}</div>
      </div>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ background:"linear-gradient(135deg,#7c3aed,#5b21b6)", borderRadius:"8px", padding:"5px 12px", fontSize:"12px", fontWeight:800, color:"#fff", fontFamily:"'Outfit',sans-serif", boxShadow:"0 4px 12px rgba(124,58,237,0.28)" }}>
          {student.package}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"4px" }}>
          <IcoPin s={12} c="#b0a0d8" />
          <span style={{ fontSize:"11.5px", color:"#b0a0d8", fontWeight:600, fontFamily:"'Outfit',sans-serif" }}>{student.location}</span>
        </div>
      </div>
    </div>
  );
}

function ProcessStep({ step, title, desc, color, delay, inView, isLast, StepIcon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flex:1, position:"relative" }}>
      {!isLast && (
        <div style={{ position:"absolute", top:"44px", left:"calc(50% + 44px)", width:"calc(100% - 88px)", height:"1.5px", background:`linear-gradient(90deg,${color}44,#e4d9ff)`, zIndex:0 }} />
      )}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width:"88px", height:"88px", borderRadius:"50%",
          background: hovered ? `linear-gradient(135deg,${color},${color}cc)` : "#fff",
          border:`2px solid ${hovered ? "transparent" : color+"33"}`,
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"4px",
          boxShadow: hovered ? `0 12px 36px ${color}33` : `0 4px 18px ${color}18`,
          transition:"all 0.32s cubic-bezier(.4,0,.2,1)",
          transform: hovered ? "scale(1.12)" : inView ? "scale(1)" : "scale(0.7)",
          opacity: inView ? 1 : 0, transitionDelay: delay,
          zIndex:1, position:"relative", cursor:"default",
        }}
      >
        <StepIcon s={22} c={hovered ? "#fff" : color} />
        <div style={{ fontSize:"9px", fontWeight:800, color: hovered?"rgba(255,255,255,0.75)":color, fontFamily:"'Outfit',sans-serif", letterSpacing:"0.05em", transition:"color 0.3s" }}>{step}</div>
      </div>
      <div style={{ marginTop:"16px", textAlign:"center", padding:"0 8px", opacity: inView?1:0, transform: inView?"translateY(0)":"translateY(10px)", transition:`all 0.6s ease ${delay}` }}>
        <div style={{ fontSize:"14px", fontWeight:800, color:"#1a0640", marginBottom:"6px", fontFamily:"'Outfit',sans-serif" }}>{title}</div>
        <div style={{ fontSize:"12.5px", color:"#9270c0", lineHeight:1.6, fontFamily:"'Outfit',sans-serif" }}>{desc}</div>
      </div>
    </div>
  );
}

function CompanyMarquee() {
  return (
    <div style={{ overflow:"hidden", position:"relative" }}>
      <style>{`
        @keyframes marqueeScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .marquee-track { display:flex; gap:12px; width:max-content; animation:marqueeScroll 40s linear infinite; }
      `}</style>
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:"80px", background:"linear-gradient(to right,#faf8ff,transparent)", zIndex:2, pointerEvents:"none" }} />
      <div style={{ position:"absolute", right:0, top:0, bottom:0, width:"80px", background:"linear-gradient(to left,#faf8ff,transparent)", zIndex:2, pointerEvents:"none" }} />
      <div className="marquee-track">
        {[...COMPANIES, ...COMPANIES].map((c, i) => (
          <div key={i} style={{
            background:"#fff", border:"1.5px solid #e4d9ff", borderRadius:"50px",
            padding:"10px 22px", whiteSpace:"nowrap", fontSize:"13px", fontWeight:600,
            color:"#3b1f7a", fontFamily:"'Outfit',sans-serif",
            boxShadow:"0 2px 10px rgba(124,58,237,0.06)",
            display:"flex", alignItems:"center", gap:"8px",
            transition:"all 0.22s", cursor:"default",
          }}
          onMouseEnter={e=>{ e.currentTarget.style.background="linear-gradient(135deg,#7c3aed,#5b21b6)"; e.currentTarget.style.color="#fff"; e.currentTarget.style.boxShadow="0 6px 20px rgba(124,58,237,0.26)"; e.currentTarget.style.borderColor="transparent"; }}
          onMouseLeave={e=>{ e.currentTarget.style.background="#fff"; e.currentTarget.style.color="#3b1f7a"; e.currentTarget.style.boxShadow="0 2px 10px rgba(124,58,237,0.06)"; e.currentTarget.style.borderColor="#e4d9ff"; }}
          >
            <IcoBriefcase s={13} c="currentColor" />
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function PlacementPage() {
  const [heroVisible,   setHeroVisible]   = useState(false);
  const [statsRef,      statsInView]      = useInView(0.2);
  const [processRef,    processInView]    = useInView(0.15);
  const [studentsRef,   studentsInView]   = useInView(0.1);
  const [barsRef,       barsInView]       = useInView(0.2);
  const [companiesRef,  companiesInView]  = useInView(0.2);
  const [ctaRef,        ctaInView]        = useInView(0.3);

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  const STAT_ICONS = [IcoUsers, IcoTrend, IcoHandshake, IcoBriefcase];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        @keyframes shimmer    { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes floatY     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulseDot   { 0%,100%{transform:scale(1);opacity:0.7} 50%{transform:scale(1.6);opacity:0.3} }
        @keyframes heroFadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes badgePop   { from{transform:scale(0) rotate(-12deg);opacity:0} to{transform:scale(1) rotate(0deg);opacity:1} }
        @keyframes waveBounce {
  0%   { stroke-dashoffset: 0;    stroke-width: 3; }
  25%  { stroke-dashoffset: -20;  stroke-width: 4; }
  50%  { stroke-dashoffset: -40;  stroke-width: 2.5; }
  75%  { stroke-dashoffset: -20;  stroke-width: 4; }
  100% { stroke-dashoffset: 0;    stroke-width: 3; }
}

        .placement-page { font-family:'Outfit',sans-serif; }

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
          letter-spacing:0.2px; position:relative; overflow:hidden;
        }
        .cta-primary::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent); background-size:200% 100%; animation:shimmer 2.2s infinite; }
        .cta-primary:hover { transform:translateY(-3px) scale(1.03); box-shadow:0 14px 36px rgba(124,58,237,0.42); }
        .cta-primary:active { transform:scale(0.97); }

        .cta-outline {
          display:inline-flex; align-items:center; gap:8px;
          background:transparent; color:#7c3aed;
          border:1.5px solid #c4b5fd; border-radius:50px;
          padding:13px 28px; font-size:14px; font-weight:700;
          font-family:'Outfit',sans-serif; cursor:pointer;
          transition:all 0.22s;
        }
        .cta-outline:hover { background:rgba(124,58,237,0.06); border-color:#7c3aed; transform:translateY(-2px); }
      `}</style>

      <NavBar />

      <div className="placement-page" style={{ background:"#faf8ff", minHeight:"100vh", paddingTop:"62px", position:"relative" }}>
  {/* Grid — covers entire page */}
  <div className="grid-bg" style={{ position:"fixed" }} />

        {/* ══ HERO ══ */}
        <section style={{ position:"relative", overflow:"hidden", background:"radial-gradient(ellipse 85% 75% at 65% 40%,rgba(167,139,250,0.18) 0%,transparent 60%),radial-gradient(ellipse 50% 55% at 5% 85%,rgba(124,58,237,0.10) 0%,transparent 60%),#faf8ff", padding:"72px 0 80px" }}>
          <div className="grid-bg" />

          {/* Floating dots */}
          {[{t:"16%",l:"7%",s:9,d:"0s"},{t:"70%",l:"3%",s:6,d:"1.5s"},{t:"28%",l:"91%",s:8,d:"0.8s"},{t:"78%",l:"87%",s:5,d:"2s"}].map((p,i)=>(
            <div key={i} style={{ position:"absolute", top:p.t, left:p.l, width:p.s, height:p.s, borderRadius:"50%", background:"rgba(124,58,237,0.18)", animation:`pulseDot 3s ${p.d} ease-in-out infinite`, pointerEvents:"none" }} />
          ))}

          {/* Radial blobs */}
          <div style={{ position:"absolute", top:"-50px", right:"-60px", width:"360px", height:"360px", borderRadius:"50%", background:"radial-gradient(circle,rgba(167,139,250,0.16) 0%,transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"-30px", left:"-40px", width:"280px", height:"280px", borderRadius:"50%", background:"radial-gradient(circle,rgba(124,58,237,0.09) 0%,transparent 70%)", pointerEvents:"none" }} />

          <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 48px", position:"relative", zIndex:1 }}>
            <div style={{ maxWidth:"680px" }}>

              {/* Badge */}
              <div className="section-label" style={{ marginBottom:"20px", opacity:heroVisible?1:0, animation:heroVisible?"heroFadeUp 0.7s ease 0.05s both":"none" }}>
                <IcoStar s={13} c="#7c3aed" />
                PLACEMENT PROGRAM
              </div>

              {/* Headline */}
              <h1 style={{ fontSize:"clamp(2.2rem,5vw,3.6rem)", fontWeight:900, fontFamily:"'Outfit',sans-serif", color:"#0f0426", lineHeight:1.07, letterSpacing:"-0.03em", marginBottom:"20px", opacity:heroVisible?1:0, animation:heroVisible?"heroFadeUp 0.8s ease 0.15s both":"none" }}>
                Your Dream Job<br />
                <span style={{ color:"#7c3aed", position:"relative" }}>
                  Starts Here
                  <svg viewBox="0 0 240 20" style={{ position:"absolute", bottom:"-14px", left:0, width:"100%", height:"18px", overflow:"visible" }}>
                    <path
  d="M2 14 C10 6, 18 18, 28 11 C36 5, 44 17, 55 10 C64 4, 70 16, 82 9 C92 3, 100 18, 112 12 C122 7, 130 17, 142 10 C152 4, 162 16, 174 9 C184 3, 194 17, 206 11 C216 6, 226 15, 236 10"
  stroke="#a78bfa" strokeWidth="2.5" fill="none"
  strokeLinecap="round" strokeLinejoin="round"
  strokeDasharray="6 3"
  style={{ animation:"waveBounce 2.5s ease-in-out infinite" }}
/>
                  </svg>
                </span>
              </h1>

              <p style={{ fontSize:"16px", color:"#5c4a8a", lineHeight:1.75, maxWidth:"540px", marginBottom:"34px", fontWeight:500, opacity:heroVisible?1:0, animation:heroVisible?"heroFadeUp 0.8s ease 0.28s both":"none" }}>
                We don't just train you — we place you. With 100% placement assistance, 120+ hiring partners, and dedicated career coaches, Skillra turns your skills into a rewarding career.
              </p>

              <div style={{ display:"flex", gap:"14px", flexWrap:"wrap", opacity:heroVisible?1:0, animation:heroVisible?"heroFadeUp 0.8s ease 0.38s both":"none" }}>
                <button className="cta-primary">
                  View Placed Students
                  <IcoArrow s={16} c="#fff" />
                </button>
                <button className="cta-outline">
                  Explore Courses
                </button>
              </div>
            </div>

            {/* Floating 98% badge */}
            <div style={{
              position:"absolute", top:"-10px", right:"48px",
              background:"linear-gradient(135deg,#7c3aed,#5b21b6)",
              borderRadius:"20px", padding:"20px 26px", textAlign:"center",
              boxShadow:"0 16px 48px rgba(124,58,237,0.35)",
              animation:heroVisible?"badgePop 0.7s cubic-bezier(.4,0,.2,1) 0.5s both":"none",
              opacity:0,
            }}>
              <div style={{ fontSize:"2.2rem", fontWeight:900, color:"#fff", fontFamily:"'Outfit',sans-serif", lineHeight:1 }}>98%</div>
              <div style={{ fontSize:"11.5px", color:"rgba(255,255,255,0.78)", fontWeight:600, marginTop:"4px", fontFamily:"'Outfit',sans-serif" }}>Placement Rate</div>
              {/* star badge */}
              <div style={{ position:"absolute", top:"-10px", right:"-10px", width:"26px", height:"26px", background:"#fbbf24", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 12px rgba(251,191,36,0.45)" }}>
                <IcoStar s={12} c="#fff" />
              </div>
            </div>
          </div>
        </section>

        {/* ══ STATS ══ */}
        <section ref={statsRef} style={{ padding:"56px 0", background:"#fff", borderTop:"1px solid #f0ebff", borderBottom:"1px solid #f0ebff" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 48px" }}>
            <div style={{ display:"flex", gap:"18px", flexWrap:"wrap" }}>
              {STATS.map((s, i) => (
                <StatCard key={i} {...s} delay={`${i*0.1}s`} Icon={STAT_ICONS[i]} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ HIRING PARTNERS ══ */}
        <section ref={companiesRef} style={{ padding:"64px 0", background:"#faf8ff" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 48px", marginBottom:"32px" }}>
            <div style={{ textAlign:"center", opacity:companiesInView?1:0, transform:companiesInView?"translateY(0)":"translateY(20px)", transition:"all 0.7s ease" }}>
              <div className="section-label" style={{ marginBottom:"14px" }}>
                <IcoHandshake s={14} c="#7c3aed" />
                OUR HIRING PARTNERS
              </div>
              <h2 style={{ fontSize:"clamp(1.5rem,3vw,2.1rem)", fontWeight:900, fontFamily:"'Outfit',sans-serif", color:"#0f0426", letterSpacing:"-0.02em" }}>
                120+ Companies <span style={{ color:"#7c3aed" }}>Hire From Skillra</span>
              </h2>
            </div>
          </div>
          <CompanyMarquee />
        </section>

        {/* ══ PLACEMENT PROCESS ══ */}
        <section ref={processRef} style={{ padding:"68px 0", background:"#fff", borderTop:"1px solid #f0ebff" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 48px" }}>
            <div style={{ textAlign:"center", marginBottom:"52px", opacity:processInView?1:0, transform:processInView?"translateY(0)":"translateY(20px)", transition:"all 0.7s ease" }}>
              <div className="section-label" style={{ marginBottom:"14px" }}>
                <IcoRocket s={14} c="#7c3aed" />
                HOW IT WORKS
              </div>
              <h2 style={{ fontSize:"clamp(1.5rem,3vw,2.1rem)", fontWeight:900, fontFamily:"'Outfit',sans-serif", color:"#0f0426", letterSpacing:"-0.02em" }}>
                Your Path to <span style={{ color:"#7c3aed" }}>Placement</span>
              </h2>
              <p style={{ fontSize:"14.5px", color:"#9270c0", marginTop:"10px", fontWeight:500, maxWidth:"420px", margin:"10px auto 0", fontFamily:"'Outfit',sans-serif" }}>
                A structured 4-step journey from enrollment to your first day at work.
              </p>
            </div>
            <div style={{ display:"flex", gap:"20px", alignItems:"flex-start" }}>
              {PROCESS_STEPS.map((s, i) => (
                <ProcessStep key={i} {...s} delay={`${i*0.14}s`} inView={processInView} isLast={i===PROCESS_STEPS.length-1} StepIcon={STEP_ICONS[i]} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ COURSE PLACEMENT STATS ══ */}
        <section ref={barsRef} style={{ padding:"68px 0", background:"#faf8ff" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 48px" }}>
            <div style={{ display:"flex", gap:"56px", alignItems:"flex-start", flexWrap:"wrap" }}>

              {/* Left */}
              <div style={{ flex:"0 0 300px", opacity:barsInView?1:0, transform:barsInView?"translateX(0)":"translateX(-28px)", transition:"all 0.8s ease" }}>
                <div className="section-label" style={{ marginBottom:"16px" }}>
                  <IcoTrend s={13} c="#7c3aed" />
                  PLACEMENT STATS
                </div>
                <h2 style={{ fontSize:"clamp(1.5rem,2.8vw,2rem)", fontWeight:900, fontFamily:"'Outfit',sans-serif", color:"#0f0426", lineHeight:1.15, letterSpacing:"-0.02em", marginBottom:"14px" }}>
                  Course-wise<br /><span style={{ color:"#7c3aed" }}>Placement Rate</span>
                </h2>
                <p style={{ fontSize:"13.5px", color:"#9270c0", lineHeight:1.75, fontWeight:500, fontFamily:"'Outfit',sans-serif" }}>
                  Every course at Skillra is backed by dedicated placement cells, industry mentors, and active employer relationships built over 15+ years.
                </p>
                {/* Trophy */}
                <div style={{ marginTop:"24px", display:"inline-flex", alignItems:"center", gap:"12px", background:"linear-gradient(135deg,#fef3c7,#fde68a)", border:"1.5px solid #fbbf24", borderRadius:"14px", padding:"14px 18px", boxShadow:"0 6px 20px rgba(251,191,36,0.20)" }}>
                  <div style={{ width:36, height:36, background:"linear-gradient(135deg,#f59e0b,#d97706)", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize:"13px", fontWeight:800, color:"#92400e", fontFamily:"'Outfit',sans-serif" }}>Best Placement Record</div>
                    <div style={{ fontSize:"11.5px", color:"#b45309", fontWeight:600, fontFamily:"'Outfit',sans-serif" }}>Consecutive 3 Years</div>
                  </div>
                </div>
              </div>

              {/* Right bars */}
              <div style={{ flex:1, display:"flex", flexDirection:"column", gap:"12px" }}>
                {COURSE_PLACEMENT.map((c, i) => (
                  <PlacementBar key={i} {...c} delay={`${i*0.1}s`} inView={barsInView} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ PLACED STUDENTS ══ */}
        <section ref={studentsRef} style={{ padding:"68px 0", background:"#fff", borderTop:"1px solid #f0ebff" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 48px" }}>
            <div style={{ textAlign:"center", marginBottom:"44px", opacity:studentsInView?1:0, transform:studentsInView?"translateY(0)":"translateY(20px)", transition:"all 0.7s ease" }}>
              <div className="section-label" style={{ marginBottom:"14px" }}>
                <IcoUsers s={13} c="#7c3aed" />
                SUCCESS STORIES
              </div>
              <h2 style={{ fontSize:"clamp(1.5rem,3vw,2.1rem)", fontWeight:900, fontFamily:"'Outfit',sans-serif", color:"#0f0426", letterSpacing:"-0.02em" }}>
                Students Who Got <span style={{ color:"#7c3aed" }}>Placed</span>
              </h2>
              <p style={{ fontSize:"14.5px", color:"#9270c0", marginTop:"8px", fontWeight:500, fontFamily:"'Outfit',sans-serif" }}>
                Real students. Real jobs. Real results.
              </p>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"18px" }}>
              {PLACED_STUDENTS.map((s, i) => (
                <StudentCard key={i} student={s} delay={`${i*0.08}s`} inView={studentsInView} />
              ))}
            </div>

            <div style={{ textAlign:"center", marginTop:"36px", opacity:studentsInView?1:0, transition:"opacity 0.7s ease 0.5s" }}>
              <button className="cta-outline">
                View All Success Stories
                <IcoArrow s={15} c="#7c3aed" />
              </button>
            </div>
          </div>
        </section>

        {/* ══ GUARANTEES ══ */}
        <section style={{ padding:"52px 0", background:"#faf8ff", borderTop:"1px solid #f0ebff" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 48px" }}>
            <div style={{ display:"flex", gap:"18px", flexWrap:"wrap" }}>
              {GUARANTEES.map((g, i) => {
                const GIcon = GUARANTEE_ICONS[i];
                return (
                  <div key={i} style={{
                    flex:1, minWidth:"200px",
                    display:"flex", alignItems:"flex-start", gap:"14px",
                    background:"#fff", border:"1.5px solid #e4d9ff",
                    borderRadius:"18px", padding:"20px",
                    boxShadow:"0 3px 14px rgba(124,58,237,0.06)",
                    transition:"all 0.26s ease", cursor:"default",
                  }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow="0 14px 40px rgba(124,58,237,0.13)"; e.currentTarget.style.borderColor="#c4b5fd"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 3px 14px rgba(124,58,237,0.06)"; e.currentTarget.style.borderColor="#e4d9ff"; }}
                  >
                    <div style={{ width:38, height:38, borderRadius:"11px", background:"rgba(124,58,237,0.07)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <GIcon s={18} />
                    </div>
                    <div>
                      <div style={{ fontSize:"13.5px", fontWeight:800, color:"#1a0640", fontFamily:"'Outfit',sans-serif", marginBottom:"4px" }}>{g.title}</div>
                      <div style={{ fontSize:"12px", color:"#9270c0", fontWeight:500, lineHeight:1.55, fontFamily:"'Outfit',sans-serif" }}>{g.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══ CTA BANNER ══ */}
        <section ref={ctaRef} style={{ padding:"72px 0", background:"#faf8ff" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 48px" }}>
            <div style={{
              background:"linear-gradient(135deg,#6d28d9 0%,#7c3aed 50%,#4c1d95 100%)",
              borderRadius:"28px", padding:"60px 52px",
              position:"relative", overflow:"hidden",
              opacity:ctaInView?1:0, transform:ctaInView?"translateY(0) scale(1)":"translateY(30px) scale(0.97)",
              transition:"all 0.9s cubic-bezier(.4,0,.2,1)",
            }}>
              {/* inner blobs */}
              <div style={{ position:"absolute", top:"-50px", right:"-50px", width:"240px", height:"240px", borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
              <div style={{ position:"absolute", bottom:"-40px", left:"-40px", width:"200px", height:"200px", borderRadius:"50%", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }} />
              {/* dot grid */}
              <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,0.09) 1px,transparent 1px)", backgroundSize:"22px 22px", pointerEvents:"none" }} />
              {/* shimmer bottom line */}
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"3px", background:"linear-gradient(90deg,#7c3aed,#a78bfa,#7c3aed)", backgroundSize:"200% 100%", animation:"shimmer 3s linear infinite" }} />

              <div style={{ position:"relative", zIndex:1, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"28px" }}>
                <div style={{ maxWidth:"500px" }}>
                  <div style={{ fontSize:"11px", fontWeight:800, color:"rgba(255,255,255,0.58)", letterSpacing:"0.12em", marginBottom:"14px", fontFamily:"'Outfit',sans-serif" }}>
                    START YOUR JOURNEY TODAY
                  </div>
                  <h2 style={{ fontSize:"clamp(1.6rem,3.5vw,2.4rem)", fontWeight:900, fontFamily:"'Outfit',sans-serif", color:"#fff", lineHeight:1.1, letterSpacing:"-0.02em", marginBottom:"12px" }}>
                    Ready to Land Your<br />Dream Job?
                  </h2>
                  <p style={{ fontSize:"14px", color:"rgba(255,255,255,0.72)", lineHeight:1.7, fontWeight:500, fontFamily:"'Outfit',sans-serif" }}>
                    Join thousands of students who turned their passion into profession with Skillra's 100% placement guarantee.
                  </p>
                </div>

                <div style={{ display:"flex", flexDirection:"column", gap:"12px", alignItems:"flex-start" }}>
                  <button style={{ background:"#fff", color:"#7c3aed", border:"none", borderRadius:"50px", padding:"15px 34px", fontSize:"14px", fontWeight:800, fontFamily:"'Outfit',sans-serif", cursor:"pointer", display:"flex", alignItems:"center", gap:"10px", boxShadow:"0 8px 28px rgba(0,0,0,0.18)", transition:"all 0.22s", whiteSpace:"nowrap" }}
                    onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-3px) scale(1.04)"; e.currentTarget.style.boxShadow="0 16px 40px rgba(0,0,0,0.25)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0) scale(1)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(0,0,0,0.18)"; }}
                  >
                    Enroll Now — Get Placed
                    <IcoArrow s={16} c="#7c3aed" />
                  </button>

                  {/* Star rating */}
                  <div style={{ display:"flex", alignItems:"center", gap:"6px", paddingLeft:"8px" }}>
                    {[0,1,2,3,4].map(i=>(
                      <svg key={i} width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1l1.4 2.8 3.1.5-2.25 2.2.53 3.1L7 8.1 4.22 9.6l.53-3.1L2.5 4.3l3.1-.5L7 1z" fill="#fbbf24"/>
                      </svg>
                    ))}
                    <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.72)", fontWeight:600, fontFamily:"'Outfit',sans-serif" }}>4.9 · 500+ reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}