import { useEffect, useRef, useState } from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";
import SocialSidebar from "../components/SocialSideBar";

const PUB = process.env.PUBLIC_URL || "";

function useInView(threshold = 0.08) {
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

/* ══════════════════════════════════════════════════════
   SECTION 1 — HERO
   Mobile order: 1. Title+arc  2. Image  3. Desc+button
   Then purple quote band
══════════════════════════════════════════════════════ */
function CareerHero() {
  const [arcReady, setArcReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setArcReady(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section style={{
      background: "#ede9ff",
      position: "relative", overflow: "hidden",
      fontFamily: "'Outfit', sans-serif",
      minHeight: "100vh",
      display: "flex", flexDirection: "column",
    }}>
      {/* dot grid */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: `radial-gradient(rgba(124,58,237,0.08) 1px,transparent 1px)`, backgroundSize: "28px 28px" }} />

      {/* Hero row — flex-wrap for mobile reorder */}
      <div className="career-hero-inner" style={{
        flex: 1,
        display: "flex", alignItems: "center",
        flexWrap: "wrap",
        maxWidth: "1280px", margin: "0 auto", width: "100%",
        padding: "70px clamp(16px,5%,72px) 0",
        gap: "0", position: "relative", zIndex: 1,
      }}>

        {/* ── 1st on mobile: Title + arc ── */}
        <div className="career-hero-left" style={{
          flex: "0 0 auto", width: "clamp(280px,44%,520px)", maxWidth: "100%",
          display: "flex", flexDirection: "column", alignItems: "flex-start",
          paddingTop: "20px",
        }}>
          <h1 className="cr-v1 career-title" style={{
            fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 900,
            lineHeight: 1.08, letterSpacing: "-1.5px",
            marginBottom: "12px", fontFamily: "'Outfit', sans-serif",
          }}>
            <span style={{ color: "#1a0640" }}>Unlock Your Career</span><br />
            <span style={{ color: "#f97316" }}>Potential</span>
          </h1>
          <div className="cr-v2" style={{ marginBottom: "22px" }}>
            <svg viewBox="0 0 300 16" style={{ width: "clamp(180px,26vw,300px)", height: "10px", overflow: "visible", display: "block" }} preserveAspectRatio="none">
              <path className={`career-arc${arcReady ? " career-arc-animate" : ""}`}
                d="M 4 12 C 65 2, 200 1, 296 10"
                fill="none" stroke="#7c3aed" strokeWidth="4.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Desktop — desc + button */}
          <p className="cr-v3 career-desc-desktop" style={{
            fontSize: "clamp(13px,1.3vw,14.5px)", color: "#5c4a80",
            lineHeight: 1.78, fontWeight: 400, marginBottom: "36px",
            maxWidth: "380px", fontFamily: "'Outfit', sans-serif",
          }}>
            Make smarter career decisions with expert guidance,
            personalized roadmaps, and real-world insights.
          </p>
          <div className="cr-v4 career-btn-desktop">
            <button className="career-cta-btn" style={{
              background: "#7c3aed", color: "#fff", border: "none",
              borderRadius: "50px", padding: "14px 32px",
              fontSize: "clamp(13px,1.3vw,14.5px)", fontWeight: 700,
              cursor: "pointer", fontFamily: "'Outfit', sans-serif",
              display: "inline-flex", alignItems: "center", gap: "10px",
              boxShadow: "0 6px 24px rgba(124,58,237,0.40)",
              transition: "all 0.22s", position: "relative", overflow: "hidden",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.03)"; e.currentTarget.style.boxShadow = "0 14px 36px rgba(124,58,237,0.55)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(124,58,237,0.40)"; }}
            >
              Book Consultation
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                <path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── 2nd on mobile: Image ── */}
        <div className="career-hero-right cr-vR" style={{
          flex: 1, position: "relative",
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          minHeight: "380px", overflow: "visible",
        }}>
          {/* Topographic contour lines */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
            viewBox="0 0 480 500" preserveAspectRatio="xMidYMid slice" fill="none">
            {[
              "M 80 10 C 140 30, 320 20, 420 80 C 460 120, 470 200, 430 280 C 400 340, 320 390, 240 420 C 160 450, 60 440, 20 380 C -20 320, 10 200, 50 130 C 70 80, 80 10, 80 10Z",
              "M 100 30 C 160 50, 300 40, 390 95 C 430 130, 445 210, 410 285 C 385 340, 310 385, 235 410 C 165 435, 75 425, 38 368 C 0 310, 28 205, 68 138 C 88 92, 100 30, 100 30Z",
              "M 120 52 C 178 70, 285 62, 365 108 C 400 138, 418 215, 390 286 C 368 338, 298 380, 228 402 C 164 422, 90 412, 58 358 C 24 302, 48 208, 88 144 C 108 102, 120 52, 120 52Z",
              "M 140 74 C 196 90, 272 84, 342 122 C 374 148, 390 220, 366 288 C 346 336, 284 374, 220 394 C 162 412, 104 400, 76 350 C 46 296, 68 212, 106 152 C 126 114, 140 74, 140 74Z",
              "M 162 98 C 214 112, 258 108, 318 138 C 346 158, 362 228, 340 290 C 323 334, 268 368, 212 386 C 160 402, 116 390, 94 342 C 68 290, 88 216, 124 160 C 144 126, 162 98, 162 98Z",
              "M 184 122 C 232 136, 244 132, 294 154 C 318 170, 334 236, 314 292 C 300 332, 252 362, 202 378 C 156 392, 128 382, 110 336 C 88 284, 108 220, 142 168 C 162 138, 184 122, 184 122Z",
              "M 206 148 C 250 160, 232 158, 270 172 C 292 184, 306 244, 288 294 C 276 330, 236 356, 194 370 C 152 382, 140 372, 126 330 C 108 278, 128 224, 160 176 C 180 150, 206 148, 206 148Z",
            ].map((d, i) => (
              <path key={i} d={d} stroke="#9b7fe8" strokeWidth={1.4 - i * 0.08} opacity={0.55 - i * 0.04} />
            ))}
          </svg>
          <img src={`${PUB}/career-hero.png`} alt="Career Guidance"
            style={{
              position: "relative", zIndex: 2,
              maxHeight: "clamp(260px,48vw,520px)",
              maxWidth: "100%", objectFit: "contain",
              objectPosition: "bottom center", display: "block",
              filter: "drop-shadow(0 16px 40px rgba(109,40,217,0.14))",
            }}
          />
        </div>

        {/* ── 3rd on mobile: Desc + button (mobile only) ── */}
        <div className="career-bottom" style={{
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: "20px", width: "100%",
          paddingBottom: "24px",
        }}>
          <p style={{ color: "#5c4a80", fontSize: "14.5px", lineHeight: 1.78, maxWidth: "360px", fontFamily: "'Outfit', sans-serif", fontWeight: 400, textAlign: "center" }}>
            Make smarter career decisions with expert guidance,
            personalized roadmaps, and real-world insights.
          </p>
          <button className="career-cta-btn" style={{
            background: "#7c3aed", color: "#fff", border: "none",
            borderRadius: "50px", padding: "14px 32px", fontSize: "14px", fontWeight: 700,
            cursor: "pointer", fontFamily: "'Outfit', sans-serif",
            display: "inline-flex", alignItems: "center", gap: "10px",
            boxShadow: "0 6px 24px rgba(124,58,237,0.40)",
            transition: "all 0.22s", position: "relative", overflow: "hidden",
          }}>
            Book Consultation
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

      </div>

      {/* Purple quote band */}
      <div className="cr-v5" style={{
        background: "#7c3aed",
        padding: "clamp(22px,4vw,38px) clamp(20px,6%,80px)",
        position: "relative", zIndex: 1,
      }}>
        <p style={{
          fontSize: "clamp(13px,1.6vw,17px)", color: "#fff",
          fontFamily: "'Outfit', sans-serif", fontStyle: "italic",
          fontWeight: 400, lineHeight: 1.75, textAlign: "center",
          maxWidth: "920px", margin: "0 auto",
        }}>
          "Choosing the right career is one of the most important decisions in life. Our career
          guidance program helps you identify your strengths, explore opportunities, and
          build a future-ready career path."
        </p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — SERVICE CARDS
   Rounded corners + gap between cards
   Horizontal scroll on mobile
══════════════════════════════════════════════════════ */
const SERVICES = [
  {
    bg: "#7c3aed", title: "Personalized Assessment",
    items: ["Skill & interest evaluation", "Career compatibility insights", "Strength mapping"],
    decor: "stars",
  },
  {
    bg: "#f97316", title: "Expert Counseling",
    items: ["Skill & interest evaluation", "Career compatibility insights", "Strength mapping"],
    decor: "dots",
  },
  {
    bg: "#1a1a2e", title: "Career Roadmap",
    items: ["Step-by-step planning", "Skill development", "Certification guidance"],
    decor: "circle",
  },
  {
    bg: "#111827", title: "Market Insight",
    items: ["High-demand careers", "Salary trends", "Future-proof roles"],
    decor: "stars2",
  },
];

function ServiceCard({ card, inView, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: card.bg,
        borderRadius: "20px",
        padding: "clamp(20px,3%,32px) clamp(18px,2.5%,28px) clamp(20px,3%,28px)",
        position: "relative", overflow: "hidden",
        flex: "1 0 0", minWidth: "220px",
        display: "flex", flexDirection: "column",
        opacity: inView ? 1 : 0,
        transform: inView ? (hov ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)") : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.32s cubic-bezier(0.34,1.56,0.64,1)`,
        boxShadow: hov ? `0 20px 50px ${card.bg}66` : "0 4px 20px rgba(0,0,0,0.10)",
        cursor: "default",
        minHeight: "220px",
      }}>

      {(card.decor === "stars" || card.decor === "stars2") && (<>
        <div style={{ position: "absolute", top: "16px", right: "20px", color: "rgba(255,255,255,0.28)", fontSize: "20px", animation: "starTwinkle 2.4s ease-in-out infinite" }}>✦</div>
        <div style={{ position: "absolute", bottom: "52px", right: "16px", color: "rgba(255,255,255,0.16)", fontSize: "12px", animation: "starTwinkle 2.4s ease-in-out 0.8s infinite" }}>✦</div>
        <div style={{ position: "absolute", top: "50px", right: "40px", color: "rgba(255,255,255,0.12)", fontSize: "8px", animation: "starTwinkle 2.4s ease-in-out 1.4s infinite" }}>✦</div>
      </>)}
      {card.decor === "dots" && (
        <div style={{ position: "absolute", bottom: "12px", right: "12px", width: "60px", height: "60px",
          backgroundImage: "radial-gradient(rgba(255,255,255,0.28) 1.8px,transparent 1.8px)", backgroundSize: "9px 9px",
          animation: "dotPulse 3s ease-in-out infinite" }} />
      )}
      {card.decor === "circle" && (<>
        <div style={{ position: "absolute", bottom: "-24px", right: "-24px", width: "100px", height: "100px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.14)", animation: "ringPulse 3s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "-10px", right: "-10px", width: "60px", height: "60px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)" }} />
      </>)}

      <h3 style={{ fontSize: "clamp(13px,1.4vw,15px)", fontWeight: 800, color: "#fff", fontFamily: "'Outfit',sans-serif", marginBottom: "14px", lineHeight: 1.3, position: "relative", zIndex: 1 }}>
        {card.title}
      </h3>
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 auto 0", display: "flex", flexDirection: "column", gap: "8px", position: "relative", zIndex: 1 }}>
        {card.items.map((item, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "clamp(11px,1.1vw,12.5px)", color: "rgba(255,255,255,0.75)", fontFamily: "'Outfit',sans-serif", lineHeight: 1.5 }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.55)", flexShrink: 0, marginTop: "5px" }} />
            {item}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: "22px", display: "flex", alignItems: "center", gap: "8px", position: "relative", zIndex: 1, cursor: "pointer" }}>
        <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.82)", fontFamily: "'Outfit',sans-serif" }}>Discover more</span>
        <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(255,255,255,0.18)", border: "1.5px solid rgba(255,255,255,0.30)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.22s", transform: hov ? "translateX(4px)" : "translateX(0)" }}>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </div>
    </div>
  );
}

function ServicesSection() {
  const [ref, inView] = useInView(0.08);
  return (
    <section ref={ref} style={{ background: "#fff", padding: "clamp(32px,5vw,52px) 0" }}>
      <style>{`
        @keyframes starTwinkle { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.7)} }
        @keyframes dotPulse    { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes ringPulse   { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(1.1);opacity:1} }
        .srv-grid { display:flex; gap:16px; padding:0 clamp(16px,4%,40px); }
        .srv-grid::-webkit-scrollbar { display:none; }
        @media(max-width:768px){
          .srv-grid { overflow-x:auto !important; scroll-snap-type:x mandatory !important; -webkit-overflow-scrolling:touch !important; padding-bottom:8px !important; }
          .srv-grid > div { flex:0 0 78vw !important; min-width:78vw !important; scroll-snap-align:start !important; }
        }
        @media(max-width:480px){
          .srv-grid > div { flex:0 0 86vw !important; min-width:86vw !important; }
        }
      `}</style>
      <div className="srv-grid" style={{ scrollbarWidth: "none" }}>
        {SERVICES.map((card, i) => (
          <div key={i} style={{ flex: "1 0 0", minWidth: "220px" }}>
            <ServiceCard card={card} inView={inView} delay={0.05 + i * 0.1} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — THE PROCESS WE DO
   Vertical roadmap on ALL screen sizes
   Animated left line with nodes, PNG images floating (no circle bg)
   Alternating left/right layout on desktop, left-aligned on mobile
══════════════════════════════════════════════════════ */
const PROCESS_STEPS = [
  { label: "Discover Yourself",     img: "process-1.png", emoji: "🤔", side: "left"  },
  { label: "Explore Opportunities", img: "process-2.png", emoji: "🔍", side: "right" },
  { label: "Decide Path",           img: "process-3.png", emoji: "✅", side: "left"  },
  { label: "Build Skills",          img: "process-4.png", emoji: "🛠️", side: "right" },
  { label: "Achieve Goal",          img: "process-5.png", emoji: "🏆", side: "left"  },
];

function ProcessSection() {
  const [ref, inView] = useInView(0.06);
  return (
    <section ref={ref} style={{ background: "#ede9ff", padding: "clamp(56px,8vw,88px) 0 clamp(64px,10vw,110px)", fontFamily: "'Outfit',sans-serif", overflow: "hidden" }}>
      <style>{`
        @keyframes floatBob   { 0%,100%{transform:translateY(0px)}   50%{transform:translateY(-14px)} }
        @keyframes floatBobR  { 0%,100%{transform:translateY(-6px)}  50%{transform:translateY(6px)}   }
        @keyframes lineGrow   { from{height:0} to{height:100%} }
        @keyframes nodePop    { from{transform:scale(0) rotate(-30deg);opacity:0} to{transform:scale(1) rotate(0deg);opacity:1} }
        @keyframes labelSlideL { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:translateX(0)} }
        @keyframes labelSlideR { from{opacity:0;transform:translateX(24px)}  to{opacity:1;transform:translateX(0)} }
        .proc-node { animation: nodePop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; opacity:0; }
        .proc-label-l { animation: labelSlideL 0.5s ease forwards; opacity:0; }
        .proc-label-r { animation: labelSlideR 0.5s ease forwards; opacity:0; }
        .proc-img-odd  { animation: floatBob  3.8s ease-in-out infinite; }
        .proc-img-even { animation: floatBobR 4.2s ease-in-out infinite; }
      `}</style>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 clamp(16px,4%,40px)" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(48px,8vw,80px)", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
          <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.8rem)", fontWeight: 900, color: "#111827", letterSpacing: "-0.03em", marginBottom: "14px", fontFamily: "'Outfit',sans-serif" }}>
            The Process We Do
          </h2>
          <p style={{ fontSize: "clamp(13px,1.3vw,14.5px)", color: "#6b7280", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7, fontFamily: "'Outfit',sans-serif" }}>
            Powerful natural language processing capabilities, that can understand and respond to customer inquiries in real-time &amp; improve customer satisfaction.
          </p>
        </div>

        {/* ── Vertical roadmap ── */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* Animated vertical line */}
          <div style={{
            position: "absolute",
            left: "50%", top: 0, bottom: 0,
            width: "3px",
            transform: "translateX(-50%)",
            background: "linear-gradient(180deg, #c4b5fd 0%, #7c3aed 50%, #c4b5fd 100%)",
            borderRadius: "3px",
            transformOrigin: "top center",
            opacity: inView ? 1 : 0,
            animation: inView ? "lineGrow 1.6s ease 0.3s forwards" : "none",
            height: inView ? "100%" : "0",
            transition: "height 1.6s ease 0.3s, opacity 0.4s ease 0.2s",
          }} />

          {/* Steps */}
          {PROCESS_STEPS.map((step, i) => {
            const isLeft = step.side === "left";
            const imgClass = i % 2 === 0 ? "proc-img-odd" : "proc-img-even";
            const labelClass = isLeft ? "proc-label-l" : "proc-label-r";
            const delay = `${0.5 + i * 0.22}s`;

            return (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                marginBottom: i < PROCESS_STEPS.length - 1 ? "clamp(40px,8vw,80px)" : "0",
                flexDirection: isLeft ? "row" : "row-reverse",
                position: "relative",
              }}>

                {/* Content side */}
                <div className={labelClass} style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isLeft ? "flex-end" : "flex-start",
                  paddingRight: isLeft ? "clamp(24px,4%,48px)" : "0",
                  paddingLeft: isLeft ? "0" : "clamp(24px,4%,48px)",
                  animationDelay: delay,
                }}>
                  {/* PNG image — floating, no background */}
                  <div className={imgClass} style={{ marginBottom: "12px" }}>
                    <img
                      src={`${PUB}/${step.img}`}
                      alt={step.label}
                      style={{
                        width: "clamp(70px,10vw,120px)",
                        height: "clamp(70px,10vw,120px)",
                        objectFit: "contain",
                        display: "block",
                        filter: "drop-shadow(0 12px 28px rgba(109,40,217,0.22))",
                      }}
                      onError={e => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "block";
                      }}
                    />
                    <span style={{ fontSize: "clamp(44px,8vw,72px)", display: "none", lineHeight: 1 }}>{step.emoji}</span>
                  </div>
                  <span style={{
                    fontSize: "clamp(14px,1.5vw,17px)", fontWeight: 800,
                    color: "#7c3aed", fontFamily: "'Outfit',sans-serif",
                    textAlign: isLeft ? "right" : "left",
                    lineHeight: 1.3,
                  }}>
                    {step.label}
                  </span>
                  <span style={{
                    fontSize: "clamp(11px,1vw,13px)", fontWeight: 500,
                    color: "#9b7fe8", fontFamily: "'Outfit',sans-serif",
                    marginTop: "4px",
                  }}>
                    Step {i + 1}
                  </span>
                </div>

                {/* Center node */}
                <div className="proc-node" style={{
                  width: "clamp(44px,5vw,56px)",
                  height: "clamp(44px,5vw,56px)",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#7c3aed,#a78bfa)",
                  border: "4px solid #ede9ff",
                  boxShadow: "0 6px 24px rgba(124,58,237,0.42)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, zIndex: 2,
                  animationDelay: delay,
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="2" />
                    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Empty spacer side */}
                <div style={{ flex: 1 }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — TESTIMONIALS + CONTACT FORM
══════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  { name: "Aria Zinanrio", text: "I am very helped by this E-wallet application, my days are very easy to use this application and its very helpful in my life, even I can pay a short time 😊", avatar: "AZ", color: "#7c3aed" },
  { name: "Rahul Sharma",  text: "Skillra Career Guidance completely transformed my approach to job searching. I secured 3 interviews within 2 weeks of following their roadmap.", avatar: "RS", color: "#059669" },
  { name: "Priya Nair",    text: "The personalized assessment was eye-opening. I finally understood which career paths aligned with my actual strengths.", avatar: "PN", color: "#dc2626" },
  { name: "Karthik V",     text: "Expert counseling sessions gave me clarity I never had before. The mentors are incredibly supportive and industry-aware.", avatar: "KV", color: "#d97706" },
];

function TestimonialsSection() {
  const [ref, inView] = useInView(0.06);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", desc: "" });
  const [submitted, setSubmitted] = useState(false);
  const autoRef = useRef(null);

  const goNext = () => setActiveIdx(p => (p + 1) % TESTIMONIALS.length);
  const handlePlay = () => {
    if (isPlaying) { clearInterval(autoRef.current); setIsPlaying(false); }
    else { goNext(); autoRef.current = setInterval(goNext, 3000); setIsPlaying(true); }
  };
  const handleAvatar = (i) => { clearInterval(autoRef.current); setIsPlaying(false); setActiveIdx(i); };
  useEffect(() => () => clearInterval(autoRef.current), []);

  return (
    <section ref={ref} style={{ background: "#ede9ff", padding: "clamp(56px,8vw,88px) 0 clamp(64px,10vw,96px)", fontFamily: "'Outfit',sans-serif" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(16px,4%,40px)" }}>
        <div className="testi-inner" style={{ display: "flex", gap: "clamp(24px,5%,64px)", alignItems: "flex-start" }}>

          {/* LEFT */}
          <div style={{ flex: 1, minWidth: 0, opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-24px)", transition: "all 0.7s ease 0.1s" }}>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, color: "#7c3aed", fontFamily: "'Outfit',sans-serif", marginBottom: "8px" }}>Testimonials</h2>
            <p style={{ fontSize: "14px", color: "#5c4a80", fontFamily: "'Outfit',sans-serif", marginBottom: "32px", fontStyle: "italic" }}>Every Story Matters. Every Success Counts.</p>
            <div style={{ marginBottom: "18px" }}>
              <svg width="48" height="36" viewBox="0 0 52 38" fill="none">
                <path d="M0 38V23C0 15.3 2.8 9.6 8.4 5.8 14 2 20.7 0.2 28.5 0.2V7.4C25 7.4 22 8.3 19.4 10 16.8 11.6 15.5 14 15.3 17.2H24V38H0ZM28 38V23C28 15.3 30.8 9.6 36.4 5.8 42 2 48.7 0.2 56.5 0.2V7.4C53 7.4 50 8.3 47.4 10 44.8 11.6 43.5 14 43.3 17.2H52V38H28Z" fill="#7c3aed" opacity="0.18" />
              </svg>
            </div>
            <div key={activeIdx} className="testi-slide" style={{ minHeight: "110px", marginBottom: "28px" }}>
              <p style={{ fontSize: "clamp(13px,1.4vw,15px)", color: "#374151", fontFamily: "'Outfit',sans-serif", lineHeight: 1.85 }}>{TESTIMONIALS[activeIdx].text}</p>
              <p style={{ fontSize: "13px", color: "#7c3aed", fontFamily: "'Outfit',sans-serif", fontWeight: 700, marginTop: "14px" }}>— {TESTIMONIALS[activeIdx].name}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} onClick={() => handleAvatar(i)} style={{ width: "42px", height: "42px", borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#fff", fontFamily: "'Outfit',sans-serif", cursor: "pointer", flexShrink: 0, border: activeIdx === i ? "3px solid #7c3aed" : "3px solid transparent", boxShadow: activeIdx === i ? "0 0 0 2px #fff,0 0 0 4px #7c3aed" : "none", transform: activeIdx === i ? "scale(1.12)" : "scale(1)", transition: "all 0.22s" }}>{t.avatar}</div>
              ))}
              <div onClick={handlePlay} style={{ width: "42px", height: "42px", borderRadius: "50%", border: `2px solid ${isPlaying ? "#7c3aed" : "#c4b5fd"}`, background: isPlaying ? "#f3f0ff" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginLeft: "4px", transition: "all 0.22s", flexShrink: 0 }}>
                {isPlaying
                  ? <svg width="11" height="13" viewBox="0 0 12 14" fill="none"><rect x="1" y="1" width="3.5" height="12" rx="1" fill="#7c3aed" /><rect x="7.5" y="1" width="3.5" height="12" rx="1" fill="#7c3aed" /></svg>
                  : <svg width="12" height="14" viewBox="0 0 14 16" fill="none"><path d="M1 1l12 7-12 7V1z" fill="#9ca3af" /></svg>
                }
              </div>
            </div>
          </div>

          {/* RIGHT — contact form */}
          <div className="testi-form" style={{ flex: "0 0 clamp(280px,38%,400px)", background: "#fff", borderRadius: "20px", padding: "clamp(24px,4%,36px) clamp(20px,4%,32px)", boxShadow: "0 8px 40px rgba(109,40,217,0.10)", border: "1.5px solid rgba(124,58,237,0.08)", opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(24px)", transition: "all 0.7s ease 0.2s" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ fontSize: "44px", marginBottom: "14px" }}>🎉</div>
                <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#111827", fontFamily: "'Outfit',sans-serif", marginBottom: "8px" }}>Message Sent!</h3>
                <p style={{ fontSize: "13px", color: "#6b7280", fontFamily: "'Outfit',sans-serif" }}>We'll get back to you shortly.</p>
                <button onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", desc: "" }); }} style={{ marginTop: "20px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: "50px", padding: "10px 24px", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>Send another</button>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: "clamp(16px,2vw,20px)", fontWeight: 900, color: "#111827", fontFamily: "'Outfit',sans-serif", marginBottom: "6px" }}>We're here to help!</h3>
                <p style={{ fontSize: "13px", color: "#9ca3af", fontFamily: "'Outfit',sans-serif", marginBottom: "24px" }}>Please contact us in case of any query.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    { key: "name",  placeholder: "Your name",         type: "text"  },
                    { key: "email", placeholder: "Your email address", type: "email" },
                    { key: "phone", placeholder: "Your phone number",  type: "tel"   },
                    { key: "desc",  placeholder: "Description",        type: "text"  },
                  ].map(field => (
                    <input key={field.key} type={field.type} placeholder={field.placeholder}
                      value={formData[field.key]}
                      onChange={e => setFormData(p => ({ ...p, [field.key]: e.target.value }))}
                      style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #e5e7eb", borderRadius: "10px", fontSize: "13.5px", fontFamily: "'Outfit',sans-serif", color: "#374151", outline: "none", background: "#fafafa", transition: "border-color 0.2s", boxSizing: "border-box" }}
                      onFocus={e => { e.currentTarget.style.borderColor = "#a78bfa"; e.currentTarget.style.background = "#fff"; }}
                      onBlur={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.background = "#fafafa"; }}
                    />
                  ))}
                  <button onClick={() => { if (formData.name && formData.email) setSubmitted(true); }}
                    style={{ background: "linear-gradient(135deg,#7c3aed,#5b21b6)", color: "#fff", border: "none", borderRadius: "50px", padding: "13px 24px", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 6px 18px rgba(124,58,237,0.32)", transition: "all 0.22s", marginTop: "4px" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(124,58,237,0.46)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(124,58,237,0.32)"; }}>
                    Get in Touch
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
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

/* ══════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════ */
export default function CareerPage() {
  return (
    <div style={{ fontFamily: "'Outfit','Segoe UI',sans-serif", margin: 0, padding: 0, overflowX: "hidden", background: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html, body { overflow-x:hidden; }

        /* Arc */
        @keyframes drawCareerArc { from{stroke-dashoffset:380} to{stroke-dashoffset:0} }
        .career-arc             { stroke-dasharray:380; stroke-dashoffset:380; }
        .career-arc.career-arc-animate { animation:drawCareerArc 1.6s cubic-bezier(0.25,0.1,0.2,1) 0.5s forwards; }

        /* Hero entrances */
        @keyframes crFadeRight { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes crFadeUp    { from{opacity:0;transform:translateY(22px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes crFadeScale { from{opacity:0;transform:scale(0.90)}       to{opacity:1;transform:scale(1)} }
        @keyframes crFadeIn    { from{opacity:0} to{opacity:1} }
        @keyframes shimmer     { 0%{background-position:-200% center} 100%{background-position:200% center} }

        .cr-v1 { animation:crFadeRight 0.65s ease forwards; opacity:0; animation-delay:0.10s; }
        .cr-v2 { animation:crFadeUp    0.65s ease forwards; opacity:0; animation-delay:0.24s; }
        .cr-v3 { animation:crFadeUp    0.65s ease forwards; opacity:0; animation-delay:0.38s; }
        .cr-v4 { animation:crFadeUp    0.65s ease forwards; opacity:0; animation-delay:0.52s; }
        .cr-v5 { animation:crFadeIn    0.8s  ease forwards; opacity:0; animation-delay:0.70s; }
        .cr-vR { animation:crFadeScale 1.0s  ease forwards; opacity:0; animation-delay:0.20s; }

        .career-cta-btn::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent);
          background-size:200% 100%; animation:shimmer 2.4s infinite;
        }

        /* Testi */
        @keyframes tesFadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .testi-slide { animation:tesFadeUp 0.36s cubic-bezier(0.22,1,0.36,1) forwards; }

        input::placeholder { color:#9ca3af; }
        input:focus { outline:none; }

        /* ══ RESPONSIVE ══ */

        /* Tablet */
        @media(max-width:1024px) and (min-width:769px){
          .career-hero-inner { gap:20px !important; padding:50px clamp(16px,4%,40px) 0 !important; }
          .career-hero-left  { width:clamp(260px,44%,420px) !important; }
        }

        /* Mobile ≤ 768px — same 3-order pattern as CampusPage */
        @media(max-width:768px){
          .career-hero-inner {
            flex-direction: column !important;
            text-align: center !important;
            padding: 90px 16px 0 !important;
            gap: 16px !important;
            align-items: center !important;
          }

          /* 1st — title + arc */
          .career-hero-left {
            order: 1 !important;
            width: 100% !important;
            max-width: 100% !important;
            align-items: center !important;
            padding-top: 0 !important;
          }

          /* 2nd — image */
          .career-hero-right {
            order: 2 !important;
            width: 100% !important;
            min-height: 200px !important;
            max-height: 260px !important;
          }
          .career-hero-right img { max-height: 240px !important; }

          /* 3rd — desc + button */
          .career-bottom { order: 3 !important; }

          /* Hide desktop desc+button */
          .career-desc-desktop { display: none !important; }
          .career-btn-desktop  { display: none !important; }

          /* Testimonials */
          .testi-inner { flex-direction: column !important; }
          .testi-form  { flex:0 0 auto !important; width:100% !important; max-width:100% !important; }

          /* Process — on mobile, stack to left side only */
          .proc-label-l, .proc-label-r {
            align-items: flex-start !important;
            padding-left: 24px !important;
            padding-right: 0 !important;
          }
        }

        /* Hide mobile-bottom on desktop */
        @media(min-width:769px){
          .career-bottom { display:none !important; }
        }

        /* Small mobile */
        @media(max-width:480px){
          .career-title { font-size:1.8rem !important; }
          .career-hero-right { max-height:220px !important; }
          .career-hero-right img { max-height:200px !important; }
        }

        /* Very small */
        @media(max-width:360px){
          .career-hero-inner { padding:70px 12px 0 !important; }
          .career-title { font-size:1.6rem !important; }
        }
      `}</style>

      <Navbar />
      <SocialSidebar />
      <CareerHero />
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}