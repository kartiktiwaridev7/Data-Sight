import React from 'react';
import data from './data.json';
import './App.css';
import StatCard from './StatCard';
import TechBadge from './TechBadge'; // Import the new component

function App() {
  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <h1>My Analytics Dashboard</h1>
        {/* Render the badges dynamically */}
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