import { useState } from 'react';

interface EggCharacterProps {
  isFeeding: boolean;
  onTap: () => void;
  boosterActive: boolean;
}

export const EggCharacter = ({ isFeeding, onTap, boosterActive }: EggCharacterProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFloatingEgg, setShowFloatingEgg] = useState(false);

  const handleTap = () => {
    if (!isFeeding) {
      onTap();
      setIsAnimating(true);
      setShowFloatingEgg(true);
      
      setTimeout(() => {
        setIsAnimating(false);
        setShowFloatingEgg(false);
      }, 800);
    }
  };

  const eggReward = boosterActive ? '+0.3' : '+0.1';

  return (
    <div className="relative">
      {/* Egg Image */}
      <div 
        className={`w-40 h-40 mx-auto cursor-pointer transform transition-all duration-300 hover:scale-105 ${
          isFeeding ? 'animate-pulse-fast' : ''
        } ${isAnimating ? 'animate-bounce' : ''} ${
          !isFeeding ? 'opacity-60 grayscale' : 'opacity-100'
        }`}
        onClick={handleTap}
      >
        <img 
          src="/big-egg.svg" 
          alt="Big Egg" 
          className={`w-full h-full object-contain drop-shadow-lg ${
            isFeeding ? 'filter-none' : 'filter grayscale'
          }`}
        />
      </div>

      {/* Laying Indicator */}
      {isFeeding && (
        <div className="absolute -top-2 -right-2 bg-[hsl(122,39%,49%)] text-white rounded-full w-8 h-8 flex items-center justify-center animate-pulse-fast">
          <span className="text-xs">🥚</span>
        </div>
      )}

      {/* Booster Indicator */}
      {boosterActive && (
        <div className="absolute -top-1 -left-1 bg-gradient-to-r from-[hsl(36,100%,60%)] to-[hsl(14,100%,70%)] text-white rounded-full w-6 h-6 flex items-center justify-center animate-pulse-fast">
          <span className="text-xs">⚡</span>
        </div>
      )}

      {/* Floating Egg Animation */}
      <div 
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-[hsl(122,39%,49%)] pointer-events-none transition-all duration-1000 ${
          showFloatingEgg ? 'opacity-100 -translate-y-8' : 'opacity-0'
        }`}
      >
        {eggReward} 🥚
      </div>
    </div>
  );
};
