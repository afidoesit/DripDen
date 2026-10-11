import React, { useState, useEffect } from 'react';
import { X, User, MapPin, Package, Heart, LogOut, Settings, Plus, Truck, ExternalLink, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { dbService } from '../services/db';
import { KERALA_DISTRICTS } from '../data/keralaDistricts';
import { isFirebaseConfigured } from '../services/firebase';

export const ProfileModal = ({ onTrackOrder, onOpenFirebaseSettings }) => {
  const { currentUser, logout, isProfileModalOpen, setIsProfileModalOpen, saveAddress } = useAuth();
  const { wishlistCount, setIsWishlistModalOpen } = useWishlist();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'addresses' | 'details'
  const [userOrders, setUserOrders] = useState([]);
  const [newAddressMode, setNewAddressMode] = useState(false);
  
  const [addrForm, setAddrForm] = useState({
    name: currentUser?.displayName || '',
    phone: currentUser?.phone || '',
    addressLine: '',
    landmark: '',
    district: 'ernakulam',
    pincode: '682036',
    isDefault: false
  });

  useEffect(() => {
    if (isProfileModalOpen) {
      loadOrders();
    }
  }, [isProfileModalOpen, currentUser]);

  const loadOrders = async () => {
    const orders = await dbService.getOrders(currentUser?.uid || currentUser?.email);
    setUserOrders(orders);
  };

  if (!isProfileModalOpen || !currentUser) return null;

  const handleAddAddress = async (e) => {
    e.preventDefault();
    await saveAddress({
      ...addrForm,
      districtName: KERALA_DISTRICTS.find(d => d.id === addrForm.district)?.name || addrForm.district
    });
    setNewAddressMode(false);
    setAddrForm({
      name: currentUser?.displayName || '',
      phone: currentUser?.phone || '',
      addressLine: '',
      landmark: '',
      district: 'ernakulam',
      pincode: '682036',
      isDefault: false
    });
  };

  return (
    <div className="modal-overlay" onClick={() => setIsProfileModalOpen(false)} style={{ zIndex: 1250 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          maxWidth: '740px', 
          width: '95%',
          maxHeight: '90vh',
          borderRadius: '6px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Profile Header */}
        <div style={{
          padding: '1.5rem 1.75rem',
          background: 'var(--deep-black)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '2px',
              background: 'var(--primary-purple)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.3rem',
              fontWeight: '900',
              fontFamily: 'var(--font-heading)'
            }}>
              {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'U'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#FFFFFF' }}>
                  {currentUser.displayName}
                </h3>
                <span className="drip-badge badge-mint" style={{ fontSize: '0.62rem' }}>
                  KERALA MEMBER
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#B3B3B3' }}>
                {currentUser.email} • {currentUser.phone || '+91 98461 98765'}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsProfileModalOpen(false)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '2px',
              background: 'rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-light)',
          background: '#FFFFFF',
          padding: '0 1.75rem'
        }}>
          {[
            { id: 'orders', label: 'Order History', icon: Package, count: userOrders.length },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin, count: currentUser.addresses?.length || 0 }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '1rem 1.25rem',
                  borderBottom: isActive ? '3px solid var(--primary-purple)' : '3px solid transparent',
                  fontWeight: isActive ? '800' : '600',
                  color: isActive ? 'var(--deep-black)' : 'var(--muted-text)',
                  fontSize: '0.85rem'
                }}
              >
                <Icon size={16} color={isActive ? 'var(--primary-purple)' : 'currentColor'} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span style={{
                    fontSize: '0.7rem',
                    background: 'var(--warm-off-white)',
                    padding: '0.1rem 0.45rem',
                    borderRadius: '10px'
                  }}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div style={{ padding: '1.5rem 1.75rem', flex: 1, overflowY: 'auto' }}>
          
          {/* TAB 1: ORDER HISTORY */}
          {activeTab === 'orders' && (
            <div>
              {userOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <Package size={36} color="var(--light-muted)" style={{ margin: '0 auto 0.75rem' }} />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.35rem' }}>No Orders Yet</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted-text)' }}>
                    Your placed orders from local Kerala shops will appear here with live tracking.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {userOrders.map((order) => (
                    <div
                      key={order.id}
                      style={{
                        padding: '1.25rem',
                        borderRadius: '4px',
                        border: '1px solid var(--border-medium)',
                        background: '#FFFFFF',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.85rem'
                      }}
                    >
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                            <span style={{ fontWeight: '800', fontSize: '0.92rem' }}>{order.id}</span>
                            <span className="drip-badge badge-purple" style={{ fontSize: '0.62rem' }}>
                              {order.status}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginTop: '0.15rem' }}>
                            {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setIsProfileModalOpen(false);
                            onTrackOrder(order);
                          }}
                          className="btn-secondary"
                          style={{ padding: '0.45rem 0.95rem', fontSize: '0.78rem' }}
                        >
                          <Truck size={14} color="var(--primary-purple)" />
                          <span>Track Timeline</span>
                        </button>
                      </div>

                      {/* Items */}
                      <div style={{ display: 'flex', gap: '0.65rem', overflowX: 'auto', paddingBottom: '0.35rem' }}>
                        {order.items?.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--warm-off-white)', padding: '0.4rem 0.65rem', borderRadius: '2px', flexShrink: 0 }}>
                            <img src={item.image} alt={item.name} style={{ width: '32px', height: '38px', borderRadius: '2px', objectFit: 'cover' }} />
                            <div>
                              <div style={{ fontSize: '0.78rem', fontWeight: '700' }}>{item.name}</div>
                              <div style={{ fontSize: '0.7rem', color: 'var(--muted-text)' }}>
                                {item.size} • {item.shopName}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '0.65rem', fontSize: '0.85rem' }}>
                        <span style={{ color: 'var(--muted-text)' }}>Paid via {order.paymentMethod}</span>
                        <span style={{ fontWeight: '900', fontFamily: 'var(--font-heading)' }}>
                          Total: ₹{order.total?.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '800' }}>Kerala Delivery Addresses</h4>
                {!newAddressMode && (
                  <button
                    onClick={() => setNewAddressMode(true)}
                    className="btn-secondary"
                    style={{ padding: '0.4rem 0.85rem', fontSize: '0.78rem' }}
                  >
                    <Plus size={14} />
                    <span>Add Address</span>
                  </button>
                )}
              </div>

              {newAddressMode ? (
                <form onSubmit={handleAddAddress} style={{
                  background: 'var(--warm-off-white)',
                  padding: '1.25rem',
                  border: '1px solid var(--border-medium)',
                  borderRadius: '4px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <input
                      type="text"
                      required
                      placeholder="Receiver Name"
                      value={addrForm.name}
                      onChange={(e) => setAddrForm(p => ({ ...p, name: e.target.value }))}
                      style={{ padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-medium)', background: '#FFFFFF' }}
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone"
                      value={addrForm.phone}
                      onChange={(e) => setAddrForm(p => ({ ...p, phone: e.target.value }))}
                      style={{ padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-medium)', background: '#FFFFFF' }}
                    />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="House / Flat No, Street, Locality"
                    value={addrForm.addressLine}
                    onChange={(e) => setAddrForm(p => ({ ...p, addressLine: e.target.value }))}
                    style={{ padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-medium)', background: '#FFFFFF' }}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <select
                      value={addrForm.district}
                      onChange={(e) => setAddrForm(p => ({ ...p, district: e.target.value }))}
                      style={{ padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-medium)', background: '#FFFFFF' }}
                    >
                      {KERALA_DISTRICTS.filter(d => d.id !== 'all').map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      required
                      placeholder="Pincode"
                      value={addrForm.pincode}
                      onChange={(e) => setAddrForm(p => ({ ...p, pincode: e.target.value }))}
                      style={{ padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-medium)', background: '#FFFFFF' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setNewAddressMode(false)}
                      style={{ padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: '600' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ padding: '0.5rem 1.25rem', fontSize: '0.82rem' }}
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {currentUser.addresses?.map((addr, i) => (
                    <div
                      key={addr.id || i}
                      style={{
                        padding: '1rem 1.25rem',
                        borderRadius: '4px',
                        border: addr.isDefault ? '2px solid var(--primary-purple)' : '1px solid var(--border-medium)',
                        background: '#FFFFFF',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                          <span style={{ fontWeight: '800', fontSize: '0.9rem' }}>{addr.name}</span>
                          {addr.isDefault && (
                            <span className="drip-badge badge-purple-subtle" style={{ fontSize: '0.6rem' }}>
                              DEFAULT
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--muted-text)' }}>
                          {addr.addressLine}, {addr.districtName || addr.district}, {addr.pincode}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginTop: '0.2rem' }}>
                          Contact: {addr.phone}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer Logout button */}
        <div style={{
          padding: '1rem 1.75rem',
          borderTop: '1px solid var(--border-light)',
          background: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={() => {
              setIsProfileModalOpen(false);
              setIsWishlistModalOpen(true);
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: '700' }}
          >
            <Heart size={16} color="var(--accent-pink)" />
            <span>Wishlist ({wishlistCount})</span>
          </button>

          <button
            onClick={logout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#c92a2a',
              fontSize: '0.82rem',
              fontWeight: '700'
            }}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>

      </div>
    </div>
  );
};
