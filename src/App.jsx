import React, { useState, useMemo } from 'react';
import './App.css';
import StatCard from './StatCard';
import TechBadge from './TechBadge';
import SummaryPanel from './SummaryPanel';
import RevenueChart from './RevenueChart';

function App() {
  // 1. Initialize State (null means no file uploaded yet)
  const [data, setData] = useState(null);
  // NEW: State to hold the Scikit-Learn prediction from Python
  const [predictedRevenue, setPredictedRevenue] = useState(null); 

  // 2. The File Ingestion Engine
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    // Notice the 'async' keyword added here so we can await the Python backend
    reader.onload = async (e) => { 
      try {
        const json = JSON.parse(e.target.result);
        setData(json); // Inject the uploaded data into React state

        // --- NEW PREDICTIVE API BRIDGE ---
        // As soon as React parses the JSON, we shoot a copy to your ML backend
        try {
          const response = await fetch("http://127.0.0.1:8000/analyze", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(json), // Transporting the data
          });

          if (!response.ok) throw new Error("Network response was not ok");

          const backendResult = await response.json();
          console.log("Brain Engine Response:", backendResult);
          
          // Save the AI prediction to your React state
          setPredictedRevenue(backendResult.predicted_next_day_revenue);

        } catch (error) {
          console.error("Failed to connect to the predictive engine:", error);
        }
        // ---------------------------------

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
            
            {/* NEW: Display the AI Prediction here */}
            {predictedRevenue !== null && (
              <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#1e1e2f', borderRadius: '12px', border: '1px solid #4a4a6a' }}>
                <h3 style={{ color: '#00d2ff', margin: 0 }}>AI Predicted Next Day Revenue</h3>
               <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '10px 0 0 0', color: '#ffffff' }}>
  ${predictedRevenue}
</p>
              </div>
            )}

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