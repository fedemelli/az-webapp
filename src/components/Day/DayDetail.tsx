import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, ChevronRight, BookOpen } from 'lucide-react';
import { studyPlan } from '../../data/studyPlan';
import { CATEGORIES } from '../../types';
import { TopicItem } from '../Topic/TopicItem';
import { QuizContainer } from '../Quiz/QuizContainer';
import { useProgress } from '../../context/ProgressContext';
import { useEffect } from 'react';

export function DayDetail() {
  const { dayId } = useParams<{ dayId: string }>();
  const { setLastAccessedDay, progress } = useProgress();

  const dayNum = parseInt(dayId || '1', 10);
  const day = studyPlan.find(d => d.day === dayNum);

  useEffect(() => {
    if (day) {
      setLastAccessedDay(day.day);
    }
  }, [day, setLastAccessedDay]);

  if (!day) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Giorno non trovato</p>
        <Link to="/" className="text-indigo-600 hover:underline mt-2 inline-block">
          Torna alla home
        </Link>
      </div>
    );
  }

  const category = CATEGORIES[day.category];
  const totalDuration = day.topics.reduce((acc, t) => acc + t.duration, 0);
  const completedTopics = day.topics.filter(t =>
    progress.completedTopics.includes(t.id)
  ).length;

  const prevDay = dayNum > 1 ? dayNum - 1 : null;
  const nextDay = dayNum < 30 ? dayNum + 1 : null;

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-slate-500 hover:text-indigo-600 transition-colors mb-4 sm:mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Torna al piano</span>
        <span className="sm:hidden">Indietro</span>
      </Link>

      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-sm border border-slate-200 mb-4 sm:mb-6">
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <div className="flex-1 min-w-0">
            <span className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${category.bgColor} ${category.color} mb-2 sm:mb-3`}>
              {category.name}
            </span>
            <h1 className="text-lg sm:text-2xl font-bold text-slate-900 mb-1.5 sm:mb-2">
              <span className="sm:hidden">G{day.day}: </span>
              <span className="hidden sm:inline">Giorno {day.day}: </span>
              {day.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-500">{day.description}</p>
          </div>
          <div className="text-right ml-4 flex-shrink-0">
            <div className="text-2xl sm:text-3xl font-bold text-indigo-600">{day.day}</div>
            <div className="text-xs sm:text-sm text-slate-400">di 30</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-500 border-t border-slate-100 pt-3 sm:pt-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{day.topics.length} argomenti</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>~{totalDuration} min</span>
          </div>
          <div className="ml-auto text-emerald-600 font-medium">
            {completedTopics}/{day.topics.length} completati
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Argomenti del giorno</h2>
        <div className="space-y-2 sm:space-y-3">
          {day.topics.map(topic => (
            <TopicItem key={topic.id} topic={topic} dayId={day.day} />
          ))}
        </div>
      </div>

      {day.quiz.length > 0 && (
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 mb-4 sm:mb-6">
          <QuizContainer day={day} />
        </div>
      )}

      <div className="flex items-center justify-between pt-2 sm:pt-4 gap-2">
        {prevDay ? (
          <Link
            to={`/day/${prevDay}`}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Giorno</span> {prevDay}
          </Link>
        ) : <div />}

        {nextDay && (
          <Link
            to={`/day/${nextDay}`}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors"
          >
            <span className="hidden sm:inline">Giorno</span> {nextDay}
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
