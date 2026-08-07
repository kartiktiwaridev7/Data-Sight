import React, { useState } from 'react';

function DataTable({ data: propData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 100;

  // State Recovery from browser memory
  const rawSessionData = sessionStorage.getItem('dashboardData');
  const data = propData || (rawSessionData ? JSON.parse(rawSessionData) : null);

  if (!data || data.length === 0) {
    return (
      <div style={{ padding: '20px', color: '#a0a0b5', textAlign: 'center' }}>
        No raw data available. Please upload a dataset on the Dashboard.
      </div>
    );
  }

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // 🚀 INDUSTRY FIX: Dynamic Schema Detection
  // Automatically detects every column header in your CSV (whether it's 3 or 25 columns)
  const headers = Object.keys(data[0] || {});

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div style={{ padding: '20px', color: '#ffffff', maxWidth: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#00d2ff' }}>Raw Data Viewer</h2>
        <div style={{ color: '#a0a0b5', fontSize: '0.9rem' }}>
          Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, data.length)} of {data.length} rows
        </div>
      </div>

      <div style={{ overflowX: 'auto', backgroundColor: '#161625', borderRadius: '8px', border: '1px solid #2b2b45' }}>
        {/* whiteSpace: 'nowrap' ensures that 20 columns don't crush together horizontally */}
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', whiteSpace: 'nowrap' }}>
          <thead>
            <tr style={{ backgroundColor: '#1c1c28', borderBottom: '2px solid #2b2b45' }}>
              {headers.map((header, index) => (
                <th key={index} style={{ padding: '12px 15px', color: '#00d2ff', textTransform: 'capitalize' }}>
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
                    <td key={colIndex} style={{ padding: '10px 15px', color: '#e0e0e0' }}>
                      {/* Automatically format anything with 'revenue' in the name as currency */}
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

      {/* Pagination Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', gap: '15px' }}>
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
            fontWeight: 'bold'
          }}
        >
          Previous
        </button>
        <span style={{ color: '#a0a0b5' }}>
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
            fontWeight: 'bold'
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DataTable;