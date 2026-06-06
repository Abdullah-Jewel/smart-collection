import { useState } from 'react';
import { Copy, Check, FileCode, Server, ListCollapse, Bookmark, Cpu, UserCheck, CloudLightning, Activity, Database, Lock } from 'lucide-react';
import { 
  FLUTTER_HOME_CODE, 
  FLUTTER_PDP_CODE, 
  BLUEPRINT_MARKDOWN, 
  MOCK_DATA_JSON,
  FLUTTER_OWNER_PROFILE_CODE,
  FLUTTER_FIREBASE_SERVICE_CODE,
  FLUTTER_ACTIVITY_HISTORY_CODE,
  FIRESTORE_SCHEMA_JSON,
  FLUTTER_MY_ACCOUNT_CODE,
  FLUTTER_OWNER_GATE_DIALOG_CODE,
  ADMIN_CONFIG_SECURITY_JSON
} from '../data/flutterCode';

export default function DocsHub() {
  const [activeTab, setActiveTab] = useState<
    'blueprint' | 'homeCode' | 'pdpCode' | 'jsonData' | 'ownerProfile' | 'firebaseService' | 'activityTimeline' | 'firestoreSchema' | 'accountCode' | 'ownerGateCode' | 'securityConfig'
  >('blueprint');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="w-full bg-white border border-neutral-200 shadow-xs flex flex-col h-[700px] rounded-2xl overflow-hidden">
      {/* Dev Hub Headers */}
      <div className="bg-neutral-50 px-6 py-4.5 border-b border-neutral-100 flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-display font-medium text-xs">
            SH
          </div>
          <div>
            <h3 className="text-sm font-bold font-display tracking-wider text-neutral-900">PREMIUM SPECIFICATION HUB</h3>
            <p className="text-[10px] text-neutral-400 font-mono font-light mt-0.5">d4c54c29-f91b-43ae-9a15</p>
          </div>
        </div>

        {/* Action badges or brief summary */}
        <div className="flex items-center space-x-1 bg-neutral-200/50 text-neutral-600 px-2.5 py-1 text-[9px] font-mono tracking-wider font-semibold rounded-full uppercase">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span>
          <span>FLUTTER DART v3.3.X</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-neutral-200 overflow-x-auto whitespace-nowrap bg-neutral-50/50 no-scrollbar">
        <button
          onClick={() => setActiveTab('blueprint')}
          className={`flex items-center space-x-1.5 px-5 py-3 text-xs font-semibold tracking-wider border-b-2 transition-all shrink-0 ${
            activeTab === 'blueprint' 
              ? 'border-neutral-900 text-neutral-950 bg-white' 
              : 'border-transparent text-neutral-450 hover:bg-neutral-50 hover:text-neutral-900'
          }`}
        >
          <ListCollapse size={13} />
          <span>TECHNICAL BLUEPRINT</span>
        </button>

        <button
          onClick={() => setActiveTab('homeCode')}
          className={`flex items-center space-x-1.5 px-5 py-3 text-xs font-semibold tracking-wider border-b-2 transition-all shrink-0 ${
            activeTab === 'homeCode' 
              ? 'border-neutral-900 text-neutral-950 bg-white' 
              : 'border-transparent text-neutral-450 hover:bg-neutral-50 hover:text-neutral-900'
          }`}
        >
          <FileCode size={13} className="text-blue-500" />
          <span>FLUTTER HOME SCREEN</span>
        </button>

        <button
          onClick={() => setActiveTab('pdpCode')}
          className={`flex items-center space-x-1.5 px-5 py-3 text-xs font-semibold tracking-wider border-b-2 transition-all shrink-0 ${
            activeTab === 'pdpCode' 
              ? 'border-neutral-900 text-neutral-955 bg-white' 
              : 'border-transparent text-neutral-450 hover:bg-neutral-50 hover:text-neutral-900'
          }`}
        >
          <FileCode size={13} className="text-amber-500" />
          <span>FLUTTER DETAIL SCREEN</span>
        </button>

        <button
          onClick={() => setActiveTab('jsonData')}
          className={`flex items-center space-x-1.5 px-5 py-3 text-xs font-semibold tracking-wider border-b-2 transition-all shrink-0 ${
            activeTab === 'jsonData' 
              ? 'border-neutral-900 text-neutral-955 bg-white' 
              : 'border-transparent text-neutral-455 hover:bg-neutral-50 hover:text-neutral-900'
          }`}
        >
          <Server size={13} />
          <span>MOCK CATALOG JSON</span>
        </button>

        <button
          onClick={() => setActiveTab('ownerProfile')}
          className={`flex items-center space-x-1.5 px-5 py-3 text-xs font-semibold tracking-wider border-b-2 transition-all shrink-0 ${
            activeTab === 'ownerProfile' 
              ? 'border-neutral-900 text-neutral-955 bg-white' 
              : 'border-transparent text-neutral-455 hover:bg-neutral-50 hover:text-neutral-900'
          }`}
        >
          <UserCheck size={13} className="text-emerald-500" />
          <span>OWNER PROFILE SCREEN</span>
        </button>

        <button
          onClick={() => setActiveTab('firebaseService')}
          className={`flex items-center space-x-1.5 px-5 py-3 text-xs font-semibold tracking-wider border-b-2 transition-all shrink-0 ${
            activeTab === 'firebaseService' 
              ? 'border-neutral-900 text-neutral-955 bg-white' 
              : 'border-transparent text-neutral-455 hover:bg-neutral-50 hover:text-neutral-900'
          }`}
        >
          <CloudLightning size={13} className="text-violet-500" />
          <span>FIRESTORE LOG SERVICE</span>
        </button>

        <button
          onClick={() => setActiveTab('activityTimeline')}
          className={`flex items-center space-x-1.5 px-5 py-3 text-xs font-semibold tracking-wider border-b-2 transition-all shrink-0 ${
            activeTab === 'activityTimeline' 
              ? 'border-neutral-900 text-neutral-955 bg-white' 
              : 'border-transparent text-neutral-455 hover:bg-neutral-50 hover:text-neutral-900'
          }`}
        >
          <Activity size={13} className="text-red-500" />
          <span>LOG TIMELINE SCREEN</span>
        </button>

        <button
          onClick={() => setActiveTab('firestoreSchema')}
          className={`flex items-center space-x-1.5 px-5 py-3 text-xs font-semibold tracking-wider border-b-2 transition-all shrink-0 ${
            activeTab === 'firestoreSchema' 
              ? 'border-neutral-900 text-neutral-955 bg-white' 
              : 'border-transparent text-neutral-455 hover:bg-neutral-50 hover:text-neutral-900'
          }`}
        >
          <Database size={13} className="text-indigo-500" />
          <span>FIRESTORE JSON SCHEMA</span>
        </button>

        <button
          onClick={() => setActiveTab('accountCode')}
          className={`flex items-center space-x-1.5 px-5 py-3 text-xs font-semibold tracking-wider border-b-2 transition-all shrink-0 ${
            activeTab === 'accountCode' 
              ? 'border-neutral-900 text-neutral-955 bg-white' 
              : 'border-transparent text-neutral-455 hover:bg-neutral-50 hover:text-neutral-900'
          }`}
        >
          <FileCode size={13} className="text-emerald-600" />
          <span>FLUTTER MY ACCOUNT</span>
        </button>

        <button
          onClick={() => setActiveTab('ownerGateCode')}
          className={`flex items-center space-x-1.5 px-5 py-3 text-xs font-semibold tracking-wider border-b-2 transition-all shrink-0 ${
            activeTab === 'ownerGateCode' 
              ? 'border-neutral-900 text-neutral-955 bg-white' 
              : 'border-transparent text-neutral-455 hover:bg-neutral-50 hover:text-neutral-900'
          }`}
        >
          <Lock size={13} className="text-red-500 font-bold" />
          <span>OWNER GATE DIALOG</span>
        </button>

        <button
          onClick={() => setActiveTab('securityConfig')}
          className={`flex items-center space-x-1.5 px-5 py-3 text-xs font-semibold tracking-wider border-b-2 transition-all shrink-0 ${
            activeTab === 'securityConfig' 
              ? 'border-neutral-900 text-neutral-955 bg-white' 
              : 'border-transparent text-neutral-455 hover:bg-neutral-50 hover:text-neutral-900'
          }`}
        >
          <Server size={13} className="text-slate-655" />
          <span>FIRESTORE SECURITY CONFIG</span>
        </button>
      </div>

      {/* Pane Display */}
      <div className="flex-1 overflow-y-auto bg-white p-6 relative">
        
        {/* State Banner: Dynamic visual clipboard notification */}
        {copiedText && (
          <div className="absolute top-4 right-4 bg-neutral-900 text-white text-xs px-3.5 py-2 font-semibold shadow-md flex items-center space-x-1.5 rounded-sm animate-fade-in-down z-50">
            <Check size={13} className="text-green-400" />
            <span>Copied {copiedText} reference!</span>
          </div>
        )}

        {/* 1. Technical Blueprint */}
        {activeTab === 'blueprint' && (
          <div className="prose prose-sm max-w-none text-neutral-600 font-sans space-y-6">
            <div className="bg-neutral-50 border-l-4 border-neutral-900 p-4 mb-6">
              <span className="text-xs font-bold text-neutral-900 tracking-wider flex items-center space-x-1">
                <Bookmark size={12} className="text-neutral-900" />
                <span>DESIGN CONCEPT</span>
              </span>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                "Smart Collection" replicates the clean grid, asymmetrical visual weights, large neutral spaces, and crisp high-contrast headings typical of high-end brands (ASOS, Uniqlo, and Zara). Avoid decorative distractions, colored backgrounds, or curved dividers.
              </p>
            </div>

            {/* Structured Specifications */}
            <div className="space-y-6">
              <section>
                <h4 className="text-xs font-bold tracking-widest text-neutral-950 font-display border-b border-neutral-100 pb-2">1. APP NAVIGATION FLOW</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div className="border border-neutral-150 p-4 rounded-sm bg-neutral-50/50">
                    <span className="text-xs font-semibold text-neutral-900">The 4-Tab Screen Decoupling</span>
                    <ul className="list-disc pl-4 mt-2 space-y-1 text-xs text-neutral-500">
                      <li><strong>Home</strong>: Front banner slider & prompt highlights</li>
                      <li><strong>Categories</strong>: Dual filter collections & lists</li>
                      <li><strong>Favorites/Portal</strong>: Dynamic wishlist for buyers or active studio price tags for the owner</li>
                      <li><strong>Profile</strong>: Active tiers & system setting links</li>
                    </ul>
                  </div>
                  <div className="border border-neutral-150 p-4 rounded-sm bg-neutral-50/50">
                    <span className="text-xs font-semibold text-neutral-900">Interactive Routing Tree (BottomNav)</span>
                    <p className="text-xs text-neutral-500 mt-1 italic font-light leading-relaxed">
                      Main entry holds an indexed state matching current tabs. When subpages are clicked (e.g. details from arrivals carousel), they push stack-frame screens without destroying states.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h4 className="text-xs font-bold tracking-widest text-neutral-950 font-display border-b border-neutral-100 pb-2">2. UI COMPONENT BREAKDOWN</h4>
                <div className="space-y-3.5 mt-3 text-xs text-neutral-500">
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-neutral-900">Hero Section</strong>: Horizontal viewport scaling aspect ratios to ensure premium apparel images compile without stretching.
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-neutral-900">Product listings (PLP)</strong>: Clean double column layouts featuring high-padding cards, category anchors, and heart favorite buttons.
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-neutral-900">Direct Inquire footer (PDP)</strong>: Persistent bottom safety heights matching mobile notches, embedding direct Facebook contact capabilities with url_launcher and instant favorite additions.
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h4 className="text-xs font-bold tracking-widest text-neutral-950 font-display border-b border-neutral-100 pb-2">3. MOBILE PERFORMANCE RECOMMENDATIONS</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-3">
                  <div className="border border-neutral-100 p-3 bg-neutral-50/50">
                    <span className="text-xs font-bold text-neutral-900 block tracking-wider">01 / ENHANCED IMAGES</span>
                    <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                      Utilize cached_network_image for immediate local loading states. Include customized loading layout shimmers.
                    </p>
                  </div>
                  <div className="border border-neutral-100 p-3 bg-neutral-50/50">
                    <span className="text-xs font-bold text-neutral-900 block tracking-wider">02 / LAZY LIST SLIVERS</span>
                    <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                      Avoid loading full lists. Rely on SliverList and SliverGrid to keep system RAM footprint light and preserve battery life.
                    </p>
                  </div>
                  <div className="border border-neutral-100 p-3 bg-neutral-50/50">
                    <span className="text-xs font-bold text-neutral-900 block tracking-wider">03 / INKWELL STATES</span>
                    <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                      Ensure every image or card tap matches physical ripples by wrapping items in custom InkWell structures.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* 2. Flutter Home Screen Source Code */}
        {activeTab === 'homeCode' && (
          <div className="flex flex-col h-full animate-fade-in relative">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-neutral-400 font-mono">/lib/screens/home_screen.dart</span>
              <button
                onClick={() => handleCopyToClipboard(FLUTTER_HOME_CODE, 'Home Screen Dart')}
                className="flex items-center space-x-1 bg-neutral-900 text-white px-3.5 py-1.5 text-xs font-bold tracking-wider hover:bg-neutral-800 transition-colors"
              >
                <Copy size={12} />
                <span>Copy Code</span>
              </button>
            </div>
            <div className="flex-1 bg-neutral-950 font-mono text-[11px] text-neutral-300 p-4.5 rounded-lg overflow-auto max-h-[500px]">
              <pre className="whitespace-pre">{FLUTTER_HOME_CODE}</pre>
            </div>
          </div>
        )}

        {/* 3. Flutter PDP Source Code */}
        {activeTab === 'pdpCode' && (
          <div className="flex flex-col h-full animate-fade-in relative">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-neutral-400 font-mono">/lib/screens/product_detail_screen.dart</span>
              <button
                onClick={() => handleCopyToClipboard(FLUTTER_PDP_CODE, 'PDP Screen Dart')}
                className="flex items-center space-x-1 bg-neutral-900 text-white px-3.5 py-1.5 text-xs font-bold tracking-wider hover:bg-neutral-800 transition-colors"
              >
                <Copy size={12} />
                <span>Copy Code</span>
              </button>
            </div>
            <div className="flex-1 bg-neutral-950 font-mono text-[11px] text-neutral-300 p-4.5 rounded-lg overflow-auto max-h-[500px]">
              <pre className="whitespace-pre">{FLUTTER_PDP_CODE}</pre>
            </div>
          </div>
        )}

        {/* 4. Mock Data Catalog JSON */}
        {activeTab === 'jsonData' && (
          <div className="flex flex-col h-full animate-fade-in relative">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-neutral-400 font-mono">/assets/data/products.json</span>
              <button
                onClick={() => handleCopyToClipboard(MOCK_DATA_JSON, 'Catalog JSON')}
                className="flex items-center space-x-1 bg-neutral-900 text-white px-3.5 py-1.5 text-xs font-bold tracking-wider hover:bg-neutral-800 transition-colors"
              >
                <Copy size={12} />
                <span>Copy JSON</span>
              </button>
            </div>
            <div className="flex-1 bg-neutral-950 font-mono text-[11px] text-neutral-300 p-4.5 rounded-lg overflow-auto max-h-[500px]">
              <pre className="whitespace-pre text-green-400">{MOCK_DATA_JSON}</pre>
            </div>
          </div>
        )}

        {/* 5. Flutter Owner Profile Screen */}
        {activeTab === 'ownerProfile' && (
          <div className="flex flex-col h-full animate-fade-in relative">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-neutral-400 font-mono">/lib/screens/owner_profile_screen.dart</span>
              <button
                onClick={() => handleCopyToClipboard(FLUTTER_OWNER_PROFILE_CODE, 'Owner Profile Screen Dart')}
                className="flex items-center space-x-1 bg-neutral-900 text-white px-3.5 py-1.5 text-xs font-bold tracking-wider hover:bg-neutral-800 transition-colors"
              >
                <Copy size={12} />
                <span>Copy Code</span>
              </button>
            </div>
            <div className="flex-1 bg-neutral-950 font-mono text-[11px] text-neutral-300 p-4.5 rounded-lg overflow-auto max-h-[500px]">
              <pre className="whitespace-pre">{FLUTTER_OWNER_PROFILE_CODE}</pre>
            </div>
          </div>
        )}

        {/* 6. Firebase Activity History Logic Service */}
        {activeTab === 'firebaseService' && (
          <div className="flex flex-col h-full animate-fade-in relative">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-neutral-400 font-mono">/lib/services/activity_service.dart</span>
              <button
                onClick={() => handleCopyToClipboard(FLUTTER_FIREBASE_SERVICE_CODE, 'Activity Service Dart')}
                className="flex items-center space-x-1 bg-neutral-900 text-white px-3.5 py-1.5 text-xs font-bold tracking-wider hover:bg-neutral-800 transition-colors"
              >
                <Copy size={12} />
                <span>Copy Code</span>
              </button>
            </div>
            <div className="flex-1 bg-neutral-950 font-mono text-[11px] text-neutral-300 p-4.5 rounded-lg overflow-auto max-h-[500px]">
              <pre className="whitespace-pre text-indigo-300">{FLUTTER_FIREBASE_SERVICE_CODE}</pre>
            </div>
          </div>
        )}

        {/* 7. "Activity History" Navigation Screen */}
        {activeTab === 'activityTimeline' && (
          <div className="flex flex-col h-full animate-fade-in relative">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-neutral-400 font-mono">/lib/screens/activity_history_screen.dart</span>
              <button
                onClick={() => handleCopyToClipboard(FLUTTER_ACTIVITY_HISTORY_CODE, 'Activity History Screen Dart')}
                className="flex items-center space-x-1 bg-neutral-900 text-white px-3.5 py-1.5 text-xs font-bold tracking-wider hover:bg-neutral-800 transition-colors"
              >
                <Copy size={12} />
                <span>Copy Code</span>
              </button>
            </div>
            <div className="flex-1 bg-neutral-950 font-mono text-[11px] text-neutral-300 p-4.5 rounded-lg overflow-auto max-h-[500px]">
              <pre className="whitespace-pre">{FLUTTER_ACTIVITY_HISTORY_CODE}</pre>
            </div>
          </div>
        )}

        {/* 8. Firestore Collection JSON Schema */}
        {activeTab === 'firestoreSchema' && (
          <div className="flex flex-col h-full animate-fade-in relative">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-neutral-400 font-mono">firestore-schema-blueprint.json</span>
              <button
                onClick={() => handleCopyToClipboard(FIRESTORE_SCHEMA_JSON, 'Firestore JSON Schema')}
                className="flex items-center space-x-1 bg-neutral-900 text-white px-3.5 py-1.5 text-xs font-bold tracking-wider hover:bg-neutral-800 transition-colors"
              >
                <Copy size={12} />
                <span>Copy Schema</span>
              </button>
            </div>
            <div className="flex-1 bg-neutral-950 font-mono text-[11px] text-neutral-300 p-4.5 rounded-lg overflow-auto max-h-[500px]">
              <pre className="whitespace-pre text-emerald-400">{FIRESTORE_SCHEMA_JSON}</pre>
            </div>
          </div>
        )}

        {/* 9. Flutter My Account Screen */}
        {activeTab === 'accountCode' && (
          <div className="flex flex-col h-full animate-fade-in relative">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-neutral-400 font-mono">/lib/screens/my_account_screen.dart</span>
              <button
                onClick={() => handleCopyToClipboard(FLUTTER_MY_ACCOUNT_CODE, 'My Account Screen Dart')}
                className="flex items-center space-x-1 bg-neutral-900 text-white px-3.5 py-1.5 text-xs font-bold tracking-wider hover:bg-neutral-800 transition-colors"
              >
                <Copy size={12} />
                <span>Copy Code</span>
              </button>
            </div>
            <div className="flex-1 bg-neutral-950 font-mono text-[11px] text-neutral-300 p-4.5 rounded-lg overflow-auto max-h-[500px]">
              <pre className="whitespace-pre text-blue-300">{FLUTTER_MY_ACCOUNT_CODE}</pre>
            </div>
          </div>
        )}

        {/* 10. Owner Passcode Gate Dialog */}
        {activeTab === 'ownerGateCode' && (
          <div className="flex flex-col h-full animate-fade-in relative">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-neutral-400 font-mono">/lib/widgets/owner_gate_dialog.dart</span>
              <button
                onClick={() => handleCopyToClipboard(FLUTTER_OWNER_GATE_DIALOG_CODE, 'Owner Gate Dialog Dart')}
                className="flex items-center space-x-1 bg-neutral-900 text-white px-3.5 py-1.5 text-xs font-bold tracking-wider hover:bg-neutral-800 transition-colors"
              >
                <Copy size={12} />
                <span>Copy Code</span>
              </button>
            </div>
            <div className="flex-1 bg-neutral-950 font-mono text-[11px] text-neutral-300 p-4.5 rounded-lg overflow-auto max-h-[500px]">
              <pre className="whitespace-pre text-amber-200">{FLUTTER_OWNER_GATE_DIALOG_CODE}</pre>
            </div>
          </div>
        )}

        {/* 11. Firestore Master Security Config Document JSON */}
        {activeTab === 'securityConfig' && (
          <div className="flex flex-col h-full animate-fade-in relative">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-neutral-400 font-mono">/firestore/admin_config_security.json</span>
              <button
                onClick={() => handleCopyToClipboard(ADMIN_CONFIG_SECURITY_JSON, 'Firestore Security JSON Document')}
                className="flex items-center space-x-1 bg-neutral-900 text-white px-3.5 py-1.5 text-xs font-bold tracking-wider hover:bg-neutral-800 transition-colors"
              >
                <Copy size={12} />
                <span>Copy Document Map</span>
              </button>
            </div>
            <div className="flex-1 bg-neutral-950 font-mono text-[11px] text-neutral-300 p-4.5 rounded-lg overflow-auto max-h-[500px]">
              <pre className="whitespace-pre text-rose-300">{ADMIN_CONFIG_SECURITY_JSON}</pre>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
