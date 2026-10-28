import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DataTable({ data: propData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 100;
  const navigate = useNavigate();

  // State Recovery from browser memory
  const rawSessionData = sessionStorage.getItem('dashboardData');
  const data = propData || (rawSessionData ? JSON.parse(rawSessionData) : null);

  if (!data || data.length === 0) {
    return (
      <div style={{ padding: 'clamp(16px, 4vw, 32px)', color: '#a0a0b5', textAlign: 'center' }}>
        <p style={{ marginBottom: '16px' }}>
          No raw data available. Please upload a dataset on the Dashboard.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#00d2ff',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Dynamic Schema Detection
  const headers = Object.keys(data[0] || {});

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div
      style={{
        padding: 'clamp(12px, 3vw, 24px)',
        color: '#ffffff',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      {/* Responsive Top Header Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '8px 14px',
              backgroundColor: '#161625',
              color: '#00d2ff',
              border: '1px solid #2b2b45',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.85rem',
            }}
          >
            ← Back
          </button>
          <h2 style={{ margin: 0, color: '#00d2ff', fontSize: 'clamp(1.25rem, 3vw, 1.6rem)' }}>
            Raw Data Viewer
          </h2>
        </div>

        <div style={{ color: '#a0a0b5', fontSize: '0.9rem' }}>
          Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, data.length)} of {data.length} rows
        </div>
      </div>

      {/* Contained Horizontal Scroll Wrapper */}
      <div
        style={{
          width: '100%',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          backgroundColor: '#161625',
          borderRadius: '8px',
          border: '1px solid #2b2b45',
          boxSizing: 'border-box',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            whiteSpace: 'nowrap',
            fontSize: 'clamp(0.8rem, 1.5vw, 0.92rem)',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#1c1c28', borderBottom: '2px solid #2b2b45' }}>
              {headers.map((header, index) => (
                <th
                  key={index}
                  style={{
                    padding: 'clamp(10px, 2vw, 12px) clamp(12px, 2.5vw, 15px)',
                    color: '#00d2ff',
                    textTransform: 'capitalize',
                  }}
                >
                  {header.replace(/_/g, ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, rowIndex) => (
              <tr key={rowIndex} style={{ borderBottom: '1px solid #2b2b45' }}>
                {headers.map((header, colIndex) => {
                  const cellValue = row[header];
                  const isNumber = typeof cellValue === 'number';

                  return (
                    <td
                      key={colIndex}
                      style={{
                        padding: 'clamp(8px, 1.8vw, 10px) clamp(12px, 2.5vw, 15px)',
                        color: '#e0e0e0',
                      }}
                    >
                      {isNumber && header.toLowerCase().includes('revenue')
                        ? `$${cellValue.toFixed(2)}`
                        : cellValue}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Responsive Pagination Controls */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px',
          gap: '15px',
        }}
      >
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          style={{
            padding: '8px 16px',
            backgroundColor: currentPage === 1 ? '#2b2b45' : '#00d2ff',
            color: currentPage === 1 ? '#a0a0b5' : '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
          }}
        >
          Previous
        </button>
        <span style={{ color: '#a0a0b5', fontSize: '0.9rem' }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          style={{
            padding: '8px 16px',
            backgroundColor: currentPage === totalPages ? '#2b2b45' : '#00d2ff',
            color: currentPage === totalPages ? '#a0a0b5' : '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DataTable;