import { HandlerContext } from "@connectrpc/connect";
import {
  AnswerQuestionRequest,
  AnswerQuestionResponse,
  AnswerQuestionResponseSchema,
} from "../api/gen/messages_pb";
import { create } from "@bufbuild/protobuf";
import { decodeGameState, signGameState } from "./game-state";
import questionRepo from "./mock/question-repo";
import * as uuid from "uuid";
import { Answer } from "../types";

async function answerQuestion(
  request: AnswerQuestionRequest,
  context: HandlerContext
): Promise<AnswerQuestionResponse> {
  const previousGameState = await decodeGameState(request.gameState);
  const { nextQuestion, iv } = await questionRepo.getRandomQuestion();
  const answer = {
    questionId: uuid.v4(),
    answer: request.answer as Answer,
    timestamp: new Date().toISOString(),
  };

  const gameState = await signGameState({
    ...previousGameState,
    answers: [...previousGameState.answers, answer],
  });

  return create(AnswerQuestionResponseSchema, {
    gameState,
    nextQuestion,
    iv,
  });
}

export default answerQuestion;
