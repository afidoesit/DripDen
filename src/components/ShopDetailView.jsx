import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, MapPin, Phone, MessageSquare, Star, Clock, Sparkles } from 'lucide-react';
import { ProductCard } from './ProductCard';

export const ShopDetailView = ({ shop, products, onBack, onOpenProductDetails, onMessageShop }) => {
  const [shopCategoryTab, setShopCategoryTab] = useState('all');

  if (!shop) return null;

  const shopProducts = products.filter(p => p.shopId === shop.id);
  const filteredProducts = shopCategoryTab === 'all' 
    ? shopProducts 
    : shopProducts.filter(p => p.category === shopCategoryTab);

  const categories = ['all', ...new Set(shopProducts.map(p => p.category))];

  return (
    <div style={{ paddingBottom: '6rem' }}>
      {/* Back button */}
      <div className="container" style={{ paddingTop: '1.25rem', paddingBottom: '0.75rem' }}>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            fontSize: '0.85rem',
            fontWeight: '700',
            color: 'var(--deep-black)',
            background: '#FFFFFF',
            padding: '0.45rem 0.95rem',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--border-medium)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to All Shops</span>
        </button>
      </div>

      {/* Shop Hero Banner */}
      <div style={{ position: 'relative', width: '100%', height: '240px', backgroundColor: '#0E0E0E' }}>
        <img
          src={shop.banner}
          alt={shop.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(14, 14, 14, 0.7) 0%, transparent 60%)'
        }} />
      </div>

      {/* Shop Info Container */}
      <div className="container" style={{ position: 'relative', marginTop: '-60px' }}>
        <div style={{
          background: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '2.5rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            {/* Logo and Header Row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <div style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  border: '3px solid #FFFFFF',
                  boxShadow: 'var(--shadow-md)',
                  backgroundColor: 'var(--deep-black)',
                  flexShrink: 0
                }}>
                  <img src={shop.logo} alt={shop.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.2rem' }}>
                    <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '800' }}>
                      {shop.name}
                    </h1>
                    {shop.verified && <ShieldCheck size={22} color="var(--primary-purple)" />}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--muted-text)' }}>
                    <span style={{ color: 'var(--primary-purple)', fontWeight: '700' }}>{shop.handle}</span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <MapPin size={14} color="var(--deep-black)" />
                      {shop.locality} ({shop.districtName || shop.district})
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                {/* In-App Message Button */}
              <button
                onClick={() => onMessageShop && onMessageShop(shop)}
                className="btn-secondary"
                style={{ padding: '0.65rem 1.15rem', fontSize: '0.85rem' }}
              >
                <MessageSquare size={16} color="var(--primary-purple)" />
                <span>Message Shop</span>
              </button>
              {shop.phone && (
                <a
                  href={`tel:${shop.phone}`}
                  className="btn-dark"
                  style={{ padding: '0.65rem 1.15rem', fontSize: '0.85rem' }}
                >
                  <Phone size={16} />
                  <span>Call Store</span>
                </a>
              )}
              </div>
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.92rem', color: 'var(--muted-text)', lineHeight: 1.6, maxWidth: '820px' }}>
              {shop.description}
            </p>

            {/* Badges & Meta Row */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-light)'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: '#FFF9E6',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.82rem',
                fontWeight: '700',
                color: '#8A6800'
              }}>
                <Star size={14} fill="#FFB800" color="#FFB800" />
                <span>{shop.rating} Rating</span>
                <span style={{ fontWeight: '400', color: '#B38B00' }}>({shop.reviewCount} customer reviews)</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--muted-text)' }}>
                <Clock size={15} color="var(--primary-purple)" />
                <span>Hours: {shop.openHours || '10:00 AM - 9:00 PM'}</span>
              </div>

              {shop.tags && (
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {shop.tags.map((tag, i) => (
                    <span key={i} className="drip-badge badge-purple-subtle" style={{ fontSize: '0.68rem' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Shop Drops Section */}
        <div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>
                Exclusive Drops from {shop.name}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-text)' }}>
                Showing {filteredProducts.length} items available in this boutique
              </p>
            </div>

            {/* Category tabs */}
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setShopCategoryTab(c)}
                  style={{
                    padding: '0.4rem 0.95rem',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    background: shopCategoryTab === c ? 'var(--deep-black)' : '#FFFFFF',
                    color: shopCategoryTab === c ? '#FFFFFF' : 'var(--deep-black)',
                    border: '1px solid var(--border-medium)',
                    textTransform: 'capitalize'
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '1px dashed var(--border-medium)'
            }}>
              <p>No products listed under this category for this shop.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.25rem'
            }} className="shop-prods-grid">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onOpenDetails={onOpenProductDetails}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .shop-prods-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (min-width: 1100px) {
          .shop-prods-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
};
