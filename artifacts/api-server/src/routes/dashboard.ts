import { Router, type IRouter, type Request, type Response } from "express";
import { mockUserProgress, getBadge } from "../data/mockData.js";

const router: IRouter = Router();

router.get("/dashboard", (_req: Request, res: Response) => {
  const data = {
    ...mockUserProgress,
    badge: getBadge(mockUserProgress.score),
  };

  res.status(200).json({
    success: true,
    data,
    timestamp: new Date().toISOString(),
  });
});

export default router;
