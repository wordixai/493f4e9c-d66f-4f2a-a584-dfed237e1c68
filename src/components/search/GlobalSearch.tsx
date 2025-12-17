import { useState, useEffect, useRef } from 'react';
import { Search, X, User, Image, Calendar, ArrowRight } from 'lucide-react';
import { Client, Gallery, Booking } from '@/types';

interface SearchResult {
  type: 'client' | 'gallery' | 'booking';
  id: string;
  title: string;
  subtitle: string;
  avatar?: string;
}

interface GlobalSearchProps {
  clients: Client[];
  galleries: Gallery[];
  bookings: Booking[];
  onNavigate: (tab: string) => void;
}

export function GlobalSearch({ clients, galleries, bookings, onNavigate }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search clients
    clients.forEach(client => {
      if (client.name.toLowerCase().includes(q) || client.email.toLowerCase().includes(q)) {
        searchResults.push({
          type: 'client',
          id: client.id,
          title: client.name,
          subtitle: client.email,
          avatar: client.avatar,
        });
      }
    });

    // Search galleries
    galleries.forEach(gallery => {
      if (gallery.title.toLowerCase().includes(q) || gallery.clientName.toLowerCase().includes(q)) {
        searchResults.push({
          type: 'gallery',
          id: gallery.id,
          title: gallery.title,
          subtitle: `${gallery.clientName} • ${gallery.imageCount} photos`,
          avatar: gallery.coverImage,
        });
      }
    });

    // Search bookings
    bookings.forEach(booking => {
      if (booking.clientName.toLowerCase().includes(q) || booking.location.toLowerCase().includes(q)) {
        searchResults.push({
          type: 'booking',
          id: booking.id,
          title: booking.clientName,
          subtitle: `${booking.packageName} • ${new Date(booking.date).toLocaleDateString()}`,
          avatar: booking.clientAvatar,
        });
      }
    });

    setResults(searchResults.slice(0, 8));
  }, [query, clients, galleries, bookings]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleResultClick = (result: SearchResult) => {
    const tabMap = { client: 'clients', gallery: 'galleries', booking: 'bookings' };
    onNavigate(tabMap[result.type]);
    setIsOpen(false);
    setQuery('');
  };

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'client': return <User className="w-4 h-4" />;
      case 'gallery': return <Image className="w-4 h-4" />;
      case 'booking': return <Calendar className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: SearchResult['type']) => {
    switch (type) {
      case 'client': return 'Client';
      case 'gallery': return 'Gallery';
      case 'booking': return 'Booking';
    }
  };

  return (
    <div ref={containerRef} className="relative w-80">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search... (⌘K)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          style={{
            width: '100%',
            paddingLeft: '2.5rem',
            paddingRight: '2.5rem',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            backgroundColor: 'hsl(20 14% 10%)',
            border: '1px solid hsl(20 14% 20%)',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            color: '#f5f5f4',
            caretColor: '#f59e0b',
            outline: 'none',
          }}
          onFocus={(e) => {
            setIsOpen(true);
            e.currentTarget.style.borderColor = 'hsl(38 92% 50%)';
            e.currentTarget.style.boxShadow = '0 0 0 2px hsl(38 92% 50% / 0.3)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'hsl(20 14% 20%)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && query && (
        <div
          className="absolute top-full left-0 right-0 mt-2 rounded-xl shadow-2xl overflow-hidden z-50"
          style={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))'
          }}
        >
          {results.length > 0 ? (
            <div className="py-2 max-h-80 overflow-y-auto">
              {results.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full px-4 py-3 flex items-center gap-3 transition-colors text-left"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'hsl(var(--secondary))'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {result.avatar ? (
                    <img
                      src={result.avatar}
                      alt=""
                      className={`w-10 h-10 object-cover flex-shrink-0 ${result.type === 'gallery' ? 'rounded-lg' : 'rounded-full'}`}
                    />
                  ) : (
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'hsl(var(--primary) / 0.2)', color: 'hsl(var(--primary))' }}
                    >
                      {getIcon(result.type)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: 'hsl(var(--foreground))' }}>
                      {result.title}
                    </p>
                    <p className="text-xs truncate" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      {result.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className="text-xs px-2 py-0.5 rounded"
                      style={{ backgroundColor: 'hsl(var(--secondary))', color: 'hsl(var(--muted-foreground))' }}
                    >
                      {getTypeLabel(result.type)}
                    </span>
                    <ArrowRight className="w-4 h-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p style={{ color: 'hsl(var(--muted-foreground))' }}>No results for "{query}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
