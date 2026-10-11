import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '5rem',
      right: '1.5rem',
      zIndex: 2000,
      background: '#0E0E0E',
      color: '#FFFFFF',
      padding: '0.85rem 1.25rem',
      borderRadius: 'var(--radius-pill)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.65rem',
      boxShadow: '0 8px 24px rgba(14, 14, 14, 0.25)',
      animation: 'modalSlideUp 0.25s ease-out',
      fontSize: '0.88rem',
      fontWeight: '600'
    }}>
      <CheckCircle2 size={18} color="var(--accent-mint)" />
      <span>{toastMessage}</span>
    </div>
  );
};
