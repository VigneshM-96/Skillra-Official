import React, { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════
   SocialSidebar — Fixed right-side social links
   Desktop : always-visible vertical stack
   Mobile  : one toggle button → expands all icons,
             closes on outside click / tap
═══════════════════════════════════════════════════ */

const SIDEBAR_SOCIALS = [
  {
    label: "Facebook",
    url: "https://www.facebook.com/skillratechnologies/",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/skillra-technologies/",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    url: "https://x.com/skillra_tech",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M4 4l16 16M4 20L20 4" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/skillra_technologies/",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    url: "https://www.youtube.com/@skillratechnologies",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    url: "https://wa.me/917448665622",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.826L.057 23.571a.75.75 0 0 0 .923.923l5.745-1.466A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.655-.502-5.184-1.381l-.372-.214-3.862.986.986-3.862-.214-.372A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    ),
  },
];

export default function SocialSidebar() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close on outside click / tap
  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [open]);

  return (
    <>
      <style>{`
        /* ─────────────────────────────────────────
           DESKTOP  ≥ 769px  — always-visible stack
        ───────────────────────────────────────── */
        .skl-sidebar-desktop {
          position: fixed;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 9999;
        }
        @media (max-width: 768px) {
          .skl-sidebar-desktop { display: none; }
        }

        /* ─────────────────────────────────────────
           MOBILE  ≤ 768px  — toggle + drawer
        ───────────────────────────────────────── */
        .skl-sidebar-mobile {
  display: none;
  position: fixed;
  right: 14px;
  top: 50%;                          /* ← moves it to vertical center */
  transform: translateY(-50%);       /* ← perfectly centers it */
  flex-direction: column;
  align-items: center;
  gap: 0;
  z-index: 9999;
}
        @media (max-width: 768px) {
          .skl-sidebar-mobile { display: flex; }
        }

        /* Drawer */
        .skl-mob-drawer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 9px;
          padding-bottom: 10px;
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.4s cubic-bezier(.22,1,.36,1),
                      opacity 0.25s ease;
          pointer-events: none;
        }
        .skl-mob-drawer.open {
          max-height: 420px;
          opacity: 1;
          pointer-events: auto;
        }

        /* Staggered pop-in for each icon */
        .skl-mob-drawer.open .skl-mob-icon:nth-child(1) { animation: sklIconPop .32s 0.02s both; }
        .skl-mob-drawer.open .skl-mob-icon:nth-child(2) { animation: sklIconPop .32s 0.06s both; }
        .skl-mob-drawer.open .skl-mob-icon:nth-child(3) { animation: sklIconPop .32s 0.10s both; }
        .skl-mob-drawer.open .skl-mob-icon:nth-child(4) { animation: sklIconPop .32s 0.14s both; }
        .skl-mob-drawer.open .skl-mob-icon:nth-child(5) { animation: sklIconPop .32s 0.18s both; }
        .skl-mob-drawer.open .skl-mob-icon:nth-child(6) { animation: sklIconPop .32s 0.22s both; }

        @keyframes sklIconPop {
          0%   { opacity:0; transform: scale(0.4) translateY(12px); }
          65%  { transform: scale(1.12) translateY(-2px); }
          100% { opacity:1; transform: scale(1) translateY(0); }
        }

        /* Toggle button */
        .skl-mob-toggle {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7C3AED, #A855F7);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 20px rgba(108,43,217,0.45);
          transition: transform 0.28s cubic-bezier(.34,1.56,.64,1),
                      box-shadow 0.2s ease;
          position: relative;
          flex-shrink: 0;
          outline: none;
        }
        .skl-mob-toggle.open {
          transform: rotate(45deg);
          background: linear-gradient(135deg, #6d28d9, #7c3aed);
          box-shadow: 0 6px 24px rgba(108,43,217,0.55);
        }
        .skl-mob-toggle:active { transform: scale(0.91); }

        /* Pulse ring — only when closed */
        .skl-mob-toggle:not(.open)::before {
          content: '';
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 2px solid rgba(124,58,237,0.45);
          animation: sklPulse 2.2s ease-out infinite;
        }
        @keyframes sklPulse {
          0%   { transform:scale(1);   opacity:.75; }
          70%  { transform:scale(1.35);opacity:0; }
          100% { transform:scale(1.35);opacity:0; }
        }

        /* ─────────────────────────────────────────
           Shared icon link style
        ───────────────────────────────────────── */
        .skl-soc-link {
          width: 34px;
          height: 34px;
          background: white;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6C2BD9;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 2px 10px rgba(0,0,0,0.13);
          transition: transform 0.2s ease, box-shadow 0.2s ease,
                      background 0.2s ease, color 0.2s ease;
          position: relative;
          flex-shrink: 0;
        }

        /* Desktop hover */
        @media (min-width: 769px) {
          .skl-soc-link:hover {
            transform: scale(1.2) translateX(-3px);
            box-shadow: 0 6px 20px rgba(108,43,217,0.35);
            color: #fff;
          }
          /* Tooltip — desktop only */
          .skl-soc-link::after {
            content: attr(title);
            position: absolute;
            right: 42px;
            background: #1a0640;
            color: #fff;
            font-size: 11px;
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            padding: 4px 9px;
            border-radius: 6px;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transform: translateX(6px);
            transition: opacity 0.18s ease, transform 0.18s ease;
          }
          .skl-soc-link:hover::after {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Mobile tap feedback */
        @media (max-width: 768px) {
          .skl-soc-link:active { transform: scale(0.88); }
        }

        /* Per-brand hover colors */
        .skl-soc-link[data-brand="Facebook"]:hover    { background: #1877F2; }
        .skl-soc-link[data-brand="LinkedIn"]:hover    { background: #0A66C2; }
        .skl-soc-link[data-brand="X (Twitter)"]:hover { background: #111; }
        .skl-soc-link[data-brand="Instagram"]:hover   {
          background: linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);
        }
        .skl-soc-link[data-brand="YouTube"]:hover     { background: #FF0000; }
        .skl-soc-link[data-brand="WhatsApp"]:hover    { background: #25D366; }
      `}</style>

      {/* ── DESKTOP: always visible ── */}
      <div className="skl-sidebar-desktop">
        {SIDEBAR_SOCIALS.map((s, i) => (
          <a
            key={i}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="skl-soc-link"
            title={s.label}
            data-brand={s.label}
          >
            {s.icon}
          </a>
        ))}
      </div>

      {/* ── MOBILE: toggle + animated drawer ── */}
      <div className="skl-sidebar-mobile" ref={wrapperRef}>

        {/* Drawer with all icons */}
        <div className={`skl-mob-drawer${open ? " open" : ""}`}>
          {SIDEBAR_SOCIALS.map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="skl-soc-link skl-mob-icon"
              title={s.label}
              data-brand={s.label}
              onClick={() => setOpen(false)}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Toggle button */}
        <button
          className={`skl-mob-toggle${open ? " open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close social links" : "Open social links"}
        >
          {open ? (
            // Close  ✕
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            // Share icon
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5"  r="3" />
              <circle cx="6"  cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59"  y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51"  x2="8.59"  y2="10.49" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}