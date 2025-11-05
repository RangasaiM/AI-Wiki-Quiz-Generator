from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional


class QuizQuestion(BaseModel):
    """
    Schema for a single quiz question.
    """
    question: str = Field(..., description="The quiz question text")
    options: List[str] = Field(..., description="List of 4 answer options")
    correct_answer: str = Field(..., description="The correct answer from the options")
    explanation: str = Field(..., description="Brief explanation of why the answer is correct")
    section: Optional[str] = Field(None, description="Section/category this question belongs to")
    difficulty: Optional[str] = Field(None, description="Difficulty level: easy, medium, or hard")


class QuizOutput(BaseModel):
    """
    Schema for the complete LLM output containing quiz and metadata.
    """
    title: str = Field(..., description="Title of the Wikipedia article")
    summary: str = Field(..., description="Brief summary of the article (2-3 sentences)")
    questions: List[QuizQuestion] = Field(..., description="List of 5-10 quiz questions")
    key_entities: List[str] = Field(..., description="List of 3-5 key entities/concepts from the article")
    related_topics: List[str] = Field(..., description="List of 3-5 related topics for further exploration")


class QuizGenerateRequest(BaseModel):
    """
    Request schema for quiz generation endpoint.
    """
    url: str = Field(..., description="Wikipedia article URL")


class URLPreviewRequest(BaseModel):
    """
    Request schema for URL preview endpoint.
    """
    url: str = Field(..., description="Wikipedia article URL to validate")


class QuizHistoryResponse(BaseModel):
    """
    Response schema for quiz history list.
    """
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    url: str
    title: str
    date_generated: str


class QuizDetailResponse(BaseModel):
    """
    Response schema for detailed quiz data.
    """
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    url: str
    title: str
    date_generated: str
    quiz_data: QuizOutput
