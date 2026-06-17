import { useState, useEffect, useRef } from "react";
import IMGS from "./images.js";

// ── QUILTED LEATHER TEXTURE BACKGROUND ──────────────────────────────────────
// Royal green glossy quilted leather with dark gold stitching, in the spirit
// of Chanel caviar leather, plus a faint Adinkra symbol layer on top.
const QUILT_SIZE = 64;
const QuiltedBg = () => (
  <svg
    style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="quiltBase" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0B2018" />
        <stop offset="50%" stopColor="#0F2E20" />
        <stop offset="100%" stopColor="#0A1A14" />
      </linearGradient>

      <pattern id="quilt" x="0" y="0" width={QUILT_SIZE} height={QUILT_SIZE} patternUnits="userSpaceOnUse">
        {/* diamond stitch lines */}
        <path d={`M0,${QUILT_SIZE/2} L${QUILT_SIZE/2},0 L${QUILT_SIZE},${QUILT_SIZE/2} L${QUILT_SIZE/2},${QUILT_SIZE} Z`}
          fill="none" stroke="#8A6E2E" strokeWidth="0.6" strokeOpacity="0.35" />
        {/* puffed highlight in center of each diamond, glossy effect */}
        <ellipse cx={QUILT_SIZE/2} cy={QUILT_SIZE/2} rx="14" ry="10" fill="#1B4332" opacity="0.5" />
        <ellipse cx={QUILT_SIZE/2 - 5} cy={QUILT_SIZE/2 - 6} rx="6" ry="4" fill="#2D6B4A" opacity="0.35" />
      </pattern>

      <pattern id="adinkraLayer" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">
        <g transform="translate(70,70)" fill="none" stroke="#C9A84C" strokeWidth="1.3" opacity="0.5">
          <circle r="20" />
          <circle r="11" />
          <line x1="0" y1="-20" x2="0" y2="-34" />
          <line x1="0" y1="20" x2="0" y2="34" />
          <line x1="-20" y1="0" x2="-34" y2="0" />
          <line x1="20" y1="0" x2="34" y2="0" />
          <path d="M-9,-9 L0,-20 L9,-9" />
          <path d="M-9,9 L0,20 L9,9" />
        </g>
      </pattern>

      <radialGradient id="sheen" cx="30%" cy="20%" r="70%">
        <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.10" />
        <stop offset="40%" stopColor="#C9A84C" stopOpacity="0.03" />
        <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
      </radialGradient>
    </defs>

    <rect width="100%" height="100%" fill="url(#quiltBase)" />
    <rect width="100%" height="100%" fill="url(#quilt)" />
    <rect width="100%" height="100%" fill="url(#adinkraLayer)" opacity="0.5" />
    <rect width="100%" height="100%" fill="url(#sheen)" />
  </svg>
);

// ── KENTE DIVIDER ────────────────────────────────────────────────────────────
const KenteDivider = () => (
  <div style={{ width: "100%", height: "6px", background: "linear-gradient(90deg, #1B4332 25%, #C9A84C 25%, #C9A84C 50%, #8B1A1A 50%, #8B1A1A 75%, #1B4332 75%)", margin: "0" }} />
);

// ── GOLD LINE ────────────────────────────────────────────────────────────────
const GoldLine = ({ width = "60px" }) => (
  <div style={{ width, height: "2px", background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", margin: "12px auto" }} />
);

// ── NAV ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "About", "Work", "Books", "Services", "Studio"];

const Nav = ({ page, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(10,20,15,0.97)" : "rgba(10,20,15,0.85)",
      backdropFilter: "blur(12px)",
      borderBottom: scrolled ? "1px solid rgba(201,168,76,0.3)" : "none",
      padding: "0 clamp(16px,4vw,48px)",
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        {/* Logo */}
        <button onClick={() => setPage("Home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <img src={IMGS.logo_mark} alt="Scribe Haus" style={{ height: 34 }} />
          <span style={{ color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: 20, letterSpacing: "0.12em", fontWeight: 600 }}>SCRIBE HAUS</span>
        </button>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {NAV_LINKS.map(n => (
            <button key={n} onClick={() => setPage(n)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: page === n ? "#C9A84C" : "rgba(255,255,255,0.75)",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 15, letterSpacing: "0.1em", fontWeight: page === n ? 600 : 400,
              transition: "color 0.2s",
              borderBottom: page === n ? "1px solid #C9A84C" : "1px solid transparent",
              paddingBottom: 2,
            }}>{n.toUpperCase()}</button>
          ))}
          <button onClick={() => setPage("Studio")} style={{
            background: "linear-gradient(135deg, #C9A84C, #E8C96A)",
            border: "none", cursor: "pointer", color: "#0A1410",
            fontFamily: "'Cormorant Garamond', serif", fontSize: 14, fontWeight: 700,
            letterSpacing: "0.12em", padding: "8px 20px", borderRadius: 2,
          }}>GET A QUOTE</button>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "#C9A84C", fontSize: 24 }} className="hamburger">
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: "rgba(10,20,15,0.98)", padding: "20px 24px 30px", borderTop: "1px solid rgba(201,168,76,0.2)" }}>
          {NAV_LINKS.map(n => (
            <button key={n} onClick={() => { setPage(n); setMenuOpen(false); }} style={{
              display: "block", width: "100%", background: "none", border: "none", cursor: "pointer",
              color: page === n ? "#C9A84C" : "#fff", fontFamily: "'Cormorant Garamond', serif",
              fontSize: 20, letterSpacing: "0.1em", padding: "12px 0", textAlign: "left",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}>{n}</button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

// ── HOME PAGE ────────────────────────────────────────────────────────────────
const Home = ({ setPage }) => {
  const [typed, setTyped] = useState("");
  const words = ["Words.", "Design.", "Stories."];
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setTyped(word.slice(0, charIdx + 1));
        if (charIdx + 1 === word.length) {
          setTimeout(() => setDeleting(true), 1600);
        } else {
          setCharIdx(c => c + 1);
        }
      } else {
        setTyped(word.slice(0, charIdx - 1));
        if (charIdx === 0) {
          setDeleting(false);
          setWordIdx(i => (i + 1) % words.length);
        } else {
          setCharIdx(c => c - 1);
        }
      }
    }, deleting ? 60 : 110);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx]);

  const services = [
    { icon: "🎨", title: "Graphic Design", desc: "Logos, flyers, brand identities that people actually remember." },
    { icon: "🏷", title: "Branding & Marketing", desc: "A complete identity: visual, verbal and strategic, built to actually sell." },
    { icon: "💻", title: "Web Design", desc: "Sites that work, load fast and feel like a real business." },
    { icon: "✏️", title: "Copywriting", desc: "Words that sound like you but sharper and more confident." },
    { icon: "✍", title: "CV Writing", desc: "Clean, honest, strategic. CVs that get you in the room." },
    { icon: "📖", title: "Book Publishing", desc: "From manuscript to Amazon. Cover design and editorial support." },
  ];

  const stats = [
    { n: "3+", label: "Years Running" },
    { n: "50+", label: "Clients Served" },
    { n: "18K+", label: "Wattpad Reads" },
    { n: "4", label: "Countries Reached" },
  ];

  return (
    <div style={{ paddingTop: 70 }}>
      {/* Hero */}
      <section style={{
        minHeight: "92vh", display: "flex", alignItems: "center",
        background: "linear-gradient(135deg, #0A1410 0%, #0F2418 50%, #0A1410 100%)",
        position: "relative", overflow: "hidden", padding: "80px clamp(16px,5vw,80px)",
      }}>
        {/* Ambient gold glow */}
        <div style={{ position: "absolute", top: "20%", right: "10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 300, height: 300, background: "radial-gradient(circle, rgba(27,67,50,0.3) 0%, transparent 70%)", borderRadius: "50%" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          {/* Left */}
          <div style={{ zIndex: 1 }}>
            <p style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, letterSpacing: "0.25em", marginBottom: 16, opacity: 0.9 }}>CREATIVE STUDIO · ACCRA GHANA · EST. 2023</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(42px,6vw,80px)", color: "#fff", lineHeight: 1.05, margin: "0 0 8px" }}>
              Words,<br />Design &<br />
              <span style={{ color: "#C9A84C" }}>{typed}</span>
              <span style={{ color: "#C9A84C", animation: "blink 1s infinite" }}>|</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 18, lineHeight: 1.7, margin: "24px 0 40px", maxWidth: 480, fontFamily: "'Lato', sans-serif" }}>
              Scribe Haus creates brands, books and digital experiences that connect. From editorial design to CV writing and custom publishing we make things worth reading.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => setPage("Work")} style={{
                background: "linear-gradient(135deg, #C9A84C, #E8C96A)", color: "#0A1410",
                border: "none", padding: "14px 32px", fontFamily: "'Cormorant Garamond', serif",
                fontSize: 16, fontWeight: 700, letterSpacing: "0.1em", cursor: "pointer", borderRadius: 2,
              }}>SEE THE WORK</button>
              <button onClick={() => setPage("Services")} style={{
                background: "transparent", color: "#fff",
                border: "1px solid rgba(255,255,255,0.4)", padding: "14px 32px",
                fontFamily: "'Cormorant Garamond', serif", fontSize: 16, letterSpacing: "0.1em",
                cursor: "pointer", borderRadius: 2,
              }}>OUR SERVICES</button>
            </div>
          </div>

          {/* Right - portrait */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1 }}>
            <div style={{ position: "relative" }}>
              <div style={{ width: 320, height: 420, borderRadius: 4, overflow: "hidden", border: "1px solid rgba(201,168,76,0.3)", boxShadow: "0 0 60px rgba(201,168,76,0.1)" }}>
                <img src={IMGS.akosua_correct} alt="Akosua Addae Buapim" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
              </div>
              {/* Gold accent card */}
              <div style={{
                position: "absolute", bottom: -20, right: -20,
                background: "linear-gradient(135deg, #1B4332, #0F2418)",
                border: "1px solid rgba(201,168,76,0.4)", padding: "14px 20px", borderRadius: 2,
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}>
                <p style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, margin: 0 }}>Akosua</p>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontFamily: "'Lato', sans-serif", margin: "4px 0 0", letterSpacing: "0.05em" }}>Founder & Creative Director</p>
              </div>
            </div>
          </div>
        </div>

        <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
      </section>

      <KenteDivider />

      {/* Stats */}
      <section style={{ background: "rgba(15,36,24,0.55)", padding: "48px clamp(16px,5vw,80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, textAlign: "center" }}>
          {stats.map(s => (
            <div key={s.n} style={{ padding: "20px 0" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,4vw,52px)", color: "#C9A84C", margin: 0, fontWeight: 700 }}>{s.n}</p>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, fontFamily: "'Lato', sans-serif", letterSpacing: "0.1em", margin: "4px 0 0" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <KenteDivider />

      {/* Services preview */}
      <section style={{ background: "transparent", padding: "80px clamp(16px,5vw,80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.25em", textAlign: "center" }}>WHAT WE DO</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,4vw,52px)", color: "#fff", textAlign: "center", margin: "8px 0 16px" }}>Creative Services</h2>
          <GoldLine />
          <p style={{ color: "rgba(255,255,255,0.55)", textAlign: "center", fontFamily: "'Lato', sans-serif", fontSize: 15, maxWidth: 540, margin: "0 auto 56px" }}>
            Everything your brand, book or business needs to show up properly.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 24 }}>
            {services.map(s => (
              <div key={s.title} onClick={() => setPage("Services")} style={{
                background: "linear-gradient(135deg, #0F2418, #0A1410)",
                border: "1px solid rgba(201,168,76,0.15)", borderRadius: 4, padding: "28px 24px",
                cursor: "pointer", transition: "all 0.25s ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.15)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <span style={{ fontSize: 32 }}>{s.icon}</span>
                <h3 style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif", fontSize: 22, margin: "12px 0 8px", fontWeight: 600 }}>{s.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Lato', sans-serif", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button onClick={() => setPage("Services")} style={{
              background: "transparent", border: "1px solid #C9A84C", color: "#C9A84C",
              padding: "12px 36px", fontFamily: "'Cormorant Garamond', serif", fontSize: 15,
              letterSpacing: "0.12em", cursor: "pointer", borderRadius: 2,
            }}>VIEW ALL SERVICES & PRICING</button>
          </div>
        </div>
      </section>

      {/* Work teaser */}
      <section style={{ background: "rgba(15,36,24,0.45)", padding: "80px clamp(16px,5vw,80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.25em", textAlign: "center" }}>PORTFOLIO</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,4vw,52px)", color: "#fff", textAlign: "center", margin: "8px 0 16px" }}>Selected Work</h2>
          <GoldLine />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 48 }}>
            {[IMGS.mticket1, IMGS.work9, IMGS.phot, IMGS.lux1, IMGS.elite2, IMGS.stella].map((img, i) => (
              <div key={i} onClick={() => setPage("Work")} style={{
                aspectRatio: "4/3", overflow: "hidden", borderRadius: 4, cursor: "pointer",
                border: "1px solid rgba(201,168,76,0.1)",
              }}>
                <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.06)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"}
                />
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button onClick={() => setPage("Work")} style={{
              background: "linear-gradient(135deg, #C9A84C, #E8C96A)", color: "#0A1410",
              border: "none", padding: "12px 36px", fontFamily: "'Cormorant Garamond', serif",
              fontSize: 15, fontWeight: 700, letterSpacing: "0.1em", cursor: "pointer", borderRadius: 2,
            }}>VIEW FULL PORTFOLIO</button>
          </div>
        </div>
      </section>

      {/* Writing presence */}
      <section style={{ background: "transparent", padding: "80px clamp(16px,5vw,80px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.25em" }}>WRITING</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,4vw,48px)", color: "#fff", margin: "8px 0 16px" }}>Words Beyond the Studio</h2>
          <GoldLine />
          <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Lato', sans-serif", fontSize: 16, lineHeight: 1.8, margin: "24px auto", maxWidth: 600 }}>
            I write beyond client work. On Medium I publish the Built to Exclude series on payment infrastructure and what it means to be an African creative trying to get paid. On JenDreaLight I write about skin, life and becoming. On Wattpad I just write.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginTop: 32 }}>
            {[
              { label: "Medium", sub: "Built to Exclude series", url: "https://medium.com/@akosuaaddaebuapim" },
              { label: "JenDreaLight", sub: "Personal writing blog", url: "https://akosuaaddaebuapim.wixsite.com/jendrealight" },
              { label: "Wattpad", sub: "18,000+ reads", url: "https://www.wattpad.com" },
            ].map(b => (
              <a key={b.label} href={b.url} target="_blank" rel="noopener noreferrer" style={{
                display: "block", textDecoration: "none",
                border: "1px solid rgba(201,168,76,0.3)", padding: "20px 28px", borderRadius: 4,
                background: "rgba(27,67,50,0.15)", minWidth: 160, transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#C9A84C"; e.currentTarget.style.background = "rgba(27,67,50,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)"; e.currentTarget.style.background = "rgba(27,67,50,0.15)"; }}
              >
                <p style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, margin: "0 0 4px" }}>{b.label}</p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Lato', sans-serif", fontSize: 12, margin: 0 }}>{b.sub}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, #1B4332 0%, #0F2418 100%)", padding: "80px clamp(16px,5vw,80px)", textAlign: "center" }}>
        <p style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.25em" }}>READY?</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,5vw,60px)", color: "#fff", margin: "8px 0 24px" }}>
          Let's build something<br />that speaks for you.
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Lato', sans-serif", fontSize: 16, marginBottom: 36 }}>
          WhatsApp or call. We work from Accra and with clients everywhere.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://wa.me/233547940650" style={{
            background: "linear-gradient(135deg, #C9A84C, #E8C96A)", color: "#0A1410",
            textDecoration: "none", padding: "14px 36px", fontFamily: "'Cormorant Garamond', serif",
            fontSize: 16, fontWeight: 700, letterSpacing: "0.1em", borderRadius: 2, display: "inline-block",
          }}>WHATSAPP US</a>
          <a href="mailto:scribehausdigital@gmail.com" style={{
            background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.4)",
            textDecoration: "none", padding: "14px 36px", fontFamily: "'Cormorant Garamond', serif",
            fontSize: 16, letterSpacing: "0.1em", borderRadius: 2, display: "inline-block",
          }}>EMAIL US</a>
        </div>
      </section>
    </div>
  );
};

// ── ABOUT PAGE ───────────────────────────────────────────────────────────────
const About = ({ setPage }) => (
  <div style={{ paddingTop: 70, background: "transparent", minHeight: "100vh" }}>
    <section style={{ padding: "80px clamp(16px,5vw,80px)", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
        <div>
          <p style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.25em", marginBottom: 12 }}>THE PERSON BEHIND THE STUDIO</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,60px)", color: "#fff", lineHeight: 1.1, margin: "0 0 8px" }}>Akosua Addae Buapim</h1>
          <GoldLine width="80px" />
          <div style={{ marginTop: 24 }}>
            <p style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Lato', sans-serif", fontSize: 16, lineHeight: 1.85, marginBottom: 20 }}>
              I started Scribe Haus because I kept seeing people and small brands settle for generic design and forgettable marketing when they deserved something that actually felt considered.
            </p>
            <p style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Lato', sans-serif", fontSize: 16, lineHeight: 1.85, marginBottom: 20 }}>
              Scribe Haus is a graphic design and marketing studio at its core. Logos, brand identities, flyers, social media campaigns and websites are the bulk of what comes through the studio. Alongside that I write, publish books and help people put together CVs that actually represent them properly, but design and marketing is where most of the work lives.
            </p>
            <p style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Lato', sans-serif", fontSize: 16, lineHeight: 1.85, marginBottom: 20 }}>
              I studied African Studies, History and Politics at the University of Cape Coast. I taught myself design and web development because the work demanded it, and then I realized I genuinely loved it. I've written since I was a teenager and have published two books so far, with a third on writing CVs that pass through hiring algorithms.
            </p>
            <p style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Lato', sans-serif", fontSize: 16, lineHeight: 1.85, marginBottom: 20 }}>
              Scribe Haus has worked with clients in Ghana and beyond, building brand identities, websites and marketing material for businesses across hospitality, transport, entertainment and more. I do the work personally. There is no team of interns here. When you hire Scribe Haus you are working directly with me.
            </p>
            <p style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Lato', sans-serif", fontSize: 16, lineHeight: 1.85 }}>
              I'm based in Accra. I write on Medium about the structural problems African creatives face trying to get paid online, and I believe good design and a strong brand should not be a luxury only certain people can access.
            </p>
          </div>

          <div style={{ marginTop: 40, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button onClick={() => setPage("Work")} style={{
              background: "linear-gradient(135deg, #C9A84C, #E8C96A)", color: "#0A1410",
              border: "none", padding: "12px 28px", fontFamily: "'Cormorant Garamond', serif",
              fontSize: 15, fontWeight: 700, letterSpacing: "0.1em", cursor: "pointer", borderRadius: 2,
            }}>SEE MY WORK</button>
            <a href="https://wa.me/233547940650" style={{
              display: "inline-block", textDecoration: "none",
              background: "transparent", color: "#C9A84C", border: "1px solid #C9A84C",
              padding: "12px 28px", fontFamily: "'Cormorant Garamond', serif",
              fontSize: 15, letterSpacing: "0.1em", borderRadius: 2,
            }}>WHATSAPP ME</a>
          </div>
        </div>

        <div>
          <div style={{ borderRadius: 4, overflow: "hidden", border: "1px solid rgba(201,168,76,0.2)", marginBottom: 24 }}>
            <img src={IMGS.akosua_correct} alt="Akosua Addae Buapim" style={{ width: "100%", display: "block", objectFit: "cover" }} />
          </div>

          {/* Skills grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {["Writing & Editing", "Graphic Design", "Web Development", "Book Publishing", "CV Writing", "Brand Strategy", "Canva & AI Tools", "Client Management"].map(s => (
              <div key={s} style={{ border: "1px solid rgba(201,168,76,0.2)", padding: "10px 14px", borderRadius: 2, background: "rgba(27,67,50,0.1)" }}>
                <p style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'Lato', sans-serif", fontSize: 13, margin: 0 }}>{s}</p>
              </div>
            ))}
          </div>

          {/* Contact card */}
          <div style={{ marginTop: 24, border: "1px solid rgba(201,168,76,0.3)", borderRadius: 4, padding: "20px 24px", background: "rgba(27,67,50,0.15)" }}>
            <p style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 600, margin: "0 0 12px" }}>Get in touch</p>
            {[
              { label: "WhatsApp & Call", val: "+233 54 794 0650" },
              { label: "Call only", val: "+233 50 541 5863" },
              { label: "Email", val: "scribehausdigital@gmail.com" },
              { label: "TikTok", val: "@scribehausstudio" },
              { label: "Facebook", val: "Akosua Addae Buapim" },
            ].map(c => (
              <div key={c.label} style={{ display: "flex", gap: 12, marginBottom: 8 }}>
                <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Lato', sans-serif", fontSize: 12, minWidth: 120 }}>{c.label}</span>
                <span style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'Lato', sans-serif", fontSize: 13 }}>{c.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
);

// ── WORK PAGE ─────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "mticket",
    title: "mTicket Ghana",
    category: "Web Design · Branding · Marketing",
    tags: ["Web Design", "Branding"],
    thumb: "mticket1",
    images: ["mticket1", "mticket2", "mticket3", "work1", "work4"],
    brief: "Ghana's leading bus ticketing platform needed a complete digital presence from a consumer website to social media campaigns and branded merchandise.",
    problem: "Multiple visual identities existed across different touchpoints. The brand needed unifying at scale while keeping it accessible across mobile and desktop.",
    solution: "Designed two site versions (orange consumer-facing and purple premium tier), created roll-up banners, promo graphics and an explainer infographic, and built a cohesive brand system across every touchpoint.",
    outcome: "mTicket exhibited at the Ecobank Joy Business SME Fair. The brand identity was carried onto merchandise and marketing material distributed at live events.",
    client: "mTicket Ghana / Phot Holdings",
    year: "2025",
  },
  {
    id: "twins",
    title: "The Twins Catering",
    category: "Branding · Logo Design · Marketing",
    tags: ["Branding"],
    thumb: "work9",
    images: ["work9", "work7", "work8"],
    brief: "A premium catering brand in Accra needed an identity that matched the quality of the food and the personality of the twins running it.",
    problem: "No visual identity existed. The client needed a logo, full marketing flyers and social media presence from zero.",
    solution: "Created the illustrated dual portrait logo with a black and gold colour palette, designed light and dark flyer versions for different platforms and built out the full brand system.",
    outcome: "The brand launched with a cohesive identity that reads premium while staying warm and personality led.",
    client: "The Twins Catering",
    year: "2024",
  },
  {
    id: "elite",
    title: "Elite Groovers Brass Band",
    category: "Web Design · Full Site Build",
    tags: ["Web Design"],
    thumb: "phot",
    images: ["phot", "elite2"],
    brief: "Build the complete website for Ghana's premier brass band. The site needed to handle band info, fan content, events and merch.",
    problem: "The band had no web presence at all. Everything from about pages to fan zones needed creating from scratch.",
    solution: "Built a full multi page site with a black and gold aesthetic, real band photography, merch showcase, media section and fan facing content.",
    outcome: "A complete professional web presence that the band can grow into. Solo build delivered as a portfolio project.",
    client: "Elite Groovers Brass Band",
    year: "2025",
  },
  {
    id: "luxury",
    title: "Luxury Concepts",
    category: "Web Design · Architectural Visualization",
    tags: ["Web Design", "Branding"],
    thumb: "lux1",
    images: ["lux1", "lux2"],
    brief: "Architectural visualization portfolio for a Roman Ridge Accra developer with AI generated concept buildings.",
    problem: "High end architectural renders needed a presentation platform worthy of the vision.",
    solution: "Dark luxury website with full bleed gallery, editorial typography and a presentation that matched the ambition of the renders.",
    outcome: "A showcase site that positions the developer in the premium tier of Accra real estate.",
    client: "Luxury Concepts",
    year: "2025",
  },
  {
    id: "stella",
    title: "Stella Amoako",
    category: "Web Design",
    tags: ["Web Design"],
    thumb: "stella",
    images: ["stella"],
    brief: "A developmental intervention specialist needed a professional, warm site that parents could trust.",
    problem: "The brief required a site that felt expert and clinical without being cold or off putting to worried parents.",
    solution: "Clean teal and warm design with clear service breakdown, stats and a strong call to action.",
    outcome: "A professional presence that communicates expertise while remaining human and approachable.",
    client: "Stella Amoako",
    year: "2025",
  },
  {
    id: "phot",
    title: "Phot Holdings",
    category: "Web Design · Branding",
    tags: ["Web Design", "Branding"],
    thumb: "elite",
    images: ["elite"],
    brief: "The parent holding company behind mTicket and PhotMedia needed a tech forward corporate site positioning the group as a serious player in African mobility.",
    problem: "The site needed to serve press, investors and partners while still feeling current and credible as a tech holding company.",
    solution: "Dark futuristic aesthetic with bold gradient typography, geometric motion elements and clear navigation to each subsidiary brand.",
    outcome: "A site that works at every level: consumer facing brands, press and future investors.",
    client: "Phot Holdings",
    year: "2025",
  },
];

const Work = () => {
  const [active, setActive] = useState("All");
  const [modal, setModal] = useState(null);
  const tags = ["All", "Web Design", "Branding"];
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter(p => p.tags.includes(active));

  return (
    <div style={{ paddingTop: 70, background: "transparent", minHeight: "100vh" }}>
      <section style={{ padding: "60px clamp(16px,5vw,80px) 80px", maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.25em", textAlign: "center" }}>PORTFOLIO</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,60px)", color: "#fff", textAlign: "center", margin: "8px 0 16px" }}>Selected Work</h1>
        <GoldLine />
        <p style={{ color: "rgba(255,255,255,0.55)", textAlign: "center", fontFamily: "'Lato', sans-serif", fontSize: 15, marginBottom: 40 }}>
          Real clients, real briefs, real results.
        </p>

        {/* Filters */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
          {tags.map(t => (
            <button key={t} onClick={() => setActive(t)} style={{
              background: active === t ? "linear-gradient(135deg, #C9A84C, #E8C96A)" : "transparent",
              border: "1px solid " + (active === t ? "#C9A84C" : "rgba(201,168,76,0.3)"),
              color: active === t ? "#0A1410" : "#C9A84C",
              padding: "7px 18px", fontFamily: "'Lato', sans-serif", fontSize: 13,
              letterSpacing: "0.08em", cursor: "pointer", borderRadius: 2, fontWeight: active === t ? 700 : 400,
            }}>{t}</button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 24 }}>
          {filtered.map(p => (
            <div key={p.id} onClick={() => setModal(p)} style={{
              background: "#0F2418", borderRadius: 4, overflow: "hidden",
              border: "1px solid rgba(201,168,76,0.12)", cursor: "pointer",
              transition: "all 0.25s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.12)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                <img src={IMGS[p.thumb]} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"}
                />
              </div>
              <div style={{ padding: "20px 20px 24px" }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ background: "rgba(201,168,76,0.1)", color: "#C9A84C", fontSize: 11, fontFamily: "'Lato', sans-serif", letterSpacing: "0.08em", padding: "3px 8px", borderRadius: 2 }}>{t}</span>
                  ))}
                </div>
                <h3 style={{ color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, margin: "0 0 6px" }}>{p.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Lato', sans-serif", fontSize: 12, margin: "0 0 14px" }}>{p.category}</p>
                <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Lato', sans-serif", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{p.brief.slice(0, 100)}...</p>
                <p style={{ color: "#C9A84C", fontFamily: "'Lato', sans-serif", fontSize: 13, margin: "14px 0 0", letterSpacing: "0.05em" }}>View case study →</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study Modal */}
      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 2000, overflow: "auto", padding: "40px 16px" }} onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div style={{ maxWidth: 800, margin: "0 auto", background: "#0F2418", borderRadius: 4, border: "1px solid rgba(201,168,76,0.3)", overflow: "hidden" }}>
            <img src={IMGS[modal.thumb]} alt={modal.title} style={{ width: "100%", maxHeight: 380, objectFit: "cover" }} />
            <div style={{ padding: "36px 40px 48px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                <div>
                  <h2 style={{ color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: 36, margin: "0 0 6px" }}>{modal.title}</h2>
                  <p style={{ color: "#C9A84C", fontFamily: "'Lato', sans-serif", fontSize: 13, margin: 0 }}>{modal.client} · {modal.year}</p>
                </div>
                <button onClick={() => setModal(null)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 24, cursor: "pointer", lineHeight: 1 }}>✕</button>
              </div>

              {[
                { label: "The Brief", text: modal.brief },
                { label: "The Problem", text: modal.problem },
                { label: "The Solution", text: modal.solution },
                { label: "The Outcome", text: modal.outcome },
              ].map(s => (
                <div key={s.label} style={{ marginBottom: 24 }}>
                  <h4 style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif", fontSize: 18, margin: "0 0 8px", letterSpacing: "0.05em" }}>{s.label}</h4>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Lato', sans-serif", fontSize: 15, lineHeight: 1.75, margin: 0 }}>{s.text}</p>
                </div>
              ))}

              {/* Image gallery */}
              {modal.images.length > 1 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 10, marginTop: 32 }}>
                  {modal.images.slice(1).map((img, i) => (
                    <div key={i} style={{ aspectRatio: "16/10", overflow: "hidden", borderRadius: 2 }}>
                      <img src={IMGS[img]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── BOOKS PAGE ────────────────────────────────────────────────────────────────
const Books = () => {
  const [cartMsg, setCartMsg] = useState("");

  const addToCart = (item) => {
    setCartMsg(`Added "${item}" to cart. We'll confirm via WhatsApp.`);
    setTimeout(() => setCartMsg(""), 4000);
  };

  const books = [
    {
      title: "Write Into Existence",
      subtitle: "Manifestation Journal",
      cover: "manifestation_cover",
      desc: "A guided journal for writing your life into being. Prompts for clarity, intention and manifestation. Because some things need to be put on paper before they can become real.",
      tag: "AVAILABLE ON AMAZON KDP",
      cta: "BUY ON AMAZON",
      url: "https://www.amazon.com/dp/B0C6BMLLTM",
    },
    {
      title: "Tiny Thoughts, Big Power",
      subtitle: "A Book of Positive Affirmations for Little Leaders",
      cover: "tiny_thoughts_cover_final",
      desc: "A children's affirmation book that puts confidence and self belief into small hands early. Bright, warm and built for little leaders in the making.",
      tag: "PRINTABLE VERSION COMING TO AMAZON",
      cta: "GET DIGITAL COPY",
      isDigital: true,
      price: "GH₵ 35 / $3",
    },
    {
      title: "The Gatekeeper Code",
      subtitle: "Writing a CV the Algorithm Cannot Ignore",
      cover: "gatekeeper_cover",
      desc: "A practical guide to writing a CV that actually passes through Applicant Tracking Systems and lands in front of a real person. Built from real CV writing experience with international clients.",
      tag: "DIGITAL GUIDE",
      cta: "GET DIGITAL COPY",
      isDigital: true,
      price: "GH₵ 40 / $4",
    },
  ];

  const digitalProducts = [
    { name: "ATS One Page CV Template", price: "GH₵ 25 / $3", desc: "Clean, recruiter approved. Word format. Edit in minutes.", tag: "BESTSELLER" },
    { name: "ATS Two Page CV Template", price: "GH₵ 30 / $4", desc: "For experienced professionals with more to say.", tag: "" },
    { name: "Fresh Graduate CV Template", price: "GH₵ 20 / $2", desc: "Make entry level look anything but. Smart structure.", tag: "" },
    { name: "Executive CV Template", price: "GH₵ 45 / $5", desc: "Senior roles, board positions, international applications.", tag: "PREMIUM" },
  ];

  return (
    <div style={{ paddingTop: 70, background: "transparent", minHeight: "100vh" }}>
      {cartMsg && (
        <div style={{ position: "fixed", bottom: 24, right: 24, background: "#1B4332", border: "1px solid #C9A84C", color: "#fff", padding: "14px 20px", borderRadius: 4, zIndex: 999, fontFamily: "'Lato', sans-serif", fontSize: 14, maxWidth: 320 }}>
          {cartMsg}
        </div>
      )}

      <section style={{ padding: "60px clamp(16px,5vw,80px) 80px", maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.25em", textAlign: "center" }}>BOOKS & DIGITAL PRODUCTS</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,60px)", color: "#fff", textAlign: "center", margin: "8px 0 16px" }}>The Shop</h1>
        <GoldLine />

        {/* Books */}
        {books.map((b, i) => (
          <div key={b.title} style={{ display: "grid", gridTemplateColumns: i % 2 === 0 ? "1fr 1.4fr" : "1.4fr 1fr", gap: 64, marginTop: i === 0 ? 64 : 80, alignItems: "center" }}>
            <div style={{
              order: i % 2 === 0 ? 0 : 1,
              borderRadius: 4, overflow: "hidden", border: "1px solid rgba(201,168,76,0.2)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)", maxWidth: 340,
            }}>
              <img src={IMGS[b.cover]} alt={b.title} style={{ width: "100%", display: "block" }} />
            </div>
            <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
              <span style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C", fontFamily: "'Lato', sans-serif", fontSize: 11, letterSpacing: "0.15em", padding: "4px 12px", borderRadius: 2 }}>{b.tag}</span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,4vw,44px)", color: "#fff", margin: "16px 0 8px", lineHeight: 1.15 }}>{b.title}<br /><span style={{ color: "#C9A84C", fontSize: "0.65em" }}>{b.subtitle}</span></h2>
              <GoldLine width="60px" />
              <p style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Lato', sans-serif", fontSize: 16, lineHeight: 1.8, margin: "20px 0 24px" }}>{b.desc}</p>
              {b.isDigital && <p style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, margin: "0 0 20px" }}>{b.price}</p>}
              <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Lato', sans-serif", fontSize: 13, marginBottom: 8 }}>By Akosua Addae Buapim</p>
              {b.isDigital ? (
                <button onClick={() => addToCart(b.title)} style={{
                  background: "linear-gradient(135deg, #C9A84C, #E8C96A)", color: "#0A1410", border: "none",
                  padding: "14px 36px", fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 16, fontWeight: 700, letterSpacing: "0.1em", borderRadius: 2, cursor: "pointer",
                }}>{b.cta}</button>
              ) : (
                <a href={b.url} target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-block", textDecoration: "none",
                  background: "linear-gradient(135deg, #C9A84C, #E8C96A)", color: "#0A1410",
                  padding: "14px 36px", fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 16, fontWeight: 700, letterSpacing: "0.1em", borderRadius: 2,
                }}>{b.cta}</a>
              )}
            </div>
          </div>
        ))}

        {/* Digital products */}
        <div style={{ marginTop: 100 }}>
          <p style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.25em", textAlign: "center" }}>DIGITAL DOWNLOADS</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,4vw,44px)", color: "#fff", textAlign: "center", margin: "8px 0 16px" }}>CV Templates</h2>
          <GoldLine />
          <p style={{ color: "rgba(255,255,255,0.55)", textAlign: "center", fontFamily: "'Lato', sans-serif", fontSize: 15, margin: "0 auto 48px", maxWidth: 520 }}>
            Professional, ATS friendly templates built from real CV writing experience. Priced to actually be accessible.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 20 }}>
            {digitalProducts.map(p => (
              <div key={p.name} style={{ background: "#0F2418", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 4, padding: "24px 20px", position: "relative" }}>
                {p.tag && (
                  <span style={{ position: "absolute", top: 14, right: 14, background: "#C9A84C", color: "#0A1410", fontSize: 10, fontFamily: "'Lato', sans-serif", fontWeight: 700, letterSpacing: "0.12em", padding: "3px 8px", borderRadius: 2 }}>{p.tag}</span>
                )}
                <div style={{ fontSize: 32, marginBottom: 12 }}>📄</div>
                <h3 style={{ color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: 20, margin: "0 0 8px", fontWeight: 600 }}>{p.name}</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Lato', sans-serif", fontSize: 13, lineHeight: 1.6, margin: "0 0 16px" }}>{p.desc}</p>
                <p style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, margin: "0 0 16px" }}>{p.price}</p>
                <button onClick={() => addToCart(p.name)} style={{
                  width: "100%", background: "linear-gradient(135deg, #C9A84C, #E8C96A)", border: "none",
                  color: "#0A1410", padding: "10px", fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", cursor: "pointer", borderRadius: 2,
                }}>GET THIS TEMPLATE</button>
              </div>
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.35)", textAlign: "center", fontFamily: "'Lato', sans-serif", fontSize: 13, marginTop: 24 }}>
            Payment via WhatsApp after order. More templates coming soon.
          </p>
        </div>
      </section>
    </div>
  );
};

// ── SERVICES PAGE ─────────────────────────────────────────────────────────────
const Services = ({ setPage }) => {
  const packages = [
    {
      name: "Brand Starter",
      price: "From GH₵ 350 / $30",
      features: ["Logo design", "Brand colour palette", "2 logo variations", "Usage guide", "Source files included"],
      highlight: true,
    },
    {
      name: "Flyer & Marketing Graphics",
      price: "From GH₵ 100 / $9",
      features: ["Single flyer or poster design", "Social media ready sizing", "2 revision rounds", "Print and digital files", "Delivered in 48h"],
      highlight: false,
    },
    {
      name: "Web Presence",
      price: "From GH₵ 900 / $80",
      features: ["Single-page website", "Mobile responsive", "Contact form", "Basic SEO setup", "Delivered in 5 to 7 days"],
      highlight: false,
    },
    {
      name: "Full Brand Package",
      price: "From GH₵ 1,800 / $160",
      features: ["Logo + full brand system", "Website (3 to 5 pages)", "Social media starter kit", "Business card design", "Priority support"],
      highlight: false,
    },
    {
      name: "CV + Cover Letter",
      price: "From GH₵ 80 / $8",
      features: ["Full CV rewrite", "Tailored cover letter", "ATS formatting", "2 revision rounds", "Delivered in 48h"],
      highlight: false,
    },
    {
      name: "Book Publishing",
      price: "From GH₵ 250 / $22",
      features: ["Cover design", "Interior layout", "KDP upload guidance", "Print + digital formats", "ISBN support"],
      highlight: false,
    },
    {
      name: "Copywriting",
      price: "From GH₵ 60 / $6",
      features: ["Website copy", "Social media bios", "Email sequences", "Product descriptions", "Per-project pricing"],
      highlight: false,
    },
  ];

  return (
    <div style={{ paddingTop: 70, background: "transparent", minHeight: "100vh" }}>
      <section style={{ padding: "60px clamp(16px,5vw,80px) 80px", maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.25em", textAlign: "center" }}>WHAT YOU GET</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,60px)", color: "#fff", textAlign: "center", margin: "8px 0 16px" }}>Services & Pricing</h1>
        <GoldLine />
        <p style={{ color: "rgba(255,255,255,0.55)", textAlign: "center", fontFamily: "'Lato', sans-serif", fontSize: 15, margin: "0 auto 16px", maxWidth: 560 }}>
          Real prices, real work. No hidden fees, no vague quotes. And yes, payment plans are available.
        </p>
        <p style={{ color: "rgba(201,168,76,0.7)", textAlign: "center", fontFamily: "'Lato', sans-serif", fontSize: 14, marginBottom: 56 }}>
          Prices are accessible by design. Scribe Haus was built to serve people in developing countries too.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 24 }}>
          {packages.map(pkg => (
            <div key={pkg.name} style={{
              background: pkg.highlight ? "linear-gradient(135deg, #1B4332, #0F3020)" : "#0F2418",
              border: pkg.highlight ? "1px solid #C9A84C" : "1px solid rgba(201,168,76,0.15)",
              borderRadius: 4, padding: "28px 24px", position: "relative",
            }}>
              {pkg.highlight && (
                <span style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: "#C9A84C", color: "#0A1410", fontSize: 10, fontFamily: "'Lato', sans-serif", fontWeight: 700, letterSpacing: "0.15em", padding: "4px 12px", borderRadius: 2 }}>MOST POPULAR</span>
              )}
              <h3 style={{ color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: 24, margin: "0 0 6px", fontWeight: 600 }}>{pkg.name}</h3>
              <p style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, margin: "0 0 20px" }}>{pkg.price}</p>
              <div style={{ marginBottom: 24 }}>
                {pkg.features.map(f => (
                  <div key={f} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
                    <span style={{ color: "#C9A84C", marginTop: 1 }}>✓</span>
                    <span style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Lato', sans-serif", fontSize: 14 }}>{f}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setPage("Studio")} style={{
                width: "100%", background: pkg.highlight ? "linear-gradient(135deg, #C9A84C, #E8C96A)" : "transparent",
                border: pkg.highlight ? "none" : "1px solid rgba(201,168,76,0.5)",
                color: pkg.highlight ? "#0A1410" : "#C9A84C",
                padding: "11px", fontFamily: "'Cormorant Garamond', serif", fontSize: 15,
                fontWeight: pkg.highlight ? 700 : 400, letterSpacing: "0.1em", cursor: "pointer", borderRadius: 2,
              }}>GET STARTED</button>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 64, padding: "40px", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 4, background: "rgba(27,67,50,0.1)" }}>
          <h3 style={{ color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: 28, margin: "0 0 12px" }}>Need something custom?</h3>
          <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Lato', sans-serif", fontSize: 15, margin: "0 0 24px" }}>
            Most of the best projects don't fit a neat box. Send a message and we'll figure out exactly what you need and what it costs.
          </p>
          <a href="https://wa.me/233547940650" style={{
            display: "inline-block", textDecoration: "none",
            background: "linear-gradient(135deg, #C9A84C, #E8C96A)", color: "#0A1410",
            padding: "14px 40px", fontFamily: "'Cormorant Garamond', serif",
            fontSize: 16, fontWeight: 700, letterSpacing: "0.1em", borderRadius: 2,
          }}>WHATSAPP US</a>
        </div>
      </section>
    </div>
  );
};

// ── STUDIO PAGE (Quote + Client Tracker) ─────────────────────────────────────
const Studio = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", budget: "", details: "" });
  const [submitted, setSubmitted] = useState(false);
  const [clients, setClients] = useState([
    { id: 1, name: "Sample Client A", service: "Brand Starter", status: "In Progress", note: "Logo draft sent" },
    { id: 2, name: "Sample Client B", service: "CV Writing", status: "Delivered", note: "Final sent via email" },
    { id: 3, name: "Sample Client C", service: "Web Design", status: "Brief Received", note: "Awaiting content" },
  ]);
  const [newClient, setNewClient] = useState({ name: "", service: "", status: "Brief Received", note: "" });
  const [showAdd, setShowAdd] = useState(false);

  const statuses = ["Brief Received", "In Progress", "Review", "Delivered"];
  const statusColors = {
    "Brief Received": "#4A90A4",
    "In Progress": "#C9A84C",
    "Review": "#8B6FCC",
    "Delivered": "#2D8A4E",
  };

  const handleSubmit = () => {
    if (!form.name || !form.service) return;
    const msg = `Hello Scribe Haus! I'd like to discuss a project.\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\nBudget: ${form.budget}\nDetails: ${form.details}`;
    window.open(`https://wa.me/233547940650?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
  };

  const addClient = () => {
    if (!newClient.name) return;
    setClients(c => [...c, { ...newClient, id: Date.now() }]);
    setNewClient({ name: "", service: "", status: "Brief Received", note: "" });
    setShowAdd(false);
  };

  const updateStatus = (id, status) => {
    setClients(c => c.map(cl => cl.id === id ? { ...cl, status } : cl));
  };

  return (
    <div style={{ paddingTop: 70, background: "transparent", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px clamp(16px,5vw,80px) 80px" }}>
        <p style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.25em", textAlign: "center" }}>THE STUDIO</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,60px)", color: "#fff", textAlign: "center", margin: "8px 0 16px" }}>Studio Tools</h1>
        <GoldLine />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: 56 }}>
          {/* Quote form */}
          <div style={{ background: "#0F2418", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 4, padding: "32px 28px" }}>
            <h2 style={{ color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: 28, margin: "0 0 6px" }}>Request a Quote</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Lato', sans-serif", fontSize: 13, marginBottom: 28 }}>We'll follow up via WhatsApp within 24 hours.</p>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <span style={{ fontSize: 48 }}>✓</span>
                <p style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif", fontSize: 22, margin: "16px 0 8px" }}>Your message is on its way.</p>
                <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Lato', sans-serif", fontSize: 14 }}>Check your WhatsApp. We'll be in touch soon.</p>
                <button onClick={() => setSubmitted(false)} style={{ marginTop: 20, background: "none", border: "1px solid rgba(201,168,76,0.4)", color: "#C9A84C", padding: "8px 20px", cursor: "pointer", fontFamily: "'Lato', sans-serif", fontSize: 13, borderRadius: 2 }}>Send another</button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { key: "name", label: "Your Name", ph: "What should I call you?" },
                  { key: "email", label: "Email", ph: "your@email.com" },
                  { key: "phone", label: "WhatsApp Number", ph: "+233 54 000 0000" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Lato', sans-serif", fontSize: 12, letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>{f.label}</label>
                    <input value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.ph} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 2, padding: "10px 14px", color: "#fff", fontFamily: "'Lato', sans-serif", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
                <div>
                  <label style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Lato', sans-serif", fontSize: 12, letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>Service Needed</label>
                  <select value={form.service} onChange={e => setForm(p => ({ ...p, service: e.target.value }))} style={{ width: "100%", background: "#0F2418", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 2, padding: "10px 14px", color: "#fff", fontFamily: "'Lato', sans-serif", fontSize: 14, outline: "none" }}>
                    <option value="">Select a service</option>
                    {["CV Writing", "Graphic Design", "Web Design", "Book Publishing", "Copywriting", "Branding", "Full Brand Package", "Other"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Lato', sans-serif", fontSize: 12, letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>Budget Range</label>
                  <select value={form.budget} onChange={e => setForm(p => ({ ...p, budget: e.target.value }))} style={{ width: "100%", background: "#0F2418", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 2, padding: "10px 14px", color: "#fff", fontFamily: "'Lato', sans-serif", fontSize: 14, outline: "none" }}>
                    <option value="">Select range</option>
                    {["Under GH₵100", "GH₵100-300", "GH₵300-600", "GH₵600-1000", "Over GH₵1000", "Let's discuss"].map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Lato', sans-serif", fontSize: 12, letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>Tell me about your project</label>
                  <textarea value={form.details} onChange={e => setForm(p => ({ ...p, details: e.target.value }))} placeholder="What do you need and when do you need it?" rows={4} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 2, padding: "10px 14px", color: "#fff", fontFamily: "'Lato', sans-serif", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                </div>
                <button onClick={handleSubmit} style={{
                  background: "linear-gradient(135deg, #C9A84C, #E8C96A)", border: "none", color: "#0A1410",
                  padding: "13px", fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 700,
                  letterSpacing: "0.1em", cursor: "pointer", borderRadius: 2, marginTop: 4,
                }}>SEND VIA WHATSAPP</button>
              </div>
            )}
          </div>

          {/* Client tracker */}
          <div style={{ background: "#0F2418", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 4, padding: "32px 28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h2 style={{ color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: 28, margin: "0 0 4px" }}>Client Tracker</h2>
                <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Lato', sans-serif", fontSize: 12, margin: 0 }}>Studio use only</p>
              </div>
              <button onClick={() => setShowAdd(s => !s)} style={{ background: "#C9A84C", border: "none", color: "#0A1410", padding: "8px 14px", fontFamily: "'Lato', sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", borderRadius: 2 }}>+ Add Client</button>
            </div>

            {showAdd && (
              <div style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 4, padding: "16px", marginBottom: 20 }}>
                {[
                  { key: "name", ph: "Client name" },
                  { key: "service", ph: "Service" },
                  { key: "note", ph: "Note" },
                ].map(f => (
                  <input key={f.key} value={newClient[f.key]} onChange={e => setNewClient(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.ph} style={{ display: "block", width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 2, padding: "8px 12px", color: "#fff", fontFamily: "'Lato', sans-serif", fontSize: 13, marginBottom: 8, outline: "none", boxSizing: "border-box" }} />
                ))}
                <select value={newClient.status} onChange={e => setNewClient(p => ({ ...p, status: e.target.value }))} style={{ width: "100%", background: "#0F2418", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 2, padding: "8px 12px", color: "#fff", fontFamily: "'Lato', sans-serif", fontSize: 13, marginBottom: 10, outline: "none" }}>
                  {statuses.map(s => <option key={s}>{s}</option>)}
                </select>
                <button onClick={addClient} style={{ background: "#C9A84C", border: "none", color: "#0A1410", padding: "8px 16px", fontFamily: "'Lato', sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", borderRadius: 2 }}>Add</button>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {clients.map(cl => (
                <div key={cl.id} style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, padding: "14px 16px", background: "rgba(255,255,255,0.02)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <div>
                      <p style={{ color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 600, margin: "0 0 2px" }}>{cl.name}</p>
                      <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Lato', sans-serif", fontSize: 12, margin: 0 }}>{cl.service}</p>
                    </div>
                    <select value={cl.status} onChange={e => updateStatus(cl.id, e.target.value)} style={{ background: statusColors[cl.status] + "22", border: "1px solid " + statusColors[cl.status], color: statusColors[cl.status], borderRadius: 2, padding: "4px 8px", fontFamily: "'Lato', sans-serif", fontSize: 11, cursor: "pointer", outline: "none" }}>
                      {statuses.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  {/* Status timeline */}
                  <div style={{ display: "flex", alignItems: "center", gap: 4, margin: "10px 0 6px" }}>
                    {statuses.map((s, i) => {
                      const active = statuses.indexOf(cl.status) >= i;
                      return (
                        <div key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", background: active ? statusColors[cl.status] : "rgba(255,255,255,0.15)", flexShrink: 0 }} />
                          {i < statuses.length - 1 && <div style={{ flex: 1, height: 1, background: active && statuses.indexOf(cl.status) > i ? statusColors[cl.status] : "rgba(255,255,255,0.1)" }} />}
                        </div>
                      );
                    })}
                  </div>
                  {cl.note && <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Lato', sans-serif", fontSize: 12, margin: "4px 0 0", fontStyle: "italic" }}>{cl.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── FOOTER ────────────────────────────────────────────────────────────────────
const Footer = ({ setPage }) => (
  <footer style={{ background: "#06100A", borderTop: "1px solid rgba(201,168,76,0.15)", padding: "48px clamp(16px,5vw,80px) 32px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <KenteDivider />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 40, marginTop: 40, marginBottom: 40 }}>
        <div>
          <img src={IMGS.logo_full} alt="Scribe Haus" style={{ height: 70, marginBottom: 12 }} />
          <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Lato', sans-serif", fontSize: 13, lineHeight: 1.7, margin: "0 0 16px" }}>Words, Design and Visual Stories.<br />Accra, Ghana · Est. 2023</p>
          <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Lato', sans-serif", fontSize: 12 }}>by Akosua Addae Buapim</p>
        </div>
        <div>
          <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Lato', sans-serif", fontSize: 12, letterSpacing: "0.15em", marginBottom: 14 }}>NAVIGATE</p>
          {NAV_LINKS.map(n => (
            <button key={n} onClick={() => setPage(n)} style={{ display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.45)", fontFamily: "'Lato', sans-serif", fontSize: 14, padding: "4px 0", cursor: "pointer", textAlign: "left" }}>{n}</button>
          ))}
        </div>
        <div>
          <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Lato', sans-serif", fontSize: 12, letterSpacing: "0.15em", marginBottom: 14 }}>CONTACT</p>
          {[
            { label: "WhatsApp / Call", val: "+233 54 794 0650" },
            { label: "Call only", val: "+233 50 541 5863" },
            { label: "Email", val: "scribehausdigital@gmail.com" },
          ].map(c => (
            <div key={c.label} style={{ marginBottom: 8 }}>
              <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Lato', sans-serif", fontSize: 11, margin: "0 0 2px" }}>{c.label}</p>
              <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Lato', sans-serif", fontSize: 13, margin: 0 }}>{c.val}</p>
            </div>
          ))}
        </div>
        <div>
          <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Lato', sans-serif", fontSize: 12, letterSpacing: "0.15em", marginBottom: 14 }}>FIND US</p>
          {[
            { label: "TikTok", val: "@scribehausstudio", url: "https://tiktok.com/@scribehausstudio" },
            { label: "Facebook", val: "Akosua Addae Buapim", url: "https://facebook.com" },
            { label: "Medium", val: "Built to Exclude series", url: "https://medium.com/@akosuaaddaebuapim" },
            { label: "Wattpad", val: "18K+ reads", url: "https://wattpad.com" },
          ].map(s => (
            <div key={s.label} style={{ marginBottom: 8 }}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Lato', sans-serif", fontSize: 11, margin: "0 0 1px" }}>{s.label}</p>
                <p style={{ color: "rgba(201,168,76,0.6)", fontFamily: "'Lato', sans-serif", fontSize: 13, margin: 0 }}>{s.val}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <p style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Lato', sans-serif", fontSize: 12, margin: 0 }}>© 2025 Scribe Haus. All rights reserved.</p>
        <p style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Lato', sans-serif", fontSize: 12, margin: 0 }}>scribehaus.art</p>
      </div>
    </div>
  </footer>
);

// ── AI CHAT WIDGET ────────────────────────────────────────────────────────────
// Note: this uses a small local FAQ engine instead of a live API call, since a
// static site deployed on Vercel has nowhere safe to hold an API key in the
// browser. If you want a real AI backed assistant later, this is the one part
// of the site that needs a tiny serverless function to hold the key safely.
// I'm happy to wire that up the moment you're ready, it's a quick add.
const FAQ_RESPONSES = [
  { keys: ["price", "cost", "how much", "rate"], reply: "CV work starts at GH₵80, web design from GH₵400, branding from GH₵250. Full pricing is on the Services page. Want me to send you straight there?" },
  { keys: ["cv", "resume"], reply: "We write CVs that actually get read. From GH₵80 for a full rewrite with cover letter. Delivered in 48 hours with two revision rounds included." },
  { keys: ["web", "website", "site"], reply: "Web design starts at GH₵400 for a single page site, mobile responsive with a contact form, delivered in about 5 days. Bigger packages available too." },
  { keys: ["book", "publish", "kdp", "amazon"], reply: "Book publishing support starts at GH₵150, covering cover design, interior layout and guidance through Amazon KDP." },
  { keys: ["contact", "reach", "whatsapp", "call", "phone"], reply: "WhatsApp or call +233 54 794 0650, or call only on +233 50 541 5863. Usually quick to reply." },
  { keys: ["logo", "brand", "identity"], reply: "Brand starter packages begin at GH₵250: logo design, colour palette, two variations and a usage guide." },
  { keys: ["time", "how long", "turnaround"], reply: "Most CV work is 48 hours. Web design is around 5 days. Bigger brand packages vary, we'll always give you a clear timeline upfront." },
  { keys: ["payment", "pay", "plan"], reply: "Yes, payment plans are available for bigger packages. Just mention it when you reach out." },
];

const AIChat = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role: "assistant", text: "Hi! I'm the Scribe Haus assistant. Ask me about pricing, services or turnaround times, or just WhatsApp us directly." }]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    const lower = userMsg.toLowerCase();
    setInput("");
    setMsgs(m => [...m, { role: "user", text: userMsg }]);

    const match = FAQ_RESPONSES.find(f => f.keys.some(k => lower.includes(k)));
    const reply = match ? match.reply : "I don't have a quick answer for that one. WhatsApp us at +233 54 794 0650 and Akosua will sort you out directly.";

    setTimeout(() => setMsgs(m => [...m, { role: "assistant", text: reply }]), 400);
  };

  return (
    <>
      {/* Chat window */}
      {open && (
        <div style={{ position: "fixed", bottom: 90, right: 20, width: 320, height: 420, background: "#0F2418", border: "1px solid rgba(201,168,76,0.4)", borderRadius: 8, zIndex: 999, display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(201,168,76,0.2)", background: "rgba(27,67,50,0.5)" }}>
            <p style={{ color: "#C9A84C", fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 600, margin: "0 0 2px" }}>Scribe Haus Assistant</p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Lato', sans-serif", fontSize: 11, margin: 0 }}>Powered by AI · Or WhatsApp us directly</p>
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: "14px 14px 8px" }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ marginBottom: 12, display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "80%", background: m.role === "user" ? "linear-gradient(135deg, #C9A84C, #E8C96A)" : "rgba(255,255,255,0.06)", borderRadius: 8, padding: "8px 12px" }}>
                  <p style={{ color: m.role === "user" ? "#0A1410" : "rgba(255,255,255,0.8)", fontFamily: "'Lato', sans-serif", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{m.text}</p>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div style={{ padding: "10px 12px 14px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask anything..." style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 4, padding: "8px 10px", color: "#fff", fontFamily: "'Lato', sans-serif", fontSize: 13, outline: "none" }} />
            <button onClick={send} style={{ background: "#C9A84C", border: "none", borderRadius: 4, padding: "8px 12px", cursor: "pointer", color: "#0A1410", fontWeight: 700, fontSize: 14 }}>→</button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button onClick={() => setOpen(o => !o)} style={{
        position: "fixed", bottom: 20, right: 20, width: 56, height: 56, borderRadius: "50%",
        background: "linear-gradient(135deg, #C9A84C, #E8C96A)", border: "none", cursor: "pointer",
        boxShadow: "0 4px 20px rgba(201,168,76,0.4)", zIndex: 1000, fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {open ? "✕" : "💬"}
      </button>
    </>
  );
};

// ── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const pages = {
    Home: <Home setPage={setPage} />,
    About: <About setPage={setPage} />,
    Work: <Work />,
    Books: <Books />,
    Services: <Services setPage={setPage} />,
    Studio: <Studio />,
  };

  return (
    <div style={{ background: "transparent", minHeight: "100vh", position: "relative" }}>
      <QuiltedBg />
      <Nav page={page} setPage={setPage} />
      <main style={{ position: "relative", zIndex: 1 }}>
        {pages[page] || pages.Home}
      </main>
      <Footer setPage={setPage} />
      <AIChat />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #0A1410; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A1410; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 4px; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
        @media (max-width: 600px) {
          [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2,1fr) !important; }
          [style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
