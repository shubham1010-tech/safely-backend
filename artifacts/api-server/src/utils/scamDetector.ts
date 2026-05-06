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

const KEYWORD_EXPLANATIONS: Record<string, string> = {
  urgent: "creates artificial urgency to pressure you into acting without thinking",
  verify: "asks you to verify sensitive information, a common phishing tactic",
  blocked: "falsely claims your account is blocked to trigger panic",
  "click here": "uses a vague call-to-action to redirect you to a malicious link",
  otp: "requests a one-time password, which should never be shared with anyone",
  "account suspended": "fabricates an account issue to steal your credentials",
  reward: "lures you with a reward that does not exist",
  "free money": "classic too-good-to-be-true bait used in financial scams",
  "limited time": "creates time pressure so you skip due diligence",
  "act now": "pressures immediate action before you can think critically",
  congratulations: "false prize claims are a hallmark of phishing and lottery scams",
  winner: "fake winning notifications designed to steal personal information",
  password: "legitimate services never ask for your password via message",
  "credit card": "requests for card details outside secure portals are always suspicious",
  "bank account": "banks never ask for account details through email or SMS",
  "confirm your": "confirmation requests are often used to harvest credentials",
};

export interface ScamAnalysisResult {
  isScam: boolean;
  riskLevel: "HIGH" | "MEDIUM" | "LOW" | "SAFE";
  detectedKeywords: string[];
  scamProbability: number;
  explanation: string;
}

export function analyzeMessage(message: string): ScamAnalysisResult {
  const lower = message.toLowerCase();
  const detected: string[] = [];
  let totalWeight = 0;

  for (const { word, weight } of SCAM_KEYWORDS) {
    if (lower.includes(word)) {
      detected.push(word);
      totalWeight += weight;
    }
  }

  const maxPossibleWeight = SCAM_KEYWORDS.reduce((sum, k) => sum + k.weight, 0);
  const scamProbability = Math.min(
    Math.round((totalWeight / maxPossibleWeight) * 100),
    99,
  );

  let riskLevel: ScamAnalysisResult["riskLevel"] = "SAFE";
  if (totalWeight >= 6) riskLevel = "HIGH";
  else if (totalWeight >= 3) riskLevel = "MEDIUM";
  else if (totalWeight >= 1) riskLevel = "LOW";

  const isScam = totalWeight >= 3;

  const firstKeyword = detected[0];
  const explanation =
    firstKeyword && KEYWORD_EXPLANATIONS[firstKeyword]
      ? `This message ${KEYWORD_EXPLANATIONS[firstKeyword]}.`
      : "This message contains patterns commonly associated with scam communications.";

  return { isScam, riskLevel, detectedKeywords: detected, scamProbability, explanation };
}
