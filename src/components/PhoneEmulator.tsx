import React, { useState, useMemo } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Search, 
  User, 
  Grid, 
  ChevronRight, 
  ArrowLeft, 
  Plus, 
  Minus, 
  Check, 
  SlidersHorizontal, 
  Info,
  Calendar,
  Sparkles,
  Award,
  Activity,
  Briefcase,
  GraduationCap,
  Trash2,
  Camera,
  Edit,
  Lock,
  MapPin,
  Phone,
  Settings,
  LogOut
} from 'lucide-react';
import { Product, CartItem, ActiveTab, FilterOptions } from '../types';
import { mockProducts } from '../data/mockProducts';

interface PhoneEmulatorProps {
  onSelectProductDocs: (product: Product) => void;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function PhoneEmulator({
  onSelectProductDocs,
  cart,
  setCart,
  favorites,
  setFavorites
}: PhoneEmulatorProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [currentGender, setCurrentGender] = useState<'Men' | 'Women'>('Women');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [isViewingGrid, setIsViewingGrid] = useState<boolean>(false);
  
  // Real-time simulated collections & routing
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [appRole, setAppRole] = useState<'visitor' | 'owner'>('visitor');
  const [fbToastMsg, setFbToastMsg] = useState<string | null>(null);
  const [editedPrices, setEditedPrices] = useState<Record<string, string>>({});

  // Secure Portal & Admin Login States (Firebase Auth & Firestore verification simulations)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEmailInput, setAdminEmailInput] = useState('');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [isAdminLoggingIn, setIsAdminLoggingIn] = useState(false);
  
  // Dynamic ImgBB Device Upload States
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isUploadingProfile, setIsUploadingProfile] = useState(false);
  const [isUploadingBoutique, setIsUploadingBoutique] = useState(false);

  // Secure Passcode Gate States (Firestore /admin_config/security verification simulation)
  const [showPasscodeDialog, setShowPasscodeDialog] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState<string | null>(null);
  const [fbSecurityPin, setFbSecurityPin] = useState('202699'); // Simulates Firestore remote document value

  // File picker upload handlers matching image_picker and ImgBB spec
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      // Call standard ImgBB upload endpoint with specified API key
      const response = await fetch('https://api.imgbb.com/1/upload?key=5d37936c38802e22c5d38f145da265e9', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const directUrl = data.data.url;
        setUploadedImageUrl(directUrl);
        setNewProdImage(directUrl);
        logSimulatedEvent('IMAGE_PICKED_AND_UPLOADED', {
          source_channel: 'image_picker: GALLERY',
          uploader_service: 'ImgBB API v1',
          direct_url: directUrl,
          file_name: file.name,
          timestamp: new Date().toISOString()
        });
        setFbToastMsg("ImgBB Upload Successful! Generated hot-link CDN url.");
        setTimeout(() => setFbToastMsg(null), 3000);
      } else {
        setFbToastMsg("ImgBB Upload failed: Status " + response.status);
        setTimeout(() => setFbToastMsg(null), 3500);
      }
    } catch (err: any) {
      setFbToastMsg("API Upload Exception: " + err.message);
      setTimeout(() => setFbToastMsg(null), 3500);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleProfilePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingProfile(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('https://api.imgbb.com/1/upload?key=5d37936c38802e22c5d38f145da265e9', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const directUrl = data.data.url;
        setOwnerInfo(prev => ({ ...prev, photoUrl: directUrl }));
        logSimulatedEvent('PROFILE_PHOTO_UPDATED', {
          source_channel: 'image_picker_gallery',
          uploader_service: 'ImgBB API v1',
          direct_url: directUrl,
          timestamp: new Date().toISOString()
        });
        setFbToastMsg("Boutique Owner photo updated via ImgBB successfully!");
        setTimeout(() => setFbToastMsg(null), 3000);
      } else {
        setFbToastMsg("ImgBB Upload failed for owner profile picture.");
        setTimeout(() => setFbToastMsg(null), 3000);
      }
    } catch (err: any) {
      setFbToastMsg("Exception uploading profile image: " + err.message);
      setTimeout(() => setFbToastMsg(null), 3000);
    } finally {
      setIsUploadingProfile(false);
    }
  };

  const handleBoutiquePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingBoutique(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('https://api.imgbb.com/1/upload?key=5d37936c38802e22c5d38f145da265e9', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const directUrl = data.data.url;
        setOwnerInfo(prev => ({ ...prev, boutiquePhotoUrl: directUrl }));
        logSimulatedEvent('BOUTIQUE_PHOTO_UPDATED', {
          source_channel: 'image_picker_gallery: BOUTIQUE',
          uploader_service: 'ImgBB API v1',
          direct_url: directUrl,
          timestamp: new Date().toISOString()
        });
        setFbToastMsg("Smart Collection Physical Boutique photo updated via ImgBB successfully!");
        setTimeout(() => setFbToastMsg(null), 3000);
      } else {
        setFbToastMsg("ImgBB Upload failed for boutique photo.");
        setTimeout(() => setFbToastMsg(null), 3000);
      }
    } catch (err: any) {
      setFbToastMsg("Exception uploading boutique photo: " + err.message);
      setTimeout(() => setFbToastMsg(null), 3000);
    } finally {
      setIsUploadingBoutique(false);
    }
  };

  // Owner creation form inputs
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Tops');
  const [newProdGender, setNewProdGender] = useState<'Men' | 'Women'>('Women');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdDescription, setNewProdDescription] = useState('');
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400');

  const handleFacebookLaunch = (productName?: string) => {
    const origin = productName ? `Product detail: ${productName}` : 'Meet the Owner profile Screen';
    logSimulatedEvent('FACEBOOK_LAUNCHED', {
      launcher_package: 'url_launcher 6.2.X',
      target_scheme: 'https://m.me/smartcollection',
      origin_context: origin,
      event_timestamp: new Date().toISOString()
    });
    setFbToastMsg(productName 
      ? `Simulated url_launcher: Opening Facebook Messenger to inquire about "${productName}" (https://m.me/smartcollection)`
      : `Simulated url_launcher: Opening Facebook Messenger of Owner (https://m.me/smartcollection)`
    );
    setTimeout(() => setFbToastMsg(null), 3500);
  };
  
  // Simulated Firestore status states
  const [subView, setSubView] = useState<'none' | 'owner-profile' | 'activity-history'>('none');
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState<boolean>(false);
  const [simulatedActivities, setSimulatedActivities] = useState<any[]>([
    {
      id: 'init-01',
      eventType: 'APP_ENTRY',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 mins ago
      metadata: {
        platform: 'Simulated iOS DevClient',
        client_version: '1.1.0',
        device_locale: 'en_US'
      }
    }
  ]);

  const logSimulatedEvent = (eventType: string, metadata: any) => {
    setSimulatedActivities(prev => [
      {
        id: 'evt-' + Math.floor(10000 + Math.random() * 90000),
        eventType,
        timestamp: new Date(),
        metadata
      },
      ...prev
    ]);
  };

  // Editable Owner Profile States
  const [ownerInfo, setOwnerInfo] = useState({
    name: 'SARAH COLLINS',
    role: 'Founder & Creative Director',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
    boutiquePhotoUrl: 'https://i.ibb.co/3mN9Y7XG/smart-collection-shopfront.jpg',
    philosophy: 'Sarah Collins founded Smart Collection in 2024 to distill modern luxury down to its essential geometry. Moving away from disposable patterns, our garments merge architectural precision with organic, high-density textiles.',
    qualifications: [
      { id: 'q-1', degree: 'MFA — Fashion Design & Textiles', school: 'Royal College of Art, London', years: '2019 — 2021' },
      { id: 'q-2', degree: 'B.S. in Textile Architecture', school: 'Parsons School of Design, NY', years: '2015 — 2019' }
    ],
    experiences: [
      { id: 'e-1', role: 'Senior Runway Stylist', company: 'Lanvin, Paris', period: '2022 — 2024', summary: 'Curated capsule schedules, evaluated organic linen blends, and coordinated visuals for Paris Runway Week.' },
      { id: 'e-2', role: 'Textile Consultant', company: 'Celine, Atelier Paris', period: '2021 — 2022', summary: 'Pioneered biodegradable wool-blend research & crafted structural pattern-scale frameworks.' }
    ]
  });

  const [isEditingOwner, setIsEditingOwner] = useState(false);
  const isOwnerEditing = isEditingOwner && appRole === 'owner';
  const [ownerInfoBackup, setOwnerInfoBackup] = useState<any>(null);
  const [showAddDesignModal, setShowAddDesignModal] = useState(false);

  // States for the add-qualification form
  const [newDegree, setNewDegree] = useState('');
  const [newSchool, setNewSchool] = useState('');
  const [newYears, setNewYears] = useState('');

  // States for the add-experience form
  const [newExpRole, setNewExpRole] = useState('');
  const [newExpCompany, setNewExpCompany] = useState('');
  const [newExpPeriod, setNewExpPeriod] = useState('');
  const [newExpSummary, setNewExpSummary] = useState('');
  
  // Custom navigation state inside the emulator
  const [navigationStack, setNavigationStack] = useState<string[]>([]);
  
  // PDP internal states
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [pdpImageIdx, setPdpImageIdx] = useState<number>(0);
  const [materialsExpanded, setInMaterialsExpanded] = useState<boolean>(false);
  const [careExpanded, setInCareExpanded] = useState<boolean>(false);
  
  // PLP Filter state
  const [appliedFilters, setAppliedFilters] = useState<FilterOptions>({
    gender: 'All',
    category: 'All',
    sizes: [],
    colors: [],
    priceRange: [50, 300],
    sortBy: 'recommended'
  });
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string[]>([]);

  // Push to navigation tracker
  const pushScreen = (screen: string) => {
    setNavigationStack((prev) => [...prev, screen]);
  };

  const handleGoBack = () => {
    if (selectedProduct) {
      setSelectedProduct(null);
    } else if (navigationStack.length > 0) {
      const newStack = [...navigationStack];
      newStack.pop();
      setNavigationStack(newStack);
      if (activeTab === 'categories') {
        setCategoryFilter('All');
        setIsViewingGrid(false);
      }
    }
  };

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const isAdding = !favorites.includes(id);
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
    if (isAdding) {
      const prod = products.find(p => p.id === id);
      logSimulatedEvent('FAVORITE_ADDED', {
        product_id: id,
        product_name: prod?.name || 'Garment Item',
        interaction_channel: 'App Carousel Button'
      });
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0] || '');
    setPdpImageIdx(0);
    setInMaterialsExpanded(false);
    setInCareExpanded(false);
    onSelectProductDocs(product);
  };

  const handleAddProductToCart = (product: Product, size: string) => {
    if (!size) return;
    setCart((prev) => {
      const existing = prev.find(item => item.product.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id && item.selectedSize === size 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, selectedSize: size, quantity: 1 }];
    });
    
    // Auto navigate to Cart to show active result
    setActiveTab('cart');
    setSelectedProduct(null);
  };

  const updateCartQuantity = (productId: string, size: string, delta: number) => {
    setCart((prev) => 
      prev.map(item => {
        if (item.product.id === productId && item.selectedSize === size) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty < 1 ? 1 : newQty };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (productId: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedSize === size)));
  };

  // Filter products based on active tab variables & filters
  const processedProducts = useMemo(() => {
    return products.filter(p => {
      // If we are coming from Home split category, match gender
      if (activeTab === 'home') return true;
      
      // If categories tab is active
      if (activeTab === 'categories') {
        const matchesGender = p.gender === currentGender;
        const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
        return matchesGender && matchesCategory;
      }

      // Default
      return true;
    }).filter(p => {
      // Apply filters modal values if any
      const matchesSize = selectedSizeFilter.length === 0 || p.sizes.some(s => selectedSizeFilter.includes(s));
      const matchesPrice = p.price >= appliedFilters.priceRange[0] && p.price <= appliedFilters.priceRange[1];
      return matchesSize && matchesPrice;
    }).sort((a, b) => {
      if (appliedFilters.sortBy === 'price-low') return a.price - b.price;
      if (appliedFilters.sortBy === 'price-high') return b.price - a.price;
      return 0; // default
    });
  }, [products, activeTab, currentGender, categoryFilter, selectedSizeFilter, appliedFilters]);

  const categoriesList = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Dresses'];

  // Current system simulation time
  const simulatedTime = "09:41";

  // Total checkout cost
  const cartTotals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15;
    return { subtotal, shipping, total: subtotal + shipping };
  }, [cart]);

  return (
    <div className="relative w-[360px] h-[740px] bg-neutral-900 rounded-[50px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-[6px] border-neutral-800 flex flex-col overflow-hidden phone-reflection">
      
      {/* Top Speaker & Camera Notch */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-950 rounded-full flex items-center justify-center z-50">
        <div className="w-12 h-1 bg-neutral-800 rounded-full mr-2"></div>
        <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full border border-neutral-800"></div>
      </div>

      {/* Screen Container */}
      <div className="w-full h-full bg-white rounded-[38px] overflow-hidden flex flex-col relative select-none">
        
        {/* Floating Notification Toast */}
        {fbToastMsg && (
          <div className="absolute top-12 left-4 right-4 bg-neutral-900 border border-neutral-850 p-3 shadow-xl z-50 text-white rounded-md animate-fade-in-down">
            <div className="flex items-start space-x-2">
              <Sparkles size={14} className="text-amber-400 shrink-0 mt-0.5 animate-spin" style={{ animationDuration: '3s' }} />
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">System Telemetry Broadcast</p>
                <p className="text-xs font-light leading-snug mt-0.5">{fbToastMsg}</p>
              </div>
            </div>
          </div>
        )}


        {/* Status Bar */}
        <div className="h-10 bg-white px-6 pt-3 flex justify-between items-center text-xs font-semibold text-neutral-900 z-40">
          <span>{simulatedTime}</span>
          <div className="flex items-center space-x-1.5">
            <span className="text-[10px] tracking-wide bg-neutral-900 text-white px-1.5 py-0.5 rounded-sm scale-90">5G</span>
            <div className="w-5 h-2.5 border border-neutral-900 rounded-sm p-0.5 flex items-center">
              <div className="w-3.5 h-full bg-neutral-900 rounded-2xs"></div>
            </div>
          </div>
        </div>

        {/* Dynamic Screen Content Wrapper */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative pb-16">
          {appRole === 'owner' && !isAdminLoggedIn ? (
            /* ==================== SECURE ROUTE GUARD & ADMIN LOGIN SCREEN ==================== */
            <div className="flex flex-col animate-fade-in px-6 py-6 bg-white min-h-full font-sans text-neutral-950 justify-center">
              <div className="text-center mb-6">
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-neutral-400 font-display">SECURE LOCK</span>
                <h2 className="text-sm font-bold font-display tracking-widest text-neutral-900 mt-1 uppercase">OWNER PORTAL LOGIN</h2>
                <div className="w-6 h-0.5 bg-neutral-900 mx-auto mt-2"></div>
              </div>

              <div className="bg-neutral-50 border border-neutral-150 p-4 rounded-sm shadow-3xs text-left mb-5">
                <span className="text-[8.5px] font-mono font-bold text-neutral-500 block uppercase tracking-wider mb-3">
                  🛡️ SECURE ENVIRONMENT CHECK
                </span>
                
                <div className="space-y-3.5">
                  <div>
                    <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Owner Email</label>
                    <input 
                      type="email"
                      placeholder="sarah.collins@smartcollection.com"
                      value={adminEmailInput}
                      onChange={(e) => setAdminEmailInput(e.target.value)}
                      className="w-full text-xs bg-white border border-neutral-250 p-2 text-neutral-950 focus:outline-neutral-900 rounded-2xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Admin Password</label>
                    <input 
                      type="password"
                      placeholder="••••••••"
                      value={adminPasswordInput}
                      onChange={(e) => setAdminPasswordInput(e.target.value)}
                      className="w-full text-xs bg-white border border-neutral-250 p-2 text-neutral-950 focus:outline-neutral-900 rounded-2xs font-medium"
                    />
                  </div>

                  <button
                    type="button"
                    disabled={isAdminLoggingIn}
                    onClick={async () => {
                      if (!adminEmailInput || !adminPasswordInput) {
                        setFbToastMsg("Error: Please provide Email and Password.");
                        setTimeout(() => setFbToastMsg(null), 3000);
                        return;
                      }

                      setIsAdminLoggingIn(true);
                      await new Promise(resolve => setTimeout(resolve, 1200));
                      setIsAdminLoggingIn(false);

                      const isOwnerEmail = adminEmailInput.toLowerCase().trim() === 'sarah.collins@smartcollection.com';
                      const isOwnerPass = adminPasswordInput === 'studio2026';

                      if (isOwnerEmail && isOwnerPass) {
                        setIsAdminLoggedIn(true);
                        logSimulatedEvent('ADMIN_AUTHENTICATED', {
                          auth_provider: 'Firebase Auth',
                          login_email: adminEmailInput,
                          firestore_role_check: 'isAdmin == true',
                          uid: 'uid_owner_sarah_collins',
                          granted: true
                        });
                        setFbToastMsg("Access Granted: Welcome back Sarah Collins.");
                        setTimeout(() => setFbToastMsg(null), 3000);
                      } else if (adminEmailInput.toLowerCase().trim() === 'guest@gmail.com' || adminEmailInput.toLowerCase().trim().includes('visitor')) {
                        logSimulatedEvent('AUTH_ROLE_CHECK_FAILED', {
                          auth_provider: 'Firebase Auth',
                          login_email: adminEmailInput,
                          firestore_role_check: 'isAdmin == false',
                          uid: 'uid_visitor_guest_002',
                          granted: false
                        });
                        setFbToastMsg("CROSS-CHECK FAILED: User profile is not configured as Admin.");
                        setTimeout(() => {
                          setFbToastMsg("Unauthorized: Automatically back to visitor catalog.");
                          setAppRole('visitor');
                          setActiveTab('home');
                          setAdminEmailInput('');
                          setAdminPasswordInput('');
                        }, 2000);
                      } else {
                        setFbToastMsg("Error: Invalid Firebase Auth credentials!");
                        setTimeout(() => setFbToastMsg(null), 3000);
                      }
                    }}
                    className="w-full bg-neutral-900 text-white font-semibold text-[10px] py-3 tracking-widest uppercase rounded-sm hover:bg-neutral-850 cursor-pointer transition-colors flex items-center justify-center space-x-2 border-0"
                  >
                    {isAdminLoggingIn ? (
                      <div className="flex items-center space-x-1.5">
                        <div className="w-3.5 h-3.5 border-1.5 border-white border-t-transparent rounded-full animate-spin" />
                        <span>VERIFYING PRIVILEGES...</span>
                      </div>
                    ) : (
                      <span>SIGN IN & VALIDATE</span>
                    )}
                  </button>
                </div>
              </div>

              {/* DEMO TOOLTIP */}
              <div className="border border-neutral-200 p-3 rounded-md bg-neutral-50 text-[10px] text-neutral-500 mb-5 font-light space-y-1.5 leading-relaxed text-left">
                <span className="font-bold text-neutral-700 uppercase block tracking-wider">Demo Accounts available:</span>
                <div>
                  🔑 <strong className="text-neutral-700">Studio Owner Admin</strong>:<br />
                  Email: <code className="bg-neutral-200 px-1 py-0.5 rounded text-neutral-800 select-all">sarah.collins@smartcollection.com</code><br />
                  Password: <code className="bg-neutral-200 px-1 py-0.5 rounded text-neutral-800 select-all">studio2026</code>
                </div>
                <div className="pt-1.5 border-t border-neutral-200">
                  ⚡ <strong className="text-neutral-700">General Guest (Blocked + Kicked Back)</strong>:<br />
                  Email: <code className="bg-neutral-200 px-1 py-0.5 rounded text-neutral-800 select-all">guest@gmail.com</code><br />
                  Password: <code className="bg-neutral-200 px-1 py-0.5 rounded text-neutral-800 select-all">visitor123</code>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setAppRole('visitor');
                  setActiveTab('home');
                }}
                className="text-neutral-400 hover:text-neutral-900 text-[10px] font-bold tracking-widest uppercase bg-transparent border-0 cursor-pointer"
              >
                &larr; BACK TO SHOPPING AS GUEST
              </button>
            </div>
          ) : subView === 'owner-portal' ? (
            /* ==================== OWNER STUDIO PORTAL VIEW (SUB-VIEW) ==================== */
            <div className="flex flex-col animate-fade-in px-5 py-4 min-h-full bg-white text-neutral-950 overflow-y-auto max-h-[460px]">
              <div className="flex items-center space-x-2.5 mb-4 border-b border-neutral-100 pb-2">
                <button 
                  onClick={() => setSubView('none')}
                  className="p-1 text-neutral-500 hover:text-neutral-900 transition-colors border-0 bg-transparent cursor-pointer"
                >
                  <ArrowLeft size={16} />
                </button>
                <div>
                  <h2 className="text-sm font-bold font-display tracking-widest text-neutral-900 uppercase">OWNER PORTAL</h2>
                  <p className="text-[8.5px] text-neutral-400 font-light">Add clothing designs and enforce dynamic price edits instantly.</p>
                </div>
              </div>
              
              {/* Add New Clothing Design form block */}
              <div className="bg-neutral-50 border border-neutral-150 p-4 rounded-sm mb-6 shadow-3xs">
                <span className="text-[10px] font-bold text-neutral-900 uppercase tracking-widest block border-b border-neutral-150 pb-1.5 mb-3.5">
                  I. Add New Clothing Design
                </span>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Garment Name</label>
                    <input 
                      type="text"
                      placeholder="e.g., Silk Summer Tailored Blazer"
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      className="w-full text-xs bg-white border border-neutral-250 p-2 text-neutral-900 focus:outline-neutral-900 rounded-2xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Gender Group</label>
                      <div className="grid grid-cols-2 gap-1 bg-white border border-neutral-220 p-0.5 rounded-2xs">
                        <button
                          type="button"
                          onClick={() => setNewProdGender('Women')}
                          className={`py-1 text-[9px] font-bold rounded-3xs transition-colors border-0 cursor-pointer ${newProdGender === 'Women' ? 'bg-neutral-900 text-white' : 'text-neutral-500 bg-transparent'}`}
                        >
                          WOMEN
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewProdGender('Men')}
                          className={`py-1 text-[9px] font-bold rounded-3xs transition-colors border-0 cursor-pointer ${newProdGender === 'Men' ? 'bg-neutral-900 text-white' : 'text-neutral-500 bg-transparent'}`}
                        >
                          MEN
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Category</label>
                      <select
                        value={newProdCategory}
                        onChange={(e) => setNewProdCategory(e.target.value)}
                        className="w-full text-xs bg-white border border-neutral-255 p-1.5 text-neutral-950 focus:outline-neutral-900 rounded-2xs"
                      >
                        <option value="Tops">Tops</option>
                        <option value="Bottoms">Bottoms</option>
                        <option value="Outerwear">Outerwear</option>
                        <option value="Dresses">Dresses</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Price tag (Tk)</label>
                      <input 
                        type="number"
                        placeholder="e.g. 175"
                        value={newProdPrice}
                        onChange={(e) => setNewProdPrice(e.target.value)}
                        className="w-full text-xs bg-white border border-neutral-250 p-2 text-neutral-900 focus:outline-neutral-900 rounded-2xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Optional Preset Fallback</label>
                      <select
                        value={newProdImage}
                        onChange={(e) => {
                          setNewProdImage(e.target.value);
                          setUploadedImageUrl(null); // Clear manual upload on preset select
                        }}
                        className="w-full text-xs bg-white border border-neutral-250 p-1.5 text-neutral-900 focus:outline-neutral-900 rounded-2xs"
                      >
                        <option value="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400">Preset: Butter Dress</option>
                        <option value="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=400">Preset: Wool Coat</option>
                        <option value="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=400">Preset: Linen Dress</option>
                        <option value="https://images.unsplash.com/photo-1548624149-f7b31668831a?q=80&w=400">Preset: Woven Knit</option>
                      </select>
                    </div>
                  </div>

                  {/* TAPPABLE CONTAINER FOR IMAGE PICKER & IMGBB GALLERY UPLOAD */}
                  <div>
                    <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Image Selection & Upload (ImgBB API)</label>
                    <div className="border-2 border-dashed border-neutral-300 hover:border-neutral-900 rounded-sm p-3.5 text-center cursor-pointer relative bg-white transition-all flex flex-col items-center justify-center min-h-[95px] shadow-3xs">
                      {isUploadingImage ? (
                        <div className="flex flex-col items-center space-y-2 justify-center">
                          <div className="w-6 h-6 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                          <span className="text-[9px] text-neutral-600 font-mono font-bold">Uploading to ImgBB API...</span>
                        </div>
                      ) : uploadedImageUrl ? (
                        <div className="flex items-center space-x-3 text-left">
                          <img src={uploadedImageUrl} className="h-14 w-10.5 object-cover bg-neutral-50 border border-neutral-200 rounded shadow-3xs shrink-0" referrerPolicy="no-referrer" />
                          <div>
                            <span className="text-[8.5px] text-emerald-600 font-extrabold block uppercase tracking-wider">ImgBB Link Secure</span>
                            <p className="text-[8px] text-neutral-400 font-mono max-w-[140px] truncate">{uploadedImageUrl}</p>
                            <span className="text-[7px] text-neutral-400 font-light block mt-0.5">Click container again to replace image</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center flex-1 justify-center">
                          <Camera size={18} className="text-neutral-500 mb-1" />
                          <span className="text-[10px] text-neutral-800 font-bold font-sans uppercase tracking-wider">Tap to upload clothing Photo</span>
                          <span className="text-[7.5px] text-neutral-450 font-light mt-0.5">Runs image_picker & ImgBB Multipart API</span>
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileUpload} 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Garment Description</label>
                    <textarea 
                      rows={2}
                      placeholder="Give the garment a detailed editorial story..."
                      value={newProdDescription}
                      onChange={(e) => setNewProdDescription(e.target.value)}
                      className="w-full text-xs bg-white border border-neutral-250 p-2 text-neutral-900 focus:outline-neutral-900 rounded-2xs"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!newProdName || !newProdPrice) {
                        setFbToastMsg("Error: Please provide garment name and price.");
                        setTimeout(() => setFbToastMsg(null), 3000);
                        return;
                      }
                      const newProduct: Product = {
                        id: 'owner-' + Date.now(),
                        name: newProdName,
                        category: newProdCategory,
                        gender: newProdGender,
                        price: Number(newProdPrice),
                        images: [newProdImage, 'https://picsum.photos/altp/600/800'],
                        sizes: newProdCategory === 'Bottoms' ? ['30', '32', '34', '36'] : ['XS', 'S', 'M', 'L'],
                        colors: ['Raw Canvas', 'Off-White', 'Noir Charcoal'],
                        description: newProdDescription || 'An elegantly cut design tailored directly in our signature boutique fashion house.',
                        fabric: '100% Certified Premium Organic Cotton Fibres',
                        care: 'Dry clean recommended to preserve architectural shapes.'
                      };
                      setProducts(prev => [newProduct, ...prev]);
                      logSimulatedEvent('PRODUCT_ADDED', {
                        product_id: newProduct.id,
                        name: newProduct.name,
                        price_usd: newProduct.price,
                        category: newProduct.category,
                        gender: newProduct.gender,
                        timestamp: new Date().toISOString()
                      });
                      setNewProdName('');
                      setNewProdPrice('');
                      setNewProdDescription('');
                      setUploadedImageUrl(null);
                      setFbToastMsg(`SAVE DESIGN SUCCESSFUL: Added ${newProduct.name} to products!`);
                      setTimeout(() => setFbToastMsg(null), 3500);
                    }}
                    className="w-full bg-neutral-950 text-white text-[10px] font-bold py-2.5 tracking-wider uppercase rounded-sm hover:bg-neutral-850 cursor-pointer transition-colors border-0"
                  >
                    SAVE NEW GARMENT DESIGN
                  </button>
                </div>
              </div>

              {/* Price editor controller */}
              <div className="bg-white border border-neutral-200 p-4 rounded-sm shadow-3xs mb-4">
                <span className="text-[10px] font-bold text-neutral-900 uppercase tracking-widest block border-b border-neutral-100 pb-1.5 mb-3.5">
                  II. Dynamic Price Tag Controller
                </span>

                <div className="space-y-4 max-h-[260px] overflow-y-auto pr-1">
                  {products.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between border-b border-neutral-100 pb-3 last:border-0"
                    >
                      <div className="flex items-center min-w-0 pr-2 flex-1">
                        <img 
                          src={item.images[0]} 
                          alt={item.name}
                          className="w-10 h-14 object-cover bg-neutral-100 mr-2.5 rounded-3xs shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-semibold text-neutral-900 truncate leading-snug">{item.name}</h4>
                          <span className="text-[9px] text-neutral-400 block">{item.gender} &bull; {item.category}</span>
                          <span className="text-[10px] font-bold text-neutral-950 block mt-0.5">Current tag: Tk {item.price}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1.5 shrink-0">
                        <div className="flex items-center bg-neutral-50 px-2 h-8 border border-neutral-200 rounded-sm w-16">
                          <span className="text-neutral-400 text-xs font-bold mr-0.5">Tk</span>
                          <input 
                            type="text"
                            className="w-full bg-transparent text-xs text-neutral-950 font-bold focus:outline-none"
                            placeholder={item.price.toString()}
                            value={editedPrices[item.id] !== undefined ? editedPrices[item.id] : ''}
                            onChange={(e) => setEditedPrices({ ...editedPrices, [item.id]: e.target.value })}
                          />
                        </div>
                        <button
                          onClick={() => {
                            const val = editedPrices[item.id];
                            if (val === undefined || val === '' || isNaN(Number(val))) {
                              setFbToastMsg("Error: Please provide a valid price.");
                              setTimeout(() => setFbToastMsg(null), 3000);
                              return;
                            }
                            const newPrice = Math.round(Number(val));
                            setProducts(prev => 
                              prev.map(p => p.id === item.id ? { ...p, price: newPrice } : p)
                            );
                            logSimulatedEvent('PRODUCT_PRICE_UPDATED', {
                              product_id: item.id,
                              product_name: item.name,
                              old_price_usd: item.price,
                              new_price_usd: newPrice,
                              updated_by: "Store Owner Sarah Collins"
                            });
                            setEditedPrices(prev => {
                              const next = { ...prev };
                              delete next[item.id];
                              return next;
                            });
                            setFbToastMsg(`SAVE PRICE SUCCESSFUL: Changed price tag to Tk ${newPrice}`);
                            setTimeout(() => setFbToastMsg(null), 3550);
                          }}
                          className="bg-neutral-900 hover:bg-neutral-850 text-white text-[9px] font-bold h-8 px-2 tracking-wider rounded-sm uppercase transition-colors cursor-pointer border-0 shadow-3xs"
                        >
                          SAVE PRICE
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : subView === 'owner-profile' ? (
            /* ==================== SIMULATED OWNER PROFILE SCREEN  ==================== */
            <div className="flex flex-col animate-fade-in p-6 bg-neutral-100/10 min-h-full font-sans text-neutral-950">
              {/* Profile Screen Header */}
              <div className="flex justify-between items-center border-b border-neutral-150 pb-3 mb-6">
                {isOwnerEditing ? (
                  <button 
                    type="button"
                    onClick={() => {
                      if (ownerInfoBackup) {
                        setOwnerInfo(ownerInfoBackup);
                      }
                      setIsEditingOwner(false);
                    }}
                    className="bg-neutral-200 text-neutral-700 hover:bg-neutral-300 font-display text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 transition-all"
                  >
                    Cancel
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      setSubView('none');
                      setIsEditingOwner(false);
                    }}
                    className="p-1 text-neutral-500 hover:text-neutral-900 transition-colors"
                  >
                    <ArrowLeft size={16} />
                  </button>
                )}
                
                <div className="text-center font-sans">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-900 font-display">
                    {isOwnerEditing ? 'EDIT PROFILE' : 'CREATOR PROFILE'}
                  </span>
                  {isOwnerEditing && (
                    <span className="text-[7.5px] text-emerald-600 font-mono font-bold uppercase tracking-wider block">
                      Owner Mode
                    </span>
                  )}
                </div>

                {isOwnerEditing ? (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingOwner(false);
                      logSimulatedEvent('OWNER_PROFILE_UPDATED', {
                        updated_by: ownerInfo.name,
                        qualifications_total: ownerInfo.qualifications.length,
                        experiences_total: ownerInfo.experiences.length
                      });
                    }}
                    className="bg-emerald-600 border border-emerald-700 text-white hover:bg-emerald-700 font-display text-[10px] uppercase tracking-widest font-extrabold px-3 py-1 shadow-sm transition-all"
                  >
                    SAVE
                  </button>
                ) : appRole === 'owner' ? (
                  <button
                    type="button"
                    onClick={() => {
                      setOwnerInfoBackup(JSON.parse(JSON.stringify(ownerInfo)));
                      setIsEditingOwner(true);
                    }}
                    className="bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-850 font-display text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 shadow-3xs transition-all"
                  >
                    Edit
                  </button>
                ) : (
                  <div className="w-8"></div>
                )}
              </div>

              {isOwnerEditing ? (
                /* ==================== OWNER PROFILE EDIT FORM ==================== */
                <div className="space-y-6 mt-2 animate-fade-in text-neutral-900">
                  <div className="border border-neutral-250 p-3.5 bg-neutral-50 rounded-sm">
                    <span className="text-[9px] font-bold tracking-widest text-[#555] block mb-2 uppercase font-display">1. Personal Profile</span>
                    
                    <label className="text-[9px] font-bold uppercase tracking-wider block mt-2.5 mb-1 text-neutral-500">Owner Name</label>
                    <input 
                      type="text" 
                      value={ownerInfo.name}
                      onChange={(e) => setOwnerInfo({...ownerInfo, name: e.target.value.toUpperCase()})}
                      className="w-full border border-neutral-300 px-3 py-1.5 text-xs focus:border-neutral-950 focus:outline-none bg-white font-medium"
                    />

                    <label className="text-[9px] font-bold uppercase tracking-wider block mt-2.5 mb-1 text-neutral-500">Subtitle / Role Title</label>
                    <input 
                      type="text" 
                      value={ownerInfo.role}
                      onChange={(e) => setOwnerInfo({...ownerInfo, role: e.target.value})}
                      className="w-full border border-neutral-300 px-3 py-1.5 text-xs focus:border-neutral-950 focus:outline-none bg-white font-medium text-neutral-900 font-sans"
                    />

                    {/* Photo Selector */}
                    <label className="text-[9px] font-bold uppercase tracking-wider block mt-3.5 mb-1.5 text-neutral-500">Photo / Avatar Selection</label>
                    <div className="grid grid-cols-4 gap-1.5 mb-2">
                      {[
                        { name: 'Sarah', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop' },
                        { name: 'Asha', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop' },
                        { name: 'Marcus', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop' },
                        { name: 'Niki', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop' }
                      ].map((avatar) => (
                        <button
                          key={avatar.name}
                          type="button"
                          onClick={() => setOwnerInfo({...ownerInfo, photoUrl: avatar.url})}
                          className={`border rounded-sm overflow-hidden relative aspect-square transition-all ${
                            ownerInfo.photoUrl === avatar.url ? 'border-neutral-950 ring-1 ring-neutral-950' : 'border-neutral-200 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={avatar.url} alt={avatar.name} className="w-full h-full object-cover" />
                          <span className="absolute bottom-0 inset-x-0 bg-neutral-950/75 text-[8px] text-white py-0.2 text-center font-mono">{avatar.name}</span>
                        </button>
                      ))}
                    </div>
                    
                    <div className="mt-3.5 pt-3.5 border-t border-neutral-200">
                      <span className="text-[9px] text-neutral-500 font-bold uppercase block mb-1">Upload New Photo from Device:</span>
                      <div className="border border-dashed border-neutral-350 hover:border-neutral-900 rounded-sm p-3.5 text-center cursor-pointer relative bg-white transition-all flex flex-col items-center justify-center min-h-[60px] mb-2.5">
                        {isUploadingProfile ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                            <span className="text-[8.5px] text-neutral-400 font-mono">Uploading to ImgBB...</span>
                          </div>
                        ) : ownerInfo.photoUrl ? (
                          <div className="flex items-center space-x-2">
                            <img src={ownerInfo.photoUrl} className="h-6 w-6 object-cover rounded-full bg-neutral-100 border border-neutral-350 shrink-0" referrerPolicy="no-referrer" />
                            <span className="text-[8.5px] text-green-600 font-bold uppercase font-sans">Active Photo Loaded</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1.5 justify-center">
                            <Camera size={13} className="text-neutral-500" />
                            <span className="text-[8.5px] text-neutral-700 font-bold font-sans uppercase">CHOOSE LOCAL AVATAR FILE</span>
                          </div>
                        )}
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleProfilePhotoUpload} 
                          className="absolute inset-0 opacity-0 cursor-pointer pointer-events-auto" 
                        />
                      </div>
                      
                      <span className="text-[8px] text-neutral-400 font-bold uppercase block mb-1">Or Paste Custom Image URL:</span>
                      <input 
                        type="url" 
                        placeholder="https://example.com/your-own-avatar.jpg"
                        value={ownerInfo.photoUrl}
                        onChange={(e) => setOwnerInfo({...ownerInfo, photoUrl: e.target.value})}
                        className="w-full border border-neutral-350 px-2.5 py-1.5 text-[10px] font-mono focus:border-neutral-950 focus:outline-none bg-white font-light text-neutral-950"
                      />
                    </div>

                    <div className="mt-3.5 pt-3.5 border-t border-neutral-200">
                      <span className="text-[9px] text-neutral-500 font-bold uppercase block mb-1">Physical Boutique / Shop Photo:</span>
                      <div className="border border-dashed border-neutral-350 hover:border-neutral-900 rounded-sm p-3.5 text-center cursor-pointer relative bg-white transition-all flex flex-col items-center justify-center min-h-[60px] mb-2.5">
                        {isUploadingBoutique ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                            <span className="text-[8.5px] text-neutral-400 font-mono">Uploading boutique photo...</span>
                          </div>
                        ) : ownerInfo.boutiquePhotoUrl ? (
                          <div className="flex items-center space-x-2">
                            <img src={ownerInfo.boutiquePhotoUrl} className="h-6 w-9 object-cover rounded bg-neutral-100 border border-neutral-350 shrink-0" referrerPolicy="no-referrer" />
                            <span className="text-[8.5px] text-green-600 font-bold uppercase font-sans">Active Shop Photo Loaded</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1.5 justify-center">
                            <Camera size={13} className="text-neutral-500" />
                            <span className="text-[8.5px] text-neutral-700 font-bold font-sans uppercase">CHOOSE LOCAL SHOP PHOTO FILE</span>
                          </div>
                        )}
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleBoutiquePhotoUpload} 
                          className="absolute inset-0 opacity-0 cursor-pointer pointer-events-auto" 
                        />
                      </div>
                      
                      <span className="text-[8px] text-neutral-400 font-bold uppercase block mb-1">Or Paste Custom Shop Image URL:</span>
                      <input 
                        type="url" 
                        placeholder="https://example.com/your-shop.jpg"
                        value={ownerInfo.boutiquePhotoUrl || ''}
                        onChange={(e) => setOwnerInfo({...ownerInfo, boutiquePhotoUrl: e.target.value})}
                        className="w-full border border-neutral-350 px-2.5 py-1.5 text-[10px] font-mono focus:border-neutral-950 focus:outline-none bg-white font-light text-neutral-950"
                      />
                    </div>

                    <label className="text-[9px] font-bold uppercase tracking-wider block mt-3.5 mb-1 text-neutral-500">Atelier Biography / Philosophy</label>
                    <textarea 
                      value={ownerInfo.philosophy}
                      onChange={(e) => setOwnerInfo({...ownerInfo, philosophy: e.target.value})}
                      rows={3}
                      className="w-full border border-neutral-300 p-2 text-xs focus:border-neutral-950 focus:outline-none bg-white font-light leading-relaxed text-neutral-900"
                    />
                  </div>

                  {/* Qualifications Manager */}
                  <div className="border border-neutral-250 p-3.5 bg-neutral-50 rounded-sm">
                    <span className="text-[9px] font-bold tracking-widest text-[#555] block mb-2 uppercase font-display">2. Educational Qualifications ({ownerInfo.qualifications.length})</span>
                    
                    {/* List current qualifications */}
                    <div className="space-y-2 mb-3">
                      {ownerInfo.qualifications.map((q) => (
                        <div key={q.id} className="flex justify-between items-center bg-white p-2 border border-neutral-200 rounded-xs">
                          <div className="flex-1 mr-2 text-left bg-transparent">
                            <p className="text-xs font-bold text-neutral-955 leading-tight">{q.degree}</p>
                            <span className="text-[10px] text-neutral-400 font-medium">{q.school} · {q.years}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setOwnerInfo({
                                ...ownerInfo,
                                qualifications: ownerInfo.qualifications.filter((item) => item.id !== q.id)
                              });
                            }}
                            className="p-1 text-red-500 hover:text-red-700 transition-colors bg-transparent border-0 cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add qualification small panel */}
                    <div className="p-2 border border-dashed border-neutral-300 rounded-sm space-y-1.5 bg-neutral-50/50">
                      <span className="text-[9.5px] font-bold text-neutral-500 uppercase">Add Qualification</span>
                      <input 
                        type="text" 
                        placeholder="Degree / Qualification (e.g. BSc CSE)"
                        value={newDegree}
                        onChange={(e) => setNewDegree(e.target.value)}
                        className="w-full border border-neutral-250 px-2 py-1 text-xs bg-white placeholder:text-neutral-400 text-neutral-900"
                      />
                      <input 
                        type="text" 
                        placeholder="School / University"
                        value={newSchool}
                        onChange={(e) => setNewSchool(e.target.value)}
                        className="w-full border border-neutral-250 px-2 py-1 text-xs bg-white placeholder:text-neutral-400 text-neutral-900"
                      />
                      <input 
                        type="text" 
                        placeholder="Years (e.g. 2022 — 2026)"
                        value={newYears}
                        onChange={(e) => setNewYears(e.target.value)}
                        className="w-full border border-neutral-250 px-2 py-1 text-xs bg-white placeholder:text-neutral-400 font-mono text-neutral-900"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!newDegree || !newSchool) {
                            alert('Please type qualification title and institution.');
                            return;
                          }
                          const newQ = {
                            id: 'q-' + Math.floor(1000 + Math.random() * 9000),
                            degree: newDegree,
                            school: newSchool,
                            years: newYears || 'Current'
                          };
                          setOwnerInfo({
                            ...ownerInfo,
                            qualifications: [...ownerInfo.qualifications, newQ]
                          });
                          setNewDegree('');
                          setNewSchool('');
                          setNewYears('');
                        }}
                        className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-[9.5px] font-bold p-1 tracking-wider uppercase text-center"
                      >
                        + Add Dynamic Entry
                      </button>
                    </div>
                  </div>

                  {/* 3. Professional Records & Documents Manager */}
                  <div className="border border-neutral-250 p-3.5 bg-neutral-50 rounded-sm">
                    <span className="text-[9px] font-bold tracking-widest text-[#555] block mb-2 uppercase font-display">3. Professional Records & Documents ({ownerInfo.experiences.length})</span>
                    
                    {/* List current experiences */}
                    <div className="space-y-2 mb-3">
                      {ownerInfo.experiences.map((exp) => (
                        <div key={exp.id} className="flex justify-between items-start bg-white p-2.5 border border-neutral-200 rounded-sm">
                          <div className="flex-1 mr-2 text-left bg-transparent">
                            <p className="text-[11px] font-bold text-neutral-900 leading-tight block">{exp.role}</p>
                            <span className="text-[10px] text-neutral-400 font-bold block mt-0.5">{exp.company} &middot; <span className="font-mono">{exp.period}</span></span>
                            {exp.summary && <p className="text-[10px] text-neutral-500 font-light mt-1.5 leading-normal text-justify">{exp.summary}</p>}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setOwnerInfo({
                                ...ownerInfo,
                                experiences: ownerInfo.experiences.filter((item) => item.id !== exp.id)
                              });
                            }}
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xs transition-colors bg-transparent border-0 cursor-pointer shrink-0 mt-0.5"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add experience small panel */}
                    <div className="p-2 border border-dashed border-neutral-300 rounded-sm space-y-1.5 bg-neutral-50/50">
                      <span className="text-[9.5px] font-bold text-neutral-500 uppercase block">Add Reference Document / Experience</span>
                      <input 
                        type="text" 
                        placeholder="Role / Document Title (e.g. Lead Designer)"
                        value={newExpRole}
                        onChange={(e) => setNewExpRole(e.target.value)}
                        className="w-full border border-neutral-250 px-2 py-1 text-xs bg-white placeholder:text-neutral-400 text-neutral-900 focus:border-neutral-950 focus:outline-none"
                      />
                      <input 
                        type="text" 
                        placeholder="Company / Issuing Institute (e.g. Zara HQ)"
                        value={newExpCompany}
                        onChange={(e) => setNewExpCompany(e.target.value)}
                        className="w-full border border-neutral-250 px-2 py-1 text-xs bg-white placeholder:text-neutral-400 text-neutral-900 focus:border-neutral-950 focus:outline-none"
                      />
                      <input 
                        type="text" 
                        placeholder="Period / Date (e.g. 2021 — 2023)"
                        value={newExpPeriod}
                        onChange={(e) => setNewExpPeriod(e.target.value)}
                        className="w-full border border-neutral-250 px-2 py-1 text-xs bg-white placeholder:text-neutral-400 font-mono text-neutral-900 focus:border-neutral-950 focus:outline-none"
                      />
                      <textarea 
                        placeholder="Brief summary or key credentials details..."
                        value={newExpSummary}
                        onChange={(e) => setNewExpSummary(e.target.value)}
                        rows={2}
                        className="w-full border border-neutral-250 p-2 text-xs bg-white placeholder:text-neutral-400 text-neutral-900 focus:border-neutral-950 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!newExpRole || !newExpCompany) {
                            alert('Please enter at least a document title/role and issuing company.');
                            return;
                          }
                          const newExp = {
                            id: 'exp-' + Math.floor(1000 + Math.random() * 9000),
                            role: newExpRole,
                            company: newExpCompany,
                            period: newExpPeriod || 'Present',
                            summary: newExpSummary || ''
                          };
                          setOwnerInfo({
                            ...ownerInfo,
                            experiences: [...ownerInfo.experiences, newExp]
                          });
                          setNewExpRole('');
                          setNewExpCompany('');
                          setNewExpPeriod('');
                          setNewExpSummary('');
                        }}
                        className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-[9.5px] font-bold p-1 tracking-wider uppercase text-center cursor-pointer"
                      >
                        + Add Experience Record
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] text-neutral-400 font-mono block text-center mb-2 animate-pulse">
                      * All additions are staged as drafts until you save.
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingOwner(false);
                        logSimulatedEvent('OWNER_PROFILE_UPDATED', {
                          updated_by: ownerInfo.name,
                          qualifications_total: ownerInfo.qualifications.length,
                          experiences_total: ownerInfo.experiences.length
                        });
                      }}
                      className="w-full bg-emerald-600 text-white text-xs font-bold py-3.5 tracking-wider hover:bg-emerald-700 transition-colors uppercase font-display rounded-md shadow-md flex items-center justify-center space-x-2 border border-emerald-700 cursor-pointer"
                    >
                      <Check size={14} className="animate-bounce" />
                      <span>SAVE OWNER PROFILE & DOCUMENTS</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* ==================== OWNER PROFILE DISPLAY SCREEN ==================== */
                <div className="space-y-6">
                  {/* Storefront Showcase Header */}
                  <div className="w-full animate-fade-in relative group">
                    <div className="w-full overflow-hidden shadow-xs border border-neutral-200 bg-neutral-100 flex items-center justify-center" style={{ height: '220px', borderRadius: '0 0 16px 16px' }}>
                      <img 
                        src={ownerInfo.boutiquePhotoUrl || "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAcARCAHCAasDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqp3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usf4e5aeXl6FLS0tSS1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktKVA1UX1VGVkU2GF1UVVklZVktD6A=="}
                        alt="Smart Collection Physical Boutique" 
                        style={{ objectFit: 'cover', height: '220px', width: '100%', borderRadius: '0 0 16px 16px' }}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    {appRole === 'owner' && (
                      <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white space-y-1.5 rounded-b-xl">
                        {isUploadingBoutique ? (
                          <div className="flex flex-col items-center space-y-1">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span className="text-[8px] font-bold tracking-wider uppercase">Uploading...</span>
                          </div>
                        ) : (
                          <>
                            <Camera size={20} className="text-white drop-shadow-md" />
                            <span className="text-[9px] font-bold tracking-widest uppercase bg-neutral-950/80 px-2 py-1 rounded-xs backdrop-blur-2xs">
                              Upload Shop Photo
                            </span>
                            <span className="text-[7.5px] text-neutral-300 font-mono">Tap area to pick direct from device</span>
                          </>
                        )}
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleBoutiquePhotoUpload} 
                          className="absolute inset-0 opacity-0 cursor-pointer pointer-events-auto" 
                        />
                      </div>
                    )}
                  </div>

                  {/* Store Identity Badge */}
                  <div className="bg-white border border-neutral-200/80 rounded-md p-4 animate-fade-in shadow-4xs mx-0.5">
                    <h3 className="text-sm font-bold font-display text-neutral-950 tracking-wide uppercase">Our Physical Boutique</h3>
                    <div className="space-y-2 mt-3 text-neutral-600">
                      <div className="flex items-center space-x-2">
                        <MapPin size={13} className="text-neutral-400 shrink-0" />
                        <span className="text-xs font-medium text-neutral-700">1 No Rail Gate, C.U.</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone size={13} className="text-neutral-400 shrink-0" />
                        <span className="text-xs font-mono font-medium text-neutral-700">01834-249462, 01824-909910</span>
                      </div>
                    </div>
                  </div>

                  {/* Clean thin horizontal divider */}
                  <div className="border-t border-neutral-200 my-4" />

                  {/* Owner Avatar & Branding */}
                  <div className="flex flex-col items-center text-center mt-2 animate-fade-in">
                    <div className="w-24 h-24 rounded-full border border-neutral-950 p-1 bg-white shadow-xs overflow-hidden">
                      <img 
                        src={ownerInfo.photoUrl} 
                        alt={ownerInfo.name} 
                        className="w-full h-full object-cover rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <h3 className="text-base font-bold font-display tracking-widest text-neutral-955 mt-4 uppercase">{ownerInfo.name}</h3>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold block mt-1">{ownerInfo.role}</span>
                  </div>

                  {/* Atelier Philosophy statement */}
                  <div className="mt-8 font-sans">
                    <h4 className="text-[9px] font-bold tracking-widest text-neutral-900 font-display pb-1 border-b border-neutral-100">ATELIER PHILOSOPHY</h4>
                    <div className="border-l-2 border-neutral-900 pl-4 py-1.5 mt-3">
                      <p className="text-xs font-light text-neutral-600 leading-relaxed italic text-justify">
                        "{ownerInfo.philosophy}"
                      </p>
                    </div>
                  </div>

                  {/* Pedigree section */}
                  <div className="mt-8 font-sans">
                    <h4 className="text-[9px] font-bold tracking-widest text-neutral-900 font-display pb-1 border-b border-neutral-100 uppercase">EDUCATIONAL PEDIGREE</h4>
                    {ownerInfo.qualifications.length === 0 ? (
                      <p className="text-[11px] text-neutral-400 font-light mt-3 text-left">No educational qualifications added yet. Try editing to add yours!</p>
                    ) : (
                      <div className="space-y-4 mt-4 text-left font-sans text-neutral-900">
                        {ownerInfo.qualifications.map((q) => (
                          <div key={q.id} className="flex flex-col text-left font-sans text-neutral-900 animate-fade-in">
                            <span className="text-xs font-bold text-neutral-955">{q.degree}</span>
                            <div className="flex justify-between items-center text-[10px] text-neutral-500 mt-1">
                              <span>{q.school}</span>
                              <span className="font-mono tracking-tight font-medium">{q.years}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Professional record section */}
                  <div className="mt-8 font-sans">
                    <h4 className="text-[9px] font-bold tracking-widest text-neutral-900 font-display pb-1 border-b border-neutral-100 uppercase font-sans">PROFESSIONAL RECORD</h4>
                    {ownerInfo.experiences.length === 0 ? (
                      <p className="text-[11px] text-neutral-400 font-light mt-3 text-left">No experience records added yet.</p>
                    ) : (
                      <div className="space-y-4 mt-4 text-left font-sans font-sans">
                        {ownerInfo.experiences.map((exp) => (
                          <div key={exp.id} className="flex flex-col font-sans text-neutral-900 animate-fade-in">
                            <span className="text-xs font-bold text-neutral-955">{exp.role}</span>
                            <span className="text-[11px] text-neutral-805 font-semibold">{exp.company} · <span className="text-[10px] text-neutral-400 font-normal">{exp.period}</span></span>
                            <p className="text-[11px] text-neutral-500 leading-relaxed font-light mt-1 w-full text-justify">{exp.summary}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Message on Facebook section */}
                  <div className="mt-9 pt-6 border-t border-neutral-150 text-center">
                    <p className="text-[10px] text-neutral-400 font-light mb-3 leading-relaxed">
                      Have personal qualifications questions or customized design requests for your upcoming curated wardrobe? Message directly on Facebook!
                    </p>
                    <button
                      onClick={() => handleFacebookLaunch()}
                      className="w-full bg-blue-600 text-white text-[10px] py-3 px-4 font-bold tracking-widest uppercase rounded-sm hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 shadow-xs cursor-pointer border-0 animate-none"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>MESSAGE ON FACEBOOK</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : subView === 'activity-history' ? (
            /* ==================== SIMULATED FIRESTORE HISTORICAL LOGS ==================== */
            <div className="flex flex-col animate-fade-in p-6 bg-neutral-100/10 min-h-full">
              {/* Timeline Header */}
              <div className="flex justify-between items-center border-b border-neutral-150 pb-3 mb-5">
                <button 
                  onClick={() => setSubView('none')}
                  className="p-1 text-neutral-500 hover:text-neutral-900 transition-colors animate-pulse"
                >
                  <ArrowLeft size={16} />
                </button>
                <div className="text-center">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-900 font-display">ACTIVITY JOURNAL</span>
                  <span className="text-[8px] bg-emerald-50 text-emerald-700 font-mono font-bold px-1.5 py-0.2 border border-emerald-250 ml-1.5 inline-block rounded-xs">Stream Active</span>
                </div>
                <div className="w-4 h-4"></div>
              </div>

              <div className="mb-4">
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">REAL-TIME FIRESTORE WORKPLACE STREAM</span>
                <span className="text-[9px] text-neutral-500 font-mono italic block mt-0.5">Stream: users/guest_uuid/activities/*</span>
              </div>

              {/* Dynamic Timeline items list */}
              <div className="space-y-0.5 mt-4 flex-1">
                {simulatedActivities.length === 0 ? (
                  <div className="text-center py-16 text-xs text-neutral-400">
                    Your real-time activity stream is empty.
                  </div>
                ) : (
                  simulatedActivities.map((act, index) => {
                    let title = '';
                    let body = '';
                    let badgeColor = '';
                    let textColor = '';
                    
                    if (act.eventType === 'APP_ENTRY') {
                      title = 'App Entered';
                      body = `Opened mobile simulator on client ${act.metadata?.client_version || '1.1.0'}. Device Platform: ${act.metadata?.platform || 'iOS SDK 17'}.`;
                      badgeColor = 'bg-neutral-900 text-white';
                      textColor = 'text-neutral-800';
                    } else if (act.eventType === 'FAVORITE_ADDED') {
                      title = 'Garment Wishlisted';
                      body = `Liked piece ID: ${act.metadata?.product_id} (${act.metadata?.product_name || 'Garment Item'}). Telemetry captured.`;
                      badgeColor = 'bg-amber-100 text-amber-800 border border-amber-200';
                      textColor = 'text-neutral-700 font-medium';
                    } else if (act.eventType === 'PAYMENT_SUCCESS') {
                      title = 'Order Checkout Payment';
                      body = `Transferred order: ID #${act.metadata?.order_id || 'unidentified'} for Tk ${act.metadata?.amount_usd?.toFixed(2) || '0.00'} verified by Stripe Gateway securely.`;
                      badgeColor = 'bg-emerald-100 text-emerald-800 border border-emerald-200';
                      textColor = 'text-emerald-950 font-bold';
                    }

                    const timeString = act.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

                    return (
                      <div key={act.id} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-2 h-2 rounded-full mt-2.5 ${act.eventType === 'PAYMENT_SUCCESS' ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-900 border border-neutral-900'}`} />
                          {index !== simulatedActivities.length - 1 && (
                            <div className="w-0.5 bg-neutral-200 flex-1 min-h-[50px] my-1" />
                          )}
                        </div>

                        <div className="flex-1 pb-5">
                          <div className="flex justify-between items-center bg-neutral-50/50 p-1.5 border border-neutral-100 rounded-sm">
                            <span className={`text-[8.5px] font-bold tracking-wider px-2 py-0.5 uppercase ${badgeColor}`}>
                              {title}
                            </span>
                            <span className="text-[10px] text-neutral-400 font-semibold font-mono">{timeString}</span>
                          </div>
                          <p className={`text-[11px] mt-2 font-sans ${textColor} leading-relaxed`}>{body}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ) : selectedProduct ? (
            /* ==================== PRODUCT DETAIL SCREEN (PDP) ==================== */
            <div className="flex flex-col animate-fade-in pb-12">
              {/* Product Large swiper panel */}
              <div className="relative h-[280px] bg-neutral-50 flex items-center justify-center">
                <img 
                  src={selectedProduct.images[pdpImageIdx]} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                
                {/* Float navigation overlays */}
                <button 
                  onClick={handleGoBack}
                  className="absolute top-4 left-4 w-9 h-9 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center shadow-xs hover:bg-white text-neutral-900"
                >
                  <ArrowLeft size={16} />
                </button>

                {/* dot indicators */}
                {selectedProduct.images.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-1.5">
                    {selectedProduct.images.map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => setPdpImageIdx(i)}
                        className={`h-1 rounded-full transition-all duration-300 ${pdpImageIdx === i ? 'w-5 bg-neutral-900' : 'w-1.5 bg-neutral-300'}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Item Details */}
              <div className="p-5 flex flex-col bg-white">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">{selectedProduct.category} — {selectedProduct.gender}</span>
                    <h1 className="text-lg font-normal font-display tracking-tight text-neutral-900 mt-1">{selectedProduct.name}</h1>
                  </div>
                  <span className="text-lg font-bold text-neutral-900 font-display">Tk {selectedProduct.price}</span>
                </div>

                <p className="text-neutral-500 text-xs leading-relaxed mt-3.5 font-light">
                  {selectedProduct.description}
                </p>

                {/* Size Selection Chips */}
                <div className="mt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold tracking-wider text-neutral-900">SELECT SIZE</span>
                    <span className="text-[10px] text-neutral-400 underline cursor-pointer">Size Guide</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2.5">
                    {selectedProduct.sizes.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-10 h-10 px-3 text-xs font-medium border transition-colors ${
                            isSelected 
                              ? 'bg-neutral-900 text-white border-neutral-900' 
                              : 'bg-white text-neutral-900 border-neutral-200 hover:border-neutral-900'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Accordion List */}
                <div className="mt-8 border-t border-neutral-100">
                  {/* Collapsible Materials */}
                  <div className="border-b border-neutral-100">
                    <button 
                      onClick={() => setInMaterialsExpanded(!materialsExpanded)}
                      className="w-full py-4 flex justify-between items-center text-left text-neutral-900 font-medium text-xs tracking-wider"
                    >
                      <span>MATERIALS & SUSTAINABILITY</span>
                      <Plus size={14} className={`transform transition-transform ${materialsExpanded ? 'rotate-45' : ''}`} />
                    </button>
                    {materialsExpanded && (
                      <div className="pb-4 text-xs font-light text-neutral-500 leading-relaxed animate-fade-in-down">
                        {selectedProduct.fabric}
                      </div>
                    )}
                  </div>

                  {/* Collapsible Care */}
                  <div className="border-b border-neutral-100">
                    <button 
                      onClick={() => setInCareExpanded(!careExpanded)}
                      className="w-full py-4 flex justify-between items-center text-left text-neutral-900 font-medium text-xs tracking-wider"
                    >
                      <span>PRODUCT CARE TIPS</span>
                      <Plus size={14} className={`transform transition-transform ${careExpanded ? 'rotate-45' : ''}`} />
                    </button>
                    {careExpanded && (
                      <div className="pb-4 text-xs font-light text-neutral-500 leading-relaxed animate-fade-in-down">
                        {selectedProduct.care}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Message on Facebook anchored panel */}
              <div className="absolute bottom-16 left-0 right-0 p-4 bg-white border-t border-neutral-100 flex items-center space-x-2 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(selectedProduct.id);
                  }}
                  className="p-3 border border-neutral-200 bg-white hover:bg-neutral-50 rounded-sm text-neutral-800 transition-colors cursor-pointer flex items-center justify-center shrink-0 w-11 h-11"
                >
                  <Heart size={16} className={favorites.includes(selectedProduct.id) ? "fill-red-505 text-red-500" : ""} />
                </button>
                <div className="flex-1">
                  <button
                    onClick={() => handleFacebookLaunch(selectedProduct.name)}
                    className="w-full bg-blue-600 text-white py-3.5 text-[10px] font-bold tracking-widest hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 rounded-sm border-0 cursor-pointer uppercase shadow-3xs"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>MESSAGE ON FACEBOOK</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* ==================== 1. HOME TAB view ==================== */}
              {activeTab === 'home' && (
                <div className="flex flex-col animate-fade-in">
                  {/* Editorial Header */}
                  <div className="px-5 py-4 flex justify-center items-center">
                    <h2 className="text-sm font-bold font-display tracking-[0.25em] text-neutral-900 text-center">SMART COLLECTION</h2>
                  </div>

                  {/* Dynamic Hero Banner */}
                  <div className="relative mx-5 h-[230px] bg-neutral-200 overflow-hidden group">
                    <img 
                      src="/src/assets/images/hero_banner_1780460521425.png" 
                      alt="New season Linen" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent flex flex-col justify-end p-5">
                      <span className="text-[9px] font-semibold text-white tracking-widest mb-1">THE LINEN SERIES</span>
                      <h3 className="text-xl font-normal text-white font-display leading-tight tracking-tight mb-3">
                        Designed for breathing.<br />Aesthetic minimalist fit.
                      </h3>
                      <div>
                        <button 
                          onClick={() => {
                            setActiveTab('categories');
                            setCurrentGender('Women');
                            setCategoryFilter('All');
                            setIsViewingGrid(true);
                          }}
                          className="bg-white text-neutral-900 text-[10px] font-bold tracking-widest px-4 py-2 hover:bg-neutral-100 transition-colors"
                        >
                          EXPLORE NOW
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Split gender route banners */}
                  <div className="grid grid-cols-2 gap-3 mx-5 mt-6">
                    <div 
                      onClick={() => {
                        setActiveTab('categories');
                        setCurrentGender('Women');
                        setCategoryFilter('All');
                        setIsViewingGrid(true);
                      }}
                      className="relative h-28 bg-neutral-100 overflow-hidden cursor-pointer group"
                    >
                      <img 
                        src="https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=400&auto=format&fit=crop"
                        alt="Women Collection"
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-white tracking-[0.2em] font-display">WOMEN</span>
                      </div>
                    </div>

                    <div 
                      onClick={() => {
                        setActiveTab('categories');
                        setCurrentGender('Men');
                        setCategoryFilter('All');
                        setIsViewingGrid(true);
                      }}
                      className="relative h-28 bg-neutral-100 overflow-hidden cursor-pointer group"
                    >
                      <img 
                        src="https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=400&auto=format&fit=crop"
                        alt="Men Collection"
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-white tracking-[0.2em] font-display">MEN</span>
                      </div>
                    </div>
                  </div>

                  {/* Carousel Header */}
                  <div className="px-5 mt-7 flex justify-between items-end">
                    <span className="text-[10px] font-bold tracking-widest text-neutral-950">NEW ARRIVALS</span>
                    <button 
                      onClick={() => {
                        setActiveTab('categories');
                        setCategoryFilter('All');
                        setIsViewingGrid(true);
                      }} 
                      className="text-[10px] font-semibold text-neutral-400 hover:text-neutral-900 underline"
                    >
                      VIEW ALL
                    </button>
                  </div>

                  {/* Horizontal Scroll bar */}
                  <div className="mt-3 overflow-x-auto whitespace-nowrap scroll-smooth px-5 pb-4 flex gap-4">
                    {products.slice(0, 5).map((p) => (
                      <div 
                        key={p.id}
                        onClick={() => handleProductClick(p)}
                        className="w-36 inline-block shrink-0 cursor-pointer group"
                      >
                        <div className="relative aspect-[3/4] bg-neutral-50 overflow-hidden mb-2.5">
                          <img 
                            src={p.images[0]} 
                            alt={p.name}
                            className="w-full h-full object-cover transition-all"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="text-[8px] uppercase tracking-widest text-neutral-400 font-bold block">{p.category}</span>
                        <h4 className="text-[11px] font-light text-neutral-950 truncate mt-0.5">{p.name}</h4>
                        <span className="text-[11px] font-bold text-neutral-900 block mt-0.5">Tk {p.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ==================== 2. CATEGORIES / PLP TAB view ==================== */}
              {activeTab === 'categories' && (
                <div className="flex flex-col animate-fade-in px-5 py-4">
                  {/* Category Toggle headers */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col">
                      <h2 className="text-sm font-bold font-display tracking-widest text-neutral-900 uppercase">COLLECTIONS</h2>
                      {appRole === 'owner' && (
                        <span className="text-[7.5px] text-emerald-600 font-mono font-bold uppercase tracking-wider">
                          Owner Settings
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {appRole === 'owner' && (
                        <button
                          onClick={() => setShowAddDesignModal(true)}
                          className="flex items-center space-x-1 text-[10px] text-white bg-neutral-950 px-2.5 py-1.5 hover:bg-neutral-850 font-bold tracking-wider uppercase rounded-sm border-0 cursor-pointer shadow-3xs"
                        >
                          <Plus size={12} className="text-emerald-400" />
                          <span>Add Design</span>
                        </button>
                      )}
                      <button 
                        onClick={() => setShowFiltersModal(true)}
                        className="flex items-center space-x-1.5 text-xs text-neutral-500 border border-neutral-200 px-2 py-1.5 hover:text-neutral-900 cursor-pointer bg-white"
                      >
                        <SlidersHorizontal size={12} />
                        <span>Filter</span>
                      </button>
                    </div>
                  </div>

                  {/* Gender Selector Toggle tabs */}
                  <div className="grid grid-cols-2 border-b border-neutral-100 mb-5 text-center">
                    <button 
                      onClick={() => {
                        setCurrentGender('Women');
                        setCategoryFilter('All');
                        setIsViewingGrid(false);
                      }}
                      className={`pb-2.5 text-xs font-medium tracking-widest border-b-2 transition-colors ${
                        currentGender === 'Women' ? 'border-neutral-900 text-neutral-900 font-semibold' : 'border-transparent text-neutral-400'
                      }`}
                    >
                      WOMEN
                    </button>
                    <button 
                      onClick={() => {
                        setCurrentGender('Men');
                        setCategoryFilter('All');
                        setIsViewingGrid(false);
                      }}
                      className={`pb-2.5 text-xs font-medium tracking-widest border-b-2 transition-colors ${
                        currentGender === 'Men' ? 'border-neutral-900 text-neutral-900 font-semibold' : 'border-transparent text-neutral-400'
                      }`}
                    >
                      MEN
                    </button>
                  </div>

                  {!isViewingGrid ? (
                    /* General Categories Lists */
                    <div className="flex flex-col space-y-3">
                      {categoriesList.map((cat) => {
                        const count = products.filter(p => p.gender === currentGender && (cat === 'All' || p.category === cat)).length;
                        return (
                          <div
                            key={cat}
                            onClick={() => {
                              setCategoryFilter(cat);
                              setIsViewingGrid(true);
                              onSelectProductDocs(products.find(p => p.gender === currentGender && (cat === 'All' || p.category === cat)) || products[0]);
                            }}
                            className="bg-neutral-50 p-4 border border-neutral-100 hover:border-neutral-900 cursor-pointer flex justify-between items-center transition-colors group"
                          >
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold tracking-wider text-neutral-900">{cat.toUpperCase()}</span>
                              <span className="text-[9px] text-neutral-400 mt-0.5">{count} {count === 1 ? 'item' : 'items'} available</span>
                            </div>
                            <ChevronRight size={14} className="text-neutral-400 group-hover:text-neutral-900 transition-colors" />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* Products list in grid (PLP View) */
                    <div>
                      {/* Breadcrumbs */}
                      <div className="flex items-center space-x-2 mb-4">
                        <button 
                          onClick={() => {
                            setCategoryFilter('All');
                            setIsViewingGrid(false);
                          }}
                          className="text-[10px] text-neutral-400 hover:text-neutral-950 font-medium"
                        >
                          Categories
                        </button>
                        <ChevronRight size={8} className="text-neutral-300" />
                        <span className="text-[10px] text-neutral-900 font-semibold">{categoryFilter.toUpperCase()}</span>
                      </div>

                      {/* PLP Grid */}
                      {processedProducts.length === 0 ? (
                        <div className="text-center py-12 text-xs text-neutral-400">
                          No items matched the active filters.
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-x-3 gap-y-5">
                          {processedProducts.map((p) => (
                            <div 
                              key={p.id}
                              onClick={() => handleProductClick(p)}
                              className="cursor-pointer group select-none relative"
                            >
                              <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden mb-2">
                                <img 
                                  src={p.images[0]} 
                                  alt={p.name}
                                  className="w-full h-full object-cover transition-transform group-hover:scale-102"
                                  referrerPolicy="no-referrer"
                                />
                                
                                {appRole === 'owner' ? (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setProducts(prev => prev.filter(item => item.id !== p.id));
                                      logSimulatedEvent('PRODUCT_DELETED', {
                                        product_id: p.id,
                                        name: p.name,
                                        timestamp: new Date().toISOString()
                                      });
                                      setFbToastMsg(`DESIGN DELETED: "${p.name}" removed successfully!`);
                                      setTimeout(() => setFbToastMsg(null), 3000);
                                    }}
                                    className="absolute top-2 left-2 w-6.5 h-6.5 bg-white/95 rounded-full flex items-center justify-center shadow-xs hover:scale-110 hover:bg-white text-red-500 transition-transform border-0 cursor-pointer z-10"
                                    title="Delete Design"
                                  >
                                    <Trash2 size={11} />
                                  </button>
                                ) : null}
                              </div>
                              <span className="text-[8px] uppercase tracking-widest text-neutral-400 font-bold block">{p.category}</span>
                              <h4 className="text-xs font-light text-neutral-900 truncate mt-0.5">{p.name}</h4>
                              <span className="text-xs font-bold text-neutral-900 block mt-0.5">Tk {p.price}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ==================== 3. BAG/CART TAB view ==================== */}
              {activeTab === 'cart' && (
                <div className="flex flex-col animate-fade-in px-5 py-4 min-h-full">
                  <h2 className="text-sm font-bold font-display tracking-widest text-neutral-900 uppercase mb-4">YOUR BAG</h2>
                  
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <ShoppingBag size={32} className="text-neutral-300 mb-3" />
                      <p className="text-xs text-neutral-500 font-light max-w-[200px] mb-4 leading-relaxed">
                        Your garment queue is currently empty.
                      </p>
                      <button
                        onClick={() => setActiveTab('categories')}
                        className="bg-neutral-900 text-white text-[9.5px] font-bold tracking-widest uppercase px-4 py-2 hover:bg-neutral-850 rounded-sm border-0 cursor-pointer"
                      >
                        CONTINUE BROWSING
                      </button>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col justify-between">
                      {/* Cart Items List */}
                      <div className="space-y-4 max-h-[280px] overflow-y-auto pr-1">
                        {cart.map((item) => (
                          <div key={`${item.product.id}-${item.selectedSize}`} className="flex space-x-3.5 border-b border-neutral-100 pb-3">
                            <div className="w-16 h-20 bg-neutral-100 overflow-hidden shrink-0">
                              <img 
                                src={item.product.images[0]} 
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                              <div>
                                <h4 className="text-xs font-medium text-neutral-950 truncate">{item.product.name}</h4>
                                <p className="text-[9.5px] text-neutral-400 mt-1 font-mono uppercase tracking-wider">
                                  Size: <span className="text-neutral-950 font-bold">{item.selectedSize}</span>
                                </p>
                              </div>
                              
                              <div className="flex justify-between items-center mt-2">
                                {/* Quantity controls */}
                                <div className="flex items-center space-x-2 border border-neutral-200 bg-neutral-50 p-1">
                                  <button 
                                    onClick={() => updateCartQuantity(item.product.id, item.selectedSize, -1)}
                                    className="p-1 hover:bg-neutral-200/50 text-neutral-600 transition-colors border-0 bg-transparent cursor-pointer"
                                  >
                                    <Minus size={10} />
                                  </button>
                                  <span className="text-[10px] font-mono font-bold text-neutral-900 w-4 text-center">{item.quantity}</span>
                                  <button 
                                    onClick={() => updateCartQuantity(item.product.id, item.selectedSize, 1)}
                                    className="p-1 hover:bg-neutral-200/50 text-neutral-600 transition-colors border-0 bg-transparent cursor-pointer"
                                  >
                                    <Plus size={10} />
                                  </button>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                  <span className="text-xs font-bold text-neutral-950">Tk {item.product.price * item.quantity}</span>
                                  <button 
                                    onClick={() => handleRemoveFromCart(item.product.id, item.selectedSize)}
                                    className="text-red-500 hover:text-red-750 p-1 border-0 bg-transparent cursor-pointer"
                                    title="Remove item"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Summary, pricing and simulated checkout */}
                      <div className="mt-5 border-t border-neutral-100 pt-4 bg-white">
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-xs text-neutral-500">
                            <span>Subtotal</span>
                            <span className="font-medium text-neutral-900">Tk {cartTotals.subtotal}</span>
                          </div>
                          <div className="flex justify-between text-xs text-neutral-500">
                            <span>Shipping</span>
                            <span className="font-medium text-neutral-900">
                              {cartTotals.shipping === 0 ? 'FREE' : `Tk ${cartTotals.shipping}`}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm pt-2 border-t border-neutral-100">
                            <span className="font-bold text-neutral-900 uppercase tracking-wider">Estimated Total</span>
                            <span className="font-bold text-neutral-950">Tk {cartTotals.total}</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={async () => {
                            logSimulatedEvent('CHECKOUT_COMPLETED', {
                              items_count: cart.reduce((sum, item) => sum + item.quantity, 0),
                              order_total_usd: cartTotals.total,
                              checkout_platform: 'Simulated ApplePay / CreditCard Gateway',
                              timestamp: new Date().toISOString()
                            });
                            setFbToastMsg(`PAYMENT CONFLICT RESOLVED: Order total of Tk ${cartTotals.total} successfully processed!`);
                            setCart([]);
                            setTimeout(() => setFbToastMsg(null), 4000);
                          }}
                          className="w-full bg-neutral-900 text-white text-[10px] font-bold py-3 tracking-widest uppercase hover:bg-neutral-850 rounded-sm flex items-center justify-center space-x-2 border-0 shadow-3xs cursor-pointer"
                        >
                          <Check size={12} className="text-emerald-400" />
                          <span>PLACE ORDER (Tk {cartTotals.total})</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ==================== 4. PROFILE TAB view ==================== */}
              {activeTab === 'profile' && (
                <div className="flex flex-col animate-fade-in px-5 py-4">
                  <h2 className="text-sm font-bold font-display tracking-widest text-neutral-900 uppercase mb-4">MY ACCOUNT</h2>

                  {/* Profile Cards */}
                  <div className="flex items-center space-x-3 bg-neutral-50 p-4 border border-neutral-100 rounded-sm mb-5">
                    <div className="w-11 h-11 bg-neutral-800 text-white rounded-full flex items-center justify-center font-display font-bold text-sm">
                      {appRole === 'owner' ? 'SC' : 'PF'}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900">
                        {appRole === 'owner' ? 'Sarah Collins (Boutique Owner)' : 'Premium Flutter Guest'}
                      </h4>
                      <p className="text-[10px] text-neutral-400 font-light mt-0.5">
                        {appRole === 'owner' ? 'sarah.collins@smartcollection.com' : 'designer@smartcollection.gcp'}
                      </p>
                    </div>
                  </div>

                  {/* Menu options */}
                  <div className="space-y-1">
                    <div 
                      onClick={() => setSubView('owner-profile')}
                      className="py-3 flex justify-between items-center text-xs text-neutral-500 border-b border-neutral-100 hover:text-neutral-900 cursor-pointer group"
                    >
                      <span className="font-semibold group-hover:text-neutral-900 flex items-center space-x-2">
                        <User size={13} className="text-emerald-500" />
                        <span>Meet the Studio Owner</span>
                      </span>
                      <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-all text-neutral-400 group-hover:text-neutral-900" />
                    </div>

                    {appRole === 'owner' && (
                      <div 
                        onClick={() => setSubView('owner-portal')}
                        className="py-3 flex justify-between items-center text-xs text-neutral-500 border-b border-neutral-100 hover:text-neutral-900 cursor-pointer group"
                      >
                        <span className="font-semibold group-hover:text-neutral-900 flex items-center space-x-2">
                          <Settings size={13} className="text-neutral-800" />
                          <span>Owner Portal Toolkit</span>
                        </span>
                        <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-all text-neutral-400 group-hover:text-neutral-900" />
                      </div>
                    )}

                    {appRole === 'visitor' ? (
                      <div 
                        onClick={() => {
                          setShowPasscodeDialog(true);
                          setPasscodeInput('');
                          setPasscodeError(null);
                        }}
                        className="py-3 flex justify-between items-center text-xs text-neutral-500 border-b border-neutral-100 hover:text-neutral-900 cursor-pointer group"
                      >
                        <span className="font-semibold group-hover:text-neutral-900 flex items-center space-x-2">
                          <Lock size={13} className="text-neutral-650 animate-pulse" />
                          <span>Owner Portal Login</span>
                        </span>
                        <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-all text-neutral-400 group-hover:text-neutral-900" />
                      </div>
                    ) : (
                      <div 
                        onClick={() => {
                          setAppRole('visitor');
                          setIsAdminLoggedIn(false);
                          setActiveTab('home');
                          setSubView('none');
                          logSimulatedEvent('OWNER_LOGOUT', { timestamp: new Date().toISOString() });
                          setFbToastMsg("Logged out of Owner Portal. Switched back to Visitor view.");
                          setTimeout(() => setFbToastMsg(null), 3000);
                        }}
                        className="py-3 flex justify-between items-center text-xs text-red-650 border-b border-neutral-100 hover:text-red-850 cursor-pointer group"
                      >
                        <span className="font-bold flex items-center space-x-2">
                          <LogOut size={13} className="text-red-500" />
                          <span className="text-red-600">Exit Owner Portal (Visitor Mode)</span>
                        </span>
                        <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-all text-neutral-400 group-hover:text-red-850" />
                      </div>
                    )}
                  </div>

                  {/* Aesthetic quote block */}
                  <div className="mt-6 border-l-2 border-neutral-900 pl-3.5 py-1">
                    <span className="text-[10px] italic font-light text-neutral-400 block leading-relaxed">
                      "Fashion fades, only premium, well-engineered architectural design remains eternal."
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

        </div>

        {/* Persistent 4-Tab Flutter Mock Navigation Panel */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-neutral-100 px-3.5 flex justify-between items-center z-40">
          <button 
            onClick={() => {
              setActiveTab('home');
              setSelectedProduct(null);
              setSubView('none');
            }} 
            className={`flex flex-col items-center justify-center flex-1 transition-colors ${
              activeTab === 'home' && !selectedProduct && subView === 'none' ? 'text-neutral-900' : 'text-neutral-400'
            }`}
          >
            <span className="text-[10px] font-semibold tracking-wider font-display shrink-0">HOME</span>
            <div className={`w-1 h-1 rounded-full bg-neutral-900 mt-1 transition-transform ${activeTab === 'home' && !selectedProduct && subView === 'none' ? 'scale-100' : 'scale-0'}`}></div>
          </button>

          <button 
            onClick={() => {
              setActiveTab('categories');
              setCategoryFilter('All');
              setSelectedProduct(null);
              setSubView('none');
            }} 
            className={`flex flex-col items-center justify-center flex-1 transition-colors ${
              activeTab === 'categories' && !selectedProduct && subView === 'none' ? 'text-neutral-900' : 'text-neutral-400'
            }`}
          >
            <span className="text-[10px] font-semibold tracking-wider font-display shrink-0">CATEGORIES</span>
            <div className={`w-1 h-1 rounded-full bg-neutral-900 mt-1 transition-transform ${activeTab === 'categories' && !selectedProduct && subView === 'none' ? 'scale-100' : 'scale-0'}`}></div>
          </button>

          <button 
            onClick={() => {
              setActiveTab('cart');
              setSelectedProduct(null);
              setSubView('none');
            }} 
            className={`flex flex-col items-center justify-center flex-1 transition-colors relative ${
              activeTab === 'cart' && !selectedProduct && subView === 'none' ? 'text-neutral-900' : 'text-neutral-400'
            }`}
          >
            <div className="relative">
              <span className="text-[10px] font-semibold tracking-wider font-display shrink-0">BAG</span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-2.5 bg-neutral-900 text-white text-[7.5px] w-3 h-3 rounded-full flex items-center justify-center font-mono font-bold scale-90">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </div>
            <div className={`w-1 h-1 rounded-full bg-neutral-900 mt-1 transition-transform ${activeTab === 'cart' && !selectedProduct && subView === 'none' ? 'scale-100' : 'scale-0'}`}></div>
          </button>

          <button 
            onClick={() => {
              setActiveTab('profile');
              setSelectedProduct(null);
              setSubView('none');
            }} 
            className={`flex flex-col items-center justify-center flex-1 transition-colors ${
              activeTab === 'profile' && !selectedProduct ? 'text-neutral-900' : 'text-neutral-400'
            }`}
          >
            <span className="text-[10px] font-semibold tracking-wider font-display shrink-0">PROFILE</span>
            <div className={`w-1 h-1 rounded-full bg-neutral-900 mt-1 transition-transform ${activeTab === 'profile' && !selectedProduct ? 'scale-100' : 'scale-0'}`}></div>
          </button>
        </div>

        {/* Dynamic Filters Slide-Up Overlay */}
        {showFiltersModal && (
          <div className="absolute inset-0 bg-black/40 z-50 flex items-end animate-fade-in">
            <div className="w-full bg-white p-5 rounded-t-[24px] max-h-[85%] overflow-y-auto animate-fade-in-up">
              <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
                <span className="text-xs font-bold tracking-wider text-neutral-950 font-display">FILTERS</span>
                <button 
                  onClick={() => setShowFiltersModal(false)}
                  className="text-xs text-neutral-400 font-semibold uppercase hover:text-neutral-950"
                >
                  Close
                </button>
              </div>

              {/* Sizes checklist */}
              <div className="mt-4">
                <span className="text-[10px] font-bold text-neutral-950 block tracking-wide">SIZES</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {['XS', 'S', 'M', 'L', 'XL', '30', '32', '34', '36'].map((sz) => {
                    const isSelected = selectedSizeFilter.includes(sz);
                    return (
                      <button
                        key={sz}
                        onClick={() => {
                          setSelectedSizeFilter(prev => 
                            prev.includes(sz) ? prev.filter(x => x !== sz) : [...prev, sz]
                          );
                        }}
                        className={`text-[10px] font-medium h-8 min-w-8 px-2.5 transition-colors border ${
                          isSelected ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-400 border-neutral-200'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sort checklist */}
              <div className="mt-5">
                <span className="text-[10px] font-bold text-neutral-950 block tracking-wide">SORT BY</span>
                <div className="space-y-1.5 mt-2">
                  <div 
                    onClick={() => setAppliedFilters(p => ({ ...p, sortBy: 'recommended' }))}
                    className="flex justify-between items-center text-xs py-1.5 cursor-pointer text-neutral-500 hover:text-neutral-900"
                  >
                    <span>Recommended</span>
                    {appliedFilters.sortBy === 'recommended' && <Check size={12} className="text-neutral-900" />}
                  </div>
                  <div 
                    onClick={() => setAppliedFilters(p => ({ ...p, sortBy: 'price-low' }))}
                    className="flex justify-between items-center text-xs py-1.5 cursor-pointer text-neutral-500 hover:text-neutral-900"
                  >
                    <span>Price: Low to High</span>
                    {appliedFilters.sortBy === 'price-low' && <Check size={12} className="text-neutral-900" />}
                  </div>
                  <div 
                    onClick={() => setAppliedFilters(p => ({ ...p, sortBy: 'price-high' }))}
                    className="flex justify-between items-center text-xs py-1.5 cursor-pointer text-neutral-500 hover:text-neutral-900"
                  >
                    <span>Price: High to Low</span>
                    {appliedFilters.sortBy === 'price-high' && <Check size={12} className="text-neutral-900" />}
                  </div>
                </div>
              </div>

              {/* Reset & Apply */}
              <div className="grid grid-cols-2 gap-3 mt-6 border-t border-neutral-100 pt-4">
                <button
                  onClick={() => {
                    setSelectedSizeFilter([]);
                    setAppliedFilters(p => ({ ...p, sortBy: 'recommended' }));
                  }}
                  className="bg-neutral-50 text-neutral-500 hover:text-neutral-950 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowFiltersModal(false)}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white py-2.5 text-[10px] font-bold tracking-widest uppercase transition-colors"
                >
                  Apply Filters
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ==================== OWNER ADD PORTAL DESIGN MODAL ==================== */}
        {showAddDesignModal && appRole === 'owner' && (
          <div className="absolute inset-x-0 bottom-0 top-0 bg-neutral-950/80 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white w-full max-w-[280px] p-4.5 border border-neutral-150 shadow-md text-left rounded-sm animate-scale-up max-h-[90%] overflow-y-auto">
              <div className="flex items-center justify-between text-neutral-950 mb-3 pb-2 border-b border-neutral-100">
                <span className="text-[10px] font-bold uppercase tracking-widest font-display">Add Clothing Design</span>
                <button 
                  onClick={() => setShowAddDesignModal(false)}
                  className="text-neutral-400 hover:text-neutral-900 text-xs border-0 bg-transparent p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Garment Name</label>
                  <input 
                    type="text"
                    placeholder="e.g., Silk Summer Tailored Blazer"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    className="w-full text-xs bg-neutral-50 border border-neutral-250 p-2 text-neutral-900 focus:outline-neutral-900 rounded-2xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Gender Group</label>
                    <div className="grid grid-cols-2 gap-1 bg-neutral-50 border border-neutral-220 p-0.5 rounded-2xs">
                      <button
                        type="button"
                        onClick={() => setNewProdGender('Women')}
                        className={`py-1 text-[8.5px] font-bold rounded-3xs transition-colors border-0 cursor-pointer ${newProdGender === 'Women' ? 'bg-neutral-900 text-white' : 'text-neutral-500 bg-transparent'}`}
                      >
                        WOMEN
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewProdGender('Men')}
                        className={`py-1 text-[8.5px] font-bold rounded-3xs transition-colors border-0 cursor-pointer ${newProdGender === 'Men' ? 'bg-neutral-900 text-white' : 'text-neutral-500 bg-transparent'}`}
                      >
                        MEN
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Category</label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value)}
                      className="w-full text-xs bg-neutral-50 border border-neutral-255 p-1.5 text-neutral-900 focus:outline-neutral-900 rounded-2xs"
                    >
                      <option value="Tops">Tops</option>
                      <option value="Bottoms">Bottoms</option>
                      <option value="Outerwear">Outerwear</option>
                      <option value="Dresses">Dresses</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Price tag (Tk)</label>
                    <input 
                      type="number"
                      placeholder="e.g. 175"
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      className="w-full text-xs bg-neutral-50 border border-neutral-250 p-2 text-neutral-900 focus:outline-neutral-900 rounded-2xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Preset Image</label>
                    <select
                      value={newProdImage}
                      onChange={(e) => {
                        setNewProdImage(e.target.value);
                        setUploadedImageUrl(null);
                      }}
                      className="w-full text-xs bg-neutral-50 border border-neutral-250 p-1.5 text-neutral-900 focus:outline-neutral-900 rounded-2xs"
                    >
                      <option value="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400">Preset: Butter Dress</option>
                      <option value="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=400">Preset: Wool Coat</option>
                      <option value="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=400">Preset: Linen Dress</option>
                      <option value="https://images.unsplash.com/photo-1548624149-f7b31668831a?q=80&w=400">Preset: Woven Knit</option>
                    </select>
                  </div>
                </div>

                {/* IMAGE PICKER & IMGBB GALLERY UPLOAD */}
                <div>
                  <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Custom Image (ImgBB API)</label>
                  <div className="border-2 border-dashed border-neutral-300 hover:border-neutral-900 rounded-sm p-2 text-center cursor-pointer relative bg-neutral-50 transition-all flex flex-col items-center justify-center min-h-[75px] shadow-3xs">
                    {isUploadingImage ? (
                      <div className="flex flex-col items-center space-y-1 justify-center">
                        <div className="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                        <span className="text-[8px] text-neutral-600 font-mono font-bold">Uploading...</span>
                      </div>
                    ) : uploadedImageUrl ? (
                      <div className="flex items-center space-x-2 text-left">
                        <img src={uploadedImageUrl} className="h-10 w-7.5 object-cover bg-neutral-50 border border-neutral-200 rounded shrink-0" referrerPolicy="no-referrer" />
                        <div>
                          <span className="text-[8px] text-emerald-600 font-extrabold block uppercase tracking-wider">Active Hot-link CDN</span>
                          <span className="text-[7.5px] text-neutral-400 font-light block mt-0.5">Click to replace</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Camera size={14} className="text-neutral-500 mb-0.5" />
                        <span className="text-[8px] text-neutral-800 font-bold uppercase tracking-wider">Tap to upload photo</span>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Description</label>
                  <textarea 
                    rows={2}
                    placeholder="Provide a description..."
                    value={newProdDescription}
                    onChange={(e) => setNewProdDescription(e.target.value)}
                    className="w-full text-xs bg-neutral-50 border border-neutral-250 p-1.5 text-neutral-900 focus:outline-neutral-900 rounded-2xs"
                  />
                </div>

                <div className="flex space-x-2 pt-1">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowAddDesignModal(false);
                    }}
                    className="flex-1 border border-neutral-250 text-neutral-500 py-2 text-[9px] font-bold tracking-wider uppercase bg-transparent hover:bg-neutral-50 cursor-pointer rounded-xs"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      if (!newProdName || !newProdPrice) {
                        setFbToastMsg("Error: Please provide garment name and price.");
                        setTimeout(() => setFbToastMsg(null), 3000);
                        return;
                      }
                      const newProduct: Product = {
                        id: 'owner-' + Date.now(),
                        name: newProdName,
                        category: newProdCategory,
                        gender: newProdGender,
                        price: Number(newProdPrice),
                        images: [newProdImage, 'https://picsum.photos/seed/altp/600/800'],
                        sizes: newProdCategory === 'Bottoms' ? ['30', '32', '34', '36'] : ['XS', 'S', 'M', 'L'],
                        colors: ['Raw Canvas', 'Off-White', 'Noir Charcoal'],
                        description: newProdDescription || 'An elegantly cut design tailored directly in our signature boutique fashion house.',
                        fabric: '100% Certified Premium Organic Cotton Fibres',
                        care: 'Dry clean recommended to preserve architectural shapes.'
                      };
                      setProducts(prev => [newProduct, ...prev]);
                      logSimulatedEvent('PRODUCT_ADDED', {
                        product_id: newProduct.id,
                        name: newProduct.name,
                        price_usd: newProduct.price,
                        category: newProduct.category,
                        gender: newProduct.gender,
                        timestamp: new Date().toISOString()
                      });
                      setNewProdName('');
                      setNewProdPrice('');
                      setNewProdDescription('');
                      setUploadedImageUrl(null);
                      setFbToastMsg(`SAVE DESIGN SUCCESSFUL: Added ${newProduct.name} to products!`);
                      setTimeout(() => setFbToastMsg(null), 3500);
                      setShowAddDesignModal(false);
                    }}
                    className="flex-1 bg-neutral-950 border-0 text-white py-2 text-[9px] font-bold tracking-wider uppercase hover:bg-neutral-850 cursor-pointer rounded-xs"
                  >
                    Save Design
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ==================== SECURE PASSCODE DIALOG GATED MODAL OVERLAY ==================== */}
        {showPasscodeDialog && (
          <div className="absolute inset-x-0 bottom-0 top-0 bg-neutral-950/80 flex items-center justify-center p-5 z-50 animate-fade-in">
            <div className="bg-white w-full max-w-[250px] p-4.5 border border-neutral-150 shadow-md text-left rounded-sm animate-scale-up">
              <div className="flex items-center space-x-2 text-neutral-950 mb-2 pb-2 border-b border-neutral-100">
                <Lock size={14} className="text-neutral-900" />
                <span className="text-[10px] font-bold uppercase tracking-widest font-display">Passcode Gate</span>
              </div>
              
              <p className="text-[9.5px] text-neutral-500 font-sans leading-relaxed mb-3.5">
                Querying Cloud Firestore path <code className="bg-neutral-100 px-1 font-mono text-[8px] text-neutral-750">/admin_config/security</code> to validate active passcode.
              </p>

              <div className="space-y-3.5">
                <div>
                  <label className="text-[8px] font-bold text-neutral-450 uppercase tracking-widest block mb-1">Enter 6-Digit PIN</label>
                  <input 
                    type="text"
                    maxLength={6}
                    placeholder="••••••"
                    value={passcodeInput}
                    onChange={(e) => {
                      setPasscodeInput(e.target.value.replace(/\D/g, ''));
                      setPasscodeError(null);
                    }}
                    className="w-full tracking-[8px] text-center font-mono text-xs bg-neutral-50 border border-neutral-250 p-2 text-neutral-950 focus:outline-neutral-900 font-bold"
                  />
                </div>

                {passcodeError && (
                  <p className="text-[9px] text-red-650 font-bold tracking-tight animate-pulse text-center">
                    ⚠️ {passcodeError}
                  </p>
                )}

                <div className="flex space-x-2 pt-0.5">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowPasscodeDialog(false);
                      setPasscodeInput('');
                      setPasscodeError(null);
                    }}
                    className="flex-1 border border-neutral-250 text-neutral-500 py-1.5 text-[9px] font-bold tracking-wider uppercase bg-transparent hover:bg-neutral-50 cursor-pointer rounded-xs"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button"
                    onClick={async () => {
                      if (passcodeInput.length !== 6) {
                        setPasscodeError("Must be 6 digits");
                        return;
                      }
                      
                      // Simulate async Firestore query loading delay
                      setPasscodeError("Verifying with Firestore...");
                      await new Promise(resolve => setTimeout(resolve, 800));
                      
                      if (passcodeInput === fbSecurityPin) {
                        setShowPasscodeDialog(false);
                        setPasscodeInput('');
                        setPasscodeError(null);
                        setAppRole('owner');
                        setIsAdminLoggedIn(true);
                        setActiveTab('profile');
                        setSubView('owner-portal');
                        logSimulatedEvent('ACCESS_GATE_GRANTED', {
                          channel: 'owner_gate_dialog',
                          firestore_path: '/admin_config/security',
                          key_validated: 'access_pin',
                          granted: true
                        });
                        setFbToastMsg("Success: Access Granted to Owner Portal!");
                        setTimeout(() => setFbToastMsg(null), 3000);
                      } else {
                        setPasscodeInput('');
                        setPasscodeError("Access Denied: Invalid Passcode");
                        logSimulatedEvent('ACCESS_GATE_DENIED', {
                          channel: 'owner_gate_dialog',
                          firestore_path: '/admin_config/security',
                          key_validated: 'access_pin',
                          granted: false,
                          reason: 'Invalid passcode input block'
                        });
                      }
                    }}
                    className="flex-1 bg-neutral-950 border-0 text-white py-1.5 text-[9px] font-bold tracking-wider uppercase hover:bg-neutral-850 cursor-pointer rounded-xs"
                  >
                    Verify
                  </button>
                </div>
              </div>
              
              {/* Short Hint */}
              <div className="mt-3.5 pt-2 border-t border-neutral-100 text-[8px] text-neutral-400 text-center font-mono">
                Secret 6-digit owner code is required for secure authentication.
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
