@echo off
title Taskio Productivity Planner
cls
echo ====================================================
echo  ✨ Starting Taskio Productivity Planner...
echo ====================================================

set NODE_CMD=node
where node >nul 2>nul
if %errorlevel% neq 0 (
    if exist "C:\Program Files\Adobe\Adobe Creative Cloud Experience\libs\node.exe" (
        set "NODE_CMD=C:\Program Files\Adobe\Adobe Creative Cloud Experience\libs\node.exe"
    ) else (
        echo [ERROR] Node.js executable not found in PATH or standard location.
        echo Opening index.html directly in your default browser...
        start "" "%~dp0index.html"
        pause
        exit /b 1
    )
)

echo [1/2] Rebuilding bundle assets...
"%NODE_CMD%" "%~dp0build.js"

echo [2/2] Launching server on http://localhost:3000...
start http://localhost:3000
"%NODE_CMD%" "%~dp0server.js"
pause
