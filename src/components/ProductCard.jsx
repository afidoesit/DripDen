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
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--border-light)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-sm)',
        transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease'
      }}
      className="product-card"
    >
      {/* Top Image Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1 / 1.15',
        backgroundColor: '#F0ECE6',
        overflow: 'hidden'
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
          top: '0.65rem',
          left: '0.65rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem'
        }}>
          {product.discountPercentage && (
            <span className="drip-badge badge-black" style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem' }}>
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.badge && (
            <span className="drip-badge badge-purple-subtle" style={{ fontSize: '0.6rem', padding: '0.15rem 0.45rem', backdropFilter: 'blur(4px)' }}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          style={{
            position: 'absolute',
            top: '0.65rem',
            right: '0.65rem',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
            zIndex: 2
          }}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart 
            size={16} 
            color={isFavorited ? 'var(--accent-pink)' : 'var(--deep-black)'} 
            fill={isFavorited ? 'var(--accent-pink)' : 'none'} 
          />
        </button>

        {/* Quick Add To Cart Button */}
        <button
          onClick={handleQuickAdd}
          style={{
            position: 'absolute',
            bottom: '0.65rem',
            right: '0.65rem',
            height: '34px',
            padding: '0 0.85rem',
            borderRadius: 'var(--radius-pill)',
            backgroundColor: 'var(--deep-black)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.75rem',
            fontWeight: '700',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            zIndex: 2,
            transition: 'all 0.2s ease'
          }}
          className="quick-add-btn"
          title="Quick Add"
        >
          <Plus size={14} />
          <span>Add</span>
        </button>
      </div>

      {/* Product Details Section */}
      <div style={{
        padding: '0.85rem 0.95rem 1rem',
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
              fontSize: '0.72rem',
              color: 'var(--muted-text)',
              marginBottom: '0.35rem',
              fontWeight: '600'
            }}
            title={`Sold by ${product.shopName}`}
          >
            <Store size={12} color="var(--primary-purple)" />
            <span style={{ 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap',
              color: 'var(--deep-black)'
            }}>
              {product.shopName}
            </span>
            <span>•</span>
            <span style={{ textTransform: 'capitalize' }}>{product.district}</span>
          </div>

          {/* Product Title */}
          <h3 style={{
            fontSize: '0.92rem',
            fontWeight: '700',
            color: 'var(--deep-black)',
            lineHeight: 1.3,
            marginBottom: '0.45rem',
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
            gap: '0.5rem',
            marginBottom: '0.2rem'
          }}>
            <span style={{
              fontSize: '1.05rem',
              fontWeight: '800',
              fontFamily: 'var(--font-heading)',
              color: 'var(--deep-black)'
            }}>
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span style={{
                fontSize: '0.78rem',
                color: 'var(--light-muted)',
                textDecoration: 'line-through'
              }}>
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.72rem', color: 'var(--muted-text)' }}>
              <Star size={12} fill="#FFB800" color="#FFB800" />
              <span style={{ fontWeight: '700', color: 'var(--deep-black)' }}>{product.rating}</span>
              <span>({product.reviewCount})</span>
            </div>

            {product.stock <= 10 && (
              <span style={{ fontSize: '0.68rem', color: '#e63946', fontWeight: '600' }}>
                Only {product.stock} left
              </span>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--border-medium);
        }
        .product-card:hover .prod-img {
          transform: scale(1.04);
        }
        .quick-add-btn:hover {
          background-color: var(--primary-purple) !important;
        }
      `}</style>
    </div>
  );
};
