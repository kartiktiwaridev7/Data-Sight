import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiActivity, FiZap, FiFileText, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px 40px', color: '#ffffff', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>

      {/* Top Section: Hero Split Layout */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '40px', marginTop: '40px', marginBottom: '80px' }}>

        {/* Left Content (Text & CTA) */}
        <div style={{ flex: '1 1 500px' }}>
          
          {/* Badge */}
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(0, 210, 255, 0.1)', 
            color: '#00d2ff', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '24px' 
          }}>
            Welcome to DataSight
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: '3.8rem', fontWeight: 'bold', lineHeight: '1.2', margin: '0 0 20px 0' }}>
            AI-Powered Analytics<br />
            for <span style={{ background: 'linear-gradient(90deg, #00d2ff 0%, #b845ed 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Smarter Decisions</span>
          </h1>

          {/* Subheadline */}
          <p style={{ color: '#a0a0b5', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '35px', maxWidth: '450px' }}>
            Upload your data, uncover patterns, and forecast revenue with enterprise-grade AI.
          </p>

          {/* Glowing Button */}
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#00d2ff', color: '#000',
              padding: '14px 28px', fontSize: '1rem', borderRadius: '8px', border: 'none', fontWeight: 'bold',
              cursor: 'pointer', boxShadow: '0 4px 15px rgba(0, 210, 255, 0.4)', transition: 'all 0.2s'
            }}
            onMouseOver={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 20px rgba(0, 210, 255, 0.6)'; }}
            onMouseOut={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 15px rgba(0, 210, 255, 0.4)'; }}
          >
            Launch Dashboard <FiArrowRight />
          </button>
        </div>

        {/* Right Content (Floating Mockup Graphic - Box formatting removed) */}
        <div style={{ flex: '1 1 400px', position: 'relative', height: '420px' }}>
          
          {/* Decorative Glowing Backdrop */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: '300px', height: '300px', backgroundColor: '#00d2ff', filter: 'blur(120px)', opacity: '0.15', transform: 'translate(-50%, -50%)', zIndex: 0 }}></div>

          {/* Floating Card 1: Revenue */}
          <div style={{ position: 'absolute', top: '15%', left: '0%', backgroundColor: '#0d0d14', padding: '16px 20px', borderRadius: '12px', border: '1px solid #2b2b45', boxShadow: '0 15px 35px rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 2 }}>
            <span style={{ color: '#a0a0b5', fontSize: '0.85rem' }}>Revenue</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
              <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.4rem' }}>$4,685.79</span>
              <div style={{ backgroundColor: 'rgba(0, 210, 255, 0.1)', color: '#00d2ff', padding: '6px', borderRadius: '50%', display: 'flex' }}><FiTrendingUp /></div>
            </div>
          </div>

          {/* Floating Card 2: Accuracy */}
          <div style={{ position: 'absolute', top: '30%', right: '-5%', backgroundColor: '#0d0d14', padding: '16px 20px', borderRadius: '12px', border: '1px solid #2b2b45', boxShadow: '0 15px 35px rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 2 }}>
            <span style={{ color: '#a0a0b5', fontSize: '0.85rem' }}>Accuracy (R²)</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
              <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.4rem' }}>0.991</span>
              <div style={{ backgroundColor: 'rgba(0, 255, 128, 0.1)', color: '#00ff80', padding: '6px', borderRadius: '50%', display: 'flex' }}><FiTrendingUp /></div>
            </div>
          </div>

          {/* Floating Card 3: Confidence */}
          <div style={{ position: 'absolute', bottom: '15%', right: '15%', backgroundColor: '#0d0d14', padding: '16px 20px', borderRadius: '12px', border: '1px solid #2b2b45', boxShadow: '0 15px 35px rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 2 }}>
            <span style={{ color: '#a0a0b5', fontSize: '0.85rem' }}>Confidence</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
              <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.4rem' }}>High</span>
              <div style={{ backgroundColor: 'rgba(0, 255, 128, 0.1)', color: '#00ff80', padding: '6px', borderRadius: '50%', display: 'flex' }}><FiCheckCircle /></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Why DataSight? */}
      <h2 style={{ fontSize: '1.5rem', marginBottom: '25px' }}>Why DataSight?</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>

        {/* Feature Card 1 */}
        <div style={{ backgroundColor: '#0d0d14', padding: '24px', borderRadius: '16px', border: '1px solid #1c1c28', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          <div style={{ backgroundColor: 'rgba(0, 115, 255, 0.15)', color: '#0073ff', padding: '16px', borderRadius: '50%', fontSize: '1.5rem', display: 'flex' }}>
            <FiActivity />
          </div>
          <div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>Machine Learning</h3>
            <p style={{ color: '#a0a0b5', margin: 0, fontSize: '0.9rem', lineHeight: '1.5' }}>Advanced ML models to predict future trends with high accuracy.</p>
          </div>
        </div>

        {/* Feature Card 2 */}
        <div style={{ backgroundColor: '#0d0d14', padding: '24px', borderRadius: '16px', border: '1px solid #1c1c28', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          <div style={{ backgroundColor: 'rgba(157, 0, 255, 0.15)', color: '#b845ed', padding: '16px', borderRadius: '50%', fontSize: '1.5rem', display: 'flex' }}>
            <FiZap />
          </div>
          <div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>Real-Time Processing</h3>
            <p style={{ color: '#a0a0b5', margin: 0, fontSize: '0.9rem', lineHeight: '1.5' }}>Instant insights with real-time data processing and visualization.</p>
          </div>
        </div>

        {/* Feature Card 3 */}
        <div style={{ backgroundColor: '#0d0d14', padding: '24px', borderRadius: '16px', border: '1px solid #1c1c28', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          <div style={{ backgroundColor: 'rgba(0, 255, 128, 0.15)', color: '#00ff80', padding: '16px', borderRadius: '50%', fontSize: '1.5rem', display: 'flex' }}>
            <FiFileText />
          </div>
          <div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>Automated Reports</h3>
            <p style={{ color: '#a0a0b5', margin: 0, fontSize: '0.9rem', lineHeight: '1.5' }}>Generate and download professional PDF reports in one click.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;