import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VisitorEntryPage } from './pages/VisitorEntryPage';
import { GuardScanPage } from './pages/GuardScanPage';

function App() {
  return (
    <BrowserRouter>
      {/* Animated background orbs */}
      <div className="app-background" />

      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <a href="/" className="app-logo">
            <div className="app-logo-icon">🔐</div>
            <div className="app-logo-text">
              <span>VisitorQR</span>
            </div>
          </a>
          <nav className="app-nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `app-nav-link${isActive ? ' active' : ''}`
              }
            >
              Entry
            </NavLink>
            <NavLink
              to="/scan"
              className={({ isActive }) =>
                `app-nav-link${isActive ? ' active' : ''}`
              }
            >
              Guard Scan
            </NavLink>
          </nav>
        </header>

        {/* Page content */}
        <main className="page-content">
          <Routes>
            <Route path="/" element={<VisitorEntryPage />} />
            <Route path="/scan" element={<GuardScanPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
