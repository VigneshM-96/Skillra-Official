import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const PUB = process.env.PUBLIC_URL || "";

/* ═══════════════════════════════════════════
   ICON COMPONENTS
═══════════════════════════════════════════ */
const IcoFacebook  = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>);
const IcoInstagram = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>);
const IcoLinkedIn  = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>);
const IcoTwitterX  = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/></svg>);
const IcoYouTube   = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>);
const IcoChevron   = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>);

/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */
const SOCIALS = [
  { Icon: IcoFacebook,  color: "#1877f2", label: "Facebook",  url: "https://www.facebook.com/skillratechnologies/"          },
  { Icon: IcoInstagram, color: "#e1306c", label: "Instagram", url: "https://www.instagram.com/skillra_technologies/"        },
  { Icon: IcoLinkedIn,  color: "#0a66c2", label: "LinkedIn",  url: "https://www.linkedin.com/company/skillra-technologies/" },
  { Icon: IcoTwitterX,  color: "#000000", label: "X",         url: "https://x.com/skillra_tech"                            },
  { Icon: IcoYouTube,   color: "#ff0000", label: "YouTube",   url: "https://www.youtube.com/@skillratechnologies"           },
];

const COURSES_COL1 = [
  { label: "AI Medical Coding Course",   path: "/courses/ai-medical-coding-course"   },
  { label: "AI Medical Billing Course",  path: "/courses/ai-medical-billing-course"  },
  { label: "AI Medical Scribing Course", path: "/courses/ai-medical-scribing-course" },
  { label: "Tally & GST Course",         path: "/courses/tally-gst-course"           },
  { label: "SAP Development Course",     path: "/courses/sap-development-course"     },
  { label: "Data Analytics Course",      path: "/courses/data-analytics-course"      },
];

const COURSES_COL2 = [
  { label: "Personality Development Course", path: "/courses/personality-development-course" },
  { label: "Full Stack Course",       path: "/courses/full-stack-development-course"  },
  { label: "UI/UX Designing Course",         path: "/courses/ui-ux-design-course"         },
  { label: "AI & Machine Learning Course",   path: "/courses/ai-machine-learning-course"     },
  { label: "Digital Marketing Course",   path: "/courses/digital-marketing-course"     },
];

const QUICK_LINKS = [
  { label: "Home",             path: "/"          },
  { label: "About Us",         path: "/about-us"     },
  { label: "Campus",           path: "/campus"    },
  { label: "Placement",        path: "/placement" },
  { label: "Career Guidance",  path: "/career"    },
  { label: "Course Offered",   path: "/courses"   },
  { label: "Books",            path: "/books"     },
  { label: "Blogs",            path: "/blog"     },
  { label: "Contact Us",       path: "/contact-us"   },
];

/* ═══════════════════════════════════════════
   SOCIAL BUTTON
═══════════════════════════════════════════ */
function SocialBtn({ Icon, color, label, url }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 38, height: 38, borderRadius: "50%",
        background: hov ? color : "rgba(255,255,255,0.10)",
        border: `1.5px solid ${hov ? color : "rgba(255,255,255,0.15)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", color: "#fff", textDecoration: "none",
        transform: hov ? "translateY(-3px) scale(1.12)" : "scale(1)",
        transition: "all 0.22s cubic-bezier(.4,0,.2,1)",
        boxShadow: hov ? `0 6px 18px ${color}55` : "none",
        flexShrink: 0,
      }}
    >
      <Icon />
    </a>
  );
}

/* ═══════════════════════════════════════════
   FOOTER LINK
═══════════════════════════════════════════ */
function FooterLink({ label, href, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <li style={{ listStyle: "none", marginBottom: "12px" }}>
      <a
        href={href}
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "flex", alignItems: "center", gap: "8px",
          fontSize: "15px", fontFamily: "'Outfit', sans-serif", fontWeight: 500,
          color: hov ? "#a78bfa" : "rgba(255,255,255,0.68)",
          cursor: "pointer",
          transform: hov ? "translateX(4px)" : "translateX(0)",
          transition: "all 0.22s ease",
          textDecoration: "none",
        }}
      >
        <span style={{ color: hov ? "#a78bfa" : "rgba(255,255,255,0.40)", transition: "color 0.22s", flexShrink: 0 }}>
          <IcoChevron />
        </span>
        {label}
      </a>
    </li>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════ */
export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [logoErr, setLogoErr] = useState(false);

  const visibleQuickLinks = QUICK_LINKS.filter(
    (link) => link.path !== location.pathname
  );

  const goTo = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <footer
      style={{
        background: "#111118",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <style>{`
        .ft-dots {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(rgba(124,58,237,0.08) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .ft-glow {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(124,58,237,0.6), transparent);
          pointer-events: none;
        }
        .ft-main {
          max-width: 1400px; margin: 0 auto;
          padding: 52px clamp(16px,3%,40px) 36px;
          display: flex; gap: 150px; flex-wrap: wrap;
          position: relative; z-index: 1;
          align-items: flex-start;
        }
        .ft-brand { flex: 0 0 280px; min-width: 220px; }
        .ft-courses-wrap {
          flex: 0 0 auto;
          display: flex;
          gap: 30px;
        }
        .ft-col { flex: 0 0 auto; min-width: 200px; }
        .ft-bottom {
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 20px clamp(16px,4%,48px);
          display: flex; align-items: center; justify-content: center;
          position: relative; z-index: 1;
        }
        @media (max-width: 1100px) {
          .ft-brand { flex: 0 0 100%; }
          .ft-courses-wrap { flex-wrap: wrap; }
        }
        @media (max-width: 700px) {
          .ft-courses-wrap { gap: 16px; }
          .ft-col { min-width: 150px; }
          .ft-main { gap: 24px; padding: 36px 16px 28px !important; }
        }
        @media (max-width: 420px) {
          .ft-courses-wrap { flex-direction: column; gap: 8px; }
        }
      `}</style>

      <div className="ft-dots" />
      <div className="ft-glow" />

      <div className="ft-main">

        {/* ── Brand ── */}
        <div className="ft-brand">
          <a
            href="/"
            onClick={(e) => goTo(e, "/")}
            style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px", cursor: "pointer", textDecoration: "none" }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: "10px",
              background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 14px rgba(124,58,237,0.45)",
              overflow: "hidden", flexShrink: 0,
            }}>
              {logoErr
                ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15 6.5C15 4.57 13.43 3 11.5 3H8C5.79 3 4 4.79 4 7c0 1.86 1.28 3.41 3 3.87V11C5.12 11.46 4 12.84 4 14.5 4 16.43 5.57 18 7.5 18H11c2.21 0 4-1.79 4-4 0-1.86-1.28-3.41-3-3.87V10c1.88-.46 3-1.84 3-3.5z" fill="white" fillOpacity="0.9" />
                  </svg>
                )
                : (
                  <img
                    src={`${PUB}/logo.png`}
                    alt="Skillra logo"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={() => setLogoErr(true)}
                  />
                )
              }
            </div>
            <span style={{ fontSize: "22px", fontWeight: 900, color: "#fff", letterSpacing: "0.06em", fontFamily: "'Outfit', sans-serif" }}>
              SKILLRA
            </span>
          </a>

          <p style={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.75,
            fontWeight: 400,
            marginBottom: "22px",
            fontFamily: "'Outfit', sans-serif",
          }}>
            Skillra delivers industry-aligned training to help students build strong careers in Medical Coding, IT, and Finance. Learn with confidence and step into your future with job-ready skills.
          </p>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {SOCIALS.map((s, i) => (
              <SocialBtn key={i} {...s} />
            ))}
          </div>
        </div>

        {/* ── Courses — two sub-columns ── */}
        <div className="ft-courses-wrap">
          <div className="ft-col">
            <h4 style={{ fontSize: "16px", fontWeight: 800, color: "#fff", marginBottom: "18px", letterSpacing: "-0.01em", fontFamily: "'Outfit', sans-serif" }}>
              Our Courses
            </h4>
            <ul style={{ padding: 0, margin: 0 }}>
              {COURSES_COL1.map((c, i) => (
                <FooterLink
                  key={i}
                  label={c.label}
                  href={c.path}
                  onClick={(e) => goTo(e, c.path)}
                />
              ))}
            </ul>
          </div>

          <div className="ft-col" style={{ paddingTop: "40px" }}>
            <ul style={{ padding: 0, margin: 0 }}>
              {COURSES_COL2.map((c, i) => (
                <FooterLink
                  key={i}
                  label={c.label}
                  href={c.path}
                  onClick={(e) => goTo(e, c.path)}
                />
              ))}
            </ul>
          </div>
        </div>

        {/* ── Quick Links ── */}
        <div className="ft-col">
          <h4 style={{ fontSize: "16px", fontWeight: 800, color: "#fff", marginBottom: "18px", letterSpacing: "-0.01em", fontFamily: "'Outfit', sans-serif" }}>
            Quick Links
          </h4>
          <ul style={{ padding: 0, margin: 0 }}>
            {visibleQuickLinks.map((link, i) => (
              <FooterLink
                key={i}
                label={link.label}
                href={link.path}
                onClick={(e) => goTo(e, link.path)}
              />
            ))}
          </ul>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="ft-bottom">
        <p style={{
          fontSize: "15px", color: "rgba(255,255,255,0.45)",
          fontFamily: "'Outfit', sans-serif", fontWeight: 500, textAlign: "center",
        }}>
          Copyright © {new Date().getFullYear()}{" "}
          <span style={{
            fontWeight: 800,
            background: "linear-gradient(90deg, #a78bfa, #7c3aed)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            <Link to="/" style={{ textDecoration: "none" }}>
  <span style={{
    fontWeight: 800,
    background: "linear-gradient(90deg, #a78bfa, #7c3aed)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  }}>
    Skillra
  </span>
</Link>
          </span>
          {" "}|| All Rights Reserved
        </p>
      </div>
    </footer>
  );
}