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
    <div style={containerStyle}>
      <h2 style={{ color: '#00d2ff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Simple user icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        About the Developer
      </h2>

      <div style={cardStyle}>
        <h1 style={{ margin: '0 0 5px 0', fontSize: '2.2rem' }}>Kartik Tiwari</h1>
        <p style={{ color: '#00d2ff', fontSize: '1.1rem', margin: '0 0 20px 0' }}>Frontend & Machine Learning Developer</p>
        
        <div style={{ color: '#a0a0b5', fontSize: '0.95rem', marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div>📍 Ghaziabad, India</div>
          <div>🎓 Final-Year BCA Student at CCSU</div>
          <div>💻 Specialized in React, Python, and M.L.</div>
        </div>

        <h3 style={{ borderBottom: '1px solid #2b2b45', paddingBottom: '10px', marginBottom: '15px' }}>Hi there! 👋</h3>
        
        <div style={{ color: '#e0e0e0', lineHeight: '1.8', fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '15px' }}>
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
            Outside of the code editor, I step away from the screen by doing calisthenics, meditating, and reading 
            fantasy novels to keep a healthy balance.
          </p>
          <p>
            I believe that connecting with people is way more important than trying to sound perfect all the time. 
            We are human, we make mistakes, and honestly, the best collaborations happen when we just drop the perfectionism 
            and build cool things together. If you have a freelance project in mind, or just want to chat about tech, I'd love to connect!
          </p>
        </div>

        {/* Links Section */}
        <div style={linkContainerStyle}>
          <a href="https://kartiktiwartiportfolio.netlify.app/" target="_blank" rel="noopener noreferrer" style={linkStyle} className="dev-link">
            🌐 My Portfolio
          </a>
          <a href="https://www.linkedin.com/in/kartik-tiwari-8b2bb5353" target="_blank" rel="noopener noreferrer" style={linkStyle} className="dev-link">
            💼 LinkedIn
          </a>
          <a href="https://github.com/kartiktiwaridev7" target="_blank" rel="noopener noreferrer" style={linkStyle} className="dev-link">
            🐙 GitHub
          </a>
        </div>
      </div>

      {/* Embedded CSS for hover effects */}
      <style>
        {`
          .dev-link:hover {
            background-color: #00d2ff !important;
            color: #000 !important;
            transform: translateY(-3px);
            box-shadow: 0 4px 12px rgba(0, 210, 255, 0.3);
          }
        `}
      </style>
    </div>
  );
}

export default Developer;