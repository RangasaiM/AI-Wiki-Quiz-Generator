from google import generativeai as genai
from google.generativeai.types import GenerationConfig
from models import QuizOutput
import os
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()


def initialize_llm():
    """
    Initialize the Gemini LLM.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY not found in environment variables")
    
    genai.configure(api_key=api_key)
    # Use gemini-2.5-flash which is the latest stable fast model
    model = genai.GenerativeModel('gemini-2.5-flash')
    return model


def create_prompt(article_text: str) -> str:
    """
    Create the prompt for quiz generation.
    """
    prompt = f"""You are an expert educational content creator. Your task is to analyze a Wikipedia article and create an engaging, educational quiz.

Wikipedia Article Content:
{article_text[:3000]}  

Based on this article, generate a comprehensive quiz following these guidelines:

1. **Title**: Use the exact article title
2. **Summary**: Write a concise 2-3 sentence summary capturing the main points
3. **Questions**: Create 7-10 multiple-choice questions that:
   - Cover different aspects of the article (main concepts, key facts, important details)
   - Progress from basic to more challenging
   - Have 4 options each (labeled A, B, C, D)
   - Include clear, educational explanations for the correct answers
   - Avoid trivial or overly specific details
   
4. **Key Entities**: Identify 3-5 main entities, people, places, or concepts from the article
5. **Related Topics**: Suggest 3-5 related topics for further exploration

You MUST respond with ONLY valid JSON. Do not include any explanatory text before or after the JSON. Do not wrap in markdown code blocks.

Use this exact format:
{{
  "title": "string",
  "summary": "string",
  "questions": [
    {{
      "question": "string",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correct_answer": "string (must match one of the options)",
      "explanation": "string"
    }}
  ],
  "key_entities": ["string"],
  "related_topics": ["string"]
}}"""
    return prompt


def generate_quiz(article_text: str) -> QuizOutput:
    """
    Generate a quiz from Wikipedia article text.
    
    Args:
        article_text: Cleaned Wikipedia article content
        
    Returns:
        QuizOutput object with quiz data
    """
    try:
        model = initialize_llm()
        prompt = create_prompt(article_text)
        
        # Generate content
        response = model.generate_content(
            prompt,
            generation_config=GenerationConfig(
                temperature=0.7
            )
        )
        
        # Get the response text
        response_text = response.text.strip()
        
        # Remove markdown code blocks if present
        if response_text.startswith('```'):
            # Remove ```json or ``` at start and ``` at end
            lines = response_text.split('\n')
            if lines[0].startswith('```'):
                lines = lines[1:]
            if lines[-1].strip() == '```':
                lines = lines[:-1]
            response_text = '\n'.join(lines).strip()
        
        # Parse the JSON response
        try:
            result = json.loads(response_text)
        except json.JSONDecodeError as je:
            print(f"Failed to parse JSON. Response was: {response_text[:500]}...")
            raise Exception(f"Invalid JSON response from AI: {str(je)}")
        
        # Validate and return as QuizOutput
        return QuizOutput(**result)
        
    except Exception as e:
        raise Exception(f"Failed to generate quiz: {str(e)}")
