@echo off
echo ============================================
echo    Sweet Shop Management System
echo ============================================
echo.
echo Starting backend and frontend servers...
echo.

REM Start backend in new window
start "Backend Server" cmd /k "cd backend && venv\Scripts\activate && uvicorn app.main:app --reload --port 8000"

REM Wait 3 seconds for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in new window
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ============================================
echo Backend running at: http://localhost:8000
echo Frontend running at: http://localhost:5173
echo API Docs at: http://localhost:8000/docs
echo ============================================
echo.
echo Press any key to open browser...
pause >nul

REM Open browser
start http://localhost:5173

echo.
echo Both servers are running!
echo Close the terminal windows to stop servers.
