export interface UserProgress {
  score: number;
  badge: string;
  scamsDetected: number;
  mistakesMade: number;
  progress: {
    phishing: number;
    otpFraud: number;
    fakeLinks: number;
    smishingAttacks: number;
    socialEngineering: number;
  };
  recentActivity: string[];
  streakDays: number;
  totalSimulations: number;
}

export const mockUserProgress: UserProgress = {
  score: 75,
  badge: "Aware User",
  scamsDetected: 12,
  mistakesMade: 3,
  progress: {
    phishing: 85,
    otpFraud: 70,
    fakeLinks: 60,
    smishingAttacks: 55,
    socialEngineering: 40,
  },
  recentActivity: [
    "Detected phishing email",
    "Reported fake SMS",
    "Avoided suspicious link",
    "Completed OTP fraud module",
    "Identified social engineering attempt",
  ],
  streakDays: 5,
  totalSimulations: 18,
};

export const BADGE_THRESHOLDS = [
  { minScore: 90, badge: "Cyber Guardian" },
  { minScore: 75, badge: "Aware User" },
  { minScore: 50, badge: "Cautious Learner" },
  { minScore: 25, badge: "Beginner" },
  { minScore: 0, badge: "New Recruit" },
] as const;

export function getBadge(score: number): string {
  for (const { minScore, badge } of BADGE_THRESHOLDS) {
    if (score >= minScore) return badge;
  }
  return "New Recruit";
}
