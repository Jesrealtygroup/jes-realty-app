import { useState, useEffect, useRef } from "react";

const COLORS = {
  onyx: "#1a1a1a",
  gold: "#C9A84C",
  goldLight: "#e2c97a",
  cream: "#F5F0E8",
  stone: "#8C8375",
  white: "#FFFFFF",
  offWhite: "#FAFAF7",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: ${COLORS.offWhite};
    color: ${COLORS.onyx};
    -webkit-font-smoothing: antialiased;
  }

  .serif { font-family: 'Cormorant Garamond', serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes lineGrow {
    from { width: 0; }
    to { width: 60px; }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }

  .fade-up { animation: fadeUp 0.7s ease forwards; }
  .fade-up-1 { animation: fadeUp 0.7s 0.1s ease both; }
  .fade-up-2 { animation: fadeUp 0.7s 0.25s ease both; }
  .fade-up-3 { animation: fadeUp 0.7s 0.4s ease both; }
  .fade-up-4 { animation: fadeUp 0.7s 0.55s ease both; }
  .fade-up-5 { animation: fadeUp 0.7s 0.7s ease both; }

  .nav-link {
    background: none;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${COLORS.onyx};
    cursor: pointer;
    padding: 6px 0;
    position: relative;
    transition: color 0.2s;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0; height: 1px;
    background: ${COLORS.gold};
    transition: width 0.3s ease;
  }
  .nav-link:hover::after, .nav-link.active::after { width: 100%; }
  .nav-link.active { color: ${COLORS.gold}; }

  .btn-primary {
    background: ${COLORS.onyx};
    color: ${COLORS.cream};
    border: none;
    padding: 14px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.25s;
    display: inline-block;
  }
  .btn-primary:hover {
    background: ${COLORS.gold};
    color: ${COLORS.onyx};
    transform: translateY(-1px);
  }

  .btn-outline {
    background: transparent;
    color: ${COLORS.onyx};
    border: 1px solid ${COLORS.onyx};
    padding: 13px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.25s;
    display: inline-block;
  }
  .btn-outline:hover {
    background: ${COLORS.onyx};
    color: ${COLORS.cream};
    transform: translateY(-1px);
  }

  .btn-gold {
    background: ${COLORS.gold};
    color: ${COLORS.onyx};
    border: none;
    padding: 14px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.25s;
    display: inline-block;
  }
  .btn-gold:hover {
    background: ${COLORS.goldLight};
    transform: translateY(-1px);
  }

  .section-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: ${COLORS.gold};
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }
  .section-label::before {
    content: '';
    display: inline-block;
    width: 40px;
    height: 1px;
    background: ${COLORS.gold};
  }

  .gold-line {
    width: 60px;
    height: 2px;
    background: ${COLORS.gold};
    margin: 20px 0;
    animation: lineGrow 0.8s 0.3s ease both;
  }

  .card {
    background: ${COLORS.white};
    border: 1px solid rgba(0,0,0,0.06);
    padding: 36px;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
  }
  .card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 3px; height: 0;
    background: ${COLORS.gold};
    transition: height 0.3s;
  }
  .card:hover::before { height: 100%; }
  .card:hover {
    box-shadow: 0 12px 40px rgba(0,0,0,0.08);
    transform: translateY(-2px);
  }

  .construction-card {
    background: ${COLORS.white};
    border: 1px solid rgba(0,0,0,0.06);
    overflow: hidden;
    transition: all 0.3s;
  }
  .construction-card:hover {
    box-shadow: 0 16px 48px rgba(0,0,0,0.1);
    transform: translateY(-3px);
  }

  .pill {
    display: inline-block;
    background: rgba(201,168,76,0.12);
    color: ${COLORS.gold};
    border: 1px solid rgba(201,168,76,0.3);
    padding: 4px 14px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border-radius: 100px;
  }

  .input-field {
    width: 100%;
    border: 1px solid rgba(0,0,0,0.15);
    border-bottom: 2px solid ${COLORS.onyx};
    background: transparent;
    padding: 14px 0;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    color: ${COLORS.onyx};
    outline: none;
    transition: border-color 0.2s;
  }
  .input-field:focus { border-bottom-color: ${COLORS.gold}; }
  .input-field::placeholder { color: ${COLORS.stone}; }

  .quiz-option {
    border: 1px solid rgba(0,0,0,0.1);
    background: ${COLORS.white};
    padding: 16px 22px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: ${COLORS.onyx};
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .quiz-option:hover {
    border-color: ${COLORS.gold};
    background: rgba(201,168,76,0.05);
  }
  .quiz-option.selected {
    border-color: ${COLORS.gold};
    background: rgba(201,168,76,0.08);
    color: ${COLORS.onyx};
  }
  .quiz-option.selected .option-dot {
    background: ${COLORS.gold};
    border-color: ${COLORS.gold};
  }

  .option-dot {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid rgba(0,0,0,0.2);
    flex-shrink: 0;
    transition: all 0.2s;
  }

  .progress-bar {
    height: 2px;
    background: rgba(0,0,0,0.08);
    border-radius: 2px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: ${COLORS.gold};
    transition: width 0.4s ease;
  }

  .resource-item {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    padding: 28px 0;
    border-bottom: 1px solid rgba(0,0,0,0.06);
  }
  .resource-item:last-child { border-bottom: none; }

  .resource-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 42px;
    font-weight: 300;
    color: rgba(201,168,76,0.3);
    line-height: 1;
    min-width: 52px;
  }

  .stat-block {
    border-left: 3px solid ${COLORS.gold};
    padding-left: 20px;
  }

  .testimonial-card {
    background: ${COLORS.onyx};
    color: ${COLORS.cream};
    padding: 40px;
  }

  @media (max-width: 768px) {
    .hero-grid { flex-direction: column !important; }
    .three-col { flex-direction: column !important; }
    .two-col { flex-direction: column !important; }
    .nav-links { display: none; }
  }
`;

// ======= NAV =======
function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { id: "home", label: "Home" },
    { id: "quiz", label: "Start Here" },
    { id: "new-construction", label: "New Construction" },
    { id: "resources", label: "Resources" },
    { id: "consultation", label: "Consultation" },
    { id: "work-with-me", label: "Work With Me" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(250,250,247,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid rgba(0,0,0,0.06)` : "none",
      transition: "all 0.3s",
      padding: "0 40px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, letterSpacing: "0.05em", color: COLORS.onyx, lineHeight: 1 }}>
              Jessica
            </span>
            <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.gold }}>
              Metro Atlanta Real Estate
            </span>
          </div>
        </button>
        <div className="nav-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {links.slice(1, 5).map(l => (
            <button key={l.id} className={`nav-link ${page === l.id ? "active" : ""}`} onClick={() => setPage(l.id)}>
              {l.label}
            </button>
          ))}
        </div>
        <button className="btn-primary" onClick={() => setPage("consultation")} style={{ padding: "10px 24px", fontSize: 11 }}>
          Book a Consultation
        </button>
      </div>
    </nav>
  );
}

// ======= AUTHORITY STRIP WITH TICKER =======
function TickerNumber({ target, prefix = "", suffix = "" }) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let count = 0;
    const timer = setInterval(() => {
      count++;
      current = Math.min(current + increment, target);
      setDisplay(Math.floor(current));
      if (count >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  const formatted = display.toLocaleString("en-US");
  return (
    <span ref={ref} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 600, color: COLORS.onyx, letterSpacing: "-0.01em" }}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

function AuthorityStrip() {
  return (
    <section style={{ background: COLORS.gold, padding: "32px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 28 }}>
        {/* Ticker stat */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ position: "relative" }}>
            <TickerNumber target={58324} prefix="$" />
            <span style={{
              position: "absolute", top: -8, right: -16,
              fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
              color: COLORS.onyx, opacity: 0.5, textTransform: "uppercase",
            }}>and counting</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 400, color: "rgba(26,26,26,0.65)", maxWidth: 180, lineHeight: 1.4 }}>
            Saved in closing costs for clients in 2026
          </span>
        </div>
        <div style={{ width: 1, height: 40, background: "rgba(26,26,26,0.15)", flexShrink: 0 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: COLORS.onyx }}>New Construction</span>
          <span style={{ fontSize: 13, fontWeight: 400, color: "rgba(26,26,26,0.65)", maxWidth: 180, lineHeight: 1.4 }}>Specialized expertise across Metro Atlanta</span>
        </div>
        <div style={{ width: 1, height: 40, background: "rgba(26,26,26,0.15)", flexShrink: 0 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: COLORS.onyx }}>10+ Counties</span>
          <span style={{ fontSize: 13, fontWeight: 400, color: "rgba(26,26,26,0.65)", maxWidth: 180, lineHeight: 1.4 }}>Henry, Gwinnett, Cobb, DeKalb & more</span>
        </div>
      </div>
    </section>
  );
}

// ======= HOME =======
function Home({ setPage }) {
  return (
    <div>
      {/* Hero */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        background: `linear-gradient(135deg, ${COLORS.onyx} 0%, #2a2a2a 100%)`,
        position: "relative", overflow: "hidden", paddingTop: 72,
      }}>
        {/* Decorative */}
        <div style={{
          position: "absolute", top: "10%", right: "-5%",
          width: 500, height: 500, borderRadius: "50%",
          background: `radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "5%", left: "0%",
          width: 300, height: 300, borderRadius: "50%",
          background: `radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        {/* Gold corner accent */}
        <div style={{
          position: "absolute", top: 100, right: 80,
          width: 1, height: 200, background: `linear-gradient(to bottom, transparent, ${COLORS.gold}, transparent)`,
          opacity: 0.4,
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px", width: "100%" }}>
          <div className="fade-up-1">
            <span className="section-label">Metro Atlanta Real Estate</span>
          </div>
          <h1 className="fade-up-2 serif" style={{
            fontSize: "clamp(52px, 8vw, 96px)", fontWeight: 300, lineHeight: 1.05,
            color: COLORS.cream, letterSpacing: "-0.01em", marginBottom: 28, maxWidth: 750,
          }}>
            Buying in Metro Atlanta<br />
            <span style={{ color: COLORS.gold, fontStyle: "italic" }}>starts here.</span>
          </h1>
          <p className="fade-up-3" style={{
            fontSize: 18, fontWeight: 300, lineHeight: 1.7,
            color: "rgba(245,240,232,0.7)", maxWidth: 540, marginBottom: 48,
          }}>
            A refined approach to homebuying, with expert guidance, strategic negotiation, and access to the right opportunities.
          </p>
          <div className="fade-up-4" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button className="btn-gold" onClick={() => setPage("quiz")}>Start Your Buying Plan</button>
            <button className="btn-outline" style={{ color: COLORS.cream, borderColor: "rgba(245,240,232,0.3)" }} onClick={() => setPage("new-construction")}>
              Explore New Construction
            </button>
            <button className="btn-outline" style={{ color: COLORS.cream, borderColor: "rgba(245,240,232,0.3)" }} onClick={() => setPage("consultation")}>
              Book a Private Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Authority Strip */}
      <AuthorityStrip />

      {/* Intro */}
      <section style={{ padding: "100px 40px", background: COLORS.offWhite }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <span className="section-label" style={{ justifyContent: "center" }}>My Story</span>
          <h2 className="serif" style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 300, lineHeight: 1.2, marginBottom: 32 }}>
            I purchased my first home at 22.<br />
            <span style={{ fontStyle: "italic", color: COLORS.stone }}>And I have not stopped since.</span>
          </h2>
          <div style={{ width: 60, height: 2, background: COLORS.gold, margin: "0 auto 40px" }} />
          <p style={{ fontSize: 18, lineHeight: 1.85, color: COLORS.stone, fontWeight: 300, maxWidth: 680, margin: "0 auto 20px" }}>
            Since then, I have bought and sold multiple properties personally, and I have helped clients navigate one of the most important financial decisions they will ever make, with clarity and confidence.
          </p>
          <p style={{ fontSize: 20, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: COLORS.onyx, fontWeight: 400 }}>
            "This isn't guesswork. It's strategy."
          </p>
          <div style={{ marginTop: 48, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => setPage("work-with-me")}>Learn More About Me</button>
            <button className="btn-outline" onClick={() => setPage("quiz")}>Find Out Where You Stand</button>
          </div>
        </div>
      </section>

      {/* What I Specialize In */}
      <section style={{ padding: "80px 40px", background: COLORS.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span className="section-label">What I Do Best</span>
          <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {[
              { title: "New Construction", body: "Builder incentives, rate buy-downs, and flex cash options. I know how to work the system in your favor.", icon: "◈" },
              { title: "First-Time Buyers", body: "No judgment. No overwhelm. Just a clear, step-by-step process built around where you are right now.", icon: "◇" },
              { title: "Move-Up Buyers", body: "Ready to level up? Let's talk strategy about timing, equity, and what your next chapter looks like.", icon: "◉" },
              { title: "Closing Cost Savings", body: "My clients average $12,000 in closing cost contributions. That is not luck. That is preparation and negotiation.", icon: "◎" },
            ].map((s, i) => (
              <div key={i} className="card" style={{ flex: "1 1 220px" }}>
                <div style={{ fontSize: 28, marginBottom: 16, color: COLORS.gold }}>{s.icon}</div>
                <h3 className="serif" style={{ fontSize: 24, fontWeight: 400, marginBottom: 12 }}>{s.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: COLORS.stone }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "80px 40px", background: COLORS.cream }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <span className="section-label">Client Words</span>
          <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, marginBottom: 48, lineHeight: 1.2 }}>
            Do not take my word for it.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Jasmine W — lead review, front and center */}
            <div className="testimonial-card">
              <div style={{ fontSize: 60, color: COLORS.gold, fontFamily: "Georgia, serif", lineHeight: 1, marginBottom: 24, opacity: 0.5 }}>"</div>
              <p className="serif" style={{ fontSize: 22, fontWeight: 300, lineHeight: 1.7, color: COLORS.cream, fontStyle: "italic", marginBottom: 32 }}>
                It was truly a blessing and pleasure to have Jessica by my side. Not only did she give me options of homes to go see, but she also educated me on home ownership, advocating on my behalf, getting me more money and incentives, having the builders pay to break my lease, answering my late texts and calls, and making sure I could get everything on my wish list. Jessica is very patient and she always would ask me if there was anything I needed or how she could make the situation better. She made my first time home buyer experience great. Jess is the Best!
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: COLORS.onyx, fontWeight: 600 }}>J</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: COLORS.cream }}>Jasmine W.</div>
                  <div style={{ fontSize: 12, color: COLORS.stone }}>First-Time Buyer ★★★★★</div>
                </div>
              </div>
            </div>

            {/* Two column reviews */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 24 }}>
              <div className="testimonial-card">
                <div style={{ fontSize: 48, color: COLORS.gold, fontFamily: "Georgia, serif", lineHeight: 1, marginBottom: 20, opacity: 0.5 }}>"</div>
                <p className="serif" style={{ fontSize: 18, fontWeight: 300, lineHeight: 1.7, color: COLORS.cream, fontStyle: "italic", marginBottom: 28 }}>
                  Recently closed with Jessica and she made the entire experience seamless from the start. Her communication and professionalism stood out from the beginning. From the first conversation, I knew that Jessica was serious about her craft. I never had to worry about her dropping the ball in any way and I look forward to working with her again.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: COLORS.onyx, fontWeight: 600 }}>D</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.cream }}>Devin</div>
                    <div style={{ fontSize: 11, color: COLORS.stone }}>Buyer ★★★★★</div>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div style={{ fontSize: 48, color: COLORS.gold, fontFamily: "Georgia, serif", lineHeight: 1, marginBottom: 20, opacity: 0.5 }}>"</div>
                <p className="serif" style={{ fontSize: 18, fontWeight: 300, lineHeight: 1.7, color: COLORS.cream, fontStyle: "italic", marginBottom: 28 }}>
                  Jess is amazing. Always open and honest. Comes up with solutions to any problems. Always keeps it real and never lets you make a decision she would not do herself. Professional, attentive, and honest. She listened to our needs and got us our first home purchase. Highly recommend!
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: COLORS.onyx, fontWeight: 600 }}>B</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.cream }}>Brittany A.</div>
                    <div style={{ fontSize: 11, color: COLORS.stone }}>First-Time Buyer ★★★★★</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alexis H */}
            <div className="testimonial-card">
              <div style={{ fontSize: 60, color: COLORS.gold, fontFamily: "Georgia, serif", lineHeight: 1, marginBottom: 24, opacity: 0.5 }}>"</div>
              <p className="serif" style={{ fontSize: 22, fontWeight: 300, lineHeight: 1.7, color: COLORS.cream, fontStyle: "italic", marginBottom: 32 }}>
                I cannot recommend Jessica enough as a real estate agent. From start to finish, she was incredibly professional, knowledgeable, and attentive to every detail. Jessica truly understood my needs and went above and beyond to find me the perfect home. Her expertise in the market, combined with her genuine care for her clients, made the entire process smooth and stress-free. She was always available to answer questions, provide guidance, and ensure that I was comfortable every step of the way. If you are looking for a real estate agent who will work tirelessly for you, Jessica is the one.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: COLORS.onyx, fontWeight: 600 }}>A</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: COLORS.cream }}>Alexis H.</div>
                  <div style={{ fontSize: 12, color: COLORS.stone }}>Buyer ★★★★★</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: "80px 40px", background: COLORS.onyx, textAlign: "center" }}>
        <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300, color: COLORS.cream, marginBottom: 16 }}>
          Ready to map out your next move?
        </h2>
        <p style={{ color: "rgba(245,240,232,0.6)", fontSize: 16, marginBottom: 40 }}>Answer a few questions and get a tailored homebuying plan.</p>
        <button className="btn-gold" onClick={() => setPage("quiz")} style={{ fontSize: 14, padding: "16px 48px" }}>
          Start Your Buying Plan
        </button>
      </section>
    </div>
  );
}

// ======= QUIZ =======
// Answer keys for soft redirect logic
const LOW_CREDIT = ["619 and below", "580 to 619", "Below 580"];
const NOT_READY_TIMELINE = ["Just exploring", "12+ months out"];

const quizQuestions = [
  {
    key: "timeline",
    q: "How soon are you looking to purchase?",
    subtitle: "This helps me understand what stage you are at so I can point you in the right direction.",
    options: ["Within the next 30 days", "1 to 3 months", "3 to 6 months", "6 to 12 months", "12+ months out", "Just exploring"],
  },
  {
    key: "credit",
    q: "What is your estimated credit score range?",
    subtitle: "No judgment here. This just helps me know which doors are open for you right now.",
    options: ["700 and above", "660 to 699", "620 to 659", "580 to 619", "Below 580", "Not sure yet"],
  },
  {
    key: "preapproval",
    q: "Have you spoken with a lender or started the pre-approval process?",
    subtitle: "You do not need to be pre-approved to talk to me, but knowing where you are helps.",
    options: ["Yes, I am pre-approved", "I have talked to a lender but no approval yet", "Not yet, but I am ready to", "Not yet, I want to understand the process first"],
  },
  {
    key: "situation",
    q: "What is your current living situation?",
    subtitle: null,
    options: ["Renting and ready to stop", "Living with family and saving", "Currently own and looking to move up", "Other"],
  },
  {
    key: "budget",
    q: "What price range are you working with?",
    subtitle: "New construction in Metro Atlanta typically runs $325K to $450K. This helps me match you to the right communities.",
    options: ["Under $300,000", "$300,000 to $375,000", "$375,000 to $450,000", "$450,000 to $550,000", "$550,000+", "I am not sure yet"],
  },
  {
    key: "type",
    q: "Are you leaning toward new construction or a resale home?",
    subtitle: null,
    options: ["New construction — I want modern and move-in ready", "Resale — I want established neighborhoods", "Open to both, show me my options", "I honestly have no idea yet"],
  },
  {
    key: "agent",
    q: "Are you currently working with a real estate agent?",
    subtitle: "No wrong answer. I just want to know where you are in the process.",
    options: ["No, I am looking for the right one", "I have talked to a few but nothing official", "Yes, but I am open to exploring my options", "Yes and I am committed to them"],
  },
];

// Determine if lead needs soft redirect based on credit + timeline
function isNotReadyLead(answers) {
  const credit = answers["credit"] || "";
  const timeline = answers["timeline"] || "";
  const creditNotReady = credit === "Below 580" || credit === "580 to 619";
  const timelineNotReady = timeline === "Just exploring" || timeline === "12+ months out";
  return creditNotReady || timelineNotReady;
}

function Quiz({ setPage }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showCapture, setShowCapture] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const current = quizQuestions[step];
  const totalSteps = quizQuestions.length;
  const isLast = step === totalSteps - 1;
  const currentAnswer = answers[current.key];

  const select = (opt) => setAnswers({ ...answers, [current.key]: opt });

  const next = () => {
    if (!currentAnswer) return;
    if (isLast) { setShowCapture(true); return; }
    setStep(step + 1);
  };

  const FORM_ACTION = "https://script.google.com/macros/s/AKfycbz8eqlsuaEr3vRP5-uYwvu0bfCLwrjFNN3jIlol3Yp4UCMKanNPMmKBpkWVkCUKPPDK/exec";

  const submitToGoogle = (formData, quizAnswers) => {
    const params = new URLSearchParams({
      name:        formData.name,
      email:       formData.email,
      phone:       formData.phone || "",
      timeline:    quizAnswers.timeline || "",
      credit:      quizAnswers.credit || "",
      preapproval: quizAnswers.preapproval || "",
      situation:   quizAnswers.situation || "",
      budget:      quizAnswers.budget || "",
      type:        quizAnswers.type || "",
      agent:       quizAnswers.agent || "",
    });
    fetch(`${FORM_ACTION}?${params.toString()}`, {
      method: "POST",
      mode: "no-cors",
    }).catch(() => {});
  };

  const submit = () => {
    if (!form.name || !form.email) return;
    submitToGoogle(form, answers);
    setSubmitted(true);
  };

  const notReady = isNotReadyLead(answers);
  const firstName = form.name.split(" ")[0];

  // ---- CONFIRMATION SCREENS ----
  if (submitted) {
    if (notReady) {
      // Soft redirect — captured but different messaging
      return (
        <div style={{ minHeight: "100vh", background: COLORS.offWhite, display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 40px 80px", flexDirection: "column", textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(201,168,76,0.12)", border: `2px solid ${COLORS.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 32 }}>✓</div>
          <h2 className="serif" style={{ fontSize: 44, fontWeight: 300, color: COLORS.onyx, marginBottom: 16, lineHeight: 1.2 }}>
            {firstName}, you are in the right place.
          </h2>
          <div style={{ width: 48, height: 2, background: COLORS.gold, margin: "0 auto 28px" }} />
          <p style={{ color: COLORS.stone, fontSize: 17, maxWidth: 520, lineHeight: 1.8, marginBottom: 12 }}>
            Based on where you are right now, the best next step is getting your foundation in place before you start touring homes. That is not a setback. That is strategy.
          </p>
          <p style={{ color: COLORS.stone, fontSize: 15, maxWidth: 480, lineHeight: 1.75, marginBottom: 40 }}>
            I am sending your plan to <strong style={{ color: COLORS.onyx }}>{form.email}</strong> with specific steps to get your credit and timeline positioned for success. Most people who do this work are in a completely different place within 90 to 180 days.
          </p>
          <div style={{ background: COLORS.cream, padding: "28px 36px", maxWidth: 480, width: "100%", marginBottom: 40, textAlign: "left" }}>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.gold, marginBottom: 16 }}>Your next steps</div>
            {[
              "Check your email — your personalized prep plan is on its way",
              "Connect with my preferred lender for a free credit review",
              "Start tracking your progress — most buyers are ready in 3 to 6 months",
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
                <span style={{ color: COLORS.gold, fontWeight: 600, flexShrink: 0 }}>{i + 1}.</span>
                <span style={{ fontSize: 14, color: COLORS.stone, lineHeight: 1.6 }}>{s}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: COLORS.stone, marginBottom: 24 }}>Still want to have a quick conversation? I am always happy to talk.</p>
          <button className="btn-outline" onClick={() => setPage("consultation")}>Book a Free Consultation Anyway</button>
        </div>
      );
    }

    // Ready lead — push to book
    return (
      <div style={{ minHeight: "100vh", background: COLORS.onyx, display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 40px 80px", flexDirection: "column", textAlign: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(201,168,76,0.15)", border: `2px solid ${COLORS.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 32 }}>✓</div>
        <h2 className="serif" style={{ fontSize: 48, fontWeight: 300, color: COLORS.cream, marginBottom: 16, lineHeight: 1.15 }}>
          {firstName}, your plan is on its way.
        </h2>
        <div style={{ width: 48, height: 2, background: COLORS.gold, margin: "0 auto 28px" }} />
        <p style={{ color: "rgba(245,240,232,0.65)", fontSize: 17, maxWidth: 480, lineHeight: 1.75, marginBottom: 12 }}>
          Check <strong style={{ color: COLORS.gold }}>{form.email}</strong> for your personalized homebuying plan.
        </p>
        <p style={{ color: "rgba(245,240,232,0.45)", fontSize: 15, maxWidth: 440, lineHeight: 1.7, marginBottom: 48 }}>
          Based on your answers, you are in a strong position to move forward. The next step is a 20-minute strategy call so we can map out your specific path.
        </p>
        <button className="btn-gold" style={{ fontSize: 14, padding: "16px 48px", marginBottom: 16 }} onClick={() => setPage("consultation")}>
          Schedule Your Strategy Call
        </button>
        <p style={{ fontSize: 12, color: "rgba(245,240,232,0.3)" }}>20 minutes. No pressure. Just clarity.</p>
      </div>
    );
  }

  // ---- LEAD CAPTURE ----
  if (showCapture) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.offWhite, padding: "120px 40px 80px" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <span className="section-label">Almost There</span>
          <h2 className="serif" style={{ fontSize: 44, fontWeight: 300, marginBottom: 12, lineHeight: 1.2 }}>
            I have reviewed your answers.<br />
            <span style={{ fontStyle: "italic", color: COLORS.stone }}>Here is what comes next.</span>
          </h2>
          <div className="gold-line" />
          <p style={{ color: COLORS.stone, fontSize: 16, marginBottom: 48, lineHeight: 1.7 }}>
            Enter your info below and I will send your personalized homebuying plan straight to your inbox.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {[
              { key: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
              { key: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
              { key: "phone", label: "Phone Number", type: "tel", placeholder: "(404) 000-0000", optional: true },
            ].map((field) => (
              <div key={field.key}>
                <label style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.stone, display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  {field.label}
                  {field.optional && <span style={{ fontWeight: 300, letterSpacing: 0, textTransform: "none", fontSize: 11 }}>optional</span>}
                </label>
                <input
                  className="input-field"
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                />
              </div>
            ))}
            <div>
              <button
                className="btn-primary"
                onClick={submit}
                style={{ width: "100%", padding: "17px", fontSize: 13, opacity: form.name && form.email ? 1 : 0.4 }}
              >
                Send My Plan
              </button>
              <p style={{ fontSize: 11, color: COLORS.stone, marginTop: 12, lineHeight: 1.6 }}>
                Your info stays with me. No spam, no third-party lists.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---- QUIZ QUESTIONS ----
  return (
    <div style={{ minHeight: "100vh", background: COLORS.offWhite, paddingTop: 72 }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "80px 40px" }}>
        {/* Progress */}
        <div style={{ marginBottom: 52 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.stone }}>
              Question {step + 1} of {totalSteps}
            </span>
            <span style={{ fontSize: 11, fontWeight: 500, color: COLORS.gold }}>
              {Math.round((step / totalSteps) * 100)}% complete
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(step / totalSteps) * 100}%` }} />
          </div>
        </div>

        <span className="section-label">Let's Map Out Your Next Move</span>
        <h2 className="serif" style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 300, marginBottom: current.subtitle ? 12 : 36, lineHeight: 1.25 }}>
          {current.q}
        </h2>
        {current.subtitle && (
          <p style={{ fontSize: 14, color: COLORS.stone, lineHeight: 1.7, marginBottom: 32, maxWidth: 520 }}>
            {current.subtitle}
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 44 }}>
          {current.options.map((opt) => (
            <button
              key={opt}
              className={`quiz-option ${currentAnswer === opt ? "selected" : ""}`}
              onClick={() => select(opt)}
            >
              <span className="option-dot" />
              {opt}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {step > 0 && (
            <button className="btn-outline" onClick={() => setStep(step - 1)}>Back</button>
          )}
          <button
            className="btn-primary"
            onClick={next}
            style={{ flex: 1, opacity: currentAnswer ? 1 : 0.35, cursor: currentAnswer ? "pointer" : "not-allowed" }}
          >
            {isLast ? "See My Plan" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ======= NEW CONSTRUCTION =======
// Last updated: April 2026 | Sources: builder websites verified
const communities = [
  {
    county: "Cobb County",
    city: "Smyrna area",
    type: "Townhomes",
    builder: "Toll Brothers",
    price: "$499,000",
    priceMax: "$599,000",
    beds: "3",
    baths: "3.5",
    sqft: "1,919 to 2,162",
    highlights: [
      "3-story modern townhomes with 2-car garage",
      "1 mile from Truist Park and The Battery Atlanta",
      "Designer-appointed finishes throughout",
      "Resort-style pool and cabana on site",
      "Flex space ideal for home office",
    ],
    incentives: [
      "7 quick move-in homes available now",
      "Toll Brothers mortgage financing available",
      "Designer appointed features already included",
      "Contact me before visiting — builder registration matters",
    ],
    tag: "Luxury Townhomes",
    tagColor: COLORS.gold,
  },
  {
    county: "Multiple Counties",
    city: "Henry, Paulding & Bartow areas",
    type: "Single Family",
    builder: "Smith Douglas Homes",
    price: "$300,000",
    priceMax: "$399,900",
    beds: "3 to 5",
    baths: "2 to 3.5",
    sqft: "1,137 to 2,372",
    highlights: [
      "31 active communities across Metro Atlanta",
      "96% of buyers would recommend Smith Douglas",
      "Multiple floor plans per community",
      "1 to 2 car garages on most plans",
      "Great value at every price point",
    ],
    incentives: [
      "3.99% FHA 5/1 ARM — Dream It Achieve It promo",
      "Best value positioning in their markets",
      "Ask me about current community-specific incentives",
      "Limited-time rate available on select homes",
    ],
    tag: "Best Value",
    tagColor: "#5a8a5a",
  },
  {
    county: "Multiple Counties",
    city: "Covington, Loganville, Stockbridge areas",
    type: "Single Family",
    builder: "D.R. Horton",
    price: "$310,000",
    priceMax: "$499,900",
    beds: "3 to 5",
    baths: "2 to 3.5",
    sqft: "1,500 to 3,000",
    highlights: [
      "29 active communities in Metro Atlanta",
      "Smart home technology standard on every home",
      "Quick move-in homes available across communities",
      "FHA, VA, and conventional financing eligible",
      "America's largest builder — proven track record",
    ],
    incentives: [
      "Closing cost contributions on select homes",
      "Rate buy-down options through DHI Mortgage",
      "Quick move-in inventory available now",
      "Register with me before your first model home visit",
    ],
    tag: "Quick Move-In",
    tagColor: COLORS.stone,
  },
  {
    county: "Multiple Counties",
    city: "Douglasville, Buford, Canton, Doraville areas",
    type: "Single Family & Townhomes",
    builder: "Lennar",
    price: "$339,910",
    priceMax: "$599,000",
    beds: "3 to 6",
    baths: "2 to 4",
    sqft: "1,500 to 4,202",
    highlights: [
      "17 active communities in Metro Atlanta",
      "Everything's Included — appliances, smart home, blinds",
      "Pool, clubhouse, and pickleball in select communities",
      "Townhomes include exterior maintenance in HOA",
      "Near top-ranked Seckinger High School in Buford",
    ],
    incentives: [
      "Everything's Included package — no nickel and diming",
      "Current rate promotions — ask me what's active today",
      "HOA covers exterior maintenance on townhomes",
      "Preferred lender incentives available on select homes",
    ],
    tag: "Everything Included",
    tagColor: "#7a6aaa",
  },
  {
    county: "Bartow & Walton Counties",
    city: "Euharlee & Loganville areas",
    type: "Single Family",
    builder: "Taylor Morrison",
    price: "$349,000",
    priceMax: "$599,000",
    beds: "3 to 5",
    baths: "2 to 4",
    sqft: "1,772 to 2,696",
    highlights: [
      "Named America's Most Trusted Home Builder 2025",
      "Heritage River — 300 homes from the mid $300s",
      "Windance Lake — 111 homes from the low $400s",
      "Pond, pool, cabana, and butterfly garden amenities",
      "Multiple floor plan options per community",
    ],
    incentives: [
      "No closing costs on select move-in ready homes",
      "Half-off basements on select plans",
      "Model homes available to tour now",
      "Contact me to confirm current incentive window",
    ],
    tag: "Most Trusted",
    tagColor: COLORS.gold,
  },
];

function CommunityCard({ c, onRequest }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      style={{ position: "relative", minHeight: 480, cursor: "pointer" }}
      onMouseLeave={() => setFlipped(false)}
    >
      {/* Front */}
      <div className="construction-card" style={{
        position: "absolute", inset: 0,
        opacity: flipped ? 0 : 1,
        transition: "opacity 0.25s ease",
        pointerEvents: flipped ? "none" : "auto",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ height: 8, background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldLight})` }} />
        <div style={{ padding: 32, flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 8 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: COLORS.stone, marginBottom: 3 }}>
                {c.city}
              </div>
              <div style={{ fontSize: 10, fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: COLORS.stone, marginBottom: 10, opacity: 0.7 }}>
                {c.county} · {c.type}
              </div>
              <div className="serif" style={{ fontSize: 30, fontWeight: 400, color: COLORS.onyx, lineHeight: 1 }}>
                {c.price}
              </div>
              <div style={{ fontSize: 11, color: COLORS.stone, marginTop: 2 }}>to {c.priceMax}</div>
            </div>
            <span style={{
              display: "inline-block", padding: "5px 12px",
              background: `${c.tagColor}18`,
              border: `1px solid ${c.tagColor}40`,
              color: c.tagColor,
              fontSize: 10, fontWeight: 600, letterSpacing: "0.12em",
              textTransform: "uppercase", borderRadius: 100,
              whiteSpace: "nowrap",
            }}>{c.tag}</span>
          </div>

          {/* Specs row */}
          <div style={{ display: "flex", gap: 16, marginBottom: 20, paddingBottom: 20, borderBottom: `1px solid rgba(0,0,0,0.06)` }}>
            {[
              { label: "Beds", value: c.beds },
              { label: "Baths", value: c.baths },
              { label: "Sq Ft", value: c.sqft },
            ].map((spec, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center", padding: "10px 8px", background: COLORS.offWhite }}>
                <div className="serif" style={{ fontSize: 18, fontWeight: 400, color: COLORS.onyx }}>{spec.value}</div>
                <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.stone, marginTop: 2 }}>{spec.label}</div>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div style={{ marginBottom: 20, flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: COLORS.stone, marginBottom: 10 }}>Highlights</div>
            {c.highlights.map((h, j) => (
              <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: COLORS.gold, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: COLORS.stone, lineHeight: 1.5 }}>{h}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 8 }}>
            <button
              className="btn-primary"
              style={{ flex: 1, fontSize: 12, padding: "13px 16px" }}
              onClick={onRequest}
            >
              Get Full Details
            </button>
            <button
              style={{
                border: `1px solid rgba(0,0,0,0.12)`, background: "transparent",
                padding: "13px 16px", cursor: "pointer", fontSize: 12,
                fontFamily: "'DM Sans', sans-serif", color: COLORS.stone,
                transition: "all 0.2s", whiteSpace: "nowrap",
              }}
              onClick={() => setFlipped(true)}
              onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.gold; e.currentTarget.style.color = COLORS.gold; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)"; e.currentTarget.style.color = COLORS.stone; }}
            >
              Incentives
            </button>
          </div>
        </div>
      </div>

      {/* Back — incentives panel */}
      <div className="construction-card" style={{
        position: "absolute", inset: 0,
        opacity: flipped ? 1 : 0,
        transition: "opacity 0.25s ease",
        pointerEvents: flipped ? "auto" : "none",
        display: "flex", flexDirection: "column",
        background: COLORS.onyx,
      }}>
        <div style={{ height: 8, background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldLight})` }} />
        <div style={{ padding: 32, flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: COLORS.gold, marginBottom: 4 }}>{c.city}</div>
          <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,240,232,0.5)", marginBottom: 24 }}>{c.county} · {c.type}</div>

          <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.gold, marginBottom: 16 }}>Current Incentives Available</div>
          <div style={{ flex: 1 }}>
            {c.incentives.map((inc, j) => (
              <div key={j} style={{
                display: "flex", alignItems: "flex-start", gap: 14,
                padding: "16px 0",
                borderBottom: j < c.incentives.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}>
                <span style={{ color: COLORS.gold, fontSize: 18, lineHeight: 1, flexShrink: 0, marginTop: 1 }}>+</span>
                <span style={{ fontSize: 14, color: "rgba(245,240,232,0.8)", lineHeight: 1.6 }}>{inc}</span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 12, color: "rgba(245,240,232,0.35)", lineHeight: 1.6, marginBottom: 20, marginTop: 20 }}>
            Incentives change weekly. Contact me before you visit any model home so I can confirm what is on the table today.
          </p>

          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn-gold" style={{ flex: 1, fontSize: 12, padding: "13px 16px" }} onClick={onRequest}>
              Request a Tour
            </button>
            <button
              style={{
                border: `1px solid rgba(255,255,255,0.15)`, background: "transparent",
                padding: "13px 16px", cursor: "pointer", fontSize: 12,
                fontFamily: "'DM Sans', sans-serif", color: "rgba(245,240,232,0.5)",
                transition: "all 0.2s",
              }}
              onClick={() => setFlipped(false)}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewConstruction({ setPage }) {
  return (
    <div style={{ paddingTop: 72, background: COLORS.offWhite, minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ background: COLORS.onyx, padding: "80px 40px 72px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span className="section-label">New Construction Specialist</span>
          <h1 className="serif" style={{ fontSize: "clamp(40px, 6vw, 76px)", fontWeight: 300, color: COLORS.cream, lineHeight: 1.1, marginBottom: 20, maxWidth: 700 }}>
            New Construction<br />
            <span style={{ color: COLORS.gold, fontStyle: "italic" }}>Opportunities</span> in Metro Atlanta
          </h1>
          <p style={{ color: "rgba(245,240,232,0.6)", fontSize: 17, maxWidth: 560, lineHeight: 1.75 }}>
            Curated new construction opportunities across Metro Atlanta. Homes from $300K to $600K. County, price, and features are right here — full details come when you connect with me directly. That is how I protect your deal from day one.
          </p>
        </div>
      </section>

      {/* Why through me bar */}
      <div style={{ background: COLORS.gold, padding: "20px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 14, color: COLORS.onyx, lineHeight: 1.6, fontWeight: 400 }}>
            <strong>Every builder on this page has active incentives right now.</strong> But here is what most buyers do not know — once you walk into a model home and sign in without an agent, you lose your right to representation entirely. I need to be registered as your agent before that first visit. That one step is how my clients walk away with $10K to $20K more in their pocket.
          </p>
        </div>
      </div>

      {/* Cards grid */}
      <section style={{ padding: "60px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <span className="section-label">Current Opportunities</span>
            <p style={{ fontSize: 14, color: COLORS.stone, maxWidth: 480, lineHeight: 1.7 }}>
              Hover any card to see current builder incentives. Click "Get Full Details" and I will send you everything — address, floor plans, availability, and my negotiation strategy for that community.
            </p>
          </div>
          <span className="pill" style={{ fontSize: 12, padding: "8px 18px" }}>{communities.length} Active Communities</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
          {communities.map((c, i) => (
            <CommunityCard key={i} c={c} onRequest={() => setPage("consultation")} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: 60, padding: "52px 40px", background: COLORS.onyx }}>
          <span className="section-label" style={{ justifyContent: "center" }}>Do Not Walk In Alone</span>
          <h3 className="serif" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: COLORS.cream, marginBottom: 16, lineHeight: 1.2 }}>
            See something you like?<br />
            <span style={{ color: COLORS.gold, fontStyle: "italic" }}>Contact me before you visit.</span>
          </h3>
          <p style={{ color: "rgba(245,240,232,0.5)", fontSize: 15, maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.75 }}>
            Once you sign in at a model home without an agent, the builder considers you unrepresented. That window closes fast. I need to be registered as your agent before your first visit.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-gold" onClick={() => setPage("consultation")}>Book a Free Strategy Call</button>
            <button className="btn-outline" style={{ color: COLORS.cream, borderColor: "rgba(245,240,232,0.3)" }} onClick={() => setPage("quiz")}>
              Start My Buying Plan
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ======= RESOURCES =======
const resources = [
  {
    title: "Understanding Your Buying Power",
    body: "Before anything else, you need to know your real number. Not what a calculator says. What a lender who actually looks at your file says. We walk through income, debt, and credit so you know exactly where you stand before you fall in love with a house.",
    tag: "Step 1",
  },
  {
    title: "What You Actually Need to Get Started",
    body: "No, you do not need 20% down. Here is what you actually need: two years of employment history, proof of income, a credit score that works, and a clear picture of your monthly debts. That is the starting line.",
    tag: "Step 2",
  },
  {
    title: "The Step-by-Step Process",
    body: "Pre-approval. Home search. Offer. Due diligence. Closing. Five stages, and each one matters. I walk every client through what to expect, what not to panic about, and where the real decisions live.",
    tag: "Step 3",
  },
  {
    title: "Common Mistakes to Avoid",
    body: "Opening new credit cards. Quitting your job. Making large cash deposits without paper trails. Skipping the inspection. These are the things that kill deals after they are already under contract. Know them before you get there.",
    tag: "Step 4",
  },
  {
    title: "Down Payment Assistance Options",
    body: "There is money on the table for buyers who know where to look. Georgia Dream, local grants, and builder programs can add thousands to your buying power. Most buyers walk past these because no one told them they existed.",
    tag: "Step 5",
  },
];

function Resources({ setPage }) {
  return (
    <div style={{ paddingTop: 72, minHeight: "100vh", background: COLORS.offWhite }}>
      <section style={{ background: COLORS.cream, padding: "80px 40px 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span className="section-label">Knowledge Is Leverage</span>
          <h1 className="serif" style={{ fontSize: "clamp(40px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.15, maxWidth: 700, marginBottom: 20 }}>
            Your Homebuying Guide
          </h1>
          <p style={{ fontSize: 17, color: COLORS.stone, maxWidth: 520, lineHeight: 1.75 }}>
            I am not going to hand you a glossy PDF full of tips and tricks. I am going to walk you through this the right way, the same way I walk my clients through it.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 40px" }}>
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
          {/* Main content */}
          <div style={{ flex: "2 1 500px" }}>
            {resources.map((r, i) => (
              <div key={i} className="resource-item">
                <div className="resource-number">{String(i + 1).padStart(2, "0")}</div>
                <div style={{ flex: 1 }}>
                  <span className="pill" style={{ marginBottom: 12, display: "inline-block" }}>{r.tag}</span>
                  <h3 className="serif" style={{ fontSize: 26, fontWeight: 400, marginBottom: 12, lineHeight: 1.2 }}>{r.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.8, color: COLORS.stone }}>{r.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div style={{ flex: "1 1 260px" }}>
            <div style={{ position: "sticky", top: 100 }}>
              <div style={{ background: COLORS.onyx, padding: 36, marginBottom: 24 }}>
                <h3 className="serif" style={{ fontSize: 28, fontWeight: 300, color: COLORS.cream, marginBottom: 16, lineHeight: 1.2 }}>
                  Ready to take the next step?
                </h3>
                <p style={{ fontSize: 14, color: "rgba(245,240,232,0.55)", lineHeight: 1.7, marginBottom: 28 }}>
                  Knowledge is only step one. Let's build a strategy around your actual situation.
                </p>
                <button className="btn-gold" style={{ width: "100%" }} onClick={() => setPage("quiz")}>
                  Start My Buying Plan
                </button>
              </div>
              <div style={{ background: COLORS.white, padding: 28, border: `1px solid rgba(0,0,0,0.06)` }}>
                <div className="stat-block" style={{ marginBottom: 24 }}>
                  <div className="serif" style={{ fontSize: 36, fontWeight: 300, color: COLORS.onyx }}>$12K</div>
                  <div style={{ fontSize: 13, color: COLORS.stone, marginTop: 4 }}>Average closing cost savings per client</div>
                </div>
                <div className="stat-block" style={{ marginBottom: 24 }}>
                  <div className="serif" style={{ fontSize: 36, fontWeight: 300, color: COLORS.onyx }}>10+</div>
                  <div style={{ fontSize: 13, color: COLORS.stone, marginTop: 4 }}>Counties served in Metro Atlanta</div>
                </div>
                <div className="stat-block">
                  <div className="serif" style={{ fontSize: 36, fontWeight: 300, color: COLORS.onyx }}>22</div>
                  <div style={{ fontSize: 13, color: COLORS.stone, marginTop: 4 }}>Age I bought my first home. This is personal.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ======= CONSULTATION =======
function Consultation({ setPage }) {
  return (
    <div style={{ paddingTop: 72, minHeight: "100vh", background: COLORS.offWhite }}>
      {/* Hero */}
      <section style={{
        background: `linear-gradient(160deg, ${COLORS.onyx} 60%, #2e2a22 100%)`,
        padding: "100px 40px 80px", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, right: 0, width: 400, height: "100%",
          background: `linear-gradient(to left, rgba(201,168,76,0.08), transparent)`,
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span className="section-label">This Is Where It Gets Real</span>
          <h1 className="serif" style={{ fontSize: "clamp(40px, 5vw, 68px)", fontWeight: 300, color: COLORS.cream, lineHeight: 1.1, maxWidth: 650, marginBottom: 20 }}>
            Buyer Strategy<br />
            <span style={{ color: COLORS.gold, fontStyle: "italic" }}>Consultation</span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(245,240,232,0.65)", maxWidth: 500, lineHeight: 1.75, marginBottom: 0 }}>
            A one-on-one session designed to give you clarity, direction, and a competitive advantage in today's market.
          </p>
        </div>
      </section>

      {/* What you get */}
      <section style={{ padding: "80px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 400px" }}>
            <span className="section-label">What You Will Walk Away With</span>
            <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, lineHeight: 1.2, marginBottom: 40 }}>
              Not guesses. Actual answers.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {[
                { title: "A clear picture of what you qualify for", body: "Real numbers. Not estimates. Based on your actual income, debts, and credit profile." },
                { title: "New construction vs. resale strategy", body: "We will talk through what makes sense for your timeline, your priorities, and the current market." },
                { title: "A customized home search plan", body: "County preferences, must-haves, non-negotiables. Your search starts with intention, not luck." },
                { title: "Your next steps, mapped out clearly", body: "You will leave knowing exactly what to do and in what order. No confusion, no guesswork." },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: COLORS.onyx, flexShrink: 0, marginTop: 2 }}>
                    {i + 1}
                  </div>
                  <div>
                    <h4 style={{ fontSize: 16, fontWeight: 500, marginBottom: 6 }}>{item.title}</h4>
                    <p style={{ fontSize: 14, color: COLORS.stone, lineHeight: 1.7 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA block */}
          <div style={{ flex: "1 1 320px" }}>
            <div style={{ background: COLORS.white, border: `1px solid rgba(0,0,0,0.06)`, padding: "44px 40px", position: "sticky", top: 100 }}>
              <div style={{ width: 48, height: 3, background: COLORS.gold, marginBottom: 24 }} />
              <h3 className="serif" style={{ fontSize: 32, fontWeight: 300, marginBottom: 12, lineHeight: 1.2 }}>Schedule Your Consultation</h3>
              <p style={{ fontSize: 14, color: COLORS.stone, lineHeight: 1.7, marginBottom: 32 }}>
                No cost. No pressure. No sales pitch. Just strategy and clarity built around your situation.
              </p>
              <div style={{ background: COLORS.cream, padding: "20px", marginBottom: 32 }}>
                <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.stone, marginBottom: 12 }}>This session is right for you if:</div>
                {[
                  "You are thinking about buying in the next 6 to 12 months",
                  "You want to understand your real buying power",
                  "You are not sure if you should build or buy resale",
                  "You have questions and want straight answers",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                    <span style={{ color: COLORS.gold, fontSize: 14, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 13, color: COLORS.stone, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://calendly.com/JesRealtyGroup/20mins?back=1&month=2026-04"
                target="_blank"
                rel="noreferrer"
                style={{ display: "block", textDecoration: "none" }}
              >
                <button className="btn-primary" style={{ width: "100%", fontSize: 13, padding: "16px" }}>
                  Schedule Your Consultation
                </button>
              </a>
              <p style={{ fontSize: 11, color: COLORS.stone, textAlign: "center", marginTop: 16 }}>
                Powered by Calendly. You will receive a confirmation and reminder automatically.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ======= WORK WITH ME =======
function WorkWithMe({ setPage }) {
  return (
    <div style={{ paddingTop: 72, minHeight: "100vh", background: COLORS.offWhite }}>
      {/* Hero */}
      <section style={{ background: COLORS.cream, padding: "100px 40px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 64, flexWrap: "wrap", alignItems: "center" }}>
          {/* Photo */}
          <div style={{ flex: "0 0 auto", position: "relative" }}>
            <div style={{
              width: 320, height: 420,
              background: COLORS.onyx,
              overflow: "hidden",
              position: "relative",
            }}>
              <img
                src="https://i.imgur.com/ilZlnjJ.jpeg"
                alt="Jessica Allen — Metro Atlanta Real Estate Agent"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                onError={e => { e.target.style.display = "none"; }}
              />
              {/* Gold corner accent */}
              <div style={{
                position: "absolute", bottom: 0, left: 0,
                width: "100%", padding: "24px 20px",
                background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
              }}>
                <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.gold }}>Jessica Allen</div>
                <div style={{ fontSize: 11, color: "rgba(245,240,232,0.6)", marginTop: 2 }}>Licensed Realtor® · Watch Realty Co.</div>
              </div>
            </div>
            {/* Gold border accent */}
            <div style={{
              position: "absolute", bottom: -12, right: -12,
              width: 320, height: 420,
              border: `2px solid ${COLORS.gold}`,
              zIndex: -1,
            }} />
          </div>

          <div style={{ flex: "1 1 360px" }}>
            <span className="section-label">My Story</span>
            <h1 className="serif" style={{ fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 300, lineHeight: 1.05, marginBottom: 24 }}>
              I bought my first home at 22.<br />
              <span style={{ color: COLORS.gold, fontStyle: "italic" }}>I have not stopped since.</span>
            </h1>
            <div className="gold-line" />
            <p style={{ fontSize: 17, color: COLORS.stone, lineHeight: 1.85, maxWidth: 500, fontWeight: 300 }}>
              I bought my first home at 22. That was not luck, it was a decision. Since then, I have bought and sold multiple properties personally, and I have used everything I have learned to help my clients do the same, strategically, intentionally, and without the overwhelm.
            </p>
          </div>
          <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: 3 }}>
            {[
              { label: "Total Sales Volume", value: "$8.9M+" },
              { label: "Years Licensed", value: "Since 2021" },
              { label: "Client Avg. Savings", value: "$12,000+" },
              { label: "Counties Served", value: "10+ in Metro ATL" },
              { label: "Personal Transactions", value: "Multiple" },
            ].map((s, i) => (
              <div key={i} style={{
                background: i % 2 === 0 ? COLORS.onyx : COLORS.white,
                padding: "28px 32px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontSize: 13, fontWeight: 400, letterSpacing: "0.05em", color: i % 2 === 0 ? "rgba(245,240,232,0.5)" : COLORS.stone }}>{s.label}</span>
                <span className="serif" style={{ fontSize: 26, fontWeight: 400, color: i % 2 === 0 ? COLORS.gold : COLORS.onyx }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* My Edge */}
      <section style={{ padding: "80px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <span className="section-label">What I Bring to the Table</span>
        <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300, marginBottom: 48, lineHeight: 1.2, maxWidth: 560 }}>
          This is not just a job. This is how I built my own foundation.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 2 }}>
          {[
            {
              title: "Negotiation Strategy",
              body: "I know how to extract value that most buyers leave on the table. Closing cost contributions, builder incentives, rate buy-downs. That is where real money gets made.",
              icon: "◈",
            },
            {
              title: "New Construction Expertise",
              body: "I know the builders, the processes, the timelines, and the negotiation windows. This is my specialty, not an afterthought.",
              icon: "◇",
            },
            {
              title: "Preferred Vendor Team",
              body: "My preferred lenders and inspectors are not recommendations. They are part of my white-glove service model. You get a team, not just an agent.",
              icon: "◉",
            },
            {
              title: "Personal Proof",
              body: "I am not telling you something I read in a book. I have walked this path personally. That matters when things get complicated.",
              icon: "◎",
            },
          ].map((item, i) => (
            <div key={i} className="card">
              <div style={{ fontSize: 32, color: COLORS.gold, marginBottom: 16 }}>{item.icon}</div>
              <h3 className="serif" style={{ fontSize: 24, fontWeight: 400, marginBottom: 12 }}>{item.title}</h3>
              <p style={{ fontSize: 14, color: COLORS.stone, lineHeight: 1.8 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The real talk section */}
      <section style={{ background: COLORS.onyx, padding: "80px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300, color: COLORS.cream, marginBottom: 24, lineHeight: 1.2 }}>
            My clients do not just close.<br />
            <span style={{ color: COLORS.gold, fontStyle: "italic" }}>They close strategically.</span>
          </h2>
          <p style={{ fontSize: 17, color: "rgba(245,240,232,0.6)", lineHeight: 1.8, maxWidth: 620, margin: "0 auto 48px" }}>
            The average buyer leaves thousands on the table because they do not know what to ask for. I do. And I ask for it every single time.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-gold" onClick={() => setPage("consultation")}>Book a Consultation</button>
            <button className="btn-outline" style={{ color: COLORS.cream, borderColor: "rgba(245,240,232,0.3)" }} onClick={() => setPage("quiz")}>
              Start My Buying Plan
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ======= FOOTER =======
function Footer({ setPage }) {
  return (
    <footer style={{ background: COLORS.onyx, borderTop: `1px solid rgba(201,168,76,0.15)`, padding: "60px 40px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
          <div style={{ flex: "1 1 260px" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: COLORS.cream, marginBottom: 6 }}>Jessica</div>
            <div style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.gold, marginBottom: 20 }}>Metro Atlanta Real Estate</div>
            <p style={{ fontSize: 13, color: "rgba(245,240,232,0.4)", lineHeight: 1.8, maxWidth: 260 }}>
              Not guesswork. Strategy. Helping Metro Atlanta buyers close with clarity and confidence.
            </p>
          </div>
          <div style={{ flex: "1 1 160px" }}>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.gold, marginBottom: 20 }}>Navigate</div>
            {[
              ["home", "Home"],
              ["quiz", "Start Here"],
              ["new-construction", "New Construction"],
              ["resources", "Resources"],
              ["consultation", "Consultation"],
              ["work-with-me", "Work With Me"],
            ].map(([id, label]) => (
              <button key={id} onClick={() => setPage(id)} style={{
                display: "block", background: "none", border: "none", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(245,240,232,0.5)",
                padding: "5px 0", textAlign: "left", transition: "color 0.2s",
              }}
                onMouseEnter={e => e.target.style.color = COLORS.gold}
                onMouseLeave={e => e.target.style.color = "rgba(245,240,232,0.5)"}
              >
                {label}
              </button>
            ))}
          </div>
          <div style={{ flex: "1 1 220px" }}>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.gold, marginBottom: 20 }}>Counties Served</div>
            <p style={{ fontSize: 13, color: "rgba(245,240,232,0.4)", lineHeight: 2 }}>
              Henry · Gwinnett · Cobb · DeKalb · Clayton · Rockdale · Newton · Fayette · Fulton · Walton
            </p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 28, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 11, color: "rgba(245,240,232,0.25)" }}>© 2026 Jessica Allen. Licensed Realtor® in Georgia. Watch Realty Co. All rights reserved.</p>
          <p style={{ fontSize: 11, color: "rgba(245,240,232,0.25)" }}>Built with intention, not guesswork.</p>
        </div>
      </div>
    </footer>
  );
}

// ======= APP =======
export default function App() {
  const [page, setPage] = useState("home");
  const prevPage = useRef(page);

  const handleSetPage = (p) => {
    prevPage.current = page;
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (page) {
      case "home": return <Home setPage={handleSetPage} />;
      case "quiz": return <Quiz setPage={handleSetPage} />;
      case "new-construction": return <NewConstruction setPage={handleSetPage} />;
      case "resources": return <Resources setPage={handleSetPage} />;
      case "consultation": return <Consultation setPage={handleSetPage} />;
      case "work-with-me": return <WorkWithMe setPage={handleSetPage} />;
      default: return <Home setPage={handleSetPage} />;
    }
  };

  return (
    <>
      <style>{styles}</style>
      <Nav page={page} setPage={handleSetPage} />
      <main key={page} style={{ animation: "fadeIn 0.4s ease both" }}>
        {renderPage()}
      </main>
      {page !== "quiz" && <Footer setPage={handleSetPage} />}
    </>
  );
}
