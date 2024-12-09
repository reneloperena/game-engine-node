import {
  AnswerEnumV1,
  AnswerMessageV1,
  QuestionMessageV1,
  QuestionResultMessageV1,
} from "../../api/gen/messages_pb";
import uuid from "uuid";

const uuidv4 = uuid.v4;

const questions: Map<
  string,
  Omit<QuestionMessageV1, "$typeName"> & { correct: AnswerEnumV1 }
> = new Map(
  [
    {
      id: uuidv4(),
      question: "Which country has won the most FIFA World Cups?",
      answerA: "Brazil",
      answerB: "Germany",
      answerC: "Italy",
      answerD: "Argentina",
      playerCanAnswer: true,
      correct: AnswerEnumV1.A,
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
      correct: AnswerEnumV1.B,
      startTime: new Date().toISOString(),
    },

    {
      id: uuidv4(),
      question: "Which country hosted the first FIFA World Cup in 1930?",
      answerA: "Brazil",
      answerB: "Uruguay",
      answerC: "Argentina",
      answerD: "Italy",
      correct: AnswerEnumV1.B,
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
      correct: AnswerEnumV1.A,
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
      correct: AnswerEnumV1.D,
      startTime: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      question: "Which country won the UEFA Euro 2004?",
      answerA: "Portugal",
      answerB: "Greece",
      answerC: "Italy",
      answerD: "Spain",
      correct: AnswerEnumV1.B,
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
      correct: AnswerEnumV1.C,
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
      correct: AnswerEnumV1.C,
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
      correct: AnswerEnumV1.C,
      playerCanAnswer: true,
      startTime: new Date().toISOString(),
    },
  ].map((val) => [val.id, val])
);

const questionRepository = () => {
  const getResults = (
    id: string,
    answer: AnswerEnumV1 | null
  ): QuestionResultMessageV1 => {
    const question = questions.get(id);
    if (!question) throw Error("404");

    const result: QuestionResultMessageV1 = {
      $typeName: "com.breaktrivia.messages.v1.QuestionResultMessageV1",
      questionId: id,
      question: question.question,
      answerA: question.answerA,
      totalAnswerA: Math.floor(Math.random() * 100),
      answerB: question.answerB,
      totalAnswerB: Math.floor(Math.random() * 100),
      answerC: question.answerC,
      totalAnswerC: Math.floor(Math.random() * 100),
      answerD: question.answerD,
      totalAnswerD: Math.floor(Math.random() * 100),
      correct: question.correct,
      yourAnswer: answer || undefined,
      startTime: question.startTime,
      endTime: new Date().toISOString(),
    };

    return result;
  };

  const getRandomQuestion = (): QuestionMessageV1 => {
    const values = Array.from(questions.values());
    const question: QuestionMessageV1 = {
      $typeName: "com.breaktrivia.messages.v1.QuestionMessageV1",
      ...values[Math.floor(Math.random() * values.length)],
    };

    return question;
  };

  return {
    getResults,
    getRandomQuestion,
  };
};

export default questionRepository();
