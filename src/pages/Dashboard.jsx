import React, { useState, useMemo } from 'react';
import '../App.css';
import StatCard from '../StatCard';
import TechBadge from '../TechBadge';
import SummaryPanel from '../SummaryPanel';
import Papa from 'papaparse';
import RevenueChart from '../RevenueChart';

function Dashboard() {

  // 1. Initialize State (null means no file uploaded yet)
  const [data, setData] = useState(null);
  // NEW: State to hold the Scikit-Learn prediction from Python
  const [predictedRevenue, setPredictedRevenue] = useState(null); 


  // 2.We are adding The Multi-Format File Ingestion Engine
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Grab the file extension (json or csv)
    const fileExtension = file.name.split('.').pop().toLowerCase();

    // Helper function to send processed data to the Python Backend
    const processAndSendData = async (parsedData) => {
      setData(parsedData); // Update charts
      try {
        const response = await fetch("http://127.0.0.1:8000/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsedData), 
        });

        if (!response.ok) throw new Error("Network response was not ok");
        const backendResult = await response.json();
        setPredictedRevenue(backendResult.predicted_next_day_revenue);
      } catch (error) {
        console.error("Failed to connect to the predictive engine:", error);
      }
    };

    // Route 1: Handle JSON Files
    if (fileExtension === 'json') {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const json = JSON.parse(e.target.result);
          await processAndSendData(json);
        } catch (error) {
          alert("Error: Please upload a valid JSON file.");
        }
      };
      reader.readAsText(file);
    } 
    // Route 2: Handle CSV Files using Papa Parse
    
     // Route 2: Handle CSV Files using Papa Parse
    else if (fileExtension === 'csv') {
      Papa.parse(file, {
        header: true, // Tells the parser the first row contains the column names
        dynamicTyping: true, // MAGIC FEATURE: Automatically converts string numbers into real math numbers
        skipEmptyLines: true, // MAGIC FIX 1: Ignores trailing blank lines at the bottom of the CSV
        transformHeader: (header) => header.trim(), // MAGIC FIX 2: Removes accidental spaces in column names
        complete: async (results) => {
          // results.data contains the perfectly formatted JSON array
          await processAndSendData(results.data);
        },
        error: (error) => {
          alert("Error parsing CSV file:", error);
        }
     });
    } else {
      alert("Please upload a .json or .csv file");
    }
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
          <div className="upload-zone">
            <h3>Upload Dataset</h3>
            <input
              type="file"
              accept=".json, .csv"
              onChange={handleFileUpload}
            />
          </div>
        )}

        {/* Render Summary and Badges ONLY if data exists */}
        {data && (
          <>
            {/* I commented this line out because this is for the numbers in my dashboard */}
            {/* <SummaryPanel totalUsers={totalUsers} totalRevenue={totalRevenue} /> */}

            {/* NEW: Display the AI Prediction here */}
            {predictedRevenue !== null && (
              <div className="ai-predict-panel">
                <h3>AI Predicted Next Day Revenue</h3>
                <p>${predictedRevenue}</p>
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
    {/* Render Chart and AI Prediction ONLY if data exists */}
      {data && (
        <>
          {predictedRevenue !== null && (
            <div style={{
              margin: '20px auto 30px auto',
              padding: '24px',
              backgroundColor: '#161625',
              borderRadius: '16px',
              border: '1px solid #2b2b45',
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
            }}>
              <h3 style={{ color: '#00d2ff', margin: 0, fontSize: '1.2rem' }}>
                AI Predicted Next Day Revenue
              </h3>
              <p style={{ fontSize: '2.2rem', fontWeight: 'bold', margin: '12px 0 0 0', color: '#ffffff' }}>
                ${predictedRevenue}
              </p>
            </div>
          )}

          <RevenueChart data={data} />
        </>
        
      )}
    </div>
  );
}

export default App;