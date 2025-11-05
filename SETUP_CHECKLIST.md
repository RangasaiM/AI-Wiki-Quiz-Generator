# 📋 Setup Checklist

Use this checklist to ensure everything is properly configured before running the application.

## ✅ Pre-Installation Checklist

- [ ] Python 3.10+ installed
  - Check: Run `python --version` in terminal
  - Should show: `Python 3.10.x` or higher
  
- [ ] Node.js 16+ installed
  - Check: Run `node --version` in terminal
  - Should show: `v16.x.x` or higher
  
- [ ] npm installed
  - Check: Run `npm --version` in terminal
  - Should show: `8.x.x` or higher

- [ ] Google Gemini API Key obtained
  - Get one at: https://makersuite.google.com/app/apikey
  - Keep it handy for setup

## 🔧 Backend Setup Checklist

Navigate to the backend folder first:
```bash
cd "c:\Users\Ranga Sai\OneDrive\Desktop\Quizz App\backend"
```

- [ ] Create virtual environment
  ```bash
  python -m venv venv
  ```
  - Should create a `venv` folder in backend directory

- [ ] Activate virtual environment (Windows)
  ```bash
  venv\Scripts\activate
  ```
  - Terminal prompt should show `(venv)` prefix

- [ ] Install Python dependencies
  ```bash
  pip install -r requirements.txt
  ```
  - Should install ~11 packages
  - Check for any error messages

- [ ] Create .env file
  ```bash
  copy .env.example .env
  ```
  - Should create a new `.env` file

- [ ] Add Gemini API key to .env
  - Open `.env` file in any text editor
  - Replace `your_gemini_api_key_here` with your actual API key
  - Save the file
  - Example: `GEMINI_API_KEY=AIzaSyD...your_key_here`

- [ ] Test backend installation
  ```bash
  python -c "import fastapi; import sqlalchemy; import langchain_google_genai; print('✅ All imports successful!')"
  ```
  - Should print: `✅ All imports successful!`

## 🎨 Frontend Setup Checklist

Open a NEW terminal and navigate to frontend folder:
```bash
cd "c:\Users\Ranga Sai\OneDrive\Desktop\Quizz App\frontend"
```

- [ ] Install Node dependencies
  ```bash
  npm install
  ```
  - Should install ~169 packages
  - May take 30-60 seconds
  - Ignore minor vulnerability warnings (expected)

- [ ] Verify React installation
  ```bash
  npm list react
  ```
  - Should show `react@18.2.0` or similar

- [ ] Verify Tailwind installation
  ```bash
  npm list tailwindcss
  ```
  - Should show `tailwindcss@3.3.x` or similar

## 🚀 Running the Application

### Start Backend Server

Terminal 1 (Backend):
```bash
cd backend
venv\Scripts\activate
python main.py
```

Expected output:
```
INFO:     Started server process
INFO:     Waiting for application startup.
✅ Database initialized successfully
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

- [ ] Backend running successfully
- [ ] No error messages
- [ ] Shows "Database initialized successfully"
- [ ] Accessible at http://localhost:8000

**Test Backend:**
- [ ] Open browser to http://localhost:8000
- [ ] Should see JSON response with API info

### Start Frontend Server

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

- [ ] Frontend running successfully
- [ ] No compilation errors
- [ ] Accessible at http://localhost:5173

**Test Frontend:**
- [ ] Open browser to http://localhost:5173
- [ ] Should see "AI Wiki Quiz Generator" page
- [ ] Two tabs visible: "Generate Quiz" and "Quiz History"

## 🧪 Final Testing Checklist

### Test Quiz Generation

- [ ] Navigate to "Generate Quiz" tab
- [ ] Enter test URL: `https://en.wikipedia.org/wiki/Python_(programming_language)`
- [ ] Click "Generate Quiz" button
- [ ] Loading spinner appears
- [ ] Wait 20-30 seconds
- [ ] Quiz appears with:
  - [ ] Article title
  - [ ] Summary section (blue)
  - [ ] 7-10 questions
  - [ ] 4 options per question
  - [ ] Correct answers highlighted (green)
  - [ ] Explanations (yellow)
  - [ ] Key entities (green tags)
  - [ ] Related topics (purple)

### Test Quiz History

- [ ] Click "Quiz History" tab
- [ ] Table displays with your generated quiz
- [ ] Shows: ID, Title, URL, Date Generated
- [ ] Click "View Details" button
- [ ] Modal opens with full quiz
- [ ] Quiz displays correctly in modal
- [ ] Click "Close" button
- [ ] Modal closes

### Test Multiple Quizzes

- [ ] Generate 2-3 more quizzes with different Wikipedia articles
- [ ] Verify all appear in history
- [ ] Test "View Details" on each one
- [ ] Verify each displays correctly

## 📊 Verification Checklist

- [ ] Database file created: `backend/quiz_history.db`
- [ ] No console errors in browser dev tools (F12)
- [ ] Both terminal windows show no errors
- [ ] Can generate quizzes successfully
- [ ] Can view quiz history
- [ ] Can view quiz details in modal
- [ ] UI is responsive and styled correctly

## 🐛 Troubleshooting

If any checkbox fails, refer to:
- [ ] Check README.md for detailed documentation
- [ ] Check QUICKSTART.md for setup help
- [ ] Review terminal outputs for error messages
- [ ] Verify API key is correct in .env file
- [ ] Ensure both servers are running
- [ ] Check firewall isn't blocking ports 8000 or 5173

## 🎉 Success Criteria

All checkboxes above should be checked ✅

When everything is working:
- Backend server running on port 8000
- Frontend server running on port 5173
- Can generate quizzes from Wikipedia URLs
- Quizzes save to database
- Can view quiz history
- Can view quiz details

**If all checks pass: CONGRATULATIONS! 🎊**
**Your AI Wiki Quiz Generator is fully operational!**

---

## 📝 Quick Reference

**Backend Server:**
- URL: http://localhost:8000
- Docs: http://localhost:8000/docs (automatic)
- Start: `python main.py` (from backend folder, venv activated)

**Frontend Server:**
- URL: http://localhost:5173
- Start: `npm run dev` (from frontend folder)

**Environment File:**
- Location: `backend/.env`
- Required: `GEMINI_API_KEY=your_key_here`

**Database:**
- Location: `backend/quiz_history.db`
- Type: SQLite (auto-created)

**Test Wikipedia URLs:**
- https://en.wikipedia.org/wiki/Artificial_intelligence
- https://en.wikipedia.org/wiki/Python_(programming_language)
- https://en.wikipedia.org/wiki/Solar_System
- https://en.wikipedia.org/wiki/World_War_II
- https://en.wikipedia.org/wiki/Albert_Einstein
