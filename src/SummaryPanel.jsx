import React from 'react';

function SummaryPanel({ totalUsers, totalRevenue }) {
  return (
    <div className="summary-panel">
      <div className="summary-box">
        <h4>Total Users</h4>
        <p className="summary-value">{totalUsers}</p>
      </div>
      <div className="summary-box highlight">
        <h4>Total Revenue</h4>
        <p className="summary-value">${totalRevenue}</p>
      </div>
    </div>
  );
}

export default SummaryPanel;