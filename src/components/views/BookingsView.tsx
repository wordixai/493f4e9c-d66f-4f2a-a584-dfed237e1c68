import { useState } from 'react';
import { Booking } from '@/types';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, MapPin, Clock, MoreHorizontal, Bell } from 'lucide-react';

interface BookingsViewProps {
  bookings: Booking[];
}

function getStatusClass(status: Booking['status']) {
  switch (status) {
    case 'pending': return 'status-pending';
    case 'confirmed': return 'status-confirmed';
    case 'completed': return 'status-delivered';
    case 'cancelled': return 'status-cancelled';
  }
}

export function BookingsView({ bookings }: BookingsViewProps) {
  const [filter, setFilter] = useState<'all' | Booking['status']>('all');

  const filteredBookings = filter === 'all'
    ? bookings
    : bookings.filter(b => b.status === filter);

  const sortedBookings = [...filteredBookings].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Bookings</h2>
          <p className="text-muted-foreground mt-1">Schedule and manage photoshoots</p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          New Booking
        </Button>
      </div>

      <div className="flex gap-2 mb-6">
        {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === status
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {sortedBookings.map((booking, index) => (
          <div
            key={booking.id}
            className="bg-card border border-border/50 rounded-xl p-5 hover:border-primary/30 transition-all animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start gap-4">
              {booking.clientAvatar ? (
                <img
                  src={booking.clientAvatar}
                  alt={booking.clientName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-semibold">{booking.clientName[0]}</span>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{booking.clientName}</h3>
                    <p className="text-primary font-medium text-sm">{booking.packageName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`status-badge ${getStatusClass(booking.status)}`}>
                      {booking.status}
                    </span>
                    <button className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{booking.location}</span>
                  </div>
                </div>

                {booking.notes && (
                  <p className="text-sm text-muted-foreground mt-3 p-3 bg-secondary/30 rounded-lg">
                    {booking.notes}
                  </p>
                )}
              </div>
            </div>

            {booking.status === 'confirmed' && (
              <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Bell className="w-4 h-4 text-primary" />
                  <span>Reminder set for 24h before</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Reschedule</Button>
                  <Button size="sm">Send Reminder</Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
