import { useState, useEffect, useRef } from "react";
import Footer from "./Footer";
import SocialSidebar from "../components/SocialSideBar";
import { Link } from "react-router-dom";
import { useSanityMeta } from '../hooks/useSanityMeta';

const META = {
  title:       "Gallery | Skillra – Events, Stalls & Student Engagement Moments",
  description: "Explore Skillra's event gallery showcasing our recent stalls, career fairs, and campus outreach programs where we engaged with thousands of students and parents.",
  canonical:   "https://www.skillra.com/gallery",
  keywords:    "Skillra events, career fair stalls, student engagement, campus outreach, education events, Skillra gallery",
};

function setMeta(attr, value, content) {
  let el = document.querySelector(`meta[${attr}="${value}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, value); document.head.appendChild(el); }
  el.setAttribute("content", content);
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) { el = document.createElement("link"); el.setAttribute("rel", rel); document.head.appendChild(el); }
  el.setAttribute("href", href);
}

function PageMeta() {
  useEffect(() => {
    document.title = META.title;
    setMeta("name", "description", META.description);
    setMeta("name", "keywords",    META.keywords);
    setMeta("name", "robots",      "index, follow");
    setMeta("name", "author",      "Skillra");
    setLink("canonical",           META.canonical);
    setMeta("property", "og:type",        "website");
    setMeta("property", "og:url",         META.canonical);
    setMeta("property", "og:title",       META.title);
    setMeta("property", "og:description", META.description);
  }, []);
  return null;
}

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

// ── EVENT DATA (single event — 30 images) ─────────────────────────────────────
// Replace these URLs with your actual event photos
const EVENT = {
  id: "career-fest-2025",
  title: "Career Counselling Apr 2026 — Chennai",
  subtitle: "Stall & Live Counselling",
  description:
    "Our flagship career fair stall where over 800 students and parents walked in for one-on-one guidance on AI Medical Coding and IT career paths.",
  date: "April 2026",
  location: "Chennai",
  tag: "Career Fair",
  tagColor: "#7c3aed",
  tagBg: "#f3e8ff",
  images: Array.from({ length: 30 }, (_, i) => `/GalleryImages/img-${i + 1}.jpg`),
};

// Unsplash fallbacks if local images are missing
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800",
  "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800",
  "https://images.unsplash.com/photo-1560439514-4e9645039924?w=800",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
  "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800",
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800",
  "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
  "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800",
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800",
  "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=800",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
  "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800",
  "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
  "https://images.unsplash.com/photo-1560523159-4a9692d222f8?w=800",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800",
  "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=800",
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800",
  "https://images.unsplash.com/photo-1559223669-e0065fa7f142?w=800",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
  "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800",
];

const INITIAL_COUNT = 15;

// ── LIGHTBOX ──────────────────────────────────────────────────────────────────
function Lightbox({ image, onClose, onPrev, onNext, hasPrev, hasNext, current, total }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "auto";
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  const navBtnStyle = (side) => ({
    position: "absolute",
    [side]: -22,
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.2)",
    width: 44, height: 44, borderRadius: "50%",
    color: "#fff", fontSize: 22, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "background 0.2s, transform 0.2s",
    backdropFilter: "blur(6px)",
    zIndex: 3,
  });

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(10, 10, 30, 0.94)",
        backdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "lb-fadeIn 0.2s ease",
        padding: "clamp(16px, 4vw, 60px)",
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 16, right: 16,
          background: "rgba(255,255,255,0.1)", border: "none",
          width: 40, height: 40, borderRadius: "50%",
          color: "#fff", fontSize: 20, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 4,
        }}
      >×</button>

      {/* Counter */}
      <span style={{
        position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)",
        color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 500,
        fontFamily: "'Outfit', sans-serif",
      }}>{current + 1} / {total}</span>

      {/* Image + arrows wrapper — arrows positioned relative to this */}
      <div
        className="lb-img-wrapper"
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "85%",
          maxHeight: "88vh",
        }}
      >
        {/* Prev */}
        {hasPrev && (
          <button className="lb-nav-prev" onClick={(e) => { e.stopPropagation(); onPrev(); }} style={navBtnStyle("left")}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.3)"; e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.transform = "translateY(-50%) scale(1)"; }}
          >‹</button>
        )}

        {/* Next */}
        {hasNext && (
          <button className="lb-nav-next" onClick={(e) => { e.stopPropagation(); onNext(); }} style={navBtnStyle("right")}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.3)"; e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.transform = "translateY(-50%) scale(1)"; }}
          >›</button>
        )}

        <img
          src={image}
          alt=""
          style={{
            maxWidth: "100%", maxHeight: "88vh",
            borderRadius: 10, objectFit: "contain",
            boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
            animation: "lb-zoomIn 0.25s ease",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}

// ── IMAGE TILE ────────────────────────────────────────────────────────────────
function ImageTile({ src, tagColor, onClick, index, animDelay = 0, inView }) {
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "4 / 3",
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        background: "#ede9fe",
        boxShadow: hovered
          ? `0 16px 40px ${tagColor}35`
          : "0 2px 12px rgba(0,0,0,0.06)",
        transform: inView
          ? (hovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)")
          : "translateY(20px) scale(0.97)",
        opacity: inView ? 1 : 0,
        transition: `transform 0.4s ease ${animDelay}ms, box-shadow 0.3s ease, opacity 0.5s ease ${animDelay}ms`,
      }}
    >
      <img
        src={src}
        alt={`Event moment ${index + 1}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          // If local image fails, fall back to Unsplash
          if (FALLBACK_IMAGES[index] && e.target.src !== FALLBACK_IMAGES[index]) {
            e.target.src = FALLBACK_IMAGES[index];
          }
        }}
        style={{
          width: "100%", height: "100%",
          objectFit: "cover",
          opacity: loaded ? 1 : 0,
          transform: hovered ? "scale(1.08)" : "scale(1)",
          filter: hovered ? "brightness(0.72)" : "brightness(1)",
          transition: "transform 0.5s ease, filter 0.3s ease, opacity 0.4s ease",
        }}
      />

      {/* Hover overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: hovered
          ? `linear-gradient(to top, ${tagColor}cc 0%, transparent 55%)`
          : "transparent",
        transition: "background 0.3s ease",
        pointerEvents: "none",
      }} />

      {/* Zoom icon */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: `translate(-50%, -50%) scale(${hovered ? 1 : 0.4})`,
        opacity: hovered ? 1 : 0,
        transition: "all 0.3s ease",
        width: 48, height: 48, borderRadius: "50%",
        background: "rgba(255,255,255,0.95)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
        pointerEvents: "none",
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={tagColor} strokeWidth="2.5">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="11" y1="8" x2="11" y2="14"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
      </div>

      {/* Number badge */}
      <span style={{
        position: "absolute", bottom: 10, left: 12,
        color: "#fff", fontSize: 11, fontWeight: 600,
        fontFamily: "'Outfit', sans-serif",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateY(0)" : "translateY(8px)",
        transition: "all 0.3s ease",
        textShadow: "0 2px 6px rgba(0,0,0,0.3)",
        pointerEvents: "none",
      }}>#{String(index + 1).padStart(2, "0")}</span>
    </div>
  );
}

// ── MAIN GALLERY PAGE ─────────────────────────────────────────────────────────
export default function GalleryPage() {
  const [heroRef, heroInView] = useInView(0.1);
  const [gridRef, gridInView] = useInView(0.03);
  const [expanded, setExpanded] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const visibleImages = expanded ? EVENT.images : EVENT.images.slice(0, INITIAL_COUNT);

  useSanityMeta('gallery', {
  title:       'Gallery | Skillra – Campus Life & Events',
  description: 'Take a look at Skillra\'s campus life, student events, training sessions, and placement celebrations.',
  canonicalUrl:'https://www.skillra.com/gallery',
})

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #faf5ff 0%, #f7f7f5 50%, #f5f3ff 100%)",
      fontFamily: "'Outfit', 'Inter', -apple-system, sans-serif",
      overflowX: "hidden",
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes lb-fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes lb-zoomIn { from { opacity:0; transform:scale(0.92); } to { opacity:1; transform:scale(1); } }

        .lb-nav-btn { transition: background 0.2s, transform 0.2s; }
        @media (max-width: 600px) {
          .lb-img-wrapper { max-width: 95% !important; }
          .lb-nav-prev { left: 6px !important; }
          .lb-nav-next { right: 6px !important; }
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        @media (max-width: 1100px) { .gallery-grid { grid-template-columns: repeat(3, 1fr); gap: 12px; } }
        @media (max-width: 720px)  { .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; } }
        @media (max-width: 420px)  { .gallery-grid { grid-template-columns: 1fr; gap: 10px; } }

        .gallery-section { padding: 0 clamp(16px, 4vw, 48px); }
      `}</style>

      {/* ── HERO ── */}
      <div
        ref={heroRef}
        style={{
          textAlign: "center",
          padding: "clamp(80px, 10vw, 110px) clamp(20px, 4vw, 48px) 20px",
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        <p style={{
          fontSize: 11, fontWeight: 700, color: "#a78bfa",
          letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 12,
          opacity: heroInView ? 1 : 0,
          animation: heroInView ? "fadeUp 0.5s ease both" : "none",
        }}>Gallery · Events · Moments</p>
        <h1 style={{
          fontSize: "clamp(26px, 5vw, 42px)",
          fontWeight: 800, color: "#111",
          letterSpacing: "-0.8px", lineHeight: 1.2,
          marginBottom: 14,
          opacity: heroInView ? 1 : 0,
          animation: heroInView ? "fadeUp 0.6s 0.1s ease both" : "none",
        }}>
          Skillra{" "}
          <span style={{
            background: "linear-gradient(135deg, #7c3aed, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>in Action</span>
        </h1>
        <p style={{
          fontSize: "clamp(13px, 1.5vw, 15px)",
          color: "#777", lineHeight: 1.7,
          maxWidth: 520, margin: "0 auto",
          opacity: heroInView ? 1 : 0,
          animation: heroInView ? "fadeUp 0.6s 0.2s ease both" : "none",
        }}>
          From career fairs to campus visits — a glimpse into the events where we've met
          thousands of students and parents, shared insights, and helped shape brighter futures.
        </p>
      </div>

      {/* ── EVENT HEADER ── */}
      <div className="gallery-section" style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{
          padding: "20px 0 18px",
          maxWidth: 680,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
            <span style={{
              background: EVENT.tagBg, color: EVENT.tagColor,
              fontSize: 11, fontWeight: 700,
              letterSpacing: "1.2px", textTransform: "uppercase",
              padding: "4px 12px", borderRadius: 20,
            }}>{EVENT.tag}</span>
            <span style={{ color: "#aaa", fontSize: 12 }}>
              {EVENT.date} · {EVENT.location}
            </span>
          </div>
          <h2 style={{
            fontSize: "clamp(20px, 3vw, 28px)",
            fontWeight: 800, color: "#111",
            letterSpacing: "-0.4px", lineHeight: 1.25,
            marginBottom: 4,
          }}>{EVENT.title}</h2>
          <p style={{
            fontSize: "clamp(13px, 1.4vw, 15px)",
            fontWeight: 600, color: EVENT.tagColor,
            marginBottom: 8,
          }}>{EVENT.subtitle}</p>
          <p style={{
            fontSize: "clamp(12.5px, 1.3vw, 14px)",
            color: "#666", lineHeight: 1.7,
          }}>{EVENT.description}</p>
        </div>
      </div>

      {/* ── IMAGE GRID ── */}
      <div
        ref={gridRef}
        className="gallery-section"
        style={{ maxWidth: 1280, margin: "0 auto", paddingBottom: 12 }}
      >
        <div className="gallery-grid">
          {visibleImages.map((img, i) => (
            <ImageTile
              key={i}
              src={img}
              tagColor={EVENT.tagColor}
              onClick={() => setLightboxIdx(i)}
              index={i}
              animDelay={Math.min(i, 14) * 50}
              inView={gridInView}
            />
          ))}
        </div>

        {/* View More / Less */}
        {EVENT.images.length > INITIAL_COUNT && (
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <button
              onClick={() => {
                setExpanded(!expanded);
                if (expanded) {
                  window.scrollTo({ top: gridRef.current?.offsetTop - 100, behavior: "smooth" });
                }
              }}
              style={{
                background: expanded ? "#fff" : EVENT.tagColor,
                color: expanded ? EVENT.tagColor : "#fff",
                border: `1.5px solid ${EVENT.tagColor}`,
                borderRadius: 50,
                padding: "10px 26px",
                fontSize: 13, fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Outfit', sans-serif",
                display: "inline-flex", alignItems: "center", gap: 7,
                transition: "all 0.25s ease",
                boxShadow: expanded ? "none" : `0 6px 18px ${EVENT.tagColor}35`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 10px 24px ${EVENT.tagColor}45`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = expanded ? "none" : `0 6px 18px ${EVENT.tagColor}35`;
              }}
            >
              {expanded ? "Show Less" : `View All ${EVENT.images.length} Photos`}
              <svg
                width="13" height="13" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5"
                style={{ transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* ── CTA STRIP ── */}
      <div className="gallery-section" style={{ maxWidth: 1280, margin: "0 auto", padding: "32px clamp(16px, 4vw, 48px) 60px" }}>
        <div style={{
          background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
          borderRadius: 20,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 16,
          padding: "clamp(24px, 3.5vw, 40px) clamp(20px, 3.5vw, 40px)",
          boxShadow: "0 16px 40px rgba(124, 58, 237, 0.25)",
        }}>
          <div>
            <h3 style={{
              color: "#fff",
              fontSize: "clamp(16px, 2.2vw, 22px)",
              fontWeight: 800, marginBottom: 4,
            }}>Want Skillra at your college or event?</h3>
            <p style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: 13,
            }}>Invite us for a stall, workshop, or awareness session.</p>
          </div>
          <Link
  to="/contact-us"
  style={{
    textDecoration: "none",
    background: "#fff",
    color: "#7c3aed",
    borderRadius: 50,
    padding: "10px 24px",
    fontSize: 13,
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    transition: "transform 0.2s, box-shadow 0.2s",
    flexShrink: 0,
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.18)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
  }}
>
  Get in Touch ↗
</Link>
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightboxIdx !== null && (
        <Lightbox
          image={visibleImages[lightboxIdx]}
          current={lightboxIdx}
          total={visibleImages.length}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx(i => Math.max(0, i - 1))}
          onNext={() => setLightboxIdx(i => Math.min(visibleImages.length - 1, i + 1))}
          hasPrev={lightboxIdx > 0}
          hasNext={lightboxIdx < visibleImages.length - 1}
        />
      )}

      {lightboxIdx === null && <SocialSidebar />}
      <Footer />
      <PageMeta />
    </div>
  );
}