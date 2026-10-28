import React from 'react';

function EngineOverview() {
  const containerStyle = {
    padding: 'clamp(12px, 3vw, 30px)',
    color: '#ffffff',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    boxSizing: 'border-box',
  };

  const headerStyle = {
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    fontWeight: 'bold',
    marginBottom: '10px',
    background: 'linear-gradient(90deg, #ffffff, #00d2ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
    gap: 'clamp(16px, 2.5vw, 20px)',
    marginTop: 'clamp(24px, 4vw, 40px)',
  };

  const cardStyle = {
    backgroundColor: '#161625',
    border: '1px solid #2b2b45',
    borderRadius: '12px',
    padding: 'clamp(18px, 3vw, 25px)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.2s ease-in-out',
    boxSizing: 'border-box',
  };

  return (
    <div style={containerStyle} className="eo-container">
      <h1 style={headerStyle} className="eo-fade-in eo-delay-1">How DataSight Works</h1>
      <p
        className="eo-fade-in eo-delay-2"
        style={{
          color: '#a0a0b5',
          fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
          lineHeight: '1.6',
          maxWidth: '800px',
        }}
      >
        DataSight connects a fast, modern website with a smart Artificial Intelligence engine behind the scenes.
        It is built to take in messy, unpredictable data and turn it into clear, accurate predictions in the blink of an eye.
      </p>

      <div style={gridStyle}>
        {/* Frontend Card */}
        <div style={cardStyle} className="hover-card eo-card eo-fade-in eo-delay-3">
          <h3 style={{ color: '#00d2ff', marginBottom: '10px', marginTop: 0 }}>Fast & Smooth Uploads</h3>
          <p style={{ color: '#a0a0b5', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
            Instead of freezing your computer when you upload a massive spreadsheet, DataSight sends the heavy file
            straight to our powerful servers. Your screen only loads a small preview, keeping the website lightning-fast
            no matter how big your dataset is.
          </p>
        </div>

        {/* Backend Card */}
        <div style={cardStyle} className="hover-card eo-card eo-fade-in eo-delay-4">
          <h3 style={{ color: '#00d2ff', marginBottom: '10px', marginTop: 0 }}>Smart Data Reading</h3>
          <p style={{ color: '#a0a0b5', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
            You don't need to format your files perfectly. The AI automatically scans whatever you upload, ignores text
            it doesn't need, and finds the important numbers. Whether your spreadsheet has 3 columns or 100,
            the system adapts instantly.
          </p>
        </div>

        {/* ML Card */}
        <div style={cardStyle} className="hover-card eo-card eo-fade-in eo-delay-5">
          <h3 style={{ color: '#00d2ff', marginBottom: '10px', marginTop: 0 }}>Connecting the Dots</h3>
          <p style={{ color: '#a0a0b5', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
            Instead of just looking at one thing at a time, the AI looks at the big picture. It analyzes multiple
            factors at once—like how your user counts, ad spend, and website visits all work together—to give you
            the most accurate revenue forecast possible.
          </p>
        </div>

        {/* UI/State Card */}
        <div style={cardStyle} className="hover-card eo-card eo-fade-in eo-delay-6">
          <h3 style={{ color: '#00d2ff', marginBottom: '10px', marginTop: 0 }}>Seamless Experience</h3>
          <p style={{ color: '#a0a0b5', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
            Just like top-tier professional software, DataSight remembers what you are doing. If you switch between
            different pages to view your charts or raw data, everything stays exactly where you left it without
            needing to upload your file again.
          </p>
        </div>
      </div>

      <style>
        {`
          @keyframes eoFadeInUp {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes eoHeaderShimmer {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
          @keyframes eoShine {
            from { transform: translateX(-120%) skewX(-15deg); }
            to { transform: translateX(220%) skewX(-15deg); }
          }

          .eo-container {
            animation: eoFadeInUp 0.5s ease-out both;
          }
          .eo-fade-in {
            opacity: 0;
            animation: eoFadeInUp 0.55s ease-out both;
          }
          .eo-delay-1 { animation-delay: 0.1s; }
          .eo-delay-2 { animation-delay: 0.18s; }
          .eo-delay-3 { animation-delay: 0.26s; }
          .eo-delay-4 { animation-delay: 0.34s; }
          .eo-delay-5 { animation-delay: 0.42s; }
          .eo-delay-6 { animation-delay: 0.5s; }

          .eo-container h1 {
            background-size: 200% auto;
            animation: eoFadeInUp 0.55s ease-out both, eoHeaderShimmer 6s linear infinite 0.7s;
          }

          .eo-card {
            position: relative;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          }
          .eo-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 45%;
            height: 100%;
            background: linear-gradient(120deg, transparent, rgba(0, 210, 255, 0.08), transparent);
            transform: translateX(-120%) skewX(-15deg);
            pointer-events: none;
          }
          .hover-card:hover {
            transform: translateY(-5px);
            border-color: #00d2ff !important;
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 210, 255, 0.1);
          }
          .eo-card:hover::before {
            animation: eoShine 0.8s ease forwards;
          }
          .eo-card h3 {
            transition: transform 0.25s ease;
          }
          .eo-card:hover h3 {
            transform: translateX(3px);
          }

          @media (prefers-reduced-motion: reduce) {
            .eo-container,
            .eo-fade-in,
            .eo-container h1,
            .eo-card::before {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default EngineOverview;