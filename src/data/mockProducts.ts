import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: 'men-01',
    name: 'Oversized Organic Cotton Hoodie',
    category: 'Outerwear',
    gender: 'Men',
    price: 120,
    images: [
      '/src/assets/images/men_hoodie_1780460540165.png',
      'https://picsum.photos/seed/menhoodiealt/600/800'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Deep Black', 'Slate Grey', 'Off-White'],
    description: 'A luxurious heavyweight hoodie made of 100% premium organic cotton. Featuring an architectural dropped-shoulder silhouette, double-layered functional hood, and a clean minimalist pocketless clean-front finish for a sleek urban profile.',
    fabric: '100% Organic GOTS Certified Cotton (450 GSM Heavyweight French Terry)',
    care: 'Machine wash cold inside out with similar colors. Hang dry to maintain structure and fiber integrity. Cool iron if needed.'
  },
  {
    id: 'men-02',
    name: 'Pleated Wool Relaxed Trousers',
    category: 'Bottoms',
    gender: 'Men',
    price: 185,
    images: [
      '/src/assets/images/men_pants_1780460556659.png',
      'https://picsum.photos/seed/menpantsalt/600/800'
    ],
    sizes: ['30', '32', '34', '36'],
    colors: ['Charcoal Grey', 'Sand Taupe', 'Olive Drab'],
    description: 'Merging relaxed informal comfort with tailored sartorial precision. Crafted from lightweight, breathable virgin wool with deep double front pleats, a hidden metal tab closure, and adjustable waist side-adjusters for a custom fit.',
    fabric: '85% Virgin Wool, 15% Mulberry Silk (Lining: 100% Cupro)',
    care: 'Dry clean only. Gentle steam to remove wrinkles. Store on a contoured suit hanger.'
  },
  {
    id: 'women-01',
    name: 'Champagne Silk Slip Dress',
    category: 'Dresses',
    gender: 'Women',
    price: 240,
    images: [
      '/src/assets/images/women_dress_1780460574394.png',
      'https://picsum.photos/seed/womendressalt/600/800'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Champagne White', 'Midnight Satin', 'Sage Dust'],
    description: 'A timeless, sensuous silhouette bias-cut from premium heavyweight mulberry silk. Features a subtle cowl neck, ultra-fine adjustable cross-back shoulder straps, and a delicate floor-skimming fluid drape that responds gracefully to body movement.',
    fabric: '100% Heavyweight 22-Momme Mulberry Silk',
    care: 'Hand wash with neutral pH silk detergent in lukewarm water. Do not wring or twist. Iron damp on reverse under low heat.'
  },
  {
    id: 'women-02',
    name: 'Luxury Cotton Poplin Shirt',
    category: 'Tops',
    gender: 'Women',
    price: 95,
    images: [
      '/src/assets/images/women_shirt_1780460588131.png',
      'https://picsum.photos/seed/womenshirtalt/600/800'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Crisp White', 'Sky Blue Pin-Stripe', 'Onyx Black'],
    description: 'The ultimate wardrobe foundation. A modern, oversized boyfriend shirt woven from double-ply extra-long-staple cotton poplin, featuring mother-of-pearl hardware buttons, crisp square button-down cuffs, and a curved hemline.',
    fabric: '100% Extra-Long-Staple Egyptian Cotton (80s Two-Ply Poplin)',
    care: 'Machine wash warm on gentle cycle. Professional laundry pressing recommended for crisp finish, or light steam for soft relaxed texture.'
  }
];

export const heroAsset = '/src/assets/images/hero_banner_1780460521425.png';
