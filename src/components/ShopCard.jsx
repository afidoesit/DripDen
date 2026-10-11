import React from 'react';
import { ShieldCheck, MapPin, Star, ArrowRight, Package } from 'lucide-react';

export const ShopCard = ({ shop, onVisitShop }) => {
  return (
    <div
      onClick={() => onVisitShop(shop.id)}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--border-light)',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
        position: 'relative'
      }}
      className="shop-card"
    >
      {/* Shop Banner */}
      <div style={{
        height: '140px',
        width: '100%',
        backgroundColor: '#1C1C1C',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <img
          src={shop.banner}
          alt={shop.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)'
        }} />

        {/* District Tag */}
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          background: 'rgba(14, 14, 14, 0.8)',
          backdropFilter: 'blur(6px)',
          color: '#FFFFFF',
          padding: '0.25rem 0.65rem',
          borderRadius: 'var(--radius-pill)',
          fontSize: '0.7rem',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}>
          <MapPin size={12} color="var(--primary-purple)" />
          <span>{shop.districtName || shop.district}</span>
        </div>
      </div>

      {/* Shop Body Content */}
      <div style={{
        padding: '0 1.25rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        position: 'relative'
      }}>
        {/* Overlapping Shop Logo */}
        <div style={{
          marginTop: '-30px',
          marginBottom: '0.75rem',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: '3px solid #FFFFFF',
            boxShadow: 'var(--shadow-md)',
            backgroundColor: 'var(--deep-black)'
          }}>
            <img src={shop.logo} alt={shop.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            background: '#FFF9E6',
            padding: '0.25rem 0.55rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.75rem',
            fontWeight: '700',
            color: '#8A6800'
          }}>
            <Star size={13} fill="#FFB800" color="#FFB800" />
            <span>{shop.rating}</span>
            <span style={{ fontWeight: '400', color: '#B38B00' }}>({shop.reviewCount})</span>
          </div>
        </div>

        {/* Shop Title & Handle */}
        <div style={{ marginBottom: '0.65rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.15rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--deep-black)' }}>
              {shop.name}
            </h3>
            {shop.verified && <ShieldCheck size={16} color="var(--primary-purple)" />}
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--primary-purple)', fontWeight: '600' }}>
            {shop.locality}
          </p>
        </div>

        {/* Short Bio */}
        <p style={{
          fontSize: '0.82rem',
          color: 'var(--muted-text)',
          lineHeight: 1.45,
          marginBottom: '1rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          flex: 1
        }}>
          {shop.description}
        </p>

        {/* Tags & Action Footer */}
        <div style={{
          paddingTop: '0.85rem',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--muted-text)', fontWeight: '600' }}>
            <Package size={14} color="var(--primary-purple)" />
            <span>{shop.productCount || 18}+ Drops Available</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onVisitShop(shop.id);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              color: 'var(--deep-black)',
              fontWeight: '800',
              fontSize: '0.82rem'
            }}
          >
            <span>Visit Shop</span>
            <ArrowRight size={14} color="var(--primary-purple)" />
          </button>
        </div>
      </div>

      <style>{`
        .shop-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--border-medium);
        }
      `}</style>
    </div>
  );
};
