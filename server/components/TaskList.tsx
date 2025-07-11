import { useEffect, useState } from "react";
import { getTasks } from "../lib/getTasks";

type Task = {
  id: string;
  title: string;
  reward: number;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks as Task[]);
    }
    fetchTasks();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">📝 Daily Tasks</h2>
      {tasks.length === 0 ? (
        <p>Loading tasks...</p>
      ) : (
        tasks.map(task => (
          <div key={task.id} className="border p-3 rounded-md shadow-sm bg-white">
            <h3 className="font-semibold">{task.title}</h3>
            <p>Reward: 🥚 {task.reward} eggs</p>
          </div>
        ))
      )}
    </div>
  );
}
