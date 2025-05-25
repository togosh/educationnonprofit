@echo off
title DFEAT Development Server

:restart
cls
echo ============================================
echo    DFEAT Development Server
echo ============================================
echo.
echo Server URL: http://localhost:3000
echo Config: config.json (copy from config-copy.json)
echo.
echo Commands:
echo   r - Restart server
echo   q - Quit
echo   o - Open in browser
echo.

REM Kill any existing Node.js processes on port 3000
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    taskkill /PID %%a /F >nul 2>&1
)

echo Starting server...
start /B node index.js
timeout /t 2 /nobreak >nul

echo Server started! Opening browser...
start http://localhost:3000

:menu
echo.
set /p choice="Enter command (r/q/o): "

if /i "%choice%"=="r" goto restart
if /i "%choice%"=="q" goto quit
if /i "%choice%"=="o" (
    start http://localhost:3000
    goto menu
)

echo Invalid choice. Please enter r, q, or o.
goto menu

:quit
echo Stopping server...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    taskkill /PID %%a /F >nul 2>&1
)
echo Server stopped. Goodbye!
pause
