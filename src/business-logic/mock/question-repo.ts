import * as uuid from "uuid";
import { encryptQuestion } from "./question-encryption";

const uuidv4 = uuid.v4;

type Answer = "A" | "B" | "C" | "D";
export type Question = {
  id: string;
  question: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  playerCanAnswer: boolean;
  correct: Answer;
  startTime: string;
};

const questions: Map<string, Question> = new Map(
  [
    {
      id: uuidv4(),
      question: "Which country has won the most FIFA World Cups?",
      answerA: "Brazil",
      answerB: "Germany",
      answerC: "Italy",
      answerD: "Argentina",
      playerCanAnswer: true,
      correct: "A" as Answer,
      startTime: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      question: "Who is the all-time top scorer in FIFA World Cup history?",
      answerA: "Lionel Messi",
      answerB: "Miroslav Klose",
      answerC: "Ronaldo",
      answerD: "Pelé",
      playerCanAnswer: true,
      correct: "B" as Answer,
      startTime: new Date().toISOString(),
    },

    {
      id: uuidv4(),
      question: "Which country hosted the first FIFA World Cup in 1930?",
      answerA: "Brazil",
      answerB: "Uruguay",
      answerC: "Argentina",
      answerD: "Italy",
      correct: "C" as Answer,
      playerCanAnswer: true,
      startTime: new Date().toISOString(),
    },

    {
      id: uuidv4(),
      question: "Which player has won the most Ballon d'Or awards?",
      answerA: "Lionel Messi",
      answerB: "Cristiano Ronaldo",
      answerC: "Johan Cruyff",
      answerD: "Michel Platini",
      correct: "A" as Answer,
      playerCanAnswer: true,
      startTime: new Date().toISOString(),
    },

    {
      id: uuidv4(),
      question: "Which club has won the most UEFA Champions League titles?",
      answerA: "Manchester United",
      answerB: "Bayern Munich",
      answerC: "Barcelona",
      answerD: "Real Madrid",
      playerCanAnswer: true,
      correct: "D" as Answer,
      startTime: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      question: "Which country won the UEFA Euro 2004?",
      answerA: "Portugal",
      answerB: "Greece",
      answerC: "Italy",
      answerD: "Spain",
      correct: "B" as Answer,
      playerCanAnswer: true,
      startTime: new Date().toISOString(),
    },

    {
      id: uuidv4(),
      question: "Which player is known as 'El Fenómeno'?",
      answerA: "Ronaldinho",
      answerB: "Zinedine Zidane",
      answerC: "Ronaldo Nazário",
      answerD: "Pelé",
      correct: "C" as Answer,
      playerCanAnswer: true,
      startTime: new Date().toISOString(),
    },

    {
      id: uuidv4(),
      question:
        "Which African country was the first to reach a FIFA World Cup quarterfinal?",
      answerA: "Nigeria",
      answerB: "Senegal",
      answerC: "Cameroon",
      answerD: "South Africa",
      correct: "C" as Answer,
      playerCanAnswer: true,
      startTime: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      question:
        "Who is the all-time leading goal scorer for the English Premier League?",
      answerA: "Wayne Rooney",
      answerB: "Sergio Agüero",
      answerC: "Alan Shearer",
      answerD: "Thierry Henry",
      correct: "C" as Answer,
      playerCanAnswer: true,
      startTime: new Date().toISOString(),
    },
  ].map((val) => [val.id, val])
);

const questionRepository = () => {
  const getRandomQuestion = async (): Promise<{
    nextQuestion: string;
    iv: string;
  }> => {
    const values = Array.from(questions.values());
    const question: Question = {
      ...values[Math.floor(Math.random() * values.length)],
    };

    const { encryptedData, iv } = await encryptQuestion(question);
    console.log(iv);
    return { nextQuestion: encryptedData, iv };
  };

  return {
    getRandomQuestion,
  };
};

export default questionRepository();
