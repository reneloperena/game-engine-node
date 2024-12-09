import { GameState, HostActions, PlayerActions, PlayerStatus } from ".";
import questionRepository from "../question-repo";

const reducer = (
  state: GameState,
  action: PlayerActions | HostActions
): GameState => {
  switch (action.type) {
    case "CueQuestion":
      const question = questionRepository.getRandomQuestion();
      return {
        status: "QuestionAsked",
        playerStatus: state.playerStatus,
        question: question,
      };
    case "AnswerQuestion":
      if (state.status !== "QuestionAsked") return state;
      const answer = action.payload.answer;
      return {
        status: "QuestionAnswered",
        playerStatus: state.playerStatus,
        answer,
        question: state.question,
      };
    case "EvaluateAnswers":
      if (state.status === "QuestionAsked") {
        return {
          status: "AnswerEvaluated",
          questionResult: questionRepository.getResults(
            state.question.id,
            null
          ),
          playerStatus: PlayerStatus.Eliminated,
        };
      }
      if (state.status === "QuestionAnswered") {
        const result = questionRepository.getResults(
          state.question.id,
          state.answer
        );
        return {
          status: "AnswerEvaluated",
          questionResult: result,
          playerStatus:
            state.playerStatus === PlayerStatus.Active &&
            result.correct === result.yourAnswer
              ? state.playerStatus
              : PlayerStatus.Eliminated,
        };
      }
    case "EndGame":
      return {
        status: "GameEnded",
        playerStatus: state.playerStatus,
      };
    default:
      return {
        status: "GameEnded",
        playerStatus: PlayerStatus.Eliminated,
      };
  }
};
export default reducer;
