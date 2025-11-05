import React, { useState } from 'react';
import QuizTaker from './QuizTaker';

export default function QuizDisplay({ quizData }) {
  const [mode, setMode] = useState('view'); // 'view' or 'take'

  if (!quizData) return null;

  const { quiz_data } = quizData;

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
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <span>📝</span>
          Take This Quiz
        </button>
      </div>

      {/* Summary Section */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Summary</h3>
        <p className="text-blue-800">{quiz_data.summary}</p>
      </div>

      {/* Key Entities */}
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
        <h3 className="text-lg font-semibold text-green-900 mb-2">Key Entities</h3>
        <div className="flex flex-wrap gap-2">
          {quiz_data.key_entities.map((entity, index) => (
            <span
              key={index}
              className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {entity}
            </span>
          ))}
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Quiz Questions</h3>
        {quiz_data.questions.map((question, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-3">
              {index + 1}. {question.question}
            </h4>
            
            <div className="space-y-2 mb-4">
              {question.options.map((option, optIndex) => (
                <div
                  key={optIndex}
                  className={`p-3 rounded-lg border ${
                    option === question.correct_answer
                      ? 'bg-green-50 border-green-300'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <span className="font-medium mr-2">
                    {String.fromCharCode(65 + optIndex)}.
                  </span>
                  <span className={option === question.correct_answer ? 'font-semibold text-green-800' : ''}>
                    {option}
                  </span>
                  {option === question.correct_answer && (
                    <span className="ml-2 text-green-600 font-bold">✓</span>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
              <p className="text-sm text-yellow-900">
                <span className="font-semibold">Explanation: </span>
                {question.explanation}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Related Topics */}
      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
        <h3 className="text-lg font-semibold text-purple-900 mb-2">Related Topics</h3>
        <ul className="list-disc list-inside space-y-1">
          {quiz_data.related_topics.map((topic, index) => (
            <li key={index} className="text-purple-800">{topic}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
