import { Home, CheckSquare, Users, Trophy, User } from 'lucide-react';

interface BottomNavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const BottomNavigation = ({ currentPage, onPageChange }: BottomNavigationProps) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
    { id: 'referrals', icon: Users, label: 'Friends' },
    { id: 'leaderboard', icon: Trophy, label: 'Ranks' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white shadow-2xl border-t border-gray-200">
      <div className="grid grid-cols-5 text-center py-2">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onPageChange(id)}
            className={`nav-button flex flex-col items-center py-2 px-1 ${
              currentPage === id ? 'active' : ''
            }`}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
