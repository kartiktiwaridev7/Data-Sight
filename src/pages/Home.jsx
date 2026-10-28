import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiActivity, FiZap, FiFileText, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';

// Small hook: reveals an element with a fade/rise once it scrolls into view
function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function Home() {
  const navigate = useNavigate();
  const [heroMounted, setHeroMounted] = useState(false);
  const [featuresRef, featuresVisible] = useReveal(0.15);

  useEffect(() => {
    // Trigger the hero entrance sequence right after first paint
    const t = requestAnimationFrame(() => setHeroMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const features = [
    {
      icon: <FiActivity />,
      title: 'Machine Learning',
      desc: 'Advanced ML models to predict future trends with high accuracy.',
      color: '#0073ff',
      bg: 'rgba(0, 115, 255, 0.15)',
    },
    {
      icon: <FiZap />,
      title: 'Real-Time Processing',
      desc: 'Instant insights with real-time data processing and visualization.',
      color: '#b845ed',
      bg: 'rgba(157, 0, 255, 0.15)',
    },
    {
      icon: <FiFileText />,
      title: 'Automated Reports',
      desc: 'Generate and download professional PDF reports in one click.',
      color: '#00ff80',
      bg: 'rgba(0, 255, 128, 0.15)',
    },
  ];

  return (
    <div
      style={{
        padding: 'clamp(16px, 4vw, 40px)',
        color: '#ffffff',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'sans-serif',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-12px); }
        }
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulseDot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0, 210, 255, 0.55); }
          50%      { box-shadow: 0 0 0 6px rgba(0, 210, 255, 0); }
        }
        @keyframes shine {
          0%   { transform: translateX(-120%) skewX(-15deg); }
          100% { transform: translateX(220%) skewX(-15deg); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.15; }
          50%      { opacity: 0.28; }
        }

        .hs-badge-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #00d2ff;
          animation: pulseDot 2.2s ease-out infinite;
        }
        .hs-gradient-text {
          background: linear-gradient(90deg, #00d2ff 0%, #b845ed 50%, #00d2ff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
          animation: gradientShift 6s ease-in-out infinite;
        }
        .hs-launch-btn {
          position: relative; overflow: hidden;
        }
        .hs-launch-btn::before {
          content: ''; position: absolute; top: 0; left: 0; width: 40%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: translateX(-120%) skewX(-15deg);
        }
        .hs-launch-btn:hover::before { animation: shine 1s ease forwards; }
        .hs-launch-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0, 210, 255, 0.55) !important; }
        .hs-launch-btn:hover .hs-arrow { transform: translateX(4px); }
        .hs-launch-btn:active { transform: translateY(-1px) scale(0.98); }
        .hs-arrow { transition: transform 0.25s ease; }

        .hs-glow-backdrop { animation: glowPulse 4.5s ease-in-out infinite; }

        .hs-float-1 { animation: floatCard 6s ease-in-out infinite; }
        .hs-float-2 { animation: floatCard 7s ease-in-out infinite 0.6s; }
        .hs-float-3 { animation: floatCard 6.5s ease-in-out infinite 1.2s; }

        .hs-mock-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .hs-mock-card:hover {
          transform: translateY(-6px) !important;
          border-color: #00d2ff;
          box-shadow: 0 20px 45px rgba(0, 210, 255, 0.25) !important;
        }

        .hs-feature-card {
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease, background-color 0.35s ease;
        }
        .hs-feature-card:hover {
          transform: translateY(-6px);
          border-color: rgba(0, 210, 255, 0.35);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
        }
        .hs-feature-icon { transition: transform 0.35s ease; flex-shrink: 0; }
        .hs-feature-card:hover .hs-feature-icon { transform: scale(1.12) rotate(-4deg); }

        /* --- Mobile Responsiveness for Hero & Floating Cards --- */
        @media (max-width: 640px) {
          .hs-mockup-container {
            height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 14px !important;
            margin-top: 10px;
          }
          .hs-mock-card {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            right: auto !important;
            bottom: auto !important;
            width: 100% !important;
            box-sizing: border-box;
            justify-content: space-between;
          }
          .hs-launch-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hs-badge-dot, .hs-gradient-text, .hs-float-1, .hs-float-2, .hs-float-3,
          .hs-glow-backdrop, .hs-launch-btn::before { animation: none !important; }
          * { transition: none !important; }
        }
      `}</style>

      {/* Top Section: Hero Split Layout */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'clamp(24px, 4vw, 40px)',
          marginTop: 'clamp(16px, 4vw, 40px)',
          marginBottom: 'clamp(40px, 6vw, 80px)',
        }}
      >
        {/* Left Content (Text & CTA) */}
        <div style={{ flex: '1 1 300px', minWidth: 0 }}>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(0, 210, 255, 0.1)',
              color: '#00d2ff',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: 'bold',
              marginBottom: '20px',
              opacity: heroMounted ? 1 : 0,
              transform: heroMounted ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <span className="hs-badge-dot" />
            Welcome to DataSight
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.1rem, 5vw, 3.8rem)',
              fontWeight: 'bold',
              lineHeight: '1.2',
              margin: '0 0 20px 0',
              opacity: heroMounted ? 1 : 0,
              transform: heroMounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
            }}
          >
            AI-Powered Analytics<br />
            for <span className="hs-gradient-text">Smarter Decisions</span>
          </h1>

          {/* Subheadline */}
          <p
            style={{
              color: '#a0a0b5',
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              lineHeight: '1.6',
              marginBottom: '35px',
              maxWidth: '450px',
              opacity: heroMounted ? 1 : 0,
              transform: heroMounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
            }}
          >
            Upload your data, uncover patterns, and forecast revenue with enterprise-grade AI.
          </p>

          {/* Glowing Button */}
          <button
            onClick={() => navigate('/dashboard')}
            className="hs-launch-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#00d2ff',
              color: '#000',
              padding: '14px 28px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0, 210, 255, 0.4)',
              opacity: heroMounted ? 1 : 0,
              transform: heroMounted ? 'translateY(0)' : 'translateY(20px)',
              transitionProperty: 'opacity, transform, box-shadow',
              transitionDuration: '0.6s, 0.6s, 0.25s',
              transitionDelay: '0.3s, 0.3s, 0s',
              transitionTimingFunction: 'ease',
            }}
          >
            Launch Dashboard <FiArrowRight className="hs-arrow" />
          </button>
        </div>

        {/* Right Content (Floating Mockup Graphic) */}
        <div
          className="hs-mockup-container"
          style={{
            flex: '1 1 320px',
            minWidth: 0,
            position: 'relative',
            height: '420px',
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? 'scale(1)' : 'scale(0.92)',
            transition: 'opacity 0.8s ease 0.25s, transform 0.8s ease 0.25s',
          }}
        >
          {/* Decorative Glowing Backdrop */}
          <div
            className="hs-glow-backdrop"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '280px',
              height: '280px',
              background: 'radial-gradient(circle, rgba(0, 210, 255, 0.35) 0%, transparent 70%)',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          />

          {/* Floating Card 1: Revenue */}
          <div
            className="hs-mock-card hs-float-1"
            style={{
              position: 'absolute',
              top: '15%',
              left: '0%',
              backgroundColor: '#0d0d14',
              padding: '20px',
              borderRadius: '16px',
              border: '1px solid #1c1c28',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <span style={{ color: '#a0a0b5', fontSize: '0.85rem' }}>Revenue</span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '25px' }}>
              <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.4rem' }}>$4,685.79</span>
              <div
                style={{
                  backgroundColor: 'rgba(0, 210, 255, 0.1)',
                  color: '#00d2ff',
                  padding: '6px',
                  borderRadius: '50%',
                  display: 'flex',
                }}
              >
                <FiTrendingUp size={20} />
              </div>
            </div>
          </div>

          {/* Floating Card 2: Accuracy */}
          <div
            className="hs-mock-card hs-float-2"
            style={{
              position: 'absolute',
              top: '30%',
              right: '0%',
              backgroundColor: '#0d0d14',
              padding: '20px',
              borderRadius: '16px',
              border: '1px solid #1c1c28',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <span style={{ color: '#a0a0b5', fontSize: '0.85rem' }}>Accuracy (R²)</span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '25px' }}>
              <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.4rem' }}>0.991</span>
              <div
                style={{
                  backgroundColor: 'rgba(0, 255, 128, 0.1)',
                  color: '#00ff80',
                  padding: '6px',
                  borderRadius: '50%',
                  display: 'flex',
                }}
              >
                <FiActivity size={20} />
              </div>
            </div>
          </div>

          {/* Floating Card 3: Confidence */}
          <div
            className="hs-mock-card hs-float-3"
            style={{
              position: 'absolute',
              bottom: '15%',
              right: '12%',
              backgroundColor: '#0d0d14',
              padding: '20px',
              borderRadius: '16px',
              border: '1px solid #1c1c28',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <span style={{ color: '#a0a0b5', fontSize: '0.85rem' }}>Confidence</span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '30px' }}>
              <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.4rem' }}>High</span>
              <div
                style={{
                  backgroundColor: 'rgba(0, 255, 128, 0.1)',
                  color: '#00ff80',
                  padding: '6px',
                  borderRadius: '50%',
                  display: 'flex',
                }}
              >
                <FiCheckCircle size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Why DataSight? */}
      <h2 style={{ fontSize: '1.5rem', marginBottom: '25px' }}>Why DataSight?</h2>
      <div
        ref={featuresRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '20px',
        }}
      >
        {features.map((f, i) => (
          <div
            key={f.title}
            className="hs-feature-card"
            style={{
              backgroundColor: '#0d0d14',
              padding: 'clamp(18px, 3vw, 24px)',
              borderRadius: '16px',
              border: '1px solid #1c1c28',
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start',
              opacity: featuresVisible ? 1 : 0,
              transform: featuresVisible ? 'translateY(0)' : 'translateY(24px)',
              transitionProperty: 'opacity, transform',
              transitionDuration: '0.6s',
              transitionTimingFunction: 'ease',
              transitionDelay: `${i * 0.12}s`,
            }}
          >
            <div
              className="hs-feature-icon"
              style={{
                backgroundColor: f.bg,
                color: f.color,
                padding: '16px',
                borderRadius: '50%',
                fontSize: '1.5rem',
                display: 'flex',
              }}
            >
              {f.icon}
            </div>
            <div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>{f.title}</h3>
              <p style={{ color: '#a0a0b5', margin: 0, fontSize: '0.9rem', lineHeight: '1.5' }}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;