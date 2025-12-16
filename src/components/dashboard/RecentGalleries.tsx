import { Gallery } from '@/types';
import { Image, Clock, Check, Send } from 'lucide-react';

interface RecentGalleriesProps {
  galleries: Gallery[];
}

function getStatusIcon(status: Gallery['status']) {
  switch (status) {
    case 'editing': return <Clock className="w-3.5 h-3.5" />;
    case 'ready': return <Check className="w-3.5 h-3.5" />;
    case 'delivered': return <Send className="w-3.5 h-3.5" />;
  }
}

function getStatusClass(status: Gallery['status']) {
  switch (status) {
    case 'editing': return 'status-pending';
    case 'ready': return 'status-confirmed';
    case 'delivered': return 'status-delivered';
  }
}

export function RecentGalleries({ galleries }: RecentGalleriesProps) {
  return (
    <div className="bg-card border border-border/50 rounded-xl p-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Galleries</h3>
      <div className="grid grid-cols-2 gap-4">
        {galleries.slice(0, 4).map((gallery) => (
          <div
            key={gallery.id}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src={gallery.coverImage}
                alt={gallery.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-sm font-medium text-foreground truncate">{gallery.title}</p>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Image className="w-3.5 h-3.5" />
                <span>{gallery.imageCount}</span>
              </div>
              <span className={`status-badge ${getStatusClass(gallery.status)}`}>
                {getStatusIcon(gallery.status)}
                <span className="ml-1">{gallery.status}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
