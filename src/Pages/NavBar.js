import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "About Us",        path: "/about"     },
  { label: "Course Offered",  path: "/courses"   },
  { label: "Contact Us",      path: "/contact"   },
  { label: "Career Guidance", path: "/career"    },
  { label: "Placement",       path: "/placement" },
  { label: "Campus",          path: "/campus"    },
  { label: "Books",          path: "/books"    },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fn = () => { if (window.innerWidth > 820) setMenuOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const goTo = (path) => { navigate(path); setMenuOpen(false); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&display=swap');

        .skl-nav-link {
          position: relative;
          cursor: pointer;
          transition: color 0.2s;
          background: none;
          border: none;
          padding: 0;
          font-family: 'Outfit', sans-serif;
        }
        .skl-nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 0; height: 2px;
          background: rgba(255,255,255,0.9);
          transition: width 0.25s;
          border-radius: 2px;
        }
        .skl-nav-link:hover::after,
        .skl-nav-link.active::after { width: 100%; }
        .skl-nav-link:hover { color: #fff !important; }

        .skl-logo { cursor: pointer; user-select: none; }
        .skl-logo:hover .skl-logo-icon { transform: rotate(-8deg) scale(1.1); }
        .skl-logo-icon { transition: transform 0.25s; }

        .skl-burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 4px;
          background: none;
          border: none;
        }
        .skl-burger span {
          display: block;
          width: 24px; height: 2.5px;
          background: #fff;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .skl-burger.open span:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
        .skl-burger.open span:nth-child(2) { opacity: 0; }
        .skl-burger.open span:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }

        .skl-drawer {
          display: none;
          position: fixed;
          top: 78px; left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 32px);
          max-width: 700px;
          background: rgba(88, 20, 197, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 199;
          overflow: hidden;
          max-height: 0;
          border-radius: 20px;
          box-shadow: 0 14px 44px rgba(72,16,165,0.45);
          transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .skl-drawer.open { max-height: 580px; }

        .skl-drawer-link {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 15px 28px;
          background: none;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.85);
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, padding-left 0.22s;
        }
        .skl-drawer-link:last-of-type { border-bottom: none; }
        .skl-drawer-link:hover {
          background: rgba(255,255,255,0.07);
          color: #fff;
          padding-left: 36px;
        }
        .skl-drawer-link.active {
          background: rgba(167,139,250,0.12);
          color: #fff;
          border-left: 3px solid #a78bfa;
          padding-left: 25px;
          font-weight: 700;
        }
        .skl-drawer-divider {
          height: 1px;
          background: rgba(255,255,255,0.1);
          margin: 6px 24px;
        }
        .skl-enroll-btn {
          display: flex; align-items: center; gap: 10px;
          width: 100%;
          padding: 15px 28px;
          background: none; border: none;
          color: #ffb88c;
          font-family: 'Outfit', sans-serif;
          font-size: 15px; font-weight: 700;
          text-align: left; cursor: pointer;
          transition: background 0.2s, padding-left 0.22s;
        }
        .skl-enroll-btn:hover {
          background: rgba(255,255,255,0.06);
          padding-left: 36px;
        }

        @media (max-width: 820px) {
          .skl-burger      { display: flex !important; }
          .skl-desktop-nav { display: none !important; }
          .skl-drawer      { display: block; }
        }
      `}</style>

      {/* ══ Floating Pill Navbar ══ */}
      <div style={{
        position: "fixed",
        top: "16px",
        left: 0,
        right: 0,
        zIndex: 200,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        fontFamily: "'Outfit','Segoe UI',sans-serif",
      }}>
        <nav style={{
          pointerEvents: "all",
          background: "#6A11CB",
          borderRadius: "999px",
          padding: "0 36px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "32px",
          boxShadow: "0 8px 32px rgba(72,16,165,0.35), 0 2px 8px rgba(0,0,0,0.12)",
          width: "90%",
          maxWidth: "1100px",
        }}>

          {/* Logo */}
          <div className="skl-logo" onClick={() => goTo("/")}
            style={{ display:"flex", alignItems:"center", gap:"8px", color:"#fff", fontWeight:900, fontSize:"19px", letterSpacing:"1px", flexShrink:0 }}>
            <div className="skl-logo-icon" style={{ width:"30px", height:"30px", background:"rgba(255,255,255,0.15)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, overflow:"hidden" }}>
              <img
                src={`${process.env.PUBLIC_URL}/logo.png`}
                alt="Skillra logo"
                style={{ width:"100%", height:"100%", objectFit:"cover" }}
              />
            </div>
            SKILLRA
          </div>

          {/* Divider */}
          <div style={{ width:"1px", height:"24px", background:"rgba(255,255,255,0.2)", flexShrink:0 }} />

          {/* Desktop nav links */}
          <ul className="skl-desktop-nav" style={{ display:"flex", gap:"20px", listStyle:"none", margin:0, padding:0, alignItems:"center" }}>
            {NAV_LINKS.map(({ label, path }) => {
              const active = location.pathname === path;
              return (
                <li key={label}>
                  <button
                    className={`skl-nav-link${active ? " active" : ""}`}
                    onClick={() => goTo(path)}
                    style={{
                      color: active ? "#fff" : "rgba(255,255,255,.78)",
                      fontSize: "13px",
                      fontWeight: active ? 700 : 600,
                      letterSpacing: ".2px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Hamburger (mobile) */}
          <button
            className={`skl-burger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </nav>
      </div>

      {/* ══ Mobile Drawer ══ */}
      <div className={`skl-drawer${menuOpen ? " open" : ""}`}>
        {NAV_LINKS.map(({ label, path }) => {
          const active = location.pathname === path;
          return (
            <button
              key={label}
              className={`skl-drawer-link${active ? " active" : ""}`}
              onClick={() => goTo(path)}
            >
              {active && (
                <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#a78bfa", flexShrink:0 }} />
              )}
              {label}
            </button>
          );
        })}
        <div className="skl-drawer-divider" />
        <button className="skl-enroll-btn" onClick={() => goTo("/")}>
          🎓 Enroll Now
        </button>
      </div>

      {/* Spacer */}
      <div style={{ height: "1px" }} />
    </>
  );
}