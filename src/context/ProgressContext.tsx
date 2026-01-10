import { createContext, useContext, useCallback, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Progress, QuizScore } from '../types';

interface ProgressContextType {
  progress: Progress;
  toggleTopic: (topicId: string) => void;
  isTopicCompleted: (topicId: string) => boolean;
  saveQuizScore: (day: number, score: QuizScore) => void;
  getQuizScore: (day: number) => QuizScore | undefined;
  setLastAccessedDay: (day: number) => void;
  getCompletedTopicsCount: () => number;
  resetProgress: () => void;
}

const initialProgress: Progress = {
  completedTopics: [],
  quizScores: {},
  lastAccessedDay: 1
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useLocalStorage<Progress>('az104-progress', initialProgress);

  const toggleTopic = useCallback((topicId: string) => {
    setProgress(prev => {
      const isCompleted = prev.completedTopics.includes(topicId);
      return {
        ...prev,
        completedTopics: isCompleted
          ? prev.completedTopics.filter(id => id !== topicId)
          : [...prev.completedTopics, topicId]
      };
    });
  }, [setProgress]);

  const isTopicCompleted = useCallback((topicId: string) => {
    return progress.completedTopics.includes(topicId);
  }, [progress.completedTopics]);

  const saveQuizScore = useCallback((day: number, score: QuizScore) => {
    setProgress(prev => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [day]: score
      }
    }));
  }, [setProgress]);

  const getQuizScore = useCallback((day: number) => {
    return progress.quizScores[day];
  }, [progress.quizScores]);

  const setLastAccessedDay = useCallback((day: number) => {
    setProgress(prev => ({
      ...prev,
      lastAccessedDay: day
    }));
  }, [setProgress]);

  const getCompletedTopicsCount = useCallback(() => {
    return progress.completedTopics.length;
  }, [progress.completedTopics]);

  const resetProgress = useCallback(() => {
    setProgress(initialProgress);
  }, [setProgress]);

  return (
    <ProgressContext.Provider value={{
      progress,
      toggleTopic,
      isTopicCompleted,
      saveQuizScore,
      getQuizScore,
      setLastAccessedDay,
      getCompletedTopicsCount,
      resetProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
