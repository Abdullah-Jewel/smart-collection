export interface Product {
  id: string;
  name: string;
  category: string;
  gender: 'Men' | 'Women';
  price: number;
  images: string[];
  sizes: string[];
  colors: string[];
  description: string;
  fabric: string;
  care: string;
  rating?: number;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export type ActiveTab = 'home' | 'categories' | 'cart' | 'profile';

export interface FilterOptions {
  gender: 'Men' | 'Women' | 'All';
  category: string;
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  sortBy: string;
}
