import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, MapPin, CreditCard, QrCode, Banknote, ArrowRight, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useDistrict } from '../context/DistrictContext';
import { dbService } from '../services/db';
import { KERALA_DISTRICTS } from '../data/keralaDistricts';
import confetti from 'canvas-confetti';

export const CheckoutModal = ({ isOpen, onClose, onOrderPlaced }) => {
  const { cartItems, subtotal, deliveryFee, total, clearCart } = useCart();
  const { currentUser, saveAddress } = useAuth();
  const { selectedDistrict } = useDistrict();

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'cod'
  const [upiApp, setUpiApp] = useState('gpay'); // 'gpay' | 'phonepe' | 'paytm' | 'qr'
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Address form state
  const defaultAddress = currentUser?.addresses?.find(a => a.isDefault) || currentUser?.addresses?.[0];

  const [formData, setFormData] = useState({
    name: defaultAddress?.name || currentUser?.displayName || 'Fahad K.',
    phone: defaultAddress?.phone || currentUser?.phone || '+91 98461 98765',
    email: currentUser?.email || 'fahad.k@dripden.in',
    addressLine: defaultAddress?.addressLine || 'Apt 4B, Skyline Trinity, Panampilly Nagar',
    landmark: defaultAddress?.landmark || 'Near Subway',
    district: defaultAddress?.district || (selectedDistrict !== 'all' ? selectedDistrict : 'ernakulam'),
    pincode: defaultAddress?.pincode || '682036'
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsSubmitting(true);

    try {
      // Save address if user is logged in
      if (currentUser) {
        await saveAddress({
          name: formData.name,
          phone: formData.phone,
          addressLine: formData.addressLine,
          landmark: formData.landmark,
          district: formData.district,
          districtName: KERALA_DISTRICTS.find(d => d.id === formData.district)?.name || formData.district,
          pincode: formData.pincode,
          isDefault: true
        });
      }

      // Create order in DB
      const orderPayload = {
        customer: {
          userId: currentUser?.uid || 'guest_user',
          name: formData.name,
          phone: formData.phone,
          email: formData.email
        },
        deliveryAddress: {
          addressLine: formData.addressLine,
          landmark: formData.landmark,
          district: formData.district,
          districtName: KERALA_DISTRICTS.find(d => d.id === formData.district)?.name || formData.district,
          pincode: formData.pincode
        },
        items: cartItems,
        subtotal,
        deliveryFee,
        total,
        paymentMethod: paymentMethod === 'upi' ? `UPI (${upiApp.toUpperCase()})` : paymentMethod === 'card' ? 'Credit / Debit Card' : 'Cash on Delivery (COD)'
      };

      const createdOrder = await dbService.createOrder(orderPayload);

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log('Confetti error:', err);
      }

      clearCart();
      setIsSubmitting(false);
      onClose();
      onOrderPlaced(createdOrder);
    } catch (error) {
      console.error('Order creation error:', error);
      setIsSubmitting(false);
      alert('Order could not be processed. Please try again.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1250 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          maxWidth: '780px', 
          width: '95%',
          maxHeight: '92vh',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--border-light)'
        }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Express Checkout</h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--muted-text)' }}>
              Kerala Local Boutique Direct Shipping
            </p>
          </div>
          <button
            onClick={onClose}
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

        {/* Checkout Form */}
        <form onSubmit={handlePlaceOrder} style={{ padding: '1.5rem 1.75rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.75rem' }} className="checkout-grid">
            
            {/* Left: Customer & Address Details */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <MapPin size={18} color="var(--primary-purple)" />
                <h3 style={{ fontSize: '1rem', fontWeight: '800' }}>1. Delivery Address</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '0.25rem' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Receiver name"
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-medium)',
                        fontSize: '0.85rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '0.25rem' }}>
                      Phone (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98460 00000"
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-medium)',
                        fontSize: '0.85rem'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '0.25rem' }}>
                    Street Address & House / Flat No. *
                  </label>
                  <input
                    type="text"
                    name="addressLine"
                    required
                    value={formData.addressLine}
                    onChange={handleInputChange}
                    placeholder="E.g., Flat 4B, Panampilly Nagar"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-medium)',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '0.25rem' }}>
                      Kerala District *
                    </label>
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-medium)',
                        fontSize: '0.85rem',
                        background: '#FFFFFF'
                      }}
                    >
                      {KERALA_DISTRICTS.filter(d => d.id !== 'all').map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '0.25rem' }}>
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="682036"
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-medium)',
                        fontSize: '0.85rem'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                  <CreditCard size={18} color="var(--primary-purple)" />
                  <h3 style={{ fontSize: '1rem', fontWeight: '800' }}>2. Payment Method</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {/* UPI Option */}
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: paymentMethod === 'upi' ? '2px solid var(--primary-purple)' : '1px solid var(--border-medium)',
                    background: paymentMethod === 'upi' ? 'var(--primary-purple-soft)' : '#FFFFFF',
                    cursor: 'pointer'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                      />
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: '700' }}>Instant UPI (GPay / PhonePe / QR)</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>Zero extra transaction fee</div>
                      </div>
                    </div>
                    <span className="drip-badge badge-mint-subtle" style={{ fontSize: '0.65rem' }}>Fastest</span>
                  </label>

                  {paymentMethod === 'upi' && (
                    <div style={{
                      padding: '0.75rem 1rem',
                      background: '#FFFFFF',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                      display: 'flex',
                      gap: '0.5rem'
                    }}>
                      {['gpay', 'phonepe', 'paytm', 'qr'].map(app => (
                        <button
                          key={app}
                          type="button"
                          onClick={() => setUpiApp(app)}
                          style={{
                            flex: 1,
                            padding: '0.4rem 0',
                            borderRadius: 'var(--radius-sm)',
                            border: upiApp === app ? '2px solid var(--deep-black)' : '1px solid var(--border-medium)',
                            background: upiApp === app ? 'var(--deep-black)' : 'var(--warm-off-white)',
                            color: upiApp === app ? '#FFFFFF' : 'var(--deep-black)',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            textTransform: 'uppercase'
                          }}
                        >
                          {app}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Card Option */}
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: paymentMethod === 'card' ? '2px solid var(--primary-purple)' : '1px solid var(--border-medium)',
                    background: paymentMethod === 'card' ? 'var(--primary-purple-soft)' : '#FFFFFF',
                    cursor: 'pointer',
                    gap: '0.65rem'
                  }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: '700' }}>Credit / Debit Card</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>Visa, Mastercard, RuPay</div>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: paymentMethod === 'cod' ? '2px solid var(--primary-purple)' : '1px solid var(--border-medium)',
                    background: paymentMethod === 'cod' ? 'var(--primary-purple-soft)' : '#FFFFFF',
                    cursor: 'pointer',
                    gap: '0.65rem'
                  }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: '700' }}>Cash on Delivery (COD)</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>Pay cash or UPI upon delivery</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div style={{
              background: 'var(--warm-off-white)',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--border-medium)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '0.85rem' }}>
                  Order Summary ({cartItems.length} items)
                </h3>

                <div style={{
                  maxHeight: '220px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  paddingRight: '0.25rem',
                  marginBottom: '1rem'
                }}>
                  {cartItems.map((item) => (
                    <div key={item.key} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '48px', height: '54px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: '700', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--muted-text)' }}>
                          Size: {item.size} • Qty: {item.quantity}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--primary-purple)' }}>
                          {item.shopName}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid var(--border-medium)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted-text)' }}>
                    <span>Subtotal</span>
                    <span style={{ fontWeight: '700', color: 'var(--deep-black)' }}>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted-text)' }}>
                    <span>Delivery (Kerala)</span>
                    <span style={{ fontWeight: '700', color: deliveryFee === 0 ? '#1b8a5a' : 'var(--deep-black)' }}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTop: '1px solid var(--border-light)',
                    paddingTop: '0.65rem',
                    fontSize: '1.2rem',
                    fontWeight: '900',
                    color: 'var(--deep-black)'
                  }}>
                    <span>Total Amount</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div style={{ marginTop: '1.5rem' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{ width: '100%', height: '48px', fontSize: '0.92rem', borderRadius: 'var(--radius-xs)' }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Confirming Order...</span>
                    </>
                  ) : (
                    <>
                      <span>PLACE ORDER (₹{total.toLocaleString('en-IN')})</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem',
                  fontSize: '0.72rem',
                  color: 'var(--muted-text)',
                  marginTop: '0.65rem'
                }}>
                  <ShieldCheck size={14} color="var(--primary-purple)" />
                  <span>100% Genuine Local Boutique Guarantee</span>
                </div>
              </div>

            </div>

          </div>
        </form>

      </div>

      <style>{`
        @media (min-width: 760px) {
          .checkout-grid {
            grid-template-columns: 1.25fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
