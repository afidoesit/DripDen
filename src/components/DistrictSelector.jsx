import React from 'react';
import { useDistrict } from '../context/DistrictContext';
import { X, MapPin, Check, Sparkles } from 'lucide-react';

export const DistrictSelector = () => {
  const { districts, selectedDistrict, changeDistrict, isSelectorOpen, setIsSelectorOpen } = useDistrict();

  if (!isSelectorOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsSelectorOpen(false)}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px', padding: '1.75rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <MapPin size={20} color="var(--primary-purple)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Select Your District</h3>
            </div>
            <p style={{ fontSize: '0.85rem' }}>Discover clothing shops & fashion drops near you</p>
          </div>
          <button 
            onClick={() => setIsSelectorOpen(false)}
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

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
          gap: '0.65rem',
          maxHeight: '60vh',
          overflowY: 'auto',
          paddingRight: '0.25rem'
        }}>
          {districts.map((district) => {
            const isSelected = selectedDistrict === district.id;
            return (
              <button
                key={district.id}
                onClick={() => changeDistrict(district.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.8rem 1rem',
                  borderRadius: 'var(--radius-xs)',
                  background: isSelected ? 'var(--deep-black)' : 'var(--warm-off-white)',
                  color: isSelected ? '#FFFFFF' : 'var(--deep-black)',
                  border: isSelected ? '1px solid var(--deep-black)' : '1px solid var(--border-medium)',
                  textAlign: 'left',
                  position: 'relative',
                  transition: 'all 0.15s ease',
                  cursor: 'pointer',
                  gap: '0.5rem'
                }}
              >
                <span style={{ 
                  fontWeight: '700', 
                  fontSize: '0.88rem',
                  letterSpacing: '0.01em'
                }}>
                  {district.name}
                </span>
                {isSelected && <Check size={15} color="var(--accent-mint)" style={{ flexShrink: 0 }} />}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--muted-text)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            All Kerala Districts
          </span>
          <button 
            className="btn-primary" 
            style={{ padding: '0.55rem 1.25rem', fontSize: '0.8rem', borderRadius: 'var(--radius-xs)', textTransform: 'uppercase' }}
            onClick={() => { changeDistrict('all'); }}
          >
            Show All Drops
          </button>
        </div>
      </div>
    </div>
  );
};
