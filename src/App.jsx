import React, { useState, useMemo } from 'react';
import './App.css';
import StatCard from './StatCard';
import TechBadge from './TechBadge';
import SummaryPanel from './SummaryPanel';
import RevenueChart from './RevenueChart';

function App() {
  // 1. Initialize State (null means no file uploaded yet)
  const [data, setData] = useState(null);

  // 2. The File Ingestion Engine
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        setData(json); // Inject the uploaded data into React state
      } catch (error) {
        alert("Error: Please upload a valid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  // 3. Update Aggregates (Safeguard against null data)
  const totalRevenue = useMemo(() => {
    if (!data) return 0;
    return data.reduce((sum, day) => sum + day.revenue, 0);
  }, [data]);

  const totalUsers = useMemo(() => {
    if (!data) return 0;
    return data.reduce((sum, day) => sum + day.users, 0);
  }, [data]);

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <h1>My Analytics Dashboard</h1>
        
        {/* The Upload Input */}
        {!data && (
          <div style={{ margin: '40px 0', padding: '40px', border: '2px dashed #cbd5e1', borderRadius: '12px' }}>
            <h3 style={{ marginTop: 0 }}>Upload Dataset</h3>
            <input 
              type="file" 
              accept=".json" 
              onChange={handleFileUpload} 
              style={{ fontSize: '1rem', cursor: 'pointer' }}
            />
          </div>
        )}

        {/* Render Summary and Badges ONLY if data exists */}
        {data && (
          <>
            <SummaryPanel totalUsers={totalUsers} totalRevenue={totalRevenue} />
            <div className="badge-container">
              <TechBadge name="React" />
              <TechBadge name="Vite" />
              <TechBadge name="CSS Grid" />
            </div>
          </>
        )}
      </header>
      
      {/* Render Chart and Grid ONLY if data exists */}
      {data && (
        <>
          <RevenueChart data={data} />
          <main className="dashboard-grid">
            {data.map((dayData, index) => (
              <StatCard 
                key={index} 
                date={dayData.date} 
                users={dayData.users} 
                revenue={dayData.revenue} 
              />
            ))}
          </main>
        </>
      )}
    </div>
  );
}

export default App;