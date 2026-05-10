# Resume ATS Checker - Quick Reference

## Project Overview

A full-stack web application that analyzes resumes against Applicant Tracking System (ATS) requirements. Users can upload resumes, match against job descriptions, and receive detailed ATS compatibility scores.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, React Router, Axios, CSS3 |
| **Backend** | Node.js, Express.js, Multer, PDF-Parse, Mammoth, Natural NLP |
| **Auth** | JWT (JSON Web Tokens), bcryptjs |
| **Database** | MongoDB (optional), In-memory for demo |
| **Deployment** | Docker, Docker Compose |

## Key Features

- ✅ Resume upload (PDF/DOCX)
- ✅ ATS score calculation (0-100)
- ✅ Job description keyword matching
- ✅ Resume section detection
- ✅ User authentication & history
- ✅ Responsive design

## Project Structure

```
resume-ats-checker/
├── server/                  # Backend (Node.js/Express)
│   ├── routes/             # API endpoints
│   ├── models/             # Data schemas
│   ├── middleware/         # Authentication
│   ├── utils/              # Parsing & scoring logic
│   ├── package.json
│   └── server.js
├── client/                  # Frontend (React)
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── services/       # API calls
│   │   └── App.js
│   └── package.json
├── docker-compose.yml      # Docker setup
├── README.md              # Full documentation
├── INSTALLATION.md        # Setup guide
├── QUICKSTART.md          # API reference
└── SAMPLE_JOB_DESCRIPTION.md
```

## Getting Started

### 1. Install Dependencies
```bash
./install.sh              # macOS/Linux
# or
install.bat              # Windows
```

### 2. Start Backend
```bash
cd server
npm run dev
# Runs on http://localhost:5000
```

### 3. Start Frontend
```bash
cd client
npm start
# Runs on http://localhost:3000
```

### 4. Register & Use
- Go to http://localhost:3000
- Create account
- Upload resume
- View ATS score

## API Endpoints Summary

### Auth
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login user

### Resume
- `POST /api/resume/upload` - Analyze resume
- `GET /api/resume` - List all resumes
- `DELETE /api/resume/:id` - Delete resume

### ATS
- `POST /api/ats/calculate` - Score from text
- `POST /api/ats/keywords` - Extract keywords

## Scoring System

| Component | Points | Criteria |
|-----------|--------|----------|
| **Formatting** | 0-30 | ATS-friendly format, structure, length |
| **Structure** | 0-30 | Contact, experience, education, skills |
| **Keywords** | 0-40 | Match with job description |
| **Total** | 0-100 | Overall ATS compatibility |

## Frontend Pages

1. **Login/Register** - User authentication
2. **Dashboard** - Main menu with feature overview
3. **Check Resume** - Upload and analyze
4. **Resume History** - View past analyses

## Environment Variables

```env
# server/.env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resume-ats-checker
JWT_SECRET=your_secret_key
NODE_ENV=development
```

## Important Files

| File | Purpose |
|------|---------|
| `server/server.js` | Express app entry point |
| `server/utils/atsScorer.js` | Core scoring algorithm |
| `server/utils/parser.js` | PDF/DOCX text extraction |
| `client/src/App.js` | Main React component |
| `client/src/services/api.js` | API communication |

## Development Commands

### Backend
```bash
npm run dev      # Development with nodemon
npm start        # Production mode
npm test         # Run tests (when added)
```

### Frontend
```bash
npm start        # Development server
npm build        # Production build
npm test         # Run tests
npm eject        # Eject from create-react-app
```

## Common Tasks

### Change Server Port
Edit `server/.env`:
```
PORT=5001
```

### Update ATS Scoring
Edit `server/utils/atsScorer.js` - `calculateATSScore()` function

### Add New API Endpoint
1. Create route file in `server/routes/`
2. Add route in `server/server.js`
3. Update `client/src/services/api.js`

### Customize Styling
Edit `client/src/App.css`

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port in use | Kill process: `kill -9 <PID>` |
| Module not found | `npm install` in the affected directory |
| CORS error | Check backend CORS setup |
| Upload fails | Check file format (PDF/DOCX only) |
| Can't login | Check JWT_SECRET matches |

## Production Checklist

- [ ] Update JWT_SECRET
- [ ] Set NODE_ENV=production
- [ ] Enable MongoDB connection
- [ ] Setup HTTPS
- [ ] Configure environment variables
- [ ] Setup proper logging
- [ ] Enable rate limiting
- [ ] Setup error monitoring
- [ ] Test all endpoints
- [ ] Deploy with Docker

## Useful Resources

- **Express.js**: https://expressjs.com/
- **React**: https://react.dev/
- **PDF-Parse**: https://github.com/modesty/pdf-parse
- **Mammoth**: https://github.com/mwilliamson/mammoth.js
- **Natural NLP**: https://github.com/NaturalNode/natural

## Next Steps

1. Read `INSTALLATION.md` for detailed setup
2. Review `README.md` for feature overview
3. Check `QUICKSTART.md` for API reference
4. Try sample job description in `SAMPLE_JOB_DESCRIPTION.md`

## Support

For issues or questions, create an issue in the repository or check the documentation files.

---

**Happy resume checking!** 🚀
