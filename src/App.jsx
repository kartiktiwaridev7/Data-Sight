import DataTable from './pages/DataTable';
import { Routes, Route, Link } from 'react-router-dom';
import { FiPieChart, FiCpu, FiUser } from 'react-icons/fi';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Developer from './pages/Developer';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Persistent Sidebar Navigation */}
      <nav className="sidebar">
        <h2>DataSight</h2>
        <ul className="nav-links">
          <li><Link to="/"><FiPieChart /> Dashboard</Link></li>
          <li><Link to="/about"><FiCpu /> Engine Overview</Link></li>
          <li><Link to="/developer"><FiUser /> About Developer</Link></li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <main className="content-area">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/developer" element={<Developer />} />
          <Route path="/data" element={<DataTable />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;