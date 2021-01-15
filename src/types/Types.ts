export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export interface Trivia {
  category: string;
  type: string;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: string[];
}

export interface FilterTrivia {
  difficulty?: string;
  amount: number;
}
