import { BookOpen, RotateCcw, Menu, X } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { studyPlan } from '../../data/studyPlan';

interface HeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function Header({ isSidebarOpen, onToggleSidebar }: HeaderProps) {
  const { getCompletedTopicsCount, resetProgress } = useProgress();

  const totalTopics = studyPlan.reduce((acc, day) => acc + day.topics.length, 0);
  const completedCount = getCompletedTopicsCount();
  const progressPercentage = Math.round((completedCount / totalTopics) * 100);

  const handleReset = () => {
    if (window.confirm('Sei sicuro di voler resettare tutti i progressi?')) {
      resetProgress();
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="bg-indigo-600 p-1.5 sm:p-2 rounded-lg">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-xl font-bold text-slate-900">AZ-104 Study Plan</h1>
              <p className="text-xs sm:text-sm text-slate-500 hidden sm:block">30 giorni per la certificazione</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            {/* Mobile progress */}
            <div className="flex sm:hidden items-center gap-2">
              <span className="text-xs font-medium text-emerald-600">{progressPercentage}%</span>
              <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Desktop progress */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">{progressPercentage}% completato</p>
                <p className="text-xs text-slate-500">{completedCount} di {totalTopics} argomenti</p>
              </div>
              <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <button
              onClick={handleReset}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Reset progressi"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
