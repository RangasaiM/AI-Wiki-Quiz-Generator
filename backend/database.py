import os
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from dotenv import load_dotenv

# Load .env (only works locally; Render injects env automatically)
load_dotenv()

# ✅ Use DATABASE_URL from environment if present, else fallback to SQLite
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./quiz_history.db")

# ✅ Special case: if it's a PostgreSQL URL from Render, convert to SQLAlchemy format if needed
# (Render sometimes provides a URL starting with 'postgres://', which SQLAlchemy doesn't like)
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# ✅ Create SQLAlchemy engine
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL)

# ✅ Session and base setup
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ✅ Quiz model
class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    url = Column(String, nullable=False, index=True)
    title = Column(String, nullable=False)
    date_generated = Column(DateTime, default=datetime.utcnow)
    scraped_content = Column(Text, nullable=True)
    raw_html = Column(Text, nullable=True)
    full_quiz_data = Column(Text, nullable=False)

# ✅ Create all tables
def init_db():
    Base.metadata.create_all(bind=engine)

# ✅ Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
