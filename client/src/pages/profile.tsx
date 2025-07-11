import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useGameState } from '@/hooks/use-game-state';
import { User, Trophy, Calendar, Crown, Egg, Bitcoin, Settings } from 'lucide-react';

export const ProfilePage = () => {
  const { gameState } = useGameState();
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [walletConnected, setWalletConnected] = useState(false);

  const achievements = [
    { id: 'first-egg', name: 'First Egg', icon: Egg, color: 'bg-[hsl(122,39%,49%)]', unlocked: gameState.totalEggs > 0 },
    { id: 'inviter', name: 'Inviter', icon: User, color: 'bg-[hsl(207,90%,61%)]', unlocked: gameState.referralCount > 0 },
    { id: 'week-player', name: 'Week Player', icon: Calendar, color: 'bg-[hsl(36,100%,60%)]', unlocked: gameState.daysActive >= 7 },
    { id: 'champion', name: 'Champion', icon: Crown, color: 'bg-gray-300', unlocked: false },
  ];

  const handleConnectWallet = () => {
    // Simulate wallet connection
    setWalletConnected(true);
  };

  return (
    <div className="p-6 pb-20">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-[hsl(207,90%,61%)] to-[hsl(94,48%,78%)] text-white mb-6">
        <CardContent className="p-6 text-center">
          <div className="bg-white bg-opacity-20 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <User className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold mb-1">@telegramuser</h2>
          <p className="opacity-80">Hen Farmer Level {Math.floor(gameState.totalEggs / 100) + 1}</p>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">🥚</div>
            <div className="text-2xl font-bold text-[hsl(210,10%,23%)] mb-1">
              {Math.floor(gameState.totalEggs).toLocaleString()}
            </div>
            <p className="text-gray-600 text-sm">Total Eggs</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">📅</div>
            <div className="text-2xl font-bold text-[hsl(210,10%,23%)] mb-1">{gameState.daysActive}</div>
            <p className="text-gray-600 text-sm">Days Active</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="shadow-lg mb-6">
        <CardContent className="p-4">
          <h3 className="font-semibold text-[hsl(210,10%,23%)] mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-[hsl(36,100%,60%)]" />
            Achievements
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div key={achievement.id} className="text-center">
                  <div className={`${achievement.unlocked ? achievement.color : 'bg-gray-300'} text-white rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-gray-600">{achievement.name}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* TON Wallet Section */}
      <Card className="bg-gradient-to-r from-[hsl(48,100%,67%)] to-[hsl(94,48%,78%)] mb-6">
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-3">💎</div>
          <h3 className="font-bold text-[hsl(210,10%,23%)] text-xl mb-2">
            {walletConnected ? 'Wallet Connected' : 'Connect TON Wallet'}
          </h3>
          <p className="text-[hsl(210,10%,23%)] opacity-80 text-sm mb-4">
            {walletConnected 
              ? 'Your wallet is ready for the token launch!' 
              : 'Connect your wallet to convert eggs to coins at launch!'
            }
          </p>
          {!walletConnected && (
            <Button
              onClick={handleConnectWallet}
              className="bg-white text-[hsl(210,10%,23%)] rounded-xl px-6 py-3 font-semibold shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              <Bitcoin className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Motivational Section */}
      <Card className="bg-[hsl(14,100%,70%)] text-white mb-6">
        <CardContent className="p-6 text-center">
          <div className="text-3xl mb-3">🔓</div>
          <h4 className="font-bold text-lg mb-2">Get Ready for Launch!</h4>
          <p className="text-sm opacity-90 mb-3">
            Convert your eggs to coins at launch. The countdown has already begun! ⏳
          </p>
          <div className="bg-white bg-opacity-20 rounded-xl p-3">
            <p className="text-xs">Estimated Launch: Q2 2024</p>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="shadow-lg">
        <CardContent className="p-4">
          <h3 className="font-semibold text-[hsl(210,10%,23%)] mb-4 flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[hsl(210,10%,23%)]">Notifications</span>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[hsl(210,10%,23%)]">Sound Effects</span>
              <Switch
                checked={soundEffects}
                onCheckedChange={setSoundEffects}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
