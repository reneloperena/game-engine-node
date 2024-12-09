export type Answer = "A" | "B" | "C" | "D";

export type GameState = {
  userId: string;
  gameId: string;
  answers: {
    questionId: string;
    answer: Answer;
    timestamp: string;
  }[];
};
