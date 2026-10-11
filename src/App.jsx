import React, { useState, useEffect } from 'react';
import './App.css';
import { Header } from './components/Header';
import { MobileNav } from './components/MobileNav';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { ProductCard } from './components/ProductCard';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ShopGrid } from './components/ShopGrid';
import { ShopDetailView } from './components/ShopDetailView';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';
import { ProfileView } from './components/ProfileView';
import { WishlistModal } from './components/WishlistModal';
import { FirebaseConfigModal } from './components/FirebaseConfigModal';
import { DistrictSelector } from './components/DistrictSelector';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

import { useDistrict } from './context/DistrictContext';
import { useCart } from './context/CartContext';
import { dbService } from './services/db';

import { ArrowRight, Flame, Sparkles, Store, MapPin, Package, ShieldCheck, RefreshCw } from 'lucide-react';

export function App() {
  const { selectedDistrict, changeDistrict } = useDistrict();
  const { setIsCartOpen } = useCart();

  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'explore' | 'shops' | 'shopDetail'
  const [selectedShopId, setSelectedShopId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [firebaseModalOpen, setFirebaseModalOpen] = useState(false);

  // Load initial dynamic data from dbService
  useEffect(() => {
    loadData();
  }, [selectedDistrict]);

  const loadData = async () => {
    const prods = await dbService.getProducts();
    const shps = await dbService.getShops();
    setProducts(prods);
    setShops(shps);
    setRecentlyViewed(dbService.getRecentViews());
  };

  const handleOpenProductDetails = (product) => {
    setSelectedProduct(product);
    dbService.addRecentView(product);
    setRecentlyViewed(dbService.getRecentViews());
  };

  const handleOpenShop = (shopId) => {
    setSelectedShopId(shopId);
    setActiveTab('shopDetail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategoryFromHero = (categoryId) => {
    setActiveCategory(categoryId);
    setActiveTab('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderPlaced = (order) => {
    setConfirmedOrder(order);
    loadData(); // refresh stocks
  };

  const activeShop = shops.find(s => s.id === selectedShopId);

  // Filtered lists for Home sections
  const trendingProducts = products.filter(p => p.isTrending || p.badge === 'Trending Now').slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);
  const popularInKerala = products.filter(p => p.isPopularInKerala).slice(0, 4);
  const featuredShops = shops.filter(s => s.featured || s.popular).slice(0, 3);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main View Router */}
      <main style={{ flex: 1 }}>
        {/* VIEW 1: HOMEPAGE */}
        {activeTab === 'home' && (
          <div>
            {/* 1. Main Hero Section */}
            <Hero
              onShopNow={() => {
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreShops={() => {
                setActiveTab('shops');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 2. Shop by Category */}
            <CategorySection onSelectCategory={handleSelectCategoryFromHero} />

            {/* 3. Trending Now */}
            <section style={{ padding: '2rem 0 3.5rem' }}>
              <div className="container">
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#e63946', fontWeight: '800', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                      <Flame size={15} />
                      <span>HOT IN KERALA</span>
                    </div>
                    <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: '800' }}>
                      Trending Now
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('explore');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--primary-purple)' }}
                  >
                    View All Drops →
                  </button>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1rem'
                }} className="home-prods-grid">
                  {trendingProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onOpenDetails={handleOpenProductDetails}
                      onOpenShop={handleOpenShop}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 4. Discover Local Shops Showcase */}
            <section style={{ padding: '3.5rem 0', backgroundColor: 'rgba(255, 255, 255, 0.72)', backdropFilter: 'blur(10px)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
              <div className="container">
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  <div>
                    <span className="drip-badge badge-mint-subtle" style={{ marginBottom: '0.35rem' }}>
                      AUTHENTIC STOREFRONTS
                    </span>
                    <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: '800' }}>
                      Discover Local Kerala Shops
                    </h2>
                    <p style={{ fontSize: '0.9rem', color: 'var(--muted-text)', marginTop: '0.2rem' }}>
                      Support independent streetwear labels, sneaker lounges, and curated thrift spots across Kerala.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('shops');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="btn-secondary"
                    style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem' }}
                  >
                    <span>Explore All Kerala Shops</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                {/* Top 3 Featured Shops */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {featuredShops.map((shop) => (
                    <div
                      key={shop.id}
                      onClick={() => handleOpenShop(shop.id)}
                      style={{
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        border: '1px solid var(--border-medium)',
                        backgroundColor: 'var(--warm-off-white)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                      }}
                      className="shop-card"
                    >
                      <div style={{ height: '140px', position: 'relative' }}>
                        <img src={shop.banner} alt={shop.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{
                          position: 'absolute',
                          top: '0.75rem',
                          right: '0.75rem',
                          background: 'rgba(14, 14, 14, 0.8)',
                          color: '#FFFFFF',
                          padding: '0.25rem 0.65rem',
                          borderRadius: 'var(--radius-pill)',
                          fontSize: '0.7rem',
                          fontWeight: '700'
                        }}>
                          {shop.districtName || shop.district}
                        </div>
                      </div>

                      <div style={{ padding: '1rem 1.25rem', position: 'relative' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                          <h3 style={{ fontSize: '1.05rem', fontWeight: '800' }}>{shop.name}</h3>
                          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#8A6800' }}>★ {shop.rating}</span>
                        </div>
                        <p style={{ fontSize: '0.78rem', color: 'var(--muted-text)', marginBottom: '0.75rem' }}>
                          {shop.locality} • {shop.category}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', fontWeight: '700' }}>
                          <span style={{ color: 'var(--primary-purple)' }}>{shop.productCount || 18}+ Drops</span>
                          <span>View Shop →</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. New Arrivals Section */}
            <section style={{ padding: '3.5rem 0' }}>
              <div className="container">
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem'
                }}>
                  <div>
                    <span className="drip-badge badge-purple-subtle" style={{ marginBottom: '0.35rem' }}>
                      FRESH DROPS
                    </span>
                    <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: '800' }}>
                      New Arrivals
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('explore');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--primary-purple)' }}
                  >
                    View All →
                  </button>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1rem'
                }} className="home-prods-grid">
                  {newArrivals.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onOpenDetails={handleOpenProductDetails}
                      onOpenShop={handleOpenShop}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 6. Popular in Kerala */}
            <section style={{ padding: '3.5rem 0', backgroundColor: 'rgba(255, 255, 255, 0.72)', backdropFilter: 'blur(10px)', borderTop: '1px solid var(--border-light)' }}>
              <div className="container">
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem'
                }}>
                  <div>
                    <span className="drip-badge badge-pink-subtle" style={{ marginBottom: '0.35rem' }}>
                      COMMUNITY FAVORITES
                    </span>
                    <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: '800' }}>
                      Popular Drops
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('explore');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--primary-purple)' }}
                  >
                    Browse Catalog →
                  </button>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1rem'
                }} className="home-prods-grid">
                  {popularInKerala.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onOpenDetails={handleOpenProductDetails}
                      onOpenShop={handleOpenShop}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 7. Recently Viewed Products (Dynamic) */}
            {recentlyViewed.length > 0 && (
              <section style={{ padding: '3rem 0 4rem' }}>
                <div className="container">
                  <div style={{ marginBottom: '1.25rem' }}>
                    <span className="drip-badge badge-black" style={{ fontSize: '0.65rem', marginBottom: '0.35rem' }}>
                      HISTORY
                    </span>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Recently Viewed Drops</h3>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1rem'
                  }} className="home-prods-grid">
                    {recentlyViewed.slice(0, 4).map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        onOpenDetails={handleOpenProductDetails}
                        onOpenShop={handleOpenShop}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
        )}

        {/* VIEW 2: PRODUCT DISCOVERY CATALOG */}
        {activeTab === 'explore' && (
          <ProductGrid
            products={products}
            onOpenDetails={handleOpenProductDetails}
            onOpenShop={handleOpenShop}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            selectedDistrict={selectedDistrict}
          />
        )}

        {/* VIEW 3: LOCAL SHOPS DISCOVERY */}
        {activeTab === 'shops' && (
          <ShopGrid
            shops={shops}
            onVisitShop={handleOpenShop}
            selectedDistrict={selectedDistrict}
            onChangeDistrict={changeDistrict}
          />
        )}

        {/* VIEW 4: INDIVIDUAL SHOP STOREFRONT */}
        {activeTab === 'shopDetail' && (
          <ShopDetailView
            shop={activeShop}
            products={products}
            onBack={() => setActiveTab('shops')}
            onOpenProductDetails={handleOpenProductDetails}
            onMessageShop={(shop) => {
              setChatInitialShop(shop);
              setChatModalOpen(true);
            }}
          />
        )}

        {/* VIEW 5: USER PROFILE PAGE */}
        {activeTab === 'profile' && (
          <ProfileView
            onTrackOrder={(order) => setTrackingOrder(order)}
            onOpenFirebaseSettings={() => setFirebaseModalOpen(true)}
            onOpenProductDetails={handleOpenProductDetails}
            onNavigateHome={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateDrops={() => {
              setActiveTab('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigateExplore={() => {
          setActiveTab('explore');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateShops={() => {
          setActiveTab('shops');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Fixed Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Modals & Slide-overs */}
      <DistrictSelector />
      
      <CartDrawer
        onProceedToCheckout={() => setCheckoutModalOpen(true)}
      />

      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        onOrderPlaced={handleOrderPlaced}
      />

      <OrderSuccessModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        onTrackOrder={(order) => setTrackingOrder(order)}
      />

      <OrderTrackingModal
        order={trackingOrder}
        onClose={() => setTrackingOrder(null)}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectProduct={handleOpenProductDetails}
        onSelectShop={handleOpenShop}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenShop={handleOpenShop}
        onDirectCheckout={() => setCheckoutModalOpen(true)}
      />

      <AuthModal />

      <ProfileModal
        onTrackOrder={(order) => setTrackingOrder(order)}
        onOpenFirebaseSettings={() => setFirebaseModalOpen(true)}
      />

      <WishlistModal
        products={products}
        onOpenProductDetails={handleOpenProductDetails}
      />

      <FirebaseConfigModal
        isOpen={firebaseModalOpen}
        onClose={() => setFirebaseModalOpen(false)}
      />

      <Toast />

      {/* Responsive Grid Helpers */}
      <style>{`
        @media (min-width: 768px) {
          .home-prods-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
