export interface GameState {
  eggs: number;
  food: number;
  boosterActive: boolean;
  boosterTimeLeft: number;
  nextEggTime: number;
  lastUpdate: number;
  totalEggs: number;
  daysActive: number;
  completedTasks: string[];
  referralCount: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  icon: string;
  color: string;
  completed: boolean;
  action?: string;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  eggs: number;
  isUser?: boolean;
}

export interface Referral {
  username: string;
  timestamp: number;
  reward: number;
}
