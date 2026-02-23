import express, { Router } from "express";
import { ENV } from "../config/env.js";

const router = Router();

router.use(express.static(ENV.PUBLIC));

export default router;
