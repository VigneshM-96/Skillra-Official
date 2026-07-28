import { useEffect, useRef, useState } from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";
import SocialSidebar from "../components/SocialSideBar";
import { useSanityMeta } from '../hooks/useSanityMeta';

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
   PHONE CAROUSEL — infinite auto-rotation
   Center slot is always sharp/full-opacity, the two side
   slots stay dimmed. Every interval the three screenshots
   rotate through the three slots with a soft cross-fade.
═══════════════════════════════════════════════════ */
const PHONE_IMAGES = [
  `${PUB}/app-sc1.jpeg`, // splash / "Skillra AI - Your Learning Assistant"
  `${PUB}/app-sc1.jpeg`, // lesson detail (e.g. skeleton system)
  `${PUB}/app-sc1.jpeg`, // course list / dashboard
];

const ROTATE_INTERVAL_MS = 3500;
const FADE_MS = 450;

function usePhoneRotation() {
  // order = [centerIdx, rightIdx, leftIdx] — indices into PHONE_IMAGES
  const [order, setOrder] = useState([0, 1, 2]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      const t = setTimeout(() => {
        setOrder(([c, r, l]) => [r, l, c]); // rotate: right -> center, left -> right, center -> left
        setFading(false);
      }, FADE_MS);
      return () => clearTimeout(t);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return { order, fading };
}

/* ═══════════════════════════════════════════════════
   FLOATING BADGES (reused visual language from AboutHero)
═══════════════════════════════════════════════════ */
function FloatingBadge({ icon, label, style, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div className="hero-badge" style={{
      position: "absolute", display: "flex", alignItems: "center", gap: "8px",
      background: "rgba(255,255,255,0.95)", backdropFilter: "blur(18px) saturate(1.6)",
      WebkitBackdropFilter: "blur(18px) saturate(1.6)",
      border: "1.5px solid rgba(255,255,255,0.98)", borderRadius: "12px",
      padding: "clamp(6px,1vw,10px) clamp(10px,2vw,16px)",
      boxShadow: "0 8px 28px rgba(109,40,217,0.13), 0 1px 0 rgba(255,255,255,0.9) inset",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.93)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.55s cubic-bezier(.34,1.56,.64,1) ${delay}ms`,
      zIndex: 20, ...style,
    }}>
      <div style={{
        width: "clamp(26px,3.5vw,34px)", height: "clamp(26px,3.5vw,34px)",
        borderRadius: "8px",
        background: "linear-gradient(135deg,rgba(124,58,237,0.10),rgba(167,139,250,0.18))",
        border: "1px solid rgba(124,58,237,0.18)",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>{icon}</div>
      <div style={{
        fontSize: "clamp(10px,1.2vw,13px)", fontWeight: 700, color: "#1a0640",
        lineHeight: 1.2, fontFamily: "'Outfit',sans-serif", whiteSpace: "nowrap",
      }}>{label}</div>
    </div>
  );
}

function RatingBadge({ style, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div className="hero-badge" style={{
      position: "absolute", display: "flex", alignItems: "center", gap: "8px",
      background: "#1a1035", borderRadius: "50px",
      padding: "clamp(5px,1vw,8px) clamp(10px,2vw,16px) clamp(5px,1vw,8px) clamp(5px,1vw,8px)",
      boxShadow: "0 8px 28px rgba(20,8,56,0.35)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.93)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.55s cubic-bezier(.34,1.56,.64,1) ${delay}ms`,
      zIndex: 20, ...style,
    }}>
      <div style={{
        width: "clamp(26px,3.5vw,34px)", height: "clamp(26px,3.5vw,34px)",
        borderRadius: "50%",
        background: "linear-gradient(135deg,#f97316,#fbbf24)",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <svg width="15" height="15" viewBox="0 0 20 20" fill="white"><path d="M10 1l2.6 5.6 6.1.6-4.6 4.2 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.2 6.1-.6z" /></svg>
      </div>
      <div>
        <div style={{ fontSize: "clamp(11px,1.4vw,14px)", fontWeight: 800, color: "#fff", lineHeight: 1, fontFamily: "'Outfit',sans-serif" }}>4.8 / 5</div>
        <div style={{ fontSize: "clamp(8px,1vw,10px)", color: "rgba(255,255,255,0.65)", marginTop: "2px", fontWeight: 500, fontFamily: "'Outfit',sans-serif" }}>App Rating</div>
      </div>
    </div>
  );
}

function DiamondPattern({ isMobile = false, anchor = "bottom" }) {
  const patId = isMobile ? "prodDiamondMobile" : "prodDiamondDesktop";
  const centered = anchor === "center";
  return (
    <div style={{
      position: "absolute",
      ...(centered
        ? { top: "50%", left: "50%", transform: "translate(-50%,-50%)" }
        : { bottom: 0, left: "50%", transform: "translateX(-50%)" }),
      width: isMobile ? "min(300px, 82%)" : "min(430px, 88%)",
      aspectRatio: centered ? "1/1" : "460/500",
      borderRadius: centered ? "50%" : "50% 50% 0 0 / 48% 48% 0 0",
      background: "rgba(195,180,255,0.25)",
      overflow: "hidden",
      zIndex: 1,
    }}>
      <svg viewBox="0 0 460 500" style={{ width: "100%", height: "100%", display: "block" }}>
        <defs>
          <pattern id={patId} x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <rect x="14" y="2" width="11" height="11" rx="1.5" transform="rotate(45 14 7.5)"
              fill="none" stroke="rgba(124,58,237,0.5)" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="460" height="500" fill={`url(#${patId})`} />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PHONE CLUSTER — renders the 3-phone rotating stack.
   Same `order`/`fading` state is shared between the
   desktop and mobile layouts so there's only one timer.
═══════════════════════════════════════════════════ */
function PhoneCluster({ isMobile, order, fading }) {
  const [centerIdx, rightIdx, leftIdx] = order;

  const sizing = isMobile
    ? { side: "26%", center: "34%", sideRadius: "18px", centerRadius: "24px", sidePad: "5px", centerPad: "6px", innerSideRadius: "13px", innerCenterRadius: "18px" }
    : { side: "clamp(120px,15vw,165px)", center: "clamp(190px,25vw,260px)", sideRadius: "28px", centerRadius: "36px", sidePad: "7px", centerPad: "9px", innerSideRadius: "21px", innerCenterRadius: "28px" };

  return (
    <>
      {/* Left phone — dimmed, behind */}
      <div style={{
        position: "absolute", zIndex: 2, top: "50%", left: isMobile ? "10%" : "6%",
        width: sizing.side, aspectRatio: "9/19.5",
        borderRadius: sizing.sideRadius,
        background: "#1a1035",
        padding: sizing.sidePad,
        boxShadow: isMobile ? "0 12px 26px rgba(109,40,217,0.16)" : "0 18px 40px rgba(109,40,217,0.18)",
        transform: `translateY(-50%) rotate(-8deg) scale(${fading ? 0.88 : 0.92})`,
        opacity: fading ? 0 : 0.45,
        filter: "blur(0.3px)",
        transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
      }}>
        <img
          key={`left-${leftIdx}`}
          src={PHONE_IMAGES[leftIdx]}
          alt="Skillra app screenshot"
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: sizing.innerSideRadius, display: "block" }}
          onError={e => { e.target.style.display = "none"; }}
        />
      </div>

      {/* Right phone — dimmed, behind */}
      <div style={{
        position: "absolute", zIndex: 2, top: "50%", right: isMobile ? "10%" : "6%",
        width: sizing.side, aspectRatio: "9/19.5",
        borderRadius: sizing.sideRadius,
        background: "#1a1035",
        padding: sizing.sidePad,
        boxShadow: isMobile ? "0 12px 26px rgba(109,40,217,0.16)" : "0 18px 40px rgba(109,40,217,0.18)",
        transform: `translateY(-50%) rotate(-8deg) scale(${fading ? 0.88 : 0.92})`,
        opacity: fading ? 0 : 0.45,
        filter: "blur(0.3px)",
        transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
      }}>
        <img
          key={`right-${rightIdx}`}
          src={PHONE_IMAGES[rightIdx]}
          alt="Skillra app screenshot"
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: sizing.innerSideRadius, display: "block" }}
          onError={e => { e.target.style.display = "none"; }}
        />
      </div>

      {/* Center phone — sharp, in front */}
      <div style={{
        position: "relative", zIndex: 6,
        width: sizing.center, aspectRatio: "9/19.5",
        borderRadius: sizing.centerRadius,
        background: "#1a1035",
        padding: sizing.centerPad,
        boxShadow: isMobile ? "0 22px 44px rgba(109,40,217,0.32)" : "0 34px 70px rgba(109,40,217,0.36)",
        opacity: fading ? 0.35 : 1,
        transform: `scale(${fading ? 0.96 : 1})`,
        transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
      }}>
        <img
          key={`center-${centerIdx}`}
          src={PHONE_IMAGES[centerIdx]}
          alt="Skillra app home screen"
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: sizing.innerCenterRadius, display: "block" }}
          onError={e => { e.target.style.display = "none"; }}
        />
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════
   HERO — Quote + Play Store CTA (left) / App screenshots (right)
═══════════════════════════════════════════════════ */
function ProductsHero() {
  const { order, fading } = usePhoneRotation();

  return (
    <section id="products-home" style={{
      background: "radial-gradient(ellipse 110% 110% at 15% 50%,rgba(210,195,255,0.55) 0%,rgba(220,210,255,0.40) 40%,#ede8f8 100%)",
      minHeight: "88vh", display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
      paddingTop: "70px",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `radial-gradient(rgba(124,58,237,0.08) 1px,transparent 1px)`,
        backgroundSize: "28px 28px"
      }} />

      {/* ── Desktop Layout ── */}
      <div className="prod-inner prod-desktop" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "nowrap",
        padding: "0 5%", width: "100%", gap: "16px",
        position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto",
      }}>

        {/* Left: Eyebrow + Quote + CTA */}
        <div className="prod-left" style={{ flex: "0 0 auto", width: "500px", maxWidth: "100%" }}>
          <div className="pr-v1" style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            background: "rgba(124,58,237,0.10)", borderRadius: "50px",
            padding: "6px 14px", marginBottom: "18px",
          }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#7c3aed" }} />
            <span style={{ fontSize: "11.5px", fontWeight: 800, color: "#7c3aed", fontFamily: "'Outfit',sans-serif", letterSpacing: "0.08em" }}>
              OUR PRODUCT
            </span>
          </div>

          <blockquote className="pr-v1" style={{
            fontSize: "clamp(1.6rem,3.4vw,2.6rem)", fontWeight: 900,
            lineHeight: 1.16, letterSpacing: "-1px",
            marginBottom: "20px", fontFamily: "'Outfit', sans-serif",
            color: "#1a0640",
          }}>
            "Learning shouldn't stop when you close your <span style={{ color: "#f97316" }}>laptop.</span>"
          </blockquote>

          <p className="pr-v2" style={{ color: "#5c4a80", fontSize: "clamp(13px,1.5vw,14.5px)", lineHeight: 1.8, marginBottom: "34px", maxWidth: "420px", fontFamily: "'Outfit',sans-serif", fontWeight: 400 }}>
            Skillra AI puts your courses, mock interviews, and career guidance in your pocket — so progress happens on your schedule, not just in a classroom.
          </p>

          <div className="pr-v3" style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "12px",
                background: "#111827", color: "#fff", borderRadius: "14px",
                padding: "11px 20px", textDecoration: "none",
                boxShadow: "0 10px 28px rgba(17,24,39,0.28)",
                transition: "all 0.22s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 36px rgba(17,24,39,0.40)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(17,24,39,0.28)"; }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3.6 2.4c-.35.35-.55.85-.55 1.5v16.2c0 .65.2 1.15.55 1.5l.1.1L13.3 12v-.2L3.7 2.3l-.1.1z" fill="#00d9ff"/>
                <path d="M16.6 15.3l-3.3-3.3v-.2l3.3-3.3.1.05 3.9 2.2c1.1.65 1.1 1.7 0 2.35l-3.9 2.2-.1.05z" fill="#ffbc00"/>
                <path d="M16.7 15.25L13.3 11.8 3.6 21.6c.4.4 1.05.45 1.8.05l11.3-6.4" fill="#ff3a44"/>
                <path d="M16.7 8.35L5.4 1.95c-.75-.4-1.4-.35-1.8.05l9.7 9.8 3.4-3.45z" fill="#00e177"/>
              </svg>
              <div>
                <div style={{ fontSize: "9.5px", fontWeight: 500, opacity: 0.8, fontFamily: "'Outfit',sans-serif", lineHeight: 1 }}>GET IT ON</div>
                <div style={{ fontSize: "15px", fontWeight: 800, fontFamily: "'Outfit',sans-serif", lineHeight: 1.3, marginTop: "2px" }}>Google Play</div>
              </div>
            </a>
          </div>
        </div>

        {/* Right: Phone screenshots — center big & sharp, sides dimmed behind it, auto-rotating */}
        <div className="prod-right pr-vR" style={{
          flex: 1, display: "flex", justifyContent: "center", alignItems: "center",
          position: "relative", minWidth: 0,
          height: "clamp(420px, 56vw, 600px)",
          overflow: "visible",
        }}>
          <DiamondPattern anchor="center" />

          <PhoneCluster isMobile={false} order={order} fading={fading} />

          {/* Badges — hugging the right side of the phone cluster */}
          <FloatingBadge
            icon={<svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 2l6.5 3.75v8.5L10 18l-6.5-3.75v-8.5z" stroke="#7c3aed" strokeWidth="1.6" strokeLinejoin="round" fill="none"/><path d="M10 2v16M3.5 5.75L10 10l6.5-4.25" stroke="#7c3aed" strokeWidth="1.6" strokeLinejoin="round"/></svg>}
            label="AI Powered" style={{ top: "6%", right: "2%" }} delay={600}
          />
          <RatingBadge style={{ top: "44%", right: "-4%" }} delay={800} />
          <FloatingBadge
            icon={<svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M3 10h14M3 6h14M3 14h9" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round"/></svg>}
            label="Offline Access" style={{ bottom: "8%", right: "4%" }} delay={1000}
          />
        </div>
      </div>

      {/* ── Mobile Layout ── */}
      <div className="prod-mobile" style={{
        display: "none", flexDirection: "column", alignItems: "center",
        width: "100%", position: "relative", zIndex: 1,
        padding: "90px 6% 40px", gap: "0",
      }}>

        <div style={{
          display: "inline-flex", alignItems: "center", gap: "7px",
          background: "rgba(124,58,237,0.10)", borderRadius: "50px",
          padding: "6px 14px", marginBottom: "16px",
        }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#7c3aed" }} />
          <span style={{ fontSize: "11px", fontWeight: 800, color: "#7c3aed", fontFamily: "'Outfit',sans-serif", letterSpacing: "0.08em" }}>OUR PRODUCT</span>
        </div>

        <blockquote style={{
          fontSize: "clamp(1.5rem,6.5vw,2rem)", fontWeight: 900,
          lineHeight: 1.18, letterSpacing: "-0.5px",
          marginBottom: "14px", fontFamily: "'Outfit', sans-serif",
          color: "#1a0640", textAlign: "center",
        }}>
          "Learning shouldn't stop when you close your <span style={{ color: "#f97316" }}>laptop.</span>"
        </blockquote>

        <p style={{ color: "#5c4a80", fontSize: "13.5px", lineHeight: 1.8, marginBottom: "26px", maxWidth: "360px", fontFamily: "'Outfit',sans-serif", fontWeight: 400, textAlign: "center" }}>
          Skillra AI puts your courses, mock interviews, and career guidance in your pocket — so progress happens on your schedule.
        </p>

        {/* Phone screenshots (mobile) — center big & sharp, sides dimmed behind it, auto-rotating */}
        <div style={{
          position: "relative", width: "100%",
          height: "clamp(260px, 70vw, 340px)",
          display: "flex", justifyContent: "center", alignItems: "center",
          marginBottom: "26px",
        }}>
          <DiamondPattern isMobile anchor="center" />

          <PhoneCluster isMobile={true} order={order} fading={fading} />
        </div>

        <a
          href="https://play.google.com/store"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: "12px",
            background: "#111827", color: "#fff", borderRadius: "14px",
            padding: "11px 22px", textDecoration: "none",
            boxShadow: "0 10px 28px rgba(17,24,39,0.28)",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M3.6 2.4c-.35.35-.55.85-.55 1.5v16.2c0 .65.2 1.15.55 1.5l.1.1L13.3 12v-.2L3.7 2.3l-.1.1z" fill="#00d9ff"/>
            <path d="M16.6 15.3l-3.3-3.3v-.2l3.3-3.3.1.05 3.9 2.2c1.1.65 1.1 1.7 0 2.35l-3.9 2.2-.1.05z" fill="#ffbc00"/>
            <path d="M16.7 15.25L13.3 11.8 3.6 21.6c.4.4 1.05.45 1.8.05l11.3-6.4" fill="#ff3a44"/>
            <path d="M16.7 8.35L5.4 1.95c-.75-.4-1.4-.35-1.8.05l9.7 9.8 3.4-3.45z" fill="#00e177"/>
          </svg>
          <div>
            <div style={{ fontSize: "9px", fontWeight: 500, opacity: 0.8, fontFamily: "'Outfit',sans-serif", lineHeight: 1 }}>GET IT ON</div>
            <div style={{ fontSize: "14px", fontWeight: 800, fontFamily: "'Outfit',sans-serif", lineHeight: 1.3, marginTop: "2px" }}>Google Play</div>
          </div>
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .prod-desktop { display: none !important; }
          .prod-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .prod-desktop { display: flex !important; }
          .prod-mobile { display: none !important; }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SKILLRA AI — Title + Description
═══════════════════════════════════════════════════ */
function SkillraAISection() {
  const [ref, inView] = useInView(0.15);
  return (
    <section ref={ref} style={{ background: "#fff", padding: "clamp(48px,8vw,90px) 0 clamp(24px,4vw,40px)", position: "relative" }}>
      <div style={{
        maxWidth: "780px", margin: "0 auto", padding: "0 clamp(16px,4%,24px)",
        textAlign: "center",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.65s ease",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          marginBottom: "18px",
        }}>
          <svg width="30" height="30" viewBox="0 0 20 20" fill="none"><path d="M10 2l6.5 3.75v8.5L10 18l-6.5-3.75v-8.5z" stroke="#7c3aed" strokeWidth="1.6" strokeLinejoin="round" fill="rgba(124,58,237,0.08)"/><path d="M10 2v16M3.5 5.75L10 10l6.5-4.25" stroke="#7c3aed" strokeWidth="1.6" strokeLinejoin="round"/></svg>
          <h2 style={{
            fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 900,
            color: "#111827", fontFamily: "'Outfit',sans-serif",
            letterSpacing: "-0.03em", margin: 0,
          }}>
            Skillra <span style={{ color: "#7c3aed" }}>AI</span>
          </h2>
        </div>
        <p style={{
          fontSize: "clamp(13.5px,1.6vw,15.5px)", color: "#6b7280",
          fontFamily: "'Outfit',sans-serif", lineHeight: 1.85, fontWeight: 400,
        }}>
          Skillra AI is our companion app for learners on the move. It brings your enrolled courses, an AI-guided mock interview coach, placement updates, and a personal learning tracker into one place — built so you can keep building your career from anywhere, on any device.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FEATURE CARDS — 3x2 grid, each styled distinctly
═══════════════════════════════════════════════════ */
const FEATURES = [
  {
    title: "AI Mock Interviews",
    desc: "Practice real interview questions with instant AI feedback on your answers.",
    color: "#7c3aed",
    bg: "linear-gradient(135deg,#f3f0ff,#faf8ff)",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" /><path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" /></svg>,
  },
  {
    title: "Course Library",
    desc: "Stream every enrolled course, download lessons, and learn offline anytime.",
    color: "#f97316",
    bg: "linear-gradient(135deg,#fff4ec,#fffaf5)",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>,
  },
  {
    title: "Placement Alerts",
    desc: "Get real-time notifications the moment a matching job or internship opens up.",
    color: "#10b981",
    bg: "linear-gradient(135deg,#ecfdf5,#f6fffb)",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>,
  },
  {
    title: "Progress Tracker",
    desc: "Visualize your learning streaks, completed modules, and skill milestones.",
    color: "#0ea5e9",
    bg: "linear-gradient(135deg,#eff8ff,#f7fcff)",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
  },
  {
    title: "Doubt Support",
    desc: "Ask questions and get answers from mentors and AI, right inside the app.",
    color: "#ec4899",
    bg: "linear-gradient(135deg,#fdf2f8,#fffafb)",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>,
  },
  {
    title: "Resume Builder",
    desc: "Turn your profile into a recruiter-ready resume in just a few taps.",
    color: "#f59e0b",
    bg: "linear-gradient(135deg,#fffbeb,#fffdf5)",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h6M9 9h1" /></svg>,
  },
];

function FeatureCard({ feat, index, inView }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: feat.bg,
        border: `1.5px solid ${hovered ? feat.color + "40" : "transparent"}`,
        borderRadius: "18px",
        padding: "clamp(20px,2.6vw,28px)",
        transition: "all 0.28s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 18px 40px ${feat.color}22` : "0 2px 10px rgba(17,24,39,0.04)",
        cursor: "default",
        opacity: inView ? 1 : 0,
        transitionProperty: "all, opacity, transform",
        transform: inView
          ? (hovered ? "translateY(-6px)" : "translateY(0)")
          : "translateY(24px)",
        transitionDelay: `${0.06 * index}s`,
      }}
    >
      <div style={{
        width: "48px", height: "48px", borderRadius: "13px",
        background: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: `0 6px 16px ${feat.color}22`,
        marginBottom: "16px",
      }}>
        {feat.icon}
      </div>
      <h3 style={{
        fontSize: "15px", fontWeight: 800, color: "#111827",
        fontFamily: "'Outfit',sans-serif", marginBottom: "7px", lineHeight: 1.3,
      }}>{feat.title}</h3>
      <p style={{
        fontSize: "12.5px", color: "#6b7280", fontFamily: "'Outfit',sans-serif",
        lineHeight: 1.7, fontWeight: 400,
      }}>{feat.desc}</p>
    </div>
  );
}

function FeaturesSection() {
  const [ref, inView] = useInView(0.08);
  return (
    <section ref={ref} style={{ background: "#fff", padding: "clamp(24px,4vw,40px) 0 clamp(56px,8vw,100px)" }}>
      <div className="sec-wrap" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(16px,4%,24px)" }}>
        <div className="features-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px",
        }}>
          {FEATURES.map((feat, i) => (
            <FeatureCard key={i} feat={feat} index={i} inView={inView} />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .features-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 560px) {
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════ */
export default function OurProductsPage() {

  useSanityMeta('our-products', {
    title:       'Our Products | Skillra AI – Learn Anywhere',
    description: 'Skillra AI is our mobile companion app — course access, AI mock interviews, placement alerts, and progress tracking, all in one place.',
    canonicalUrl:'https://www.skillra.com/our-products',
  })

  return (
    <div style={{ fontFamily: "'Outfit','Segoe UI',sans-serif", margin: 0, padding: 0, overflowX: "hidden", background: "#faf8ff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; }

        @keyframes fadeUp    { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeRight { from{opacity:0;transform:translateX(-22px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeScale { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }

        .pr-v1  { animation:fadeRight .65s ease forwards; opacity:0; animation-delay:.10s; }
        .pr-v2  { animation:fadeUp   .65s ease forwards;  opacity:0; animation-delay:.28s; }
        .pr-v3  { animation:fadeUp   .65s ease forwards;  opacity:0; animation-delay:.44s; }
        .pr-vR  { animation:fadeScale 1s ease forwards;   opacity:0; animation-delay:.2s;  }

        /* Shrink badges on mobile */
        .hero-badge { }
        @media (max-width: 768px) {
          .hero-badge { transform:scale(0.8) !important; transform-origin:top left !important; }
        }
        @media (max-width: 480px) {
          .hero-badge { transform:scale(0.68) !important; }
        }
      `}</style>

      <Navbar />
      <SocialSidebar />
      <ProductsHero />
      <SkillraAISection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}