import { useState } from 'react';
import { Play, RotateCcw, Trophy } from 'lucide-react';
import type { Day, QuizScore } from '../../types';
import { QuizQuestion } from './QuizQuestion';
import { QuizResults } from './QuizResults';
import { useProgress } from '../../context/ProgressContext';

interface QuizContainerProps {
  day: Day;
}

type QuizState = 'idle' | 'active' | 'completed';

export function QuizContainer({ day }: QuizContainerProps) {
  const { getQuizScore, saveQuizScore } = useProgress();
  const [quizState, setQuizState] = useState<QuizState>('idle');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const previousScore = getQuizScore(day.day);
  const questions = day.quiz;

  const handleStartQuiz = () => {
    setQuizState('active');
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const correctCount = answers.filter(
        (answer, index) => answer === questions[index].correctAnswer
      ).length;
      const score: QuizScore = {
        correct: correctCount,
        total: questions.length,
        completedAt: new Date().toISOString()
      };
      saveQuizScore(day.day, score);
      setQuizState('completed');
    }
  };

  const handleRetry = () => {
    handleStartQuiz();
  };

  if (questions.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900">Quiz del giorno</h2>
        {previousScore && quizState === 'idle' && (
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-emerald-600">
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Ultimo punteggio:</span> {previousScore.correct}/{previousScore.total}
          </div>
        )}
      </div>

      {quizState === 'idle' && (
        <div className="text-center py-6 sm:py-8 bg-slate-50 rounded-lg sm:rounded-xl">
          <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4">
            {questions.length} domande per verificare la tua preparazione
          </p>
          <button
            onClick={handleStartQuiz}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm sm:text-base"
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5" />
            Inizia il Quiz
          </button>
        </div>
      )}

      {quizState === 'active' && (
        <div>
          <div className="flex items-center justify-between mb-3 sm:mb-4 text-xs sm:text-sm text-slate-500">
            <span>Domanda {currentQuestion + 1} di {questions.length}</span>
            <div className="flex gap-1">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                    index < answers.length
                      ? answers[index] === questions[index].correctAnswer
                        ? 'bg-emerald-500'
                        : 'bg-red-500'
                      : index === currentQuestion
                        ? 'bg-indigo-500'
                        : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <QuizQuestion
            question={questions[currentQuestion]}
            onAnswer={handleAnswer}
            selectedAnswer={answers[currentQuestion]}
            showExplanation={showExplanation}
          />

          {showExplanation && (
            <div className="mt-3 sm:mt-4 flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base"
              >
                {currentQuestion + 1 < questions.length ? 'Prossima' : 'Risultati'}
              </button>
            </div>
          )}
        </div>
      )}

      {quizState === 'completed' && (
        <div>
          <QuizResults
            questions={questions}
            answers={answers}
          />
          <div className="flex justify-center mt-4 sm:mt-6">
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Riprova il quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
