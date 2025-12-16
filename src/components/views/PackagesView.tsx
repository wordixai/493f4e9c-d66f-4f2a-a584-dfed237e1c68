import { PricingPackage } from '@/types';
import { Button } from '@/components/ui/button';
import { Plus, Check, Star, Edit } from 'lucide-react';

interface PackagesViewProps {
  packages: PricingPackage[];
}

export function PackagesView({ packages }: PackagesViewProps) {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Pricing Packages</h2>
          <p className="text-muted-foreground mt-1">Manage your service offerings</p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          Add Package
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((pkg, index) => (
          <div
            key={pkg.id}
            className={`relative bg-card border rounded-xl p-6 transition-all hover:border-primary/30 animate-slide-up ${
              pkg.popular ? 'border-primary' : 'border-border/50'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  <Star className="w-3 h-3" />
                  Popular
                </span>
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg text-foreground">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground">{pkg.duration}</p>
              </div>
              <button className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <Edit className="w-4 h-4" />
              </button>
            </div>

            <div className="mb-4">
              <span className="text-3xl font-bold text-foreground">${pkg.price.toLocaleString()}</span>
            </div>

            <p className="text-sm text-muted-foreground mb-6">{pkg.description}</p>

            <ul className="space-y-3 mb-6">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              variant={pkg.popular ? 'default' : 'outline'}
              className="w-full"
            >
              Select Package
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
