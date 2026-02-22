import express, { type Application } from "express";
import { createServer } from "http";
import morgan from "morgan";
import { ENV } from "./config/env.js";
import { AppError } from "./errors/AppError.js";
import mainRouter from "./routes/IndexRouter.js";
import { responder } from "./utils/Responder.js";

const app: Application = express();
const httpServer = createServer(app);

if (ENV.PROFILE === "dev") app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1", mainRouter);

app.use((req, res) => {
  return responder()
    .err(new AppError(`Route '${req.originalUrl}' does not exist`))
    .send(res);
});

export default httpServer;
