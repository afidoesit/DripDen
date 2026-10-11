import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = ({ onProceedToCheckout }) => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    deliveryFee, 
    total 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div className="drawer-overlay" onClick={() => setIsCartOpen(false)} />
      <div className="drawer-panel">
        
        {/* Drawer Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-light)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingBag size={20} color="var(--primary-purple)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Your Drip Bag</h3>
            <span className="drip-badge badge-black" style={{ fontSize: '0.65rem' }}>
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-xs)',
              background: 'var(--warm-off-white)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div style={{
          padding: '0.75rem 1.5rem',
          background: subtotal >= 999 ? 'var(--accent-mint-soft)' : 'var(--warm-off-white)',
          borderBottom: '1px solid var(--border-light)',
          fontSize: '0.8rem',
          color: subtotal >= 999 ? '#075037' : 'var(--muted-text)',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Truck size={16} color={subtotal >= 999 ? '#075037' : 'var(--primary-purple)'} />
          {subtotal >= 999 ? (
            <span>You unlocked <strong>FREE Kerala Express Delivery!</strong></span>
          ) : (
            <span>Add <strong>₹{(999 - subtotal).toLocaleString('en-IN')}</strong> more for Free Delivery</span>
          )}
        </div>

        {/* Cart Item List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {cartItems.length === 0 ? (
            <div style={{
              textAlign: 'center',
              margin: 'auto',
              padding: '2rem 1rem'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--warm-off-white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <ShoppingBag size={28} color="var(--light-muted)" />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.35rem' }}>
                Your cart is empty
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-text)', marginBottom: '1.25rem' }}>
                Explore drops from local Kerala streetwear boutiques to find your drip.
              </p>
              <button
                className="btn-primary"
                onClick={() => setIsCartOpen(false)}
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.85rem' }}
              >
                Browse Drops
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.key}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid var(--border-light)'
                }}
              >
                {/* Item Thumbnail - 2px square */}
                <div style={{
                  width: '74px',
                  height: '88px',
                  borderRadius: 'var(--radius-xs)',
                  overflow: 'hidden',
                  backgroundColor: '#EBE7E0',
                  border: '1px solid var(--border-light)',
                  flexShrink: 0
                }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Details */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{
                        fontSize: '0.88rem',
                        fontWeight: '700',
                        color: 'var(--deep-black)',
                        lineHeight: 1.3,
                        marginRight: '0.5rem'
                      }}>
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.key)}
                        style={{ color: 'var(--light-muted)', padding: '2px' }}
                        title="Remove"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginTop: '0.2rem' }}>
                      Shop: <span style={{ fontWeight: '600', color: 'var(--deep-black)' }}>{item.shopName}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem', fontSize: '0.75rem' }}>
                      <span className="drip-badge badge-purple-subtle" style={{ padding: '0.1rem 0.4rem', fontSize: '0.65rem' }}>
                        Size: {item.size}
                      </span>
                      <span className="drip-badge badge-mint-subtle" style={{ padding: '0.1rem 0.4rem', fontSize: '0.65rem' }}>
                        {item.color}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-xs)',
                      overflow: 'hidden',
                      height: '28px'
                    }}>
                      <button
                        onClick={() => updateQuantity(item.key, -1)}
                        style={{ width: '28px', height: '100%', fontWeight: '700' }}
                      >
                        -
                      </button>
                      <span style={{ width: '28px', textAlign: 'center', fontSize: '0.8rem', fontWeight: '700' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.key, 1)}
                        style={{ width: '28px', height: '100%', fontWeight: '700' }}
                      >
                        +
                      </button>
                    </div>

                    <span style={{
                      fontSize: '0.98rem',
                      fontWeight: '800',
                      fontFamily: 'var(--font-heading)'
                    }}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid var(--border-light)',
            background: '#FFFFFF'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted-text)' }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: '700', color: 'var(--deep-black)' }}>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted-text)' }}>
                <span>Kerala Delivery Fee</span>
                <span style={{ fontWeight: '700', color: deliveryFee === 0 ? '#1b8a5a' : 'var(--deep-black)' }}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '0.5rem',
                borderTop: '1px solid var(--border-light)',
                fontSize: '1.1rem',
                fontWeight: '900',
                color: 'var(--deep-black)'
              }}>
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                onProceedToCheckout();
              }}
              className="btn-primary"
              style={{ width: '100%', height: '48px', borderRadius: 'var(--radius-md)' }}
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

      </div>
    </>
  );
};
