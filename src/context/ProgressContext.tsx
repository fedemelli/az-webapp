import { createContext, useContext, useCallback, useEffect, useState, type ReactNode } from 'react';
import { apiUrl } from '../utils/api';
import { useAuth } from './AuthContext';
import type { Progress, QuizScore } from '../types';

interface ProgressContextType {
  progress: Progress;
  isLoading: boolean;
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
  const { token } = useAuth();
  const [progress, setProgress] = useState<Progress>(initialProgress);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    const loadProgress = async () => {
      try {
        const response = await fetch(apiUrl('/api/progress'), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Errore nel caricamento progressi.');
        }
        const data = (await response.json()) as { progress: Progress };
        setProgress(data.progress);
      } catch {
        setProgress(initialProgress);
      } finally {
        setIsHydrated(true);
        setIsLoading(false);
      }
    };

    loadProgress();
  }, [token]);

  useEffect(() => {
    if (!token || !isHydrated) {
      return;
    }
    const persistProgress = async () => {
      try {
        await fetch(apiUrl('/api/progress'), {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ progress }),
        });
      } catch {
        // Ignora errori di rete temporanei.
      }
    };
    persistProgress();
  }, [progress, token, isHydrated]);

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
  }, []);

  const isTopicCompleted = useCallback((topicId: string) => {
    return progress.completedTopics.includes(topicId);
  }, [progress.completedTopics]);

  const saveQuizScore = useCallback((day: number, score: QuizScore) => {
    setProgress(prev => {
      return {
        ...prev,
        quizScores: {
          ...prev.quizScores,
          [day]: score
        }
      };
    });
  }, []);

  const getQuizScore = useCallback((day: number) => {
    return progress.quizScores[day];
  }, [progress.quizScores]);

  const setLastAccessedDay = useCallback((day: number) => {
    setProgress(prev => {
      return {
        ...prev,
        lastAccessedDay: day
      };
    });
  }, []);

  const getCompletedTopicsCount = useCallback(() => {
    return progress.completedTopics.length;
  }, [progress.completedTopics]);

  const resetProgress = useCallback(() => {
    setProgress(initialProgress);
  }, []);

  return (
    <ProgressContext.Provider value={{
      progress,
      isLoading,
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
