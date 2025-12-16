import { DashboardStats, Booking, Gallery } from '@/types';
import { StatsCard } from './StatsCard';
import { RecentBookings } from './RecentBookings';
import { RecentGalleries } from './RecentGalleries';
import { Users, Calendar, Image, DollarSign, UserPlus } from 'lucide-react';

interface DashboardViewProps {
  stats: DashboardStats;
  bookings: Booking[];
  galleries: Gallery[];
}

export function DashboardView({ stats, bookings, galleries }: DashboardViewProps) {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your studio overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatsCard
          title="Total Clients"
          value={stats.totalClients}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          delay={0}
        />
        <StatsCard
          title="Upcoming Shoots"
          value={stats.upcomingBookings}
          icon={Calendar}
          delay={50}
        />
        <StatsCard
          title="Pending Deliveries"
          value={stats.pendingDeliveries}
          icon={Image}
          delay={100}
        />
        <StatsCard
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: 8, isPositive: true }}
          delay={150}
        />
        <StatsCard
          title="Referrals"
          value={stats.referralsThisMonth}
          icon={UserPlus}
          trend={{ value: 25, isPositive: true }}
          delay={200}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentBookings bookings={bookings} />
        <RecentGalleries galleries={galleries} />
      </div>
    </div>
  );
}
