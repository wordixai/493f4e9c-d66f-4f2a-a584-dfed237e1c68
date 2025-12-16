import { useState } from 'react';
import { Client } from '@/types';
import { Button } from '@/components/ui/button';
import { Plus, Search, Mail, Phone, DollarSign } from 'lucide-react';

interface ClientsViewProps {
  clients: Client[];
}

export function ClientsView({ clients }: ClientsViewProps) {
  const [search, setSearch] = useState('');

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(search.toLowerCase()) ||
    client.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Clients</h2>
          <p className="text-muted-foreground mt-1">Manage your client relationships</p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          Add Client
        </Button>
      </div>

      <div className="bg-card border border-border/50 rounded-xl">
        <div className="p-4 border-b border-border/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search clients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-secondary/50 border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
            />
          </div>
        </div>

        <div className="divide-y divide-border/50">
          {filteredClients.map((client, index) => (
            <div
              key={client.id}
              className="p-4 hover:bg-secondary/30 transition-colors cursor-pointer animate-slide-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                {client.avatar ? (
                  <img
                    src={client.avatar}
                    alt={client.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-semibold text-lg">{client.name[0]}</span>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{client.name}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Mail className="w-3.5 h-3.5" />
                      {client.email}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Phone className="w-3.5 h-3.5" />
                      {client.phone}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-foreground font-medium">
                    <DollarSign className="w-4 h-4 text-primary" />
                    {client.totalSpent.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {client.referralCount} referrals
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
