export interface Topic {
  id: string;
  title: string;
  description: string;
  content?: string; // Ora opzionale - caricato dinamicamente da contentLoader
  msLearnUrl: string;
  duration: number; // minuti stimati
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Tipi per i quiz dell'esame AZ-104
export type ExamQuestionType = 'single-choice' | 'multiple-choice' | 'hotspot' | 'yes-no' | 'drag-drop';

export interface ExamQuestion {
  id: string;
  type: ExamQuestionType;
  category: StudyCategory;
  question: string;
  options: string[];
  correctAnswers: number[]; // Array per supportare risposte multiple
  explanation: string;
  reference?: string; // Link alla documentazione Learn
  note?: string; // Note aggiuntive (es. "Each correct selection is worth one point")
}

export interface Day {
  day: number;
  title: string;
  description: string;
  category: StudyCategory;
  topics: Topic[];
  quiz: QuizQuestion[];
}

export type StudyCategory =
  | 'identity-governance'
  | 'storage'
  | 'compute'
  | 'networking'
  | 'monitoring';

export interface CategoryInfo {
  id: StudyCategory;
  name: string;
  color: string;
  bgColor: string;
  weight: string;
}

export interface Progress {
  completedTopics: string[]; // array di topic IDs
  quizScores: Record<number, QuizScore>; // day number -> score
  lastAccessedDay: number;
}

export interface QuizScore {
  correct: number;
  total: number;
  completedAt: string;
}

export const CATEGORIES: Record<StudyCategory, CategoryInfo> = {
  'identity-governance': {
    id: 'identity-governance',
    name: 'Identità e Governance',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    weight: '20-25%'
  },
  'storage': {
    id: 'storage',
    name: 'Storage',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    weight: '15-20%'
  },
  'compute': {
    id: 'compute',
    name: 'Compute',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    weight: '20-25%'
  },
  'networking': {
    id: 'networking',
    name: 'Networking',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    weight: '15-20%'
  },
  'monitoring': {
    id: 'monitoring',
    name: 'Monitoring e Backup',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    weight: '10-15%'
  }
};
