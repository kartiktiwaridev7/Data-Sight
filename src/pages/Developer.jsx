import React from 'react';
import { FiUser, FiMapPin, FiBookOpen, FiCode } from 'react-icons/fi';
import '../App.css';

function Developer() {
  return (
    <div className="about-page">
      <h2 style={{ color: '#00d2ff', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FiUser /> About the Developer
      </h2>

      <div style={{
        backgroundColor: '#161625',
        padding: '30px',
        borderRadius: '16px',
        border: '1px solid #2b2b45',
        marginTop: '20px'
      }}>
        <h1 style={{ color: '#ffffff', margin: '0 0 10px 0' }}>Kartik Tiwari</h1>
        <p style={{ color: '#00d2ff', margin: '0 0 20px 0', fontSize: '1.1rem' }}>
          Frontend & Machine Learning Developer
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#a0a0b5', marginBottom: '30px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FiMapPin /> Ghaziabad, India</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FiBookOpen /> Final-Year BCA Student at CCSU</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FiCode /> Specialized in React, Python, and Predictive Modeling</span>
        </div>

        <h3 style={{ color: '#ffffff', borderBottom: '1px solid #2b2b45', paddingBottom: '10px' }}>
          Professional Focus
        </h3>
        <p style={{ color: '#a0a0b5', lineHeight: '1.8' }}>
          I specialize in bridging the gap between clean, modern user interfaces and intelligent backend systems. My core focus is on frontend web development and integrating machine learning models—deliberately focusing on AI-driven web applications rather than traditional Java tracks.
        </p>
        <p style={{ color: '#a0a0b5', lineHeight: '1.8' }}>
          Past projects include deploying full-pipeline applications like <strong>CardioCore</strong> (a web-based hospital application featuring a heart disease prediction model), combining responsive React UIs with Scikit-Learn backends. When I am not architecting code, I focus on personal well-being through Gym , Reading Book , and Travelling with the freinds .
        </p>
      </div>
    </div>
  );
}

export default Developer;