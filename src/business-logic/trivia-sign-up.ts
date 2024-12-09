import { HandlerContext } from "@connectrpc/connect";
import {
  TriviaSignUpRequest,
  TriviaSignUpResponse,
  TriviaSignUpResponseSchema,
} from "../api/gen/messages_pb";
import { create } from "@bufbuild/protobuf";
import questionRepo from "./mock/question-repo";
import { signGameState } from "./game-state";
async function triviaSignUp(
  request: TriviaSignUpRequest,
  context: HandlerContext
): Promise<TriviaSignUpResponse> {
  const gameState = await signGameState({
    userId: "123",
    gameId: "123",
    answers: [],
  });
  const { nextQuestion, iv } = await questionRepo.getRandomQuestion();

  return create(TriviaSignUpResponseSchema, {
    gameState,
    nextQuestion,
    iv,
  });
}

export default triviaSignUp;
