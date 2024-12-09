import jwt, { SignOptions, VerifyErrors } from "jsonwebtoken";
import { GameState } from "../types";

// Secret key for signing tokens
const secretKey = "your_secret_key";

// Function to sign a payload and generate a JWT
export const signGameState = (
  payload: GameState,
  options?: SignOptions
): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretKey, options || {}, (err, token) => {
      if (err) {
        reject(err);
      } else if (token) {
        resolve(token);
      }
    });
  });
};

export const decodeGameState = (token: string): Promise<GameState> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as GameState);
      }
    });
  });
};
