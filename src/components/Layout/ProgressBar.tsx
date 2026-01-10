import { useProgress } from '../../context/ProgressContext';
import { studyPlan } from '../../data/studyPlan';
import type { StudyCategory } from '../../types';
import { CATEGORIES } from '../../types';

export function ProgressBar() {
  const { progress } = useProgress();

  const getCategoryProgress = (category: StudyCategory) => {
    const categoryDays = studyPlan.filter(d => d.category === category);
    const categoryTopics = categoryDays.flatMap(d => d.topics);
    const completedCount = categoryTopics.filter(t =>
      progress.completedTopics.includes(t.id)
    ).length;
    return {
      completed: completedCount,
      total: categoryTopics.length,
      percentage: categoryTopics.length > 0
        ? Math.round((completedCount / categoryTopics.length) * 100)
        : 0
    };
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Progressi per Area</h3>
      <div className="space-y-3">
        {Object.values(CATEGORIES).map(category => {
          const prog = getCategoryProgress(category.id);
          return (
            <div key={category.id}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-medium ${category.color}`}>
                  {category.name}
                </span>
                <span className="text-xs text-slate-500">
                  {prog.completed}/{prog.total}
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${category.bgColor.replace('bg-', 'bg-').replace('-100', '-500')}`}
                  style={{ width: `${prog.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
