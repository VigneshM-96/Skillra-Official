import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PUB = process.env.PUBLIC_URL || "";

const NAV_LINKS = [
  { label: "About Us",        path: "/about-us"  },
  { label: "Course Offered",  path: "/courses",   hasMega: true },
  { label: "Career Guidance", path: "/career"    },
  { label: "Placement",       path: "/placement" },
  { label: "Campus",          path: "/campus"    },
  { label: "Books",           path: "/books"     },
  { label: "Blogs",           path: "/blog"      },
  { label: "Gallery",         path: "/gallery"},
  { label: "Contact Us",      path: "/contact-us" },
];

const MEGA_MENU = [
  {
    category: "Healthcare",
    color: "#7c3aed",
    courses: [
      { name: "AI Medical Coding", count: "200 + Registered", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>, slug: "ai-medical-coding-course" },
      { name: "AI Medical Billing", count: "100 + Registered", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>, slug: "ai-medical-billing-course" },
      { name: "AI Medical Scribing", count: "300 + Registered", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>, slug: "ai-medical-scribing-course" },
    ],
  },
  {
    category: "Information Technology",
    color: "#f97316",
    courses: [
      { name: "Full Stack Development", count: "150 + Registered", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>, slug: "full-stack-development-course" },
      { name: "Data Analytics", count: "120 + Registered", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>, slug: "data-analytics-course" },
      { name: "AI & Machine Learning", count: "90 + Registered", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>, slug: "ai-machine-learning-course" },
    ],
  },
  {
    category: "Finance",
    color: "#10b981",
    courses: [
      { name: "Tally & GST", count: "200 + Registered", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><path d="M9 7h6M9 11h6M9 15h4"/></svg>, slug: "tally-gst-course" },
      { name: "SAP ABAP", count: "60 + Registered", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8h4M7 11h2M13 8l2 3-2 3"/></svg>, slug: "sap-development-course" },
    ],
  },
  {
    category: "Others",
    color: "#f97316",
    courses: [
      { name: "UI/UX Design", count: "80 + Registered", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><circle cx="9" cy="15" r="2"/><path d="M13 13h4M13 17h4"/></svg>, slug: "ui-ux-design-course" },
      { name: "Personality Development", count: "250 + Registered", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M12 11v4M10 13h4"/></svg>, slug: "personality-development-course" },
      { name: "Digital Marketing", count: "200 + Registered", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 3-4-6-3 3H2"/><path d="M16 3l4 4-4 4"/></svg>, slug: "digital-marketing-course" },
    ],
  },
];

export default function NavBar() {
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [megaOpen,       setMegaOpen]       = useState(false);
  const [activeCategory, setActiveCategory] = useState("Healthcare");
  const [coursesOpen,    setCoursesOpen]    = useState(false); // mobile courses accordion
  const navigate  = useNavigate();
  const location  = useLocation();
  const megaRef   = useRef(null);
  const btnRef    = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (
        megaRef.current && !megaRef.current.contains(e.target) &&
        btnRef.current  && !btnRef.current.contains(e.target)
      ) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const fn = () => { if (window.innerWidth > 820) setMenuOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
    setCoursesOpen(false);
  }, [location.pathname]);

  const goTo = (e, path) => {
    e.preventDefault();
    navigate(path);
    setMenuOpen(false);
    setMegaOpen(false);
    setCoursesOpen(false);
  };

  const activeMega    = MEGA_MENU.find((m) => m.category === activeCategory);
  const activeCourses = activeMega ? activeMega.courses : [];
  const activeColor   = activeMega ? activeMega.color : "#7c3aed";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&display=swap');

        .skl-nav-link {
          position: relative;
          cursor: pointer;
          transition: color 0.2s;
          text-decoration: none;
          font-family: 'Outfit', sans-serif;
          display: flex;
          align-items: center;
        }
        .skl-nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: rgba(255,255,255,0.9);
          transition: width 0.25s;
          border-radius: 2px;
        }
        .skl-nav-link:hover::after,
        .skl-nav-link.active::after { width: 100%; }
        .skl-nav-link:hover { color: #fff !important; }

        .skl-chevron {
          display: inline-block;
          margin-left: 4px;
          transition: transform 0.25s;
          font-size: 10px;
          vertical-align: middle;
        }
        .skl-chevron.up { transform: rotate(180deg); }

        /* ── Mega Menu ── */
        .skl-mega {
          position: fixed;
          top: 84px;
          left: 50%;
          transform: translateX(-50%) translateY(-8px);
          width: 90%;
          max-width: 680px;
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08);
          z-index: 198;
          overflow: hidden;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.22s ease, transform 0.22s ease;
          border: 1.5px solid rgba(0,0,0,0.06);
        }
        .skl-mega.open {
          opacity: 1;
          pointer-events: all;
          transform: translateX(-50%) translateY(0);
        }
        .skl-mega-inner { display: flex; min-height: 240px; }

        .skl-mega-left {
          width: 210px;
          flex-shrink: 0;
          background: #f9f9fb;
          padding: 12px 0;
          border-right: 1px solid rgba(0,0,0,0.06);
        }
        .skl-cat-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 11px 18px;
          background: none;
          border: none;
          border-left: 3px solid transparent;
          text-align: left;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #6b7280;
          transition: all 0.18s;
        }
        .skl-cat-btn:hover { color: #111827; background: rgba(0,0,0,0.03); }
        .skl-cat-btn.active { font-weight: 700; }

        .skl-mega-right {
          flex: 1;
          padding: 14px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          align-content: start;
        }
        .skl-course-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 12px;
          cursor: pointer;
          border: 1.5px solid transparent;
          transition: all 0.2s;
          text-align: left;
          font-family: 'Outfit', sans-serif;
          text-decoration: none;
        }
        .skl-course-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.10);
        }
        .skl-course-icon {
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          background: #fff;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .skl-course-name  { font-size: 12px; font-weight: 700; color: #1e1b4b; line-height: 1.3; }
        .skl-course-count { font-size: 10.5px; font-weight: 500; color: #9ca3af; margin-top: 2px; }

        /* ── Logo ── */
        .skl-logo {
          cursor: pointer;
          user-select: none;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #fff;
          font-weight: 900;
          font-size: 19px;
          letter-spacing: 1px;
          flex-shrink: 0;
        }
        .skl-logo:hover .skl-logo-icon { transform: rotate(-8deg) scale(1.1); }
        .skl-logo-icon { transition: transform 0.25s; }

        /* ── Burger ── */
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
          width: 24px;
          height: 2.5px;
          background: #fff;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .skl-burger.open span:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
        .skl-burger.open span:nth-child(2) { opacity: 0; }
        .skl-burger.open span:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }

        /* ── Mobile Drawer ── */
        .skl-drawer {
          display: none;
          position: fixed;
          top: 78px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 32px);
          max-width: 700px;
          background: rgba(88,20,197,0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 199;
          overflow: hidden;
          max-height: 0;
          border-radius: 20px;
          box-shadow: 0 14px 44px rgba(72,16,165,0.45);
          transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .skl-drawer.open { max-height: 80vh; }

        .skl-drawer-link {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 15px 28px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.85);
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, padding-left 0.22s;
          text-decoration: none;
          box-sizing: border-box;
        }
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
        .skl-drawer-divider { height: 1px; background: rgba(255,255,255,0.1); margin: 6px 24px; }

        /* Courses accordion toggle row */
        .skl-courses-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 15px 28px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.85);
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          background: none;
          border-top: none;
          border-left: none;
          border-right: none;
          box-sizing: border-box;
          transition: background 0.2s, color 0.2s;
          text-align: left;
        }
        .skl-courses-toggle:hover {
          background: rgba(255,255,255,0.07);
          color: #fff;
        }
        .skl-courses-toggle.active-route {
          background: rgba(167,139,250,0.12);
          color: #fff;
          border-left: 3px solid #a78bfa;
          padding-left: 25px;
          font-weight: 700;
        }
        .skl-toggle-chevron {
          font-size: 11px;
          transition: transform 0.25s;
          opacity: 0.7;
        }
        .skl-toggle-chevron.open { transform: rotate(180deg); }

        /* Courses accordion body */
        .skl-courses-body {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.35s cubic-bezier(0.4,0,0.2,1);
          background: rgba(0,0,0,0.15);
        }
        .skl-courses-body.open { max-height: 1000px; }

        /* Category label inside drawer */
        .skl-drawer-cat-label {
          padding: 10px 28px 4px 20px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-family: 'Outfit', sans-serif;
          border-left-width: 3px;
          border-left-style: solid;
          margin-left: 16px;
          padding-left: 10px;
          margin-top: 6px;
        }

        /* Course item inside drawer */
        .skl-drawer-course {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 24px 10px 28px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.78);
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          transition: background 0.15s, color 0.15s, padding-left 0.2s;
          text-decoration: none;
          box-sizing: border-box;
        }
        .skl-drawer-course:hover {
          background: rgba(255,255,255,0.06);
          color: #fff;
          padding-left: 36px;
        }
        .skl-drawer-course-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-left: auto;
        }

        .skl-enroll-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 15px 28px;
          background: none;
          border: none;
          color: #ffb88c;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 700;
          text-align: left;
          cursor: pointer;
          transition: background 0.2s, padding-left 0.22s;
          text-decoration: none;
          box-sizing: border-box;
        }
        .skl-enroll-btn:hover {
          background: rgba(255,255,255,0.06);
          padding-left: 36px;
        }

        @media (max-width: 820px) {
          .skl-burger      { display: flex !important; }
          .skl-desktop-nav { display: none !important; }
          .skl-drawer      { display: block; }
          .skl-mega        { display: none !important; }
        }
      `}</style>

      {/* ── Floating Pill Navbar ── */}
      <div
        style={{
          position: "fixed",
          top: "16px",
          left: 0,
          right: 0,
          zIndex: 200,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
          fontFamily: "'Outfit','Segoe UI',sans-serif",
        }}
      >
        <nav
          style={{
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
          }}
        >
          {/* Logo */}
          <a href="/" className="skl-logo" onClick={(e) => goTo(e, "/")}>
            <div
              className="skl-logo-icon"
              style={{
                width: "30px",
                height: "30px",
                background: "rgba(255,255,255,0.15)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              <img
  src={"/logo.png"}
  alt="Skillra logo"
  style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            SKILLRA
          </a>

          <div style={{ width: "1px", height: "24px", background: "rgba(255,255,255,0.2)", flexShrink: 0 }} />

          {/* Desktop links */}
          <ul
            className="skl-desktop-nav"
            style={{
              display: "flex",
              gap: "20px",
              listStyle: "none",
              margin: 0,
              padding: 0,
              alignItems: "center",
            }}
          >
            {NAV_LINKS.map(({ label, path, hasMega }) => {
              const active =
                location.pathname === path ||
                (hasMega && location.pathname.startsWith("/courses"));
              return (
                <li key={label} ref={hasMega ? btnRef : null}>
                  <a
                    href={path}
                    className={`skl-nav-link${active ? " active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (hasMega) {
                        setMegaOpen((v) => !v);
                      } else {
                        navigate(path);
                        setMenuOpen(false);
                        setMegaOpen(false);
                      }
                    }}
                    style={{
                      color: active ? "#fff" : "rgba(255,255,255,.78)",
                      fontSize: "15px",
                      fontWeight: active ? 700 : 600,
                      letterSpacing: ".2px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {label}
                    {hasMega && (
                      <span className={`skl-chevron${megaOpen ? " up" : ""}`}>▾</span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Burger */}
          <button
            className={`skl-burger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </nav>
      </div>

      {/* ── Desktop Mega Menu ── */}
      <div ref={megaRef} className={`skl-mega${megaOpen ? " open" : ""}`}>
        <div className="skl-mega-inner">
          {/* Left categories */}
          <div className="skl-mega-left">
            {MEGA_MENU.map(({ category, color }) => (
              <button
                key={category}
                className={`skl-cat-btn${activeCategory === category ? " active" : ""}`}
                onMouseEnter={() => setActiveCategory(category)}
                onClick={() => setActiveCategory(category)}
                style={
                  activeCategory === category
                    ? { color, borderLeftColor: color, background: `${color}12` }
                    : {}
                }
              >
                {category}
              </button>
            ))}
          </div>

          {/* Right course cards */}
          <div className="skl-mega-right">
            {activeCourses.map((course, i) => (
              <a
                key={i}
                href={`/courses/${course.slug}`}
                className="skl-course-card"
                onClick={(e) => goTo(e, `/courses/${course.slug}`)}
                style={{ background: `${activeColor}10`, borderColor: `${activeColor}20` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background    = `${activeColor}20`;
                  e.currentTarget.style.borderColor   = `${activeColor}44`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background    = `${activeColor}10`;
                  e.currentTarget.style.borderColor   = `${activeColor}20`;
                }}
              >
                <div className="skl-course-icon">{course.icon}</div>
                <div>
                  <div className="skl-course-name">{course.name}</div>
                  <div className="skl-course-count">{course.count}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <div className={`skl-drawer${menuOpen ? " open" : ""}`}>

        {/* Regular nav links (skip "Course Offered" — handled separately) */}
        {NAV_LINKS.map(({ label, path, hasMega }) => {
          if (hasMega) {
            // Courses accordion toggle
            const courseActive = location.pathname.startsWith("/courses");
            return (
              <div key={label}>
                <button
                  className={`skl-courses-toggle${courseActive ? " active-route" : ""}`}
                  onClick={() => setCoursesOpen((v) => !v)}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {courseActive && (
                      <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#a78bfa", flexShrink: 0 }} />
                    )}
                    {label}
                  </span>
                  <span className={`skl-toggle-chevron${coursesOpen ? " open" : ""}`}>▾</span>
                </button>

                {/* Courses accordion body — grouped by category */}
                <div className={`skl-courses-body${coursesOpen ? " open" : ""}`}>
                  {MEGA_MENU.map(({ category, color, courses }) => (
                    <div key={category}>
                      {/* Category label */}
                      <div
                        className="skl-drawer-cat-label"
                        style={{ color, borderLeftColor: color }}
                      >
                        {category}
                      </div>

                      {/* Course items */}
                      {courses.map((c) => (
                        <a
                          key={c.slug}
                          href={`/courses/${c.slug}`}
                          className="skl-drawer-course"
                          onClick={(e) => goTo(e, `/courses/${c.slug}`)}
                        >
                          <span style={{ fontSize: "15px" }}>{c.icon}</span>
                          <span style={{ flex: 1 }}>{c.name}</span>
                          <span
                            className="skl-drawer-course-dot"
                            style={{ background: color }}
                          />
                        </a>
                      ))}
                    </div>
                  ))}

                  <div style={{ height: "8px" }} />
                </div>
              </div>
            );
          }

          // Normal nav link
          const active = location.pathname === path;
          return (
            <a
              key={label}
              href={path}
              className={`skl-drawer-link${active ? " active" : ""}`}
              onClick={(e) => goTo(e, path)}
            >
              {active && (
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#a78bfa", flexShrink: 0 }} />
              )}
              {label}
            </a>
          );
        })}

        <div className="skl-drawer-divider" />

        
      </div>

      <div style={{ height: "1px" }} />
    </>
  );
}