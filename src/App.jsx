import { Routes, Route, Link } from 'react-router-dom';
import { FiPieChart, FiCpu } from 'react-icons/fi';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Persistent Sidebar Navigation */}
      <nav className="sidebar">
        <h2>DataSight</h2>
        <ul className="nav-links">
          <li>
            <Link to="/"><FiPieChart /> Dashboard</Link>
          </li>
          <li>
            <Link to="/about"><FiCpu /> Engine Overview</Link>
          </li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <main className="content-area">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;