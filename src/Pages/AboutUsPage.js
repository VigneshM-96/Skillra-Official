import { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

/* ═══════════════════════════════════════════════════
   useInView HOOK
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
   DATA
═══════════════════════════════════════════════════ */
const STATS = [
  { num: "1+",   label: "Years of Excellence" },
  { num: "500+", label: "Students Placed"      },
  { num: "50+",  label: "Hiring Partners"       },
  { num: "98%",  label: "Placement Rate"        },
];

const LEADERSHIP = [
  {
    name:  "Bhuvaneshwari",
    title: "Founder & CEO",
    img:   "founder.png",
    accentColor: "#7c3aed",
    accentLight: "rgba(124,58,237,0.07)",
    accentBorder: "rgba(124,58,237,0.18)",
    bio:   "Bhuvaneshwari is a visionary edupreneur with deep roots in healthcare informatics. With a passion for bridging the gap between academic learning and industry demands, she founded Skillra to create a training ecosystem where every learner is job-ready. Her leadership drives the institute's core philosophy — real skills, real careers.",
    credentials: ["Healthcare IT Expert", "Career Strategy", "EdTech Leadership"],
    imgLeft: true,
  },
  {
    name:  "Premchandar",
    title: "Co-Founder",
    img:   "cofounder.png",
    accentColor: "#c2410c",
    accentLight: "rgba(194,65,12,0.06)",
    accentBorder: "rgba(194,65,12,0.16)",
    bio:   "Premchandar brings a strong technology and business development background to Skillra. His expertise spans full-stack development, data systems, and building industry partnerships. He co-founded Skillra with the mission to equip students in tier-2 and tier-3 cities with the same quality of training available in metropolitan hubs.",
    credentials: ["Technology & Systems", "Business Development", "Industry Partnerships"],
    imgLeft: false,
  },
];

const COURSES_OVERVIEW = [
  {
    category: "Healthcare",
    accentColor: "#7c3aed",
    accentLight: "#f3efff",
    accentBorder: "#ddd3f8",
    tagline: "AI-powered medical careers",
    courses: [
      { name: "AI Medical Coding",   desc: "Get certified and learn AI-powered coding skills with 100% placement." },
      { name: "AI Medical Billing",  desc: "Become a certified AI Medical Billing professional." },
      { name: "AI Medical Scribing", desc: "Learn AI-based medical scribing and clinical documentation." },
    ],
  },
  {
    category: "Technology",
    accentColor: "#c2410c",
    accentLight: "#fff4ee",
    accentBorder: "#fcd9c4",
    tagline: "Build the digital future",
    courses: [
      { name: "Full Stack Development", desc: "Master MERN and MEAN Stack for high-demand developer roles." },
      { name: "Data Analytics",         desc: "Join our Data Analytics program for data-driven careers." },
      { name: "UI/UX Design",           desc: "Build professional interfaces with modern design systems." },
    ],
  },
  {
    category: "Finance",
    accentColor: "#166534",
    accentLight: "#f0fdf4",
    accentBorder: "#bbf7d0",
    tagline: "Master numbers that matter",
    courses: [
      { name: "SAP Development",      desc: "Master SAP ABAP and become a certified SAP developer." },
      { name: "Tally & GST Course",   desc: "Learn Tally, GST filing, and financial accounting tools." },
      { name: "Financial Accounting", desc: "Master financial reporting and accounting standards." },
    ],
  },
];

const VALUES = [
  { num: "01", title: "Job-First Curriculum",      desc: "Every course is built backward from what employers actually hire for, not just what textbooks say." },
  { num: "02", title: "Mentor-Led Learning",        desc: "Our trainers bring 15+ years of industry experience into every class session." },
  { num: "03", title: "100% Placement Support",     desc: "Active hiring drives, mock interviews, resume reviews — we don't stop until you're placed." },
  { num: "04", title: "Tamper-Proof Certificates",  desc: "Digital, verifiable certificates that carry real weight with top employers across India." },
  { num: "05", title: "50+ Industry Partners",      desc: "Active hiring relationships across healthcare, IT, and finance sectors." },
  { num: "06", title: "Career-Long Support",        desc: "Alumni get ongoing access to upskilling resources, job portals, and counseling post-placement." },
];

/* ═══════════════════════════════════════════════════
   SHARED UI
═══════════════════════════════════════════════════ */
function SectionLabel({ text, light = false }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background: light ? "rgba(255,255,255,0.10)" : "#fff", border: light ? "1.5px solid rgba(255,255,255,0.18)" : "1.5px solid #e4d9ff", borderRadius:"9px", padding:"7px 16px", fontSize:"11.5px", color: light ? "rgba(255,255,255,0.85)" : "#3b1f7a", fontWeight:700, marginBottom:"18px", boxShadow: light ? "none" : "0 2px 12px rgba(124,58,237,0.09)", letterSpacing:"0.1em" }}>
      <span style={{ width:"6px", height:"6px", borderRadius:"50%", background: light ? "#a78bfa" : "#7c3aed", display:"inline-block" }} />
      {text}
    </div>
  );
}

function Divider({ light = false }) {
  return <div style={{ width:"48px", height:"3px", background: light ? "linear-gradient(90deg,#a78bfa,#7c3aed)" : "linear-gradient(90deg,#7c3aed,#a78bfa)", borderRadius:"99px", marginBottom:"20px" }} />;
}

const GridBg = () => (
  <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(rgba(124,58,237,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.035) 1px,transparent 1px)`, backgroundSize:"32px 32px" }} />
);

/* ═══════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════ */
function AboutHero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section style={{ background:"radial-gradient(ellipse 90% 70% at 60% 40%,rgba(167,139,250,0.14) 0%,transparent 68%),#faf8ff", minHeight:"400px", display:"flex", alignItems:"center", position:"relative", overflow:"hidden", padding:"88px 6% 72px" }}>
      <GridBg />
      <div style={{ position:"absolute", right:"-2%", top:"50%", transform:"translateY(-50%)", fontSize:"clamp(100px,16vw,200px)", fontWeight:900, color:"rgba(124,58,237,0.04)", lineHeight:1, userSelect:"none", letterSpacing:"-8px", pointerEvents:"none" }}>ABOUT</div>

      <div style={{ maxWidth:"800px", position:"relative", zIndex:1, opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(32px)", transition:"all 1s cubic-bezier(.4,0,.2,1)" }}>
        <SectionLabel text="ABOUT SKILLRA" />
        <h1 style={{ fontSize:"clamp(2.6rem,5.5vw,4rem)", fontWeight:900, color:"#120630", lineHeight:1.06, letterSpacing:"-2.5px", marginBottom:"24px" }}>
          Turning Learners Into<br/>
          <span style={{ color:"#7c3aed" }}>Industry-Ready</span> Professionals
        </h1>
        <p style={{ fontSize:"16px", color:"#5c4a80", lineHeight:1.85, maxWidth:"560px", fontWeight:500, marginBottom:"48px" }}>
          Skillra is Coimbatore's leading training institute for <strong style={{ color:"#120630", fontWeight:700 }}>AI Medical Coding & Billing</strong>, <strong style={{ color:"#120630", fontWeight:700 }}>IT Development</strong>, and <strong style={{ color:"#120630", fontWeight:700 }}>Finance</strong>. We bridge the gap between education and employment with job-focused curricula and 100% placement support.
        </p>
        <div style={{ display:"flex", gap:"14px", flexWrap:"wrap" }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ background:"#fff", border:"1.5px solid #e4d9ff", borderRadius:"16px", padding:"18px 24px", boxShadow:"0 4px 18px rgba(124,58,237,0.07)", minWidth:"110px", opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(18px)", transition:`background 0.3s, transform 0.3s, opacity 0.7s ease ${0.25 + i * 0.09}s, translateY 0.7s ease ${0.25 + i * 0.09}s` }}
              onMouseEnter={e => { e.currentTarget.style.background="linear-gradient(135deg,#7c3aed,#5b21b6)"; e.currentTarget.querySelector(".sn").style.color="#fff"; e.currentTarget.querySelector(".sl").style.color="rgba(255,255,255,0.72)"; e.currentTarget.style.transform="translateY(-5px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="#fff"; e.currentTarget.querySelector(".sn").style.color="#7c3aed"; e.currentTarget.querySelector(".sl").style.color="#9270c0"; e.currentTarget.style.transform="translateY(0)"; }}>
              <div className="sn" style={{ fontSize:"1.9rem", fontWeight:900, color:"#7c3aed", lineHeight:1, letterSpacing:"-1px", transition:"color 0.3s" }}>{s.num}</div>
              <div className="sl" style={{ fontSize:"11px", color:"#9270c0", marginTop:"4px", fontWeight:600, letterSpacing:"0.04em", transition:"color 0.3s" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   COMPANY STORY
═══════════════════════════════════════════════════ */
function CompanyStorySection() {
  const [ref, inView] = useInView(0.1);
  return (
    <section ref={ref} style={{ padding:"88px 0", background:"#fff", borderTop:"1px solid #f0ebff", position:"relative" }}>
      <GridBg />
      <div style={{ maxWidth:"1180px", margin:"0 auto", padding:"0 6%", position:"relative", zIndex:1 }}>
        <div style={{ display:"flex", gap:"80px", alignItems:"center", flexWrap:"wrap" }}>
          {/* Image */}
          <div style={{ flex:"0 0 auto", width:"460px", minWidth:"300px", position:"relative", opacity:inView?1:0, transform:inView?"translateX(0)":"translateX(-36px)", transition:"all 0.95s cubic-bezier(.4,0,.2,1)" }}>
            <div style={{ borderRadius:"4px 24px 4px 24px", overflow:"hidden", boxShadow:"0 28px 70px rgba(124,58,237,0.13)", height:"360px" }}>
              <img src="abtimg3.jpg" alt="Skillra" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center" }} />
            </div>
            <div style={{ position:"absolute", bottom:"-10px", right:"-10px", width:"120px", height:"120px", border:"2px solid rgba(124,58,237,0.15)", borderRadius:"0 0 20px 0", zIndex:0 }} />
            <div style={{ position:"absolute", bottom:"-28px", right:"-28px", background:"linear-gradient(135deg,#7c3aed,#5b21b6)", borderRadius:"14px", padding:"18px 22px", boxShadow:"0 14px 36px rgba(124,58,237,0.36)", zIndex:10 }}>
              <div style={{ fontSize:"20px", fontWeight:900, color:"#fff", lineHeight:1, letterSpacing:"-0.5px" }}>Est. 2024</div>
              <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.78)", marginTop:"3px", fontWeight:600 }}>Coimbatore, India</div>
            </div>
          </div>
          {/* Content */}
          <div style={{ flex:1, opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(28px)", transition:"all 0.9s ease 0.18s" }}>
            <SectionLabel text="OUR STORY" />
            <Divider />
            <h2 style={{ fontSize:"clamp(1.9rem,3vw,2.5rem)", fontWeight:900, color:"#1a1035", lineHeight:1.14, marginBottom:"22px", letterSpacing:"-0.03em" }}>
              Built With One Purpose:<br/><span style={{ color:"#7c3aed" }}>Your Career</span>
            </h2>
            <p style={{ fontSize:"15px", color:"#4b4466", lineHeight:1.88, marginBottom:"16px" }}>
              Skillra was born out of a simple but powerful frustration — thousands of graduates in tier-2 cities sitting on degrees but unable to find jobs because they lacked the <strong style={{ color:"#3b1f7a", fontWeight:700 }}>right, practical skills</strong> that employers demand.
            </p>
            <p style={{ fontSize:"15px", color:"#4b4466", lineHeight:1.88, marginBottom:"32px" }}>
              We built Skillra from the ground up with one mission: close that gap. Every course, every module, every mentor session is designed not just to teach — but to <strong style={{ color:"#1a1035", fontWeight:700 }}>prepare, certify, and place</strong>.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
              {[
                { year:"2024", event:"Skillra founded in Coimbatore by Bhuvaneshwari & Premchandar" },
                { year:"2024", event:"Launched AI Medical Coding & Billing with 100% placement guarantee" },
                { year:"2025", event:"Expanded to Technology & Finance; 50+ hiring partners onboarded" },
              ].map((item, i) => (
                <div key={i} style={{ display:"flex", gap:"16px", alignItems:"flex-start" }}>
                  <div style={{ flexShrink:0, background:"linear-gradient(135deg,#7c3aed,#5b21b6)", borderRadius:"20px", padding:"4px 12px", fontSize:"10.5px", fontWeight:800, color:"#fff", letterSpacing:"0.6px", marginTop:"2px" }}>{item.year}</div>
                  <p style={{ fontSize:"13.5px", color:"#5c4a80", lineHeight:1.65, fontWeight:500 }}>{item.event}</p>
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
   VISION & MISSION — alternating layout
═══════════════════════════════════════════════════ */
function VisionMissionSection() {
  const [ref, inView] = useInView(0.08);
  return (
    <section ref={ref} style={{ padding:"88px 0", background:"#faf8ff", borderTop:"1px solid #f0ebff", position:"relative" }}>
      <GridBg />
      <div style={{ maxWidth:"1180px", margin:"0 auto", padding:"0 6%", position:"relative", zIndex:1 }}>
        <div style={{ marginBottom:"52px", opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(24px)", transition:"all 0.7s ease" }}>
          <SectionLabel text="VISION & MISSION" />
          <h2 style={{ fontSize:"clamp(1.9rem,3.5vw,2.7rem)", fontWeight:900, color:"#120630", letterSpacing:"-0.03em" }}>
            What Drives <span style={{ color:"#7c3aed", fontStyle:"italic" }}>Everything</span> We Do
          </h2>
        </div>

        {/* VISION — image left, content right */}
        <div style={{ display:"flex", gap:"0", alignItems:"stretch", borderRadius:"28px", overflow:"hidden", boxShadow:"0 16px 56px rgba(124,58,237,0.10)", border:"1px solid #e4d9ff", marginBottom:"28px", opacity:inView?1:0, transform:inView?"translateX(0)":"translateX(-44px)", transition:"all 0.95s cubic-bezier(.4,0,.2,1) 0.1s", flexWrap:"wrap" }}>
          <div style={{ flex:"0 0 420px", minWidth:"260px", position:"relative", overflow:"hidden" }}>
            <img src="abtimg1.jpg" alt="Vision" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", display:"block", minHeight:"320px" }} />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,transparent 55%,rgba(250,248,255,0.25))" }} />
          </div>
          <div style={{ flex:1, background:"#fff", padding:"52px 52px 52px 56px", display:"flex", flexDirection:"column", justifyContent:"center", minWidth:"280px" }}>
            <SectionLabel text="VISION" />
            <Divider />
            <h3 style={{ fontSize:"clamp(1.5rem,2.2vw,1.9rem)", fontWeight:900, color:"#1a1035", lineHeight:1.22, marginBottom:"18px", letterSpacing:"-0.03em" }}>
              India's Most Trusted<br/><span style={{ color:"#7c3aed" }}>Career-Transformation</span> Institute
            </h3>
            <p style={{ fontSize:"14.5px", color:"#4b4466", lineHeight:1.85, fontWeight:500, marginBottom:"28px" }}>
              We envision a future where every student — regardless of their city, background, or starting point — has access to world-class training that guarantees them a seat at the professional table.
            </p>
            <div style={{ display:"flex", gap:"32px", flexWrap:"wrap" }}>
              {[["Accessible","Training for all cities"],["Certified","Tamper-proof credentials"],["Trusted","By 50+ employers"]].map(([h,s],i)=>(
                <div key={i}>
                  <div style={{ fontSize:"13px", fontWeight:800, color:"#7c3aed", marginBottom:"3px" }}>{h}</div>
                  <div style={{ fontSize:"11.5px", color:"#9270c0", fontWeight:500 }}>{s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MISSION — content left (dark), image right */}
        <div style={{ display:"flex", gap:"0", alignItems:"stretch", borderRadius:"28px", overflow:"hidden", boxShadow:"0 16px 56px rgba(45,27,105,0.18)", opacity:inView?1:0, transform:inView?"translateX(0)":"translateX(44px)", transition:"all 0.95s cubic-bezier(.4,0,.2,1) 0.22s", flexWrap:"wrap" }}>
          <div style={{ flex:1, background:"linear-gradient(155deg,#1a0a3c,#2d1b69)", padding:"52px 56px 52px 52px", display:"flex", flexDirection:"column", justifyContent:"center", minWidth:"280px" }}>
            <SectionLabel text="MISSION" light />
            <Divider light />
            <h3 style={{ fontSize:"clamp(1.5rem,2.2vw,1.9rem)", fontWeight:900, color:"#fff", lineHeight:1.22, marginBottom:"18px", letterSpacing:"-0.03em" }}>
              Deliver Training That Turns<br/><span style={{ color:"#c4b5fd" }}>Potential Into Placement</span>
            </h3>
            <p style={{ fontSize:"14.5px", color:"rgba(255,255,255,0.70)", lineHeight:1.85, fontWeight:500, marginBottom:"28px" }}>
              Practical, industry-aligned training in Healthcare IT, Technology, and Finance — backed by experienced mentors, real projects, and relentless placement support that follows every student until they're employed.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:"11px" }}>
              {["Curriculum updated every quarter with employer input","Dedicated placement cells with 50+ active employer ties","Affordable, accessible training from Coimbatore to India"].map((pt,i)=>(
                <div key={i} style={{ display:"flex", gap:"10px", alignItems:"flex-start" }}>
                  <div style={{ width:"17px", height:"17px", borderRadius:"50%", background:"rgba(124,58,237,0.45)", border:"1px solid rgba(167,139,250,0.45)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"2px" }}>
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{ fontSize:"13px", color:"rgba(255,255,255,0.72)", fontWeight:500, lineHeight:1.65 }}>{pt}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex:"0 0 420px", minWidth:"260px", position:"relative", overflow:"hidden" }}>
            <img src="abtimg2.jpg" alt="Mission" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", display:"block", minHeight:"320px" }} />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to left,transparent 55%,rgba(45,27,105,0.18))" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   LEADERSHIP — alternating layout
═══════════════════════════════════════════════════ */
function LeaderRow({ leader, index, inView }) {
  const isLeft = leader.imgLeft;
  const delay = 0.08 + index * 0.14;
  const fromX = isLeft ? -44 : 44;

  const ImageSide = () => (
    <div style={{ flex:"0 0 440px", minWidth:"260px", position:"relative" }}>
      <div style={{ position:"absolute", top:"-10px", [isLeft?"left":"right"]:"-10px", width:"80px", height:"80px", border:`2px solid ${leader.accentBorder}`, borderRadius: isLeft ? "4px 0 0 0" : "0 4px 0 0", zIndex:0 }} />
      <div style={{ position:"relative", zIndex:1, borderRadius:"4px 20px 4px 20px", overflow:"hidden", boxShadow:`0 28px 64px ${leader.accentColor}26`, height:"460px" }}>
        <img src={leader.img} alt={leader.name} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center", display:"block", transition:"transform 0.6s ease" }}
          onMouseEnter={e => { e.target.style.transform="scale(1.04)"; }}
          onMouseLeave={e => { e.target.style.transform="scale(1)"; }} />
        <div style={{ position:"absolute", bottom:"20px", [isLeft?"left":"right"]:"20px", background:"rgba(255,255,255,0.96)", backdropFilter:"blur(12px)", borderRadius:"12px", padding:"12px 18px", boxShadow:"0 8px 28px rgba(0,0,0,0.10)" }}>
          <div style={{ fontSize:"15px", fontWeight:900, color:"#1a1035", letterSpacing:"-0.3px" }}>{leader.name}</div>
          <div style={{ fontSize:"11px", fontWeight:700, color:leader.accentColor, letterSpacing:"0.06em", marginTop:"2px", textTransform:"uppercase" }}>{leader.title}</div>
        </div>
      </div>
      <div style={{ position:"absolute", bottom:"-12px", [isLeft?"right":"left"]:"-12px", width:"90px", height:"90px", border:`2px solid ${leader.accentBorder}`, borderRadius: isLeft ? "0 0 16px 0" : "0 0 0 16px", zIndex:0 }} />
    </div>
  );

  const ContentSide = () => (
    <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", padding: isLeft ? "0 0 0 16px" : "0 16px 0 0" }}>
      <SectionLabel text={leader.title.toUpperCase()} />
      <Divider />
      <h2 style={{ fontSize:"clamp(2rem,3.2vw,2.9rem)", fontWeight:900, color:"#1a1035", lineHeight:1.08, marginBottom:"20px", letterSpacing:"-0.04em" }}>
        {leader.name}
      </h2>
      <p style={{ fontSize:"15px", color:"#4b4466", lineHeight:1.9, marginBottom:"28px", fontWeight:500 }}>
        {leader.bio}
      </p>
      <div style={{ display:"flex", flexDirection:"column", gap:"13px", marginBottom:"32px" }}>
        {leader.credentials.map((c, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:"12px" }}>
            <div style={{ width:"36px", height:"1.5px", background:`linear-gradient(90deg,${leader.accentColor},transparent)`, flexShrink:0 }} />
            <span style={{ fontSize:"13.5px", fontWeight:600, color:"#3b2a6e" }}>{c}</span>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
        <button style={{ background:`linear-gradient(135deg,${leader.accentColor},${leader.accentColor}bb)`, color:"#fff", border:"none", borderRadius:"50px", padding:"11px 28px", fontSize:"13px", fontWeight:700, cursor:"pointer", letterSpacing:"0.4px", boxShadow:`0 6px 20px ${leader.accentColor}40`, transition:"all 0.22s" }}
          onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 12px 30px ${leader.accentColor}55`; }}
          onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=`0 6px 20px ${leader.accentColor}40`; }}>
          Connect
        </button>
        <button style={{ background:"transparent", color:"#3b1f7a", border:"1.5px solid #e4d9ff", borderRadius:"50px", padding:"11px 26px", fontSize:"13px", fontWeight:600, cursor:"pointer", transition:"all 0.22s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor="#7c3aed"; e.currentTarget.style.background="#f8f5ff"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor="#e4d9ff"; e.currentTarget.style.background="transparent"; }}>
          Learn More
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display:"flex", gap:"60px", alignItems:"center", flexWrap:"wrap", marginBottom:"96px", opacity:inView?1:0, transform:inView?"translateX(0)":`translateX(${fromX}px)`, transition:`all 0.95s cubic-bezier(.4,0,.2,1) ${delay}s` }}>
      {isLeft ? <><ImageSide /><ContentSide /></> : <><ContentSide /><ImageSide /></>}
    </div>
  );
}

function LeadershipSection() {
  const [ref, inView] = useInView(0.08);
  return (
    <section ref={ref} style={{ padding:"88px 0 24px", background:"#fff", borderTop:"1px solid #f0ebff", position:"relative" }}>
      <GridBg />
      <div style={{ maxWidth:"1180px", margin:"0 auto", padding:"0 6%", position:"relative", zIndex:1 }}>
        <div style={{ marginBottom:"64px", opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(24px)", transition:"all 0.7s ease" }}>
          <SectionLabel text="LEADERSHIP" />
          <h2 style={{ fontSize:"clamp(1.9rem,3.5vw,2.7rem)", fontWeight:900, color:"#120630", letterSpacing:"-0.03em", marginBottom:"12px" }}>
            The People Behind <span style={{ color:"#7c3aed" }}>Skillra</span>
          </h2>
          <p style={{ fontSize:"15px", color:"#9270c0", maxWidth:"460px", lineHeight:1.75, fontWeight:500 }}>
            Our founders bring together domain expertise and a shared commitment to transforming careers across India.
          </p>
        </div>
        {LEADERSHIP.map((leader, i) => (
          <LeaderRow key={i} leader={leader} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   COURSES OVERVIEW
═══════════════════════════════════════════════════ */
function CoursesOverviewSection() {
  const [ref, inView] = useInView(0.08);
  const [active, setActive] = useState(0);
  const current = COURSES_OVERVIEW[active];

  return (
    <section ref={ref} style={{ padding:"88px 0", background:"#faf8ff", borderTop:"1px solid #f0ebff", position:"relative" }}>
      <GridBg />
      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 6%", position:"relative", zIndex:1 }}>
        <div style={{ marginBottom:"52px", opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(24px)", transition:"all 0.7s ease" }}>
          <SectionLabel text="OUR COURSES" />
          <h2 style={{ fontSize:"clamp(1.9rem,3.5vw,2.7rem)", fontWeight:900, color:"#120630", letterSpacing:"-0.03em", marginBottom:"10px" }}>
            Programs Built for <span style={{ fontStyle:"italic", color:"#7c3aed" }}>Real Careers</span>
          </h2>
          <p style={{ fontSize:"15px", color:"#9270c0", maxWidth:"440px", lineHeight:1.75, fontWeight:500 }}>
            Three verticals. Nine programs. All designed with employers in mind.
          </p>
        </div>

        <div style={{ display:"flex", gap:"36px", alignItems:"flex-start", flexWrap:"wrap" }}>
          {/* Tab nav */}
          <div style={{ flex:"0 0 auto", display:"flex", flexDirection:"column", gap:"8px", width:"192px" }}>
            {COURSES_OVERVIEW.map((cat, i) => (
              <button key={i} onClick={() => setActive(i)} style={{ textAlign:"left", background:active===i?`linear-gradient(135deg,${cat.accentColor},${cat.accentColor}cc)`:"#fff", border:`1.5px solid ${active===i?cat.accentColor:"#e4d9ff"}`, borderRadius:"12px", padding:"13px 18px", fontSize:"14px", fontWeight:700, color:active===i?"#fff":"#3b1f7a", cursor:"pointer", transition:"all 0.22s", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                {cat.category}
                {active === i && (
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                )}
              </button>
            ))}
          </div>

          {/* Panel */}
          <div style={{ flex:1, minWidth:"300px" }}>
            <div style={{ background:"#fff", border:`1.5px solid ${current.accentBorder}`, borderRadius:"24px", overflow:"hidden", boxShadow:`0 12px 40px ${current.accentColor}12` }}>
              <div style={{ background:current.accentLight, borderBottom:`1px solid ${current.accentBorder}`, padding:"28px 36px" }}>
                <div style={{ fontSize:"11px", fontWeight:800, color:current.accentColor, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"6px" }}>{current.category} Courses</div>
                <h3 style={{ fontSize:"1.45rem", fontWeight:900, color:"#1a1035", letterSpacing:"-0.02em" }}>{current.tagline}</h3>
              </div>
              <div style={{ padding:"8px 0" }}>
                {current.courses.map((course, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"20px", padding:"22px 36px", borderBottom: i < current.courses.length - 1 ? "1px solid #f5f0ff" : "none", cursor:"pointer", transition:"background 0.18s" }}
                    onMouseEnter={e => { e.currentTarget.style.background=current.accentLight; }}
                    onMouseLeave={e => { e.currentTarget.style.background="transparent"; }}>
                    <div style={{ width:"34px", height:"34px", borderRadius:"10px", background:current.accentLight, border:`1.5px solid ${current.accentBorder}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <span style={{ fontSize:"12px", fontWeight:900, color:current.accentColor }}>{String(i+1).padStart(2,"0")}</span>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:"14.5px", fontWeight:800, color:"#1a1035", marginBottom:"4px" }}>{course.name}</div>
                      <div style={{ fontSize:"13px", color:"#6b5a9e", fontWeight:500, lineHeight:1.6 }}>{course.desc}</div>
                    </div>
                    <div style={{ flexShrink:0, marginTop:"6px" }}>
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke={current.accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding:"20px 36px", borderTop:`1px solid ${current.accentBorder}`, display:"flex", alignItems:"center", justifyContent:"space-between", background:current.accentLight }}>
                <span style={{ fontSize:"13px", color:"#6b5a9e", fontWeight:500 }}>All programs include placement support</span>
                <button style={{ background:current.accentColor, color:"#fff", border:"none", borderRadius:"24px", padding:"9px 20px", fontSize:"12px", fontWeight:800, cursor:"pointer", letterSpacing:"0.5px", transition:"all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.opacity="0.88"; e.currentTarget.style.transform="translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="translateY(0)"; }}>
                  EXPLORE ALL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   WHY SKILLRA
═══════════════════════════════════════════════════ */
function ValuesSection() {
  const [ref, inView] = useInView(0.08);
  return (
    <section ref={ref} style={{ padding:"88px 0", background:"#fff", borderTop:"1px solid #f0ebff", position:"relative" }}>
      <GridBg />
      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 6%", position:"relative", zIndex:1 }}>
        <div style={{ marginBottom:"52px", opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(24px)", transition:"all 0.7s ease" }}>
          <SectionLabel text="WHY SKILLRA" />
          <h2 style={{ fontSize:"clamp(1.9rem,3.5vw,2.7rem)", fontWeight:900, color:"#120630", letterSpacing:"-0.03em", marginBottom:"10px" }}>
            The Skillra <span style={{ color:"#7c3aed" }}>Difference</span>
          </h2>
          <p style={{ fontSize:"15px", color:"#9270c0", maxWidth:"440px", lineHeight:1.75, fontWeight:500 }}>
            Six commitments that set us apart from every other training institute.
          </p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", border:"1.5px solid #e4d9ff", borderRadius:"24px", overflow:"hidden" }}>
          {VALUES.map((v, i) => (
            <div key={i} style={{ padding:"36px 32px", borderRight: i % 2 === 0 ? "1px solid #e4d9ff" : "none", borderBottom: i < VALUES.length - 2 ? "1px solid #e4d9ff" : "none", background:"#fff", cursor:"default", opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(24px)", transition:`opacity 0.7s ease ${i * 0.07}s, transform 0.7s ease ${i * 0.07}s, background 0.22s` }}
              onMouseEnter={e => { e.currentTarget.style.background="#faf8ff"; }}
              onMouseLeave={e => { e.currentTarget.style.background="#fff"; }}>
              <div style={{ fontSize:"10.5px", fontWeight:800, color:"rgba(124,58,237,0.3)", letterSpacing:"0.14em", marginBottom:"16px" }}>{v.num}</div>
              <div style={{ width:"32px", height:"2px", background:"linear-gradient(90deg,#7c3aed,#a78bfa)", borderRadius:"99px", marginBottom:"16px" }} />
              <h4 style={{ fontSize:"15.5px", fontWeight:800, color:"#1a1035", marginBottom:"10px", letterSpacing:"-0.02em", lineHeight:1.3 }}>{v.title}</h4>
              <p style={{ fontSize:"13.5px", color:"#5c4a80", lineHeight:1.78, fontWeight:500 }}>{v.desc}</p>
            </div>
          ))}
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
  const handleSubscribe = () => { if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return; setSubscribing(true); setTimeout(() => { setSubscribing(false); setSubscribed(true); }, 1400); };
  return (
    <div ref={ref} style={{ background:"linear-gradient(135deg,#1a0a3c,#2d1b69,#1a0a3c)", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(167,139,250,0.08) 1px,transparent 1px)", backgroundSize:"22px 22px", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"2px", background:"linear-gradient(90deg,#7c3aed,#a78bfa,#7c3aed)", backgroundSize:"200% 100%", animation:"shimmer 3s linear infinite" }} />
      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"40px 6%", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"36px", flexWrap:"wrap", position:"relative", zIndex:1, opacity:inView?1:0, transition:"opacity 0.8s ease" }}>
        <div>
          <h2 style={{ fontSize:"clamp(1.2rem,2.2vw,1.6rem)", fontWeight:900, color:"#fff", lineHeight:1.1, letterSpacing:"-0.02em", marginBottom:"6px" }}>Join Our Newsletter</h2>
          <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.55)", fontWeight:500 }}>Get latest updates, course launches &amp; career tips.</p>
        </div>
        {subscribed ? (
          <div style={{ display:"flex", alignItems:"center", gap:"10px", background:"rgba(255,255,255,0.10)", border:"1.5px solid rgba(255,255,255,0.18)", borderRadius:"12px", padding:"12px 20px" }}>
            <div style={{ width:"24px", height:"24px", borderRadius:"50%", background:"#22c55e", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5 6-6" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <span style={{ color:"#fff", fontWeight:700, fontSize:"14px" }}>You're subscribed!</span>
          </div>
        ) : (
          <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubscribe()} placeholder="Enter your email"
              style={{ height:"46px", width:"clamp(200px,26vw,300px)", padding:"0 16px", fontSize:"14px", fontWeight:500, color:"#1a0640", background:"rgba(255,255,255,0.96)", border:"1.5px solid rgba(255,255,255,0.5)", borderRadius:"10px", outline:"none" }}
              onFocus={e => e.target.style.borderColor="#fff"} onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.5)"} />
            <button onClick={handleSubscribe} disabled={subscribing}
              style={{ height:"46px", background:"linear-gradient(135deg,#7c3aed,#5b21b6)", color:"#fff", border:"none", borderRadius:"10px", padding:"0 24px", fontSize:"13.5px", fontWeight:700, cursor:"pointer", whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:"8px", transition:"all 0.22s", boxShadow:"0 4px 16px rgba(124,58,237,0.4)" }}
              onMouseEnter={e => { e.currentTarget.style.opacity="0.9"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="translateY(0)"; }}>
              {subscribing ? "Subscribing…" : "Subscribe"}
              {!subscribing && <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE ROOT
═══════════════════════════════════════════════════ */
export default function AboutUsPage() {
  return (
    <div style={{ fontFamily:"'Outfit','Segoe UI',sans-serif", margin:0, padding:0, paddingTop:"62px", overflowX:"hidden", background:"#faf8ff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
        html, body { overflow-x:hidden; }
        @keyframes shimmer { 0%{background-position:-200% center}100%{background-position:200% center} }
        .sn, .sl { transition: color 0.3s; }
        @media (max-width: 860px) {
          .leader-row > div { flex-direction: column !important; gap: 40px !important; }
        }
        @media (max-width: 640px) {
          section { padding: 56px 0 !important; }
        }
      `}</style>
      <NavBar />
      <AboutHero />
      <CompanyStorySection />
      <VisionMissionSection />
      <LeadershipSection />
      <CoursesOverviewSection />
      <ValuesSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}