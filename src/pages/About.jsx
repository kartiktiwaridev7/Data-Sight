import React from 'react';

function EngineOverview() {
  const containerStyle = {
    padding: '30px',
    color: '#ffffff',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const headerStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    background: 'linear-gradient(90deg, #ffffff, #00d2ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '40px'
  };

  const cardStyle = {
    backgroundColor: '#161625',
    border: '1px solid #2b2b45',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.2s ease-in-out'
  };

  const iconStyle = {
    fontSize: '2rem',
    marginBottom: '15px'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>How DataSight Works</h1>
      <p style={{ color: '#a0a0b5', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '800px' }}>
        DataSight connects a fast, modern website with a smart Artificial Intelligence engine behind the scenes. 
        It is built to take in messy, unpredictable data and turn it into clear, accurate predictions in the blink of an eye.
      </p>

      <div style={gridStyle}>
        {/* Frontend Card */}
        <div style={cardStyle} className="hover-card">
          {/* <div style={iconStyle}>⚡</div> */}
          <h3 style={{ color: '#00d2ff', marginBottom: '10px' }}>Fast & Smooth Uploads</h3>
          <p style={{ color: '#a0a0b5', fontSize: '0.95rem', lineHeight: '1.5' }}>
            Instead of freezing your computer when you upload a massive spreadsheet, DataSight sends the heavy file 
            straight to our powerful servers. Your screen only loads a small preview, keeping the website lightning-fast 
            no matter how big your dataset is.
          </p>
        </div>

        {/* Backend Card */}
        <div style={cardStyle} className="hover-card">
          {/* <div style={iconStyle}>🧠</div> */}
          <h3 style={{ color: '#00d2ff', marginBottom: '10px' }}>Smart Data Reading</h3>
          <p style={{ color: '#a0a0b5', fontSize: '0.95rem', lineHeight: '1.5' }}>
            You don't need to format your files perfectly. The AI automatically scans whatever you upload, ignores text 
            it doesn't need, and finds the important numbers. Whether your spreadsheet has 3 columns or 100, 
            the system adapts instantly.
          </p>
        </div>

        {/* ML Card */}
        <div style={cardStyle} className="hover-card">
          {/* <div style={iconStyle}>📈</div> */}
          <h3 style={{ color: '#00d2ff', marginBottom: '10px' }}>Connecting the Dots</h3>
          <p style={{ color: '#a0a0b5', fontSize: '0.95rem', lineHeight: '1.5' }}>
            Instead of just looking at one thing at a time, the AI looks at the big picture. It analyzes multiple 
            factors at once—like how your user counts, ad spend, and website visits all work together—to give you 
            the most accurate revenue forecast possible.
          </p>
        </div>

        {/* UI/State Card */}
        <div style={cardStyle} className="hover-card">
          {/* <div style={iconStyle}>💾</div> */}
          <h3 style={{ color: '#00d2ff', marginBottom: '10px' }}>Seamless Experience</h3>
          <p style={{ color: '#a0a0b5', fontSize: '0.95rem', lineHeight: '1.5' }}>
            Just like top-tier professional software, DataSight remembers what you are doing. If you switch between 
            different pages to view your charts or raw data, everything stays exactly where you left it without 
            needing to upload your file again.
          </p>
        </div>
      </div>
      
      {/* Optional simple CSS for the hover effect embedded safely */}
      <style>
        {`
          .hover-card:hover {
            transform: translateY(-5px);
            border-color: #00d2ff !important;
          }
        `}
      </style>
    </div>
  );
}

export default EngineOverview;