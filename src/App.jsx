import { useState } from 'react';
import DataTable from './pages/DataTable';
import Home from './pages/Home';
import { Routes, Route, Link } from 'react-router-dom';
import { FiPieChart, FiCpu, FiUser, FiMenu, FiX, FiHome } from 'react-icons/fi';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Developer from './pages/Developer';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="app-container">
      {/* Mobile Top Header (Hidden on Desktop via App.css) */}
      <div className="mobile-header">
        <h2>DataSight</h2>
        <button
          className="menu-toggle-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Dark Overlay when mobile drawer is open */}
      {menuOpen && <div className="sidebar-overlay" onClick={closeMenu}></div>}

      {/* Persistent Sidebar Navigation */}
      <nav className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <h2 className="desktop-logo">DataSight</h2>
        <ul className="nav-links">
          <li><Link to="/" onClick={closeMenu}><FiHome /> Home</Link></li>
          <li><Link to="/dashboard" onClick={closeMenu}><FiPieChart /> Dashboard</Link></li>
          <li><Link to="/about" onClick={closeMenu}><FiCpu /> Engine Overview</Link></li>
          <li><Link to="/developer" onClick={closeMenu}><FiUser /> About Developer</Link></li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <main className="content-area">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/data" element={<DataTable />} />
          <Route path="/about" element={<About />} />
          <Route path="/developer" element={<Developer />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;