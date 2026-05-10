# Resume ATS Checker

A comprehensive web application to check your resume's compatibility with Applicant Tracking Systems (ATS). Get an instant ATS score with detailed feedback on formatting, structure, and keyword matching.

## Features

- ✅ **Resume Upload**: Upload PDF and DOCX files
- 📊 **ATS Score Calculation**: Get a comprehensive ATS score (0-100)
  - Formatting Score (0-30): Checks for ATS-friendly formatting
  - Structure Score (0-30): Validates required resume sections
  - Keyword Score (0-40): Matches keywords with job descriptions
- 🔍 **Keyword Analysis**: Extract keywords from resumes and match with job descriptions
- 📝 **Section Detection**: Automatically detects resume sections (contact, experience, education, skills, etc.)
- 💾 **Resume History**: Save and track all your resume checks
- 👤 **User Authentication**: Register and login to track your resume checks
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** (optional - uses in-memory storage for demo)
- **Multer** for file handling
- **PDF-Parse** for PDF parsing
- **Mammoth** for DOCX parsing
- **Natural** for NLP keyword extraction
- **JWT** for authentication

### Frontend
- **React** 18
- **React Router** for navigation
- **Axios** for API calls
- **CSS3** for styling

## Project Structure

```
.
├── server/
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware (auth, etc.)
│   ├── utils/            # Utility functions (parser, scorer)
│   ├── server.js         # Express app entry point
│   ├── package.json      # Backend dependencies
│   └── .env              # Environment variables
├── client/
│   ├── public/           # Static files
│   ├── src/
│   │   ├── pages/        # Page components
│   │   ├── services/     # API service
│   │   ├── App.js        # Main component
│   │   ├── App.css       # Styling
│   │   └── index.js      # React entry point
│   └── package.json      # Frontend dependencies
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resume-ats-checker
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

Start the backend:
```bash
npm run dev
```

### Setup Frontend

```bash
cd client
npm install
```

Start the frontend:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Usage

1. **Register** or **Login** to your account
2. **Upload a Resume** (PDF or DOCX file)
3. **(Optional) Paste a Job Description** for keyword matching
4. **Get ATS Score** with detailed feedback
5. **Review and Track** your resume checks in history

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Resume
- `POST /api/resume/upload` - Upload and analyze resume
- `GET /api/resume` - Get all user resumes
- `GET /api/resume/:id` - Get specific resume
- `DELETE /api/resume/:id` - Delete resume

### ATS
- `POST /api/ats/calculate` - Calculate ATS score from raw text
- `POST /api/ats/keywords` - Extract keywords from text

## Scoring Breakdown

### Formatting Score (0-30 pts)
- Checks for proper formatting
- Validates special characters
- Checks resume length
- Validates document structure

### Structure Score (0-30 pts)
- Validates presence of contact information
- Checks for experience section
- Checks for education section
- Bonus points for skills section

### Keyword Score (0-40 pts)
- Extracts keywords from resume and job description
- Calculates keyword matching percentage
- Awards points based on match rate

**Total Score: 0-100 points**

## Demo Credentials

For testing without setting up a database:
- The application uses in-memory storage by default
- You can register any email/password combination
- Data will be lost on server restart

## Future Enhancements

- [ ] MongoDB integration for persistent storage
- [ ] Advanced NLP for better keyword extraction
- [ ] Resume improvement suggestions
- [ ] Export reports as PDF
- [ ] Bulk resume upload
- [ ] Integration with job boards
- [ ] AI-powered recommendations
- [ ] Multi-language support

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues or questions, please create an issue in the repository.
