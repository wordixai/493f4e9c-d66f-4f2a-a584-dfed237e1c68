import { useState } from 'react';
import { Gallery } from '@/types';
import { Button } from '@/components/ui/button';
import { Plus, Image, Clock, Check, Send, Download, Eye, MoreHorizontal } from 'lucide-react';

interface GalleriesViewProps {
  galleries: Gallery[];
}

function getStatusIcon(status: Gallery['status']) {
  switch (status) {
    case 'editing': return <Clock className="w-4 h-4" />;
    case 'ready': return <Check className="w-4 h-4" />;
    case 'delivered': return <Send className="w-4 h-4" />;
  }
}

function getStatusClass(status: Gallery['status']) {
  switch (status) {
    case 'editing': return 'status-pending';
    case 'ready': return 'status-confirmed';
    case 'delivered': return 'status-delivered';
  }
}

export function GalleriesView({ galleries }: GalleriesViewProps) {
  const [filter, setFilter] = useState<'all' | Gallery['status']>('all');

  const filteredGalleries = filter === 'all'
    ? galleries
    : galleries.filter(g => g.status === filter);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Galleries</h2>
          <p className="text-muted-foreground mt-1">Manage and deliver client galleries</p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          Create Gallery
        </Button>
      </div>

      <div className="flex gap-2 mb-6">
        {(['all', 'editing', 'ready', 'delivered'] as const).map((status) => (
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGalleries.map((gallery, index) => (
          <div
            key={gallery.id}
            className="bg-card border border-border/50 rounded-xl overflow-hidden group animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={gallery.coverImage}
                alt={gallery.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute top-3 right-3 flex gap-2">
                <button className="w-8 h-8 rounded-lg bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <span className={`status-badge ${getStatusClass(gallery.status)}`}>
                  {getStatusIcon(gallery.status)}
                  <span className="ml-1">{gallery.status}</span>
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground truncate">{gallery.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{gallery.clientName}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Image className="w-4 h-4" />
                  <span>{gallery.imageCount} photos</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(gallery.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
