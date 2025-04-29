import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import AuditResults from './pages/AuditResults';
import CaseStudies from './pages/CaseStudies';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 to-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/results" element={<AuditResults />} />
          <Route path="/case-studies" element={<CaseStudies />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;