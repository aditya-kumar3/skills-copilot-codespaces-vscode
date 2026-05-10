import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { resumeService } from '../services/api';

function CheckResume() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (
        !['application/pdf', 'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ].includes(selectedFile.type)
      ) {
        setError('Only PDF and DOCX files are supported');
        setFile(null);
      } else {
        setError('');
        setFile(selectedFile);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFileChange({ target: { files: [droppedFile] } });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a resume file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await resumeService.uploadResume(file, jobDescription);
      setResult(response.data.data);
      setFile(null);
      setJobDescription('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze resume. Please try again.');
    } finally {
      setLoading(false);
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
          <Link to="/history">History</Link>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {!result ? (
        <div className="card">
          <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>
            Check Your Resume
          </h2>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Upload Resume (PDF or DOCX)</label>
              <div
                className="file-upload"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.doc"
                  style={{ display: 'none' }}
                  id="file-input"
                />
                <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📁</div>
                  <div style={{ color: '#667eea', fontWeight: 'bold' }}>
                    Drag and drop your resume here or click to browse
                  </div>
                  <div style={{ color: '#999', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    {file ? file.name : 'Supported formats: PDF, DOCX'}
                  </div>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="job-description">
                Job Description (Optional - for keyword matching)
              </label>
              <textarea
                id="job-description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here to match keywords..."
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !file}
              style={{ width: '100%' }}
            >
              {loading ? 'Analyzing...' : 'Check Resume'}
            </button>
          </form>
        </div>
      ) : (
        <div className="card">
          <h2 style={{ color: '#333', marginBottom: '2rem' }}>ATS Analysis Results</h2>

          <div className="score-card">
            <div>
              <div className="score-value">{result.atsScore.overall}</div>
              <div className="score-label">Overall ATS Score</div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${(result.atsScore.overall / 100) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <div className="score-card">
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#667eea' }}>
                  {result.atsScore.formatting}
                </div>
                <div className="score-label">Formatting Score</div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(result.atsScore.formatting / 30) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="score-card">
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#667eea' }}>
                  {result.atsScore.structure}
                </div>
                <div className="score-label">Structure Score</div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(result.atsScore.structure / 30) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="score-card">
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#667eea' }}>
                  {result.atsScore.keyword}
                </div>
                <div className="score-label">Keyword Score</div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(result.atsScore.keyword / 40) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {result.atsScore.feedback && result.atsScore.feedback.length > 0 && (
            <div className="feedback-list">
              <h3>Feedback & Recommendations</h3>
              <ul>
                {result.atsScore.feedback.map((item, index) => (
                  <li key={index}>✓ {item}</li>
                ))}
              </ul>
            </div>
          )}

          {result.detectedSections && (
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ color: '#333', marginBottom: '1rem' }}>Detected Resume Sections</h3>
              <div className="sections-grid">
                {result.detectedSections.contact && (
                  <div className="section-card">
                    <h4>📧 Contact</h4>
                    <p>{result.detectedSections.contact.substring(0, 100)}...</p>
                  </div>
                )}
                {result.detectedSections.summary && (
                  <div className="section-card">
                    <h4>📝 Summary</h4>
                    <p>{result.detectedSections.summary.substring(0, 100)}...</p>
                  </div>
                )}
                {result.detectedSections.experience && result.detectedSections.experience.length > 0 && (
                  <div className="section-card">
                    <h4>💼 Experience</h4>
                    <p>{result.detectedSections.experience.length} entries found</p>
                  </div>
                )}
                {result.detectedSections.education && result.detectedSections.education.length > 0 && (
                  <div className="section-card">
                    <h4>🎓 Education</h4>
                    <p>{result.detectedSections.education.length} entries found</p>
                  </div>
                )}
                {result.detectedSections.skills && result.detectedSections.skills.length > 0 && (
                  <div className="section-card">
                    <h4>🛠️ Skills</h4>
                    <p>{result.detectedSections.skills.length} entries found</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <button
              className="btn btn-primary"
              onClick={() => setResult(null)}
              style={{ flex: 1 }}
            >
              Check Another Resume
            </button>
            <Link to="/history" style={{ flex: 1 }}>
              <button className="btn btn-secondary" style={{ width: '100%' }}>
                View History
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckResume;
