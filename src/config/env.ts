import { config } from "dotenv";
import path from "path";
import { AppError } from "../errors/AppError.js";

config({ path: path.resolve(process.cwd(), ".env") });

const profile = process.env.PROFILE || "dev";

if (!["env", "dev", "uat", "test", "qa"].includes(profile))
  throw new AppError(`unknown profile ${profile}`);

export const ENV = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || "0.0.0.0",
  PROFILE: process.env.PROFILE || "prod",
  PROTOCOL: process.env.PROTOCOL || "http",
};
