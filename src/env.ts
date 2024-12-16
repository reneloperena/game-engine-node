import dotenv from "dotenv";

dotenv.config();

type EnvVariables = {
  PORT: number;
};

// Validate required variables
const getEnvVariable = (key: keyof EnvVariables): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const env: EnvVariables = {
  PORT: parseInt(getEnvVariable("PORT")),
};

export default env;
