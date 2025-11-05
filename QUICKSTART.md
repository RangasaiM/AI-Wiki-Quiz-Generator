# 🚀 Quick Start Guide

This guide will help you get the AI Wiki Quiz Generator up and running quickly.

## Prerequisites Check

Before starting, ensure you have:
- [ ] Python 3.10+ installed (`python --version`)
- [ ] Node.js 16+ installed (`node --version`)
- [ ] Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

## Setup Steps

### 1. Backend Setup (5 minutes)

Open a terminal and run:

```bash
# Navigate to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env

# Edit .env and add your Gemini API key
# Use notepad or any text editor:
# GEMINI_API_KEY=your_actual_api_key_here
```

### 2. Frontend Setup (2 minutes)

Open a **new terminal** and run:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies (already done, but run if needed)
npm install
```

### 3. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
venv\Scripts\activate
python main.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
✅ Database initialized successfully
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### 4. Test the Application

1. Open your browser to `http://localhost:5173`
2. Enter a Wikipedia URL, for example:
   - `https://en.wikipedia.org/wiki/Python_(programming_language)`
   - `https://en.wikipedia.org/wiki/Artificial_intelligence`
   - `https://en.wikipedia.org/wiki/Solar_System`
3. Click "Generate Quiz"
4. Wait 20-30 seconds for the AI to process
5. View your generated quiz!
6. Check the "Quiz History" tab to see all generated quizzes

## Troubleshooting

**Backend won't start:**
- Make sure virtual environment is activated
- Check that `.env` file exists with valid API key
- Verify all dependencies installed: `pip list`

**Frontend won't start:**
- Delete `node_modules` and run `npm install` again
- Make sure you're in the `frontend` folder

**Quiz generation fails:**
- Verify your Gemini API key is valid
- Check that the Wikipedia URL is accessible
- Look at backend terminal for error messages

**Cannot connect to backend:**
- Ensure backend is running on `http://localhost:8000`
- Check firewall settings

## Quick Test Commands

```bash
# Test backend API (in a new terminal)
curl http://localhost:8000/

# Test history endpoint
curl http://localhost:8000/history
```

## Next Steps

- Try different Wikipedia articles
- Generate multiple quizzes
- Explore the quiz history feature
- Customize the UI in `frontend/src/`
- Modify quiz generation prompts in `backend/llm_quiz_generator.py`

## Support

If you encounter issues:
1. Check the terminal outputs for error messages
2. Review the main README.md for detailed documentation
3. Ensure all prerequisites are met
4. Try restarting both servers

Happy quiz generating! 🎓
