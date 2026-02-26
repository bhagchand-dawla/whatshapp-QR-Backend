import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VisitorEntryPage } from './pages/VisitorEntryPage';
import { GuardScanPage } from './pages/GuardScanPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VisitorEntryPage />} />
        <Route path="/scan" element={<GuardScanPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
