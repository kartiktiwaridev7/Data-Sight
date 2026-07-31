import React, { useMemo } from 'react';
import data from './data.json';
import './App.css';
import StatCard from './StatCard';
import TechBadge from './TechBadge';
import SummaryPanel from './SummaryPanel';
import RevenueChart from './RevenueChart';

function App() {
  // 1. Calculate Aggregates
  const totalRevenue = useMemo(() => {
    return data.reduce((sum, day) => sum + day.revenue, 0);
  }, []);

  const totalUsers = useMemo(() => {
    return data.reduce((sum, day) => sum + day.users, 0);
  }, []);

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <h1>My Analytics Dashboard</h1>
        
        {/* 2. Dynamic Summary Panel */}
        <SummaryPanel totalUsers={totalUsers} totalRevenue={totalRevenue} />

        {/* 3. Technology Badges */}
        <div className="badge-container">
          <TechBadge name="React" />
          <TechBadge name="Vite" />
          <TechBadge name="CSS Grid" />
        </div>
      </header>
      
      {/* 4. Revenue Trend Visualization */}
      <RevenueChart data={data} />

      {/* 5. Detailed Daily Metrics Grid */}
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
    </div>
  );
}

export default App;