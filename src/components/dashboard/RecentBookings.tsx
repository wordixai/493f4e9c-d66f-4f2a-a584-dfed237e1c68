import { Booking } from '@/types';
import { Calendar, MapPin, Clock } from 'lucide-react';

interface RecentBookingsProps {
  bookings: Booking[];
}

function getStatusClass(status: Booking['status']) {
  switch (status) {
    case 'pending': return 'status-pending';
    case 'confirmed': return 'status-confirmed';
    case 'completed': return 'status-delivered';
    case 'cancelled': return 'status-cancelled';
    default: return '';
  }
}

export function RecentBookings({ bookings }: RecentBookingsProps) {
  return (
    <div className="bg-card border border-border/50 rounded-xl p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
      <h3 className="text-lg font-semibold text-foreground mb-4">Upcoming Bookings</h3>
      <div className="space-y-4">
        {bookings.slice(0, 4).map((booking) => (
          <div
            key={booking.id}
            className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            {booking.clientAvatar ? (
              <img
                src={booking.clientAvatar}
                alt={booking.clientName}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-medium">{booking.clientName[0]}</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{booking.clientName}</p>
              <p className="text-sm text-muted-foreground">{booking.packageName}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <span className={`status-badge mt-1 ${getStatusClass(booking.status)}`}>
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
