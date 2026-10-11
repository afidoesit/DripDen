import React from 'react';
import { Home, Layers, Store, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const MobileNav = ({ activeTab, setActiveTab }) => {
  const { cartCount, setIsCartOpen } = useCart();
  const { currentUser, setIsAuthModalOpen, setIsProfileModalOpen } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Drips', icon: Layers },
    { id: 'shops', label: 'Shops', icon: Store, badge: 'Local' },
    { id: 'cart', label: 'Cart', icon: ShoppingBag, count: cartCount },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const handleNavClick = (id) => {
    if (id === 'cart') {
      setIsCartOpen(true);
    } else if (id === 'profile') {
      setActiveTab('profile');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveTab(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: 'var(--mobile-nav-height)',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(14, 14, 14, 0.08)',
      zIndex: 850,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '0 0.5rem',
      boxShadow: '0 -4px 16px rgba(14, 14, 14, 0.03)'
    }} className="mobile-nav-container">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.2rem',
              height: '100%',
              position: 'relative',
              color: isActive ? 'var(--deep-black)' : 'var(--muted-text)',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ position: 'relative' }}>
              <Icon 
                size={20} 
                strokeWidth={isActive ? 2.4 : 1.8} 
                color={isActive ? 'var(--primary-purple)' : 'currentColor'} 
              />
              {item.count > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-8px',
                  background: 'var(--accent-pink)',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  fontSize: '0.55rem',
                  fontWeight: '800',
                  minWidth: '14px',
                  height: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 2px'
                }}>
                  {item.count}
                </span>
              )}
            </div>
            
            <span style={{
              fontSize: 'clamp(0.58rem, 2.2vw, 0.68rem)',
              fontWeight: isActive ? '700' : '500',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap'
            }}>
              {item.label}
            </span>

            {isActive && (
              <span style={{
                position: 'absolute',
                top: 0,
                width: '16px',
                height: '3px',
                background: 'var(--primary-purple)',
                borderRadius: '0 0 4px 4px'
              }} />
            )}
          </button>
        );
      })}

      <style>{`
        @media (min-width: 860px) {
          .mobile-nav-container {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};
