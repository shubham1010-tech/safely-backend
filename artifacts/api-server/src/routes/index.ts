import { Router, type IRouter } from "express";
import rootRouter from "./root.js";
import healthRouter from "./health.js";
import analyzeRouter from "./analyze.js";
import chatRouter from "./chat.js";
import dashboardRouter from "./dashboard.js";

const router: IRouter = Router();

router.use(rootRouter);
router.use(healthRouter);
router.use(analyzeRouter);
router.use(chatRouter);
router.use(dashboardRouter);

export default router;
