import React from 'react';

function Developer() {
  const containerStyle = {
    padding: '30px',
    color: '#ffffff',
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const cardStyle = {
    backgroundColor: '#161625',
    border: '1px solid #2b2b45',
    borderRadius: '12px',
    padding: '35px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  };

  const linkContainerStyle = {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
    marginTop: '30px',
    paddingTop: '25px',
    borderTop: '1px solid #2b2b45'
  };

  const linkStyle = {
    padding: '12px 24px',
    backgroundColor: '#1c1c28',
    color: '#00d2ff',
    textDecoration: 'none',
    borderRadius: '6px',
    border: '1px solid #2b2b45',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  return (
    <div style={containerStyle} className="dev-container">
      <h2
        className="dev-heading"
        style={{ color: '#00d2ff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        {/* Simple user icon */}
        <svg className="dev-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        About the Developer
      </h2>

      <div style={cardStyle} className="dev-card">
        <h1 className="dev-fade-in dev-delay-1" style={{ margin: '0 0 5px 0', fontSize: '2.2rem' }}>Kartik Tiwari</h1>
        <p className="dev-fade-in dev-delay-2" style={{ color: '#00d2ff', fontSize: '1.1rem', margin: '0 0 20px 0' }}>Frontend & Machine Learning Developer</p>

        <div className="dev-fade-in dev-delay-3" style={{ color: '#a0a0b5', fontSize: '0.95rem', marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div>📍 Ghaziabad, India</div>
          <div>🎓 Final-Year BCA Student at CCSU</div>
          <div>💻 Specialized in React, Python, and M.L.</div>
        </div>

        <h3 className="dev-fade-in dev-delay-4" style={{ borderBottom: '1px solid #2b2b45', paddingBottom: '10px', marginBottom: '15px' }}>Hi there! 👋</h3>

        <div className="dev-fade-in dev-delay-5" style={{ color: '#e0e0e0', lineHeight: '1.8', fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <p>
            I'm Kartik. I specialize in bringing clean frontend web development together with machine learning. 
            I am definitely focused on M.L. and frontend rather than being a Java learner, because I love building 
            interfaces where data actually comes to life.
          </p>
          <p>
            Right now, alongside finishing my degree, I am actively taking on <strong>freelance projects</strong>. 
            Before building DataSight, I created projects like CardioCore—a full web-based hospital application featuring 
            a heart disease prediction model. 
          </p>
          
          <p>
            Curretly I am doing freelnce projects and I love to connect with you If You are intrested in M.l and create a bridge b/w Machine learning model
            and frontend applications that solves real world problem and you can find me through my link-din and connect with trough 
            my Portfolio . 
            </p>
          
          <p>
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Kartik Tiwari
          </p>
        </div>

        {/* Links Section */}
        <div style={linkContainerStyle} className="dev-fade-in dev-delay-6">
          <a href="https://kartiktiwartiportfolio.netlify.app/" target="_blank" rel="noopener noreferrer" style={linkStyle} className="dev-link dev-link-1">
            <span className="dev-link-icon">🌐</span> My Portfolio
          </a>
          <a href="https://www.linkedin.com/in/kartik-tiwari-8b2bb5353" target="_blank" rel="noopener noreferrer" style={linkStyle} className="dev-link dev-link-2">
            <span className="dev-link-icon">💼</span> LinkedIn
          </a>
          <a href="https://github.com/kartiktiwaridev7" target="_blank" rel="noopener noreferrer" style={linkStyle} className="dev-link dev-link-3">
            <span className="dev-link-icon">🐙</span> GitHub
          </a>
        </div>
      </div>

      {/* Embedded CSS for animations and hover effects */}
      <style>
        {`
          @keyframes devFadeInUp {
            from {
              opacity: 0;
              transform: translateY(14px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes devCardIntro {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.98);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes devIconPop {
            from {
              opacity: 0;
              transform: scale(0.6) rotate(-15deg);
            }
            to {
              opacity: 1;
              transform: scale(1) rotate(0deg);
            }
          }

          @keyframes devUnderlineGrow {
            from { width: 0%; }
            to { width: 100%; }
          }

          @keyframes devShine {
            from { transform: translateX(-120%) skewX(-15deg); }
            to { transform: translateX(220%) skewX(-15deg); }
          }

          .dev-container {
            animation: devFadeInUp 0.5s ease-out both;
          }

          .dev-heading {
            position: relative;
          }

          .dev-icon {
            animation: devIconPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
            transition: transform 0.3s ease;
          }

          .dev-heading:hover .dev-icon {
            transform: rotate(-8deg) scale(1.1);
          }

          .dev-heading::after {
            content: '';
            position: absolute;
            left: 34px;
            bottom: -6px;
            height: 2px;
            width: 0%;
            background: linear-gradient(90deg, #00d2ff, transparent);
            animation: devUnderlineGrow 0.8s ease-out 0.4s both;
          }

          .dev-card {
            animation: devCardIntro 0.55s ease-out 0.1s both;
            transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
          }

          .dev-card:hover {
            transform: translateY(-4px);
            border-color: #3a3a5c;
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 210, 255, 0.08);
          }

          .dev-fade-in {
            opacity: 0;
            animation: devFadeInUp 0.55s ease-out both;
          }

          .dev-delay-1 { animation-delay: 0.15s; }
          .dev-delay-2 { animation-delay: 0.22s; }
          .dev-delay-3 { animation-delay: 0.29s; }
          .dev-delay-4 { animation-delay: 0.36s; }
          .dev-delay-5 { animation-delay: 0.43s; }
          .dev-delay-6 { animation-delay: 0.5s; }

          .dev-link {
            position: relative;
            overflow: hidden;
            opacity: 0;
            animation: devFadeInUp 0.4s ease-out both;
          }

          .dev-link-1 { animation-delay: 0.6s; }
          .dev-link-2 { animation-delay: 0.68s; }
          .dev-link-3 { animation-delay: 0.76s; }

          .dev-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 40%;
            height: 100%;
            background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.35), transparent);
            transform: translateX(-120%) skewX(-15deg);
            pointer-events: none;
          }

          .dev-link:hover::before {
            animation: devShine 0.7s ease forwards;
          }

          .dev-link-icon {
            display: inline-block;
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }

          .dev-link:hover {
            background-color: #00d2ff !important;
            color: #000 !important;
            transform: translateY(-3px);
            box-shadow: 0 4px 12px rgba(0, 210, 255, 0.3);
          }

          .dev-link:hover .dev-link-icon {
            transform: scale(1.2) rotate(-6deg);
          }

          .dev-link:active {
            transform: translateY(-1px) scale(0.97);
          }

          @media (prefers-reduced-motion: reduce) {
            .dev-container,
            .dev-card,
            .dev-fade-in,
            .dev-link,
            .dev-icon,
            .dev-heading::after {
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

export default Developer;