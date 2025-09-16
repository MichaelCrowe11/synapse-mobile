@echo off
REM Synapse Mobile Quick Start Script for Windows

echo.
echo ======================================
echo     Synapse Mobile Quick Start
echo ======================================
echo.

REM Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed. Please install Node.js 18+ first.
    echo Visit: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo Node.js version: %NODE_VERSION%

REM Check for npm
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: npm is not installed.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo npm version: %NPM_VERSION%

REM Install dependencies if needed
if not exist "node_modules\" (
    echo.
    echo Installing dependencies...
    call npm install
) else (
    echo Dependencies already installed
)

REM Platform selection
echo.
echo Which platform would you like to test?
echo 1) Android
echo 2) Metro bundler only
echo 3) Clean and rebuild
echo.
set /p choice="Enter choice (1-3): "

if "%choice%"=="1" (
    echo.
    echo Starting Android app...
    echo Make sure you have an Android emulator running or device connected!
    echo.
    call npx react-native run-android
) else if "%choice%"=="2" (
    echo.
    echo Starting Metro bundler only...
    call npx react-native start
) else if "%choice%"=="3" (
    echo.
    echo Cleaning and rebuilding...
    if exist "node_modules\" rmdir /s /q node_modules
    call npm install
    cd android
    call gradlew clean
    cd ..
    echo.
    echo Clean complete! Run the script again to start the app.
) else (
    echo Invalid choice. Please run the script again.
)

echo.
echo ======================================
echo.
echo Troubleshooting tips:
echo - If the app doesn't start, try: npm start -- --reset-cache
echo - For Android issues: cd android and gradlew clean
echo - Documentation: https://github.com/MichaelCrowe11/synapse-mobile
echo.
pause