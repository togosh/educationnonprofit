@echo off
echo Starting LIFT Website Server...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if dependencies are installed
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo Error: Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Check if config.json exists
if not exist "config.json" (
    echo Warning: config.json not found. Using default configuration.
    echo Copy config-copy.json to config.json and update settings for email functionality.
    echo.
)

REM Start the server
echo Starting server on http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
node index.js

pause
