import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const SCAM_KEYWORDS = [
  { word: "urgent", weight: 2 },
  { word: "verify", weight: 1 },
  { word: "blocked", weight: 2 },
  { word: "click here", weight: 3 },
  { word: "otp", weight: 2 },
  { word: "account suspended", weight: 3 },
  { word: "reward", weight: 1 },
  { word: "free money", weight: 3 },
  { word: "limited time", weight: 2 },
  { word: "act now", weight: 2 },
  { word: "congratulations", weight: 1 },
  { word: "winner", weight: 1 },
  { word: "password", weight: 2 },
  { word: "credit card", weight: 2 },
  { word: "bank account", weight: 2 },
  { word: "confirm your", weight: 2 },
];

function analyzeMessage(message) {
  const lower = message.toLowerCase();
  const detected = [];
  let totalWeight = 0;

  for (const { word, weight } of SCAM_KEYWORDS) {
    if (lower.includes(word)) {
      detected.push(word);
      totalWeight += weight;
    }
  }

  const maxWeight = SCAM_KEYWORDS.reduce((s, k) => s + k.weight, 0);
  const scamProbability = Math.min(Math.round((totalWeight / maxWeight) * 100), 99);

  let riskLevel = "SAFE";
  if (totalWeight >= 6) riskLevel = "HIGH";
  else if (totalWeight >= 3) riskLevel = "MEDIUM";
  else if (totalWeight >= 1) riskLevel = "LOW";

  return {
    isScam: totalWeight >= 3,
    riskLevel,
    detectedKeywords: detected,
    scamProbability,
  };
}

app.get("/api", (_req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>SafeLy API</title>
  <style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,sans-serif;background:#0f172a;color:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center}.card{background:#1e293b;border:1px solid #334155;border-radius:16px;padding:48px;max-width:560px;width:90%;text-align:center}.badge{display:inline-block;background:#22c55e20;color:#22c55e;border:1px solid #22c55e50;border-radius:999px;padding:4px 14px;font-size:13px;font-weight:600;margin-bottom:20px}h1{font-size:32px;font-weight:700;margin-bottom:8px}h1 span{color:#3b82f6}p{color:#94a3b8;margin-bottom:32px;font-size:15px}.endpoints{text-align:left}.endpoint{background:#0f172a;border:1px solid #334155;border-radius:10px;padding:14px 18px;margin-bottom:10px;display:flex;align-items:center;gap:12px}.method{font-size:11px;font-weight:700;padding:3px 8px;border-radius:5px;min-width:44px;text-align:center}.get{background:#3b82f620;color:#3b82f6;border:1px solid #3b82f640}.post{background:#f59e0b20;color:#f59e0b;border:1px solid #f59e0b40}.path{font-family:monospace;font-size:14px;color:#e2e8f0}.desc{font-size:12px;color:#64748b;margin-left:auto}.footer{margin-top:28px;font-size:12px;color:#475569}.dot{display:inline-block;width:8px;height:8px;background:#22c55e;border-radius:50%;margin-right:6px;animation:pulse 2s infinite}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}</style></head>
  <body><div class="card"><div class="badge"><span class="dot"></span>Server Running</div><h1>Safe<span>Ly</span> API</h1><p>AI-powered scam awareness platform backend.<br/>All systems operational.</p><div class="endpoints"><div class="endpoint"><span class="method get">GET</span><span class="path">/api/healthz</span><span class="desc">Health check</span></div><div class="endpoint"><span class="method post">POST</span><span class="path">/api/analyze</span><span class="desc">Simulation analysis</span></div><div class="endpoint"><span class="method post">POST</span><span class="path">/api/chat</span><span class="desc">Scam message detector</span></div><div class="endpoint"><span class="method get">GET</span><span class="path">/api/dashboard</span><span class="desc">User progress</span></div></div><div class="footer">CORS enabled &nbsp;·&nbsp; Frontend-ready &nbsp;·&nbsp; SafeLy v1.0</div></div></body></html>`);
});

app.get("/api/healthz", (_req, res) => {
  res.json({
    success: true,
    status: "running",
    message: "SafeLy backend is active",
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/analyze", (req, res) => {
  const choice = (req.body?.choice || "").trim().toLowerCase();

  if (!choice) {
    return res.status(400).json({
      success: false,
      error: "Missing required field: choice",
      hint: 'Send { "choice": "click" | "ignore" | "report" }',
      timestamp: new Date().toISOString(),
    });
  }

  if (choice === "click") {
    return res.json({
      success: false,
      riskLevel: "HIGH",
      result: "This was a phishing scam!",
      explanation: "The message used urgency and a suspicious verification link.",
      tips: [
        "Never click suspicious links",
        "Check the sender domain carefully",
        "Banks never ask for verification via email",
        "Look for spelling mistakes in URLs",
      ],
      timestamp: new Date().toISOString(),
    });
  }

  if (choice === "ignore" || choice === "report") {
    return res.json({
      success: true,
      riskLevel: "SAFE",
      result: choice === "report"
        ? "Excellent! Reporting scams helps protect others."
        : "Great decision! You avoided the scam.",
      tips: [
        "Always verify suspicious messages",
        "Report phishing attempts immediately",
      ],
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(400).json({
    success: false,
    error: `Unknown choice: "${choice}"`,
    hint: 'Valid values are "click", "ignore", or "report"',
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/chat", (req, res) => {
  const message = (req.body?.message || "").trim();

  if (!message) {
    return res.status(400).json({
      success: false,
      error: "Missing required field: message",
      hint: 'Send { "message": "your suspicious text here" }',
      timestamp: new Date().toISOString(),
    });
  }

  const analysis = analyzeMessage(message);

  return res.json({
    success: true,
    isScam: analysis.isScam,
    riskLevel: analysis.riskLevel,
    reply: analysis.isScam
      ? "This message appears suspicious. It contains patterns commonly used in scams. Do not act on its requests."
      : "This message looks safe. No major scam indicators were detected.",
    detectedKeywords: analysis.detectedKeywords,
    scamProbability: `${analysis.scamProbability}%`,
    safetyTips: analysis.isScam
      ? ["Do not share OTPs", "Avoid clicking unknown URLs", "Verify through official websites"]
      : ["Stay vigilant", "Enable two-factor authentication", "Keep apps updated"],
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/dashboard", (_req, res) => {
  res.json({
    success: true,
    data: {
      score: 75,
      badge: "Aware User",
      scamsDetected: 12,
      mistakesMade: 3,
      progress: {
        phishing: 85,
        otpFraud: 70,
        fakeLinks: 60,
      },
      recentActivity: [
        "Detected phishing email",
        "Reported fake SMS",
        "Avoided suspicious link",
      ],
    },
    timestamp: new Date().toISOString(),
  });
});

app.get("/", (_req, res) => {
  res.redirect("/api");
});

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
    timestamp: new Date().toISOString(),
  });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    error: "Internal server error",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`SafeLy backend running on port ${PORT}`);
});
