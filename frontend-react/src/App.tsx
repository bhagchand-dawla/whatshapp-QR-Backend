import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VisitorEntryPage } from './pages/VisitorEntryPage';

function App() {
  return (
    <BrowserRouter>
      {/* Animated background orbs */}
      <div className="app-background" />

      <div className="app-container">
        {/* Header - Simple Logo Only */}
        <header className="app-header" style={{ justifyContent: 'center' }}>
          <a href="/" className="app-logo">
            <div className="app-logo-icon">🏯</div>
            <div className="app-logo-text">
              <span>Temple Entry</span>
            </div>
          </a>
        </header>

        {/* Page content */}
        <main className="page-content">
          <Routes>
            <Route path="/" element={<VisitorEntryPage />} />
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
