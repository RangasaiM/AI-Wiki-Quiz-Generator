import React, { useState } from 'react';
import { api } from '../services/api';
import QuizDisplay from '../components/QuizDisplay';

export default function GenerateQuizTab() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quizData, setQuizData] = useState(null);
  const [preview, setPreview] = useState(null);
  const [previewing, setPreviewing] = useState(false);

  const handleUrlBlur = async () => {
    if (!url.trim() || !url.includes('wikipedia.org')) {
      setPreview(null);
      return;
    }

    setPreviewing(true);
    setError('');

    try {
      const result = await api.previewUrl(url);
      if (result.valid) {
        setPreview(result);
      } else {
        setError(result.message);
        setPreview(null);
      }
    } catch (err) {
      setError(err.message);
      setPreview(null);
    } finally {
      setPreviewing(false);
    }
  };

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
    setPreview(null);

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
      <div className="glass rounded-2xl p-8 card-hover slide-up">
        <h2 className="text-3xl font-bold gradient-text mb-6">Generate Quiz from Wikipedia</h2>
        
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
              onBlur={handleUrlBlur}
              placeholder="https://en.wikipedia.org/wiki/..."
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none transition-all duration-300 text-lg"
              disabled={loading}
            />
          </div>

          {/* URL Preview */}
          {previewing && (
            <div className="glass border-2 border-purple-200 p-4 rounded-xl fade-in">
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <span className="animate-spin">⏳</span> Validating URL...
              </p>
            </div>
          )}

          {preview && preview.valid && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-5 rounded-xl shadow-md fade-in">
              <p className="text-sm text-green-800 font-semibold">
                <span className="text-lg">✓</span> Article found: <span className="gradient-text">{preview.title}</span>
              </p>
              <p className="text-xs text-green-600 mt-2">{preview.message}</p>
            </div>
          )}

          {error && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 p-5 rounded-xl shadow-md fade-in">
              <p className="text-red-800 font-semibold">⚠️ {error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-btn disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg py-4"
          >
            {loading ? '🔄 Generating Quiz...' : '✨ Generate Quiz'}
          </button>
        </form>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="glass rounded-2xl p-12 text-center card-hover fade-in">
          <div className="inline-block animate-spin rounded-full h-20 w-20 border-b-4 border-purple-600 mb-6 pulse-glow"></div>
          <h3 className="text-2xl font-bold gradient-text mb-3">Generating Your Quiz</h3>
          <p className="text-gray-600 text-lg mb-6">This may take up to 30 seconds...</p>
          <div className="space-y-3 text-sm text-gray-500">
            <p className="flex items-center justify-center gap-2">
              <span className="text-green-500">✓</span> Scraping Wikipedia article
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="text-green-500">✓</span> Processing content with AI
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="text-yellow-500 animate-pulse">⏳</span> Generating questions and answers
            </p>
          </div>
        </div>
      )}

      {/* Quiz Results */}
      {quizData && !loading && (
        <div className="glass rounded-2xl p-8 card-hover slide-up">
          <div className="mb-8 pb-6 border-b border-gray-200">
            <h2 className="text-4xl font-bold gradient-text mb-3">{quizData.title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <span>🗓️</span>
                {new Date(quizData.date_generated).toLocaleString()}
              </p>
              {quizData.cached && (
                <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                  ⚡ Cached Result
                </span>
              )}
            </div>
          </div>
          
          <QuizDisplay quizData={quizData} />
        </div>
      )}
    </div>
  );
}
