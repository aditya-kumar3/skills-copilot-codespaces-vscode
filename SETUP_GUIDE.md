# 🚀 Complete Setup Guide - Resume ATS Checker

## Current Status

### ✅ Backend - Working
- Dependencies: Installed (474 packages)
- Server: Running on port 5000
- Status: Ready

### ✅ Frontend - Working  
- Dependencies: Installed (1306 packages)
- Status: Ready

---

## 📦 What to Install & How

### Step 1: Backend Setup

```bash
cd /workspaces/skills-copilot-codespaces-vscode/server
npm install
```

**What gets installed:**
- `express` - Web framework
- `cors` - Cross-origin requests
- `dotenv` - Environment variables
- `mongoose` - Database (optional)
- `bcryptjs` - Password hashing
- `jsonwebtoken` - Authentication tokens
- `multer` - File uploads
- `pdf-parse` - PDF extraction
- `mammoth` - DOCX extraction
- `natural` - Keyword extraction
- `nodemon` - Auto-reload (dev)

**Verification:**
```bash
node server.js
# Should show: "Server running on port 5000"
```

### Step 2: Frontend Setup

```bash
cd /workspaces/skills-copilot-codespaces-vscode/client
npm install
```

**What gets installed:**
- `react` - UI framework
- `react-dom` - React rendering
- `react-router-dom` - Page navigation
- `axios` - API calls
- `react-scripts` - Build tools

**Verification:**
```bash
npm start
# Should open http://localhost:3000 in browser
```

---

## 🔧 Running the Application

### Terminal 1 - Backend Server

```bash
cd /workspaces/skills-copilot-codespaces-vscode/server
npm run dev
```

**Expected Output:**
```
Server running on port 5000
Database connection skipped for demo
```

### Terminal 2 - Frontend App

```bash
cd /workspaces/skills-copilot-codespaces-vscode/client
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view resume-ats-checker in the browser at:
  http://localhost:3000
```

### Terminal 3 (Optional) - View Logs

```bash
# Watch for errors
tail -f /tmp/backend.log
```

---

## ⚠️ Common Errors & Fixes

### Error 1: "EADDRINUSE: address already in use :::5000"

**Problem:** Port 5000 is already in use

**Solution:**
```bash
# Kill the process using port 5000
lsof -i :5000 | grep -v COMMAND | awk '{print $2}' | xargs kill -9

# Try starting server again
npm run dev
```

### Error 2: "Cannot find module"

**Problem:** Dependencies not installed

**Solution:**
```bash
# Clear cache
npm cache clean --force

# Reinstall
rm -rf node_modules
npm install

# Try again
npm run dev  # or npm start
```

### Error 3: "npm: command not found"

**Problem:** Node.js or npm not installed

**Solution:**
```bash
# Check if Node is installed
node --version
npm --version

# If not, install Node.js from: https://nodejs.org/
```

### Error 4: "react-scripts not found"

**Problem:** Frontend dependencies incomplete

**Solution:**
```bash
cd client
npm install react-scripts --save-dev
npm start
```

### Error 5: "Cannot POST /api/resume/upload"

**Problem:** Backend server not running

**Solution:**
1. Open new terminal
2. Run: `cd server && npm run dev`
3. Verify: Visit http://localhost:5000/health

### Error 6: "Proxy error: Could not proxy request"

**Problem:** Backend not accessible from frontend

**Solution:**
1. Check backend is running on port 5000
2. Check `client/src/services/api.js` has correct API_BASE_URL
3. Make sure CORS is enabled in `server/server.js`

---

## 📋 Pre-Flight Checklist

Before running the app, verify:

```bash
# 1. Check Node.js version (should be v14+)
node --version

# 2. Check npm version
npm --version

# 3. Check both directories exist
ls -la server/
ls -la client/

# 4. Verify key files exist
ls server/server.js
ls client/src/App.js
ls server/package.json
ls client/package.json

# 5. Check ports are available
lsof -i :5000  # Should be empty
lsof -i :3000  # Should be empty
```

---

## 🎯 Quick Start (Copy & Paste)

### For macOS/Linux Users:

```bash
cd /workspaces/skills-copilot-codespaces-vscode

# Terminal 1 - Backend
cd server
npm install
npm run dev

# In a new terminal - Terminal 2 - Frontend
cd client
npm install
npm start

# Then open: http://localhost:3000
```

### For Windows Users:

```bash
cd \path\to\skills-copilot-codespaces-vscode

REM Terminal 1 - Backend
cd server
npm install
npm run dev

REM In a new terminal - Terminal 2 - Frontend
cd client
npm install
npm start

REM Then open: http://localhost:3000
```

---

## 🧪 Testing the Setup

### 1. Test Backend API

```bash
# Check if backend is running
curl http://localhost:5000/health

# Should return: {"status":"Server is running"}
```

### 2. Test Frontend

- Open http://localhost:3000
- Should see login page
- Should be able to click "Create Account"

### 3. Test Full Flow

1. Go to http://localhost:3000
2. Click "Create Account"
3. Register: 
   - Name: Test User
   - Email: test@example.com
   - Password: password123
4. Click Dashboard → Check Resume
5. Upload a PDF or DOCX file (or create test resume)
6. See ATS score appear

---

## 📚 File Structure Reference

```
server/
├── server.js              ← Main entry point
├── package.json           ← Dependencies list
├── .env                   ← Configuration
├── routes/
│   ├── auth.js           ← Login/Register
│   ├── resume.js         ← Upload/Analyze
│   └── ats.js            ← Score calculation
├── middleware/
│   └── auth.js           ← JWT protection
├── utils/
│   ├── parser.js         ← PDF/DOCX parsing
│   └── atsScorer.js      ← Scoring logic
└── models/
    ├── User.js           ← User schema
    └── Resume.js         ← Resume schema

client/
├── package.json          ← Dependencies
├── public/
│   └── index.html        ← Main HTML
└── src/
    ├── App.js            ← Main component
    ├── App.css           ← Styles
    ├── index.js          ← React entry
    ├── pages/
    │   ├── Login.js      ← Login page
    │   ├── Register.js   ← Sign up page
    │   ├── Dashboard.js  ← Main menu
    │   ├── CheckResume.js ← Upload resume
    │   └── ResumeHistory.js ← View history
    └── services/
        └── api.js        ← API calls
```

---

## 🔐 Security Notes

### Default .env Values (Development Only)

**Current values in `server/.env`:**
```env
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

⚠️ **Before going to production:**
1. Change `JWT_SECRET` to a random string
2. Set `NODE_ENV=production`
3. Enable MongoDB connection

---

## 🆘 Troubleshooting Checklist

- [ ] Node.js and npm installed
- [ ] Running `npm install` in both `server/` and `client/`
- [ ] Backend running on port 5000 with `npm run dev`
- [ ] Frontend running on port 3000 with `npm start`
- [ ] Can access http://localhost:3000
- [ ] No port conflicts (5000 and 3000 available)
- [ ] All file permissions correct
- [ ] No typos in commands

---

## 📞 Need Help?

1. **Check logs**: Look at terminal output for specific error messages
2. **Verify ports**: `lsof -i :5000` and `lsof -i :3000`
3. **Clear cache**: `npm cache clean --force`
4. **Restart everything**: Kill terminals, kill processes, start fresh
5. **Check internet**: Might need to download packages

---

## 🎉 Success Indicators

✅ Backend Started
- Terminal shows: "Server running on port 5000"

✅ Frontend Started  
- Terminal shows: "Compiled successfully!"
- Browser opens to http://localhost:3000
- See login page

✅ Ready to Use
- Can create account
- Can upload resume
- Everything responds quickly

---

## 📖 Documentation Files

- **README.md** - Full project overview
- **INSTALLATION.md** - Detailed setup guide
- **QUICKSTART.md** - API reference
- **REFERENCE.md** - Quick cheat sheet
- **SAMPLE_JOB_DESCRIPTION.md** - Test data

Choose one and follow carefully!

---

**Happy coding! 🚀** Need anything else, just ask!
