import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ── Social icon SVGs ── */
const IcoFacebook  = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>);
const IcoInstagram = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>);
const IcoPinterest = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>);
const IcoTwitter   = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>);
const IcoChevron   = () => (<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>);

const SOCIAL_LINKS = [
  { Icon: IcoFacebook,  color: "#1877f2", label: "Facebook"  },
  { Icon: IcoInstagram, color: "#e1306c", label: "Instagram" },
  { Icon: IcoPinterest, color: "#e60023", label: "Pinterest" },
  { Icon: IcoTwitter,   color: "#1da1f2", label: "Twitter"   },
];

const COURSE_LINKS = [
  "AI Medical Coding",
  "AI Medical Billing",
  "AI Medical Scribing",
  "Full Stack Development",
  "Data Analytics",
];

const QUICK_LINKS = [
  { label: "Templates",       path: "/" },
  { label: "Blog And Article",path: "/" },
  { label: "Integrations",    path: "/" },
  { label: "Webinars",        path: "/" },
  { label: "Privacy & Policy",path: "/" },
];

function SocialBtn({ Icon, color, label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={label}
      style={{
        width: 34, height: 34, borderRadius: "50%",
        background: hovered ? color : "rgba(255,255,255,0.10)",
        border: `1.5px solid ${hovered ? color : "rgba(255,255,255,0.15)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", color: "#fff",
        transform: hovered ? "translateY(-3px) scale(1.12)" : "scale(1)",
        transition: "all 0.22s cubic-bezier(.4,0,.2,1)",
        boxShadow: hovered ? `0 6px 18px ${color}55` : "none",
      }}
    >
      <Icon />
    </button>
  );
}

function FooterLink({ label, path, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <li
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: "8px",
        fontSize: "13.5px", fontFamily: "'Outfit', sans-serif",
        fontWeight: 500,
        color: hovered ? "#a78bfa" : "rgba(255,255,255,0.68)",
        cursor: "pointer",
        transform: hovered ? "translateX(4px)" : "translateX(0)",
        transition: "all 0.22s ease",
        listStyle: "none",
        marginBottom: "12px",
      }}
    >
      <span style={{ color: hovered ? "#a78bfa" : "rgba(255,255,255,0.40)", transition: "color 0.22s" }}>
        <IcoChevron />
      </span>
      {label}
    </li>
  );
}

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer style={{
      background: "#111118",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Outfit', sans-serif",
    }}>
      {/* Subtle dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(124,58,237,0.08) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      {/* Top purple glow */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.6), transparent)",
        pointerEvents: "none",
      }} />

      {/* Main content */}
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "52px 48px 36px",
        display: "flex", gap: "48px", flexWrap: "wrap",
        position: "relative", zIndex: 1,
      }}>

        {/* ── Col 1: Brand ── */}
        <div style={{ flex: "0 0 260px", minWidth: "220px" }}>
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px", cursor: "pointer" }}
          >
            {/* Skillra S icon */}
            <div style={{
              width: 32, height: 32, borderRadius: "8px",
              background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 14px rgba(124,58,237,0.45)",
            }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M15 6.5C15 4.57 13.43 3 11.5 3H8C5.79 3 4 4.79 4 7c0 1.86 1.28 3.41 3 3.87V11C5.12 11.46 4 12.84 4 14.5 4 16.43 5.57 18 7.5 18H11c2.21 0 4-1.79 4-4 0-1.86-1.28-3.41-3-3.87V10c1.88-.46 3-1.84 3-3.5z" fill="white" fillOpacity="0.9"/>
              </svg>
            </div>
            <span style={{ fontSize: "18px", fontWeight: 900, color: "#fff", letterSpacing: "0.06em", fontFamily: "'Outfit', sans-serif" }}>
              SKILLRA
            </span>
          </div>

          <p style={{
            fontSize: "13.5px", color: "rgba(255,255,255,0.58)",
            lineHeight: 1.8, fontWeight: 400,
            marginBottom: "24px", maxWidth: "240px",
            fontFamily: "'Outfit', sans-serif",
          }}>
            Skillra delivers industry-aligned training to help students build strong careers in Medical Coding, IT, and Finance. Learn with confidence and step into your future with job-ready skills.
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", gap: "10px" }}>
            {SOCIAL_LINKS.map((s, i) => <SocialBtn key={i} {...s} />)}
          </div>
        </div>

        {/* ── Spacer ── */}
        <div style={{ flex: 1 }} />

        {/* ── Col 2: Our Course ── */}
        <div style={{ flex: "0 0 auto", minWidth: "180px" }}>
          <h4 style={{
            fontSize: "15px", fontWeight: 800, color: "#fff",
            marginBottom: "20px", fontFamily: "'Outfit', sans-serif",
            letterSpacing: "-0.01em",
          }}>
            Our Course :
          </h4>
          <ul style={{ padding: 0, margin: 0 }}>
            {COURSE_LINKS.map((label, i) => (
              <FooterLink key={i} label={label} onClick={() => navigate("/courses")} />
            ))}
          </ul>
        </div>

        {/* ── Col 3: Quick Links ── */}
        <div style={{ flex: "0 0 auto", minWidth: "160px" }}>
          <h4 style={{
            fontSize: "15px", fontWeight: 800, color: "#fff",
            marginBottom: "20px", fontFamily: "'Outfit', sans-serif",
            letterSpacing: "-0.01em",
          }}>
            Quick Links:
          </h4>
          <ul style={{ padding: 0, margin: 0 }}>
            {QUICK_LINKS.map((link, i) => (
              <FooterLink key={i} label={link.label} onClick={() => navigate(link.path)} />
            ))}
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "18px 48px",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", zIndex: 1,
      }}>
        <p style={{
          fontSize: "13px", color: "rgba(255,255,255,0.45)",
          fontFamily: "'Outfit', sans-serif", fontWeight: 500,
          textAlign: "center",
        }}>
          Copyright © 2026{" "}
          <span style={{
            fontWeight: 800,
            background: "linear-gradient(90deg, #a78bfa, #7c3aed)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Skillra
          </span>
          {" "}|| All Rights Reserved
        </p>
      </div>
    </footer>
  );
}