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
    <section id="categories-section" style={{ padding: '2rem 0 2.5rem' }}>
      <div className="container">
        {/* Section header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="drip-badge badge-purple-subtle">CATEGORIES</span>
            <h2 style={{ fontSize: '1rem', fontWeight: '700', margin: 0 }}>
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => onSelectCategory('all')}
            style={{
              fontSize: '0.82rem',
              fontWeight: '700',
              color: 'var(--primary-purple)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            All Drops →
          </button>
        </div>

        {/* Clean uniform grid */}
        <div className="cat-grid">
          {CATEGORY_ITEMS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="cat-tile"
            >
              {/* Image */}
              <div className="cat-img-wrap">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="cat-img"
                />
                <div className="cat-overlay" />
              </div>

              {/* Label row below image */}
              <div className="cat-label">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.05rem' }}>
                  <span className="cat-name">{cat.name}</span>
                  <span className="cat-sub">{cat.subtitle}</span>
                </div>
                <span className="cat-count">{cat.count}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        /* Grid: single row of 3 equal tiles on desktop */
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--border-light);
          border: 1px solid var(--border-light);
        }

        .cat-tile {
          display: flex;
          flex-direction: column;
          background: var(--warm-off-white);
          text-align: left;
          cursor: pointer;
          overflow: hidden;
          transition: background 0.15s ease;
        }
        .cat-tile:hover {
          background: #EEECE8;
        }

        /* Image container — fixed consistent height */
        .cat-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: #1a1a1a;
        }

        .cat-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          opacity: 0.9;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          display: block;
        }
        .cat-tile:hover .cat-img {
          transform: scale(1.04);
        }

        .cat-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(14, 14, 14, 0.35) 100%
          );
          pointer-events: none;
        }

        /* Label strip below image */
        .cat-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.7rem 0.875rem;
          border-top: 1px solid var(--border-light);
        }

        .cat-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.25rem;
          letter-spacing: 0.04em;
          color: var(--deep-black);
          line-height: 1;
        }

        .cat-sub {
          font-size: 0.72rem;
          color: var(--muted-text);
          font-weight: 500;
          margin-top: 0.1rem;
          display: block;
        }

        .cat-count {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--primary-purple);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* Mobile: 2 columns, last tile full width */
        @media (max-width: 639px) {
          .cat-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .cat-tile:last-child {
            grid-column: 1 / -1;
          }
          /* On the full-width last tile, use a landscape ratio */
          .cat-tile:last-child .cat-img-wrap {
            aspect-ratio: 16 / 7;
          }
          .cat-name {
            font-size: 1.1rem;
          }
        }

        /* Tablet: same 3-col as desktop */
        @media (min-width: 640px) {
          .cat-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </section>
  );
};
