export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  date: string;
  author: string;
  category: string;
  image: string;
  content: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: { title: string; url: string }[];
  thinkingSteps?: string[];
  attachment?: { name: string; url: string; data?: string; mimeType?: string };
}

export interface SymptomQuestion {
  id: string;
  text: string;
  category: 'primary' | 'secondary' | 'risk_factor';
  options: { label: string; points: number }[];
}

export interface NutritionResult {
  dailyCalories: number;
  dailyProtein: number; // in grams
  minEnzymesPerMainMeal: number; // units of Lipase
  maxEnzymesPerMainMeal: number; // units of Lipase
  minEnzymesPerSnack: number; // units of Lipase
  maxEnzymesPerSnack: number; // units of Lipase
  dietTips: string[];
}
