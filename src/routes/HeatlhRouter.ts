import { Router } from "express";
import { responder } from "../utils/Responder.js";

const router = Router();

router.get("/", (_req, res) => {
  return responder()
    .mess("API is healthy")
    .payload({ service: "meet-clone-api" })
    .send(res);
});

export default router;
