import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HomePage } from "@/pages/home";
import { TasksPage } from "@/pages/tasks";
import { ReferralsPage } from "@/pages/referrals";
import { LeaderboardPage } from "@/pages/leaderboard";
import { ProfilePage } from "@/pages/profile";
import { BottomNavigation } from "@/components/bottom-navigation";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "tasks":
        return <TasksPage />;
      case "referrals":
        return <ReferralsPage />;
      case "leaderboard":
        return <LeaderboardPage />;
      case "profile":
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="max-w-sm mx-auto bg-white min-h-screen relative overflow-hidden">
          {renderCurrentPage()}
          <BottomNavigation 
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
