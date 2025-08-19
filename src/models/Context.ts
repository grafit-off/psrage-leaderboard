import { ReactNode } from 'react';
import { Language } from './Language';
import { LeaderboardData } from './LeaderboardData';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export interface LeaderboardContextType {
  state: LeaderboardData;
  fetchData: () => Promise<void>;
}
