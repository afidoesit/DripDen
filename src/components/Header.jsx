import React from 'react';
import { useDistrict } from '../context/DistrictContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { MapPin, Search, Heart, ShoppingBag, User, ChevronDown, Sparkles } from 'lucide-react';

export const Header = ({ activeTab, setActiveTab, onOpenSearch }) => {
  const { currentDistrictObj, setIsSelectorOpen } = useDistrict();
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistModalOpen } = useWishlist();
  const { currentUser, setIsAuthModalOpen, setIsProfileModalOpen } = useAuth();

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 900,
      backgroundColor: 'transparent',
      background: 'transparent',
      border: 'none',
      boxShadow: 'none',
      padding: '0.75rem 0',
      transition: 'all 0.2s ease',
      width: '100%'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '100%',
        padding: '0 clamp(1rem, 2.5vw, 2.25rem)',
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem'
      }}>
        {/* Top Left: Brand Logo & Kerala District Selector Capsules */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
          {/* Logo Capsule */}
          <button 
            onClick={() => setActiveTab('home')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              textAlign: 'left',
              background: '#FFFFFF',
              border: '1px solid rgba(14, 14, 14, 0.08)',
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-pill)',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06)',
              cursor: 'pointer'
            }}
            title="DripDen Home"
          >
            <img 
              src="/dripden_logo_black.png" 
              alt="DRIPDEN" 
              style={{ height: '22px', width: 'auto', objectFit: 'contain' }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'inline-block';
              }}
            />
            <span style={{ 
              display: 'none', 
              fontFamily: 'var(--font-heading)', 
              fontWeight: '900', 
              fontSize: '1.3rem', 
              letterSpacing: '-0.04em' 
            }}>
              DRIPDEN<span style={{ color: 'var(--primary-purple)' }}>.</span>
            </span>
          </button>

          {/* Location Selector Capsule */}
          <button
            onClick={() => setIsSelectorOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-pill)',
              background: '#FFFFFF',
              border: '1px solid rgba(14, 14, 14, 0.08)',
              fontSize: '0.82rem',
              fontWeight: '600',
              color: 'var(--deep-black)',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.05)',
              cursor: 'pointer'
            }}
            title="Switch Kerala District"
          >
            <MapPin size={14} color="var(--primary-purple)" />
            <span style={{ maxWidth: 'clamp(70px, 20vw, 130px)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {currentDistrictObj.name}
            </span>
            <ChevronDown size={14} color="var(--muted-text)" />
          </button>
        </div>

        {/* Center: Desktop Navigation Links Floating Capsule (Home, Drips, Shops) */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '0.25rem',
          background: '#FFFFFF',
          border: '1px solid rgba(14, 14, 14, 0.08)',
          padding: '0.3rem 0.45rem',
          borderRadius: 'var(--radius-pill)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
        }} className="desktop-nav">
          {[
            { id: 'home', label: 'Home' },
            { id: 'explore', label: 'Drips' },
            { id: 'shops', label: 'Shops' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  fontWeight: isActive ? '700' : '600',
                  color: isActive ? '#FFFFFF' : 'var(--muted-text)',
                  background: isActive ? 'var(--deep-black)' : 'transparent',
                  borderRadius: 'var(--radius-pill)',
                  padding: '0.45rem 1rem',
                  fontSize: '0.88rem',
                  transition: 'all 0.18s ease'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Top Right: Action Icons (Search, Wishlist, Cart, Profile Capsules) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Search Trigger Capsule */}
          <button
            onClick={onOpenSearch}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#FFFFFF',
              border: '1px solid rgba(14, 14, 14, 0.08)',
              padding: '0.45rem 0.95rem',
              borderRadius: 'var(--radius-pill)',
              color: 'var(--muted-text)',
              fontSize: '0.85rem',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.05)',
              cursor: 'pointer'
            }}
          >
            <Search size={16} color="var(--deep-black)" />
            <span style={{ display: 'none' }} className="desktop-search-text">Search clothes, local shops...</span>
          </button>

          {/* Wishlist Capsule - desktop only */}
          <button
            onClick={() => setIsWishlistModalOpen(true)}
            className="desktop-only-btn"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1px solid rgba(14, 14, 14, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.05)'
            }}
            title="Wishlist"
          >
            <Heart size={18} color="var(--deep-black)" />
            {wishlistCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-3px',
                right: '-3px',
                background: 'var(--accent-pink)',
                color: '#FFFFFF',
                borderRadius: '50%',
                fontSize: '0.62rem',
                fontWeight: '800',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon Capsule - desktop only */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="desktop-only-btn"
            style={{
              height: '42px',
              padding: '0 1rem',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--deep-black)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
              border: 'none',
              position: 'relative'
            }}
            title="Shopping Cart"
          >
            <ShoppingBag size={17} color="#FFFFFF" />
            <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>
              {cartCount}
            </span>
          </button>

          {/* Profile / Account Capsule - desktop only */}
          <button
            onClick={() => {
              setActiveTab('profile');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="desktop-only-btn"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: activeTab === 'profile' ? 'var(--deep-black)' : '#FFFFFF',
              border: '1px solid rgba(14, 14, 14, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.05)',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
            title={currentUser ? currentUser.displayName : "My Profile"}
          >
            {currentUser ? (
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: '800',
                fontSize: '0.85rem',
                color: activeTab === 'profile' ? '#FFFFFF' : 'var(--primary-purple)'
              }}>
                {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'U'}
              </span>
            ) : (
              <User size={18} color={activeTab === 'profile' ? '#FFFFFF' : 'var(--deep-black)'} />
            )}
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 860px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-search-text {
            display: inline !important;
          }
        }
        @media (max-width: 859px) {
          .desktop-only-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
