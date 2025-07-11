import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EggCharacter } from '@/components/egg-character';
import { AdModal } from '@/components/ad-modal';
import { useGameState } from '@/hooks/use-game-state';
import { Zap, Play, Share2 } from 'lucide-react';

export const HomePage = () => {
  const { gameState, addFood, activateBooster, tapEgg } = useGameState();
  const [showAdModal, setShowAdModal] = useState(false);
  const [adType, setAdType] = useState<'food' | 'booster'>('food');
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Update timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleBoosterClick = () => {
    if (!gameState.boosterActive) {
      setAdType('booster');
      setShowAdModal(true);
    }
  };

  const handleWatchAdClick = () => {
    setAdType('food');
    setShowAdModal(true);
  };

  const handleAdComplete = () => {
    if (adType === 'booster') {
      activateBooster();
    } else {
      addFood(1);
    }
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getNextEggCountdown = () => {
    if (gameState.food <= 0) return "00:00";
    const timeLeft = Math.max(0, gameState.nextEggTime - currentTime);
    const seconds = Math.ceil(timeLeft / 1000);
    return `00:${seconds.toString().padStart(2, '0')}`;
  };

  const isFeeding = gameState.food > 0;

  return (
    <div className="pb-20">
      {/* Header Stats */}
      <div className="bg-gradient-to-r from-[hsl(48,100%,67%)] to-[hsl(280,48%,78%)] p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="bg-white rounded-full px-4 py-2 shadow-md">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🥚</span>
              <div>
                <p className="text-xs text-gray-500">Eggs</p>
                <p className="font-bold text-lg">{Math.floor(gameState.eggs).toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-full px-4 py-2 shadow-md">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🥣</span>
              <div>
                <p className="text-xs text-gray-500">Food</p>
                <p className="font-bold text-lg">{gameState.food}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Hen Area */}
      <div className="p-6 relative">
        {/* Booster Button */}
        <Button
          onClick={handleBoosterClick}
          disabled={gameState.boosterActive}
          className={`absolute top-4 right-4 bg-gradient-to-r from-[hsl(14,100%,70%)] to-[hsl(36,100%,60%)] text-white rounded-full p-3 shadow-lg transform transition-all duration-200 hover:scale-110 z-10 ${
            gameState.boosterActive ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <div className="flex items-center space-x-1">
            <Zap className="w-5 h-5" />
            <span className="text-sm font-semibold">⚡</span>
          </div>
        </Button>

        {/* Booster Timer */}
        {gameState.boosterActive && (
          <div className="absolute top-16 right-4 bg-[hsl(36,100%,60%)] text-white rounded-lg px-3 py-1 shadow-md text-xs font-semibold">
            {formatTime(gameState.boosterTimeLeft)}
          </div>
        )}

        {/* Egg Container */}
        <Card className="bg-gradient-to-b from-[hsl(280,48%,87%)] to-[hsl(280,48%,78%)] rounded-3xl shadow-xl relative overflow-hidden">
          <CardContent className="p-8 text-center relative">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-6 h-6 bg-[hsl(48,100%,67%)] rounded-full animate-float"></div>
              <div className="absolute top-8 right-8 w-4 h-4 bg-[hsl(14,100%,70%)] rounded-full animate-bounce-slow"></div>
              <div className="absolute bottom-6 left-6 w-5 h-5 bg-[hsl(207,90%,61%)] rounded-full animate-pulse-fast"></div>
            </div>

            {/* Egg Character */}
            <div className="relative z-10">
              <EggCharacter 
                isFeeding={isFeeding} 
                onTap={tapEgg} 
                boosterActive={gameState.boosterActive}
              />
            </div>

            {/* Status Text */}
            <div className="space-y-2 mt-4">
              <h2 className="text-2xl font-bold text-[hsl(210,10%,23%)]">Your Magic Egg</h2>
              <div>
                {isFeeding ? (
                  <div className="bg-[hsl(122,39%,49%)] text-white rounded-full px-4 py-2 inline-block">
                    <span className="text-sm">Laying egg in: {getNextEggCountdown()}</span>
                  </div>
                ) : (
                  <div className="bg-[hsl(36,100%,60%)] text-white rounded-full px-4 py-2 inline-block">
                    <span className="text-sm">Egg is cold. Feed it to start laying!</span>
                  </div>
                )}
              </div>
              {!isFeeding && (
                <div className="text-gray-500 text-sm">
                  Tap to warm the egg! 🥚
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Section */}
      <div className="px-6 space-y-4">
        {/* Daily Progress */}
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-[hsl(210,10%,23%)]">Today's Progress</h3>
              <span className="text-sm text-gray-500">🎯 Goal: 100 eggs</span>
            </div>
            <div className="bg-gray-200 rounded-full h-3 mb-2">
              <div 
                className="bg-gradient-to-r from-[hsl(122,39%,49%)] to-[hsl(280,48%,78%)] h-3 rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(100, (gameState.eggs % 100))}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">{Math.floor(gameState.eggs % 100)} eggs collected today</p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={handleWatchAdClick}
            className="bg-gradient-to-r from-[hsl(207,90%,61%)] to-[hsl(48,100%,67%)] text-white rounded-xl p-4 shadow-lg transform transition-all duration-200 hover:scale-105 h-auto"
          >
            <div className="text-center">
              <Play className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">Watch Ad</p>
              <p className="text-xs opacity-80">+1 Food</p>
            </div>
          </Button>
          <Button
            onClick={() => {
              // Share functionality
              if (navigator.share) {
                navigator.share({
                  title: 'Fat Hen - Feed & Earn',
                  text: 'Join me in this fun egg collecting game!',
                  url: window.location.href,
                });
              }
            }}
            className="bg-gradient-to-r from-[hsl(14,100%,70%)] to-[hsl(36,100%,60%)] text-white rounded-xl p-4 shadow-lg transform transition-all duration-200 hover:scale-105 h-auto"
          >
            <div className="text-center">
              <Share2 className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">Share Bonus</p>
              <p className="text-xs opacity-80">Invite Friends</p>
            </div>
          </Button>
        </div>
      </div>

      <AdModal
        isOpen={showAdModal}
        onClose={() => setShowAdModal(false)}
        onComplete={handleAdComplete}
      />
    </div>
  );
};
