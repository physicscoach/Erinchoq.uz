export type TaskStatus = 'not_started' | 'in_progress' | 'done';

export type TaskCategory = 'work' | 'study' | 'health' | 'personal';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  category: TaskCategory;
  date: string; // YYYY-MM-DD
  createdAt: number;
}

export type Language = 'uz' | 'en';

export interface Quote {
  id: string;
  textUz: string;
  textEn: string;
  authorUz: string;
  authorEn: string;
  type: 'warning' | 'motivation' | 'funny';
}

export interface DayActivity {
  date: string; // YYYY-MM-DD
  doneCount: number;
  totalCount: number;
}
