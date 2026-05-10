@echo off
setlocal enabledelayedexpansion

echo.
echo 🚀 Resume ATS Checker - Installation Script
echo ==============================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%
echo.

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd server
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install backend dependencies
    cd ..
    exit /b 1
)
echo ✅ Backend dependencies installed
echo.

REM Go back to root directory
cd ..

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd client
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install frontend dependencies
    cd ..
    exit /b 1
)
echo ✅ Frontend dependencies installed
echo.

REM Go back to root directory
cd ..

echo ✅ Installation complete!
echo.
echo 📝 Next steps:
echo 1. Terminal 1: cd server ^&^& npm run dev
echo 2. Terminal 2: cd client ^&^& npm start
echo.
echo 🌐 Open http://localhost:3000 in your browser
echo.

pause
