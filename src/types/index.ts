export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  referredBy?: string;
  referralCount: number;
  totalSpent: number;
  createdAt: Date;
}

export interface Gallery {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  coverImage: string;
  imageCount: number;
  status: 'editing' | 'ready' | 'delivered';
  deliveryDate?: Date;
  createdAt: Date;
}

export interface Booking {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  packageId: string;
  packageName: string;
  date: Date;
  time: string;
  location: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  reminder?: Date;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  duration: string;
  popular?: boolean;
}

export interface DashboardStats {
  totalClients: number;
  upcomingBookings: number;
  pendingDeliveries: number;
  monthlyRevenue: number;
  referralsThisMonth: number;
}
