import { useState, useMemo } from 'react';
import type { ExamQuestion } from '../../types';
import { CATEGORIES, type StudyCategory } from '../../types';
import examQuestions from '../../data/examQuestions.json';
import { CheckCircle, XCircle, BookOpen, RotateCcw, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const QUESTIONS_PER_PAGE = 10;

interface QuestionState {
  selectedAnswers: number[];
  showExplanation: boolean;
  isCorrect?: boolean;
}

export const ExamQuiz = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<StudyCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [questionStates, setQuestionStates] = useState<Record<string, QuestionState>>({});
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const questions = examQuestions as ExamQuestion[];

  // Filtri e ricerca
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
      const matchesSearch = searchQuery === '' ||
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.explanation.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [questions, selectedCategory, searchQuery]);

  // Paginazione
  const totalPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE);
  const paginatedQuestions = useMemo(() => {
    const start = currentPage * QUESTIONS_PER_PAGE;
    return filteredQuestions.slice(start, start + QUESTIONS_PER_PAGE);
  }, [filteredQuestions, currentPage]);

  // Reset quando cambiano i filtri
  const handleFilterChange = (category: StudyCategory | 'all') => {
    setSelectedCategory(category);
    setCurrentPage(0);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(0);
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number, questionType: string) => {
    const state = questionStates[questionId] || { selectedAnswers: [], showExplanation: false };
    if (state.showExplanation) return;

    let newSelectedAnswers: number[];
    if (questionType === 'multiple-choice' || questionType === 'hotspot' || questionType === 'drag-drop') {
      newSelectedAnswers = state.selectedAnswers.includes(answerIndex)
        ? state.selectedAnswers.filter(i => i !== answerIndex)
        : [...state.selectedAnswers, answerIndex];
    } else {
      newSelectedAnswers = [answerIndex];
    }

    setQuestionStates(prev => ({
      ...prev,
      [questionId]: { ...state, selectedAnswers: newSelectedAnswers }
    }));
  };

  const handleSubmit = (question: ExamQuestion) => {
    const state = questionStates[question.id];
    if (!state || state.selectedAnswers.length === 0) return;

    const isCorrect =
      state.selectedAnswers.length === question.correctAnswers.length &&
      state.selectedAnswers.every(answer => question.correctAnswers.includes(answer));

    if (!answeredQuestions[question.id]) {
      setScore(prev => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        total: prev.total + 1
      }));
      setAnsweredQuestions(prev => ({ ...prev, [question.id]: true }));
    }

    setQuestionStates(prev => ({
      ...prev,
      [question.id]: { ...state, showExplanation: true, isCorrect }
    }));
  };

  const handleRestart = () => {
    setCurrentPage(0);
    setQuestionStates({});
    setScore({ correct: 0, total: 0 });
    setAnsweredQuestions({});
    setSelectedCategory('all');
    setSearchQuery('');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top quando cambi pagina
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getOptionClass = (question: ExamQuestion, index: number) => {
    const state = questionStates[question.id];
    const baseClass = 'p-3 border-2 rounded-lg cursor-pointer transition-all';

    if (!state || !state.showExplanation) {
      return `${baseClass} ${
        state?.selectedAnswers.includes(index)
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
      }`;
    }

    const isCorrect = question.correctAnswers.includes(index);
    const isSelected = state.selectedAnswers.includes(index);

    if (isCorrect) {
      return `${baseClass} border-green-500 bg-green-50`;
    }
    if (isSelected && !isCorrect) {
      return `${baseClass} border-red-500 bg-red-50`;
    }
    return `${baseClass} border-gray-200 bg-gray-50 cursor-not-allowed`;
  };

  const getOptionIcon = (question: ExamQuestion, index: number) => {
    const state = questionStates[question.id];
    if (!state || !state.showExplanation) return null;

    const isCorrect = question.correctAnswers.includes(index);
    const isSelected = state.selectedAnswers.includes(index);

    if (isCorrect) {
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
    if (isSelected && !isCorrect) {
      return <XCircle className="w-4 h-4 text-red-600" />;
    }
    return null;
  };

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case 'multiple-choice': return 'Risposta Multipla';
      case 'yes-no': return 'Sì/No';
      case 'hotspot': return 'Hotspot';
      case 'drag-drop': return 'Drag & Drop';
      default: return 'Scelta Singola';
    }
  };

  if (paginatedQuestions.length === 0) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Nessuna domanda trovata</h2>
          <p className="text-gray-600 mb-6">
            Prova a modificare i filtri o la ricerca.
          </p>
          <button
            onClick={handleRestart}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reset Filtri
          </button>
        </div>
      </div>
    );
  }

  const startQuestionNumber = currentPage * QUESTIONS_PER_PAGE + 1;
  const endQuestionNumber = Math.min(startQuestionNumber + paginatedQuestions.length - 1, filteredQuestions.length);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Filtri e Ricerca */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Ricerca */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cerca nelle domande..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Filtro Categoria */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => handleFilterChange(e.target.value as StudyCategory | 'all')}
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none appearance-none bg-white"
            >
              <option value="all">Tutte le Categorie</option>
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                <option key={key} value={key}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <span className="text-gray-600">
            <strong>{filteredQuestions.length}</strong> domande trovate
          </span>
          <span className="text-gray-600">
            Pagina <strong>{currentPage + 1}</strong> di <strong>{totalPages}</strong>
          </span>
          <span className="text-gray-600">
            Mostrando domande <strong>{startQuestionNumber}-{endQuestionNumber}</strong>
          </span>
          <span className="text-gray-600">
            Risposte corrette: <strong>{score.correct}/{score.total}</strong>
            {score.total > 0 && ` (${Math.round((score.correct / score.total) * 100)}%)`}
          </span>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {paginatedQuestions.map((question, index) => {
          const globalNumber = currentPage * QUESTIONS_PER_PAGE + index + 1;
          const state = questionStates[question.id] || { selectedAnswers: [], showExplanation: false };

          return (
            <div key={question.id} className="bg-white rounded-lg shadow-md p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-lg font-bold text-gray-700">#{globalNumber}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${CATEGORIES[question.category].bgColor} ${CATEGORIES[question.category].color}`}>
                    {CATEGORIES[question.category].name}
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {getQuestionTypeLabel(question.type)}
                  </span>
                </div>
              </div>

              {question.note && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
                  <p className="text-sm text-yellow-800">{question.note}</p>
                </div>
              )}

              <div className="prose max-w-none mb-4">
                <p className="text-base whitespace-pre-line">{question.question}</p>
              </div>

              {/* Options */}
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    onClick={() => handleAnswerSelect(question.id, optionIndex, question.type)}
                    className={getOptionClass(question, optionIndex)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            state.selectedAnswers.includes(optionIndex)
                              ? 'border-blue-600 bg-blue-600'
                              : 'border-gray-300'
                          }`}
                        >
                          {state.selectedAnswers.includes(optionIndex) && (
                            <div className="w-2.5 h-2.5 bg-white rounded-full" />
                          )}
                        </div>
                        <span className="text-sm">{option}</span>
                      </div>
                      {getOptionIcon(question, optionIndex)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              {!state.showExplanation && (
                <button
                  onClick={() => handleSubmit(question)}
                  disabled={state.selectedAnswers.length === 0}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                >
                  Verifica Risposta
                </button>
              )}

              {/* Explanation */}
              {state.showExplanation && (
                <div className="mt-4 space-y-3">
                  <div
                    className={`p-4 rounded-lg ${
                      state.isCorrect
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                      {state.isCorrect ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-green-800">Risposta Corretta!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-600" />
                          <span className="text-red-800">Risposta Errata</span>
                        </>
                      )}
                    </h3>
                    <p className="text-sm text-gray-700 whitespace-pre-line">{question.explanation}</p>
                  </div>

                  {question.reference && (
                    <a
                      href={question.reference}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Approfondisci su Microsoft Learn</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i).map((page) => {
              // Mostra solo alcune pagine
              if (
                page === 0 || // Prima pagina
                page === totalPages - 1 || // Ultima pagina
                (page >= currentPage - 2 && page <= currentPage + 2) // Pagine vicine
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg transition-colors ${
                      page === currentPage
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {page + 1}
                  </button>
                );
              } else if (
                page === currentPage - 3 ||
                page === currentPage + 3
              ) {
                return <span key={page} className="text-gray-400">...</span>;
              }
              return null;
            })}

            <button
              onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Reset Button */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <button
          onClick={handleRestart}
          className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors inline-flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Ricomincia Quiz
        </button>
      </div>
    </div>
  );
};
