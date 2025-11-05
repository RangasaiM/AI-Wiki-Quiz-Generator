import requests
from bs4 import BeautifulSoup
from typing import Tuple, Dict


def scrape_wikipedia(url: str) -> Tuple[str, str]:
    """
    Scrape a Wikipedia article and extract clean content.
    
    Args:
        url: Wikipedia article URL
        
    Returns:
        Tuple of (cleaned_text, article_title)
        
    Raises:
        Exception: If scraping fails or content cannot be extracted
    """
    try:
        # Set a user agent to avoid being blocked
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        # Fetch the page
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        # Parse HTML
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract title
        title_element = soup.find('h1', {'id': 'firstHeading'})
        if not title_element:
            title_element = soup.find('h1', {'class': 'firstHeading'})
        
        title = title_element.get_text().strip() if title_element else "Unknown Article"
        
        # Find the main content area
        content_div = soup.find('div', {'id': 'mw-content-text'})
        if not content_div:
            raise Exception("Could not find main content area")
        
        # Get all paragraphs from the content
        paragraphs = content_div.find_all('p')
        
        # Clean the content
        cleaned_paragraphs = []
        for p in paragraphs:
            # Remove reference links (sup tags)
            for sup in p.find_all('sup'):
                sup.decompose()
            
            # Remove edit links
            for span in p.find_all('span', {'class': 'mw-editsection'}):
                span.decompose()
            
            # Get text and strip whitespace
            text = p.get_text().strip()
            
            # Only include non-empty paragraphs
            if text and len(text) > 20:  # Filter out very short fragments
                cleaned_paragraphs.append(text)
        
        # Join paragraphs
        cleaned_text = '\n\n'.join(cleaned_paragraphs)
        
        if not cleaned_text:
            raise Exception("No content extracted from the article")
        
        # Limit content length for LLM (approximately 4000 words)
        words = cleaned_text.split()
        if len(words) > 4000:
            cleaned_text = ' '.join(words[:4000]) + "..."
        
        return cleaned_text, title
        
    except requests.RequestException as e:
        raise Exception(f"Failed to fetch Wikipedia page: {str(e)}")
    except Exception as e:
        raise Exception(f"Failed to scrape Wikipedia content: {str(e)}")


def validate_and_preview_url(url: str) -> Dict[str, str]:
    """
    Validate a Wikipedia URL and fetch the article title for preview.
    
    Args:
        url: Wikipedia article URL
        
    Returns:
        Dict with 'valid', 'title', and 'message' keys
    """
    try:
        # Basic URL validation
        if not url or not url.strip():
            return {
                'valid': False,
                'title': '',
                'message': 'URL cannot be empty'
            }
        
        if 'wikipedia.org' not in url:
            return {
                'valid': False,
                'title': '',
                'message': 'URL must be a Wikipedia article'
            }
        
        # Fetch and validate the page
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract title
        title_element = soup.find('h1', {'id': 'firstHeading'})
        if not title_element:
            title_element = soup.find('h1', {'class': 'firstHeading'})
        
        if not title_element:
            return {
                'valid': False,
                'title': '',
                'message': 'Could not find article title. This may not be a valid Wikipedia article.'
            }
        
        title = title_element.get_text().strip()
        
        # Check for content
        content_div = soup.find('div', {'id': 'mw-content-text'})
        if not content_div:
            return {
                'valid': False,
                'title': title,
                'message': 'Article appears to be empty or inaccessible'
            }
        
        return {
            'valid': True,
            'title': title,
            'message': 'Article found and ready for quiz generation'
        }
        
    except requests.Timeout:
        return {
            'valid': False,
            'title': '',
            'message': 'Request timeout. Please try again.'
        }
    except requests.RequestException as e:
        return {
            'valid': False,
            'title': '',
            'message': f'Failed to fetch page: {str(e)}'
        }
    except Exception as e:
        return {
            'valid': False,
            'title': '',
            'message': f'Validation error: {str(e)}'
        }
