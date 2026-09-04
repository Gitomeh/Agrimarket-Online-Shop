export interface Product {
  id: string;
  name: string;
  farmer: string;
  farmerId: string;
  price: number;
  unit: string;
  available: boolean;
  image: string;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
}

export interface Farmer {
  id: string;
  name: string;
  location: string;
  rating: number;
  products: number;
  image: string;
  description: string;
  verified: boolean;
}

export interface MarketAnalysis {
  trend: 'rising' | 'stable' | 'falling';
  confidence: number;
  priceForecast: number;
  factors: string[];
  recommendation: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
