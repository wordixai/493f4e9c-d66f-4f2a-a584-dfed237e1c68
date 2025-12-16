import { Client } from '@/types';
import { Button } from '@/components/ui/button';
import { Copy, Gift, Users, TrendingUp, Share2 } from 'lucide-react';

interface ReferralsViewProps {
  clients: Client[];
}

export function ReferralsView({ clients }: ReferralsViewProps) {
  const totalReferrals = clients.reduce((sum, c) => sum + c.referralCount, 0);
  const topReferrers = [...clients]
    .filter(c => c.referralCount > 0)
    .sort((a, b) => b.referralCount - a.referralCount);

  const referralCode = 'PHOTO2024';

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Referral Program</h2>
          <p className="text-muted-foreground mt-1">Track and reward client referrals</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Referrals</p>
              <p className="text-2xl font-bold text-foreground">{totalReferrals}</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold text-foreground">5</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Gift className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rewards Given</p>
              <p className="text-2xl font-bold text-foreground">$850</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Your Referral Code</h3>
          <div className="p-4 bg-secondary/50 rounded-lg border border-border/50 mb-4">
            <div className="flex items-center justify-between">
              <code className="text-xl font-mono font-bold text-primary">{referralCode}</code>
              <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(referralCode)}>
                <Copy className="w-4 h-4" />
                Copy
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Share this code with your clients. When their referrals book a session, both parties receive a 10% discount.
          </p>
          <Button className="w-full">
            <Share2 className="w-4 h-4" />
            Share Referral Link
          </Button>
        </div>

        <div className="bg-card border border-border/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Top Referrers</h3>
          <div className="space-y-4">
            {topReferrers.length > 0 ? (
              topReferrers.map((client, index) => (
                <div
                  key={client.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                    {index + 1}
                  </div>
                  {client.avatar ? (
                    <img
                      src={client.avatar}
                      alt={client.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-medium">{client.name[0]}</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{client.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {client.referralCount} referral{client.referralCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary">
                      ${(client.referralCount * 50).toLocaleString()} earned
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-8">No referrals yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
