import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const AdModal = ({ isOpen, onClose, onComplete }: AdModalProps) => {
  const [timeLeft, setTimeLeft] = useState(15);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(15);
      setCanSkip(false);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setCanSkip(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    if (canSkip && timeLeft === 0) {
      const timer = setTimeout(() => {
        onComplete();
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [canSkip, timeLeft, onComplete, onClose]);

  if (!isOpen) return null;

  const progress = ((15 - timeLeft) / 15) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 m-4 w-full max-w-sm text-center">
        <div className="text-6xl mb-4">📺</div>
        <h3 className="font-bold text-xl text-[hsl(210,10%,23%)] mb-2">Watch Advertisement</h3>
        <p className="text-gray-600 mb-4">Watch this 15-second ad to earn rewards!</p>
        <div className="bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-[hsl(207,90%,61%)] h-2 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-2xl font-bold text-[hsl(210,10%,23%)] mb-4">{timeLeft}</div>
        <Button
          onClick={() => {
            if (canSkip) {
              onComplete();
              onClose();
            }
          }}
          disabled={!canSkip}
          className={canSkip 
            ? "bg-[hsl(122,39%,49%)] text-white" 
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }
        >
          {canSkip ? 'Claim Reward!' : `Skip (${timeLeft})`}
        </Button>
      </div>
    </div>
  );
};
