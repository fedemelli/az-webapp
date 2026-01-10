import { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, ExternalLink, CheckCircle2, Circle } from 'lucide-react';
import type { Topic } from '../../types';
import { useProgress } from '../../context/ProgressContext';

interface TopicItemProps {
  topic: Topic;
}

export function TopicItem({ topic }: TopicItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isTopicCompleted, toggleTopic } = useProgress();

  const completed = isTopicCompleted(topic.id);

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTopic(topic.id);
  };

  return (
    <div className={`border rounded-lg sm:rounded-xl overflow-hidden transition-all ${
      completed ? 'border-emerald-200 bg-emerald-50/50' : 'border-slate-200 bg-white'
    }`}>
      <div
        className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
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
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="px-3 sm:px-4 pb-3 sm:pb-4 border-t border-slate-100">
          <div className="pt-3 sm:pt-4 pl-7 sm:pl-10">
            <div className="prose prose-sm prose-slate max-w-none">
              <div
                className="text-xs sm:text-sm text-slate-600 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1 [&_h4]:font-semibold [&_h4]:text-slate-800 [&_h4]:mt-3 [&_h4]:mb-2 [&_p]:mb-2"
                dangerouslySetInnerHTML={{ __html: topic.content }}
              />
            </div>

            <a
              href={topic.msLearnUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-xs sm:text-sm font-medium"
            >
              <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Approfondisci su Microsoft Learn</span>
              <span className="sm:hidden">Microsoft Learn</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
