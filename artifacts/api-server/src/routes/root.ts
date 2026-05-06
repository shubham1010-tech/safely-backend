import { Router, type IRouter, type Request, type Response } from "express";

const router: IRouter = Router();

router.get("/", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SafeLy API</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #0f172a;
      color: #f1f5f9;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 48px;
      max-width: 560px;
      width: 90%;
      text-align: center;
    }
    .badge {
      display: inline-block;
      background: #22c55e20;
      color: #22c55e;
      border: 1px solid #22c55e50;
      border-radius: 999px;
      padding: 4px 14px;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 20px;
      letter-spacing: 0.5px;
    }
    h1 { font-size: 32px; font-weight: 700; margin-bottom: 8px; }
    h1 span { color: #3b82f6; }
    p { color: #94a3b8; margin-bottom: 32px; font-size: 15px; line-height: 1.6; }
    .endpoints { text-align: left; }
    .endpoint {
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 10px;
      padding: 14px 18px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .method {
      font-size: 11px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 5px;
      min-width: 44px;
      text-align: center;
    }
    .get  { background: #3b82f620; color: #3b82f6; border: 1px solid #3b82f640; }
    .post { background: #f59e0b20; color: #f59e0b; border: 1px solid #f59e0b40; }
    .path { font-family: monospace; font-size: 14px; color: #e2e8f0; }
    .desc { font-size: 12px; color: #64748b; margin-left: auto; }
    .footer { margin-top: 28px; font-size: 12px; color: #475569; }
    .dot { display: inline-block; width: 8px; height: 8px; background: #22c55e;
           border-radius: 50%; margin-right: 6px; animation: pulse 2s infinite; }
    @keyframes pulse {
      0%, 100% { opacity: 1; } 50% { opacity: 0.4; }
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge"><span class="dot"></span>Server Running</div>
    <h1>Safe<span>Ly</span> API</h1>
    <p>AI-powered scam awareness platform backend.<br/>All systems operational.</p>
    <div class="endpoints">
      <div class="endpoint">
        <span class="method get">GET</span>
        <span class="path">/api/healthz</span>
        <span class="desc">Health check</span>
      </div>
      <div class="endpoint">
        <span class="method post">POST</span>
        <span class="path">/api/analyze</span>
        <span class="desc">Simulation analysis</span>
      </div>
      <div class="endpoint">
        <span class="method post">POST</span>
        <span class="path">/api/chat</span>
        <span class="desc">Scam message detector</span>
      </div>
      <div class="endpoint">
        <span class="method get">GET</span>
        <span class="path">/api/dashboard</span>
        <span class="desc">User progress</span>
      </div>
    </div>
    <div class="footer">CORS enabled &nbsp;·&nbsp; Frontend-ready &nbsp;·&nbsp; SafeLy v1.0</div>
  </div>
</body>
</html>`);
});

export default router;
