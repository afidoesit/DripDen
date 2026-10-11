import React from 'react';

const CATEGORY_ITEMS = [
  {
    id: 'men',
    name: 'Men',
    subtitle: 'Streetwear & Heavyweights',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&auto=format&fit=crop&q=80',
    count: '48 Drops'
  },
  {
    id: 'women',
    name: 'Women',
    subtitle: 'Y2K, Baby Tees & Slouchy Fits',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
    count: '42 Drops'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    subtitle: 'Caps, Chains & Shades',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80',
    count: '34 Drops'
  }
];

export const CategorySection = ({ onSelectCategory }) => {
  return (
    <section id="categories-section" style={{ padding: '2rem 0 3rem' }}>
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '1.5rem'
        }}>
          <div>
            <span className="drip-badge badge-purple-subtle" style={{ marginBottom: '0.4rem' }}>
              CATEGORIES
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: '800' }}>
              Shop by Category
            </h2>
          </div>
          <button 
            onClick={() => onSelectCategory('all')}
            style={{ 
              fontSize: '0.88rem', 
              fontWeight: '700', 
              color: 'var(--primary-purple)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            See All Drops →
          </button>
        </div>

        {/* Categories Grid - Editorial Lookbook Blocks */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: '1.25rem'
        }} className="categories-grid">
          {CATEGORY_ITEMS.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                cursor: 'pointer',
                aspectRatio: '4 / 3',
                backgroundColor: 'var(--deep-black)',
                border: '1px solid rgba(14, 14, 14, 0.1)',
                transition: 'opacity 0.2s ease'
              }}
              className="cat-card"
            >
              <img
                src={cat.image}
                alt={cat.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.88,
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="cat-img"
              />
              
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(14, 14, 14, 0.88) 0%, rgba(14, 14, 14, 0.25) 55%, transparent 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '1.25rem'
              }}>
                <span style={{
                  color: 'var(--accent-mint)',
                  fontSize: '0.68rem',
                  fontWeight: '700',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '0.2rem'
                }}>
                  {cat.count}
                </span>
                <h3 style={{
                  color: '#FFFFFF',
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                  letterSpacing: '0.04em',
                  lineHeight: 1,
                  marginBottom: '0.15rem'
                }}>
                  {cat.name}
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.01em',
                  margin: 0
                }} className="cat-sub">
                  {cat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .categories-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        .cat-card:hover .cat-img {
          transform: scale(1.04);
        }
      `}</style>
    </section>
  );
};
