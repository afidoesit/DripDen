import React from 'react';
import { X, CheckCircle2, Clock, Truck, Package, ShieldCheck, MapPin, AlertCircle } from 'lucide-react';

export const OrderTrackingModal = ({ order, onClose }) => {
  if (!order) return null;

  const STATUS_STEPS = [
    { key: 'Order Placed', label: 'Order Placed', desc: 'Received & logged in boutique system' },
    { key: 'Confirmed', label: 'Confirmed', desc: 'Shop verified item availability' },
    { key: 'Processing', label: 'Processing', desc: 'Preparing drop for packaging' },
    { key: 'Packed', label: 'Packed', desc: 'Sealed in DripDen eco-packaging' },
    { key: 'Shipped', label: 'Shipped', desc: 'Dispatched with Kerala local logistics' },
    { key: 'Out for Delivery', label: 'Out for Delivery', desc: 'Courier rider on the way' },
    { key: 'Delivered', label: 'Delivered', desc: 'Handed over successfully' }
  ];

  // Calculate current step index
  let activeStepIndex = STATUS_STEPS.findIndex(s => s.key.toLowerCase() === (order.status || '').toLowerCase());
  if (activeStepIndex === -1) {
    if (order.status === 'Cancelled') activeStepIndex = -2;
    else activeStepIndex = 0; // Default to placed
  }

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1300 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          maxWidth: '680px', 
          width: '95%',
          maxHeight: '90vh',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem'
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--border-light)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <span className="drip-badge badge-mint-subtle">LIVE TRACKING</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>
                Order #{order.id}
              </h3>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--muted-text)' }}>
              Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--warm-off-white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Current status highlight banner */}
        <div style={{
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          background: order.status === 'Cancelled' ? '#ffe3e3' : 'var(--warm-off-white)',
          border: '1px solid var(--border-medium)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.75rem'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--muted-text)', fontWeight: '700' }}>
              Current Status
            </div>
            <div style={{
              fontSize: '1.15rem',
              fontWeight: '900',
              fontFamily: 'var(--font-heading)',
              color: order.status === 'Cancelled' ? '#c92a2a' : 'var(--primary-purple)'
            }}>
              {order.status}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>Payment</div>
            <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>{order.paymentMethod}</div>
          </div>
        </div>

        {/* 8-Stage Visual Timeline */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '800', marginBottom: '1.25rem' }}>
            Tracking Progress
          </h4>

          {order.status === 'Cancelled' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c92a2a', padding: '1rem', background: '#ffe3e3', borderRadius: '8px' }}>
              <AlertCircle size={20} />
              <span>This order has been cancelled.</span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {STATUS_STEPS.map((step, idx) => {
                const isCompleted = idx <= activeStepIndex;
                const isCurrent = idx === activeStepIndex;
                const isLast = idx === STATUS_STEPS.length - 1;

                return (
                  <div key={step.key} style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                    {/* Step Icon and Line */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: isCompleted ? 'var(--deep-black)' : 'var(--warm-off-white)',
                        border: isCurrent ? '3px solid var(--primary-purple)' : isCompleted ? '2px solid var(--deep-black)' : '2px solid var(--border-medium)',
                        color: isCompleted ? '#FFFFFF' : 'var(--muted-text)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                        transition: 'all 0.2s ease'
                      }}>
                        {isCompleted ? <CheckCircle2 size={15} color={isCurrent ? 'var(--accent-mint)' : '#FFFFFF'} /> : <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--border-medium)' }} />}
                      </div>

                      {!isLast && (
                        <div style={{
                          width: '2px',
                          flex: 1,
                          minHeight: '36px',
                          backgroundColor: idx < activeStepIndex ? 'var(--deep-black)' : 'var(--border-medium)',
                          margin: '2px 0'
                        }} />
                      )}
                    </div>

                    {/* Step Label & Subtext */}
                    <div style={{ paddingBottom: isLast ? '0' : '1.25rem', paddingTop: '3px' }}>
                      <div style={{
                        fontSize: '0.9rem',
                        fontWeight: isCurrent ? '800' : isCompleted ? '700' : '500',
                        color: isCurrent ? 'var(--primary-purple)' : isCompleted ? 'var(--deep-black)' : 'var(--muted-text)'
                      }}>
                        {step.label}
                        {isCurrent && (
                          <span className="drip-badge badge-purple" style={{ marginLeft: '0.5rem', fontSize: '0.62rem' }}>
                            ACTIVE NOW
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--muted-text)', marginTop: '0.15rem' }}>
                        {step.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Delivery Address & Ordered Items */}
        <div style={{
          padding: '1.25rem',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--warm-off-white)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--muted-text)', marginBottom: '0.35rem' }}>
              Shipping Destination
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--deep-black)' }}>
              {order.customer?.name} ({order.customer?.phone})
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--muted-text)' }}>
              {order.deliveryAddress?.addressLine}, {order.deliveryAddress?.districtName || order.deliveryAddress?.district}, {order.deliveryAddress?.pincode}
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-medium)', paddingTop: '0.75rem' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--muted-text)', marginBottom: '0.5rem' }}>
              Items in this Shipment ({order.items?.length || 0})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {order.items?.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                  <span style={{ fontWeight: '600' }}>
                    {item.name} <span style={{ color: 'var(--muted-text)', fontWeight: '400' }}>({item.size} • {item.color} x{item.quantity})</span>
                  </span>
                  <span style={{ fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
