import { useState, useEffect } from "react";
import NavBar from "./NavBar";

/*
  ═══════════════════════════════════════════════════════════════
  HOW THIS WORKS:
  1. Place  Skillra_College_TieUps.xlsx  inside your /public/ folder
  2. Place all college logo images       inside your /public/ folder
  3. The page auto-loads the Excel on mount using SheetJS (CDN)
  4. Reads columns: S.No | College Name | Location | Stream | college_logo
  5. To update colleges: just edit the Excel — no code changes needed!
  ═══════════════════════════════════════════════════════════════
*/

const EXCEL_FILE = "/Skillra_College_TieUps.xlsx"; // file in /public/
const FILTERS    = ["All", "University", "Engineering", "Arts & Science", "Government"];

const TYPE_COLORS = {
  "University":    { bg:"#ede9ff", border:"#c4b5fd", text:"#5b21b6", dot:"#7c3aed" },
  "Engineering":   { bg:"#fff7ed", border:"#fed7aa", text:"#c2410c", dot:"#ea580c" },
  "Arts & Science":{ bg:"#f0fdf4", border:"#bbf7d0", text:"#166534", dot:"#16a34a" },
  "Government":    { bg:"#eff6ff", border:"#bfdbfe", text:"#1d4ed8", dot:"#3b82f6" },
};

const GRAD_PALETTE = [
  "linear-gradient(135deg,#7c3aed,#a78bfa)",
  "linear-gradient(135deg,#0ea5e9,#38bdf8)",
  "linear-gradient(135deg,#16a34a,#4ade80)",
  "linear-gradient(135deg,#ea580c,#fb923c)",
  "linear-gradient(135deg,#db2777,#f472b6)",
  "linear-gradient(135deg,#0891b2,#67e8f9)",
];

const getGrad = (sno) => GRAD_PALETTE[((sno || 1) - 1) % GRAD_PALETTE.length];
const getAbbr = (name = "") =>
  name.split(" ").filter(w => w.length > 2).map(w => w[0]).join("").slice(0, 3).toUpperCase() || "CLG";

/* ── Load SheetJS from CDN ── */
function loadSheetJS() {
  return new Promise((resolve, reject) => {
    if (window.XLSX) { resolve(window.XLSX); return; }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
    script.onload  = () => resolve(window.XLSX);
    script.onerror = () => reject(new Error("Failed to load SheetJS"));
    document.head.appendChild(script);
  });
}

/* ── Parse Excel → college array ── */
async function loadCollegesFromExcel(url) {
  const XLSX = await loadSheetJS();
  const res  = await fetch(url);
  if (!res.ok) throw new Error(`Cannot fetch ${url} — status ${res.status}`);
  const buf  = await res.arrayBuffer();
  const wb   = XLSX.read(buf, { type: "array" });

  const sheetName = wb.SheetNames.find(n => !n.toLowerCase().includes("legend")) || wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];

  /* Read as 2D array to find the real header row (skips title/instruction rows) */
  const raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });

  const headerRowIdx = raw.findIndex(row =>
    row.some(cell => String(cell).toLowerCase().includes("college name") || String(cell).toLowerCase() === "s.no")
  );

  if (headerRowIdx === -1) throw new Error("Could not find header row. Make sure Excel has S.No and College Name columns.");

  const headers  = raw[headerRowIdx].map(h => String(h).trim());
  const dataRows = raw.slice(headerRowIdx + 1);

  const col = (row, ...keys) => {
    for (const key of keys) {
      const idx = headers.findIndex(h => h.toLowerCase() === key.toLowerCase());
      if (idx !== -1 && row[idx] !== undefined && String(row[idx]).trim() !== "") {
        return String(row[idx]).trim();
      }
    }
    return "";
  };

  return dataRows
    .filter(row => col(row, "College Name", "college name", "College_Name").length > 0)
    .map((row, i) => ({
      sno:          Number(col(row, "S.No", "S No", "sno", "SNO")) || i + 1,
      name:         col(row, "College Name", "college name", "College_Name"),
      location:     col(row, "Location", "location", "City", "city"),
      stream:       col(row, "Stream", "stream", "Type", "type"),
      college_logo: col(row, "college_logo", "College Logo", "Logo", "logo"),
    }));
}

/* ── SVG Icons ── */
const IconBuilding   = ({ size=16, color="#7c3aed" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9M15 21V9"/></svg>);
const IconPin        = ({ size=13, color="#9270c0" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>);
const IconUsers      = ({ size=16, color="#7c3aed" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
const IconMap        = ({ size=16, color="#7c3aed" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>);
const IconSearch     = ({ size=16, color="#b9a8d4" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>);
const IconStar       = ({ size=13, color="#7c3aed" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>);
const IconArrowRight = ({ size=16, color="#7c3aed" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>);
const IconHandshake  = ({ size=18, color="white"   }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>);
const IconRefresh    = ({ size=16, color="#7c3aed" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>);

function TickerLogo({ college }) {
  const [err, setErr] = useState(false);
  return (
    <div style={{
      width:44, height:44, borderRadius:"10px",
      background: "transparent",          // ← transparent
      display:"flex", alignItems:"center", justifyContent:"center",
      flexShrink:0, overflow:"hidden",
    }}>
      {err ? (
  <span style={{ fontSize:"8px", fontWeight:900, color:"#9270c0", letterSpacing:"-0.5px" }}>
    {getAbbr(college.name)}
  </span>
) : (
        <img src={`/${college.college_logo}`} alt={college.name} style={{ width:"100%", height:"100%", objectFit:"contain", padding:"3px" }} onError={() => setErr(true)} />
      )}
    </div>
  );
}

/* ── College Card ── */
function CollegeCard({ college, delay }) {
  const [hovered,  setHovered]  = useState(false);
  const [visible,  setVisible]  = useState(false);
  const [imgError, setImgError] = useState(false);

  const c    = TYPE_COLORS[college.stream] || TYPE_COLORS["University"];
  const abbr = getAbbr(college.name);
  const grad = getGrad(college.sno);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:"#fff",
        border:`1.5px solid ${hovered ? c.border : "#e4d9ff"}`,
        borderRadius:"20px", padding:"22px 18px 18px",
        display:"flex", flexDirection:"column", alignItems:"center", gap:"12px",
        cursor:"default", position:"relative", overflow:"hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? (hovered ? "translateY(-8px) scale(1.025)" : "translateY(0) scale(1)") : "translateY(20px)",
        transition:`opacity 0.55s ease ${delay}ms, transform 0.30s cubic-bezier(.4,0,.2,1), border-color 0.22s, box-shadow 0.22s`,
        boxShadow: hovered ? "0 20px 48px rgba(124,58,237,0.16),0 4px 12px rgba(124,58,237,0.08)" : "0 4px 16px rgba(124,58,237,0.06)",
      }}
    >
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:grad, opacity:hovered?1:0, transition:"opacity 0.3s" }} />
      <div style={{ position:"absolute", top:"-20px", right:"-20px", width:"70px", height:"70px", borderRadius:"50%", background:`radial-gradient(circle,${c.bg} 0%,transparent 70%)`, opacity:hovered?1:0.5, transition:"opacity 0.3s", pointerEvents:"none" }} />
      

      {/* Logo */}
      <div style={{
  width:"64px", height:"64px", borderRadius:"14px",
  background: "transparent",   // ← was: grad
  display:"flex", alignItems:"center", justifyContent:"center",
  overflow:"hidden",
  boxShadow: "none",           // ← was: hovered ? "0 8px 28px..." : "0 4px 14px..."
  transform: hovered ? "scale(1.07)" : "scale(1)",
  transition:"transform 0.28s, box-shadow 0.28s",
  flexShrink:0,
}}>
        {imgError ? (
  <span style={{
    width:"64px", height:"64px", borderRadius:"14px",
    background: c.bg,
    display:"flex", alignItems:"center", justifyContent:"center",
    fontSize:"15px", fontWeight:900, color:c.text,
    fontFamily:"'Outfit',sans-serif", letterSpacing:"-0.5px",
  }}>
    {abbr}
  </span>
) : (
  <img
    src={`/${college.college_logo}`}
    alt={college.name}
    style={{ width:"100%", height:"100%", objectFit:"contain", padding:"8px" }}
    onError={() => setImgError(true)}
  />
)}
      </div>

      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:"12.5px", fontWeight:700, color:"#1a0640", lineHeight:1.35, marginBottom:"5px" }}>{college.name}</div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"4px" }}>
          <IconPin size={12} color="#9270c0" />
          <span style={{ fontSize:"11px", color:"#9270c0", fontWeight:500 }}>{college.location}</span>
        </div>
      </div>

      <div style={{ display:"inline-flex", alignItems:"center", gap:"5px", background:c.bg, border:`1px solid ${c.border}`, borderRadius:"50px", padding:"4px 11px", fontSize:"10px", fontWeight:700, color:c.text, letterSpacing:"0.03em" }}>
        <span style={{ width:5, height:5, borderRadius:"50%", background:c.dot, flexShrink:0 }} />
        {college.stream}
      </div>
    </div>
  );
}

/* ── Skeleton card shown while loading ── */
function SkeletonCard() {
  return (
    <div style={{ background:"#fff", border:"1.5px solid #e4d9ff", borderRadius:"20px", padding:"22px 18px 18px", display:"flex", flexDirection:"column", alignItems:"center", gap:"12px", boxShadow:"0 4px 16px rgba(124,58,237,0.06)" }}>
      <div style={{ width:64, height:64, borderRadius:"14px", background:"linear-gradient(90deg,#f0ebff,#e4d9ff,#f0ebff)", backgroundSize:"200% 100%", animation:"shimmer 1.4s infinite" }} />
      <div style={{ width:"80%", height:12, borderRadius:6, background:"linear-gradient(90deg,#f0ebff,#e4d9ff,#f0ebff)", backgroundSize:"200% 100%", animation:"shimmer 1.4s 0.1s infinite" }} />
      <div style={{ width:"55%", height:10, borderRadius:6, background:"linear-gradient(90deg,#f0ebff,#e4d9ff,#f0ebff)", backgroundSize:"200% 100%", animation:"shimmer 1.4s 0.2s infinite" }} />
      <div style={{ width:"60%", height:22, borderRadius:50, background:"linear-gradient(90deg,#f0ebff,#e4d9ff,#f0ebff)", backgroundSize:"200% 100%", animation:"shimmer 1.4s 0.3s infinite" }} />
    </div>
  );
}

/* ── Particles ── */
function Particles() {
  const items = Array.from({ length: 12 }, (_, i) => ({
    id:i, x:Math.random()*100, y:Math.random()*100,
    size:4+Math.random()*8, dur:`${6+Math.random()*7}s`, delay:`${Math.random()*4}s`,
  }));
  return (
    <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
      {items.map(p => (
        <div key={p.id} style={{ position:"absolute", left:`${p.x}%`, top:`${p.y}%`, width:p.size, height:p.size, borderRadius:"50%", background:"rgba(124,58,237,0.09)", animation:`floatP ${p.dur} ${p.delay} ease-in-out infinite` }} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
export default function CampusPage() {
  const [colleges,  setColleges]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [loadError, setLoadError] = useState("");
  const [filter,    setFilter]    = useState("All");
  const [visible,   setVisible]   = useState(false);
  const [search,    setSearch]    = useState("");

  /* ── Load Excel on mount ── */
  const fetchData = async () => {
    setLoading(true);
    setLoadError("");
    try {
      const data = await loadCollegesFromExcel(EXCEL_FILE);
      setColleges(data);
    } catch (err) {
      console.error(err);
      setLoadError(err.message || "Failed to load Excel file.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const filtered = colleges.filter(c => {
    const matchStream = filter === "All" || c.stream === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.location.toLowerCase().includes(q) || c.stream.toLowerCase().includes(q);
    return matchStream && matchSearch;
  });

  const districts = new Set(colleges.map(c => c.location)).size;

  /* unique streams from Excel (dynamic filter) */
  const streams = ["All", ...Array.from(new Set(colleges.map(c => c.stream).filter(Boolean)))];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        @keyframes floatP   { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-14px) scale(1.08)} }
        @keyframes shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes badgePop { from{opacity:0;transform:scale(0.8) translateY(6px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes tickerScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

        .campus-page { font-family:'Outfit',sans-serif; }

        .grid-bg {
          position:absolute; inset:0; pointer-events:none; z-index:0;
          background-image:
            linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px);
          background-size:32px 32px;
        }

        .filter-btn {
          padding:8px 20px; border-radius:50px; font-size:13px; font-weight:700;
          font-family:'Outfit',sans-serif; cursor:pointer;
          border:1.5px solid #e4d9ff; background:#fff; color:#5c4a80;
          transition:all 0.22s cubic-bezier(.4,0,.2,1);
        }
        .filter-btn:hover  { border-color:#a78bfa; color:#7c3aed; transform:translateY(-2px); box-shadow:0 4px 14px rgba(124,58,237,0.12); }
        .filter-btn.active { background:#7c3aed; color:#fff; border-color:#7c3aed; box-shadow:0 4px 16px rgba(124,58,237,0.28); }

        .college-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(195px,1fr)); gap:18px; }

        .ticker-wrap  { overflow:hidden; width:100%; -webkit-mask-image:linear-gradient(90deg,transparent,black 8%,black 92%,transparent); mask-image:linear-gradient(90deg,transparent,black 8%,black 92%,transparent); }
        .ticker-inner { display:flex; width:max-content; animation:tickerScroll 55s linear infinite; }
        .ticker-item { display:flex; align-items:center; gap:14px; padding:16px 40px; white-space:nowrap; font-size:15px; font-weight:600; color:#9270c0; }

        .search-input { width:100%; padding:13px 18px 13px 44px; font-size:14px; font-family:'Outfit',sans-serif; font-weight:500; color:#1a0640; background:#fff; border:1.5px solid #e4d9ff; border-radius:50px; outline:none; transition:all 0.25s ease; }
        .search-input:focus        { border-color:#7c3aed; box-shadow:0 0 0 4px rgba(124,58,237,0.09); }
        .search-input::placeholder { color:#b9a8d4; }

        .stat-card { transition:transform 0.25s,box-shadow 0.25s; }
        .stat-card:hover { transform:translateY(-5px); box-shadow:0 14px 36px rgba(124,58,237,0.16) !important; }

        .spin { animation:spin 1s linear infinite; }
      `}</style>

      <NavBar />

      <div className="campus-page" style={{ minHeight:"100vh", paddingTop:"62px", background:"radial-gradient(ellipse 80% 60% at 70% 20%,rgba(167,139,250,0.18) 0%,transparent 65%),radial-gradient(ellipse 50% 60% at 10% 80%,rgba(124,58,237,0.10) 0%,transparent 65%),#faf8ff", position:"relative", overflow:"hidden" }}>
        <div className="grid-bg" />
        <Particles />
        <div style={{ position:"absolute", top:"-8%",  right:"-5%", width:"420px", height:"420px", borderRadius:"50%", background:"radial-gradient(circle,rgba(167,139,250,0.14) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"5%", left:"-4%",  width:"300px", height:"300px", borderRadius:"50%", background:"radial-gradient(circle,rgba(124,58,237,0.08) 0%,transparent 70%)",  pointerEvents:"none" }} />

        <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"52px 48px 70px", position:"relative", zIndex:1 }}>

          {/* ── Header ── */}
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"32px", flexWrap:"wrap", marginBottom:"40px", opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(-18px)", transition:"all 0.8s cubic-bezier(.4,0,.2,1) 0.05s" }}>
            <div>
              <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"#fff", border:"1.5px solid #e4d9ff", borderRadius:"9px", padding:"8px 16px", fontSize:"12px", color:"#3b1f7a", fontWeight:700, marginBottom:"16px", boxShadow:"0 2px 12px rgba(124,58,237,0.10)", animation:visible?"badgePop 0.6s ease 0.2s both":"none" }}>
                <IconStar size={13} color="#7c3aed" />
                CAMPUS TIE-UPS
              </div>
              <h1 style={{ fontSize:"clamp(2rem,3.5vw,2.9rem)", fontWeight:900, color:"#120630", lineHeight:1.1, letterSpacing:"-0.03em", marginBottom:"12px" }}>
                Our College <span style={{ color:"#7c3aed" }}>Partners</span>
              </h1>
              <p style={{ fontSize:"15px", color:"#5c4a80", lineHeight:1.7, maxWidth:"480px", fontWeight:400 }}>
                Skillra has formal MoU tie-ups with{" "}
                <strong style={{ color:"#7c3aed" }}>{loading ? "..." : `${colleges.length}+`} institutions</strong>{" "}
                across Tamil Nadu, enabling direct campus recruitment drives, skill workshops, and certified training programs.
              </p>
            </div>

            {/* Stat cards */}
            <div style={{ display:"flex", gap:"14px", flexWrap:"wrap", opacity:visible?1:0, transition:"opacity 0.8s ease 0.35s" }}>
              {[
                { num: loading ? "—" : `${colleges.length}+`, label:"Colleges",        Icon:IconBuilding },
                { num:"5000+",                                  label:"Students Trained", Icon:IconUsers    },
                { num: loading ? "—" : `${districts}+`,        label:"Districts",        Icon:IconMap      },
              ].map((s, i) => (
                <div key={i} className="stat-card" style={{ background:"#fff", border:"1.5px solid #e4d9ff", borderRadius:"18px", padding:"18px 20px", textAlign:"center", minWidth:"106px", boxShadow:"0 4px 16px rgba(124,58,237,0.08)" }}>
                  <div style={{ display:"flex", justifyContent:"center", marginBottom:"6px" }}><s.Icon size={18} color="#7c3aed" /></div>
                  <div style={{ fontSize:"22px", fontWeight:900, color:"#7c3aed", lineHeight:1, letterSpacing:"-0.5px" }}>{s.num}</div>
                  <div style={{ fontSize:"11px", color:"#9270c0", marginTop:"4px", fontWeight:600 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Error banner ── */}
          {loadError && (
            <div style={{ background:"#fff0f0", border:"1.5px solid #fca5a5", borderRadius:"14px", padding:"16px 20px", marginBottom:"24px", display:"flex", alignItems:"center", gap:"14px", color:"#b91c1c" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:"13px" }}>Could not load Excel file</div>
                <div style={{ fontSize:"12px", marginTop:"3px", color:"#ef4444" }}>{loadError}</div>
                <div style={{ fontSize:"11px", marginTop:"4px", color:"#9270c0" }}>Make sure <strong>Skillra_College_TieUps.xlsx</strong> is in your <strong>/public/</strong> folder.</div>
              </div>
              <button onClick={fetchData} style={{ display:"flex", alignItems:"center", gap:"6px", background:"#fff", border:"1.5px solid #fca5a5", borderRadius:"50px", padding:"8px 16px", fontSize:"12px", fontWeight:700, color:"#b91c1c", cursor:"pointer", whiteSpace:"nowrap" }}>
                <IconRefresh size={13} color="#b91c1c" /> Retry
              </button>
            </div>
          )}

          {/* ── Search + Filter ── */}
          <div style={{ display:"flex", gap:"14px", alignItems:"center", flexWrap:"wrap", marginBottom:"28px", opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(12px)", transition:"all 0.7s ease 0.25s" }}>
            <div style={{ position:"relative", flex:"0 0 auto", width:"250px" }}>
              <div style={{ position:"absolute", left:"16px", top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
                <IconSearch size={15} color="#b9a8d4" />
              </div>
              <input className="search-input" placeholder="Search college or city…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
              {/* Use dynamic streams from Excel, fallback to defaults */}
              {(loading ? FILTERS : streams).map(f => (
                <button key={f} className={`filter-btn${filter===f?" active":""}`} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>

            <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:"10px" }}>
              {loading && <div className="spin"><IconRefresh size={14} color="#9270c0" /></div>}
              <span style={{ fontSize:"13px", color:"#9270c0", fontWeight:600 }}>
                {loading ? "Loading…" : `${filtered.length} institution${filtered.length!==1?"s":""}`}
              </span>
            </div>
          </div>

          {/* ── College Grid ── */}
          {loading ? (
            /* Skeleton placeholders */
            <div className="college-grid">
              {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length > 0 ? (
            <div className="college-grid">
              {filtered.map((college, i) => (
                <CollegeCard key={`${college.sno}-${college.name}`} college={college} delay={Math.min(i * 35, 600)} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign:"center", padding:"60px 0" }}>
              <IconSearch size={40} color="#c4b5fd" />
              <div style={{ fontSize:"16px", fontWeight:700, color:"#5c4a80", marginTop:"16px" }}>No colleges found</div>
              <div style={{ fontSize:"13px", color:"#9270c0", marginTop:"6px" }}>Try a different search or filter</div>
            </div>
          )}

          {/* ── Ticker ── */}
          {!loading && colleges.length > 0 && (
            <div style={{
  marginTop:"52px", paddingTop:"32px", borderTop:"1.5px solid #e4d9ff",
  background:"#fff",              // ← add this
  borderRadius:"20px",            // ← add this
  padding:"24px 0",               // ← add this
  border:"1.5px solid #e4d9ff",  // ← add this
  boxShadow:"0 4px 16px rgba(124,58,237,0.06)", // ← add this
  opacity:visible?1:0, transition:"opacity 0.9s ease 0.6s",
}}>
              <div style={{ textAlign:"center", marginBottom:"18px" }}>
                <span style={{ fontSize:"11px", fontWeight:700, color:"#b9a8d4", letterSpacing:"0.12em" }}>
                  TRUSTED BY INSTITUTIONS ACROSS TAMIL NADU
                </span>
              </div>
              <div className="ticker-wrap">
                <div className="ticker-inner">
                  {[...colleges, ...colleges].map((c, i) => (
                    <div key={i} className="ticker-item">
                      <TickerLogo college={c} />
                      {c.name}
                      <span style={{ width:4, height:4, borderRadius:"50%", background:"#e4d9ff", flexShrink:0 }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── CTA Banner ── */}
          <div style={{ marginTop:"44px", background:"linear-gradient(135deg,#7c3aed 0%,#5b21b6 100%)", borderRadius:"24px", padding:"38px 44px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"24px", flexWrap:"wrap", boxShadow:"0 16px 48px rgba(124,58,237,0.28)", position:"relative", overflow:"hidden", opacity:visible?1:0, transition:"opacity 0.9s ease 0.7s" }}>
            <div style={{ position:"absolute", top:"-40px",   right:"-40px", width:"200px", height:"200px", borderRadius:"50%", background:"rgba(255,255,255,0.07)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", bottom:"-30px", left:"30%",   width:"140px", height:"140px", borderRadius:"50%", background:"rgba(255,255,255,0.05)", pointerEvents:"none" }} />

            <div style={{ position:"relative", zIndex:1, display:"flex", alignItems:"center", gap:"18px" }}>
              <div style={{ width:48, height:48, borderRadius:"14px", background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <IconHandshake size={22} color="white" />
              </div>
              <div>
                <h3 style={{ fontSize:"clamp(1.2rem,2.5vw,1.7rem)", fontWeight:900, color:"#fff", marginBottom:"6px", letterSpacing:"-0.02em" }}>
                  Want to partner with Skillra?
                </h3>
                <p style={{ fontSize:"14px", color:"rgba(255,255,255,0.72)", fontWeight:400, maxWidth:"420px", lineHeight:1.65 }}>
                  Sign an MoU with us and bring industry-ready training directly to your campus. Placement support included.
                </p>
              </div>
            </div>

            <button
              style={{ background:"#fff", color:"#7c3aed", border:"none", borderRadius:"50px", padding:"14px 28px", fontSize:"14px", fontWeight:800, fontFamily:"'Outfit',sans-serif", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0, boxShadow:"0 6px 20px rgba(0,0,0,0.16)", transition:"transform 0.22s,box-shadow 0.22s", position:"relative", zIndex:1, display:"flex", alignItems:"center", gap:"8px" }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px) scale(1.04)"; e.currentTarget.style.boxShadow="0 12px 32px rgba(0,0,0,0.22)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0) scale(1)";       e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.16)"; }}
            >
              Partner With Us
              <IconArrowRight size={15} color="#7c3aed" />
            </button>
          </div>

        </div>
      </div>
    </>
  );
}