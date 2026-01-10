import { Link } from 'react-router-dom';
import { ChevronRight, Clock, CheckCircle2, BookOpen } from 'lucide-react';
import type { Day } from '../../types';
import { CATEGORIES } from '../../types';
import { useProgress } from '../../context/ProgressContext';

interface DayCardProps {
  day: Day;
}

export function DayCard({ day }: DayCardProps) {
  const { progress } = useProgress();
  const category = CATEGORIES[day.category];

  const completedTopics = day.topics.filter(t =>
    progress.completedTopics.includes(t.id)
  ).length;
  const totalTopics = day.topics.length;
  const isComplete = completedTopics === totalTopics;
  const progressPercentage = (completedTopics / totalTopics) * 100;

  const totalDuration = day.topics.reduce((acc, t) => acc + t.duration, 0);

  return (
    <Link
      to={`/day/${day.day}`}
      className="group block bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-200 transition-all"
    >
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-base sm:text-lg ${
            isComplete
              ? 'bg-emerald-500 text-white'
              : 'bg-indigo-100 text-indigo-600'
          }`}>
            {isComplete ? <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" /> : day.day}
          </div>
          <div>
            <span className={`inline-block px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-medium ${category.bgColor} ${category.color}`}>
              {category.name}
            </span>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
      </div>

      <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1.5 sm:mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">
        {day.title}
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4 line-clamp-2">
        {day.description}
      </p>

      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4">
        <div className="flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>{totalTopics} arg.</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>{totalDuration} min</span>
        </div>
      </div>

      <div className="relative">
        <div className="w-full h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isComplete ? 'bg-emerald-500' : 'bg-indigo-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-xs text-slate-400 mt-1 sm:mt-1.5 text-right">
          {completedTopics}/{totalTopics}
        </p>
      </div>
    </Link>
  );
}
