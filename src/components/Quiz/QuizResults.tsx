import { Trophy, Target, TrendingUp } from 'lucide-react';
import type { QuizQuestion } from '../../types';

interface QuizResultsProps {
  questions: QuizQuestion[];
  answers: number[];
}

export function QuizResults({ questions, answers }: QuizResultsProps) {
  const correctCount = answers.filter(
    (answer, index) => answer === questions[index].correctAnswer
  ).length;
  const percentage = Math.round((correctCount / questions.length) * 100);

  const getMessage = () => {
    if (percentage === 100) return { text: 'Perfetto! Hai padroneggiato questo argomento!', color: 'text-emerald-600' };
    if (percentage >= 80) return { text: 'Ottimo lavoro! Continua così!', color: 'text-emerald-600' };
    if (percentage >= 60) return { text: 'Buon risultato, ma c\'è margine di miglioramento.', color: 'text-amber-600' };
    return { text: 'Rileggi gli argomenti e riprova il quiz.', color: 'text-red-600' };
  };

  const message = getMessage();

  return (
    <div className="text-center py-6">
      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
        percentage >= 80 ? 'bg-emerald-100' : percentage >= 60 ? 'bg-amber-100' : 'bg-red-100'
      }`}>
        <Trophy className={`w-10 h-10 ${
          percentage >= 80 ? 'text-emerald-500' : percentage >= 60 ? 'text-amber-500' : 'text-red-500'
        }`} />
      </div>

      <h3 className="text-2xl font-bold text-slate-900 mb-2">
        {correctCount} su {questions.length}
      </h3>
      <p className={`text-lg font-medium ${message.color} mb-6`}>
        {message.text}
      </p>

      <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
        <div className="bg-slate-50 rounded-xl p-4">
          <Target className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-slate-900">{percentage}%</div>
          <div className="text-sm text-slate-500">Punteggio</div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <TrendingUp className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-slate-900">{correctCount}</div>
          <div className="text-sm text-slate-500">Corrette</div>
        </div>
      </div>
    </div>
  );
}
