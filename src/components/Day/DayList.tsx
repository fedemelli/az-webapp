import { studyPlan } from '../../data/studyPlan';
import { DayCard } from './DayCard';
import type { StudyCategory } from '../../types';
import { CATEGORIES } from '../../types';

export function DayList() {
  const groupedDays: Record<StudyCategory, typeof studyPlan> = {
    'identity-governance': [],
    'storage': [],
    'compute': [],
    'networking': [],
    'monitoring': []
  };

  studyPlan.forEach(day => {
    groupedDays[day.category].push(day);
  });

  return (
    <div className="space-y-6 sm:space-y-10">
      {Object.entries(groupedDays).map(([categoryId, days]) => {
        if (days.length === 0) return null;
        const category = CATEGORIES[categoryId as StudyCategory];

        return (
          <section key={categoryId}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-3 sm:mb-4">
              <h2 className={`text-base sm:text-lg font-bold ${category.color}`}>
                {category.name}
              </h2>
              <span className="text-xs sm:text-sm text-slate-400">
                Peso esame: {category.weight}
              </span>
            </div>
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
              {days.map(day => (
                <DayCard key={day.day} day={day} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
