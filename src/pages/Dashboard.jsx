import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Papa from 'papaparse';
import RevenueChart from '../RevenueChart';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [processingTime, setProcessingTime] = useState(null);
  const [data, setData] = useState(() => JSON.parse(sessionStorage.getItem('dashboardData')) || null);
  const [mlData, setMlData] = useState(() => JSON.parse(sessionStorage.getItem('dashboardMlData')) || null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef(null);
  const navigate = useNavigate();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setErrorMessage(null);
    setProcessingTime(null);

    const startTime = performance.now();

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8000/analyze/upload", {
        method: "POST",
        body: formData,
        // Note: NEVER set 'Content-Type' manually when using FormData.
        // The browser handles the multipart boundary automatically.
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || "An error occurred during analysis.");
      }

      const endTime = performance.now();
      const timeTaken = ((endTime - startTime) / 1000).toFixed(2);

      setProcessingTime(timeTaken);
      setMlData(result);

      // Lightweight preview for the chart (first 150 rows only, to keep
      // React memory light on very large files). The AI metrics above
      // (totals, prediction) still come from the FULL dataset via mlData,
      // computed server-side -- only the chart's historical line is capped.
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        preview: 150,
        transformHeader: (header) => header.trim(),
        complete: (results) => {
          setData(results.data);
          sessionStorage.setItem('dashboardData', JSON.stringify(results.data));
          sessionStorage.setItem('dashboardMlData', JSON.stringify(result));
        }
      });

    } catch (error) {
      console.error("Upload failed:", error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // PDF Generator Engine
  const generatePDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);

    try {
      const canvas = await html2canvas(reportRef.current, {
        backgroundColor: '#0f0f1a',
        scale: 2
      });

      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save('DataSight_Forecast_Report.pdf');

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF.');
    } finally {
      setIsExporting(false);
    }
  };

  const resetDashboard = () => {
    setData(null);
    setMlData(null);
    setErrorMessage(null);
    setProcessingTime(null);
    sessionStorage.removeItem('dashboardData');
    sessionStorage.removeItem('dashboardMlData');
  };

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <h1>My Analytics Dashboard</h1>
      </header>

      {errorMessage && (
        <div style={{
          backgroundColor: 'rgba(255, 61, 0, 0.1)',
          border: '1px solid #ff3d00',
          color: '#ff3d00',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          ⚠️ {errorMessage}
        </div>
      )}

      {processingTime && (
        <div style={{
          textAlign: 'right',
          color: '#00ff80',
          fontSize: '0.9rem',
          marginBottom: '15px',
          fontWeight: 'bold'
        }}>
          ⚡ AI Engine Processed in: {processingTime}s
        </div>
      )}

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

      <div ref={reportRef} style={{ padding: '10px' }}>

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
                {mlData.model_confidence?.toUpperCase()}
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