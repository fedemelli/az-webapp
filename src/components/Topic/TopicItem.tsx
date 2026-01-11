import { Link } from 'react-router-dom';
import { ChevronRight, Clock, CheckCircle2, Circle } from 'lucide-react';
import type { Topic } from '../../types';
import { useProgress } from '../../context/ProgressContext';

interface TopicItemProps {
  topic: Topic;
  dayId: number;
}

export function TopicItem({ topic, dayId }: TopicItemProps) {
  const { isTopicCompleted, toggleTopic } = useProgress();

  const completed = isTopicCompleted(topic.id);

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleTopic(topic.id);
  };

  return (
    <Link
      to={`/day/${dayId}/topic/${topic.id}`}
      className={`block border rounded-lg sm:rounded-xl overflow-hidden transition-all hover:shadow-md ${
        completed ? 'border-emerald-200 bg-emerald-50/50' : 'border-slate-200 bg-white hover:border-indigo-200'
      }`}
    >
      <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4">
        <button
          onClick={handleToggleComplete}
          className={`flex-shrink-0 transition-colors ${
            completed ? 'text-emerald-500' : 'text-slate-300 hover:text-indigo-500'
          }`}
        >
          {completed ? (
            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <Circle className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h4 className={`text-sm sm:text-base font-medium ${completed ? 'text-emerald-700' : 'text-slate-900'}`}>
            {topic.title}
          </h4>
          <p className="text-xs sm:text-sm text-slate-500 truncate">{topic.description}</p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-400 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{topic.duration} min</span>
          </div>
          <span className="sm:hidden">{topic.duration}m</span>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
        </div>
      </div>
    </Link>
  );
}
