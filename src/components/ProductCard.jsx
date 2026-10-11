import React from 'react';
import { Heart, Plus, Store, Star } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product, onOpenDetails, onOpenShop }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    const defaultSize = product.sizes ? product.sizes[0] : 'Free Size';
    const defaultColor = product.colors ? product.colors[0] : { name: 'Standard', hex: '#000' };
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleShopClick = (e) => {
    e.stopPropagation();
    if (onOpenShop) {
      onOpenShop(product.shopId);
    }
  };

  return (
    <div
      onClick={() => onOpenDetails(product)}
      style={{
        backgroundColor: 'transparent',
        borderRadius: '0px',
        border: 'none',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
        boxShadow: 'none',
        transition: 'opacity 0.2s ease'
      }}
      className="product-card"
    >
      {/* Top Image Container - Sharp 2px editorial framing */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1 / 1.2',
        backgroundColor: '#EBE7E0',
        borderRadius: 'var(--radius-xs)',
        overflow: 'hidden',
        border: '1px solid rgba(14, 14, 14, 0.06)'
      }}>
        <img
          src={product.images[0]}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="prod-img"
          loading="lazy"
        />

        {/* Badges: Discount & Status */}
        <div style={{
          position: 'absolute',
          top: '0.5rem',
          left: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          zIndex: 2
        }}>
          {product.discountPercentage && (
            <span className="drip-badge badge-black" style={{ fontSize: '0.62rem', padding: '0.15rem 0.45rem', borderRadius: 'var(--radius-xs)' }}>
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.badge && (
            <span className="drip-badge badge-purple-subtle" style={{ fontSize: '0.6rem', padding: '0.12rem 0.4rem', borderRadius: 'var(--radius-xs)' }}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Button - Sleek square/subtle icon */}
        <button
          onClick={handleWishlistToggle}
          style={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            width: '30px',
            height: '30px',
            borderRadius: 'var(--radius-xs)',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(14, 14, 14, 0.08)',
            zIndex: 2,
            transition: 'background-color 0.15s ease'
          }}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart 
            size={15} 
            color={isFavorited ? 'var(--accent-pink)' : 'var(--deep-black)'} 
            fill={isFavorited ? 'var(--accent-pink)' : 'none'} 
          />
        </button>

        {/* Quick Add To Cart Button - Restrained editorial 2px button */}
        <button
          onClick={handleQuickAdd}
          style={{
            position: 'absolute',
            bottom: '0.5rem',
            right: '0.5rem',
            height: '30px',
            padding: '0 0.75rem',
            borderRadius: 'var(--radius-xs)',
            backgroundColor: 'var(--deep-black)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontSize: '0.72rem',
            fontWeight: '700',
            letterSpacing: '0.02em',
            border: '1px solid var(--deep-black)',
            zIndex: 2,
            transition: 'all 0.18s ease'
          }}
          className="quick-add-btn"
          title="Quick Add"
        >
          <Plus size={13} />
          <span>ADD</span>
        </button>
      </div>

      {/* Product Details Section - Connected through whitespace & typography */}
      <div style={{
        padding: '0.65rem 0.1rem 0.25rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between'
      }}>
        <div>
          {/* Shop Name & District */}
          <div 
            onClick={handleShopClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.7rem',
              color: 'var(--muted-text)',
              marginBottom: '0.25rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.03em'
            }}
            title={`Sold by ${product.shopName}`}
          >
            <Store size={11} color="var(--primary-purple)" />
            <span style={{ 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap',
              color: 'var(--deep-black)'
            }}>
              {product.shopName}
            </span>
            <span>•</span>
            <span>{product.district}</span>
          </div>

          {/* Product Title */}
          <h3 style={{
            fontSize: '0.88rem',
            fontWeight: '600',
            color: 'var(--deep-black)',
            lineHeight: 1.35,
            marginBottom: '0.35rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {product.name}
          </h3>
        </div>

        {/* Price & Rating Row */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.45rem',
            marginBottom: '0.15rem'
          }}>
            <span style={{
              fontSize: '1rem',
              fontWeight: '800',
              fontFamily: 'var(--font-heading)',
              color: 'var(--deep-black)'
            }}>
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span style={{
                fontSize: '0.75rem',
                color: 'var(--light-muted)',
                textDecoration: 'line-through'
              }}>
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.7rem', color: 'var(--muted-text)' }}>
              <Star size={11} fill="#FFB800" color="#FFB800" />
              <span style={{ fontWeight: '700', color: 'var(--deep-black)' }}>{product.rating}</span>
              <span>({product.reviewCount})</span>
            </div>

            {product.stock <= 10 && (
              <span style={{ fontSize: '0.65rem', color: '#e63946', fontWeight: '700', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                Only {product.stock} Left
              </span>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .product-card:hover .prod-img {
          transform: scale(1.03);
        }
        .quick-add-btn:hover {
          background-color: var(--primary-purple) !important;
          border-color: var(--primary-purple) !important;
        }
      `}</style>
    </div>
  );
};
