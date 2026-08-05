import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', color: '#ffffff', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Hero Section */}
      <h1 style={{ fontSize: '4rem', color: '#00d2ff', marginBottom: '10px', letterSpacing: '2px' }}>
        DataSight
      </h1>
      <p style={{ fontSize: '1.3rem', color: '#a0a0b5', marginBottom: '50px', fontWeight: '300' }}>
        Enterprise-Grade AI Analytics & Revenue Forecasting
      </p>

      {/* Primary Call to Action */}
      <button
        onClick={() => navigate('/dashboard')}
        style={{
          backgroundColor: '#00d2ff',
          color: '#000',
          padding: '16px 36px',
          fontSize: '1.2rem',
          borderRadius: '8px',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0, 210, 255, 0.4)',
          marginBottom: '60px',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      >
        Launch Dashboard 🚀
      </button>

      {/* Architecture Highlights Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '30px',
        textAlign: 'left'
      }}>
        
        {/* Feature 1 */}
        <div style={{ backgroundColor: '#161625', padding: '30px', borderRadius: '16px', border: '1px solid #2b2b45', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
          <h3 style={{ color: '#00d2ff', marginTop: 0, fontSize: '1.4rem' }}>🧠 Machine Learning</h3>
          <p style={{ color: '#a0a0b5', lineHeight: '1.6', fontSize: '1rem' }}>
            Powered by a robust Python backend using Scikit-Learn to accurately predict future trends based on historical data ingestion.
          </p>
        </div>

        {/* Feature 2 */}
        <div style={{ backgroundColor: '#161625', padding: '30px', borderRadius: '16px', border: '1px solid #2b2b45', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
          <h3 style={{ color: '#00d2ff', marginTop: 0, fontSize: '1.4rem' }}>⚡ Real-Time Processing</h3>
          <p style={{ color: '#a0a0b5', lineHeight: '1.6', fontSize: '1rem' }}>
            A lightning-fast React frontend built for seamless CSV parsing, dynamic charting, and instant state management.
          </p>
        </div>

        {/* Feature 3 */}
        <div style={{ backgroundColor: '#161625', padding: '30px', borderRadius: '16px', border: '1px solid #2b2b45', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
          <h3 style={{ color: '#00d2ff', marginTop: 0, fontSize: '1.4rem' }}>📄 Automated Exports</h3>
          <p style={{ color: '#a0a0b5', lineHeight: '1.6', fontSize: '1rem' }}>
            Instantly generate and download high-resolution, presentation-ready PDF reports of your complete predictive analysis.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Home;