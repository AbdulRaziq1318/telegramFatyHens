import { Card, CardContent } from '@/components/ui/card';
import { useGameState } from '@/hooks/use-game-state';
import { Trophy, Medal, Award } from 'lucide-react';
import { LeaderboardEntry } from '@/types/game';

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, username: '@eggmaster', eggs: 3456 },
  { rank: 2, username: '@player2', eggs: 2891 },
  { rank: 3, username: '@henking', eggs: 2103 },
  { rank: 4, username: '@crypto_hen', eggs: 1897 },
  { rank: 5, username: '@egg_hunter', eggs: 1654 },
  { rank: 6, username: '@henfarmer', eggs: 1423 },
  { rank: 7, username: '@eggcollector', eggs: 1298 },
  { rank: 8, username: '@chickenlover', eggs: 1165 },
  { rank: 9, username: '@featherking', eggs: 1087 },
  { rank: 10, username: '@nestbuilder', eggs: 987 },
];

export const LeaderboardPage = () => {
  const { gameState } = useGameState();

  const userRank = Math.floor(Math.random() * 50) + 20; // Mock user rank
  const topThree = MOCK_LEADERBOARD.slice(0, 3);
  const restOfLeaderboard = MOCK_LEADERBOARD.slice(3);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <span className="text-2xl">🥇</span>;
      case 2: return <span className="text-2xl">🥈</span>;
      case 3: return <span className="text-2xl">🥉</span>;
      default: return (
        <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-[hsl(210,10%,23%)] font-semibold text-sm">
          {rank}
        </div>
      );
    }
  };

  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1: return 'h-20';
      case 2: return 'h-16';
      case 3: return 'h-12';
      default: return 'h-10';
    }
  };

  const getPodiumColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-[hsl(36,100%,60%)] to-[hsl(48,100%,67%)]';
      case 2: return 'bg-gray-300';
      case 3: return 'bg-[hsl(14,100%,70%)]';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className="p-6 pb-20">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[hsl(210,10%,23%)] mb-2">
          <Trophy className="w-8 h-8 inline mr-2" />
          Leaderboard
        </h1>
        <p className="text-gray-600">Weekly Top Egg Collectors</p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-2 mb-6 h-32">
        {/* 2nd Place */}
        <div className="flex flex-col items-center justify-end">
          <div className="bg-gradient-to-r from-gray-300 to-gray-400 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold mb-2">
            2
          </div>
          <div className={`${getPodiumColor(2)} rounded-t-lg w-full ${getPodiumHeight(2)} flex flex-col items-center justify-center text-white`}>
            <div className="text-xs font-semibold">{topThree[1]?.username}</div>
            <div className="text-xs">{topThree[1]?.eggs.toLocaleString()} 🥚</div>
          </div>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center justify-end">
          <div className="bg-gradient-to-r from-[hsl(36,100%,60%)] to-[hsl(48,100%,67%)] rounded-full w-16 h-16 flex items-center justify-center text-white font-bold mb-2 text-xl">
            🥇
          </div>
          <div className={`${getPodiumColor(1)} rounded-t-lg w-full ${getPodiumHeight(1)} flex flex-col items-center justify-center text-white`}>
            <div className="text-sm font-bold">{topThree[0]?.username}</div>
            <div className="text-xs">{topThree[0]?.eggs.toLocaleString()} 🥚</div>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center justify-end">
          <div className="bg-gradient-to-r from-[hsl(14,100%,70%)] to-orange-400 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mb-2 text-sm">
            3
          </div>
          <div className={`${getPodiumColor(3)} rounded-t-lg w-full ${getPodiumHeight(3)} flex flex-col items-center justify-center text-white`}>
            <div className="text-xs font-semibold">{topThree[2]?.username}</div>
            <div className="text-xs">{topThree[2]?.eggs.toLocaleString()} 🥚</div>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <Card className="shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[hsl(207,90%,61%)] to-[hsl(94,48%,78%)] p-4 text-white">
          <h3 className="font-bold text-center">This Week's Rankings</h3>
        </div>

        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {MOCK_LEADERBOARD.map((player) => (
              <div 
                key={player.rank} 
                className={`flex items-center justify-between p-4 ${
                  player.rank <= 3 ? 'bg-gradient-to-r from-[hsl(36,100%,60%)] to-[hsl(48,100%,67%)] bg-opacity-10' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  {getRankIcon(player.rank)}
                  <div>
                    <p className="font-semibold text-[hsl(210,10%,23%)]">{player.username}</p>
                    <p className="text-xs text-gray-500">
                      {player.rank === 1 ? 'Champion' : 
                       player.rank === 2 ? 'Runner-up' : 
                       player.rank === 3 ? 'Bronze' : ''}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-[hsl(210,10%,23%)]">{player.eggs.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">eggs</p>
                </div>
              </div>
            ))}

            {/* User's Rank */}
            <div className="flex items-center justify-between p-4 bg-[hsl(207,90%,61%)] bg-opacity-10 border-l-4 border-[hsl(207,90%,61%)]">
              <div className="flex items-center space-x-3">
                <div className="bg-[hsl(207,90%,61%)] text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                  {userRank}
                </div>
                <div>
                  <p className="font-semibold text-[hsl(210,10%,23%)]">@you</p>
                  <p className="text-xs text-[hsl(207,90%,61%)]">Your Rank</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-[hsl(210,10%,23%)]">{Math.floor(gameState.totalEggs).toLocaleString()}</p>
                <p className="text-xs text-gray-500">eggs</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Season Info */}
      <Card className="bg-[hsl(48,100%,85%)] mt-6">
        <CardContent className="p-4 text-center">
          <h4 className="font-semibold text-[hsl(210,10%,23%)] mb-2">
            <Trophy className="w-5 h-5 inline mr-1" />
            Season Ends In
          </h4>
          <div className="text-2xl font-bold text-[hsl(210,10%,23%)] mb-2">4d 12h 30m</div>
          <p className="text-[hsl(210,10%,23%)] text-sm opacity-80">Collect more eggs to climb the ranks!</p>
        </CardContent>
      </Card>
    </div>
  );
};
