import React, { useState } from 'react';

export default function QuizTaker({ quizData }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  if (!quizData || !quizData.quiz_data) return null;

  const { quiz_data } = quizData;
  const questions = quiz_data.questions;
  const totalQuestions = questions.length;

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
  };

  const handleNextQuestion = () => {
    // Save the answer
    setUserAnswers({
      ...userAnswers,
      [currentQuestion]: selectedAnswer
    });

    // Move to next question or show results
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(userAnswers[currentQuestion + 1] || null);
    } else {
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(userAnswers[currentQuestion - 1] || null);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    setSelectedAnswer(null);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correct_answer) {
        correct++;
      }
    });
    return correct;
  };

  const getScorePercentage = () => {
    return Math.round((calculateScore() / totalQuestions) * 100);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = getScorePercentage();

    return (
      <div className="space-y-6">
        {/* Score Summary */}
        <div className="glass bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl shadow-2xl p-10 text-center slide-up">
          <h2 className="text-4xl font-bold mb-6 flex items-center justify-center gap-3">
            <span>🎉</span> Quiz Complete! <span>🎉</span>
          </h2>
          <div className="text-7xl font-bold mb-6 drop-shadow-lg">{percentage}%</div>
          <p className="text-2xl mb-3 font-semibold">
            You scored {score} out of {totalQuestions}
          </p>
          <p className="text-lg opacity-90">
            {percentage >= 80 ? '🎖️ Excellent work!' : percentage >= 60 ? '👍 Good job!' : '💪 Keep practicing!'}
          </p>
        </div>

        {/* Detailed Results */}
        <div className="space-y-4">
          <h3 className="text-3xl font-bold gradient-text">Review Your Answers</h3>
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correct_answer;

            return (
              <div key={index} className="glass rounded-xl p-6 shadow-lg card-hover fade-in">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                    isCorrect ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' : 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
                  }`}>
                    {isCorrect ? '✓' : '✗'}
                  </div>
                  <h4 className="font-bold text-gray-900 flex-1 text-lg">
                    {index + 1}. {question.question}
                  </h4>
                </div>

                <div className="ml-16 space-y-3">
                  {question.options.map((option, optIndex) => {
                    const isUserAnswer = option === userAnswer;
                    const isCorrectAnswer = option === question.correct_answer;

                    return (
                      <div
                        key={optIndex}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          isCorrectAnswer
                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-400 shadow-md'
                            : isUserAnswer
                            ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-400'
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        <span className="font-bold text-purple-600 mr-2">
                          {String.fromCharCode(65 + optIndex)}.
                        </span>
                        <span className={isCorrectAnswer ? 'font-bold text-green-900' : 'text-gray-800'}>
                          {option}
                        </span>
                        {isCorrectAnswer && (
                          <span className="ml-3 text-green-600 font-bold text-lg">✓ Correct</span>
                        )}
                        {isUserAnswer && !isCorrectAnswer && (
                          <span className="ml-3 text-red-600 font-bold">✗ Your answer</span>
                        )}
                      </div>
                    );
                  })}

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 p-4 rounded-xl mt-4">
                    <p className="text-sm text-blue-900">
                      <span className="font-bold">💡 Explanation: </span>
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Restart Button */}
        <button
          onClick={handleRestartQuiz}
          className="w-full gradient-btn text-lg py-4"
        >
          🔄 Take Quiz Again
        </button>
      </div>
    );
  }

  // Quiz Taking Mode
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="glass rounded-2xl p-6 card-hover">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-gray-700">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          <span className="text-sm font-bold gradient-text">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 h-4 rounded-full transition-all duration-500 shadow-lg"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="glass rounded-2xl shadow-2xl p-10 slide-up">
        <h3 className="text-3xl font-bold gradient-text mb-8">
          {question.question}
        </h3>

        <div className="space-y-4">
          {question.options.map((option, optIndex) => (
            <button
              key={optIndex}
              onClick={() => handleAnswerSelect(option)}
              className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 ${
                selectedAnswer === option
                  ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-xl scale-105 ring-4 ring-purple-200'
                  : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50 hover:shadow-lg'
              }`}
            >
              <span className="font-bold text-purple-600 text-lg mr-4">
                {String.fromCharCode(65 + optIndex)}.
              </span>
              <span className={selectedAnswer === option ? 'font-bold text-purple-900 text-lg' : 'text-gray-800 text-lg'}>
                {option}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
          className="flex-1 bg-white text-gray-700 px-6 py-4 rounded-xl font-bold border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed transition-all text-lg shadow-md hover:shadow-lg"
        >
          ← Previous
        </button>
        <button
          onClick={handleNextQuestion}
          disabled={!selectedAnswer}
          className="flex-1 gradient-btn disabled:opacity-50 disabled:cursor-not-allowed text-lg py-4"
        >
          {currentQuestion === totalQuestions - 1 ? '✅ Finish Quiz' : 'Next →'}
        </button>
      </div>

      {/* Answer Counter */}
      <div className="text-center glass p-4 rounded-xl">
        <p className="text-sm font-bold text-gray-700">
          Answered: <span className="gradient-text text-lg">{Object.keys(userAnswers).length + (selectedAnswer ? 1 : 0)}</span> / {totalQuestions}
        </p>
      </div>
    </div>
  );
}
