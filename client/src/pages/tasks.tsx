import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AdModal } from '@/components/ad-modal';
import { useGameState } from '@/hooks/use-game-state';
import { Task } from '@/types/game';
import { ExternalLink, MessageCircle, Play, Heart, Share2, Check } from 'lucide-react';

const DAILY_TASKS: Task[] = [
  {
    id: 'visit-website',
    title: 'Visit Partner Website',
    description: 'Click the link and stay for 30s',
    reward: 1,
    icon: 'link',
    color: 'success',
    completed: false,
    action: 'visit',
  },
  {
    id: 'join-telegram',
    title: 'Join Telegram Channel',
    description: 'Subscribe to @FatHenOfficial',
    reward: 1,
    icon: 'telegram',
    color: 'blue',
    completed: false,
    action: 'join',
  },
  {
    id: 'watch-video',
    title: 'Watch Reward Video',
    description: 'Watch a 30s advertisement',
    reward: 1,
    icon: 'play',
    color: 'warning',
    completed: false,
    action: 'watch',
  },
  {
    id: 'follow-social',
    title: 'Follow on Social Media',
    description: 'Follow @fathen on Twitter',
    reward: 1,
    icon: 'heart',
    color: 'accent',
    completed: false,
    action: 'follow',
  },
  {
    id: 'share-friend',
    title: 'Share with Friend',
    description: 'Share the app with a friend',
    reward: 1,
    icon: 'share',
    color: 'secondary',
    completed: false,
    action: 'share',
  },
];

export const TasksPage = () => {
  const { gameState, addFood, completeTask } = useGameState();
  const [showAdModal, setShowAdModal] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string>('');

  const tasks = DAILY_TASKS.map(task => ({
    ...task,
    completed: gameState.completedTasks.includes(task.id),
  }));

  const completedCount = tasks.filter(task => task.completed).length;

  const handleTaskAction = (task: Task) => {
    if (task.completed) return;

    if (task.action === 'watch') {
      setCurrentTaskId(task.id);
      setShowAdModal(true);
    } else {
      // Simulate other actions
      setTimeout(() => {
        completeTask(task.id);
        addFood(task.reward);
      }, 1000);
    }
  };

  const handleAdComplete = () => {
    if (currentTaskId) {
      completeTask(currentTaskId);
      addFood(1);
      setCurrentTaskId('');
    }
  };

  const getTaskIcon = (iconType: string) => {
    switch (iconType) {
      case 'link': return <ExternalLink className="w-4 h-4" />;
      case 'telegram': return <MessageCircle className="w-4 h-4" />;
      case 'play': return <Play className="w-4 h-4" />;
      case 'heart': return <Heart className="w-4 h-4" />;
      case 'share': return <Share2 className="w-4 h-4" />;
      default: return <Check className="w-4 h-4" />;
    }
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case 'success': return 'border-[hsl(122,39%,49%)] bg-[hsl(122,39%,49%)]';
      case 'blue': return 'border-[hsl(207,90%,61%)] bg-[hsl(207,90%,61%)]';
      case 'warning': return 'border-[hsl(36,100%,60%)] bg-[hsl(36,100%,60%)]';
      case 'accent': return 'border-[hsl(14,100%,70%)] bg-[hsl(14,100%,70%)]';
      case 'secondary': return 'border-[hsl(94,48%,78%)] bg-[hsl(94,48%,78%)]';
      default: return 'border-gray-300 bg-gray-300';
    }
  };

  return (
    <div className="p-6 pb-20">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[hsl(210,10%,23%)] mb-2">Daily Tasks</h1>
        <p className="text-gray-600">Complete tasks to earn food packets! 🥣</p>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className={`shadow-lg border-l-4 ${getColorClass(task.color)}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`text-white rounded-full w-8 h-8 flex items-center justify-center ${getColorClass(task.color)}`}>
                    {task.completed ? <Check className="w-4 h-4" /> : getTaskIcon(task.icon)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[hsl(210,10%,23%)]">{task.title}</h3>
                    <p className="text-sm text-gray-500">{task.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  {task.completed ? (
                    <span className="bg-[hsl(122,39%,49%)] text-white rounded-full px-3 py-1 text-sm font-semibold">✅</span>
                  ) : (
                    <Button
                      onClick={() => handleTaskAction(task)}
                      className={`text-white rounded-full px-4 py-2 text-sm font-semibold ${getColorClass(task.color)}`}
                    >
                      {task.action === 'watch' ? 'Watch' : 
                       task.action === 'join' ? 'Join' :
                       task.action === 'follow' ? 'Follow' :
                       task.action === 'share' ? 'Share' : 'Complete'}
                    </Button>
                  )}
                  <p className="text-xs text-gray-500 mt-1">+{task.reward} 🥣</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Daily Progress */}
      <Card className="bg-gradient-to-r from-[hsl(48,100%,67%)] to-[hsl(94,48%,78%)] mt-6">
        <CardContent className="p-6 text-center">
          <h3 className="font-bold text-[hsl(210,10%,23%)] text-xl mb-2">Daily Progress</h3>
          <div className="text-3xl font-bold text-[hsl(210,10%,23%)] mb-2">{completedCount}/5</div>
          <p className="text-[hsl(210,10%,23%)] opacity-80">Tasks Completed Today</p>
          <div className="bg-white bg-opacity-30 rounded-full h-2 mt-4">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500" 
              style={{ width: `${(completedCount / 5) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <AdModal
        isOpen={showAdModal}
        onClose={() => setShowAdModal(false)}
        onComplete={handleAdComplete}
      />
    </div>
  );
};
