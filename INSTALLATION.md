# Resume ATS Checker - Installation & Setup Guide

## Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, Edge)

## Installation

### Option 1: Automatic Installation (Recommended)

**On macOS/Linux:**
```bash
chmod +x install.sh
./install.sh
```

**On Windows:**
```bash
install.bat
```

This will automatically install all dependencies for both backend and frontend.

### Option 2: Manual Installation

#### Backend Setup
```bash
cd server
npm install
```

#### Frontend Setup
```bash
cd client
npm install
```

## Running the Application

### Terminal 1 - Start Backend Server
```bash
cd server
npm run dev
```
Expected output:
```
Server running on port 5000
Database connection skipped for demo (use MongoDB in production)
```

### Terminal 2 - Start Frontend Dev Server
```bash
cd client
npm start
```
Expected output:
```
webpack compiled successfully
Compiled Successfully!
```

The application will automatically open at `http://localhost:3000`

## Initial Setup

### 1. Create Your Account

1. On the login page, click **"Create Account"**
2. Fill in:
   - **Full Name**: Your name
   - **Email**: Any email (email format required)
   - **Password**: Your password (remember this for login)
3. Click **"Register"**
4. You'll be redirected to the dashboard

### 2. Try the Features

#### Check Your First Resume
1. Click **"Check Resume"**
2. Upload a PDF or DOCX file
3. (Optional) Paste a job description
4. Click **"Check Resume"**
5. View your ATS score

#### View History
1. Click **"History"**
2. See all your previous resume analyses
3. Click "View" to see detailed results
4. Click "Delete" to remove an analysis

## Application Features

### Dashboard
- Welcome message with your account name
- Quick access to main features
- Information about scoring categories

### Resume Checker
- **File Upload**: Drag & drop or click to upload
- **Job Description**: Optional field for keyword matching
- **Instant Analysis**: Get scored immediately
- **Detailed Feedback**: Formatting, structure, and keyword analysis
- **Section Detection**: Identifies resume sections automatically

### Resume History
- **List View**: See all your analyses
- **Detailed View**: Click to see full results
- **Delete**: Remove analyses you no longer need

### User Account
- **Secure Login**: JWT token-based authentication
- **Account Management**: Register and manage your account
- **Data Persistence**: Your analyses are stored (until server restart in demo mode)

## Understanding Your ATS Score

### Overall Score (0-100)

**Example Scores:**
- **80-100**: Excellent - High chance of passing ATS
- **60-79**: Good - Should pass most ATS systems
- **40-59**: Fair - May be filtered by some ATS systems
- **20-39**: Poor - Likely to be filtered out
- **0-19**: Critical - Needs significant improvement

### Score Breakdown

#### Formatting (0-30 points)
- Resume contains proper text formatting
- No excessive special characters
- Adequate resume length
- Proper document structure

#### Structure (0-30 points)
- Contact information present
- Experience section present
- Education section present
- Bonus points for Skills section

#### Keywords (0-40 points)
- Keywords from job description found in resume
- Keyword matching percentage
- Requires job description for full scoring

## Test Data / Sample Resumes

### Sample Job Description
See `SAMPLE_JOB_DESCRIPTION.md` for a complete sample job description to test keyword matching.

### Creating Test Resumes
Use this template for best results:

```
JOHN DOE
john.doe@email.com | (555) 123-4567 | LinkedIn Profile | City, State

PROFESSIONAL SUMMARY
Experienced Software Engineer with expertise in full-stack development, cloud technologies, and team leadership. Proven track record of building scalable applications and mentoring development teams.

TECHNICAL SKILLS
Programming Languages: JavaScript, TypeScript, Python, SQL
Frontend: React.js, CSS3, HTML5, Redux, React Router
Backend: Node.js, Express.js, GraphQL, REST APIs
Databases: MongoDB, PostgreSQL, MySQL
Cloud & DevOps: AWS, Docker, Kubernetes, CI/CD Pipelines
Tools: Git, GitHub, Jenkins, ESLint, Jest

PROFESSIONAL EXPERIENCE
Senior Software Engineer | Tech Company Inc. | Jan 2021 - Present
- Architected and developed scalable microservices using Node.js and Express.js
- Led React.js frontend redesign improving performance by 40%
- Implemented JWT authentication and security best practices
- Mentored 3 junior developers on modern JavaScript practices
- Reduced API response time from 2s to 200ms through optimization

Full Stack Developer | Web Solutions LLC | Jun 2018 - Dec 2020
- Built full-stack applications using React and MongoDB
- Implemented RESTful APIs using Express.js and Node.js
- Deployed applications to AWS using Docker and Kubernetes
- Collaborated with product team on feature specifications

EDUCATION
Bachelor of Science in Computer Science | University Name | Graduation: 2018

CERTIFICATIONS
AWS Certified Solutions Architect - Associate
```

## Troubleshooting

### Issue: "Cannot find module" errors

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules
npm install
```

### Issue: Port 5000 or 3000 already in use

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change the port in .env
PORT=5001
```

### Issue: File upload not working

**Checklist:**
- [ ] File is in PDF or DOCX format
- [ ] File size is under 50MB
- [ ] Backend is running and accessible
- [ ] No special characters in filename

### Issue: Scores not calculated

**Solution:**
1. Try uploading again
2. Check browser console for errors (F12)
3. Check backend console for error messages
4. Restart both servers

### Issue: Can't connect to backend from frontend

**Check:**
1. Backend is running on port 5000
2. Check `client/src/services/api.js` - API_BASE_URL is correct
3. CORS is enabled in backend
4. Firewall not blocking port 5000

## Development Tips

### Enable Debug Logging
In `server/server.js`, add:
```javascript
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});
```

### Test API Endpoints
Use curl or Postman to test endpoints:
```bash
# Test backend health
curl http://localhost:5000/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Next Steps

1. **Customize the Score Algorithm**: Edit `server/utils/atsScorer.js`
2. **Add MongoDB**: Uncomment MongoDB connection in `server/server.js`
3. **Deploy**: Use Docker and docker-compose.yml
4. **Add More Features**: Export as PDF, bulk upload, etc.
5. **Improve UI**: Customize styling in `client/src/App.css`

## Production Deployment

Before deploying to production:

1. **Update JWT Secret**:
   ```bash
   # Generate a strong secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   
   # Update in .env
   JWT_SECRET=<generated-secret>
   ```

2. **Enable MongoDB**:
   - Uncomment MongoDB connection in `server/server.js`
   - Update `MONGODB_URI` in `.env`

3. **Set NODE_ENV to production**:
   ```
   NODE_ENV=production
   ```

4. **Use Docker**:
   ```bash
   docker-compose up -d
   ```

## Support & Feedback

- Check the README.md for feature overview
- Review QUICKSTART.md for API reference
- Check browser console (F12) for frontend errors
- Check backend terminal for server errors

Enjoy using Resume ATS Checker! 🎉
