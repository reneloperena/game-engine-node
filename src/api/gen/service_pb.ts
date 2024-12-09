// @generated by protoc-gen-es v2.2.2 with parameter "target=ts"
// @generated from file service.proto (package services.breaktrivia.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenService } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { AnswerQuestionRequestSchema, AnswerQuestionResponseSchema, TriviaSignUpRequestSchema, TriviaSignUpResponseSchema } from "./messages_pb";
import { file_messages } from "./messages_pb";

/**
 * Describes the file service.proto.
 */
export const file_service: GenFile = /*@__PURE__*/
  fileDesc("Cg1zZXJ2aWNlLnByb3RvEhdzZXJ2aWNlcy5icmVha3RyaXZpYS52MTL/AQoNVHJpdmlhU2VydmljZRJzCgx0cml2aWFTaWduVXASMC5jb20uYnJlYWt0cml2aWEubWVzc2FnZXMudjEuVHJpdmlhU2lnblVwUmVxdWVzdBoxLmNvbS5icmVha3RyaXZpYS5tZXNzYWdlcy52MS5Ucml2aWFTaWduVXBSZXNwb25zZRJ5Cg5hbnN3ZXJRdWVzdGlvbhIyLmNvbS5icmVha3RyaXZpYS5tZXNzYWdlcy52MS5BbnN3ZXJRdWVzdGlvblJlcXVlc3QaMy5jb20uYnJlYWt0cml2aWEubWVzc2FnZXMudjEuQW5zd2VyUXVlc3Rpb25SZXNwb25zZUKpAQobY29tLnNlcnZpY2VzLmJyZWFrdHJpdmlhLnYxQgxTZXJ2aWNlUHJvdG9QAaICA1NCWKoCF1NlcnZpY2VzLkJyZWFrdHJpdmlhLlYxygIXU2VydmljZXNcQnJlYWt0cml2aWFcVjHiAiNTZXJ2aWNlc1xCcmVha3RyaXZpYVxWMVxHUEJNZXRhZGF0YeoCGVNlcnZpY2VzOjpCcmVha3RyaXZpYTo6VjFiBnByb3RvMw", [file_messages]);

/**
 * @generated from service services.breaktrivia.v1.TriviaService
 */
export const TriviaService: GenService<{
  /**
   * @generated from rpc services.breaktrivia.v1.TriviaService.triviaSignUp
   */
  triviaSignUp: {
    methodKind: "unary";
    input: typeof TriviaSignUpRequestSchema;
    output: typeof TriviaSignUpResponseSchema;
  },
  /**
   * @generated from rpc services.breaktrivia.v1.TriviaService.answerQuestion
   */
  answerQuestion: {
    methodKind: "unary";
    input: typeof AnswerQuestionRequestSchema;
    output: typeof AnswerQuestionResponseSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_service, 0);

