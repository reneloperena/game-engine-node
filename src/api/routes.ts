import type { ConnectRouter } from "@connectrpc/connect";
import { Trivia } from "./gen/service_pb";
import playTriviaGame from "../business-logic/play-trivia-game";

export default (router: ConnectRouter) =>
  router.service(Trivia, {
    playTriviaGame,
  });
