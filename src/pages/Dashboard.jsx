const [errorMessage, setErrorMessage] = useState(null);
const [processingTime, setProcessingTime] = useState(null);
import React, { useState, useRef, useMemo } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import TechBadge from '../TechBadge';
import SummaryPanel from '../SummaryPanel';
import Papa from 'papaparse';
import RevenueChart from '../RevenueChart';
import { useNavigate } from 'react-router-dom'; // Make sure you import this!
function Dashboard() {

  // 1. Initialize State (null means no file uploaded yet)
 const [data, setData] = useState(() => JSON.parse(sessionStorage.getItem('dashboardData')) || null);
  // NEW: State to hold the Scikit-Learn prediction from Python (with Session Storage)
  const [mlData, setMlData] = useState(() => JSON.parse(sessionStorage.getItem('dashboardMlData')) || null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef(null); 
  const navigate = useNavigate();
  // 2.We are adding The Multi-Format File Ingestion Engine

    const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Reset previous states
    setIsLoading(true);
    setErrorMessage(null);
    setProcessingTime(null);

    // ⏱️ Start the performance timer
    const startTime = performance.now();

    try {
      // 1. Pack the raw file into a FormData object (Bypasses JSON parsing completely)
      const formData = new FormData();
      formData.append("file", file);

      // 2. Send directly to your new heavy-duty backend endpoint
      const response = await fetch("http://localhost:8000/analyze/upload", {
        method: "POST",
        body: formData,
        // Note: NEVER set 'Content-Type' manually when using FormData. 
        // The browser handles the multipart boundary automatically.
      });

      const result = await response.json();

      // 3. Handle FastAPI's specific error messages gracefully
      if (!response.ok) {
        throw new Error(result.detail || "An error occurred during analysis.");
      }

      // ⏱️ Stop the timer
      const endTime = performance.now();
      const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // Convert to seconds

      // 4. Update the UI with the ML predictions and the speed metric
      setProcessingTime(timeTaken);
      setMlData(result);
      
      // Note: If you still need the raw 'data' state for your DataTable preview, 
      // you can keep your existing PapaParse logic here, but limit it to the first 100 rows!

    } catch (error) {
      console.error("Upload failed:", error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 3. Update Aggregates (Pulled directly from the Python AI Engine!)
  const totalRevenue = mlData?.computed_total_revenue || 0;
  const totalUsers = mlData?.computed_average_users || 0;

// PDF Generator Engine
  const generatePDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);

    try {
      // Take a high-res snapshot of the dashboard
      const canvas = await html2canvas(reportRef.current, { 
        backgroundColor: '#0f0f1a', 
        scale: 2 
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // Create PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // Paste snapshot and download
      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save('DataSight_Forecast_Report.pdf');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF.');
    } finally {
      setIsExporting(false);
    }
  };
// Reset Function to clear memory and start fresh
  const resetDashboard = () => {
    setData(null);
    setMlData(null);
    sessionStorage.removeItem('dashboardData');
    sessionStorage.removeItem('dashboardMlData');
  };
  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <h1>My Analytics Dashboard</h1>
      </header>

    {/* The Upload Area - Hides entirely once data is successfully loaded */}
      {!data && (
        <div className="upload-zone" style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#ffffff', marginBottom: '10px' }}>Upload Dataset</h3>
          {isLoading ? (
            <div style={{ color: '#00d2ff', marginTop: '20px', fontWeight: 'bold', fontSize: '1.2rem' }}>
              ⚙️ AI Engine is analyzing data...
            </div>
          ) : (
            <label className="custom-file-upload">
              <input
                type="file"
                accept=".json, .csv"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              Select CSV Dataset
            </label>
          )}
        </div>
      )}

      
     {/* The Action Buttons (Reset, Raw Data, PDF) */}
      {mlData && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '20px' }}>
          
          <button 
            onClick={resetDashboard}
            style={{
              backgroundColor: 'transparent',
              color: '#ff3d00',
              padding: '12px 24px',
              borderRadius: '8px',
              border: '1px solid #ff3d00',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            🔄 Reset
          </button>

          <button 
            onClick={() => navigate('/data', { state: { data: data } })} 
            style={{
              backgroundColor: '#161625',
              color: '#00d2ff',
              padding: '12px 24px',
              borderRadius: '8px',
              border: '1px solid #00d2ff',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            📊 View Raw Data
          </button>

          <button 
            onClick={generatePDF} 
            disabled={isExporting}
            style={{
              backgroundColor: isExporting ? '#2b2b45' : '#00d2ff',
              color: isExporting ? '#a0a0b5' : '#000',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 'bold',
              cursor: isExporting ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 12px rgba(0, 210, 255, 0.3)'
            }}
          >
            {isExporting ? '📸 Generating PDF...' : '📥 Download PDF Report'}
          </button>
        </div>
      )}

      {/* The PDF Target Zone - Everything in here gets exported! */}
      <div ref={reportRef} style={{ padding: '10px' }}>
        
        {/* Enterprise ML Metrics Grid */}
        {mlData && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginTop: '30px',
            marginBottom: '30px'
          }}>
            <div style={{ backgroundColor: '#161625', padding: '24px', borderRadius: '16px', border: '1px solid #2b2b45', textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
              <h3 style={{ color: '#00d2ff', margin: '0 0 10px 0' }}>Predicted Revenue</h3>
              <p style={{ fontSize: '2.2rem', fontWeight: 'bold', margin: 0, color: '#ffffff' }}>
                ${mlData.predicted_next_day_revenue}
              </p>
            </div>

            <div style={{ backgroundColor: '#161625', padding: '24px', borderRadius: '16px', border: '1px solid #2b2b45', textAlign: 'center' }}>
              <h3 style={{ color: '#00d2ff', margin: '0 0 10px 0' }}>Expected Range</h3>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '15px 0 0 0', color: '#a0a0b5' }}>
                ${mlData.prediction_lower_bound} - ${mlData.prediction_upper_bound}
              </p>
              <p style={{ fontSize: '0.85rem', color: '#6b6b85', margin: '8px 0 0 0' }}>Based on 95% confidence interval</p>
            </div>

            <div style={{ backgroundColor: '#161625', padding: '24px', borderRadius: '16px', border: '1px solid #2b2b45', textAlign: 'center' }}>
              <h3 style={{ color: '#00d2ff', margin: '0 0 10px 0' }}>Model Health</h3>
              <p style={{ 
                fontSize: '1.2rem', 
                fontWeight: 'bold', 
                margin: '15px 0 5px 0', 
                color: mlData.model_confidence === 'high' ? '#00e676' : mlData.model_confidence === 'medium' ? '#ffea00' : '#ff3d00' 
              }}>
                {mlData.model_confidence.toUpperCase()} CONFIDENCE
              </p>
              <p style={{ fontSize: '0.9rem', color: '#a0a0b5', margin: 0 }}>
                Accuracy Score (R²): {mlData.model_r2}
              </p>
            </div>
          </div>
        )}

        <RevenueChart data={data} mlData={mlData} />
      </div>
      
    </div>
  );
}

export default Dashboard;