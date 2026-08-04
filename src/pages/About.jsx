import React from 'react';
import '../App.css';

function About() {
  return (
    <div className="about-page">
      <h2 style={{ color: '#00d2ff', marginTop: 0 }}>Machine Learning Engine Overview</h2>
      
      <p style={{ fontSize: '1.1rem', color: '#e0e0e0', lineHeight: '1.6' }}>
        This analytics platform bridges a modern user interface with a custom Python predictive backend, designed to process historical revenue data and forecast future trends.
      </p>

      <div style={{ 
        backgroundColor: '#161625', 
        padding: '24px', 
        borderRadius: '16px', 
        border: '1px solid #2b2b45',
        marginTop: '30px' 
      }}>
        <h3 style={{ color: '#ffffff', borderBottom: '1px solid #2b2b45', paddingBottom: '10px' }}>
          System Architecture
        </h3>
        
        <ul style={{ color: '#a0a0b5', lineHeight: '2', fontSize: '1.05rem' }}>
          <li><strong>Data Ingestion:</strong> The frontend utilizes PapaParse to securely read and format user-uploaded CSV datasets directly in the browser.</li>
          <li><strong>API Pipeline:</strong> Processed data is packaged and transmitted via an asynchronous fetch request to a local FastAPI server.</li>
          <li><strong>Predictive Modeling:</strong> A customized Scikit-Learn algorithm analyzes the sequential data payload to calculate and return the predicted next-day revenue.</li>
        </ul>
      </div>
    </div>
  );
}

export default About;