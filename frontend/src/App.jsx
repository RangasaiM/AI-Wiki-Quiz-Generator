import React, { useState } from 'react';
import GenerateQuizTab from './tabs/GenerateQuizTab';
import HistoryTab from './tabs/HistoryTab';

function App() {
  const [activeTab, setActiveTab] = useState('generate');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 fade-in">
      {/* Header */}
      <header className="glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-5xl font-bold gradient-text slide-up">
            🧠 AI Quiz Generator
          </h1>
          <p className="text-gray-700 mt-3 text-lg slide-up">
            Transform Wikipedia articles into intelligent quizzes with AI
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="glass rounded-2xl p-2 mb-8 card-hover slide-up">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('generate')}
              className={`flex-1 px-6 py-4 text-lg font-bold rounded-xl transition-all duration-300 ${
                activeTab === 'generate'
                  ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg scale-105'
                  : 'text-gray-700 hover:bg-white/50'
              }`}
            >
              ✨ Generate Quiz
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 px-6 py-4 text-lg font-bold rounded-xl transition-all duration-300 ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg scale-105'
                  : 'text-gray-700 hover:bg-white/50'
              }`}
            >
              📚 Quiz History
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300">
          {activeTab === 'generate' && <GenerateQuizTab />}
          {activeTab === 'history' && <HistoryTab />}
        </div>
      </main>

      {/* Footer */}
      <footer className="glass border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-gray-700 font-medium">
            ⚡ Powered by <span className="gradient-text font-bold">FastAPI</span>, <span className="gradient-text font-bold">React</span>, and <span className="gradient-text font-bold">Google Gemini AI</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
