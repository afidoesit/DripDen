import React from 'react';
import { CheckCircle2, ArrowRight, Package, Truck, Store } from 'lucide-react';

export const OrderSuccessModal = ({ order, onClose, onTrackOrder }) => {
  if (!order) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1280 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          maxWidth: '540px', 
          width: '95%',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem 2rem',
          textAlign: 'center'
        }}
      >
        {/* Celebration Icon */}
        <div style={{
          width: '76px',
          height: '76px',
          borderRadius: '50%',
          background: 'var(--accent-mint-soft)',
          border: '2px solid var(--accent-mint)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem'
        }}>
          <CheckCircle2 size={42} color="#08543a" />
        </div>

        {/* Title */}
        <span className="drip-badge badge-mint" style={{ marginBottom: '0.65rem' }}>
          DRIP SECURED
        </span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>
          Order Confirmed!
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted-text)', marginBottom: '1.75rem', lineHeight: 1.5 }}>
          Your drop from local Kerala boutiques has been locked in. We've notified the store to prepare your package.
        </p>

        {/* Order ID Box */}
        <div style={{
          background: 'var(--warm-off-white)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-medium)',
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          textAlign: 'left'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--muted-text)', fontWeight: '700' }}>TRACKING ID</span>
            <span style={{ fontSize: '0.92rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--primary-purple)' }}>
              {order.id}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--muted-text)' }}>Destination</span>
            <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>
              {order.deliveryAddress?.districtName || order.deliveryAddress?.district}, Kerala
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--muted-text)' }}>Total Paid</span>
            <span style={{ fontSize: '1.05rem', fontWeight: '900', fontFamily: 'var(--font-heading)' }}>
              ₹{order.total?.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            onClick={() => {
              onClose();
              onTrackOrder(order);
            }}
            className="btn-primary"
            style={{ width: '100%', height: '48px', borderRadius: 'var(--radius-pill)', fontSize: '0.92rem' }}
          >
            <Truck size={18} />
            <span>Track Order Timeline</span>
          </button>

          <button
            onClick={onClose}
            className="btn-secondary"
            style={{ width: '100%', height: '44px', borderRadius: 'var(--radius-pill)', fontSize: '0.85rem' }}
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
};
