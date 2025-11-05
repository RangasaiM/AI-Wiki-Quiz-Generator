# System Architecture

## Application Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
│                    http://localhost:5173                        │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ React UI
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                      FRONTEND (React)                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────────────┐  ┌──────────────────┐                      │
│  │ Generate Quiz  │  │  Quiz History    │                      │
│  │     Tab        │  │      Tab         │                      │
│  └────────┬───────┘  └────────┬─────────┘                      │
│           │                   │                                 │
│           │                   │                                 │
│  ┌────────▼───────────────────▼─────────┐                      │
│  │      API Service (api.js)            │                      │
│  │  - generateQuiz()                    │                      │
│  │  - getHistory()                      │                      │
│  │  - getQuizDetail()                   │                      │
│  └────────┬─────────────────────────────┘                      │
└───────────┼─────────────────────────────────────────────────────┘
            │
            │ HTTP/JSON
            │ localhost:8000
            │
┌───────────▼─────────────────────────────────────────────────────┐
│                    BACKEND (FastAPI)                            │
├─────────────────────────────────────────────────────────────────┤
│  API Endpoints:                                                 │
│  ┌──────────────────────────────────────────────────────┐      │
│  │ POST   /generate_quiz  - Generate new quiz           │      │
│  │ GET    /history        - List all quizzes            │      │
│  │ GET    /quiz/{id}      - Get quiz details            │      │
│  └──────────────────────────────────────────────────────┘      │
│                           │                                     │
│  ┌────────────────────────▼─────────────────────────┐          │
│  │            Business Logic Layer                  │          │
│  │  ┌───────────────┐  ┌──────────────────────┐    │          │
│  │  │   scraper.py  │  │ llm_quiz_generator.py│    │          │
│  │  │               │  │                      │    │          │
│  │  │ - Fetch Wiki  │  │ - LangChain Setup    │    │          │
│  │  │ - Clean HTML  │  │ - Prompt Template    │    │          │
│  │  │ - Extract     │  │ - Gemini API Call    │    │          │
│  │  └───────┬───────┘  └──────────┬───────────┘    │          │
│  └──────────┼──────────────────────┼────────────────┘          │
│             │                      │                            │
│             │                      │                            │
│  ┌──────────▼──────────────────────▼────────────────┐          │
│  │            database.py (SQLAlchemy)              │          │
│  │  - Quiz Model                                    │          │
│  │  - Database Session                              │          │
│  └──────────────────────┬───────────────────────────┘          │
└─────────────────────────┼───────────────────────────────────────┘
                          │
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                   SQLite Database                               │
│                  quiz_history.db                                │
├─────────────────────────────────────────────────────────────────┤
│  Table: quizzes                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ id | url | title | date_generated | scraped_content |    │  │
│  │    |     |       |                | full_quiz_data       │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

External Services:
┌──────────────────────┐         ┌──────────────────────┐
│   Wikipedia.org      │         │  Google Gemini API   │
│  (Article Source)    │         │  (AI Quiz Generator) │
└──────────────────────┘         └──────────────────────┘
         ▲                                 ▲
         │                                 │
         │ BeautifulSoup                  │ LangChain
         │                                 │
         └─────────────┬───────────────────┘
                       │
                 Backend Server
```

## Data Flow: Quiz Generation

```
1. User Input
   └─> Enter Wikipedia URL
       └─> Click "Generate Quiz"
           │
2. Frontend Processing
   └─> Validate URL
       └─> Send POST /generate_quiz
           │
3. Backend: Scraping Phase
   └─> scraper.py receives URL
       └─> Fetch HTML from Wikipedia
           └─> Parse with BeautifulSoup
               └─> Clean content (remove refs, tables)
                   └─> Return (cleaned_text, title)
                       │
4. Backend: AI Generation Phase
   └─> llm_quiz_generator.py receives text
       └─> Create prompt with article content
           └─> Call Google Gemini via LangChain
               └─> Parse JSON response
                   └─> Validate with Pydantic
                       │
5. Backend: Database Phase
   └─> database.py saves:
       - URL
       - Title  
       - Scraped content
       - Quiz JSON (serialized)
       - Timestamp
           │
6. Backend: Response
   └─> Return complete quiz data
       │
7. Frontend: Display
   └─> Render QuizDisplay component
       └─> Show summary, questions, entities, topics
```

## Component Architecture

### Backend Components

```
main.py (FastAPI App)
│
├── Middleware: CORS
│
├── Endpoints:
│   ├── POST /generate_quiz
│   │   ├── Call scraper.scrape_wikipedia()
│   │   ├── Call llm_quiz_generator.generate_quiz()
│   │   └── Save to database
│   │
│   ├── GET /history
│   │   └── Query all quizzes
│   │
│   └── GET /quiz/{id}
│       └── Query specific quiz
│
└── Dependencies:
    ├── database.get_db() - DB session
    ├── models.* - Pydantic validation
    └── Quiz model - ORM
```

### Frontend Components

```
App.jsx (Root)
│
├── State: activeTab
│
├── Header (title, description)
│
├── Tab Navigation
│   ├── Generate Quiz button
│   └── Quiz History button
│
└── Tab Content:
    │
    ├── GenerateQuizTab.jsx
    │   ├── State: url, loading, error, quizData
    │   ├── Form (URL input)
    │   ├── Loading spinner
    │   └── QuizDisplay component
    │
    └── HistoryTab.jsx
        ├── State: history, selectedQuiz, modalOpen
        ├── Table (ID, Title, URL, Date, Actions)
        ├── Modal component
        └── QuizDisplay component (in modal)
```

## Technology Integration

```
Frontend Stack:
React 18 → Component-based UI
  ├── Vite → Fast build tool
  ├── Tailwind CSS → Utility styling
  └── Fetch API → HTTP requests

Backend Stack:
FastAPI → REST API framework
  ├── SQLAlchemy → ORM
  ├── Pydantic → Data validation
  ├── BeautifulSoup4 → HTML parsing
  └── LangChain → LLM framework
      └── Google Gemini → AI model

Data Storage:
SQLite → Local database
  └── quiz_history.db file
```

## Security & Best Practices

```
✅ Environment Variables (.env for API keys)
✅ CORS Configuration (allow specific origins)
✅ Input Validation (Pydantic schemas)
✅ Error Handling (try/catch blocks)
✅ SQL Injection Prevention (SQLAlchemy ORM)
✅ Rate Limiting (inherent in Gemini API)
✅ Clean Code Separation (MVC pattern)
```

## Development Workflow

```
1. Backend Development
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   python main.py
   └─> Server: http://localhost:8000

2. Frontend Development
   npm install
   npm run dev
   └─> Server: http://localhost:5173

3. Testing
   ├── Manual testing via UI
   ├── API testing via curl/Postman
   └── Check logs in both terminals
```
