import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function DataTable() {
  const location = useLocation();
  const navigate = useNavigate();
 
 // This grabs data passed from the Router, or falls back to the saved session storage!
  const data = location.state?.data || JSON.parse(sessionStorage.getItem('dashboardData'));

  // If someone tries to visit this page directly without uploading first
  if (!data) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', color: '#ffffff' }}>
        <h2>No data found!</h2>
        <p style={{ color: '#a0a0b5' }}>Please upload a CSV on the Dashboard first.</p>
        <button 
          onClick={() => navigate('/')}
          style={{ padding: '10px 20px', marginTop: '20px', backgroundColor: '#00d2ff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Go Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Header and Back Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#ffffff', margin: 0 }}>Raw Dataset ({data.length} Rows)</h2>
        <button 
          onClick={() => navigate(-1)} // Takes them exactly back to where they were
          style={{ backgroundColor: '#2b2b45', color: '#ffffff', border: '1px solid #00d2ff', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* The Scrollable Dark Theme Table */}
      <div style={{ 
        backgroundColor: '#161625', 
        borderRadius: '16px', 
        border: '1px solid #2b2b45',
        maxHeight: '70vh', // Keeps it scrollable
        overflowY: 'auto'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#ffffff', textAlign: 'left' }}>
          <thead style={{ position: 'sticky', top: 0, backgroundColor: '#0f0f1a', borderBottom: '2px solid #2b2b45' }}>
            <tr>
              <th style={{ padding: '15px', color: '#00d2ff' }}>Date</th>
              <th style={{ padding: '15px', color: '#00d2ff' }}>Revenue ($)</th>
              <th style={{ padding: '15px', color: '#00d2ff' }}>Active Users</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #2b2b45' }}>
                <td style={{ padding: '12px 15px', color: '#a0a0b5' }}>{row.date}</td>
                <td style={{ padding: '12px 15px', fontWeight: 'bold' }}>{row.revenue}</td>
                <td style={{ padding: '12px 15px' }}>{row.users}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;