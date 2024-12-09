import {
  AnswerEnumV1,
  QuestionMessageV1,
  QuestionResultMessageV1,
} from "../../../api/gen/messages_pb";
import reducer from "./reducer";

export enum PlayerStatus {
  Active = "Active",
  Eliminated = "Eliminated",
}

export enum GameStatus {
  NotStarted = "NotStarted",
  QuestionAsked = "QuestionAsked",
  QuestionAnswered = "QuestionAnswered",
  AnswerEvaluated = "AnswerEvaluated",
  GameEnded = "GameEnded",
}

export type PlayerActions =
  | {
      type: "CueQuestion";
    }
  | {
      type: "AnswerQuestion";
      payload: {
        answer: AnswerEnumV1;
      };
    };

export type HostActions =
  | {
      type: "StartGame";
    }
  | {
      type: "EvaluateAnswers";
    }
  | {
      type: "EndGame";
    };

export type GameState = {
  playerStatus: PlayerStatus;
} & (
  | {
      status: "NotStarted";
    }
  | {
      question: QuestionMessageV1;
      status: "QuestionAsked";
    }
  | {
      questionResult: QuestionResultMessageV1;
      status: "AnswerEvaluated";
    }
  | {
      status: "GameEnded";
    }
);

const initializeGameState = () => {
  let state: GameState = {
    status: "NotStarted",
    playerStatus: PlayerStatus.Active,
  };

  return {
    dispatch: (action: PlayerActions | HostActions) => {
      state = reducer(state, action);
    },
  };
};

export default initializeGameState();
