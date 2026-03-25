import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "About Us",        path: "/about"     },
  { label: "Course Offered",  path: "/courses",   hasMega: true },
  { label: "Contact Us",      path: "/contact"   },
  { label: "Career Guidance", path: "/career"    },
  { label: "Placement",       path: "/placement" },
  { label: "Campus",          path: "/campus"    },
  { label: "Books",           path: "/books"     },
];

const MEGA_MENU = [
  {
    category: "Healthcare",
    color: "#7c3aed",
    courses: [
      { name: "AI Medical Coding",    count: "200 + Registered", icon: "🩺", slug: "ai-medical-coding"   },
      { name: "AI Medical Billing",   count: "100 + Registered", icon: "🧾", slug: "ai-medical-billing"  },
      { name: "AI Medical Scribing",  count: "300 + Registered", icon: "📋", slug: "ai-medical-scribing" },
      { name: "AI In Healthcare",     count: "400 + Registered", icon: "🏥", slug: "ai-in-healthcare"    },
    ],
  },
  {
    category: "Information Technology",
    color: "#f97316",
    courses: [
      { name: "Full Stack Development", count: "150 + Registered", icon: "💻", slug: "full-stack-development" },
      { name: "Data Analytics",         count: "120 + Registered", icon: "📊", slug: "data-analytics"         },
      { name: "SAP Development",        count: "80 + Registered",  icon: "⚙️",  slug: "sap-development"        },
      { name: "AI & Machine Learning",  count: "90 + Registered",  icon: "🤖", slug: "ai-machine-learning"    },
    ],
  },
  {
    category: "Finance",
    color: "#10b981",
    courses: [
      { name: "Tally & GST",        count: "200 + Registered", icon: "📒", slug: "tally-gst"          },
      { name: "Financial Modeling", count: "60 + Registered",  icon: "📈", slug: "financial-modeling" },
    ],
  },
  {
    category: "Self Development",
    color: "#f97316",
    courses: [
      { name: "Personality Development", count: "250 + Registered", icon: "🌟", slug: "personality-development" },
    ]
  },
];

export default function NavBar() {
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [megaOpen,       setMegaOpen]       = useState(false);
  const [activeCategory, setActiveCategory] = useState("Healthcare");
  const navigate  = useNavigate();
  const location  = useLocation();
  const megaRef   = useRef(null);
  const btnRef    = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (
        megaRef.current && !megaRef.current.contains(e.target) &&
        btnRef.current  && !btnRef.current.contains(e.target)
      ) setMegaOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const fn = () => { if (window.innerWidth > 820) setMenuOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); setMegaOpen(false); }, [location.pathname]);

  const goTo = (path) => { navigate(path); setMenuOpen(false); setMegaOpen(false); };

  const activeMega    = MEGA_MENU.find(m => m.category === activeCategory);
  const activeCourses = activeMega?.courses || [];
  const activeColor   = activeMega?.color || "#7c3aed";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&display=swap');

        
        .skl-nav-link {
          position: relative; cursor: pointer;
          transition: color 0.2s; background: none;
          border: none; padding: 0;
          font-family: 'Outfit', sans-serif;
        }
        .skl-nav-link::after {
          content: ''; position: absolute;
          bottom: -4px; left: 0; width: 0; height: 2px;
          background: rgba(255,255,255,0.9);
          transition: width 0.25s; border-radius: 2px;
        }
        .skl-nav-link:hover::after,
        .skl-nav-link.active::after { width: 100%; }
        .skl-nav-link:hover { color: #fff !important; }

        .skl-chevron {
          display: inline-block; margin-left: 4px;
          transition: transform 0.25s; font-size: 10px; vertical-align: middle;
        }
        .skl-chevron.up { transform: rotate(180deg); }

        .skl-mega {
          position: fixed; top: 84px; left: 50%;
          transform: translateX(-50%) translateY(-8px);
          width: 90%; max-width: 680px;
          background: #fff; border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08);
          z-index: 198; overflow: hidden;
          opacity: 0; pointer-events: none;
          transition: opacity 0.22s ease, transform 0.22s ease;
          border: 1.5px solid rgba(0,0,0,0.06);
        }
        .skl-mega.open {
          opacity: 1; pointer-events: all;
          transform: translateX(-50%) translateY(0);
        }
        .skl-mega-inner { display: flex; min-height: 240px; }

        .skl-mega-left {
          width: 210px; flex-shrink: 0;
          background: #f9f9fb; padding: 12px 0;
          border-right: 1px solid rgba(0,0,0,0.06);
        }
        .skl-cat-btn {
          display: flex; align-items: center; gap: 8px;
          width: 100%; padding: 11px 18px;
          background: none; border: none; border-left: 3px solid transparent;
          text-align: left; cursor: pointer;
          font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 600;
          color: #6b7280; transition: all 0.18s;
        }
        .skl-cat-btn:hover { color: #111827; background: rgba(0,0,0,0.03); }
        .skl-cat-btn.active { font-weight: 700; }
        .skl-cat-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

        .skl-mega-right {
          flex: 1; padding: 14px;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 10px; align-content: start;
        }
        .skl-course-card {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 12px;
          cursor: pointer; border: 1.5px solid transparent;
          transition: all 0.2s; text-align: left;
          font-family: 'Outfit', sans-serif;
        }
        .skl-course-card:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.10); }
        .skl-course-icon {
          width: 36px; height: 36px; flex-shrink: 0;
          background: #fff; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 17px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .skl-course-name { font-size: 12px; font-weight: 700; color: #1e1b4b; line-height: 1.3; }
        .skl-course-count { font-size: 10.5px; font-weight: 500; color: #9ca3af; margin-top: 2px; }

        .skl-logo { cursor: pointer; user-select: none; }
        .skl-logo:hover .skl-logo-icon { transform: rotate(-8deg) scale(1.1); }
        .skl-logo-icon { transition: transform 0.25s; }

        .skl-burger {
          display: none; flex-direction: column;
          gap: 5px; cursor: pointer; padding: 4px;
          background: none; border: none;
        }
        .skl-burger span {
          display: block; width: 24px; height: 2.5px;
          background: #fff; border-radius: 2px; transition: all 0.3s ease;
        }
        .skl-burger.open span:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
        .skl-burger.open span:nth-child(2) { opacity: 0; }
        .skl-burger.open span:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }

        .skl-drawer {
          display: none; position: fixed;
          top: 78px; left: 50%; transform: translateX(-50%);
          width: calc(100% - 32px); max-width: 700px;
          background: rgba(88,20,197,0.98);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          z-index: 199; overflow: hidden; max-height: 0;
          border-radius: 20px;
          box-shadow: 0 14px 44px rgba(72,16,165,0.45);
          transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .skl-drawer.open { max-height: 700px; }

        .skl-drawer-link {
          display: flex; align-items: center; gap: 10px;
          width: 100%; padding: 15px 28px;
          background: none; border: none;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.85);
          font-family: 'Outfit', sans-serif;
          font-size: 15px; font-weight: 600;
          text-align: left; cursor: pointer;
          transition: background 0.2s, color 0.2s, padding-left 0.22s;
        }
        .skl-drawer-link:last-of-type { border-bottom: none; }
        .skl-drawer-link:hover { background: rgba(255,255,255,0.07); color: #fff; padding-left: 36px; }
        .skl-drawer-link.active {
          background: rgba(167,139,250,0.12); color: #fff;
          border-left: 3px solid #a78bfa; padding-left: 25px; font-weight: 700;
        }
        .skl-drawer-divider { height: 1px; background: rgba(255,255,255,0.1); margin: 6px 24px; }
        .skl-enroll-btn {
          display: flex; align-items: center; gap: 10px;
          width: 100%; padding: 15px 28px;
          background: none; border: none; color: #ffb88c;
          font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700;
          text-align: left; cursor: pointer;
          transition: background 0.2s, padding-left 0.22s;
        }
        .skl-enroll-btn:hover { background: rgba(255,255,255,0.06); padding-left: 36px; }

        @media (max-width: 820px) {
          .skl-burger      { display: flex !important; }
          .skl-desktop-nav { display: none !important; }
          .skl-drawer      { display: block; }
          .skl-mega        { display: none !important; }
        }
      `}</style>

      {/* ══ Floating Pill Navbar ══ */}
      <div style={{
        position: "fixed", top: "16px", left: 0, right: 0,
        zIndex: 200, display: "flex", justifyContent: "center",
        pointerEvents: "none", fontFamily: "'Outfit','Segoe UI',sans-serif",
      }}>
        <nav style={{
          pointerEvents: "all", background: "#6A11CB",
          borderRadius: "999px", padding: "0 36px", height: "60px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "32px",
          boxShadow: "0 8px 32px rgba(72,16,165,0.35), 0 2px 8px rgba(0,0,0,0.12)",
          width: "90%", maxWidth: "1100px",
        }}>
          {/* Logo */}
          <div className="skl-logo" onClick={() => goTo("/")}
            style={{ display:"flex", alignItems:"center", gap:"8px", color:"#fff", fontWeight:900, fontSize:"19px", letterSpacing:"1px", flexShrink:0 }}>
            <div className="skl-logo-icon" style={{ width:"30px", height:"30px", background:"rgba(255,255,255,0.15)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, overflow:"hidden" }}>
              <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Skillra logo" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            </div>
            SKILLRA
          </div>

          <div style={{ width:"1px", height:"24px", background:"rgba(255,255,255,0.2)", flexShrink:0 }} />

          {/* Desktop links */}
          <ul className="skl-desktop-nav" style={{ display:"flex", gap:"20px", listStyle:"none", margin:0, padding:0, alignItems:"center" }}>
            {NAV_LINKS.map(({ label, path, hasMega }) => {
              const active = location.pathname === path || (hasMega && location.pathname.startsWith("/courses"));
              return (
                <li key={label}>
                  <button
                    ref={hasMega ? btnRef : null}
                    className={`skl-nav-link${active ? " active" : ""}`}
                    onClick={() => hasMega ? setMegaOpen(v => !v) : goTo(path)}
                    style={{
                      color: active ? "#fff" : "rgba(255,255,255,.78)",
                      fontSize: "13px", fontWeight: active ? 700 : 600,
                      letterSpacing: ".2px", whiteSpace: "nowrap",
                      display: "flex", alignItems: "center",
                    }}
                  >
                    {label}
                    {hasMega && <span className={`skl-chevron${megaOpen ? " up" : ""}`}>▾</span>}
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            className={`skl-burger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </nav>
      </div>

      {/* ══ Mega Menu ══ */}
      <div ref={megaRef} className={`skl-mega${megaOpen ? " open" : ""}`}>
        <div className="skl-mega-inner">
          {/* Left */}
          <div className="skl-mega-left">
            {MEGA_MENU.map(({ category, color }) => (
              <button
  key={category}
  className={`skl-cat-btn${activeCategory === category ? " active" : ""}`}
  onMouseEnter={() => setActiveCategory(category)}
  onClick={() => setActiveCategory(category)}
  style={activeCategory === category ? {
    color, borderLeftColor: color, background: `${color}12`,
  } : {}}
>
  {category}
</button>
            ))}
          </div>

          {/* Right */}
          <div className="skl-mega-right">
            {activeCourses.map((course, i) => (
              <div
                key={i}
                className="skl-course-card"
                onClick={() => goTo(`/courses/${course.slug}`)}
                style={{ background: `${activeColor}10`, borderColor: `${activeColor}20` }}
                onMouseEnter={e => { e.currentTarget.style.background = `${activeColor}20`; e.currentTarget.style.borderColor = `${activeColor}44`; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${activeColor}10`; e.currentTarget.style.borderColor = `${activeColor}20`; }}
              >
                <div className="skl-course-icon">{course.icon}</div>
                <div>
                  <div className="skl-course-name">{course.name}</div>
                  <div className="skl-course-count">{course.count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>

      {/* ══ Mobile Drawer ══ */}
      <div className={`skl-drawer${menuOpen ? " open" : ""}`}>
        {NAV_LINKS.map(({ label, path }) => {
          const active = location.pathname === path;
          return (
            <button key={label} className={`skl-drawer-link${active ? " active" : ""}`} onClick={() => goTo(path)}>
              {active && <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#a78bfa", flexShrink:0 }} />}
              {label}
            </button>
          );
        })}
        <div className="skl-drawer-divider" />
        <div style={{ padding: "8px 28px 4px", fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", fontFamily: "'Outfit', sans-serif" }}>
          COURSES
        </div>
        {MEGA_MENU.map(({ color, courses }) =>
          courses.map(c => (
            <button
              key={c.slug} className="skl-drawer-link"
              onClick={() => goTo(`/courses/${c.slug}`)}
              style={{ fontSize: "13px", padding: "11px 28px" }}
            >
              <span style={{ fontSize: "14px" }}>{c.icon}</span>
              <span style={{ flex: 1 }}>{c.name}</span>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, flexShrink: 0 }} />
            </button>
          ))
        )}
        <div className="skl-drawer-divider" />
        <button className="skl-enroll-btn" onClick={() => goTo("/")}>🎓 Enroll Now</button>
      </div>

      <div style={{ height: "1px" }} />
    </>
  );
}