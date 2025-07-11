import { useState } from 'react';

interface HenCharacterProps {
  isFeeding: boolean;
  onTap: () => void;
}

export const HenCharacter = ({ isFeeding, onTap }: HenCharacterProps) => {
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

  return (
    <div className="relative">
      {/* Hen Image */}
      <div 
        className={`w-32 h-32 mx-auto rounded-full cursor-pointer transform transition-all duration-200 hover:scale-105 ${
          isFeeding ? 'animate-float' : ''
        } ${isAnimating ? 'animate-pulse' : ''}`}
        onClick={handleTap}
      >
        <div className="w-full h-full bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center text-6xl shadow-lg">
          🐔
        </div>
      </div>

      {/* Laying Indicator */}
      {isFeeding && (
        <div className="absolute -top-2 -right-2 bg-[hsl(122,39%,49%)] text-white rounded-full w-8 h-8 flex items-center justify-center animate-pulse-fast">
          <span className="text-xs">🥚</span>
        </div>
      )}

      {/* Floating Egg Animation */}
      <div 
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl pointer-events-none transition-all duration-1000 ${
          showFloatingEgg ? 'opacity-100' : 'opacity-0'
        }`}
      >
        +0.1 🥚
      </div>
    </div>
  );
};
