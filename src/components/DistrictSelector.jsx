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
              width: '36px', 
              height: '36px', 
              borderRadius: '50%', 
              background: 'var(--warm-off-white)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--deep-black)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
          gap: '0.75rem',
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
                  padding: '0.9rem 1.1rem',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'var(--deep-black)' : 'var(--warm-off-white)',
                  color: isSelected ? '#FFFFFF' : 'var(--deep-black)',
                  border: isSelected ? '2px solid var(--primary-purple)' : '1px solid transparent',
                  textAlign: 'left',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  gap: '0.5rem'
                }}
              >
                <span style={{ 
                  fontWeight: '700', 
                  fontSize: '0.92rem',
                  letterSpacing: '-0.01em'
                }}>
                  {district.name}
                </span>
                {isSelected && <Check size={16} color="var(--accent-mint)" style={{ flexShrink: 0 }} />}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted-text)' }}>
            Showing all districts
          </span>
          <button 
            className="btn-primary" 
            style={{ padding: '0.6rem 1.25rem', fontSize: '0.82rem' }}
            onClick={() => { changeDistrict('all'); }}
          >
            Show All Drops
          </button>
        </div>
      </div>
    </div>
  );
};
