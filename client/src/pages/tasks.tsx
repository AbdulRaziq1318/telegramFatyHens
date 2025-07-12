import { useEffect, useState } from 'react';
import { ExternalLink, MessageCircle, Play, Heart, Share2, Check } from 'lucide-react';
import { getTasks } from '@/lib/getTasks';
import { useGameState } from '@/hooks/use-game-state';

type Task = {
  id: string;
  title: string;
  description: string;
  reward: number;
  link: string;
  icon: string;
  completed?: boolean;
};

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { gameState } = useGameState();

  useEffect(() => {
    getTasks().then((data) => {
      const completedTasks = gameState?.completedTasks || [];
      const updated = data.map((task: Task) => ({
        ...task,
        completed: completedTasks.includes(task.id),
      }));
      setTasks(updated);
    });
  }, []);

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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-2">Daily Tasks</h1>
      <p className="text-center mb-4">Complete tasks to earn food packets! 🥣</p>

      {tasks.map((task) => (
        <div
          key={task.id}
          className={`mb-4 p-4 rounded-lg shadow-md flex justify-between items-center ${
            task.completed ? 'bg-gray-300' : 'bg-white'
          }`}
        >
          <div className="flex gap-2 items-center">
            {getTaskIcon(task.icon)}
            <div>
              <div className="font-semibold">{task.title}</div>
              <div className="text-sm text-gray-600">{task.description}</div>
            </div>
          </div>

          <div className="text-right">
            {task.completed ? (
              <span className="text-green-600 font-semibold">Complete</span>
            ) : (
              <a
                href={task.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold underline"
              >
                Do +{task.reward} 🥣
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
