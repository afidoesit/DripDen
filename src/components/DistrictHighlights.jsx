import React from 'react';
import { MapPin, ArrowRight, Store } from 'lucide-react';
import { KERALA_DISTRICTS } from '../data/keralaDistricts';
import { useDistrict } from '../context/DistrictContext';

export const DistrictHighlights = ({ onSelectDistrict }) => {
  const { selectedDistrict, changeDistrict, setIsSelectorOpen } = useDistrict();

  const featuredDistricts = [
    {
      id: 'ernakulam',
      name: 'Ernakulam (Kochi)',
      mal: 'എറണാകുളം',
      desc: 'Streetwear, heavyweight oversized hoodies & Panampilly Nagar boutiques',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80',
      shopCount: '18 Boutiques'
    },
    {
      id: 'kozhikode',
      name: 'Kozhikode (Calicut)',
      mal: 'കോഴിക്കോട്',
      desc: 'SM Street skater cargo pants, vintage wash tees & footwear hubs',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80',
      shopCount: '15 Boutiques'
    },
    {
      id: 'malappuram',
      name: 'Malappuram',
      mal: 'മലപ്പുറം',
      desc: 'High-top retro kicks, sneaker lounges & streetwear enthusiasts',
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80',
      shopCount: '14 Lounges'
    },
    {
      id: 'thiruvananthapuram',
      name: 'Thiruvananthapuram',
      mal: 'തിരുവനന്തപുരം',
      desc: 'Kowdiar curated thrift, Y2K aesthetic baby tees & varsity jackets',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80',
      shopCount: '12 Stores'
    }
  ];

  return (
    <section style={{ padding: '3rem 0 4rem', backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'var(--primary-purple)',
              fontWeight: '700',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              marginBottom: '0.35rem'
            }}>
              <MapPin size={14} />
              <span>Explore by District</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: '800' }}>
              Fashion Across 14 Kerala Districts
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--muted-text)', marginTop: '0.2rem' }}>
              Every district in God's Own Country has its own unique drip and homegrown boutiques.
            </p>
          </div>

          <button
            onClick={() => setIsSelectorOpen(true)}
            className="btn-secondary"
            style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem' }}
          >
            <span>View All 14 Districts</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* 4 Featured District Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: '1.25rem'
        }} className="district-cards-grid">
          {featuredDistricts.map((d) => (
            <div
              key={d.id}
              onClick={() => {
                changeDistrict(d.id);
                onSelectDistrict(d.id);
              }}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                aspectRatio: '16 / 10',
                backgroundColor: 'var(--deep-black)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease'
              }}
              className="district-card"
            >
              <img
                src={d.image}
                alt={d.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.75,
                  transition: 'transform 0.4s ease'
                }}
                className="district-img"
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(14, 14, 14, 0.9) 0%, rgba(14, 14, 14, 0.2) 65%, transparent 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '1.5rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--accent-mint)', fontWeight: '700', textTransform: 'uppercase' }}>
                      {d.shopCount}
                    </span>
                    <h3 style={{ color: '#FFFFFF', fontSize: '1.25rem', fontWeight: '800', marginTop: '0.1rem' }}>
                      {d.name}
                    </h3>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', marginTop: '0.1rem' }}>
                      {d.mal}
                    </div>
                  </div>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(6px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF'
                  }}>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .district-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1024px) {
          .district-cards-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        .district-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
        .district-card:hover .district-img {
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
};
