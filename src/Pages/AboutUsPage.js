import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";

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

/* ═══════════════════════════════════════════
   ABOUT SECTION
═══════════════════════════════════════════ */
const ABOUT_PARAGRAPHS = [
  "Skillra is a leading training and upskilling institute offering advanced programs in AI Medical Coding, IT, Finance, and Professional Development. We are committed to bridging the gap between traditional classroom learning and real-world industry expectations through practical, career-driven, and industry-aligned training.",
  "Skillra is a leading training and upskilling institute offering advanced programs in AI Medical Coding, IT, Finance, and Professional Development. We are committed to bridging the gap between traditional classroom learning and real-world industry expectations through practical, career-driven, and industry-aligned training.",
  "Skillra is a leading training and upskilling institute offering advanced programs in AI Medical Coding, IT, Finance, and Professional Development. We are committed to bridging the gap between traditional classroom learning and real-world industry expectations through practical, career-driven, and industry-aligned training.",
  "Skillra is a leading training and upskilling institute offering advanced programs in AI Medical Coding, IT, Finance, and Professional Development. We are committed to bridging the gap between traditional classroom learning and real-world industry expectations through practical, career-driven, and industry-aligned training.",
];

function AboutSection() {
  const [ref, inView] = useInView(0.06);
  return (
    <section ref={ref} className="about-section" style={{
      background: "linear-gradient(160deg,#f0eaff 0%,#ede8f8 40%,#e8e0f8 100%)",
      padding: "100px 0",
paddingTop: "calc(80px + 70px)", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `radial-gradient(rgba(124,58,237,0.07) 1px,transparent 1px)`, backgroundSize: "30px 30px", zIndex: 0 }} />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        <h1 className="section-title" style={{
          textAlign: "center", color: "#7c3aed",
          fontFamily: "'Outfit',sans-serif", fontWeight: 900,
          letterSpacing: "-0.5px", marginBottom: "48px",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          About us
        </h1>

        <div className="about-row">
          {/* Image */}
          <div className="about-img-col" style={{
            opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-28px)",
            transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
          }}>
            <img src={`${PUB}/aboutusimg.png`} alt="About Skillra Team" className="about-img" />
          </div>

          {/* Text */}
          <div className="about-text-col" style={{
            opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(28px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}>
            {ABOUT_PARAGRAPHS.map((para, i) => (
              <p key={i} className="body-text" style={{
                lineHeight: 1.85, color: "#4b4466",
                fontFamily: "'Outfit',sans-serif", fontWeight: 400, margin: 0,
                opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.6s ease ${0.25 + i * 0.1}s, transform 0.6s ease ${0.25 + i * 0.1}s`,
              }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   MISSION CARD
═══════════════════════════════════════════ */
const MVV_TEXT = "Skillra mission is to equip graduates with industry-ready expertise and empower them to pursue high-growth careers in the healthcare sector. We deliver rigorously structured training, real-world learning, and dedicated support, ensuring every student gains the confidence and capability to excel in their chosen field.";

function MissionCard({ label, delay, inView }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", flexDirection: "column",
        borderRadius: "20px", padding: "32px 28px", cursor: "default",
        background: hovered ? "linear-gradient(145deg,#6d28d9,#4c1d95)" : "#fff",
        border: hovered ? "1.5px solid transparent" : "1.5px solid #e4d9ff",
        boxShadow: hovered ? "0 20px 52px rgba(109,40,217,0.38)" : "0 4px 20px rgba(124,58,237,0.07)",
        opacity: inView ? 1 : 0,
        transform: inView
          ? hovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)"
          : "translateY(36px)",
        transition: [
          `opacity 0.65s ease ${delay}s`,
          "transform 0.30s cubic-bezier(0.34,1.56,0.64,1)",
          "background 0.28s ease", "border-color 0.28s ease", "box-shadow 0.28s ease",
        ].join(", "),
      }}
    >
      <h3 className="card-heading" style={{
        fontFamily: "'Outfit',sans-serif", fontWeight: 700,
        color: hovered ? "#fff" : "#7c3aed",
        marginBottom: "16px", transition: "color 0.28s ease",
      }}>{label}</h3>
      <p className="body-text" style={{
        fontFamily: "'Outfit',sans-serif",
        color: hovered ? "rgba(255,255,255,0.88)" : "#6b5a9e",
        lineHeight: 1.78, margin: 0, transition: "color 0.28s ease",
      }}>{MVV_TEXT}</p>
    </div>
  );
}

function MissionSection() {
  const [ref, inView] = useInView(0.06);
  return (
    <section ref={ref} style={{ background: "#fff", padding: "80px 0 88px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(124,58,237,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.03) 1px,transparent 1px)`, backgroundSize: "32px 32px" }} />
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        <h2 className="section-title" style={{
          textAlign: "center", fontFamily: "'Outfit',sans-serif", fontWeight: 900,
          color: "#120630", lineHeight: 1.15, letterSpacing: "-1px", marginBottom: "16px",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          We build careers. We shape futures.<br className="title-br" /> We create professionals.
        </h2>

        <p className="body-text" style={{
          textAlign: "center", color: "#6b5a9e", lineHeight: 1.75,
          maxWidth: "540px", margin: "0 auto 52px",
          fontFamily: "'Outfit',sans-serif",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
        }}>
          Powerful natural language processing capabilities, that can understand and respond to
          customer inquiries in real-time &amp; improve customer satisfaction.
        </p>

        <div className="mvv-grid">
          {[
            { label: "Mission", delay: 0.20 },
            { label: "Vision",  delay: 0.35 },
            { label: "Values",  delay: 0.50 },
          ].map(card => (
            <MissionCard key={card.label} label={card.label} delay={card.delay} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   DIAMOND CIRCLE DECORATION
═══════════════════════════════════════════ */
function DiamondCircle({ side = "left" }) {
  return (
    <div className="diamond-circle" style={{
      position: "absolute", [side]: "-30px", top: "50%",
      transform: "translateY(-50%)", width: "280px", height: "280px",
      borderRadius: "50%", background: "rgba(195,180,255,0.20)",
      overflow: "hidden", zIndex: 0, pointerEvents: "none",
    }}>
      <svg viewBox="0 0 280 280" style={{ width: "100%", height: "100%" }}>
        <defs>
          <pattern id={`dp-${side}`} x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <rect x="14" y="2" width="11" height="11" rx="1.5"
              transform="rotate(45 14 7.5)" fill="none"
              stroke="rgba(124,58,237,0.22)" strokeWidth="1.5" />
          </pattern>
        </defs>
        <circle cx="140" cy="140" r="140" fill={`url(#dp-${side})`} />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FOUNDER SECTION
═══════════════════════════════════════════ */
function FounderSection() {
  const [ref, inView] = useInView(0.06);
  return (
    <section ref={ref} style={{ background: "#fff", padding: "80px 0", position: "relative", overflow: "hidden", borderTop: "1px solid #f0ebff" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(124,58,237,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.03) 1px,transparent 1px)`, backgroundSize: "32px 32px" }} />
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        <h2 className="section-title" style={{
          textAlign: "center", fontFamily: "'Outfit',sans-serif", fontWeight: 900,
          color: "#120630", letterSpacing: "-0.5px", marginBottom: "52px",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          About our founder
        </h2>

        <div className="founder-row">
          {/* Image */}
          <div className="founder-img-wrap" style={{
            position: "relative", flexShrink: 0,
            opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-28px)",
            transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
          }}>
            <DiamondCircle side="left" />
            <img src={`${PUB}/aboutusgirl.png`} alt="Founder" className="founder-img" style={{
              objectFit: "cover", objectPosition: "top center",
              display: "block", position: "relative", zIndex: 1,
              filter: "drop-shadow(0 8px 32px rgba(109,40,217,0.12))",
            }} />
          </div>

          {/* Text */}
          <div className="founder-text" style={{
            opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(28px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}>
            {[
              "Bhuvaneshwari Sivakumar began her journey with a deep commitment to teaching and student development. What initially started as classroom support soon grew into a purposeful mission: to provide students with clear direction and access to structured career pathways. Observing the widespread lack of awareness about opportunities in Medical Coding, Healthcare Operations, and allied healthcare careers, she dedicated herself to conducting orientation sessions, academic workshops, and career-focused programs across institutions.",
              "Over the years, she has delivered career awareness sessions in 20+ reputed colleges, established 3 strategic academic MOUs, and developed a strong network of 25+ hiring partners. She is recognized for her strengths in academic planning, institutional coordination, student counseling, and her ability to build meaningful industry connections that directly benefit learners.",
              "With a strong focus on practical learning, placement readiness, and career clarity, she continues to guide students toward opportunities that offer long-term stability and sustainable growth. Her vision for Skillra is to build it into one of Tamil Nadu's most trusted training institutions and progressively establish its presence across India.",
            ].map((para, i) => (
              <p key={i} className="body-text" style={{
                lineHeight: 1.85, color: "#4b4466",
                fontFamily: "'Outfit',sans-serif", fontWeight: 400, margin: 0,
                opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(14px)",
                transition: `opacity 0.6s ease ${0.3 + i * 0.12}s, transform 0.6s ease ${0.3 + i * 0.12}s`,
              }}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CO-FOUNDER SECTION
═══════════════════════════════════════════ */
function CoFounderSection() {
  const [ref, inView] = useInView(0.06);
  return (
    <section ref={ref} style={{ background: "#faf8ff", padding: "80px 0", position: "relative", overflow: "hidden", borderTop: "1px solid #f0ebff" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(124,58,237,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.03) 1px,transparent 1px)`, backgroundSize: "32px 32px" }} />
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* Quote */}
        <div style={{
          textAlign: "center", marginBottom: "52px",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          <p className="quote-text" style={{
            fontFamily: "'Georgia','Times New Roman',serif",
            fontStyle: "italic", fontWeight: 700,
            color: "#7c3aed", lineHeight: 1.45,
            maxWidth: "780px", margin: "0 auto", letterSpacing: "-0.2px",
          }}>
            "Leadership is not about authority—it's about creating direction and clarity for those who follow".
          </p>
        </div>

        <div className="cofounder-row">
          {/* Text */}
          <div className="cofounder-text" style={{
            opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-28px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}>
            {[
              "Prem Chander began his career as a UX Designer, gradually advancing into product strategy, business analysis, and user-centric problem solving. Over the years, he has managed 20+ international client projects, collaborating with global teams and contributing to measurable improvements in user experience, business performance, and digital product growth.",
              "His professional expertise spans Product Management, UX Design, Process Optimization, Growth Strategy, ROI Evaluation, Case Study Development, and Presentation Design. Through extensive research and project-based insights, he discovered a recurring gap: many students were graduating without clear guidance, industry exposure, or structured career pathways. This realization laid the foundation for Skillra.",
              "Today, he oversees product development, operational planning, student experience, and institutional strategy, ensuring that Skillra delivers consistent quality and remains aligned with industry expectations.",
            ].map((para, i) => (
              <p key={i} className="body-text" style={{
                lineHeight: 1.85, color: "#4b4466",
                fontFamily: "'Outfit',sans-serif", fontWeight: 400, margin: 0,
                opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(14px)",
                transition: `opacity 0.6s ease ${0.25 + i * 0.12}s, transform 0.6s ease ${0.25 + i * 0.12}s`,
              }}>{para}</p>
            ))}
          </div>

          {/* Image */}
          <div className="cofounder-img-wrap" style={{
            position: "relative", flexShrink: 0,
            opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(28px)",
            transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
          }}>
            <DiamondCircle side="right" />
            <img src={`${PUB}/campusboy.png`} alt="Co-founder" className="cofounder-img" style={{
              objectFit: "contain", objectPosition: "bottom center",
              display: "block", position: "relative", zIndex: 1,
              filter: "drop-shadow(0 8px 32px rgba(109,40,217,0.12))",
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   NEWSLETTER SECTION
═══════════════════════════════════════════ */
function NewsletterSection() {
  const [ref, inView] = useInView(0.3);
  const [email, setEmail]           = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return;
    setSubscribing(true);
    setTimeout(() => { setSubscribing(false); setSubscribed(true); }, 1400);
  };

  return (
    <div ref={ref} style={{ background:"linear-gradient(135deg,#6d28d9,#7c3aed,#6d28d9)", position:"relative", overflow:"hidden" }}>
      <style>{`
        @keyframes spinRingAnim { to { transform:rotate(360deg); } }
      `}</style>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,0.10) 1px,transparent 1px)", backgroundSize:"22px 22px", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"3px", background:"linear-gradient(90deg,#06b6d4,#22d3ee,#67e8f9,#22d3ee,#06b6d4)", backgroundSize:"200% 100%", animation:"shimmer 3s linear infinite" }} />
      <div style={{
        maxWidth:"1200px", margin:"0 auto", padding:"36px 24px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        gap:"36px", flexWrap:"wrap", position:"relative", zIndex:1,
        opacity: inView ? 1 : 0, transition:"opacity 0.8s ease",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:"20px" }}>
          <div style={{ width:"46px", height:"46px", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", animation:"spinRingAnim 6s linear infinite" }}>
            <svg width="40" height="40" viewBox="0 0 46 46" fill="none">
              <path d="M23 4v38M4 23h38M8 8l30 30M38 8L8 38" stroke="rgba(255,255,255,0.85)" strokeWidth="3.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h2 style={{ fontSize:"clamp(1.2rem,2.2vw,1.6rem)", fontWeight:900, color:"#fff", lineHeight:1.1, letterSpacing:"-0.02em", marginBottom:"5px", fontFamily:"'Outfit',sans-serif" }}>
              Join Our Newsletter
            </h2>
            <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.75)", fontWeight:500, fontFamily:"'Outfit',sans-serif" }}>
              Subscribe to get our latest updates &amp; news.
            </p>
          </div>
        </div>
        {subscribed ? (
          <div style={{ display:"flex", alignItems:"center", gap:"10px", background:"rgba(255,255,255,0.15)", border:"1.5px solid rgba(255,255,255,0.4)", borderRadius:"12px", padding:"12px 20px" }}>
            <div style={{ width:"28px", height:"28px", borderRadius:"50%", background:"#22c55e", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
            </div>
            <span style={{ color:"#fff", fontWeight:700, fontSize:"14px", fontFamily:"'Outfit',sans-serif" }}>You're subscribed!</span>
          </div>
        ) : (
          <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubscribe()} placeholder="Enter your email"
              style={{ height:"48px", width:"clamp(200px,26vw,300px)", padding:"0 16px", fontSize:"14px", fontFamily:"'Outfit',sans-serif", fontWeight:500, color:"#1a0640", background:"rgba(255,255,255,0.96)", border:"2px solid rgba(255,255,255,0.7)", borderRadius:"12px", outline:"none" }}
              onFocus={e => e.target.style.borderColor="#fff"}
              onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.7)"} />
            <button onClick={handleSubscribe} disabled={subscribing}
              style={{ height:"48px", background:"#111", color:"#fff", border:"none", borderRadius:"12px", padding:"0 24px", fontSize:"14px", fontWeight:700, fontFamily:"'Outfit',sans-serif", cursor:"pointer", whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:"8px", transition:"all 0.22s" }}
              onMouseEnter={e => { e.currentTarget.style.background="#2d1b69"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="#111"; e.currentTarget.style.transform="translateY(0)"; }}>
              {subscribing ? "Subscribing…" : "Subscribe Now"}
              {!subscribing && <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════ */
export default function AboutUsPage() {
  return (
    <div style={{ fontFamily: "'Outfit','Segoe UI',sans-serif", margin: 0, padding: 0, overflowX: "hidden", background: "#faf8ff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; }

        @keyframes shimmer      { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes spinRingAnim { to { transform: rotate(360deg); } }

        /* ══════════════════════════════════
           FLUID TYPOGRAPHY — all via clamp
        ══════════════════════════════════ */
        .section-title    { font-size: clamp(1.6rem, 4vw, 3rem); }
        .card-heading     { font-size: clamp(1rem, 2.2vw, 1.4rem); }
        .body-text        { font-size: clamp(13px, 1.5vw, 14.5px); }
        .quote-text       { font-size: clamp(1.1rem, 2.8vw, 2.2rem); }
        .newsletter-title { font-size: clamp(1rem, 2.2vw, 1.6rem); }

        /* ══════════════════════════════════
           ABOUT ROW — desktop: side by side
        ══════════════════════════════════ */
        .about-row {
          display: flex; align-items: flex-start;
          gap: 48px; flex-wrap: nowrap;
        }
        .about-img-col {
          flex: 0 0 360px; max-width: 360px;
        }
        .about-img {
          width: 100%; height: 420px;
          object-fit: cover; object-position: center top;
          border-radius: 20px; display: block;
          box-shadow: 0 16px 56px rgba(109,40,217,0.16);
        }
        .about-text-col {
          flex: 1; min-width: 0;
          display: flex; flex-direction: column; gap: 18px;
        }

        /* ══════════════════════════════════
           MISSION GRID — desktop: 3 col
        ══════════════════════════════════ */
        .mvv-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 20px; align-items: stretch;
        }

        /* ══════════════════════════════════
           FOUNDER — desktop: row, image left
        ══════════════════════════════════ */
        .founder-row {
          display: flex; align-items: center;
          gap: 56px; flex-wrap: nowrap;
        }
        .founder-img-wrap { width: 300px; }
        .founder-img      { width: 100%; height: 380px; border-radius: 0; }
        .founder-text     { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 18px; }

        /* ══════════════════════════════════
           CO-FOUNDER — desktop: text left, image right
        ══════════════════════════════════ */
        .cofounder-row {
          display: flex; align-items: flex-start;
          gap: 56px; flex-wrap: nowrap;
        }
        .cofounder-img-wrap { width: 300px; }
        .cofounder-img      { width: 100%; height: 400px; border-radius: 12px; }
        .cofounder-text     { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 18px; }

     
}


        @media (max-width: 700px) {
  .newsletter-form {
    display: flex;
    gap: clamp(10px, 3vw, 20px); /* ✅ now works properly */
  }

  .newsletter-input {
    height: 55px;
    flex: 1;
    min-width: 0;
  }

  .newsletter-btn {
    margin-top: 100px;
    height: 55px;
    flex-shrink: 0;
  }
}
        
        /* ══════════════════════════════════
           LARGE SCREENS ≥ 1400px
        ══════════════════════════════════ */
        @media (min-width: 1400px) {
          .about-img-col  { flex: 0 0 420px; max-width: 420px; }
          .about-img      { height: 480px !important; }
          .founder-img-wrap, .cofounder-img-wrap { width: 340px; }
          .founder-img    { height: 420px !important; }
          .cofounder-img  { height: 440px !important; }
          .mvv-grid       { gap: 24px; }
        }

        /* ══════════════════════════════════
           TABLET 769–1024px — slightly compact
        ══════════════════════════════════ */
        @media (max-width: 1024px) {
          .about-img-col  { flex: 0 0 300px; max-width: 300px; }
          .about-img      { height: 360px !important; }
          .founder-img-wrap, .cofounder-img-wrap { width: 250px; }
          .founder-img    { height: 310px !important; }
          .cofounder-img  { height: 330px !important; }
          .mvv-grid       { grid-template-columns: 1fr 1fr !important; }
        }

        /* ══════════════════════════════════
           TABLET ≤ 900px — stack to column
        ══════════════════════════════════ */
        @media (max-width: 900px) {
          /* About */
          .about-row      { flex-direction: column !important; align-items: center; gap: 28px !important; flex-wrap: wrap !important; }
          .about-img-col  { flex: unset !important; width: 100% !important; max-width: 480px !important; }
          .about-img      { height: 300px !important; }

          /* Mission */
          .mvv-grid       { grid-template-columns: 1fr 1fr !important; gap: 16px !important; }

          /* Founder — image above text */
          .founder-row    { flex-direction: column !important; align-items: center !important; gap: 32px !important; flex-wrap: wrap !important; }
          .founder-img-wrap { width: 100% !important; max-width: 380px; }
          .founder-img    { height: 290px !important; }
          .founder-text   { width: 100%; }

          /* Co-founder — image below text (column-reverse so image ends up below) */
          .cofounder-row  { flex-direction: column !important; align-items: center !important; gap: 32px !important; flex-wrap: wrap !important; }
          .cofounder-img-wrap { width: 100% !important; max-width: 380px; }
          .cofounder-img  { height: 290px !important; }
          .cofounder-text { width: 100%; }

          /* Newsletter */
          .newsletter-inner { flex-direction: column; align-items: flex-start !important; gap: 20px !important; }
          .newsletter-form  { width: 100%; flex-wrap: wrap; }
          .newsletter-input { width: 100% !important; flex: 1; min-width: 0; }
          .newsletter-btn   { width: 100%; }
        }

        /* ══════════════════════════════════
           MOBILE ≤ 640px
        ══════════════════════════════════ */
        @media (max-width: 640px) {
          .about-section  { padding: 100px 0 56px !important; }
          .about-img      { height: 240px !important; border-radius: 14px !important; }
          .mvv-grid       { grid-template-columns: 1fr !important; gap: 14px !important; }
          .founder-img    { height: 240px !important; }
          .cofounder-img  { height: 240px !important; }
          .newsletter-form { flex-direction: column; }
          .title-br       { display: none; }

          /* MissionCard padding */
          .mvv-grid > div { padding: 24px 20px !important; border-radius: 16px !important; }
        }

        /* ══════════════════════════════════
           SMALL MOBILE ≤ 400px
        ══════════════════════════════════ */
        @media (max-width: 400px) {
          .about-img      { height: 200px !important; }
          .founder-img    { height: 200px !important; }
          .cofounder-img  { height: 200px !important; }

          /* Hide diamond circles — prevent side overflow on tiny screens */
          .diamond-circle { display: none !important; }

          /* Tighten horizontal padding */
          .about-section > div,
          section > div { padding-left: 16px !important; padding-right: 16px !important; }
        }
      `}</style>

      <AboutSection />
      <MissionSection />
      <FounderSection />
      <CoFounderSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}