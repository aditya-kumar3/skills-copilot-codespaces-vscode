# Quick Start Guide

## For Development

### 1. Start the Backend Server

```bash
cd server
npm install
npm run dev
```

The backend will run on `http://localhost:5000`

### 2. Start the Frontend (in a new terminal)

```bash
cd client
npm install
npm start
```

The frontend will run on `http://localhost:3000`

### 3. Test the Application

1. Go to `http://localhost:3000` in your browser
2. Click "Create Account" or use the login page
3. Register with any email/password (demo mode uses in-memory storage)
4. Click "Check Resume" on the dashboard
5. Upload a sample resume (PDF or DOCX)
6. Optionally add a job description for keyword matching
7. View your ATS score and detailed feedback

## Features to Try

### 1. Resume Analysis
- Upload PDF or DOCX resume
- Get detailed ATS score breakdown
- View formatting, structure, and keyword scores

### 2. Job Description Matching
- Paste a job description
- See keyword matches with your resume
- Get recommendations for improvement

### 3. Resume History
- View all your previous resume checks
- Track your improvements over time
- Delete old analysis results

### 4. User Accounts
- Register for your own account
- Save resume history
- Logout securely

## Architecture Overview

### Backend (`server/`)

**Core Modules:**
- `routes/auth.js` - User authentication (register, login)
- `routes/resume.js` - Resume upload and retrieval
- `routes/ats.js` - ATS score calculation
- `utils/parser.js` - PDF/DOCX file parsing
- `utils/atsScorer.js` - ATS scoring algorithm
- `middleware/auth.js` - JWT authentication

**Dependencies:**
- express - Web framework
- multer - File upload handling
- pdf-parse - PDF text extraction
- mammoth - DOCX text extraction
- natural - NLP for keyword extraction
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication

### Frontend (`client/`)

**Pages:**
- `pages/Login.js` - User login
- `pages/Register.js` - User registration
- `pages/Dashboard.js` - Main dashboard
- `pages/CheckResume.js` - Resume analysis center
- `pages/ResumeHistory.js` - View past analyses

**Services:**
- `services/api.js` - API communication with backend

## API Reference

### Authentication

**Register User**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login User**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Resume Management

**Upload Resume**
```bash
POST /api/resume/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "file": <PDF or DOCX file>,
  "jobDescription": "<optional job description>"
}
```

**Get All Resumes**
```bash
GET /api/resume
Authorization: Bearer <token>
```

**Get Single Resume**
```bash
GET /api/resume/<id>
Authorization: Bearer <token>
```

**Delete Resume**
```bash
DELETE /api/resume/<id>
Authorization: Bearer <token>
```

### ATS Tools

**Calculate ATS Score**
```bash
POST /api/ats/calculate
Content-Type: application/json

{
  "resumeText": "<resume plain text>",
  "jobDescription": "<optional job description>"
}
```

**Extract Keywords**
```bash
POST /api/ats/keywords
Content-Type: application/json

{
  "text": "<text to extract keywords from>"
}
```

## Scoring Algorithm

### Overall Score (0-100)
- **Formatting Score (30 pts):** ATS-friendly formatting validation
- **Structure Score (30 pts):** Required sections and content validation
- **Keyword Score (40 pts):** Job description keyword matching

### Scoring Details

**Formatting (0-30):**
- Starts at 30 points
- -5 for special characters (bullets, symbols)
- -10 for non-ASCII characters
- -10 if resume too short (<200 chars)
- -5 if insufficient line breaks

**Structure (0-30):**
- Starts at 30 points
- -10 for missing contact info
- -10 for missing experience section
- -10 for missing education section
- +5 bonus for skills section

**Keywords (0-40):**
- Requires job description for full scoring
- Extracts keywords from both texts
- Calculates match percentage
- Awards up to 40 points based on match rate

## Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000

# Kill process on port 5000
kill -9 <PID>

# Try again
npm run dev
```

### Frontend can't connect to backend
- Make sure backend is running on `http://localhost:5000`
- Check that CORS is enabled in server.js
- Verify proxy setting in client/package.json

### File upload fails
- Check file format (only PDF and DOCX supported)
- Verify file is not corrupted
- Check file size

## Next Steps

1. **Implement Database:** Replace in-memory storage with MongoDB
2. **Add More Features:** Export as PDF, bulk upload, etc.
3. **Improve Scoring:** Use more advanced NLP algorithms
4. **Deploy:** Host on Heroku, AWS, or similar platform
5. **Mobile App:** Build React Native version

## Support & Issues

For bugs or feature requests, please create an issue in the repository.

Happy resume checking! 🚀
