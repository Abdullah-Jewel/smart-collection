import React, { useState } from 'react';
import PhoneEmulator from './components/PhoneEmulator';
import DocsHub from './components/DocsHub';
import { Product, CartItem } from './types';
import { Smartphone, BookOpen, Sparkles, Sliders, Layers } from 'lucide-react';

export default function App() {
  const [activeWorkspaceView, setActiveView] = useState<'both' | 'phone' | 'hub'>('both');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>(['men-01', 'women-01']);

  const handleSelectProductDocs = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen bg-neutral-100/60 text-neutral-800 font-sans flex flex-col justify-between">
      
      {/* Workspace Top Bar */}
      <header className="bg-white border-b border-neutral-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-3xs">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-neutral-900 text-white rounded-lg shadow-sm">
            <LayoutIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold">Workspace Hub</span>
              <span className="bg-neutral-100 text-neutral-800 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full">v1.1</span>
            </div>
            <h1 className="text-xl font-bold font-display tracking-tight text-neutral-950">SMART COLLECTION</h1>
          </div>
        </div>

        {/* Workspace responsive layout buttons */}
        <div className="flex items-center bg-neutral-150 p-1.2 rounded-lg gap-1 border border-neutral-200/50">
          <button
            onClick={() => setActiveView('both')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all duration-200 flex items-center space-x-1.5 ${
              activeWorkspaceView === 'both' 
                ? 'bg-white text-neutral-950 shadow-3xs' 
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Full Workspace</span>
          </button>
          
          <button
            onClick={() => setActiveView('phone')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all duration-200 flex items-center space-x-1.5 ${
              activeWorkspaceView === 'phone' 
                ? 'bg-white text-neutral-950 shadow-3xs' 
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-blue-500" />
            <span>Interactive Phone</span>
          </button>

          <button
            onClick={() => setActiveView('hub')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all duration-200 flex items-center space-x-1.5 ${
              activeWorkspaceView === 'hub' 
                ? 'bg-white text-neutral-950 shadow-3xs' 
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>Specifications Hub</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 flex items-center justify-center">
        
        <div className={`w-full grid gap-8 ${
          activeWorkspaceView === 'both' 
            ? 'grid-cols-1 lg:grid-cols-12 items-start' 
            : 'grid-cols-1 justify-items-center max-w-5xl'
        }`}>
          
          {/* LEFT COLUMN: Physical iOS/Android Smartphone Emulator with active React app */}
          {(activeWorkspaceView === 'both' || activeWorkspaceView === 'phone') && (
            <div className={`${activeWorkspaceView === 'both' ? 'lg:col-span-5' : 'w-full'} flex flex-col items-center justify-center space-y-4`}>
              
              {/* Context Tagline */}
              <div className="text-center">
                <p className="text-xs text-neutral-500 tracking-wide font-light flex items-center justify-center gap-1">
                  <Smartphone size={12} className="text-neutral-400" />
                  <span>Interactive High-Fidelity Mobile Simulation</span>
                </p>
                <p className="text-[10px] text-neutral-400 mt-0.5">Browse designs, manage your favorites list, and tap Message on Facebook to enquire offline!</p>
              </div>

              {/* Dynamic Phone Container */}
              <div className="relative p-1">
                <PhoneEmulator 
                  onSelectProductDocs={handleSelectProductDocs}
                  cart={cart}
                  setCart={setCart}
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              </div>

            </div>
          )}

          {/* RIGHT COLUMN: Premium interactive specs panel, Flutter code exporters, database files */}
          {(activeWorkspaceView === 'both' || activeWorkspaceView === 'hub') && (
            <div className={`${activeWorkspaceView === 'both' ? 'lg:col-span-7' : 'w-full'} flex flex-col space-y-4`}>
              
              {/* Brief tip referencing active selection on phone */}
              <div className="bg-white border border-neutral-200 px-5 py-3.5 flex items-center justify-between shadow-3xs rounded-xl">
                <div className="flex items-center space-x-3.5 min-w-0">
                  <div className="p-2.5 bg-neutral-100 rounded-lg text-neutral-900 shrink-0">
                    <Sparkles className="w-4.5 h-4.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold block">Developer Workspace tip</span>
                    {selectedProduct ? (
                      <p className="text-xs text-neutral-700 font-medium truncate mt-0.5">
                        Selected: <span className="text-neutral-950 font-bold">{selectedProduct.name}</span> (${selectedProduct.price})
                      </p>
                    ) : (
                      <p className="text-xs text-neutral-500 font-light mt-0.5">
                        Click apparel on the phone layout to sync spec telemetry!
                      </p>
                    )}
                  </div>
                </div>

                {selectedProduct && (
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="text-[10px] bg-neutral-100 hover:bg-neutral-200 text-neutral-600 px-2 py-1 rounded-sm uppercase tracking-wide font-semibold shrink-0 transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Docs Specification Hub */}
              <DocsHub />

            </div>
          )}

        </div>

      </main>

      {/* Styled Footer */}
      <footer className="bg-white border-t border-neutral-200 px-6 py-4.5 text-center text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center space-x-1.5 text-xs">
            <span className="font-semibold text-neutral-900">Smart Collection Studio</span>
            <span className="text-neutral-400">|</span>
            <span className="font-light">ZARA & ASOS Minimalist Styling Spec Board</span>
          </div>
          <p className="text-[11px] font-light text-neutral-400">
            Completed: June 2026. Code assets compilable for Flutter BottomNavigationBar environments.
          </p>
        </div>
      </footer>

    </div>
  );
}

function LayoutIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}
