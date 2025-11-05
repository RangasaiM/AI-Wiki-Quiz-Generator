from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

# Database configuration
DATABASE_URL = "sqlite:///./quiz_history.db"

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class
Base = declarative_base()


class Quiz(Base):
    """
    Quiz model to store generated quizzes in the database.
    """
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    url = Column(String, nullable=False, index=True)  # Indexed for caching lookups
    title = Column(String, nullable=False)
    date_generated = Column(DateTime, default=datetime.utcnow)
    scraped_content = Column(Text, nullable=True)  # Stores the cleaned Wikipedia content
    raw_html = Column(Text, nullable=True)  # Stores the raw HTML for reference
    full_quiz_data = Column(Text, nullable=False)  # Stores serialized JSON quiz data


# Create all tables
def init_db():
    """
    Initialize the database by creating all tables.
    """
    Base.metadata.create_all(bind=engine)


def get_db():
    """
    Dependency to get database session.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
