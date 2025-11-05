@echo off
echo ============================================
echo  AI Wiki Quiz Generator - Backend Server
echo ============================================
echo.

cd backend

echo Activating virtual environment...
call venv\Scripts\activate

echo.
echo Starting FastAPI server...
echo Server will be available at http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.

python main.py

pause
