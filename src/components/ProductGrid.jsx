import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { Filter, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { CATEGORIES } from '../data/keralaDistricts';

export const ProductGrid = ({ 
  products, 
  onOpenDetails, 
  onOpenShop,
  activeCategory,
  onSelectCategory,
  selectedDistrict,
  title = "Explore Drops",
  subtitle = "Fresh street cuts from Kerala's top independent fashion boutiques"
}) => {
  const [sortOption, setSortOption] = useState('featured');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [selectedSize, setSelectedSize] = useState('all');
  const [maxPrice, setMaxPrice] = useState(6000);

  const sizes = ['all', 'S', 'M', 'L', 'XL', 'XXL', 'UK 8', 'UK 9', 'UK 10'];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (activeCategory && activeCategory !== 'all' && p.category !== activeCategory) return false;
      if (selectedDistrict && selectedDistrict !== 'all' && p.district !== selectedDistrict) return false;
      if (p.price > maxPrice) return false;
      if (selectedSize !== 'all' && p.sizes && !p.sizes.includes(selectedSize)) return false;
      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      if (sortOption === 'discount') return (b.discountPercentage || 0) - (a.discountPercentage || 0);
      return 0;
    });
  }, [products, activeCategory, selectedDistrict, maxPrice, selectedSize, sortOption]);

  return (
    <section style={{ padding: '2rem 0 4rem' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '1.75rem'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <span className="drip-badge badge-purple-subtle" style={{ marginBottom: '0.4rem' }}>
                LOCAL CATALOG
              </span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.3rem)', fontWeight: '800' }}>
                {title}
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted-text)', marginTop: '0.2rem' }}>
                {subtitle}
              </p>
            </div>

            {/* Sort & Filter controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#FFFFFF',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                padding: '0.45rem 0.85rem',
                fontSize: '0.82rem'
              }}>
                <ArrowUpDown size={13} color="var(--primary-purple)" />
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    fontSize: '0.82rem',
                    fontWeight: '600',
                    color: 'var(--deep-black)',
                    cursor: 'pointer'
                  }}
                >
                  <option value="featured">Featured Drops</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Customer Rated</option>
                  <option value="discount">Biggest Discounts</option>
                </select>
              </div>

              {/* Price Filter Toggle */}
              <button
                onClick={() => setShowFilterDrawer(!showFilterDrawer)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: showFilterDrawer ? 'var(--deep-black)' : '#FFFFFF',
                  color: showFilterDrawer ? '#FFFFFF' : 'var(--deep-black)',
                  border: '1px solid var(--deep-black)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.45rem 0.95rem',
                  fontSize: '0.82rem',
                  fontWeight: '700'
                }}
              >
                <SlidersHorizontal size={13} />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Category Tabs Scrollbar - Sleek editorial tabs */}
          <div style={{
            display: 'flex',
            gap: '0.4rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: 'var(--radius-xs)',
                    background: isActive ? 'var(--deep-black)' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : 'var(--deep-black)',
                    border: isActive ? '1px solid var(--deep-black)' : '1px solid var(--border-medium)',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Quick Filter Drawer Panel (Collapsible) */}
          {showFilterDrawer && (
            <div style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              border: '1px solid var(--border-medium)',
              boxShadow: 'var(--shadow-sm)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
              animation: 'modalSlideUp 0.2s ease-out'
            }}>
              {/* Max Price Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '700' }}>
                  <span>Max Price</span>
                  <span style={{ color: 'var(--primary-purple)' }}>Up to ₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="6000"
                  step="250"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary-purple)' }}
                />
              </div>

              {/* Size Filter */}
              <div>
                <span style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '700' }}>
                  Filter by Size
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      style={{
                        padding: '0.25rem 0.65rem',
                        borderRadius: 'var(--radius-sm)',
                        background: selectedSize === s ? 'var(--deep-black)' : 'var(--warm-off-white)',
                        color: selectedSize === s ? '#FFFFFF' : 'var(--deep-black)',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        border: '1px solid var(--border-light)'
                      }}
                    >
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset action */}
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => {
                    setMaxPrice(6000);
                    setSelectedSize('all');
                    onSelectCategory('all');
                  }}
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    color: 'var(--muted-text)',
                    textDecoration: 'underline'
                  }}
                >
                  Reset all filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Product Cards Grid: 2 cols on mobile, 3-4 cols desktop */}
        {filteredProducts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 1rem',
            background: 'transparent',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-medium)'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No Drops Match Your Filters</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--muted-text)', marginBottom: '1.25rem' }}>
              Try adjusting your price range, selected district, or category.
            </p>
            <button
              className="btn-primary"
              onClick={() => {
                onSelectCategory('all');
                setMaxPrice(6000);
                setSelectedSize('all');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem'
          }} className="products-responsive-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={onOpenDetails}
                onOpenShop={onOpenShop}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .products-responsive-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 1.5rem !important;
          }
        }
        @media (min-width: 1100px) {
          .products-responsive-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
};
