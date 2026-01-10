import { CheckCircle2, XCircle } from 'lucide-react';
import type { QuizQuestion as QuizQuestionType } from '../../types';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (index: number) => void;
  selectedAnswer?: number;
  showExplanation: boolean;
}

export function QuizQuestion({
  question,
  onAnswer,
  selectedAnswer,
  showExplanation
}: QuizQuestionProps) {
  const hasAnswered = selectedAnswer !== undefined;
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div>
      <h3 className="text-sm sm:text-lg font-medium text-slate-900 mb-3 sm:mb-4">
        {question.question}
      </h3>

      <div className="space-y-2">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectOption = index === question.correctAnswer;

          let optionClasses = 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50';

          if (showExplanation) {
            if (isCorrectOption) {
              optionClasses = 'border-emerald-500 bg-emerald-50';
            } else if (isSelected && !isCorrectOption) {
              optionClasses = 'border-red-500 bg-red-50';
            } else {
              optionClasses = 'border-slate-200 bg-slate-50 opacity-60';
            }
          } else if (isSelected) {
            optionClasses = 'border-indigo-500 bg-indigo-50';
          }

          return (
            <button
              key={index}
              onClick={() => !hasAnswered && onAnswer(index)}
              disabled={hasAnswered}
              className={`w-full p-3 sm:p-4 text-left rounded-lg sm:rounded-xl border-2 transition-all ${optionClasses} ${
                hasAnswered ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0 ${
                  showExplanation && isCorrectOption
                    ? 'bg-emerald-500 text-white'
                    : showExplanation && isSelected && !isCorrectOption
                      ? 'bg-red-500 text-white'
                      : isSelected
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-100 text-slate-600'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className={`flex-1 text-xs sm:text-base ${
                  showExplanation && isCorrectOption
                    ? 'text-emerald-700 font-medium'
                    : showExplanation && isSelected && !isCorrectOption
                      ? 'text-red-700'
                      : 'text-slate-700'
                }`}>
                  {option}
                </span>
                {showExplanation && isCorrectOption && (
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" />
                )}
                {showExplanation && isSelected && !isCorrectOption && (
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className={`mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg sm:rounded-xl ${isCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'}`}>
          <div className="flex items-start gap-2">
            {isCorrect ? (
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className={`text-sm sm:text-base font-medium ${isCorrect ? 'text-emerald-700' : 'text-amber-700'}`}>
                {isCorrect ? 'Corretto!' : 'Non corretto'}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
