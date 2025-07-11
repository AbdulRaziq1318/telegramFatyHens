import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGameState } from '@/hooks/use-game-state';
import { Copy, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MOCK_REFERRALS = [
  { username: '@alice_crypto', timestamp: Date.now() - 2 * 60 * 60 * 1000, reward: 1 },
  { username: '@bob_trader', timestamp: Date.now() - 24 * 60 * 60 * 1000, reward: 1 },
  { username: '@charlie_nft', timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000, reward: 1 },
];

export const ReferralsPage = () => {
  const { gameState } = useGameState();
  const { toast } = useToast();
  const [referralLink] = useState(`https://t.me/fathen_bot?ref=user${Date.now()}`);

  const formatTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / (60 * 60 * 1000));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast({
        title: "Link Copied!",
        description: "Your referral link has been copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Could not copy link. Please try again.",
        variant: "destructive",
      });
    }
  };

  const totalInvites = MOCK_REFERRALS.length + gameState.referralCount;
  const earnedFood = totalInvites;

  return (
    <div className="p-6 pb-20">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[hsl(210,10%,23%)] mb-2">Invite Friends</h1>
        <p className="text-gray-600">Each friend = +1 food packet! 🎁</p>
      </div>

      {/* Referral Link Section */}
      <Card className="bg-gradient-to-r from-[hsl(207,90%,61%)] to-[hsl(94,48%,78%)] text-white mb-6">
        <CardContent className="p-6 text-center">
          <h3 className="font-bold text-xl mb-4">Your Referral Link</h3>
          <div className="bg-white bg-opacity-20 rounded-xl p-4 mb-4">
            <p className="text-sm break-all">{referralLink}</p>
          </div>
          <Button
            onClick={copyReferralLink}
            className="bg-white text-[hsl(207,90%,61%)] rounded-xl px-6 py-3 font-semibold shadow-lg transform transition-all duration-200 hover:scale-105"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Link
          </Button>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-[hsl(210,10%,23%)] mb-1">{totalInvites}</div>
            <p className="text-gray-600 text-sm">Total Invites</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-[hsl(210,10%,23%)] mb-1">{earnedFood}</div>
            <p className="text-gray-600 text-sm">Food Earned 🥣</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Referrals */}
      <Card className="shadow-lg">
        <CardContent className="p-4">
          <h3 className="font-semibold text-[hsl(210,10%,23%)] mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-[hsl(207,90%,61%)]" />
            Recent Referrals
          </h3>
          
          {MOCK_REFERRALS.length > 0 ? (
            <div className="space-y-3">
              {MOCK_REFERRALS.map((referral, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-[hsl(48,100%,67%)] to-[hsl(94,48%,78%)] rounded-full w-8 h-8 flex items-center justify-center text-[hsl(210,10%,23%)] font-semibold text-sm">
                      {referral.username.charAt(1).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-[hsl(210,10%,23%)]">{referral.username}</p>
                      <p className="text-xs text-gray-500">{formatTimeAgo(referral.timestamp)}</p>
                    </div>
                  </div>
                  <span className="bg-[hsl(122,39%,49%)] text-white rounded-full px-3 py-1 text-xs font-semibold">
                    +{referral.reward} 🥣
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No referrals yet</p>
              <p className="text-sm">Share your link to start earning!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Referral Bonus Info */}
      <Card className="bg-[hsl(48,100%,85%)] mt-6">
        <CardContent className="p-4">
          <h4 className="font-semibold text-[hsl(210,10%,23%)] mb-2">🎉 Referral Bonus</h4>
          <p className="text-[hsl(210,10%,23%)] text-sm opacity-80">
            Get 1 food packet for each friend who joins using your link. Your friends also get 1 free food packet as a welcome bonus!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
