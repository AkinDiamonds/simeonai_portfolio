import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Blog from './components/Blog';
import Admin from './components/Admin';

const Layout = ({ children }) => {
  const location = useLocation();
  // Don't show Navbar/Footer on Admin
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-page text-primary font-sans selection:bg-accent-green/30 selection:text-white pb-20 relative">
      {/* Background Grid - Global */}
      <div className="bg-grid-pattern" />

      {!isAdmin && <Navbar />}

      {children}

      {!isAdmin && (
        <footer className="relative z-10 text-center py-8 text-gray-500 text-sm font-mono opacity-50">
          &copy; {new Date().getFullYear()} Akin. All systems nominal.
        </footer>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
