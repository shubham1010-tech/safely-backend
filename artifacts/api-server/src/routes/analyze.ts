import { Router, type IRouter, type Request, type Response } from "express";

const router: IRouter = Router();

const SAFE_TIPS = [
  "Always verify suspicious messages through official channels",
  "Report phishing attempts to your email provider immediately",
  "Share this knowledge with friends and family",
  "Enable two-factor authentication on all accounts",
];

const PHISHING_TIPS = [
  "Never click links in unsolicited emails or messages",
  "Check the sender domain carefully — scammers misspell real domains",
  "Banks and official services never ask for credentials via email",
  "Look for spelling mistakes and unusual urgency in messages",
  "Hover over links to preview the actual URL before clicking",
  "When in doubt, go directly to the official website",
];

router.post("/analyze", (req: Request, res: Response) => {
  const { choice } = req.body as { choice?: string };

  if (!choice || typeof choice !== "string") {
    res.status(400).json({
      success: false,
      error: "Missing required field: choice",
      hint: 'Send { "choice": "click" | "ignore" | "report" }',
      timestamp: new Date().toISOString(),
    });
    return;
  }

  const normalized = choice.trim().toLowerCase();

  if (normalized === "click") {
    res.status(200).json({
      success: false,
      riskLevel: "HIGH",
      result: "This was a phishing scam!",
      explanation:
        "The message used urgency and a suspicious verification link designed to steal your credentials. Real organisations never pressure you to act immediately.",
      tips: PHISHING_TIPS,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  if (normalized === "ignore" || normalized === "report") {
    res.status(200).json({
      success: true,
      riskLevel: "SAFE",
      result:
        normalized === "report"
          ? "Excellent! Reporting scams helps protect others."
          : "Great decision! You avoided the scam.",
      explanation:
        normalized === "report"
          ? "By reporting this attempt you help platforms detect and shut down scam operations faster."
          : "Ignoring unsolicited suspicious messages is a smart defensive habit.",
      tips: SAFE_TIPS,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  res.status(400).json({
    success: false,
    error: `Unknown choice: "${choice}"`,
    hint: 'Valid values are "click", "ignore", or "report"',
    timestamp: new Date().toISOString(),
  });
});

export default router;
