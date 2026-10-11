import React, { useState, useMemo } from 'react';
import { ShopCard } from './ShopCard';
import { Store, MapPin, Search, Sparkles } from 'lucide-react';
import { KERALA_DISTRICTS } from '../data/keralaDistricts';

export const ShopGrid = ({ shops, onVisitShop, selectedDistrict, onChangeDistrict }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'popular' | 'featured'

  const filteredShops = useMemo(() => {
    return shops.filter(shop => {
      if (selectedDistrict && selectedDistrict !== 'all' && shop.district !== selectedDistrict) {
        return false;
      }
      if (activeFilter === 'popular' && !shop.popular) return false;
      if (activeFilter === 'featured' && !shop.featured) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = shop.name.toLowerCase().includes(q);
        const matchLoc = shop.locality.toLowerCase().includes(q);
        const matchCat = shop.category.toLowerCase().includes(q);
        const matchDist = (shop.districtName || shop.district).toLowerCase().includes(q);
        if (!matchName && !matchLoc && !matchCat && !matchDist) return false;
      }
      return true;
    });
  }, [shops, selectedDistrict, activeFilter, searchQuery]);

  return (
    <section style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.75rem',
            background: 'var(--accent-mint-soft)',
            color: '#08543a',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.75rem',
            fontWeight: '700',
            marginBottom: '0.65rem'
          }}>
            <Store size={14} />
            <span>KERALA LOCAL STORES</span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.8rem, 3.8vw, 2.8rem)', fontWeight: '800', marginBottom: '0.5rem' }}>
            Discover Local Shops
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--muted-text)', maxWidth: '620px' }}>
            Browse verified clothing stores, homegrown streetwear labels, and thrift boutiques across Kerala's 14 districts. Order directly from your favorite local storefronts.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.75rem',
          background: '#FFFFFF',
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {/* Shop Search input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            flex: '1 1 260px',
            background: 'var(--warm-off-white)',
            padding: '0.6rem 1rem',
            borderRadius: 'var(--radius-pill)'
          }}>
            <Search size={16} color="var(--muted-text)" />
            <input
              type="text"
              placeholder="Search shops by name, locality, or style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                width: '100%',
                fontSize: '0.88rem',
                color: 'var(--deep-black)'
              }}
            />
          </div>

          {/* District selector pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'var(--warm-off-white)',
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.82rem'
            }}>
              <MapPin size={14} color="var(--primary-purple)" />
              <select
                value={selectedDistrict}
                onChange={(e) => onChangeDistrict(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontWeight: '700',
                  fontSize: '0.82rem',
                  color: 'var(--deep-black)',
                  cursor: 'pointer'
                }}
              >
                {KERALA_DISTRICTS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter pills */}
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              <button
                onClick={() => setActiveFilter('all')}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  background: activeFilter === 'all' ? 'var(--deep-black)' : 'var(--warm-off-white)',
                  color: activeFilter === 'all' ? '#FFFFFF' : 'var(--deep-black)'
                }}
              >
                All Stores
              </button>

              <button
                onClick={() => setActiveFilter('popular')}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  background: activeFilter === 'popular' ? 'var(--deep-black)' : 'var(--warm-off-white)',
                  color: activeFilter === 'popular' ? '#FFFFFF' : 'var(--deep-black)'
                }}
              >
                Popular
              </button>

              <button
                onClick={() => setActiveFilter('featured')}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  background: activeFilter === 'featured' ? 'var(--deep-black)' : 'var(--warm-off-white)',
                  color: activeFilter === 'featured' ? '#FFFFFF' : 'var(--deep-black)'
                }}
              >
                Featured
              </button>
            </div>
          </div>
        </div>

        {/* Shops Grid */}
        {filteredShops.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 1rem',
            background: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px dashed var(--border-medium)'
          }}>
            <Store size={36} color="var(--primary-purple)" style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No Local Shops Found</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--muted-text)', marginBottom: '1.25rem' }}>
              We couldn't find any stores matching your criteria in this district.
            </p>
            <button
              className="btn-primary"
              onClick={() => {
                setSearchQuery('');
                onChangeDistrict('all');
                setActiveFilter('all');
              }}
            >
              Browse All Kerala Shops
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '1.5rem'
          }} className="shops-responsive-grid">
            {filteredShops.map((shop) => (
              <ShopCard
                key={shop.id}
                shop={shop}
                onVisitShop={onVisitShop}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 680px) {
          .shops-responsive-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1040px) {
          .shops-responsive-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
};
