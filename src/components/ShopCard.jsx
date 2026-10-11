import React from 'react';
import { ShieldCheck, MapPin, Star, ArrowRight, Package } from 'lucide-react';

export const ShopCard = ({ shop, onVisitShop }) => {
  return (
    <div
      onClick={() => onVisitShop(shop.id)}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-xs)',
        overflow: 'hidden',
        border: '1px solid var(--border-medium)',
        cursor: 'pointer',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.2s ease, opacity 0.2s ease',
        position: 'relative'
      }}
      className="shop-card"
    >
      {/* Shop Banner */}
      <div style={{
        height: '130px',
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
          background: 'linear-gradient(to top, rgba(14, 14, 14, 0.7) 0%, transparent 60%)'
        }} />

        {/* District Tag */}
        <div style={{
          position: 'absolute',
          top: '0.65rem',
          right: '0.65rem',
          background: 'rgba(14, 14, 14, 0.85)',
          color: '#FFFFFF',
          padding: '0.2rem 0.55rem',
          borderRadius: 'var(--radius-xs)',
          fontSize: '0.68rem',
          fontWeight: '700',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}>
          <MapPin size={11} color="var(--primary-purple)" />
          <span>{shop.districtName || shop.district}</span>
        </div>
      </div>

      {/* Shop Body Content */}
      <div style={{
        padding: '0 1.15rem 1.15rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        position: 'relative'
      }}>
        {/* Overlapping Shop Logo & Rating */}
        <div style={{
          marginTop: '-26px',
          marginBottom: '0.65rem',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between'
        }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: 'var(--radius-xs)',
            overflow: 'hidden',
            border: '2px solid #FFFFFF',
            backgroundColor: 'var(--deep-black)'
          }}>
            <img src={shop.logo} alt={shop.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            background: 'var(--warm-off-white)',
            border: '1px solid var(--border-light)',
            padding: '0.2rem 0.5rem',
            borderRadius: 'var(--radius-xs)',
            fontSize: '0.72rem',
            fontWeight: '700',
            color: 'var(--deep-black)'
          }}>
            <Star size={12} fill="#FFB800" color="#FFB800" />
            <span>{shop.rating}</span>
            <span style={{ fontWeight: '400', color: 'var(--muted-text)' }}>({shop.reviewCount})</span>
          </div>
        </div>

        {/* Shop Title & Handle */}
        <div style={{ marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.15rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--deep-black)' }}>
              {shop.name}
            </h3>
            {shop.verified && <ShieldCheck size={15} color="var(--primary-purple)" />}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--primary-purple)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
            {shop.locality}
          </p>
        </div>

        {/* Short Bio */}
        <p style={{
          fontSize: '0.8rem',
          color: 'var(--muted-text)',
          lineHeight: 1.45,
          marginBottom: '0.85rem',
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
          paddingTop: '0.75rem',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--muted-text)', fontWeight: '600' }}>
            <Package size={13} color="var(--primary-purple)" />
            <span>{shop.productCount || 18}+ Drops</span>
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
              fontSize: '0.78rem',
              letterSpacing: '0.02em',
              textTransform: 'uppercase'
            }}
          >
            <span>Visit Shop</span>
            <ArrowRight size={13} color="var(--primary-purple)" />
          </button>
        </div>
      </div>

      <style>{`
        .shop-card:hover {
          border-color: var(--deep-black) !important;
        }
      `}</style>
    </div>
  );
};
