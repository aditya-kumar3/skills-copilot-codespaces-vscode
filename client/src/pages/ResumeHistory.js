import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { resumeService } from '../services/api';

function ResumeHistory() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedResume, setSelectedResume] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await resumeService.getAllResumes();
      setResumes(response.data.data || []);
    } catch (err) {
      setError('Failed to load resume history');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await resumeService.deleteResume(id);
        setResumes(resumes.filter((r) => r.id !== id));
        setSelectedResume(null);
      } catch (err) {
        setError('Failed to delete resume');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="navbar">
        <h1>📄 Resume ATS Checker</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/check">Check Resume</Link>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {!selectedResume ? (
        <div className="card">
          <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>
            Resume History
          </h2>

          {error && <div className="error">{error}</div>}

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: '#666' }}>Loading resume history...</p>
            </div>
          ) : resumes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: '#666', marginBottom: '1rem' }}>
                No resume checks yet. Start by checking your resume!
              </p>
              <Link to="/check">
                <button className="btn btn-primary">Check Resume</button>
              </Link>
            </div>
          ) : (
            <table className="history-table">
              <thead>
                <tr>
                  <th>Filename</th>
                  <th>ATS Score</th>
                  <th>Format Score</th>
                  <th>Structure Score</th>
                  <th>Keyword Score</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {resumes.map((resume) => (
                  <tr key={resume.id}>
                    <td>{resume.filename}</td>
                    <td>
                      <strong style={{ color: '#667eea' }}>
                        {resume.atsScore.overall}/100
                      </strong>
                    </td>
                    <td>{resume.atsScore.formatting}/30</td>
                    <td>{resume.atsScore.structure}/30</td>
                    <td>{resume.atsScore.keyword}/40</td>
                    <td>
                      {new Date(resume.uploadedAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setSelectedResume(resume)}
                        style={{ marginRight: '0.5rem' }}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(resume.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div className="card">
          <h2 style={{ color: '#333', marginBottom: '2rem' }}>
            Resume: {selectedResume.filename}
          </h2>

          <div className="score-card">
            <div>
              <div className="score-value">{selectedResume.atsScore.overall}</div>
              <div className="score-label">Overall ATS Score</div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${(selectedResume.atsScore.overall / 100) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <div className="score-card">
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#667eea' }}>
                  {selectedResume.atsScore.formatting}
                </div>
                <div className="score-label">Formatting Score</div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(selectedResume.atsScore.formatting / 30) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="score-card">
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#667eea' }}>
                  {selectedResume.atsScore.structure}
                </div>
                <div className="score-label">Structure Score</div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(selectedResume.atsScore.structure / 30) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="score-card">
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#667eea' }}>
                  {selectedResume.atsScore.keyword}
                </div>
                <div className="score-label">Keyword Score</div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(selectedResume.atsScore.keyword / 40) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {selectedResume.atsScore.feedback && selectedResume.atsScore.feedback.length > 0 && (
            <div className="feedback-list">
              <h3>Feedback & Recommendations</h3>
              <ul>
                {selectedResume.atsScore.feedback.map((item, index) => (
                  <li key={index}>✓ {item}</li>
                ))}
              </ul>
            </div>
          )}

          {selectedResume.detectedSections && (
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ color: '#333', marginBottom: '1rem' }}>Detected Resume Sections</h3>
              <div className="sections-grid">
                {selectedResume.detectedSections.contact && (
                  <div className="section-card">
                    <h4>📧 Contact</h4>
                    <p>
                      {selectedResume.detectedSections.contact.substring(0, 100)}...
                    </p>
                  </div>
                )}
                {selectedResume.detectedSections.experience && selectedResume.detectedSections.experience.length > 0 && (
                  <div className="section-card">
                    <h4>💼 Experience</h4>
                    <p>{selectedResume.detectedSections.experience.length} entries</p>
                  </div>
                )}
                {selectedResume.detectedSections.education && selectedResume.detectedSections.education.length > 0 && (
                  <div className="section-card">
                    <h4>🎓 Education</h4>
                    <p>{selectedResume.detectedSections.education.length} entries</p>
                  </div>
                )}
                {selectedResume.detectedSections.skills && selectedResume.detectedSections.skills.length > 0 && (
                  <div className="section-card">
                    <h4>🛠️ Skills</h4>
                    <p>{selectedResume.detectedSections.skills.length} entries</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <button
              className="btn btn-secondary"
              onClick={() => setSelectedResume(null)}
              style={{ flex: 1 }}
            >
              Back to History
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleDelete(selectedResume.id);
              }}
              style={{ flex: 1 }}
            >
              Delete Resume
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeHistory;
