import { useState, useEffect, useRef } from "react";
import { BLOG_POSTS } from "./data"; // ← adjust path if your file is elsewhere

import Footer from "./Footer";
import SocialSidebar from "../components/SocialSideBar";

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

// ── BLOG DETAIL PAGE ──────────────────────────────────────────────────────────
function BlogDetail({ blog, onBack }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
  const [ref, inView] = useInView(0.05);

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f5" }}>
      <style>{`
        .detail-back:hover { background: #7c3aed !important; color: #fff !important; border-color: #7c3aed !important; }
      `}</style>

      {/* Hero */}
      <div style={{ position: "relative", height: "clamp(460px, 42vw, 600px)", overflow: "hidden" }}>
        <img
          src={blog.image}
          alt={blog.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.42)" }}
          onError={e => { e.target.style.background = "#1a1a3e"; e.target.style.display = "none"; }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(10,10,30,0.88) 40%, transparent)",
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "0 clamp(20px, 6vw, 80px) 40px",
        }}>
          <div >
            <span style={{
              display: "inline-block",
              background: blog.tagColor, color: "#fff",
              fontSize: 11, fontWeight: 700,
              letterSpacing: "1px", textTransform: "uppercase",
              padding: "4px 12px", borderRadius: 20, marginBottom: 14,
            }}>{blog.tag}</span>
            <h1 style={{
              fontSize: "clamp(20px, 4vw, 34px)",
              fontWeight: 800, color: "#fff",
              lineHeight: 1.25, letterSpacing: "-0.4px", maxWidth: 700,
            }}>{blog.title}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 16, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: blog.authorColor || blog.tagColor,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700, color: "#fff",
                }}>{blog.authorInitial || blog.title[0]}</div>
                <span style={{ color: "#ddd", fontSize: 13 }}>{blog.author || "Skillra Team"}</span>
              </div>
              <span style={{ color: "#777", fontSize: 12 }}>•</span>
              <span style={{ color: "#aaa", fontSize: 12 }}>{blog.date}</span>
              <span style={{ color: "#777", fontSize: 12 }}>•</span>
              <span style={{ color: "#aaa", fontSize: 12 }}>{blog.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div style={{ padding: "28px clamp(20px, 6vw, 80px) 0" }}>
        <a
          href="/blog"
          className="detail-back"
          onClick={(e) => { e.preventDefault(); onBack(); }}
          style={{
            textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#fff", border: "1.5px solid #e5e5e5",
            borderRadius: 50, padding: "8px 18px",
            fontSize: 13, fontWeight: 600, color: "#555",
            cursor: "pointer", fontFamily: "inherit",
            transition: "all 0.2s ease",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Back to Blogs
        </a>
      </div>

      {/* Article Body */}
      <div
        ref={ref}
        style={{
          maxWidth: 1820, margin: "0 auto",
          padding: "32px clamp(20px, 6vw, 80px) 80px",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <p style={{
          fontSize: 17, color: "#555", lineHeight: 1.75,
          fontWeight: 400, borderLeft: `4px solid ${blog.tagColor}`,
          paddingLeft: 20, marginBottom: 32, fontStyle: "italic",
        }}>{blog.excerpt}</p>

        <div style={{ fontSize: 16, color: "#333", lineHeight: 1.85 }}>
          {blog.content.split("\n\n").filter(p => p.trim()).map((para, i) => (
            <p key={i} style={{ marginBottom: 20 }}>{para.trim()}</p>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: 48,
          background: `linear-gradient(135deg, ${blog.tagColor}12, ${blog.tagColor}06)`,
          border: `1.5px solid ${blog.tagColor}30`,
          borderRadius: 16, padding: "28px 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 16,
        }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: 16, color: "#111", marginBottom: 4 }}>
              Ready to start your journey?
            </p>
            <p style={{ fontSize: 13, color: "#666" }}>
              Explore our {blog.tag} courses with placement support.
            </p>
          </div>
          <a
            href="/contact"
            style={{
              textDecoration: "none",
              background: blog.tagColor, color: "#fff",
              borderRadius: 50, padding: "12px 24px",
              fontSize: 14, fontWeight: 600,
              display: "inline-flex", alignItems: "center", gap: 6,
              transition: "all 0.2s ease", flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${blog.tagColor}55`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            Book a Free Demo &#8599;
          </a>
        </div>
      </div>
    </div>
  );
}

// ── BLOG CARD ─────────────────────────────────────────────────────────────────
function BlogCard({ blog, inView, delay, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, box-shadow 0.3s ease`,
        boxShadow: hovered ? "0 24px 64px rgba(0,0,0,0.13)" : "0 2px 20px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: "relative", height: 200, overflow: "hidden", flexShrink: 0 }}>
        <img
          src={blog.image}
          alt={blog.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
          onError={e => {
            e.target.style.display = "none";
            e.target.parentNode.style.background = blog.tagColor + "22";
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)",
        }} />
        <span style={{
          position: "absolute", top: 14, left: 14,
          background: blog.tagColor, color: "#fff",
          fontSize: 10, fontWeight: 700,
          letterSpacing: "0.8px", textTransform: "uppercase",
          padding: "4px 10px", borderRadius: 20,
        }}>{blog.tag}</span>
        <span style={{
          position: "absolute", bottom: 12, right: 14,
          background: "rgba(0,0,0,0.55)", color: "#fff",
          fontSize: 11, padding: "3px 10px", borderRadius: 20,
          backdropFilter: "blur(4px)",
        }}>{blog.readTime}</span>
      </div>

      {/* Content */}
      <div style={{ padding: "22px 22px 24px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 26, height: 26, borderRadius: "50%",
            background: blog.authorColor || blog.tagColor,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0,
          }}>{blog.authorInitial || blog.title[0]}</div>
          <span style={{ fontSize: 12, color: "#888" }}>{blog.author || "Skillra Team"}</span>
          <span style={{ color: "#ccc", fontSize: 11 }}>•</span>
          <span style={{ fontSize: 12, color: "#aaa" }}>{blog.date}</span>
        </div>

        <h3 style={{
          fontSize: 16, fontWeight: 800, color: "#111",
          lineHeight: 1.35, letterSpacing: "-0.3px", margin: 0,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>{blog.title}</h3>

        <p style={{
          fontSize: 13, color: "#777", lineHeight: 1.65, margin: 0,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          flex: 1,
        }}>{blog.excerpt}</p>

        {/* Footer row */}
        <div style={{
          marginTop: 6, paddingTop: 14,
          borderTop: "1px solid #f0f0f0",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <a
            href={`/blog/${blog.id}`}
            onClick={(e) => { e.preventDefault(); onClick(); }}
            style={{
              textDecoration: "none",
              fontSize: 13, fontWeight: 600, color: blog.tagColor,
              display: "inline-flex", alignItems: "center",
              gap: hovered ? 9 : 5,
              transition: "gap 0.2s ease",
            }}
          >
            Read article
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={blog.tagColor} strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
          <span style={{
            display: "inline-block",
            background: blog.tagBg, color: blog.tagColor,
            fontSize: 10, fontWeight: 600,
            padding: "3px 9px", borderRadius: 12,
          }}>{blog.tag}</span>
        </div>
      </div>
    </div>
  );
}

// ── MAIN BLOG PAGE ────────────────────────────────────────────────────────────
export default function BlogPage({ setPage }) {
  const [activeBlog, setActiveBlog] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const [heroRef, heroInView] = useInView(0.1);
  const [cardsRef, cardsInView] = useInView(0.05);

  const categories = ["All", ...Array.from(new Set(BLOG_POSTS.map(b => b.tag)))];
  const filtered = activeFilter === "All" ? BLOG_POSTS : BLOG_POSTS.filter(b => b.tag === activeFilter);

  // ── DETAIL VIEW ──
  if (activeBlog) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f7f7f5", fontFamily: "'Inter', -apple-system, sans-serif" }}>
        <style>{`* { box-sizing: border-box; margin: 0; padding: 0; }`}</style>
        <BlogDetail
          blog={activeBlog}
          onBack={() => { setActiveBlog(null); window.scrollTo({ top: 0 }); }}
        />
      </div>
    );
  }

  // ── LIST VIEW ──
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "linear-gradient(135deg,#f3e8ff 0%,#ede9fe 50%,#e0d7ff 100%)",
      fontFamily: "'Inter', -apple-system, sans-serif",
      overflowX: "hidden",
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }

        .filter-pill {
          border: 1.5px solid #e5e5e5; background: #fff;
          border-radius: 50px; padding: 7px 18px;
          font-size: 13px; font-weight: 500;
          cursor: pointer; font-family: inherit;
          transition: all 0.2s ease; color: #555;
        }
        .filter-pill:hover { border-color: #7c3aed; color: #7c3aed; }
        .filter-pill.active { background: #7c3aed; color: #fff; border-color: #7c3aed; }

        .blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 1024px) { .blog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .blog-grid { grid-template-columns: 1fr; } }

        @media (max-width: 860px) {
          .page-hero { padding: 40px 20px 24px !important; }
          .filter-bar { padding: 0 20px 24px !important; }
          .blogs-wrap { padding: 0 20px 60px !important; }
        }
        @media (max-width: 560px) {
          .filter-pill { font-size: 12px; padding: 6px 14px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <div
        ref={heroRef}
        className="page-hero"
        style={{ textAlign: "center", padding: "60px 48px 32px", maxWidth: 680, margin: "0 auto", marginTop: "clamp(80px, 8vw, 80px)"}}
      >
        <p style={{
          fontSize: 11, fontWeight: 700, color: "#a78bfa",
          letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 12,
          opacity: heroInView ? 1 : 0,
          animation: heroInView ? "fadeUp 0.5s ease both" : "none",
        }}>Insights & Updates</p>
        <h1 style={{
          fontSize: "clamp(26px, 5vw, 40px)",
          fontWeight: 800, color: "#111", letterSpacing: "-0.8px",
          lineHeight: 1.2, marginBottom: 16,
          opacity: heroInView ? 1 : 0,
          animation: heroInView ? "fadeUp 0.6s 0.1s ease both" : "none",
        }}>
          Learn. Grow.{" "}
          <span style={{
            background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>Get Placed.</span>
        </h1>
        <p style={{
          fontSize: 15, color: "#888", lineHeight: 1.7,
          maxWidth: 460, margin: "0 auto",
          opacity: heroInView ? 1 : 0,
          animation: heroInView ? "fadeUp 0.6s 0.2s ease both" : "none",
        }}>
          Expert articles on career-boosting courses, industry trends, and placement strategies — straight from the Skillra team.
        </p>
      </div>

      {/* ── FILTER PILLS ── */}
      <div
        className="filter-bar"
        style={{
          display: "flex", gap: 10, justifyContent: "center",
          padding: "0 48px 32px", flexWrap: "wrap",
          opacity: heroInView ? 1 : 0,
          animation: heroInView ? "fadeUp 0.6s 0.3s ease both" : "none",
        }}
      >
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-pill ${activeFilter === cat ? "active" : ""}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── BLOG GRID ── */}
      <div
        ref={cardsRef}
        className="blogs-wrap"
        style={{ padding: "0 clamp(16px, 4vw, 48px) 80px", maxWidth: 1200, margin: "0 auto" }}
      >
        <div className="blog-grid">
          {filtered.map((blog, i) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              inView={cardsInView}
              delay={i * 100}
              onClick={() => setActiveBlog(blog)}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#aaa", fontSize: 15 }}>
            No articles found in this category.
          </div>
        )}
      </div>
      <SocialSidebar />
      <Footer />
    </div>
  );
}