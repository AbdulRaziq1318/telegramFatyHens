import { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore, query, orderBy } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { useGameState } from '@/hooks/use-game-state';
import { Trophy } from 'lucide-react';
import { app } from '@/lib/firebaseConfig'; // Firebase app from config

type LeaderboardEntry = {
  id: string;
  username: string;
  eggs: number;
};

export const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const { gameState } = useGameState();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const db = getFirestore(app);
        const leaderboardRef = collection(db, 'leaderboard');
        const q = query(leaderboardRef, orderBy('eggs', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          username: doc.data().username || 'Unknown',
          eggs: doc.data().eggs || 0,
        }));
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="p-6 pb-20">
      <h1 className="text-3xl font-bold text-center mb-4 text-[hsl(210,10%,23%)]">
        <Trophy className="inline w-7 h-7 mr-2 text-yellow-500" />
        Leaderboard
      </h1>

      <Card className="shadow-lg overflow-hidden">
        <CardContent className="p-0 divide-y divide-gray-100">
          {leaderboard.length > 0 ? (
            leaderboard.map((user, index) => (
              <div key={user.id} className="flex justify-between items-center p-4">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg text-gray-700">{index + 1}</span>
                  <span className="text-gray-800">{user.username}</span>
                </div>
                <div className="text-right text-gray-600">
                  <span className="font-semibold">{user.eggs.toLocaleString()}</span> 🥚
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-400 text-sm">No leaderboard data found.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
