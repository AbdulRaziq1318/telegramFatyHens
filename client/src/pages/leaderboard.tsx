import { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore, query, orderBy } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { useGameState } from '@/hooks/use-game-state';
import { Trophy } from 'lucide-react';
import { app } from '@/lib/firebaseConfig'; // Make sure you export app from firebaseConfig.ts

type LeaderboardEntry = {
  id: string;
  username: string;
  eggs: number;
};

export const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const { gameState } = useGameState();

  useEffect(() => {
    async function fetchLeaderboard() {
      const db = getFirestore(app);
      const leaderboardRef = collection(db, 'leaderboard');
      const q = query(leaderboardRef, orderBy('eggs', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc, index) => ({
        id: doc.id,
        username: doc.data().username,
        eggs: doc.data().eggs,
      }));
      setLeaderboard(data);
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-4">
        <Trophy className="inline w-6 h-6 mr-2" /> Leaderboard
      </h1>

      <Card className="shadow-lg overflow-hidden">
        <CardContent className="p-0 divide-y">
          {leaderboard.map((user, index) => (
            <div key={user.id} className="flex justify-between items-center p-4">
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg">{index + 1}</span>
                <span>{user.username}</span>
              </div>
              <div className="text-right">
                <span className="font-semibold">{user.eggs}</span> 🥚
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
