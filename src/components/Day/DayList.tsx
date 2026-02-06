import { Link } from 'react-router-dom';
import { studyPlan } from '../../data/studyPlan';
import { DayCard } from './DayCard';
import type { StudyCategory } from '../../types';
import { CATEGORIES } from '../../types';
import { FileQuestion, Trophy } from 'lucide-react';

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
      {/* Quiz Banner */}
      <Link to="/exam-quiz" className="block">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 rounded-full p-4 backdrop-blur-sm">
              <FileQuestion className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                Quiz Simulazione AZ-104
                <Trophy className="w-5 h-5" />
              </h2>
              <p className="text-emerald-100 text-sm">
                Metti alla prova le tue conoscenze con domande reali dell'esame
              </p>
            </div>
            <div className="hidden sm:block text-right">
              <div className="text-3xl font-bold">335</div>
              <div className="text-xs text-emerald-100">Domande</div>
            </div>
          </div>
        </div>
      </Link>

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
