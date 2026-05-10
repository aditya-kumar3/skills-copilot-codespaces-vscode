import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="navbar">
        <h1>📄 Resume ATS Checker</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/history">History</Link>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#333', marginBottom: '1rem' }}>
          Welcome, {user.name}!
        </h2>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          Check your resume's ATS compatibility score. Our tool analyzes your resume
          against job description keywords, formatting, and structure to ensure it passes
          through Applicant Tracking Systems.
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>✨ Check Resume</h3>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>
            Upload your resume and get an instant ATS score with detailed feedback
          </p>
          <Link to="/check">
            <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>

        <div className="dashboard-card">
          <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>📚 View History</h3>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>
            Review all your previous resume checks and track improvements over time
          </p>
          <Link to="/history">
            <button className="btn btn-primary">View History</button>
          </Link>
        </div>

        <div className="dashboard-card">
          <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>📊 How it Works</h3>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>
            Our algorithm checks formatting, structure, and keyword matching against job descriptions
          </p>
          <button className="btn btn-secondary" disabled>
            Learn More
          </button>
        </div>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 style={{ color: '#333', marginBottom: '1rem' }}>🎯 ATS Score Breakdown</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f9f9f9', borderRadius: '4px' }}>
            <strong>Formatting (0-30 pts)</strong>
            <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Checks for ATS-friendly formatting and structure
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f9f9f9', borderRadius: '4px' }}>
            <strong>Structure (0-30 pts)</strong>
            <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Validates presence of required sections (contact, experience, education)
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f9f9f9', borderRadius: '4px' }}>
            <strong>Keywords (0-40 pts)</strong>
            <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Matches resume keywords with job description
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
