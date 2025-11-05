import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Modal from '../components/Modal';
import QuizDisplay from '../components/QuizDisplay';

export default function HistoryTab() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const data = await api.getHistory();
      setHistory(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (quizId) => {
    try {
      setLoadingDetail(true);
      setModalOpen(true);
      const quizDetail = await api.getQuizDetail(quizId);
      setSelectedQuiz(quizDetail);
    } catch (err) {
      setError(err.message);
      setModalOpen(false);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedQuiz(null);
  };

  if (loading) {
    return (
      <div className="glass rounded-2xl p-16 text-center card-hover fade-in">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mb-6 pulse-glow"></div>
        <p className="text-gray-700 text-lg font-semibold">Loading quiz history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 p-6 rounded-xl shadow-md fade-in">
        <p className="text-red-800 font-bold flex items-center gap-2">
          <span>⚠️</span> {error}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl overflow-hidden shadow-xl card-hover slide-up">
        <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
          <h2 className="text-3xl font-bold gradient-text mb-2">📚 Quiz History</h2>
          <p className="text-gray-700 text-lg font-semibold">
            Total Quizzes: <span className="gradient-text">{history.length}</span>
          </p>
        </div>

        {history.length === 0 ? (
          <div className="p-16 text-center">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-600 text-xl font-semibold mb-2">No quizzes generated yet.</p>
            <p className="text-gray-500">Generate your first quiz from the "Generate Quiz" tab!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Date Generated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {history.map((quiz) => (
                  <tr key={quiz.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{quiz.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {quiz.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-600 max-w-xs truncate">
                      <a href={quiz.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {quiz.url}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(quiz.date_generated).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleViewDetails(quiz.id)}
                        className="gradient-btn px-4 py-2 text-sm"
                      >
                        👁️ View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Quiz Details */}
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={selectedQuiz ? selectedQuiz.title : 'Quiz Details'}
      >
        {loadingDetail ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading quiz details...</p>
          </div>
        ) : selectedQuiz ? (
          <QuizDisplay quizData={selectedQuiz} />
        ) : null}
      </Modal>
    </div>
  );
}
