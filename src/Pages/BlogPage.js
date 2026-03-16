import { useState, useEffect, useRef } from "react";

const navItems = ["Home", "Course Offered", "Service", "About us", "Blog"];

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

const blogs = [
  {
    id: 1,
    title: "Blog 1",
    subtitle: "Master AI Medical Coding from scratch",
    desc: "Learn how AI is transforming the medical coding industry. Understand billing workflows, ICD-10 codes, and get placement-ready.",
    tag: "AI Medical Coding",
    tagColor: "#7c3aed",
    chat: [
      { type: "bot", text: "Hey! Looking to start a career in Medical Coding?" },
      { type: "user", text: "Yes! What are the job opportunities?" },
      { type: "bot", text: "Huge demand in hospitals, clinics & remote roles.", btn: "Explore Courses →" },
    ],
  },
  {
    id: 2,
    title: "Blog 2",
    subtitle: "Power BI & Data Analytics career guide",
    desc: "From dashboards to data storytelling — discover how Power BI skills can land you a high-paying analytics role.",
    tag: "Data Analytics",
    tagColor: "#2563eb",
    chat: [
      { type: "bot", text: "You have qualified for the next round of interview, Akareal! Please let me know your availability." },
      { type: "user", text: "Any time between 2 to 5 PM tomorrow" },
    ],
  },
  {
    id: 3,
    title: "Blog 3",
    subtitle: "Full Stack Development bootcamp tips",
    desc: "Find talent and interact with candidates in an innovative way using our structured full stack curriculum.",
    tag: "Full Stack Dev",
    tagColor: "#059669",
    chat: [
      { type: "bot", text: "You have qualified for the next round of interview, Akareal! Please let me know your availability." },
      { type: "user", text: "Any time between 2 to 5 PM tomorrow" },
    ],
  },
  {
    id: 4,
    title: "Blog 4",
    subtitle: "SAP & Tally: Finance career pathways",
    desc: "Optimise your onboarding process and give your employee satisfaction with industry-standard finance tools.",
    tag: "Finance & SAP",
    tagColor: "#d97706",
    chat: [
      { type: "bot", text: "Great! Happy to help find the right plan for you." },
      { type: "user", text: "What are you lookin to do with Rotar AI" },
      { type: "bot", text: "Get more customer on my website page", btn: "Get more customer on my website page" },
    ],
  },
];

function BlogCard({ blog, inView, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        flex: "1 1 220px",
        minWidth: 0,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, box-shadow 0.3s ease`,
        boxShadow: hovered
          ? "0 20px 56px rgba(124,58,237,0.16)"
          : "0 2px 16px rgba(0,0,0,0.06)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{
        background: "#f0eeee",
        padding: "20px 16px 16px",
        position: "relative",
        minHeight: 200,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        borderRadius: "20px 20px 0 0",
        transition: "background 0.3s ease",
        ...(hovered ? { background: "#ede9fe" } : {}),
      }}>
        <div style={{
          position: "absolute", top: 10, left: "50%",
          transform: "translateX(-50%)",
          width: 36, height: 4, borderRadius: 2,
          background: "rgba(0,0,0,0.1)",
        }} />
        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
          {blog.chat.map((msg, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
              opacity: inView ? 1 : 0,
              animation: inView ? `fadeUp 0.4s ${delay + 200 + i * 120}ms ease both` : "none",
            }}>
              {msg.btn ? (
                <div style={{
                  background: "#7c3aed",
                  color: "#fff",
                  borderRadius: 10,
                  padding: "8px 14px",
                  fontSize: 11,
                  fontWeight: 600,
                  maxWidth: "85%",
                  lineHeight: 1.4,
                }}>{msg.btn}</div>
              ) : (
                <div style={{
                  background: msg.type === "bot" ? "#fff" : "#7c3aed",
                  color: msg.type === "bot" ? "#333" : "#fff",
                  borderRadius: msg.type === "bot" ? "12px 12px 12px 3px" : "12px 12px 3px 12px",
                  padding: "8px 12px",
                  fontSize: 11,
                  lineHeight: 1.5,
                  maxWidth: "85%",
                  boxShadow: msg.type === "bot" ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                }}>{msg.text}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px 20px 24px", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{
          display: "inline-block",
          background: blog.tagColor + "18",
          color: blog.tagColor,
          fontSize: 10, fontWeight: 700,
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          padding: "3px 10px",
          borderRadius: 20,
          marginBottom: 2,
          width: "fit-content",
        }}>{blog.tag}</span>
        <h3 style={{
          fontSize: 17, fontWeight: 800, color: "#111",
          margin: 0, letterSpacing: "-0.3px",
        }}>{blog.title}</h3>
        <p style={{
          fontSize: 13, color: "#888", lineHeight: 1.65,
          margin: 0, fontWeight: 400,
        }}>{blog.desc}</p>
        <div style={{ marginTop: "auto", paddingTop: 14 }}>
          <span style={{
            fontSize: 12, fontWeight: 600, color: "#7c3aed",
            display: "inline-flex", alignItems: "center", gap: 5,
            transition: "gap 0.2s ease",
            ...(hovered ? { gap: 8 } : {}),
          }}>
            Read more
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function BlogPage({ setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const [titleRef, titleInView] = useInView(0.2);
  const [cardsRef, cardsInView] = useInView(0.05);
  const [footerRef, footerInView] = useInView(0.1);

  const handleNav = (item) => {
    setMenuOpen(false);
    if (item === "Home" && setPage) setPage("home");
    if (item === "Course Offered" && setPage) setPage("courses");
    if (item === "About us" && setPage) setPage("about");
    if (item === "Service" && setPage) setPage("service");
    if (item === "Blog" && setPage) setPage("blog");
  };

  const handleSend = () => {
    if (email.trim()) { setSent(true); setTimeout(() => setSent(false), 3000); setEmail(""); }
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f7f7f5",
      fontFamily: "'Inter', -apple-system, sans-serif",
      overflowX: "hidden",
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .nav-btn {
          background: none; border: none; cursor: pointer;
          font-size: 14px; padding: 0; font-family: inherit;
          transition: color 0.2s ease;
        }
        .nav-btn:hover { color: #7c3aed !important; }

        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .hamburger span {
          display: block; width: 22px; height: 2px;
          background: #333; border-radius: 2px; transition: all 0.3s ease;
        }
        .mobile-menu {
          display: none; flex-direction: column;
          background: #fff; border-top: 1px solid #f0f0f0; padding: 8px 0;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu-btn {
          background: none; border: none; cursor: pointer;
          padding: 12px 24px; font-size: 15px; font-weight: 500;
          color: #444; font-family: inherit; text-align: left; transition: background 0.15s;
        }
        .mobile-menu-btn:hover { background: #f5f5f5; color: #7c3aed; }

        .send-btn {
          background: #1e1e4a; color: #fff; border: none;
          border-radius: 10px; padding: 12px 22px;
          font-size: 14px; font-weight: 600; cursor: pointer;
          font-family: inherit; white-space: nowrap;
          transition: all 0.2s ease;
        }
        .send-btn:hover {
          background: #7c3aed;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(124,58,237,0.35);
        }

        .footer-link {
          color: #bbb; font-size: 14px; cursor: pointer;
          transition: color 0.2s; display: block; margin-bottom: 10px;
          background: none; border: none; font-family: inherit;
          text-align: left; padding: 0;
        }
        .footer-link:hover { color: #fff; }

        @media (max-width: 900px) {
          .cards-grid { flex-wrap: wrap !important; }
          .cards-grid > * { flex: 1 1 calc(50% - 10px) !important; min-width: 240px !important; }
        }
        @media (max-width: 860px) {
          .nav-links-desktop { display: none !important; }
          .hamburger { display: flex !important; }
          .nav-cta { display: none !important; }

          /* ── Mobile footer: tighter layout ── */
          .footer-grid {
            flex-direction: column !important;
            gap: 20px !important;        /* was 32px desktop gap, now 20px on mobile */
          }
          .footer-col {
            flex: none !important;
            width: 100% !important;
            min-width: 0 !important;
          }
          /* Reduce top padding of the footer itself on mobile */
          .footer-root {
            padding: 32px 20px 28px !important;
          }
          /* Tighter spacing inside address block */
          .footer-address-item {
            margin-bottom: 8px !important;
          }
          /* Tighter heading margin in columns */
          .footer-col-heading {
            margin-bottom: 10px !important;
          }
          /* Tighter footer-link spacing */
          .footer-link {
            margin-bottom: 6px !important;
          }
          /* Newsletter section */
          .footer-newsletter {
            min-width: 0 !important;
          }
          /* Social icons row */
          .footer-socials {
            margin-top: 16px !important;
          }
          /* Bottom bar */
          .footer-bottom {
            margin-top: 24px !important;
            padding-top: 14px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 6px !important;
          }
        }
        @media (max-width: 560px) {
          .cards-grid > * { flex: 1 1 100% !important; }
          .page-pad { padding: 0 16px !important; }
          .footer-root { padding: 24px 16px 20px !important; }
          .footer-grid { gap: 16px !important; }
        }
      `}</style>

      {/* ══ NAVBAR ══ */}
      <div style={{ background: "#fff", borderBottom: "1px solid #f0f0f0", position: "sticky", top: 0, zIndex: 100 }}>
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 48px", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", flexShrink: 0, cursor: "pointer" }}
            onClick={() => handleNav("Home")}>
            <img
              src="/logo.png" alt="Skillra AI"
              style={{ height: 34, width: "auto", display: "block" }}
              onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
            />
            <div style={{ display: "none", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 34, height: 34, background: "linear-gradient(135deg,#7c3aed,#a78bfa)",
                borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3C10 3 5 7 5 11C5 13.76 7.24 16 10 16C12.76 16 15 13.76 15 11C15 7 10 3 10 3Z" fill="white" opacity="0.9"/>
                  <circle cx="10" cy="11" r="2" fill="white"/>
                </svg>
              </div>
              <span style={{ fontWeight: 800, fontSize: 10, letterSpacing: 2, color: "#111", textTransform: "uppercase" }}>
                Skillra Technologies
              </span>
            </div>
          </div>

          <div className="nav-links-desktop" style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {navItems.map(item => (
              <button key={item} className="nav-btn" onClick={() => handleNav(item)}
                style={{
                  color: item === "Blog" ? "#7c3aed" : "#555",
                  fontWeight: item === "Blog" ? "600" : "400",
                }}>
                {item}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="nav-cta" style={{
              background: "#7c3aed", color: "#fff", border: "none",
              borderRadius: 50, padding: "10px 20px", fontSize: 14,
              fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
              display: "flex", alignItems: "center", gap: 6, flexShrink: 0, transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#6d28d9"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#7c3aed"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Book a demo
              <span style={{
                width: 18, height: 18, background: "rgba(255,255,255,0.22)",
                borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11
              }}>&#8599;</span>
            </button>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
            </button>
          </div>
        </nav>

        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {navItems.map(item => (
            <button key={item} className="mobile-menu-btn" onClick={() => handleNav(item)}
              style={{ color: item === "Blog" ? "#7c3aed" : "#444", fontWeight: item === "Blog" ? 600 : 400 }}>
              {item}
            </button>
          ))}
          <div style={{ padding: "12px 24px 8px" }}>
            <button style={{
              width: "100%", background: "#7c3aed", color: "#fff", border: "none",
              borderRadius: 50, padding: "12px 20px", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit"
            }}>Book a demo &#8599;</button>
          </div>
        </div>
      </div>

      {/* ══ PAGE TITLE ══ */}
      <div ref={titleRef} style={{ textAlign: "center", padding: "48px 0 28px" }}>
        <p style={{
          fontSize: 12, fontWeight: 600, color: "#a78bfa",
          letterSpacing: "2px", textTransform: "uppercase", marginBottom: 10,
          opacity: titleInView ? 1 : 0,
          animation: titleInView ? "fadeUp 0.5s ease both" : "none",
        }}>Insights & Updates</p>
        <h1 style={{
          fontSize: 36, fontWeight: 800, color: "#111", letterSpacing: "-0.5px",
          opacity: titleInView ? 1 : 0,
          animation: titleInView ? "fadeUp 0.6s 0.1s ease both" : "none",
        }}>Our Blogs</h1>
      </div>

      {/* ══ BLOG CARDS ══ */}
      <div
        ref={cardsRef}
        className="page-pad cards-grid"
        style={{
          display: "flex", gap: 18,
          padding: "0 32px 60px",
          alignItems: "stretch",
          marginBottom: "30px"
        }}
      >
        {blogs.map((blog, i) => (
          <BlogCard key={blog.id} blog={blog} inView={cardsInView} delay={i * 120} />
        ))}
      </div>

      {/* ══ FOOTER ══ */}
      <footer
        ref={footerRef}
        className="footer-root"
        style={{
          background: "#1a1a3e",
          borderRadius: "24px 24px 0 0",
          padding: "52px 48px 40px",
          opacity: footerInView ? 1 : 0,
          animation: footerInView ? "fadeUp 0.7s ease both" : "none",
        }}
      >
        <div className="footer-grid" style={{ display: "flex", gap: 48, alignItems: "flex-start", flexWrap: "wrap" }}>

          {/* Column 1: Address */}
          <div className="footer-col" style={{ flex: "0 0 260px", minWidth: 200 }}>
            <div className="footer-address-item" style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" style={{ marginTop: 2, flexShrink: 0 }}>
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <div>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>Address:</p>
                <p style={{ color: "#aaa", fontSize: 13, lineHeight: 1.65 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>

            <div className="footer-address-item" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.15 3.18 2 2 0 0 1 3.12 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/>
              </svg>
              <span style={{ color: "#bbb", fontSize: 13 }}>Tel: +9229341037</span>
            </div>

            <div className="footer-address-item" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <span style={{ color: "#bbb", fontSize: 13 }}>Response hours: 8 to 20</span>
            </div>

            <div className="footer-address-item" style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span style={{ color: "#bbb", fontSize: 13 }}>Email: info@onlearn.com</span>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div className="footer-col" style={{ flex: "0 0 180px" }}>
            <p className="footer-col-heading" style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 18 }}>Categories</p>
            {["Counseling", "Health and fitness", "Individual development", "more"].map(cat => (
              <button key={cat} className="footer-link">{cat}</button>
            ))}
          </div>

          {/* Column 3: Links */}
          <div className="footer-col" style={{ flex: "0 0 140px" }}>
            <p className="footer-col-heading" style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 18 }}>Links</p>
            {[
              { label: "About us", page: "about" },
              { label: "blog", page: "blog" },
            ].map(link => (
              <button key={link.label} className="footer-link"
                onClick={() => setPage && setPage(link.page)}>
                {link.label}
              </button>
            ))}
          </div>

          {/* Column 4: Newsletter */}
          <div className="footer-col footer-newsletter" style={{ flex: 1, minWidth: 240 }}>
            <p className="footer-col-heading" style={{ color: "#fff", fontWeight: 600, fontSize: 14, marginBottom: 18 }}>
              Stay up to date with the latest courses
            </p>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                style={{
                  flex: 1, padding: "12px 16px",
                  borderRadius: 10, border: "none",
                  fontSize: 14, outline: "none",
                  background: "#fff", color: "#111",
                  fontFamily: "inherit",
                  transition: "box-shadow 0.2s",
                }}
                onFocus={e => e.target.style.boxShadow = "0 0 0 3px rgba(167,139,250,0.4)"}
                onBlur={e => e.target.style.boxShadow = "none"}
              />
              <button className="send-btn" onClick={handleSend}>
                {sent ? "Sent ✓" : "Send"}
              </button>
            </div>
            {sent && (
              <p style={{
                color: "#a78bfa", fontSize: 12, marginTop: 8,
                animation: "fadeIn 0.3s ease both",
              }}>
                Thanks! You are subscribed.
              </p>
            )}

            <div className="footer-socials" style={{ display: "flex", gap: 12, marginTop: 24 }}>
              {[
                { label: "LinkedIn", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
                { label: "Twitter", path: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
                { label: "Instagram", path: "M0 0h24v24H0z" },
              ].map((s, i) => (
                <div key={i} style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#7c3aed"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.path}/>
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{
          marginTop: 40, paddingTop: 20,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ color: "#666", fontSize: 12 }}>© 2025 Skillra Technologies. All rights reserved.</p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Service"].map(t => (
              <span key={t} style={{ color: "#666", fontSize: 12, cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#a78bfa"}
                onMouseLeave={e => e.currentTarget.style.color = "#666"}
              >{t}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}