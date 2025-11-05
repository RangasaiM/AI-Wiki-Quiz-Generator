import React, { useState } from 'react';
import { api } from '../services/api';
import QuizDisplay from '../components/QuizDisplay';

export default function GenerateQuizTab() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quizData, setQuizData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate URL
    if (!url.trim()) {
      setError('Please enter a Wikipedia URL');
      return;
    }

    if (!url.includes('wikipedia.org')) {
      setError('Please enter a valid Wikipedia URL');
      return;
    }

    setError('');
    setLoading(true);
    setQuizData(null);

    try {
      const result = await api.generateQuiz(url);
      setQuizData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Form Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Generate Quiz from Wikipedia</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              Wikipedia Article URL
            </label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://en.wikipedia.org/wiki/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Generating Quiz...' : 'Generate Quiz'}
          </button>
        </form>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Generating Your Quiz</h3>
          <p className="text-gray-600">This may take up to 30 seconds...</p>
          <div className="mt-4 space-y-2 text-sm text-gray-500">
            <p>✓ Scraping Wikipedia article</p>
            <p>✓ Processing content with AI</p>
            <p>✓ Generating questions and answers</p>
          </div>
        </div>
      )}

      {/* Quiz Results */}
      {quizData && !loading && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6 pb-4 border-b">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{quizData.title}</h2>
            <p className="text-sm text-gray-500">
              Generated on {new Date(quizData.date_generated).toLocaleString()}
            </p>
          </div>
          
          <QuizDisplay quizData={quizData} />
        </div>
      )}
    </div>
  );
}
