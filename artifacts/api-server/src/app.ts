import express, {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
    timestamp: new Date().toISOString(),
  });
});

app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  if (
    err instanceof SyntaxError &&
    "status" in err &&
    (err as { status: number }).status === 400
  ) {
    res.status(400).json({
      success: false,
      error: "Invalid JSON in request body",
      hint: "Ensure your request body is valid JSON",
      timestamp: new Date().toISOString(),
    });
    return;
  }

  req.log.error({ err }, "Unhandled server error");
  res.status(500).json({
    success: false,
    error: "Internal server error",
    timestamp: new Date().toISOString(),
  });
});

export default app;
