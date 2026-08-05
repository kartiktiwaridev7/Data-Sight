import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import TechBadge from '../TechBadge';
import SummaryPanel from '../SummaryPanel';
import Papa from 'papaparse';
import RevenueChart from '../RevenueChart';

function Dashboard() {

  // 1. Initialize State (null means no file uploaded yet)
  const [data, setData] = useState(null);
  // NEW: State to hold the Scikit-Learn prediction from Python
  const [mlData, setMlData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef(null); 

  // 2.We are adding The Multi-Format File Ingestion Engine
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Grab the file extension (json or csv)
    const fileExtension = file.name.split('.').pop().toLowerCase();

    // Helper function to send processed data to the Python Backend
  const processAndSendData = async (parsedData) => {
    setIsLoading(true); // 1. AI starts thinking

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      if (!response.ok) throw new Error("Network response was not ok");
      
      const backendResult = await response.json(); 
      setMlData(backendResult); 
      setData(parsedData); // Ensure charts get updated too
      
    } catch (error) {
      console.error("Failed to connect to the predictive engine:", error);
      alert("Error processing data. Check console.");
    } finally {
      setIsLoading(false); // 2. AI is done, turn off loading state
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

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <h1>My Analytics Dashboard</h1>
      </header>

      {/* The Upload Area */}
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

      {/* The Download Button */}
      {mlData && (
        <div style={{ textAlign: 'right', marginTop: '20px' }}>
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