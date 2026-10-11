import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Zap, ShieldCheck, MapPin, Star, Truck, Check, Share2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useDistrict } from '../context/DistrictContext';

export const ProductDetailModal = ({ product, onClose, onOpenShop, onDirectCheckout }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { currentDistrictObj } = useDistrict();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : 'Standard');
  const [selectedColor, setSelectedColor] = useState(product?.colors ? product.colors[0] : { name: 'Standard', hex: '#000' });
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    onClose();
    if (onDirectCheckout) {
      onDirectCheckout();
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1200 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          maxWidth: '880px', 
          width: '95%',
          maxHeight: '92vh',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Header bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.85rem 1.25rem',
          borderBottom: '1px solid var(--border-light)',
          background: '#FFFFFF'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="drip-badge badge-purple-subtle" style={{ textTransform: 'uppercase', borderRadius: 'var(--radius-xs)' }}>
              {product.category}
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--muted-text)', letterSpacing: '0.04em' }}>
              DROP #{product.id}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <button
              onClick={handleShare}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-xs)',
                background: 'var(--warm-off-white)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--deep-black)'
              }}
              title="Copy product link"
            >
              <Share2 size={14} />
            </button>
            <button
              onClick={onClose}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-xs)',
                background: 'var(--warm-off-white)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--deep-black)'
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
          padding: '1.25rem',
          overflowY: 'auto'
        }} className="product-modal-grid">
          
          {/* Gallery Column */}
          <div>
            <div style={{
              borderRadius: 'var(--radius-xs)',
              overflow: 'hidden',
              backgroundColor: '#EBE7E0',
              aspectRatio: '1 / 1.15',
              position: 'relative',
              border: '1px solid var(--border-light)'
            }}>
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {product.discountPercentage && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'var(--deep-black)',
                  color: '#FFFFFF',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: '700',
                  fontSize: '0.75rem'
                }}>
                  {product.discountPercentage}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.65rem', marginTop: '0.75rem' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      border: activeImageIdx === idx ? '2px solid var(--primary-purple)' : '2px solid transparent',
                      opacity: activeImageIdx === idx ? 1 : 0.65,
                      transition: 'all 0.2s ease',
                      flexShrink: 0
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}

            {/* Local Shop Box */}
            <div style={{
              marginTop: '1.25rem',
              padding: '1rem 1.15rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-medium)',
              background: 'var(--warm-off-white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--deep-black)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '1.1rem'
                }}>
                  {product.shopName[0]}
                </div>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span>{product.shopName}</span>
                    <ShieldCheck size={15} color="var(--primary-purple)" />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={12} color="var(--primary-purple)" />
                    <span style={{ textTransform: 'capitalize' }}>{product.district}, Kerala</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  if (onOpenShop) onOpenShop(product.shopId);
                }}
                style={{
                  background: 'var(--deep-black)',
                  color: '#FFFFFF',
                  padding: '0.45rem 0.95rem',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase'
                }}
              >
                Visit Shop
              </button>
            </div>
          </div>

          {/* Details Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <h2 style={{
                fontSize: 'clamp(1.3rem, 2.5vw, 1.85rem)',
                fontWeight: '800',
                color: 'var(--deep-black)',
                lineHeight: 1.2,
                marginBottom: '0.35rem'
              }}>
                {product.name}
              </h2>
              {product.tagline && (
                <p style={{ fontSize: '0.9rem', color: 'var(--muted-text)', fontWeight: '500' }}>
                  {product.tagline}
                </p>
              )}
            </div>

            {/* Rating & Stock */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                background: '#FFF9E6',
                padding: '0.3rem 0.65rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.82rem',
                fontWeight: '700',
                color: '#8A6800'
              }}>
                <Star size={14} fill="#FFB800" color="#FFB800" />
                <span>{product.rating}</span>
                <span style={{ fontWeight: '400', color: '#B38B00' }}>({product.reviewCount} reviews)</span>
              </div>

              <span style={{ fontSize: '0.82rem', color: product.stock > 0 ? '#1b8a5a' : '#c92a2a', fontWeight: '600' }}>
                {product.stock > 0 ? `In Stock (${product.stock} units available)` : 'Sold Out'}
              </span>
            </div>

            {/* Price Box */}
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.75rem',
              padding: '0.9rem 1.15rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--warm-off-white)'
            }}>
              <span style={{
                fontSize: '1.85rem',
                fontWeight: '900',
                fontFamily: 'var(--font-heading)',
                color: 'var(--deep-black)'
              }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span style={{
                  fontSize: '1.05rem',
                  color: 'var(--light-muted)',
                  textDecoration: 'line-through'
                }}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.discountPercentage && (
                <span className="drip-badge badge-purple" style={{ marginLeft: 'auto' }}>
                  Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Size Selector */}
            {product.sizes && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>Select Size:</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--primary-purple)', fontWeight: '600' }}>
                    True to Oversized Fit
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {product.sizes.map((s) => {
                    const isSelected = selectedSize === s;
                    return (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        style={{
                          minWidth: '44px',
                          height: '40px',
                          padding: '0 0.85rem',
                          borderRadius: 'var(--radius-xs)',
                          background: isSelected ? 'var(--deep-black)' : '#FFFFFF',
                          color: isSelected ? '#FFFFFF' : 'var(--deep-black)',
                          border: isSelected ? '2px solid var(--deep-black)' : '1px solid var(--border-medium)',
                          fontWeight: '700',
                          fontSize: '0.82rem',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Color Swatches */}
            {product.colors && (
              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', display: 'block', marginBottom: '0.5rem' }}>
                  Colour: <span style={{ fontWeight: '500', color: 'var(--muted-text)' }}>{selectedColor.name}</span>
                </span>
                <div style={{ display: 'flex', gap: '0.65rem' }}>
                  {product.colors.map((c, i) => {
                    const isSelected = selectedColor.name === c.name;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(c)}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: 'var(--radius-xs)',
                          backgroundColor: c.hex,
                          border: isSelected ? '2px solid var(--primary-purple)' : '1px solid var(--border-medium)',
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title={c.name}
                      >
                        {isSelected && <Check size={13} color={c.hex === '#0E0E0E' ? '#FFFFFF' : '#000000'} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>Quantity:</span>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-xs)',
                background: '#FFFFFF',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: '34px', height: '34px', fontWeight: '700', fontSize: '1rem' }}
                >
                  -
                </button>
                <span style={{ width: '34px', textAlign: 'center', fontWeight: '700', fontSize: '0.85rem' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                  style={{ width: '34px', height: '34px', fontWeight: '700', fontSize: '1rem' }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Delivery Info */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-xs)',
              background: 'var(--accent-mint-soft)',
              fontSize: '0.82rem',
              color: '#075037',
              fontWeight: '600'
            }}>
              <Truck size={17} color="#075037" />
              <span>
                {product.deliveryDays || `Fast delivery to ${currentDistrictObj.name} within 24-48 hours`}
              </span>
            </div>

            {/* Description & Details */}
            <div style={{ fontSize: '0.88rem', color: 'var(--muted-text)', lineHeight: 1.6 }}>
              <p style={{ marginBottom: '0.75rem' }}>{product.description}</p>
              {product.details && (
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {product.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* CTAs */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr 1fr',
              gap: '0.75rem',
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-light)'
            }}>
              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product.id)}
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-medium)',
                  background: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title={isFavorited ? 'In Wishlist' : 'Add to Wishlist'}
              >
                <Heart size={18} color={isFavorited ? 'var(--accent-pink)' : 'var(--deep-black)'} fill={isFavorited ? 'var(--accent-pink)' : 'none'} />
              </button>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="btn-secondary"
                style={{ height: '46px', borderRadius: 'var(--radius-xs)', letterSpacing: '0.02em', textTransform: 'uppercase' }}
              >
                <ShoppingBag size={17} />
                <span>Add to Cart</span>
              </button>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                className="btn-primary"
                style={{ height: '46px', borderRadius: 'var(--radius-xs)', letterSpacing: '0.02em', textTransform: 'uppercase' }}
              >
                <Zap size={17} />
                <span>Buy Now</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @media (min-width: 768px) {
          .product-modal-grid {
            grid-template-columns: 1fr 1.15fr !important;
          }
        }
      `}</style>
    </div>
  );
};
