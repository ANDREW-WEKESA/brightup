@echo off
echo Starting BrightUp...
echo.
echo Starting server on port 3000...
start "BrightUp Server" cmd /k "cd server && npm run dev"
timeout /t 3 /nobreak > nul
echo.
echo Starting client on port 5173...
start "BrightUp Client" cmd /k "cd client && npm run dev"
echo.
echo BrightUp is starting!
echo Server: http://localhost:3000
echo Client: http://localhost:5173
echo.
pause
