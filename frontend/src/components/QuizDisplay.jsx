import React, { useState } from 'react';
import QuizTaker from './QuizTaker';

export default function QuizDisplay({ quizData }) {
  const [mode, setMode] = useState('view'); // 'view' or 'take'

  if (!quizData) return null;

  const { quiz_data } = quizData;

  // Group questions by section
  const groupedQuestions = quiz_data.questions.reduce((acc, question, index) => {
    const section = question.section || 'General';
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push({ ...question, originalIndex: index });
    return acc;
  }, {});

  const sections = Object.keys(groupedQuestions);

  // If in 'take' mode, show QuizTaker component
  if (mode === 'take') {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-900">Take Quiz Mode</h3>
          <button
            onClick={() => setMode('view')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to View Mode
          </button>
        </div>
        <QuizTaker quizData={quizData} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex justify-end">
        <button
          onClick={() => setMode('take')}
          className="gradient-btn flex items-center gap-2"
        >
          <span>📝</span>
          Take This Quiz
        </button>
      </div>

      {/* Summary Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-xl shadow-md card-hover">
        <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
          <span>📜</span> Summary
        </h3>
        <p className="text-blue-800 leading-relaxed">{quiz_data.summary}</p>
      </div>

      {/* Key Entities */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-xl shadow-md card-hover">
        <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
          <span>🎯</span> Key Entities
        </h3>
        <div className="flex flex-wrap gap-3">
          {quiz_data.key_entities.map((entity, index) => (
            <span
              key={index}
              className="bg-gradient-to-r from-green-200 to-emerald-200 text-green-900 px-4 py-2 rounded-full text-sm font-bold shadow-sm hover:shadow-md transition-shadow"
            >
              {entity}
            </span>
          ))}
        </div>
      </div>

      {/* Questions - Section-wise */}
      <div className="space-y-8">
        <h3 className="text-3xl font-bold gradient-text flex items-center gap-3">
          <span>❓</span> Quiz Questions
        </h3>
        
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 flex-1 bg-gradient-to-r from-indigo-200 to-purple-200 rounded"></div>
              <h4 className="text-2xl font-bold gradient-text">{section}</h4>
              <div className="h-1 flex-1 bg-gradient-to-r from-purple-200 to-pink-200 rounded"></div>
            </div>
            
            {groupedQuestions[section].map((question) => (
              <div key={question.originalIndex} className="glass rounded-xl p-6 shadow-lg card-hover">
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {question.originalIndex + 1}
                  </span>
                  <div className="flex-1">
                    <h5 className="font-bold text-gray-900 text-lg mb-2">
                      {question.question}
                    </h5>
                    {question.difficulty && (
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                        question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {question.difficulty.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3 mb-5">
                  {question.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        option === question.correct_answer
                          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-400 shadow-md'
                          : 'bg-white border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <span className="font-bold text-purple-600 mr-3">
                        {String.fromCharCode(65 + optIndex)}.
                      </span>
                      <span className={option === question.correct_answer ? 'font-bold text-green-900' : 'text-gray-800'}>
                        {option}
                      </span>
                      {option === question.correct_answer && (
                        <span className="ml-3 text-green-600 font-bold text-lg">✓</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400 p-4 rounded-xl">
                  <p className="text-sm text-yellow-900">
                    <span className="font-bold">💡 Explanation: </span>
                    {question.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Related Topics */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-6 rounded-xl shadow-md card-hover">
        <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
          <span>🔗</span> Related Topics
        </h3>
        <ul className="space-y-2">
          {quiz_data.related_topics.map((topic, index) => (
            <li key={index} className="text-purple-800 flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span className="font-medium">{topic}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
