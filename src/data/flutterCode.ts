export const FLUTTER_HOME_CODE = `import 'package:flutter/material.dart';

/// SMART COLLECTION - PREMIUM MINIMALIST HOME SCREEN
/// Inspired by high-end labels with clean typography, generous spacing, and large imagery.
class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final double screenWidth = MediaQuery.of(context).size.width;
    final bool isTablet = screenWidth > 600;

    return Scaffold(
      backgroundColor: const Color(0xFFFBFBFB), // Soft warm off-white
      body: SafeArea(
        child: CustomScrollView(
          physics: const BouncingScrollPhysics(),
          slivers: [
            // Minimal Editorial Header
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 20.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      'SMART COLLECTION',
                      style: TextStyle(
                        fontFamily: 'Montserrat', // Elegant Geometric Sans
                        fontSize: 16.0,
                        fontWeight: FontWeight.w700,
                        letterSpacing: 4.0,
                        color: Color(0xFF111111), // Deep Charcoal Black
                      ),
                    ),
                    Row(
                      children: [
                        IconButton(
                          icon: const Icon(Icons.search, color: Color(0xFF111111), size: 22),
                          onPressed: () {},
                          padding: EdgeInsets.zero,
                          constraints: const BoxConstraints(),
                        ),
                        const SizedBox(width: 20),
                        IconButton(
                          icon: const Icon(Icons.shopping_bag_outlined, color: Color(0xFF111111), size: 22),
                          onPressed: () {},
                          padding: EdgeInsets.zero,
                          constraints: const BoxConstraints(),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),

            // 1. Dynamic Hero Banner (ASOS/Zara inspired landscape/portrait)
            SliverToBoxAdapter(
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: 24.0),
                width: double.infinity,
                height: isTablet ? 450.0 : 340.0,
                decoration: BoxDecoration(
                  color: const Color(0xFFE2E2E2),
                  image: const DecorationImage(
                    image: NetworkImage('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop'), // Placeholder, replaces with premium content
                    fit: BoxFit.cover,
                  ),
                ),
                child: Stack(
                  children: [
                    // Elegant Gradient Overlay for legible contrast
                    Container(
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.bottomCenter,
                          end: Alignment.topCenter,
                          colors: [
                            Colors.black.withOpacity(0.55),
                            Colors.transparent,
                          ],
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(24.0),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.end,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'NEW SEASON',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 11.0,
                              fontWeight: FontWeight.w600,
                              letterSpacing: 3.5,
                            ),
                          ),
                          const SizedBox(height: 8),
                          const Text(
                            'The Linen Collection\\nDesigned for Breathing',
                            style: TextStyle(
                              color: Colors.white,
                              fontFamily: 'Playfair', // Elegant Serif accent
                              fontSize: 24.0,
                              fontWeight: FontWeight.w300,
                              height: 1.3,
                            ),
                          ),
                          const SizedBox(height: 16),
                          ElevatedButton(
                            onPressed: () {},
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.white,
                              foregroundColor: const Color(0xFF111111),
                              elevation: 0,
                              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                              shape: const RoundedRectangleBorder(
                                borderRadius: BorderRadius.zero, // Minimalist sharp corners
                              ),
                            ),
                            child: const Text(
                              'EXPLORE NOW',
                              style: TextStyle(
                                fontSize: 10.5,
                                fontWeight: FontWeight.w600,
                                letterSpacing: 2.0,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Gender Category Split Banners (Men / Women Split)
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.only(left: 24.0, right: 24.0, top: 32.0, bottom: 40.0),
                child: Row(
                  children: [
                    Expanded(
                      child: _buildGenderSplitCard(
                        context,
                        title: 'WOMEN',
                        imageUrl: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=600&auto=format&fit=crop',
                        height: isTablet ? 300 : 200,
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: _buildGenderSplitCard(
                        context,
                        title: 'MEN',
                        imageUrl: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=600&auto=format&fit=crop',
                        height: isTablet ? 300 : 200,
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // New Arrivals Section Header
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24.0),
                child: Row(
                  alignment: Alignment.baseline,
                  textBaseline: TextBaseline.alphabetic,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      'NEW ARRIVALS',
                      style: TextStyle(
                        fontFamily: 'Montserrat',
                        fontSize: 14.0,
                        fontWeight: FontWeight.w700,
                        letterSpacing: 2.5,
                        color: Color(0xFF111111),
                      ),
                    ),
                    GestureDetector(
                      onPressed: () {},
                      child: const Text(
                        'VIEW ALL',
                        style: TextStyle(
                          fontSize: 11.0,
                          fontWeight: FontWeight.w600,
                          letterSpacing: 1.5,
                          color: Color(0xFF777777),
                          decoration: TextDecoration.underline,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // 2. New Arrivals Horizontal Carousel
            SliverToBoxAdapter(
              child: Container(
                height: 330.0,
                margin: const EdgeInsets.only(top: 16.0, bottom: 40.0),
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  physics: const BouncingScrollPhysics(),
                  padding: const EdgeInsets.only(left: 24.0, right: 8.0),
                  itemCount: newArrivalItems.length,
                  itemBuilder: (context, index) {
                    final item = newArrivalItems[index];
                    return _buildProductCarouselCard(context, item);
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildGenderSplitCard(BuildContext context, {required String title, required String imageUrl, required double height}) {
    return Container(
      height: height,
      decoration: BoxDecoration(
        color: const Color(0xFFF2F2F2),
        image: DecorationImage(
          image: NetworkImage(imageUrl),
          fit: BoxFit.cover,
        ),
      ),
      child: Stack(
        children: [
          Container(color: Colors.black.withOpacity(0.20)),
          Center(
            child: Text(
              title,
              style: const TextStyle(
                color: Colors.white,
                fontFamily: 'Montserrat',
                fontSize: 15.0,
                fontWeight: FontWeight.w700,
                letterSpacing: 4.0,
              ),
            ),
          ),
          Positioned.fill(
            child: Material(
              color: Colors.transparent,
              child: InkWell(
                onTap: () {},
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProductCarouselCard(BuildContext context, Map<String, dynamic> item) {
    return Container(
      width: 170.0,
      margin: const EdgeInsets.only(right: 16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Elegant Aspect Ratio for Clothing listing
          Expanded(
            child: Stack(
              children: [
                Container(
                  decoration: BoxDecoration(
                    color: const Color(0xFFEEEEEE),
                    image: DecorationImage(
                      image: NetworkImage(item['imageUrl']),
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
                Positioned(
                  top: 12.0,
                  right: 12.0,
                  child: Container(
                    decoration: const BoxDecoration(
                      color: Colors.white,
                      shape: BoxShape.circle,
                    ),
                    child: IconButton(
                      icon: const Icon(Icons.favorite_border, size: 16),
                      color: const Color(0xFF111111),
                      padding: const EdgeInsets.all(6),
                      constraints: const BoxConstraints(),
                      onPressed: () {},
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          Text(
            item['category'].toUpperCase(),
            style: const TextStyle(
              color: Color(0xFF888888),
              fontSize: 9.0,
              fontWeight: FontWeight.w600,
              letterSpacing: 1.5,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            item['name'],
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(
              color: Color(0xFF111111),
              fontSize: 13.0,
              fontWeight: FontWeight.w400,
              height: 1.3,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            'Tk \${item['price']}',
            style: const TextStyle(
              fontFamily: 'Montserrat',
              color: Color(0xFF111111),
              fontSize: 13.0,
              fontWeight: FontWeight.w700,
            ),
          ),
        ],
      ),
    );
  }
}

// Sample Data helper for development compiling
final List<Map<String, dynamic>> newArrivalItems = [
  {
    'name': 'Silk Slip Dress',
    'category': 'Dresses',
    'price': 240,
    'imageUrl': 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=600&auto=format&fit=crop',
  },
  {
    'name': 'Oversized Premium Hoodie',
    'category': 'Outerwear',
    'price': 120,
    'imageUrl': 'https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=600&auto=format&fit=crop',
  },
  {
    'name': 'Poplin Oversized Shirt',
    'category': 'Tops',
    'price': 95,
    'imageUrl': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
  },
];
`;

export const FLUTTER_PDP_CODE = `import 'package:flutter/material.dart';

/// SMART COLLECTION - PREMIUM PRODUCT DETAIL PAGE (PDP)
/// Implements full high-fidelity mobile flow: large image swiper, responsive size chip selectors,
/// fabric & care collapsible accordions, and a prominent bottom sticky purchase bar.
class ProductDetailPage extends StatefulWidget {
  final Map<String, dynamic> product;

  const ProductDetailPage({Key? key, required this.product}) : super(key: key);

  @override
  State<ProductDetailPage> createState() => _ProductDetailPageState();
}

class _ProductDetailPageState extends State<ProductDetailPage> {
  String? _selectedSize;
  int _activeImageIndex = 0;
  bool _isFabricExpanded = false;

  @override
  void initState() {
    super.initState();
    if (widget.product['sizes'] != null && widget.product['sizes'].isNotEmpty) {
      _selectedSize = widget.product['sizes'][0];
    }
  }

  @override
  Widget build(BuildContext context) {
    final double screenWidth = MediaQuery.of(context).size.width;
    final double carouselHeight = MediaQuery.of(context).size.height * 0.55;
    final List<String> images = List<String>.from(widget.product['images'] ?? []);
    final List<String> sizes = List<String>.from(widget.product['sizes'] ?? []);

    return Scaffold(
      backgroundColor: Colors.white,
      body: Stack(
        children: [
          // Scrollable Body Content
          SingleChildScrollView(
            physics: const BouncingScrollPhysics(),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // 1. Large High-Fidelity Image Swiper Panel
                Stack(
                  children: [
                    SizedBox(
                      height: carouselHeight,
                      width: double.infinity,
                      child: PageView.builder(
                        itemCount: images.isNotEmpty ? images.length : 1,
                        onPageChanged: (index) {
                          setState(() {
                            _activeImageIndex = index;
                          });
                        },
                        itemBuilder: (context, index) {
                          return Container(
                            color: const Color(0xFFF5F5F5),
                            child: images.isNotEmpty
                                ? Image.network(
                                    images[index],
                                    fit: BoxFit.cover,
                                  )
                                : const Center(child: Icon(Icons.image, size: 64, color: Colors.grey)),
                          );
                        },
                      ),
                    ),
                    
                    // Back Action Button (Float Overlay)
                    Positioned(
                      top: MediaQuery.of(context).padding.top + 10,
                      left: 16.0,
                      child: CircleAvatar(
                        backgroundColor: Colors.white.withOpacity(0.9),
                        radius: 20,
                        child: IconButton(
                          icon: const Icon(Icons.arrow_back_ios_new, size: 16, color: Color(0xFF111111)),
                          onPressed: () => Navigator.of(context).pop(),
                        ),
                      ),
                    ),

                    // Wishlist Heart Button Floating Action
                    Positioned(
                      top: MediaQuery.of(context).padding.top + 10,
                      right: 16.0,
                      child: CircleAvatar(
                        backgroundColor: Colors.white.withOpacity(0.9),
                        radius: 20,
                        child: IconButton(
                          icon: const Icon(Icons.favorite_border, size: 18, color: Color(0xFF111111)),
                          onPressed: () {},
                        ),
                      ),
                    ),

                    // Minimalist Custom Carousel Page Indicators Page Control
                    if (images.length > 1)
                      Positioned(
                        bottom: 24.0,
                        left: 0,
                        right: 0,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: List.generate(
                            images.length,
                            (index) => AnimatedContainer(
                              duration: const Duration(milliseconds: 300),
                              margin: const EdgeInsets.symmetric(horizontal: 4.0),
                              width: _activeImageIndex == index ? 24.0 : 6.0,
                              height: 2.0,
                              color: _activeImageIndex == index
                                  ? const Color(0xFF111111)
                                  : Colors.black.withOpacity(0.2),
                            ),
                          ),
                        ),
                      ),
                  ],
                ),

                // Product General Description Section
                Padding(
                  padding: const EdgeInsets.only(left: 24.0, right: 24.0, top: 32.0, bottom: 120.0), // Spaced bottom to avoid sticky button overlap
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Sub-category and Name
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  (widget.product['category'] ?? 'Apparel').toString().toUpperCase(),
                                  style: const TextStyle(
                                    color: Color(0xFF888888),
                                    fontSize: 10.0,
                                    fontWeight: FontWeight.w600,
                                    letterSpacing: 2.0,
                                  ),
                                ),
                                const SizedBox(height: 6),
                                Text(
                                  widget.product['name'] ?? 'Premium Essential Piece',
                                  style: const TextStyle(
                                    color: Color(0xFF111111),
                                    fontFamily: 'Montserrat',
                                    fontSize: 21.0,
                                    fontWeight: FontWeight.w400,
                                    letterSpacing: -0.5,
                                    height: 1.3,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(width: 16),
                          Text(
                            'Tk \${widget.product['price'] ?? 0}',
                            style: const TextStyle(
                              fontFamily: 'Montserrat',
                              fontSize: 22.0,
                              fontWeight: FontWeight.w700,
                              color: Color(0xFF111111),
                            ),
                          ),
                        ],
                      ),
                      
                      const SizedBox(height: 24),
                      
                      // Brief Narrative
                      Text(
                        widget.product['description'] ?? 'No formal description.',
                        style: const TextStyle(
                          color: Color(0xFF555555),
                          fontSize: 14.0,
                          height: 1.6,
                        ),
                      ),

                      const SizedBox(height: 32),

                      // 2. Responsive Size Selection Chips
                      const Text(
                        'SELECT SIZE',
                        style: TextStyle(
                          fontSize: 11.0,
                          fontWeight: FontWeight.w700,
                          letterSpacing: 1.5,
                          color: Color(0xFF111111),
                        ),
                      ),
                      const SizedBox(height: 12),
                      
                      // Horizontal flowing chips
                      Wrap(
                        spacing: 12.0,
                        runSpacing: 12.0,
                        children: sizes.map((size) {
                          final bool isSelected = _selectedSize == size;
                          return InkWell(
                            onTap: () {
                              setState(() {
                                _selectedSize = size;
                              });
                            },
                            child: AnimatedContainer(
                              duration: const Duration(milliseconds: 200),
                              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
                              decoration: BoxDecoration(
                                color: isSelected ? const Color(0xFF111111) : Colors.transparent,
                                border: Border.all(
                                  color: isSelected ? const Color(0xFF111111) : const Color(0xFFE0E0E0),
                                  width: 1.0,
                                ),
                              ),
                              child: Text(
                                size,
                                style: TextStyle(
                                  color: isSelected ? Colors.white : const Color(0xFF111111),
                                  fontSize: 12.0,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                          );
                        }).toList(),
                      ),

                      const SizedBox(height: 40),

                      // 3. Elegant Collapsible Accordion (Fabric & Care)
                      const Divider(color: Color(0xFFEEEEEE), height: 1),
                      Theme(
                        data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
                        child: ExpansionTile(
                          title: const Text(
                            'MATERIALS & SUSTAINABILITY',
                            style: TextStyle(
                              fontSize: 11.5,
                              fontWeight: FontWeight.w700,
                              letterSpacing: 1.5,
                              color: Color(0xFF111111),
                            ),
                          ),
                          tilePadding: EdgeInsets.zero,
                          childrenPadding: const EdgeInsets.only(bottom: 20.0),
                          iconColor: const Color(0xFF111111),
                          collapsedIconColor: const Color(0xFF111111),
                          children: [
                            Text(
                              widget.product['fabric'] ?? 'Premium natural-sourced fabric blend woven for longevity and rich wear performance.',
                              style: const TextStyle(
                                color: Color(0xFF666666),
                                fontSize: 13.0,
                                height: 1.5,
                              ),
                            ),
                          ],
                        ),
                      ),
                      const Divider(color: Color(0xFFEEEEEE), height: 1),
                      Theme(
                        data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
                        child: ExpansionTile(
                          title: const Text(
                            'PRODUCT CARE TIPS',
                            style: TextStyle(
                              fontSize: 11.5,
                              fontWeight: FontWeight.w700,
                              letterSpacing: 1.5,
                              color: Color(0xFF111111),
                            ),
                          ),
                          tilePadding: EdgeInsets.zero,
                          childrenPadding: const EdgeInsets.only(bottom: 20.0),
                          iconColor: const Color(0xFF111111),
                          collapsedIconColor: const Color(0xFF111111),
                          children: [
                            Text(
                              widget.product['care'] ?? 'Wash gently by hand or machine wash dry inside-out on wool-silk specialty cycles.',
                              style: const TextStyle(
                                color: Color(0xFF666666),
                                fontSize: 13.0,
                                height: 1.5,
                              ),
                            ),
                          ],
                        ),
                      ),
                      const Divider(color: Color(0xFFEEEEEE), height: 1),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // 4. Prominent Add to Bag Sticky purchase bar (Bottom Anchored Overlay)
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 20.0),
              decoration: BoxDecoration(
                color: Colors.white,
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.04),
                    blurRadius: 15,
                    offset: const Offset(0, -5),
                  ),
                ],
              ),
              child: Row(
                children: [
                  // Price Tag info
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Text(
                        'TOTAL COST',
                        style: TextStyle(
                          color: Color(0xFF999999),
                          fontSize: 9.0,
                          fontWeight: FontWeight.w600,
                          letterSpacing: 1.5,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        'Tk \${widget.product['price'] ?? 0}',
                        style: const TextStyle(
                          fontFamily: 'Montserrat',
                          fontSize: 18.0,
                          fontWeight: FontWeight.w700,
                          color: Color(0xFF111111),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(width: 40),
                  
                  // Prominent "ADD TO BAG" CTA
                  Expanded(
                    child: ElevatedButton(
                      onPressed: _selectedSize == null
                          ? null
                          : () {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  backgroundColor: const Color(0xFF111111),
                                  duration: const Duration(seconds: 2),
                                  content: Text(
                                    '\${widget.product['name']} (Size $_selectedSize) added to bag.',
                                    style: const TextStyle(fontStyle: FontStyle.normal),
                                  ),
                                ),
                              );
                            },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF111111),
                        disabledBackgroundColor: const Color(0xFFCCCCCC),
                        foregroundColor: Colors.white,
                        elevation: 0,
                        padding: const EdgeInsets.symmetric(vertical: 18.0),
                        shape: const RoundedRectangleBorder(
                          borderRadius: BorderRadius.zero, // Sharp luxury look
                        ),
                      ),
                      child: const Text(
                        'ADD TO BAG',
                        style: TextStyle(
                          fontSize: 12.0,
                          fontWeight: FontWeight.w700,
                          letterSpacing: 2.5,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
`;

export const BLUEPRINT_MARKDOWN = `### Smart Collection — Technical & Design Blueprint

Designed specifically to match high-end minimalist aesthetics (comparable to Zara, ASOS, and Uniqlo), this blueprint outlines the responsive UI system and architecture.

---

### 1. App Architecture & Navigation Flow

The app maintains a decoupled architectural layout adhering to Clean Architecture principles, ensuring seamless separation of state management, user interfaces, and remote cache repositories.

#### BottomNavigationBar Structure
The interface provides a persistent, modern \`BottomNavigationBar\` framing 4 distinct primary screens:
*   **Home Tab**: Editorial storefront content, season highlights, top carousels, and visual grid entrypoints.
*   **Categories Tab**: Gendered split classification (Men | Women) mapping down to granular segments (Tops, Bottoms, Outerwear, Accessories).
*   **Cart Tab**: Dynamic checkout manifest summarizing added item sizes, line modifications, shipping policies, and bag operations.
*   **Profile Tab**: Minimal user account controls containing historical orders, reward tracking, style presets, and settings.

\`\`\`
[App Root: MainNavigationContainer]
       │
       ├─► BottomNav: HomeScreen (Default)
       ├─► BottomNav: CategoriesScreen ──► SubCategories ──► ProductListingPage (PLP)
       ├─► BottomNav: CartScreen ─────────────────────────► CheckoutFlow
       └─► BottomNav: ProfileScreen
\`\`\`

---

### 2. High-Contrast Premium UI Component Breakdown

#### A. Home Screen
*   **Dynamic Hero Banner**: Responsive portrait/landscape presentation utilizing subtle radial gradients for clean contrast. Adapts to high-density tablet monitors dynamically.
*   **Shop By Gender Split**: Perfectly balanced 50:50 side-by-side split cards to route user intents with elegant typography overlays.
*   **"New Arrivals" Horizontal Carousel**: Scroll-snapping carousel listing cards. Includes minimalist wishlisting actions with soft, floating circle vectors.

#### B. Categories Screen
*   **Aesthetic Toggle Tabs**: High-contrast top toggle triggers between 'Men' and 'Women', allowing full screen re-indexing on a tap.
*   **Subcategory Expansion List**: Minimal vertical drawers detailing categories like Tops, Bottoms, and Outerwear with light-grey borders and generous space padding.

#### C. Product Listing Page (PLP)
*   **Two-Column Responsive Grid**: Uses adaptive slivers to scale tiles smoothly across varied screen profiles.
*   **Integrated Filter Bar**: Clean bottom-sheet overlays or collapsible persistent row for filtering by Size (chips), Color swatches, and Price Range selectors.

#### D. Product Detail Page (PDP)
*   **Large Accent Image Swiper**: Focuses attention entirely on fabrics and textures. Stretches up to 55% of vertical viewport height.
*   **Size-Selector Chips**: Custom inkwell chips designed for touch target compliance (minimum 44x44px safety grids).
*   **Fabric/Care Dropdowns**: Custom ExpansionTiles that isolate secondary details without adding visual clutter to the primary checkout stream.
*   **Sticky CTA Add-to-Bag**: Anchored absolute footer panel featuring the final real-time price and a wide dark button. Included touch-state feedback states.
`;

export const MOCK_DATA_JSON = `{
  "products": [
    {
      "id": "men-01",
      "name": "Oversized Organic Cotton Hoodie",
      "category": "Outerwear",
      "gender": "Men",
      "price": 120.00,
      "images": [
        "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1000"
      ],
      "sizes": ["S", "M", "L", "XL"],
      "description": "Heavyweight hoodie made of GOTS certified 100% organic cotton, featuring an editorial dropped-shoulder styling drape."
    },
    {
      "id": "men-02",
      "name": "Pleated Wool Relaxed Trousers",
      "category": "Bottoms",
      "gender": "Men",
      "price": 185.00,
      "images": [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000"
      ],
      "sizes": ["30", "32", "34", "36"],
      "description": "Merging relaxed informal comfort with tailored sartorial precision, woven from extra-fine virgin wool with deep front creases."
    },
    {
      "id": "women-01",
      "name": "Champagne Silk Slip Dress",
      "category": "Dresses",
      "gender": "Women",
      "price": 240.00,
      "images": [
        "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=1000"
      ],
      "sizes": ["XS", "S", "M", "L"],
      "description": "A timeless bias-cut silhouette crafted from 22-momme pure mulberry silk drape with minimalist adjustable straps."
    },
    {
      "id": "women-02",
      "name": "Luxury Cotton Poplin Shirt",
      "category": "Tops",
      "gender": "Women",
      "price": 95.00,
      "images": [
        "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=1000"
      ],
      "sizes": ["XS", "S", "M", "L", "XL"],
      "description": "Boyfriend design structured shirt woven from crisp extra-long Egyptian cotton with high cuffs and pearl buttons."
    }
  ]
}
`;

export const FLUTTER_ADMIN_PROFILE_UPLOADER_CODE = `import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:image_picker/image_picker.dart';
import 'package:http/http.dart' as http;

/// SMART COLLECTION - SECURE PROFILE & STOREFRONT PHOTO UPLOADER
/// Managed within the gated administrative Owner Portal
class AdminProfileUploader extends StatefulWidget {
  const AdminProfileUploader({Key? key}) : super(key: key);

  @override
  State<AdminProfileUploader> createState() => _AdminProfileUploaderState();
}

class _AdminProfileUploaderState extends State<AdminProfileUploader> {
  bool _isUploading = false;
  double _uploadProgress = 0.0;
  String? _currentStorefrontUrl;

  @override
  void initState() {
    super.initState();
    _fetchCurrentStorefrontPhoto();
  }

  /// Streams storefront URL directly from Firestore /admin_config/profile_data
  Future<void> _fetchCurrentStorefrontPhoto() async {
    try {
      final doc = await FirebaseFirestore.instance
          .collection('admin_config')
          .doc('profile_data')
          .get();
      if (doc.exists && doc.data() != null) {
        setState(() {
          _currentStorefrontUrl = doc.data()!['storefront_photo_url'] as String?;
        });
      }
    } catch (e) {
      debugPrint('Firestore read error: \$e');
    }
  }

  /// Selects the local device photo and POSTs it to the ImgBB API
  Future<void> pickAndUploadToImgBB() async {
    final ImagePicker picker = ImagePicker();
    final XFile? imageFile = await picker.pickImage(
      source: ImageSource.gallery,
      imageQuality: 80,
    );

    if (imageFile == null) return;

    setState(() {
      _isUploading = true;
      _uploadProgress = 0.3; // Simulated intermediate step
    });

    try {
      const String apiKey = '5d37936c38802e22c5d38f145da265e9';
      final uri = Uri.parse('https://api.imgbb.com/1/upload?key=\$apiKey');
      
      final request = http.MultipartRequest('POST', uri)
        ..files.add(await http.MultipartFile.fromPath('image', imageFile.path));

      setState(() {
        _uploadProgress = 0.6; // Request streaming payload
      });

      final Response = await request.send();
      final responseBody = await Response.stream.bytesToString();

      if (Response.statusCode == 200) {
        final Map<String, dynamic> jsonResponse = json.decode(responseBody);
        final String? directUrl = jsonResponse['data']['url'];

        if (directUrl != null) {
          setState(() {
            _uploadProgress = 0.9;
          });
          await updateRemoteProfilePhoto(directUrl);
          setState(() {
            _currentStorefrontUrl = directUrl;
            _uploadProgress = 1.0;
          });
          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Storefront updated successfully!')),
            );
          }
        } else {
          throw 'ImgBB direct URL missing in payload.';
        }
      } else {
        throw 'ImgBB error. HTTP Code: \${Response.statusCode}';
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Upload failed: \$e')),
        );
      }
    } finally {
      if (mounted) {
        setState(() {
          _isUploading = false;
        });
      }
    }
  }

  /// Save new storefront or uploader asset URL directly to Cloud Firestore
  Future<void> updateRemoteProfilePhoto(String newUrl) async {
    await FirebaseFirestore.instance
        .collection('admin_config')
        .doc('profile_data')
        .set({
      'storefront_photo_url': newUrl,
      'updatedAt': FieldValue.serverTimestamp(),
      'updatedBy': 'sarah.c@studio.smartcollection.gcp',
    }, SetOptions(merge: true));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFBFBFB),
      appBar: AppBar(
        title: const Text(
          'STOREFRONT SETTINGS',
          style: TextStyle(
            fontFamily: 'Montserrat',
            fontSize: 11.0,
            fontWeight: FontWeight.bold,
            letterSpacing: 2.0,
            color: Color(0xFF111111),
          ),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, size: 14, color: Color(0xFF111111)),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          children: [
            if (_currentStorefrontUrl != null) ...[
              ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Image.network(
                  _currentStorefrontUrl!,
                  height: 180,
                  width: double.infinity,
                  fit: BoxFit.cover,
                ),
              ),
              const SizedBox(height: 12),
            ],
            if (_isUploading) ...[
              const Text(
                'UPLOADING IMAGE...',
                style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.grey),
              ),
              const SizedBox(height: 8),
              LinearProgressIndicator(
                value: _uploadProgress,
                backgroundColor: const Color(0xFFE5E5E5),
                valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFF111111)),
              ),
              const SizedBox(height: 24),
            ],
            ElevatedButton(
              onPressed: _isUploading ? null : pickAndUploadToImgBB,
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF111111),
                padding: const EdgeInsets.symmetric(vertical: 14.0, horizontal: 24.0),
                shape: const RoundedRectangleBorder(borderRadius: BorderRadius.zero),
              ),
              child: const Text('PICK & UPLOAD TO IMGBB', style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold)),
            ),
          ],
        ),
      ),
    );
  }
}
`;

export const FLUTTER_OWNER_PROFILE_CODE = `import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';

/// SMART COLLECTION - MEET THE STUDIO OWNER & STOREFRONT SCREEN
/// Integrates a prominent physical storefront showcase section above the owner biography
/// and features an interactive profile photo uploader with error-resilient ImgBB CDN hosting.
class MeetStudioOwnerScreen extends StatefulWidget {
  const MeetStudioOwnerScreen({Key? key}) : super(key: key);

  @override
  State<MeetStudioOwnerScreen> createState() => _MeetStudioOwnerScreenState();
}

class _MeetStudioOwnerScreenState extends State<MeetStudioOwnerScreen> {
  // Absolute profile image path securely saved in state
  String _profileImageUrl = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop';
  bool _isUploadingProfile = false;
  
  // Storefront dynamic upload and progress states
  bool _isUploadingStorefront = false;
  double _storefrontProgress = 0.0;

  /// Performs high-performance dynamic upload of local photos directly to ImgBB CDN
  Future<void> _uploadProfilePhoto() async {
    try {
      final ImagePicker picker = ImagePicker();
      final XFile? pickedFile = await picker.pickImage(
        source: ImageSource.gallery,
        maxWidth: 800,
        maxHeight: 800,
        imageQuality: 85,
      );

      if (pickedFile == null) {
        debugPrint('ImgBB Pick: Cancelled by user.');
        return;
      }

      setState(() {
        _isUploadingProfile = true;
      });

      // API Configuration matching design metrics
      final String imgBBApiKey = '5d37936c38802e22c5d38f145da265e9';
      final Uri uploadUri = Uri.parse('https://api.imgbb.com/1/upload?key=\$imgBBApiKey');
      
      final http.MultipartRequest request = http.MultipartRequest('POST', uploadUri);
      request.files.add(
        await http.MultipartFile.fromPath('image', pickedFile.path),
      );

      debugPrint('ImgBB Core: Transmitting binary stream to CDN...');
      final http.StreamedResponse streamedResponse = await request.send();
      final http.Response response = await http.Response.fromStream(streamedResponse);

      if (response.statusCode == 200) {
        // Explicitly extract the absolute display file path: jsonDecode(response.body)['data']['url']
        final Map<String, dynamic> responseData = jsonDecode(response.body);
        final String? directUrl = responseData['data']['url'];
        
        if (directUrl != null && directUrl.isNotEmpty) {
          setState(() {
            _profileImageUrl = directUrl;
          });
          debugPrint('ImgBB Success: Hot-link registered: \$_profileImageUrl');
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Profile photo updated successfully via ImgBB!')),
          );
        }
      } else {
        throw 'HTTP Error \${response.statusCode}';
      }
    } catch (e) {
      debugPrint('ImgBB Upload Exception: \$e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Profile photo update failed: \$e.')),
      );
    } finally {
      setState(() {
        _isUploadingProfile = false;
      });
    }
  }

  /// Selects local device photo and POSTs it directly to ImgBB API
  Future<void> _uploadStorefrontPhoto() async {
    try {
      final ImagePicker picker = ImagePicker();
      final XFile? pickedFile = await picker.pickImage(
        source: ImageSource.gallery,
        maxWidth: 1600,
        maxHeight: 1200,
        imageQuality: 80,
      );

      if (pickedFile == null) return;

      setState(() {
        _isUploadingStorefront = true;
        _storefrontProgress = 0.2;
      });

      final String imgBBApiKey = '5d37936c38802e22c5d38f145da265e9';
      final Uri uploadUri = Uri.parse('https://api.imgbb.com/1/upload?key=\$imgBBApiKey');
      
      final http.MultipartRequest request = http.MultipartRequest('POST', uploadUri);
      request.files.add(
        await http.MultipartFile.fromPath('image', pickedFile.path),
      );

      setState(() {
        _storefrontProgress = 0.5;
      });

      final http.StreamedResponse streamedResponse = await request.send();
      final http.Response response = await http.Response.fromStream(streamedResponse);

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = jsonDecode(response.body);
        final String? directUrl = responseData['data']['url'];
        
        if (directUrl != null && directUrl.isNotEmpty) {
          setState(() {
            _storefrontProgress = 0.8;
          });

          // Save direct CDN link directly to Cloud Firestore document path: /admin_config/profile_data
          await FirebaseFirestore.instance
              .collection('admin_config')
              .doc('profile_data')
              .set({
            'storefront_photo_url': directUrl,
            'updatedAt': FieldValue.serverTimestamp(),
            'updatedBy': 'sarah.c@studio.smartcollection.gcp',
          }, SetOptions(merge: true));

          setState(() {
            _storefrontProgress = 1.0;
          });

          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Boutique presentation photo updated on Firestore!')),
            );
          }
        }
      } else {
        throw 'HTTP Error \${response.statusCode}';
      }
    } catch (e) {
      debugPrint('Storefront Upload Exception: \$e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Boutique upload failed: \$e')),
        );
      }
    } finally {
      if (mounted) {
        setState(() {
          _isUploadingStorefront = false;
        });
      }
    }
  }

  /// Triggers secure 6-digit passcode gate verification against Firestore before storefront photo update
  void _secureBoutiquePhotoUpdateFlow() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => const OwnerGateDialog(),
    ).then((dynamic verified) {
      if (verified == true) {
        _uploadStorefrontPhoto();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFBFBFB), // Soft warm off-white canvas
      appBar: AppBar(
        title: const Text(
          'THE STUDIO',
          style: TextStyle(
            fontFamily: 'Montserrat',
            fontSize: 12.0,
            fontWeight: FontWeight.w750,
            letterSpacing: 3.5,
            color: Color(0xFF111111),
          ),
        ),
        centerTitle: true,
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, size: 15, color: Color(0xFF111111)),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // 1. Dynamic Storefront Image Stream directly from Firestore (/admin_config/profile_data)
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                child: StreamBuilder<DocumentSnapshot>(
                  stream: FirebaseFirestore.instance
                      .collection('admin_config')
                      .doc('profile_data')
                      .snapshots(),
                  builder: (context, snapshot) {
                    String storefrontUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAcARCAHCAasDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqp3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usf4e5aeXl6FLS0tSS1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktBA==';
                    if (snapshot.hasData && snapshot.data!.exists) {
                      final remoteData = snapshot.data!.data() as Map<String, dynamic>?;
                      if (remoteData != null && remoteData['storefront_photo_url'] != null) {
                        storefrontUrl = remoteData['storefront_photo_url'] as String;
                      }
                    }
                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        ClipRRect(
                          borderRadius: BorderRadius.circular(16.0),
                          child: Stack(
                            alignment: Alignment.center,
                            children: [
                              storefrontUrl.startsWith('data:')
                                  ? Image.memory(
                                      base64Decode(storefrontUrl.split(',').last),
                                      height: 220.0,
                                      width: double.infinity,
                                      fit: BoxFit.cover,
                                    )
                                  : Image.network(
                                      storefrontUrl,
                                      height: 220.0,
                                      width: double.infinity,
                                      fit: BoxFit.cover,
                                      loadingBuilder: (context, child, loadingProgress) {
                                        if (loadingProgress == null) return child;
                                        return Container(
                                          height: 220,
                                          color: const Color(0xFFE5E5E5),
                                          child: const Center(
                                            child: CircularProgressIndicator(
                                              strokeWidth: 2.0,
                                              valueColor: AlwaysStoppedAnimation<Color>(Color(0xFF111111)),
                                            ),
                                          ),
                                        );
                                      },
                                      errorBuilder: (context, error, stackTrace) {
                                        return Container(
                                          height: 220,
                                          color: const Color(0xFFE5E5E5),
                                          child: const Center(
                                            child: Icon(Icons.broken_image_outlined, color: Colors.grey, size: 40),
                                          ),
                                        );
                                      },
                                    ),
                              if (_isUploadingStorefront)
                                Container(
                                  color: Colors.black45,
                                  height: 220,
                                  child: Center(
                                    child: Padding(
                                      padding: const EdgeInsets.symmetric(horizontal: 32.0),
                                      child: Column(
                                        mainAxisAlignment: MainAxisAlignment.center,
                                        children: [
                                          const Text(
                                            'UPLOADING PHOTO...',
                                            style: TextStyle(
                                              color: Colors.white,
                                              fontSize: 10,
                                              fontWeight: FontWeight.bold,
                                              letterSpacing: 1.5,
                                            ),
                                          ),
                                          const SizedBox(height: 12),
                                          LinearProgressIndicator(
                                            value: _storefrontProgress,
                                            backgroundColor: Colors.white24,
                                            valueColor: const AlwaysStoppedAnimation<Color>(Colors.white),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 12),
                        OutlinedButton.icon(
                          onPressed: _isUploadingStorefront ? null : _secureBoutiquePhotoUpdateFlow,
                          icon: const Icon(Icons.add_photo_alternate_outlined, size: 16, color: Color(0xFF111111)),
                          label: const Text(
                            'UPDATE SHOP PHOTO',
                            style: TextStyle(
                              fontFamily: 'Montserrat',
                              fontSize: 10.0,
                              fontWeight: FontWeight.bold,
                              letterSpacing: 1.5,
                              color: Color(0xFF111111),
                            ),
                          ),
                          style: OutlinedButton.styleFrom(
                            side: const BorderSide(color: Color(0xFF111111), width: 1.0),
                            shape: const RoundedRectangleBorder(borderRadius: BorderRadius.zero),
                            padding: const EdgeInsets.symmetric(vertical: 12.0),
                          ),
                        ),
                      ],
                    );
                  },
                ),
              ),
              
              // 2. Store Identity Badge
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),
                child: Container(
                  padding: const EdgeInsets.all(20.0),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    border: Border.all(color: const Color(0xFFE5E5E5), width: 1.0),
                    borderRadius: BorderRadius.circular(4.0),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Our Physical Boutique',
                        style: TextStyle(
                          fontFamily: 'Montserrat',
                          fontSize: 18.0,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF111111),
                        ),
                      ),
                      const SizedBox(height: 12),
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: const [
                          Icon(Icons.location_on, color: Colors.grey, size: 16),
                          SizedBox(width: 8),
                          Expanded(
                            child: Text(
                              '1 No Rail Gate, C.U.',
                              style: TextStyle(
                                fontFamily: 'Montserrat',
                                fontSize: 14.0,
                                color: Colors.grey,
                                fontWeight: FontWeight.v400,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: const [
                          Icon(Icons.phone, color: Colors.grey, size: 16),
                          SizedBox(width: 8),
                          Expanded(
                            child: Text(
                              'Mobile: 01834-249462, 01824-909910',
                              style: TextStyle(
                                fontFamily: 'Montserrat',
                                fontSize: 14.0,
                                color: Colors.grey,
                                fontWeight: FontWeight.v400,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),

              // 3. Divider: Thin horizontal divider line
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 24.0),
                child: Divider(
                  height: 1.0,
                  thickness: 0.5,
                  color: Color(0xFFE5E5E5),
                ),
              ),
              const SizedBox(height: 24),

              // 4. Owner Profile Section
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Profile Image & Personal Metadata
                    Center(
                      child: Column(
                        children: [
                          Stack(
                            alignment: Alignment.bottomRight,
                            children: [
                              Container(
                                width: 110,
                                height: 110,
                                decoration: BoxDecoration(
                                  color: const Color(0xFFF0F0F0),
                                  shape: BoxShape.circle,
                                  border: Border.all(color: const Color(0xFF111111), width: 1.0),
                                ),
                                child: ClipOval(
                                  child: _isUploadingProfile
                                      ? const Center(
                                          child: CircularProgressIndicator(
                                            strokeWidth: 2.0,
                                            valueColor: AlwaysStoppedAnimation<Color>(Color(0xFF111111)),
                                          ),
                                        )
                                      : Image.network(
                                          _profileImageUrl,
                                          fit: BoxFit.cover,
                                          loadingBuilder: (context, child, loadingProgress) {
                                            if (loadingProgress == null) return child;
                                            return const Center(
                                              child: CircularProgressIndicator(
                                                strokeWidth: 2.0,
                                                valueColor: AlwaysStoppedAnimation<Color>(Color(0xFF111111)),
                                              ),
                                            );
                                          },
                                          errorBuilder: (context, error, stackTrace) {
                                            return const Center(
                                              child: Icon(
                                                Icons.person_outline,
                                                size: 50,
                                                color: Colors.grey,
                                              ),
                                            );
                                          },
                                        ),
                                ),
                              ),
                              GestureDetector(
                                onTap: _uploadProfilePhoto,
                                child: Container(
                                  height: 32,
                                  width: 32,
                                  decoration: BoxDecoration(
                                    color: const Color(0xFF111111),
                                    shape: BoxShape.circle,
                                    border: Border.all(color: Colors.white, width: 1.5),
                                  ),
                                  child: const Icon(
                                    Icons.camera_alt,
                                    size: 15,
                                    color: Colors.white,
                                  ),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 16),
                          const Text(
                            'SARAH COLLINS',
                            style: TextStyle(
                              fontFamily: 'Montserrat',
                              fontSize: 17.0,
                              fontWeight: FontWeight.w400,
                              letterSpacing: 4.5,
                              color: Color(0xFF111111),
                            ),
                          ),
                          const SizedBox(height: 6),
                          Text(
                            'Founder & Creative Director'.toUpperCase(),
                            style: const TextStyle(
                              fontSize: 8.5,
                              fontWeight: FontWeight.w750,
                              letterSpacing: 2.0,
                              color: Color(0xFF888888),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 36),

                    // Atelier Philosophy statement
                    const Text(
                      'ATELIER PHILOSOPHY',
                      style: TextStyle(
                        fontFamily: 'Montserrat',
                        fontSize: 9.5,
                        fontWeight: FontWeight.w750,
                        letterSpacing: 2.0,
                        color: Color(0xFF111111),
                      ),
                    ),
                    const SizedBox(height: 12),
                    Container(
                      width: double.infinity,
                      decoration: const BoxDecoration(
                        border: Border(
                          left: BorderSide(color: Color(0xFF111111), width: 1.5),
                        ),
                      ),
                      padding: const EdgeInsets.only(left: 16.0, top: 4.0, bottom: 4.0),
                      child: const Text(
                        'Sarah Collins founded Smart Collection in 2024 to distill modern luxury down to its essential geometry. Moving away from disposable patterns, our garments merge architectural precision with high-density organic textiles.',
                        style: TextStyle(
                          color: Color(0xFF444444),
                          fontSize: 12.5,
                          height: 1.6,
                          fontWeight: FontWeight.w300,
                        ),
                      ),
                    ),
                    const SizedBox(height: 36),

                    // Pedigree section (Qualifications)
                    const Text(
                      'EDUCATIONAL PEDIGREE',
                      style: TextStyle(
                        fontFamily: 'Montserrat',
                        fontSize: 9.5,
                        fontWeight: FontWeight.w750,
                        letterSpacing: 2.0,
                        color: Color(0xFF111111),
                      ),
                    ),
                    const SizedBox(height: 8),
                    const Divider(color: Color(0xFFEFEFEF), thickness: 1.0, height: 1),
                    const SizedBox(height: 16),
                    _buildDegreeRow(
                      degree: 'Master of Fine Arts (MFA) — Fashion Design',
                      school: 'Royal College of Art, London',
                      years: '2019 — 2021',
                    ),
                    const SizedBox(height: 16),
                    _buildDegreeRow(
                      degree: 'Bachelor of Science in Textile Architecture',
                      school: 'Parsons School of Design, New York',
                      years: '2015 — 2019',
                    ),
                    const SizedBox(height: 36),

                    // Professional Experience
                    const Text(
                      'PROFESSIONAL DESIGN RECORD',
                      style: TextStyle(
                        fontFamily: 'Montserrat',
                        fontSize: 9.5,
                        fontWeight: FontWeight.w750,
                        letterSpacing: 2.0,
                        color: Color(0xFF111111),
                      ),
                    ),
                    const SizedBox(height: 8),
                    const Divider(color: Color(0xFFEFEFEF), thickness: 1.0, height: 1),
                    const SizedBox(height: 16),
                    _buildExperienceRow(
                      role: 'Senior Runway Stylist',
                      company: 'Lanvin, Paris',
                      period: '2022 — 2024',
                      summary: 'Curated capsule schedules, evaluated organic linen blends, and coordinated visual aesthetics for Paris Runway Week events.',
                    ),
                    const SizedBox(height: 16),
                    _buildExperienceRow(
                      role: 'Textile Consultant',
                      company: 'Celine, Atelier Paris',
                      period: '2021 — 2022',
                      summary: 'Pioneered biodegradable wool-blend research and crafted minimal pattern-scale frameworks.',
                    ),
                    const SizedBox(height: 24),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDegreeRow({
    required String degree,
    required String school,
    required String years,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          degree,
          style: const TextStyle(
            fontSize: 12.5,
            fontWeight: FontWeight.w600,
            color: Color(0xFF111111),
          ),
        ),
        const SizedBox(height: 4),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: Text(
                school,
                style: const TextStyle(
                  fontSize: 11.5,
                  color: Color(0xFF555555),
                  fontWeight: FontWeight.w300,
                ),
              ),
            ),
            Text(
              years,
              style: const TextStyle(
                fontFamily: 'Montserrat',
                fontSize: 10.5,
                color: Color(0xFF888888),
                fontWeight: FontWeight.w400,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildExperienceRow({
    required String role,
    required String company,
    required String period,
    required String summary,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: Text(
                role,
                style: const TextStyle(
                  fontSize: 12.5,
                  fontWeight: FontWeight.w600,
                  color: Color(0xFF111111),
                ),
              ),
            ),
            Text(
              period,
              style: const TextStyle(
                fontFamily: 'Montserrat',
                fontSize: 10.5,
                color: Color(0xFF888888),
                fontWeight: FontWeight.w400,
              ),
            ),
          ],
        ),
        const SizedBox(height: 3),
        Text(
          company,
          style: const TextStyle(
            fontSize: 11.5,
            fontWeight: FontWeight.w500,
            color: Color(0xFF555555),
          ),
        ),
        const SizedBox(height: 6),
        Text(
          summary,
          style: const TextStyle(
            fontSize: 11.5,
            color: Color(0xFF666666),
            height: 1.5,
            fontWeight: FontWeight.w300,
          ),
        ),
        const SizedBox(height: 16),
      ],
    );
  }
}

/// Fallback compatibility class for ancient navigators
class OwnerProfileScreen extends MeetStudioOwnerScreen {
  const OwnerProfileScreen({Key? key}) : super(key: key);
}
`;


export const FLUTTER_FIREBASE_SERVICE_CODE = `import 'dart:convert';
import 'dart:io';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';
import 'package:url_launcher/url_launcher.dart';

/// =========================================================================
/// I. FACEBOOK INTERACTION CONTROLLER (url_launcher 6.2.x)
/// =========================================================================
class FacebookLauncherService {
  /// Launches Facebook Messenger with custom prefilled context hooks.
  /// Falls back smoothly to device web browsers if the native application is missing.
  static Future<void> launchMessengerInbound({String? inquiryProductName}) async {
    final String baseAddress = 'https://m.me/smartcollection';
    final String encodedRef = inquiryProductName != null 
        ? '?ref=\${Uri.encodeComponent("I am inquiring about: " + inquiryProductName)}'
        : '';
        
    final Uri url = Uri.parse('\$baseAddress\$encodedRef');
    
    try {
      if (await canLaunchUrl(url)) {
        await launchUrl(
          url,
          mode: LaunchMode.externalApplication, // Safely opens in default browser/app
        );
      } else {
        throw 'Could not launch standard client URI: \$url';
      }
    } catch (e) {
      debugPrint('Facebook URL Launcher Exception: \$e');
    }
  }

  /// Opens the main designer or shop owner profile page on Facebook.
  static Future<void> launchOwnerProfile() async {
    final Uri profileUri = Uri.parse('https://facebook.com/smartcollection.studio');
    try {
      if (await canLaunchUrl(profileUri)) {
        await launchUrl(
          profileUri,
          mode: LaunchMode.platformDefault,
        );
      }
    } catch (e) {
      debugPrint('Profile Launcher Exception: \$e');
    }
  }
}

/// =========================================================================
/// II. FIRESTORE ACTIVITY HISTORY TELEMETRY SERVICE
/// =========================================================================
class ActivityService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  Future<void> _logEvent({
    required String userId,
    required String eventType,
    Map<String, dynamic>? metadata,
  }) async {
    try {
      if (userId.isEmpty) return;
      await _db
          .collection('users')
          .doc(userId)
          .collection('activities')
          .add({
        'eventType': eventType,
        'timestamp': FieldValue.serverTimestamp(),
        'metadata': metadata ?? {},
      });
    } catch (e) {
      debugPrint('Firebase Activity Logging Error: \$e');
    }
  }

  /// 1. Triggered on initial app entry
  Future<void> logAppEntry(String userId) async {
    await _logEvent(
      userId: userId,
      eventType: 'APP_ENTRY',
      metadata: {
        'platform': 'Mobile App',
        'client_version': '1.2.0',
        'device_locale': 'en_US',
      },
    );
  }

  /// 2. Triggered when a garment is added to wishlist favorites
  Future<void> logFavoriteAdded(String userId, String productId) async {
    await _logEvent(
      userId: userId,
      eventType: 'FAVORITE_ADDED',
      metadata: {
        'product_id': productId,
        'interaction_channel': 'Product Details Screen Favorite Button',
      },
    );
  }
}

/// =========================================================================
/// III. UNIFIED DART BACKEND SERVICE & SECURE ADMIN PORTAL LOGIC
/// =========================================================================
class AdminDataService {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _db = FirebaseFirestore.instance;
  
  // ImgBB API Endpoint with hardcoded Key as mandated
  static const String _imgBBApiKey = '5d37936c38802e22c5d38f145da265e9';
  static const String _imgBBUploadUrl = 'https://api.imgbb.com/1/upload?key=\$_imgBBApiKey';

  /// 1. Picks an image locally utilizing image_picker and uploads it to ImgBB
  /// Returns the direct hot-link URL string of the uploaded image.
  Future<String?> pickAndUploadToImgBB({required ImageSource source}) async {
    try {
      final ImagePicker picker = ImagePicker();
      final XFile? pickedFile = await picker.pickImage(
        source: source,
        maxWidth: 1000,
        maxHeight: 1000,
        imageQuality: 85,
      );

      if (pickedFile == null) {
        debugPrint('Image Selection: Cancelled by user.');
        return null;
      }

      final File file = File(pickedFile.path);
      
      // Build multipart/form-data upload request
      final Uri uploadUri = Uri.parse(_imgBBUploadUrl);
      final http.MultipartRequest request = http.MultipartRequest('POST', uploadUri);
      
      request.files.add(
        await http.MultipartFile.fromPath(
          'image',
          file.path,
        ),
      );

      debugPrint('ImgBB: Uploading active bytes to ImgBB...');
      final http.StreamedResponse streamedResponse = await request.send();
      final http.Response response = await http.Response.fromStream(streamedResponse);

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = jsonDecode(response.body);
        final String? directUrl = responseData['data']['url'];
        debugPrint('ImgBB: Direct hot-link generated: \$directUrl');
        return directUrl;
      } else {
        debugPrint('ImgBB: Upload crashed with Status Code \${response.statusCode}: \${response.body}');
        return null;
      }
    } catch (e) {
      debugPrint('ImgBB Exception occured: \$e');
      return null;
    }
  }

  /// 2. Verifies Admin Status: Checks ifCurrentUser is authenticated & has isAdmin == true in Firestore
  Future<bool> verifyAdminStatus() async {
    try {
      final User? currentUser = _auth.currentUser;
      if (currentUser == null) {
        debugPrint('Admin Route Guard: Access denied. User is unauthenticated.');
        return false;
      }

      final String uid = currentUser.uid;
      final DocumentSnapshot<Map<String, dynamic>> userDoc = 
          await _db.collection('users').doc(uid).get();

      if (userDoc.exists && userDoc.data() != null) {
        final bool isAdmin = userDoc.data()?['isAdmin'] ?? false;
        debugPrint('Admin Route Guard: Query checks for uid \$uid resolved with isAdmin: \$isAdmin');
        return isAdmin;
      }
      
      return false;
    } catch (e) {
      debugPrint('Admin Status Verification Exception: \$e');
      return false;
    }
  }

  /// 3. Saves newly curated garment design assets directly to Firestore products collection
  Future<void> saveProductData({
    required String name,
    required String category,
    required String gender,
    required double price,
    required String description,
    required String directImageUrl,
    String? fabric,
    String? care,
  }) async {
    try {
      // Create document with automated ID timestamp representation
      final String safeDocId = 'prod_\${DateTime.now().millisecondsSinceEpoch}';
      
      await _db.collection('products').doc(safeDocId).set({
        'id': safeDocId,
        'name': name,
        'category': category,
        'gender': gender,
        'price': price,
        'imageUrl': directImageUrl, // ImgBB hosted direct link
        'description': description,
        'fabric': fabric ?? '100% Premium Architecturally Woven Fibres',
        'care': care ?? 'Dry clean recommended to preserve tailored shapes',
        'createdAt': FieldValue.serverTimestamp(),
        'updatedAt': FieldValue.serverTimestamp(),
        'updatedBy': _auth.currentUser?.email ?? 'Sarah Collins (Store Owner)',
      });
      
      debugPrint('Firestore: Saved new cloth design: \$name with Doc ID: \$safeDocId');
    } catch (e) {
      debugPrint('Firestore Add Product Error: \$e');
      rethrow;
    }
  }

  /// 4. Overwrite Price Tag: Dynamically updates price details of an existing garment item
  Future<void> updatePrice({
    required String productId,
    required double newPrice,
  }) async {
    try {
      await _db.collection('products').doc(productId).update({
        'price': newPrice,
        'updatedAt': FieldValue.serverTimestamp(),
        'updatedBy': _auth.currentUser?.email ?? 'Sarah Collins (Store Owner)',
      });
      debugPrint('Firestore: Overwrite price tag of \$productId to \\\$\$newPrice successful.');
    } catch (e) {
      debugPrint('Firestore Price Overwrite Error: \$e');
      rethrow;
    }
  }

  /// 5. Modifies the customized owner profile parameters (avatar, qualifications, bio)
  Future<void> updateOwnerProfile({
    required String uid,
    required String name,
    required String bio,
    required String qualifications,
    required String experience,
    required String profileImageUrl,
  }) async {
    try {
      await _db.collection('users').doc(uid).update({
        'name': name,
        'bio': bio,
        'qualifications': qualifications,
        'experience': experience,
        'profileImageUrl': profileImageUrl,
        'updatedAt': FieldValue.serverTimestamp(),
      });
      debugPrint('Firestore: Successfully updated owner bio details for uid \$uid');
    } catch (e) {
      debugPrint('Firestore Owner Update Profile Error: \$e');
      rethrow;
    }
  }
}

/// =========================================================================
/// IV. ROUTE GUARDS / STRICT NAVIGATION INTERACTION ENFORCEMENT
/// =========================================================================
/// Example usage of secure Admin Verification when routing in Flutter.
/// Placed inside routers or navigation blocks to protect the Admin Portal.
class AdminRouteGuard extends StatelessWidget {
  final Widget adminChildScreen;
  final Widget fallbackCatalogScreen;

  const AdminRouteGuard({
    Key? key,
    required this.adminChildScreen,
    required this.fallbackCatalogScreen,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<bool>(
      future: AdminDataService().verifyAdminStatus(),
      builder: (context, snapshot) {
        // While waiting, display client-side loader matching minimalist aesthetics
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Scaffold(
            body: Center(
              child: SizedBox(
                width: 18.0,
                height: 18.0,
                child: CircularProgressIndicator(
                  strokeWidth: 1.0,
                  valueColor: AlwaysStoppedAnimation<Color>(Colors.black),
                ),
              ),
            ),
          );
        }

        // Evaluate authenticated flag
        final bool isVerifiedAdmin = snapshot.data ?? false;
        if (isVerifiedAdmin) {
          return adminChildScreen;
        } else {
          // Alert user of strict route guard violation and immediately redirect
          WidgetsBinding.instance.addPostFrameCallback((_) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text('Unauthorized: Strictly restricted to verified Boutique Owners only!'),
                backgroundColor: Colors.black,
                duration: Duration(seconds: 3),
              ),
            );
          });
          return fallbackCatalogScreen; // Secure fallback automatic redirection
        }
      },
    );
  }
}
`;

export const FLUTTER_ACTIVITY_HISTORY_CODE = `import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:intl/intl.dart'; // Standard format package to parse timestamps

/// SMART COLLECTION - FIREBASE HISTORICAL ACTIVITY TIMELINE SCREEN
/// Live binds to the firestore sub-collection per-user UUID.
/// Renders a highly responsive and detailed minimalist chronological log.
class ActivityHistoryScreen extends StatelessWidget {
  final String userId;

  const ActivityHistoryScreen({Key? key, required this.userId}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFBFBFB), // Soft sterile ivory
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Styled Action Header
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 24.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  IconButton(
                    icon: const Icon(Icons.arrow_back_ios_new, size: 15, color: Color(0xFF111111)),
                    onPressed: () => Navigator.of(context).pop(),
                    padding: EdgeInsets.zero,
                    constraints: const BoxConstraints(),
                  ),
                  const Text(
                    'ACTIVITY JOURNAL',
                    style: TextStyle(
                      fontFamily: 'Montserrat',
                      fontSize: 11.5,
                      fontWeight: FontWeight.w750,
                      letterSpacing: 2.5,
                      color: Color(0xFF111111),
                    ),
                  ),
                  const Icon(Icons.blur_on, size: 18, color: Color(0xFF111111)),
                ],
              ),
            ),

            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 24.0),
              child: Text(
                'YOUR SHOPPING EXPERIENCE LOG',
                style: TextStyle(
                  fontFamily: 'Montserrat',
                  fontSize: 10.0,
                  fontWeight: FontWeight.w600,
                  letterSpacing: 1.5,
                  color: Color(0xFF888888),
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Live Activity Streams
            Expanded(
              child: StreamBuilder<QuerySnapshot>(
                stream: FirebaseFirestore.instance
                    .collection('users')
                    .doc(userId)
                    .collection('activities')
                    .orderBy('timestamp', descending: true)
                    .snapshots(),
                builder: (context, snapshot) {
                  if (snapshot.hasError) {
                    return const Center(
                      child: Text(
                        'Unable to render log history.',
                        style: TextStyle(color: Colors.red, fontSize: 13.0, fontWeight: FontWeight.w300),
                      ),
                    );
                  }

                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(
                      child: CircularProgressIndicator(
                        valueColor: AlwaysStoppedAnimation<Color>(Color(0xFF111111)),
                        strokeWidth: 1.0,
                      ),
                    );
                  }

                  final docs = snapshot.data?.docs ?? [];
                  if (docs.isEmpty) {
                    return Center(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 40.0),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.dashboard_customize_outlined, size: 32, color: Colors.grey[300]),
                            const SizedBox(height: 16),
                            const Text(
                              'Your log is blank.',
                              style: TextStyle(
                                fontSize: 12.5,
                                color: Color(0xFF888888),
                                fontWeight: FontWeight.w300,
                              ),
                            ),
                            const SizedBox(height: 6),
                            const Text(
                              'Action items like entering the application, favoriting items, or making apparel purchases will start appearing here instantly.',
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                fontSize: 11.0,
                                color: Color(0xFFBBBBBB),
                                height: 1.5,
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  }

                  return ListView.builder(
                    physics: const BouncingScrollPhysics(),
                    padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 12.0),
                    itemCount: docs.length,
                    itemBuilder: (context, index) {
                      final doc = docs[index];
                      final data = doc.data() as Map<String, dynamic>;
                      final String eventType = data['eventType'] ?? 'UNKNOWN_EVENT';
                      final Timestamp? timestamp = data['timestamp'] as Timestamp?;
                      final Map<String, dynamic> metadata = data['metadata'] ?? {};

                      // Date formatting
                      String dateStr = 'Just Now';
                      if (timestamp != null) {
                        final DateTime dateTime = timestamp.toDate();
                        dateStr = DateFormat('MMM dd, yyyy · kk:mm').format(dateTime);
                      }

                      return _buildTimelineItem(
                        eventType: eventType,
                        dateStr: dateStr,
                        metadata: metadata,
                        isLast: index == docs.length - 1,
                      );
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTimelineItem({
    required String eventType,
    required String dateStr,
    required Map<String, dynamic> metadata,
    required bool isLast,
  }) {
    String eventTitle = '';
    String description = '';

    switch (eventType) {
      case 'APP_ENTRY':
        eventTitle = 'Application Entry';
        description = 'Logged safe server entry on version \${metadata['client_version'] ?? '1.1.0'}.';
        break;
      case 'FAVORITE_ADDED':
        eventTitle = 'Item Favorited';
        description = 'Liked garment catalog identifier: \${metadata['product_id'] ?? 'N/A'}.';
        break;
      case 'PAYMENT_SUCCESS':
        eventTitle = 'Order Confirmed';
        double amount = (metadata['amount_usd'] ?? 0.0).toDouble();
        description = 'Purchased clothing order ID #\${metadata['order_id'] ?? 'unknown_id'} totaling Tk \${amount.toStringAsFixed(2)}.';
        break;
      default:
        eventTitle = eventType.replaceAll('_', ' ');
        description = 'Generic operation telemetry recorded.';
    }

    return IntrinsicHeight(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Elegant Timeline bullet node and continuous connector line
          Column(
            children: [
              Container(
                width: 10,
                height: 10,
                decoration: BoxDecoration(
                  color: Colors.white,
                  border: Border.all(color: const Color(0xFF111111), width: 1.5),
                  shape: BoxShape.circle,
                ),
                child: Center(
                  child: Container(
                    width: 3,
                    height: 3,
                    decoration: const BoxDecoration(
                      color: Color(0xFF111111),
                      shape: BoxShape.circle,
                    ),
                  ),
                ),
              ),
              Expanded(
                child: Container(
                  width: 1.0,
                  color: isLast ? Colors.transparent : const Color(0xFFE2E2E2),
                ),
              ),
            ],
          ),
          const SizedBox(width: 16),

          // Log detail content
          Expanded(
            child: Padding(
              padding: const EdgeInsets.only(bottom: 24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        eventTitle.toUpperCase(),
                        style: const TextStyle(
                          fontSize: 10.5,
                          fontWeight: FontWeight.w750,
                          letterSpacing: 0.5,
                          color: Color(0xFF111111),
                        ),
                      ),
                      Text(
                        dateStr,
                        style: const TextStyle(
                          fontFamily: 'Montserrat',
                          fontSize: 9.5,
                          color: Color(0xFF999999),
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  Text(
                    description,
                    style: const TextStyle(
                      fontSize: 11.5,
                      color: Color(0xFF555555),
                      height: 1.4,
                      fontWeight: FontWeight.w300,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
`;

export const FIRESTORE_SCHEMA_JSON = `{
  "products": {
    "women_dress_1780460574394": {
      "id": "prod_1780460574394",
      "name": "Asymmetrical Pleated Shift Dress",
      "category": "Dresses",
      "gender": "Women",
      "price": 240,
      "imageUrl": "https://i.ibb.co/6P0j6m9/asymmetrical_pleated_shift_dress.jpg",
      "sizes": ["XS", "S", "M", "L"],
      "colors": ["Cream Rose", "Sand Lily", "Noir Charcoal"],
      "description": "A structurally fluid shift dress engineered with an asymmetrical hemline, delicate bias draping, and soft tactile organic linen.",
      "fabric": "100% Certified Premium Organic Cotton Fibres",
      "care": "Dry clean recommended to preserve architectural shapes.",
      "createdAt": "Timestamp(seconds=1780460574, nanoseconds=0)",
      "updatedAt": "Timestamp(seconds=1780460620, nanoseconds=50000000)",
      "updatedBy": "sarah.c@studio.smartcollection.gcp"
    }
  },
  "users": {
    "UUID_9A3E7F81_44C2_BEEF": {
      "name": "Sarah Collins",
      "bio": "Expert Haute Couture Designer & Sustainable Textiles Curator. Spearheading the Smart Collection design house.",
      "qualifications": "B.A. in Fashion & Textile Engineering, Central Saint Martins London",
      "experience": "12+ Years in Curated Curated Wardrobes & Eco-friendly Fabric Architectures",
      "profileImageUrl": "https://i.ibb.co/1KzqFpX/designer_sarah_collins.jpg",
      "isAdmin": true,
      "email": "sarah.c@studio.smartcollection.gcp",
      "tier": "Studio Founder",
      "createdAt": "Timestamp(seconds=1780460000, nanoseconds=0)",
      "updatedAt": "Timestamp(seconds=1780460620, nanoseconds=0)"
    }
  }
}
`;

export const FLUTTER_MY_ACCOUNT_CODE = `import 'package:flutter/material.dart';
import 'owner_gate_dialog.dart';
import 'meet_studio_owner_screen.dart';

/// SMART COLLECTION - MY ACCOUNT SCREEN
/// Highly refined minimal design completely devoid of bloated user metrics.
/// Adheres strictly to high-end couture visual specs.
class MyAccountScreen extends StatelessWidget {
  const MyAccountScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFBFBFB), // Soft warm off-white canvas
      appBar: AppBar(
        title: const Text(
          'MY ACCOUNT',
          style: TextStyle(
            fontFamily: 'Montserrat',
            fontSize: 12.0,
            fontWeight: FontWeight.w750,
            letterSpacing: 3.5,
            color: Color(0xFF111111),
          ),
        ),
        centerTitle: true,
        backgroundColor: Colors.transparent,
        elevation: 0,
        automaticallyImplyLeading: false,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Profile Header Card
                Container(
                  padding: const EdgeInsets.all(16.0),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF5F5F5),
                    border: Border.all(color: const Color(0xFFE5E5E5), width: 1.0),
                    borderRadius: BorderRadius.circular(4.0),
                  ),
                  child: Row(
                    children: [
                      Container(
                        width: 44,
                        height: 44,
                        decoration: const BoxDecoration(
                          color: Color(0xFF111111),
                          shape: BoxShape.circle,
                        ),
                        child: const Center(
                          child: Text(
                            'SC',
                            style: TextStyle(
                              fontFamily: 'Montserrat',
                              fontSize: 14,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'Premium Flutter Guest',
                              style: TextStyle(
                                fontFamily: 'Montserrat',
                                fontSize: 13.0,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFF111111),
                              ),
                            ),
                            const SizedBox(height: 3),
                            Text(
                              'designer@smartcollection.gcp',
                              style: TextStyle(
                                fontFamily: 'Montserrat',
                                fontSize: 10.0,
                                fontWeight: FontWeight.w300,
                                color: Color(0xFF888888),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 32),

                // Curated Menu Settings Navigation
                const Text(
                  'STUDIO SETTINGS',
                  style: TextStyle(
                    fontFamily: 'Montserrat',
                    fontSize: 10.0,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 2.0,
                    color: Color(0xFF888888),
                  ),
                ),
                const SizedBox(height: 12),

                // "Meet the Studio Owner" Option exactly intact
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 2.0),
                  child: ListTile(
                    contentPadding: EdgeInsets.zero,
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => const MeetStudioOwnerScreen()),
                      );
                    },
                    leading: const Icon(
                      Icons.person_outline,
                      size: 20,
                      color: Color(0xFF111111),
                    ),
                    title: const Text(
                      'Meet the Studio Owner',
                      style: TextStyle(
                        fontFamily: 'Montserrat',
                        fontSize: 12.0,
                        fontWeight: FontWeight.w500,
                        color: Color(0xFF111111),
                      ),
                    ),
                    trailing: const Icon(
                      Icons.arrow_forward_ios,
                      size: 13,
                      color: Color(0xFFCCCCCC),
                    ),
                  ),
                ),

                const Divider(height: 1, thickness: 0.5, color: Color(0xFFE5E5E5)),

                // "Owner Portal" Option beneath with passcode triggers
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 2.0),
                  child: ListTile(
                    contentPadding: EdgeInsets.zero,
                    onTap: () {
                      showDialog(
                        context: context,
                        barrierDismissible: false,
                        builder: (context) => const OwnerGateDialog(),
                      );
                    },
                    leading: const Icon(
                      Icons.lock_outline,
                      size: 20,
                      color: Color(0xFF111111),
                    ),
                    title: const Text(
                      'Owner Portal',
                      style: TextStyle(
                        fontFamily: 'Montserrat',
                        fontSize: 12.0,
                        fontWeight: FontWeight.w500,
                        color: Color(0xFF111111),
                      ),
                    ),
                    trailing: const Icon(
                      Icons.arrow_forward_ios,
                      size: 13,
                      color: Color(0xFFCCCCCC),
                    ),
                  ),
                ),
                const Divider(height: 1, thickness: 0.5, color: Color(0xFFE5E5E5)),
                const SizedBox(height: 48),

                // Curated Brand Slogan Footer
                Center(
                  child: Column(
                    children: [
                      Container(
                        width: 30,
                        height: 1,
                        color: const Color(0xFF111111),
                      ),
                      const SizedBox(height: 16),
                      Text(
                        '"Fashion fades, only premium, well-engineered architectural design remains eternal."',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontFamily: 'Montserrat',
                          fontSize: 10.0,
                          fontStyle: FontStyle.italic,
                          fontWeight: FontWeight.w300,
                          color: Color(0xFF888888),
                          height: 1.6,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
`;

export const FLUTTER_OWNER_GATE_DIALOG_CODE = `import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'owner_portal_screen.dart';

/// SMART COLLECTION - ACCESS VALIDATION SECURITY GATEWAY
/// Requests a 6-digit Master Passcode PIN and validates against Firestore
class OwnerGateDialog extends StatefulWidget {
  const OwnerGateDialog({Key? key}) : super(key: key);

  @override
  State<OwnerGateDialog> createState() => _OwnerGateDialogState();
}

class _OwnerGateDialogState extends State<OwnerGateDialog> {
  final List<TextEditingController> _controllers = List.generate(6, (_) => TextEditingController());
  final List<FocusNode> _focusNodes = List.generate(6, (_) => FocusNode());
  bool _isLoading = false;
  String? _errorMessage;

  @override
  void dispose() {
    for (var controller in _controllers) controller.dispose();
    for (var node in _focusNodes) node.dispose();
    super.dispose();
  }

  Future<void> _verifyPasscode() async {
    final pinCandidate = _controllers.map((c) => c.text).join();
    if (pinCandidate.length < 6) {
      setState(() {
        _errorMessage = "Please enter a 6-digit PIN";
      });
      return;
    }

    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      // Queries Cloud Firestore path /admin_config/security to read direct access_pin
      final docSnapshot = await FirebaseFirestore.instance
          .collection('admin_config')
          .doc('security')
          .get();

      if (docSnapshot.exists) {
        final serverPin = docSnapshot.data()?['access_pin'] as String?;

        if (serverPin != null && serverPin == pinCandidate) {
          // Success Path: close passcode gate dialog and immediately push navigation to Owner Portal
          if (mounted) {
            Navigator.of(context).pop(); // Close passcode modal
            Navigator.pushReplacement(
              context,
              MaterialPageRoute(builder: (context) => const OwnerPortalScreen()),
            );
          }
        } else {
          _resetPinInputs(error: "Access Denied: Invalid Passcode");
        }
      } else {
        _resetPinInputs(error: "Admin security configuration missing.");
      }
    } catch (e) {
      _resetPinInputs(error: "Firestore Connection Failed: \${e.toString()}");
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  void _resetPinInputs({required String error}) {
    if (!mounted) return;
    setState(() {
      _errorMessage = error;
      for (var controller in _controllers) {
        controller.clear();
      }
    });
    _focusNodes[0].requestFocus(); // Reset focus to first digit column
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.zero),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 24.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: const [
                Icon(Icons.lock_outline, size: 16, color: Color(0xFF111111)),
                SizedBox(width: 8),
                Text(
                  'OWNER PORTAL GATE',
                  style: TextStyle(
                    fontFamily: 'Montserrat',
                    fontSize: 10.0,
                    fontWeight: FontWeight.w750,
                    letterSpacing: 2.0,
                    color: Color(0xFF111111),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            const Text(
              'A secure connection is being established. Enter the active administrative master passcode to proceed.',
              style: TextStyle(
                fontFamily: 'Montserrat',
                fontSize: 9.5,
                color: Color(0xFF666666),
                height: 1.5,
              ),
            ),
            const SizedBox(height: 20),

            // 6-Digit Passcode Input Grid Row
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: List.generate(6, (index) {
                return SizedBox(
                  width: 34,
                  height: 40,
                  child: TextFormField(
                    controller: _controllers[index],
                    focusNode: _focusNodes[index],
                    keyboardType: TextInputType.number,
                    textAlign: TextAlign.center,
                    obscureText: true,
                    style: const TextStyle(
                      fontFamily: 'Montserrat',
                      fontSize: 15,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF111111),
                    ),
                    decoration: InputDecoration(
                      contentPadding: EdgeInsets.zero,
                      enabledBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Color(0xFFCCCCCC), width: 1.0),
                        borderRadius: BorderRadius.zero,
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Color(0xFF111111), width: 1.5),
                        borderRadius: BorderRadius.zero,
                      ),
                    ),
                    onChanged: (value) {
                      if (value.isNotEmpty) {
                        if (index < 5) {
                          _focusNodes[index + 1].requestFocus();
                        } else {
                          _focusNodes[index].unfocus();
                          _verifyPasscode(); // Auto-verify on last digit input
                        }
                      } else {
                        if (index > 0) {
                          _focusNodes[index - 1].requestFocus();
                        }
                      }
                    },
                  ),
                );
              }),
            ),

            if (_errorMessage != null) ...[
              const SizedBox(height: 16),
              Center(
                child: Text(
                  _errorMessage!,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontFamily: 'Montserrat',
                    fontSize: 10.0,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFFD32F2F),
                  ),
                ),
              ),
            ],

            const SizedBox(height: 24),

            // Action row buttons
            Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: _isLoading ? null : () => Navigator.of(context).pop(),
                    style: OutlinedButton.styleFrom(
                      side: const BorderSide(color: Color(0xFFE5E5E5)),
                      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.zero),
                      padding: const EdgeInsets.symmetric(vertical: 12.0),
                    ),
                    child: const Text(
                      'CANCEL',
                      style: TextStyle(
                        fontFamily: 'Montserrat',
                        fontSize: 9.0,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 1.5,
                        color: Color(0xFF888888),
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: ElevatedButton(
                    onPressed: _isLoading ? null : _verifyPasscode,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF111111),
                      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.zero),
                      padding: const EdgeInsets.symmetric(vertical: 12.0),
                      elevation: 0,
                    ),
                    child: _isLoading
                        ? const SizedBox(
                            width: 12,
                            height: 12,
                            child: CircularProgressIndicator(
                              strokeWidth: 1.5,
                              valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                            ),
                          )
                        : const Text(
                            'VERIFY',
                            style: TextStyle(
                              fontFamily: 'Montserrat',
                              fontSize: 9.0,
                              fontWeight: FontWeight.bold,
                              letterSpacing: 1.5,
                              color: Colors.white,
                            ),
                          ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
`;

export const ADMIN_CONFIG_SECURITY_JSON = `{
  "admin_config": {
    "security": {
      "access_pin": "202699",
      "updatedAt": "Timestamp(seconds=1780460620, nanoseconds=0)",
      "updatedBy": "sarah.c@studio.smartcollection.gcp"
    }
  }
}
`;

