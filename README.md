# AI Wiki Quiz Generator

A full-stack application that transforms Wikipedia articles into educational quizzes using AI.

## 🎯 Features

- **AI-Powered Quiz Generation**: Uses Google Gemini AI to create engaging quizzes from Wikipedia articles
- **Smart Content Extraction**: Automatically scrapes and cleans Wikipedia content
- **Comprehensive Quizzes**: Generates 7-10 multiple-choice questions with explanations
- **Rich Metadata**: Includes article summaries, key entities, and related topics
- **Quiz History**: Stores and displays all previously generated quizzes
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS

## 🛠️ Tech Stack

### Backend
- **Python 3.10+**
- **FastAPI** - Modern web framework
- **SQLAlchemy** - ORM for SQLite database
- **BeautifulSoup4** - Web scraping
- **LangChain** - LLM framework
- **Google Gemini** - AI model for quiz generation

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling

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
   - Edit `.env` and add your Gemini API key:
     ```
     GEMINI_API_KEY=your_actual_api_key_here
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

### POST /generate_quiz
Generate a quiz from a Wikipedia URL.

**Request:**
```json
{
  "url": "https://en.wikipedia.org/wiki/Artificial_intelligence"
}
```

**Response:**
```json
{
  "id": 1,
  "url": "https://en.wikipedia.org/wiki/Artificial_intelligence",
  "title": "Artificial intelligence",
  "date_generated": "2025-11-05T10:30:00",
  "quiz_data": {
    "title": "Artificial intelligence",
    "summary": "Brief summary...",
    "questions": [...],
    "key_entities": [...],
    "related_topics": [...]
  }
}
```

### GET /history
Get list of all generated quizzes.

**Response:**
```json
[
  {
    "id": 1,
    "url": "https://en.wikipedia.org/wiki/...",
    "title": "Article Title",
    "date_generated": "2025-11-05T10:30:00"
  }
]
```

### GET /quiz/{quiz_id}
Get detailed quiz data by ID.

**Response:**
```json
{
  "id": 1,
  "url": "https://en.wikipedia.org/wiki/...",
  "title": "Article Title",
  "date_generated": "2025-11-05T10:30:00",
  "quiz_data": {
    "title": "...",
    "summary": "...",
    "questions": [...],
    "key_entities": [...],
    "related_topics": [...]
  }
}
```

## 🎮 Usage

1. **Start the backend server** (see Backend Setup)
2. **Start the frontend development server** (see Frontend Setup)
3. **Open your browser** to `http://localhost:5173`
4. **Generate a quiz:**
   - Click on the "Generate Quiz" tab
   - Enter a Wikipedia URL (e.g., `https://en.wikipedia.org/wiki/Python_(programming_language)`)
   - Click "Generate Quiz"
   - Wait for the AI to generate your quiz (~20-30 seconds)
5. **View quiz history:**
   - Click on the "Quiz History" tab
   - Click "View Details" on any quiz to see the full content

## 📁 Project Structure

```
ai-quiz-generator/
├── backend/
│   ├── venv/                    # Python virtual environment
│   ├── database.py              # SQLAlchemy database setup
│   ├── models.py                # Pydantic schemas
│   ├── scraper.py               # Wikipedia scraping logic
│   ├── llm_quiz_generator.py    # LangChain/Gemini integration
│   ├── main.py                  # FastAPI application
│   ├── requirements.txt         # Python dependencies
│   ├── .env.example             # Environment variables template
│   └── quiz_history.db          # SQLite database (auto-created)
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   │   ├── QuizDisplay.jsx
│   │   │   └── Modal.jsx
│   │   ├── services/
│   │   │   └── api.js           # API client
│   │   ├── tabs/
│   │   │   ├── GenerateQuizTab.jsx
│   │   │   └── HistoryTab.jsx
│   │   ├── App.jsx              # Main application
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Tailwind styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── README.md
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
- `id` (Integer, Primary Key)
- `url` (String) - Wikipedia article URL
- `title` (String) - Article title
- `date_generated` (DateTime) - When the quiz was created
- `scraped_content` (Text) - Raw Wikipedia content
- `full_quiz_data` (Text) - JSON string with quiz data

## 🌟 Future Enhancements

- [ ] Add quiz-taking mode with score tracking
- [ ] Export quizzes to PDF
- [ ] Support for multiple languages
- [ ] Add difficulty levels
- [ ] User authentication and personal quiz libraries
- [ ] Share quizzes via links

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or support, please open an issue on GitHub.
