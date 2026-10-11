import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export const WishlistModal = ({ products, onOpenProductDetails }) => {
  const { wishlistIds, toggleWishlist, isWishlistModalOpen, setIsWishlistModalOpen } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistModalOpen) return null;

  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));

  const handleMoveToCart = (product) => {
    const defaultSize = product.sizes ? product.sizes[0] : 'Standard';
    const defaultColor = product.colors ? product.colors[0] : { name: 'Standard', hex: '#000' };
    addToCart(product, defaultSize, defaultColor, 1);
    toggleWishlist(product.id);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsWishlistModalOpen(false)} style={{ zIndex: 1250 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          maxWidth: '640px', 
          width: '95%',
          maxHeight: '90vh',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid var(--border-light)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Heart size={18} color="var(--accent-pink)" fill="var(--accent-pink)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Your Saved Drips</h3>
            <span className="drip-badge badge-black" style={{ fontSize: '0.65rem' }}>
              {wishlistProducts.length}
            </span>
          </div>

          <button
            onClick={() => setIsWishlistModalOpen(false)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-xs)',
              background: 'var(--warm-off-white)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          paddingRight: '0.25rem'
        }}>
          {wishlistProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
              <Heart size={36} color="var(--light-muted)" style={{ margin: '0 auto 0.75rem' }} />
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.35rem' }}>
                Your wishlist is empty
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-text)' }}>
                Tap the heart on any drop to save it for later.
              </p>
            </div>
          ) : (
            wishlistProducts.map((p) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-xs)',
                  background: 'var(--warm-off-white)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <img
                  src={p.images[0]}
                  alt={p.name}
                  onClick={() => {
                    setIsWishlistModalOpen(false);
                    onOpenProductDetails(p);
                  }}
                  style={{
                    width: '64px',
                    height: '76px',
                    borderRadius: 'var(--radius-xs)',
                    objectFit: 'cover',
                    cursor: 'pointer'
                  }}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    onClick={() => {
                      setIsWishlistModalOpen(false);
                      onOpenProductDetails(p);
                    }}
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: '700',
                      color: 'var(--deep-black)',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {p.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted-text)', marginTop: '0.15rem' }}>
                    {p.shopName} • <span style={{ textTransform: 'capitalize' }}>{p.district}</span>
                  </div>
                  <div style={{
                    fontSize: '0.95rem',
                    fontWeight: '800',
                    fontFamily: 'var(--font-heading)',
                    marginTop: '0.25rem'
                  }}>
                    ₹{p.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', alignItems: 'flex-end' }}>
                  <button
                    onClick={() => handleMoveToCart(p)}
                    className="btn-primary"
                    style={{ padding: '0.45rem 0.85rem', fontSize: '0.75rem', borderRadius: 'var(--radius-xs)', letterSpacing: '0.02em', textTransform: 'uppercase' }}
                  >
                    <ShoppingBag size={13} />
                    <span>Move to Cart</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(p.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.72rem',
                      color: 'var(--muted-text)'
                    }}
                  >
                    <Trash2 size={13} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
