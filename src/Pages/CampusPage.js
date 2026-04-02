import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import SocialSidebar from "../components/SocialSideBar";

const PUB = process.env.PUBLIC_URL || "";

function useInView(threshold = 0.12) {
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

/* ═══════════════════════════════════════════════════
   FLOATING BADGE
═══════════════════════════════════════════════════ */
function FloatingBadge({ icon, label, style, delay = 0, className = ""}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div className={className} style={{
      position: "absolute", display: "flex", alignItems: "center", gap: "10px",
      background: "rgba(255,255,255,0.95)",
      backdropFilter: "blur(18px) saturate(1.6)", WebkitBackdropFilter: "blur(18px) saturate(1.6)",
      border: "1.5px solid rgba(255,255,255,0.98)", borderRadius: "14px", padding: "10px 18px",
      boxShadow: "0 8px 32px rgba(109,40,217,0.14), 0 1px 0 rgba(255,255,255,0.9) inset",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.93)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.55s cubic-bezier(.34,1.56,.64,1) ${delay}ms`,
      zIndex: 20, ...style,
    }}>
      <div style={{
        width: "34px", height: "34px", borderRadius: "10px",
        background: "linear-gradient(135deg, rgba(124,58,237,0.10), rgba(167,139,250,0.18))",
        border: "1px solid rgba(124,58,237,0.18)",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>{icon}</div>
      <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a0640", lineHeight: 1.2, fontFamily: "'Outfit', sans-serif", whiteSpace: "nowrap" }}>{label}</div>
    </div>
  );
}

function ActiveStudentsBadge({ style, delay = 0, className = ""}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div className={className} style={{
      position: "absolute", display: "flex", alignItems: "center", gap: "10px",
      background: "#1a1035", borderRadius: "50px", padding: "8px 16px 8px 8px",
      boxShadow: "0 8px 28px rgba(20,8,56,0.35)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.93)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.55s cubic-bezier(.34,1.56,.64,1) ${delay}ms`,
      zIndex: 20, ...style,
    }}>
      <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="7" r="3.5" stroke="white" strokeWidth="1.8" />
          <path d="M3 17c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
      <div>
        <div style={{ fontSize: "14px", fontWeight: 800, color: "#fff", lineHeight: 1, fontFamily: "'Outfit', sans-serif" }}>1000+</div>
        <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.65)", marginTop: "2px", fontWeight: 500, fontFamily: "'Outfit', sans-serif" }}>Active Students</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SECTION 1 — CAMPUS HERO
═══════════════════════════════════════════════════ */
function CampusHero({ onJoinClick }) {
  return (
    <section id="campus-home" style={{
      background: "radial-gradient(ellipse 120% 120% at 15% 55%, rgba(197,175,255,0.65) 0%, rgba(215,205,255,0.50) 35%, rgba(225,215,255,0.38) 55%, #e8e2f8 100%)",
      minHeight: "100vh", display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: `radial-gradient(rgba(124,58,237,0.10) 1px, transparent 1px)`, backgroundSize: "28px 28px" }} />
      <div className="campus-inner" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap",
        padding: "30px 5%", width: "100%", gap: "80px",
        position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto"
      }}>

        <div className="campus-left" style={{ flex: "0 0 auto", width: "500px", maxWidth: "100%" }}>
          <h1 className="cp-v1 campus-title" style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 900, lineHeight: 1.1, color: "#1a0640", marginBottom: "6px", letterSpacing: "-1.5px", fontFamily: "'Outfit', sans-serif" }}>
            Step Beyond <span style={{ display: "inline-block", animation: "capHat 2.4s ease-in-out infinite" }}>🎓</span>
          </h1>
          <h2 className="cp-v2 campus-subtitle" style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.9rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "18px", letterSpacing: "-1px", fontFamily: "'Outfit', sans-serif", color: "#1a0640" }}>
            Academics with <span style={{ color: "#ff6b35" }}>Skillra</span><br /><span style={{ color: "#ff6b35" }}>Campus</span>
          </h2>
          <div className="cp-v2" style={{ marginBottom: "24px" }}>
            <svg viewBox="0 0 320 20" style={{ width: "min(320px, 90%)", maxWidth: "100%", height: "14px", overflow: "visible" }} preserveAspectRatio="none">
              <path className="campus-arc" d="M 4 14 C 60 2, 200 0, 316 12" fill="none" stroke="#7c3aed" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>

          <p className="cp-v3 campus-desc-desktop" style={{ color: "#5c4a80", fontSize: "clamp(13px,1.4vw,14.5px)", lineHeight: 1.8, marginBottom: "34px", maxWidth: "400px", fontFamily: "'Outfit', sans-serif", fontWeight: 400 }}>
            Join a community of students who are <strong style={{ color: "#1a0640", fontWeight: 700 }}>building skills</strong>, leadership experience, and <span style={{ color: "#ff6b35", fontWeight: 600 }}>career readiness</span> beyond the classroom.
          </p>
          <div className="cp-v4 campus-btn-desktop">
            <a href="/campus" style={{ textDecoration: "none" }} onClick={(e) => e.preventDefault()}>
              <button className="campus-cta-btn" onClick={onJoinClick} style={{ background: "#7c3aed", color: "#fff", border: "none", borderRadius: "50px", padding: "15px 32px", fontSize: "clamp(13px,1.3vw,14px)", fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', sans-serif", display: "inline-flex", alignItems: "center", gap: "10px", boxShadow: "0 6px 24px rgba(124,58,237,0.38)", letterSpacing: "0.3px", transition: "all 0.22s", position: "relative", overflow: "hidden" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.03)"; e.currentTarget.style.boxShadow = "0 14px 36px rgba(124,58,237,0.55)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(124,58,237,0.38)"; }}>
                Join Skillra Campus
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </a>
          </div>
        </div>

        <div className="campus-right cp-vR" style={{
          flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-end",
          position: "relative", minWidth: 0,
          height: "clamp(320px, 60vw, 700px)",
        }}>
          <div style={{
            position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
            width: "90%", maxWidth: "580px",
            aspectRatio: "580 / 630",
            borderRadius: "50% 50% 0 0 / 48% 48% 0 0",
            background: "rgba(195,180,255,0.28)",
            overflow: "hidden", zIndex: 1,
          }}>
            <svg viewBox="0 0 580 630" style={{ width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="chevInner" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
                  <polyline points="0,18 18,0 36,18" fill="none" stroke="rgba(124,58,237,0.22)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="0,36 18,18 36,36" fill="none" stroke="rgba(124,58,237,0.22)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="580" height="630" fill="url(#chevInner)" />
            </svg>
          </div>
          <img src={`${PUB}/campusboy.png`} alt="Campus Student"
  style={{ 
    position: "relative", 
    zIndex: 5, 
    height: "clamp(200px, 60vw, 550px)",
    width: "auto", 
    maxWidth: "100%", 
    objectFit: "contain", 
    objectPosition: "bottom center", 
    display: "block", 
    alignSelf: "flex-end", 
    filter: "drop-shadow(0 20px 50px rgba(109,40,217,0.20))" 
  }}
/>
          <FloatingBadge className="hero-badge" icon={<svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#7c3aed" strokeWidth="1.8" /><path d="M7 10l2 2 4-4" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>} label="50+ Workshops" style={{ top: "12%", right: "2%" }} delay={600} />
          <FloatingBadge className="hero-badge" icon={<svg width="16" height="16" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2.5" stroke="#7c3aed" strokeWidth="1.8" /><path d="M2 8h16" stroke="#7c3aed" strokeWidth="1.5" /><circle cx="6" cy="12.5" r="1" fill="#7c3aed" /><circle cx="10" cy="12.5" r="1" fill="#7c3aed" /></svg>} label="20+ Colleges" style={{ bottom: "24%", right: "2%" }} delay={800} />
          <ActiveStudentsBadge className="hero-badge" style={{ bottom: "40%", left: "2%" }} delay={1000} />
        </div>

        <div className="campus-bottom" style={{
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: "24px", width: "100%",
        }}>
          <p style={{ color: "#5c4a80", fontSize: "14.5px", lineHeight: 1.8, maxWidth: "360px", fontFamily: "'Outfit', sans-serif", fontWeight: 400, textAlign: "center" }}>
            Join a community of students who are <strong style={{ color: "#1a0640", fontWeight: 700 }}>building skills</strong>, leadership experience, and <span style={{ color: "#ff6b35", fontWeight: 600 }}>career readiness</span> beyond the classroom.
          </p>
          <button className="campus-cta-btn" onClick={onJoinClick} style={{ background: "#7c3aed", color: "#fff", border: "none", borderRadius: "50px", padding: "15px 32px", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', sans-serif", display: "inline-flex", alignItems: "center", gap: "10px", boxShadow: "0 6px 24px rgba(124,58,237,0.38)", transition: "all 0.22s", position: "relative", overflow: "hidden" }}>
            Join Skillra Campus
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CAMPUS CARD
═══════════════════════════════════════════════════ */
function CampusCard({ heading, body, delay, inView }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "linear-gradient(145deg, #6d28d9, #4c1d95)" : "#fff",
        border: hovered ? "1.5px solid transparent" : "1.5px solid #e5e7eb",
        borderRadius: "20px", padding: "36px 30px",
        boxShadow: hovered ? "0 20px 52px rgba(109,40,217,0.38)" : "0 4px 20px rgba(124,58,237,0.06)",
        opacity: inView ? 1 : 0,
        transform: inView ? (hovered ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)") : "translateY(30px)",
        transition: [
          `opacity 0.65s ease ${delay}s`,
          "transform 0.30s cubic-bezier(0.34,1.56,0.64,1)",
          "background 0.28s ease", "border-color 0.28s ease", "box-shadow 0.28s ease",
        ].join(", "),
      }}
    >
      <h3 style={{
        fontSize: "clamp(15px,1.6vw,18px)", fontWeight: 800,
        color: hovered ? "#fff" : "#7c3aed",
        fontFamily: "'Outfit', sans-serif", marginBottom: "18px",
        transition: "color 0.28s ease",
        textAlign: "center",
      }}>
        {heading}
      </h3>
      <p style={{
        fontSize: "clamp(12px,1.3vw,13.5px)",
        color: hovered ? "rgba(255,255,255,0.85)" : "#6b7280",
        fontFamily: "'Outfit', sans-serif", lineHeight: 1.8, fontWeight: 400,
        transition: "color 0.28s ease",
        textAlign: "justify",
      }}>
        {body}
      </p>
    </div>
  );
}

function AboutCampusSection() {
  const [ref, inView] = useInView(0.08);
  const CARDS = [
    { heading: "Where Education Meets Opportunity", body: "Skillra Campus brings together education, industry insight, and student leadership to create meaningful opportunities within college campuses." },
    { heading: "Learn Beyond the Classroom", body: "The program enables students to go beyond academic learning by participating in skill development initiatives, collaborative activities, and professional growth programs." },
    { heading: "Build Confidence. Grow Your Career.", body: "Through Skillra Campus, students gain access to experiences that help them build confidence, expand their professional network, and prepare for career opportunities." },
  ];
  return (
    <section ref={ref} id="about-campus" style={{ background: "#fff", padding: "clamp(48px,8vw,88px) 0", borderTop: "1px solid #f0ebff", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(124,58,237,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.03) 1px,transparent 1px)`, backgroundSize: "40px 40px" }} />
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(16px,4%,48px)", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "52px", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.65s ease" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.6rem)", fontWeight: 900, color: "#111827", fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.03em", marginBottom: "14px" }}>About Skillra Campus</h2>
          <p style={{ fontSize: "clamp(13px,1.4vw,14.5px)", color: "#6b7280", fontFamily: "'Outfit', sans-serif", maxWidth: "580px", margin: "0 auto", lineHeight: 1.7 }}>
            Trusted by medical coding students across India to build skills, crack certifications, and launch successful careers.
          </p>
        </div>
        <div className="campus-cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {CARDS.map((card, i) => (
            <CampusCard key={i} heading={card.heading} body={card.body} delay={0.1 + i * 0.1} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SECTION 3 — OPPORTUNITIES
═══════════════════════════════════════════════════ */
function OpportunitiesSection() {
  const [ref, inView] = useInView(0.08);
  const scrollRef = useRef(null);
  const [activePage, setActivePage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollTop / el.clientHeight);
    setActivePage(Math.min(idx, 2));
  }, []);

  const goToPage = (idx) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: idx * el.clientHeight, behavior: "smooth" });
  };

  const oppPages = [
    [
      { title: "Skill Development Programs", desc: "Skillra Campus organizes learning initiatives focused on in-demand skills and emerging industry trends. Students gain exposure to practical knowledge that supports their academic learning with real-world relevance." },
      { title: "Campus Leadership Experience", desc: "Selected students can represent Skillra as Campus Leaders, contributing to community engagement and learning initiatives within their institutions. This experience helps students develop leadership, communication, and organizational skills that are valuable in professional environments." },
    ],
    [
      { title: "Industry Mentorship Access", desc: "Students get direct access to working professionals and industry mentors who guide them through real challenges. These sessions bridge the gap between theoretical knowledge and practical workplace expectations." },
      { title: "Internship & Project Exposure", desc: "Skillra connects campus students with live internship projects from partner companies. Working on real briefs with deadlines gives students a head start in understanding professional work culture and deliverables." },
    ],
    [
      { title: "Certification & Career Placement", desc: "Upon completing Skillra's campus programs, students receive industry-recognized certifications and gain access to our dedicated placement cell. With 100+ hiring partners, we actively connect graduates to job opportunities that match their newly acquired skills." },
    ],
  ];

  /* ── MOBILE — uses "mob-opp-*" classNames to avoid global CSS conflicts ── */
  if (isMobile) {
    return (
      <section
        ref={ref}
        className="mob-opp-section"
        style={{
          background: "#0e0e0e",
          position: "relative",
          display: "block",
          overflow: "visible",
          height: "auto",
          minHeight: "auto",
          maxHeight: "none",
        }}
      >
        {/* Title block */}
        <div
          className="mob-opp-title"
          style={{
            position: "relative",
            padding: "44px 22px 32px",
            overflow: "hidden",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.6s ease 0.1s",
          }}
        >
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", overflow: "hidden", pointerEvents: "none", opacity: 0.45 }}>
            <svg viewBox="0 0 520 240" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
              {Array.from({ length: 16 }).map((_, row) => {
                const numCols = 30;
                const pts = Array.from({ length: numCols }).map((__, i) => `${(i / (numCols - 1)) * 520},${row * 15 + (i % 2 === 0 ? 0 : 10)}`).join(" ");
                return <polyline key={row} points={pts} fill="none" stroke={row % 2 === 0 ? "#c9a227" : "#e6b830"} strokeWidth="2" strokeLinejoin="round" opacity={0.45 + row * 0.025} />;
              })}
            </svg>
          </div>
          <h2 style={{
            fontSize: "clamp(1.35rem, 6vw, 1.9rem)",
            fontWeight: 900,
            color: "#fff",
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: "-0.03em",
            lineHeight: 1.18,
            position: "relative",
            zIndex: 2,
            margin: 0,
            padding: 0,
          }}>
            Opportunities<br />Through Skillra<br />Campus
          </h2>
        </div>

        {/* Content items — simple block layout, no flex parent */}
        <div
          className="mob-opp-content"
          style={{
            background: "#1a1a1a",
            padding: "28px 22px 44px",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(18px)",
            transition: "all 0.6s ease 0.2s",
          }}
        >
          {oppPages.flat().map((item, i, arr) => (
            <div
              key={i}
              style={{
                display: "block",
                paddingBottom: i < arr.length - 1 ? "28px" : "0",
                marginBottom: i < arr.length - 1 ? "28px" : "0",
                borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}
            >
              <div style={{
                width: 26, height: 3, borderRadius: 2,
                background: "linear-gradient(90deg, #e6b830, #c9a227)",
                marginBottom: 12,
              }} />
              <h3 style={{
                fontSize: "15px",
                fontWeight: 800,
                color: "#fff",
                fontFamily: "'Outfit', sans-serif",
                marginBottom: 8,
                marginTop: 0,
                letterSpacing: "-0.01em",
                lineHeight: 1.3,
                padding: 0,
              }}>{item.title}</h3>
              <p style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.52)",
                fontFamily: "'Outfit', sans-serif",
                lineHeight: 1.75,
                fontWeight: 400,
                margin: 0,
                padding: 0,
              }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* ── DESKTOP ── */
  return (
    <section ref={ref} style={{ background: "#0e0e0e", position: "relative", overflow: "hidden" }}>
      <div className="opp-inner" style={{ display: "flex", height: "clamp(420px, 65vh, 600px)", alignItems: "stretch" }}>
        <div className="opp-left" style={{ flex: "0 0 42%", position: "relative", overflow: "hidden", padding: "clamp(40px,6vw,80px) clamp(24px,4%,52px)", display: "flex", flexDirection: "column", justifyContent: "center", opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-30px)", transition: "all 0.7s ease 0.1s" }}>
          <div className="opp-bg-design" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "240px", overflow: "hidden" }}>
            <svg viewBox="0 0 520 240" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
              {Array.from({ length: 16 }).map((_, row) => {
                const numCols = 30;
                const pts = Array.from({ length: numCols }).map((__, i) => `${(i / (numCols - 1)) * 520},${row * 15 + (i % 2 === 0 ? 0 : 10)}`).join(" ");
                return <polyline key={row} points={pts} fill="none" stroke={row % 2 === 0 ? "#c9a227" : "#e6b830"} strokeWidth="2" strokeLinejoin="round" opacity={0.45 + row * 0.025} />;
              })}
            </svg>
          </div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 3.1rem)", fontWeight: 900, color: "#fff", fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.03em", lineHeight: 1.12, position: "relative", zIndex: 2, marginBottom: "clamp(60px,12vw,180px)" }}>
            Opportunities<br />Through Skillra<br />Campus
          </h2>
        </div>
        <div className="opp-right" style={{ flex: 1, background: "#1a1a1a", display: "flex", flexDirection: "column", opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(30px)", transition: "all 0.7s ease 0.2s", overflow: "hidden", position: "relative" }}>

          <div ref={scrollRef} onScroll={handleScroll} className="opp-scroll" style={{
            height: "100%", overflowY: "auto", WebkitOverflowScrolling: "touch",
            scrollBehavior: "smooth", scrollSnapType: "y mandatory",
            scrollbarWidth: "none", msOverflowStyle: "none",
          }}>
            <style>{`.opp-scroll::-webkit-scrollbar { display: none; }`}</style>

            {oppPages.map((page, pageIdx) => (
              <div key={pageIdx} style={{ scrollSnapAlign: "start", minHeight: "100%", height: "100%", padding: "clamp(40px,6vw,80px) clamp(24px,5%,60px)", display: "flex", flexDirection: "column", justifyContent: "center", gap: "clamp(24px,4vw,48px)" }}>
                {page.map((item, i) => (
                  <div key={i}>
                    <h3 style={{ fontSize: "clamp(15px,1.6vw,17px)", fontWeight: 800, color: "#fff", fontFamily: "'Outfit', sans-serif", marginBottom: "14px", letterSpacing: "-0.01em" }}>{item.title}</h3>
                    <p style={{ fontSize: "clamp(12px,1.3vw,13.5px)", color: "rgba(255,255,255,0.58)", fontFamily: "'Outfit', sans-serif", lineHeight: 1.9, fontWeight: 400 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "7px", zIndex: 10 }}>
            {[0, 1, 2].map(i => (
              <div key={i} onClick={() => goToPage(i)} style={{ width: "6px", height: "6px", borderRadius: "50%", background: i === activePage ? "#e6b830" : "rgba(255,255,255,0.2)", cursor: "pointer", transition: "background 0.3s ease" }} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SECTION 4 — TESTIMONIALS + CONTACT FORM
═══════════════════════════════════════════════════ */
const TESTIMONIALS = [
  { name: "Aria Zinario", text: "I am very helped by this E-wallet application , my days are very easy to use this application and its very helpful in my life , even I can pay a short time 😊", avatar: "AZ", image: "https://randomuser.me/api/portraits/women/44.jpg", },
  { name: "Rahul Sharma", text: "Skillra Campus transformed my career path completely. The placement support was exceptional and I got 3 offers within a month of completing the course.", avatar: "RS", image: "https://randomuser.me/api/portraits/men/32.jpg", },
  { name: "Priya Nair",   text: "The mentors at Skillra are incredibly supportive. Real industry experience combined with structured learning made all the difference for me.", avatar: "PN", image: "https://randomuser.me/api/portraits/women/67.jpg", },
  { name: "Karthik V",    text: "Best decision I ever made. The hands-on projects gave me the confidence to clear technical interviews at top product companies.", avatar: "KV", image: "https://randomuser.me/api/portraits/men/44.jpg", },
];
const AVATAR_COLORS = ["#7c3aed", "#059669", "#dc2626", "#d97706"];

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbws7QqEJT-y2F_6U_VyyuQ56sdXZUYEgXb7qLagegYmmPfqI-5EoGJ6wXGrHuQIC-jTWA/exec";

function TestimonialsContactSection() {
  const [ref, inView] = useInView(0.06);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", source: "", purpose: ""
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const autoRef = useRef(null);

  const goNext = () => setActiveIdx(prev => (prev + 1) % TESTIMONIALS.length);
  const handlePlay = () => {
    if (isPlaying) { clearInterval(autoRef.current); setIsPlaying(false); }
    else { goNext(); autoRef.current = setInterval(goNext, 3000); setIsPlaying(true); }
  };
  const handleAvatarClick = (i) => {
    clearInterval(autoRef.current); setIsPlaying(false); setActiveIdx(i);
  };
  useEffect(() => () => clearInterval(autoRef.current), []);

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
    phone: (v) => {
      const d = v.replace(/\D/g, "");
      if (!d) return "Phone number is required";
      if (d.length !== 10) return "Must be exactly 10 digits";
      if (!/^[6-9]/.test(d)) return "Must start with 6, 7, 8 or 9";
      if (/^(\d)\1{9}$/.test(d)) return "Invalid number";
      return "";
    },
    source: (v) => (!v ? "Please select where you heard about us" : ""),
    purpose: (v) => (!v.trim() ? "Purpose of joining is required" : v.trim().length < 10 ? "Minimum 10 characters" : ""),
  };

  const validate = (field, value) => {
    const err = validators[field](value);
    setErrors(prev => ({ ...prev, [field]: err }));
    return err;
  };

  const handleChange = (field, value) => {
    if (field === "phone") value = value.replace(/\D/g, "").slice(0, 10);
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field] !== undefined) validate(field, value);
  };

  const handleSubmit = async () => {
    const newErrors = {};
    let hasError = false;
    Object.keys(validators).forEach(f => {
      const err = validators[f](formData[f]);
      newErrors[f] = err;
      if (err) hasError = true;
    });
    setErrors(newErrors);
    if (hasError) return;

    setSubmitting(true);
    try {
      const now = new Date();
      const date = now.toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" });
      const time = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });

      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          type: "campus",
          date,
          time,
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone,
          source: formData.source,
          purpose: formData.purpose.trim(),
        }),
      });
      setSubmitted(true);
    } catch {
      setErrors(prev => ({ ...prev, _form: "Something went wrong. Please try again." }));
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = (field) => ({
    width: "100%", padding: "13px 16px",
    border: `1.5px solid ${errors[field] ? "#ef4444" : errors[field] === "" ? "#22c55e" : "#e5e7eb"}`,
    borderRadius: "12px", fontSize: "13.5px",
    fontFamily: "'Outfit', sans-serif", color: "#374151",
    outline: "none", background: "#fafafa",
    transition: "border-color 0.2s, background 0.2s",
    boxSizing: "border-box",
  });

  const ErrorMsg = ({ field }) => errors[field] ? (
    <p style={{ fontSize: "11.5px", color: "#ef4444", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px", fontFamily: "'Outfit', sans-serif" }}>
      <svg width="11" height="11" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" stroke="#ef4444" strokeWidth="1.8"/>
        <path d="M10 6v4M10 14h.01" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
      {errors[field]}
    </p>
  ) : null;

  return (
    <section ref={ref} id="contact" style={{ background: "#f8f7ff", borderTop: "1px solid #f0ebff", padding: "clamp(48px,8vw,88px) 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `radial-gradient(rgba(124,58,237,0.05) 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(16px,4%,48px)", position: "relative", zIndex: 1 }}>
        <div className="tc-inner" style={{ display: "flex", gap: "clamp(24px,5%,64px)", alignItems: "flex-start" }}>

          {/* LEFT — Testimonials */}
          <div style={{ flex: 1, minWidth: 0, opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-24px)", transition: "all 0.7s ease 0.1s" }}>
            <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 900, color: "#111827", fontFamily: "'Outfit',sans-serif", letterSpacing: "-0.03em", marginBottom: "8px" }}>Testimonials</h2>
            <p style={{ fontSize: "14px", color: "#9ca3af", fontFamily: "'Outfit',sans-serif", marginBottom: "40px", fontStyle: "italic" }}>Every Story Matters. Every Success Counts.</p>
            <div style={{ marginBottom: "20px" }}>
              <svg width="52" height="38" viewBox="0 0 52 38" fill="none">
                <path d="M0 38V23C0 15.3 2.8 9.6 8.4 5.8 14 2 20.7 0.2 28.5 0.2V7.4C25 7.4 22 8.3 19.4 10 16.8 11.6 15.5 14 15.3 17.2H24V38H0ZM28 38V23C28 15.3 30.8 9.6 36.4 5.8 42 2 48.7 0.2 56.5 0.2V7.4C53 7.4 50 8.3 47.4 10 44.8 11.6 43.5 14 43.3 17.2H52V38H28Z" fill="#7c3aed" opacity="0.13"/>
              </svg>
            </div>
            <div key={activeIdx} className="testi-slide" style={{ minHeight: "120px", marginBottom: "36px" }}>
              <p style={{ fontSize: "clamp(13px,1.4vw,15px)", color: "#374151", fontFamily: "'Outfit',sans-serif", lineHeight: 1.85, fontWeight: 400 }}>
                {TESTIMONIALS[activeIdx].text}
              </p>
              <p style={{ fontSize: "13px", color: "#7c3aed", fontFamily: "'Outfit',sans-serif", fontWeight: 700, marginTop: "18px" }}>
                — {TESTIMONIALS[activeIdx].name}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  onClick={() => handleAvatarClick(i)}
                  style={{
                    width: "44px", height: "44px", borderRadius: "50%",
                    overflow: "hidden", cursor: "pointer", flexShrink: 0,
                    border: activeIdx === i ? "3px solid #7c3aed" : "3px solid transparent",
                    boxShadow: activeIdx === i ? "0 0 0 2px #fff, 0 0 0 4px #7c3aed" : "none",
                    transition: "all 0.22s",
                    transform: activeIdx === i ? "scale(1.12)" : "scale(1)",
                  }}
                >
                  <img
                    src={t.image}
                    alt={t.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={e => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement.style.background = AVATAR_COLORS[i];
                      e.currentTarget.parentElement.innerHTML = `<span style="color:#fff;font-size:13px;font-weight:700;font-family:'Outfit',sans-serif;display:flex;align-items:center;justify-content:center;width:100%;height:100%">${t.avatar}</span>`;
                    }}
                  />
                </div>
              ))}
              <div onClick={handlePlay} style={{
                width: "44px", height: "44px", borderRadius: "50%",
                border: `2px solid ${isPlaying ? "#7c3aed" : "#d1d5db"}`,
                background: isPlaying ? "#f3f0ff" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", marginLeft: "4px", transition: "all 0.22s", flexShrink: 0,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#7c3aed"; e.currentTarget.style.background = "#f3f0ff"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = isPlaying ? "#7c3aed" : "#d1d5db"; e.currentTarget.style.background = isPlaying ? "#f3f0ff" : "transparent"; }}
              >
                {isPlaying
                  ? <svg width="12" height="14" viewBox="0 0 12 14" fill="none"><rect x="1" y="1" width="3.5" height="12" rx="1" fill="#7c3aed"/><rect x="7.5" y="1" width="3.5" height="12" rx="1" fill="#7c3aed"/></svg>
                  : <svg width="13" height="15" viewBox="0 0 14 16" fill="none"><path d="M1 1l12 7-12 7V1z" fill="#9ca3af"/></svg>
                }
              </div>
            </div>
          </div>

          {/* RIGHT — Contact Form */}
          <div className="tc-form" style={{ flex: "0 0 clamp(280px,38%,400px)", background: "#fff", borderRadius: "24px", padding: "clamp(24px,4%,36px) clamp(20px,4%,32px)", boxShadow: "0 8px 48px rgba(124,58,237,0.10)", border: "1.5px solid #e9e4ff", opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(24px)", transition: "all 0.7s ease 0.2s" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#111827", fontFamily: "'Outfit',sans-serif", marginBottom: "10px" }}>Message Sent!</h3>
                <p style={{ fontSize: "14px", color: "#6b7280", fontFamily: "'Outfit',sans-serif" }}>We'll get back to you shortly.</p>
                <button onClick={() => { setSubmitted(false); setFormData({ name:"", email:"", phone:"", source:"", purpose:"" }); setErrors({}); }}
                  style={{ marginTop: "24px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: "50px", padding: "10px 28px", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>
                  Send another
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: "clamp(16px,2vw,20px)", fontWeight: 900, color: "#111827", fontFamily: "'Outfit',sans-serif", marginBottom: "6px" }}>We're here to help!</h3>
                <p style={{ fontSize: "13px", color: "#9ca3af", fontFamily: "'Outfit',sans-serif", marginBottom: "24px" }}>Please contact us in case of any query.</p>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div>
                    <input type="text" placeholder="Your name" value={formData.name}
                      onChange={e => handleChange("name", e.target.value)}
                      onBlur={() => validate("name", formData.name)}
                      onFocus={e => { e.currentTarget.style.borderColor = "#a78bfa"; e.currentTarget.style.background = "#fff"; }}
                      style={inputStyle("name")} />
                    <ErrorMsg field="name" />
                  </div>
                  <div>
                    <input type="email" placeholder="Your email address" value={formData.email}
                      onChange={e => handleChange("email", e.target.value)}
                      onBlur={() => validate("email", formData.email)}
                      onFocus={e => { e.currentTarget.style.borderColor = "#a78bfa"; e.currentTarget.style.background = "#fff"; }}
                      style={inputStyle("email")} />
                    <ErrorMsg field="email" />
                  </div>
                  <div>
                    <input type="tel" placeholder="Your phone number (10 digits)" value={formData.phone}
                      onChange={e => handleChange("phone", e.target.value)}
                      onBlur={() => validate("phone", formData.phone)}
                      onFocus={e => { e.currentTarget.style.borderColor = "#a78bfa"; e.currentTarget.style.background = "#fff"; }}
                      style={inputStyle("phone")} />
                    <ErrorMsg field="phone" />
                  </div>
                  <div>
                    <div style={{ position: "relative" }}>
                      <select value={formData.source}
                        onChange={e => handleChange("source", e.target.value)}
                        onBlur={() => validate("source", formData.source)}
                        style={{ ...inputStyle("source"), appearance: "none", WebkitAppearance: "none", cursor: "pointer", color: formData.source ? "#374151" : "#9ca3af" }}>
                        <option value="">Where did you hear about us?</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Twitter / X">Twitter / X</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="YouTube">YouTube</option>
                        <option value="Telegram">Telegram</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Friend / Referral">Friend / Referral</option>
                        <option value="College / Campus">College / Campus</option>
                        <option value="Other">Other</option>
                      </select>
                      <svg style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="14" height="14" viewBox="0 0 20 20" fill="none">
                        <path d="M5 8l5 5 5-5" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <ErrorMsg field="source" />
                  </div>
                  <div>
                    <textarea placeholder="Purpose of joining (min 10 characters)" value={formData.purpose}
                      onChange={e => handleChange("purpose", e.target.value)}
                      onBlur={() => validate("purpose", formData.purpose)}
                      onFocus={e => { e.currentTarget.style.borderColor = "#a78bfa"; e.currentTarget.style.background = "#fff"; }}
                      rows={3}
                      style={{ ...inputStyle("purpose"), resize: "none", lineHeight: 1.6 }} />
                    <ErrorMsg field="purpose" />
                  </div>
                  {errors._form && (
                    <p style={{ fontSize: "12px", color: "#ef4444", fontFamily: "'Outfit',sans-serif", textAlign: "center" }}>{errors._form}</p>
                  )}
                  <button onClick={handleSubmit} disabled={submitting}
                    style={{
                      background: submitting ? "#a78bfa" : "linear-gradient(135deg,#7c3aed,#5b21b6)",
                      color: "#fff", border: "none", borderRadius: "50px",
                      padding: "14px 28px", fontSize: "14px", fontWeight: 700,
                      cursor: submitting ? "not-allowed" : "pointer",
                      fontFamily: "'Outfit',sans-serif",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      boxShadow: "0 6px 20px rgba(124,58,237,0.35)",
                      transition: "all 0.22s", marginTop: "4px",
                    }}
                    onMouseEnter={e => { if (!submitting) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(124,58,237,0.48)"; }}}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(124,58,237,0.35)"; }}>
                    {submitting ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 1s linear infinite" }}>
                          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                          <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Get in Touch
                        <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════ */
export default function CampusPage() {
  const handleJoinClick = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Outfit','Segoe UI',sans-serif", margin: 0, padding: 0, overflowX: "hidden", background: "#faf8ff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; }

        @keyframes fadeUp    { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeRight { from{opacity:0;transform:translateX(-22px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeScale { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }
        @keyframes shimmer   { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes drawArc   { from{stroke-dashoffset:400} to{stroke-dashoffset:0} }
        @keyframes capHat    { 0%,100%{transform:rotate(-5deg) translateY(0px)} 50%{transform:rotate(5deg) translateY(-6px)} }
        @keyframes tesFadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spinRingAnim { to{transform:rotate(360deg)} }
        @keyframes spin { to{transform:rotate(360deg)} }

        .testi-slide { animation: tesFadeUp 0.38s cubic-bezier(0.22,1,0.36,1) forwards; }

        .cp-v1 { animation: fadeRight .6s ease forwards; opacity:0; animation-delay:.1s; }
        .cp-v2 { animation: fadeUp .65s ease forwards;   opacity:0; animation-delay:.22s; }
        .cp-v3 { animation: fadeUp .65s ease forwards;   opacity:0; animation-delay:.38s; }
        .cp-v4 { animation: fadeUp .65s ease forwards;   opacity:0; animation-delay:.54s; }
        .cp-vR { animation: fadeScale 1s ease forwards;  opacity:0; animation-delay:.2s; }

        .campus-arc {
          stroke-dasharray: 400; stroke-dashoffset: 400;
          animation: drawArc 1.8s cubic-bezier(0.25,0.1,0.2,1) 0.6s forwards;
        }
        .campus-cta-btn::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);
          background-size:200% 100%;
          animation: shimmer 2.4s infinite;
        }

        input::placeholder { color:#9ca3af; }
        input:focus, select:focus { outline:none; }
        select option { color:#374151; }

        /* ══ LARGE DESKTOP ≥ 1280px ══ */
        @media (min-width:1280px) {
          .campus-inner { gap:60px !important; }
        }

        /* ══ TABLET 769–1100px ══ */
        @media (max-width:1100px) {
          .campus-inner { padding:0 4% !important; gap:40px !important; }
          .campus-left  { width:420px !important; }
        }

        /* ══ TABLET 769–900px ══ */
        @media (max-width:900px) {
          .campus-cards-grid { grid-template-columns:1fr 1fr !important; }
          .opp-inner         { flex-direction:column !important; height:auto !important; }
          .opp-left          { flex:unset !important; width:100% !important; min-height:280px !important; }
          .opp-right         { flex:unset !important; width:100% !important; }
          .tc-inner          { flex-direction:column !important; }
          .tc-form           { flex:0 0 auto !important; width:100% !important; max-width:100% !important; }
        }

        /* ══ MOBILE ≤ 768px ══ */
        @media (max-width: 768px) {

          .hero-badge {
            transform: scale(0.72) !important;
            transform-origin: right center !important;
            padding: 6px 10px !important;
          }

          div[style*="bottom: 40%"] .hero-badge,
          .hero-badge:last-of-type {
            transform-origin: left center !important;
          }

          .campus-inner {
            flex-direction: column !important;
            align-items: center !important;
            padding: 10px 20px 22px !important;
            text-align: center !important;
            gap: 20px !important;
          }

          .campus-title    { font-size: 2.8rem !important; }
          .campus-subtitle { font-size: 2.2rem !important; }
          .campus-right     { height: 30px !important; }
          .campus-right img { height: 80px !important; }
          .campus-right > div:first-child { width: 6% !important; max-width: 20px !important; }

          .campus-left {
            order: 1 !important;
            width: 90% !important;
            max-width: 100% !important;
            padding: 0 8px !important;
          }

          .campus-right {
            order: 2 !important;
            width: 100% !important;
            height: 20px !important;
          }

          .campus-bottom {
            order: 3 !important;
          }

          .campus-desc-desktop { display: none !important; }
          .campus-btn-desktop  { display: none !important; }

          .campus-right img { height: 200px !important; }
          .campus-right > div:first-child { width: 75% !important; max-width: 380px !important; bottom: -20px !important; }
          .campus-right > div[style*="Lifetime"],
          .campus-right > div[style*="Courses"],
          .campus-right > div[style*="Active"] { display: none !important; }

          .campus-cards-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
          .campus-cards-grid > div { padding: 24px 18px !important; border-radius: 14px !important; }

          /* IMPORTANT: Do NOT style .opp-* on mobile — the mobile branch
             renders with mob-opp-* classNames instead to avoid conflicts */

          .tc-inner { flex-direction: column !important; gap: 32px !important; }
          .tc-form  { flex: 0 0 auto !important; width: 100% !important; max-width: 100% !important; }
          .nl-inner { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
          .nl-form  { width: 100% !important; flex-direction: column !important; gap: 10px !important; }
          .nl-form input  { width: 100% !important; }
          .nl-form button { width: 100% !important; justify-content: center !important; }
        }

        /* Hide mobile-bottom on desktop */
        @media (min-width: 769px) {
          .campus-bottom { display: none !important; }
        }

        /* ══ SMALL MOBILE ≤ 480px ══ */
        @media (max-width: 480px) {
          .campus-title    { font-size: 2.8rem !important; }
          .campus-subtitle { font-size: 2.4rem !important; }
          .campus-right    { height: 190px !important; }
          .campus-right img { height: 170px !important; }
          .campus-right > div:first-child { width: 55% !important; max-width: 180px !important; }
        }

        /* ══ VERY SMALL ≤ 360px ══ */
        @media (max-width: 360px) {
          .campus-inner  { padding: 70px 14px 28px !important; }
          .campus-title  { font-size: 1.5rem !important; }
          .campus-subtitle { font-size: 1.2rem !important; }
          .campus-right  { height: 160px !important; }
          .campus-right img { height: 145px !important; }
          .campus-right > div:first-child { width: 50% !important; max-width: 155px !important; }
        }
      `}</style>

      <CampusHero onJoinClick={handleJoinClick} />
      <SocialSidebar />
      <AboutCampusSection />
      <OpportunitiesSection />
      <TestimonialsContactSection />
      <Footer />
    </div>
  );
}