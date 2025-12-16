import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardView } from '@/components/dashboard/DashboardView';
import { ClientsView } from '@/components/views/ClientsView';
import { GalleriesView } from '@/components/views/GalleriesView';
import { BookingsView } from '@/components/views/BookingsView';
import { PackagesView } from '@/components/views/PackagesView';
import { ReferralsView } from '@/components/views/ReferralsView';
import { mockClients, mockGalleries, mockBookings, mockPackages, mockStats } from '@/data/mockData';
import { Bell, Search } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView stats={mockStats} bookings={mockBookings} galleries={mockGalleries} />;
      case 'clients':
        return <ClientsView clients={mockClients} />;
      case 'galleries':
        return <GalleriesView galleries={mockGalleries} />;
      case 'bookings':
        return <BookingsView bookings={mockBookings} />;
      case 'packages':
        return <PackagesView packages={mockPackages} />;
      case 'referrals':
        return <ReferralsView clients={mockClients} />;
      default:
        return <DashboardView stats={mockStats} bookings={mockBookings} galleries={mockGalleries} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="ml-64">
        <header className="h-16 border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="h-full px-6 flex items-center justify-between">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search clients, galleries, bookings..."
                className="w-full pl-10 pr-4 py-2 bg-secondary/50 border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm"
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="relative w-10 h-10 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
              </button>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-foreground">Alex Rivera</p>
                  <p className="text-xs text-muted-foreground">Photographer</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
