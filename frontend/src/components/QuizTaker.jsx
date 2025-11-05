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
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Quiz Complete! 🎉</h2>
          <div className="text-6xl font-bold mb-4">{percentage}%</div>
          <p className="text-xl mb-2">
            You scored {score} out of {totalQuestions}
          </p>
          <p className="text-sm opacity-90">
            {percentage >= 80 ? 'Excellent work!' : percentage >= 60 ? 'Good job!' : 'Keep practicing!'}
          </p>
        </div>

        {/* Detailed Results */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">Review Your Answers</h3>
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correct_answer;

            return (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-5 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {isCorrect ? '✓' : '✗'}
                  </div>
                  <h4 className="font-semibold text-gray-900 flex-1">
                    {index + 1}. {question.question}
                  </h4>
                </div>

                <div className="ml-11 space-y-2">
                  {question.options.map((option, optIndex) => {
                    const isUserAnswer = option === userAnswer;
                    const isCorrectAnswer = option === question.correct_answer;

                    return (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-lg border-2 ${
                          isCorrectAnswer
                            ? 'bg-green-50 border-green-300'
                            : isUserAnswer
                            ? 'bg-red-50 border-red-300'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <span className="font-medium mr-2">
                          {String.fromCharCode(65 + optIndex)}.
                        </span>
                        <span className={isCorrectAnswer ? 'font-semibold text-green-800' : ''}>
                          {option}
                        </span>
                        {isCorrectAnswer && (
                          <span className="ml-2 text-green-600 font-bold">✓ Correct</span>
                        )}
                        {isUserAnswer && !isCorrectAnswer && (
                          <span className="ml-2 text-red-600 font-bold">Your answer</span>
                        )}
                      </div>
                    );
                  })}

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded mt-3">
                    <p className="text-sm text-blue-900">
                      <span className="font-semibold">Explanation: </span>
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
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Take Quiz Again
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
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, optIndex) => (
            <button
              key={optIndex}
              onClick={() => handleAnswerSelect(option)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAnswer === option
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <span className="font-medium text-gray-700 mr-3">
                {String.fromCharCode(65 + optIndex)}.
              </span>
              <span className={selectedAnswer === option ? 'font-semibold text-blue-900' : 'text-gray-800'}>
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
          className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous
        </button>
        <button
          onClick={handleNextQuestion}
          disabled={!selectedAnswer}
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
        >
          {currentQuestion === totalQuestions - 1 ? 'Finish Quiz' : 'Next →'}
        </button>
      </div>

      {/* Answer Counter */}
      <div className="text-center text-sm text-gray-600">
        Answered: {Object.keys(userAnswers).length + (selectedAnswer ? 1 : 0)} / {totalQuestions}
      </div>
    </div>
  );
}
