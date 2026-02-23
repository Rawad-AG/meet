import { Router } from "express";
import AssetsRouter from "./AssetRouter.js";
import HealthRouter from "./HeatlhRouter.js";

const router = Router();

router.use("/assets", AssetsRouter);
router.use("/health", HealthRouter);
export default router;
