import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { AppError } from "../errors/AppError.js";

config({ path: path.resolve(process.cwd(), ".env") });

const profile = process.env.PROFILE || "dev";

if (!["env", "dev", "uat", "test", "qa"].includes(profile))
  throw new AppError(`unknown profile ${profile}`);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.resolve(__dirname, process.env.public || "../public");

export const ENV = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || "0.0.0.0",
  PROFILE: process.env.PROFILE || "prod",
  PROTOCOL: process.env.PROTOCOL || "http",
  PUBLIC: publicPath,
};
