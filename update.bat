@echo off
echo === LIFT Website Update Script ===
echo.

REM Check if forever is available
where forever >nul 2>&1
if %errorlevel% neq 0 (
    echo Forever not found. Installing forever globally...
    npm install -g forever
)

REM List current forever processes
echo Current forever processes:
forever list

REM Stop process 0 (main server process)
echo Stopping server process 0...
forever stop 0

REM Pull latest changes from git
echo Pulling latest changes from git...
git pull

REM Install/update dependencies
echo Installing/updating dependencies...
npm install

REM Start the server with forever
echo Starting LIFT server...
forever start index.js

REM Show all logs
echo Current forever logs:
forever logs

REM Follow logs for process 0
echo Following logs for process 0 (Ctrl+C to exit):
forever logs 0 -f
