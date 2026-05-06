import { Router, type IRouter, type Request, type Response } from "express";
import { analyzeMessage } from "../utils/scamDetector.js";

const router: IRouter = Router();

const SCAM_SAFETY_TIPS = [
  "Do not share OTPs or passwords with anyone",
  "Avoid clicking unknown URLs — type official addresses directly",
  "Verify unexpected messages through official contact numbers",
  "Enable spam filters on your email and messaging apps",
];

const SAFE_SAFETY_TIPS = [
  "Stay vigilant — scam tactics evolve constantly",
  "Keep your apps and devices updated for the latest security patches",
  "Enable two-factor authentication wherever possible",
  "Educate people around you about common scam patterns",
];

router.post("/chat", (req: Request, res: Response) => {
  const body = (req.body ?? {}) as { message?: string };
  const { message } = body;

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    res.status(400).json({
      success: false,
      error: "Missing required field: message",
      hint: 'Send { "message": "your suspicious text here" }',
      timestamp: new Date().toISOString(),
    });
    return;
  }

  const analysis = analyzeMessage(message.trim());

  if (analysis.isScam) {
    res.status(200).json({
      success: true,
      isScam: true,
      riskLevel: analysis.riskLevel,
      reply: `This message appears suspicious. ${analysis.explanation} Treat it with caution and do not act on its requests.`,
      detectedKeywords: analysis.detectedKeywords,
      scamProbability: `${analysis.scamProbability}%`,
      safetyTips: SCAM_SAFETY_TIPS,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  res.status(200).json({
    success: true,
    isScam: false,
    riskLevel: analysis.riskLevel,
    reply:
      analysis.detectedKeywords.length > 0
        ? `This message contains a few mildly suspicious words (${analysis.detectedKeywords.join(", ")}), but overall looks low-risk. Stay alert anyway.`
        : "This message looks safe based on our analysis. No common scam indicators were detected.",
    detectedKeywords: analysis.detectedKeywords,
    scamProbability: `${analysis.scamProbability}%`,
    safetyTips: SAFE_SAFETY_TIPS,
    timestamp: new Date().toISOString(),
  });
});

export default router;
