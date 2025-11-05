# 📡 API Examples & Sample Data

This document provides example API requests and responses for testing and understanding the application.

## 🔌 API Endpoints Overview

Base URL: `http://localhost:8000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API health check |
| POST | `/generate_quiz` | Generate quiz from Wikipedia URL |
| GET | `/history` | Get all quiz history |
| GET | `/quiz/{quiz_id}` | Get specific quiz details |

---

## 1. Health Check (GET /)

### Request
```bash
curl http://localhost:8000/
```

### Response
```json
{
  "message": "AI Wiki Quiz Generator API is running",
  "version": "1.0.0",
  "endpoints": {
    "generate_quiz": "POST /generate_quiz",
    "history": "GET /history",
    "quiz_detail": "GET /quiz/{quiz_id}"
  }
}
```

---

## 2. Generate Quiz (POST /generate_quiz)

### Request

**cURL:**
```bash
curl -X POST http://localhost:8000/generate_quiz \
  -H "Content-Type: application/json" \
  -d '{"url": "https://en.wikipedia.org/wiki/Python_(programming_language)"}'
```

**JavaScript (fetch):**
```javascript
const response = await fetch('http://localhost:8000/generate_quiz', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://en.wikipedia.org/wiki/Python_(programming_language)'
  })
});

const data = await response.json();
console.log(data);
```

**Python (requests):**
```python
import requests

url = "http://localhost:8000/generate_quiz"
payload = {
    "url": "https://en.wikipedia.org/wiki/Python_(programming_language)"
}

response = requests.post(url, json=payload)
quiz_data = response.json()
print(quiz_data)
```

### Response (Sample)

```json
{
  "id": 1,
  "url": "https://en.wikipedia.org/wiki/Python_(programming_language)",
  "title": "Python (programming language)",
  "date_generated": "2025-11-05T10:30:45.123456",
  "quiz_data": {
    "title": "Python (programming language)",
    "summary": "Python is a high-level, interpreted programming language known for its simplicity and readability. Created by Guido van Rossum and first released in 1991, it emphasizes code readability with significant use of whitespace.",
    "questions": [
      {
        "question": "Who created the Python programming language?",
        "options": [
          "Guido van Rossum",
          "Dennis Ritchie",
          "Bjarne Stroustrup",
          "James Gosling"
        ],
        "correct_answer": "Guido van Rossum",
        "explanation": "Guido van Rossum created Python and first released it in 1991. He is often referred to as Python's 'Benevolent Dictator for Life' (BDFL)."
      },
      {
        "question": "In what year was Python first released?",
        "options": [
          "1991",
          "1985",
          "1995",
          "2000"
        ],
        "correct_answer": "1991",
        "explanation": "Python was first released in 1991 by Guido van Rossum as a successor to the ABC language."
      },
      {
        "question": "What is a key characteristic of Python's syntax?",
        "options": [
          "Significant use of whitespace for code blocks",
          "Use of curly braces for all blocks",
          "Semicolons required at end of lines",
          "Case-insensitive keywords"
        ],
        "correct_answer": "Significant use of whitespace for code blocks",
        "explanation": "Python uses indentation (whitespace) to define code blocks, making it more readable and enforcing consistent formatting."
      },
      {
        "question": "What type of programming language is Python?",
        "options": [
          "Interpreted and high-level",
          "Compiled and low-level",
          "Assembly language",
          "Machine code"
        ],
        "correct_answer": "Interpreted and high-level",
        "explanation": "Python is an interpreted, high-level programming language, meaning code is executed line-by-line and abstracts low-level details."
      },
      {
        "question": "Which philosophy emphasizes Python's design?",
        "options": [
          "Readability counts",
          "Write once, run anywhere",
          "Keep it simple",
          "Move fast and break things"
        ],
        "correct_answer": "Readability counts",
        "explanation": "The Zen of Python emphasizes that 'Readability counts', making code easy to understand and maintain."
      },
      {
        "question": "What is Python's approach to typing?",
        "options": [
          "Dynamic typing",
          "Static typing",
          "Weak typing",
          "No typing"
        ],
        "correct_answer": "Dynamic typing",
        "explanation": "Python uses dynamic typing, meaning variable types are determined at runtime rather than compile time."
      },
      {
        "question": "Which of these is a popular Python web framework?",
        "options": [
          "Django",
          "Laravel",
          "Ruby on Rails",
          "Spring Boot"
        ],
        "correct_answer": "Django",
        "explanation": "Django is one of the most popular Python web frameworks, known for its 'batteries-included' approach."
      }
    ],
    "key_entities": [
      "Guido van Rossum",
      "Python Software Foundation",
      "CPython",
      "Django",
      "NumPy"
    ],
    "related_topics": [
      "Object-oriented programming",
      "Machine Learning with Python",
      "Web development frameworks",
      "Data science and analytics",
      "Scripting and automation"
    ]
  }
}
```

### Error Response (Invalid URL)

```json
{
  "detail": "Failed to generate quiz: Please enter a valid Wikipedia URL"
}
```

### Error Response (Scraping Failed)

```json
{
  "detail": "Failed to generate quiz: Failed to fetch Wikipedia page: 404 Not Found"
}
```

---

## 3. Get History (GET /history)

### Request

**cURL:**
```bash
curl http://localhost:8000/history
```

**JavaScript (fetch):**
```javascript
const response = await fetch('http://localhost:8000/history');
const history = await response.json();
console.log(history);
```

### Response (Sample)

```json
[
  {
    "id": 3,
    "url": "https://en.wikipedia.org/wiki/Artificial_intelligence",
    "title": "Artificial intelligence",
    "date_generated": "2025-11-05T11:15:30.456789"
  },
  {
    "id": 2,
    "url": "https://en.wikipedia.org/wiki/Solar_System",
    "title": "Solar System",
    "date_generated": "2025-11-05T10:45:12.789012"
  },
  {
    "id": 1,
    "url": "https://en.wikipedia.org/wiki/Python_(programming_language)",
    "title": "Python (programming language)",
    "date_generated": "2025-11-05T10:30:45.123456"
  }
]
```

### Response (Empty History)

```json
[]
```

---

## 4. Get Quiz Details (GET /quiz/{quiz_id})

### Request

**cURL:**
```bash
curl http://localhost:8000/quiz/1
```

**JavaScript (fetch):**
```javascript
const quizId = 1;
const response = await fetch(`http://localhost:8000/quiz/${quizId}`);
const quizDetail = await response.json();
console.log(quizDetail);
```

### Response (Sample)

```json
{
  "id": 1,
  "url": "https://en.wikipedia.org/wiki/Python_(programming_language)",
  "title": "Python (programming language)",
  "date_generated": "2025-11-05T10:30:45.123456",
  "quiz_data": {
    "title": "Python (programming language)",
    "summary": "Python is a high-level, interpreted programming language...",
    "questions": [
      {
        "question": "Who created the Python programming language?",
        "options": ["Guido van Rossum", "Dennis Ritchie", "Bjarne Stroustrup", "James Gosling"],
        "correct_answer": "Guido van Rossum",
        "explanation": "Guido van Rossum created Python..."
      }
      // ... more questions
    ],
    "key_entities": ["Guido van Rossum", "Python Software Foundation", "CPython"],
    "related_topics": ["Object-oriented programming", "Machine Learning with Python"]
  }
}
```

### Error Response (Quiz Not Found)

```json
{
  "detail": "Quiz with ID 999 not found"
}
```

---

## 📝 Testing with Different Wikipedia Articles

### Science & Technology
```json
{"url": "https://en.wikipedia.org/wiki/Quantum_mechanics"}
{"url": "https://en.wikipedia.org/wiki/Artificial_intelligence"}
{"url": "https://en.wikipedia.org/wiki/Blockchain"}
{"url": "https://en.wikipedia.org/wiki/Neural_network"}
```

### History & Geography
```json
{"url": "https://en.wikipedia.org/wiki/World_War_II"}
{"url": "https://en.wikipedia.org/wiki/Ancient_Egypt"}
{"url": "https://en.wikipedia.org/wiki/Solar_System"}
{"url": "https://en.wikipedia.org/wiki/Mount_Everest"}
```

### Biography
```json
{"url": "https://en.wikipedia.org/wiki/Albert_Einstein"}
{"url": "https://en.wikipedia.org/wiki/Leonardo_da_Vinci"}
{"url": "https://en.wikipedia.org/wiki/Marie_Curie"}
{"url": "https://en.wikipedia.org/wiki/Steve_Jobs"}
```

### Arts & Culture
```json
{"url": "https://en.wikipedia.org/wiki/Renaissance"}
{"url": "https://en.wikipedia.org/wiki/Jazz"}
{"url": "https://en.wikipedia.org/wiki/Shakespeare"}
{"url": "https://en.wikipedia.org/wiki/Impressionism"}
```

---

## 🧪 Sample Test Scenarios

### Test 1: Basic Quiz Generation
```bash
# Generate a quiz
curl -X POST http://localhost:8000/generate_quiz \
  -H "Content-Type: application/json" \
  -d '{"url": "https://en.wikipedia.org/wiki/Python_(programming_language)"}'

# Expected: JSON response with quiz data
# Check: 7-10 questions, summary, key_entities, related_topics
```

### Test 2: View History
```bash
# Get all quizzes
curl http://localhost:8000/history

# Expected: Array of quiz summaries
# Check: Each has id, url, title, date_generated
```

### Test 3: Get Specific Quiz
```bash
# Get quiz with ID 1
curl http://localhost:8000/quiz/1

# Expected: Complete quiz data with all questions
# Check: Full quiz_data object present
```

### Test 4: Error Handling
```bash
# Try invalid URL
curl -X POST http://localhost:8000/generate_quiz \
  -H "Content-Type: application/json" \
  -d '{"url": "https://invalid-site.com/article"}'

# Expected: Error message
# Check: Proper error detail returned
```

---

## 🔍 Sample Quiz Data Structure

### Complete QuizOutput Schema

```json
{
  "title": "Article Title",
  "summary": "2-3 sentence summary of the article",
  "questions": [
    {
      "question": "Question text here?",
      "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "correct_answer": "Option A",
      "explanation": "Explanation of why Option A is correct"
    }
  ],
  "key_entities": [
    "Entity 1",
    "Entity 2",
    "Entity 3"
  ],
  "related_topics": [
    "Related Topic 1",
    "Related Topic 2",
    "Related Topic 3"
  ]
}
```

---

## 💡 Testing Tips

1. **Test API directly with curl** before using the frontend
2. **Check backend terminal** for detailed error messages
3. **Use browser DevTools** (F12) to see network requests
4. **Try different article lengths** - short vs. long articles
5. **Test error scenarios** - invalid URLs, non-existent pages
6. **Verify database** - check `quiz_history.db` file is created
7. **Monitor response times** - should be 20-30 seconds per quiz

---

## 🐛 Common Issues & Solutions

### Issue: "GEMINI_API_KEY not found"
**Solution:** Create `.env` file in backend folder with valid API key

### Issue: "Failed to fetch Wikipedia page"
**Solution:** Check internet connection and verify Wikipedia URL is accessible

### Issue: "CORS error" in browser
**Solution:** Ensure backend is running and CORS middleware is configured

### Issue: Empty response or timeout
**Solution:** Check backend logs, verify API key quota, try shorter article

---

## 📊 Performance Metrics

Typical response times:
- **Health Check (/)**: < 10ms
- **Get History (/history)**: < 100ms
- **Get Quiz Detail (/quiz/{id})**: < 100ms
- **Generate Quiz (/generate_quiz)**: 20-30 seconds
  - Scraping: 1-2 seconds
  - AI Generation: 15-25 seconds
  - Database Save: < 100ms

---

## 🎯 Success Indicators

A successful quiz generation includes:
- ✅ Valid JSON response
- ✅ 7-10 questions
- ✅ 4 options per question
- ✅ Clear correct answers
- ✅ Helpful explanations
- ✅ Article summary
- ✅ Key entities (3-5)
- ✅ Related topics (3-5)
- ✅ Saved to database
- ✅ Retrievable via /history and /quiz/{id}
