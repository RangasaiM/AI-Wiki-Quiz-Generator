const API_BASE_URL = 'http://localhost:8000';

export const api = {
  /**
   * Validate and preview a Wikipedia URL
   */
  async previewUrl(url) {
    try {
      const response = await fetch(`${API_BASE_URL}/preview_url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to preview URL');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error occurred');
    }
  },

  /**
   * Generate a quiz from a Wikipedia URL
   */
  async generateQuiz(url) {
    try {
      const response = await fetch(`${API_BASE_URL}/generate_quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to generate quiz');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error occurred');
    }
  },

  /**
   * Get quiz history
   */
  async getHistory() {
    try {
      const response = await fetch(`${API_BASE_URL}/history`);

      if (!response.ok) {
        throw new Error('Failed to fetch quiz history');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error occurred');
    }
  },

  /**
   * Get detailed quiz data by ID
   */
  async getQuizDetail(quizId) {
    try {
      const response = await fetch(`${API_BASE_URL}/quiz/${quizId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch quiz details');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error occurred');
    }
  },
};
