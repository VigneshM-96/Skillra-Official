import { useState, useRef, useEffect } from "react";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const OPENROUTER_API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;
console.log("KEY:", OPENROUTER_API_KEY);

const BOT_CONTEXT = `
keep replies are very short dont give anything like paragraph
Use simple, clear language. Avoid bullet points unless absolutely necessary.
You are a friendly and helpful assistant for Skillra Health Innovations Pvt Ltd.
Answer questions clearly and concisely based on the information below.
If you don't know something, say "I don't have that information, please contact us directly."

Company: Skillra Health Innovations Pvt Ltd
Founder & CEO: Bhuvaneshwari
Co-Founder: Premchandar

About:
Skillra is a professional training and consultancy company that bridges the gap between 
education and industry. We provide specialized training programs and consultancy services, 
with tie-ups with top companies like Cognizant, Shai Health, and more.

Services:
- Professional Training Programs
- Industry Consultancy
- Corporate Tie-ups & Placements

Training Programs Offered:
- Medical Coding
- Medical Billing
- SAP Tally
- Personality Development
- And more upcoming courses

Company Tie-ups: Cognizant, Shai Health, and other leading companies

Business Hours: Monday to Saturday, 9:00 AM – 7:00 PM IST

For more info or queries, contact us through the website's contact page.
`;
// ─────────────────────────────────────────────────────────────────────────────

async function fetchBotReply(messages) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "anthropic/claude-3-haiku",
      max_tokens: 80,
      messages: [
        {
          role: "system",
          content: `STRICT RULE: Reply in 1-2 short sentences only. Never write more than that. ${BOT_CONTEXT}`
        },
        ...messages
      ],
    }),
  });
  if (!res.ok) throw new Error("API error");
  const data = await res.json();
  return data.choices[0].message.content;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there! 👋 How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const reply = await fetchBotReply(
        updated.filter((m) => m.role !== "system")
      );
      setMessages([...updated, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...updated,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        .cb-root * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }

        /* ── Floating Button ── */
        .cb-fab {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(99,102,241,0.45);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cb-fab:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 28px rgba(99,102,241,0.55);
        }
        .cb-fab svg { transition: transform 0.3s ease; }
        .cb-fab.open svg { transform: rotate(90deg); }

        /* Unread dot */
        .cb-dot {
          position: absolute;
          top: 4px; right: 4px;
          width: 11px; height: 11px;
          background: #f43f5e;
          border: 2px solid white;
          border-radius: 50%;
          animation: cb-pulse 1.8s infinite;
        }
        @keyframes cb-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.25); opacity: 0.7; }
        }

        /* ── Popup Panel ── */
        .cb-panel {
          position: fixed;
          bottom: 94px;
          right: 28px;
          z-index: 9998;
          width: 340px;
          height: 460px;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 12px 48px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transform-origin: bottom right;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease;
        }
        .cb-panel.hidden {
          transform: scale(0.85) translateY(10px);
          opacity: 0;
          pointer-events: none;
        }
        .cb-panel.visible {
          transform: scale(1) translateY(0);
          opacity: 1;
        }

        /* Header */
        .cb-header {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .cb-avatar {
          width: 36px; height: 36px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
        }
        .cb-header-text { flex: 1; }
        .cb-header-name {
          font-size: 14px; font-weight: 600; color: white; margin: 0;
        }
        .cb-header-status {
          font-size: 11px; color: rgba(255,255,255,0.75); display: flex;
          align-items: center; gap: 4px;
        }
        .cb-status-dot {
          width: 6px; height: 6px; background: #4ade80;
          border-radius: 50%; display: inline-block;
        }
        .cb-close-btn {
          background: rgba(255,255,255,0.15); border: none;
          border-radius: 8px; padding: 5px 7px;
          cursor: pointer; color: white; font-size: 14px;
          transition: background 0.15s;
        }
        .cb-close-btn:hover { background: rgba(255,255,255,0.25); }

        /* Messages */
        .cb-messages {
          flex: 1;
          overflow-y: auto;
          padding: 14px 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: #f8f8fc;
        }
        .cb-messages::-webkit-scrollbar { width: 4px; }
        .cb-messages::-webkit-scrollbar-thumb {
          background: #d1d5db; border-radius: 4px;
        }

        /* Bubbles */
        .cb-bubble-row {
          display: flex;
          align-items: flex-end;
          gap: 7px;
        }
        .cb-bubble-row.user { flex-direction: row-reverse; }

        .cb-bubble-icon {
          width: 26px; height: 26px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; flex-shrink: 0;
        }

        .cb-bubble {
          max-width: 78%;
          padding: 9px 13px;
          border-radius: 16px;
          font-size: 13.5px;
          line-height: 1.5;
          word-wrap: break-word;
        }
        .cb-bubble.assistant {
          background: white;
          color: #1e1b4b;
          border-bottom-left-radius: 4px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.07);
        }
        .cb-bubble.user {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border-bottom-right-radius: 4px;
        }

        /* Typing indicator */
        .cb-typing {
          display: flex; gap: 4px; align-items: center;
          padding: 10px 14px;
        }
        .cb-typing span {
          width: 7px; height: 7px; background: #a5b4fc;
          border-radius: 50%;
          animation: cb-bounce 1.2s infinite ease-in-out;
        }
        .cb-typing span:nth-child(2) { animation-delay: 0.2s; }
        .cb-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes cb-bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }

        /* Input area */
        .cb-input-area {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          background: white;
          border-top: 1px solid #f0f0f8;
          flex-shrink: 0;
        }
        .cb-input {
          flex: 1;
          border: 1.5px solid #e5e7eb;
          border-radius: 12px;
          padding: 9px 13px;
          font-size: 13.5px;
          outline: none;
          resize: none;
          font-family: 'DM Sans', sans-serif;
          color: #1e1b4b;
          background: #fafafa;
          transition: border-color 0.2s;
          line-height: 1.4;
          max-height: 80px;
          overflow-y: auto;
        }
        .cb-input:focus { border-color: #6366f1; background: white; }
        .cb-input::placeholder { color: #9ca3af; }

        .cb-send {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.15s, opacity 0.15s;
          flex-shrink: 0;
        }
        .cb-send:hover:not(:disabled) { transform: scale(1.07); }
        .cb-send:disabled { opacity: 0.5; cursor: not-allowed; }

        /* Mobile */
        @media (max-width: 480px) {
          .cb-panel { width: calc(100vw - 32px); right: 16px; bottom: 86px; }
          .cb-fab { bottom: 20px; right: 16px; }
      `}</style>

      <div className="cb-root">
        {/* ── Floating Button ── */}
        <button
          className={`cb-fab ${open ? "open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle chat"
        >
          {!open && <span className="cb-dot" />}
          {open ? (
            // X icon
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            // Chat bubble icon
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </button>

        {/* ── Chat Panel ── */}
        <div className={`cb-panel ${open ? "visible" : "hidden"}`} role="dialog" aria-label="Chat assistant">

          {/* Header */}
          <div className="cb-header">
            <img src={process.env.PUBLIC_URL + "/botavatar.png"} alt="Bot" className="cb-avatar" />
            <div className="cb-header-text">
              <p className="cb-header-name">Skillra AI</p>
              <span className="cb-header-status">
                <span className="cb-status-dot" /> Online
              </span>
            </div>
            <button className="cb-close-btn" onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* Messages */}
          <div className="cb-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`cb-bubble-row ${msg.role}`}>
                {msg.role === "assistant" && (
                  <img src={process.env.PUBLIC_URL + "/botavatar.png"} alt="Bot" className="cb-bubble-icon" />
                )}
                <div className={`cb-bubble ${msg.role}`}>{msg.content}</div>
              </div>
            ))}

            {loading && (
              <div className="cb-bubble-row assistant">
                <div className="cb-bubble-icon">🤖</div>
                <div className="cb-bubble assistant">
                  <div className="cb-typing">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="cb-input-area">
            <textarea
              ref={inputRef}
              className="cb-input"
              rows={1}
              placeholder="Type a message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <button
              className="cb-send"
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              aria-label="Send"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}