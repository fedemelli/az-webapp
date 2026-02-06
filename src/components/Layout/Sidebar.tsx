import { Link, useLocation } from 'react-router-dom';
import { Calendar, Trophy, ExternalLink, FileQuestion } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { studyPlan } from '../../data/studyPlan';
import { useProgress } from '../../context/ProgressContext';
import { CATEGORIES } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { progress } = useProgress();

  const getDayProgress = (dayNum: number) => {
    const day = studyPlan.find(d => d.day === dayNum);
    if (!day) return { completed: 0, total: 0 };
    const completed = day.topics.filter(t =>
      progress.completedTopics.includes(t.id)
    ).length;
    return { completed, total: day.topics.length };
  };

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-14 sm:top-16 left-0 z-40
        w-72 sm:w-80 glass border-r border-slate-200/50
        h-[calc(100vh-56px)] sm:h-[calc(100vh-64px)] overflow-y-auto
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
          <ProgressBar />

          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-sm border border-slate-200/50">
            <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Piano di Studio
            </h3>
            <div className="space-y-1 max-h-[50vh] sm:max-h-96 overflow-y-auto">
              {studyPlan.map(day => {
                const prog = getDayProgress(day.day);
                const isComplete = prog.completed === prog.total;
                const isActive = location.pathname === `/day/${day.day}`;
                const category = CATEGORIES[day.category];

                return (
                  <Link
                    key={day.day}
                    to={`/day/${day.day}`}
                    onClick={handleLinkClick}
                    className={`flex items-center gap-2 sm:gap-3 p-2 rounded-lg transition-all duration-200 ${isActive
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                        : 'hover:bg-white/60 text-slate-600 hover:shadow-sm'
                      }`}
                  >
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${isComplete
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                      {isComplete ? <Trophy className="w-3 h-3 sm:w-4 sm:h-4" /> : day.day}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium truncate">{day.title}</p>
                      <p className={`text-xs ${isActive ? 'text-indigo-100' : category.color} hidden sm:block`}>{category.name}</p>
                    </div>
                    <span className={`text-xs flex-shrink-0 ${isActive ? 'text-indigo-100' : 'text-slate-400'}`}>
                      {prog.completed}/{prog.total}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl p-3 sm:p-4 text-white shadow-lg shadow-emerald-500/20">
            <h3 className="font-semibold mb-3 text-sm sm:text-base flex items-center gap-2">
              <FileQuestion className="w-5 h-5" />
              Quiz Simulazione
            </h3>
            <Link
              to="/exam-quiz"
              onClick={handleLinkClick}
              className="block bg-white/20 hover:bg-white/30 rounded-lg p-3 transition-all duration-200 backdrop-blur-sm"
            >
              <p className="text-sm font-medium">Quiz Esame AZ-104</p>
              <p className="text-xs text-emerald-100 mt-1">Testa le tue conoscenze con domande reali</p>
            </Link>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-3 sm:p-4 text-white shadow-lg shadow-indigo-500/20">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Risorse Ufficiali</h3>
            <a
              href="https://learn.microsoft.com/en-us/certifications/exams/az-104"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs sm:text-sm text-indigo-100 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Microsoft Learn AZ-104
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
