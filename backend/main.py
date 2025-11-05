from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime
import json

from database import init_db, get_db, Quiz
from models import QuizGenerateRequest, QuizHistoryResponse, QuizDetailResponse, QuizOutput
from scraper import scrape_wikipedia
from llm_quiz_generator import generate_quiz

# Initialize FastAPI app
app = FastAPI(
    title="AI Wiki Quiz Generator API",
    description="Generate educational quizzes from Wikipedia articles using AI",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    """
    Initialize database on startup.
    """
    init_db()
    print("✅ Database initialized successfully")


@app.get("/")
async def root():
    """
    Root endpoint - API health check.
    """
    return {
        "message": "AI Wiki Quiz Generator API is running",
        "version": "1.0.0",
        "endpoints": {
            "generate_quiz": "POST /generate_quiz",
            "history": "GET /history",
            "quiz_detail": "GET /quiz/{quiz_id}"
        }
    }


@app.post("/generate_quiz")
async def generate_quiz_endpoint(request: QuizGenerateRequest, db: Session = Depends(get_db)):
    """
    Generate a quiz from a Wikipedia URL.
    
    Args:
        request: QuizGenerateRequest with Wikipedia URL
        db: Database session
        
    Returns:
        Generated quiz data with ID
    """
    try:
        # Step 1: Scrape Wikipedia article
        print(f"🔍 Scraping Wikipedia article: {request.url}")
        scraped_content, title = scrape_wikipedia(request.url)
        
        # Step 2: Generate quiz using LLM
        print(f"🤖 Generating quiz for: {title}")
        quiz_output = generate_quiz(scraped_content)
        
        # Step 3: Save to database
        quiz_data_json = quiz_output.model_dump_json()  # Serialize to JSON string
        
        new_quiz = Quiz(
            url=request.url,
            title=title,
            scraped_content=scraped_content,
            full_quiz_data=quiz_data_json,
            date_generated=datetime.utcnow()
        )
        
        db.add(new_quiz)
        db.commit()
        db.refresh(new_quiz)
        
        print(f"✅ Quiz saved with ID: {new_quiz.id}")
        
        # Step 4: Return response
        return {
            "id": new_quiz.id,
            "url": new_quiz.url,
            "title": new_quiz.title,
            "date_generated": new_quiz.date_generated.isoformat(),
            "quiz_data": quiz_output.model_dump()
        }
        
    except Exception as e:
        print(f"❌ Error generating quiz: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to generate quiz: {str(e)}")


@app.get("/history", response_model=list[QuizHistoryResponse])
async def get_history(db: Session = Depends(get_db)):
    """
    Get list of all generated quizzes.
    
    Returns:
        List of quiz history entries
    """
    try:
        quizzes = db.query(Quiz).order_by(Quiz.date_generated.desc()).all()
        
        return [
            QuizHistoryResponse(
                id=quiz.id,
                url=quiz.url,
                title=quiz.title,
                date_generated=quiz.date_generated.isoformat()
            )
            for quiz in quizzes
        ]
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch history: {str(e)}")


@app.get("/quiz/{quiz_id}")
async def get_quiz_detail(quiz_id: int, db: Session = Depends(get_db)):
    """
    Get detailed quiz data by ID.
    
    Args:
        quiz_id: Quiz ID to retrieve
        
    Returns:
        Complete quiz data including all questions and metadata
    """
    try:
        quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
        
        if not quiz:
            raise HTTPException(status_code=404, detail=f"Quiz with ID {quiz_id} not found")
        
        # Deserialize the JSON quiz data
        quiz_data = json.loads(quiz.full_quiz_data)
        
        return {
            "id": quiz.id,
            "url": quiz.url,
            "title": quiz.title,
            "date_generated": quiz.date_generated.isoformat(),
            "quiz_data": quiz_data
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch quiz details: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
