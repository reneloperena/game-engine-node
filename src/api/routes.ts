import type { ConnectRouter } from "@connectrpc/connect";
import { TriviaService } from "./gen/service_pb";
import answerQuestion from "../business-logic/answer-question";
import triviaSignUp from "../business-logic/trivia-sign-up";

export default (router: ConnectRouter) =>
  router.service(TriviaService, {
    answerQuestion,
    triviaSignUp,
  });
