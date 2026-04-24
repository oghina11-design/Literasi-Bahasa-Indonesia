export interface Question {
  id: string;
  passage?: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'Informasi' | 'Sastra' | 'Logika' | 'Bahasa';
}

export interface UserResult {
  score: number;
  categoryScores: Record<string, number>;
  totalQuestions: number;
  timestamp: string;
}
