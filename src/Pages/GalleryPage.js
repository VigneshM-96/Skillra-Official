import { useState, useEffect, useRef } from "react";
import Footer from "./Footer";
import SocialSidebar from "../components/SocialSideBar";

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

// ── EVENT DATA ────────────────────────────────────────────────────────────────
// Replace Unsplash URLs with your actual event photos later
const EVENTS = [
  {
    id: "career-fest-2025",
    title: "Career Fest 2025 — Chennai",
    subtitle: "Stall & Live Counselling",
    description:
      "Our flagship career fair stall where over 800 students and parents walked in for one-on-one guidance on AI Medical Coding and IT career paths.",
    date: "March 2025",
    location: "Chennai",
    tag: "Career Fair",
    tagColor: "#7c3aed",
    tagBg: "#f3e8ff",
    layout: "masonry", // varied heights
    images: [
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
    ],
  },
  {
    id: "college-outreach",
    title: "College Outreach Drive",
    subtitle: "Campus Visits Across Tamil Nadu",
    description:
      "We visited 12+ colleges to host awareness sessions on emerging careers in medical coding and IT, reaching over 3,500 final-year students.",
    date: "February 2025",
    location: "Tamil Nadu",
    tag: "Campus Visit",
    tagColor: "#ec4899",
    tagBg: "#fce7f3",
    layout: "grid", // uniform grid
    images: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
      "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800",
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800",
      "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=800",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800",
      "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
      "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800",
      "https://images.unsplash.com/photo-1581726707445-75cbe4efc586?w=800",
    ],
  },
  {
    id: "parent-awareness",
    title: "Parent Awareness Meet",
    subtitle: "Guiding Families on Career Choices",
    description:
      "An intimate gathering where parents learned about the changing job market, AI careers, and how Skillra supports their children's placement journey.",
    date: "January 2025",
    location: "Coimbatore",
    tag: "Community",
    tagColor: "#8b5cf6",
    tagBg: "#ede9fe",
    layout: "mosaic", // hero + smaller tiles
    images: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200",
      "https://images.unsplash.com/photo-1560523159-4a9692d222f8?w=800",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800",
      "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=800",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800",
      "https://images.unsplash.com/photo-1559223669-e0065fa7f142?w=800",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800",
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800",
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
    ],
  },
  {
    id: "tech-expo",
    title: "Tech & Healthcare Expo",
    subtitle: "Industry Showcase Event",
    description:
      "Skillra partnered with industry leaders to showcase AI-driven healthcare careers, demo sessions, and live Q&A with our expert trainers.",
    date: "December 2024",
    location: "Bengaluru",
    tag: "Expo",
    tagColor: "#a78bfa",
    tagBg: "#f5f3ff",
    layout: "hexagon", // staggered/honeycomb style
    images: [
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
      "https://images.unsplash.com/photo-1560439514-4e9645039924?w=800",
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800",
      "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
      "https://images.unsplash.com/photo-1582192730841-2a682d7375f9?w=800",
    ],
  },
];

// ── LIGHTBOX ──────────────────────────────────────────────────────────────────
function Lightbox({ image, onClose, onPrev, onNext, hasPrev, hasNext }) {
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

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(10, 10, 30, 0.92)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "fadeIn 0.25s ease",
        padding: "clamp(20px, 5vw, 60px)",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 24, right: 24,
          background: "rgba(255,255,255,0.1)", border: "none",
          width: 44, height: 44, borderRadius: "50%",
          color: "#fff", fontSize: 22, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
      >×</button>

      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          style={{
            position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.1)", border: "none",
            width: 48, height: 48, borderRadius: "50%",
            color: "#fff", fontSize: 24, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >‹</button>
      )}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          style={{
            position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.1)", border: "none",
            width: 48, height: 48, borderRadius: "50%",
            color: "#fff", fontSize: 24, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >›</button>
      )}

      <img
        src={image}
        alt=""
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: "90%", maxHeight: "90vh",
          borderRadius: 12, objectFit: "contain",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
          animation: "zoomIn 0.3s ease",
        }}
      />
    </div>
  );
}

// ── IMAGE TILE (with hover effect) ────────────────────────────────────────────
function ImageTile({ src, alt, tagColor, height, onClick, index, shape = "rect" }) {
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const clipPath =
    shape === "hexagon"
      ? "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
      : "none";

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        height: height || "100%",
        width: "100%",
        borderRadius: shape === "hexagon" ? 0 : 16,
        overflow: "hidden",
        cursor: "pointer",
        clipPath,
        background: "#ede9fe",
        boxShadow: hovered && shape !== "hexagon"
          ? `0 20px 50px ${tagColor}40`
          : "0 4px 16px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%", height: "100%",
          objectFit: "cover",
          opacity: loaded ? 1 : 0,
          transform: hovered ? "scale(1.08)" : "scale(1)",
          filter: hovered ? "brightness(0.75)" : "brightness(1)",
          transition: "transform 0.6s ease, filter 0.35s ease, opacity 0.4s ease",
        }}
      />

      {/* Gradient overlay on hover */}
      <div style={{
        position: "absolute", inset: 0,
        background: hovered
          ? `linear-gradient(to top, ${tagColor}dd 0%, transparent 60%)`
          : "transparent",
        transition: "background 0.35s ease",
        pointerEvents: "none",
      }} />

      {/* View icon on hover */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: `translate(-50%, -50%) scale(${hovered ? 1 : 0.5})`,
        opacity: hovered ? 1 : 0,
        transition: "all 0.35s ease",
        width: 56, height: 56, borderRadius: "50%",
        background: "rgba(255,255,255,0.95)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        pointerEvents: "none",
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={tagColor} strokeWidth="2.5">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="11" y1="8" x2="11" y2="14"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
      </div>

      {/* Bottom caption on hover */}
      {shape !== "hexagon" && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "14px 16px",
          transform: hovered ? "translateY(0)" : "translateY(100%)",
          opacity: hovered ? 1 : 0,
          transition: "all 0.35s ease",
          pointerEvents: "none",
        }}>
          <p style={{
            color: "#fff", fontSize: 13, fontWeight: 600,
            fontFamily: "'Outfit', sans-serif",
            textShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}>Moment #{String(index + 1).padStart(2, "0")}</p>
        </div>
      )}
    </div>
  );
}

// ── LAYOUT RENDERERS ──────────────────────────────────────────────────────────

// 1) MASONRY: varied heights — Pinterest style
function MasonryGrid({ images, tagColor, onImageClick }) {
  const heights = [260, 340, 220, 300, 280, 360, 240, 320, 290, 250, 330, 270];
  return (
    <div className="masonry-grid">
      {images.map((img, i) => (
        <div key={i} style={{ breakInside: "avoid", marginBottom: 16 }}>
          <ImageTile
            src={img}
            alt={`Event image ${i + 1}`}
            tagColor={tagColor}
            height={heights[i % heights.length]}
            onClick={() => onImageClick(i)}
            index={i}
          />
        </div>
      ))}
    </div>
  );
}

// 2) UNIFORM SQUARE GRID — classic portfolio style
function SquareGrid({ images, tagColor, onImageClick }) {
  return (
    <div className="square-grid">
      {images.map((img, i) => (
        <div key={i} style={{ aspectRatio: "1 / 1" }}>
          <ImageTile
            src={img}
            alt={`Event image ${i + 1}`}
            tagColor={tagColor}
            onClick={() => onImageClick(i)}
            index={i}
          />
        </div>
      ))}
    </div>
  );
}

// 3) MOSAIC: one large hero + smaller tiles
function MosaicGrid({ images, tagColor, onImageClick }) {
  const [first, ...rest] = images;
  return (
    <div className="mosaic-grid">
      <div className="mosaic-hero">
        <ImageTile
          src={first}
          alt="Featured event moment"
          tagColor={tagColor}
          onClick={() => onImageClick(0)}
          index={0}
        />
      </div>
      <div className="mosaic-tiles">
        {rest.map((img, i) => (
          <ImageTile
            key={i}
            src={img}
            alt={`Event image ${i + 2}`}
            tagColor={tagColor}
            onClick={() => onImageClick(i + 1)}
            index={i + 1}
          />
        ))}
      </div>
    </div>
  );
}

// 4) HEXAGON: honeycomb / staggered layout
function HexagonGrid({ images, tagColor, onImageClick }) {
  return (
    <div className="hex-wrapper">
      <div className="hex-grid">
        {images.map((img, i) => (
          <div key={i} className="hex-cell">
            <ImageTile
              src={img}
              alt={`Event image ${i + 1}`}
              tagColor={tagColor}
              onClick={() => onImageClick(i)}
              index={i}
              shape="hexagon"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── EVENT SECTION ─────────────────────────────────────────────────────────────
function EventSection({ event, idx }) {
  const [expanded, setExpanded] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [ref, inView] = useInView(0.05);

  const initialCount = event.layout === "hexagon" ? 6 : event.layout === "mosaic" ? 5 : 4;
  const visibleImages = expanded ? event.images : event.images.slice(0, initialCount);

  const renderLayout = () => {
    const props = {
      images: visibleImages,
      tagColor: event.tagColor,
      onImageClick: (i) => setLightboxIdx(i),
    };
    switch (event.layout) {
      case "masonry":  return <MasonryGrid  {...props} />;
      case "grid":     return <SquareGrid   {...props} />;
      case "mosaic":   return <MosaicGrid   {...props} />;
      case "hexagon":  return <HexagonGrid  {...props} />;
      default:         return <SquareGrid   {...props} />;
    }
  };

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(40px, 6vw, 72px) clamp(20px, 4vw, 48px)",
        maxWidth: 1280,
        margin: "0 auto",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: 36, maxWidth: 760 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
          <span style={{
            background: event.tagBg,
            color: event.tagColor,
            fontSize: 11, fontWeight: 700,
            letterSpacing: "1.2px", textTransform: "uppercase",
            padding: "5px 14px", borderRadius: 20,
            fontFamily: "'Outfit', sans-serif",
          }}>{event.tag}</span>
          <span style={{ color: "#aaa", fontSize: 13, fontFamily: "'Outfit', sans-serif" }}>
            {event.date} · {event.location}
          </span>
        </div>
        <h2 style={{
          fontSize: "clamp(22px, 3.2vw, 30px)",
          fontWeight: 800, color: "#111",
          letterSpacing: "-0.5px", lineHeight: 1.25,
          fontFamily: "'Outfit', sans-serif",
          marginBottom: 6,
        }}>
          {event.title}
        </h2>
        <p style={{
          fontSize: "clamp(14px, 1.6vw, 16px)",
          fontWeight: 600,
          color: event.tagColor,
          fontFamily: "'Outfit', sans-serif",
          marginBottom: 12,
        }}>
          {event.subtitle}
        </p>
        <p style={{
          fontSize: "clamp(13px, 1.4vw, 15px)",
          color: "#666",
          lineHeight: 1.75,
          fontFamily: "'Outfit', sans-serif",
        }}>
          {event.description}
        </p>
      </div>

      {/* Image Grid */}
      {renderLayout()}

      {/* View More / Less Button */}
      {event.images.length > initialCount && (
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: expanded ? "#fff" : event.tagColor,
              color: expanded ? event.tagColor : "#fff",
              border: `1.5px solid ${event.tagColor}`,
              borderRadius: 50,
              padding: "11px 28px",
              fontSize: 14, fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Outfit', sans-serif",
              display: "inline-flex", alignItems: "center", gap: 8,
              transition: "all 0.25s ease",
              boxShadow: expanded ? "none" : `0 8px 20px ${event.tagColor}40`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 12px 28px ${event.tagColor}55`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = expanded ? "none" : `0 8px 20px ${event.tagColor}40`;
            }}
          >
            {expanded ? "Show Less" : `View All ${event.images.length} Photos`}
            <svg
              width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5"
              style={{ transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          image={visibleImages[lightboxIdx]}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx(i => Math.max(0, i - 1))}
          onNext={() => setLightboxIdx(i => Math.min(visibleImages.length - 1, i + 1))}
          hasPrev={lightboxIdx > 0}
          hasNext={lightboxIdx < visibleImages.length - 1}
        />
      )}

      {/* Divider */}
      {idx < EVENTS.length - 1 && (
        <div style={{
          marginTop: 60,
          height: 1,
          background: "linear-gradient(to right, transparent, #e5e5e5, transparent)",
        }} />
      )}
    </section>
  );
}

// ── MAIN GALLERY PAGE ─────────────────────────────────────────────────────────
export default function GalleryPage() {
  const [heroRef, heroInView] = useInView(0.1);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #faf5ff 0%, #f7f7f5 50%, #f5f3ff 100%)",
      fontFamily: "'Outfit', 'Inter', -apple-system, sans-serif",
      overflowX: "hidden",
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes zoomIn { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }

        /* ── MASONRY LAYOUT ── */
        .masonry-grid {
          column-count: 4;
          column-gap: 16px;
        }
        @media (max-width: 1024px) { .masonry-grid { column-count: 3; } }
        @media (max-width: 720px)  { .masonry-grid { column-count: 2; } }
        @media (max-width: 480px)  { .masonry-grid { column-count: 1; } }

        /* ── SQUARE GRID ── */
        .square-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 1024px) { .square-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 720px)  { .square-grid { grid-template-columns: repeat(2, 1fr); } }

        /* ── MOSAIC LAYOUT ── */
        .mosaic-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 16px;
          height: 560px;
        }
        .mosaic-hero { height: 100%; }
        .mosaic-tiles {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 16px;
        }
        @media (max-width: 860px) {
          .mosaic-grid {
            grid-template-columns: 1fr;
            height: auto;
          }
          .mosaic-hero { height: 320px; }
          .mosaic-tiles {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 180px;
          }
        }

        /* ── HEXAGON / HONEYCOMB LAYOUT ── */
        .hex-wrapper {
          display: flex;
          justify-content: center;
          padding: 20px 0;
        }
        .hex-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px 8px;
          max-width: 900px;
          width: 100%;
        }
        .hex-grid .hex-cell:nth-child(4n+3),
        .hex-grid .hex-cell:nth-child(4n+4) {
          transform: translateY(45px);
        }
        .hex-cell {
          aspect-ratio: 1 / 1.05;
        }
        @media (max-width: 720px) {
          .hex-grid { grid-template-columns: repeat(3, 1fr); }
          .hex-grid .hex-cell:nth-child(4n+3),
          .hex-grid .hex-cell:nth-child(4n+4) { transform: translateY(0); }
          .hex-grid .hex-cell:nth-child(3n+2),
          .hex-grid .hex-cell:nth-child(3n+3) { transform: translateY(40px); }
        }
        @media (max-width: 480px) {
          .hex-grid { grid-template-columns: repeat(2, 1fr); }
          .hex-grid .hex-cell:nth-child(odd) { transform: translateY(0); }
          .hex-grid .hex-cell:nth-child(even) { transform: translateY(35px); }
          .hex-grid .hex-cell:nth-child(3n+2),
          .hex-grid .hex-cell:nth-child(3n+3) { transform: none; }
        }
      `}</style>

      {/* ── HERO ── */}
      <div
        ref={heroRef}
        style={{
          textAlign: "center",
          padding: "clamp(80px, 10vw, 110px) clamp(20px, 4vw, 48px) 40px",
          maxWidth: 760,
          margin: "0 auto",
        }}
      >
        <p style={{
          fontSize: 11, fontWeight: 700, color: "#a78bfa",
          letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 14,
          opacity: heroInView ? 1 : 0,
          animation: heroInView ? "fadeUp 0.5s ease both" : "none",
        }}>Gallery · Events · Moments</p>
        <h1 style={{
          fontSize: "clamp(28px, 5vw, 44px)",
          fontWeight: 800, color: "#111",
          letterSpacing: "-0.8px", lineHeight: 1.2,
          marginBottom: 18,
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
          fontSize: "clamp(14px, 1.6vw, 16px)",
          color: "#777", lineHeight: 1.75,
          maxWidth: 560, margin: "0 auto",
          opacity: heroInView ? 1 : 0,
          animation: heroInView ? "fadeUp 0.6s 0.2s ease both" : "none",
        }}>
          From career fairs to campus visits — a glimpse into the events where we've met
          thousands of students and parents, shared insights, and helped shape brighter futures.
        </p>
      </div>

      {/* ── EVENT SECTIONS ── */}
      {EVENTS.map((event, idx) => (
        <EventSection key={event.id} event={event} idx={idx} />
      ))}

      {/* ── CTA STRIP ── */}
      <div style={{
        maxWidth: 1200,
        margin: "40px auto 80px",
        padding: "clamp(28px, 4vw, 44px) clamp(24px, 4vw, 48px)",
        background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
        borderRadius: 24,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 20,
        boxShadow: "0 20px 50px rgba(124, 58, 237, 0.3)",
        marginLeft: "clamp(20px, 4vw, 48px)",
        marginRight: "clamp(20px, 4vw, 48px)",
      }}>
        <div>
          <h3 style={{
            color: "#fff",
            fontSize: "clamp(18px, 2.4vw, 24px)",
            fontWeight: 800,
            marginBottom: 6,
            fontFamily: "'Outfit', sans-serif",
          }}>
            Want Skillra at your college or event?
          </h3>
          <p style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: 14,
            fontFamily: "'Outfit', sans-serif",
          }}>
            Invite us for a stall, workshop, or awareness session.
          </p>
        </div>
        <a
          href="/contact us"
          style={{
            textDecoration: "none",
            background: "#fff",
            color: "#7c3aed",
            borderRadius: 50,
            padding: "12px 28px",
            fontSize: 14, fontWeight: 700,
            fontFamily: "'Outfit', sans-serif",
            display: "inline-flex", alignItems: "center", gap: 6,
            transition: "transform 0.2s, box-shadow 0.2s",
            flexShrink: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.2)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
        >
          Get in Touch &#8599;
        </a>
      </div>

      <SocialSidebar />
      <Footer />
      <PageMeta />
    </div>
  );
}