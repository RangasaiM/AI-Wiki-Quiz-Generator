# AI Wiki Quiz Generator

A full-stack application that transforms Wikipedia articles into educational quizzes using AI. This project demonstrates the integration of LLM-powered quiz generation with structured data extraction, persistent storage, and a modern web interface.

## 🎯 Features

### Core Features (Assignment Requirements)
- **AI-Powered Quiz Generation**: Uses Google Gemini AI via LangChain to create engaging quizzes from Wikipedia articles
- **Smart Content Extraction**: Automatically scrapes and cleans Wikipedia content using BeautifulSoup
- **Structured Quiz Output**: Generates 7-10 multiple-choice questions with:
  - 4 options per question
  - Correct answer identification
  - Detailed explanations
  - Difficulty levels (easy, medium, hard)
  - Section categorization
- **Rich Metadata**: Includes article summaries, key entities, and related topics
- **Quiz History**: Stores and displays all previously generated quizzes with full details
- **Database Persistence**: SQLite by default, with support for MySQL/PostgreSQL

### Bonus Features
- **Interactive Quiz Taking**: Take quizzes with real-time scoring and detailed review
- **URL Preview**: Validate Wikipedia URLs and preview article titles before generation
- **Smart Caching**: Prevents duplicate scraping of the same URL
- **Section-wise Display**: Questions grouped by topic sections
- **Raw HTML Storage**: Preserves original Wikipedia HTML for reference
- **Modern Glassmorphic UI**: Beautiful gradient design with smooth animations

## 🛠️ Tech Stack

### Backend (Python)
- **Python 3.10+** - Core programming language
- **FastAPI** - High-performance web framework for API
- **SQLAlchemy** - ORM for database operations
- **BeautifulSoup4** - HTML parsing and web scraping
- **LangChain** - Framework for LLM application development
- **Pydantic** - Data validation and structured output parsing
- **Google Gemini (gemini-2.5-flash)** - AI model for quiz generation
- **Database Support**:
  - SQLite (default, file-based)
  - MySQL (via PyMySQL)
  - PostgreSQL (via psycopg2-binary)

### Frontend
- **React 18** - UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling framework

**Note**: Node.js is used ONLY for frontend development. The entire backend API is implemented in Python as per assignment requirements.

## 📋 Prerequisites

- Python 3.10 or higher
- Node.js 16 or higher
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

## 🚀 Installation & Setup

### Backend Setup

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment**
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure environment variables**
   - Copy `.env.example` to `.env`
     ```bash
     copy .env.example .env
     ```
   - Edit `.env` and add your configuration:
     ```
     GEMINI_API_KEY=your_actual_api_key_here
     ```
   
   **Optional - MySQL/PostgreSQL Configuration:**
   
   By default, the application uses SQLite. To use MySQL or PostgreSQL:
   
   a. **For MySQL:**
      - Install MySQL driver: `pip install pymysql`
      - Add to `.env`:
        ```
        DATABASE_URL=mysql+pymysql://username:password@localhost:3306/quiz_db
        ```
      - Create database: `CREATE DATABASE quiz_db;`
   
   b. **For PostgreSQL:**
      - Install PostgreSQL driver: `pip install psycopg2-binary`
      - Add to `.env`:
        ```
        DATABASE_URL=postgresql+psycopg2://username:password@localhost:5432/quiz_db
        ```
      - Create database: `CREATE DATABASE quiz_db;`
   
   c. **Update `database.py`:**
      - Replace line 7 with:
        ```python
        DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./quiz_history.db")
        ```
      - Add import at top: `import os`
      - Update engine creation (lines 9-10) to:
        ```python
        from sqlalchemy.engine.url import make_url
        url = make_url(DATABASE_URL)
        connect_args = {"check_same_thread": False} if url.drivername.startswith("sqlite") else {}
        engine = create_engine(DATABASE_URL, connect_args=connect_args)
        ```

6. **Run the backend server**
   ```bash
   python main.py
   ```
   
   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend folder**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   
   The frontend will be available at `http://localhost:5173`

## 📡 API Endpoints

### POST `/generate_quiz`
Generate a quiz from a Wikipedia URL. Returns cached quiz if URL was previously processed.

**Request:**
```json
{
  "url": "https://en.wikipedia.org/wiki/Alan_Turing"
}
```

**Response:**
```json
{
  "id": 1,
  "url": "https://en.wikipedia.org/wiki/Alan_Turing",
  "title": "Alan Turing",
  "date_generated": "2025-11-05T10:30:00",
  "cached": false,
  "quiz_data": {
    "title": "Alan Turing",
    "summary": "Alan Turing was a British mathematician and computer scientist...",
    "questions": [
      {
        "question": "Where did Alan Turing study?",
        "options": [
          "A. Harvard University",
          "B. Cambridge University",
          "C. Oxford University",
          "D. Princeton University"
        ],
        "correct_answer": "B. Cambridge University",
        "explanation": "Mentioned in the 'Early life' section.",
        "section": "Early life",
        "difficulty": "easy"
      }
    ],
    "key_entities": ["Alan Turing", "Alonzo Church", "University of Cambridge"],
    "related_topics": ["Cryptography", "Enigma machine", "Computer science"]
  }
}
```

### GET `/history`
Get list of all generated quizzes.

**Response:**
```json
[
  {
    "id": 1,
    "url": "https://en.wikipedia.org/wiki/Alan_Turing",
    "title": "Alan Turing",
    "date_generated": "2025-11-05T10:30:00"
  }
]
```

### GET `/quiz/{quiz_id}`
Get detailed quiz data by ID.

**Response:**
```json
{
  "id": 1,
  "url": "https://en.wikipedia.org/wiki/Alan_Turing",
  "title": "Alan Turing",
  "date_generated": "2025-11-05T10:30:00",
  "quiz_data": {
    "title": "Alan Turing",
    "summary": "...",
    "questions": [...],
    "key_entities": [...],
    "related_topics": [...]
  }
}
```

### POST `/preview_url`
Validate a Wikipedia URL and preview article title before generation.

**Request:**
```json
{
  "url": "https://en.wikipedia.org/wiki/Python_(programming_language)"
}
```

**Response:**
```json
{
  "valid": true,
  "title": "Python (programming language)",
  "message": "Article found and ready for quiz generation"
}
```

## 🎮 Usage

1. **Start the backend server** (see Backend Setup)
2. **Start the frontend development server** (see Frontend Setup)
3. **Open your browser** to `http://localhost:5173`
4. **Generate a quiz:**
   - Click on the "Generate Quiz" tab
   - Enter a Wikipedia URL (e.g., `https://en.wikipedia.org/wiki/Python_(programming_language)`)
   - The URL will be automatically validated and article title previewed
   - Click "Generate Quiz"
   - Wait for the AI to generate your quiz (~20-30 seconds)
   - View the generated quiz with questions grouped by section
5. **Take a quiz interactively:**
   - After generating a quiz, click "Take Quiz" mode
   - Answer questions one by one
   - Submit to see your score and detailed explanations
6. **View quiz history:**
   - Click on the "Quiz History" tab
   - See all previously generated quizzes
   - Click "View Details" to see the full quiz in a modal
   - Click "Take Quiz" to start an interactive quiz session

## 📁 Project Structure

```
Quizz App/
├── backend/
│   ├── venv/                    # Python virtual environment
│   ├── database.py              # SQLAlchemy database models and setup
│   ├── models.py                # Pydantic schemas for data validation
│   ├── scraper.py               # Wikipedia scraping with BeautifulSoup
│   ├── llm_quiz_generator.py    # Gemini AI integration for quiz generation
│   ├── main.py                  # FastAPI application and endpoints
│   ├── requirements.txt         # Python dependencies
│   ├── .env.example             # Environment variables template
│   └── quiz_history.db          # SQLite database (auto-created)
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   │   ├── QuizDisplay.jsx  # Display quiz with section grouping
│   │   │   ├── QuizTaker.jsx    # Interactive quiz taking component
│   │   │   └── Modal.jsx        # Generic modal component
│   │   ├── services/
│   │   │   └── api.js           # API client for backend communication
│   │   ├── tabs/
│   │   │   ├── GenerateQuizTab.jsx  # Tab 1: Quiz generation
│   │   │   └── HistoryTab.jsx       # Tab 2: Quiz history
│   │   ├── App.jsx              # Main application with tab navigation
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Tailwind styles with glassmorphism
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── sample_data/                 # Sample outputs (for submission)
│   ├── example_urls.txt         # Tested Wikipedia URLs
│   └── example_output.json      # Sample API responses
│
└── README.md                    # This file
```

## 🧪 Testing the Application

### Test Quiz Generation

1. Try different Wikipedia articles:
   - Science: `https://en.wikipedia.org/wiki/Quantum_mechanics`
   - History: `https://en.wikipedia.org/wiki/World_War_II`
   - Technology: `https://en.wikipedia.org/wiki/Blockchain`
   - Biography: `https://en.wikipedia.org/wiki/Albert_Einstein`

2. Verify the quiz includes:
   - 7-10 questions
   - 4 options per question
   - Correct answers marked
   - Explanations for each answer
   - Article summary
   - Key entities
   - Related topics

### Test Quiz History

1. Generate multiple quizzes
2. Navigate to "Quiz History" tab
3. Click "View Details" on any quiz
4. Verify all quiz data is displayed correctly in the modal

## 🔧 Troubleshooting

### Backend Issues

**Error: "GEMINI_API_KEY not found"**
- Make sure you created a `.env` file in the backend folder
- Verify the API key is correctly set in `.env`

**Error: "Failed to fetch Wikipedia page"**
- Check your internet connection
- Verify the Wikipedia URL is correct and accessible
- Some Wikipedia pages may have restrictions

### Frontend Issues

**Error: "Failed to fetch"**
- Ensure the backend server is running on `http://localhost:8000`
- Check CORS settings in `main.py`

**Blank page or errors in console**
- Make sure all dependencies are installed (`npm install`)
- Clear browser cache and reload

## 📝 Database Schema

### Quiz Table
- `id` (Integer, Primary Key, Auto-increment)
- `url` (String, Indexed) - Wikipedia article URL (indexed for caching)
- `title` (String) - Article title
- `date_generated` (DateTime) - Timestamp when quiz was created
- `scraped_content` (Text) - Cleaned Wikipedia article text
- `raw_html` (Text) - Original HTML content for reference
- `full_quiz_data` (Text) - Serialized JSON containing complete quiz data

The `full_quiz_data` field stores the complete structured quiz output including:
- Title and summary
- Array of questions with options, answers, explanations, sections, and difficulty
- Key entities extracted from the article
- Related topics for further exploration

## 🔑 Key Implementation Details

### LLM Integration (LangChain + Gemini)

The quiz generation uses a carefully designed prompt template that ensures structured, grounded output:

```python
# From llm_quiz_generator.py

def create_prompt(article_text: str) -> str:
    prompt = f"""You are an expert educational content creator. 
    Your task is to analyze a Wikipedia article and create an engaging quiz.

    Wikipedia Article Content:
    {article_text[:3000]}

    Based on this article, generate a comprehensive quiz following these guidelines:
    
    1. **Title**: Use the exact article title
    2. **Summary**: Write a concise 2-3 sentence summary
    3. **Questions**: Create 7-10 multiple-choice questions that:
       - Cover different aspects of the article
       - Progress from basic to challenging
       - Have 4 options each (A, B, C, D)
       - Include clear explanations
       - Categorize by section (Overview, History, Key Concepts, etc.)
       - Mark difficulty as easy/medium/hard
    4. **Key Entities**: Identify 3-5 main entities/people/places
    5. **Related Topics**: Suggest 3-5 related topics

    You MUST respond with ONLY valid JSON in this exact format:
    {{
      "title": "string",
      "summary": "string",
      "questions": [...],
      "key_entities": [...],
      "related_topics": [...]
    }}
    """
    return prompt
```

**Key Techniques:**
- Detailed structured prompt to minimize hallucination
- Pydantic schema validation for type safety
- Explicit JSON format requirements
- Grounding in article content (first 3000 chars)
- Temperature set to 0.7 for balanced creativity

### Web Scraping Strategy

```python
# From scraper.py - Clean content extraction

def scrape_wikipedia(url: str):
    # Fetch and parse HTML
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Extract main content only
    content_div = soup.find('div', {'id': 'mw-content-text'})
    
    # Remove noise: references, tables, infoboxes
    for tag in content_div.find_all(['sup', 'table', 'div']):
        tag.decompose()
    
    # Clean text extraction
    paragraphs = content_div.find_all('p')
    cleaned_text = '\n\n'.join([p.get_text() for p in paragraphs])
    
    return cleaned_text, title, raw_html
```

## 📊 Sample Data

The `sample_data/` folder contains:
- **example_urls.txt**: List of tested Wikipedia URLs
- **example_output.json**: Complete API responses showing quiz structure

## 🌟 Bonus Features Implemented

- [x] Interactive quiz-taking mode with score tracking
- [x] URL validation and preview
- [x] Smart caching to prevent duplicate scraping
- [x] Section-wise question grouping
- [x] Difficulty level classification
- [x] Raw HTML storage for reference
- [x] Modern glassmorphic UI design

## ✅ Assignment Compliance Checklist

- [x] **Backend in Python**: FastAPI with no Node.js in backend
- [x] **LLM Integration**: Gemini via LangChain with structured output
- [x] **Web Scraping**: BeautifulSoup for Wikipedia content extraction
- [x] **Database**: SQLite (default) with MySQL/PostgreSQL support
- [x] **Pydantic Validation**: Structured quiz output with type checking
- [x] **API Endpoints**: `/generate_quiz`, `/history`, `/quiz/{id}`
- [x] **Frontend**: React + Tailwind CSS with two tabs
- [x] **Quiz Structure**: Questions with options, answers, explanations, difficulty, sections
- [x] **Metadata Extraction**: Summary, key entities, related topics
- [x] **Data Persistence**: All data stored in database with JSON serialization
- [x] **History View**: Table with details modal
- [x] **Error Handling**: Invalid URLs, network errors, parsing errors
- [x] **Prompt Template**: Documented in code and README
- [x] **Sample Data**: Example URLs and outputs included
- [x] **README**: Complete setup, testing, and API documentation

## 📄 License

This project is created for educational purposes as part of the DeepKlarity assignment.

## 📧 Submission Notes

This project demonstrates:
1. **Clean architecture**: Separation of concerns (scraping, LLM, database, API)
2. **Production-ready code**: Error handling, validation, logging
3. **Modern best practices**: Type hints, Pydantic models, async/await
4. **Extensibility**: Easy to add new features or swap components
5. **User experience**: Fast, intuitive UI with real-time feedback
