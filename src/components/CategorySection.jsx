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

        {/* Categories Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem'
        }} className="categories-grid">
          {CATEGORY_ITEMS.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                cursor: 'pointer',
                aspectRatio: '4 / 3',
                backgroundColor: 'var(--deep-black)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease'
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
                  opacity: 0.82,
                  transition: 'transform 0.4s ease'
                }}
                className="cat-img"
              />
              
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(14, 14, 14, 0.85) 0%, rgba(14, 14, 14, 0.2) 60%, transparent 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '1.25rem'
              }}>
                <span style={{
                  color: 'var(--accent-mint)',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  marginBottom: '0.2rem'
                }}>
                  {cat.count}
                </span>
                <h3 style={{
                  color: '#FFFFFF',
                  fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                  fontWeight: '800',
                  letterSpacing: '-0.02em',
                  marginBottom: '0.15rem'
                }}>
                  {cat.name}
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.75)',
                  fontSize: '0.78rem',
                  display: 'none'
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
          .cat-sub {
            display: block !important;
          }
        }
        .cat-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
        .cat-card:hover .cat-img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
};
