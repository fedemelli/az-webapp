import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Clock, ExternalLink, CheckCircle2, Circle, BookOpen, Loader2 } from 'lucide-react';
import { studyPlan } from '../../data/studyPlan';
import { loadTopicContent } from '../../data/contentLoader';
import { useProgress } from '../../context/ProgressContext';
import { CATEGORIES } from '../../types';

export function TopicDetail() {
  const { dayId, topicId } = useParams<{ dayId: string; topicId: string }>();
  const { isTopicCompleted, toggleTopic } = useProgress();
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const dayNum = parseInt(dayId || '1', 10);
  const day = studyPlan.find(d => d.day === dayNum);
  const topic = day?.topics.find(t => t.id === topicId);

  // Carica il contenuto dinamicamente
  useEffect(() => {
    if (topic) {
      setIsLoading(true);
      loadTopicContent(topic.id).then((loadedContent) => {
        // Se il contenuto viene caricato dal file esterno, usalo
        // Altrimenti usa il contenuto inline (fallback per compatibilità)
        setContent(loadedContent || topic.content || '');
        setIsLoading(false);
      });
    }
  }, [topic]);

  if (!day || !topic) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Argomento non trovato</p>
        <Link to={`/day/${dayId}`} className="text-indigo-600 hover:underline mt-2 inline-block">
          Torna al giorno {dayId}
        </Link>
      </div>
    );
  }

  const category = CATEGORIES[day.category];
  const completed = isTopicCompleted(topic.id);

  // Trova argomento precedente e successivo
  const currentIndex = day.topics.findIndex(t => t.id === topicId);
  const prevTopic = currentIndex > 0 ? day.topics[currentIndex - 1] : null;
  const nextTopic = currentIndex < day.topics.length - 1 ? day.topics[currentIndex + 1] : null;

  const handleToggleComplete = () => {
    toggleTopic(topic.id);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4 sm:mb-6 flex-wrap">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to={`/day/${day.day}`} className="hover:text-indigo-600 transition-colors">
          Giorno {day.day}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-900 font-medium truncate">{topic.title}</span>
      </div>

      {/* Header Card */}
      <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-8 mb-4 sm:mb-6">
        <div className="flex items-start justify-between gap-4 mb-4 sm:mb-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <span className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${category.bgColor} ${category.color}`}>
                {category.name}
              </span>
              <span className="text-xs sm:text-sm text-slate-400">
                Giorno {day.day}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-2 tracking-tight">
              {topic.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-500">{topic.description}</p>
          </div>

          <button
            onClick={handleToggleComplete}
            className={`flex-shrink-0 p-2 sm:p-3 rounded-xl transition-all ${completed
                ? 'bg-emerald-100 text-emerald-600 shadow-inner'
                : 'bg-slate-100/50 text-slate-400 hover:bg-indigo-100 hover:text-indigo-600'
              }`}
            title={completed ? 'Segna come non completato' : 'Segna come completato'}
          >
            {completed ? (
              <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
            ) : (
              <Circle className="w-6 h-6 sm:w-8 sm:h-8" />
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-500 border-t border-slate-200/50 pt-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>~{topic.duration} minuti di studio</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Argomento {currentIndex + 1} di {day.topics.length}</span>
          </div>
          {completed && (
            <span className="ml-auto text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Completato
            </span>
          )}
        </div>
      </div>

      {/* Content Card */}
      <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-8 mb-4 sm:mb-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <span className="ml-3 text-slate-500">Caricamento contenuto...</span>
          </div>
        ) : content ? (
          <div className="topic-content text-sm sm:text-base">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500">
            <p>Contenuto non disponibile.</p>
            <p className="text-sm mt-2">Consulta la documentazione Microsoft Learn per questo argomento.</p>
          </div>
        )}
      </div>

      {/* Microsoft Learn Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white mb-4 sm:mb-6 shadow-xl shadow-indigo-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">Approfondisci su Microsoft Learn</h3>
            <p className="text-indigo-100 text-sm">
              Consulta la documentazione ufficiale per ulteriori dettagli e laboratori pratici.
            </p>
          </div>
          <a
            href={topic.msLearnUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all font-medium text-sm sm:text-base flex-shrink-0 shadow-sm hover:shadow-md"
          >
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Vai a Microsoft Learn</span>
          </a>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2 sm:pt-4 gap-2">
        {prevTopic ? (
          <Link
            to={`/day/${day.day}/topic/${prevTopic.id}`}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline truncate max-w-[150px]">{prevTopic.title}</span>
            <span className="sm:hidden">Precedente</span>
          </Link>
        ) : (
          <Link
            to={`/day/${day.day}`}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Torna al giorno</span>
          </Link>
        )}

        {nextTopic ? (
          <Link
            to={`/day/${day.day}/topic/${nextTopic.id}`}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <span className="hidden sm:inline truncate max-w-[150px]">{nextTopic.title}</span>
            <span className="sm:hidden">Successivo</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <Link
            to={`/day/${day.day}`}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <span>Torna al giorno</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
