import type { HandlerContext } from "@connectrpc/connect";
import type { ClientMessage, ServerMessage } from "../api/gen/messages_pb";
import { ServerMessageSchema, Version } from "../api/gen/messages_pb";
import { create } from "@bufbuild/protobuf";
import { Subject } from "rxjs";
import { eachValueFrom } from "rxjs-for-await";

async function* playTriviaGame(
  requests: AsyncIterable<ClientMessage>,
  context: HandlerContext
): AsyncIterable<ServerMessage> {
  console.log("Client connected to playTriviaGame.");
  console.log("Subject created");

  const clientMessages$ = new Subject<ClientMessage>();
  const serverMessages$ = new Subject<ServerMessage>();

  const subscription = clientMessages$.subscribe({
    next: (clientMessage) => {
      console.log("Received from client:", clientMessage);:w
    },
    error: (err) => console.log(err),
  });

  // Observable to process client messages and create server messages
  let i = 1000;
  const interval = setInterval(() => {
    console.log(i);
    // Create a response message
    const response: ServerMessage = create(ServerMessageSchema, {
      message: {
        case: "stats",
        value: {
          version: Version.V1_0,
          payload: {
            activePlayersCount: i++,
          },
        },
      },
    });
    serverMessages$.next(response);
  }, 1000);
  // All values are yielded
  // One value at a time
  // Creates memory pressure if the budy of the for await loop takes longer
  // to come back around, which shouldn't since it's just going to send it
  // back.
  const serverMessagesAsync = eachValueFrom(serverMessages$);

  // Emit client messages into the Subject as they arrive
  // TODO: Handle error clause, we might want to disconnect the user
  (async () => {
    try {
      for await (const clientMessage of requests) {
        clientMessages$.next(clientMessage);
      }
    } catch (err) {
      clientMessages$.error(err);
    } finally {
      clientMessages$.complete();
    }
  })();

  // Yield messages from the serverMessages$ async iterator
  for await (const message of serverMessagesAsync) {
    console.log(message);
    yield message;
  }
  subscription.unsubscribe();
  console.log("Client disconnected from playTriviaGame.");
}

export default playTriviaGame;
