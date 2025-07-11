import { useState, useEffect, useCallback } from 'react';
import { GameState } from '@/types/game';

const INITIAL_STATE: GameState = {
  eggs: 0,
  food: 3,
  boosterActive: false,
  boosterTimeLeft: 0,
  nextEggTime: Date.now() + 2000,
  lastUpdate: Date.now(),
  totalEggs: 0,
  daysActive: 1,
  completedTasks: [],
  referralCount: 0,
};

const STORAGE_KEY = 'fatHenGameState';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Handle offline time
        const now = Date.now();
        const timeDiff = now - parsed.lastUpdate;
        
        if (parsed.food > 0 && timeDiff > 0) {
          const layRate = parsed.boosterActive ? 666 : 2000; // 3x faster with booster (0.66s vs 2s)
          const eggsEarned = Math.floor(timeDiff / layRate);
          const foodConsumed = Math.floor(timeDiff / (60 * 60 * 1000)); // 1 food per hour
          
          return {
            ...parsed,
            eggs: parsed.eggs + eggsEarned,
            totalEggs: parsed.totalEggs + eggsEarned,
            food: Math.max(0, parsed.food - foodConsumed),
            boosterTimeLeft: Math.max(0, parsed.boosterTimeLeft - timeDiff),
            boosterActive: parsed.boosterActive && parsed.boosterTimeLeft > timeDiff,
            lastUpdate: now,
          };
        }
        return { ...parsed, lastUpdate: now };
      }
    } catch (error) {
      console.error('Error loading game state:', error);
    }
    return INITIAL_STATE;
  });

  const saveState = useCallback((newState: GameState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  }, []);

  const updateGameState = useCallback((updater: (prev: GameState) => GameState) => {
    setGameState(prev => {
      const newState = updater(prev);
      saveState(newState);
      return newState;
    });
  }, [saveState]);

  const addEggs = useCallback((amount: number) => {
    updateGameState(prev => ({
      ...prev,
      eggs: prev.eggs + amount,
      totalEggs: prev.totalEggs + amount,
    }));
  }, [updateGameState]);

  const addFood = useCallback((amount: number) => {
    updateGameState(prev => ({
      ...prev,
      food: prev.food + amount,
    }));
  }, [updateGameState]);

  const activateBooster = useCallback(() => {
    updateGameState(prev => ({
      ...prev,
      boosterActive: true,
      boosterTimeLeft: 60 * 60 * 1000, // 1 hour
    }));
  }, [updateGameState]);

  const completeTask = useCallback((taskId: string) => {
    updateGameState(prev => ({
      ...prev,
      completedTasks: [...prev.completedTasks, taskId],
    }));
  }, [updateGameState]);

  const tapEgg = useCallback(() => {
    if (gameState.food <= 0) {
      const eggAmount = gameState.boosterActive ? 0.3 : 0.1;
      addEggs(eggAmount);
    }
  }, [gameState.food, gameState.boosterActive, addEggs]);

  // Auto egg laying effect
  useEffect(() => {
    if (gameState.food <= 0) return;

    const layRate = gameState.boosterActive ? 666 : 2000; // 3x faster with booster
    const interval = setInterval(() => {
      addEggs(1);
      updateGameState(prev => ({
        ...prev,
        nextEggTime: Date.now() + layRate,
      }));
    }, layRate);

    return () => clearInterval(interval);
  }, [gameState.food, gameState.boosterActive, addEggs, updateGameState]);

  // Booster countdown effect
  useEffect(() => {
    if (!gameState.boosterActive || gameState.boosterTimeLeft <= 0) return;

    const interval = setInterval(() => {
      updateGameState(prev => {
        const newTimeLeft = Math.max(0, prev.boosterTimeLeft - 1000);
        return {
          ...prev,
          boosterTimeLeft: newTimeLeft,
          boosterActive: newTimeLeft > 0,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.boosterActive, gameState.boosterTimeLeft, updateGameState]);

  // Food consumption effect
  useEffect(() => {
    if (gameState.food <= 0) return;

    const interval = setInterval(() => {
      updateGameState(prev => ({
        ...prev,
        food: Math.max(0, prev.food - 1),
      }));
    }, 60 * 60 * 1000); // 1 hour

    return () => clearInterval(interval);
  }, [gameState.food, updateGameState]);

  return {
    gameState,
    addEggs,
    addFood,
    activateBooster,
    completeTask,
    tapEgg,
  };
};
