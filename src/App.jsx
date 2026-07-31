import React, { useMemo } from 'react';
import data from './data.json';
import './App.css';
import StatCard from './StatCard';
import TechBadge from './TechBadge';
import SummaryPanel from './SummaryPanel'; // 1. Import the panel

function App() {
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
        
        {/* 2. Replace debug text with the proper component */}
        <SummaryPanel totalUsers={totalUsers} totalRevenue={totalRevenue} />

        <div className="badge-container">
          <TechBadge name="React" />
          <TechBadge name="Vite" />
          <TechBadge name="CSS Grid" />
        </div>
      </header>
      
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